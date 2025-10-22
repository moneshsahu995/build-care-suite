export const APP_NAME = 'BuildMaintain';
export const APP_VERSION = '1.0.0';
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const COMPANY_INFO = {
  name: 'BuildMaintain',
  email: 'contact@buildmaintain.com',
  phone: '+91 1234567890',
  address: 'Mumbai, India',
};

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ORGANIZATION_ADMIN: 'organization_admin',
  FACILITY_MANAGER: 'facility_manager',
  GREEN_BUILDING_CONSULTANT: 'green_building_consultant',
  INTERIOR_DESIGNER: 'interior_designer',
  VENDOR: 'vendor',
  FINANCE_MANAGER: 'finance_manager',
  FIELD_TECHNICIAN: 'field_technician',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  BUILDINGS: '/buildings',
  CONTRACTS: '/contracts',
  WORK_ORDERS: '/work-orders',
  INVENTORY: '/inventory',
  PROJECTS: '/projects',
  TENANTS: '/tenants',
  INVOICES: '/invoices',
  VENDORS: '/vendors',
  CERTIFICATIONS: '/certifications',
  DOCUMENTS: '/documents',
  BOQS: '/boqs',
  PRODUCTS: '/products',
  RFQS: '/rfqs',
  BIDS: '/bids',
  CALCULATIONS: '/calculations',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;
