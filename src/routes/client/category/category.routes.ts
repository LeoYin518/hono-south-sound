import jsonContent from "@/lib/json-content.js";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@/lib/http-status-codes.js";
import { ResponseWithData } from "@/utils/zodschema/common.schema.js"
import { CategoryListItemSchema } from "./vo/response.vo.js";

const tags = ["用户-类别接口"];

export const list = createRoute({
    path: "/list",
    method: "get",
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseWithData(z.array(CategoryListItemSchema)), "用户-查询所有类别"),
    }
})

export type ListRoute = typeof list

