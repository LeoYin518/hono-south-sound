import jsonContent from "@/lib/json-content.js";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@/lib/http-status-codes.js";
import { ParamSchemaId, ResponseCommon, ResponseWithData } from "@/utils/zodschema/common.schema.js"
import { CourseCreateDTO, CourseUpdateDTO } from "./dto/create.dto.js";
import { CourseDetailWithUserSelectSchema } from "./vo/response.vo.js";


const tags = ["管理员-课程接口"];

export const addHandler = createRoute({
    path: "/add",
    method: "post",
    tags,
    request: {
        body: jsonContent(CourseCreateDTO, "添加课程参数")
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseCommon, "管理员-新增课程"),
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
        [HttpStatusCodes.OK]: jsonContent(ResponseCommon, "管理员-删除课程（软删）")
    }
})

export const updateHandler = createRoute({
    path: "/update/{id}",
    method: "put",
    tags,
    request: {
        params: ParamSchemaId,
        body: jsonContent(CourseUpdateDTO, "编辑课程参数")
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseCommon, "管理员-编辑课程")
    }
})

export const list = createRoute({
    path: "/list",
    method: "get",
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseWithData(z.array(CourseDetailWithUserSelectSchema)), "管理员-查询课程列表")
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
        [HttpStatusCodes.OK]: jsonContent(ResponseWithData(CourseDetailWithUserSelectSchema), "管理员-查询课程详情")
    }
})

export type AddHandlerRoute = typeof addHandler
export type DeleteHandlerRoute = typeof deleteHandler
export type UpdateHandlerRoute = typeof updateHandler
export type ListRoute = typeof list
export type DetailRoute = typeof detail