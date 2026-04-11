export async function onRequest(context) {
   // 处理预检请求 (CORS)
   if (context.request.method === "OPTIONS") {
     return new Response(null, {
       headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "POST, OPTIONS",
         "Access-Control-Allow-Headers": "Content-Type",
       },
     });
   }
  
   // 只处理 POST 请求
   if (context.request.method === "POST") {
     try {
       const { text } = await context.request.json();
       const apiKey = context.env.ZHIPU_API_KEY;
  
       const response = await fetch("https://open.bigmodel.cn/api/paas/v4/chat/completions", {
         method: "POST",
         headers: {
           "Authorization": `Bearer ${apiKey}`,
           "Content-Type": "application/json"
         },
         body: JSON.stringify({
           model: "glm-4.5-air",
           messages: [
             { role: "system", content: "你是一个社会学研究专家，请对输入的文本进行三级编码。" },
             { role: "user", content: text }
           ]
         })
       });
  
       const data = await response.json();
       return new Response(JSON.stringify(data), {
         headers: { "Content-Type": "application/json" }
       });
     } catch (err) {
       return new Response(JSON.stringify({ error: err.message }), { status: 500 });
     }
   }
  
   return new Response("Method Not Allowed", { status: 405 });
 }