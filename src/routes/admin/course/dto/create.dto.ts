import { z } from "@hono/zod-openapi"

export const CourseCreateDTO = z.object({
    title: z.string().min(1),
    cover: z.url().optional(),
    categoryId: z.number(),
    tags: z.array(z.string()).optional(),
    description: z.string().min(1).optional(),
    type: z.number().int().min(0).max(1).optional(),
    price: z.number().min(0).optional(),
    sort: z.number().int().min(0).optional(),
})

export const CourseUpdateDTO = z.object({
    title: z.string().min(1).optional(),
    cover: z.url().optional(),
    categoryId: z.number(),
    tags: z.array(z.string()).optional(),
    description: z.string().min(1).optional(),
    type: z.number().int().min(0).max(1).optional(),
    price: z.number().min(0).optional(),
    status: z.number().int().min(0).max(2).optional(),
    sort: z.number().int().min(0).optional(),
})
