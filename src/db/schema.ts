import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const test = sqliteTable('test', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    username: text('title').notNull(),
    gender: integer('gender', { mode: 'boolean' }).notNull().default(true),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .notNull()
        .$defaultFn(() => new Date()),
})
