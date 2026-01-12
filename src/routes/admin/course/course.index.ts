import { createRouter } from "@/lib/create-app.js";
import * as handlers from "./course.handler.js";
import * as routes from "./course.routes.js";

const router = createRouter()
    .openapi(routes.addHandler, handlers.addHandler)
    .openapi(routes.deleteHandler, handlers.deleteHandler)
    .openapi(routes.updateHandler, handlers.updateHandler)
    .openapi(routes.list, handlers.list)
    .openapi(routes.detail, handlers.detail)

export default router