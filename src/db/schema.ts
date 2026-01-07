import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const test = sqliteTable('test', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    username: text('title').notNull(),
    gender: integer('gender').notNull().default(0),
    createdAt: text('created_at')
        .notNull()
        .$defaultFn(() => new Date().toISOString()),
})
