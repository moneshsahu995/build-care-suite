import { productsApi } from '@/api/endpoints/products.api';
import { ProductFormData } from '@/types/product';

export const productsService = {
  getAllProducts: async () => {
    return await productsApi.getAll();
  },

  getProductById: async (id: string) => {
    return await productsApi.getById(id);
  },

  createProduct: async (data: ProductFormData) => {
    return await productsApi.create(data);
  },

  updateProduct: async (id: string, data: Partial<ProductFormData>) => {
    return await productsApi.update(id, data);
  },

  deleteProduct: async (id: string) => {
    return await productsApi.delete(id);
  },
};
