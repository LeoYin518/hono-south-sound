import { z } from "@hono/zod-openapi";

const createMessageSchema = (data: z.ZodTypeAny, code: number = 200) => {
    return z.object({
        code: z.number().default(code),
        message: z.string().default("操作成功"),
        data
    })
}
export default createMessageSchema;
