export async function onRequest(context) {
    const { request, env } = context;

    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    const ZHIPU_API_KEY = env.ZHIPU_API_KEY;
    if (!ZHIPU_API_KEY) {
        return new Response(JSON.stringify({ error: 'ZHIPU_API_KEY is not set in environment variables.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { text } = await request.json();
        if (!text) {
            return new Response(JSON.stringify({ error: 'Missing text in request body.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const apiUrl = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ZHIPU_API_KEY}`
        };

        const systemPrompt = `你是一个社会学访谈编码工具。请对输入的访谈文本进行三级编码。请严格按照以下步骤进行：
1. 一级标签 (Open Coding): 从文本中识别出关键概念和初始想法，用简洁的词语或短语概括。
2. 二级范畴 (Axial Coding): 将一级标签归纳、整合到更抽象的范畴中，找出它们之间的联系。
3. 三级核心 (Selective Coding): 从二级范畴中提炼出核心概念或主题，能够解释访谈的整体意义。

请严格以 JSON 格式返回结果，格式如下：
{
  "一级标签": [
    "标签1",
    "标签2"
  ],
  "二级范畴": [
    {
      "范畴名称": "范畴A",
      "包含标签": [
        "标签1",
        "标签2"
      ]
    }
  ],
  "三级核心": "核心主题"
}

请确保所有标签、范畴和核心主题都清晰、准确，并与访谈文本内容紧密相关。`;

        const body = JSON.stringify({
            model: "glm-4-air", // Using glm-4-air as glm-4.5-air might be a future model or a typo, glm-4-air is currently available.
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: text }
            ]
        });

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('智谱 AI API 错误:', errorData);
            return new Response(JSON.stringify({ error: `智谱 AI API 调用失败: ${errorData.msg || response.statusText}` }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const zhipuData = await response.json();
        // Assuming zhipuData.choices[0].message.content contains the JSON string
        const aiResponseContent = zhipuData.choices[0].message.content;
        
        // Attempt to parse the AI's response to ensure it's valid JSON
        let parsedAiResponse;
        try {
            parsedAiResponse = JSON.parse(aiResponseContent);
        } catch (jsonError) {
            console.error('AI 返回内容不是有效的 JSON:', aiResponseContent, jsonError);
            return new Response(JSON.stringify({ error: 'AI 返回内容不是有效的 JSON 格式。' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify(parsedAiResponse), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('处理请求时发生错误:', error);
        return new Response(JSON.stringify({ error: '内部服务器错误。' + error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
