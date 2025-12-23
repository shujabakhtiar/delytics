import { apiFetch } from '@/app/ui/resources/apiClient';


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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface RegionFilters {
    name?: string;
    limit?: number;
    page?: number;
}
export interface Region {
    id: number;
    name: string;
    tenantId: number;
    timezone: string;
    createdAt: string;
}
export const regionResource = {
    list: (filters?: RegionFilters) => apiFetch<ApiResponse<PaginatedResponse<Region>>>(
            '/region', {
                params: filters as any,
    })
}
