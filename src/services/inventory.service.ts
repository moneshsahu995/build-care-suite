import { inventoryApi } from '@/api/endpoints/inventory.api';
import { InventoryItem, InventoryFormData } from '@/types/inventory';

export const inventoryService = {
  getAllItems: async (): Promise<InventoryItem[]> => {
    try {
      const response = await inventoryApi.getAll();
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch inventory items');
    }
  },

  getItemById: async (id: string): Promise<InventoryItem> => {
    try {
      const response = await inventoryApi.getById(id);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch inventory item');
    }
  },

  createItem: async (data: InventoryFormData): Promise<InventoryItem> => {
    try {
      const response = await inventoryApi.create(data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create inventory item');
    }
  },

  updateItem: async (id: string, data: Partial<InventoryFormData>): Promise<InventoryItem> => {
    try {
      const response = await inventoryApi.update(id, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update inventory item');
    }
  },

  deleteItem: async (id: string): Promise<void> => {
    try {
      await inventoryApi.delete(id);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete inventory item');
    }
  },
};
