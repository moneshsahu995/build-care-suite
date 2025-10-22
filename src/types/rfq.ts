export interface RFQ {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName?: string;
  boqId?: string;
  boqName?: string;
  organizationId: string;
  deadline: string;
  items: RFQItem[];
  vendors: string[];
  vendorNames?: string[];
  status: RFQStatus;
  evaluationCriteria: EvaluationCriteria;
  terms: string;
  createdBy: string;
  createdByName?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type RFQStatus = 'draft' | 'published' | 'closed';

export interface RFQItem {
  description: string;
  unit: string;
  quantity: number;
  specifications: string;
}

export interface EvaluationCriteria {
  priceWeightage: number;
  qualityWeightage: number;
  deliveryWeightage: number;
}

export interface RFQFormData {
  title: string;
  description: string;
  projectId: string;
  boqId?: string;
  deadline: string;
  items: RFQItem[];
  vendors: string[];
  evaluationCriteria: EvaluationCriteria;
  terms: string;
}
