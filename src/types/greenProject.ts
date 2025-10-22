export interface GreenProject {
  id: string;
  projectId: string;
  projectName?: string;
  certificationType: CertificationType;
  status: CertificationStatus;
  submissionDate?: string;
  referenceNumber?: string;
  targetRating: string;
  achievedRating?: string;
  score?: number;
  consultants: Consultant[];
  checklists: Checklist[];
  calculations: string[];
  narratives: string[];
  costs: Cost[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CertificationType = 'IGBC' | 'GRIHA' | 'LEED' | 'BEE';

export type CertificationStatus = 
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected';

export interface Consultant {
  userId: string;
  userName?: string;
  role: string;
  assignedDate: string;
}

export interface Checklist {
  name: string;
  description: string;
  items: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  completedDate?: string;
  completedBy?: string;
}

export interface Cost {
  type: 'registration' | 'consultation' | 'certification' | 'other';
  amount: number;
  description: string;
  paymentStatus: 'pending' | 'paid';
  paidDate?: string;
}

export interface GreenProjectFormData {
  projectId: string;
  certificationType: CertificationType;
  targetRating: string;
  consultants: Omit<Consultant, 'userName'>[];
}
