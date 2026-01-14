import { z } from "@hono/zod-openapi"

export const ClientLoginDTO = z.object({
    loginName: z.string().min(1),
    password: z.string().min(1),
})

