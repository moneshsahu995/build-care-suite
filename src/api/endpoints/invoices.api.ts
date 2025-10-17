import { api } from '../axios';
import { Invoice, InvoiceFormData } from '@/types/invoice';

export const invoicesApi = {
  getAll: async () => {
    const response = await api.get<{ success: boolean; count: number; data: Invoice[] }>('/invoices');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: Invoice }>(`/invoices/${id}`);
    return response.data;
  },

  create: async (data: InvoiceFormData) => {
    const response = await api.post<{ success: boolean; data: Invoice }>('/invoices', data);
    return response.data;
  },

  update: async (id: string, data: Partial<InvoiceFormData>) => {
    const response = await api.put<{ success: boolean; data: Invoice }>(`/invoices/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ success: boolean; message: string }>(`/invoices/${id}`);
    return response.data;
  },

  addPayment: async (id: string, payment: { amount: number; method: string; reference: string; notes: string }) => {
    const response = await api.post<{ success: boolean; data: Invoice }>(`/invoices/${id}/payments`, payment);
    return response.data;
  },
};
