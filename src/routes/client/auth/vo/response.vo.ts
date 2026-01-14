import { z } from "@hono/zod-openapi";

export const ClientTokenSchema = z.object({
    token: z.string().min(1),
    expiresIn: z.number().int().min(1),
})
