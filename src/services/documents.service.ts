import { documentsApi } from '@/api/endpoints/documents.api';

export const documentsService = {
  getAllDocuments: async () => {
    return await documentsApi.getAll();
  },

  getDocumentById: async (id: string) => {
    return await documentsApi.getById(id);
  },

  uploadDocument: async (formData: FormData) => {
    return await documentsApi.upload(formData);
  },

  updateDocument: async (id: string, formData: FormData) => {
    return await documentsApi.update(id, formData);
  },

  deleteDocument: async (id: string) => {
    return await documentsApi.delete(id);
  },

  downloadDocument: async (id: string) => {
    return await documentsApi.download(id);
  },
};
