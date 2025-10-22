import { calculationsApi } from '@/api/endpoints/calculations.api';
import { 
  CalculationFormData,
  EnergyCalculationInput,
  WaterCalculationInput,
  WasteCalculationInput
} from '@/types/calculation';

export const calculationsService = {
  getAllCalculations: async () => {
    return await calculationsApi.getAll();
  },

  getCalculationById: async (id: string) => {
    return await calculationsApi.getById(id);
  },

  createCalculation: async (data: CalculationFormData) => {
    return await calculationsApi.create(data);
  },

  updateCalculation: async (id: string, data: { inputs: Record<string, any> }) => {
    return await calculationsApi.update(id, data);
  },

  deleteCalculation: async (id: string) => {
    return await calculationsApi.delete(id);
  },

  calculateEnergy: async (data: EnergyCalculationInput) => {
    return await calculationsApi.calculateEnergy(data);
  },

  calculateWater: async (data: WaterCalculationInput) => {
    return await calculationsApi.calculateWater(data);
  },

  calculateWaste: async (data: WasteCalculationInput) => {
    return await calculationsApi.calculateWaste(data);
  },
};
