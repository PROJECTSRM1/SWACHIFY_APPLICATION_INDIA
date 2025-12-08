// src/pages/freelancer/FreelancerDashboard.tsx
// at top of file
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';

import {
  Layout,
  Card,
  Tag,
  Button,
  Typography,
  Select,
  Row,
  Col,
  Empty,
  message,
  Dropdown,
  Menu,
  Space,
  Upload,
  Modal, // Modal is used in handleApprovePending
} from 'antd';
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined,
  UserOutlined,
  ArrowRightOutlined,
  LogoutOutlined,
  StarFilled,
  UploadOutlined,
  HourglassOutlined,
  PhoneOutlined,
  MailOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
  // ArrowLeftOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// import { freelancerLogout } from "../../api/freelancerAuth";
// import { getUserDetails } from "../../utils/helpers/storage";



const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// --- TYPES ---
interface Job {
  ticketId: string;
  title: string;
  category: string;
  status: 'Approval Pending' | 'In Progress' | 'Completed';
  location: string;
  date: string;
  price: number;

  customer?: string;
  description?: string;
  estimatedPrice?: number;

  // NEW customer details for active card
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  customerAddress?: string;
}

type ServiceStepIndex = 0 | 1 | 2 | 3;

// --- SERVICE FLOW STEPS ---
const SERVICE_FLOW_STEPS = [
  'On the way',
  'Reached location',
  'Job Started',
  'Job Completed',
] as const;

const SERVICE_FLOW_DESCRIPTIONS: string[] = [
  'You are travelling to the customer location.',
  'You have reached the customer address.',
  'Mandatory multiple image proof required.',
  'Mandatory multiple image proof required to confirm completion.',
];

// UPDATED: Removed index 1 ('Reached location'). Only indices 2 and 3 require images.
const IMAGE_REQUIRED_STEPS: ServiceStepIndex[] = [2, 3];

