export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName?: string;
  assignedTo: string;
  assignedToName?: string;
  assignedBy: string;
  assignedByName?: string;
  startDate: string;
  dueDate: string;
  completedDate?: string;
  status: TaskStatus;
  priority: TaskPriority;
  estimatedHours: number;
  actualHours: number;
  dependencies: string[];
  tags: string[];
  attachments: TaskAttachment[];
  comments: TaskComment[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 
  | 'not_started'
  | 'in_progress'
  | 'completed'
  | 'on_hold';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TaskAttachment {
  url: string;
  name: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface TaskComment {
  text: string;
  userId: string;
  userName?: string;
  createdAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  projectId: string;
  assignedTo: string;
  startDate: string;
  dueDate: string;
  priority: TaskPriority;
  estimatedHours: number;
  dependencies: string[];
  tags: string[];
}
