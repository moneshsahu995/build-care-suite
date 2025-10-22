import { api } from '../axios';
import { 
  Calculation, 
  CalculationFormData,
  EnergyCalculationInput,
  EnergyCalculationResult,
  WaterCalculationInput,
  WaterCalculationResult,
  WasteCalculationInput,
  WasteCalculationResult
} from '@/types/calculation';

export const calculationsApi = {
  getAll: async () => {
    const response = await api.get<{ success: boolean; count: number; data: Calculation[] }>('/calculations');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: Calculation }>(`/calculations/${id}`);
    return response.data;
  },

  create: async (data: CalculationFormData) => {
    const response = await api.post<{ success: boolean; data: Calculation }>('/calculations', data);
    return response.data;
  },

  update: async (id: string, data: { inputs: Record<string, any> }) => {
    const response = await api.put<{ success: boolean; data: Calculation }>(`/calculations/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ success: boolean; message: string }>(`/calculations/${id}`);
    return response.data;
  },

  calculateEnergy: async (data: EnergyCalculationInput) => {
    const response = await api.post<{ success: boolean; data: EnergyCalculationResult }>('/calculations/energy', data);
    return response.data;
  },

  calculateWater: async (data: WaterCalculationInput) => {
    const response = await api.post<{ success: boolean; data: WaterCalculationResult }>('/calculations/water', data);
    return response.data;
  },

  calculateWaste: async (data: WasteCalculationInput) => {
    const response = await api.post<{ success: boolean; data: WasteCalculationResult }>('/calculations/waste', data);
    return response.data;
  },
};
