import jsonContent from "@/lib/json-content.js";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@/lib/http-status-codes.js";
import { ParamSchemaId, ResponseCommon, ResponseWithData } from "@/utils/zodschema/common.schema.js"
import { NoticeCreateDTO, NoticeUpdateDTO } from "./dto/create.dto.js";
import { NoticeDetailSelectSchema, NoticeListItemSelectSchema } from "./vo/response.vo.js";

const tags = ["管理员-通知接口"];

const QuerySchemaPageSize = z.object({
    page: z.string().optional().openapi({ param: { name: "page", in: "query" } }),
    size: z.string().optional().openapi({ param: { name: "size", in: "query" } }),
})

export const addHandler = createRoute({
    path: "/add",
    method: "post",
    tags,
    request: {
        body: jsonContent(NoticeCreateDTO, "添加通知参数")
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseCommon, "管理员-新增通知"),
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
        [HttpStatusCodes.OK]: jsonContent(ResponseCommon, "管理员-删除通知（软删）")
    }
})

export const updateHandler = createRoute({
    path: "/update/{id}",
    method: "put",
    tags,
    request: {
        params: ParamSchemaId,
        body: jsonContent(NoticeUpdateDTO, "编辑通知参数")
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseCommon, "管理员-编辑通知")
    }
})

export const list = createRoute({
    path: "/list",
    method: "get",
    tags,
    request: {
        query: QuerySchemaPageSize,
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseWithData(z.array(NoticeListItemSelectSchema)), "管理员-查询通知列表")
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
        [HttpStatusCodes.OK]: jsonContent(ResponseWithData(NoticeDetailSelectSchema), "管理员-查询通知详情")
    }
})

export type AddHandlerRoute = typeof addHandler
export type DeleteHandlerRoute = typeof deleteHandler
export type UpdateHandlerRoute = typeof updateHandler
export type ListRoute = typeof list
export type DetailRoute = typeof detail
