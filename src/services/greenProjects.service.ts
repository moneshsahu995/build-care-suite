import { greenProjectsApi } from '@/api/endpoints/greenProjects.api';
import { GreenProjectFormData, ChecklistItem, Cost } from '@/types/greenProject';

export const greenProjectsService = {
  getAllGreenProjects: async () => {
    return await greenProjectsApi.getAll();
  },

  getGreenProjectById: async (id: string) => {
    return await greenProjectsApi.getById(id);
  },

  createGreenProject: async (data: GreenProjectFormData) => {
    return await greenProjectsApi.create(data);
  },

  updateGreenProject: async (id: string, data: any) => {
    return await greenProjectsApi.update(id, data);
  },

  deleteGreenProject: async (id: string) => {
    return await greenProjectsApi.delete(id);
  },

  addChecklist: async (id: string, checklist: { name: string; description: string; items: ChecklistItem[] }) => {
    return await greenProjectsApi.addChecklist(id, checklist);
  },

  updateChecklistItem: async (id: string, checklistIndex: number, itemIndex: number, status: string) => {
    return await greenProjectsApi.updateChecklistItem(id, checklistIndex, itemIndex, status);
  },

  addCost: async (id: string, cost: Omit<Cost, 'paidDate'>) => {
    return await greenProjectsApi.addCost(id, cost);
  },
};
