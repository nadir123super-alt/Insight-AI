import { onRequest as __api_analyze_js_onRequest } from "C:\\Users\\Lenovo\\Desktop\\Insight-AI\\functions\\api\\analyze.js"
import { onRequest as __api_generate_memo_js_onRequest } from "C:\\Users\\Lenovo\\Desktop\\Insight-AI\\functions\\api\\generate-memo.js"
import { onRequest as __api_model_relations_js_onRequest } from "C:\\Users\\Lenovo\\Desktop\\Insight-AI\\functions\\api\\model-relations.js"

export const routes = [
    {
      routePath: "/api/analyze",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_analyze_js_onRequest],
    },
  {
      routePath: "/api/generate-memo",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_generate_memo_js_onRequest],
    },
  {
      routePath: "/api/model-relations",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_model_relations_js_onRequest],
    },
  ]