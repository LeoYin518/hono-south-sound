export const R = {
    ok: (c: any, data: any = null, message: string = "操作成功") => c.json({ code: 200, message, data }),
    err: (c: any, message: string = "操作失败", code: number = 500) => c.json({ code, message }),
}