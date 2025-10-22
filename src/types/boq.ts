export interface BOQ {
  id: string;
  name: string;
  projectId: string;
  projectName?: string;
  items: BOQItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  status: BOQStatus;
  approvedBy?: string;
  approvedByName?: string;
  approvedDate?: string;
  version: number;
  parentBOQ?: string;
  notes: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BOQStatus = 'draft' | 'approved' | 'sent_for_procurement' | 'ordered';

export interface BOQItem {
  description: string;
  unit: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface BOQFormData {
  name: string;
  projectId: string;
  items: BOQItem[];
  currency: string;
  notes: string;
}
