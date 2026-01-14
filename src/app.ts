import createApp from '@/lib/create-app.js'
import { configureOpenAPI } from '@/lib/configure-open-api.js'
import { requireAdminAuth, requireEitherAuth } from '@/middleware/auth.js'
import auth from '@/routes/admin/auth/auth.index.js'
import category from '@/routes/admin/category/category.index.js'
import course from '@/routes/admin/course/course.index.js'
import chapter from '@/routes/admin/chapter/chapter.index.js'
import notice from '@/routes/admin/notice/notice.index.js'
import alioss from '@/routes/oss/alioss.index.js'

const app = createApp()

app.use('/admin/*', requireAdminAuth())
app.use('/oss/*', requireEitherAuth())

configureOpenAPI(app)

// 定义路由数组
const routes = [
    { path: "/admin/auth", router: auth },
    { path: "/admin/category", router: category },
    { path: "/admin/course", router: course },
    { path: "/admin/chapter", router: chapter },
    { path: "/admin/notice", router: notice },
    { path: "/oss", router: alioss },
]

// 注册所有路由
routes.forEach(({ path, router }) => {
    app.route(path, router)
})

export default app 
