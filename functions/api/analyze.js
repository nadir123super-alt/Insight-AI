/**
 * POST /api/analyze
 * 请求体: { text: string }
 * 响应: 智谱 chat/completions 原样包装；message.content 为严格 JSON 字符串（溯源结构）。
 */

const SYSTEM_PROMPT = `你是资深质性研究方法论专家，负责对访谈转录稿进行「三级编码」并输出可机器解析的溯源数据。

【输出要求 — 极其重要】
1. 只输出一个 JSON 对象，不要 Markdown、不要代码围栏、不要任何解释性前后文。
2. JSON 必须可被 JSON.parse 直接解析，字符串内的换行用 \\n 转义，双引号必须转义。
3. 字段与结构必须完全符合下列 TypeScript 类型（逻辑上）：

type TextBlock = {
  id: string;        // 全稿唯一，建议 b1、b2…
  text: string;      // 该块对应原文（从用户输入中切分，勿臆造）
  speaker: string;   // 如「受访者」「访谈员」「未知」
};

type SpanRef = {
  blockId: string;
  start?: number;    // 在 block.text 内的 UTF-16 字符起始索引（含）；省略则高亮整段
  end?: number;      // 结束索引（不含）
};

type CodeNode = {
  id: string;        // 全稿唯一，建议 c1、c2…
  name: string;      // 编码标签名，简洁学术化
  level: 1 | 2 | 3;  // 一级开屏 / 二级关联 / 三级核心
  parentId: string | null;  // 上级编码 id；一级为 null
  refs: SpanRef[];   // 支撑该编码的原文证据；至少一条，blockId 必须存在于 blocks
};

type AnalysisPayload = {
  blocks: TextBlock[];
  codes: CodeNode[];
};

4. blocks 须覆盖用户输入的主要语义单元（按话轮或自然段切分），顺序与原文一致；拼接 blocks 的 text 应能还原输入主干。
5. codes 形成树：level=1 的 parentId 为 null；level=2/3 的 parentId 指向上一级。
6. refs 优先精确到句或短语（提供 start/end）；若不便细分可仅给 blockId 表示整段支撑。

只输出 JSON。`;

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
    const { text } = await context.request.json();
    if (!text || typeof text !== "string" || !text.trim()) {
      return new Response(JSON.stringify({ error: "缺少有效 text" }), {
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
    const baseBody = {
      model: "glm-4.5-air",
      temperature: 0.2,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: text.trim() },
      ],
    };

    let response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...baseBody, response_format: { type: "json_object" } }),
    });

    if (response.status === 400) {
      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(baseBody),
      });
    }

    const rawText = await response.text();
    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      return new Response(
        JSON.stringify({ error: "上游返回非 JSON", detail: rawText.slice(0, 500) }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!response.ok) {
      const msg = data?.error?.message || data?.message || rawText || "上游请求失败";
      return new Response(JSON.stringify({ error: msg }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
