import { readFile } from "node:fs/promises";
import { generateConsensusCode } from "../functions/lib/consensus-coding.js";

async function loadEnvKey() {
  if (process.env.ZHIPU_API_KEY) {
    return process.env.ZHIPU_API_KEY;
  }

  try {
    const envRaw = await readFile(new URL("../.env", import.meta.url), "utf8");
    const line = envRaw
      .split(/\r?\n/)
      .map((x) => x.trim())
      .find((x) => x.startsWith("ZHIPU_API_KEY="));
    if (!line) return "";
    const key = line.slice("ZHIPU_API_KEY=".length).trim().replace(/^['"]|['"]$/g, "");
    return key;
  } catch {
    return "";
  }
}

async function loadSampleText() {
  try {
    const sample = await readFile(new URL("../library/raw-input.txt", import.meta.url), "utf8");
    if (sample.trim()) return sample.trim();
  } catch {
    // ignore and fallback
  }
  return "我最近总是加班到很晚，回家后不想说话，周末也只是躺着刷手机，感觉和朋友越来越疏远。";
}

async function main() {
  const apiKey = await loadEnvKey();
  if (!apiKey) {
    throw new Error("未找到 ZHIPU_API_KEY，请在环境变量或 .env 中配置后重试。");
  }

  const text = await loadSampleText();
  console.log("=== Consensus Coding Input ===");
  console.log(text);

  const result = await generateConsensusCode(text, { apiKey });

  console.log("\n=== Stage 1: Coder A ===");
  console.log(JSON.stringify(result.coderA, null, 2));

  console.log("\n=== Stage 1: Coder B ===");
  console.log(JSON.stringify(result.coderB, null, 2));

  console.log("\n=== Stage 2: Mediator Final Decision ===");
  console.log(JSON.stringify(result.finalDecision, null, 2));

  console.log("\n=== Final Structured Payload ===");
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error("Consensus coding test failed:");
  console.error(error?.message || error);
  process.exit(1);
});
