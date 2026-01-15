import db from "@/db/index.js";
import type { AddHandlerRoute, DeleteHandlerRoute, DetailRoute, ListRoute, UpdateHandlerRoute } from "./course.routes.js";
import type { AppRouteHandler } from "@/lib/types.js";
import { category, chapter, course, user } from "@/db/schema.js";
import { and, desc, eq, ne, sql } from "drizzle-orm";
import { R } from "@/utils/response.js";

const parsePriceToCents = (input: unknown) => {
    if (input === undefined || input === null) {
        return { ok: true as const, cents: undefined as undefined | number }
    }

    let raw = input
    if (typeof raw === 'number') {
        if (!Number.isFinite(raw)) {
            return { ok: false as const, message: "price 必须为有效数字" }
        }
        if (raw < 0) {
            return { ok: false as const, message: "price 不能小于 0" }
        }
        const s = raw.toString()
        if (s.includes('e') || s.includes('E')) {
            return { ok: false as const, message: "price 不支持科学计数法" }
        }
        raw = s
    }

    if (typeof raw !== 'string') {
        return { ok: false as const, message: "price 类型不正确" }
    }

    const value = raw.trim()
    if (!/^\d+(?:\.\d{1,2})?$/.test(value)) {
        return { ok: false as const, message: "price 格式错误（最多两位小数）" }
    }

    const [intPart, fracPartRaw] = value.split('.')
    const fracPart = (fracPartRaw ?? '').padEnd(2, '0')
    const centsBig = BigInt(intPart) * 100n + BigInt(fracPart === '' ? '0' : fracPart)
    if (centsBig > BigInt(Number.MAX_SAFE_INTEGER)) {
        return { ok: false as const, message: "price 数值过大" }
    }

    return { ok: true as const, cents: Number(centsBig) }
}

export const addHandler: AppRouteHandler<AddHandlerRoute> = async (c) => {
    const { title, cover, categoryId, tags, description, type, price, status, sort } = await c.req.json()

    const parsedPrice = parsePriceToCents(price)
    if (!parsedPrice.ok) {
        return R.err(c, parsedPrice.message)
    }

    const categoryExists = await db.select().from(category).where(eq(category.id, +categoryId))
    if (categoryExists.length === 0) {
        return R.err(c, "类别不存在")
    }

    const exists = await db.select().from(course).where(and(eq(course.title, title)))
    if (exists.length !== 0) {
        return R.err(c, "课程已存在")
    }

    const result = await db.insert(course).values({
        title,
        cover,
        categoryId: +categoryId,
        tags: tags ?? null,
        description,
        type: type ?? 0,
        price: parsedPrice.cents ?? 0,
        status: status ?? 0,
        sort: sort ?? 0,
        userId: c.get("auth")?.userId,
    })

    return R.ok(c, result)
}

export const deleteHandler: AppRouteHandler<DeleteHandlerRoute> = async (c) => {
    const id = c.req.param('id')
    const exists = await db.select().from(course).where(and(eq(course.id, +id), ne(course.status, 2)))
    if (exists.length === 0) {
        return R.err(c, "记录不存在")
    }

    await db.update(course).set({ status: 2 }).where(eq(course.id, +id))
    return R.ok(c)
}

export const updateHandler: AppRouteHandler<UpdateHandlerRoute> = async (c) => {
    const id = c.req.param('id')
    const exists = await db.select().from(course).where(and(eq(course.id, +id)))
    if (exists.length === 0) {
        return R.err(c, "课程不存在")
    }

    const { title, cover, categoryId, tags, description, type, price, status, sort } = await c.req.json()

    const parsedPrice = parsePriceToCents(price)
    if (!parsedPrice.ok) {
        return R.err(c, parsedPrice.message)
    }

    const categoryExists = await db.select().from(category).where(eq(category.id, +categoryId))
    if (categoryExists.length === 0) {
        return R.err(c, "类别不存在")
    }

    const titleExists = await db.select()
        .from(course)
        .where(and(eq(course.title, title), ne(course.id, +id), ne(course.status, 2)))
    if (titleExists.length !== 0) {
        return R.err(c, "课程名称已存在")
    }

    const updateValues: Record<string, any> = {
        title,
        categoryId: +categoryId,
        updatedAt: sql`(current_timestamp)`,
    }

    if (cover !== undefined) updateValues.cover = cover
    if (tags !== undefined) updateValues.tags = tags
    if (description !== undefined) updateValues.description = description
    if (type !== undefined) updateValues.type = type
    if (parsedPrice.cents !== undefined) updateValues.price = parsedPrice.cents
    if (status !== undefined) updateValues.status = status
    if (sort !== undefined) updateValues.sort = sort

    await db.update(course).set(updateValues).where(eq(course.id, +id))
    return R.ok(c)
}

export const list: AppRouteHandler<ListRoute> = async (c) => {
    const courses = await db.select({
        id: course.id,
        title: course.title,
        cover: course.cover,
        categoryId: course.categoryId,
        tags: course.tags,
        description: course.description,
        type: course.type,
        price: course.price,
        status: course.status,
        userId: course.userId,
        sort: course.sort,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
        remark: course.remark,
        user: {
            id: user.id,
            nickname: user.nickname,
            avatar: user.avatar,
        },
    })
        .from(course)
        .leftJoin(user, eq(course.userId, user.id))
        .orderBy(desc(course.id))

    const data = courses.map(item => ({
        ...item,
        price: item.price / 100,
    }))

    return R.ok(c, data)
}

export const detail: AppRouteHandler<DetailRoute> = async (c) => {
    const id = c.req.param('id')

    const rows = await db.select({
        id: course.id,
        title: course.title,
        cover: course.cover,
        categoryId: course.categoryId,
        tags: course.tags,
        description: course.description,
        type: course.type,
        price: course.price,
        status: course.status,
        userId: course.userId,
        sort: course.sort,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
        remark: course.remark,
        user: {
            id: user.id,
            nickname: user.nickname,
            avatar: user.avatar,
        },
        chapters: {
            id: chapter.id,
            title: chapter.title,
            courseId: chapter.courseId,
            chapterNumber: chapter.chapterNumber,
            status: chapter.status,
            createdAt: chapter.createdAt,
            updatedAt: chapter.updatedAt,
        },
    }).from(course)
        .leftJoin(user, eq(course.userId, user.id))
        .leftJoin(chapter, eq(course.id, chapter.courseId))
        .where(and(eq(course.id, +id)))

    if (rows.length === 0) {
        return R.err(c, "课程不存在")
    }

    const detail = {
        ...rows[0],
        price: rows[0].price / 100,
    }

    return R.ok(c, detail)
}

