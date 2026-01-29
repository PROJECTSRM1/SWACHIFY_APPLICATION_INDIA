import React, { type JSX } from "react";
import { FaCar, FaCircle, FaSquare, FaBox, FaCompass, FaMotorcycle } from "react-icons/fa"; 
import "./JustRidePartnerDashboard.css";

type ActiveRide = {
  serviceType: string;
  distance: string;
  fare: number;
  estimatedArrival: string;
  pickup: string;
  dropoff: string;
};

interface RideRequestModalProps {
  visible: boolean;
  ride: Omit<ActiveRide, "id"> | null;
  onAccept: () => void;
  onDecline: () => void;
}

// ✅ Add all service types here
const SERVICE_CONFIG: Record<
  string,
  { label: string; icon: JSX.Element; color: string; bgColor: string }
> = {
  car: {
    label: "Car",
    icon: <FaCar />,
    color: "#2563EB",
    bgColor: "#E0F2FE",
  },
  xl_car: {
    label: "XL Car",
    icon: <FaSquare />,
    color: "#6366F1",
    bgColor: "#EEF2FF",
  },
  bike: {
    label: "Bike",
    icon: <FaCircle />,
    color: "#10B981",
    bgColor: "#D1FAE5",
  },
  scooty: {
    label: "Scooty",
    icon: <FaMotorcycle />,
    color: "#10B981",
    bgColor: "#D1FAE5",
  },
  parcel: {
    label: "Parcel",
    icon: <FaBox />,
    color: "#EC4899",
    bgColor: "#FCE7F3",
  },
  metro: {
    label: "Metro",
    icon: <FaCompass />,
    color: "#6366F1",
    bgColor: "#E0E7FF",
  },
};

export const RideRequestModal: React.FC<RideRequestModalProps> = ({
  visible,
  ride,
  onAccept,
  onDecline,
}) => {
  if (!ride || !visible) return null;

  const config = SERVICE_CONFIG[ride.serviceType] ?? {
    label: "Unknown",
    icon: <FaCar />, // fallback icon
    color: "#000",
    bgColor: "#ccc",
  };

  return (
    <div className="modal-overlay" onClick={onDecline}>
      <div
        className="ride-request-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="request-header">
          <div className="request-header-left">
            <div
              className="request-icon"
              style={{ backgroundColor: config.bgColor, color: config.color }}
            >
              {config.icon}
            </div>
            <div>
              <p className="request-type">New {config.label} Request</p>
              <p className="request-distance">{ride.distance} away</p>
            </div>
          </div>
          <div className="request-fare">
            <p className="request-fare-amount">₹{ride.fare}</p>
            <p className="request-eta">{ride.estimatedArrival} pickup</p>
          </div>
        </div>

        <div className="request-route">
          <div className="route-point">
            <div
              className="route-dot"
              style={{ backgroundColor: "#10B981" }}
            />
            <div className="route-text">
              <p className="route-label">PICKUP</p>
              <p className="route-address">{ride.pickup}</p>
            </div>
          </div>
          <div className="route-line" />
          <div className="route-point">
            <div
              className="route-dot"
              style={{ backgroundColor: "#EF4444" }}
            />
            <div className="route-text">
              <p className="route-label">DROP</p>
              <p className="route-address">{ride.dropoff}</p>
            </div>
          </div>
        </div>

        <div className="request-actions">
          <button className="decline-button" onClick={onDecline}>
            Decline
          </button>
          <button className="accept-button" onClick={onAccept}>
            Accept Ride
          </button>
        </div>
      </div>
    </div>
  );
};
