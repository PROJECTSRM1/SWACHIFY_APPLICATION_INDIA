// types.ts

export type TabKey =
  | 'dashboard'
  | 'tickets'
  | 'users'
  | 'freelancers'
  | 'vendors'
  | 'services';

// ================== STATUS TYPES ==================
export type ServiceStatus = 'active' | 'inactive';

// ================== LEVEL-3: SUB SERVICES ==================
export type ServiceItem = {
  id: string;
  name: string;
  description: string;
};

// ================== LEVEL-2: SUB-CATEGORIES ==================
export type ServiceSubCategory = {
  id: string;
  name: string;
  description: string;
  status: ServiceStatus;
  services: ServiceItem[];
};

// ================== LEVEL-1: CATEGORIES ==================
export type ServiceCategory = {
  id: string;
  name: string;
  description: string;
  status: ServiceStatus;
  subcategories: ServiceSubCategory[];
};

// ===============================================
// Below are your existing types (unchanged)
// ===============================================

export type TicketStatus =
  | 'pending'
  | 'accepted'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

export type TicketPriority = 'low' | 'medium' | 'high';

export type PaymentStatus = 'paid' | 'pending' | 'failed';

export type Ticket = {
  id: string;
  customer: string;
  service: string;
  date: string;
  serviceStatus: TicketStatus;
  assignedTo: string;
  priority: TicketPriority;
  paymentStatus: PaymentStatus;
  location: string;
};

export type UserStatus = 'active' | 'blocked';
export type User = {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: UserStatus;
  plan: string;
  location: string;
};

export type VendorStatus = 'active' | 'inactive';
export type Vendor = {
  id: string;
  name: string;
  email: string;
  service: string;
  pan: string;
  status: VendorStatus;
  totalOrders: number;
  contact: string;
  location: string;
};

export type FreelancerStatus = 'pending' | 'approved' | 'rejected';
export type Freelancer = {
  id: string;
  name: string;
  email: string;
  skills: string[];
  completed: number;
  rating: number;
  status: FreelancerStatus;
  age: number;
  city: string;
};
export interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface Form {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  category: string;
  fields: FormField[];
  createdAt?: string;
  updatedAt?: string;
}