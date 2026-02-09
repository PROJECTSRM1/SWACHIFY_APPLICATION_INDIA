import React, { useMemo, useState, useEffect, useRef } from "react";
import "./HealthCare.css";
import { message, Tooltip } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import healthcareService, { type Appointment, type LabItem } from "../../../api/healthcare";
import { PaymentsAPI } from "../../../api/customerAuth";
import CommonHeader from "../../landing/Header";
import { JitsiMeeting } from "@jitsi/react-sdk";




type AmbulanceHospital = {
  hospital_id: number;
  hospital_name: string;
  specialty_type: string;
  location: string;
  conditions: string[]; // ✅ ADD THIS
  latitude: number | null;
  longitude: number | null;
  hospital_contact: string;
  ambulance_id: number;
  service_provider: string;
  ambulance_contact: string;
  availability_status: string;
};


// 👇 ADD THIS at top of same file (Labs.tsx)






const STATIC_HOSPITALS: AmbulanceHospital[] = [
  {
    hospital_id: 1,
    hospital_name: "Apollo Medical Center",
    specialty_type: "MULTI-SPECIALTY",
    location: "Banjara Hills",
    conditions: ["fever", "cold", "infection", "covid"],
    latitude: null,
    longitude: null,
    hospital_contact: "+91 90000 11111",
    ambulance_id: 101,
    service_provider: "Apollo Ambulance",
    ambulance_contact: "+91 90000 11112",
    availability_status: "Available 24x7",
  },
  {
    hospital_id: 2,
    hospital_name: "City General Hospital",
    specialty_type: "GENERAL MEDICINE",
    location: "Ameerpet",
    conditions: ["fever", "cold", "cough", "vomit"],
    latitude: null,
    longitude: null,
    hospital_contact: "+91 90000 22221",
    ambulance_id: 102,
    service_provider: "City Ambulance",
    ambulance_contact: "+91 90000 22222",
    availability_status: "Available",
  },
  {
    hospital_id: 3,
    hospital_name: "Sunrise Hospitals",
    specialty_type: "ENT & GENERAL",
    location: "Madhapur",
    conditions: ["sinus", "cold", "fever"],
    latitude: null,
    longitude: null,
    hospital_contact: "+91 90000 33331",
    ambulance_id: 103,
    service_provider: "Sunrise Ambulance",
    ambulance_contact: "+91 90000 33332",
    availability_status: "Available",
  },
  {
    hospital_id: 4,
    hospital_name: "Care & Cure Hospital",
    specialty_type: "EMERGENCY",
    location: "Gachibowli",
    conditions: ["vomit", "infection", "fever"],
    latitude: null,
    longitude: null,
    hospital_contact: "+91 90000 44441",
    ambulance_id: 104,
    service_provider: "Care Ambulance",
    ambulance_contact: "+91 90000 44442",
    availability_status: "Available",
  },
  {
    hospital_id: 5,
    hospital_name: "Rainbow Children Hospital",
    specialty_type: "PEDIATRIC",
    location: "Kondapur",
    conditions: ["fever", "cold", "child"],
    latitude: null,
    longitude: null,
    hospital_contact: "+91 90000 55551",
    ambulance_id: 105,
    service_provider: "Rainbow Ambulance",
    ambulance_contact: "+91 90000 55552",
    availability_status: "Available",
  },
  {
    hospital_id: 6,
    hospital_name: "Max Healthcare",
    specialty_type: "MULTI-SPECIALTY",
    location: "Secunderabad",
    conditions: ["covid", "fever", "emergency"],
    latitude: null,
    longitude: null,
    hospital_contact: "+91 90000 66661",
    ambulance_id: 106,
    service_provider: "Max Ambulance",
    ambulance_contact: "+91 90000 66662",
    availability_status: "Available",
  },
  {
    hospital_id: 7,
    hospital_name: "Star Hospitals",
    specialty_type: "GENERAL",
    location: "Begumpet",
    conditions: ["fever", "cough"],
    latitude: null,
    longitude: null,
    hospital_contact: "+91 90000 77771",
    ambulance_id: 107,
    service_provider: "Star Ambulance",
    ambulance_contact: "+91 90000 77772",
    availability_status: "Available",
  },
  {
    hospital_id: 8,
    hospital_name: "KIMS Hospital",
    specialty_type: "GENERAL & EMERGENCY",
    location: "Somajiguda",
    conditions: ["infection", "vomit", "fever"],
    latitude: null,
    longitude: null,
    hospital_contact: "+91 90000 88881",
    ambulance_id: 108,
    service_provider: "KIMS Ambulance",
    ambulance_contact: "+91 90000 88882",
    availability_status: "Available",
  },
  {
    hospital_id: 9,
    hospital_name: "Yashoda Hospitals",
    specialty_type: "MULTI-SPECIALTY",
    location: "Malakpet",
    conditions: ["cold", "fever", "sinus"],
    latitude: null,
    longitude: null,
    hospital_contact: "+91 90000 99991",
    ambulance_id: 109,
    service_provider: "Yashoda Ambulance",
    ambulance_contact: "+91 90000 99992",
    availability_status: "Available",
  },
  {
    hospital_id: 10,
    hospital_name: "Global Hospitals",
    specialty_type: "CRITICAL CARE",
    location: "Lakdikapul",
    conditions: ["emergency", "infection", "fever"],
    latitude: null,
    longitude: null,
    hospital_contact: "+91 90000 10101",
    ambulance_id: 110,
    service_provider: "Global Ambulance",
    ambulance_contact: "+91 90000 10102",
    availability_status: "Available",
  },
];

type HospitalDoctor = {
  id: number;
  hospitalId: number;
  name: string;
  speciality: string;
  rating: number;
  experience: string;
  patients: string;
  image: string;
  bio: string;
};

type UIDoctor = {
  id: number;
  name: string;
  speciality: string;
  rating: number;
  image: string;
  experience: number;
  price: number;
  available: boolean;
  patients: number;
  bio: string;
};

export const HOSPITAL_DOCTORS: HospitalDoctor[] = [
  // 🏥 Apollo Medical Center (hospital_id: 1) → 3 doctors
  {
    id: 101,
    hospitalId: 1,
    name: "Dr. Suresh Rao",
    speciality: "General Physician",
    rating: 4.6,
    experience: "12 Yrs",
    patients: "4k+",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Expert in internal medicine and lifestyle disorders.",
  },
  {
    id: 102,
    hospitalId: 1,
    name: "Dr. Neha Kapoor",
    speciality: "Dermatologist",
    rating: 4.7,
    experience: "9 Yrs",
    patients: "2.3k+",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Specializes in skin, hair, and cosmetic dermatology.",
  },
  {
    id: 103,
    hospitalId: 1,
    name: "Dr. Arjun Malhotra",
    speciality: "Pulmonologist",
    rating: 4.8,
    experience: "11 Yrs",
    patients: "3.1k+",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    bio: "Treats respiratory disorders including asthma and COPD.",
  },

  // 🏥 City General Hospital (hospital_id: 2) → 4 doctors
  {
    id: 201,
    hospitalId: 2,
    name: "Dr. Rahul Verma",
    speciality: "Cardiologist",
    rating: 4.8,
    experience: "8 Yrs",
    patients: "2.1k+",
    image: "https://randomuser.me/api/portraits/men/71.jpg",
    bio: "Specialist in heart failure and preventive cardiology.",
  },
  {
    id: 202,
    hospitalId: 2,
    name: "Dr. Anjali Mehta",
    speciality: "Neurologist",
    rating: 4.9,
    experience: "10 Yrs",
    patients: "3k+",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Expert in epilepsy and stroke rehabilitation.",
  },
  {
    id: 203,
    hospitalId: 2,
    name: "Dr. Sameer Khan",
    speciality: "Orthopedic",
    rating: 4.7,
    experience: "9 Yrs",
    patients: "1.8k+",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    bio: "Focuses on joint replacement and sports injuries.",
  },
  {
    id: 204,
    hospitalId: 2,
    name: "Dr. Pooja Nair",
    speciality: "General Physician",
    rating: 4.6,
    experience: "7 Yrs",
    patients: "2k+",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    bio: "Provides comprehensive primary and preventive care.",
  },

  // 🏥 Sunrise Hospitals (hospital_id: 3) → 2 doctors
  {
    id: 301,
    hospitalId: 3,
    name: "Dr. Vinay Kumar",
    speciality: "ENT Specialist",
    rating: 4.5,
    experience: "6 Yrs",
    patients: "1.2k+",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    bio: "Treats sinus, hearing loss, and throat infections.",
  },
  {
    id: 302,
    hospitalId: 3,
    name: "Dr. Sneha Reddy",
    speciality: "General Physician",
    rating: 4.4,
    experience: "5 Yrs",
    patients: "900+",
    image: "https://randomuser.me/api/portraits/women/30.jpg",
    bio: "Primary care specialist for common illnesses.",
  },

  // 🏥 Care & Cure Hospital (hospital_id: 4) → 6 doctors
  {
    id: 401,
    hospitalId: 4,
    name: "Dr. Ramesh Iyer",
    speciality: "Emergency Medicine",
    rating: 4.9,
    experience: "15 Yrs",
    patients: "6k+",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    bio: "Senior emergency physician handling critical cases.",
  },
  {
    id: 402,
    hospitalId: 4,
    name: "Dr. Kavya Sharma",
    speciality: "Anesthesiologist",
    rating: 4.7,
    experience: "10 Yrs",
    patients: "2.5k+",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    bio: "Expert in anesthesia and pain management.",
  },
  {
    id: 403,
    hospitalId: 4,
    name: "Dr. Mohit Jain",
    speciality: "Critical Care",
    rating: 4.8,
    experience: "12 Yrs",
    patients: "3.7k+",
    image: "https://randomuser.me/api/portraits/men/89.jpg",
    bio: "ICU specialist managing high-risk patients.",
  },
  {
    id: 404,
    hospitalId: 4,
    name: "Dr. Ayesha Siddiqui",
    speciality: "Internal Medicine",
    rating: 4.6,
    experience: "8 Yrs",
    patients: "2k+",
    image: "https://randomuser.me/api/portraits/women/77.jpg",
    bio: "Handles complex adult medical conditions.",
  },

  // 🏥 Rainbow Children Hospital (hospital_id: 5) → 3 doctors
  {
    id: 501,
    hospitalId: 5,
    name: "Dr. Meera Joshi",
    speciality: "Pediatrician",
    rating: 4.9,
    experience: "11 Yrs",
    patients: "5k+",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    bio: "Senior pediatrician specializing in child growth and immunity.",
  },
  {
    id: 502,
    hospitalId: 5,
    name: "Dr. Kunal Shah",
    speciality: "Pediatric Pulmonologist",
    rating: 4.7,
    experience: "8 Yrs",
    patients: "2.2k+",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
    bio: "Treats asthma, allergies, and respiratory infections in children.",
  },
  {
    id: 503,
    hospitalId: 5,
    name: "Dr. Riya Malhotra",
    speciality: "Child Nutritionist",
    rating: 4.6,
    experience: "6 Yrs",
    patients: "1.6k+",
    image: "https://randomuser.me/api/portraits/women/39.jpg",
    bio: "Focuses on nutrition, obesity prevention, and diet planning.",
  },

  // 🏥 Max Healthcare (hospital_id: 6) → 5 doctors
  {
    id: 601,
    hospitalId: 6,
    name: "Dr. Pradeep Nair",
    speciality: "Emergency Medicine",
    rating: 4.8,
    experience: "14 Yrs",
    patients: "6.5k+",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    bio: "Handles trauma, cardiac emergencies, and critical care.",
  },
  {
    id: 602,
    hospitalId: 6,
    name: "Dr. Swati Kulkarni",
    speciality: "Infectious Disease",
    rating: 4.7,
    experience: "9 Yrs",
    patients: "3k+",
    image: "https://randomuser.me/api/portraits/women/48.jpg",
    bio: "Specialist in viral infections including COVID-19.",
  },
  {
    id: 603,
    hospitalId: 6,
    name: "Dr. Rohit Bansal",
    speciality: "General Physician",
    rating: 4.6,
    experience: "10 Yrs",
    patients: "3.8k+",
    image: "https://randomuser.me/api/portraits/men/56.jpg",
    bio: "Treats lifestyle diseases and acute illnesses.",
  },
  {
    id: 604,
    hospitalId: 6,
    name: "Dr. Aditi Sengupta",
    speciality: "Pulmonologist",
    rating: 4.8,
    experience: "11 Yrs",
    patients: "2.9k+",
    image: "https://randomuser.me/api/portraits/women/61.jpg",
    bio: "Expert in lung disorders and post-COVID recovery.",
  },
  {
    id: 605,
    hospitalId: 6,
    name: "Dr. Nikhil Arora",
    speciality: "Cardiologist",
    rating: 4.9,
    experience: "13 Yrs",
    patients: "4.4k+",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    bio: "Specializes in heart disease and preventive cardiology.",
  },

  // 🏥 Star Hospitals (hospital_id: 7) → 2 doctors
  {
    id: 701,
    hospitalId: 7,
    name: "Dr. Vikas Chandra",
    speciality: "General Physician",
    rating: 4.5,
    experience: "7 Yrs",
    patients: "1.9k+",
    image: "https://randomuser.me/api/portraits/men/72.jpg",
    bio: "Primary care specialist for common infections.",
  },
  {
    id: 702,
    hospitalId: 7,
    name: "Dr. Nandini Rao",
    speciality: "Chest Physician",
    rating: 4.6,
    experience: "8 Yrs",
    patients: "2.1k+",
    image: "https://randomuser.me/api/portraits/women/70.jpg",
    bio: "Treats cough, bronchitis, and respiratory conditions.",
  },

  // 🏥 KIMS Hospital (hospital_id: 8) → 4 doctors
  {
    id: 801,
    hospitalId: 8,
    name: "Dr. Mahesh Patil",
    speciality: "Internal Medicine",
    rating: 4.7,
    experience: "12 Yrs",
    patients: "3.5k+",
    image: "https://randomuser.me/api/portraits/men/81.jpg",
    bio: "Manages chronic and acute adult medical conditions.",
  },
  {
    id: 802,
    hospitalId: 8,
    name: "Dr. Farah Khan",
    speciality: "Emergency Physician",
    rating: 4.8,
    experience: "10 Yrs",
    patients: "4k+",
    image: "https://randomuser.me/api/portraits/women/82.jpg",
    bio: "Expert in emergency and trauma care.",
  },
  {
    id: 803,
    hospitalId: 8,
    name: "Dr. Sandeep Reddy",
    speciality: "Gastroenterologist",
    rating: 4.6,
    experience: "9 Yrs",
    patients: "2.7k+",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    bio: "Treats digestive disorders and liver diseases.",
  },
  {
    id: 804,
    hospitalId: 8,
    name: "Dr. Anu Thomas",
    speciality: "General Physician",
    rating: 4.5,
    experience: "6 Yrs",
    patients: "1.4k+",
    image: "https://randomuser.me/api/portraits/women/88.jpg",
    bio: "Provides holistic primary healthcare.",
  },

  // 🏥 Yashoda Hospitals (hospital_id: 9) → 3 doctors
  {
    id: 901,
    hospitalId: 9,
    name: "Dr. Srinivas Rao",
    speciality: "ENT Specialist",
    rating: 4.7,
    experience: "11 Yrs",
    patients: "3.2k+",
    image: "https://randomuser.me/api/portraits/men/90.jpg",
    bio: "Expert in sinus, ear, and throat disorders.",
  },
  {
    id: 902,
    hospitalId: 9,
    name: "Dr. Pallavi Deshmukh",
    speciality: "General Physician",
    rating: 4.6,
    experience: "8 Yrs",
    patients: "2.5k+",
    image: "https://randomuser.me/api/portraits/women/91.jpg",
    bio: "Treats fever, infections, and lifestyle disorders.",
  },
  {
    id: 903,
    hospitalId: 9,
    name: "Dr. Ashok Menon",
    speciality: "Pulmonologist",
    rating: 4.8,
    experience: "13 Yrs",
    patients: "4k+",
    image: "https://randomuser.me/api/portraits/men/92.jpg",
    bio: "Specialist in respiratory and sleep disorders.",
  },

  // 🏥 Global Hospitals (hospital_id: 10) → 6 doctors
  {
    id: 1001,
    hospitalId: 10,
    name: "Dr. Rajiv Khanna",
    speciality: "Critical Care",
    rating: 4.9,
    experience: "16 Yrs",
    patients: "7k+",
    image: "https://randomuser.me/api/portraits/men/95.jpg",
    bio: "Handles ICU and life-threatening conditions.",
  },
  {
    id: 1002,
    hospitalId: 10,
    name: "Dr. Shalini Gupta",
    speciality: "Infectious Disease",
    rating: 4.8,
    experience: "12 Yrs",
    patients: "3.9k+",
    image: "https://randomuser.me/api/portraits/women/96.jpg",
    bio: "Expert in complex infections and sepsis.",
  },
  {
    id: 1003,
    hospitalId: 10,
    name: "Dr. Ankit Verma",
    speciality: "Emergency Medicine",
    rating: 4.7,
    experience: "9 Yrs",
    patients: "3.1k+",
    image: "https://randomuser.me/api/portraits/men/97.jpg",
    bio: "Emergency response and trauma specialist.",
  },
  {
    id: 1004,
    hospitalId: 10,
    name: "Dr. Leena Roy",
    speciality: "Internal Medicine",
    rating: 4.6,
    experience: "10 Yrs",
    patients: "2.8k+",
    image: "https://randomuser.me/api/portraits/women/98.jpg",
    bio: "Treats chronic illnesses and complex diagnoses.",
  },
  {
    id: 1005,
    hospitalId: 10,
    name: "Dr. Harish Iyer",
    speciality: "Cardiologist",
    rating: 4.9,
    experience: "14 Yrs",
    patients: "4.6k+",
    image: "https://randomuser.me/api/portraits/men/99.jpg",
    bio: "Advanced cardiac care and interventions.",
  },
  {
    id: 1006,
    hospitalId: 10,
    name: "Dr. Neelam Sethi",
    speciality: "Nephrologist",
    rating: 4.7,
    experience: "11 Yrs",
    patients: "2.4k+",
    image: "https://randomuser.me/api/portraits/women/99.jpg",
    bio: "Specialist in kidney disorders and dialysis.",
  },
];

