import db from "@/db/index.js";
import { course } from "@/db/schema.js";
import type { AppRouteHandler } from "@/lib/types.js";
import { parsePagination } from "@/utils/pagination.js";
import { R } from "@/utils/response.js";
import { and, desc, eq, sql } from "drizzle-orm";
import type { ListByCategoryRoute } from "./course.routes.js";
import * as HttpStatusCodes from "@/lib/http-status-codes.js";

export const listByCategory: AppRouteHandler<ListByCategoryRoute> = async (c) => {
    const categoryIdRaw = c.req.param('id')
    const categoryId = Number(categoryIdRaw)
    if (!Number.isFinite(categoryId) || categoryId <= 0) {
        return R.err(c, "categoryId 不合法", HttpStatusCodes.BAD_REQUEST)
    }

    const pagination = parsePagination({
        page: c.req.query('page'),
        size: c.req.query('size'),
    })
    if (!pagination.ok) {
        return R.err(c, pagination.message, HttpStatusCodes.BAD_REQUEST)
    }

    const where = and(eq(course.categoryId, categoryId), eq(course.status, 1))

    const [rows, totalRows] = await Promise.all([
        db.select({
            id: course.id,
            title: course.title,
            cover: course.cover,
            tags: course.tags,
            description: course.description,
            type: course.type,
            price: course.price,
            createdAt: course.createdAt,
        })
            .from(course)
            .where(where)
            .orderBy(desc(course.sort), desc(course.id))
            .limit(pagination.size)
            .offset(pagination.offset),
        db.select({ total: sql<number>`count(*)` }).from(course).where(where),
    ])

    const total = Number(totalRows[0]?.total ?? 0)

    const list = rows.map((item) => ({
        ...item,
        price: item.price / 100,
    }))

    return R.ok(c, {
        list,
        page: pagination.page,
        size: pagination.size,
        total,
    })
}

