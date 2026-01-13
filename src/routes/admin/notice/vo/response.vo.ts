import { NoticeSelectSchema } from "@/db/schema.js";

export const NoticeDetailSelectSchema = NoticeSelectSchema

export const NoticeListItemSelectSchema = NoticeSelectSchema.pick({
    id: true,
    title: true,
    createdAt: true,
    updatedAt: true,
})
