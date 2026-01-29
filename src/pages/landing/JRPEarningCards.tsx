import React, { type JSX } from 'react';
import './JustRidePartnerDashboard.css';
import { FaArrowUp } from 'react-icons/fa'; // Using react-icons for trending icon


interface EarningsCardProps {
  todayEarnings: number;
  weeklyEarnings: number;
  ridesCompleted: number;
  hoursOnline: number;
}

export const EarningsCard: React.FC<EarningsCardProps> = ({
  todayEarnings,
  weeklyEarnings,
  ridesCompleted,
  hoursOnline,
}) => {
  return (
    <div className="earnings-card">
      {/* Header */}
      <div className="earnings-header">
        <div>
          <div className="earnings-label">Today's Earnings</div>
          <div className="earnings-amount">
            <span className="rupee-symbol">₹</span>
            <span className="earnings-value">{todayEarnings.toLocaleString()}</span>
          </div>
        </div>
        <div className="trending-badge">
          <FaArrowUp size={14} color="#FFF" />
          <span className="trending-text">+12%</span>
        </div>
      </div>

      {/* Stats */}
      <div className="earnings-stats">
        <div className="stat-item">
          <div className="stat-value">{ridesCompleted}</div>
          <div className="stat-label">RIDES</div>
        </div>
        <div className="stat-item stat-border">
          <div className="stat-value">{hoursOnline}h</div>
          <div className="stat-label">ONLINE</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">₹{weeklyEarnings}</div>
          <div className="stat-label">THIS WEEK</div>
        </div>
      </div>
    </div>
  );
};






// QuickStats


import './JustRidePartnerDashboard.css';
import { FaStar, FaCompass, FaClock, FaBolt } from 'react-icons/fa';

interface QuickStatsProps {
  rating: number;
  acceptance: number;
  cancellation: number;
  streak: number;
}

