import { z } from "@hono/zod-openapi"

export const OssUrlSchema = z.object({
    url: z.string(),
    key: z.string(),
    name: z.string(),
    size: z.number(),
    mime: z.string(),
})
