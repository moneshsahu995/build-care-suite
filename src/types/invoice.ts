export interface Invoice {
  id: string;
  invoiceNumber: string;
  tenantId: string;
  tenantName?: string;
  buildingId: string;
  buildingName?: string;
  billingPeriod: BillingPeriod;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  dueDate: string;
  status: InvoiceStatus;
  payments: Payment[];
  isRecurring: boolean;
  recurringFrequency?: RecurringFrequency;
  parentInvoice?: string;
  notes: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type InvoiceStatus = 
  | 'draft'
  | 'pending'
  | 'partially_paid'
  | 'paid'
  | 'overdue';

export type RecurringFrequency = 'monthly' | 'quarterly' | 'half_yearly' | 'yearly';

export interface BillingPeriod {
  startDate: string;
  endDate: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Payment {
  id: string;
  amount: number;
  method: PaymentMethod;
  reference: string;
  notes: string;
  paidAt: string;
  paidBy: string;
}

export type PaymentMethod = 
  | 'cash'
  | 'cheque'
  | 'bank_transfer'
  | 'upi'
  | 'card';

export interface InvoiceFormData {
  tenantId: string;
  billingPeriod: BillingPeriod;
  items: InvoiceItem[];
  dueDate: string;
  isRecurring: boolean;
  recurringFrequency?: RecurringFrequency;
  parentInvoice?: string;
  notes: string;
}
