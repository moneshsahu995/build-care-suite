import { api } from '../axios';
import { Tenant, TenantFormData } from '@/types/tenant';

export const tenantsApi = {
  getAll: async () => {
    const response = await api.get<{ success: boolean; count: number; data: Tenant[] }>('/tenants');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: Tenant }>(`/tenants/${id}`);
    return response.data;
  },

  create: async (data: TenantFormData) => {
    const response = await api.post<{ success: boolean; data: Tenant }>('/tenants', data);
    return response.data;
  },

  update: async (id: string, data: Partial<TenantFormData>) => {
    const response = await api.put<{ success: boolean; data: Tenant }>(`/tenants/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ success: boolean; message: string }>(`/tenants/${id}`);
    return response.data;
  },
};
