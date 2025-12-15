// data.ts

import {
  DashboardOutlined,
  FieldTimeOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  CheckCircleOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import type { ReactNode } from 'react';

import type {
  Ticket,
  TicketStatus,
  PaymentStatus,
  User,
  Vendor,
  Freelancer,
  TabKey,
  UserStatus,
  VendorStatus,
  FreelancerStatus,
  ServiceCategory,
  ServiceSubCategory,
  ServiceItem,
  ServiceStatus,
} from './types';

// ⬇️ Services button added here
export const tabItems: { key: TabKey; label: string; icon: ReactNode }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined /> },
  { key: 'tickets', label: 'All Tickets', icon: <FieldTimeOutlined /> },
  { key: 'users', label: 'Users', icon: <UserOutlined /> },
  { key: 'freelancers', label: 'Freelancers', icon: <TeamOutlined /> },
  { key: 'vendors', label: 'Vendors', icon: <ShopOutlined /> },
  { key: 'services', label: 'Services', icon: <AppstoreOutlined /> },
];

export const dashboardStats = [
  { key: 'users', label: 'Total Users', value: 1247, icon: <UserOutlined /> },
  { key: 'freelancers', label: 'Total Freelancers', value: 342, icon: <TeamOutlined /> },
  { key: 'vendors', label: 'Total Vendors', value: 89, icon: <ShopOutlined /> },
  { key: 'active', label: 'Active Tickets', value: 156, icon: <FieldTimeOutlined /> },
  { key: 'completed', label: 'Completed Tickets', value: 2341, icon: <CheckCircleOutlined /> },
  { key: 'pending', label: 'Pending Tickets', value: 67, icon: <DashboardOutlined /> },
];

export const ticketChartData = [
  { month: 'Jan', active: 120, completed: 80 },
  { month: 'Feb', active: 135, completed: 96 },
  { month: 'Mar', active: 160, completed: 130 },
  { month: 'Apr', active: 142, completed: 110 },
  { month: 'May', active: 170, completed: 145 },
  { month: 'Jun', active: 156, completed: 138 },
];

export const statusColors: Record<TicketStatus, string> = {
  pending: 'gold',
  accepted: 'blue',
  'in-progress': 'purple',
  completed: 'green',
  cancelled: 'red',
};

export const userStatusColors: Record<UserStatus, 'success' | 'error'> = {
  active: 'success',
  blocked: 'error',
};

export const vendorStatusColors: Record<VendorStatus, 'processing' | 'default'> = {
  active: 'processing',
  inactive: 'default',
};

export const freelancerStatusColors: Record<FreelancerStatus, string> = {
  pending: 'gold',
  approved: 'green',
  rejected: 'red',
};

export const paymentStatusColors: Record<PaymentStatus, string> = {
  paid: 'green',
  pending: 'gold',
  failed: 'red',
};

export const indianCities = [
  'Mumbai',
  'Delhi',
  'Bengaluru',
  'Hyderabad',
  'Ahmedabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Jaipur',
  'Surat',
  'Lucknow',
  'Kanpur',
  'Nagpur',
  'Indore',
  'Thane',
  'Bhopal',
  'Visakhapatnam',
  'Patna',
  'Vadodara',
  'Ghaziabad',
];

// ============= YOUR EXISTING CORE DATA (UNCHANGED) =============

