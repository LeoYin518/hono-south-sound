import { int, mysqlTable, timestamp, tinyint, varchar } from "drizzle-orm/mysql-core";

export const demo = mysqlTable('demo', {
	id: int('id').primaryKey().autoincrement(),
    username: varchar({ length: 255 }).notNull(),
    gender: tinyint().default(0),
    createTime: timestamp().defaultNow(),
});
