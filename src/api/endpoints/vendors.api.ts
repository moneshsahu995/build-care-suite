import { api } from '../axios';
import { Vendor, VendorFormData } from '@/types/vendor';

export const vendorsApi = {
  getAll: async () => {
    const response = await api.get<{ success: boolean; count: number; data: Vendor[] }>('/vendors');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: Vendor }>(`/vendors/${id}`);
    return response.data;
  },

  create: async (data: VendorFormData) => {
    const response = await api.post<{ success: boolean; data: Vendor }>('/vendors', data);
    return response.data;
  },

  update: async (id: string, data: Partial<VendorFormData>) => {
    const response = await api.put<{ success: boolean; data: Vendor }>(`/vendors/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ success: boolean; message: string }>(`/vendors/${id}`);
    return response.data;
  },
};