export const QuickStats: React.FC<QuickStatsProps> = ({
  rating,
  acceptance,
  cancellation,
  streak,
}) => {
  const stats = [
    { icon: <FaStar />, value: rating.toFixed(1), label: 'Rating', color: '#F59E0B' },
    { icon: <FaCompass />, value: `${acceptance}%`, label: 'Accept', color: '#10B981' },
    { icon: <FaClock />, value: `${cancellation}%`, label: 'Cancel', color: '#64748B' },
    { icon: <FaBolt />, value: streak.toString(), label: 'Streak', color: '#8B5CF6' },
  ];

  return (
    <div className="quick-stats">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-card">
          <div className="stat-icon" style={{ color: stat.color }}>
            {stat.icon}
          </div>
          <div className="stat-card-value">{stat.value}</div>
          <div className="stat-card-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};




import { FaTh, FaCircle, FaSquare, FaBox } from 'react-icons/fa';

type FilterService =
  | 'all'
  | 'bike'
  | 'scooty'
  | 'car'
  | 'xl_car'
  | 'parcel'
  | 'metro';

interface ServiceConfig {
  bgColor: string; // background color
  color: string;   // text/icon color
}

const SERVICE_CONFIG: Record<Exclude<FilterService, 'all'>, ServiceConfig> = {
  bike: { bgColor: '#D1FAE5', color: '#10B981' },
  scooty: { bgColor: '#D1FAE5', color: '#10B981' },
  car: { bgColor: '#DBEAFE', color: '#3B82F6' },
  xl_car: { bgColor: '#DBEAFE', color: '#3B82F6' },
  parcel: { bgColor: '#FCE7F3', color: '#EC4899' },
  metro: { bgColor: '#E0E7FF', color: '#6366F1' },
};

interface ServiceButtonsProps {
  activeService: FilterService;
  onServiceChange: (service: FilterService) => void;
}

export const ServiceButtons: React.FC<ServiceButtonsProps> = ({
  activeService,
  onServiceChange,
}) => {
  const services: { id: FilterService; label: string; icon: JSX.Element }[] = [
    { id: 'all', label: 'All', icon: <FaTh /> },
    { id: 'bike', label: 'Bike', icon: <FaCircle /> },
    { id: 'scooty', label: 'Scooty', icon: <FaCircle /> },
    { id: 'car', label: 'Car', icon: <FaSquare /> },
    { id: 'xl_car', label: 'XL Car', icon: <FaSquare /> },
    { id: 'parcel', label: 'Parcel', icon: <FaBox /> },
    { id: 'metro', label: 'Metro', icon: <FaCompass /> },
  ];

  return (
    <div className="service-container">
      <div className="section-title">Select Service Type</div>
      <div className="service-grid">
        {services.map((service) => {
          const isActive = activeService === service.id;

          // Get the color configuration
          const config =
            service.id === 'all'
              ? { bgColor: '#EFF6FF', color: '#2563EB' }
              : SERVICE_CONFIG[service.id as Exclude<FilterService, 'all'>];

          return (
            <button
              key={service.id}
              className={`service-button ${isActive ? 'active' : ''}`}
              style={{
                backgroundColor: isActive ? config.bgColor : '#F9FAFB',
                borderColor: isActive ? config.color : 'transparent',
              }}
              onClick={() => onServiceChange(service.id)}
            >
              <div
                className="service-icon"
                style={{ color: isActive ? config.color : '#CBD5E1' }}
              >
                {service.icon}
              </div>
              <div
                className="service-button-text"
                style={{ color: isActive ? config.color : '#6B7280' }}
              >
                {service.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};




// Recent Rides




import {  FaChevronRight, FaBicycle, FaMotorcycle, FaCar, FaTruck, FaSubway } from 'react-icons/fa';
import type { Ride } from './JRPtypes';




export type RideStatus = 'completed' | 'cancelled';





interface RecentRidesProps {
  rides: Ride[];
  onViewAll: () => void;
}

export const RecentRides: React.FC<RecentRidesProps> = ({ rides, onViewAll }) => {
  const SERVICE_CONFIG = {
  bike: { label: 'Bike', icon: <FaBicycle />, bgColor: '#D1FAE5', color: '#10B981' },
  scooty: { label: 'Scooty', icon: <FaMotorcycle />, bgColor: '#D1FAE5', color: '#10B981' },
  car: { label: 'Car', icon: <FaCar />, bgColor: '#DBEAFE', color: '#3B82F6' },
  xl_car: { label: 'XL Car', icon: <FaCar />, bgColor: '#DBEAFE', color: '#3B82F6' },
  parcel: { label: 'Parcel', icon: <FaTruck />, bgColor: '#FEE2E2', color: '#EF4444' },
  metro: { label: 'Metro', icon: <FaSubway />, bgColor: '#E0E7FF', color: '#6366F1' },
};
  return (
    <div className="recent-rides-container">
      <div className="section-header">
        <div className="section-header-title">Recent Rides</div>
        <button className="view-all-button" onClick={onViewAll}>
          <span className="view-all-text">View All</span>
          <FaChevronRight color="#2563EB" size={16} />
        </button>
      </div>

      <div className="rides-list">
        {rides.map((ride) => {
          const config = SERVICE_CONFIG[ride.serviceType];

          return (
            <div key={ride.id} className="ride-card">
              <div
                className="ride-icon"
                style={{
                  backgroundColor:
                    ride.status === 'completed' ? config.bgColor : '#FEE2E2',
                }}
              >
                {React.cloneElement(config.icon, {
                  color: ride.status === 'completed' ? config.color : '#EF4444',
                  size: 20,
                })}
              </div>

              <div className="ride-info">
                <div className="ride-destination">{ride.dropoff}</div>
                <div className="ride-meta-row">
                  <span className="ride-meta">{ride.time}</span>
                  <span className="ride-meta"> • </span>
                  <span className="ride-meta">{config.label}</span>
                </div>
              </div>

              <div className="ride-right">
                <div
                  className={`ride-fare ${
                    ride.status === 'completed' ? 'fare-completed' : 'fare-cancelled'
                  }`}
                >
                  {ride.status === 'completed' ? `₹${ride.fare}` : 'Cancelled'}
                </div>

                {ride.customerRating && ride.status === 'completed' && (
                  <div className="ride-rating">
                    <FaStar color="#F59E0B" size={12} />
                    <span className="rating-text">{ride.customerRating}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};




// Earning cards

import  { useEffect, useState } from 'react';


interface StatusToggleProps {
  isOnline: boolean;
  onToggle: () => void;
}

export const StatusToggle: React.FC<StatusToggleProps> = ({ isOnline, onToggle }) => {
  const [position, setPosition] = useState(isOnline ? 32 : 2);

  useEffect(() => {
    // Smooth animation using CSS transition
    setPosition(isOnline ? 32 : 2);
  }, [isOnline]);

  return (
    <div
      className={`toggle-container ${isOnline ? 'online' : 'offline'}`}
      onClick={onToggle}
    >
      <div
        className="toggle-thumb"
        style={{ transform: `translateX(${position}px)` }}
      >
        <div
          className={`toggle-dot ${isOnline ? 'online-dot' : 'offline-dot'}`}
        />
      </div>
    </div>
  );
};



// Bottom Nav


// src/components/BottomNav.tsx

import { FaHome, FaFileAlt, FaCreditCard, FaBell, FaUser } from 'react-icons/fa';
import './JustRidePartnerDashboard.css';

export type TabType = 'home' | 'rides' | 'earnings' | 'notifications' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  notificationCount?: number;
}

const iconMap: Record<TabType, JSX.Element> = {
  home: <FaHome />,
  rides: <FaFileAlt />,
  earnings: <FaCreditCard />,
  notifications: <FaBell />,
  profile: <FaUser />,
};

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, notificationCount = 0 }) => {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'rides', label: 'History' },
    { id: 'earnings', label: 'Earnings' },
    { id: 'notifications', label: 'Alerts' },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <div className="bottom-nav">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <div className="nav-icon-container">
              {iconMap[tab.id]}
              {tab.id === 'notifications' && notificationCount > 0 && (
                <div className="nav-badge">{notificationCount > 9 ? '9+' : notificationCount}</div>
              )}
              {isActive && <div className="nav-indicator"></div>}
            </div>
            <span className="nav-label">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};













