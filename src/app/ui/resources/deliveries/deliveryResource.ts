// lib/api/resources/deliveries.ts
import { apiFetch } from '@/app/ui/resources/apiClient';

// Define types for your portfolio (Senior practice!)
export interface Delivery {
  id: number;
  status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED';
  deliveryTimeMinutes: number | null;
  slaBreached: boolean;
  regionId: number;
  agentId: number;
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
    apiFetch<Delivery[]>('/deliveries', { 
      params: filters as Record<string, string>,
      next: { tags: ['deliveries'] } // Next.js Cache Tagging
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

  // Get Analytics Summary (for your dashboard cards)
  getStats: () => 
    apiFetch<{ total: number; breachRate: number }>('/deliveries/stats', {
      next: { revalidate: 60 } // Revalidate stats every minute
    }),
};