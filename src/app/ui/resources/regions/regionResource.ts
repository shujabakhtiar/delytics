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
    // Get all regions with optional filtering and pagination
    list: (filters?: RegionFilters) => apiFetch<ApiResponse<PaginatedResponse<Region>>>('/region', { 
      params: filters as any,
    }),

    // Get a single region
    get: (id: string | number) => 
      apiFetch<ApiResponse<Region>>(`/region?id=${id}`),

    // Create a region
    create: (data: Partial<Region>) => 
      apiFetch<ApiResponse<Region>>('/region', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    // Update a region
    update: (id: string | number, data: Partial<Region>) => 
      apiFetch<ApiResponse<Region>>('/region', {
        method: 'PUT',
        body: JSON.stringify({ id, ...data }),
      }),

    // Delete a region
    delete: (id: string | number) => 
      apiFetch<ApiResponse<Region>>(`/region?id=${id}`, {
        method: 'DELETE',
      }),
};
