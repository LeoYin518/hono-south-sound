import db from "@/db/index.js";
import { category } from "@/db/schema.js";
import type { AppRouteHandler } from "@/lib/types.js";
import { R } from "@/utils/response.js";
import { desc } from "drizzle-orm";
import type { ListRoute } from "./category.routes.js";

export const list: AppRouteHandler<ListRoute> = async (c) => {
    const rows = await db.select().from(category).orderBy(desc(category.id))
    return R.ok(c, rows)
}

