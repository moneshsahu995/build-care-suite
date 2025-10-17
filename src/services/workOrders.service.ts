import { workOrdersApi } from '@/api/endpoints/workOrders.api';
import { WorkOrder, WorkOrderFormData } from '@/types/workOrder';

export const workOrdersService = {
  async getAllWorkOrders(): Promise<WorkOrder[]> {
    const response = await workOrdersApi.getAll();
    return response.data;
  },

  async getWorkOrderById(id: string): Promise<WorkOrder> {
    const response = await workOrdersApi.getById(id);
    return response.data;
  },

  async createWorkOrder(data: WorkOrderFormData): Promise<WorkOrder> {
    const response = await workOrdersApi.create(data);
    return response.data;
  },

  async updateWorkOrder(id: string, data: Partial<WorkOrderFormData>): Promise<WorkOrder> {
    const response = await workOrdersApi.update(id, data);
    return response.data;
  },

  async deleteWorkOrder(id: string): Promise<void> {
    await workOrdersApi.delete(id);
  },

  async addPhoto(id: string, photo: { url: string; caption: string }): Promise<WorkOrder> {
    const response = await workOrdersApi.addPhoto(id, photo);
    return response.data;
  },

  async addPartsUsed(id: string, parts: { inventoryItemId: string; quantity: number }): Promise<WorkOrder> {
    const response = await workOrdersApi.addPartsUsed(id, parts);
    return response.data;
  },
};
