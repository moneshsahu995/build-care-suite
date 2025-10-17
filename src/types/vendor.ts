export interface Vendor {
  id: string;
  name: string;
  contact: VendorContact;
  address: string;
  category: VendorCategory[];
  services: string[];
  organizationId: string;
  gstNumber: string;
  panNumber: string;
  bankDetails: BankDetails;
  rating: number;
  performance: VendorPerformance;
  contracts: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type VendorCategory = 
  | 'electrical'
  | 'plumbing'
  | 'hvac'
  | 'civil'
  | 'cleaning'
  | 'security'
  | 'landscaping'
  | 'materials'
  | 'equipment'
  | 'other';

export interface VendorContact {
  email: string;
  phone: string;
  alternatePhone?: string;
  contactPerson: string;
  designation: string;
}

export interface BankDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  branch: string;
}

export interface VendorPerformance {
  totalJobs: number;
  completedJobs: number;
  onTimeDelivery: number;
  qualityRating: number;
  lastUpdated: string;
}

export interface VendorFormData {
  name: string;
  contact: VendorContact;
  address: string;
  category: VendorCategory[];
  services: string[];
  gstNumber: string;
  panNumber: string;
  bankDetails: BankDetails;
}
