import createApp from '@/lib/create-app.js'
import { configureOpenAPI } from '@/lib/configure-open-api.js'
import demo from '@/routes/demo/demo.index.js'

const app = createApp()

configureOpenAPI(app)

// 定义路由数组
const routes = [
    { path: "/testDemo", router: demo },
]

// 注册所有路由
routes.forEach(({ path, router }) => {
    app.route(path, router)
})

export default app 