const MODEL = "glm-4.5-air";
const DEFAULT_ENDPOINT = "https://open.bigmodel.cn/api/paas/v4/chat/completions";

export const CODER_A_PROMPT = `
你是“行动派研究员”（主编码员）。
任务：针对受访者文本，提取细颗粒度的动作编码，优先捕捉可观察行为、时间顺序、具体事件与事实证据。
要求：
1) 编码尽量具体，可直接映射到“谁在做什么”。
2) 避免泛化心理诊断，先尊重文本中的显性动作和事实。
3) 只输出 JSON 对象，格式为：
{"code":"...","reason":"..."}
`.trim();

export const CODER_B_PROMPT = `
你是“批判性心理学家”（严苛审计员）。
任务：反驳表面现象，挖掘更深层的心理状态、结构性矛盾或隐喻，形成有解释力的高级编码。
要求：
1) 识别文本中的张力、冲突、压抑、悖论和语义断裂。
2) 必须给出推断路径，说明为何不能停留在表层动作描述。
3) 只输出 JSON 对象，格式为：
{"code":"...","reason":"..."}
`.trim();

export const MEDIATOR_PROMPT = `
你是“资深博导”（共识调解员）。
任务：你不自行生成全新编码，而是比较两位编码员的输出，分析分歧与互补，并整合为一个最终高级编码。
输入将包含：原始文本、Coder A 结果、Coder B 结果。
要求：
1) 明确指出 A 与 B 各自贡献和盲点。
2) 最终编码必须融合两者优点，避免简单二选一。
3) 只输出 JSON 对象，格式为：
{"code":"...","synthesis_rationale":"..."}
`.trim();

function parseModelJson(raw) {
  const text = String(raw || "").trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fence ? fence[1].trim() : text;
  return JSON.parse(candidate);
}

async function callZhipuJson({ endpoint, apiKey, model, messages, temperature = 0.2, fetchImpl = fetch }) {
  const baseBody = {
    model,
    temperature,
    messages,
  };

  let response = await fetchImpl(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...baseBody, response_format: { type: "json_object" } }),
  });

  if (response.status === 400) {
    response = await fetchImpl(endpoint, {
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
    throw new Error(`上游返回非 JSON: ${rawText.slice(0, 200)}`);
  }

  if (!response.ok) {
    const msg = data?.error?.message || data?.message || "上游请求失败";
    throw new Error(msg);
  }

  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("模型未返回内容");
  }

  try {
    return parseModelJson(content);
  } catch {
    throw new Error(`模型返回内容不是合法 JSON: ${String(content).slice(0, 200)}`);
  }
}

function normalizeCoderResult(value) {
  return {
    code: String(value?.code || "").trim(),
    reason: String(value?.reason || "").trim(),
  };
}

function normalizeFinalDecision(value) {
  return {
    code: String(value?.code || "").trim(),
    synthesis_rationale: String(value?.synthesis_rationale || "").trim(),
  };
}

export async function generateConsensusCode(text, options = {}) {
  const originalText = String(text || "").trim();
  if (!originalText) {
    throw new Error("generateConsensusCode: text 不能为空");
  }

  const apiKey = options.apiKey || options.env?.ZHIPU_API_KEY;
  if (!apiKey) {
    throw new Error("generateConsensusCode: 缺少 ZHIPU API Key");
  }

  const endpoint = options.endpoint || DEFAULT_ENDPOINT;
  const model = options.model || MODEL;
  const fetchImpl = options.fetchImpl || fetch;

  const [coderAResponse, coderBResponse] = await Promise.all([
    callZhipuJson({
      endpoint,
      apiKey,
      model,
      fetchImpl,
      messages: [
        { role: "system", content: CODER_A_PROMPT },
        { role: "user", content: originalText },
      ],
    }),
    callZhipuJson({
      endpoint,
      apiKey,
      model,
      fetchImpl,
      messages: [
        { role: "system", content: CODER_B_PROMPT },
        { role: "user", content: originalText },
      ],
    }),
  ]);

  const coderA = normalizeCoderResult(coderAResponse);
  const coderB = normalizeCoderResult(coderBResponse);
  if (!coderA.code || !coderA.reason) {
    throw new Error("Coder A 返回缺少 code/reason");
  }
  if (!coderB.code || !coderB.reason) {
    throw new Error("Coder B 返回缺少 code/reason");
  }

  const mediatorInput = [
    "原始文本：",
    originalText,
    "",
    "Coder A 输出：",
    JSON.stringify(coderA, null, 2),
    "",
    "Coder B 输出：",
    JSON.stringify(coderB, null, 2),
  ].join("\n");

  const finalDecisionRaw = await callZhipuJson({
    endpoint,
    apiKey,
    model,
    fetchImpl,
    messages: [
      { role: "system", content: MEDIATOR_PROMPT },
      { role: "user", content: mediatorInput },
    ],
  });

  const finalDecision = normalizeFinalDecision(finalDecisionRaw);
  if (!finalDecision.code || !finalDecision.synthesis_rationale) {
    throw new Error("Mediator 返回缺少 code/synthesis_rationale");
  }

  return {
    originalText,
    coderA,
    coderB,
    finalDecision,
  };
}
