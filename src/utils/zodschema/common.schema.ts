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

export const FormDataSchema = {
    body: {
        content: {
            'multipart/form-data': {
                schema: z.object({
                    file: z.any().openapi({ type: 'string', format: 'binary' }),
                }),
            },
        },
    },
}

export const QuerySchemaPageSize = z.object({
    page: z.string().optional().openapi({ param: { name: "page", in: "query" } }),
    size: z.string().optional().openapi({ param: { name: "size", in: "query" } }),
})
