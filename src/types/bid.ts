export interface Bid {
  id: string;
  rfqId: string;
  rfqTitle?: string;
  vendorId: string;
  vendorName?: string;
  amount: number;
  currency: string;
  validityPeriod: number;
  items: BidItem[];
  technicalProposal: string;
  deliveryTimeline: string;
  terms: string;
  attachments: string[];
  status: BidStatus;
  evaluation?: BidEvaluation;
  submittedBy: string;
  submittedByName?: string;
  submittedAt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BidStatus = 
  | 'draft'
  | 'submitted'
  | 'under_evaluation'
  | 'selected'
  | 'rejected';

export interface BidItem {
  description: string;
  unit: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface BidEvaluation {
  score: number;
  priceScore: number;
  qualityScore: number;
  deliveryScore: number;
  notes: string;
  evaluatedBy: string;
  evaluatedAt: string;
}

export interface BidFormData {
  rfqId: string;
  amount: number;
  currency: string;
  validityPeriod: number;
  items: BidItem[];
  technicalProposal: string;
  deliveryTimeline: string;
  terms: string;
}
