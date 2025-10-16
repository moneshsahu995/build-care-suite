import { api } from '../axios';
import { AMCContract, ContractFormData } from '@/types/contract';

export const contractsApi = {
  getAll: async () => {
    const response = await api.get<{ success: boolean; count: number; data: AMCContract[] }>('/amc-contracts');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: AMCContract }>(`/amc-contracts/${id}`);
    return response.data;
  },

  create: async (data: ContractFormData) => {
    const response = await api.post<{ success: boolean; data: AMCContract }>('/amc-contracts', data);
    return response.data;
  },

  update: async (id: string, data: Partial<ContractFormData>) => {
    const response = await api.put<{ success: boolean; data: AMCContract }>(`/amc-contracts/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ success: boolean; message: string }>(`/amc-contracts/${id}`);
    return response.data;
  },
};
