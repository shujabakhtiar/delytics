export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'driver';
}

export interface ApiResponse<T> {
    data: T;
    error?: string;
    success: boolean;
}

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface PaginatedResponse<T> {
    items: T[];
    meta: PaginationMeta;
}
