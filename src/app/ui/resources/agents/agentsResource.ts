// src/app/ui/resources/agents/agentsResource.ts
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
  tenantId: number;
  regionId: number;
  hubId: number;
  name: string;
  status: string;
  createdAt: string;
  region?: Region;
  hub?: Hub;
}

export interface AgentFilters {
  name?: string;
  status?: string;
  regionId?: number;
  region?: string;
  hubId?: number;
  hub?: string;
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

export const agentsResource = {
  // Get all agents with optional filtering and pagination
  list: (filters?: AgentFilters) => 
    apiFetch<ApiResponse<PaginatedResponse<Agent>>>('/agent', { 
      params: filters as any,
    }),

  // Get a single agent
  get: (id: string | number) => 
    apiFetch<ApiResponse<Agent>>(`/agent?id=${id}`),

  // Create an agent
  create: (data: Partial<Agent>) => 
    apiFetch<ApiResponse<Agent>>('/agent', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Update an agent
  update: (id: string | number, data: Partial<Agent>) => 
    apiFetch<ApiResponse<Agent>>('/agent', {
      method: 'PUT',
      body: JSON.stringify({ id, ...data }),
    }),

  // Delete an agent
  delete: (id: string | number) => 
    apiFetch<ApiResponse<Agent>>(`/agent?id=${id}`, {
      method: 'DELETE',
    }),
};
