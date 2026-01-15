import db from "@/db/index.js";
import { chapter, course, user } from "@/db/schema.js";
import type { AppRouteHandler } from "@/lib/types.js";
import { R } from "@/utils/response.js";
import { and, asc, eq } from "drizzle-orm";
import type { DetailRoute, ListByCourseRoute } from "./chapter.routes.js";
import * as HttpStatusCodes from "@/lib/http-status-codes.js";

export const listByCourse: AppRouteHandler<ListByCourseRoute> = async (c) => {
    const courseIdRaw = c.req.param('id')
    const courseId = Number(courseIdRaw)
    if (!Number.isFinite(courseId) || courseId <= 0) {
        return R.err(c, "courseId 不合法", HttpStatusCodes.BAD_REQUEST)
    }

    const rows = await db.select({
        id: chapter.id,
        title: chapter.title,
        sort: chapter.sort,
        chapterNumber: chapter.chapterNumber,
    })
        .from(chapter)
        .leftJoin(course, eq(chapter.courseId, course.id))
        .where(and(
            eq(chapter.courseId, courseId),
            eq(chapter.status, 1),
            eq(course.status, 1),
        ))
        .orderBy(asc(chapter.sort), asc(chapter.chapterNumber))

    return R.ok(c, rows.map(({ id, title }) => ({ id, title })))
}

export const detail: AppRouteHandler<DetailRoute> = async (c) => {
    const chapterIdRaw = c.req.param('id')
    const chapterId = Number(chapterIdRaw)
    if (!Number.isFinite(chapterId) || chapterId <= 0) {
        return R.err(c, "chapterId 不合法", HttpStatusCodes.BAD_REQUEST)
    }

    const rows = await db.select({
        id: chapter.id,
        title: chapter.title,
        content: chapter.content,
        video: chapter.video,
        chapterNumber: chapter.chapterNumber,
        createdAt: chapter.createdAt,
        course: {
            id: course.id,
            title: course.title,
        },
        author: {
            id: user.id,
            nickname: user.nickname,
            avatar: user.avatar,
        },
    })
        .from(chapter)
        .leftJoin(course, eq(chapter.courseId, course.id))
        .leftJoin(user, eq(course.userId, user.id))
        .where(and(
            eq(chapter.id, chapterId),
            eq(chapter.status, 1),
            eq(course.status, 1),
        ))

    if (rows.length === 0) {
        return R.err(c, "章节不存在", HttpStatusCodes.NOT_FOUND)
    }

    return R.ok(c, rows[0])
}
