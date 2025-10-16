export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  reorderPoint: number;
  unit: string;
  category: InventoryCategory;
  buildingId: string;
  buildingName?: string;
  vendorId?: string;
  vendorName?: string;
  location: string;
  purchasePrice: number;
  lastRestockDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type InventoryCategory = 
  | 'electrical'
  | 'plumbing'
  | 'hvac'
  | 'safety'
  | 'cleaning'
  | 'tools'
  | 'other';

export interface InventoryFormData {
  name: string;
  description: string;
  quantity: number;
  reorderPoint: number;
  unit: string;
  category: InventoryCategory;
  buildingId: string;
  vendorId?: string;
  location: string;
  purchasePrice: number;
}
