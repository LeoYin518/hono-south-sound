import { createRouter } from "@/lib/create-app.js";
import * as handlers from "./category.handler.js";
import * as routes from "./category.routes.js";

const router = createRouter()
    .openapi(routes.list, handlers.list)

export default router

