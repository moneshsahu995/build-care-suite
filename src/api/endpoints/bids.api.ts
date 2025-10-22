import { api } from '../axios';
import { Bid, BidFormData } from '@/types/bid';

export const bidsApi = {
  getAll: async () => {
    const response = await api.get<{ success: boolean; count: number; data: Bid[] }>('/bids');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: Bid }>(`/bids/${id}`);
    return response.data;
  },

  create: async (data: BidFormData) => {
    const response = await api.post<{ success: boolean; data: Bid }>('/bids', data);
    return response.data;
  },

  update: async (id: string, data: Partial<BidFormData>) => {
    const response = await api.put<{ success: boolean; data: Bid }>(`/bids/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ success: boolean; message: string }>(`/bids/${id}`);
    return response.data;
  },

  evaluate: async (id: string, evaluation: { score: number; priceScore: number; qualityScore: number; deliveryScore: number; notes: string }) => {
    const response = await api.put<{ success: boolean; data: Bid }>(`/bids/${id}/evaluate`, evaluation);
    return response.data;
  },

  select: async (id: string) => {
    const response = await api.put<{ success: boolean; data: Bid }>(`/bids/${id}/select`);
    return response.data;
  },
};
