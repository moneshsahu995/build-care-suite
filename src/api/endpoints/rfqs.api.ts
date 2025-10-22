import { api } from '../axios';
import { RFQ, RFQFormData } from '@/types/rfq';

export const rfqsApi = {
  getAll: async () => {
    const response = await api.get<{ success: boolean; count: number; data: RFQ[] }>('/rfqs');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: RFQ }>(`/rfqs/${id}`);
    return response.data;
  },

  create: async (data: RFQFormData) => {
    const response = await api.post<{ success: boolean; data: RFQ }>('/rfqs', data);
    return response.data;
  },

  update: async (id: string, data: Partial<RFQFormData>) => {
    const response = await api.put<{ success: boolean; data: RFQ }>(`/rfqs/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ success: boolean; message: string }>(`/rfqs/${id}`);
    return response.data;
  },
};