// --- MOCK DATA (ONLY AVAILABLE REQUESTS TO START) ---
const INITIAL_AVAILABLE_REQUESTS: Job[] = [
  {
    ticketId: 'TKT001',
    title: 'Cleaning - Deep Cleaning',
    category: 'Cleaning',
    status: 'In Progress',
    location: 'MG Road, Bangalore',
    date: '2025-11-28 at 10:00 AM',
    customer: 'Rajesh Kumar',
    customerName: 'Rajesh Kumar',
    customerPhone: '+91 98765 00001',
    customerEmail: 'rajesh.kumar@example.com',
    customerAddress: 'Flat 304, Sunrise Apartments, MG Road, Bangalore',
    description: '3BHK apartment deep cleaning required',
    estimatedPrice: 3000,
    price: 3000,
  },
  {
    ticketId: 'TKT004',
    title: 'Home Services - Plumbing',
    category: 'Plumbing',
    status: 'In Progress',
    location: 'Koramangala, Bangalore',
    date: '2025-11-29 at 2:00 PM',
    customer: 'Priya Sharma',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98765 00002',
    customerEmail: 'priya.sharma@example.com',
    customerAddress: 'Flat 102, Green Meadows, Koramangala, Bangalore',
    description: 'Bathroom tap leaking issue',
    estimatedPrice: 500,
    price: 500,
  },
  {
    ticketId: 'TKT005',
    title: 'Home Services - Electrical',
    category: 'Electrical',
    status: 'In Progress',
    location: 'Whitefield, Bangalore',
    date: '2025-11-29 at 4:00 PM',
    customer: 'Amit Singh',
    customerName: 'Amit Singh',
    customerPhone: '+91 98765 00003',
    customerEmail: 'amit.singh@example.com',
    customerAddress: 'Flat 501, Oakwood Residency, Whitefield, Bangalore',
    description: 'Install new ceiling fan in living room.',
    estimatedPrice: 1200,
    price: 1200,
  },
  {
    ticketId: 'TKT006',
    title: 'Home Services - Repairs',
    category: 'House Repairs',
    status: 'In Progress',
    location: 'Whitefield, Bangalore',
    date: '2025-11-29 at 4:00 PM',
    customer: 'Sarkaar Singh',
    customerName: 'Sarkaar Singh',
    customerPhone: '+91 98765 00003',
    customerEmail: 'sarkaar.singh@example.com',
    customerAddress: 'Flat 501, Oakwood Residency, Whitefield, Bangalore',
    description: 'Install new AC in living room.',
    estimatedPrice: 12000,
    price: 12000,
  },
  {
  ticketId: 'TKT007',
  title: 'Cleaning - Basic House Cleaning',
  category: 'Cleaning',
  status: 'In Progress',
  location: 'Indiranagar, Bangalore',
  date: '2025-12-01 at 9:30 AM',
  customer: 'Neha Verma',
  customerName: 'Neha Verma',
  customerPhone: '+91 98765 10001',
  customerEmail: 'neha.verma@example.com',
  customerAddress: 'Villa 12, Palm Meadows, Indiranagar',
  description: 'Full house cleaning including dusting, mopping, and sanitizing.',
  estimatedPrice: 1500,
  price: 1500,
},  
{
  ticketId: 'TKT008',
  title: 'Home Services - Carpenter',
  category: 'Home Services',
  status: 'In Progress',
  location: 'HSR Layout, Bangalore',
  date: '2025-12-01 at 11:00 AM',
  customer: 'Rohit Malhotra',
  customerName: 'Rohit Malhotra',
  customerPhone: '+91 98765 20002',
  customerEmail: 'rohit.malhotra@example.com',
  customerAddress: 'Flat 45B, LakeView Residency, HSR Layout',
  description: 'Wooden door alignment and drawer repair work.',
  estimatedPrice: 800,
  price: 800,
},
{
  ticketId: 'TKT009',
  title: 'Home Services - Plumbing',
  category: 'Plumbing',
  status: 'In Progress',
  location: 'BTM Layout, Bangalore',
  date: '2025-12-02 at 10:00 AM',
  customer: 'Ayesha Khan',
  customerName: 'Ayesha Khan',
  customerPhone: '+91 98765 30003',
  customerEmail: 'ayesha.khan@example.com',
  customerAddress: 'House 78, Pearl Residency, BTM Layout',
  description: 'Kitchen sink drainage blocked; requires cleaning.',
  estimatedPrice: 600,
  price: 600,
},
{
  ticketId: 'TKT010',
  title: 'Home Services - Electrical',
  category: 'Electrical',
  status: 'In Progress',
  location: 'Jayanagar, Bangalore',
  date: '2025-12-02 at 3:00 PM',
  customer: 'Manish Reddy',
  customerName: 'Manish Reddy',
  customerPhone: '+91 98765 40004',
  customerEmail: 'manish.reddy@example.com',
  customerAddress: 'Plot 21, Green Park Homes, Jayanagar',
  description: 'Geyser not heating; requires inspection and repair.',
  estimatedPrice: 900,
  price: 900,
},
{
  ticketId: 'TKT011',
  title: 'Cleaning - Sofa Shampooing',
  category: 'Cleaning',
  status: 'In Progress',
  location: 'Malleshwaram, Bangalore',
  date: '2025-12-03 at 12:00 PM',
  customer: 'Shruti Desai',
  customerName: 'Shruti Desai',
  customerPhone: '+91 98765 50005',
  customerEmail: 'shruti.desai@example.com',
  customerAddress: 'Block C, Sapphire Heights, Malleshwaram',
  description: '6-seater sofa deep shampoo and vacuum cleaning.',
  estimatedPrice: 1800,
  price: 1800,
},
{
  ticketId: 'TKT012',
  title: 'Home Services - Electrical Wiring',
  category: 'Electrical',
  status: 'In Progress',
  location: 'Banashankari, Bangalore',
  date: '2025-12-03 at 4:30 PM',
  customer: 'Gaurav Sinha',
  customerName: 'Gaurav Sinha',
  customerPhone: '+91 98765 60006',
  customerEmail: 'gaurav.sinha@example.com',
  customerAddress: 'Flat 22, Royal Enclave, Banashankari',
  description: 'Electrical wiring replacement required in bedroom.',
  estimatedPrice: 2200,
  price: 2200,
},


{
  ticketId: 'TKT013',
  title: 'Cleaning - Bathroom Deep Cleaning',
  category: 'Cleaning',
  status: 'In Progress',
  location: 'RT Nagar, Bangalore',
  date: '2025-12-04 at 10:00 AM',
  customer: 'Vishal R',
  customerName: 'Vishal R',
  customerPhone: '+91 98765 70001',
  customerEmail: 'vishal.r@example.com',
  customerAddress: 'House 12, RT Nagar Main Road, Bangalore',
  description: '2 bathrooms deep cleaning including descaling and sanitizing.',
  estimatedPrice: 1200,
  price: 1200,
},
{
  ticketId: 'TKT014',
  title: 'Home Services - AC Gas Refill',
  category: 'Home Services',
  status: 'In Progress',
  location: 'Hebbal, Bangalore',
  date: '2025-12-04 at 1:00 PM',
  customer: 'Karthik Menon',
  customerName: 'Karthik Menon',
  customerPhone: '+91 98765 70002',
  customerEmail: 'karthik.menon@example.com',
  customerAddress: 'LakeView Towers, Hebbal',
  description: '1.5-ton AC gas refill and cooling performance check.',
  estimatedPrice: 1800,
  price: 1800,
},
{
  ticketId: 'TKT015',
  title: 'Plumbing - Tap Replacement',
  category: 'Plumbing',
  status: 'In Progress',
  location: 'Yelahanka, Bangalore',
  date: '2025-12-04 at 3:30 PM',
  customer: 'Anita Bose',
  customerName: 'Anita Bose',
  customerPhone: '+91 98765 70003',
  customerEmail: 'anita.bose@example.com',
  customerAddress: 'Flat 8B, Orchid Greens, Yelahanka',
  description: 'Kitchen tap broken; requires full replacement.',
  estimatedPrice: 450,
  price: 450,
},
{
  ticketId: 'TKT016',
  title: 'Electrical - Switchboard Replacement',
  category: 'Electrical',
  status: 'In Progress',
  location: 'Basavanagudi, Bangalore',
  date: '2025-12-05 at 11:00 AM',
  customer: 'Harish Gowda',
  customerName: 'Harish Gowda',
  customerPhone: '+91 98765 70004',
  customerEmail: 'harish.g@example.com',
  customerAddress: 'House 52, Gandhi Bazaar, Basavanagudi',
  description: 'Replace damaged switchboard and fix loose wiring.',
  estimatedPrice: 700,
  price: 700,
},
{
  ticketId: 'TKT017',
  title: 'Cleaning - Kitchen Deep Cleaning',
  category: 'Cleaning',
  status: 'In Progress',
  location: 'Jeevan Bima Nagar, Bangalore',
  date: '2025-12-05 at 2:00 PM',
  customer: 'Meenakshi Prasad',
  customerName: 'Meenakshi Prasad',
  customerPhone: '+91 98765 70005',
  customerEmail: 'meenakshi.p@example.com',
  customerAddress: 'Flat 3C, Garden Homes, Jeevan Bima Nagar',
  description: 'Full kitchen deep cleaning including chimney and tiles.',
  estimatedPrice: 2000,
  price: 2000,
},
{
  ticketId: 'TKT018',
  title: 'Home Services - Door Lock Repair',
  category: 'Home Services',
  status: 'In Progress',
  location: 'Ulsoor, Bangalore',
  date: '2025-12-06 at 9:00 AM',
  customer: 'Divya Rao',
  customerName: 'Divya Rao',
  customerPhone: '+91 98765 70006',
  customerEmail: 'divya.rao@example.com',
  customerAddress: 'Flat 22B, Lakeside Residency, Ulsoor',
  description: 'Main door lock jammed, requires adjustment or replacement.',
  estimatedPrice: 650,
  price: 650,
},
{
  ticketId: 'TKT019',
  title: 'Plumbing - Water Motor Issue',
  category: 'Plumbing',
  status: 'In Progress',
  location: 'Banerghatta Road, Bangalore',
  date: '2025-12-06 at 12:00 PM',
  customer: 'Arun Shankar',
  customerName: 'Arun Shankar',
  customerPhone: '+91 98765 70007',
  customerEmail: 'arun.shankar@example.com',
  customerAddress: 'Sai Residency, Bannerghatta Road',
  description: 'Water motor not pulling water; needs inspection.',
  estimatedPrice: 900,
  price: 900,
},
{
  ticketId: 'TKT020',
  title: 'Electrical - Tube Light Fitting',
  category: 'Electrical',
  status: 'In Progress',
  location: 'Richmond Town, Bangalore',
  date: '2025-12-06 at 4:00 PM',
  customer: 'Sameer Shaikh',
  customerName: 'Sameer Shaikh',
  customerPhone: '+91 98765 70008',
  customerEmail: 'sameer.shaikh@example.com',
  customerAddress: 'Block 14, Rivera Apartments, Richmond Town',
  description: 'Install new LED tube light in living room.',
  estimatedPrice: 350,
  price: 350,
},
{
  ticketId: 'TKT021',
  title: 'Cleaning - Balcony Cleaning',
  category: 'Cleaning',
  status: 'In Progress',
  location: 'Kengeri, Bangalore',
  date: '2025-12-07 at 10:30 AM',
  customer: 'Lokesh N',
  customerName: 'Lokesh N',
  customerPhone: '+91 98765 70009',
  customerEmail: 'lokesh.n@example.com',
  customerAddress: 'Plot 26, Shanti Layout, Kengeri',
  description: 'Balcony cleaning with moss removal and pressure wash.',
  estimatedPrice: 900,
  price: 900,
},
{
  ticketId: 'TKT022',
  title: 'Home Services - Curtain Rod Installation',
  category: 'Home Services',
  status: 'In Progress',
  location: 'HSR Layout, Bangalore',
  date: '2025-12-07 at 1:30 PM',
  customer: 'Preeti Shetty',
  customerName: 'Preeti Shetty',
  customerPhone: '+91 98765 70010',
  customerEmail: 'preeti.shetty@example.com',
  customerAddress: 'Flat 7A, Sunshine Apartments, HSR Layout',
  description: 'Install 2 curtain rods including drilling and fitting.',
  estimatedPrice: 500,
  price: 500,
},

{
  ticketId: 'TKT023',
  title: 'Cleaning - Window & Grill Cleaning',
  category: 'Cleaning',
  status: 'In Progress',
  location: 'J.P. Nagar, Bangalore',
  date: '2025-12-08 at 10:30 AM',
  customer: 'Anurag Patel',
  customerName: 'Anurag Patel',
  customerPhone: '+91 98765 70011',
  customerEmail: 'anurag.patel23@example.com',
  customerAddress: 'House 9, JP Layout, J.P. Nagar',
  description: 'Window glass and grill cleaning for 2 BHK apartment.',
  estimatedPrice: 900,
  price: 900,
},
{
  ticketId: 'TKT024',
  title: 'Plumbing - Drain Unclogging',
  category: 'Plumbing',
  status: 'In Progress',
  location: 'Koramangala, Bangalore',
  date: '2025-12-08 at 12:00 PM',
  customer: 'Kavita Rao',
  customerName: 'Kavita Rao',
  customerPhone: '+91 98765 70012',
  customerEmail: 'kavita.rao24@example.com',
  customerAddress: 'Flat 5B, Green Court, Koramangala',
  description: 'Kitchen drain severely slow; need unclog and clean.',
  estimatedPrice: 600,
  price: 600,
},
{
  ticketId: 'TKT025',
  title: 'Electrical - Switch Replacement',
  category: 'Electrical',
  status: 'In Progress',
  location: 'Indiranagar, Bangalore',
  date: '2025-12-09 at 11:00 AM',
  customer: 'Rakesh Nair',
  customerName: 'Rakesh Nair',
  customerPhone: '+91 98765 70013',
  customerEmail: 'rakesh.nair25@example.com',
  customerAddress: 'No. 18, 4th Cross, Indiranagar',
  description: 'Replace faulty switchboard and test circuits.',
  estimatedPrice: 700,
  price: 700,
},
{
  ticketId: 'TKT026',
  title: 'Home Services - Furniture Assembly',
  category: 'Home Services',
  status: 'In Progress',
  location: 'HSR Layout, Bangalore',
  date: '2025-12-09 at 2:30 PM',
  customer: 'Sheetal Mehta',
  customerName: 'Sheetal Mehta',
  customerPhone: '+91 98765 70014',
  customerEmail: 'sheetal.mehta26@example.com',
  customerAddress: 'Apt 302, HSR Sunshine Towers',
  description: 'Assemble 2 wardrobes and 3 chairs delivered today.',
  estimatedPrice: 1200,
  price: 1200,
},
{
  ticketId: 'TKT027',
  title: 'Cleaning - Mattress Cleaning',
  category: 'Cleaning',
  status: 'In Progress',
  location: 'Whitefield, Bangalore',
  date: '2025-12-10 at 9:00 AM',
  customer: 'Vandana Singh',
  customerName: 'Vandana Singh',
  customerPhone: '+91 98765 70015',
  customerEmail: 'vandana.singh27@example.com',
  customerAddress: 'Flat 14, Oakwood Residency, Whitefield',
  description: 'Deep shampooing for 2 queen mattresses.',
  estimatedPrice: 1400,
  price: 1400,
},
{
  ticketId: 'TKT028',
  title: 'Plumbing - Tap & Faucet Replacement',
  category: 'Plumbing',
  status: 'In Progress',
  location: 'Jayanagar, Bangalore',
  date: '2025-12-10 at 4:00 PM',
  customer: 'Sandeep Kumar',
  customerName: 'Sandeep Kumar',
  customerPhone: '+91 98765 70016',
  customerEmail: 'sandeep.kumar28@example.com',
  customerAddress: 'Plot 7, Green Park Homes, Jayanagar',
  description: 'Replace kitchen faucet and bathroom tap set.',
  estimatedPrice: 800,
  price: 800,
},
{
  ticketId: 'TKT029',
  title: 'Electrical - Fan Balance & Installation',
  category: 'Electrical',
  status: 'In Progress',
  location: 'Banashankari, Bangalore',
  date: '2025-12-11 at 10:00 AM',
  customer: 'Bhavana Iyer',
  customerName: 'Bhavana Iyer',
  customerPhone: '+91 98765 70017',
  customerEmail: 'bhavana.iyer29@example.com',
  customerAddress: 'Flat 8A, Royal Enclave, Banashankari',
  description: 'Install new ceiling fan + balancing of living room fan.',
  estimatedPrice: 950,
  price: 950,
},
{
  ticketId: 'TKT030',
  title: 'Home Services - Curtain Rod Repair',
  category: 'Home Services',
  status: 'In Progress',
  location: 'Whitefield, Bangalore',
  date: '2025-12-11 at 2:00 PM',
  customer: 'Nitin Patel',
  customerName: 'Nitin Patel',
  customerPhone: '+91 98765 70018',
  customerEmail: 'nitin.patel30@example.com',
  customerAddress: 'House 22, Lakeside Residency, Whitefield',
  description: 'Fix loose curtain rods and replace screws.',
  estimatedPrice: 500,
  price: 500,
},
{
  ticketId: 'TKT031',
  title: 'Cleaning - Kitchen Deep Clean & Degrease',
  category: 'Cleaning',
  status: 'In Progress',
  location: 'Koramangala, Bangalore',
  date: '2025-12-12 at 9:30 AM',
  customer: 'Pooja Deshmukh',
  customerName: 'Pooja Deshmukh',
  customerPhone: '+91 98765 70019',
  customerEmail: 'pooja.d29@example.com',
  customerAddress: 'Flat 11, Green Meadows, Koramangala',
  description: 'Deep clean kitchen, chimney degrease and tile scrub.',
  estimatedPrice: 1600,
  price: 1600,
},
{
  ticketId: 'TKT032',
  title: 'Plumbing - Toilet Cistern Repair',
  category: 'Plumbing',
  status: 'In Progress',
  location: 'Indiranagar, Bangalore',
  date: '2025-12-12 at 11:00 AM',
  customer: 'Anjali Rao',
  customerName: 'Anjali Rao',
  customerPhone: '+91 98765 70020',
  customerEmail: 'anjali.rao32@example.com',
  customerAddress: 'No. 3, 2nd Cross, Indiranagar',
  description: 'Cistern leaking; replace internal fittings.',
  estimatedPrice: 650,
  price: 650,
},
{
  ticketId: 'TKT033',
  title: 'Electrical - Light Fixture Replacement',
  category: 'Electrical',
  status: 'In Progress',
  location: 'Malleshwaram, Bangalore',
  date: '2025-12-13 at 3:00 PM',
  customer: 'Ritu Sharma',
  customerName: 'Ritu Sharma',
  customerPhone: '+91 98765 70021',
  customerEmail: 'ritu.sharma33@example.com',
  customerAddress: 'Block B, Sapphire Heights, Malleshwaram',
  description: 'Replace chandelier and 2 wall lights in living area.',
  estimatedPrice: 1300,
  price: 1300,
},
{
  ticketId: 'TKT034',
  title: 'Home Services - Door Hinge Replacement',
  category: 'Home Services',
  status: 'In Progress',
  location: 'Hebbal, Bangalore',
  date: '2025-12-14 at 10:00 AM',
  customer: 'Mahesh Verma',
  customerName: 'Mahesh Verma',
  customerPhone: '+91 98765 70022',
  customerEmail: 'mahesh.verma34@example.com',
  customerAddress: 'LakeView Towers, Hebbal',
  description: 'Replace hinges and align main door.',
  estimatedPrice: 700,
  price: 700,
},
{
  ticketId: 'TKT035',
  title: 'Cleaning - Office Carpet Shampooing',
  category: 'Cleaning',
  status: 'In Progress',
  location: 'Richmond Town, Bangalore',
  date: '2025-12-14 at 1:30 PM',
  customer: 'Office Admin',
  customerName: 'Office Admin',
  customerPhone: '+91 98765 70023',
  customerEmail: 'office.admin35@example.com',
  customerAddress: 'Rivera Offices, Richmond Town',
  description: 'Shampoo 150 sq ft office carpet and vacuum.',
  estimatedPrice: 2200,
  price: 2200,
},
{
  ticketId: 'TKT036',
  title: 'Plumbing - Overhead Tank Cleaning',
  category: 'Plumbing',
  status: 'In Progress',
  location: 'Jeevan Bima Nagar, Bangalore',
  date: '2025-12-15 at 9:00 AM',
  customer: 'Gopinath N',
  customerName: 'Gopinath N',
  customerPhone: '+91 98765 70024',
  customerEmail: 'gopinath.n36@example.com',
  customerAddress: 'Flat 3C, Garden Homes, Jeevan Bima Nagar',
  description: 'Clean and disinfect overhead water tank (single family).',
  estimatedPrice: 1800,
  price: 1800,
},
{
  ticketId: 'TKT037',
  title: 'Electrical - Geyser Service & Repair',
  category: 'Electrical',
  status: 'In Progress',
  location: 'Ulsoor, Bangalore',
  date: '2025-12-15 at 11:00 AM',
  customer: 'Rohini Gupta',
  customerName: 'Rohini Gupta',
  customerPhone: '+91 98765 70025',
  customerEmail: 'rohini.gupta37@example.com',
  customerAddress: 'Flat 22B, Lakeside Residency, Ulsoor',
  description: 'Service geyser and replace faulty thermostat if needed.',
  estimatedPrice: 1200,
  price: 1200,
},
{
  ticketId: 'TKT038',
  title: 'Home Services - Wall Hook Installation',
  category: 'Home Services',
  status: 'In Progress',
  location: 'Kengeri, Bangalore',
  date: '2025-12-16 at 10:30 AM',
  customer: 'Vivek N',
  customerName: 'Vivek N',
  customerPhone: '+91 98765 70026',
  customerEmail: 'vivek.n38@example.com',
  customerAddress: 'Plot 26, Shanti Layout, Kengeri',
  description: 'Install 6 heavy-duty wall hooks and anchors.',
  estimatedPrice: 400,
  price: 400,
},
{
  ticketId: 'TKT039',
  title: 'Cleaning - Tile & Grout Deep Clean',
  category: 'Cleaning',
  status: 'In Progress',
  location: 'BTM Layout, Bangalore',
  date: '2025-12-16 at 2:00 PM',
  customer: 'Aarti Shah',
  customerName: 'Aarti Shah',
  customerPhone: '+91 98765 70027',
  customerEmail: 'aarti.shah39@example.com',
  customerAddress: 'House 78, Pearl Residency, BTM Layout',
  description: 'Deep clean kitchen and bathroom tiles and grout.',
  estimatedPrice: 1100,
  price: 1100,
},
{
  ticketId: 'TKT040',
  title: 'Plumbing - Washing Machine Inlet Fix',
  category: 'Plumbing',
  status: 'In Progress',
  location: 'Yelahanka, Bangalore',
  date: '2025-12-17 at 9:00 AM',
  customer: 'Rohit S',
  customerName: 'Rohit S',
  customerPhone: '+91 98765 70028',
  customerEmail: 'rohit.s40@example.com',
  customerAddress: 'Flat 8B, Orchid Greens, Yelahanka',
  description: 'Fix inlet hose and connector for washing machine.',
  estimatedPrice: 550,
  price: 550,
},
{
  ticketId: 'TKT041',
  title: 'Electrical - Switchboard Safety Check',
  category: 'Electrical',
  status: 'In Progress',
  location: 'Basavanagudi, Bangalore',
  date: '2025-12-17 at 11:30 AM',
  customer: 'Sujata Rao',
  customerName: 'Sujata Rao',
  customerPhone: '+91 98765 70029',
  customerEmail: 'sujata.rao41@example.com',
  customerAddress: 'House 52, Gandhi Bazaar, Basavanagudi',
  description: 'Full electrical safety check and minor repairs as needed.',
  estimatedPrice: 950,
  price: 950,
},
{
  ticketId: 'TKT042',
  title: 'Home Services - Shelf Mounting & Fixing',
  category: 'Home Services',
  status: 'In Progress',
  location: 'Kalyan Nagar, Bangalore',
  date: '2025-12-18 at 10:00 AM',
  customer: 'Deepak Menon',
  customerName: 'Deepak Menon',
  customerPhone: '+91 98765 70030',
  customerEmail: 'deepak.menon42@example.com',
  customerAddress: 'Flat 12A, Kalyan Residency, Kalyan Nagar',
  description: 'Mount 3 floating shelves and ensure strong anchors.',
  estimatedPrice: 600,
  price: 600,
},

{
  ticketId: 'TKT043',
  title: 'Cleaning - Sofa Deep Cleaning',
  category: 'Cleaning',
  status: 'In Progress',
  location: 'Brookefield, Bangalore',
  date: '2025-12-18 at 1:00 PM',
  customer: 'Haritha K',
  customerName: 'Haritha K',
  customerPhone: '+91 98765 70031',
  customerEmail: 'haritha.k43@example.com',
  customerAddress: 'Flat 9B, Brookefield Heights, Bangalore',
  description: 'Deep shampoo cleaning for L-shaped sofa.',
  estimatedPrice: 1700,
  price: 1700,
},
{
  ticketId: 'TKT044',
  title: 'Plumbing - Shower Head Replacement',
  category: 'Plumbing',
  status: 'In Progress',
  location: 'Kadubeesanahalli, Bangalore',
  date: '2025-12-18 at 3:30 PM',
  customer: 'Yogesh R',
  customerName: 'Yogesh R',
  customerPhone: '+91 98765 70032',
  customerEmail: 'yogesh.r44@example.com',
  customerAddress: 'Block 2, Fern Residency, Bangalore',
  description: 'Replace old shower head and fix alignment.',
  estimatedPrice: 550,
  price: 550,
},
{
  ticketId: 'TKT045',
  title: 'Electrical - Inverter Wiring Check',
  category: 'Electrical',
  status: 'In Progress',
  location: 'Sarjapur Road, Bangalore',
  date: '2025-12-19 at 9:00 AM',
  customer: 'Aishwarya M',
  customerName: 'Aishwarya M',
  customerPhone: '+91 98765 70033',
  customerEmail: 'aishwarya.m45@example.com',
  customerAddress: 'House 22, Green Leaf Villas, Sarjapur',
  description: 'Check inverter wiring and battery connections.',
  estimatedPrice: 1300,
  price: 1300,
},
{
  ticketId: 'TKT046',
  title: 'Home Services - Kitchen Cabinet Fix',
  category: 'Home Services',
  status: 'In Progress',
  location: 'Bellandur, Bangalore',
  date: '2025-12-19 at 12:00 PM',
  customer: 'Rohan B',
  customerName: 'Rohan B',
  customerPhone: '+91 98765 70034',
  customerEmail: 'rohan.b46@example.com',
  customerAddress: 'Apt 602, Sunshine Residency, Bellandur',
  description: 'Fix loose hinges and level kitchen cabinets.',
  estimatedPrice: 900,
  price: 900,
},
{
  ticketId: 'TKT047',
  title: 'Cleaning - Chimney Deep Cleaning',
  category: 'Cleaning',
  status: 'In Progress',
  location: 'Banerghatta Road, Bangalore',
  date: '2025-12-19 at 3:00 PM',
  customer: 'Chaitra N',
  customerName: 'Chaitra N',
  customerPhone: '+91 98765 70035',
  customerEmail: 'chaitra.n47@example.com',
  customerAddress: 'Plot 54, Sai Residency, Bangalore',
  description: 'Deep cleaning and oil filter wash for chimney.',
  estimatedPrice: 1200,
  price: 1200,
},
{
  ticketId: 'TKT048',
  title: 'Plumbing - Pipe Leakage Fix',
  category: 'Plumbing',
  status: 'In Progress',
  location: 'HSR Layout, Bangalore',
  date: '2025-12-20 at 10:00 AM',
  customer: 'Ritesh Panda',
  customerName: 'Ritesh Panda',
  customerPhone: '+91 98765 70036',
  customerEmail: 'ritesh.p48@example.com',
  customerAddress: 'Flat 21, Lakeshore Apartments, HSR Layout',
  description: 'Fix leakage in kitchen inlet pipe.',
  estimatedPrice: 750,
  price: 750,
},
{
  ticketId: 'TKT049',
  title: 'Electrical - Switch Overload Repair',
  category: 'Electrical',
  status: 'In Progress',
  location: 'Basaveshwar Nagar, Bangalore',
  date: '2025-12-20 at 1:30 PM',
  customer: 'Lavanya K',
  customerName: 'Lavanya K',
  customerPhone: '+91 98765 70037',
  customerEmail: 'lavanya.k49@example.com',
  customerAddress: 'House 18, West End Colony, Bangalore',
  description: 'Repair burnt switch due to overload.',
  estimatedPrice: 850,
  price: 850,
},
{
  ticketId: 'TKT050',
  title: 'Home Services - Door Lock Replacement',
  category: 'Home Services',
  status: 'In Progress',
  location: 'RT Nagar, Bangalore',
  date: '2025-12-20 at 3:00 PM',
  customer: 'Manoj P',
  customerName: 'Manoj P',
  customerPhone: '+91 98765 70038',
  customerEmail: 'manoj.p50@example.com',
  customerAddress: 'House 9, RT Main Road, Bangalore',
  description: 'Replace main door lock and install new latch.',
  estimatedPrice: 650,
  price: 650,
},
{
  ticketId: 'TKT051',
  title: 'Cleaning - Full Home Sanitization',
  category: 'Cleaning',
  status: 'In Progress',
  location: 'Electronic City, Bangalore',
  date: '2025-12-21 at 9:30 AM',
  customer: 'Swathi R',
  customerName: 'Swathi R',
  customerPhone: '+91 98765 70039',
  customerEmail: 'swathi.r51@example.com',
  customerAddress: 'Block C, Tech Meadows, E-City',
  description: 'Full house sanitization for 3 BHK.',
  estimatedPrice: 1800,
  price: 1800,
},
{
  ticketId: 'TKT052',
  title: 'Plumbing - Water Heater Pipe Fix',
  category: 'Plumbing',
  status: 'In Progress',
  location: 'Domlur, Bangalore',
  date: '2025-12-21 at 11:30 AM',
  customer: 'Arvind Shankar',
  customerName: 'Arvind Shankar',
  customerPhone: '+91 98765 70040',
  customerEmail: 'arvind.s52@example.com',
  customerAddress: 'Flat 11, Royal Homes, Domlur',
  description: 'Fix hot water outlet pipe leakage.',
  estimatedPrice: 950,
  price: 950,
},
{
  ticketId: 'TKT053',
  title: 'Electrical - Home Safety Inspection',
  category: 'Electrical',
  status: 'In Progress',
  location: 'Kormangala, Bangalore',
  date: '2025-12-21 at 3:00 PM',
  customer: 'Meera Menon',
  customerName: 'Meera Menon',
  customerPhone: '+91 98765 70041',
  customerEmail: 'meera.m53@example.com',
  customerAddress: 'Green Towers, Koramangala',
  description: 'Complete electrical safety check of home.',
  estimatedPrice: 1500,
  price: 1500,
},
{
  ticketId: 'TKT054',
  title: 'Home Services - Chair Repair',
  category: 'Home Services',
  status: 'In Progress',
  location: 'Indiranagar, Bangalore',
  date: '2025-12-22 at 10:00 AM',
  customer: 'Arthi V',
  customerName: 'Arthi V',
  customerPhone: '+91 98765 70042',
  customerEmail: 'arthi.v54@example.com',
  customerAddress: 'House 43, Indiranagar',
  description: 'Fix loose legs of dining chairs.',
  estimatedPrice: 450,
  price: 450,
},
{
  ticketId: 'TKT055',
  title: 'Cleaning - Carpet Vacuum + Shampoo',
  category: 'Cleaning',
  status: 'In Progress',
  location: 'Bellandur, Bangalore',
  date: '2025-12-22 at 12:00 PM',
  customer: 'Shravan D',
  customerName: 'Shravan D',
  customerPhone: '+91 98765 70043',
  customerEmail: 'shravan.d55@example.com',
  customerAddress: 'Flat 7A, Lakeview Paradise, Bellandur',
  description: 'Deep shampoo cleaning of 2 carpets.',
  estimatedPrice: 1400,
  price: 1400,
},
{
  ticketId: 'TKT056',
  title: 'Plumbing - Sink Installation',
  category: 'Plumbing',
  status: 'In Progress',
  location: 'BTM Layout, Bangalore',
  date: '2025-12-22 at 3:30 PM',
  customer: 'Ganesh M',
  customerName: 'Ganesh M',
  customerPhone: '+91 98765 70044',
  customerEmail: 'ganesh.m56@example.com',
  customerAddress: 'Pearl Residency, BTM Layout',
  description: 'Install new stainless steel kitchen sink.',
  estimatedPrice: 1200,
  price: 1200,
},
{
  ticketId: 'TKT057',
  title: 'Electrical - LED Strip Installation',
  category: 'Electrical',
  status: 'In Progress',
  location: 'HSR Layout, Bangalore',
  date: '2025-12-23 at 10:00 AM',
  customer: 'Naveen Rao',
  customerName: 'Naveen Rao',
  customerPhone: '+91 98765 70045',
  customerEmail: 'naveen.rao57@example.com',
  customerAddress: 'Flat 16B, Silver Ridge, HSR Layout',
  description: 'Install LED strip lighting in living room.',
  estimatedPrice: 950,
  price: 950,
},
{
  ticketId: 'TKT058',
  title: 'Home Services - Shoe Rack Assembly',
  category: 'Home Services',
  status: 'In Progress',
  location: 'Vasanth Nagar, Bangalore',
  date: '2025-12-23 at 12:30 PM',
  customer: 'Rekha I',
  customerName: 'Rekha I',
  customerPhone: '+91 98765 70046',
  customerEmail: 'rekha.i58@example.com',
  customerAddress: 'Block 4, Vasanth Enclave, Bangalore',
  description: 'Assemble and mount wooden shoe rack.',
  estimatedPrice: 750,
  price: 750,
},
{
  ticketId: 'TKT059',
  title: 'Cleaning - Terrace Pressure Wash',
  category: 'Cleaning',
  status: 'In Progress',
  location: 'Jayanagar, Bangalore',
  date: '2025-12-23 at 3:00 PM',
  customer: 'Vinod S',
  customerName: 'Vinod S',
  customerPhone: '+91 98765 70047',
  customerEmail: 'vinod.s59@example.com',
  customerAddress: 'Gandhi Street, Jayanagar',
  description: 'High-pressure wash for terrace and exterior walls.',
  estimatedPrice: 2000,
  price: 2000,
},
{
  ticketId: 'TKT060',
  title: 'Plumbing - Bathroom Tap Realignment',
  category: 'Plumbing',
  status: 'In Progress',
  location: 'Koramangala, Bangalore',
  date: '2025-12-24 at 10:30 AM',
  customer: 'Sahana D',
  customerName: 'Sahana D',
  customerPhone: '+91 98765 70048',
  customerEmail: 'sahana.d60@example.com',
  customerAddress: 'Green Court Apts, Koramangala',
  description: 'Fix loose tap and realign water inlet pipe.',
  estimatedPrice: 500,
  price: 500,
},
{
  ticketId: 'TKT061',
  title: 'Electrical - Power Backup Installation',
  category: 'Electrical',
  status: 'In Progress',
  location: 'Banashankari, Bangalore',
  date: '2025-12-24 at 1:00 PM',
  customer: 'Harini Rao',
  customerName: 'Harini Rao',
  customerPhone: '+91 98765 70049',
  customerEmail: 'harini.r61@example.com',
  customerAddress: 'Plot 52, Banashankari',
  description: 'Install inverter backup for home.',
  estimatedPrice: 2500,
  price: 2500,
},
{
  ticketId: 'TKT062',
  title: 'Home Services - Bed Frame Assembly',
  category: 'Home Services',
  status: 'In Progress',
  location: 'Whitefield, Bangalore',
  date: '2025-12-24 at 3:00 PM',
  customer: 'Shruti Narayan',
  customerName: 'Shruti Narayan',
  customerPhone: '+91 98765 70050',
  customerEmail: 'shruti.n62@example.com',
  customerAddress: 'Block D, Metro Residency, Whitefield',
  description: 'Assemble queen-size bed frame and tighten joints.',
  estimatedPrice: 1000,
  price: 1000,
}





];

