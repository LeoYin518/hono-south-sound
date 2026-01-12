import jsonContent from "@/lib/json-content.js";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@/lib/http-status-codes.js";
import { ParamSchemaId, ResponseCommon, ResponseWithData } from "@/utils/zodschema/common.schema.js"
import { CategoryDetailWithUserSelectSchema } from "@/routes/admin/category/vo/response.vo.js"
import { CategoryCreateDTO, CategoryUpdateDTO } from "./dto/create.dto.js";


const tags = ["管理员-类别接口"];

export const addHandler = createRoute({
    path: "/add",
    method: "post",
    tags,
    request: {
        body: jsonContent(CategoryCreateDTO, "添加类别参数")
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseCommon, "管理员-新增类别"),
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
        [HttpStatusCodes.OK]: jsonContent(ResponseCommon, "管理员-删除类别（硬删）")
    }
})

export const updateHandler = createRoute({
    path: "/update/{id}",
    method: "put",
    tags,
    request: {
        params: ParamSchemaId,
        body: jsonContent(CategoryUpdateDTO, "编辑类别参数")
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseCommon, "管理员-编辑类别")
    }
})

export const list = createRoute({
    path: "/list",
    method: "get",
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseWithData(z.array(CategoryDetailWithUserSelectSchema)), "管理员-查询类别列表")
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
        [HttpStatusCodes.OK]: jsonContent(ResponseWithData(CategoryDetailWithUserSelectSchema), "管理员-查询类别详情")
    }
})

export type AddHandlerRoute = typeof addHandler
export type DeleteHandlerRoute = typeof deleteHandler
export type UpdateHandlerRoute = typeof updateHandler
export type ListRoute = typeof list
export type DetailRoute = typeof detail