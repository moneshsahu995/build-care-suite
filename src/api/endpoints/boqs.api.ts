import { api } from '../axios';
import { BOQ, BOQFormData } from '@/types/boq';

export const boqsApi = {
  getAll: async () => {
    const response = await api.get<{ success: boolean; count: number; data: BOQ[] }>('/boqs');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: BOQ }>(`/boqs/${id}`);
    return response.data;
  },

  create: async (data: BOQFormData) => {
    const response = await api.post<{ success: boolean; data: BOQ }>('/boqs', data);
    return response.data;
  },

  update: async (id: string, data: Partial<BOQFormData>) => {
    const response = await api.put<{ success: boolean; data: BOQ }>(`/boqs/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ success: boolean; message: string }>(`/boqs/${id}`);
    return response.data;
  },

  export: async (id: string) => {
    const response = await api.get(`/boqs/${id}/export`, {
      responseType: 'blob',
    });
    return response.data;
  },
};