export const initialTickets: Ticket[] = [
  {
    id: 'TKT001',
    customer: 'Rajesh Kumar',
    service: 'Cleaning - Deep Cleaning',
    date: '2025-11-28',
    serviceStatus: 'pending',
    assignedTo: '',
    priority: 'high',
    paymentStatus: 'pending',
    location: 'Mumbai',
  },
  {
    id: 'TKT002',
    customer: 'Rahul Verma',
    service: 'Construction Materials - Cement',
    date: '2025-11-27',
    serviceStatus: 'accepted',
    assignedTo: 'ABC Suppliers (Vendor)',
    priority: 'medium',
    paymentStatus: 'paid',
    location: 'Delhi',
  },
  {
    id: 'TKT003',
    customer: 'Vikram Singh',
    service: 'Home Services - Plumbing',
    date: '2025-11-25',
    serviceStatus: 'completed',
    assignedTo: 'John Doe (Freelancer)',
    priority: 'low',
    paymentStatus: 'paid',
    location: 'Bengaluru',
  },
  {
    id: 'TKT004',
    customer: 'Priya Sharma',
    service: 'Home Services - Plumbing',
    date: '2025-11-29',
    serviceStatus: 'in-progress',
    assignedTo: 'Suresh Kumar (Freelancer)',
    priority: 'high',
    paymentStatus: 'pending',
    location: 'Pune',
  },
  {
    id: 'TKT005',
    customer: 'Sneha Rao',
    service: 'Cleaning - Sanitization',
    date: '2025-11-30',
    serviceStatus: 'pending',
    assignedTo: '',
    priority: 'medium',
    paymentStatus: 'failed',
    location: 'Hyderabad',
  },
  {
    id: 'TKT006',
    customer: 'Amit Patel',
    service: 'Construction Materials - Steel',
    date: '2025-11-26',
    serviceStatus: 'accepted',
    assignedTo: 'XYZ Materials (Vendor)',
    priority: 'high',
    paymentStatus: 'paid',
    location: 'Ahmedabad',
  },
];

export const initialUsers: User[] = [
  {
    id: 'USR001',
    name: 'Rajesh Kumar',
    email: 'rajesh@email.com',
    joinDate: '2025-01-15',
    status: 'active',
    plan: 'Premium',
    location: 'Mumbai',
  },
  {
    id: 'USR002',
    name: 'Priya Sharma',
    email: 'priya@email.com',
    joinDate: '2025-02-20',
    status: 'active',
    plan: 'Basic',
    location: 'Pune',
  },
  {
    id: 'USR003',
    name: 'Amit Patel',
    email: 'amit@email.com',
    joinDate: '2025-03-10',
    status: 'blocked',
    plan: 'Premium',
    location: 'Bengaluru',
  },
  {
    id: 'USR004',
    name: 'Sneha Rao',
    email: 'sneha@email.com',
    joinDate: '2025-04-08',
    status: 'active',
    plan: 'Basic',
    location: 'Hyderabad',
  },
];

export const initialVendors: Vendor[] = [
  {
    id: 'VND001',
    name: 'ABC Suppliers',
    email: 'abc@email.com',
    service: 'Construction Materials',
    pan: 'ABCDE1234F',
    status: 'active',
    totalOrders: 123,
    contact: '+91 90000 11111',
    location: 'Mumbai',
  },
  {
    id: 'VND002',
    name: 'XYZ Materials',
    email: 'xyz@email.com',
    service: 'Construction Materials',
    pan: 'XYZAB5678G',
    status: 'active',
    totalOrders: 89,
    contact: '+91 90000 22222',
    location: 'Delhi',
  },
  {
    id: 'VND003',
    name: 'Green Clean',
    email: 'green@email.com',
    service: 'Cleaning Supplies',
    pan: 'GHJKL1234K',
    status: 'inactive',
    totalOrders: 44,
    contact: '+91 90000 33333',
    location: 'Pune',
  },
];

//  Here, KEEP your full FRL001 – FRL100 data exactly as you already have.
export const initialFreelancers: Freelancer[] = [
  // ...paste your existing freelancer objects here unchanged...
];

