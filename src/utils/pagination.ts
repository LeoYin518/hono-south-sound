export type PaginationParams = {
    page?: string
    size?: string
}

export type PaginationResult =
    | { ok: true, page: number, size: number, offset: number }
    | { ok: false, message: string }

export const parsePagination = (
    params: PaginationParams,
    defaults: { page: number, size: number } = { page: 1, size: 10 },
): PaginationResult => {
    const page = params.page === undefined ? defaults.page : Number(params.page)
    const size = params.size === undefined ? defaults.size : Number(params.size)

    if (!Number.isFinite(page) || page < 1 || !Number.isInteger(page)) {
        return { ok: false, message: "page 不合法" }
    }
    if (!Number.isFinite(size) || size < 1 || !Number.isInteger(size)) {
        return { ok: false, message: "size 不合法" }
    }

    return { ok: true, page, size, offset: (page - 1) * size }
}
