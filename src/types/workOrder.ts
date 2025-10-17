export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  buildingId: string;
  buildingName?: string;
  assignedTo: string;
  assignedToName?: string;
  assignedBy: string;
  assignedByName?: string;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  category: WorkOrderCategory;
  estimatedDuration: number;
  actualDuration: number;
  scheduledDate: string;
  completedDate?: string;
  amcContractId?: string;
  amcContractTitle?: string;
  location: string;
  photos: WorkOrderPhoto[];
  partsUsed: PartUsed[];
  cost: number;
  statusHistory: StatusHistory[];
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type WorkOrderStatus = 
  | 'open'
  | 'in_progress'
  | 'awaiting_parts'
  | 'completed'
  | 'closed';

export type WorkOrderPriority = 'low' | 'medium' | 'high' | 'urgent';

export type WorkOrderCategory = 
  | 'electrical'
  | 'plumbing'
  | 'hvac'
  | 'structural'
  | 'cleaning'
  | 'landscaping'
  | 'security'
  | 'other';

export interface WorkOrderPhoto {
  url: string;
  caption: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface PartUsed {
  inventoryItemId: string;
  inventoryItemName?: string;
  quantity: number;
  addedAt: string;
  addedBy: string;
}

export interface StatusHistory {
  status: WorkOrderStatus;
  changedAt: string;
  changedBy: string;
  notes: string;
}

export interface WorkOrderFormData {
  title: string;
  description: string;
  buildingId: string;
  assignedTo: string;
  priority: WorkOrderPriority;
  category: WorkOrderCategory;
  estimatedDuration: number;
  scheduledDate: string;
  amcContractId?: string;
  location: string;
  tags: string[];
}
