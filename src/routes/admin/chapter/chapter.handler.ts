import db from "@/db/index.js";
import type { AddHandlerRoute, DeleteHandlerRoute, DetailRoute, ListRoute, UpdateHandlerRoute } from "./chapter.routes.js";
import type { AppRouteHandler } from "@/lib/types.js";
import { chapter, course } from "@/db/schema.js";
import { and, desc, eq, ne, sql } from "drizzle-orm";
import { R } from "@/utils/response.js";

export const addHandler: AppRouteHandler<AddHandlerRoute> = async (c) => {
    const { chapterNumber, title, content, courseId, video, sort, status } = await c.req.json()

    const courseExists = await db.select().from(course).where(and(eq(course.id, +courseId)))
    if (courseExists.length === 0) {
        return R.err(c, "课程不存在")
    }

    const result = await db.insert(chapter).values({
        chapterNumber,
        title,
        content,
        courseId: +courseId,
        video,
        sort: sort ?? 0,
        status: status ?? 0
    })

    return R.ok(c, result)
}

export const deleteHandler: AppRouteHandler<DeleteHandlerRoute> = async (c) => {
    const id = c.req.param('id')
    console.log("id: ", id);
    const exists = await db.select().from(chapter).where(and(eq(chapter.id, +id), ne(chapter.status, 2)))
    console.log("exists: ", exists);
    if (exists.length === 0) {
        return R.err(c, "记录不存在")
    }

    await db.update(chapter).set({ status: 2 }).where(eq(chapter.id, +id))
    return R.ok(c)
}

export const updateHandler: AppRouteHandler<UpdateHandlerRoute> = async (c) => {
    const id = c.req.param('id')
    const exists = await db.select().from(chapter).where(and(eq(chapter.id, +id)))
    if (exists.length === 0) {
        return R.err(c, "章节不存在")
    }

    const { chapterNumber, title, content, video, status, sort } = await c.req.json()

    const updateValues: Record<string, any> = {
        chapterNumber,
        title,
        updatedAt: sql`(current_timestamp)`,
    }

    if (content !== undefined) updateValues.content = content
    if (video !== undefined) updateValues.video = video
    if (status !== undefined) updateValues.status = status
    if (sort !== undefined) updateValues.sort = sort

    await db.update(chapter).set(updateValues).where(eq(chapter.id, +id))
    return R.ok(c)
}

export const list: AppRouteHandler<ListRoute> = async (c) => {
    const courseIdRaw = c.req.param('id')
    if (!courseIdRaw) {
        return R.err(c, "courseId 不能为空")
    }

    const courseId = Number(courseIdRaw)
    if (!Number.isFinite(courseId) || courseId <= 0) {
        return R.err(c, "courseId 不合法")
    }

    const rows = await db.select({
        id: chapter.id,
        chapterNumber: chapter.chapterNumber,
        title: chapter.title,
        status: chapter.status,
        sort: chapter.sort,
    }).from(chapter)
        .where(and(eq(chapter.courseId, courseId)))
        .orderBy(chapter.sort)
    return R.ok(c, rows)
}

export const detail: AppRouteHandler<DetailRoute> = async (c) => {
    const id = c.req.param('id')
    const rows = await db.select()
        .from(chapter)
        .where(eq(chapter.id, +id))
    if (rows.length === 0) {
        return R.err(c, "章节不存在")
    }
    return R.ok(c, rows[0])
}
