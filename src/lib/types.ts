import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi'
import type { z } from "@hono/zod-openapi";
import type { Logger } from 'pino'

export type AppType = {
  Variables: {
    logger: Logger
  }
}

export type ZodSchema = z.ZodUnion | z.ZodObject | z.ZodArray<z.ZodObject>;
export type AppOpenAPI = OpenAPIHono<AppType>
export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppType>;