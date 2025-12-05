
import { DashboardOutlined, FieldTimeOutlined, ShopOutlined, TeamOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons'
import type { ReactNode } from 'react'
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

export const paymentStatusColors: Record<PaymentStatus, string> = {
  paid: 'green',
  pending: 'gold',
  failed: 'red',
}

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
]

export const initialTickets: Ticket[] = [
  { id: 'TKT001', customer: 'Rajesh Kumar', service: 'Cleaning - Deep Cleaning', date: '2025-11-28', serviceStatus: 'pending', assignedTo: '', priority: 'high', paymentStatus: 'pending', location: 'Mumbai' },
  { id: 'TKT002', customer: 'Rahul Verma', service: 'Construction Materials - Cement', date: '2025-11-27', serviceStatus: 'accepted', assignedTo: 'ABC Suppliers (Vendor)', priority: 'medium', paymentStatus: 'paid', location: 'Delhi' },
  { id: 'TKT003', customer: 'Vikram Singh', service: 'Home Services - Plumbing', date: '2025-11-25', serviceStatus: 'completed', assignedTo: 'John Doe (Freelancer)', priority: 'low', paymentStatus: 'paid', location: 'Bengaluru' },
  { id: 'TKT004', customer: 'Priya Sharma', service: 'Home Services - Plumbing', date: '2025-11-29', serviceStatus: 'in-progress', assignedTo: 'Suresh Kumar (Freelancer)', priority: 'high', paymentStatus: 'pending', location: 'Pune' },
  { id: 'TKT005', customer: 'Sneha Rao', service: 'Cleaning - Sanitization', date: '2025-11-30', serviceStatus: 'pending', assignedTo: '', priority: 'medium', paymentStatus: 'failed', location: 'Hyderabad' },
  { id: 'TKT006', customer: 'Amit Patel', service: 'Construction Materials - Steel', date: '2025-11-26', serviceStatus: 'accepted', assignedTo: 'XYZ Materials (Vendor)', priority: 'high', paymentStatus: 'paid', location: 'Ahmedabad' },
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
  // Mumbai - 5 members  
  { id: 'FRL001', name: 'Vikram Reddy', email: 'vikram.reddy@email.com', skills: ['Carpentry', 'Painting', 'Furniture Making'], completed: 32, rating: 4.6, status: 'approved', age: 35, city: 'Mumbai' },
  { id: 'FRL002', name: 'Sanjay Patil', email: 'sanjay.patil@email.com', skills: ['Plumbing', 'Pipe Fitting', 'Water Heater'], completed: 48, rating: 4.7, status: 'approved', age: 38, city: 'Mumbai' },
  { id: 'FRL003', name: 'Neha Desai', email: 'neha.desai@email.com', skills: ['Cleaning', 'Sanitization', 'Deep Cleaning'], completed: 55, rating: 4.8, status: 'approved', age: 29, city: 'Mumbai' },
  { id: 'FRL004', name: 'Amit Shah', email: 'amit.shah@email.com', skills: ['Electrical', 'Wiring'], completed: 41, rating: 4.5, status: 'approved', age: 42, city: 'Mumbai' },
  { id: 'FRL005', name: 'Pooja Joshi', email: 'pooja.joshi@email.com', skills: ['HVAC', 'AC Repair'], completed: 36, rating: 4.6, status: 'approved', age: 31, city: 'Mumbai' },

  // Delhi - 5 members
  { id: 'FRL006', name: 'Arjun Patel', email: 'arjun.patel@email.com', skills: ['Plumbing', 'Electrical', 'Solar Installation'], completed: 45, rating: 4.8, status: 'approved', age: 39, city: 'Delhi' },
  { id: 'FRL007', name: 'Rahul Verma', email: 'rahul.verma@email.com', skills: ['Construction', 'Masonry', 'Bricklaying'], completed: 52, rating: 4.7, status: 'approved', age: 44, city: 'Delhi' },
  { id: 'FRL008', name: 'Simran Kaur', email: 'simran.kaur@email.com', skills: ['Interior Design', 'Painting', 'Wallpaper'], completed: 38, rating: 4.9, status: 'approved', age: 33, city: 'Delhi' },
  { id: 'FRL009', name: 'Deepak Kumar', email: 'deepak.kumar@email.com', skills: ['Carpentry', 'Furniture'], completed: 43, rating: 4.6, status: 'approved', age: 36, city: 'Delhi' },
  { id: 'FRL010', name: 'Anjali Gupta', email: 'anjali.gupta@email.com', skills: ['Cleaning', 'Home Services'], completed: 49, rating: 4.8, status: 'approved', age: 28, city: 'Delhi' },

  // Bengaluru - 5 members
  { id: 'FRL011', name: 'Ananya Iyer', email: 'ananya.iyer@email.com', skills: ['Electrical', 'Solar', 'Inverter Installation'], completed: 28, rating: 4.7, status: 'approved', age: 33, city: 'Bengaluru' },
  { id: 'FRL012', name: 'Karthik Rao', email: 'karthik.rao@email.com', skills: ['Plumbing', 'Drainage', 'Pipe Fitting'], completed: 56, rating: 4.8, status: 'approved', age: 40, city: 'Bengaluru' },
  { id: 'FRL013', name: 'Lakshmi Reddy', email: 'lakshmi.reddy@email.com', skills: ['Cleaning', 'Deep Cleaning', 'Sanitization'], completed: 62, rating: 4.9, status: 'approved', age: 35, city: 'Bengaluru' },
  { id: 'FRL014', name: 'Suresh Gowda', email: 'suresh.gowda@email.com', skills: ['HVAC', 'Refrigeration'], completed: 47, rating: 4.6, status: 'approved', age: 41, city: 'Bengaluru' },
  { id: 'FRL015', name: 'Divya Murthy', email: 'divya.murthy@email.com', skills: ['Painting', 'Wallpaper'], completed: 33, rating: 4.7, status: 'approved', age: 30, city: 'Bengaluru' },

  // Hyderabad - 5 members
  { id: 'FRL016', name: 'Priya Sharma', email: 'priya.sharma@email.com', skills: ['Cleaning', 'Home Services'], completed: 67, rating: 4.9, status: 'approved', age: 41, city: 'Hyderabad' },
  { id: 'FRL017', name: 'Venkat Reddy', email: 'venkat.reddy@email.com', skills: ['Electrical', 'Wiring'], completed: 51, rating: 4.7, status: 'approved', age: 37, city: 'Hyderabad' },
  { id: 'FRL018', name: 'Shalini Rao', email: 'shalini.rao@email.com', skills: ['Interior Design', 'Decor'], completed: 39, rating: 4.8, status: 'approved', age: 32, city: 'Hyderabad' },
  { id: 'FRL019', name: 'Ravi Kumar', email: 'ravi.kumar@email.com', skills: ['Plumbing', 'Pipe Fitting'], completed: 44, rating: 4.6, status: 'approved', age: 39, city: 'Hyderabad' },
  { id: 'FRL020', name: 'Kavitha Naidu', email: 'kavitha.naidu@email.com', skills: ['Carpentry', 'Woodwork'], completed: 35, rating: 4.7, status: 'approved', age: 34, city: 'Hyderabad' },

  // Ahmedabad - 5 members
  { id: 'FRL021', name: 'Aarav Mehta', email: 'aarav.mehta@email.com', skills: ['HVAC', 'Refrigeration'], completed: 58, rating: 4.8, status: 'approved', age: 33, city: 'Ahmedabad' },
  { id: 'FRL022', name: 'Nisha Patel', email: 'nisha.patel@email.com', skills: ['Cleaning', 'Sanitization'], completed: 46, rating: 4.7, status: 'approved', age: 29, city: 'Ahmedabad' },
  { id: 'FRL023', name: 'Jayesh Shah', email: 'jayesh.shah@email.com', skills: ['Electrical', 'Solar'], completed: 40, rating: 4.6, status: 'approved', age: 36, city: 'Ahmedabad' },
  { id: 'FRL024', name: 'Ritu Desai', email: 'ritu.desai@email.com', skills: ['Painting', 'Texture'], completed: 37, rating: 4.7, status: 'approved', age: 31, city: 'Ahmedabad' },
  { id: 'FRL025', name: 'Harsh Modi', email: 'harsh.modi@email.com', skills: ['Plumbing', 'Water Heater'], completed: 42, rating: 4.5, status: 'approved', age: 38, city: 'Ahmedabad' },

  // Chennai - 5 members
  { id: 'FRL026', name: 'Meera Nair', email: 'meera.nair@email.com', skills: ['Interior Design', 'Painting'], completed: 38, rating: 4.8, status: 'approved', age: 31, city: 'Chennai' },
  { id: 'FRL027', name: 'Ramesh Kumar', email: 'ramesh.kumar@email.com', skills: ['Plumbing', 'Drainage'], completed: 53, rating: 4.7, status: 'approved', age: 42, city: 'Chennai' },
  { id: 'FRL028', name: 'Kavya Rao', email: 'kavya.rao@email.com', skills: ['Deep Cleaning', 'Sanitization'], completed: 48, rating: 4.9, status: 'approved', age: 27, city: 'Chennai' },
  { id: 'FRL029', name: 'Arun Krishnan', email: 'arun.krishnan@email.com', skills: ['Electrical', 'Appliance Repair'], completed: 45, rating: 4.6, status: 'approved', age: 39, city: 'Chennai' },
  { id: 'FRL030', name: 'Preethi Menon', email: 'preethi.menon@email.com', skills: ['Carpentry', 'Furniture'], completed: 34, rating: 4.7, status: 'approved', age: 30, city: 'Chennai' },

  // Kolkata - 5 members
  { id: 'FRL031', name: 'Divya Menon', email: 'divya.menon@email.com', skills: ['Gardening', 'Landscaping'], completed: 24, rating: 4.4, status: 'approved', age: 29, city: 'Kolkata' },
  { id: 'FRL032', name: 'Sourav Das', email: 'sourav.das@email.com', skills: ['Plumbing', 'Pipe Fitting'], completed: 50, rating: 4.7, status: 'approved', age: 37, city: 'Kolkata' },
  { id: 'FRL033', name: 'Rina Chatterjee', email: 'rina.chatterjee@email.com', skills: ['Cleaning', 'Home Services'], completed: 57, rating: 4.8, status: 'approved', age: 33, city: 'Kolkata' },
  { id: 'FRL034', name: 'Amit Banerjee', email: 'amit.banerjee@email.com', skills: ['Electrical', 'Wiring'], completed: 43, rating: 4.6, status: 'approved', age: 40, city: 'Kolkata' },
  { id: 'FRL035', name: 'Monika Sen', email: 'monika.sen@email.com', skills: ['Painting', 'Decor'], completed: 36, rating: 4.7, status: 'approved', age: 32, city: 'Kolkata' },

  // Pune - 5 members
  { id: 'FRL036', name: 'Rajesh Gupta', email: 'rajesh.gupta@email.com', skills: ['HVAC', 'AC Repair'], completed: 52, rating: 4.5, status: 'approved', age: 44, city: 'Pune' },
  { id: 'FRL037', name: 'Sneha Kulkarni', email: 'sneha.kulkarni@email.com', skills: ['Cleaning', 'Sanitization'], completed: 49, rating: 4.8, status: 'approved', age: 28, city: 'Pune' },
  { id: 'FRL038', name: 'Varun Joshi', email: 'varun.joshi@email.com', skills: ['Plumbing', 'Water Heater'], completed: 46, rating: 4.7, status: 'approved', age: 35, city: 'Pune' },
  { id: 'FRL039', name: 'Aditi Deshmukh', email: 'aditi.deshmukh@email.com', skills: ['Interior Design', 'Furniture'], completed: 41, rating: 4.9, status: 'approved', age: 31, city: 'Pune' },
  { id: 'FRL040', name: 'Nikhil Patil', email: 'nikhil.patil@email.com', skills: ['Electrical', 'Solar'], completed: 38, rating: 4.6, status: 'approved', age: 36, city: 'Pune' },

  // Jaipur - 5 members
  { id: 'FRL041', name: 'Karan Singh', email: 'karan.singh@email.com', skills: ['Construction', 'Masonry'], completed: 61, rating: 4.6, status: 'approved', age: 42, city: 'Jaipur' },
  { id: 'FRL042', name: 'Pooja Rathore', email: 'pooja.rathore@email.com', skills: ['Cleaning', 'Deep Cleaning'], completed: 44, rating: 4.7, status: 'approved', age: 30, city: 'Jaipur' },
  { id: 'FRL043', name: 'Vikrant Sharma', email: 'vikrant.sharma@email.com', skills: ['Plumbing', 'Drainage'], completed: 47, rating: 4.8, status: 'approved', age: 38, city: 'Jaipur' },
  { id: 'FRL044', name: 'Anjali Meena', email: 'anjali.meena@email.com', skills: ['Painting', 'Texture'], completed: 39, rating: 4.6, status: 'approved', age: 29, city: 'Jaipur' },
  { id: 'FRL045', name: 'Rohit Chauhan', email: 'rohit.chauhan@email.com', skills: ['Electrical', 'Wiring'], completed: 42, rating: 4.7, status: 'approved', age: 35, city: 'Jaipur' },

  // Surat - 5 members
  { id: 'FRL046', name: 'Rohan Desai', email: 'rohan.desai@email.com', skills: ['Plumbing', 'Pipe Fitting'], completed: 55, rating: 4.8, status: 'approved', age: 30, city: 'Surat' },
  { id: 'FRL047', name: 'Priyanka Patel', email: 'priyanka.patel@email.com', skills: ['Cleaning', 'Sanitization'], completed: 51, rating: 4.7, status: 'approved', age: 27, city: 'Surat' },
  { id: 'FRL048', name: 'Jignesh Shah', email: 'jignesh.shah@email.com', skills: ['Electrical', 'Appliance Repair'], completed: 48, rating: 4.6, status: 'approved', age: 34, city: 'Surat' },
  { id: 'FRL049', name: 'Riya Modi', email: 'riya.modi@email.com', skills: ['Interior Design', 'Decor'], completed: 37, rating: 4.9, status: 'approved', age: 32, city: 'Surat' },
  { id: 'FRL050', name: 'Ketan Mehta', email: 'ketan.mehta@email.com', skills: ['HVAC', 'AC Repair'], completed: 43, rating: 4.7, status: 'approved', age: 39, city: 'Surat' },

  // Lucknow - 5 members
  { id: 'FRL051', name: 'Abhishek Mishra', email: 'abhishek.mishra@email.com', skills: ['Plumbing', 'Water Heater'], completed: 46, rating: 4.7, status: 'approved', age: 36, city: 'Lucknow' },
  { id: 'FRL052', name: 'Swati Verma', email: 'swati.verma@email.com', skills: ['Cleaning', 'Home Services'], completed: 52, rating: 4.8, status: 'approved', age: 31, city: 'Lucknow' },
  { id: 'FRL053', name: 'Rajat Tiwari', email: 'rajat.tiwari@email.com', skills: ['Electrical', 'Wiring'], completed: 44, rating: 4.6, status: 'approved', age: 38, city: 'Lucknow' },
  { id: 'FRL054', name: 'Neha Srivastava', email: 'neha.srivastava@email.com', skills: ['Painting', 'Wallpaper'], completed: 35, rating: 4.7, status: 'approved', age: 29, city: 'Lucknow' },
  { id: 'FRL055', name: 'Vikas Yadav', email: 'vikas.yadav@email.com', skills: ['Carpentry', 'Furniture'], completed: 40, rating: 4.5, status: 'approved', age: 33, city: 'Lucknow' },

  // Kanpur - 5 members
  { id: 'FRL056', name: 'Manish Gupta', email: 'manish.gupta@email.com', skills: ['Plumbing', 'Drainage'], completed: 49, rating: 4.6, status: 'approved', age: 37, city: 'Kanpur' },
  { id: 'FRL057', name: 'Priti Sharma', email: 'priti.sharma@email.com', skills: ['Cleaning', 'Sanitization'], completed: 45, rating: 4.7, status: 'approved', age: 30, city: 'Kanpur' },
  { id: 'FRL058', name: 'Sanjay Kumar', email: 'sanjay.kumar@email.com', skills: ['Electrical', 'Solar'], completed: 41, rating: 4.8, status: 'approved', age: 35, city: 'Kanpur' },
  { id: 'FRL059', name: 'Ritu Singh', email: 'ritu.singh@email.com', skills: ['Interior Design', 'Painting'], completed: 38, rating: 4.6, status: 'approved', age: 32, city: 'Kanpur' },
  { id: 'FRL060', name: 'Deepak Pandey', email: 'deepak.pandey@email.com', skills: ['HVAC', 'Refrigeration'], completed: 47, rating: 4.7, status: 'approved', age: 40, city: 'Kanpur' },

  // Nagpur - 5 members
  { id: 'FRL061', name: 'Anil Deshmukh', email: 'anil.deshmukh@email.com', skills: ['Plumbing', 'Pipe Fitting'], completed: 50, rating: 4.7, status: 'approved', age: 39, city: 'Nagpur' },
  { id: 'FRL062', name: 'Sunita Thakur', email: 'sunita.thakur@email.com', skills: ['Cleaning', 'Deep Cleaning'], completed: 54, rating: 4.8, status: 'approved', age: 33, city: 'Nagpur' },
  { id: 'FRL063', name: 'Pravin Wankhede', email: 'pravin.wankhede@email.com', skills: ['Electrical', 'Wiring'], completed: 46, rating: 4.6, status: 'approved', age: 36, city: 'Nagpur' },
  { id: 'FRL064', name: 'Madhuri Joshi', email: 'madhuri.joshi@email.com', skills: ['Painting', 'Texture'], completed: 39, rating: 4.7, status: 'approved', age: 31, city: 'Nagpur' },
  { id: 'FRL065', name: 'Rahul Bhosale', email: 'rahul.bhosale@email.com', skills: ['Carpentry', 'Woodwork'], completed: 42, rating: 4.5, status: 'approved', age: 34, city: 'Nagpur' },

  // Indore - 5 members
  { id: 'FRL066', name: 'Sneha Joshi', email: 'sneha.joshi@email.com', skills: ['Electrical', 'Wiring'], completed: 48, rating: 4.8, status: 'approved', age: 28, city: 'Indore' },
  { id: 'FRL067', name: 'Vishal Chouhan', email: 'vishal.chouhan@email.com', skills: ['Plumbing', 'Water Heater'], completed: 51, rating: 4.7, status: 'approved', age: 35, city: 'Indore' },
  { id: 'FRL068', name: 'Kavita Sharma', email: 'kavita.sharma@email.com', skills: ['Cleaning', 'Sanitization'], completed: 47, rating: 4.6, status: 'approved', age: 30, city: 'Indore' },
  { id: 'FRL069', name: 'Akash Patel', email: 'akash.patel@email.com', skills: ['HVAC', 'AC Repair'], completed: 44, rating: 4.7, status: 'approved', age: 32, city: 'Indore' },
  { id: 'FRL070', name: 'Isha Malhotra', email: 'isha.malhotra@email.com', skills: ['Interior Design', 'Decor'], completed: 36, rating: 4.9, status: 'approved', age: 29, city: 'Indore' },

  // Thane - 5 members
  { id: 'FRL071', name: 'Sachin Pawar', email: 'sachin.pawar@email.com', skills: ['Plumbing', 'Drainage'], completed: 53, rating: 4.7, status: 'approved', age: 37, city: 'Thane' },
  { id: 'FRL072', name: 'Priya Naik', email: 'priya.naik@email.com', skills: ['Cleaning', 'Home Services'], completed: 49, rating: 4.8, status: 'approved', age: 31, city: 'Thane' },
  { id: 'FRL073', name: 'Ganesh Rane', email: 'ganesh.rane@email.com', skills: ['Electrical', 'Appliance Repair'], completed: 45, rating: 4.6, status: 'approved', age: 34, city: 'Thane' },
  { id: 'FRL074', name: 'Shweta Sawant', email: 'shweta.sawant@email.com', skills: ['Painting', 'Wallpaper'], completed: 38, rating: 4.7, status: 'approved', age: 28, city: 'Thane' },
  { id: 'FRL075', name: 'Mahesh Gaikwad', email: 'mahesh.gaikwad@email.com', skills: ['Carpentry', 'Furniture'], completed: 41, rating: 4.5, status: 'approved', age: 39, city: 'Thane' },

  // Bhopal - 5 members
  { id: 'FRL076', name: 'Arjun Yadav', email: 'arjun.yadav@email.com', skills: ['Plumbing', 'Pipe Fitting'], completed: 47, rating: 4.6, status: 'approved', age: 36, city: 'Bhopal' },
  { id: 'FRL077', name: 'Rekha Tiwari', email: 'rekha.tiwari@email.com', skills: ['Cleaning', 'Deep Cleaning'], completed: 52, rating: 4.8, status: 'approved', age: 32, city: 'Bhopal' },
  { id: 'FRL078', name: 'Sunil Verma', email: 'sunil.verma@email.com', skills: ['Electrical', 'Solar'], completed: 44, rating: 4.7, status: 'approved', age: 38, city: 'Bhopal' },
  { id: 'FRL079', name: 'Anita Mishra', email: 'anita.mishra@email.com', skills: ['Interior Design', 'Painting'], completed: 37, rating: 4.6, status: 'approved', age: 30, city: 'Bhopal' },
  { id: 'FRL080', name: 'Rajendra Singh', email: 'rajendra.singh@email.com', skills: ['HVAC', 'Refrigeration'], completed: 50, rating: 4.7, status: 'approved', age: 41, city: 'Bhopal' },

  // Visakhapatnam - 5 members
  { id: 'FRL081', name: 'Krishna Rao', email: 'krishna.rao@email.com', skills: ['Plumbing', 'Water Heater'], completed: 48, rating: 4.7, status: 'approved', age: 35, city: 'Visakhapatnam' },
  { id: 'FRL082', name: 'Lakshmi Devi', email: 'lakshmi.devi@email.com', skills: ['Cleaning', 'Sanitization'], completed: 55, rating: 4.8, status: 'approved', age: 33, city: 'Visakhapatnam' },
  { id: 'FRL083', name: 'Srinivas Reddy', email: 'srinivas.reddy@email.com', skills: ['Electrical', 'Wiring'], completed: 46, rating: 4.6, status: 'approved', age: 37, city: 'Visakhapatnam' },
  { id: 'FRL084', name: 'Padma Naidu', email: 'padma.naidu@email.com', skills: ['Painting', 'Decor'], completed: 39, rating: 4.7, status: 'approved', age: 31, city: 'Visakhapatnam' },
  { id: 'FRL085', name: 'Ramana Murthy', email: 'ramana.murthy@email.com', skills: ['Carpentry', 'Woodwork'], completed: 43, rating: 4.5, status: 'approved', age: 40, city: 'Visakhapatnam' },

  // Patna - 5 members
  { id: 'FRL086', name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', skills: ['Plumbing', 'Drainage'], completed: 51, rating: 4.7, status: 'approved', age: 38, city: 'Patna' },
  { id: 'FRL087', name: 'Suman Devi', email: 'suman.devi@email.com', skills: ['Cleaning', 'Home Services'], completed: 49, rating: 4.8, status: 'approved', age: 32, city: 'Patna' },
  { id: 'FRL088', name: 'Manoj Singh', email: 'manoj.singh@email.com', skills: ['Electrical', 'Appliance Repair'], completed: 45, rating: 4.6, status: 'approved', age: 36, city: 'Patna' },
  { id: 'FRL089', name: 'Rani Kumari', email: 'rani.kumari@email.com', skills: ['Interior Design', 'Furniture'], completed: 38, rating: 4.7, status: 'approved', age: 29, city: 'Patna' },
  { id: 'FRL090', name: 'Avinash Jha', email: 'avinash.jha@email.com', skills: ['HVAC', 'AC Repair'], completed: 42, rating: 4.5, status: 'approved', age: 34, city: 'Patna' },

  // Vadodara - 5 members
  { id: 'FRL091', name: 'Hitesh Patel', email: 'hitesh.patel@email.com', skills: ['Plumbing', 'Pipe Fitting'], completed: 54, rating: 4.8, status: 'approved', age: 37, city: 'Vadodara' },
  { id: 'FRL092', name: 'Komal Shah', email: 'komal.shah@email.com', skills: ['Cleaning', 'Sanitization'], completed: 50, rating: 4.7, status: 'approved', age: 30, city: 'Vadodara' },
  { id: 'FRL093', name: 'Bhavesh Desai', email: 'bhavesh.desai@email.com', skills: ['Electrical', 'Solar'], completed: 47, rating: 4.6, status: 'approved', age: 35, city: 'Vadodara' },
  { id: 'FRL094', name: 'Nidhi Modi', email: 'nidhi.modi@email.com', skills: ['Painting', 'Texture'], completed: 40, rating: 4.7, status: 'approved', age: 31, city: 'Vadodara' },
  { id: 'FRL095', name: 'Chirag Mehta', email: 'chirag.mehta@email.com', skills: ['Carpentry', 'Furniture'], completed: 44, rating: 4.9, status: 'approved', age: 33, city: 'Vadodara' },

  // Ghaziabad - 5 members
  { id: 'FRL096', name: 'Naveen Sharma', email: 'naveen.sharma@email.com', skills: ['Plumbing', 'Water Heater'], completed: 46, rating: 4.6, status: 'approved', age: 34, city: 'Ghaziabad' },
  { id: 'FRL097', name: 'Seema Agarwal', email: 'seema.agarwal@email.com', skills: ['Cleaning', 'Deep Cleaning'], completed: 53, rating: 4.8, status: 'approved', age: 31, city: 'Ghaziabad' },
  { id: 'FRL098', name: 'Pankaj Tyagi', email: 'pankaj.tyagi@email.com', skills: ['Electrical', 'Wiring'], completed: 48, rating: 4.7, status: 'approved', age: 36, city: 'Ghaziabad' },
  { id: 'FRL099', name: 'Renu Gupta', email: 'renu.gupta@email.com', skills: ['Interior Design', 'Decor'], completed: 41, rating: 4.6, status: 'approved', age: 29, city: 'Ghaziabad' },
  { id: 'FRL100', name: 'Ashish Kumar', email: 'ashish.kumar@email.com', skills: ['HVAC', 'Refrigeration'], completed: 45, rating: 4.7, status: 'approved', age: 38, city: 'Ghaziabad' },
]

export const initialPendingFreelancers: Freelancer[] = [
  { id: 'REQ001', name: 'Aarav Mehta', email: 'aarav.mehta@email.com', skills: ['HVAC', 'Refrigeration'], completed: 0, rating: 0, status: 'pending', age: 33, city: 'Ahmedabad' },
  { id: 'REQ002', name: 'Kavya Rao', email: 'kavya.rao@email.com', skills: ['Deep Cleaning', 'Sanitization'], completed: 0, rating: 0, status: 'pending', age: 27, city: 'Chennai' },
  { id: 'REQ003', name: 'Rohan Desai', email: 'rohan.desai@email.com', skills: ['Plumbing', 'Pipe Fitting'], completed: 0, rating: 0, status: 'pending', age: 30, city: 'Surat' },
  { id: 'REQ004', name: 'Sneha Joshi', email: 'sneha.joshi@email.com', skills: ['Electrical', 'Wiring'], completed: 0, rating: 0, status: 'pending', age: 28, city: 'Indore' },
]

