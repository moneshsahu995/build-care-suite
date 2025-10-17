export interface Project {
  id: string;
  name: string;
  description: string;
  type: ProjectType;
  buildingId: string;
  buildingName?: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  status: ProjectStatus;
  managerId: string;
  managerName?: string;
  team: string[];
  priority: ProjectPriority;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ProjectType = 
  | 'maintenance'
  | 'renovation'
  | 'construction'
  | 'green_certification'
  | 'interior_design';

export type ProjectStatus = 
  | 'planning'
  | 'in_progress'
  | 'completed'
  | 'on_hold';

export type ProjectPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface ProjectFormData {
  name: string;
  description: string;
  type: ProjectType;
  buildingId: string;
  startDate: string;
  endDate: string;
  budget: number;
  managerId: string;
  priority: ProjectPriority;
  tags: string[];
}
