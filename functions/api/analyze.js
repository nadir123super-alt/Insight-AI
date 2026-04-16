import academicKnowledge from "../../src/data/academic-knowledge.json";

/**
 * POST /api/analyze
 * 请求体: { text: string }
 * 响应: 智谱 chat/completions 原样包装；message.content 为严格 JSON 字符串（溯源结构）。
 */

const MODEL = "glm-4.5-air";

function flattenText(value) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.map((v) => flattenText(v)).filter(Boolean).join("；");
  }
  if (typeof value === "object") {
    return Object.entries(value)
      .map(([k, v]) => `${k}: ${flattenText(v)}`)
      .filter(Boolean)
      .join("；");
  }
  return "";
}

function extractKnowledgeRules() {
  const items = Array.isArray(academicKnowledge) ? academicKnowledge : [academicKnowledge];
  let processCoding = "";
  let patternCoding = "";

  for (const item of items) {
    const topic = String(item?.topic || item?.知识点 || "").toLowerCase();
    const allText = flattenText(item);
    if (!processCoding && (topic.includes("过程编码") || allText.includes("过程编码"))) {
      processCoding = allText;
    }
    if (!patternCoding && (topic.includes("模式编码") || allText.includes("模式编码"))) {
      patternCoding = allText;
    }
  }

  return {
    processCoding:
      processCoding ||
      "过程编码：使用动作导向的标签，捕捉行为与变化过程。\n" +
        "语言自适应规则：\n" +
        "- 若输出为英文：优先使用动名词（Gerunds，例如 'experiencing isolation'）。\n" +
        "- 若输出为中文：优先使用动宾短语或正在进行时结构（例如 '体验孤独感'、'正在逃避社交'）。",
    patternCoding: patternCoding || "模式编码：按相似性、差异性、频率聚类，形成更高层概念。",
  };
}

function buildLanguageMirroringProtocol() {
  return (
    "语言镜像协议（Language Mirroring Protocol）：\n" +
    "你必须严格保持输入与输出的语言一致性。请首先检测用户提供的原始语料是什么语言。\n" +
    "如果原始语料是中文，你提取的所有标签、编码与术语必须全部使用中文；如果原始语料是英文，你必须全部使用英文。\n" +
    "绝对禁止在同一个输出中中英夹杂，也绝对禁止擅自将一种语言翻译成另一种语言。\n" +
    "动作/状态表达规则：若输出为英文，使用动名词（Gerunds）；若输出为中文，使用动宾短语或正在进行时结构。\n"
  );
}

function buildRuleCatalog() {
  const items = Array.isArray(academicKnowledge) ? academicKnowledge : [academicKnowledge];
  const catalog = [];
  let fallbackIndex = 0;
  for (const item of items) {
    const topic = String(item?.topic || item?.知识点 || `规则${catalog.length + 1}`);
    const text = flattenText(item);
    let id = "";
    if (topic.includes("过程编码") || text.includes("过程编码")) {
      id = "Saldana-A";
    } else if (topic.includes("模式编码") || text.includes("模式编码")) {
      id = "Saldana-B";
    } else {
      id = `Charmaz-${String.fromCharCode(65 + fallbackIndex)}`;
      fallbackIndex += 1;
    }
    const paradigm = topic.includes("编码") ? "扎根理论编码范式" : "质性研究方法论";
    catalog.push({
      id,
      topic,
      definition: text.slice(0, 800),
      paradigm,
    });
  }
  return catalog;
}

function parseModelJson(raw) {
  const text = String(raw || "").trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fence ? fence[1].trim() : text;
  return JSON.parse(candidate);
}

async function callZhipuJson(endpoint, apiKey, messages) {
  const baseBody = {
    model: MODEL,
    temperature: 0.2,
    messages,
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

function normalizeL1Array(value, allowedBasisIds) {
  const allowed = new Set(allowedBasisIds || []);
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      quote: String(item?.quote || "").trim(),
      label: String(item?.label || "").trim(),
      basisId: String(item?.basisId || "").trim(),
    }))
    .map((x) => ({
      ...x,
      basisId: allowed.has(x.basisId) ? x.basisId : (allowedBasisIds?.[0] || ""),
    }))
    .filter((x) => x.quote && x.label && x.basisId);
}

function normalizeL2Array(value, allowedBasisIds) {
  const allowed = new Set(allowedBasisIds || []);
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      label: String(item?.label || "").trim(),
      children: Array.isArray(item?.children) ? item.children.map((x) => String(x).trim()).filter(Boolean) : [],
      basisId: String(item?.basisId || "").trim(),
    }))
    .map((x) => ({
      ...x,
      basisId: allowed.has(x.basisId) ? x.basisId : (allowedBasisIds?.[0] || ""),
    }))
    .filter((x) => x.label && x.children.length && x.basisId);
}

function normalizeL3(value, allowedBasisIds) {
  const allowed = new Set(allowedBasisIds || []);
  if (!value || typeof value !== "object") return null;
  const label = String(value.coreLabel || value.label || "").trim();
  const children = Array.isArray(value.children) ? value.children.map((x) => String(x).trim()).filter(Boolean) : [];
  let basisId = String(value.basisId || "").trim();
  if (!allowed.has(basisId)) basisId = allowedBasisIds?.[0] || "";
  if (!label || !children.length || !basisId) return null;
  return { label, children, basisId };
}

