import { z } from "@hono/zod-openapi"

export const NoticeCreateDTO = z.object({
    title: z.string().min(1),
    content: z.string().optional(),
    sort: z.number().int().min(0).optional(),
    remark: z.string().optional(),
})

export const NoticeUpdateDTO = z.object({
    title: z.string().min(1),
    content: z.string().optional(),
    status: z.number().int().min(0).max(2).optional(),
    sort: z.number().int().min(0).optional(),
    remark: z.string().optional(),
})
