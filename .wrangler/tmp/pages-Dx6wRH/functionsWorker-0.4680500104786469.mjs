var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../src/data/academic-knowledge.json
var academic_knowledge_default = [
  {
    \u77E5\u8BC6\u70B9: {
      \u8FC7\u7A0B\u7F16\u7801: {
        \u5B9A\u4E49: "\u4F7F\u7528\u52A8\u540D\u8BCD\u6982\u62EC\u6570\u636E\uFF0C\u6355\u6349\u52A8\u4F5C\u548C\u6F14\u53D8",
        \u65B9\u6CD5: {
          \u52A8\u540D\u8BCD\u5F62\u5F0F: "\u4F7F\u7528'-ing'\u7ED3\u5C3E\u7684\u8BCD\u6216\u4E2D\u6587\u7684'\u6B63\u5728...'\u3001'\u901A\u8FC7...\u6765...'",
          \u91CD\u70B9: "\u6355\u6349'\u52A8\u4F5C'\u548C'\u6F14\u53D8'"
        }
      },
      \u672C\u571F\u7F16\u7801: {
        \u5B9A\u4E49: "\u63D0\u53D6\u53D7\u8BBF\u8005\u53E3\u4E2D\u7684\u539F\u751F\u8BCD\u6C47\uFF0C\u4FDD\u7559\u7814\u7A76\u5BF9\u8C61\u7684\u539F\u58F0",
        \u65B9\u6CD5: {
          \u4F18\u5148\u63D0\u53D6: "\u53D7\u8BBF\u8005\u53E3\u4E2D\u7684\u539F\u751F\u8BCD\u6C47\uFF08In Vivo\uFF09",
          \u76EE\u7684: "\u589E\u5F3A\u5B66\u672F\u6EAF\u6E90\u7684\u771F\u5B9E\u611F"
        }
      },
      \u5E94\u7528\u903B\u8F91: {
        \u907F\u514D: "\u4F7F\u7528\u62BD\u8C61\u7684\u5F62\u5BB9\u8BCD\uFF08\u5982'\u4F24\u5FC3\u7684'\uFF09",
        \u5E94\u4F7F\u7528: "\u5177\u8C61\u7684\u52A8\u4F5C\u63CF\u8FF0\uFF08\u5982'\u901A\u8FC7\u6C89\u9ED8\u8868\u8FBE\u6297\u8BAE'\uFF09"
      }
    }
  },
  {
    topic: "\u6A21\u5F0F\u7F16\u7801",
    englishName: "Pattern Coding",
    theoryRules: {
      objective: "\u5C06\u7B2C\u4E00\u8F6E\u4EA7\u751F\u7684\u96F6\u6563\u6807\u7B7E\u805A\u7C7B",
      criteria: [
        {
          name: "\u76F8\u4F3C\u6027",
          englishName: "Similarity",
          description: "\u903B\u8F91\u4E0A\u5C5E\u4E8E\u540C\u4E00\u8303\u7574\u7684\u52A8\u4F5C"
        },
        {
          name: "\u5DEE\u5F02\u6027",
          englishName: "Difference",
          description: "\u5728\u540C\u4E00\u4E3B\u9898\u4E0B\u8868\u73B0\u51FA\u7684\u5BF9\u7ACB\u72B6\u6001"
        },
        {
          name: "\u9891\u7387",
          englishName: "Frequency",
          description: "\u9AD8\u9891\u51FA\u73B0\u7684\u73B0\u8C61\u5F80\u5F80\u6784\u6210\u4E86\u7814\u7A76\u7684\u6838\u5FC3\u7EF4\u5EA6"
        }
      ]
    },
    applicationLogic: {
      example: {
        observation: "\u5F53AI\u53D1\u73B0'\u5BFB\u627E\u642D\u5B50'\u548C'\u52A0\u5165\u793E\u7FA4'\u540C\u65F6\u51FA\u73B0\u65F6",
        conclusion: "\u5E94\u5C06\u5176\u5F52\u7EB3\u4E3A\u66F4\u9AD8\u7EA7\u7684\u6982\u5FF5'\u8865\u507F\u6027\u793E\u4EA4\u53C2\u4E0E'"
      }
    }
  },
  {
    \u77E5\u8BC6\u70B9: "\u7F16\u7801\u9897\u7C92\u5EA6\u4E0E\u7CBE\u70BC\u51C6\u5219",
    \u7406\u8BBA\u89C4\u5219: {
      \u72EC\u7ACB\u6027: "\u6BCF\u4E2A\u7F16\u7801\u5E94\u80FD\u72EC\u7ACB\u89E3\u91CA\u4E00\u4E2A\u610F\u4E49\u5355\u5143\u3002",
      \u7CBE\u70BC\u6027: "\u957F\u5EA6\u901A\u5E38\u63A7\u5236\u57282-5\u4E2A\u8BCD\u4E4B\u95F4\uFF0C\u62D2\u7EDD\u957F\u96BE\u53E5\u3002",
      \u4E92\u65A5\u6027: "\u5728\u540C\u4E00\u5C42\u7EA7\u4E0B\uFF0C\u7F16\u7801\u4E4B\u95F4\u5E94\u5C3D\u91CF\u51CF\u5C11\u610F\u4E49\u91CD\u53E0\u3002"
    }
  }
];

