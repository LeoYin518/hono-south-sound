import { z } from "@hono/zod-openapi"

export const AdminLoginDTO = z.object({
    loginName: z.string().min(1),
    password: z.string().min(1),
})
