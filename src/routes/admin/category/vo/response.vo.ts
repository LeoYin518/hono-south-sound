import { CategorySelectSchema, UserSelectSchema } from "@/db/schema.js";

export const CategoryDetailWithUserSelectSchema = CategorySelectSchema.extend({
    user: UserSelectSchema
})

