import { createRouter } from "@/lib/create-app.js";
import * as handlers from "./chapter.handler.js";
import * as routes from "./chapter.routes.js";

const router = createRouter()
    .openapi(routes.listByCourse, handlers.listByCourse)
    .openapi(routes.detail, handlers.detail)

export default router

