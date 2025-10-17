import { projectsApi } from '@/api/endpoints/projects.api';
import { Project, ProjectFormData } from '@/types/project';

export const projectsService = {
  async getAllProjects(): Promise<Project[]> {
    const response = await projectsApi.getAll();
    return response.data;
  },

  async getProjectById(id: string): Promise<Project> {
    const response = await projectsApi.getById(id);
    return response.data;
  },

  async createProject(data: ProjectFormData): Promise<Project> {
    const response = await projectsApi.create(data);
    return response.data;
  },

  async updateProject(id: string, data: Partial<ProjectFormData>): Promise<Project> {
    const response = await projectsApi.update(id, data);
    return response.data;
  },

  async deleteProject(id: string): Promise<void> {
    await projectsApi.delete(id);
  },
};
