import db from "@/db/index.js";
import type { AddHandlerRoute, DeleteHandlerRoute, DetailRoute, ListRoute, UpdateHandlerRoute } from "./category.routes.js";
import type { AppRouteHandler } from "@/lib/types.js";
import { category, course, user } from "@/db/schema.js";
import { eq, desc, and, ne } from "drizzle-orm";
import { R } from "@/utils/response.js";

export const addHandler: AppRouteHandler<AddHandlerRoute> = async (c) => {
    const { title, description, remark } = await c.req.json()
    const exists = await db.select().from(category).where(eq(category.title, title))
    if (exists.length !== 0) {
        return R.err(c, "类别已存在")
    }
    const result = await db.insert(category).values({
        title,
        description,
        remark,
        userId: 1,
    })
    return R.ok(c, result)
}

export const deleteHandler: AppRouteHandler<DeleteHandlerRoute> = async (c) => {
    const id = c.req.param('id')
    const exists = await db.select().from(course).where(eq(course.categoryId, +id))
    if (exists.length !== 0) {
        return R.err(c, "该类别下有课程，请先删除课程")
    }
    const result = await db.delete(category).where(eq(category.id, +id))
    return result.changes > 0 ? R.ok(c) : R.err(c, "记录不存在")
}

export const updateHandler: AppRouteHandler<UpdateHandlerRoute> = async (c) => {
    const id = c.req.param('id')
    const exists = await db.select().from(category).where(eq(category.id, +id))
    if (exists.length === 0) {
        return R.err(c, "类别不存在")
    }
    const { title, description, remark } = await c.req.json()
    const titleExists = await db.select()
        .from(category)
        .where(and(eq(category.title, title), ne(category.id, +id)))
    if (titleExists.length === 0) {
        await db.update(category).set({
            title,
            description,
            remark,
        }).where(eq(category.id, +id))
    } else {
        return R.err(c, "类别名称已存在")
    }
    return R.ok(c)
}

export const list: AppRouteHandler<ListRoute> = async (c) => {
    const categories = await db.select({
        id: category.id,
        title: category.title,
        desc: category.description,
        remark: category.remark,
        user: {
            id: user.id,
            nickname: user.nickname,
            avatar: user.avatar,
        },
    }).from(category).leftJoin(user, eq(category.userId, user.id)).orderBy(desc(category.id))
    return R.ok(c, categories)
}

export const detail: AppRouteHandler<DetailRoute> = async (c) => {
    const id = c.req.param('id')
    const detail = await db.select({
        id: category.id,
        title: category.title,
        desc: category.description,
        remark: category.remark,
        user: {
            id: user.id,
            nickname: user.nickname,
            avatar: user.avatar,
        },
    }).from(category).where(eq(category.id, +id)).leftJoin(user, eq(category.userId, user.id))
    return R.ok(c, detail)
}

