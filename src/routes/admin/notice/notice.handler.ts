import db from "@/db/index.js";
import type { AddHandlerRoute, DeleteHandlerRoute, DetailRoute, ListRoute, UpdateHandlerRoute } from "./notice.routes.js";
import type { AppRouteHandler } from "@/lib/types.js";
import { notice } from "@/db/schema.js";
import { and, desc, eq, ne, sql } from "drizzle-orm";
import { R } from "@/utils/response.js";
import { parsePagination } from "@/utils/pagination.js";

export const addHandler: AppRouteHandler<AddHandlerRoute> = async (c) => {
    const { title, content, sort, remark } = await c.req.json()

    const result = await db.insert(notice).values({
        title,
        content,
        status: 0,
        sort: sort ?? 0,
        remark,
        userId: c.get("auth")?.userId,
    })

    return R.ok(c, result)
}

export const deleteHandler: AppRouteHandler<DeleteHandlerRoute> = async (c) => {
    const id = c.req.param('id')
    const exists = await db.select().from(notice).where(and(eq(notice.id, +id), ne(notice.status, 2)))
    if (exists.length === 0) {
        return R.err(c, "记录不存在")
    }

    await db.update(notice).set({ status: 2, updatedAt: sql`(current_timestamp)` }).where(eq(notice.id, +id))
    return R.ok(c)
}

export const updateHandler: AppRouteHandler<UpdateHandlerRoute> = async (c) => {
    const id = c.req.param('id')
    const exists = await db.select().from(notice).where(and(eq(notice.id, +id)))
    if (exists.length === 0) {
        return R.err(c, "通知不存在")
    }

    const { title, content, status, sort, remark } = await c.req.json()

    const updateValues: Record<string, any> = {
        title,
        updatedAt: sql`(current_timestamp)`,
    }

    if (content !== undefined) updateValues.content = content
    if (status !== undefined) updateValues.status = status
    if (sort !== undefined) updateValues.sort = sort
    if (remark !== undefined) updateValues.remark = remark

    await db.update(notice).set(updateValues).where(eq(notice.id, +id))
    return R.ok(c)
}

export const list: AppRouteHandler<ListRoute> = async (c) => {
    const pagination = parsePagination({
        page: c.req.query('page'),
        size: c.req.query('size'),
    })
    if (!pagination.ok) {
        return R.err(c, pagination.message)
    }

    const rows = await db.select({
        id: notice.id,
        title: notice.title,
        createdAt: notice.createdAt,
        updatedAt: notice.updatedAt,
    })
        .from(notice)
        .orderBy(desc(notice.id))
        .limit(pagination.size)
        .offset(pagination.offset)
    return R.ok(c, rows)
}

export const detail: AppRouteHandler<DetailRoute> = async (c) => {
    const id = c.req.param('id')
    const rows = await db.select()
        .from(notice)
        .where(and(eq(notice.id, +id)))
    if (rows.length === 0) {
        return R.err(c, "通知不存在")
    }
    return R.ok(c, rows[0])
}
