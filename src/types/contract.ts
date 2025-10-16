export interface AMCContract {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  vendorId: string;
  vendorName?: string;
  buildingId: string;
  buildingName?: string;
  status: ContractStatus;
  reminders: string[];
  slaTerms: string;
  value: number;
  renewalReminderDays: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ContractStatus = 'active' | 'expired' | 'pending_renewal';

export interface ContractFormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  vendorId: string;
  buildingId: string;
  slaTerms: string;
  value: number;
  renewalReminderDays: number;
}
