import { api } from '../axios';
import { Project, ProjectFormData } from '@/types/project';

export const projectsApi = {
  getAll: async () => {
    const response = await api.get<{ success: boolean; count: number; data: Project[] }>('/projects');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: Project }>(`/projects/${id}`);
    return response.data;
  },

  create: async (data: ProjectFormData) => {
    const response = await api.post<{ success: boolean; data: Project }>('/projects', data);
    return response.data;
  },

  update: async (id: string, data: Partial<ProjectFormData>) => {
    const response = await api.put<{ success: boolean; data: Project }>(`/projects/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ success: boolean; message: string }>(`/projects/${id}`);
    return response.data;
  },
};
