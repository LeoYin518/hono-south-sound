import createApp from '@/lib/create-app.js'
import { configureOpenAPI } from '@/lib/configure-open-api.js'
import category from '@/routes/admin/category/category.index.js'
import course from '@/routes/admin/course/course.index.js'
import chapter from '@/routes/admin/chapter/chapter.index.js'
import alioss from '@/routes/oss/alioss.index.js'

const app = createApp()

configureOpenAPI(app)

// 定义路由数组
const routes = [
    { path: "/admin/category", router: category },
    { path: "/admin/course", router: course },
    { path: "/admin/chapter", router: chapter },
    { path: "/oss", router: alioss },
]

// 注册所有路由
routes.forEach(({ path, router }) => {
    app.route(path, router)
})

export default app 
