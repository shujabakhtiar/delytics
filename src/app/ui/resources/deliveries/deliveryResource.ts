// lib/api/resources/deliveries.ts
import { apiFetch } from '@/app/ui/resources/apiClient';

export interface Region {
  id: number;
  name: string;
}

export interface Hub {
  id: number;
  name: string;
}

export interface Agent {
  id: number;
  name: string;
}

export interface Delivery {
  id: number;
  tenantId: number;
  regionId: number;
  hubId: number;
  agentId: number;
  status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED';
  deliveryTimeMinutes: number | null;
  slaBreached: boolean;
  deliveredAt: string;
  createdAt: string;
  region?: Region;
  hub?: Hub;
  agent?: Agent;
}

export interface DeliveryFilters {
  status?: string;
  regionId?: number;
  region?: string;
  hubId?: number;
  hub?: string;
  agentId?: number;
  startDate?: string;
  endDate?: string;
  slaBreach?: boolean | string;
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

export const deliveriesResource = {
  // Get all deliveries with optional filtering
  list: (filters?: DeliveryFilters) => 
    apiFetch<ApiResponse<PaginatedResponse<Delivery>>>('/delivery', { 
      params: filters as any,
    }),

  // Get a single delivery
  get: (id: string | number) => 
    apiFetch<Delivery>(`/deliveries/${id}`),

  // Update a delivery (e.g., mark as delivered)
  update: (id: string | number, data: Partial<Delivery>) => 
    apiFetch<Delivery>(`/deliveries/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
};