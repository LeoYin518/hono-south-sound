import jsonContent from "@/lib/json-content.js";
import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@/lib/http-status-codes.js";
import { ResponseCommon, ResponseWithData } from "@/utils/zodschema/common.schema.js"
import { ClientLoginDTO } from "./dto/login.dto.js";
import { ClientTokenSchema } from "./vo/response.vo.js";

const tags = ["用户-登录接口"];

export const login = createRoute({
    path: "/login",
    method: "post",
    tags,
    request: {
        body: jsonContent(ClientLoginDTO, "用户-登录参数")
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseWithData(ClientTokenSchema), "用户-登录"),
        [HttpStatusCodes.UNAUTHORIZED]: jsonContent(ResponseCommon, "未授权"),
    },
})

export const logout = createRoute({
    path: "/logout",
    method: "post",
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseCommon, "用户-退出登录"),
        [HttpStatusCodes.UNAUTHORIZED]: jsonContent(ResponseCommon, "未授权"),
    },
})

export type LoginRoute = typeof login
export type LogoutRoute = typeof logout

