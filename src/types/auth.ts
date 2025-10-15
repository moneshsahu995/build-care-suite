export type UserRole =
  | 'super_admin'
  | 'organization_admin'
  | 'facility_manager'
  | 'green_building_consultant'
  | 'interior_designer'
  | 'vendor'
  | 'finance_manager'
  | 'field_technician';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId?: string;
  organizationName?: string;
  profile?: Record<string, any>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
    refreshToken: string;
  };
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  organizationName?: string;
  organizationId?: string;
  profile?: Record<string, any>;
}
