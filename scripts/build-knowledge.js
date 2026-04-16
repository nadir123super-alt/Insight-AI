const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.join(__dirname, '../library/raw-input.txt');
const DATA_DIR = path.join(__dirname, '../src/data');
const OUTPUT_FILE = path.join(DATA_DIR, 'academic-knowledge.json');
const API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
const ZHIPU_API_KEY = process.env.ZHIPU_API_KEY;

async function buildKnowledge() {
    console.log("🚀 启动 Insight-AI 知识提取引擎...");

    if (!fs.existsSync(INPUT_FILE) || fs.readFileSync(INPUT_FILE, 'utf-8').trim() === "") {
        console.log("⚠️ 提示：library/raw-input.txt 是空的，请粘贴内容后再运行。");
        return;
    }

    const rawContent = fs.readFileSync(INPUT_FILE, 'utf-8');

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${ZHIPU_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "glm-4.5-air",
                messages: [
                    { role: "system", content: "你是一个资深社会学专家，请将文本转化为 JSON。直接输出 JSON，不要 Markdown 格式。" },
                    { role: "user", content: rawContent }
                ],
                temperature: 0.1
            })
        });

        const data = await response.json();

        // --- 新增：错误诊断监控 ---
        if (data.error) {
            console.error("❌ 智谱 API 报错了：", data.error.message);
            return;
        }

        if (!data.choices || data.choices.length === 0) {
            console.error("❌ AI 没有返回有效结果，完整的 API 响应如下：", JSON.stringify(data));
            return;
        }
        // -----------------------

        const resultString = data.choices[0].message.content.trim();
        const result = JSON.parse(resultString.replace(/```json|```/g, ''));

        if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

        let database = [];
        if (fs.existsSync(OUTPUT_FILE)) {
            const content = fs.readFileSync(OUTPUT_FILE, 'utf-8');
            database = content ? JSON.parse(content) : [];
        }
        database.push(result);

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(database, null, 2), 'utf-8');
        console.log(`✅ 入库成功！主题：[${result.topic}]`);
        fs.writeFileSync(INPUT_FILE, '', 'utf-8');

    } catch (error) {
        console.error("❌ 运行中出现技术故障：", error.message);
    }
}

buildKnowledge();