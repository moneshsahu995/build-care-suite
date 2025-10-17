import { api } from '../axios';
import { Task, TaskFormData } from '@/types/task';

export const tasksApi = {
  getAll: async () => {
    const response = await api.get<{ success: boolean; count: number; data: Task[] }>('/tasks');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ success: boolean; data: Task }>(`/tasks/${id}`);
    return response.data;
  },

  create: async (data: TaskFormData) => {
    const response = await api.post<{ success: boolean; data: Task }>('/tasks', data);
    return response.data;
  },

  update: async (id: string, data: Partial<TaskFormData>) => {
    const response = await api.put<{ success: boolean; data: Task }>(`/tasks/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<{ success: boolean; message: string }>(`/tasks/${id}`);
    return response.data;
  },

  addComment: async (id: string, text: string) => {
    const response = await api.post<{ success: boolean; data: Task }>(`/tasks/${id}/comments`, { text });
    return response.data;
  },
};
