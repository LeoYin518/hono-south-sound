import jsonContent from "@/lib/json-content.js";
import * as HttpStatusCodes from "@/lib/http-status-codes.js";
import { createRoute, z } from "@hono/zod-openapi";
import { ParamSchemaId, QuerySchemaPageSize, ResponseCommon, ResponseWithData } from "@/utils/zodschema/common.schema.js";
import { ClientCourseListByCategoryResponseSchema } from "./vo/response.vo.js";

const tags = ["用户-课程接口"];


export const listByCategory = createRoute({
    path: "/listByCategory/{id}",
    method: "get",
    tags,
    request: {
        params: ParamSchemaId,
        query: QuerySchemaPageSize,
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseWithData(ClientCourseListByCategoryResponseSchema), "用户-根据类别ID查询课程列表"),
        [HttpStatusCodes.BAD_REQUEST]: jsonContent(ResponseCommon, "参数错误"),
    },
})

export type ListByCategoryRoute = typeof listByCategory

