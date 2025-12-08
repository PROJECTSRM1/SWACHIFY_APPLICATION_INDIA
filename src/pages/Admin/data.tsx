
// import { DashboardOutlined, FieldTimeOutlined, ShopOutlined, TeamOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons'
// import type { ReactNode } from 'react'
// import type {
//   Ticket,
//   TicketStatus,
//   PaymentStatus,
//   User,
//   Vendor,
//   Freelancer,
//   TabKey,
//   UserStatus,
//   VendorStatus,
//   FreelancerStatus,
// } from './types'

// export const tabItems: { key: TabKey; label: string; icon: ReactNode }[] = [
//   { key: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined /> },
//   { key: 'tickets', label: 'All Tickets', icon: <FieldTimeOutlined /> },
//   { key: 'users', label: 'Users', icon: <UserOutlined /> },
//   { key: 'freelancers', label: 'Freelancers', icon: <TeamOutlined /> },
//   { key: 'vendors', label: 'Vendors', icon: <ShopOutlined /> },
// ]

// export const dashboardStats = [
//   { key: 'users', label: 'Total Users', value: 1247, icon: <UserOutlined /> },
//   { key: 'freelancers', label: 'Total Freelancers', value: 342, icon: <TeamOutlined /> },
//   { key: 'vendors', label: 'Total Vendors', value: 89, icon: <ShopOutlined /> },
//   { key: 'active', label: 'Active Tickets', value: 156, icon: <FieldTimeOutlined /> },
//   { key: 'completed', label: 'Completed Tickets', value: 2341, icon: <CheckCircleOutlined /> },
//   { key: 'pending', label: 'Pending Tickets', value: 67, icon: <DashboardOutlined /> },
// ]

// export const ticketChartData = [
//   { month: 'Jan', active: 120, completed: 80 },
//   { month: 'Feb', active: 135, completed: 96 },
//   { month: 'Mar', active: 160, completed: 130 },
//   { month: 'Apr', active: 142, completed: 110 },
//   { month: 'May', active: 170, completed: 145 },
//   { month: 'Jun', active: 156, completed: 138 },
// ]

// export const statusColors: Record<TicketStatus, string> = {
//   pending: 'gold',
//   accepted: 'blue',
//   'in-progress': 'purple',
//   completed: 'green',
//   cancelled: 'red',
// }

// export const userStatusColors: Record<UserStatus, 'success' | 'error'> = {
//   active: 'success',
//   blocked: 'error',
// }

// export const vendorStatusColors: Record<VendorStatus, 'processing' | 'default'> = {
//   active: 'processing',
//   inactive: 'default',
// }

// export const freelancerStatusColors: Record<FreelancerStatus, string> = {
//   pending: 'gold',
//   approved: 'green',
//   rejected: 'red',
// }

// export const paymentStatusColors: Record<PaymentStatus, string> = {
//   paid: 'green',
//   pending: 'gold',
//   failed: 'red',
// }

// export const indianCities = [
//   'Mumbai',
//   'Delhi',
//   'Bengaluru',
//   'Hyderabad',
//   'Ahmedabad',
//   'Chennai',
//   'Kolkata',
//   'Pune',
//   'Jaipur',
//   'Surat',
//   'Lucknow',
//   'Kanpur',
//   'Nagpur',
//   'Indore',
//   'Thane',
//   'Bhopal',
//   'Visakhapatnam',
//   'Patna',
//   'Vadodara',
//   'Ghaziabad',
// ]

// export const initialTickets: Ticket[] = [
//   { id: 'TKT001', customer: 'Rajesh Kumar', service: 'Cleaning - Deep Cleaning', date: '2025-11-28', serviceStatus: 'pending', assignedTo: '', priority: 'high', paymentStatus: 'pending', location: 'Mumbai' },
//   { id: 'TKT002', customer: 'Rahul Verma', service: 'Construction Materials - Cement', date: '2025-11-27', serviceStatus: 'accepted', assignedTo: 'ABC Suppliers (Vendor)', priority: 'medium', paymentStatus: 'paid', location: 'Delhi' },
//   { id: 'TKT003', customer: 'Vikram Singh', service: 'Home Services - Plumbing', date: '2025-11-25', serviceStatus: 'completed', assignedTo: 'John Doe (Freelancer)', priority: 'low', paymentStatus: 'paid', location: 'Bengaluru' },
//   { id: 'TKT004', customer: 'Priya Sharma', service: 'Home Services - Plumbing', date: '2025-11-29', serviceStatus: 'in-progress', assignedTo: 'Suresh Kumar (Freelancer)', priority: 'high', paymentStatus: 'pending', location: 'Pune' },
//   { id: 'TKT005', customer: 'Sneha Rao', service: 'Cleaning - Sanitization', date: '2025-11-30', serviceStatus: 'pending', assignedTo: '', priority: 'medium', paymentStatus: 'failed', location: 'Hyderabad' },
//   { id: 'TKT006', customer: 'Amit Patel', service: 'Construction Materials - Steel', date: '2025-11-26', serviceStatus: 'accepted', assignedTo: 'XYZ Materials (Vendor)', priority: 'high', paymentStatus: 'paid', location: 'Ahmedabad' },
// ]

// export const initialUsers: User[] = [
//   { id: 'USR001', name: 'Rajesh Kumar', email: 'rajesh@email.com', joinDate: '2025-01-15', status: 'active', plan: 'Premium', location: 'Mumbai' },
//   { id: 'USR002', name: 'Priya Sharma', email: 'priya@email.com', joinDate: '2025-02-20', status: 'active', plan: 'Basic', location: 'Pune' },
//   { id: 'USR003', name: 'Amit Patel', email: 'amit@email.com', joinDate: '2025-03-10', status: 'blocked', plan: 'Premium', location: 'Bengaluru' },
//   { id: 'USR004', name: 'Sneha Rao', email: 'sneha@email.com', joinDate: '2025-04-08', status: 'active', plan: 'Basic', location: 'Hyderabad' },
// ]

// export const initialVendors: Vendor[] = [
//   { id: 'VND001', name: 'ABC Suppliers', email: 'abc@email.com', service: 'Construction Materials', pan: 'ABCDE1234F', status: 'active', totalOrders: 123, contact: '+91 90000 11111', location: 'Mumbai' },
//   { id: 'VND002', name: 'XYZ Materials', email: 'xyz@email.com', service: 'Construction Materials', pan: 'XYZAB5678G', status: 'active', totalOrders: 89, contact: '+91 90000 22222', location: 'Delhi' },
//   { id: 'VND003', name: 'Green Clean', email: 'green@email.com', service: 'Cleaning Supplies', pan: 'GHJKL1234K', status: 'inactive', totalOrders: 44, contact: '+91 90000 33333', location: 'Pune' },
// ]

// export const initialFreelancers: Freelancer[] = [
//   // Mumbai - 5 members  
//   { id: 'FRL001', name: 'Vikram Reddy', email: 'vikram.reddy@email.com', skills: ['Carpentry', 'Painting', 'Furniture Making', 'Woodwork', 'Interior Design'], completed: 32, rating: 4.6, status: 'approved', age: 35, city: 'Mumbai' },
//   { id: 'FRL002', name: 'Sanjay Patil', email: 'sanjay.patil@email.com', skills: ['Plumbing', 'Pipe Fitting', 'Water Heater', 'Drainage', 'Bathroom Fitting'], completed: 48, rating: 4.7, status: 'approved', age: 38, city: 'Mumbai' },
//   { id: 'FRL003', name: 'Neha Desai', email: 'neha.desai@email.com', skills: ['Cleaning', 'Sanitization', 'Deep Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 55, rating: 4.8, status: 'approved', age: 29, city: 'Mumbai' },
//   { id: 'FRL004', name: 'Amit Shah', email: 'amit.shah@email.com', skills: ['Electrical', 'Wiring', 'Solar Panels', 'Inverter Installation', 'Appliance Repair'], completed: 41, rating: 4.5, status: 'approved', age: 42, city: 'Mumbai' },
//   { id: 'FRL005', name: 'Pooja Joshi', email: 'pooja.joshi@email.com', skills: ['HVAC', 'AC Repair', 'Ventilation', 'Refrigeration', 'Duct Cleaning'], completed: 36, rating: 4.6, status: 'approved', age: 31, city: 'Mumbai' },

//   // Delhi - 5 members
//   { id: 'FRL006', name: 'Arjun Patel', email: 'arjun.patel@email.com', skills: ['Plumbing', 'Electrical', 'Solar Installation', 'Wiring', 'Water Heater'], completed: 45, rating: 4.8, status: 'approved', age: 39, city: 'Delhi' },
//   { id: 'FRL007', name: 'Rahul Verma', email: 'rahul.verma@email.com', skills: ['Construction', 'Masonry', 'Bricklaying', 'Plastering', 'Tiling'], completed: 52, rating: 4.7, status: 'approved', age: 44, city: 'Delhi' },
//   { id: 'FRL008', name: 'Simran Kaur', email: 'simran.kaur@email.com', skills: ['Interior Design', 'Painting', 'Wallpaper', 'Texture', 'Decor'], completed: 38, rating: 4.9, status: 'approved', age: 33, city: 'Delhi' },
//   { id: 'FRL009', name: 'Deepak Kumar', email: 'deepak.kumar@email.com', skills: ['Carpentry', 'Furniture', 'Woodwork', 'Cabinet Making', 'Door Fitting'], completed: 43, rating: 4.6, status: 'approved', age: 36, city: 'Delhi' },
//   { id: 'FRL010', name: 'Anjali Gupta', email: 'anjali.gupta@email.com', skills: ['Cleaning', 'Home Services', 'Sanitization', 'Deep Cleaning', 'Floor Polishing'], completed: 49, rating: 4.8, status: 'approved', age: 28, city: 'Delhi' },

