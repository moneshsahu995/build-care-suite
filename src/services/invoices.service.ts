import { invoicesApi } from '@/api/endpoints/invoices.api';
import { Invoice, InvoiceFormData } from '@/types/invoice';

export const invoicesService = {
  async getAllInvoices(): Promise<Invoice[]> {
    const response = await invoicesApi.getAll();
    return response.data;
  },

  async getInvoiceById(id: string): Promise<Invoice> {
    const response = await invoicesApi.getById(id);
    return response.data;
  },

  async createInvoice(data: InvoiceFormData): Promise<Invoice> {
    const response = await invoicesApi.create(data);
    return response.data;
  },

  async updateInvoice(id: string, data: Partial<InvoiceFormData>): Promise<Invoice> {
    const response = await invoicesApi.update(id, data);
    return response.data;
  },

  async deleteInvoice(id: string): Promise<void> {
    await invoicesApi.delete(id);
  },

  async addPayment(id: string, payment: { amount: number; method: string; reference: string; notes: string }): Promise<Invoice> {
    const response = await invoicesApi.addPayment(id, payment);
    return response.data;
  },
};