// import { AppstoreOutlined } from "@ant-design/icons";

type Doctor = {
  id: number;
  name: string;
  speciality: string;
  category: string; // NEW
  conditions: string[]; // NEW
  experience?: number;
  rating: number;
  availability: string;
  price: string;
  image: string;
  slots: string[];
};

type Specialist = {
  id: number;
  name: string;
  experience: string;
  rating: number;
  availableAt: string;
  image: string;
};



const specialistByType: Record<string, Specialist> = {
  "General Practitioner": {
    id: 1,
    name: "Dr. David Park",
    experience: "9 years experience",
    rating: 4.8,
    availableAt: "Available at 1:30 PM",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1200&q=80",
  },

  Cardiologist: {
    id: 2,
    name: "Dr. Sarah Miles",
    experience: "12 years experience",
    rating: 4.9,
    availableAt: "Available at 3:00 PM",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
  },

  Dermatologist: {
    id: 3,
    name: "Dr. Marcus Lee",
    experience: "7 years experience",
    rating: 4.7,
    availableAt: "Available at 5:15 PM",
    image:
      "https://images.unsplash.com/photo-1580281657527-47f249e8f2d1?auto=format&fit=crop&w=1200&q=80",
  },

  Neurologist: {
    id: 4,
    name: "Dr. Elena Carter",
    experience: "10 years experience",
    rating: 4.8,
    availableAt: "Available at 6:00 PM",
    image:
      "https://images.unsplash.com/photo-1582719478185-2f7b6a7a52c0?auto=format&fit=crop&w=1200&q=80",
  },

  Orthopedic: {
    id: 5,
    name: "Dr. Jason Reed",
    experience: "11 years experience",
    rating: 4.9,
    availableAt: "Available at 4:10 PM",
    image:
      "https://images.unsplash.com/photo-1576765607924-3f7b8410a787?auto=format&fit=crop&w=1200&q=80",
  },

  Pediatrician: {
    id: 6,
    name: "Dr. Emma Wilson",
    experience: "8 years experience",
    rating: 4.8,
    availableAt: "Available at 12:45 PM",
    image:
      "https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&w=1200&q=80",
  },

  Dentist: {
    id: 7,
    name: "Dr. Ryan Cooper",
    experience: "6 years experience",
    rating: 4.7,
    availableAt: "Available at 2:20 PM",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
  },

  Psychologist: {
    id: 8,
    name: "Dr. Olivia Green",
    experience: "9 years experience",
    rating: 4.8,
    availableAt: "Available at 7:30 PM",
    image:
      "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?auto=format&fit=crop&w=1200&q=80",
  },

  // ✅ EXTRA SPECIALISTS (MORE LIST)
  ENT: {
    id: 9,
    name: "Dr. Rahul Mehta",
    experience: "10 years experience",
    rating: 4.7,
    availableAt: "Available at 11:10 AM",
    image:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
  },

  Gynecologist: {
    id: 10,
    name: "Dr. Ananya Rao",
    experience: "13 years experience",
    rating: 4.9,
    availableAt: "Available at 2:50 PM",
    image:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80",
  },

  Diabetologist: {
    id: 11,
    name: "Dr. Suresh Naidu",
    experience: "8 years experience",
    rating: 4.6,
    availableAt: "Available at 6:40 PM",
    image:
      "https://images.unsplash.com/photo-1584467735871-0b1d5f9b6d42?auto=format&fit=crop&w=1200&q=80",
  },

  Gastroenterologist: {
    id: 12,
    name: "Dr. Vikram Singh",
    experience: "14 years experience",
    rating: 4.8,
    availableAt: "Available at 5:05 PM",
    image:
      "https://images.unsplash.com/photo-1579154203451-0d2d83d2f4a2?auto=format&fit=crop&w=1200&q=80",
  },
};

// const pharmacies = [
//   {
//     id: 1,
//     distance: "0.8 km away",
//     name: "Wellness Plus Pharmacy",
//     type: "RETAIL PHARMACY",
//     medicines: "Amoxicillin, Paracetamol, ...",
//     rating: 4.9,
//     eta: "25 - 40 mins",
//     buttonText: "Order Now",
//   },
//   {
//     id: 2,
//     distance: "1.5 km away",
//     name: "CarePoint Medical Store",
//     type: "RETAIL PHARMACY",
//     medicines: "Paracetamol, Vitamin C, ...",
//     rating: 4.7,
//     eta: "30 - 45 mins",
//     buttonText: "Order Now",
//   },
//   {
//     id: 3,
//     distance: "2.2 km away",
//     name: "Apollo Pharmacy",
//     type: "CHAIN PHARMACY",
//     medicines: "Amoxicillin, Cough Syrup, ...",
//     rating: 4.8,
//     eta: "20 - 35 mins",
//     buttonText: "Order Now",
//   },
//   {
//     id: 4,
//     distance: "3.0 km away",
//     name: "MediCare Pharmacy",
//     type: "RETAIL PHARMACY",
//     medicines: "Pain relief, Cold meds, ...",
//     rating: 4.6,
//     eta: "35 - 55 mins",
//     buttonText: "Order Now",
//   },
// ];

interface UIHospitalItem {
  hospital_id: number;
  hospital_name: string;
  specialty_type: string;
  location: string;
  conditions: string[];
  service_provider: string;
  ambulance_contact: string;
  availability_status: string;
  price: number; // ✅ ADD THIS
}

interface UIPharmacyItem {
  id: number;
  name: string;
  type: string;
  medicines: string;
  rating: number;
  eta: string;
  distance: string;
  buttonText: string;
  deliveryTime: string;
  services: string; // ✅ ADD THIS
}










const labImages = [
  "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
  // "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504814532849-9279d32b6a55?auto=format&fit=crop&w=800&q=80",
];

const hospitalDoctorsphotos = [
"https://randomuser.me/api/portraits/men/32.jpg",
// "https://randomuser.me/api/portraits/women/44.jpg",
"https://randomuser.me/api/portraits/men/71.jpg",
"https://randomuser.me/api/portraits/men/55.jpg",
"https://randomuser.me/api/portraits/men/41.jpg",
// "https://randomuser.me/api/portraits/women/30.jpg",
"https://randomuser.me/api/portraits/men/12.jpg",
 "https://randomuser.me/api/portraits/men/89.jpg",
// "https://randomuser.me/api/portraits/women/12.jpg",
"https://randomuser.me/api/portraits/men/23.jpg",
// "https://randomuser.me/api/portraits/women/39.jpg",
"https://randomuser.me/api/portraits/men/45.jpg",
"https://randomuser.me/api/portraits/men/56.jpg",
"https://randomuser.me/api/portraits/men/67.jpg",
"https://randomuser.me/api/portraits/men/72.jpg",
// "https://randomuser.me/api/portraits/women/70.jpg",
// "https://randomuser.me/api/portraits/women/82.jpg",
"https://randomuser.me/api/portraits/men/85.jpg",
//  "https://randomuser.me/api/portraits/women/88.jpg",
"https://randomuser.me/api/portraits/men/90.jpg",
// "https://randomuser.me/api/portraits/women/91.jpg",
"https://randomuser.me/api/portraits/men/95.jpg",
//  "https://randomuser.me/api/portraits/women/96.jpg",
"https://randomuser.me/api/portraits/men/97.jpg",
"https://randomuser.me/api/portraits/men/99.jpg",
]





function formatAvailabilityTime(from: string, to: string) {
  if (!from || !to) return "Available Today";
  return `${formatTime(from)} - ${formatTime(to)}`;
}

