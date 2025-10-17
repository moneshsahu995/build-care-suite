export interface Tenant {
  id: string;
  name: string;
  contact: TenantContact;
  buildingId: string;
  buildingName?: string;
  unit: string;
  area: number;
  leaseDetails: LeaseDetails;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TenantContact {
  email: string;
  phone: string;
  alternatePhone?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
}

export interface LeaseDetails {
  startDate: string;
  endDate: string;
  monthlyRent: number;
  securityDeposit: number;
  escalationRate: number;
  renewalTerms: string;
  terms: string;
}

export interface TenantFormData {
  name: string;
  contact: TenantContact;
  buildingId: string;
  unit: string;
  area: number;
  leaseDetails: LeaseDetails;
}
