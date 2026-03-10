import React, {  useEffect, useState } from "react";
import { Input, Button, Card, Divider, Avatar, Badge, message, Modal } from "antd";
import {
  ArrowLeftOutlined,
  EnvironmentFilled,
  CompassFilled,
  HistoryOutlined,
  ThunderboltFilled,
  PhoneFilled,
  MessageFilled,
  CloseOutlined,
  RightOutlined,
  CheckCircleFilled,
  AimOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./JustRide.css"
import { customerLogin } from "../../../api/customerAuth";


const BookRide: React.FC = () => {
  const navigate = useNavigate();

  // App Flow States
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedRide, setSelectedRide] = useState<any>(null);

  // Cancellation UI State
  const [isCancelling, setIsCancelling] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  // 🚀 NEW STATES FOR PICKUP & DROPOFF
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  
const [driverStatus, setDriverStatus] = useState("Finding driver...");
const [arrivalTime, _setArrivalTime] = useState(7);
const [showLoginModal, setShowLoginModal] = useState(false);
const [identifier, setIdentifier] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);




// Example auth check (replace with your real auth logic)
const isLoggedIn = !!localStorage.getItem("accessToken");


const onLogin = async (values: any) => {
  const res: any = await customerLogin({
    email_or_phone: values.identifier,
    password: values.password,
  });

  localStorage.setItem("user_id", res.user_id);
  localStorage.setItem("accessToken", res.access_token);
  localStorage.setItem("user", JSON.stringify(res));
};








 const rideOptions = [
  { 
    id: "scooty", 
    name: "Scooty", 
    desc: "Quick & Economical", 
    price: "72", 
    icon: "🛵",
    driver: { name: "Suresh Patel", vehicle: "KA02 MN 3979" }
  },
  { 
    id: "bike", 
    name: "Bike", 
    desc: "Swift City Commute", 
    price: "130", 
    icon: "🏍️",
    driver: { name: "Ramesh Kumar", vehicle: "KA03 AB 4521" }
  },
  { 
    id: "car", 
    name: "Car", 
    desc: "Comfortable Sedan", 
    price: "257", 
    icon: "🚗",
    driver: { name: "Anita Sharma", vehicle: "KA05 CD 7823" }
  },
  { 
    id: "xl-car", 
    name: "XL Car", 
    desc: "Spacious SUV", 
    price: "436", 
    icon: "🚙",
    driver: { name: "Vikram Singh", vehicle: "KA07 EF 9945" }
  },
];


  const cancelReasons = [
    "Driver is taking too long",
    "Change in plans",
    "Booked by mistake",
    "Driver asked to cancel",
    "Other"
  ];

 const handleSearch = () => {
  if (!pickup.trim() || !dropoff.trim()) {
    message.error("Please enter Pickup & Drop-off before searching!");
    return;
  }

  setIsSearching(true);
  setTimeout(() => {
    setIsSearching(false);
    setShowResults(true);
  }, 1200);
};

 const handleConfirmBooking = () => {
  if (!selectedRide) return;

  setBookingConfirmed(true);

  // Start dynamic driver status flow
  setDriverStatus("Finding driver...");

  let step = 0;

  const interval = setInterval(() => {
    step++;

    if (step === 1) {
      setDriverStatus("Finding driver...");
    }
    if (step === 2) {
      setDriverStatus("Driver found! On the way...");
    }
    if (step === 3) {
      setDriverStatus(`Driver arriving in ${arrivalTime} mins...`);
    }

    if (step >= 3) {
      clearInterval(interval);
    }
  }, 2000);
};

  const handleSelectReason = (reason: string) => {
    setSelectedReason(reason);
    setIsCancelling(false);
    setShowSuccess(true);
  };

  const handleFinalReset = () => {
    setShowSuccess(false);
    setBookingConfirmed(false);
    setShowResults(false);
    setSelectedRide(null);
  };


  const handleBack = () => {
  if (showSuccess) {
    // Close the success popup
    handleFinalReset();
  } else if (isCancelling) {
    // Close the cancel overlay
    setIsCancelling(false);
  } else if (bookingConfirmed) {
    // Go back from booking confirmed to ride selection/results
    setBookingConfirmed(false);
    setShowResults(true);
  } else if (showResults) {
    // Go back from results to location input
    setShowResults(false);
  } else {
    // No state left to go back to, navigate in history
    navigate(-1);
  }
};