// api/analyze.js
var MODEL = "glm-4.5-air";
function flattenText(value) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.map((v) => flattenText(v)).filter(Boolean).join("\uFF1B");
  }
  if (typeof value === "object") {
    return Object.entries(value).map(([k, v]) => `${k}: ${flattenText(v)}`).filter(Boolean).join("\uFF1B");
  }
  return "";
}
__name(flattenText, "flattenText");
function extractKnowledgeRules() {
  const items = Array.isArray(academic_knowledge_default) ? academic_knowledge_default : [academic_knowledge_default];
  let processCoding = "";
  let patternCoding = "";
  for (const item of items) {
    const topic = String(item?.topic || item?.\u77E5\u8BC6\u70B9 || "").toLowerCase();
    const allText = flattenText(item);
    if (!processCoding && (topic.includes("\u8FC7\u7A0B\u7F16\u7801") || allText.includes("\u8FC7\u7A0B\u7F16\u7801"))) {
      processCoding = allText;
    }
    if (!patternCoding && (topic.includes("\u6A21\u5F0F\u7F16\u7801") || allText.includes("\u6A21\u5F0F\u7F16\u7801"))) {
      patternCoding = allText;
    }
  }
  return {
    processCoding: processCoding || "\u8FC7\u7A0B\u7F16\u7801\uFF1A\u4F7F\u7528\u52A8\u4F5C\u5BFC\u5411\u3001\u52A8\u540D\u8BCD\u98CE\u683C\u6807\u7B7E\uFF0C\u6355\u6349\u884C\u4E3A\u4E0E\u53D8\u5316\u8FC7\u7A0B\u3002",
    patternCoding: patternCoding || "\u6A21\u5F0F\u7F16\u7801\uFF1A\u6309\u76F8\u4F3C\u6027\u3001\u5DEE\u5F02\u6027\u3001\u9891\u7387\u805A\u7C7B\uFF0C\u5F62\u6210\u66F4\u9AD8\u5C42\u6982\u5FF5\u3002"
  };
}
__name(extractKnowledgeRules, "extractKnowledgeRules");
function buildRuleCatalog() {
  const items = Array.isArray(academic_knowledge_default) ? academic_knowledge_default : [academic_knowledge_default];
  const catalog = [];
  let fallbackIndex = 0;
  for (const item of items) {
    const topic = String(item?.topic || item?.\u77E5\u8BC6\u70B9 || `\u89C4\u5219${catalog.length + 1}`);
    const text = flattenText(item);
    let id = "";
    if (topic.includes("\u8FC7\u7A0B\u7F16\u7801") || text.includes("\u8FC7\u7A0B\u7F16\u7801")) {
      id = "Saldana-A";
    } else if (topic.includes("\u6A21\u5F0F\u7F16\u7801") || text.includes("\u6A21\u5F0F\u7F16\u7801")) {
      id = "Saldana-B";
    } else {
      id = `Charmaz-${String.fromCharCode(65 + fallbackIndex)}`;
      fallbackIndex += 1;
    }
    const paradigm = topic.includes("\u7F16\u7801") ? "\u624E\u6839\u7406\u8BBA\u7F16\u7801\u8303\u5F0F" : "\u8D28\u6027\u7814\u7A76\u65B9\u6CD5\u8BBA";
    catalog.push({
      id,
      topic,
      definition: text.slice(0, 800),
      paradigm
    });
  }
  return catalog;
}
__name(buildRuleCatalog, "buildRuleCatalog");
function parseModelJson(raw) {
  const text = String(raw || "").trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fence ? fence[1].trim() : text;
  return JSON.parse(candidate);
}
__name(parseModelJson, "parseModelJson");
async function callZhipuJson(endpoint, apiKey, messages) {
  const baseBody = {
    model: MODEL,
    temperature: 0.2,
    messages
  };
  let response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ...baseBody, response_format: { type: "json_object" } })
  });
  if (response.status === 400) {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(baseBody)
    });
  }
  const rawText = await response.text();
  let data;
  try {
    data = JSON.parse(rawText);
  } catch {
    throw new Error(`\u4E0A\u6E38\u8FD4\u56DE\u975E JSON: ${rawText.slice(0, 200)}`);
  }
  if (!response.ok) {
    const msg = data?.error?.message || data?.message || "\u4E0A\u6E38\u8BF7\u6C42\u5931\u8D25";
    throw new Error(msg);
  }
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("\u6A21\u578B\u672A\u8FD4\u56DE\u5185\u5BB9");
  }
  try {
    return parseModelJson(content);
  } catch {
    throw new Error(`\u6A21\u578B\u8FD4\u56DE\u5185\u5BB9\u4E0D\u662F\u5408\u6CD5 JSON: ${String(content).slice(0, 200)}`);
  }
}
__name(callZhipuJson, "callZhipuJson");
function normalizeL1Array(value, allowedBasisIds) {
  const allowed = new Set(allowedBasisIds || []);
  if (!Array.isArray(value)) return [];
  return value.map((item) => ({
    quote: String(item?.quote || "").trim(),
    label: String(item?.label || "").trim(),
    basisId: String(item?.basisId || "").trim()
  })).map((x) => ({
    ...x,
    basisId: allowed.has(x.basisId) ? x.basisId : allowedBasisIds?.[0] || ""
  })).filter((x) => x.quote && x.label && x.basisId);
}
__name(normalizeL1Array, "normalizeL1Array");
function normalizeL2Array(value, allowedBasisIds) {
  const allowed = new Set(allowedBasisIds || []);
  if (!Array.isArray(value)) return [];
  return value.map((item) => ({
    label: String(item?.label || "").trim(),
    children: Array.isArray(item?.children) ? item.children.map((x) => String(x).trim()).filter(Boolean) : [],
    basisId: String(item?.basisId || "").trim()
  })).map((x) => ({
    ...x,
    basisId: allowed.has(x.basisId) ? x.basisId : allowedBasisIds?.[0] || ""
  })).filter((x) => x.label && x.children.length && x.basisId);
}
__name(normalizeL2Array, "normalizeL2Array");
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
__name(normalizeL3, "normalizeL3");
function buildPayloadFromThreeLevels(l1Rows, l2Rows, l3) {
  const blockMap = /* @__PURE__ */ new Map();
  const blocks = [];
  let blockCounter = 1;
  for (const row of l1Rows) {
    if (blockMap.has(row.quote)) continue;
    const id = `b${blockCounter++}`;
    blockMap.set(row.quote, id);
    blocks.push({ id, text: row.quote, speaker: "\u53D7\u8BBF\u8005" });
  }
  const codes = [];
  let codeCounter = 1;
  const l1CodeByLabel = /* @__PURE__ */ new Map();
  const l2CodeByLabel = /* @__PURE__ */ new Map();
  for (const row of l1Rows) {
    if (!l1CodeByLabel.has(row.label)) {
      const code2 = {
        id: `c${codeCounter++}`,
        name: row.label,
        level: 1,
        parentId: null,
        refs: [],
        basisId: row.basisId
      };
      l1CodeByLabel.set(row.label, code2);
      codes.push(code2);
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
      basisId: row.basisId
    };
    const refs = /* @__PURE__ */ new Set();
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
      basisId: l3.basisId
    };
    const refs = /* @__PURE__ */ new Set();
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
__name(buildPayloadFromThreeLevels, "buildPayloadFromThreeLevels");
async function onRequest(context) {
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }
  if (context.request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const { text } = await context.request.json();
    if (!text || typeof text !== "string" || !text.trim()) {
      return new Response(JSON.stringify({ error: "\u7F3A\u5C11\u6709\u6548 text" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const apiKey = context.env.ZHIPU_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "\u670D\u52A1\u672A\u914D\u7F6E ZHIPU_API_KEY" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    const endpoint = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
    const { processCoding, patternCoding } = extractKnowledgeRules();
    const ruleCatalog = buildRuleCatalog();
    const processRuleIds = ruleCatalog.filter((r) => r.topic.includes("\u8FC7\u7A0B\u7F16\u7801") || r.id === "Saldana-A").map((r) => r.id);
    const allRuleIds = ruleCatalog.map((r) => r.id);
    const inputText = text.trim();
    const step1 = await callZhipuJson(endpoint, apiKey, [
      {
        role: "system",
        content: "\u4F60\u662F\u8D28\u6027\u7814\u7A76\u5F00\u653E\u7F16\u7801\u4E13\u5BB6\u3002\u8BF7\u4E25\u683C\u4F7F\u7528\u8FC7\u7A0B\u7F16\u7801\u89C4\u5219\u8BC6\u522B\u6587\u672C\u4E2D\u7684\u52A8\u4F5C\u4E0E\u53D8\u5316\uFF0C\u751F\u6210\u6700\u7EC6\u9897\u7C92\u5EA6 L1 \u6807\u7B7E\u3002\n\u89C4\u5219\uFF1A" + processCoding + "\n\u53EF\u7528\u89C4\u5219ID\uFF1A" + processRuleIds.join(", ") + '\n\u53EA\u8F93\u51FA JSON \u6570\u7EC4\uFF0C\u6BCF\u9879\u4E3A {"quote":"\u539F\u6587\u53E5\u5B50","label":"L1\u6807\u7B7E","basisId":"\u89C4\u5219ID"}\u3002'
      },
      { role: "user", content: inputText }
    ]);
    const l1Rows = normalizeL1Array(step1, processRuleIds);
    if (!l1Rows.length) {
      throw new Error("\u5F00\u653E\u7F16\u7801\u672A\u4EA7\u751F\u6709\u6548 L1 \u7ED3\u679C");
    }
    const step2 = await callZhipuJson(endpoint, apiKey, [
      {
        role: "system",
        content: "\u4F60\u662F\u4E3B\u8F74\u7F16\u7801\u4E13\u5BB6\u3002\u8BF7\u57FA\u4E8E\u6A21\u5F0F\u7F16\u7801\u903B\u8F91\u5C06\u76F8\u4F3C L1 \u6807\u7B7E\u805A\u5408\u4E3A L2 \u7C7B\u76EE\u3002\n\u89C4\u5219\uFF1A" + patternCoding + "\n\u53EF\u7528\u89C4\u5219ID\uFF1A" + allRuleIds.join(", ") + '\n\u53EA\u8F93\u51FA JSON \u6570\u7EC4\uFF0C\u6BCF\u9879\u4E3A {"label":"L2\u7C7B\u76EE","children":["L1\u6807\u7B7E1","L1\u6807\u7B7E2"],"basisId":"\u89C4\u5219ID"}\u3002'
      },
      {
        role: "user",
        content: "\u4EE5\u4E0B\u662F L1 \u6807\u7B7E\uFF08JSON\uFF09\uFF1A\n" + JSON.stringify(l1Rows, null, 2) + "\n\u8BF7\u5B8C\u6210\u805A\u7C7B\u3002"
      }
    ]);
    const l2Rows = normalizeL2Array(step2, allRuleIds);
    if (!l2Rows.length) {
      throw new Error("\u4E3B\u8F74\u7F16\u7801\u672A\u4EA7\u751F\u6709\u6548 L2 \u7ED3\u679C");
    }
    const step3 = await callZhipuJson(endpoint, apiKey, [
      {
        role: "system",
        content: "\u4F60\u662F\u6838\u5FC3\u7F16\u7801\u4E13\u5BB6\u3002\u8BF7\u751F\u6210\u4E00\u4E2A\u6700\u9AD8\u5C42\u7EA7 L3 \u6838\u5FC3\u8303\u7574\uFF0C\u7EDF\u9886\u5168\u90E8 L2 \u7C7B\u76EE\u3002\n\u53EF\u7528\u89C4\u5219ID\uFF1A" + allRuleIds.join(", ") + '\n\u53EA\u8F93\u51FA JSON \u5BF9\u8C61\uFF1A{"coreLabel":"L3\u6838\u5FC3\u6982\u5FF5","children":["L2\u7C7B\u76EE1","L2\u7C7B\u76EE2"],"basisId":"\u89C4\u5219ID"}\u3002'
      },
      {
        role: "user",
        content: "\u4EE5\u4E0B\u662F L2 \u7ED3\u679C\uFF08JSON\uFF09\uFF1A\n" + JSON.stringify(l2Rows, null, 2)
      }
    ]);
    const l3 = normalizeL3(step3, allRuleIds);
    if (!l3) {
      throw new Error("\u6838\u5FC3\u7F16\u7801\u672A\u4EA7\u751F\u6709\u6548 L3 \u7ED3\u679C");
    }
    const payload = buildPayloadFromThreeLevels(l1Rows, l2Rows, l3);
    return new Response(JSON.stringify(payload), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequest, "onRequest");

// api/generate-memo.js
var MODEL2 = "glm-4.5-air";
function flattenText2(value) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(flattenText2).filter(Boolean).join("\uFF1B");
  if (typeof value === "object") {
    return Object.entries(value).map(([k, v]) => `${k}: ${flattenText2(v)}`).filter(Boolean).join("\uFF1B");
  }
  return "";
}
__name(flattenText2, "flattenText");
function parseModelJson2(raw) {
  const text = String(raw || "").trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return JSON.parse(fence ? fence[1].trim() : text);
}
__name(parseModelJson2, "parseModelJson");
async function callZhipu(endpoint, apiKey, messages) {
  const body = { model: MODEL2, temperature: 0.4, messages };
  let response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ...body, response_format: { type: "json_object" } })
  });
  if (response.status === 400) {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  }
  const raw = await response.text();
  const json = JSON.parse(raw);
  if (!response.ok) throw new Error(json?.error?.message || json?.message || "\u4E0A\u6E38\u8BF7\u6C42\u5931\u8D25");
  return parseModelJson2(json?.choices?.[0]?.message?.content || "");
}
__name(callZhipu, "callZhipu");
async function onRequest2(context) {
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }
  if (context.request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const { payload } = await context.request.json();
    if (!payload || !Array.isArray(payload.codes) || !Array.isArray(payload.blocks)) {
      return new Response(JSON.stringify({ error: "\u7F3A\u5C11\u7F16\u7801 payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const apiKey = context.env.ZHIPU_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "\u670D\u52A1\u672A\u914D\u7F6E ZHIPU_API_KEY" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    const codes = payload.codes;
    const blocks = payload.blocks;
    const l3 = codes.filter((c) => Number(c.level) === 3);
    const l1 = codes.filter((c) => Number(c.level) === 1);
    const blockMap = new Map(blocks.map((b) => [b.id, b]));
    const evidence = l1.map((code) => ({
      label: code.name,
      refs: (code.refs || []).slice(0, 3).map((r) => blockMap.get(r.blockId)?.text).filter(Boolean)
    }));
    const saturationRule = flattenText2(academic_knowledge_default).includes("\u7406\u8BBA\u9971\u548C") ? flattenText2(academic_knowledge_default) : "\u7406\u8BBA\u9971\u548C\u5EA6\uFF1A\u5F53\u65B0\u589E\u6837\u672C\u4E0D\u518D\u4EA7\u751F\u65B0\u6982\u5FF5\u6216\u65B0\u5173\u7CFB\u65F6\uFF0C\u53EF\u8BA4\u4E3A\u7406\u8BBA\u8D8B\u4E8E\u9971\u548C\u3002";
    const endpoint = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
    const result = await callZhipu(endpoint, apiKey, [
      {
        role: "system",
        content: '\u4F60\u662F\u793E\u4F1A\u5B66\u8D28\u6027\u7814\u7A76\u5199\u4F5C\u52A9\u624B\u3002\u8BF7\u6A21\u4EFF\u300A\u793E\u4F1A\u5B66\u7814\u7A76\u300B\u8BBA\u6587\u98CE\u683C\uFF0C\u64B0\u5199\u7EA6800\u5B57\u5B66\u672F\u5907\u5FD8\u5F55\u3002\n\u5FC5\u987B\u5305\u542B\u4E09\u4E2A\u90E8\u5206\u6807\u9898\uFF1A\u4E00\u3001\u6570\u636E\u5448\u73B0\uFF1B\u4E8C\u3001\u6982\u5FF5\u5B9A\u4E49\uFF1B\u4E09\u3001\u7406\u8BBA\u9610\u91CA\u3002\n\u987B\u7ED3\u5408\u7406\u8BBA\u9971\u548C\u5EA6\u89C4\u5219\u8FDB\u884C\u53CD\u601D\uFF0C\u907F\u514D\u7A7A\u6CDB\u3002\n\u53EA\u8F93\u51FA JSON \u5BF9\u8C61\uFF1A{"memo":"\u6B63\u6587"}\u3002'
      },
      {
        role: "user",
        content: "L3\u6838\u5FC3\u6982\u5FF5\uFF1A\n" + JSON.stringify(l3.map((x) => x.name), null, 2) + "\n\nL1\u8BC1\u636E\uFF1A\n" + JSON.stringify(evidence, null, 2) + "\n\n\u7406\u8BBA\u9971\u548C\u5EA6\u89C4\u5219\uFF1A\n" + saturationRule.slice(0, 2e3)
      }
    ]);
    const memo = String(result?.memo || "").trim();
    if (!memo) throw new Error("\u6A21\u578B\u672A\u8FD4\u56DE\u5907\u5FD8\u5F55\u6B63\u6587");
    return new Response(JSON.stringify({ memo }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequest2, "onRequest");

// api/model-relations.js
var MODEL3 = "glm-4.5-air";
function flattenText3(value) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(flattenText3).filter(Boolean).join("\uFF1B");
  if (typeof value === "object") {
    return Object.entries(value).map(([k, v]) => `${k}: ${flattenText3(v)}`).filter(Boolean).join("\uFF1B");
  }
  return "";
}
__name(flattenText3, "flattenText");
function parseModelJson3(raw) {
  const text = String(raw || "").trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return JSON.parse(fence ? fence[1].trim() : text);
}
__name(parseModelJson3, "parseModelJson");
async function callZhipu2(endpoint, apiKey, messages) {
  const body = { model: MODEL3, temperature: 0.2, messages };
  let response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ...body, response_format: { type: "json_object" } })
  });
  if (response.status === 400) {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  }
  const raw = await response.text();
  const json = JSON.parse(raw);
  if (!response.ok) throw new Error(json?.error?.message || json?.message || "\u4E0A\u6E38\u8BF7\u6C42\u5931\u8D25");
  return parseModelJson3(json?.choices?.[0]?.message?.content || "");
}
__name(callZhipu2, "callZhipu");
async function onRequest3(context) {
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }
  if (context.request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const { text, nodes } = await context.request.json();
    if (!text || typeof text !== "string" || !Array.isArray(nodes) || !nodes.length) {
      return new Response(JSON.stringify({ error: "\u7F3A\u5C11 text \u6216 nodes" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const apiKey = context.env.ZHIPU_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "\u670D\u52A1\u672A\u914D\u7F6E ZHIPU_API_KEY" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    const endpoint = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
    const knowledgeText = flattenText3(academic_knowledge_default).slice(0, 2500);
    const modelResult = await callZhipu2(endpoint, apiKey, [
      {
        role: "system",
        content: '\u4F60\u662F\u8D28\u6027\u7814\u7A76\u7406\u8BBA\u5173\u7CFB\u5EFA\u6A21\u52A9\u624B\u3002\u8BF7\u6839\u636E\u8BBF\u8C08\u6587\u672C\u4E0E\u7F16\u7801\u6982\u5FF5\uFF0C\u63A8\u65AD\u6982\u5FF5\u95F4\u5173\u7CFB\uFF0C\u7528\u4E8E\u7406\u8BBA\u5EFA\u6A21\u753B\u5E03\u8FDE\u7EBF\u3002\n\u91CD\u8981\uFF1A\u53EA\u8F93\u51FA\u6700\u5F3A\u70C8\u3001\u6700\u5173\u952E\u7684 3-5 \u6761\u5173\u7CFB\uFF08\u4E0D\u8981\u505A\u4E24\u4E24\u76F8\u8FDE\uFF09\u3002\u4F18\u5148\u4FDD\u7559\u80FD\u7EC4\u6210\u6E05\u6670\u56E0\u679C/\u903B\u8F91\u94FE\u6761\u7684\u8FB9\u3002\n\u91CD\u8981\uFF1A\u907F\u514D\u5197\u4F59\u4F20\u9012\u6027\u8FDE\u7EBF\u3002\u82E5\u5DF2\u5B58\u5728 A->B \u4E14 B->C\uFF0C\u5219\u9664\u975E A->C \u6709\u660E\u663E\u72EC\u7ACB\u8BC1\u636E\u6216\u4E0D\u53EF\u66FF\u4EE3\u7684\u89E3\u91CA\u4EF7\u503C\uFF0C\u5426\u5219\u4E0D\u8981\u8F93\u51FA A->C\u3002\n\u5173\u7CFB\u7C7B\u578B\u5EFA\u8BAE\u4F7F\u7528\u4EE5\u4E0B\u96C6\u5408\uFF08\u53EF\u7528\u4E2D\u6587\u6216\u82F1\u6587\u77ED\u6807\u7B7E\uFF0C\u4F46\u8981\u7A33\u5B9A\u3001\u53EF\u8BFB\uFF09\uFF1A\n- \u4F1A\u5BFC\u81F4/\u56E0\u679C\uFF08causal\uFF09\n- \u5F71\u54CD/\u4FC3\u8FDB/\u6291\u5236\uFF08influence\uFF09\n- \u6784\u6210/\u5305\u542B/\u5C5E\u4E8E\uFF08composition\uFF09\n- \u77DB\u76FE/\u51B2\u7A81/\u5F20\u529B\uFF08contradiction\uFF09\n- \u4E2D\u4ECB\uFF08mediator\uFF09\n- \u76F8\u5173\uFF08correlation\uFF09\n\u8F93\u51FA JSON \u5BF9\u8C61\uFF1A{"edges":[{"source":"\u6982\u5FF5A","target":"\u6982\u5FF5B","relationType":"\u5173\u7CFB\u7C7B\u578B","label":"\u663E\u793A\u5728\u8FDE\u7EBF\u4E0A\u7684\u77ED\u53E5\uFF0C\u4F8B\u5982\uFF1A[A] --\u4F1A\u5BFC\u81F4--> [B]","confidence":0.0-1.0,"isEssential":true|false}]}\n\u5176\u4E2D confidence \u8868\u793A\u4F60\u5BF9\u8BE5\u5173\u7CFB\u7684\u786E\u4FE1\u5EA6\uFF080-1\uFF09\uFF0CisEssential \u4EC5\u5728\u8BE5\u8FB9\u5373\u4F7F\u5B58\u5728 A->B->C \u4E5F\u5FC5\u987B\u4FDD\u7559\u65F6\u6807 true\u3002\n\u4F18\u5148\u53C2\u8003\u4EE5\u4E0B\u89C4\u8303\uFF08\u542B\u6761\u4EF6-\u884C\u52A8-\u7ED3\u679C\uFF09\uFF1A\n' + knowledgeText
      },
      {
        role: "user",
        content: "\u8BBF\u8C08\u6587\u672C\uFF1A\n" + text.trim() + "\n\n\u5F85\u5EFA\u6A21\u6982\u5FF5\uFF1A\n" + JSON.stringify(nodes, null, 2)
      }
    ]);
    const edges = Array.isArray(modelResult?.edges) ? modelResult.edges : [];
    const normalized = edges.map((e) => ({
      source: String(e?.source || "").trim(),
      target: String(e?.target || "").trim(),
      relationType: String(e?.relationType || "").trim(),
      label: String(e?.label || "").trim(),
      confidence: Number.isFinite(Number(e?.confidence)) ? Number(e.confidence) : null,
      isEssential: Boolean(e?.isEssential)
    })).filter((e) => e.source && e.target && e.source !== e.target);
    return new Response(JSON.stringify({ edges: normalized }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequest3, "onRequest");

// ../.wrangler/tmp/pages-Dx6wRH/functionsRoutes-0.85899510228051.mjs
var routes = [
  {
    routePath: "/api/analyze",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest]
  },
  {
    routePath: "/api/generate-memo",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest2]
  },
  {
    routePath: "/api/model-relations",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest3]
  }
];

// ../../../AppData/Roaming/npm/node_modules/wrangler/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../../../AppData/Roaming/npm/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");

// ../../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-3zHhpC/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;

// ../../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-3zHhpC/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=functionsWorker-0.4680500104786469.mjs.map
