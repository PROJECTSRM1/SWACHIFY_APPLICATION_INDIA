import type {
  ServiceType,
  ServiceConfig,
  Ride,
  Notification,
  EarningsSummary,
  DailyEarnings,
  ActiveRide,
} from './JRPtypes';
import { FaCar, FaMotorcycle, FaTruck, FaBox, FaCompass } from "react-icons/fa";



export const SERVICE_CONFIG: Record<ServiceType, ServiceConfig> = {
  scooty: {
    label: 'Scooty',
    bgColor: '#ECFDF5',
    color: '#059669',
    icon: FaMotorcycle,
  },
  bike: {
    label: 'Bike',
    bgColor: '#ECFDF5',
    color: '#059669',
    icon: FaMotorcycle,
  },
  car: {
    label: 'Car',
    bgColor: '#EFF6FF',
    color: '#2563EB',
    icon: FaCar,
  },
  xl_car: {
    label: 'XL Car',
    bgColor: '#EEF2FF',
    color: '#6366F1',
    icon: FaTruck,
  },
  parcel: {
    label: 'Parcel',
    bgColor: '#FEF3C7',
    color: '#D97706',
    icon: FaBox,
  },
  metro: {
    label: 'Metro',
    bgColor: '#F5F3FF',
    color: '#7C3AED',
    icon: FaCompass,
  },
};


export const MOCK_RIDES: Ride[] = [
  {
    id: '1',
    serviceType: 'car',
    pickup: 'Koramangala 5th Block',
    dropoff: 'MG Road Metro Station',
    distance: '5.2 km',
    duration: '18 min',
    fare: 185,
    paymentMethod: 'cash',
    status: 'completed',
    date: '2025-01-27',
    time: '09:30 AM',
    customerName: 'Priya Sharma',
    customerRating: 4.9,
    tip: 20,
  },
  {
    id: '2',
    serviceType: 'bike',
    pickup: 'Indiranagar',
    dropoff: 'HSR Layout',
    distance: '3.8 km',
    duration: '12 min',
    fare: 95,
    paymentMethod: 'upi',
    status: 'completed',
    date: '2025-01-27',
    time: '08:45 AM',
    customerName: 'Amit Kumar',
    customerRating: 5.0,
  },
  {
    id: '3',
    serviceType: 'parcel',
    pickup: 'Jayanagar 4th Block',
    dropoff: 'BTM Layout',
    distance: '4.5 km',
    duration: '15 min',
    fare: 120,
    paymentMethod: 'cash',
    status: 'completed',
    date: '2025-01-26',
    time: '06:15 PM',
    parcelDescription: 'Documents',
    parcelWeight: '0.5 kg',
  },
  {
    id: '4',
    serviceType: 'car',
    pickup: 'Whitefield',
    dropoff: 'Electronic City',
    distance: '12.5 km',
    duration: '28 min',
    fare: 0,
    paymentMethod: 'upi',
    status: 'cancelled',
    date: '2025-01-26',
    time: '04:30 PM',
    customerName: 'Rahul Verma',
  },
  {
    id: '5',
    serviceType: 'bike',
    pickup: 'Marathahalli',
    dropoff: 'Bellandur',
    distance: '6.2 km',
    duration: '15 min',
    fare: 0,
    paymentMethod: 'cash',
    status: 'cancelled',
    date: '2025-01-26',
    time: '02:15 PM',
    customerName: 'Sneha Reddy',
  },
  {
    id: '6',
    serviceType: 'scooty',
    pickup: 'BTM Layout',
    dropoff: 'Koramangala',
    distance: '2.8 km',
    duration: '10 min',
    fare: 65,
    paymentMethod: 'upi',
    status: 'completed',
    date: '2025-01-26',
    time: '11:20 AM',
    customerName: 'Aisha Khan',
    customerRating: 4.8,
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'payment',
    title: 'Payment Received',
    message: 'You received ₹185 for your ride to MG Road',
    time: '5 min ago',
    read: false,
    amount: 185,
    serviceType: 'car',
  },
  {
    id: '2',
    type: 'promo',
    title: 'Special Bonus!',
    message: 'Complete 5 more rides today to earn ₹500 bonus',
    time: '1 hour ago',
    read: false,
  },
];

export const MOCK_EARNINGS_SUMMARY: EarningsSummary = {
  today: 2450,
  thisWeek: 12800,
  thisMonth: 48500,
  todayRides: 12,
  weekRides: 58,
  monthRides: 245,
  todayHours: 8,
  avgPerRide: 204,
  byServiceType: {
    car: { amount: 25000, rides: 102 },
    bike: { amount: 8500, rides: 78 },
    scooty: { amount: 5200, rides: 45 },
    xl_car: { amount: 6800, rides: 12 },
    parcel: { amount: 2400, rides: 6 },
    metro: { amount: 600, rides: 2 },
  },
};

export const MOCK_DAILY_EARNINGS: DailyEarnings[] = [
  { date: '2025-01-21', amount: 1850 },
  { date: '2025-01-22', amount: 2100 },
  { date: '2025-01-23', amount: 1650 },
  { date: '2025-01-24', amount: 2350 },
  { date: '2025-01-25', amount: 1900 },
  { date: '2025-01-26', amount: 2500 },
  { date: '2025-01-27', amount: 2450 },
];

export const generateRideRequest = (
  serviceType: ServiceType
): Omit<ActiveRide, 'id'> => {
  const pickups = ['Koramangala', 'Indiranagar', 'Whitefield', 'HSR Layout', 'BTM'];
  const dropoffs = ['MG Road', 'Jayanagar', 'Electronic City', 'Marathahalli', 'Bellandur'];

  return {
    serviceType,
    pickup: pickups[Math.floor(Math.random() * pickups.length)],
    dropoff: dropoffs[Math.floor(Math.random() * dropoffs.length)],
    distance: `${(Math.random() * 10 + 1).toFixed(1)} km`,
    duration: `${Math.floor(Math.random() * 30 + 5)} min`,
    fare: Math.floor(Math.random() * 300 + 100),
    paymentMethod: Math.random() > 0.5 ? 'cash' : 'upi',
    status: 'in_progress',
    estimatedArrival: `${Math.floor(Math.random() * 10 + 2)} min`,
    customerName: ['Amit', 'Priya', 'Rajesh', 'Neha'][Math.floor(Math.random() * 4)],
    customerRating: Number((Math.random() * 0.5 + 4.5).toFixed(1)),
    otp: Math.floor(1000 + Math.random() * 9000).toString(),
  };
};
