import db from "@/db/index.js";
import { user } from "@/db/schema.js";
import env from "@/env.js";
import type { AppRouteHandler } from "@/lib/types.js";
import { createJwt, revokeJwt, verifyJwt } from "@/utils/jwt.js";
import { verifyPassword } from "@/utils/password.js";
import { R } from "@/utils/response.js";
import { and, eq, or } from "drizzle-orm";
import type { LoginRoute, LogoutRoute } from "./auth.routes.js";

export const login: AppRouteHandler<LoginRoute> = async (c) => {
    const { loginName, password } = await c.req.json()

    const rows = await db.select().from(user).where(and(
        eq(user.status, 1),
        or(
            eq(user.username, loginName),
            eq(user.email, loginName),
        ),
    ))
    if (rows.length === 0) {
        return R.err(c, "账号或密码错误", 401)
    }

    const found = rows[0]
    if (found.role === 0) {
        return R.err(c, "非普通用户账号", 401)
    }

    const passOk = verifyPassword(password, found.password)
    if (!passOk.ok) {
        return R.err(c, "账号或密码错误", 401)
    }

    const now = Math.floor(Date.now() / 1000)
    const expiresIn = env.JWT_CLIENT_EXPIRES_IN_SECONDS
    const token = createJwt({
        sub: String(found.id),
        aud: 'client',
        role: found.role,
        iat: now,
        exp: now + expiresIn,
    }, env.JWT_CLIENT_SECRET!)

    return R.ok(c, { token, expiresIn })
}

export const logout: AppRouteHandler<LogoutRoute> = async (c) => {
    const raw = c.req.header('authorization') || c.req.header('Authorization')
    const m = raw?.match(/^Bearer\s+(.+)$/i)
    const token = m?.[1]?.trim()
    if (!token) return R.err(c, "未登录", 401)

    const verified = verifyJwt(token, env.JWT_CLIENT_SECRET!)
    if (!verified.ok) return R.err(c, verified.message, 401)
    if (verified.payload.aud !== 'client') return R.err(c, "token 类型不匹配", 401)

    revokeJwt(token, verified.payload.exp)
    return R.ok(c)
}

