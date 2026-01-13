import { z } from "@hono/zod-openapi"

export const ChapterCreateDTO = z.object({
    chapterNumber: z.number().int().min(1),
    title: z.string().min(1),
    content: z.string().optional(),
    courseId: z.number(),
    video: z.url().optional(),
    sort: z.number().int().min(0).optional(),
})

export const ChapterUpdateDTO = z.object({
    chapterNumber: z.number().int().min(1),
    title: z.string().min(1),
    content: z.string().optional(),
    video: z.url().optional(),
    status: z.number().int().min(0).max(2).optional(),
    sort: z.number().int().min(0).optional(),
})
