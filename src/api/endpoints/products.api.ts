import { api } from '../axios';
import { Product, ProductFormData } from '@/types/product';

export const productsApi = {
  getAll: async () => {
    const response = await api.get<{ success: boolean; count: number; data: Product[] }>('/products');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: Product }>(`/products/${id}`);
    return response.data;
  },

  create: async (data: ProductFormData) => {
    const response = await api.post<{ success: boolean; data: Product }>('/products', data);
    return response.data;
  },

  update: async (id: string, data: Partial<ProductFormData>) => {
    const response = await api.put<{ success: boolean; data: Product }>(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ success: boolean; message: string }>(`/products/${id}`);
    return response.data;
  },
};
