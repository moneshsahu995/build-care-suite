import { bidsApi } from '@/api/endpoints/bids.api';
import { BidFormData } from '@/types/bid';

export const bidsService = {
  getAllBids: async () => {
    return await bidsApi.getAll();
  },

  getBidById: async (id: string) => {
    return await bidsApi.getById(id);
  },

  createBid: async (data: BidFormData) => {
    return await bidsApi.create(data);
  },

  updateBid: async (id: string, data: Partial<BidFormData>) => {
    return await bidsApi.update(id, data);
  },

  deleteBid: async (id: string) => {
    return await bidsApi.delete(id);
  },

  evaluateBid: async (id: string, evaluation: { score: number; priceScore: number; qualityScore: number; deliveryScore: number; notes: string }) => {
    return await bidsApi.evaluate(id, evaluation);
  },

  selectBid: async (id: string) => {
    return await bidsApi.select(id);
  },
};