function formatTime(timeStr: string) {
  const [h, m] = timeStr.split(":").map(Number);
  const hour = h % 12 || 12;
  const ampm = h >= 12 ? "PM" : "AM";
  return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}


const isFutureSlot = (slot: string, selectedDate: Date) => {
  const now = new Date();

  const [time, meridian] = slot.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (meridian === "PM" && hours !== 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;

  const slotDate = new Date(selectedDate);
  slotDate.setHours(hours, minutes, 0, 0);

  return slotDate > now;
};


const isBeforeAppointmentTime = (slot: string, appointmentSlot: string) => {
  const toMinutes = (time: string) => {
    const [t, mer] = time.split(" ");
    let [h, m] = t.split(":").map(Number);

    if (mer === "PM" && h !== 12) h += 12;
    if (mer === "AM" && h === 12) h = 0;

    return h * 60 + m;
  };

  return toMinutes(slot) < toMinutes(appointmentSlot);
};


/* ⬇️ Component starts here */
// const HealthCare: React.FC = () => {


const defaultImages = [

  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1579154203451-0d2d83d2f4a2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=800&q=80",
];

const pharmacyImages = [
  "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300",
  "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=300",
  "https://images.unsplash.com/photo-1580281657527-47d8c1f6f52e?w=300",
];





const getDoctorImage = (id: number | string | undefined) => {
  const num = Number(id);
  if (!num || isNaN(num)) return defaultImages[0];
  return defaultImages[Math.abs(num) % defaultImages.length];
};



const getPharmacyImage = (id: number) =>
  pharmacyImages[id % pharmacyImages.length];

const getHosptialDoctorsImage = (id: number | string | undefined) => {
  const num = Number(id);
  if (!num || isNaN(num)) return hospitalDoctorsphotos[0];
    // const hash = Math.abs((num * 2654435761) % 2 ** 32);
  return hospitalDoctorsphotos[Math.abs(num) % hospitalDoctorsphotos.length];
};





// const doctorNameMap: Record<number, string> = {
//   45: "Dr. Rahul Verma",
//   1: "Dr. Sarah Jenkins",
//   319: "Dr. Neha Sharma",
//   13: "Dr. Arvind Mehta",
//   133: "Dr. Priya Reddy",
//   101: "Dr. Marcus Chen",
//   421: "Dr. Aisha Khan",
// };

// Assistants

const assistants = [
  {
    id: 1,
    name: "Emily Watson",
    role: "Senior Care Assistant",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "John Miller",
    role: "Patient Support Executive",
    rating: 4.6,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Sophia Brown",
    role: "Clinical Assistant",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];


const HealthCare: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  // ✅ Appointment booking screen (Image 2)
  const [openAppointmentScreen, setOpenAppointmentScreen] = useState(false);
  const [appointmentDoctor, setAppointmentDoctor] = useState<Doctor | null>(
    null,
  );
  // 📅 Appointment date handling
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [openPaymentSuccess, setOpenPaymentSuccess] = useState(false);
  const [paymentCompleted, _setPaymentCompleted] = useState(false);

  //labs
  const [openLabBooking, setOpenLabBooking] = useState(false);
  const [selectedLab, setSelectedLab] = useState<any>(null);

  const [labs, setLabs] = useState<LabItem[]>([]);


  const [loadingLabs, setLoadingLabs] = useState(false);
  const [selectedNearbyHospital, setSelectedNearbyHospital] =
    useState<UIHospitalItem | null>(null);
  const [pharmacies, setPharmacies] = useState<UIPharmacyItem[]>([]);
  const [bookedAppointment, setBookedAppointment] = useState<any>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeCallAppointment, setActiveCallAppointment] = useState<any | null>(null);
const [inCall, setInCall] = useState(false);

// storing user_id
const [userId, setUserId] = useState<number | null>(null);

const syncUserIdFromStorage = () => {
  const id = localStorage.getItem("user_id");
  if (id) {
    setUserId(Number(id));
  }
};

useEffect(() => {
  syncUserIdFromStorage();
}, []);



  













  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const generateDates = () => {
    const days = [];
    const totalDays = getDaysInMonth(currentMonth);

    for (let i = 1; i <= totalDays; i++) {
      days.push(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i),
      );
    }
    return days;
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [openConsultation, setOpenConsultation] = useState<boolean>(false);

  const [openOnlinePopup, setOpenOnlinePopup] = useState(false);

  const [_ambulanceList, setAmbulanceList] = useState<AmbulanceHospital[]>([]);
  const [hospitalList, setHospitalList] = useState<UIHospitalItem[]>([]);


  useEffect(() => {
    setAmbulanceList(STATIC_HOSPITALS);
  }, []);

  // hospital booking
  const [_selectedHospital, _setSelectedHospital] =
    useState<AmbulanceHospital | null>(null);

  const [openHospitalBooking, setOpenHospitalBooking] = useState(false);
  // const [openHospitalSuccess, setOpenHospitalSuccess] = useState(false);

  // hospital → doctors flow
  const [openHospitalDoctors, setOpenHospitalDoctors] = useState(false);
  // const [hospitalDoctors, setHospitalDoctors] = useState<HospitalDoctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<UIDoctor  | null>(
    null,
  );

  // ✅ RESET ASSISTANT WHEN DOCTOR CHANGES
  useEffect(() => {
    if (selectedDoctor) {
      setPatientAssist("");
      setSelectedAssistant(null);
      setShowAssistantPopup(false);
    }
  }, [selectedDoctor]);

  const [showAssistantPopup, setShowAssistantPopup] = useState(false);
  // const [selectedAssistant, setSelectedAssistant] = useState(null);

  type Assistant = {
    id: number;
    name: string;
    role: string;
    rating: number;
    image: string;
  };

  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(
    null,
  );

  // booking form
const [bookingDate, setBookingDate] = useState<string>("");
const [bookingTime, setBookingTime] = useState<string>("");
const [showTimeDropdown, setShowTimeDropdown] = useState(false);

const [needAmbulance, setNeedAmbulance] = useState<"Yes" | "No" | "">("");

// 🚑 Pickup time (only if ambulance = Yes)
const [pickupTime, setPickupTime] = useState<string>("");
const [showPickupDropdown, setShowPickupDropdown] = useState(false);

// 🔒 Hospital booking flow helpers
// 🔒 Hospital booking flow helpers
const todayISO = new Date().toISOString().split("T")[0];

const canSelectTime = Boolean(bookingDate);
const canSelectAmbulance = Boolean(bookingDate && bookingTime);

const canConfirmHospitalBooking =
  bookingDate &&
  bookingTime &&
  needAmbulance &&
  (needAmbulance === "No" || pickupTime);


// ⏱ Generate continuous time slots
const generateTimeSlots = (
  startHour = 9,
  endHour = 18,
  intervalMinutes = 30
) => {
  const slots: string[] = [];

  const baseDate = new Date();
  baseDate.setHours(startHour, 0, 0, 0);

  const endDate = new Date();
  endDate.setHours(endHour, 0, 0, 0);

  while (baseDate <= endDate) {
    const hours = baseDate.getHours();
    const minutes = baseDate.getMinutes();

    const hour12 = hours % 12 || 12;
    const ampm = hours >= 12 ? "PM" : "AM";

    slots.push(
      `${hour12.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`
    );

    baseDate.setMinutes(baseDate.getMinutes() + intervalMinutes);
  }

  return slots;
};




  // form states
  const [doctorSpecialized, setDoctorSpecialized] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [days, setDays] = useState<string>("");
  const [insurance, setInsurance] = useState<"yes" | "no" | "">("");

  const [openDoctorProfile, setOpenDoctorProfile] = useState(false);

  const [openAmbulancePopup, setOpenAmbulancePopup] = useState(false);

  const [openAmbulanceScreen, setOpenAmbulanceScreen] = useState(false);
  const trendingSearches = ["Fever", "Cough", "Cold", "Vomit", "Sinus"];

  const [showTrending, setShowTrending] = useState(false);

  const [consultMode, setConsultMode] = useState<"online" | "offline" | "labs" | "medical">(
    "online",
  );

  const [openMyBookings, setOpenMyBookings] = useState(false);

  // ✅ MOBILE TAP SUPPORT (DO NOT REMOVE)

  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [loadingDoctors, setLoadingDoctors] = useState<boolean>(false);


  const getLabImage = (id?: number | string) => {
    const index =
      Math.abs(Number(id ?? 0)) % labImages.length;

    return labImages[index] || labImages[0];
  };

  // const hospitalDoctors = useMemo(() => {
  //   if (!selectedNearbyHospital) return [];

  //   return HOSPITAL_DOCTORS.filter(
  //     (doc) => doc.hospitalId === selectedNearbyHospital.hospital_id
  //   );
  // }, [selectedNearbyHospital]);

  const handleJoinCall = (appt: any) => {
  setActiveCallAppointment(appt);
  setInCall(true);
};


const handleEndCall = async () => {
  if (!activeCallAppointment) return;

  try {
    await healthcareService.updateCallBookingStatus(
      activeCallAppointment.id,
      "Consulted"
    );

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === activeCallAppointment.id
          ? { ...a, call_booking_status: "Consulted", status: "COMPLETED" }
          : a
      )
    );
    
    setInCall(false);
    setActiveCallAppointment(null);
  } catch (err) {
    console.error("Failed to update call status", err);
  }
};



const canJoinCall = (appointmentTime: string) => {
  const now = new Date();
  const apptTime = new Date(appointmentTime);
  return now >= apptTime;
};






// get doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoadingDoctors(true);

        const data = await healthcareService.getAvailableDoctors();

        const mappedDoctors: Doctor[] = data.map((item: any) => ({
          id: item.doctor_id,
          name: item.doctor_name ?? "Dr. Unknown",
          speciality: item.specialization_name,
          category: item.specialization_name, // or map to category if needed
          conditions: [item.specialization_name],
          rating: Number(item.rating) || 4.5,
          experience: item.experience_years,
          availability:
            item.available_from && item.available_to
              ? formatAvailabilityTime(item.available_from, item.available_to)
              : "Available Today",
          price: `₹${item.fees_per_hour}/hr`,
          image: getDoctorImage(item.doctor_id), // ✅ use doctor_id now
          slots: ["10:00 AM", "11:30 AM", "01:00 PM"],
        }));

        setDoctors(mappedDoctors);
      } catch (error) {
        console.error("Doctor fetch failed", error);
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, []);


  // get Labs

  useEffect(() => {
    if (consultMode !== "labs") return;

    const fetchLabs = async () => {
      try {
        setLoadingLabs(true);

        const response = await healthcareService.getAvailableLabs();

        // 🔥 Transform API → UI structure (IMPORTANT)
        response.map((lab) => ({
          id: lab.lab_id,
          name: lab.lab_name,
          type: lab.specialization_name,
          slot: `${lab.available_from} - ${lab.available_to}`,
          rating: lab.rating,
          image: getLabImage(lab.lab_id), // static image
          price: lab.fees_per_test,
          status: lab.status,
          homeCollection: lab.home_collection,
          nextAvailable: lab.next_available,
          delivery: lab.estimated_delivery,
        }));

        setLabs(response)

      } catch (err) {
        console.error("Error fetching labs:", err);
      } finally {
        setLoadingLabs(false);
      }
    };

    fetchLabs();
  }, [consultMode]);

  // get hospital
  useEffect(() => {
    if (consultMode !== "offline") return;

    const fetchHospitals = async () => {
      try {
        const response = await healthcareService.getAvailableHospitals();

        const formatted = response.map((h) => ({
          hospital_id: h.hospital_id,
          hospital_name: h.hospital_name,
          specialty_type: h.specialty_type,
          location: h.location,

          conditions: [
            h.specialty_type,
            h.hospital_name,
            h.location,
          ],

          service_provider: "Hospital Service",
          availability_status: h.hospital_status,
          price: h.fees_per_hour, // ✅ NEW

          ambulance_contact: h.contact_number,
        }));


        setHospitalList(formatted); // ✅ NEW STATE
      } catch (err) {
        console.error(err);
      }
    };

    fetchHospitals();
  }, [consultMode]);

