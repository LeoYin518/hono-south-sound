import { createRouter } from "@/lib/create-app.js";
import * as handlers from "./course.handler.js";
import * as routes from "./course.routes.js";

const router = createRouter()
    .openapi(routes.listByCategory, handlers.listByCategory)

export default router

