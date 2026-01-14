import type { Context } from "hono";

/**
 * 预留校验逻辑，如果有验证码等其他逻辑可以在这实现
 * @param _c 
 * @param _payload 
 * @returns 
 */
export const verifyAdminLoginChallenge = async (_c: Context, _payload: Record<string, unknown>) => {
    return { ok: true as const }
}

