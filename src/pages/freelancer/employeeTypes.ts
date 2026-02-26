// Core Types
export type JobStatus = "new" | "accepted" | "ongoing" | "completed" | "cancelled";
export type PaymentStatus = "pending" | "processing" | "completed" | "failed";
export type SupportTicketStatus = "open" | "in_progress" | "resolved" | "closed";
export type NotificationType = "job" | "payment" | "system" | "message";
export type ThemeMode = "light" | "dark";
export type Language = "en" | "hi" | "te";

export interface Job {
  id: number;
  service: string;
  customer: string;
  address: string;
  phone: string;
  amount: number;
  status: JobStatus;
  scheduledDate: string;
  scheduledTime: string;
  duration: number; // in minutes
  specialInstructions?: string;
  cancelReason?: string;
  completedAt?: string;
  acceptedAt?: string;
  startedAt?: string;
  latitude?: number;
  longitude?: number;
  distance?: number; // in km
  beforePhotos?: string[];
  afterPhotos?: string[];
  completionNotes?: string;
  customerSignature?: string;
  rating?: number;
  review?: string;
  tip?: number;
}

export interface EmployeeProfile {
  id: number;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  rating: number;
  totalJobs: number;
  verified: boolean;
  joinedDate: string;
  incentives: number;
  bankAccount?: BankDetails;
  documents: Document[];
  availability: Availability;
  serviceArea: string[];
  skills: string[];
  languages: Language[];
  emergencyContact?: EmergencyContact;
}

export interface BankDetails {
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  bankName: string;
  verified: boolean;
}

export interface Document {
  id: number;
  type: "aadhaar" | "pan" | "license" | "certificate" | "photo";
  name: string;
  url: string;
  verified: boolean;
  uploadedAt: string;
}

export interface Availability {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface TimeSlot {
  start: string; // "09:00"
  end: string; // "18:00"
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

export interface Transaction {
  id: number;
  type: "earning" | "withdrawal" | "bonus" | "tip" | "penalty";
  amount: number;
  status: PaymentStatus;
  date: string;
  jobId?: number;
  description: string;
  referenceNumber?: string;
}

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  actionUrl?: string;
  jobId?: number;
}

export interface SupportTicket {
  id: number;
  subject: string;
  description: string;
  status: SupportTicketStatus;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
  responses: TicketResponse[];
  attachments?: string[];
}

export interface TicketResponse {
  id: number;
  message: string;
  sender: "employee" | "support";
  timestamp: string;
}

export interface ChatMessage {
  id: number;
  jobId: number;
  senderId: number;
  senderName: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface EarningsAnalytics {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
  averagePerJob: number;
  trend: "up" | "down" | "stable";
  percentageChange: number;
}

export interface PerformanceMetrics {
  completionRate: number;
  averageRating: number;
  responseTime: number; // in minutes
  totalEarnings: number;
  streak: number; // consecutive days worked
}

export interface Incentive {
  id: number;
  type: "referral" | "milestone" | "bonus" | "streak";
  amount: number;
  description: string;
  earnedDate: string;
  status: "earned" | "claimed" | "expired";
}

export interface Settings {
  theme: ThemeMode;
  language: Language;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

export interface NotificationSettings {
  pushEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  newJobs: boolean;
  payments: boolean;
  messages: boolean;
  updates: boolean;
}

export interface PrivacySettings {
  showPhoneToCustomers: boolean;
  shareLocation: boolean;
  profileVisibility: "public" | "private";
}

export interface WithdrawalRequest {
  id: number;
  amount: number;
  status: PaymentStatus;
  requestedAt: string;
  processedAt?: string;
  accountDetails: string;
  referenceNumber?: string;
}
