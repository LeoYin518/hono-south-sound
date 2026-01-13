import jsonContent from "@/lib/json-content.js";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@/lib/http-status-codes.js";
import { ParamSchemaId, ResponseCommon, ResponseWithData } from "@/utils/zodschema/common.schema.js"
import { ChapterDetailSelectSchema } from "./vo/response.vo.js";
import { ChapterCreateDTO, ChapterUpdateDTO } from "./dto/create.dto.js";

const tags = ["管理员-章节接口"];

export const addHandler = createRoute({
    path: "/add",
    method: "post",
    tags,
    request: {
        body: jsonContent(ChapterCreateDTO, "添加章节参数")
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseCommon, "管理员-新增章节"),
    },
})

export const deleteHandler = createRoute({
    path: "/delete/{id}",
    method: "delete",
    tags,
    request: {
        params: ParamSchemaId
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseCommon, "管理员-删除章节（软删）")
    }
})

export const updateHandler = createRoute({
    path: "/update/{id}",
    method: "put",
    tags,
    request: {
        params: ParamSchemaId,
        body: jsonContent(ChapterUpdateDTO, "编辑章节参数")
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseCommon, "管理员-编辑章节")
    }
})

export const list = createRoute({
    path: "/list/{id}",
    method: "get",
    tags,
    request: {
        params: ParamSchemaId,
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseWithData(z.array(ChapterDetailSelectSchema)), "管理员-查询章节列表")
    }
})

export const detail = createRoute({
    path: "/detail/{id}",
    method: "get",
    tags,
    request: {
        params: ParamSchemaId,
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseWithData(ChapterDetailSelectSchema), "管理员-查询章节详情")
    }
})

export type AddHandlerRoute = typeof addHandler
export type DeleteHandlerRoute = typeof deleteHandler
export type UpdateHandlerRoute = typeof updateHandler
export type ListRoute = typeof list
export type DetailRoute = typeof detail
