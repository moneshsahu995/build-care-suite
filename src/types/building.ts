export interface Building {
  id: string;
  name: string;
  address: string;
  area: number;
  organizationId: string;
  facilityManagerId?: string;
  facilityManagerName?: string;
  type: BuildingType;
  yearBuilt: number;
  floors: number;
  isActive: boolean;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt: string;
}

export type BuildingType = 
  | 'residential'
  | 'commercial'
  | 'industrial'
  | 'mixed_use'
  | 'institutional';

export interface BuildingFormData {
  name: string;
  address: string;
  area: number;
  facilityManagerId?: string;
  type: BuildingType;
  yearBuilt: number;
  floors: number;
  latitude?: number;
  longitude?: number;
}

export interface BuildingStats {
  totalContracts: number;
  activeWorkOrders: number;
  totalProjects: number;
  maintenanceCost: number;
}
