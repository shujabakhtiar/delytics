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
