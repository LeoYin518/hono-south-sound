import jsonContent from "@/lib/json-content.js";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@/lib/http-status-codes.js";

const tags = ["课程接口"];

export const addHandler = createRoute({
    path: "/add",
    method: "post",
    tags,
    request: {
        body: jsonContent(z.object({
            username: z.string().min(1),
            gender: z.number().refine((val) => [1, 2, 3].includes(val)),
        }), "添加课程参数")
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.object({
                code: z.number(),
                message: z.string(),
            }), "管理员新增课程")
    }
})

export const deleteHandler = createRoute({
    path: "/delete",
    method: "delete",
    tags,
    request: {
        body: jsonContent(z.object({
            username: z.string().min(1),
            gender: z.number().refine((val) => [1, 2, 3].includes(val)),
        }), "删除课程参数")
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.object({
                code: z.number(),
                message: z.string(),
            }), "管理员删除课程")
    }
})

export const updateHandler = createRoute({
    path: "/update",
    method: "put",
    tags,
    request: {
        body: jsonContent(z.object({
            username: z.string().min(1),
            gender: z.number().refine((val) => [1, 2, 3].includes(val)),
        }), "删除课程参数")
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.object({
                code: z.number(),
                message: z.string(),
            }), "管理员删除课程")
    }
})

export const list = createRoute({
    path: "/list",
    method: "get",
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.object({
                code: z.number(),
                message: z.string(),
                data: z.array(z.object({
                    id: z.number(),
                    title: z.string()
                })),
            }), "接口描述")
    }
})

export const detail = createRoute({
    path: "/detail",
    method: "get",
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.object({
                code: z.number(),
                message: z.string(),
                data: z.array(z.object({
                    id: z.number(),
                    title: z.string()
                })),
            }), "接口描述")
    }
})



export type AddHandlerRoute = typeof addHandler
export type DeleteHandlerRoute = typeof deleteHandler
export type UpdateHandlerRoute = typeof updateHandler
export type ListRoute = typeof list
export type DetailRoute = typeof detail