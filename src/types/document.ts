export interface Document {
  id: string;
  name: string;
  key: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  category: DocumentCategory;
  projectId?: string;
  projectName?: string;
  greenProjectId?: string;
  workOrderId?: string;
  version: number;
  parentDocument?: string;
  uploadedBy: string;
  uploadedByName?: string;
  tags: string[];
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type DocumentCategory = 
  | 'project_plan'
  | 'certification'
  | 'compliance'
  | 'contract'
  | 'invoice'
  | 'work_order'
  | 'technical'
  | 'other';

export interface DocumentFormData {
  name: string;
  category: DocumentCategory;
  projectId?: string;
  greenProjectId?: string;
  workOrderId?: string;
  tags: string[];
  description: string;
  file?: File;
}
