import type { IconType } from "react-icons";
export type ServiceType = 'scooty' | 'bike' | 'car' | 'xl_car' | 'parcel' | 'metro';
export type RideStatus = 'completed' | 'cancelled' | 'in_progress';
export type NotificationType = 'payment' | 'promo' | 'ride_request' | 'alert' | 'system';
export type TabType = 'home' | 'rides' | 'earnings' | 'notifications' | 'profile';
export type FilterService = 'all' | ServiceType;
export type StatusFilter = 'all' | RideStatus;

export interface ServiceConfig {
  label: string;
  bgColor: string;
  color: string;
 icon: IconType;
}

export interface Ride {
  id: string;
  serviceType: ServiceType;
  pickup: string;
  dropoff: string;
  distance: string;
  duration: string;
  fare: number;
  paymentMethod?: string;
  status: RideStatus;
  date: string;
  time: string;
  customerName?: string;
  customerRating?: number;
  tip?: number;
  parcelDescription?: string;
  parcelWeight?: string;
  metroLine?: string;
  platform?: string;
}

export interface ActiveRide extends Omit<Ride, 'date' | 'time'> {
  estimatedArrival: string;
  otp?: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  amount?: number;
  serviceType?: ServiceType;
}

export interface EarningsSummary {
  today: number;
  thisWeek: number;
  thisMonth: number;
  todayRides: number;
  weekRides: number;
  monthRides: number;
  todayHours: number;
  avgPerRide: number;
  byServiceType: Record<ServiceType, { amount: number; rides: number }>;
}

export interface DailyEarnings {
  date: string;
  amount: number;
}
