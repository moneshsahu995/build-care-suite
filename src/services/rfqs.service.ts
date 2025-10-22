import { rfqsApi } from '@/api/endpoints/rfqs.api';
import { RFQFormData } from '@/types/rfq';

export const rfqsService = {
  getAllRFQs: async () => {
    return await rfqsApi.getAll();
  },

  getRFQById: async (id: string) => {
    return await rfqsApi.getById(id);
  },

  createRFQ: async (data: RFQFormData) => {
    return await rfqsApi.create(data);
  },

  updateRFQ: async (id: string, data: Partial<RFQFormData>) => {
    return await rfqsApi.update(id, data);
  },

  deleteRFQ: async (id: string) => {
    return await rfqsApi.delete(id);
  },
};