//   // Bengaluru - 5 members
//   { id: 'FRL011', name: 'Ananya Iyer', email: 'ananya.iyer@email.com', skills: ['Electrical', 'Solar', 'Inverter Installation', 'Wiring', 'Appliance Repair'], completed: 28, rating: 4.7, status: 'approved', age: 33, city: 'Bengaluru' },
//   { id: 'FRL012', name: 'Karthik Rao', email: 'karthik.rao@email.com', skills: ['Plumbing', 'Drainage', 'Pipe Fitting', 'Water Heater', 'Bathroom Fitting'], completed: 56, rating: 4.8, status: 'approved', age: 40, city: 'Bengaluru' },
//   { id: 'FRL013', name: 'Lakshmi Reddy', email: 'lakshmi.reddy@email.com', skills: ['Cleaning', 'Deep Cleaning', 'Sanitization', 'Carpet Cleaning', 'Floor Polishing'], completed: 62, rating: 4.9, status: 'approved', age: 35, city: 'Bengaluru' },
//   { id: 'FRL014', name: 'Suresh Gowda', email: 'suresh.gowda@email.com', skills: ['HVAC', 'Refrigeration', 'AC Repair', 'Ventilation', 'Duct Cleaning'], completed: 47, rating: 4.6, status: 'approved', age: 41, city: 'Bengaluru' },
//   { id: 'FRL015', name: 'Divya Murthy', email: 'divya.murthy@email.com', skills: ['Painting', 'Wallpaper', 'Texture', 'Interior Design', 'Color Consultation'], completed: 33, rating: 4.7, status: 'approved', age: 30, city: 'Bengaluru' },

//   // Hyderabad - 5 members
//   { id: 'FRL016', name: 'Priya Sharma', email: 'priya.sharma@email.com', skills: ['Cleaning', 'Home Services', 'Deep Cleaning', 'Sanitization', 'Floor Polishing'], completed: 67, rating: 4.9, status: 'approved', age: 41, city: 'Hyderabad' },
//   { id: 'FRL017', name: 'Venkat Reddy', email: 'venkat.reddy@email.com', skills: ['Electrical', 'Wiring', 'Solar', 'Inverter Installation', 'Appliance Repair'], completed: 51, rating: 4.7, status: 'approved', age: 37, city: 'Hyderabad' },
//   { id: 'FRL018', name: 'Shalini Rao', email: 'shalini.rao@email.com', skills: ['Interior Design', 'Decor', 'Furniture', 'Painting', 'Wallpaper'], completed: 39, rating: 4.8, status: 'approved', age: 32, city: 'Hyderabad' },
//   { id: 'FRL019', name: 'Ravi Kumar', email: 'ravi.kumar@email.com', skills: ['Plumbing', 'Pipe Fitting', 'Drainage', 'Water Heater', 'Bathroom Fitting'], completed: 44, rating: 4.6, status: 'approved', age: 39, city: 'Hyderabad' },
//   { id: 'FRL020', name: 'Kavitha Naidu', email: 'kavitha.naidu@email.com', skills: ['Carpentry', 'Woodwork', 'Furniture', 'Cabinet Making', 'Door Fitting'], completed: 35, rating: 4.7, status: 'approved', age: 34, city: 'Hyderabad' },

//   // Ahmedabad - 5 members
//   { id: 'FRL021', name: 'Aarav Mehta', email: 'aarav.mehta@email.com', skills: ['HVAC', 'Refrigeration', 'AC Repair', 'Ventilation', 'Duct Cleaning'], completed: 58, rating: 4.8, status: 'approved', age: 33, city: 'Ahmedabad' },
//   { id: 'FRL022', name: 'Nisha Patel', email: 'nisha.patel@email.com', skills: ['Cleaning', 'Sanitization', 'Deep Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 46, rating: 4.7, status: 'approved', age: 29, city: 'Ahmedabad' },
//   { id: 'FRL023', name: 'Jayesh Shah', email: 'jayesh.shah@email.com', skills: ['Electrical', 'Solar', 'Wiring', 'Inverter Installation', 'Appliance Repair'], completed: 40, rating: 4.6, status: 'approved', age: 36, city: 'Ahmedabad' },
//   { id: 'FRL024', name: 'Ritu Desai', email: 'ritu.desai@email.com', skills: ['Painting', 'Texture', 'Wallpaper', 'Interior Design', 'Color Consultation'], completed: 37, rating: 4.7, status: 'approved', age: 31, city: 'Ahmedabad' },
//   { id: 'FRL025', name: 'Harsh Modi', email: 'harsh.modi@email.com', skills: ['Plumbing', 'Water Heater', 'Pipe Fitting', 'Drainage', 'Bathroom Fitting'], completed: 42, rating: 4.5, status: 'approved', age: 38, city: 'Ahmedabad' },

//   // Chennai - 5 members
//   { id: 'FRL026', name: 'Meera Nair', email: 'meera.nair@email.com', skills: ['Interior Design', 'Painting', 'Wallpaper', 'Decor', 'Color Consultation'], completed: 38, rating: 4.8, status: 'approved', age: 31, city: 'Chennai' },
//   { id: 'FRL027', name: 'Ramesh Kumar', email: 'ramesh.kumar@email.com', skills: ['Plumbing', 'Drainage', 'Pipe Fitting', 'Water Heater', 'Bathroom Fitting'], completed: 53, rating: 4.7, status: 'approved', age: 42, city: 'Chennai' },
//   { id: 'FRL028', name: 'Kavya Rao', email: 'kavya.rao@email.com', skills: ['Deep Cleaning', 'Sanitization', 'Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 48, rating: 4.9, status: 'approved', age: 27, city: 'Chennai' },
//   { id: 'FRL029', name: 'Arun Krishnan', email: 'arun.krishnan@email.com', skills: ['Electrical', 'Appliance Repair', 'Wiring', 'Solar', 'Inverter Installation'], completed: 45, rating: 4.6, status: 'approved', age: 39, city: 'Chennai' },
//   { id: 'FRL030', name: 'Preethi Menon', email: 'preethi.menon@email.com', skills: ['Carpentry', 'Furniture', 'Woodwork', 'Cabinet Making', 'Door Fitting'], completed: 34, rating: 4.7, status: 'approved', age: 30, city: 'Chennai' },

//   // Kolkata - 5 members
//   { id: 'FRL031', name: 'Divya Menon', email: 'divya.menon@email.com', skills: ['Gardening', 'Landscaping', 'Plant Care', 'Lawn Maintenance', 'Tree Trimming'], completed: 24, rating: 4.4, status: 'approved', age: 29, city: 'Kolkata' },
//   { id: 'FRL032', name: 'Sourav Das', email: 'sourav.das@email.com', skills: ['Plumbing', 'Pipe Fitting', 'Water Heater', 'Drainage', 'Bathroom Fitting'], completed: 50, rating: 4.7, status: 'approved', age: 37, city: 'Kolkata' },
//   { id: 'FRL033', name: 'Rina Chatterjee', email: 'rina.chatterjee@email.com', skills: ['Cleaning', 'Home Services', 'Sanitization', 'Deep Cleaning', 'Floor Polishing'], completed: 57, rating: 4.8, status: 'approved', age: 33, city: 'Kolkata' },
//   { id: 'FRL034', name: 'Amit Banerjee', email: 'amit.banerjee@email.com', skills: ['Electrical', 'Wiring', 'Solar', 'Inverter Installation', 'Appliance Repair'], completed: 43, rating: 4.6, status: 'approved', age: 40, city: 'Kolkata' },
//   { id: 'FRL035', name: 'Monika Sen', email: 'monika.sen@email.com', skills: ['Painting', 'Decor', 'Wallpaper', 'Texture', 'Interior Design'], completed: 36, rating: 4.7, status: 'approved', age: 32, city: 'Kolkata' },

//   // Pune - 5 members
//   { id: 'FRL036', name: 'Rajesh Gupta', email: 'rajesh.gupta@email.com', skills: ['HVAC', 'AC Repair', 'Refrigeration', 'Ventilation', 'Duct Cleaning'], completed: 52, rating: 4.5, status: 'approved', age: 44, city: 'Pune' },
//   { id: 'FRL037', name: 'Sneha Kulkarni', email: 'sneha.kulkarni@email.com', skills: ['Cleaning', 'Sanitization', 'Deep Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 49, rating: 4.8, status: 'approved', age: 28, city: 'Pune' },
//   { id: 'FRL038', name: 'Varun Joshi', email: 'varun.joshi@email.com', skills: ['Plumbing', 'Water Heater', 'Pipe Fitting', 'Drainage', 'Bathroom Fitting'], completed: 46, rating: 4.7, status: 'approved', age: 35, city: 'Pune' },
//   { id: 'FRL039', name: 'Aditi Deshmukh', email: 'aditi.deshmukh@email.com', skills: ['Interior Design', 'Furniture', 'Decor', 'Painting', 'Wallpaper'], completed: 41, rating: 4.9, status: 'approved', age: 31, city: 'Pune' },
//   { id: 'FRL040', name: 'Nikhil Patil', email: 'nikhil.patil@email.com', skills: ['Electrical', 'Solar', 'Wiring', 'Inverter Installation', 'Appliance Repair'], completed: 38, rating: 4.6, status: 'approved', age: 36, city: 'Pune' },

