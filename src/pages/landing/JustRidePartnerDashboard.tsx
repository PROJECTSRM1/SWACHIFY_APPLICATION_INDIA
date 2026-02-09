import React, { useState, useEffect, useCallback } from 'react';
import { FiBell } from 'react-icons/fi';
import classNames from 'classnames';
import './JustRidePartnerDashboard.css';
import { RideRequestModal } from './JRPRideRequestModal';
import { BottomNav } from './JRPEarningCards';
import {EarningsCard} from './JRPEarningCards';
import { QuickStats } from './JRPEarningCards';
import {ServiceButtons} from './JRPEarningCards';
import {RecentRides} from './JRPEarningCards';
import { MOCK_DAILY_EARNINGS, MOCK_EARNINGS_SUMMARY, MOCK_RIDES } from './JRPData';
import type { ActiveRide, NotificationType } from './JRPtypes';
import type { ServiceType } from './JRPtypes';
import LiveRideTracking from './JPRLiveRideTracking';
import { SERVICE_CONFIG } from './JRPData'; 
import type { Ride } from './JRPtypes';
import { FaBolt, FaCog, FaCompass, FaDollarSign, FaExclamationCircle, FaGift, FaStar } from 'react-icons/fa';



export type TabType = 'home' | 'rides' | 'earnings' | 'notifications' | 'profile';
export type FilterService = 'all' | 'bike' | 'scooty' | 'car' | 'xl_car' | 'parcel' | 'metro';

interface Notification {
  id: string;
  type: 'payment' | 'promo' | 'ride_request' | 'alert' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  amount?: number;
  serviceType?: string;
}

interface Props {
  MOCK_NOTIFICATIONS: Notification[];
}

