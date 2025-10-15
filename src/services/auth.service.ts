import { authApi, LoginCredentials, RegisterData } from '@/api/endpoints/auth.api';
import { User } from '@/types/auth';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials);
      if (response.success) {
        return response.data;
      }
      throw new Error('Login failed');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  register: async (data: RegisterData) => {
    try {
      const response = await authApi.register(data);
      if (response.success) {
        return response.data;
      }
      throw new Error('Registration failed');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  forgotPassword: async (email: string) => {
    try {
      const response = await authApi.forgotPassword(email);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send reset email');
    }
  },

  resetPassword: async (token: string, password: string, confirmPassword: string) => {
    try {
      const response = await authApi.resetPassword(token, password, confirmPassword);
      if (response.success) {
        return response.data;
      }
      throw new Error('Password reset failed');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password reset failed');
    }
  },

  changePassword: async (currentPassword: string, newPassword: string, confirmPassword: string) => {
    try {
      const response = await authApi.changePassword(currentPassword, newPassword, confirmPassword);
      if (response.success) {
        return response.data;
      }
      throw new Error('Password change failed');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password change failed');
    }
  },
};
