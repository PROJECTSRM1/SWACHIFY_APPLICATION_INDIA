import React, { useState } from 'react';
import type { ActiveRide } from './JRPtypes';
import { SERVICE_CONFIG } from './JRPData';
import { FaShieldAlt, FaUser, FaPhone, FaComment, FaStar, FaTimes, FaMapMarkerAlt, FaCheckCircle, FaLocationArrow } from 'react-icons/fa';
import './JustRidePartnerDashboard.css';

interface Props {
  ride: ActiveRide;
  onComplete: () => void;
  onCancel: () => void;
}

const LiveRideTrackingWeb: React.FC<Props> = ({ ride, onComplete, onCancel }) => {
  const [stage, setStage] = useState<'pickup' | 'trip' | 'dropoff'>('pickup');
  const config = SERVICE_CONFIG[ride.serviceType];
  const RideIcon = config.icon; // Component

  const handleArrived = () => stage === 'pickup' && setStage('trip');
  const handleStartTrip = () => stage === 'trip' && setStage('dropoff');

  return (
    <div className="live-ride-container">
      {/* Top Banner */}


     
   
    

      {/* Map Placeholder */}
      <div className="live-ride-map-card">

          {/* Stage Indicator ABOVE geo location */}
  <div className="stage-indicator-wrapper">
    <div className="stage-indicator">
      {['pickup', 'trip', 'dropoff'].map((s) => (
        <div
          key={s}
          className={`stage-bar ${s === stage ? 'stage-bar-active' : ''}`}
        />
      ))}
    </div>
  </div>



        <div className="live-ride-map-icon">
          <RideIcon size={40} color={config.color} />
        </div>
        <h3>Live Map Tracking</h3>
        <p>GPS location active</p>
      </div>

       

      {/* Ride Info */}
      <div className="live-ride-info-card">
        <div className="ride-info-left">
          <div className="ride-type-icon" style={{ backgroundColor: config.bgColor }}>
            <RideIcon size={28} color={config.color} />
          </div>
          <div>
            <div className="ride-type">{config.label}</div>
            <div className="ride-distance">{ride.distance} • {ride.duration}</div>
          </div>
        </div>
        <div className="ride-info-right">
          <div className="ride-fare">₹{ride.fare}</div>
          <div className="ride-payment">{ride.paymentMethod}</div>
        </div>
      </div>

      {/* Route Info */}
      <div className="ride-route-card">
        <div className="pickup-row">
          <FaMapMarkerAlt color="#2563EB" />
          <div className="route-text">
            <span>PICKUP</span>
            <span>{ride.pickup}</span>
          </div>
          {stage === 'pickup' && <span>{ride.estimatedArrival}</span>}
        </div>
        <div className="drop-row">
          <FaMapMarkerAlt color="#EF4444" />
          <div className="route-text">
            <span>DROP</span>
            <span>{ride.dropoff}</span>
          </div>
        </div>
      </div>

      {/* OTP */}
      {ride.otp && stage !== 'dropoff' && (
        <div className="ride-otp-card">
          <div className="otp-left">
            <FaShieldAlt size={20} color="#2563EB" />
            <span>Ride OTP</span>
          </div>
          <span className="otp-code">{ride.otp}</span>
        </div>
      )}

      {/* Customer Info */}
      {ride.customerName && (
        <div className="customer-card">
          <div className="customer-left">
            <FaUser size={28} color="#64748B" />
            <div>
              <div className="customer-name">{ride.customerName}</div>
              {ride.customerRating && (
                <div className="customer-rating">
                  <FaStar size={14} color="#F59E0B" /> {ride.customerRating}
                </div>
              )}
            </div>
          </div>
          <div className="customer-actions">
            <FaPhone className="action-icon" />
            <FaComment className="action-icon" />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="live-ride-actions">
        <button className="cancel-btn" onClick={onCancel}><FaTimes /> Cancel</button>
        {stage === 'pickup' && <button className="arrived-btn" onClick={handleArrived}><FaLocationArrow /> Arrived</button>}
        {stage === 'trip' && <button className="start-trip-btn" onClick={handleStartTrip}><FaLocationArrow /> Start Trip</button>}
        {stage === 'dropoff' && <button className="complete-btn" onClick={onComplete}><FaCheckCircle /> Complete</button>}
      </div>
    </div>
  );
};

export default LiveRideTrackingWeb;
