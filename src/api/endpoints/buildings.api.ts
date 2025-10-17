import { api } from '../axios';
import { Building, BuildingFormData } from '@/types/building';

export const buildingsApi = {
  getAll: async () => {
    const response = await api.get<{ success: boolean; count: number; data: Building[] }>('/buildings');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: Building }>(`/buildings/${id}`);
    return response.data;
  },

  create: async (data: BuildingFormData) => {
    const response = await api.post<{ success: boolean; data: Building }>('/buildings', data);
    return response.data;
  },

  update: async (id: string, data: Partial<BuildingFormData>) => {
    const response = await api.put<{ success: boolean; data: Building }>(`/buildings/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ success: boolean; message: string }>(`/buildings/${id}`);
    return response.data;
  },
};
