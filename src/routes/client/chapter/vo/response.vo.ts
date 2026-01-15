import { z } from "@hono/zod-openapi";

export const ClientChapterListItemSchema = z.object({
    id: z.number(),
    title: z.string(),
})

export const ClientChapterDetailSchema = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string().nullable(),
    video: z.string().nullable(),
    chapterNumber: z.number(),
    createdAt: z.string(),
    course: z.object({
        id: z.number(),
        title: z.string(),
    }),
    author: z.object({
        id: z.number(),
        nickname: z.string().nullable(),
        avatar: z.string().nullable(),
    }),
})

