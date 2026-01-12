import jsonContent from "@/lib/json-content.js";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@/lib/http-status-codes.js";
import { FormDataSchema, ResponseWithData } from "@/utils/zodschema/common.schema.js"
import { OssUrlSchema } from "./vo/response.vo.js";


const tags = ["阿里云OSS服务接口"];

export const uploadHandler = createRoute({
    path: "/common-upload",
    method: "post",
    tags,
    request: FormDataSchema,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseWithData(OssUrlSchema), "阿里云OSS-上传接口"),
    },
})

export type UploadHandlerRoute = typeof uploadHandler