// get pharmacies
  useEffect(() => {
    if (consultMode !== "medical") return;

    const fetchPharmacies = async () => {
      try {
        const response = await healthcareService.getAvailablePharmacies();

        const formatted: UIPharmacyItem[] = response.map((p) => ({
          id: p.pharmacy_id,
          name: p.pharmacy_name,
          type: p.pharmacy_type,
          medicines: p.services,            // still stored (even if not shown)
          rating: p.rating,
          eta: p.delivery_time,
          services: p.services,
          deliveryTime: p.delivery_time,    // ✅ NEW
          distance: p.distance_km ? `${p.distance_km} km` : "Nearby",
          buttonText:
            p.status === "OPEN NOW"
              ? (p.proceed_type ?? "Visit")
              : "order",
        }));

        setPharmacies(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPharmacies();
  }, [consultMode]);

//Book appointment
const handleConfirmAppointment = async () => {
syncUserIdFromStorage();
  if (!appointmentDoctor || !selectedDate || !selectedTime || !userId) {
    alert("User not logged in. Please log in again.");
    return;
  }
  // Build date from parts
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth(); // 0-based
  const day = selectedDate.getDate();

  const [time, modifier] = selectedTime.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  // Create local IST datetime
  const appointmentDateTime = new Date(year, month, day, hours, minutes, 0, 0);

  // 🔥 Send LOCAL time string (not UTC)
  const localDateTime = appointmentDateTime
    .toLocaleString("sv-SE")   // YYYY-MM-DD HH:mm:ss
    .replace(" ", "T");

 

  const payload = {
    user_id: userId,
    consultation_type_id: 1,
    appointment_time: localDateTime,        // ✅ FIXED
    doctor_id: appointmentDoctor.id,
    doctor_specialization_id: null,
    required_ambulance: false,
    ambulance_id: null,
    pickup_time: localDateTime,             // ✅ FIXED
    required_assistant: false,
    assistant_id: null,
    labs_id: null,
    pharmacies_id: null,
    call_booking_status: "CALL_PENDING",
  };

  try {
    const response = await healthcareService.bookAppointment(payload);

    console.log("API returned:", response.appointment_time);
    console.log(
      "IST from API:",
      new Date(response.appointment_time).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      })
    );

    setBookedAppointment(response);
    setOpenAppointmentScreen(false);
    setShowConfirmPopup(true);
  } catch (err) {
    console.error("Appointment booking failed", err);
  }
};

//my bookings
const lastFetchRef = useRef<number>(0);

useEffect(() => {
  syncUserIdFromStorage();
  if (!openMyBookings || !userId) return;

  const now = Date.now();
  if (now - lastFetchRef.current < 10_000) return; // ⏱ Skip if fetched in last 10 sec

  lastFetchRef.current = now;

  const fetchAppointments = async () => {
    try {
      setLoadingBookings(true);

      const data = await healthcareService.getUserAppointments(userId);

      // Merge new appointments with existing ones
      setAppointments((prev) => {
        const updated = data.filter(
          (newAppt) => !prev.some((oldAppt) => oldAppt.id === newAppt.id)
        );
        return [...prev, ...updated];
      });
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoadingBookings(false);
    }
  };

  fetchAppointments();
}, [openMyBookings, userId]);

const formatPatients = (num: number) => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return num.toString();
};




