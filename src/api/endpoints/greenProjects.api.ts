import { api } from '../axios';
import { GreenProject, GreenProjectFormData, ChecklistItem, Cost } from '@/types/greenProject';

export const greenProjectsApi = {
  getAll: async () => {
    const response = await api.get<{ success: boolean; count: number; data: GreenProject[] }>('/green-projects');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: GreenProject }>(`/green-projects/${id}`);
    return response.data;
  },

  create: async (data: GreenProjectFormData) => {
    const response = await api.post<{ success: boolean; data: GreenProject }>('/green-projects', data);
    return response.data;
  },

  update: async (id: string, data: Partial<GreenProject>) => {
    const response = await api.put<{ success: boolean; data: GreenProject }>(`/green-projects/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ success: boolean; message: string }>(`/green-projects/${id}`);
    return response.data;
  },

  addChecklist: async (id: string, checklist: { name: string; description: string; items: ChecklistItem[] }) => {
    const response = await api.post<{ success: boolean; data: GreenProject }>(`/green-projects/${id}/checklists`, checklist);
    return response.data;
  },

  updateChecklistItem: async (id: string, checklistIndex: number, itemIndex: number, status: string) => {
    const response = await api.put<{ success: boolean; data: GreenProject }>(
      `/green-projects/${id}/checklists/${checklistIndex}/items/${itemIndex}`,
      { status }
    );
    return response.data;
  },

  addCost: async (id: string, cost: Omit<Cost, 'paidDate'>) => {
    const response = await api.post<{ success: boolean; data: GreenProject }>(`/green-projects/${id}/costs`, cost);
    return response.data;
  },
};
