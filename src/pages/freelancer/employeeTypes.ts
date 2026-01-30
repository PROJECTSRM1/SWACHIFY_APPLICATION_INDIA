export type JobStatus =
  | "new"
  | "accepted"
  | "ongoing"
  | "completed"
  | "cancelled";

export interface Job {
  id: number;
  service: string;
  customer: string;
  phone: string;
  address: string;
  amount: number;
  status: JobStatus;
  assignedAt: string;
  completedAt?: string;
  cancelReason?: string;
}

export interface EmployeeProfile {
  name: string;
  phone: string;
  rating: number;
  verified: boolean;
  incentives: number;
}
