// lib/api/resources/hubs.ts
import { apiFetch } from '@/app/ui/resources/apiClient';

export interface Region {
  id: number;
  name: string;
}

export interface Hub {
  id: number;
  tenantId: number;
  regionId: number;
  name: string;
  capacity: number;
  createdAt: string;
  region?: Region;
}

export interface HubFilters {
  name?: string;
  regionId?: number;
  region?: string;
  minCapacity?: number;
  maxCapacity?: number;
  limit?: number;
  page?: number;
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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export const hubsResource = {
  // Get all hubs with optional filtering
  list: (filters?: HubFilters) => 
    apiFetch<ApiResponse<PaginatedResponse<Hub>>>('/hub', { 
      params: filters as any,
    }),

  // Get a single hub
  get: (id: string | number) => 
    apiFetch<ApiResponse<Hub>>(`/hub?id=${id}`),

  // Update a hub
  update: (id: string | number, data: Partial<Hub>) => 
    apiFetch<ApiResponse<Hub>>(`/hub`, {
      method: 'PUT',
      body: JSON.stringify({ id, ...data }),
    }),
};