import { api } from '../axios';
import { User, UserRole } from '@/types/auth';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  organizationId?: string;
  profile?: Record<string, any>;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: UserRole;
  profile?: Record<string, any>;
  isActive?: boolean;
}

export interface UsersResponse {
  success: boolean;
  count: number;
  data: User[];
}

export interface UserResponse {
  success: boolean;
  data: User;
}

export const usersApi = {
  getAll: async (): Promise<UsersResponse> => {
    const response = await api.get('/users');
    return response.data;
  },

  getById: async (id: string): Promise<UserResponse> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  create: async (data: CreateUserData): Promise<UserResponse> => {
    const response = await api.post('/users', data);
    return response.data;
  },

  update: async (id: string, data: UpdateUserData): Promise<UserResponse> => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};
