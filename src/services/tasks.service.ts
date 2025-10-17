import { tasksApi } from '@/api/endpoints/tasks.api';
import { Task, TaskFormData } from '@/types/task';

export const tasksService = {
  async getAllTasks(): Promise<Task[]> {
    const response = await tasksApi.getAll();
    return response.data;
  },

  async getTaskById(id: string): Promise<Task> {
    const response = await tasksApi.getById(id);
    return response.data;
  },

  async createTask(data: TaskFormData): Promise<Task> {
    const response = await tasksApi.create(data);
    return response.data;
  },

  async updateTask(id: string, data: Partial<TaskFormData>): Promise<Task> {
    const response = await tasksApi.update(id, data);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await tasksApi.delete(id);
  },

  async addComment(id: string, text: string): Promise<Task> {
    const response = await tasksApi.addComment(id, text);
    return response.data;
  },
};