// Utility to fetch user name from registration data (MOCK)
const getMockUserName = () => {
  try {
    const stored = localStorage.getItem('swachify_registered_user');
    if (stored) {
      const user = JSON.parse(stored);
      return user.fullname || user.email || 'Freelancer';
    }
  } catch (e) {
    console.error('Failed to parse user data from localStorage', e);
  }
  return 'User';
};

const MOCK_USER = {
  name: getMockUserName(),
  skills: ['Cleaning', 'Home Services', 'Plumbing', 'Electrical'],
};

// --- HEADER WITH PROFILE DROPDOWN (UPDATED) ---
// const HeaderComponent: React.FC<{
//   userName: string;
//   onLogout: () => void;
//   isDashboardVisible: boolean; // NEW: state prop
//   onToggleDashboard: () => void; // NEW: handler prop
// }> = ({ userName, onLogout, isDashboardVisible, onToggleDashboard }) => {
//   const menu = (
//     <Menu
//       className="sw-frd-profile-menu"
//       onClick={(e) => {
//         if (e.key === 'logout') onLogout();
//       }}
//       style={{ borderRadius: 8, overflow: 'hidden', minWidth: 180 }}
//     >
//       <Menu.Item key="name" disabled style={{ fontWeight: 600, color: '#102030' }}>
//         {userName}
//       </Menu.Item>
//       <Menu.Divider />
//       <Menu.Item
//         key="logout"
//         icon={<LogoutOutlined />}
//         style={{ color: '#dc3545', fontWeight: 500 }}
//       >
//         Logout
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <Header className="sw-frd-header">
//       <div className="sw-frd-logo-area">
//         <Text strong className="sw-frd-logo-text">
//           SWACHIFY INDIA
//         </Text>
//         <Text className="sw-frd-portal-text">Freelancer Portal</Text>
//       </div>

