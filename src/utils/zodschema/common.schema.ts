import { z } from "@hono/zod-openapi"

export const ParamSchemaId = z.object({
    id: z.string().openapi({ param: { name: "id", in: "path" } })
})

export const ResponseCommon = z.object({
    code: z.number(),
    message: z.string(),
})

export const ResponseWithData = (data: any) => {
    return z.object({
        code: z.number(),
        message: z.string(),
        data,
    })
}
