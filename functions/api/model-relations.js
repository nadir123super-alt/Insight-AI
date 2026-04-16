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
  const body = { model: MODEL, temperature: 0.2, messages };
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
    "你必须严格保持输入与输出的语言一致性。请首先检测用户提供的原始语料是什么语言。\n" +
    "如果原始语料是中文，你输出的所有概念名与关系词必须全部使用中文；如果原始语料是英文，你必须全部使用英文。\n" +
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
    const { text, nodes } = await context.request.json();
    if (!text || typeof text !== "string" || !Array.isArray(nodes) || !nodes.length) {
      return new Response(JSON.stringify({ error: "缺少 text 或 nodes" }), {
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

    const endpoint = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
    const knowledgeText = flattenText(academicKnowledge).slice(0, 2500);
    const modelResult = await callZhipu(endpoint, apiKey, [
      {
        role: "system",
        content:
          "你是质性研究理论关系建模助手。请根据访谈文本与编码概念，推断概念间关系，用于理论建模画布连线。" +
          "\n" +
          buildLanguageMirroringProtocol() +
          "\n重要：只输出最强烈、最关键的 3-5 条关系（不要做两两相连）。优先保留能组成清晰因果/逻辑链条的边。" +
          "\n重要：避免冗余传递性连线。若已存在 A->B 且 B->C，则除非 A->C 有明显独立证据或不可替代的解释价值，否则不要输出 A->C。" +
          "\n重要：关系词（relationType 与 label 中间词）必须是具有明确学术或逻辑指向的动词或动宾短语，必须表达方向性。" +
          "\n允许的关系词示例（可同义改写，但必须同等学术力度）：导致、触发、促进、阻碍、强化、削弱、缓解、构成、包含、属于、解释、回应、转化为、形成矛盾、引发冲突。" +
          "\n绝对禁止输出弱关系或并列连词：与、和、及、以及、相关、关系、联系、一起、同时、伴随、有关、相似、不同。" +
          "\n如果两个概念之间没有明确的因果、矛盾、机制、条件-结果或动作方向，请放弃该边，不要强行连线。" +
          "\n关系类型建议使用以下集合（可用中文或英文短标签，但要稳定、可读）：" +
          "\n- 会导致/因果（causal）" +
          "\n- 影响/促进/抑制（influence）" +
          "\n- 构成/包含/属于（composition）" +
          "\n- 矛盾/冲突/张力（contradiction）" +
          "\n- 中介（mediator）" +
          "\n（不要使用“相关/correlation”作为关系类型，除非你能给出明确的方向性机制；否则宁可不输出。）" +
          '\n输出 JSON 对象：{"edges":[{"source":"概念A","target":"概念B","relationType":"关系类型","label":"显示在连线上的短句，例如：[A] --导致--> [B]（label 中只出现关系词，不要重复节点名称）","confidence":0.0-1.0,"isEssential":true|false}]}' +
          "\n其中 confidence 表示你对该关系的确信度（0-1），isEssential 仅在该边即使存在 A->B->C 也必须保留时标 true。" +
          "\n优先参考以下规范（含条件-行动-结果）：\n" +
          knowledgeText,
      },
      {
        role: "user",
        content: "访谈文本：\n" + text.trim() + "\n\n待建模概念：\n" + JSON.stringify(nodes, null, 2),
      },
    ]);

    const edges = Array.isArray(modelResult?.edges) ? modelResult.edges : [];
    const normalized = edges
      .map((e) => ({
        source: String(e?.source || "").trim(),
        target: String(e?.target || "").trim(),
        relationType: String(e?.relationType || "").trim(),
        label: String(e?.label || "").trim(),
        confidence: Number.isFinite(Number(e?.confidence)) ? Number(e.confidence) : null,
        isEssential: Boolean(e?.isEssential),
      }))
      .filter((e) => e.source && e.target && e.source !== e.target);

    return new Response(JSON.stringify({ edges: normalized }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