//   // Jaipur - 5 members
//   { id: 'FRL041', name: 'Karan Singh', email: 'karan.singh@email.com', skills: ['Construction', 'Masonry', 'Bricklaying', 'Plastering', 'Tiling'], completed: 61, rating: 4.6, status: 'approved', age: 42, city: 'Jaipur' },
//   { id: 'FRL042', name: 'Pooja Rathore', email: 'pooja.rathore@email.com', skills: ['Cleaning', 'Deep Cleaning', 'Sanitization', 'Floor Polishing', 'Carpet Cleaning'], completed: 44, rating: 4.7, status: 'approved', age: 30, city: 'Jaipur' },
//   { id: 'FRL043', name: 'Vikrant Sharma', email: 'vikrant.sharma@email.com', skills: ['Plumbing', 'Drainage', 'Pipe Fitting', 'Water Heater', 'Bathroom Fitting'], completed: 47, rating: 4.8, status: 'approved', age: 38, city: 'Jaipur' },
//   { id: 'FRL044', name: 'Anjali Meena', email: 'anjali.meena@email.com', skills: ['Painting', 'Texture', 'Wallpaper', 'Interior Design', 'Color Consultation'], completed: 39, rating: 4.6, status: 'approved', age: 29, city: 'Jaipur' },
//   { id: 'FRL045', name: 'Rohit Chauhan', email: 'rohit.chauhan@email.com', skills: ['Electrical', 'Wiring', 'Solar', 'Inverter Installation', 'Appliance Repair'], completed: 42, rating: 4.7, status: 'approved', age: 35, city: 'Jaipur' },

//   // Surat - 5 members
//   { id: 'FRL046', name: 'Rohan Desai', email: 'rohan.desai@email.com', skills: ['Plumbing', 'Pipe Fitting', 'Water Heater', 'Drainage', 'Bathroom Fitting'], completed: 55, rating: 4.8, status: 'approved', age: 30, city: 'Surat' },
//   { id: 'FRL047', name: 'Priyanka Patel', email: 'priyanka.patel@email.com', skills: ['Cleaning', 'Sanitization', 'Deep Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 51, rating: 4.7, status: 'approved', age: 27, city: 'Surat' },
//   { id: 'FRL048', name: 'Jignesh Shah', email: 'jignesh.shah@email.com', skills: ['Electrical', 'Appliance Repair', 'Wiring', 'Solar', 'Inverter Installation'], completed: 48, rating: 4.6, status: 'approved', age: 34, city: 'Surat' },
//   { id: 'FRL049', name: 'Riya Modi', email: 'riya.modi@email.com', skills: ['Interior Design', 'Decor', 'Painting', 'Wallpaper', 'Color Consultation'], completed: 37, rating: 4.9, status: 'approved', age: 32, city: 'Surat' },
//   { id: 'FRL050', name: 'Ketan Mehta', email: 'ketan.mehta@email.com', skills: ['HVAC', 'AC Repair', 'Refrigeration', 'Ventilation', 'Duct Cleaning'], completed: 43, rating: 4.7, status: 'approved', age: 39, city: 'Surat' },

//   // Lucknow - 5 members
//   { id: 'FRL051', name: 'Abhishek Mishra', email: 'abhishek.mishra@email.com', skills: ['Plumbing', 'Water Heater', 'Pipe Fitting', 'Drainage', 'Bathroom Fitting'], completed: 46, rating: 4.7, status: 'approved', age: 36, city: 'Lucknow' },
//   { id: 'FRL052', name: 'Swati Verma', email: 'swati.verma@email.com', skills: ['Cleaning', 'Home Services', 'Sanitization', 'Deep Cleaning', 'Floor Polishing'], completed: 52, rating: 4.8, status: 'approved', age: 31, city: 'Lucknow' },
//   { id: 'FRL053', name: 'Rajat Tiwari', email: 'rajat.tiwari@email.com', skills: ['Electrical', 'Wiring', 'Solar', 'Inverter Installation', 'Appliance Repair'], completed: 44, rating: 4.6, status: 'approved', age: 38, city: 'Lucknow' },
//   { id: 'FRL054', name: 'Neha Srivastava', email: 'neha.srivastava@email.com', skills: ['Painting', 'Wallpaper', 'Texture', 'Interior Design', 'Color Consultation'], completed: 35, rating: 4.7, status: 'approved', age: 29, city: 'Lucknow' },
//   { id: 'FRL055', name: 'Vikas Yadav', email: 'vikas.yadav@email.com', skills: ['Carpentry', 'Furniture', 'Woodwork', 'Cabinet Making', 'Door Fitting'], completed: 40, rating: 4.5, status: 'approved', age: 33, city: 'Lucknow' },

//   // Kanpur - 5 members
//   { id: 'FRL056', name: 'Manish Gupta', email: 'manish.gupta@email.com', skills: ['Plumbing', 'Drainage', 'Pipe Fitting', 'Water Heater', 'Bathroom Fitting'], completed: 49, rating: 4.6, status: 'approved', age: 37, city: 'Kanpur' },
//   { id: 'FRL057', name: 'Priti Sharma', email: 'priti.sharma@email.com', skills: ['Cleaning', 'Sanitization', 'Deep Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 45, rating: 4.7, status: 'approved', age: 30, city: 'Kanpur' },
//   { id: 'FRL058', name: 'Sanjay Kumar', email: 'sanjay.kumar@email.com', skills: ['Electrical', 'Solar', 'Wiring', 'Inverter Installation', 'Appliance Repair'], completed: 41, rating: 4.8, status: 'approved', age: 35, city: 'Kanpur' },
//   { id: 'FRL059', name: 'Ritu Singh', email: 'ritu.singh@email.com', skills: ['Interior Design', 'Painting', 'Wallpaper', 'Decor', 'Color Consultation'], completed: 38, rating: 4.6, status: 'approved', age: 32, city: 'Kanpur' },
//   { id: 'FRL060', name: 'Deepak Pandey', email: 'deepak.pandey@email.com', skills: ['HVAC', 'Refrigeration', 'AC Repair', 'Ventilation', 'Duct Cleaning'], completed: 47, rating: 4.7, status: 'approved', age: 40, city: 'Kanpur' },

//   // Nagpur - 5 members
//   { id: 'FRL061', name: 'Anil Deshmukh', email: 'anil.deshmukh@email.com', skills: ['Plumbing', 'Pipe Fitting', 'Water Heater', 'Drainage', 'Bathroom Fitting'], completed: 50, rating: 4.7, status: 'approved', age: 39, city: 'Nagpur' },
//   { id: 'FRL062', name: 'Sunita Thakur', email: 'sunita.thakur@email.com', skills: ['Cleaning', 'Deep Cleaning', 'Sanitization', 'Floor Polishing', 'Carpet Cleaning'], completed: 54, rating: 4.8, status: 'approved', age: 33, city: 'Nagpur' },
//   { id: 'FRL063', name: 'Pravin Wankhede', email: 'pravin.wankhede@email.com', skills: ['Electrical', 'Wiring', 'Solar', 'Inverter Installation', 'Appliance Repair'], completed: 46, rating: 4.6, status: 'approved', age: 36, city: 'Nagpur' },
//   { id: 'FRL064', name: 'Madhuri Joshi', email: 'madhuri.joshi@email.com', skills: ['Painting', 'Texture', 'Wallpaper', 'Interior Design', 'Color Consultation'], completed: 39, rating: 4.7, status: 'approved', age: 31, city: 'Nagpur' },
//   { id: 'FRL065', name: 'Rahul Bhosale', email: 'rahul.bhosale@email.com', skills: ['Carpentry', 'Woodwork', 'Furniture', 'Cabinet Making', 'Door Fitting'], completed: 42, rating: 4.5, status: 'approved', age: 34, city: 'Nagpur' },

//   // Indore - 5 members
//   { id: 'FRL066', name: 'Sneha Joshi', email: 'sneha.joshi@email.com', skills: ['Electrical', 'Wiring', 'Solar', 'Inverter Installation', 'Appliance Repair'], completed: 48, rating: 4.8, status: 'approved', age: 28, city: 'Indore' },
//   { id: 'FRL067', name: 'Vishal Chouhan', email: 'vishal.chouhan@email.com', skills: ['Plumbing', 'Water Heater', 'Pipe Fitting', 'Drainage', 'Bathroom Fitting'], completed: 51, rating: 4.7, status: 'approved', age: 35, city: 'Indore' },
//   { id: 'FRL068', name: 'Kavita Sharma', email: 'kavita.sharma@email.com', skills: ['Cleaning', 'Sanitization', 'Deep Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 47, rating: 4.6, status: 'approved', age: 30, city: 'Indore' },
//   { id: 'FRL069', name: 'Akash Patel', email: 'akash.patel@email.com', skills: ['HVAC', 'AC Repair', 'Refrigeration', 'Ventilation', 'Duct Cleaning'], completed: 44, rating: 4.7, status: 'approved', age: 32, city: 'Indore' },
//   { id: 'FRL070', name: 'Isha Malhotra', email: 'isha.malhotra@email.com', skills: ['Interior Design', 'Decor', 'Painting', 'Wallpaper', 'Color Consultation'], completed: 36, rating: 4.9, status: 'approved', age: 29, city: 'Indore' },

