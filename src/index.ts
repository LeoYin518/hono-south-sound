import { serve } from '@hono/node-server'
import app from './app.js'

app.get('/test500', (c) => {
  return c.json({ message: 'Hello, test500!' })
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
