import jsonContent from "@/lib/json-content.js";
import * as HttpStatusCodes from "@/lib/http-status-codes.js";
import { createRoute, z } from "@hono/zod-openapi";
import { ParamSchemaId, ResponseCommon, ResponseWithData } from "@/utils/zodschema/common.schema.js";
import { ClientChapterDetailSchema, ClientChapterListItemSchema } from "./vo/response.vo.js";

const tags = ["用户-章节接口"];

export const listByCourse = createRoute({
    path: "/listByCourse/{id}",
    method: "get",
    tags,
    request: {
        params: ParamSchemaId,
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseWithData(z.array(ClientChapterListItemSchema)), "用户-根据课程ID查询章节列表"),
        [HttpStatusCodes.BAD_REQUEST]: jsonContent(ResponseCommon, "参数错误"),
    },
})

export const detail = createRoute({
    path: "/detail/{id}",
    method: "get",
    tags,
    request: {
        params: ParamSchemaId,
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseWithData(ClientChapterDetailSchema), "用户-根据章节ID查询章节详情"),
        [HttpStatusCodes.BAD_REQUEST]: jsonContent(ResponseCommon, "参数错误"),
    },
})

export type ListByCourseRoute = typeof listByCourse
export type DetailRoute = typeof detail