export const initialPendingFreelancers: Freelancer[] = [
  {
    id: 'REQ001',
    name: 'Aarav Mehta',
    email: 'aarav.mehta@email.com',
    skills: ['HVAC', 'Refrigeration'],
    completed: 0,
    rating: 0,
    status: 'pending',
    age: 33,
    city: 'Ahmedabad',
  },
  {
    id: 'REQ002',
    name: 'Kavya Rao',
    email: 'kavya.rao@email.com',
    skills: ['Deep Cleaning', 'Sanitization'],
    completed: 0,
    rating: 0,
    status: 'pending',
    age: 27,
    city: 'Chennai',
  },
  {
    id: 'REQ003',
    name: 'Rohan Desai',
    email: 'rohan.desai@email.com',
    skills: ['Plumbing', 'Pipe Fitting'],
    completed: 0,
    rating: 0,
    status: 'pending',
    age: 30,
    city: 'Surat',
  },
  {
    id: 'REQ004',
    name: 'Sneha Joshi',
    email: 'sneha.joshi@email.com',
    skills: ['Electrical', 'Wiring'],
    completed: 0,
    rating: 0,
    status: 'pending',
    age: 28,
    city: 'Indore',
  },
];

// ================== NEW: SERVICES HIERARCHY DATA ==================

// Transport → sub-categories → sub-services (from your screenshots)

const passengerTransportServices: ServiceItem[] = [
  { id: 'PT001', name: 'Local Taxi', description: 'Short trips within city' },
  { id: 'PT002', name: 'Carpooling', description: 'Shared ride options' },
  { id: 'PT003', name: 'Shuttle Service', description: 'Group & airport shuttles' },
];

const logisticsCargoServices: ServiceItem[] = [
  { id: 'LC001', name: 'Goods Delivery', description: 'Local goods pickup & delivery' },
  { id: 'LC002', name: 'Intercity Transport', description: 'Long-distance load transport' },
  { id: 'LC003', name: 'Cargo Forwarding', description: 'Freight forwarding support' },
];

const rentalServicesItems: ServiceItem[] = [
  { id: 'RS001', name: 'Car Rentals', description: 'Self-drive or chauffeur' },
  {
    id: 'RS002',
    name: 'Van/Truck Rentals',
    description: 'Small to medium truck options',
  },
];

const specializedTransportServices: ServiceItem[] = [
  {
    id: 'ST001',
    name: 'Temperature Controlled Truck',
    description: 'Refrigerated transport',
  },
  {
    id: 'ST002',
    name: 'Hazardous Handling',
    description: 'Certified hazardous goods handling',
  },
];

const transportSubCategories: ServiceSubCategory[] = [
  {
    id: 'SC_T_01',
    name: 'Passenger Transport',
    description: 'Reliable taxi, cab, shuttle, and transfer services',
    status: 'active' as ServiceStatus,
    services: passengerTransportServices,
  },
  {
    id: 'SC_T_02',
    name: 'Logistics & Cargo',
    description: 'Complete goods delivery and cargo forwarding solutions',
    status: 'active' as ServiceStatus,
    services: logisticsCargoServices,
  },
  {
    id: 'SC_T_03',
    name: 'Rental Services',
    description: 'Car, truck, and van rentals for all your needs',
    status: 'active' as ServiceStatus,
    services: rentalServicesItems,
  },
  {
    id: 'SC_T_04',
    name: 'Specialized Transport',
    description: 'Temperature-controlled and hazardous material handling',
    status: 'active' as ServiceStatus,
    services: specializedTransportServices,
  },
];

// For now other categories have no deep hierarchy yet — can be filled later.
const emptySubCategories: ServiceSubCategory[] = [];

export const initialServiceCategories: ServiceCategory[] = [
  {
    id: 'CAT001',
    name: 'Transport',
    description: 'Passenger, logistics, rental and specialized transport services',
    status: 'active',
    subcategories: transportSubCategories,
  },
  {
    id: 'CAT002',
    name: 'Home & Cleaning Services',
    description: 'Home maintenance, deep cleaning and house care services',
    status: 'active',
    subcategories: emptySubCategories,
  },
  {
    id: 'CAT003',
    name: 'Buy/Sale/Rentals',
    description: 'Platform to buy, sell or rent properties and assets',
    status: 'inactive',
    subcategories: emptySubCategories,
  },
  {
    id: 'CAT004',
    name: 'Construction Raw Materials',
    description: 'Cement, steel and other building material supply',
    status: 'active',
    subcategories: emptySubCategories,
  },
];