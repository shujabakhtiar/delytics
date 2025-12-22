import { PaginatedResponse } from "@/app/types";

export interface PaginationParams {
    page: number;
    limit: number;
    skip: number;
}

export const getPaginationParams = (searchParams: URLSearchParams): PaginationParams => {
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.max(1, parseInt(searchParams.get('limit') || '10'));
    const skip = (page - 1) * limit;

    return { page, limit, skip };
};

export const formatPaginatedResponse = <T>(
    items: T[],
    total: number,
    page: number,
    limit: number
): PaginatedResponse<T> => {
    const totalPages = Math.ceil(total / limit);
    return {
        items,
        meta: {
            total,
            page,
            limit,
            totalPages,
        },
    };
};

/**
 * Generic pagination helper for Prisma models
 */
export async function paginate<T>(
    model: any,
    args: any = {},
    params: PaginationParams
): Promise<PaginatedResponse<T>> {
    const { skip, limit, page } = params;
    
    const [items, total] = await Promise.all([
        model.findMany({
            ...args,
            skip,
            take: limit,
        }),
        model.count({
            where: args.where,
        }),
    ]);

    return formatPaginatedResponse(items, total, page, limit);
}
