import { vendorsApi } from '@/api/endpoints/vendors.api';
import { Vendor, VendorFormData } from '@/types/vendor';

export const vendorsService = {
  async getAllVendors(): Promise<Vendor[]> {
    const response = await vendorsApi.getAll();
    return response.data;
  },

  async getVendorById(id: string): Promise<Vendor> {
    const response = await vendorsApi.getById(id);
    return response.data;
  },

  async createVendor(data: VendorFormData): Promise<Vendor> {
    const response = await vendorsApi.create(data);
    return response.data;
  },

  async updateVendor(id: string, data: Partial<VendorFormData>): Promise<Vendor> {
    const response = await vendorsApi.update(id, data);
    return response.data;
  },

  async deleteVendor(id: string): Promise<void> {
    await vendorsApi.delete(id);
  },
};
