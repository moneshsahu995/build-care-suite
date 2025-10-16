import { buildingsApi } from '@/api/endpoints/buildings.api';
import { Building, BuildingFormData } from '@/types/building';

export const buildingsService = {
  getAllBuildings: async (): Promise<Building[]> => {
    try {
      const response = await buildingsApi.getAll();
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch buildings');
    }
  },

  getBuildingById: async (id: string): Promise<Building> => {
    try {
      const response = await buildingsApi.getById(id);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch building');
    }
  },

  createBuilding: async (data: BuildingFormData): Promise<Building> => {
    try {
      const response = await buildingsApi.create(data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create building');
    }
  },

  updateBuilding: async (id: string, data: Partial<BuildingFormData>): Promise<Building> => {
    try {
      const response = await buildingsApi.update(id, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update building');
    }
  },

  deleteBuilding: async (id: string): Promise<void> => {
    try {
      await buildingsApi.delete(id);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete building');
    }
  },
};
