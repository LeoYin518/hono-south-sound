import type { MiddlewareHandler } from "hono";
import env from "@/env.js";
import { verifyJwt } from "@/utils/jwt.js";
import { R } from "@/utils/response.js";

/**
 * 从请求头 Authorization 里解析 Bearer token。
 *
 * 期望格式：Authorization: Bearer <token>
 * - 如果请求头不存在或格式不正确，返回 undefined
 * - 如果格式正确，返回去掉首尾空白的 token 字符串
 */
const getBearerToken = (c: any) => {
    const raw = c.req.header('authorization') || c.req.header('Authorization')
    if (!raw) return undefined
    const m = raw.match(/^Bearer\s+(.+)$/i)
    return m?.[1]?.trim()
}

type JwtAudience = 'admin' | 'client'

const requireJwtAuth = (options: {
    aud: JwtAudience
    secret: string
    skipPathPrefix?: string
}): MiddlewareHandler => {
    return async (c, next) => {
        if (options.skipPathPrefix) {
            const path = c.req.path
            if (path.startsWith(options.skipPathPrefix)) {
                return next()
            }
        }

        const token = getBearerToken(c)
        if (!token) return R.err(c, "未登录", 401)

        const verified = verifyJwt(token, options.secret)
        if (!verified.ok) return R.err(c, verified.message, 401)
        if (verified.payload.aud !== options.aud) return R.err(c, "token 类型不匹配", 401)

        c.set('auth', {
            userId: Number(verified.payload.sub),
            aud: verified.payload.aud,
            role: verified.payload.role,
        })
        return next()
    }
}

/**
 * 仅允许携带 admin token 的请求继续执行。
 *
 * 行为：
 * - /admin/auth/* 视为登录相关接口，直接放行（不做鉴权）
 * - 其他 /admin/* 请求必须携带 Bearer token
 * - token 必须能用 JWT_ADMIN_SECRET 验签且 aud === 'admin'
 * - 验证通过后，把鉴权信息写入上下文 c.set('auth', ...)
 */
export const requireAdminAuth = (): MiddlewareHandler => {
    return requireJwtAuth({
        aud: 'admin',
        secret: env.JWT_ADMIN_SECRET,
        skipPathPrefix: '/admin/auth/',
    })
}

/**
 * 仅允许携带 client token 的请求继续执行。
 *
 * 行为：
 * - 请求必须携带 Bearer token
 * - token 必须能用 JWT_CLIENT_SECRET 验签且 aud === 'client'
 * - 验证通过后，把鉴权信息写入上下文 c.set('auth', ...)
 */
export const requireClientAuth = (): MiddlewareHandler => {
    return requireJwtAuth({
        aud: 'client',
        secret: env.JWT_CLIENT_SECRET,
        skipPathPrefix: '/client/auth/',
    })
}

/**
 * 历史兼容命名：以前用于“admin 或 client 任意一种鉴权”。
 *
 * 当前实现支持 admin 或 client 任意一种 token。
 */
export const requireEitherAuth = (): MiddlewareHandler => {
    return async (c, next) => {
        const token = getBearerToken(c)
        if (!token) return R.err(c, "未登录", 401)

        const adminVerified = verifyJwt(token, env.JWT_ADMIN_SECRET)
        if (adminVerified.ok) {
            if (adminVerified.payload.aud !== 'admin') return R.err(c, "token 类型不匹配", 401)
            c.set('auth', {
                userId: Number(adminVerified.payload.sub),
                aud: adminVerified.payload.aud,
                role: adminVerified.payload.role,
            })
            return next()
        }

        const clientVerified = verifyJwt(token, env.JWT_CLIENT_SECRET!)
        if (clientVerified.ok) {
            if (clientVerified.payload.aud !== 'client') return R.err(c, "token 类型不匹配", 401)
            c.set('auth', {
                userId: Number(clientVerified.payload.sub),
                aud: clientVerified.payload.aud,
                role: clientVerified.payload.role,
            })
            return next()
        }

        return R.err(c, adminVerified.message, 401)
    }
}
