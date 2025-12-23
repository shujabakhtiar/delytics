import { apiFetch } from "../apiClient";

export const authResource = {
  login: async (email: string, password: string) => {
    return apiFetch<{ success: boolean; data: any; error?: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  register: async (name: string, email: string, password: string, tenantId: number) => {
    return apiFetch<{ success: boolean; data: any; error?: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, tenantId }),
    });
  },

  me: async () => {
    return apiFetch<{ success: boolean; data: any; error?: string }>('/auth/me');
  },

  resetPassword: async (email: string, password: string) => {
    return apiFetch<{ success: boolean; data: any; error?: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }
};