const DriverDashboard: React.FC<Props> = ({ MOCK_NOTIFICATIONS }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [activeService, setActiveService] = useState<FilterService>('all');
  const [showRideRequest, setShowRideRequest] = useState(false);
  const [pendingRide, setPendingRide] = useState<Omit<ActiveRide, 'id'> | null>(null);
  const [activeRide, setActiveRide] = useState<ActiveRide | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'cancelled'>('all');
  const activeServiceRef = React.useRef<FilterService>(activeService);


  const unreadCount = notifications.filter(n => !n.read).length;

  
  useEffect(() => {
  activeServiceRef.current = activeService;
}, [activeService]);

 const generateRandomRequest = useCallback((): Omit<ActiveRide, 'id'> => {
  const serviceFromRef = activeServiceRef.current;

  const serviceType: ServiceType =
    serviceFromRef === 'all'
      ? (['bike','scooty','car','xl_car','parcel','metro'][Math.floor(Math.random()*6)] as ServiceType)
      : serviceFromRef;

  return {
    serviceType,
    pickup: 'Koramangala',
    dropoff: 'MG Road',
    fare: Math.floor(Math.random()*500)+50,
    status: 'in_progress',
    distance: `${(Math.random()*10+1).toFixed(1)} km`,
    duration: `${Math.floor(Math.random()*30+5)} min`,
    estimatedArrival: `${Math.floor(Math.random()*10+2)} min`
  };
}, []);




//   useEffect(() => {
//     if (isOnline && !activeRide) {
//       const timer = setTimeout(() => {
//         const request = generateRandomRequest();
//         setPendingRide(request);
//         setShowRideRequest(true);
//       }, 3000);
//       return () => clearTimeout(timer);
//     } else {
//       setShowRideRequest(false);
//       setPendingRide(null);
//     }
//   }, [isOnline, activeRide, generateRandomRequest]);


// useEffect(() => {
//   if (!isOnline || activeRide) {
//     setShowRideRequest(false);
//     setPendingRide(null);
//     return;
//   }

//   // Clear old pending request when service changes
//   setShowRideRequest(false);
//   setPendingRide(null);

//   const timer = setTimeout(() => {
//     const request = generateRandomRequest();
//     setPendingRide(request);
//     setShowRideRequest(true);
//   }, 2000); // slightly faster feedback

//   return () => clearTimeout(timer);
// }, [isOnline, activeRide, activeService, generateRandomRequest]);

// useEffect(() => {
//   if (!isOnline || activeRide) return;

//   setShowRideRequest(false);
//   setPendingRide(null);

//   const timer = setTimeout(() => {
//     const request = generateRandomRequest();
//     setPendingRide(request);
//     setShowRideRequest(true);
//   }, 2000);

//   return () => clearTimeout(timer);
// }, [isOnline, activeRide, activeService, generateRandomRequest]);


useEffect(() => {
  if (!isOnline || activeRide) return;

  const timer = setTimeout(() => {
    const request = generateRandomRequest();
    setPendingRide(request);
    setShowRideRequest(true);
  }, 3000);

  return () => clearTimeout(timer);
}, [isOnline, activeRide, generateRandomRequest]);








  const handleAcceptRide = () => {
    if (!pendingRide) return;

    const newActiveRide: ActiveRide = {
  ...pendingRide,
  id: `ride-${Date.now()}`,
  status: 'in_progress',
  customerName: 'Amit', // add this
  customerRating: 4.8, // optional
  otp: '6795'
};
    setActiveRide(newActiveRide);
    setShowRideRequest(false);
    setPendingRide(null);
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      type: 'ride_request',
      title: 'Ride Accepted',
      message: `You accepted a ${pendingRide.serviceType} ride to ${pendingRide.dropoff}`,
      time: 'Just now',
      read: false,
      serviceType: pendingRide.serviceType,
      amount: pendingRide.fare
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleDeclineRide = () => {
    setShowRideRequest(false);
    setPendingRide(null);
    setTimeout(() => {
      if (isOnline && !activeRide) {
        const request = generateRandomRequest();
        setPendingRide(request);
        setShowRideRequest(true);
      }
    }, 5000);
  };

  const handleCompleteRide = () => {
    if (!activeRide) return;
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      type: 'payment',
      title: 'Ride Completed',
      message: `₹${activeRide.fare} earned for ride to ${activeRide.dropoff}`,
      time: 'Just now',
      read: false,
      amount: activeRide.fare
    };
    setNotifications(prev => [newNotification, ...prev]);
    setActiveRide(null);
  };

  const handleCancelRide = () => setActiveRide(null);

  const filteredRides = MOCK_RIDES.filter(
    ride =>
      (activeService === 'all' || ride.serviceType === activeService) &&
      (statusFilter === 'all' || ride.status === statusFilter)
  );

  return (
    <div className="dashboard-wrapper-full">
      {/* Topbar */}
      <header className="dashboard-topbar">
        <div className="topbar-left">
          <span className="header-greeting">Good Morning</span>
          <span className="header-name">Rajesh Kumar</span>
        </div>
        <div className="topbar-right">
          <button className="notification-button" onClick={()=>setActiveTab('notifications')}>
            <FiBell size={20} />
            {unreadCount>0 && <span className="notification-badge">{unreadCount>9?'9+':unreadCount}</span>}
          </button>
          <label className="status-toggle">
            <input type="checkbox" checked={isOnline} onChange={()=>setIsOnline(!isOnline)} />
            <span className="toggle-slider" />
          </label>
        </div>
      </header>

      {/* Status Banner */}
      <div className={classNames('status-banner',{
        online:isOnline && !activeRide,
        activeRide:!!activeRide,
        offline:!isOnline
      })}>
        <span className="status-dot" />
        <span className="status-text">
          {activeRide ? `Active Ride - ${activeRide.serviceType.toUpperCase()}` :
          isOnline ? 'You are Online - Ready for rides' :
          'You are Offline'}
        </span>
      </div>


 

<main className="dashboard-content-full">
 {activeRide && activeTab === 'home' ? (
    <LiveRideTracking
      ride={activeRide}
      onComplete={handleCompleteRide}
      onCancel={handleCancelRide}
    />
  ) : activeTab === 'home' && !activeRide ? (
    <>
      <EarningsCard todayEarnings={2450} weeklyEarnings={12800} ridesCompleted={12} hoursOnline={8} />
      <QuickStats rating={4.8} acceptance={92} cancellation={3} streak={5} />
      <ServiceButtons activeService={activeService} onServiceChange={setActiveService} />
      <RecentRides rides={filteredRides.slice(0,5)} onViewAll={()=>setActiveTab('rides')} />
    </>
  ) : null}

  {activeTab === 'rides' && (
  <>
    <div className="filter-container">
      <h3 className="section-title">Ride History</h3>

      <div className="filter-buttons">
        {(['all', 'completed', 'cancelled'] as const).map((status) => (
          <button
            key={status}
            className={`filter-button ${statusFilter === status ? 'filter-button-active' : ''}`}
            onClick={() => setStatusFilter(status)}
          >
            <span
              className={`filter-button-text ${
                statusFilter === status ? 'filter-button-text-active' : ''
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </button>
        ))}
      </div>
    </div>

    <div className="history-list">
      {filteredRides.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-text">No rides found</div>
          <div className="empty-state-subtext">Try adjusting your filters</div>
        </div>
      ) : (
        filteredRides.map((ride: Ride) => {
          const config = SERVICE_CONFIG[ride.serviceType];
          const Icon = config.icon;

          return (
            <div className="history-card" key={ride.id}>
              <div className="history-header">
                <div
                  className="history-icon"
                  style={{ backgroundColor: config.bgColor }}
                >
                  <Icon size={20} color={config.color} />
                </div>

                <div className="history-info">
                  <div className="history-date">
                    {ride.date} • {ride.time}
                  </div>
                  <div className="history-type">{config.label}</div>
                </div>

                <div className="history-fare">
                  <div
                    className={`history-fare-amount ${
                      ride.status === 'cancelled' ? 'fare-cancelled' : ''
                    }`}
                  >
                    {ride.status === 'cancelled' ? 'Cancelled' : `₹${ride.fare}`}
                  </div>

                  {ride.status === 'completed' && (
                    <div className="history-payment">{ride.paymentMethod}</div>
                  )}
                </div>
              </div>

              <div className="history-route">
                <div className="history-route-row">
                  <span className="dot green" />
                  <span className="history-location">{ride.pickup}</span>
                </div>
                <div className="history-route-row">
                  <span className="dot red" />
                  <span className="history-location">{ride.dropoff}</span>
                </div>
              </div>

              <div className="history-footer">
                <div className="history-distance">
                  {ride.distance} • {ride.duration}
                </div>

                {ride.customerRating && (
                  <div className="history-rating">
                    ⭐ <span className="history-rating-text">{ride.customerRating}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  </>
)}



{activeTab === 'earnings' && (
  <>
    {/* Summary Card */}
    <div className="earnings-summary-card">
      <div className="earnings-summary-title">Monthly Earnings</div>

      <div className="earnings-summary-amount">
        <span className="earnings-summary-rupee">₹</span>
        <span className="earnings-summary-value">
          {MOCK_EARNINGS_SUMMARY.thisMonth.toLocaleString()}
        </span>
      </div>

      <div className="earnings-summary-stats">
        <div className="earnings-summary-stat-item">
          <div className="earnings-summary-stat-label">Total Rides</div>
          <div className="earnings-summary-stat-value">
            {MOCK_EARNINGS_SUMMARY.monthRides}
          </div>
        </div>

        <div className="earnings-summary-stat-item">
          <div className="earnings-summary-stat-label">Avg Per Ride</div>
          <div className="earnings-summary-stat-value">
            ₹{MOCK_EARNINGS_SUMMARY.avgPerRide}
          </div>
        </div>
      </div>
    </div>

    {/* Breakdown */}
  <div className="earnings-period-card">
  <h3 className="section-title">Earnings Breakdown</h3>

  <div className="earnings-period-row">
    <div className="earnings-period-item">
      <span className="earnings-period-label">Today</span>
      <span className="earnings-period-value">₹{MOCK_EARNINGS_SUMMARY.today.toLocaleString()}</span>
      <span className="earnings-period-rides">
        {MOCK_EARNINGS_SUMMARY.todayRides} rides
      </span>
    </div>

    <div className="earnings-period-divider" />

    <div className="earnings-period-item">
      <span className="earnings-period-label">This Week</span>
      <span className="earnings-period-value">₹{MOCK_EARNINGS_SUMMARY.thisWeek.toLocaleString()}</span>
      <span className="earnings-period-rides">
        {MOCK_EARNINGS_SUMMARY.weekRides} rides
      </span>
    </div>
  </div>
</div>


    {/* By Service */}
    <div className="earnings-by-service-card">
      <div className="section-title">By Service Type</div>

      {Object.entries(MOCK_EARNINGS_SUMMARY.byServiceType).map(([type, data]) => {
        const config = SERVICE_CONFIG[type as ServiceType];
        const Icon = config.icon;

        return (
          <div key={type} className="service-earning-row">
            <div className="service-earning-left">
              <div
                className="service-earning-icon"
                style={{ backgroundColor: config.bgColor }}
              >
                <Icon size={16} color={config.color} />
              </div>

              <div>
                <div className="service-earning-type">{config.label}</div>
                <div className="service-earning-rides">{data.rides} rides</div>
              </div>
            </div>

            <div className="service-earning-amount">
              ₹{data.amount.toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>

    {/* Daily Chart */}
 <div className="daily-earnings-card">
  <h3 className="section-title">Last 7 Days</h3>
  <div className="daily-earnings-chart">
    {MOCK_DAILY_EARNINGS.map((day, index) => {
      const maxAmount = Math.max(...MOCK_DAILY_EARNINGS.map(d => d.amount));
      const height = (day.amount / maxAmount) * 140; // taller bars

      const dayName = new Date(day.date).toLocaleDateString('en-US', {
        weekday: 'short'
      }); // "Tue", "Wed", etc.

      return (
        <div key={day.date} className="daily-earnings-bar">
          <div
            className="daily-earnings-bar-fill"
            style={{
              height: `${height}px`,
              backgroundColor:
                index === MOCK_DAILY_EARNINGS.length - 1 ? '#2563EB' : '#CBD5E1',
            }}
          />
          <span className="daily-earnings-day">{dayName}</span>
        </div>
      );
    })}
  </div>
</div>


  </>
)}


{activeTab === 'notifications' && (
  <>
    <div className="notifications-header">
      <h3 className="section-title">Notifications</h3>
      <button
        className="mark-all-btn"
        onClick={() =>
          setNotifications(notifications.map((n) => ({ ...n, read: true })))
        }
      >
        Mark all read
      </button>
    </div>

    <div className="notifications-list">
      {notifications.map((notification) => {
        const getIcon = (type: NotificationType) => {
          switch (type) {
            case 'payment':
              return <FaDollarSign />;
            case 'promo':
              return <FaGift />;
            case 'ride_request':
              return <FaCompass />;
            case 'alert':
              return <FaExclamationCircle />;
            case 'system':
              return <FaCog />;
          }
        };

        const getColor = (type: NotificationType) => {
          switch (type) {
            case 'payment':
              return '#10B981';
            case 'promo':
              return '#F59E0B';
            case 'ride_request':
              return '#2563EB';
            case 'alert':
              return '#EF4444';
            case 'system':
              return '#64748B';
          }
        };

        const bgColor = `${getColor(notification.type)}33`; // light transparent bg

        return (
          <div
            key={notification.id}
            className={`notification-card ${!notification.read ? 'unread' : ''}`}
          >
            <div className="notification-icon" style={{ backgroundColor: bgColor }}>
              {getIcon(notification.type)}
            </div>

            <div className="notification-content">
              <div className="notification-header">
                <span className="notification-title">{notification.title}</span>
                {!notification.read && <span className="notification-dot" />}
              </div>
              <p className="notification-message">{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>

            {notification.amount && (
              <span className="notification-amount">₹{notification.amount}</span>
            )}
          </div>
        );
      })}
    </div>
  </>
)}


{activeTab === 'profile' && (
  <div className="profile-container">
    <div className="profile-avatar">
      <span className="profile-initials">RK</span>
    </div>

    <h2 className="profile-name">Rajesh Kumar</h2>
    <p className="profile-since">Partner since Jan 2023</p>

    <div className="profile-stats">
      <div className="profile-stat">
        <FaStar color="#F59E0B" size={16} />
        <span className="profile-stat-text">4.8 Rating</span>
      </div>
      <div className="profile-stat">
        <FaBolt color="#2563EB" size={16} />
        <span className="profile-stat-text">Gold Partner</span>
      </div>
    </div>
  </div>
)}




  
</main>

    


    

      {/* Ride Request Modal */}
      <RideRequestModal
        visible={showRideRequest && isOnline && !activeRide}
        ride={pendingRide}
        onAccept={handleAcceptRide}
        onDecline={handleDeclineRide}
      />

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        notificationCount={unreadCount}
      />
    </div>
  );
};

export default DriverDashboard;