//       <div className="sw-frd-user-area">
//         {/* NEW: View My Dashboard button, visible only when dashboard is hidden */}
//         {!isDashboardVisible && (
//           <Button
//             type="primary"
//             className="sw-frd-view-dashboard-btn"
//             onClick={onToggleDashboard}
//             icon={<ArrowRightOutlined />}
//           >
//             View My Dashboard
//           </Button>
//         )}
//         <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
//           <Button
//             type="default"
//             className="sw-frd-profile-btn"
//             icon={<UserOutlined style={{ fontSize: 18 }} />}
//           />
//         </Dropdown>
//       </div>
//     </Header>
//   );
// };


const HeaderComponent: React.FC<{
  userName: string;
  onLogout: () => void;
  isDashboardVisible: boolean;
  onToggleDashboard: () => void;
}> = ({ userName, onLogout, isDashboardVisible, onToggleDashboard }) => {
  const menu = (
    <Menu
      className="sw-frd-profile-menu"
      onClick={(e) => {
        if (e.key === 'logout') onLogout();
      }}
      style={{ borderRadius: 8, overflow: 'hidden', minWidth: 180 }}
    >
      <Menu.Item key="name" disabled style={{ fontWeight: 600, color: '#102030' }}>
        {userName}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        style={{ color: '#dc3545', fontWeight: 500 }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="sw-frd-header">
      <div className="sw-frd-logo-area">
        <Text strong className="sw-frd-logo-text">SWACHIFY INDIA</Text>
        <Text className="sw-frd-portal-text">Freelancer Portal</Text>
      </div>

      <div className="sw-frd-user-area">
        {/* When dashboard is hidden: show View My Dashboard */}
        {!isDashboardVisible && (
          <Button
            type="primary"
            className="sw-frd-view-dashboard-btn"
            onClick={onToggleDashboard}
            icon={<ArrowRightOutlined />}
          >
            View My Dashboard
          </Button>
        )}

        {/* When dashboard IS visible: show Back to Requests */}
        {isDashboardVisible && (
          <Button
            type="default"
            className="sw-frd-back-btn"
            onClick={onToggleDashboard}
            icon={<ArrowLeftOutlined />}
            style={{ marginRight: 12 }}
          >
            Back to Requests
          </Button>
        )}

        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <Button
            type="default"
            className="sw-frd-profile-btn"
            icon={<UserOutlined style={{ fontSize: 18 }} />}
          />
        </Dropdown>
      </div>
    </Header>
  );
};


// --- SMALL COMPONENTS (Unchanged) ---
const UserSkills: React.FC<{ skills: string[] }> = ({ skills }) => (
  <section className="sw-frd-section">
    <div className="sw-frd-section-header">
      <Title level={4} className="sw-frd-section-title">
        My Skills
      </Title>
      <Text className="sw-frd-section-subtitle">
        Used to match you with the right jobs
      </Text>
    </div>
    <div className="sw-frd-skills-container">
      {skills.map((skill) => (
        <Tag key={skill} className="sw-frd-skill-tag">
          {skill}
        </Tag>
      ))}
    </div>
  </section>
);

interface JobCardProps {
  job: Job;
  isActive: boolean;
  onMarkComplete?: (id: string) => void;
  showFlow?: boolean;
  currentStep?: ServiceStepIndex;
  onStepChange?: (step: ServiceStepIndex) => void;
  stepImages?: Record<ServiceStepIndex, string[]>;
  onStepImageUpload?: (step: ServiceStepIndex, files: File[]) => void;
}

/**
 * Job card + flow
 */
const JobCard: React.FC<JobCardProps> = ({
  job,
  isActive,
  onMarkComplete,
  showFlow = false,
  currentStep = 0,
  onStepChange,
  stepImages = { 0: [], 1: [], 2: [], 3: [] },
  onStepImageUpload,
}) => {
  const isLastStep = currentStep === (SERVICE_FLOW_STEPS.length - 1 as ServiceStepIndex);

  const requiresImage = (idx: ServiceStepIndex) =>
    IMAGE_REQUIRED_STEPS.includes(idx);

  const canProceedFromCurrent =
    !requiresImage(currentStep) || stepImages[currentStep].length > 0;

  const handleStepAction = () => {
    if (!canProceedFromCurrent) {
      message.error(`Please upload image proof for the '${SERVICE_FLOW_STEPS[currentStep]}' stage before proceeding.`);
      return;
    }

    if (isLastStep) {
      if (onMarkComplete) onMarkComplete(job.ticketId);
      return;
    }

    const next = ((currentStep + 1) as unknown) as ServiceStepIndex;
    if (onStepChange) onStepChange(next);
  };

  const cardClass = `sw-frd-job-card ${isActive ? 'sw-frd-job-card--active' : ''} ${
    showFlow ? 'sw-frd-job-card--with-flow' : ''
  }`;

  return (
    <Card className={cardClass} bordered={false}>
      <Row gutter={24} align="top" wrap>
        {/* LEFT: JOB META */}
        <Col xs={24} md={showFlow ? 14 : 24} className="sw-frd-job-col">
          <div className="sw-frd-job-header-row">
            <div>
              <Text strong className="sw-frd-job-title">
                {job.title}
              </Text>

              {job.status === 'In Progress' && (
                <Tag color="blue" className="sw-frd-status-tag">
                  In Progress
                </Tag>
              )}
              {job.status === 'Completed' && (
                <Tag color="green" className="sw-frd-status-tag">
                  Completed
                </Tag>
              )}
            </div>
            <div className="sw-frd-job-price-wrap">
              <Text className="sw-frd-price-label">Payout</Text>
              <Text className="sw-frd-price">₹{job.price.toLocaleString()}</Text>
            </div>
          </div>

          <Text className="sw-frd-ticket-id">Ticket ID: {job.ticketId}</Text>
        <div className="sw-frd-details-row">
          <Text className="sw-frd-detail-item">
            <EnvironmentOutlined className="sw-frd-icon-sm" /> {job.location}
          </Text>
          <Text className="sw-frd-detail-item">
            <ClockCircleOutlined className="sw-frd-icon-sm" /> {job.date}
          </Text>
        </div>

        {/* NEW: Customer details block */}
        {(job.customerName || job.customerPhone || job.customerEmail || job.customerAddress) && (
          <div className="sw-frd-customer-block">
            <div className="sw-frd-customer-block-header">
              <span className="sw-frd-customer-block-title">Customer details</span>
            </div>

            {job.customerName && (
              <div className="sw-frd-customer-line">
                <UserOutlined className="sw-frd-customer-icon" />
                <span className="sw-frd-customer-text">{job.customerName}</span>
              </div>
            )}

            {job.customerPhone && (
              <div className="sw-frd-customer-line">
                <PhoneOutlined className="sw-frd-customer-icon" />
                <a href={`tel:${job.customerPhone}`} className="sw-frd-customer-link">
                  {job.customerPhone}
                </a>
              </div>
            )}

            {job.customerEmail && (
              <div className="sw-frd-customer-line">
                <MailOutlined className="sw-frd-customer-icon" />
                <a href={`mailto:${job.customerEmail}`} className="sw-frd-customer-link">
                  {job.customerEmail}
                </a>
              </div>
            )}

            {job.customerAddress && (
              <div className="sw-frd-customer-line sw-frd-customer-address">
                <EnvironmentOutlined className="sw-frd-customer-icon" />
                <span className="sw-frd-customer-text">{job.customerAddress}</span>
              </div>
            )}
          </div>
        )}

        {isActive && showFlow && (
          <div className="sw-frd-next-step-chip">
            <span className="sw-frd-next-step-label">Current stage</span>
            <span className="sw-frd-next-step-value">
              {SERVICE_FLOW_STEPS[currentStep]}
            </span>
          </div>
        )}
        {isActive && (
            <Button
              type="default"
              className="sw-frd-help-btn"
              icon={<QuestionCircleOutlined />}
            >
              Get help with this job
            </Button>
          )}

          {/* Fallback for completed / non-flow cards */}
          {isActive && onMarkComplete && !showFlow && (
            <Button
              type="primary"
              className="sw-frd-complete-btn"
              onClick={() => onMarkComplete(job.ticketId)}
            >
              Mark as Completed
            </Button>
          )}
        </Col>

        {/* RIGHT: SERVICE FLOW STEPPER */}
        {isActive && showFlow && (
          <Col xs={24} md={10} className="sw-frd-flow-col">
            <div className="sw-frd-flow-container">
              <div className="sw-frd-flow-header">
                <span className="sw-frd-flow-pill">Live job status</span>
              </div>

              <div className="sw-frd-flow-steps">
                {SERVICE_FLOW_STEPS.map((label, idx) => {
                  const stepIndex = idx as ServiceStepIndex;
                  const isActiveStep = stepIndex === currentStep;
                  const isCompletedStep = stepIndex < currentStep;
                  // UPDATED: Checks array length
                  const imageCount = stepImages[stepIndex].length;
                  const needsImage = requiresImage(stepIndex);

                  return (
                    <div
                      key={label}
                      className={
                        'sw-frd-flow-step' +
                        (isActiveStep ? ' active' : '') +
                        (isCompletedStep ? ' completed' : '')
                      }
                    >
                      <div className="sw-frd-flow-step-circle-wrap">
                        <div className="sw-frd-flow-step-circle">
                          {isCompletedStep ? <CheckCircleOutlined /> : idx + 1}
                        </div>
                        {idx < SERVICE_FLOW_STEPS.length - 1 && (
                          <div className="sw-frd-flow-step-line" />
                        )}
                      </div>

                      <div className="sw-frd-flow-step-text">
                        <p className="sw-frd-flow-step-title">{label}</p>
                        <p className="sw-frd-flow-step-desc">
                          {SERVICE_FLOW_DESCRIPTIONS[idx]}
                        </p>

                        {/* UPDATED: Only show upload on steps that require it and are active */}
                        {needsImage && isActiveStep && (
                          <div className="sw-frd-flow-upload">
                            <Upload
                              showUploadList={false}
                              accept="image/*"
                              multiple // Allow multiple files
                             beforeUpload={(_, fileList) => {
  if (onStepImageUpload) {
    onStepImageUpload(stepIndex, fileList as File[]);
  }
  return false;
}}

                            >
                              <Button
                                size="small"
                                icon={<UploadOutlined />}
                                className="sw-frd-flow-upload-btn"
                              >
                                {imageCount > 0 ? 'Add / Replace images' : 'Capture / Upload proof'}
                              </Button>
                            </Upload>
                            {imageCount > 0 && (
                              <span className="sw-frd-flow-upload-success">
                                {imageCount} image(s) added
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button
                className="sw-frd-flow-next-btn"
                onClick={handleStepAction}
                disabled={!canProceedFromCurrent}
              >
                {isLastStep ? 'Complete job' : 'Move to next stage'}
              </Button>
            </div>
          </Col>
        )}
      </Row>
    </Card>
  );
};

const RequestCard: React.FC<{ request: Job; onAccept: (req: Job) => void }> = ({
  request,
  onAccept,
}) => (
  <Card className="sw-frd-request-card" bordered={false}>
    <Row justify="space-between" align="top">
      <Col xs={24} sm={18}>
        <div className="sw-frd-request-header">
          <Text strong className="sw-frd-request-title">
            {request.title}
          </Text>
          <Text className="sw-frd-request-price">
            ₹{(request.estimatedPrice || request.price).toLocaleString()}
          </Text>
        </div>
        <Text className="sw-frd-ticket-id">Ticket ID: {request.ticketId}</Text>
        <Text className="sw-frd-customer">Customer: {request.customer}</Text>
        <Text className="sw-frd-request-desc-text">{request.description}</Text>

        <div className="sw-frd-details-row">
          <Text className="sw-frd-detail-item">
            <EnvironmentOutlined className="sw-frd-icon-sm" /> {request.location}
          </Text>
          <Text className="sw-frd-detail-item">
            <ClockCircleOutlined className="sw-frd-icon-sm" /> {request.date}
          </Text>
          <Text className="sw-frd-detail-item sw-frd-estimated">
            <DollarCircleOutlined className="sw-frd-icon-sm" /> Estimated:{' '}
            ₹{(request.estimatedPrice || request.price).toLocaleString()}
          </Text>
        </div>
      </Col>
    </Row>
    <Button
      type="primary"
      danger
      className="sw-frd-accept-btn"
      onClick={() => onAccept(request)}
      icon={<ArrowRightOutlined />}
    >
      Accept Request
    </Button>
  </Card>
);

const PendingApprovalCard: React.FC<{
  job: Job;
  onApprove: (id: string) => void;
}> = ({ job, onApprove }) => (
  <Card className="sw-frd-pending-card" bordered={false}>
    <div className="sw-frd-pending-header">
      <div>
        <Text strong className="sw-frd-job-title">
          {job.title}
        </Text>
        <Tag color="orange" className="sw-frd-status-tag">
          Waiting for admin approval
        </Tag>
      </div>
      <div className="sw-frd-job-price-wrap">
        <Text className="sw-frd-price-label">Payout</Text>
        <Text className="sw-frd-price">₹{job.price.toLocaleString()}</Text>
      </div>
    </div>

    <Text className="sw-frd-ticket-id">Ticket ID: {job.ticketId}</Text>

    <div className="sw-frd-details-row">
      <Text className="sw-frd-detail-item">
        <EnvironmentOutlined className="sw-frd-icon-sm" /> {job.location}
      </Text>
      <Text className="sw-frd-detail-item">
        <ClockCircleOutlined className="sw-frd-icon-sm" /> {job.date}
      </Text>
    </div>

    <div className="sw-frd-pending-footer">
      <div className="sw-frd-pending-note">
        <HourglassOutlined className="sw-frd-pending-icon" />
        <span>
          Admin review in progress. You’ll be able to start only after approval.
        </span>
      </div>
      {/* Mock button to simulate admin approval */}
      <Button
        size="small"
        type="primary"
        className="sw-frd-pending-approve-btn"
        onClick={() => onApprove(job.ticketId)}
      >
        Mark approved & start job 
      </Button>
    </div>
  </Card>
);

// --- MAIN DASHBOARD ---
const FreelancerDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [activeJobs, setActiveJobs] = useState<Job[]>([]);
  const [pendingJobs, setPendingJobs] = useState<Job[]>([]);
  const [availableRequests, setAvailableRequests] =
    useState<Job[]>(INITIAL_AVAILABLE_REQUESTS);

  // const [requestFilter, setRequestFilter] = useState<
  //   'All Requests' | 'Matched to My Skills'
  // >('All Requests');
  const [requestSort, setRequestSort] = useState<'Newest First' | 'Highest Price'>(
    'Newest First',
  );
  // add this
const [selectedSkill, setSelectedSkill] = useState<string>('All Skills');

  // NEW STATE: Control visibility of non-request dashboard sections
  const [isDashboardVisible, setIsDashboardVisible] = useState(false); 
  
  const handleToggleDashboard = () => {
    setIsDashboardVisible((prev) => !prev);
  };

  const [activeFlowStep, setActiveFlowStep] = useState<ServiceStepIndex>(0);
  const [stepImages, setStepImages] = useState<
    Record<ServiceStepIndex, string[]>
  >({
    0: [],
    1: [],
    2: [],
    3: [],
  });

  const { skills } = MOCK_USER;

  // --- METRICS / KPIs ---
  const activeJobsInProgress = useMemo(
    () => activeJobs.filter((job) => job.status === 'In Progress'),
    [activeJobs],
  );

  const completedJobs = useMemo(
    () => activeJobs.filter((job) => job.status === 'Completed'),
    [activeJobs],
  );

  const totalEarnings = useMemo(
    () => completedJobs.reduce((sum, job) => sum + job.price, 0),
    [completedJobs],
  );

  const averageRating = 4.8;
  const activeJob = activeJobsInProgress[0] || null;
 // const upcomingJob = activeJob;
  const pendingCount = pendingJobs.length;

  // Reset service flow when active job changes
  useEffect(() => {
    setActiveFlowStep(0);
    setStepImages({ 0: [], 1: [], 2: [], 3: [] });
  }, [activeJob?.ticketId]);


  // Ensure we start on the Requests view when the dashboard mounts
useEffect(() => {
  setIsDashboardVisible(false);
}, []);


  // --- FILTER & SORT AVAILABLE REQUESTS ---
  const filteredRequests = useMemo(() => {
    let list = [...availableRequests];

      // Skill-specific filter (if user selected one)
  // if (selectedSkill && selectedSkill !== 'All Skills') {
  //   list = list.filter((req) => req.category === selectedSkill);
  // }

    if (selectedSkill !== 'All Skills') {
    list = list.filter((req) => req.category === selectedSkill);
  }

    // if (requestFilter === 'Matched to My Skills') {
    //   const userSkillsSet = new Set(skills);
    //   list = list.filter((req) => userSkillsSet.has(req.category));
    // }




    

    if (requestSort === 'Highest Price') {
      list.sort((a, b) => (b.estimatedPrice || b.price) - (a.estimatedPrice || a.price));
    }

    return list;
  }, 
  // [availableRequests, requestFilter, requestSort, skills]
 [availableRequests, selectedSkill, requestSort]

);

  // ---------- Infinite scroll for Available Requests (client-side pagination) ----------
  const pageSize = 6; // items per "page" — tweak as needed
  const [page, setPage] = useState(1);
  const [visibleRequests, setVisibleRequests] = useState<Job[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Reset pagination whenever the filtered list changes (filters, sort, accept/remove)
  useEffect(() => {
    setPage(1);
    const first = filteredRequests.slice(0, pageSize);
    setVisibleRequests(first);
    setHasMore(filteredRequests.length > first.length);
  }, [filteredRequests]);

  // load more function (slices the filteredRequests array)
  const loadMore = useCallback(() => {
    if (loadingMore) return;
    if (!hasMore) return;
    setLoadingMore(true);

    // Simulate fetch delay (optional). Remove setTimeout if you call real API.
    setTimeout(() => {
      setVisibleRequests((prev) => {
     const start = (page - 1) * pageSize;

        const nextChunk = filteredRequests.slice(start, start + pageSize);
        const newList = [...prev, ...nextChunk];
        setHasMore(start + nextChunk.length < filteredRequests.length);
        setLoadingMore(false);
        return newList;
      });
      setPage((p) => p + 1);
    }, 250); // small delay for UX; remove/adjust as needed
  }, [filteredRequests, hasMore, loadingMore]);

  // IntersectionObserver: watch sentinel and trigger loadMore
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    if (!hasMore) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loadingMore && hasMore) {
            loadMore();
          }
        });
      },
      { root: null, rootMargin: '250px', threshold: 0.1 } // trigger early
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [loadMore, hasMore, loadingMore]);


  // --- ACTION HANDLERS ---
  const handleMarkComplete = (id: string) => {
    setActiveJobs((prev) =>
      prev.map((job) =>
        job.ticketId === id ? { ...job, status: 'Completed' } : job,
      ),
    );
    message.success(`Job ${id} marked as completed.`);
  };

  const handleAcceptRequest = (request: Job) => {
    setAvailableRequests((prev) =>
      prev.filter((req) => req.ticketId !== request.ticketId),
    );

    const pendingJob: Job = {
      ...request,
      status: 'Approval Pending',
      date: new Date().toISOString().slice(0, 10),
      price: request.estimatedPrice || request.price,
    };

    setPendingJobs((prev) => [...prev, pendingJob]);

    message.success(
      `Request ${request.ticketId} accepted! Waiting for admin approval.`,
    );
  };

  const handleApprovePending = (ticketId: string) => {
    const alreadyActive = activeJobs.some((j) => j.status === 'In Progress');

    if (alreadyActive) {
      Modal.warning({
        title: 'Complete the current active job',
        content:
          'You already have an active booking in progress. Please complete or close the current job before starting a new one.',
        centered: true,
        okText: 'OK',
      });
      return;
    }

    const job = pendingJobs.find((j) => j.ticketId === ticketId);
    if (!job) return;

    // move from Approval Pending → Active Job
    setPendingJobs((prev) => prev.filter((j) => j.ticketId !== ticketId));

    const activeJob: Job = {
      ...job,
      status: 'In Progress',
    };

    setActiveJobs((prev) => [...prev, activeJob]);

    message.success(`Job ${ticketId} approved and moved to Active Job.`);
  };

  // UPDATED: Accepts File[] (fileList) and maps them to URLs
  const handleStepImageUpload = (step: ServiceStepIndex, files: File[]) => {
    const newUrls = files.map(file => URL.createObjectURL(file));
    setStepImages((prev) => ({ ...prev, [step]: newUrls })); // Replace existing files
    message.success(`${newUrls.length} image(s) uploaded/captured.`);
  };

  const handleLogout = () => {
    localStorage.removeItem('freelancerLoggedIn');
    //  setIsDashboardVisible(false); 
    navigate('/freelancer');
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('freelancerLoggedIn');
    if (!isLoggedIn) {
      // navigate('/freelancerlogin');
    }
  }, [navigate]);

  // inside FreelancerDashboard component (near the top)



  return (
    <Layout className="sw-frd-layout-container">
      {/* UPDATED: Pass new props to HeaderComponent */}
      <HeaderComponent
        userName={MOCK_USER.name}
        onLogout={handleLogout}
        isDashboardVisible={isDashboardVisible}
        onToggleDashboard={handleToggleDashboard}
      />

      <Content className="sw-frd-content-main">
        
        {/* NEW: Conditional rendering for all non-request sections */}
        {isDashboardVisible && (
          <>
            {/* OVERVIEW METRICS */}
            <section className="sw-frd-section sw-frd-overview-section">
              <div className="sw-frd-section-header">
                <Title level={4} className="sw-frd-section-title">
                  Dashboard Overview
                </Title>
                <Text className="sw-frd-section-subtitle">
                  Track your performance at a glance
                </Text>
              </div>

              <div className="sw-frd-overview-grid">
                <Card className="sw-frd-overview-card" bordered={false}>
                  <Text className="sw-frd-overview-label">Total Earnings</Text>
                  <div className="sw-frd-overview-value-row">
                    <Text className="sw-frd-overview-value">
                      ₹{totalEarnings.toLocaleString()}
                    </Text>
                  </div>
                  <Text className="sw-frd-overview-subtext">
                    From {completedJobs.length} completed jobs
                  </Text>
                </Card>

                <Card className="sw-frd-overview-card" bordered={false}>
                  <Text className="sw-frd-overview-label">Active Jobs</Text>
                  <div className="sw-frd-overview-value-row">
                    <Text className="sw-frd-overview-value">
                      {activeJobsInProgress.length}
                    </Text>
                  </div>
                  <Text className="sw-frd-overview-subtext">
                    {activeJob
                      ? `Current: ${activeJob.title}`
                      : 'No jobs currently active'}
                  </Text>
                </Card>

                <Card className="sw-frd-overview-card sw-frd-pending-metric" bordered={false}>
                  <Text className="sw-frd-overview-label">Approval Pending</Text>
                  <div className="sw-frd-overview-value-row">
                    <Text className="sw-frd-overview-value">{pendingCount}</Text>
                  </div>
                  <Text className="sw-frd-overview-subtext">
                    Jobs waiting for admin review
                  </Text>
                </Card>

                <Card className="sw-frd-overview-card" bordered={false}>
                  <Text className="sw-frd-overview-label">Available Jobs</Text>
                  <div className="sw-frd-overview-value-row">
                    <Text className="sw-frd-overview-value">
                      {availableRequests.length}
                    </Text>
                  </div>
                  <Text className="sw-frd-overview-subtext">
                    Start from Available Requests below
                  </Text>
                </Card>

                <Card className="sw-frd-overview-card" bordered={false}>
                  <Text className="sw-frd-overview-label">Client Rating</Text>
                  <div className="sw-frd-overview-value-row">
                    <Space align="center">
                      <StarFilled className="sw-frd-rating-star" />
                      <Text className="sw-frd-overview-value">
                        {averageRating.toFixed(1)}
                      </Text>
                    </Space>
                  </div>
                  <Text className="sw-frd-overview-subtext">
                    Based on recent jobs 
                  </Text>
                </Card>
              </div>
            </section>

            {/* SKILLS */}
            <UserSkills skills={skills} />

            {/* APPROVAL PENDING */}
            <section className="sw-frd-section">
              <div className="sw-frd-section-header">
                <Title level={4} className="sw-frd-section-title">
                  Approval Pending
                </Title>
                <Text className="sw-frd-section-subtitle">
                  Jobs you have accepted and are waiting for admin approval
                </Text>
              </div>

              <div className="sw-frd-pending-list">
                {pendingJobs.length > 0 ? (
                  pendingJobs.map((job) => (
                    <PendingApprovalCard
                      key={job.ticketId}
                      job={job}
                      onApprove={handleApprovePending}
                    />
                  ))
                ) : (
                  <Empty
                    description="No jobs are waiting for approval."
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </div>
            </section>

            {/* ACTIVE JOB – SINGLE CARD WITH FLOW */}
            <section className="sw-frd-section">
              <div className="sw-frd-section-header">
                <Title level={4} className="sw-frd-section-title">
                  My Active Job
                </Title>
                <Text className="sw-frd-section-subtitle">
                  Live status of your current service
                </Text>
              </div>

              <div className="sw-frd-active-jobs-container">
                {activeJob ? (
                  <JobCard
                    job={activeJob}
                    isActive={true}
                    onMarkComplete={handleMarkComplete}
                    showFlow
                    currentStep={activeFlowStep}
                    onStepChange={setActiveFlowStep}
                    stepImages={stepImages}
                    onStepImageUpload={handleStepImageUpload}
                  />
                ) : (
                  <Empty
                    description="No jobs currently in progress. Accept a request to get started."
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )}
              </div>
            </section>

            {/* RECENTLY COMPLETED */}
            <section className="sw-frd-section">
              <div className="sw-frd-section-header">
                <Title level={4} className="sw-frd-section-title">
                  Recently Completed
                </Title>
                <Text className="sw-frd-section-subtitle">
                  Jobs you have completed through the flow
                </Text>
              </div>

              {completedJobs.length > 0 ? (
                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                  {completedJobs
                    .slice()
                    .reverse()
                    .slice(0, 3)
                    .map((job) => (
                      <JobCard key={job.ticketId} job={job} isActive={false} />
                    ))}
                </Space>
              ) : (
                <Empty
                  description="You haven't completed any jobs yet."
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </section>
          </>
        )}

        {/* AVAILABLE REQUESTS (ALWAYS VISIBLE) */}
        {/* <section className="sw-frd-section">
          <Row
            justify="space-between"
            align="middle"
            className="sw-frd-available-header"
          >
            <div>
              <Title
                level={4}
                className="sw-frd-section-title sw-frd-requests-title"
              >
                Available Requests
              </Title>
              <Text className="sw-frd-section-subtitle">
                Start your flow by accepting a request
              </Text>
            </div>

            <Space size={12} className="sw-frd-filter-bar">
              <Select
                value={requestFilter}
                onChange={(value) => setRequestFilter(value as any)}
                className="sw-frd-filter-select"
              >
                <Option value="All Requests">All Requests</Option>
                <Option value="Matched to My Skills">
                  Matched to My Skills
                </Option>
              </Select>

              <Select
                value={requestSort}
                onChange={(value) => setRequestSort(value as any)}
                className="sw-frd-sort-select"
              >
                <Option value="Newest First">Newest First</Option>
                <Option value="Highest Price">Highest Price</Option>
              </Select>
            </Space>
          </Row>

          <div className="sw-frd-requests-list">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((req) => (
                <RequestCard
                  key={req.ticketId}
                  request={req}
                  onAccept={handleAcceptRequest}
                />
              ))
            ) : (
              <Empty
                description={`No available requests matching "${requestFilter}" criteria.`}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </div>
        </section> */}
        {/* AVAILABLE REQUESTS — only show when dashboard is NOT visible (i.e. login/requests view) */}
{!isDashboardVisible && (
  <section className="sw-frd-section">
    <Row
      justify="space-between"
      align="middle"
      className="sw-frd-available-header"
    >
      <div>
        <Title
          level={4}
          className="sw-frd-section-title sw-frd-requests-title"
        >
          Available Requests
        </Title>
        <Text className="sw-frd-section-subtitle">
          Start your flow by accepting a request
        </Text>
      </div>

      <Space size={12} className="sw-frd-filter-bar">
        {/* <Select
          value={requestFilter}
          onChange={(value) => setRequestFilter(value as any)}
          className="sw-frd-filter-select"
        >
          <Option value="All Requests">All Requests</Option>
          <Option value="Matched to My Skills">
            Matched to My Skills
          </Option>
        </Select> */}



<Select
  value={selectedSkill}
  onChange={(val) => setSelectedSkill(val as string)}
>
  <Option value="All Skills">All Requests</Option>
  {MOCK_USER.skills.map((s) => (
    <Option key={s} value={s}>{s}</Option>
  ))}
</Select>


        <Select
          value={requestSort}
          onChange={(value) => setRequestSort(value as any)}
          className="sw-frd-sort-select"
        >
          <Option value="Newest First">Newest First</Option>
          <Option value="Highest Price">Highest Price</Option>
        </Select>
      </Space>
    </Row>

    {/* <div className="sw-frd-requests-list">
      {filteredRequests.length > 0 ? (
        filteredRequests.map((req) => (
          <RequestCard
            key={req.ticketId}
            request={req}
            onAccept={handleAcceptRequest}
          />
        ))
      ) : (
        // <Empty
        //   description={`No available requests matching "${requestFilter}" criteria.`}
        //   image={Empty.PRESENTED_IMAGE_SIMPLE}
        // />
        <Empty
  description={
    selectedSkill === 'All Skills'
      ? 'No available requests.'
      : `No requests found for "${selectedSkill}".`
  }
  image={Empty.PRESENTED_IMAGE_SIMPLE}
/>

      )}
    </div> */}

        <div className="sw-frd-requests-list">
      {visibleRequests.length === 0 && !loadingMore && (
        <Empty
          description={
            selectedSkill === 'All Skills'
              ? 'No available requests.'
              : `No requests found for "${selectedSkill}".`
          }
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}

      {visibleRequests.map((req) => (
        <RequestCard key={req.ticketId} request={req} onAccept={handleAcceptRequest} />
      ))}

      {/* Sentinel observed by IntersectionObserver */}
      <div ref={sentinelRef} style={{ height: 1 }} />

      {/* Loading / end indicators */}
      {loadingMore && (
        <div style={{ textAlign: 'center', padding: 12 }}>
          <span>Loading more…</span>
        </div>
      )}
      {!hasMore && visibleRequests.length > 0 && (
        <div style={{ textAlign: 'center', padding: 12, color: '#666' }}>
          End of results
        </div>
      )}
    </div>

  </section>
)}

      </Content>
    </Layout>
  );
};

export default FreelancerDashboard;