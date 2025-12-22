import { serveStatic } from '@hono/node-server/serve-static'
import { OpenAPIHono } from '@hono/zod-openapi'
import { pinoLog } from '../middleware/pino-logger.js'
import type { AppOpenAPI, AppType } from './types.js'

export function createRouter(): AppOpenAPI {
    return new OpenAPIHono<AppType>({
        strict: false,
    })
}

export default function createApp(): AppOpenAPI {
    const app = createRouter()
    app.use('/favicon.ico', serveStatic({ root: './src/public' }))
    app.use(pinoLog())

    // notFound & onError
    app.notFound((c) => {
        return c.json({ message: 'Not Found', code: 404 }, 404)
    })

    app.onError((err, c) => {
        console.error('Unhandled Error:', err)
        return c.json({ message: 'Internal Server Error', code: 500 }, 500)
    })
    return app
}
