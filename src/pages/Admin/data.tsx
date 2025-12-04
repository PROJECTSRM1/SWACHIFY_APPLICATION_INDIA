import { DashboardOutlined, FieldTimeOutlined, ShopOutlined, TeamOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons'
import type { ReactNode } from 'react'
import type {
  Ticket,
  TicketStatus,
  User,
  Vendor,
  Freelancer,
  TabKey,
  UserStatus,
  VendorStatus,
  FreelancerStatus,
} from './types'

export const tabItems: { key: TabKey; label: string; icon: ReactNode }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined /> },
  { key: 'tickets', label: 'All Tickets', icon: <FieldTimeOutlined /> },
  { key: 'users', label: 'Users', icon: <UserOutlined /> },
  { key: 'freelancers', label: 'Freelancers', icon: <TeamOutlined /> },
  { key: 'vendors', label: 'Vendors', icon: <ShopOutlined /> },
]

export const dashboardStats = [
  { key: 'users', label: 'Total Users', value: 1247, icon: <UserOutlined /> },
  { key: 'freelancers', label: 'Total Freelancers', value: 342, icon: <TeamOutlined /> },
  { key: 'vendors', label: 'Total Vendors', value: 89, icon: <ShopOutlined /> },
  { key: 'active', label: 'Active Tickets', value: 156, icon: <FieldTimeOutlined /> },
  { key: 'completed', label: 'Completed Tickets', value: 2341, icon: <CheckCircleOutlined /> },
  { key: 'pending', label: 'Pending Tickets', value: 67, icon: <DashboardOutlined /> },
]

export const ticketChartData = [
  { month: 'Jan', active: 120, completed: 80 },
  { month: 'Feb', active: 135, completed: 96 },
  { month: 'Mar', active: 160, completed: 130 },
  { month: 'Apr', active: 142, completed: 110 },
  { month: 'May', active: 170, completed: 145 },
  { month: 'Jun', active: 156, completed: 138 },
]

export const statusColors: Record<TicketStatus, string> = {
  pending: 'gold',
  accepted: 'blue',
  'in-progress': 'purple',
  completed: 'green',
  cancelled: 'red',
}

export const userStatusColors: Record<UserStatus, 'success' | 'error'> = {
  active: 'success',
  blocked: 'error',
}

export const vendorStatusColors: Record<VendorStatus, 'processing' | 'default'> = {
  active: 'processing',
  inactive: 'default',
}

export const freelancerStatusColors: Record<FreelancerStatus, string> = {
  pending: 'gold',
  approved: 'green',
  rejected: 'red',
}

export const initialTickets: Ticket[] = [
  { id: 'TKT001', customer: 'Rajesh Kumar', service: 'Cleaning - Deep Cleaning', date: '2025-11-28', status: 'pending', assignedTo: '', priority: 'high', channel: 'app' },
  { id: 'TKT002', customer: 'Rahul Verma', service: 'Construction Materials - Cement', date: '2025-11-27', status: 'accepted', assignedTo: 'ABC Suppliers (Vendor)', priority: 'medium', channel: 'phone' },
  { id: 'TKT003', customer: 'Vikram Singh', service: 'Home Services - Plumbing', date: '2025-11-25', status: 'completed', assignedTo: 'John Doe (Freelancer)', priority: 'low', channel: 'field' },
  { id: 'TKT004', customer: 'Priya Sharma', service: 'Home Services - Plumbing', date: '2025-11-29', status: 'in-progress', assignedTo: 'Suresh Kumar (Freelancer)', priority: 'high', channel: 'app' },
  { id: 'TKT005', customer: 'Sneha Rao', service: 'Cleaning - Sanitization', date: '2025-11-30', status: 'pending', assignedTo: '', priority: 'medium', channel: 'app' },
  { id: 'TKT006', customer: 'Amit Patel', service: 'Construction Materials - Steel', date: '2025-11-26', status: 'accepted', assignedTo: 'XYZ Materials (Vendor)', priority: 'high', channel: 'phone' },
]

export const initialUsers: User[] = [
  { id: 'USR001', name: 'Rajesh Kumar', email: 'rajesh@email.com', joinDate: '2025-01-15', status: 'active', plan: 'Premium', location: 'Mumbai' },
  { id: 'USR002', name: 'Priya Sharma', email: 'priya@email.com', joinDate: '2025-02-20', status: 'active', plan: 'Basic', location: 'Pune' },
  { id: 'USR003', name: 'Amit Patel', email: 'amit@email.com', joinDate: '2025-03-10', status: 'blocked', plan: 'Premium', location: 'Bengaluru' },
  { id: 'USR004', name: 'Sneha Rao', email: 'sneha@email.com', joinDate: '2025-04-08', status: 'active', plan: 'Basic', location: 'Hyderabad' },
]

export const initialVendors: Vendor[] = [
  { id: 'VND001', name: 'ABC Suppliers', email: 'abc@email.com', service: 'Construction Materials', pan: 'ABCDE1234F', status: 'active', totalOrders: 123, contact: '+91 90000 11111', location: 'Mumbai' },
  { id: 'VND002', name: 'XYZ Materials', email: 'xyz@email.com', service: 'Construction Materials', pan: 'XYZAB5678G', status: 'active', totalOrders: 89, contact: '+91 90000 22222', location: 'Delhi' },
  { id: 'VND003', name: 'Green Clean', email: 'green@email.com', service: 'Cleaning Supplies', pan: 'GHJKL1234K', status: 'inactive', totalOrders: 44, contact: '+91 90000 33333', location: 'Pune' },
]

export const initialFreelancers: Freelancer[] = [
  { id: 'FRL001', name: 'John Doe', email: 'john@email.com', skills: ['Plumbing', 'Electrical'], completed: 45, rating: 4.8, status: 'pending', age: 39, city: 'Delhi' },
  { id: 'FRL002', name: 'Suresh Kumar', email: 'suresh@email.com', skills: ['Cleaning', 'Home Services'], completed: 67, rating: 4.9, status: 'approved', age: 41, city: 'Hyderabad' },
  { id: 'FRL003', name: 'Ravi Singh', email: 'ravi@email.com', skills: ['Carpentry', 'Painting'], completed: 32, rating: 4.6, status: 'pending', age: 47, city: 'Mumbai' },
  { id: 'FRL004', name: 'Neha Gupta', email: 'neha@email.com', skills: ['Electrical', 'Solar'], completed: 28, rating: 4.7, status: 'rejected', age: 35, city: 'Bengaluru' },
]

export const initialPendingFreelancers: Freelancer[] = [
  { id: 'REQ001', name: 'Aarav Mehta', email: 'aarav@email.com', skills: ['HVAC'], completed: 0, rating: 0, status: 'pending', age: 33, city: 'Ahmedabad' },
  { id: 'REQ002', name: 'Kavya Rao', email: 'kavya@email.com', skills: ['Interior Cleaning'], completed: 0, rating: 0, status: 'pending', age: 29, city: 'Chennai' },
]

