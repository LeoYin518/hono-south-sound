import db from "@/db/index.js";
import type { AddRoute, ListRoute } from "./demo.routes.js";
import * as HttpStatusCodes from "@/lib/http-status-codes.js";
import type { AppRouteHandler } from "@/lib/types.js";
import { test } from "@/db/schema.js";

export const list: AppRouteHandler<ListRoute> = (c) => {
    c.var.logger.error("Handling /demo request");
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

export const add: AppRouteHandler<AddRoute> = async (c) => {
    const { username, gender } = await c.req.json()
    await db.insert(test).values({
        username,
        gender,
    })
    return c.json({
        code: HttpStatusCodes.OK,
        message: "操作成功",
    }, HttpStatusCodes.OK)
}