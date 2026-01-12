import { z } from "@hono/zod-openapi"

export const CategoryCreateDTO = z.object({
    title: z.string().min(1),
    description: z.string().min(1).optional(),
    remark: z.string().optional(),
})

export const CategoryUpdateDTO = z.object({
    title: z.string().min(1),
    description: z.string().min(1).optional(),
    remark: z.string().optional(),
})