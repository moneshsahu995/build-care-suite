import { contractsApi } from '@/api/endpoints/contracts.api';
import { AMCContract, ContractFormData } from '@/types/contract';

export const contractsService = {
  getAllContracts: async (): Promise<AMCContract[]> => {
    try {
      const response = await contractsApi.getAll();
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch contracts');
    }
  },

  getContractById: async (id: string): Promise<AMCContract> => {
    try {
      const response = await contractsApi.getById(id);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch contract');
    }
  },

  createContract: async (data: ContractFormData): Promise<AMCContract> => {
    try {
      const response = await contractsApi.create(data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create contract');
    }
  },

  updateContract: async (id: string, data: Partial<ContractFormData>): Promise<AMCContract> => {
    try {
      const response = await contractsApi.update(id, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update contract');
    }
  },

  deleteContract: async (id: string): Promise<void> => {
    try {
      await contractsApi.delete(id);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete contract');
    }
  },
};
