import { boqsApi } from '@/api/endpoints/boqs.api';
import { BOQFormData } from '@/types/boq';

export const boqsService = {
  getAllBOQs: async () => {
    return await boqsApi.getAll();
  },

  getBOQById: async (id: string) => {
    return await boqsApi.getById(id);
  },

  createBOQ: async (data: BOQFormData) => {
    return await boqsApi.create(data);
  },

  updateBOQ: async (id: string, data: Partial<BOQFormData>) => {
    return await boqsApi.update(id, data);
  },

  deleteBOQ: async (id: string) => {
    return await boqsApi.delete(id);
  },

  exportBOQ: async (id: string) => {
    return await boqsApi.export(id);
  },
};