useEffect(() => {
  if (!showLoginModal) {
    setIdentifier("");
    setPassword("");
    setLoading(false);
  }
}, [showLoginModal]);

const handleUseCurrentLocation = async () => {
  if (!navigator.geolocation) {
    message.error("Geolocation not supported");
    return;
  }

  message.loading("Fetching current location...", 1);

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude, longitude } = pos.coords;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();

        const address = data?.display_name || `Lat ${latitude}, Lng ${longitude}`;
        setPickup(address);
        message.success("Location set");
      } catch {
        setPickup(`Lat ${latitude}, Lng ${longitude}`);
        message.warning("Using coordinates only");
      }
    },
    () => message.error("Location permission denied")
  );
};








  return (
    <div className="sw-jr-bk-full-wrapper">
      <div className="sw-jr-bk-container-centered">
        
        {/* Top Navigation */}
        <div className="sw-jr-bk-top-nav">
          <Button 
            icon={<ArrowLeftOutlined />} 
            className="sw-jr-bk-back-round"
            onClick={handleBack}
          />
          <h1 className="sw-jr-bk-main-heading">Just Ride</h1>
        </div>

        {/* Pulsing Status */}
        {bookingConfirmed && !isCancelling && !showSuccess && (
          <div className="sw-jr-bk-status-circle-wrap sw-jr-bk-fade-in">
            <div className="sw-jr-bk-outer-pulse" />
            <div className="sw-jr-bk-inner-circle" />
          </div>
        )}

        <Card className="sw-jr-bk-glass-card" bordered={false}>
          {bookingConfirmed ? (
            <div className="sw-jr-bk-fade-in">
              <div className="sw-jr-bk-status-badge">
                <Badge color="#10b981" text={driverStatus} />
              </div>

              <div className="sw-jr-bk-driver-header">
                <div className="sw-jr-bk-ride-type-mini">
                  <span className="sw-jr-bk-mini-icon">{selectedRide?.icon}</span>
                  <span className="sw-jr-bk-mini-name">{selectedRide?.name}</span>
                  <span className="sw-jr-bk-eta">7 min away</span>
                </div>
              </div>

              <Divider className="sw-jr-bk-divider-thin" />
              <div className="sw-jr-bk-driver-info">
  <Avatar size={54} className="sw-jr-bk-driver-avatar">
    {selectedRide?.driver.name.charAt(0)}
  </Avatar>
  <div className="sw-jr-bk-driver-text">
    <h3>{selectedRide?.driver.name}</h3>
    <p>{selectedRide?.driver.vehicle}</p>
  </div>
  <div className="sw-jr-bk-actions">
    <Button shape="circle" icon={<PhoneFilled />} className="sw-jr-bk-action-btn" />
    <Button shape="circle" icon={<MessageFilled />} className="sw-jr-bk-action-btn" />
  </div>
</div>


              <div className="sw-jr-bk-route-summary">
                <div className="sw-jr-bk-route-item">
                  <div className="sw-jr-bk-dot-pickup" />
                  <div className="sw-jr-bk-route-text">
                    <label>PICKUP</label>
                    <p>Current Location (Sector 44)</p>
                  </div>
                </div>
                <div className="sw-jr-bk-route-item">
                  <div className="sw-jr-bk-dot-dropoff" />
                  <div className="sw-jr-bk-route-text">
                    <label>DROP-OFF</label>
                    <p>Hii xkgxkgx</p>
                  </div>
                </div>
              </div>

              <div className="sw-jr-bk-fare-box">
                <span>Total Fare</span>
                <span className="sw-jr-bk-fare-amount">₹{selectedRide?.price}</span>
              </div>

              <Button 
                block danger 
                className="sw-jr-bk-cancel-btn" 
                icon={<CloseOutlined />} 
                onClick={() => setIsCancelling(true)}
              >
                Cancel Ride
              </Button>
            </div>
          ) : (
            <>
              <div className="sw-jr-bk-location-box">
                <div className="sw-jr-bk-input-row" style={{ marginBottom: '20px' }}>
                  <div className="sw-jr-bk-icon-column">
                    <CompassFilled className="sw-jr-bk-icon-p" />
                    <div className="sw-jr-bk-dashed-line" />
                  </div>
                  <div className="sw-jr-bk-field-column">
                    <label>PICKUP LOCATION</label>


<Input
  placeholder="Current Location..."
  variant="borderless"
  className="sw-jr-bk-input-web"
  value={pickup}
  onChange={(e) => setPickup(e.target.value)}
  suffix={
    <AimOutlined
      onClick={handleUseCurrentLocation}
      style={{
        fontSize: "18px",
        color: "#1677ff",
        cursor: "pointer",
      }}
    />
  }
/>


                  </div>
                </div>
            <div className="sw-jr-bk-input-row">
  <div className="sw-jr-bk-icon-column">
    <EnvironmentFilled className="sw-jr-bk-icon-d" />
  </div>

  <div className="sw-jr-bk-field-column">
    <label>DROP-OFF LOCATION</label>
    <Input 
      placeholder="Search destination..." 
      variant="borderless" 
      className="sw-jr-bk-input-web"
      value={dropoff}
      onChange={(e) => setDropoff(e.target.value)}
    />
  </div>
</div>

              </div>

              {!showResults ? (
                <div className="sw-jr-bk-fade-in">
                  <Divider className="sw-jr-bk-divider" />
                  <div className="sw-jr-bk-shortcuts">
                    <div className="sw-jr-bk-shortcut-item"><HistoryOutlined /> <span>Home</span></div>
                    <div className="sw-jr-bk-shortcut-item"><HistoryOutlined /> <span>Work</span></div>
                  </div>
                  <Button 
                    type="primary" block loading={isSearching}
                    className="sw-jr-bk-confirm-btn" onClick={handleSearch}
                  >
                    SEARCH RIDES <ThunderboltFilled />
                  </Button>
                </div>
              ) : (
                <div className="sw-jr-bk-results-container sw-jr-bk-fade-in">
                  <h3 className="sw-jr-bk-section-label">Available Rides</h3>
                  <div className="sw-jr-bk-ride-list">
                    {rideOptions.map((ride) => (
                      <div 
                        key={ride.id} 
                        className={`sw-jr-bk-ride-card ${selectedRide?.id === ride.id ? 'active' : ''}`}
                        onClick={() => setSelectedRide(ride)}
                      >
                        <div className="sw-jr-bk-ride-icon-wrap">{ride.icon}</div>
                        <div className="sw-jr-bk-ride-details">
                          <div className="sw-jr-bk-ride-name">{ride.name}</div>
                          <div className="sw-jr-bk-ride-desc">{ride.desc}</div>
                        </div>
                        <div className="sw-jr-bk-ride-price">₹{ride.price}</div>
                      </div>
                    ))}
                  </div>
                  <Button
  type="primary"
  block
  className="sw-jr-bk-confirm-btn"
  disabled={!selectedRide}
  onClick={() => {
  if (!isLoggedIn) {
    setShowLoginModal(true);
  } else {
    handleConfirmBooking();
  }
}}



>
  BOOK {selectedRide ? selectedRide.name.toUpperCase() : "RIDE"}
</Button>

              
                </div>
              )}
            </>
          )}
        </Card>

        {/* CANCELLATION OVERLAY */}
        {isCancelling && (
          <div className="sw-jr-bk-cancel-overlay sw-jr-bk-fade-in">
             <div className="sw-jr-bk-cancel-content">
                <div className="sw-jr-bk-cancel-handle" />
                <h2 className="sw-jr-bk-cancel-title">Cancel Ride?</h2>
                <p className="sw-jr-bk-cancel-subtitle">Are you sure you want to cancel this ride?</p>

                <div className="sw-jr-bk-cancel-reasons-list">
                  <p className="sw-jr-bk-reason-label">SELECT A REASON</p>
                  {cancelReasons.map((reason, index) => (
                    <div key={index} className="sw-jr-bk-reason-item" onClick={() => handleSelectReason(reason)}>
                      <span>{reason}</span>
                      <RightOutlined className="sw-jr-bk-reason-arrow" />
                    </div>
                  ))}
                </div>

                <div className="sw-jr-bk-cancel-button-group">
                  <Button block className="sw-jr-bk-btn-keep-ride" onClick={() => setIsCancelling(false)}>
                    Keep Ride
                  </Button>
                </div>
             </div>
          </div>
        )}

        {/* SUCCESS POPUP */}
       {showSuccess && (
  <div className="sw-jr-bk-popup-overlay">
    <Card className="sw-jr-bk-popup-success-card" bordered={false}>
      <div className="sw-jr-bk-popup-icon-container">
        <CheckCircleFilled className="sw-jr-bk-popup-success-icon" />
      </div>
      <h3 className="sw-jr-bk-popup-success-title">Ride Cancelled</h3>
      <p className="sw-jr-bk-popup-success-desc">Your ride has been cancelled successfully</p>
      
      <div className="sw-jr-bk-popup-success-reason">
        <strong>Reason:</strong>
        <p>{selectedReason}</p>
      </div>

      <Button type="primary" block onClick={handleFinalReset}>
        Done
      </Button>
    </Card>
  </div>
)}

<Modal
  open={showLoginModal}
  footer={null}
  centered
  onCancel={() => setShowLoginModal(false)}
  className="sw-jr-auth-modal"
  closeIcon={<span className="sw-jr-auth-close">✕</span>}
>
  <div className="sw-jr-auth-box">
   <div className="sw-jr-auth-icon">🔐</div>


    <h3 className="sw-jr-auth-title">Login to continue</h3>

    <Input
      className="sw-jr-auth-input"
      placeholder="Email or mobile number"
      value={identifier}
      onChange={(e) => setIdentifier(e.target.value)}
    />

    <Input.Password
      className="sw-jr-auth-input"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <Button
      type="primary"
      block
      className="sw-jr-auth-button"
      loading={loading}
      // disabled={!identifier || !password}
      onClick={async () => {
        try {
          setLoading(true);
          await onLogin({ identifier, password });
          setShowLoginModal(false);
          handleConfirmBooking();
        } catch {
          message.error("Login failed. Please try again.");
        } finally {
          setLoading(false);
        }
      }}
    >
      Login & Continue
    </Button>

    <p className="sw-jr-auth-note">
      Don’t have an account?{" "}
      <span
  className="sw-jr-auth-register"
  onClick={() => {


    // save redirect
    localStorage.setItem("postAuthRedirect", window.location.pathname);

    // close modal
    setShowLoginModal(false);

    // go to landing page
    navigate("/");

    // open register popup on landing
    setTimeout(() => {
      const win = window as any;
      if (win.openAuthModal) {
        win.openAuthModal("register");
      } else {
        console.warn("openAuthModal not found");
      }
    },0);
  }}
>
  Register
</span>



   
    </p>
  </div>
</Modal>






        <p className="sw-jr-bk-footer-hint">Safe • Reliable • Premium</p>
      </div>






    </div>
  );
};

export default BookRide;