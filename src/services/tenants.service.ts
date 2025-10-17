import { tenantsApi } from '@/api/endpoints/tenants.api';
import { Tenant, TenantFormData } from '@/types/tenant';

export const tenantsService = {
  async getAllTenants(): Promise<Tenant[]> {
    const response = await tenantsApi.getAll();
    return response.data;
  },

  async getTenantById(id: string): Promise<Tenant> {
    const response = await tenantsApi.getById(id);
    return response.data;
  },

  async createTenant(data: TenantFormData): Promise<Tenant> {
    const response = await tenantsApi.create(data);
    return response.data;
  },

  async updateTenant(id: string, data: Partial<TenantFormData>): Promise<Tenant> {
    const response = await tenantsApi.update(id, data);
    return response.data;
  },

  async deleteTenant(id: string): Promise<void> {
    await tenantsApi.delete(id);
  },
};
