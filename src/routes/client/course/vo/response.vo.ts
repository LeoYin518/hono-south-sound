import { z } from "@hono/zod-openapi";

export const ClientCourseListItemSchema = z.object({
    id: z.number(),
    title: z.string(),
    cover: z.string().nullable(),
    tags: z.any().nullable(),
    description: z.string().nullable(),
    type: z.number(),
    price: z.number(),
    createdAt: z.string(),
})

export const ClientCourseListByCategoryResponseSchema = z.object({
    list: ClientCourseListItemSchema.array(),
    page: z.number(),
    size: z.number(),
    total: z.number(),
})

