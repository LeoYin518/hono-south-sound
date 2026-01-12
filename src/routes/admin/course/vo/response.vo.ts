import { CourseSelectSchema, UserSelectSchema, ChapterSelectSchema } from "@/db/schema.js";

export const CourseDetailWithUserSelectSchema = CourseSelectSchema.extend({
    user: UserSelectSchema,
    chapter: ChapterSelectSchema.array().optional()
})