//   // Thane - 5 members
//   { id: 'FRL071', name: 'Sachin Pawar', email: 'sachin.pawar@email.com', skills: ['Plumbing', 'Drainage', 'Pipe Fitting', 'Water Heater', 'Bathroom Fitting'], completed: 53, rating: 4.7, status: 'approved', age: 37, city: 'Thane' },
//   { id: 'FRL072', name: 'Priya Naik', email: 'priya.naik@email.com', skills: ['Cleaning', 'Home Services', 'Sanitization', 'Deep Cleaning', 'Floor Polishing'], completed: 49, rating: 4.8, status: 'approved', age: 31, city: 'Thane' },
//   { id: 'FRL073', name: 'Ganesh Rane', email: 'ganesh.rane@email.com', skills: ['Electrical', 'Appliance Repair', 'Wiring', 'Solar', 'Inverter Installation'], completed: 45, rating: 4.6, status: 'approved', age: 34, city: 'Thane' },
//   { id: 'FRL074', name: 'Shweta Sawant', email: 'shweta.sawant@email.com', skills: ['Painting', 'Wallpaper', 'Texture', 'Interior Design', 'Color Consultation'], completed: 38, rating: 4.7, status: 'approved', age: 28, city: 'Thane' },
//   { id: 'FRL075', name: 'Mahesh Gaikwad', email: 'mahesh.gaikwad@email.com', skills: ['Carpentry', 'Furniture', 'Woodwork', 'Cabinet Making', 'Door Fitting'], completed: 41, rating: 4.5, status: 'approved', age: 39, city: 'Thane' },

//   // Bhopal - 5 members
//   { id: 'FRL076', name: 'Arjun Yadav', email: 'arjun.yadav@email.com', skills: ['Plumbing', 'Pipe Fitting', 'Water Heater', 'Drainage', 'Bathroom Fitting'], completed: 47, rating: 4.6, status: 'approved', age: 36, city: 'Bhopal' },
//   { id: 'FRL077', name: 'Rekha Tiwari', email: 'rekha.tiwari@email.com', skills: ['Cleaning', 'Deep Cleaning', 'Sanitization', 'Floor Polishing', 'Carpet Cleaning'], completed: 52, rating: 4.8, status: 'approved', age: 32, city: 'Bhopal' },
//   { id: 'FRL078', name: 'Sunil Verma', email: 'sunil.verma@email.com', skills: ['Electrical', 'Solar', 'Wiring', 'Inverter Installation', 'Appliance Repair'], completed: 44, rating: 4.7, status: 'approved', age: 38, city: 'Bhopal' },
//   { id: 'FRL079', name: 'Anita Mishra', email: 'anita.mishra@email.com', skills: ['Interior Design', 'Painting', 'Wallpaper', 'Decor', 'Color Consultation'], completed: 37, rating: 4.6, status: 'approved', age: 30, city: 'Bhopal' },
//   { id: 'FRL080', name: 'Rajendra Singh', email: 'rajendra.singh@email.com', skills: ['HVAC', 'Refrigeration', 'AC Repair', 'Ventilation', 'Duct Cleaning'], completed: 50, rating: 4.7, status: 'approved', age: 41, city: 'Bhopal' },

//   // Visakhapatnam - 5 members
//   { id: 'FRL081', name: 'Krishna Rao', email: 'krishna.rao@email.com', skills: ['Plumbing', 'Water Heater', 'Pipe Fitting', 'Drainage', 'Bathroom Fitting'], completed: 48, rating: 4.7, status: 'approved', age: 35, city: 'Visakhapatnam' },
//   { id: 'FRL082', name: 'Lakshmi Devi', email: 'lakshmi.devi@email.com', skills: ['Cleaning', 'Sanitization', 'Deep Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 55, rating: 4.8, status: 'approved', age: 33, city: 'Visakhapatnam' },
//   { id: 'FRL083', name: 'Srinivas Reddy', email: 'srinivas.reddy@email.com', skills: ['Electrical', 'Wiring', 'Solar', 'Inverter Installation', 'Appliance Repair'], completed: 46, rating: 4.6, status: 'approved', age: 37, city: 'Visakhapatnam' },
//   { id: 'FRL084', name: 'Padma Naidu', email: 'padma.naidu@email.com', skills: ['Painting', 'Decor', 'Wallpaper', 'Texture', 'Interior Design'], completed: 39, rating: 4.7, status: 'approved', age: 31, city: 'Visakhapatnam' },
//   { id: 'FRL085', name: 'Ramana Murthy', email: 'ramana.murthy@email.com', skills: ['Carpentry', 'Woodwork', 'Furniture', 'Cabinet Making', 'Door Fitting'], completed: 43, rating: 4.5, status: 'approved', age: 40, city: 'Visakhapatnam' },

//   // Patna - 5 members
//   { id: 'FRL086', name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', skills: ['Plumbing', 'Drainage', 'Pipe Fitting', 'Water Heater', 'Bathroom Fitting'], completed: 51, rating: 4.7, status: 'approved', age: 38, city: 'Patna' },
//   { id: 'FRL087', name: 'Suman Devi', email: 'suman.devi@email.com', skills: ['Cleaning', 'Home Services', 'Sanitization', 'Deep Cleaning', 'Floor Polishing'], completed: 49, rating: 4.8, status: 'approved', age: 32, city: 'Patna' },
//   { id: 'FRL088', name: 'Manoj Singh', email: 'manoj.singh@email.com', skills: ['Electrical', 'Appliance Repair', 'Wiring', 'Solar', 'Inverter Installation'], completed: 45, rating: 4.6, status: 'approved', age: 36, city: 'Patna' },
//   { id: 'FRL089', name: 'Rani Kumari', email: 'rani.kumari@email.com', skills: ['Interior Design', 'Furniture', 'Decor', 'Painting', 'Wallpaper'], completed: 38, rating: 4.7, status: 'approved', age: 29, city: 'Patna' },
//   { id: 'FRL090', name: 'Avinash Jha', email: 'avinash.jha@email.com', skills: ['HVAC', 'AC Repair', 'Refrigeration', 'Ventilation', 'Duct Cleaning'], completed: 42, rating: 4.5, status: 'approved', age: 34, city: 'Patna' },

//   // Vadodara - 5 members
//   { id: 'FRL091', name: 'Hitesh Patel', email: 'hitesh.patel@email.com', skills: ['Plumbing', 'Pipe Fitting', 'Water Heater', 'Drainage', 'Bathroom Fitting'], completed: 54, rating: 4.8, status: 'approved', age: 37, city: 'Vadodara' },
//   { id: 'FRL092', name: 'Komal Shah', email: 'komal.shah@email.com', skills: ['Cleaning', 'Sanitization', 'Deep Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 50, rating: 4.7, status: 'approved', age: 30, city: 'Vadodara' },
//   { id: 'FRL093', name: 'Bhavesh Desai', email: 'bhavesh.desai@email.com', skills: ['Electrical', 'Solar', 'Wiring', 'Inverter Installation', 'Appliance Repair'], completed: 47, rating: 4.6, status: 'approved', age: 35, city: 'Vadodara' },
//   { id: 'FRL094', name: 'Nidhi Modi', email: 'nidhi.modi@email.com', skills: ['Painting', 'Texture', 'Wallpaper', 'Interior Design', 'Color Consultation'], completed: 40, rating: 4.7, status: 'approved', age: 31, city: 'Vadodara' },
//   { id: 'FRL095', name: 'Chirag Mehta', email: 'chirag.mehta@email.com', skills: ['Carpentry', 'Furniture', 'Woodwork', 'Cabinet Making', 'Door Fitting'], completed: 44, rating: 4.9, status: 'approved', age: 33, city: 'Vadodara' },

//   // Ghaziabad - 5 members
//   { id: 'FRL096', name: 'Naveen Sharma', email: 'naveen.sharma@email.com', skills: ['Plumbing', 'Water Heater', 'Pipe Fitting', 'Drainage', 'Bathroom Fitting'], completed: 46, rating: 4.6, status: 'approved', age: 34, city: 'Ghaziabad' },
//   { id: 'FRL097', name: 'Seema Agarwal', email: 'seema.agarwal@email.com', skills: ['Cleaning', 'Deep Cleaning', 'Sanitization', 'Floor Polishing', 'Carpet Cleaning'], completed: 53, rating: 4.8, status: 'approved', age: 31, city: 'Ghaziabad' },
//   { id: 'FRL098', name: 'Pankaj Tyagi', email: 'pankaj.tyagi@email.com', skills: ['Electrical', 'Wiring', 'Solar', 'Inverter Installation', 'Appliance Repair'], completed: 48, rating: 4.7, status: 'approved', age: 36, city: 'Ghaziabad' },
//   { id: 'FRL099', name: 'Renu Gupta', email: 'renu.gupta@email.com', skills: ['Interior Design', 'Decor', 'Painting', 'Wallpaper', 'Color Consultation'], completed: 41, rating: 4.6, status: 'approved', age: 29, city: 'Ghaziabad' },
//   { id: 'FRL100', name: 'Ashish Kumar', email: 'ashish.kumar@email.com', skills: ['HVAC', 'Refrigeration', 'AC Repair', 'Ventilation', 'Duct Cleaning'], completed: 45, rating: 4.7, status: 'approved', age: 38, city: 'Ghaziabad' },
// ]

