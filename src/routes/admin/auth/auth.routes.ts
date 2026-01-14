import jsonContent from "@/lib/json-content.js";
import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@/lib/http-status-codes.js";
import { ResponseCommon, ResponseWithData } from "@/utils/zodschema/common.schema.js"
import { AdminLoginDTO } from "./dto/login.dto.js";
import { AdminTokenSchema } from "./vo/response.vo.js";

const tags = ["管理员-登录接口"];

export const login = createRoute({
    path: "/login",
    method: "post",
    tags,
    request: {
        body: jsonContent(AdminLoginDTO, "管理员-登录参数")
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseWithData(AdminTokenSchema), "管理员-登录"),
        [HttpStatusCodes.UNAUTHORIZED]: jsonContent(ResponseCommon, "未授权"),
    },
})

export const logout = createRoute({
    path: "/logout",
    method: "post",
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(ResponseCommon, "管理员-退出登录"),
        [HttpStatusCodes.UNAUTHORIZED]: jsonContent(ResponseCommon, "未授权"),
    },
})

export type LoginRoute = typeof login
export type LogoutRoute = typeof logout
