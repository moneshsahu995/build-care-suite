import { api } from '../axios';
import { InventoryItem, InventoryFormData } from '@/types/inventory';

export const inventoryApi = {
  getAll: async () => {
    const response = await api.get<{ success: boolean; count: number; data: InventoryItem[] }>('/inventory');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: InventoryItem }>(`/inventory/${id}`);
    return response.data;
  },

  create: async (data: InventoryFormData) => {
    const response = await api.post<{ success: boolean; data: InventoryItem }>('/inventory', data);
    return response.data;
  },

  update: async (id: string, data: Partial<InventoryFormData>) => {
    const response = await api.put<{ success: boolean; data: InventoryItem }>(`/inventory/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ success: boolean; message: string }>(`/inventory/${id}`);
    return response.data;
  },
};
