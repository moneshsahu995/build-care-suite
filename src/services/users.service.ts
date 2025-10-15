import { usersApi, CreateUserData, UpdateUserData } from '@/api/endpoints/users.api';

export const usersService = {
  getAllUsers: async () => {
    try {
      const response = await usersApi.getAll();
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  },

  getUserById: async (id: string) => {
    try {
      const response = await usersApi.getById(id);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  },

  createUser: async (data: CreateUserData) => {
    try {
      const response = await usersApi.create(data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create user');
    }
  },

  updateUser: async (id: string, data: UpdateUserData) => {
    try {
      const response = await usersApi.update(id, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update user');
    }
  },

  deleteUser: async (id: string) => {
    try {
      await usersApi.delete(id);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
  },
};
