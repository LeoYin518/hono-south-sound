import db from "@/db/index.js";
import type { AddHandlerRoute, DeleteHandlerRoute, DetailRoute, ListRoute, UpdateHandlerRoute } from "./course.routes.js";
import * as HttpStatusCodes from "@/lib/http-status-codes.js";
import type { AppRouteHandler } from "@/lib/types.js";

export const addHandler: AppRouteHandler<AddHandlerRoute> = async (c) => {
    const { username, gender } = await c.req.json()
    return c.json({
        code: HttpStatusCodes.OK,
        message: "操作成功",
    }, HttpStatusCodes.OK)
}

export const deleteHandler: AppRouteHandler<DeleteHandlerRoute> = async (c) => {
    const { username, gender } = await c.req.json()
    return c.json({
        code: HttpStatusCodes.OK,
        message: "操作成功",
    }, HttpStatusCodes.OK)
}

export const updateHandler: AppRouteHandler<UpdateHandlerRoute> = async (c) => {
    const { username, gender } = await c.req.json()
    return c.json({
        code: HttpStatusCodes.OK,
        message: "操作成功",
    }, HttpStatusCodes.OK)
}

export const list: AppRouteHandler<ListRoute> = (c) => {
    return c.json({
        code: HttpStatusCodes.OK,
        message: "操作成功",
        data: [
            { id: 1001, title: "Demo 1" },
            { id: 1002, title: "Demo 2" },
            { id: 1003, title: "Demo 3" },
        ]
    }, HttpStatusCodes.OK)
}

export const detail: AppRouteHandler<DetailRoute> = (c) => {
    return c.json({
        code: HttpStatusCodes.OK,
        message: "操作成功",
        data: [
            { id: 1001, title: "Demo 1" },
            { id: 1002, title: "Demo 2" },
            { id: 1003, title: "Demo 3" },
        ]
    }, HttpStatusCodes.OK)
}

