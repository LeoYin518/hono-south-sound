import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { createSelectSchema } from 'drizzle-zod';

// 用户表
export const user = sqliteTable('user', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    username: text('username').notNull(),
    password: text('password').notNull(),
    email: text('email'),
    nickname: text('nickname'),
    avatar: text('avatar'),
    // 用户角色 -- 0: 管理员，1: 普通用户，2: VIP用户
    role: integer('role').notNull().default(1),
    // 用户状态 -- 0: 禁用，1: 启用，2: 锁定，3: 删除
    status: integer('status').notNull().default(1),
    createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
    updatedAt: text('updated_at').notNull().default(sql`(current_timestamp)`),
    remark: text('remark'),
})

// 类别表
export const category = sqliteTable('category', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    // 类别名称
    title: text('title').notNull(),
    // 类别描述
    description: text('description'),
    // 类别作者
    userId: integer('user_id').references(() => user.id),
    createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
    updatedAt: text('updated_at').notNull().default(sql`(current_timestamp)`),
    remark: text('remark'),
})

// 课程表
export const course = sqliteTable('course', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    // 课程标题
    title: text('title').notNull(),
    // 课程封面
    cover: text('cover'),
    // 课程分类
    categoryId: integer('category_id').notNull().references(() => category.id),
    // 课程标签
    tags: text('tags', { mode: 'json' }),
    // 课程描述
    description: text('description'),
    // 付费类型 -- 0: 免费, 1: 收费
    type: integer('type').notNull().default(0),
    // 价格 -- 单位：分
    price: integer('price').notNull().default(0),
    // 课程状态 -- 0: 未发布, 1: 已发布 2：删除
    status: integer('status').notNull().default(0),
    // 课程作者
    userId: integer('user_id').references(() => user.id),
    // 排序
    sort: integer('sort').notNull().default(0),
    createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
    updatedAt: text('updated_at').notNull().default(sql`(current_timestamp)`),
    remark: text('remark'),
})

// 章节表
export const chapter = sqliteTable('chapter', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    // 章节编号
    chapterNumber: integer('chapter_number').notNull(),
    // 章节标题
    title: text('title').notNull(),
    // 章节内容
    content: text('content'),
    // 所属课程
    courseId: integer('course_id').notNull().references(() => course.id),
    // 章节视频
    video: text('video'),
    // 章节状态 -- 0: 未发布,1: 已发布 ,2：删除
    status: integer('status').notNull().default(0),
    // 排序
    sort: integer('sort').notNull().default(0),
    createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
    updatedAt: text('updated_at').notNull().default(sql`(current_timestamp)`),
    remark: text('remark'),
})

// 博客文章表
export const blog = sqliteTable('blog', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    // 文章标题
    title: text('title').notNull(),
    // 文章内容
    content: text('content'),
    // 文章作者
    userId: integer('user_id').references(() => user.id),
    // 通知状态 -- 0: 未发布,1: 已发布 ,2：删除
    status: integer('status').notNull().default(0),
    // 排序
    sort: integer('sort').notNull().default(0),
    createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
    updatedAt: text('updated_at').notNull().default(sql`(current_timestamp)`),
    remark: text('remark'),
})

// 系统通知表
export const notice = sqliteTable('notice', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    // 通知标题
    title: text('title').notNull(),
    // 通知内容
    content: text('content'),
    // 通知作者
    userId: integer('user_id').references(() => user.id),
    // 通知状态 -- 0: 未发布,1: 已发布 ,2：删除
    status: integer('status').notNull().default(0),
    // 排序
    sort: integer('sort').notNull().default(0),
    createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
    updatedAt: text('updated_at').notNull().default(sql`(current_timestamp)`),
    remark: text('remark'),
})

// 用户课程收藏表
export const userCourseCollect = sqliteTable('user_course_collect', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    // 用户ID
    userId: integer('user_id').notNull().references(() => user.id),
    // 课程ID
    courseId: integer('course_id').notNull().references(() => course.id),
    createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
})


export const UserSelectSchema = createSelectSchema(user);
export const CategorySelectSchema = createSelectSchema(category);
export const CourseSelectSchema = createSelectSchema(course);
export const ChapterSelectSchema = createSelectSchema(chapter);
export const BlogSelectSchema = createSelectSchema(blog);
export const NoticeSelectSchema = createSelectSchema(notice);