function buildPayloadFromThreeLevels(l1Rows, l2Rows, l3) {
  const blockMap = new Map();
  const blocks = [];
  let blockCounter = 1;

  for (const row of l1Rows) {
    if (blockMap.has(row.quote)) continue;
    const id = `b${blockCounter++}`;
    blockMap.set(row.quote, id);
    blocks.push({ id, text: row.quote, speaker: "受访者" });
  }

  const codes = [];
  let codeCounter = 1;
  const l1CodeByLabel = new Map();
  const l2CodeByLabel = new Map();

  for (const row of l1Rows) {
    if (!l1CodeByLabel.has(row.label)) {
      const code = {
        id: `c${codeCounter++}`,
        name: row.label,
        level: 1,
        parentId: null,
        refs: [],
        basisId: row.basisId,
      };
      l1CodeByLabel.set(row.label, code);
      codes.push(code);
    }
    const blockId = blockMap.get(row.quote);
    const code = l1CodeByLabel.get(row.label);
    if (blockId && !code.refs.some((r) => r.blockId === blockId)) {
      code.refs.push({ blockId });
    }
  }

  for (const row of l2Rows) {
    const code = {
      id: `c${codeCounter++}`,
      name: row.label,
      level: 2,
      parentId: null,
      refs: [],
      basisId: row.basisId,
    };
    const refs = new Set();
    for (const childLabel of row.children) {
      const child = l1CodeByLabel.get(childLabel);
      if (!child) continue;
      child.parentId = code.id;
      child.refs.forEach((r) => refs.add(r.blockId));
    }
    code.refs = Array.from(refs).map((blockId) => ({ blockId }));
    l2CodeByLabel.set(row.label, code);
    codes.push(code);
  }

  if (l3) {
    const coreCode = {
      id: `c${codeCounter++}`,
      name: l3.label,
      level: 3,
      parentId: null,
      refs: [],
      basisId: l3.basisId,
    };
    const refs = new Set();
    for (const l2Label of l3.children) {
      const child = l2CodeByLabel.get(l2Label);
      if (!child) continue;
      child.parentId = coreCode.id;
      child.refs.forEach((r) => refs.add(r.blockId));
    }
    coreCode.refs = Array.from(refs).map((blockId) => ({ blockId }));
    codes.push(coreCode);
  }

  return { blocks, codes };
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
    const { processCoding, patternCoding } = extractKnowledgeRules();
    const ruleCatalog = buildRuleCatalog();
    const processRuleIds = ruleCatalog
      .filter((r) => r.topic.includes("过程编码") || r.id === "Saldana-A")
      .map((r) => r.id);
    const allRuleIds = ruleCatalog.map((r) => r.id);
    const inputText = text.trim();

    // Step 1: 开放编码 (L1)
    const step1 = await callZhipuJson(endpoint, apiKey, [
      {
        role: "system",
        content:
          "你是质性研究开放编码专家。请严格使用过程编码规则识别文本中的动作与变化，生成最细颗粒度 L1 标签。" +
          "\n" +
          buildLanguageMirroringProtocol() +
          "\n规则：" +
          processCoding +
          "\n可用规则ID：" +
          processRuleIds.join(", ") +
          '\n只输出 JSON 数组，每项为 {"quote":"原文句子","label":"L1标签","basisId":"规则ID"}。',
      },
      { role: "user", content: inputText },
    ]);
    const l1Rows = normalizeL1Array(step1, processRuleIds);
    if (!l1Rows.length) {
      throw new Error("开放编码未产生有效 L1 结果");
    }

    // Step 2: 主轴编码 (L2)
    const step2 = await callZhipuJson(endpoint, apiKey, [
      {
        role: "system",
        content:
          "你是主轴编码专家。请基于模式编码逻辑将相似 L1 标签聚合为 L2 类目。" +
          "\n" +
          buildLanguageMirroringProtocol() +
          "\n规则：" +
          patternCoding +
          "\n可用规则ID：" +
          allRuleIds.join(", ") +
          '\n只输出 JSON 数组，每项为 {"label":"L2类目","children":["L1标签1","L1标签2"],"basisId":"规则ID"}。',
      },
      {
        role: "user",
        content:
          "以下是 L1 标签（JSON）：\n" +
          JSON.stringify(l1Rows, null, 2) +
          "\n请完成聚类。",
      },
    ]);
    const l2Rows = normalizeL2Array(step2, allRuleIds);
    if (!l2Rows.length) {
      throw new Error("主轴编码未产生有效 L2 结果");
    }

    // Step 3: 核心编码 (L3)
    const step3 = await callZhipuJson(endpoint, apiKey, [
      {
        role: "system",
        content:
          "你是核心编码专家。请生成一个最高层级 L3 核心范畴，统领全部 L2 类目。" +
          "\n" +
          buildLanguageMirroringProtocol() +
          "\n可用规则ID：" +
          allRuleIds.join(", ") +
          '\n只输出 JSON 对象：{"coreLabel":"L3核心概念","children":["L2类目1","L2类目2"],"basisId":"规则ID"}。',
      },
      {
        role: "user",
        content: "以下是 L2 结果（JSON）：\n" + JSON.stringify(l2Rows, null, 2),
      },
    ]);
    const l3 = normalizeL3(step3, allRuleIds);
    if (!l3) {
      throw new Error("核心编码未产生有效 L3 结果");
    }

    const payload = buildPayloadFromThreeLevels(l1Rows, l2Rows, l3);

    return new Response(JSON.stringify(payload), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
