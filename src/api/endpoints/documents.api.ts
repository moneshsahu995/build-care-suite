import { api } from '../axios';
import { Document } from '@/types/document';

export const documentsApi = {
  getAll: async () => {
    const response = await api.get<{ success: boolean; count: number; data: Document[] }>('/documents');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: Document }>(`/documents/${id}`);
    return response.data;
  },

  upload: async (formData: FormData) => {
    const response = await api.post<{ success: boolean; data: Document }>('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id: string, formData: FormData) => {
    const response = await api.put<{ success: boolean; data: Document }>(`/documents/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ success: boolean; message: string }>(`/documents/${id}`);
    return response.data;
  },

  download: async (id: string) => {
    const response = await api.get(`/documents/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },
};