//get doctors hospital  
useEffect(() => {
  if (!openHospitalDoctors || !selectedNearbyHospital?.hospital_id) return;

  const fetchHospitalDoctors = async () => {
    try {
      const response = await healthcareService.getHospitalDoctors(
        selectedNearbyHospital.hospital_id
      );

      // ✅ response is already HospitalDoctorsResponse (array)
      const mapped = response.map((doc) => ({
        id: doc.doctor_id,
        name: doc.doctor_name,
        speciality: doc.specialization_name,
        rating: doc.rating,
        image: getHosptialDoctorsImage(doc.doctor_id),
        experience: doc.experience_years,
        price: doc.fees_per_hour,
        available: doc.is_available,
         patients: Math.floor(Math.random() * 5000) + 1000,
  bio: `Dr. ${doc.doctor_name} is a highly experienced ${doc.specialization_name} with ${doc.experience_years} years of practice. Known for patient-focused care and excellent outcomes.`,
        
      }));

      setHospitalDoctors(mapped);
    } catch (error) {
      console.error("Failed to load hospital doctors:", error);
    }
  };

  fetchHospitalDoctors();
}, [openHospitalDoctors, selectedNearbyHospital]);





























  const [doctorProfile, setDoctorProfile] = useState({
    name: "Dr. Sarah Jenkins",
    speciality: "CARDIOLOGIST",
    hospital: "City Heart Care",
    experience: "12 Years",
    contact: "+91 98765 43210",
    opTime: "10:00 AM - 01:00 PM",
  });
  const [openOfflinePopup, setOpenOfflinePopup] = useState(false);

  const [editOfflineTime, setEditOfflineTime] = useState(false);
  const [tempOfflineTime, setTempOfflineTime] = useState(doctorProfile.opTime);

  const [patientAssist, setPatientAssist] = useState<"yes" | "no" | "">("");

  const [editOpTime, setEditOpTime] = useState(false);
  const [newOpTime, setNewOpTime] = useState(doctorProfile.opTime);
  const [onlineSuccessPopup, setOnlineSuccessPopup] = useState(false);
  const [bookedDoctorName, setBookedDoctorName] = useState("");

  const selectedSpecialist = specialistByType[doctorSpecialized];

  // select doctor card
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);

  // payment popup
  const [openPaymentPopup, setOpenPaymentPopup] = useState(false);

  // confirmed screen
  const [openConfirmedScreen, setOpenConfirmedScreen] =
    useState<boolean>(false);

  // success popup
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);

  // timer (1 minute)
  const [secondsLeft, setSecondsLeft] = useState<number>(60);
  const canJoinLive = secondsLeft === 0;

  const [openLiveScreen, setOpenLiveScreen] = useState(false);

  const [openPrescription, setOpenPrescription] = useState(false);

  const [openNearbyPharmacies, setOpenNearbyPharmacies] = useState(false);
  const [openNearbyLabs, setOpenNearbyLabs] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [hospitalDoctors, setHospitalDoctors] = useState<UIDoctor[]>([]);




  const placeholders = [
    "Search Doctor",
    "Search Speciality",
    "Search Condition",
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const isFormCompleted = useMemo(() => {
    return (
      doctorSpecialized.trim() !== "" &&
      description.trim() !== "" &&
      days.trim() !== "" &&
      Number(days) > 0 &&
      insurance !== ""
    );
  }, [doctorSpecialized, description, days, insurance]);

  const canBookAppointment = isFormCompleted && selectedDoctorId !== null;

  const filteredDoctors = useMemo(() => {
    const q = searchText
      .toLowerCase()
      .replace("(online)", "")
      .replace("(offline)", "")
      .trim();

    return doctors.filter((doc) => {
      const matchesCategory =
        activeCategory === "All" || doc.category === activeCategory;

      const matchesSearch =
        doc.name.toLowerCase().includes(q) ||
        doc.speciality.toLowerCase().includes(q) ||
        doc.conditions.some((c) => c.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchText, activeCategory, doctors]);

  const filteredHospitals = useMemo(() => {
    if (!searchText.trim()) return hospitalList;

    const q = searchText.toLowerCase().trim();

    return hospitalList.filter((h) =>
      h.conditions.some((c) =>
        c.toLowerCase().includes(q)
      )
    );
  }, [searchText, hospitalList]);


  useEffect(() => {
    setSelectedDoctorId(null);
  }, [doctorSpecialized, description, days, insurance]);

  const [openLabTest, setOpenLabTest] = useState(false);

  useEffect(() => {
    if (!openConfirmedScreen) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [openConfirmedScreen]);
  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handlePayNow = async () => {
  try {
    setPayLoading(true);

    const tempHomeServiceId = 25;
    const amount = 5000; // ₹50 => 5000 paise

    // 1️⃣ Create Razorpay order
    const order = await PaymentsAPI.createOrder(tempHomeServiceId, amount);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Swachify Healthcare",
      description: "Online Video Consultation",
      order_id: order.id,

      handler: async function (response: any) {
        // ✅ No verification — just treat as success
        console.log("Razorpay success:", response);

        message.success("Payment Successful 🎉");

        setOpenPaymentSuccess(true);
        setShowConfirmPopup(false);
      },

      theme: {
        color: "#065f46",
      },
    };

    setShowConfirmPopup(false);

    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    message.error("Payment failed!");
  } finally {
    setPayLoading(false);
  }
};



  return (
    <>
      <CommonHeader selectedKey="healthcare" />

      <div className="healthcare-wrapper">
        {/* Banner */}
        <div className="healthcare-banner">
          <div className="healthcare-banner-content">
            <h2>Feeling unwell?</h2>
            <p>Describe your symptoms for a quick recommendation.</p>

            <button
              type="button"
              className="healthcare-btn"
              onClick={() => setOpenConsultation(true)}
            >
              Submit your Health Condition
            </button>
          </div>
          <div className="healthcare-banner-icon">
            {/* Profile Icon with Tooltip */}
            <Tooltip title="Customize your Available Time" placement="bottom">
              <button
                type="button"
                className="banner-profile-btn"
                onClick={() => setOpenDoctorProfile(true)}
              >
                👤
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Search */}
        <div className="healthcare-search">
          {/* 🔍 Search Box */}
          <div className="search-box-wrap">
            <input
              type="text"
              className="search-input"
              placeholder={placeholders[placeholderIndex]}
              value={searchText}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(value)) {
                  setSearchText(value);
                }
              }}
              onFocus={() => setShowTrending(true)}
              onBlur={() => setTimeout(() => setShowTrending(false), 150)}
            />

            {showTrending && (
              <div className="trending-dropdown">
                <p className="trending-title">Searches</p>

                {trendingSearches.map((item) => (
                  <div
                    key={item}
                    className="trending-item"
                    onMouseDown={() => {
                      setSearchText(item);
                      setShowTrending(false);
                    }}
                  >
                    <span className="trending-icon">📈</span>
                    <span className="trending-text">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 🔁 MODE SELECT */}
          {/* 🔁 MODE SELECT (DROPDOWNS) */}
          <div className="mode-toggle">

            {/* MAIN SERVICE DROPDOWN */}
            <select
              className="mode-dropdown"
              onChange={(e) => {
                const value = e.target.value;

                if (value === "Doctor") {
                  setConsultMode("online");
                }

                if (value === "Labs") {
                  setConsultMode("labs");
                  setSearchText("");
                }

                // These two are UI only for now
                if (value === "Medical Store") {
                  setConsultMode("medical"); // reuse existing labs UI safely
                }

                if (value === "Complete Treatment") {
                  setConsultMode("offline"); // reuse hospital flow
                }
              }}
            >
              <option value="Doctor">Doctor</option>
              <option value="Labs">Labs</option>
              <option value="Medical Store">Medical Store</option>
              <option value="Complete Treatment">Complete Treatment</option>
            </select>

            {/* ONLINE / OFFLINE DROPDOWN */}
            <select
              className="mode-dropdown"
              value={consultMode}
              onChange={(e) => setConsultMode(e.target.value as any)}
            >
              <option value="online">🌐 Online</option>
              <option value="offline">🏥 Offline</option>
            </select>

            {/* MY BOOKINGS */}
            <button
              className="my-bookings-btn"
              onClick={() => setOpenMyBookings(true)}
            >
              📅 My Bookings
            </button>

          </div>


          {/* 🚑 Ambulance Button (API Integrated) */}
          <button
            type="button"
            className="emergency-btn search-ambulance-btn"
            onClick={() => {
              setOpenAmbulanceScreen(true);
            }}
          >
            Book Ambulance Now →
          </button>
        </div>

        {/* Categories */}
        <div className="healthcare-cards">
          {/* SEE ALL CARD */}
          {/* SEE ALL CARD */}
          <div
            className={`healthcare-card ${activeCategory === "All" ? "active" : ""}`}
            onClick={() => {
              setActiveCategory("All");
              setSearchText(""); // ✅ clear search so all doctors show
            }}
          >
            <span className="see-all-icon">
              <AppstoreOutlined />
            </span>
            <p>See All</p>
          </div>

          {[
            { label: "Heart", icon: "❤️" },
            { label: "Skin", icon: "🩹" },
            { label: "Mental", icon: "🧠" },
            { label: "Eyes", icon: "👁️" },
            { label: "Bones", icon: "🦴" },
            { label: "Child", icon: "👶" },
            { label: "Dental", icon: "🦷" },
          ].map((c) => (
            <div
              key={c.label}
              className={`healthcare-card ${activeCategory === c.label ? "active" : ""}`}
              onClick={() => setActiveCategory(c.label)}
            >
              <span>{c.icon}</span>
              <p>{c.label}</p>
            </div>
          ))}
        </div>
        {/* Categories */}

        {/* Available Doctors */}
        {/* Online / Offline Result Section */}
        {/* ================= ONLINE ================= */}
        {consultMode === "online" && (
          <>
            {/* ONLINE DOCTORS — NO CHANGE */}
            <div className="available-doctors-header">
              <h3>Available Doctors</h3>
              <span
                className="see-all"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchText("");
                }}
              >
                See all
              </span>
            </div>

            {loadingDoctors && (
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                ⏳ Loading available doctors...
              </div>
            )}

            <div className="doctor-list grid-view">
              {filteredDoctors.map((doc) => (
                <div key={doc.id} className="doctor-card">
                  <div className="doctor-top">
                    <img src={doc.image} alt={doc.name}

                      onError={(e) => {
                        e.currentTarget.src = defaultImages[1];
                      }}

                    />

                    <h4 className="doctor-name">{doc.name}</h4>
                  </div>

                  <div className="doctor-info">
                    <p className="doctor-meta">
                      {doc.speciality}
                      <span className="dot">•</span>⭐ {doc.rating}
                      <span className="dot">•</span>
                      Exp. {doc.experience} yrs
                      <span className="dot">•</span>
                      Patients 4k+
                    </p>

                    <p className="availability">
                      Next available: <span>{doc.availability}</span>
                    </p>

                    <div className="doctor-footer">
                      <span className="price">{doc.price}</span>
                      <button
                        type="button"
                        className="book-btn"
                        onClick={() => {
                         
                          setAppointmentDoctor(doc);
                          setOpenAppointmentScreen(true);
                        }}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= OFFLINE ================= */}
        {consultMode === "offline" && (
          <>
            {/* OFFLINE FLOW — CONDITION REQUIRED */}
            <>
              <div className="available-doctors-header">
                <h3>Nearby Hospitals</h3>
                <span className="see-all" onClick={() => setSearchText("")}>
                
                </span>
              </div>

              <div className="ambulance-hospital-list">
                {filteredHospitals.length > 0 ? (
                  filteredHospitals.map((h) => (
                    <div
                      key={h.hospital_id}
                      className="ambulance-hospital-card"
                    >
                      <div className="ambulance-hospital-top">
                        <div className="ambulance-hospital-icon">✚</div>
                        <div>
                          <h2>{h.hospital_name}</h2>
                          <p className="ambulance-hospital-type">
                            {h.specialty_type}
                          </p>
                        </div>
                      </div>

                      <div className="ambulance-details">
                        <div className="hospital-condition-chips">
                          {h.conditions.map((c) => (
                            <span key={c} className="condition-chip">
                              {c}
                            </span>
                          ))}
                        </div>

                        <p>📍 {h.location}</p>
                        <p>🚑 {h.service_provider}</p>
                        <p>📞 {h.ambulance_contact}</p>

                        <button
                          className="book-btn"
                          onClick={() => {
                            setSelectedNearbyHospital(h);
                            setOpenHospitalBooking(true);
                          }}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="offline-empty-state">
                    <h3>No hospitals found</h3>
                    <p>Try another condition</p>
                  </div>
                )}
              </div>
            </>
          </>
        )}

        {/* ================= LABS (MAIN UI, NOT OVERLAY) ================= */}
        {consultMode === "labs" && (
          <>
            <div className="available-doctors-header">
              <h3>Available Labs</h3>
              <span className="see-all" onClick={() => setSearchText("")}>
              
              </span>
            </div>

            {loadingLabs && <p>Loading labs...</p>}

            <div className="nearby-list">
              {labs.map((item) => (
                <div key={item.lab_id} className="nearby-item">
                  <div className="nearby-item-row">

                    {/* IMAGE (dummy or static for now) */}
                    <img
                      src={getLabImage(item.lab_id)}
                      alt={item.lab_name}
                      onError={(e) => {
                        e.currentTarget.src = labImages[0];
                      }}

                      className="lab-image"
                    />

                    {/* DETAILS */}
                    <div className="lab-info">
                      <h3 className="lab-name">{item.lab_name}</h3>

                      <p className="lab-test">{item.specialization_name}</p>

                      <p className="lab-timing">
                        Timing: {item.available_from} - {item.available_to}
                      </p>

                      <p className="lab-price">
                        ₹ {item.fees_per_test} / test
                      </p>

                      {/* {item.home_collection && (
                        <p className="home-collection">🏠 Home Collection Available</p>
                      )} */}
                    </div>

                    {/* RATING */}
                    <div className="lab-rating">
                      ⭐ {item.rating}
                      <br />
                      <span
                        style={{
                          color: item.status === "OPEN" ? "green" : "red",
                          fontSize: 12,
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* ACTION */}
                  <div className="lab-action">
                    <button
                      className="book-btn"
                      // disabled={item.status === "CLOSED"}
                      onClick={() => {
                        setSelectedLab(true);
                        setOpenLabBooking(true);
                      }}
                    >
                      {/* {item.status === "OPEN" ? "Book Now" : "Closed"} */}
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= MEDICAL STORE ================= */}
    {/* ================= MEDICAL STORE ================= */}
{consultMode === "medical" && (
  <>
    <div className="available-doctors-header">
      <h3>Available Medical Stores</h3>
      <span className="see-all" onClick={() => setSearchText("")}>
    
      </span>
    </div>

    <div className="medical-store-list">
      {pharmacies.map((item) => (
        <div key={item.id} className="medical-card">
          <div className="medical-row">

            {/* LEFT IMAGE */}
            <img
              src={getPharmacyImage(item.id)}
              alt={item.name}
              className="medical-img"
              onError={(e) => {
                e.currentTarget.src = pharmacyImages[1];
              }}
            />

            {/* CENTER INFO */}
            <div className="medical-info">
              <div className="medical-head">
                <h4>{item.name}</h4>
                <span className="medical-rating">⭐ {item.rating}</span>
              </div>

              <p className="medical-type">{item.type}</p>
              <p className="medical-time">Delivery: {item.deliveryTime}</p>
              <p className="medical-services">{item.services}</p>
              <p className="medical-price">Contact for price</p>
            </div>

            {/* RIGHT BUTTON */}
            <button className="medical-order-btn">
              {item.buttonText}
            </button>

          </div>
        </div>
      ))}
    </div>
  </>
)}














        {openLabBooking && selectedLab && (
          <div className="lab-booking-overlay">
            <div className="lab-booking-popup">
              {/* Header */}
              <h2>Book Lab Test</h2>
              <p className="lab-name">{selectedLab.name}</p>

              {/* Upload Prescription */}
              <div className="lab-section">
                <h4>Upload Prescription</h4>
                <div className="upload-row">
                  <button className="upload-btn">📷 Camera</button>
                  <button className="upload-btn">🖼 Gallery</button>
                </div>
              </div>

              {/* Delivery Mode */}
              <div className="lab-section">
                <h4>How would you like to proceed?</h4>
                <div className="mode-row">
                  <button className="mode-btn active">🚚 Delivery</button>
                  <button className="mode-btn">🏪 Visit Store</button>
                </div>
              </div>

              {/* Instructions */}
              <div className="lab-section">
                <h4>Special Instructions</h4>
                <input
                  className="instruction-input"
                  placeholder="E.g. Call before arrival"
                />
              </div>

              {/* Actions */}
              <div className="lab-actions">
                <button className="confirm-order-btn">Confirm Order</button>
                <button
                  className="cancel-btn"
                  onClick={() => setOpenLabBooking(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* <p>📍 {h.location}</p>
            <p>🚑 {h.service_provider}</p>
            <p>📞 {h.ambulance_contact}</p>

<button
  className="book-btn"
  onClick={() => {
    setSelectedHospital(h);
    setOpenHospitalBooking(true);
  }}
>Book Now</button>

          </div>
        </div>
      ))}
    </div>
  </>
)} */}

        {/* FULL SCREEN OVERLAY */}
        {openConsultation && (
          <div className="consult-overlay">
            {/* Header */}
            <div className="consult-header">
              <button
                type="button"
                className="consult-back-btn"
                onClick={() => {
                  setOpenConsultation(false);
                  setOpenPaymentPopup(false);
                  setOpenConfirmedScreen(false);
                }}
              >
                ←
              </button>

              <h2 className="consult-title">Consultation Request</h2>

              <button type="button" className="consult-info-btn">
                i
              </button>
            </div>

            {/* Body */}
            <div className="consult-body">
              {/* Doctor Specialized */}
              <div className="consult-field">
                <label className="consult-label">DOCTOR SPECIALIZED</label>
                <select
                  className="consult-select"
                  value={doctorSpecialized}
                  onChange={(e) => setDoctorSpecialized(e.target.value)}
                >
                  <option value="">Select Doctor</option>

                  <option value="General Practitioner">
                    General Practitioner
                  </option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Neurologist">Neurologist</option>

                  {/* ✅ NEW SPECIALISTS */}
                  <option value="Orthopedic">Orthopedic</option>
                  <option value="Pediatrician">Pediatrician</option>
                  <option value="Dentist">Dentist</option>
                  <option value="Psychologist">Psychologist</option>
                </select>
              </div>

              {/* Description */}
              <div className="consult-field">
                <label className="consult-label">DESCRIPTION</label>
                <textarea
                  className="consult-textarea"
                  placeholder="Describe your symptoms or health concerns in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Days */}
              <div className="consult-field">
                <label className="consult-label">
                  HOW MANY DAYS ARE YOU SUFFERING?
                </label>
                <input
                  type="number"
                  className="consult-input"
                  placeholder="Enter number of days (e.g., 3)"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
              </div>

              {/* Insurance */}
              <div className="consult-field">
                <label className="consult-label">
                  DO YOU HAVE HEALTH INSURANCE?
                </label>

                <div className="consult-radio-row">
                  <button
                    type="button"
                    className={`insurance-btn ${insurance === "yes" ? "active" : ""
                      }`}
                    onClick={() => setInsurance("yes")}
                  >
                    <span className="radio-dot" />
                    Yes
                  </button>

                  <button
                    type="button"
                    className={`insurance-btn ${insurance === "no" ? "active" : ""
                      }`}
                    onClick={() => setInsurance("no")}
                  >
                    <span className="radio-dot" />
                    No
                  </button>
                </div>
              </div>

              {/* Specialist card */}
              {isFormCompleted && selectedSpecialist && (
                <>
                  <div className="specialists-header">
                    <h3>Specialists</h3>
                    <span className="nearby-pill">1 Nearby</span>
                  </div>

                  <div
                    className="specialist-card"
                    onClick={() => setSelectedDoctorId(selectedSpecialist.id)}
                    style={{
                      cursor: "pointer",
                      border:
                        selectedDoctorId === selectedSpecialist.id
                          ? "2px solid #2f6f6d"
                          : "none",
                    }}
                  >
                    <div className="specialist-img-wrap">
                      <img
                        src={selectedSpecialist.image}
                        alt={selectedSpecialist.name}
                      />

                      <div className="specialist-rating-badge">
                        <span className="star">★</span>
                        <span>{selectedSpecialist.rating}</span>
                      </div>
                    </div>

                    <div className="specialist-content">
                      <h4>{selectedSpecialist.name}</h4>
                      <p className="exp">{selectedSpecialist.experience}</p>

                      <p className="time">
                        <span className="clock">🕒</span>
                        {selectedSpecialist.availableAt}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer fixed bottom */}
            <div className="consult-footer">
              <button
                type="button"
                className={`consult-book-btn ${canBookAppointment ? "enabled" : ""
                  }`}
                disabled={!canBookAppointment}
                onClick={() => setOpenPaymentPopup(true)}
              >
                Book Appointment
              </button>
            </div>

            {/* Payment popup */}
            {openPaymentPopup && (
              <div
                className="payment-overlay"
                onClick={() => setOpenPaymentPopup(false)}
              >
                <div
                  className="payment-popup"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="payment-title">Payment Required</h2>
                  <p className="payment-subtitle">
                    Proceed to PhonePe for payment?
                  </p>

                  <div className="payment-actions">
                    <button
                      type="button"
                      className="payment-cancel"
                      onClick={() => setOpenPaymentPopup(false)}
                    >
                      CANCEL
                    </button>

                    <button
                      type="button"
                      className="payment-pay"
                      onClick={() => {
                        setOpenPaymentPopup(false);

                        setOpenConfirmedScreen(true); // open confirmed screen
                        setShowSuccessPopup(true); // open success popup also
                        setSecondsLeft(60); // reset timer to 1 minute
                      }}
                    >
                      PAY NOW
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Confirmed Screen overlay (MUST be inside consultation overlay) */}
            {openConfirmedScreen && (
              <div className="confirmed-overlay">
                <div className="confirmed-header">
                  <button
                    type="button"
                    className="confirmed-back-btn"
                    onClick={() => setOpenConfirmedScreen(false)}
                  >
                    ←
                  </button>

                  <h2 className="confirmed-title">Appointment Confirmed</h2>

                  <div style={{ width: 42 }} />
                </div>

                <div className="confirmed-body">
                  <div className="confirmed-card">
                    <div className="confirmed-check">✓</div>

                    <h1 className="confirmed-main-title">
                      Appointment Booked!
                    </h1>
                    <p className="confirmed-subtitle">
                      Payment completed successfully
                    </p>

                    <div className="confirmed-doctor-box">
                      <img
                        src={selectedSpecialist?.image}
                        alt={selectedSpecialist?.name}
                        className="confirmed-doctor-img"
                      />

                      <div>
                        <h3 className="confirmed-doctor-name">
                          {selectedSpecialist?.name}
                        </h3>
                        <p className="confirmed-doctor-spec">
                          {doctorSpecialized}
                        </p>
                        <p className="confirmed-doctor-time">
                          🕒 Scheduled at{" "}
                          {selectedSpecialist?.availableAt?.replace(
                            "Available at ",
                            "",
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="confirmed-line" />

                    <p className="confirmed-wait-text">
                      Your consultation will start in:
                    </p>

                    <div className="confirmed-timer">
                      {formatTime(secondsLeft)}
                    </div>

                    <p className="confirmed-footer-text">
                      Please wait while we prepare your session
                    </p>
                  </div>
                </div>

                <div className="confirmed-bottom">
                  <button
                    type="button"
                    className={`confirmed-wait-btn ${canJoinLive ? "enabled" : ""}`}
                    disabled={!canJoinLive}
                    onClick={() => {
                      if (!canJoinLive) return;
                      setOpenLiveScreen(true);
                    }}
                  >
                    {canJoinLive ? "Connect Online Now" : "Please Wait..."}
                  </button>
                </div>

                {showSuccessPopup && (
                  <div className="success-overlay">
                    <div className="success-popup">
                      <h2 className="success-title">Success</h2>
                      <p className="success-text">
                        Payment completed! Your appointment is booked.
                      </p>

                      <button
                        type="button"
                        className="success-ok"
                        onClick={() => setShowSuccessPopup(false)}
                      >
                        OK
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {openLiveScreen && (
              <div className="live-overlay">
                <div className="live-header">
                  <button
                    type="button"
                    className="live-back-btn"
                    onClick={() => setOpenLiveScreen(false)}
                  >
                    ←
                  </button>

                  <div className="live-title-wrap">
                    <h2 className="live-title">{selectedSpecialist?.name}</h2>
                    <p className="live-subtitle">
                      <span className="live-dot" /> LIVE CONSULTATION
                    </p>
                  </div>

                  <div style={{ width: 42 }} />
                </div>

                <div className="live-body">
                  <div className="live-video-card">
                    <img
                      className="live-main-img"
                      src={selectedSpecialist?.image}
                      alt="Doctor"
                    />

                    <div className="live-small-preview">
                      <img
                        src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80"
                        alt="User"
                      />
                    </div>

                    <div className="live-controls">
                      <button className="live-control-btn">🎤</button>
                      <button className="live-end-btn">●</button>
                      <button className="live-control-btn">📹</button>
                    </div>
                  </div>

                  <div className="live-documents">
                    <h2>Medical Documents</h2>
                    <p>View and download your digital records</p>

                    <div
                      className="live-doc-card"
                      onClick={() => setOpenPrescription(!openPrescription)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="live-doc-left">
                        <div className="live-doc-icon">📋</div>
                        <div>
                          <h3>Digital Prescription</h3>
                          <p>2 Medicines prescribed</p>
                        </div>
                      </div>
                      <button className="live-download-btn">⬇</button>
                    </div>

                    {openPrescription && (
                      <div className="prescription-expand">
                        <div className="prescription-title">
                          <span className="prescription-file">📄</span>
                          <h4>OFFICIAL MEDICINE LIST</h4>
                        </div>

                        <div className="medicine-item">
                          <h3>Amoxicillin</h3>
                          <p>500mg - Twice daily</p>
                        </div>

                        <div className="medicine-item">
                          <h3>Paracetamol</h3>
                          <p>650mg - As needed</p>
                        </div>

                        <button
                          className="order-medicine-btn"
                          onClick={() => {
                            setOpenNearbyPharmacies(true); // FULL SCREEN pharmacies
                          }}
                        >
                          👜 Order Medicines Now
                        </button>
                      </div>
                    )}

                    <div
                      className="live-doc-card"
                      onClick={() => setOpenLabTest((prev) => !prev)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="live-doc-left">
                        <div className="live-doc-icon">🔬</div>
                        <div>
                          <h3>Lab Test Requisition</h3>
                          <p>2 Tests required</p>
                        </div>
                      </div>

                      <button
                        className="live-download-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        ⬇
                      </button>
                    </div>

                    {openLabTest && (
                      <div className="lab-expand">
                        <div className="lab-title">
                          <span className="lab-file">📄</span>
                          <h4>REQUIRED LAB PROCEDURES</h4>
                        </div>

                        <div className="lab-item">
                          <h3>Complete Blood Count (CBC)</h3>
                        </div>

                        <div className="lab-item">
                          <h3>Thyroid Profile</h3>
                        </div>

                        <button
                          className="lab-btn"
                          onClick={() => {
                            setOpenNearbyLabs(true); // FULL SCREEN labs
                          }}
                        >
                          📍 Find Nearby Labs
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {openNearbyPharmacies && (
              <div className="nearby-overlay">
                <div className="nearby-header">
                  <button
                    type="button"
                    className="nearby-back-btn"
                    onClick={() => setOpenNearbyPharmacies(false)}
                  >
                    ←
                  </button>
                  <h2 className="nearby-title">Nearby Facilities</h2>
                  <div style={{ width: 42 }} />
                </div>

                <div className="nearby-tabs">
                  <button className="nearby-tab">Nearby Labs</button>
                  <button className="nearby-tab active">Pharmacies</button>
                </div>

                <div className="nearby-card">
                  <h3>Prescribed Medicines</h3>
                  <div className="nearby-medicine-pills">
                    <span>Amoxicillin</span>
                    <span>Paracetamol</span>
                  </div>
                  <p className="nearby-subtext">
                    Showing facilities matching your results
                  </p>
                </div>

                <div className="nearby-filters">
                  <button className="filter-pill active">All</button>
                  <button className="filter-pill">Nearby</button>
                  <button className="filter-pill">Ratings 4.5+</button>
                  <button className="filter-pill">Home Collect</button>
                </div>

                <div className="nearby-search">
                  <input placeholder="Search in pharmacies..." />
                </div>

                <div className="nearby-list">
                  <div className="nearby-list">
                    {pharmacies.map((item) => (
                      <div key={item.id} className="nearby-item">
                        <p className="distance">📍 {item.distance}</p>

                        <div className="nearby-item-row">
                          <div>
                            <h3>{item.name}</h3>
                            <p className="type">{item.type}</p>
                            <p className="desc">{item.medicines}</p>
                          </div>

                          <div className="rating-badge">⭐ {item.rating}</div>
                        </div>

                        <div className="nearby-bottom-row">
                          <div>
                            <p className="est">ESTIMATED DELIVERY</p>
                            <h4>{item.eta}</h4>
                          </div>

                          <button className="order-btn">
                            {item.buttonText}
                          </button>
                        </div>
                      </div>
                    ))}

                    <button className="map-btn">🗺 View on Map</button>
                  </div>
                </div>
              </div>
            )}
            {openNearbyLabs && (
              <div className="nearby-overlay">
                <div className="nearby-header">
                  <button
                    type="button"
                    className="nearby-back-btn"
                    onClick={() => setOpenNearbyLabs(false)}
                  >
                    ←
                  </button>

                  <h2 className="nearby-title">Nearby Facilities</h2>
                  <div style={{ width: 42 }} />
                </div>

                <div className="nearby-tabs">
                  <button className="nearby-tab active">Nearby Labs</button>
                  <button className="nearby-tab">Pharmacies</button>
                </div>

                <div className="nearby-card">
                  <h3>Required Lab Procedures</h3>

                  <div className="nearby-medicine-pills">
                    <span>Complete Blood Count (CBC)</span>
                    <span>Thyroid Profile</span>
                  </div>

                  <p className="nearby-subtext">
                    Showing facilities matching your results
                  </p>
                </div>

                <div className="nearby-search">
                  <input placeholder="Search in labs..." />
                </div>

                <div className="nearby-list">
                  {labs.map((item) => (
                    <div key={item.lab_id} className="nearby-item">
                      <p className="distance">📍 {item.distance_km}</p>

                      <div className="nearby-item-row">
                        <div>
                          <h3>{item.lab_name}</h3>
                          <p className="type">{item.specialization_name}</p>
                          {/* <p className="desc">{item.tests}</p> */}
                        </div>

                        <div className="rating-badge">⭐ {item.rating}</div>
                      </div>

                      <div className="nearby-bottom-row">
                        <div>
                          <p className="est">NEXT AVAILABLE SLOT</p>
                          <h4>{item.next_available}</h4>
                        </div>

                        {/* <button className="order-btn">{item.buttonText}</button> */}
                      </div>
                    </div>
                  ))}

                  <button className="map-btn">🗺 View on Map</button>
                </div>
              </div>
            )}
          </div>
        )}
        {openDoctorProfile && (
          <div
            className="profile-overlay"
            onClick={() => setOpenDoctorProfile(false)}
          >
            <div className="profile-popup" onClick={(e) => e.stopPropagation()}>
              <div className="profile-header">
                <h2>Doctor Profile</h2>
                <button
                  className="profile-close"
                  onClick={() => setOpenDoctorProfile(false)}
                >
                  ✖
                </button>
              </div>

              <div className="profile-body">
                <p>
                  <b>Name:</b> {doctorProfile.name}
                </p>
                <p>
                  <b>Speciality:</b> {doctorProfile.speciality}
                </p>
                <p>
                  <b>Hospital:</b> {doctorProfile.hospital}
                </p>
                <p>
                  <b>Experience:</b> {doctorProfile.experience}
                </p>
                <p>
                  <b>Contact:</b> {doctorProfile.contact}
                </p>

                <div className="op-time-box">
                  <p>
                    <b>OP Time:</b>
                  </p>

                  {!editOpTime ? (
                    <div className="op-time-row">
                      <span className="op-time">{doctorProfile.opTime}</span>
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setEditOpTime(true);
                          setNewOpTime(doctorProfile.opTime);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  ) : (
                    <div className="op-time-edit">
                      <input
                        type="text"
                        value={newOpTime}
                        onChange={(e) => setNewOpTime(e.target.value)}
                        placeholder="Ex: 10:00 AM - 01:00 PM"
                      />

                      <div className="op-time-actions">
                        <button
                          className="cancel-btn"
                          onClick={() => setEditOpTime(false)}
                        >
                          Cancel
                        </button>

                        <button
                          className="save-btn"
                          onClick={() => {
                            setDoctorProfile((prev) => ({
                              ...prev,
                              opTime: newOpTime,
                            }));
                            setEditOpTime(false);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {openAmbulancePopup && (
          <div
            className="ambulance-overlay"
            onClick={() => setOpenAmbulancePopup(false)}
          >
            <div
              className="ambulance-popup"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="ambulance-title">🚑 Ambulance Booking</h2>
              <p className="ambulance-subtitle">
                Emergency ambulance will reach you within <b>10-15 mins</b>.
              </p>

              <div className="ambulance-actions">
                <button
                  className="ambulance-cancel"
                  onClick={() => setOpenAmbulancePopup(false)}
                >
                  Cancel
                </button>

                <button
                  className="ambulance-confirm"
                  onClick={() => {
                    setOpenAmbulancePopup(false);
                    alert("✅ Ambulance booked successfully!");
                  }}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
        {openAmbulanceScreen && (
          <div className="ambulance-screen">
            {/* Header */}
            <div className="ambulance-header">
              <button
                className="ambulance-back-btn"
                onClick={() => setOpenAmbulanceScreen(false)}
              >
                ←
              </button>
              <h2 className="ambulance-header-title">Book Ambulance</h2>
              <div style={{ width: 42 }} />
            </div>

            {/* Body */}
            <div className="ambulance-body">
              {/* Warning */}
              <div className="ambulance-warning">
                <span className="ambulance-warning-icon">⚠</span>
                <p>
                  <b>For life-threatening emergencies, call 108 immediately</b>
                </p>
              </div>

              {/* Hospitals Found */}
              <h3 className="ambulance-found-title">
                {filteredHospitals.length} hospitals found nearby
              </h3>

              <p className="ambulance-location">📍 Hyderabad, Telangana</p>

              {/* Hospital Cards */}
              <div className="ambulance-hospital-list">
                {filteredHospitals.map((h) => (
                  <div key={h.hospital_id} className="ambulance-hospital-card">
                    <div className="ambulance-hospital-top">
                      <div className="ambulance-hospital-icon-wrap">
                        <div className="ambulance-hospital-icon">✚</div>
                      </div>

                      <div className="ambulance-hospital-info">
                        <h2>{h.hospital_name}</h2>
                        <p className="ambulance-hospital-type">
                          {h.specialty_type}
                        </p>
                      </div>
                    </div>

                    <div className="ambulance-details">
                      <p>📍 {h.location}</p>
                      <p>🚑 {h.service_provider}</p>
                      <p>✅ {h.availability_status}</p>
                      <p>📞 {h.ambulance_contact}</p>
                    </div>

                    <div className="ambulance-actions-row">
                      <button
                        className="ambulance-call-btn"
                        onClick={() =>
                          window.open(`tel:${h.ambulance_contact}`)
                        }
                      >
                        📞 Call
                      </button>

                      <button
                        className="ambulance-book-btn"
                        onClick={() =>
                          alert(`✅ Ambulance booked from ${h.hospital_name}`)
                        }
                      >
                        Book Now →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {openHospitalBooking && selectedNearbyHospital && (
          <div
            className="profile-overlay"
            onClick={() => setOpenHospitalBooking(false)}
          >
            <div className="profile-popup" onClick={(e) => e.stopPropagation()}>
              <h2 className="popup-title">Booking Details</h2>

              <div className="popup-section">
                <label>Appointment Date</label>

                <input
                  type="date"
                  className="date-picker"
                  value={bookingDate}
                  min={todayISO}
                  onChange={(e) => {
                  setBookingDate(e.target.value);
                  setBookingTime("");        // 🔥 reset
                  setNeedAmbulance("");      // 🔥 reset
                  setShowTimeDropdown(false);

                    }}
                />

              </div>

<div className="popup-section">
  <label>Select Time</label>

  {/* Time Picker Input */}
  <div
    className={`time-picker ${!canSelectTime ? "disabled" : ""}`}
    onClick={() => {
      if (!canSelectTime) return;
      setShowTimeDropdown((prev) => !prev);
    }}
  >
    <span className={bookingTime ? "value" : "placeholder"}>
      {bookingTime || "Tap to select time"}
    </span>
    <span className="time-arrow">▾</span>
  </div>

  {/* Time Dropdown */}
  {showTimeDropdown && canSelectTime && (
    <div className="time-dropdown">
      {generateTimeSlots().map((slot) => {
        const isToday = bookingDate === todayISO;
        const isFuture =
          !isToday || isFutureSlot(slot, new Date(bookingDate));

        if (!isFuture) return null;

        return (
          <div
            key={slot}
            className={`time-option ${
              bookingTime === slot ? "active" : ""
            }`}
onClick={() => {
  setBookingTime(slot);
  setNeedAmbulance("");
  setPickupTime("");           // 🔥 reset pickup
  setShowTimeDropdown(false);
}}
          >
            {slot}
          </div>
        );
      })}
    </div>
  )}
</div>

{/* 🚑 Ambulance Required */}
{needAmbulance === "" && (
  <div className="popup-section">
    <label>Ambulance Required?</label>

    <div className="pill-row">
      <button
        disabled={!canSelectAmbulance}
        onClick={() => setNeedAmbulance("Yes")}
      >
        Yes
      </button>

      <button
        disabled={!canSelectAmbulance}
        onClick={() => setNeedAmbulance("No")}
      >
        No
      </button>
    </div>
  </div>
)}


{/* 🚑 Pickup Time — only if Ambulance = Yes */}
{needAmbulance === "Yes" && (
  <div className="popup-section">
    <label>Pickup Time</label>

    <div
      className="time-picker"
      onClick={() => setShowPickupDropdown((p) => !p)}
    >
      <span className={pickupTime ? "value" : "placeholder"}>
        {pickupTime || "Tap to select pickup time"}
      </span>
      <span className="time-arrow">▾</span>
    </div>

    {showPickupDropdown && (
      <div className="time-dropdown">
        {generateTimeSlots().map((slot) => {
         // For pickup time:
          // ❗ Only rule → must be BEFORE appointment time
          const isValid = isBeforeAppointmentTime(slot, bookingTime);

          if (!isValid) return null;

          if (!isValid) return null;

          return (
            <div
              key={slot}
              className={`time-option ${
                pickupTime === slot ? "active" : ""
              }`}
              onClick={() => {
                setPickupTime(slot);
                setShowPickupDropdown(false);
              }}
            >
              {slot}
            </div>
          );
        })}
      </div>
    )}
  </div>
)}


<button
  className="confirm-btn"
  disabled={!canConfirmHospitalBooking}
  onClick={() => {
    if (!canConfirmHospitalBooking) return;
    setOpenHospitalBooking(false);
       setOpenHospitalDoctors(true)
  
  }}
>
  Confirm Booking
</button>

           

              <button
                className="cancel-btn"
                onClick={() =>{ setOpenHospitalBooking(false)
                  }


                }
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* {openHospitalSuccess && (
          <div className="profile-overlay">
            <div className="success-popup">
              <h2>Booking Confirmed ✅</h2>

              <p>Hospital: {selectedNearbyHospital?.hospital_name}</p>
              <p>Speciality: {selectedNearbyHospital?.specialty_type}</p>
              <p>Date: {bookingDate}</p>
              <p>Time: {bookingTime}</p>
              <p>Price: ${selectedNearbyHospital?.price}/hr</p>
              <p>Ambulance: {needAmbulance}</p>

       
              <button
                className="view-doctors-btn"
                onClick={() => {
               

              
                  setOpenHospitalSuccess(false);
                  setOpenHospitalDoctors(true);
                
                }}
              >
                VIEW HOSPITAL DOCTORS
              </button>
            </div>
          </div>
        )} */}

        {/* 
{openHospitalSuccess && selectedHospital && (
  <div className="profile-overlay">
    <div className="success-popup">
      <h2>Booking Confirmed ✅</h2>

      <p><b>Hospital:</b> {selectedNearbyHospital.hospital_name}</p>
      <p><b>Speciality:</b> {selectedHospital.specialty_type}</p>
      <p><b>Date:</b> {bookingDate}</p>
      <p><b>Time:</b> {bookingTime}</p>
      <p><b>Price:</b> $150/hr</p>
      <p><b>Ambulance:</b> {needAmbulance}</p>

      <button
        className="view-doctors-btn"
        onClick={() => {
          setOpenHospitalSuccess(false);
          setConsultMode("online");
        }}
      >
        VIEW HOSPITAL DOCTORS
      </button>
    </div>
  </div>
)} */}

        {openOfflinePopup && (
          <div
            className="profile-overlay"
            onClick={() => setOpenOfflinePopup(false)}
          >
            <div className="profile-popup" onClick={(e) => e.stopPropagation()}>
              <div className="profile-header">
                <h2>Offline Consultation</h2>

                <button
                  className="profile-close"
                  onClick={() => setOpenOfflinePopup(false)}
                >
                  ✖
                </button>
              </div>

              <div className="profile-body">
                {/* 1) Consultation Time */}
                <div className="op-time-box">
                  <p>
                    <b>What is your consultation time?</b>
                  </p>

                  {!editOfflineTime ? (
                    <div className="op-time-row">
                      <span className="op-time">{doctorProfile.opTime}</span>

                      <button
                        className="edit-btn"
                        onClick={() => {
                          setEditOfflineTime(true);
                          setTempOfflineTime(doctorProfile.opTime);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  ) : (
                    <div className="op-time-edit">
                      <input
                        type="text"
                        value={tempOfflineTime}
                        onChange={(e) => setTempOfflineTime(e.target.value)}
                        placeholder="Ex: 10:00 AM - 01:00 PM"
                      />

                      <div className="op-time-actions">
                        <button
                          className="cancel-btn"
                          onClick={() => setEditOfflineTime(false)}
                        >
                          Cancel
                        </button>

                        <button
                          className="save-btn"
                          onClick={() => {
                            setDoctorProfile((prev) => ({
                              ...prev,
                              opTime: tempOfflineTime,
                            }));
                            setEditOfflineTime(false);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2) Book Ambulance Button */}
                <button
                  type="button"
                  className="emergency-btn"
                  style={{ width: "100%", marginTop: "14px" }}
                  onClick={() => {
                    setOpenOfflinePopup(false);
                    setOpenAmbulanceScreen(true);
                  }}
                >
                  Book Ambulance Now →
                </button>
              </div>
            </div>
          </div>
        )}
        {openOnlinePopup && (
          <div
            className="profile-overlay"
            onClick={() => setOpenOnlinePopup(false)}
          >
            <div className="profile-popup" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="profile-header">
                <h2>Online Consultation</h2>
                <button
                  className="profile-close"
                  onClick={() => setOpenOnlinePopup(false)}
                >
                  ✖
                </button>
              </div>

              {/* Body */}
              <div className="profile-body">
                <p style={{ fontWeight: 800, marginBottom: "12px" }}>
                  Available Doctors
                </p>

                <div className="online-doctor-list">
                  {doctors.map((doc) => (
                    <div key={doc.id} className="online-doctor-card">
                      <div className="online-doc-top">
                        <img src={doc.image} alt={doc.name} />
                        <div>
                          <h4>{doc.name}</h4>
                          <p className="spec">{doc.speciality}</p>
                          <p className="rating">⭐ {doc.rating}</p>
                        </div>
                      </div>

                      {/* Slots */}
                      <div className="online-slots">
                        {doc.slots.map((slot) => (
                          <span key={slot} className="slot-pill">
                            {slot}
                          </span>
                        ))}
                      </div>

                      {/* Book */}
                      <button
                        className="online-book-btn"
                        onClick={() => {
                          setBookedDoctorName(doc.name);
                          setOpenOnlinePopup(false);
                          setOnlineSuccessPopup(true);
                        }}
                      >
                        Book Now →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {onlineSuccessPopup && (
          <div className="success-overlay">
            <div className="success-popup">
              <h2 className="success-title">Success ✅</h2>

              <p className="success-text">
                Your online consultation is booked with{" "}
                <b>{bookedDoctorName}</b>.
              </p>

              <button
                type="button"
                className="success-ok"
                onClick={() => setOnlineSuccessPopup(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}

        {/* ✅ HOSPITAL DOCTORS SCREEN (ADD HERE) */}
        {/* {openHospitalDoctors && (
          <div className="doctor-list-screen">
            <div className="doctor-list-header">
              <button
                className="back-btn"
                onClick={() => setOpenHospitalDoctors(false)}
              >
                ←
              </button>

              <h2 className="doctor-list-title">
                {selectedNearbyHospital?.hospital_name} Doctors
              </h2>
            </div>

            {hospitalDoctors.map((doc) => (
              <div
                key={doc.id}
                className="hospital-doctor-card"
                onClick={() => setSelectedDoctor(doc)}
              >
                <div className="hospital-doctor-left">
                  <img src={doc.image} alt={doc.name} />

                  <div className="hospital-doctor-info">
                    <h3>{doc.name}</h3>
                    <p className="spec">{doc.speciality}</p>

                    <div className="rating-pill">⭐ {doc.rating}</div>
                  </div>
                </div>

                <div className="arrow-circle">→</div>
              </div>
            ))}
          </div>
        )} */}
        {openHospitalDoctors && (
  <div className="doctor-list-screen">
    <div className="doctor-list-header">
      <button
        className="back-btn"
        onClick={() => setOpenHospitalDoctors(false)}
      >
        ←
      </button>

      <h2 className="doctor-list-title">
        {selectedNearbyHospital?.hospital_name} Doctors
      </h2>
    </div>

    {hospitalDoctors.map((doc) => (
      <div
        key={doc.id}
        className="hospital-doctor-card"
        onClick={() => setSelectedDoctor(doc)}
      >
        <div className="hospital-doctor-left">
          <img src={doc.image} alt={doc.name} />

          <div className="hospital-doctor-info">
            <h3>{doc.name}</h3>

            <p className="spec">{doc.speciality}</p>

            <p className="exp">
              {doc.experience} years experience
            </p>

            <div className="rating-row">
              <span>⭐ {doc.rating}</span>
              <span className="dot">•</span>
              <span className={doc.available ? "available" : "unavailable"}>
                {doc.available ? "Available" : "Not Available"}
              </span>
            </div>

            <p className="price">₹{doc.price}/hr</p>
          </div>
        </div>

        <div className="arrow-circle">→</div>
      </div>
    ))}
  </div>
)}


        {selectedDoctor && (
          <div className="doctor-profile-screen">
            <div className="doctor-profile-header">
              <button onClick={() => setSelectedDoctor(null)}>←</button>
              <h2>Doctor Profile</h2>
            </div>

            <div className="doctor-profile-card">
              <img src={selectedDoctor.image} />
              <h2>{selectedDoctor.name}</h2>
              <p className="spec">{selectedDoctor.speciality}</p>
              <p className="rating">⭐ {selectedDoctor.rating}</p>

              <div className="stats">
                <div>
                  <p>Exp.</p>
                  <b>{selectedDoctor.experience}</b>
                </div>
                <div>
                  <p>Patients</p>
                  <b>{formatPatients(selectedDoctor.patients)}</b>
                </div>
              </div>
            </div>

            <h3>Biography</h3>
            <p className="bio">{selectedDoctor.bio}</p>

            {/* Personal Care Assistant */}
            <div className="assistant-box">
              <div className="assistant-header">
                <span>Personal Care Assistant</span>
                <span className="price">+₹25</span>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={patientAssist === "yes"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setShowAssistantPopup(true); // 🔥 OPEN POPUP
                    } else {
                      setPatientAssist("no");
                      setSelectedAssistant(null);
                    }
                  }}
                />
                <span className="slider" />
              </label>

              <ul>
                <li>✔ Queue Management</li>
                <li>✔ Lab Report Collection</li>
              </ul>
            </div>

            {patientAssist === "yes" && selectedAssistant && (
              <div className="assistant-selected-card">
                <img
                  src={selectedAssistant.image}
                  alt={selectedAssistant.name}
                  className="assistant-avatar"
                />

                <div className="assistant-details">
                  <h4>{selectedAssistant.name}</h4>
                  <p className="assistant-role">{selectedAssistant.role}</p>

                  <div className="assistant-meta">
                    <span>⭐ {selectedAssistant.rating}</span>
                    <span>📞 +91 98XXX 12XXX</span>
                  </div>
                </div>

                <span className="assistant-badge">Assigned</span>
              </div>
            )}

            <button className="confirm-btn">Book Appointment</button>
          </div>
        )}

        {showAssistantPopup && (
          <div className="assistant-overlay">
            <div className="assistant-popup">
              <h2>Select Care Assistant</h2>
              <p className="subtitle">Choose an assistant for your visit</p>

              <div className="assistant-list">
                {assistants.map((a) => (
                  <div
                    key={a.id}
                    className={`assistant-card ${selectedAssistant?.id === a.id ? "active" : ""
                      }`}
                    onClick={() => setSelectedAssistant(a)}
                  >
                    <img src={a.image} alt={a.name} />
                    <div>
                      <h4>{a.name}</h4>
                      <p>{a.role}</p>
                      <span>⭐ {a.rating}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="assistant-confirm">
                <button
                  className="no-btn"
                  onClick={() => {
                    setShowAssistantPopup(false);
                    setPatientAssist("no");
                    setSelectedAssistant(null);
                  }}
                >
                  No
                </button>

                <button
                  className="yes-btn"
                  disabled={!selectedAssistant}
                  onClick={() => {
                    setPatientAssist("yes");
                    setShowAssistantPopup(false);
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}

        {openAppointmentScreen && appointmentDoctor && (
          <div className="appointment-overlay">
            {/* Header */}
            <div className="appointment-header">
              <button
                className="back-btn"
                onClick={() => setOpenAppointmentScreen(false)}
              >
                ←
              </button>
              <h2>Choose Appointment Time</h2>
              <div style={{ width: 32 }} />
            </div>

            {/* Doctor Card */}
            <div className="appointment-doctor-card">
              <img src={appointmentDoctor.image}
                onError={(e) => {
                  e.currentTarget.src = defaultImages[1]
                }}
              />
              <div>
                <h3>{appointmentDoctor.name}</h3>
                <p>{appointmentDoctor.speciality}</p>
                <span>⭐ {appointmentDoctor.rating}</span>
              </div>
            </div>

            {/* Date */}
            <div className="appointment-date-header">
              <h3>Select Date</h3>
              <span
                className="month-selector"
                onClick={() => setShowMonthPicker(true)}
              >
                {months[currentMonth.getMonth()]}
                <span className="month-arrow">▼</span>
              </span>

              {showMonthPicker && (
                <div
                  className="month-popup-overlay"
                  onClick={() => setShowMonthPicker(false)}
                >
                  <div
                    className="month-popup"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="month-popup-title">Select Month</h3>

                    <div className="month-popup-list">
                      {months.map((m, index) => {
                        const now = new Date();
                        const monthDate = new Date(now.getFullYear(), index, 1);

                        // ❌ Hide past months
                        if (
                          monthDate <
                          new Date(now.getFullYear(), now.getMonth(), 1)
                        ) {
                          return null;
                        }

                        return (
                          <div
                            key={m}
                            className="month-popup-item"
                            onClick={() => {
                              setCurrentMonth(
                                new Date(currentMonth.getFullYear(), index, 1),
                              );
                              setShowMonthPicker(false);
                            }}
                          >
                            {m}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="date-scroll">
              {generateDates().map((date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                // ❌ Skip past dates
                if (date < today) return null;

                const isActive =
                  date.toDateString() === selectedDate.toDateString();

                return (
                  <div
                    key={date.toDateString()}
                    className={`date-box ${isActive ? "active" : ""}`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <span>
                      {date.toLocaleDateString("en-US", { weekday: "short" })}
                    </span>
                    <b>{date.getDate()}</b>
                  </div>
                );
              })}
            </div>

            {/* Morning */}
            <h4 className="slot-title">☀ Morning</h4>
            <div className="slots">
              {["10:00 AM", "10:30 AM", "11:30 AM"].map((time) => {
                const isToday =
                  selectedDate.toDateString() === new Date().toDateString();

                const isAvailable =
                  !isToday || isFutureSlot(time, selectedDate);

                return (
                  <button
                    key={time}
                    className={`slot-btn 
        ${selectedTime === time ? "active" : ""}
        ${!isAvailable ? "disabled" : ""}
      `}
                    disabled={!isAvailable}
                    onClick={() => {
                      if (!isAvailable) return;
                      setSelectedTime(time);
                    }}
                  >
                    {time}
                  </button>
                );
              })}
            </div>

            {/* Afternoon */}
            <h4 className="slot-title">☀ Afternoon</h4>
            <div className="slots">
              {["12:30 PM", "02:00 PM", "03:30 PM", "04:00 PM"].map((time) => {
                const isToday =
                  selectedDate.toDateString() === new Date().toDateString();

                const isAvailable =
                  !isToday || isFutureSlot(time, selectedDate);

                return (
                  <button
                    key={time}
                    className={`slot-btn 
        ${selectedTime === time ? "active" : ""}
        ${!isAvailable ? "disabled" : ""}
      `}
                    disabled={!isAvailable}
                    onClick={() => {
                      if (!isAvailable) return;
                      setSelectedTime(time);
                    }}
                  >
                    {time}
                  </button>
                );
              })}
            </div>

            {/* Evening */}
            <h4 className="slot-title">🌙 Evening</h4>
            <div className="slots">
              {["06:00 PM", "06:30 PM", "07:30 PM"].map((time) => {
                const isToday =
                  selectedDate.toDateString() === new Date().toDateString();

                const isAvailable =
                  !isToday || isFutureSlot(time, selectedDate);

                return (
                  <button
                    key={time}
                    className={`slot-btn 
        ${selectedTime === time ? "active" : ""}
        ${!isAvailable ? "disabled" : ""}
      `}
                    disabled={!isAvailable}
                    onClick={() => {
                      if (!isAvailable) return;
                      setSelectedTime(time);
                    }}
                  >
                    {time}
                  </button>
                );
              })}
            </div>

            {/* Confirm */}
            <button
              className="confirm-appointment-btn"
              disabled={!selectedTime}
              // onClick={() => {
               
              //   setOpenAppointmentScreen(false); // 🔥 CLOSE booking screen
              //   setShowConfirmPopup(true); // 🔥 OPEN confirm popup
              //   handleConfirmAppointment();
              // }}
               onClick={handleConfirmAppointment}
            >
              Confirm Appointment
            </button>
          </div>
        )}

        {showConfirmPopup && !paymentCompleted && (
          <div
            className="confirm-overlay"
            onClick={() => setShowConfirmPopup(false)}
          >
            <div className="confirm-sheet" onClick={(e) => e.stopPropagation()}>
              <div className="sheet-handle" />

              <h2 className="confirm-title">Appointment Confirmed! 🎉</h2>
              <p className="confirm-sub">
                Your slot is reserved. Please complete payment to confirm.
              </p>

              {/* Doctor Card */}
              <div className="confirm-doctor-card">
                <img src={appointmentDoctor?.image} alt="doctor"
                  onError={(e) => {
                    e.currentTarget.src = defaultImages[1]
                  }}
                />
                <div>
                  <span className="doc-type">CARDIOLOGIST</span>
                  <h3>{appointmentDoctor?.name}</h3>
                  <p>St. Mary's Hospital</p>
                </div>
              </div>

              {/* Info Rows */}
              <div className="confirm-info">

                {bookedAppointment && (
  <>
    <div className="info-row">
      📅{" "}
      <b>
        {new Date(bookedAppointment.appointment_time).toLocaleDateString(
          "en-IN",
          {
            timeZone: "Asia/Kolkata",
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )}
      </b>
    </div>

    <div className="info-row">
      ⏰{" "}
      <b>
        {new Date(bookedAppointment.appointment_time).toLocaleTimeString(
          "en-IN",
          {
            timeZone: "Asia/Kolkata",   // 🔥 THIS is the fix
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }
        )}
      </b>{" "}
      <span>(IST)</span>
    </div>
  </>
)}











              
                <div className="info-row">🎥 Online Video Consultation</div>
              </div>

              {/* Pay Button */}
              <button
                className="pay-btn"
                onClick={handlePayNow}
                disabled={payLoading}
              >
                Pay Now ($50.00)
              </button>

              <button
                className="cancel-link"
                onClick={() => {
                  setShowConfirmPopup(false);
                  setSelectedTime(null);
                }}
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        )}

        {openPaymentSuccess && (
          <div className="pay-mobile-screen">
            {/* HEADER */}
            <div className="pay-mobile-header">
              <button
                className="pay-mobile-close"
                onClick={() => setOpenPaymentSuccess(false)}
              >
                ✕
              </button>
              <div style={{ width: 24 }} />
            </div>

            {/* CONTENT */}
            <div className="pay-mobile-content">
              {/* SUCCESS ICON */}
              <div className="pay-mobile-check">✓</div>

              <h1 className="pay-mobile-title">Payment Successful!</h1>
              <p className="pay-mobile-sub">
                Your appointment with <b>Dr. Sarah Jenkins</b> is confirmed.
              </p>

              {/* CARD */}
              <div className="pay-mobile-card">
                {/* AMOUNT */}
                <div className="pay-mobile-amount">
                  <p className="label">TOTAL AMOUNT PAID</p>
                  <h1>₹50</h1>
                </div>

                {/* TRANSACTION */}
                <div className="pay-mobile-row">
                  <span>Transaction ID</span>
                  <span className="bold">#pay_SBBYHLSboGNNcj</span>
                </div>

                <div className="pay-mobile-divider" />

                {/* DOCTOR */}
                <div className="pay-mobile-doctor">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Doctor"
                  />
                  <div>
                    <h4>Dr. Sarah Jenkins</h4>
                    <p>Specialist</p>
                  </div>
                </div>

                {/* DATE & TIME */}
                <div className="pay-mobile-slots">
                  <div className="slot">📅 2 February 2026</div>
                  <div className="slot">🕒 12:30 PM</div>
                </div>
              </div>

              {/* CTA */}
              <button className="pay-mobile-btn">Call scheduled</button>

              <p className="pay-mobile-footer">
                You can join the consultation from <b>My Bookings</b> at the
                scheduled time.
              </p>
            </div>
          </div>
        )}

      {openMyBookings && (
  <div
    className="bookings-overlay"
    onClick={() => setOpenMyBookings(false)}
  >
    <div
      className="bookings-popup"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="bookings-header">
        <h2>My Bookings</h2>
        <button
          className="close-btn"
          onClick={() => setOpenMyBookings(false)}
        >
          ✖
        </button>
      </div>

      {/* Booking Cards */}
      {!loadingBookings && appointments.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        appointments.map((appt) => {
          const apptDate = new Date(appt.appointment_time);

          const formattedDate = apptDate.toLocaleDateString("en-IN", {
            timeZone: "Asia/Kolkata",
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          const formattedTime = apptDate.toLocaleTimeString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          return (
            <div className="booking-card" key={appt.id}>
              <h3 className="booking-name">{appt.doctor_name}</h3>

              {/* Date */}
              <div className="booking-date">
                📅 <b>{formattedDate}</b>
              </div>

              {/* Time */}
              <div className="booking-time">
                ⏰ <b>{formattedTime}</b> <span>(IST)</span>
              </div>

              {canJoinCall(appt.appointment_time) && appt.call_booking_status === "CALL_PENDING" ? (
  <button
    className="booking-status join-call"
    onClick={() => handleJoinCall(appt)}
  >
    Join Call
  </button>
) : (
  <button className="booking-status">{appt.call_booking_status}</button>
)}



              <div className="booking-steps">
                <div className={`step ${appt.status === "PENDING" ? "active" : ""}`}>
                  <span>📅</span>
                  <p>Booked</p>
                </div>

                <div className="line"></div>
                
<div className={`step ${appt.call_booking_status === "Consulted" ? "active" : ""}`}>
  <span>💬</span>
  <p>Consulted</p>
</div>


                <div className="line"></div>

                <div className="step">
                  <span>💊</span>
                  <p>Medications</p>
                </div>

                <div className="line"></div>

                <div className="step">
                  <span>🧪</span>
                  <p>Lab Tests</p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  </div>
)}

{inCall && activeCallAppointment && (
  <div className="call-overlay">
    <div className="call-screen">
      <h2>Video Consultation</h2>
      <p>
        With <b>{activeCallAppointment.doctor_name}</b>
      </p>
     <div className="jitsi-wrapper">
      <JitsiMeeting
        domain="meet.jit.si"
        roomName={`healthcare-appointment-${activeCallAppointment.id}`}
        configOverwrite={{
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          prejoinPageEnabled: false,
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        }}
        getIFrameRef={(iframe) => {
          iframe.style.height = "100%";
          iframe.style.width = "100%";
        }}
      />
      </div>
      <button className="end-call-btn" onClick={handleEndCall}>
        🔴 End Call
      </button>
    </div>
  </div>
)}



      </div>
    </>
  );
};

export default HealthCare;
