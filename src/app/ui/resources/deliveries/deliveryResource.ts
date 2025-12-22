// lib/api/resources/deliveries.ts
import { apiFetch } from '@/app/ui/resources/apiClient';

// Define types for your portfolio (Senior practice!)
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
}

export interface DeliveryFilters {
  status?: string;
  regionId?: number;
  agentId?: number;
  limit?: number;
  page?: number;
}

export const deliveriesResource = {
  // Get all deliveries with optional filtering
  list: (filters?: DeliveryFilters) => 
    apiFetch<{ success: boolean; data: Delivery[] }>('/delivery', { 
      params: filters as Record<string, string>,
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