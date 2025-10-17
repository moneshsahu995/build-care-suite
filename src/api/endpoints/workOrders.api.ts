import { api } from '../axios';
import { WorkOrder, WorkOrderFormData } from '@/types/workOrder';

export const workOrdersApi = {
  getAll: async () => {
    const response = await api.get<{ success: boolean; count: number; data: WorkOrder[] }>('/work-orders');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: WorkOrder }>(`/work-orders/${id}`);
    return response.data;
  },

  create: async (data: WorkOrderFormData) => {
    const response = await api.post<{ success: boolean; data: WorkOrder }>('/work-orders', data);
    return response.data;
  },

  update: async (id: string, data: Partial<WorkOrderFormData>) => {
    const response = await api.put<{ success: boolean; data: WorkOrder }>(`/work-orders/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ success: boolean; message: string }>(`/work-orders/${id}`);
    return response.data;
  },

  addPhoto: async (id: string, photo: { url: string; caption: string }) => {
    const response = await api.post<{ success: boolean; data: WorkOrder }>(`/work-orders/${id}/photos`, photo);
    return response.data;
  },

  addPartsUsed: async (id: string, parts: { inventoryItemId: string; quantity: number }) => {
    const response = await api.post<{ success: boolean; data: WorkOrder }>(`/work-orders/${id}/parts-used`, parts);
    return response.data;
  },
};
