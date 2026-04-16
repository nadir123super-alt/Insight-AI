import academicKnowledge from "../../src/data/academic-knowledge.json";

const MODEL = "glm-4.5-air";

function flattenText(value) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(flattenText).filter(Boolean).join("；");
  if (typeof value === "object") {
    return Object.entries(value)
      .map(([k, v]) => `${k}: ${flattenText(v)}`)
      .filter(Boolean)
      .join("；");
  }
  return "";
}

function parseModelJson(raw) {
  const text = String(raw || "").trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return JSON.parse(fence ? fence[1].trim() : text);
}

async function callZhipu(endpoint, apiKey, messages) {
  const body = { model: MODEL, temperature: 0.4, messages };
  let response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body, response_format: { type: "json_object" } }),
  });
  if (response.status === 400) {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  const raw = await response.text();
  const json = JSON.parse(raw);
  if (!response.ok) throw new Error(json?.error?.message || json?.message || "上游请求失败");
  return parseModelJson(json?.choices?.[0]?.message?.content || "");
}

function buildLanguageMirroringProtocol() {
  return (
    "语言镜像协议（Language Mirroring Protocol）：\n" +
    "你必须严格保持输入与输出的语言一致性。请首先检测用户提供的原始语料/证据/编码是什么语言。\n" +
    "如果材料是中文，你的备忘录必须全部使用中文；如果材料是英文，你必须全部使用英文。\n" +
    "绝对禁止在同一个输出中中英夹杂，也绝对禁止擅自将一种语言翻译成另一种语言。\n"
  );
}

export async function onRequest(context) {
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (context.request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { payload } = await context.request.json();
    if (!payload || !Array.isArray(payload.codes) || !Array.isArray(payload.blocks)) {
      return new Response(JSON.stringify({ error: "缺少编码 payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const apiKey = context.env.ZHIPU_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "服务未配置 ZHIPU_API_KEY" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const codes = payload.codes;
    const blocks = payload.blocks;
    const l3 = codes.filter((c) => Number(c.level) === 3);
    const l1 = codes.filter((c) => Number(c.level) === 1);
    const blockMap = new Map(blocks.map((b) => [b.id, b]));
    const evidence = l1.map((code) => ({
      label: code.name,
      refs: (code.refs || []).slice(0, 3).map((r) => blockMap.get(r.blockId)?.text).filter(Boolean),
    }));

    const saturationRule = flattenText(academicKnowledge).includes("理论饱和")
      ? flattenText(academicKnowledge)
      : "理论饱和度：当新增样本不再产生新概念或新关系时，可认为理论趋于饱和。";

    const endpoint = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
    const result = await callZhipu(endpoint, apiKey, [
      {
        role: "system",
        content:
          "你是社会学质性研究写作助手。请模仿《社会学研究》论文风格，撰写约800字学术备忘录。" +
          "\n" +
          buildLanguageMirroringProtocol() +
          "\n必须包含三个部分标题：一、数据呈现；二、概念定义；三、理论阐释。" +
          "\n须结合理论饱和度规则进行反思，避免空泛。" +
          '\n只输出 JSON 对象：{"memo":"正文"}。',
      },
      {
        role: "user",
        content:
          "L3核心概念：\n" +
          JSON.stringify(l3.map((x) => x.name), null, 2) +
          "\n\nL1证据：\n" +
          JSON.stringify(evidence, null, 2) +
          "\n\n理论饱和度规则：\n" +
          saturationRule.slice(0, 2000),
      },
    ]);

    const memo = String(result?.memo || "").trim();
    if (!memo) throw new Error("模型未返回备忘录正文");
    return new Response(JSON.stringify({ memo }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