// export const initialPendingFreelancers: Freelancer[] = [
//   { id: 'REQ001', name: 'Aarav Mehta', email: 'aarav.mehta@email.com', skills: ['HVAC', 'Refrigeration', 'AC Repair', 'Ventilation', 'Duct Cleaning'], completed: 0, rating: 0, status: 'pending', age: 33, city: 'Ahmedabad',},
//   { id: 'REQ002', name: 'Kavya Rao', email: 'kavya.rao@email.com', skills: ['Deep Cleaning', 'Sanitization', 'Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 0, rating: 0, status: 'pending', age: 27, city: 'Chennai' },
//   { id: 'REQ003', name: 'Rohan Desai', email: 'rohan.desai@email.com', skills: ['Plumbing', 'Pipe Fitting', 'Water Heater', 'Drainage', 'Bathroom Fitting'], completed: 0, rating: 0, status: 'pending', age: 30, city: 'Surat' },
//   { id: 'REQ004', name: 'Sneha Joshi', email: 'sneha.joshi@email.com', skills: ['Electrical', 'Wiring', 'Solar', 'Inverter Installation', 'Appliance Repair'], completed: 0, rating: 0, status: 'pending', age: 28, city: 'Indore' },
// ]















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
  { id: 'FRL001', name: 'Vikram Reddy', email: 'vikram.reddy@email.com', skills: ['Carpentry', 'Painting', 'Furniture Making', 'Woodwork', 'Interior Design'], completed: 32, rating: 4.6, status: 'approved', age: 35, city: 'Mumbai', aadhaar: '343991475978', pan: 'UHLWV1386Y' },
  { id: 'FRL002', name: 'Sanjay Patil', email: 'sanjay.patil@email.com', skills: ['Plumbing', 'Pipe Fitting', 'Water Heater', 'Drainage', 'Bathroom Fitting'], completed: 48, rating: 4.7, status: 'approved', age: 38, city: 'Mumbai', aadhaar: '974633638225', pan: 'OEEFG5889N' },
  { id: 'FRL003', name: 'Neha Desai', email: 'neha.desai@email.com', skills: ['Cleaning', 'Sanitization', 'Deep Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 55, rating: 4.8, status: 'approved', age: 29, city: 'Mumbai', aadhaar: '277012611179', pan: 'OWNWY0800E' },
  { id: 'FRL004', name: 'Amit Shah', email: 'amit.shah@email.com', skills: ['Electrical', 'Wiring', 'Solar Panels', 'Inverter Installation', 'Appliance Repair'], completed: 41, rating: 4.5, status: 'approved', age: 42, city: 'Mumbai', aadhaar: '880920866676', pan: 'KZTPS2753N' },
  { id: 'FRL005', name: 'Pooja Joshi', email: 'pooja.joshi@email.com', skills: ['HVAC', 'AC Repair', 'Ventilation', 'Refrigeration', 'Duct Cleaning'], completed: 36, rating: 4.6, status: 'approved', age: 31, city: 'Mumbai', aadhaar: '854722745965', pan: 'NZDFS4818J' },

  // Delhi - 5 members
  { id: 'FRL006', name: 'Arjun Patel', email: 'arjun.patel@email.com', skills: ['Plumbing', 'Electrical', 'Solar Installation', 'Wiring', 'Water Heater'], completed: 45, rating: 4.8, status: 'approved', age: 39, city: 'Delhi', aadhaar: '214070288226', pan: 'OQQWO8641Q' },
  { id: 'FRL007', name: 'Rahul Verma', email: 'rahul.verma@email.com', skills: ['Construction', 'Masonry', 'Bricklaying', 'Plastering', 'Tiling'], completed: 52, rating: 4.7, status: 'approved', age: 44, city: 'Delhi', aadhaar: '913176933678', pan: 'SUKSF2201G' },
  { id: 'FRL008', name: 'Simran Kaur', email: 'simran.kaur@email.com', skills: ['Interior Design', 'Painting', 'Wallpaper', 'Texture', 'Decor'], completed: 38, rating: 4.9, status: 'approved', age: 33, city: 'Delhi', aadhaar: '578951500018', pan: 'MWGUK6988N' },
  { id: 'FRL009', name: 'Deepak Kumar', email: 'deepak.kumar@email.com', skills: ['Carpentry', 'Furniture', 'Woodwork', 'Cabinet Making', 'Door Fitting'], completed: 43, rating: 4.6, status: 'approved', age: 36, city: 'Delhi', aadhaar: '013665908616', pan: 'YMVOX8766Y' },
  { id: 'FRL010', name: 'Anjali Gupta', email: 'anjali.gupta@email.com', skills: ['Cleaning', 'Home Services', 'Sanitization', 'Deep Cleaning', 'Floor Polishing'], completed: 49, rating: 4.8, status: 'approved', age: 28, city: 'Delhi', aadhaar: '249222827326', pan: 'QDJXP4621O' },

  // Bengaluru - 5 members
  { id: 'FRL011', name: 'Ananya Iyer', email: 'ananya.iyer@email.com', skills: ['Electrical', 'Solar', 'Inverter Installation', 'Wiring', 'Appliance Repair'], completed: 28, rating: 4.7, status: 'approved', age: 33, city: 'Bengaluru', aadhaar: '325197252448', pan: 'FKJSZ2570T' },
  { id: 'FRL012', name: 'Karthik Rao', email: 'karthik.rao@email.com', skills: ['Plumbing', 'Drainage', 'Pipe Fitting', 'Water Heater', 'Bathroom Fitting'], completed: 56, rating: 4.8, status: 'approved', age: 40, city: 'Bengaluru', aadhaar: '804374279558', pan: 'HVBND4095V' },
  { id: 'FRL013', name: 'Lakshmi Reddy', email: 'lakshmi.reddy@email.com', skills: ['Cleaning', 'Deep Cleaning', 'Sanitization', 'Carpet Cleaning', 'Floor Polishing'], completed: 62, rating: 4.9, status: 'approved', age: 35, city: 'Bengaluru', aadhaar: '274604575291', pan: 'RSPIR0354S' },
  { id: 'FRL014', name: 'Suresh Gowda', email: 'suresh.gowda@email.com', skills: ['HVAC', 'Refrigeration', 'AC Repair', 'Ventilation', 'Duct Cleaning'], completed: 47, rating: 4.6, status: 'approved', age: 41, city: 'Bengaluru', aadhaar: '712130512507', pan: 'HRSOR7364H' },
  { id: 'FRL015', name: 'Divya Murthy', email: 'divya.murthy@email.com', skills: ['Painting', 'Wallpaper', 'Texture', 'Interior Design', 'Color Consultation'], completed: 33, rating: 4.7, status: 'approved', age: 30, city: 'Bengaluru', aadhaar: '535976818178', pan: 'FNOYQ3521Y' },

  // Hyderabad - 5 members
  { id: 'FRL016', name: 'Priya Sharma', email: 'priya.sharma@email.com', skills: ['Cleaning', 'Home Services', 'Deep Cleaning', 'Sanitization', 'Floor Polishing'], completed: 67, rating: 4.9, status: 'approved', age: 41, city: 'Hyderabad', aadhaar: '921685882751', pan: 'OURAV2916J' },
  { id: 'FRL017', name: 'Venkat Reddy', email: 'venkat.reddy@email.com', skills: ['Electrical', 'Wiring', 'Solar', 'Inverter Installation', 'Appliance Repair'], completed: 51, rating: 4.7, status: 'approved', age: 37, city: 'Hyderabad', aadhaar: '274093366623', pan: 'DSUTC8233V' },
  { id: 'FRL018', name: 'Shalini Rao', email: 'shalini.rao@email.com', skills: ['Interior Design', 'Decor', 'Furniture', 'Painting', 'Wallpaper'], completed: 39, rating: 4.8, status: 'approved', age: 32, city: 'Hyderabad', aadhaar: '500369719892', pan: 'XRDGB7327N' },
  { id: 'FRL019', name: 'Ravi Kumar', email: 'ravi.kumar@email.com', skills: ['Plumbing', 'Pipe Fitting', 'Drainage', 'Water Heater', 'Bathroom Fitting'], completed: 44, rating: 4.6, status: 'approved', age: 39, city: 'Hyderabad', aadhaar: '002620604529', pan: 'LHXAH5974L' },
  { id: 'FRL020', name: 'Kavitha Naidu', email: 'kavitha.naidu@email.com', skills: ['Carpentry', 'Woodwork', 'Furniture', 'Cabinet Making', 'Door Fitting'], completed: 35, rating: 4.7, status: 'approved', age: 34, city: 'Hyderabad', aadhaar: '053160431342', pan: 'LUJCT3138S' },

  // Ahmedabad - 5 members
  { id: 'FRL021', name: 'Aarav Mehta', email: 'aarav.mehta@email.com', skills: ['HVAC', 'Refrigeration', 'AC Repair', 'Ventilation', 'Duct Cleaning'], completed: 58, rating: 4.8, status: 'approved', age: 33, city: 'Ahmedabad', aadhaar: '445927431999', pan: 'CSMPK5904I' },
  { id: 'FRL022', name: 'Nisha Patel', email: 'nisha.patel@email.com', skills: ['Cleaning', 'Sanitization', 'Deep Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 46, rating: 4.7, status: 'approved', age: 29, city: 'Ahmedabad', aadhaar: '827687506415', pan: 'XBMUP4146Q' },
  { id: 'FRL023', name: 'Jayesh Shah', email: 'jayesh.shah@email.com', skills: ['Electrical', 'Solar', 'Wiring', 'Inverter Installation', 'Appliance Repair'], completed: 40, rating: 4.6, status: 'approved', age: 36, city: 'Ahmedabad', aadhaar: '737532981074', pan: 'WILKV6683W' },
  { id: 'FRL024', name: 'Ritu Desai', email: 'ritu.desai@email.com', skills: ['Painting', 'Texture', 'Wallpaper', 'Interior Design', 'Color Consultation'], completed: 37, rating: 4.7, status: 'approved', age: 31, city: 'Ahmedabad', aadhaar: '730637386948', pan: 'KOZKV0078P' },
  { id: 'FRL025', name: 'Harsh Modi', email: 'harsh.modi@email.com', skills: ['Plumbing', 'Water Heater', 'Pipe Fitting', 'Drainage', 'Bathroom Fitting'], completed: 42, rating: 4.5, status: 'approved', age: 38, city: 'Ahmedabad', aadhaar: '615068075266', pan: 'ILAOC6697S' },

  // Chennai - 5 members
  { id: 'FRL026', name: 'Meera Nair', email: 'meera.nair@email.com', skills: ['Interior Design', 'Painting', 'Wallpaper', 'Decor', 'Color Consultation'], completed: 38, rating: 4.8, status: 'approved', age: 31, city: 'Chennai', aadhaar: '993950645775', pan: 'TJHIL3698L' },
  { id: 'FRL027', name: 'Ramesh Kumar', email: 'ramesh.kumar@email.com', skills: ['Plumbing', 'Drainage', 'Pipe Fitting', 'Water Heater', 'Bathroom Fitting'], completed: 53, rating: 4.7, status: 'approved', age: 42, city: 'Chennai', aadhaar: '304447577611', pan: 'SROZL1352G' },
  { id: 'FRL028', name: 'Kavya Rao', email: 'kavya.rao@email.com', skills: ['Deep Cleaning', 'Sanitization', 'Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 48, rating: 4.9, status: 'approved', age: 27, city: 'Chennai', aadhaar: '823331388553', pan: 'WPLMO3408M' },
  { id: 'FRL029', name: 'Arun Krishnan', email: 'arun.krishnan@email.com', skills: ['Electrical', 'Appliance Repair', 'Wiring', 'Solar', 'Inverter Installation'], completed: 45, rating: 4.6, status: 'approved', age: 39, city: 'Chennai', aadhaar: '922468754765', pan: 'RMEPL5961I' },
  { id: 'FRL030', name: 'Preethi Menon', email: 'preethi.menon@email.com', skills: ['Carpentry', 'Furniture', 'Woodwork', 'Cabinet Making', 'Door Fitting'], completed: 34, rating: 4.7, status: 'approved', age: 30, city: 'Chennai', aadhaar: '583294755845', pan: 'RDTTC8233H' },

  // Kolkata - 5 members
  { id: 'FRL031', name: 'Divya Menon', email: 'divya.menon@email.com', skills: ['Gardening', 'Landscaping', 'Plant Care', 'Lawn Maintenance', 'Tree Trimming'], completed: 24, rating: 4.4, status: 'approved', age: 29, city: 'Kolkata', aadhaar: '190961471343', pan: 'LHYEK7395N' },
  { id: 'FRL032', name: 'Sourav Das', email: 'sourav.das@email.com', skills: ['Plumbing', 'Pipe Fitting', 'Water Heater', 'Drainage', 'Bathroom Fitting'], completed: 50, rating: 4.7, status: 'approved', age: 37, city: 'Kolkata', aadhaar: '910177077129', pan: 'PVTCD6101U' },
  { id: 'FRL033', name: 'Rina Chatterjee', email: 'rina.chatterjee@email.com', skills: ['Cleaning', 'Home Services', 'Sanitization', 'Deep Cleaning', 'Floor Polishing'], completed: 57, rating: 4.8, status: 'approved', age: 33, city: 'Kolkata', aadhaar: '986864434413', pan: 'MEBMN6092C' },
  { id: 'FRL034', name: 'Amit Banerjee', email: 'amit.banerjee@email.com', skills: ['Electrical', 'Wiring', 'Solar', 'Inverter Installation', 'Appliance Repair'], completed: 43, rating: 4.6, status: 'approved', age: 40, city: 'Kolkata', aadhaar: '839175818845', pan: 'IZFXW5593Y' },
  { id: 'FRL035', name: 'Monika Sen', email: 'monika.sen@email.com', skills: ['Painting', 'Decor', 'Wallpaper', 'Texture', 'Interior Design'], completed: 36, rating: 4.7, status: 'approved', age: 32, city: 'Kolkata', aadhaar: '701532929973', pan: 'CZHDW0331X' },

  // Pune - 5 members
  { id: 'FRL036', name: 'Rajesh Gupta', email: 'rajesh.gupta@email.com', skills: ['HVAC', 'AC Repair', 'Refrigeration', 'Ventilation', 'Duct Cleaning'], completed: 52, rating: 4.5, status: 'approved', age: 44, city: 'Pune', aadhaar: '415650531816', pan: 'AKWCX2134R' },
  { id: 'FRL037', name: 'Sneha Kulkarni', email: 'sneha.kulkarni@email.com', skills: ['Cleaning', 'Sanitization', 'Deep Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 49, rating: 4.8, status: 'approved', age: 28, city: 'Pune', aadhaar: '558893129894', pan: 'TIOMU5581R' },
  { id: 'FRL038', name: 'Varun Joshi', email: 'varun.joshi@email.com', skills: ['Plumbing', 'Water Heater', 'Pipe Fitting', 'Drainage', 'Bathroom Fitting'], completed: 46, rating: 4.7, status: 'approved', age: 35, city: 'Pune', aadhaar: '155900424524', pan: 'XBNZI5875I' },
  { id: 'FRL039', name: 'Aditi Deshmukh', email: 'aditi.deshmukh@email.com', skills: ['Interior Design', 'Furniture', 'Decor', 'Painting', 'Wallpaper'], completed: 41, rating: 4.9, status: 'approved', age: 31, city: 'Pune', aadhaar: '299132691640', pan: 'AVAAI2787R' },
  { id: 'FRL040', name: 'Nikhil Patil', email: 'nikhil.patil@email.com', skills: ['Electrical', 'Solar', 'Wiring', 'Inverter Installation', 'Appliance Repair'], completed: 38, rating: 4.6, status: 'approved', age: 36, city: 'Pune', aadhaar: '187546311551', pan: 'VEHKX9937L' },

  // Jaipur - 5 members
  { id: 'FRL041', name: 'Karan Singh', email: 'karan.singh@email.com', skills: ['Construction', 'Masonry', 'Bricklaying', 'Plastering', 'Tiling'], completed: 61, rating: 4.6, status: 'approved', age: 42, city: 'Jaipur', aadhaar: '260990690287', pan: 'IFELC7357X' },
  { id: 'FRL042', name: 'Pooja Rathore', email: 'pooja.rathore@email.com', skills: ['Cleaning', 'Deep Cleaning', 'Sanitization', 'Floor Polishing', 'Carpet Cleaning'], completed: 44, rating: 4.7, status: 'approved', age: 30, city: 'Jaipur', aadhaar: '115938659969', pan: 'CFDYG4499K' },
  { id: 'FRL043', name: 'Vikrant Sharma', email: 'vikrant.sharma@email.com', skills: ['Plumbing', 'Drainage', 'Pipe Fitting', 'Water Heater', 'Bathroom Fitting'], completed: 47, rating: 4.8, status: 'approved', age: 38, city: 'Jaipur', aadhaar: '763209334704', pan: 'FAVBT4057H' },
  { id: 'FRL044', name: 'Anjali Meena', email: 'anjali.meena@email.com', skills: ['Painting', 'Texture', 'Wallpaper', 'Interior Design', 'Color Consultation'], completed: 39, rating: 4.6, status: 'approved', age: 29, city: 'Jaipur', aadhaar: '759909760656', pan: 'TBMUY2837D' },
  { id: 'FRL045', name: 'Rohit Chauhan', email: 'rohit.chauhan@email.com', skills: ['Electrical', 'Wiring', 'Solar', 'Inverter Installation', 'Appliance Repair'], completed: 42, rating: 4.7, status: 'approved', age: 35, city: 'Jaipur', aadhaar: '855575737311', pan: 'GXJUZ9775P' },

  // Surat - 5 members
  { id: 'FRL046', name: 'Rohan Desai', email: 'rohan.desai@email.com', skills: ['Plumbing', 'Pipe Fitting', 'Water Heater', 'Drainage', 'Bathroom Fitting'], completed: 55, rating: 4.8, status: 'approved', age: 30, city: 'Surat', aadhaar: '042877458121', pan: 'ADEYQ4728R' },
  { id: 'FRL047', name: 'Priyanka Patel', email: 'priyanka.patel@email.com', skills: ['Cleaning', 'Sanitization', 'Deep Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 51, rating: 4.7, status: 'approved', age: 27, city: 'Surat', aadhaar: '591775254543', pan: 'PVIXV8895Y' },
  { id: 'FRL048', name: 'Jignesh Shah', email: 'jignesh.shah@email.com', skills: ['Electrical', 'Appliance Repair', 'Wiring', 'Solar', 'Inverter Installation'], completed: 48, rating: 4.6, status: 'approved', age: 34, city: 'Surat', aadhaar: '226717087745', pan: 'IBCVN4781J' },
  { id: 'FRL049', name: 'Riya Modi', email: 'riya.modi@email.com', skills: ['Interior Design', 'Decor', 'Painting', 'Wallpaper', 'Color Consultation'], completed: 37, rating: 4.9, status: 'approved', age: 32, city: 'Surat', aadhaar: '605130418537', pan: 'OKUKU1597E' },
  { id: 'FRL050', name: 'Ketan Mehta', email: 'ketan.mehta@email.com', skills: ['HVAC', 'AC Repair', 'Refrigeration', 'Ventilation', 'Duct Cleaning'], completed: 43, rating: 4.7, status: 'approved', age: 39, city: 'Surat', aadhaar: '297985707565', pan: 'QXDPW7598N' },

  // Lucknow - 5 members
  { id: 'FRL051', name: 'Abhishek Mishra', email: 'abhishek.mishra@email.com', skills: ['Plumbing', 'Water Heater', 'Pipe Fitting', 'Drainage', 'Bathroom Fitting'], completed: 46, rating: 4.7, status: 'approved', age: 36, city: 'Lucknow', aadhaar: '251922144624', pan: 'FZNGZ8208T' },
  { id: 'FRL052', name: 'Swati Verma', email: 'swati.verma@email.com', skills: ['Cleaning', 'Home Services', 'Sanitization', 'Deep Cleaning', 'Floor Polishing'], completed: 52, rating: 4.8, status: 'approved', age: 31, city: 'Lucknow', aadhaar: '571700605457', pan: 'REGBK6511V' },
  { id: 'FRL053', name: 'Rajat Tiwari', email: 'rajat.tiwari@email.com', skills: ['Electrical', 'Wiring', 'Solar', 'Inverter Installation', 'Appliance Repair'], completed: 44, rating: 4.6, status: 'approved', age: 38, city: 'Lucknow', aadhaar: '427559445813', pan: 'ZPCMM3214V' },
  { id: 'FRL054', name: 'Neha Srivastava', email: 'neha.srivastava@email.com', skills: ['Painting', 'Wallpaper', 'Texture', 'Interior Design', 'Color Consultation'], completed: 35, rating: 4.7, status: 'approved', age: 29, city: 'Lucknow', aadhaar: '801883078185', pan: 'UNJDL2512V' },
  { id: 'FRL055', name: 'Vikas Yadav', email: 'vikas.yadav@email.com', skills: ['Carpentry', 'Furniture', 'Woodwork', 'Cabinet Making', 'Door Fitting'], completed: 40, rating: 4.5, status: 'approved', age: 33, city: 'Lucknow', aadhaar: '450099901466', pan: 'NEBIM7060F' },

  // Kanpur - 5 members
  { id: 'FRL056', name: 'Manish Gupta', email: 'manish.gupta@email.com', skills: ['Plumbing', 'Drainage', 'Pipe Fitting', 'Water Heater', 'Bathroom Fitting'], completed: 49, rating: 4.6, status: 'approved', age: 37, city: 'Kanpur', aadhaar: '130130689096', pan: 'NBXMU3696B' },
  { id: 'FRL057', name: 'Priti Sharma', email: 'priti.sharma@email.com', skills: ['Cleaning', 'Sanitization', 'Deep Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 45, rating: 4.7, status: 'approved', age: 30, city: 'Kanpur', aadhaar: '835089818958', pan: 'EKMOJ2037Z' },
  { id: 'FRL058', name: 'Sanjay Kumar', email: 'sanjay.kumar@email.com', skills: ['Electrical', 'Solar', 'Wiring', 'Inverter Installation', 'Appliance Repair'], completed: 41, rating: 4.8, status: 'approved', age: 35, city: 'Kanpur', aadhaar: '047769723052', pan: 'XHQSV8027Q' },
  { id: 'FRL059', name: 'Ritu Singh', email: 'ritu.singh@email.com', skills: ['Interior Design', 'Painting', 'Wallpaper', 'Decor', 'Color Consultation'], completed: 38, rating: 4.6, status: 'approved', age: 32, city: 'Kanpur', aadhaar: '900102079702', pan: 'QJXKB8904S' },
  { id: 'FRL060', name: 'Deepak Pandey', email: 'deepak.pandey@email.com', skills: ['HVAC', 'Refrigeration', 'AC Repair', 'Ventilation', 'Duct Cleaning'], completed: 47, rating: 4.7, status: 'approved', age: 40, city: 'Kanpur', aadhaar: '010838761559', pan: 'ZOUWE6149K' },

  // Nagpur - 5 members
  { id: 'FRL061', name: 'Anil Deshmukh', email: 'anil.deshmukh@email.com', skills: ['Plumbing', 'Pipe Fitting', 'Water Heater', 'Drainage', 'Bathroom Fitting'], completed: 50, rating: 4.7, status: 'approved', age: 39, city: 'Nagpur', aadhaar: '911450778246', pan: 'LXIOQ7290T' },
  { id: 'FRL062', name: 'Sunita Thakur', email: 'sunita.thakur@email.com', skills: ['Cleaning', 'Deep Cleaning', 'Sanitization', 'Floor Polishing', 'Carpet Cleaning'], completed: 54, rating: 4.8, status: 'approved', age: 33, city: 'Nagpur', aadhaar: '008501485086', pan: 'YNDIC0197K' },
  { id: 'FRL063', name: 'Pravin Wankhede', email: 'pravin.wankhede@email.com', skills: ['Electrical', 'Wiring', 'Solar', 'Inverter Installation', 'Appliance Repair'], completed: 46, rating: 4.6, status: 'approved', age: 36, city: 'Nagpur', aadhaar: '805250592598', pan: 'UPSLJ4793W' },
  { id: 'FRL064', name: 'Madhuri Joshi', email: 'madhuri.joshi@email.com', skills: ['Painting', 'Texture', 'Wallpaper', 'Interior Design', 'Color Consultation'], completed: 39, rating: 4.7, status: 'approved', age: 31, city: 'Nagpur', aadhaar: '438528298135', pan: 'DXBYG6374T' },
  { id: 'FRL065', name: 'Rahul Bhosale', email: 'rahul.bhosale@email.com', skills: ['Carpentry', 'Woodwork', 'Furniture', 'Cabinet Making', 'Door Fitting'], completed: 42, rating: 4.5, status: 'approved', age: 34, city: 'Nagpur', aadhaar: '095184555363', pan: 'AHGQF7307O' },

  // Indore - 5 members
  { id: 'FRL066', name: 'Sneha Joshi', email: 'sneha.joshi@email.com', skills: ['Electrical', 'Wiring', 'Solar', 'Inverter Installation', 'Appliance Repair'], completed: 48, rating: 4.8, status: 'approved', age: 28, city: 'Indore', aadhaar: '366689375176', pan: 'WPGME7392F' },
  { id: 'FRL067', name: 'Vishal Chouhan', email: 'vishal.chouhan@email.com', skills: ['Plumbing', 'Water Heater', 'Pipe Fitting', 'Drainage', 'Bathroom Fitting'], completed: 51, rating: 4.7, status: 'approved', age: 35, city: 'Indore', aadhaar: '897459133679', pan: 'WQGUC1445O' },
  { id: 'FRL068', name: 'Kavita Sharma', email: 'kavita.sharma@email.com', skills: ['Cleaning', 'Sanitization', 'Deep Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 47, rating: 4.6, status: 'approved', age: 30, city: 'Indore', aadhaar: '123531852095', pan: 'ANSSB7067Z' },
  { id: 'FRL069', name: 'Akash Patel', email: 'akash.patel@email.com', skills: ['HVAC', 'AC Repair', 'Refrigeration', 'Ventilation', 'Duct Cleaning'], completed: 44, rating: 4.7, status: 'approved', age: 32, city: 'Indore', aadhaar: '203165797023', pan: 'ENXMY0318W' },
  { id: 'FRL070', name: 'Isha Malhotra', email: 'isha.malhotra@email.com', skills: ['Interior Design', 'Decor', 'Painting', 'Wallpaper', 'Color Consultation'], completed: 36, rating: 4.9, status: 'approved', age: 29, city: 'Indore', aadhaar: '623883845594', pan: 'WHXFW1082S' },

  // Thane - 5 members
  { id: 'FRL071', name: 'Sachin Pawar', email: 'sachin.pawar@email.com', skills: ['Plumbing', 'Drainage', 'Pipe Fitting', 'Water Heater', 'Bathroom Fitting'], completed: 53, rating: 4.7, status: 'approved', age: 37, city: 'Thane', aadhaar: '712805937142', pan: 'UWNPR1660Z' },
  { id: 'FRL072', name: 'Priya Naik', email: 'priya.naik@email.com', skills: ['Cleaning', 'Home Services', 'Sanitization', 'Deep Cleaning', 'Floor Polishing'], completed: 49, rating: 4.8, status: 'approved', age: 31, city: 'Thane', aadhaar: '111701205353', pan: 'SAJCJ4422H' },
  { id: 'FRL073', name: 'Ganesh Rane', email: 'ganesh.rane@email.com', skills: ['Electrical', 'Appliance Repair', 'Wiring', 'Solar', 'Inverter Installation'], completed: 45, rating: 4.6, status: 'approved', age: 34, city: 'Thane', aadhaar: '385199023662', pan: 'UNLPC0664C' },
  { id: 'FRL074', name: 'Shweta Sawant', email: 'shweta.sawant@email.com', skills: ['Painting', 'Wallpaper', 'Texture', 'Interior Design', 'Color Consultation'], completed: 38, rating: 4.7, status: 'approved', age: 28, city: 'Thane', aadhaar: '078219054748', pan: 'GNYUA6205U' },
  { id: 'FRL075', name: 'Mahesh Gaikwad', email: 'mahesh.gaikwad@email.com', skills: ['Carpentry', 'Furniture', 'Woodwork', 'Cabinet Making', 'Door Fitting'], completed: 41, rating: 4.5, status: 'approved', age: 39, city: 'Thane', aadhaar: '651822069026', pan: 'DHYUW4606N' },

  // Bhopal - 5 members
  { id: 'FRL076', name: 'Arjun Yadav', email: 'arjun.yadav@email.com', skills: ['Plumbing', 'Pipe Fitting', 'Water Heater', 'Drainage', 'Bathroom Fitting'], completed: 47, rating: 4.6, status: 'approved', age: 36, city: 'Bhopal', aadhaar: '071645642606', pan: 'OZHER1393N' },
  { id: 'FRL077', name: 'Rekha Tiwari', email: 'rekha.tiwari@email.com', skills: ['Cleaning', 'Deep Cleaning', 'Sanitization', 'Floor Polishing', 'Carpet Cleaning'], completed: 52, rating: 4.8, status: 'approved', age: 32, city: 'Bhopal', aadhaar: '128124812196', pan: 'ZVJBD5291T' },
  { id: 'FRL078', name: 'Sunil Verma', email: 'sunil.verma@email.com', skills: ['Electrical', 'Solar', 'Wiring', 'Inverter Installation', 'Appliance Repair'], completed: 44, rating: 4.7, status: 'approved', age: 38, city: 'Bhopal', aadhaar: '808423603047', pan: 'FAYDQ5207C' },
  { id: 'FRL079', name: 'Anita Mishra', email: 'anita.mishra@email.com', skills: ['Interior Design', 'Painting', 'Wallpaper', 'Decor', 'Color Consultation'], completed: 37, rating: 4.6, status: 'approved', age: 30, city: 'Bhopal', aadhaar: '745948845933', pan: 'SLMWJ9046H' },
  { id: 'FRL080', name: 'Rajendra Singh', email: 'rajendra.singh@email.com', skills: ['HVAC', 'Refrigeration', 'AC Repair', 'Ventilation', 'Duct Cleaning'], completed: 50, rating: 4.7, status: 'approved', age: 41, city: 'Bhopal', aadhaar: '712750983433', pan: 'VSOKM0080Z' },

  // Visakhapatnam - 5 members
  { id: 'FRL081', name: 'Krishna Rao', email: 'krishna.rao@email.com', skills: ['Plumbing', 'Water Heater', 'Pipe Fitting', 'Drainage', 'Bathroom Fitting'], completed: 48, rating: 4.7, status: 'approved', age: 35, city: 'Visakhapatnam', aadhaar: '222000917195', pan: 'MPWQF4087F' },
  { id: 'FRL082', name: 'Lakshmi Devi', email: 'lakshmi.devi@email.com', skills: ['Cleaning', 'Sanitization', 'Deep Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 55, rating: 4.8, status: 'approved', age: 33, city: 'Visakhapatnam', aadhaar: '514696714550', pan: 'PLSTT5974Y' },
  { id: 'FRL083', name: 'Srinivas Reddy', email: 'srinivas.reddy@email.com', skills: ['Electrical', 'Wiring', 'Solar', 'Inverter Installation', 'Appliance Repair'], completed: 46, rating: 4.6, status: 'approved', age: 37, city: 'Visakhapatnam', aadhaar: '010233431237', pan: 'JCVTW1652T' },
  { id: 'FRL084', name: 'Padma Naidu', email: 'padma.naidu@email.com', skills: ['Painting', 'Decor', 'Wallpaper', 'Texture', 'Interior Design'], completed: 39, rating: 4.7, status: 'approved', age: 31, city: 'Visakhapatnam', aadhaar: '104427404607', pan: 'WEECH0005S' },
  { id: 'FRL085', name: 'Ramana Murthy', email: 'ramana.murthy@email.com', skills: ['Carpentry', 'Woodwork', 'Furniture', 'Cabinet Making', 'Door Fitting'], completed: 43, rating: 4.5, status: 'approved', age: 40, city: 'Visakhapatnam', aadhaar: '159133597413', pan: 'GVRKB6151C' },

  // Patna - 5 members
  { id: 'FRL086', name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', skills: ['Plumbing', 'Drainage', 'Pipe Fitting', 'Water Heater', 'Bathroom Fitting'], completed: 51, rating: 4.7, status: 'approved', age: 38, city: 'Patna', aadhaar: '505593894586', pan: 'UYNLM1221I' },
  { id: 'FRL087', name: 'Suman Devi', email: 'suman.devi@email.com', skills: ['Cleaning', 'Home Services', 'Sanitization', 'Deep Cleaning', 'Floor Polishing'], completed: 49, rating: 4.8, status: 'approved', age: 32, city: 'Patna', aadhaar: '516666783104', pan: 'QYEPI4209B' },
  { id: 'FRL088', name: 'Manoj Singh', email: 'manoj.singh@email.com', skills: ['Electrical', 'Appliance Repair', 'Wiring', 'Solar', 'Inverter Installation'], completed: 45, rating: 4.6, status: 'approved', age: 36, city: 'Patna', aadhaar: '893380032631', pan: 'JAGPY9227H' },
  { id: 'FRL089', name: 'Rani Kumari', email: 'rani.kumari@email.com', skills: ['Interior Design', 'Furniture', 'Decor', 'Painting', 'Wallpaper'], completed: 38, rating: 4.7, status: 'approved', age: 29, city: 'Patna', aadhaar: '905828115697', pan: 'YZRQS7532U' },
  { id: 'FRL090', name: 'Avinash Jha', email: 'avinash.jha@email.com', skills: ['HVAC', 'AC Repair', 'Refrigeration', 'Ventilation', 'Duct Cleaning'], completed: 42, rating: 4.5, status: 'approved', age: 34, city: 'Patna', aadhaar: '528726898416', pan: 'UFZQC5792G' },

  // Vadodara - 5 members
  { id: 'FRL091', name: 'Hitesh Patel', email: 'hitesh.patel@email.com', skills: ['Plumbing', 'Pipe Fitting', 'Water Heater', 'Drainage', 'Bathroom Fitting'], completed: 54, rating: 4.8, status: 'approved', age: 37, city: 'Vadodara', aadhaar: '098782904499', pan: 'DHQEH5510O' },
  { id: 'FRL092', name: 'Komal Shah', email: 'komal.shah@email.com', skills: ['Cleaning', 'Sanitization', 'Deep Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 50, rating: 4.7, status: 'approved', age: 30, city: 'Vadodara', aadhaar: '904172408184', pan: 'SOBCR3875Z' },
  { id: 'FRL093', name: 'Bhavesh Desai', email: 'bhavesh.desai@email.com', skills: ['Electrical', 'Solar', 'Wiring', 'Inverter Installation', 'Appliance Repair'], completed: 47, rating: 4.6, status: 'approved', age: 35, city: 'Vadodara', aadhaar: '503214573794', pan: 'HYSCU9674J' },
  { id: 'FRL094', name: 'Nidhi Modi', email: 'nidhi.modi@email.com', skills: ['Painting', 'Texture', 'Wallpaper', 'Interior Design', 'Color Consultation'], completed: 40, rating: 4.7, status: 'approved', age: 31, city: 'Vadodara', aadhaar: '265739943893', pan: 'YFCPJ7608F' },
  { id: 'FRL095', name: 'Chirag Mehta', email: 'chirag.mehta@email.com', skills: ['Carpentry', 'Furniture', 'Woodwork', 'Cabinet Making', 'Door Fitting'], completed: 44, rating: 4.9, status: 'approved', age: 33, city: 'Vadodara', aadhaar: '897726667808', pan: 'SCKTH3546B' },

  // Ghaziabad - 5 members
  { id: 'FRL096', name: 'Naveen Sharma', email: 'naveen.sharma@email.com', skills: ['Plumbing', 'Water Heater', 'Pipe Fitting', 'Drainage', 'Bathroom Fitting'], completed: 46, rating: 4.6, status: 'approved', age: 34, city: 'Ghaziabad', aadhaar: '884568680034', pan: 'JDPDD9811X' },
  { id: 'FRL097', name: 'Seema Agarwal', email: 'seema.agarwal@email.com', skills: ['Cleaning', 'Deep Cleaning', 'Sanitization', 'Floor Polishing', 'Carpet Cleaning'], completed: 53, rating: 4.8, status: 'approved', age: 31, city: 'Ghaziabad', aadhaar: '486318771300', pan: 'NLBKY0059J' },
  { id: 'FRL098', name: 'Pankaj Tyagi', email: 'pankaj.tyagi@email.com', skills: ['Electrical', 'Wiring', 'Solar', 'Inverter Installation', 'Appliance Repair'], completed: 48, rating: 4.7, status: 'approved', age: 36, city: 'Ghaziabad', aadhaar: '883469987985', pan: 'CVRPN0975C' },
  { id: 'FRL099', name: 'Renu Gupta', email: 'renu.gupta@email.com', skills: ['Interior Design', 'Decor', 'Painting', 'Wallpaper', 'Color Consultation'], completed: 41, rating: 4.6, status: 'approved', age: 29, city: 'Ghaziabad', aadhaar: '436871903841', pan: 'YFSZR7749V' },
  { id: 'FRL100', name: 'Ashish Kumar', email: 'ashish.kumar@email.com', skills: ['HVAC', 'Refrigeration', 'AC Repair', 'Ventilation', 'Duct Cleaning'], completed: 45, rating: 4.7, status: 'approved', age: 38, city: 'Ghaziabad', aadhaar: '970833212594', pan: 'MQKZO3779D' },
]

export const initialPendingFreelancers: Freelancer[] = [
  { id: 'REQ001', name: 'Aarav Mehta', email: 'aarav.mehta@email.com', skills: ['HVAC', 'Refrigeration', 'AC Repair', 'Ventilation', 'Duct Cleaning'], completed: 0, rating: 0, status: 'pending', age: 33, city: 'Ahmedabad', aadhaar: '009460802085', pan: 'FJOVV6862M' },
  { id: 'REQ002', name: 'Kavya Rao', email: 'kavya.rao@email.com', skills: ['Deep Cleaning', 'Sanitization', 'Cleaning', 'Floor Polishing', 'Carpet Cleaning'], completed: 0, rating: 0, status: 'pending', age: 27, city: 'Chennai', aadhaar: '606308641590', pan: 'ALOMK4247D' },
  { id: 'REQ003', name: 'Rohan Desai', email: 'rohan.desai@email.com', skills: ['Plumbing', 'Pipe Fitting', 'Water Heater', 'Drainage', 'Bathroom Fitting'], completed: 0, rating: 0, status: 'pending', age: 30, city: 'Surat', aadhaar: '835723758063', pan: 'AHWCT2495V' },
  { id: 'REQ004', name: 'Sneha Joshi', email: 'sneha.joshi@email.com', skills: ['Electrical', 'Wiring', 'Solar', 'Inverter Installation', 'Appliance Repair'], completed: 0, rating: 0, status: 'pending', age: 28, city: 'Indore', aadhaar: '196160266322', pan: 'FSNFX2577F' },
]

