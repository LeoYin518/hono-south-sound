import jsonContent from "@/lib/json-content.js";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@/lib/http-status-codes.js";

const tags = ["Demo"];

export const list = createRoute({
    path: "/demo",
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

export const add = createRoute({
    path: "/add",
    method: "post",
    tags,
    request: {
        body: jsonContent(z.object({
            username: z.string().min(1),
            gender: z.number().refine((val) => [1, 2, 3].includes(val)),
        }), "添加test参数")
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.object({
                code: z.number(),
                message: z.string(),
            }), "接口描述")
    }
})

export type ListRoute = typeof list
export type AddRoute = typeof add