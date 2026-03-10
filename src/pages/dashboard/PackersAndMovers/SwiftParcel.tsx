import React, { useState } from 'react';
import { Input, Button, Modal, message } from 'antd';
import {
  EnvironmentOutlined, UserOutlined, PhoneOutlined,
  ArrowRightOutlined, EnvironmentFilled, CodeSandboxOutlined,
  CreditCardOutlined, LeftOutlined, CheckCircleFilled,
  FileTextOutlined, CoffeeOutlined, BlockOutlined,
  SkinOutlined, MedicineBoxOutlined, AppstoreOutlined,
  CarOutlined, WarningFilled
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { customerLogin, PaymentsAPI } from '../../../api/customerAuth';
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import "./JustRide.css";
import { useMap } from "react-leaflet";




const SwiftParcel: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // --- FORM STATE ---
  const [dropOff, setDropOff] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [phone, setPhone] = useState('');
  const [otherDescription, setOtherDescription] = useState('');
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/";
   const [showLoginModal, setShowLoginModal] = useState(false);

  
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showTrackPage, setShowTrackPage] = useState(false);
  // Fake route (Gurgaon demo)
const pickup: [number, number] = [28.4595, 77.0266];
const drop: [number, number] = [28.4708, 77.0400];

const [riderPosition, setRiderPosition] = useState<[number, number]>(pickup);
const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);


const riderIcon = L.divIcon({
  className: "",
  html: `<div id="rider-icon">🏍️</div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});



useEffect(() => {
  if (!showTrackPage) return;

  const fetchRoute = async () => {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${pickup[1]},${pickup[0]};${drop[1]},${drop[0]}?overview=full&geometries=geojson`
    );

    const data = await response.json();
    const coords = data.routes[0].geometry.coordinates.map(
      (c: [number, number]) => [c[1], c[0]]
    );

    setRouteCoords(coords);
  };

  fetchRoute();
}, [showTrackPage]);


useEffect(() => {
  if (!routeCoords.length) return;

  let index = 0;

const interval = setInterval(() => {
  const current = routeCoords[index];
  const next = routeCoords[index + 1];

  setRiderPosition(current);

  if (next) {
    const angle =
      (Math.atan2(next[1] - current[1], next[0] - current[0]) *
        180) /
      Math.PI;

    const el = document.getElementById("rider-icon");
    if (el) {
      el.style.transform = `rotate(${angle}deg)`;
    }
  }

  index += 2; // 👈 skip some points for smoothness

  if (index >= routeCoords.length - 1) {
    clearInterval(interval);
  }
}, 60);




  return () => clearInterval(interval);
}, [routeCoords]);

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




  const handleOk = () => {
    navigate(redirectTo);
  };

  const toggleItem = (item: string) => {
    setSelectedItems(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };






  const handlePayment = async () => {
    try {
      // Booking ID as a number
      // ✅ number
      const tempHomeServiceId = 25;

      // Create Razorpay order
      const order = await PaymentsAPI.createOrder(tempHomeServiceId, 10700);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "SwiftParcel Delivery",
        description: "Parcel Delivery Charges",
        order_id: order.id,

        prefill: {
          name: receiverName,
          contact: phone,
        },

        // handler: function (response: any) {
        //   // FRONTEND-ONLY: skip verifyPayment, show modal directly
        //   console.log("Payment ID:", response.razorpay_payment_id);
        //   setIsModalVisible(true); // show success modal
        // },

        handler: async function (response: any) {
          try {
            // 2️⃣ Verify payment with backend
            await PaymentsAPI.verifyPayment(
              order.id,
              response.razorpay_payment_id,
              response.razorpay_signature,
              tempHomeServiceId
            );
            // message.success("Payment Successful 🎉");
            setIsModalVisible(true); // Show success modal
          } catch (err) {
            message.error("Payment verification failed");
          }
        },


        theme: { color: "#7c3aed" },
      };

      //@ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      message.error("Payment failed to start");
    }
  };






  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    else {
      navigate(-1);
    }
  };

  const handleContinue = () => {
  // Step 1 Validation
  if (currentStep === 1) {
    if (!dropOff || !receiverName || !phone) {
      message.error("Please fill in all recipient details");
      return;
    }

    if (phone.length < 10) {
      message.error("Please enter a valid mobile number");
      return;
    }
  }

  // Step 2 Validation + 🔐 Login Check
  if (currentStep === 2) {
    if (selectedItems.length === 0) {
      message.warning("Please select at least one item to continue");
      return;
    }

    if (selectedItems.includes("other") && !otherDescription.trim()) {
      message.error("Please describe the item to continue");
      return;
    }

    if (!isLoggedIn) {
      setShowLoginModal(true);   // 🔐 open login modal
      return;
    }
  }

  // Navigation
  if (currentStep < 3) {
    setCurrentStep((prev) => prev + 1);
  } else {
    handlePayment();
  }
};




  return (
    <div className="sw-jr-pr-container">
      <div className="sw-jr-pr-card">
        {/* Header */}
        <div className="sw-jr-pr-header">
          <div className="sw-jr-pr-header-left" style={{ display: 'flex', alignItems: 'center' }}>

            {/* Back Button: always visible */}
            <Button
              icon={<LeftOutlined />}
              className="sw-jr-pr-back-btn"
              aria-label="Go Back"
              onClick={handleBack}
              style={{ marginRight: 12 }} // spacing from logo
            />

            {/* Logo */}
            <h1 className="sw-jr-pr-logo">SwiftParcel</h1>
          </div>
          <div className="sw-jr-pr-live-badge">
            <span className="sw-jr-pr-truck-emoji">🚚</span> LIVE
          </div>
        </div>

        {/* Stepper UI */}
        <div className="sw-jr-pr-steps-wrapper">
          <div className={`sw-jr-pr-step ${currentStep >= 1 ? 'active' : ''}`}>
            <div className="sw-jr-pr-step-icon">
              {currentStep > 1 ? <CheckCircleFilled className="sw-jr-pr-success-icon" /> : <EnvironmentFilled />}
            </div>
            <span>Details</span>
          </div>
          <div className={`sw-jr-pr-step-line ${currentStep > 1 ? 'filled' : ''}`}></div>
          <div className={`sw-jr-pr-step ${currentStep >= 2 ? 'active' : ''}`}>
            <div className="sw-jr-pr-step-icon">
              {currentStep > 2 ? <CheckCircleFilled className="sw-jr-pr-success-icon" /> : <CodeSandboxOutlined />}
            </div>
            <span>Package</span>
          </div>
          <div className={`sw-jr-pr-step-line ${currentStep > 2 ? 'filled' : ''}`}></div>
          <div className={`sw-jr-pr-step ${currentStep === 3 ? 'active' : ''}`}>
            <div className="sw-jr-pr-step-icon"><CreditCardOutlined /></div>
            <span>Payment</span>
          </div>
        </div>   


        {/* STEP 1: DETAILS */}
        {currentStep === 1 && (
          <div className="sw-jr-pr-content-fade">
            <label className="sw-jr-pr-label"><EnvironmentOutlined /> PICKUP LOCATION</label>
            <div className="sw-jr-pr-input-card filled">
              <div className="sw-jr-pr-inner-icon"><EnvironmentFilled /></div>
              <div className="sw-jr-pr-address-text">Sector 44, Gurgaon, HR - 122003</div>
            </div>

            <label className="sw-jr-pr-label pink"><EnvironmentOutlined /> DROP-OFF ADDRESS</label>
            <div className="sw-jr-pr-input-card">
              <div className="sw-jr-pr-inner-icon pink"><EnvironmentFilled /></div>
              <Input
                placeholder="Enter destination address..."
                bordered={false}
                className="sw-jr-pr-custom-input"
                value={dropOff}
                autoComplete="off"
                allowClear
                onChange={(e) => setDropOff(e.target.value)}
              />

            </div>

            <label className="sw-jr-pr-label green"><UserOutlined /> RECIPIENT DETAILS</label>
            <div className="sw-jr-pr-input-card mb-12">
              <div className="sw-jr-pr-inner-icon green"><UserOutlined /></div>
              <Input
                placeholder="Receiver's Full Name"
                bordered={false}

                autoComplete="off"
                allowClear
                className="sw-jr-pr-custom-input"
                value={receiverName}
                onChange={(e) => {
                  const raw = e.target.value;


                  if (/[0-9]/.test(raw)) {
                    message.error("Full name cannot contain digits");
                  }


                  const cleaned = raw.replace(/[0-9]/g, "");
                  setReceiverName(cleaned);
                }}
              />
            </div>
            <div className="sw-jr-pr-input-card">
              <div className="sw-jr-pr-inner-icon blue"><PhoneOutlined /></div>
              <Input
                placeholder="10-digit Mobile Number"
                bordered={false}
                className="sw-jr-pr-custom-input"

                autoComplete="off"
                allowClear
                value={phone}
                onChange={(e) => {
                  const raw = e.target.value;


                  if (/[^0-9]/.test(raw)) {
                    message.error("Mobile number accepts digits only");
                  }


                  const cleaned = raw.replace(/[^0-9]/g, "").slice(0, 10);
                  setPhone(cleaned);
                }}
              />
            </div>
          </div>
        )}

        {/* STEP 2: PACKAGE */}
        {currentStep === 2 && (
          <div className="sw-jr-pr-content-fade">
            <div className="sw-jr-pr-section-header">
              <div>
                <h2 className="sw-jr-pr-title">Choose Items</h2>
                <p className="sw-jr-pr-subtitle">Multi-select is enabled</p>
              </div>
              <div className="sw-jr-pr-badge-container">
                <span className="sw-jr-pr-badge-text">{selectedItems.length} Selected</span>
              </div>
            </div>

            <div className="sw-jr-pr-item-grid">
              {[
                { id: 'docs', label: 'DOCUMENTS', icon: <FileTextOutlined /> },
                { id: 'food', label: 'FOOD', icon: <CoffeeOutlined /> },
                { id: 'elec', label: 'ELECTRONICS', icon: <BlockOutlined /> },
                { id: 'cloth', label: 'CLOTHING', icon: <SkinOutlined /> },
                { id: 'med', label: 'MEDICINE', icon: <MedicineBoxOutlined /> },
                { id: 'other', label: 'OTHER', icon: <AppstoreOutlined /> },
              ].map(item => (
                <div
                  key={item.id}
                  className={`sw-jr-pr-item-card ${selectedItems.includes(item.id) ? 'selected' : ''}`}
                  onClick={() => toggleItem(item.id)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selectedItems.includes(item.id)}
                  aria-label={`Select ${item.label}`}
                >

                  <div className="sw-jr-pr-item-icon">{item.icon}</div>
                  <div className="sw-jr-pr-item-label">{item.label}</div>
                </div>
              ))}
            </div>

            {/* DYNAMIC DESCRIPTION BOX FOR 'OTHER' */}
            {selectedItems.includes('other') && (
              <div className="sw-jr-pr-desc-card-container sw-jr-pr-content-fade">
                <div className="sw-jr-pr-desc-header">
                  <span className="sw-jr-pr-desc-label">ITEM DESCRIPTION</span>
                  <span className="sw-jr-pr-mandatory-tag">Mandatory</span>
                </div>
                <Input.TextArea
                  placeholder="Tell us what you're sending specifically..."
                  autoSize={{ minRows: 2, maxRows: 4 }}
                  className="sw-jr-pr-desc-input"
                  value={otherDescription}
                  onChange={(e) => setOtherDescription(e.target.value)}
                />
                {!otherDescription.trim() && (
                  <div className="sw-jr-pr-error-inline">
                    <WarningFilled /> Please describe the item to continue
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* STEP 3: PAYMENT */}
        {/* STEP 3: PAYMENT */}
{currentStep === 3 && (
  <div className="sw-jr-pr-content-fade">
    <div className="sw-jr-pr-invoice-card">

      {/* Header */}
      <div className="sw-jr-pr-invoice-header">
        <div>
          <h2 className="sw-jr-pr-invoice-title">Invoice</h2>
          <p className="sw-jr-pr-order-id">ORDER #SP-1681</p>
        </div>
        <div className="sw-jr-pr-invoice-icon-box">
          <CreditCardOutlined />
        </div>
      </div>

      {/* NEW INVOICE UI */}
      <div className="sw-jr-pr-invoice-box">

    <div className="sw-jr-pr-invoice-row">
        <span>Base Delivery Fee</span>
        <span className="sw-jr-pr-amount">₹45.00</span>
    </div>

    <div className="sw-jr-pr-invoice-row">
        <div>
            <span>Distance Surcharge</span>
            <p className="sw-jr-pr-sub">12.4 KM @ ₹5/KM</p>
        </div>
        <span className="sw-jr-pr-amount">₹62.00</span>
    </div>

    <div className="sw-jr-pr-invoice-row">
        <span>Insurance Coverage</span>
        <span className="sw-jr-pr-free">FREE</span>
    </div>

    <hr className="sw-jr-pr-sep" />

    <div className="sw-jr-pr-invoice-total">
        <span>Total Amount</span>
        <span className="sw-jr-pr-total-badge">₹107</span>
    </div>

</div>

    </div> {/* END invoice-card */}
  </div>
)}






        {/* FOOTER */}
        <div className="sw-jr-pr-footer">
          <Button
  type="primary"
  className={`sw-jr-pr-continue-btn ${currentStep === 3 ? 'final' : ''}`}

            onClick={handleContinue}
            aria-label={currentStep === 3 ? 'Confirm and Pay' : 'Continue to Next Step'}
          >
            {currentStep === 3 ? 'CONFIRM & PAY' : 'CONTINUE'} <ArrowRightOutlined />
          </Button>
        </div>

        {/* SUCCESS MODAL */}
        <Modal
          open={isModalVisible}
          footer={null}
          closable={false}
          centered
          destroyOnClose
          className="sw-jr-pr-success-modal"
          width={360}
        >
          <div className="sw-jr-pr-success-icon-wrapper">
            <CheckCircleFilled className="sw-jr-pr-main-check" />
          </div>

          <h2 className="sw-jr-pr-modal-title">Payment Successful!</h2>
          <p className="sw-jr-pr-modal-sub">
            Your delivery has been booked for <br />     
            <span className="sw-jr-pr-purple-text">Express Delivery</span>
          </p>

          <div className="sw-jr-pr-tracking-card">
            <div className="sw-jr-pr-track-item">
              <span className="sw-jr-pr-track-label"><CodeSandboxOutlined /> Tracking ID</span>
              <span className="sw-jr-pr-track-value">SP460821</span>
            </div>
            <div className="sw-jr-pr-track-item">


                 
              <span className="sw-jr-pr-track-label"><CarOutlined /> ETA</span>
              <span className="sw-jr-pr-track-value">15-20 mins</span>
            </div>
          </div>

          <Button
            type="primary"
            block
            className="sw-jr-pr-modal-okay-btn"
            onClick={() => {
              setIsModalVisible(false);
              handleOk();
            }


            }
          >
            OKAY
          </Button>
          <div
  className="sw-jr-pr-track-order-link"
  onClick={() => {
    setIsModalVisible(false);
    setShowTrackPage(true);
  }}
>
  Track My Order
</div>


         
        </Modal>
      </div>
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
                   setCurrentStep(3); 
            
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
      
      {showTrackPage && (
  <div className="sw-jr-pr-track-page">
    <div className="sw-jr-pr-track-header">
      <Button className="sw-jr-pr-track-back" onClick={() =>{ setShowTrackPage(false)
            setIsModalVisible(true)}
      }>← Back</Button>
      <h2>Track My Order</h2>
    </div>

    <div className="sw-jr-pr-track-card">
      <div className="sw-jr-pr-track-top">
        <div className="sw-jr-pr-track-id">Tracking ID: <b>SP460821</b></div>
        <div className="sw-jr-pr-track-bar">
          <div className="sw-jr-pr-track-bar-fill" />
        </div>
      </div>

      <div className="sw-jr-pr-track-body">
        <div className="sw-jr-pr-track-timeline">
          <div className="sw-jr-pr-track-step sw-jr-pr-done">📦 Order Confirmed</div>
          <div className="sw-jr-pr-track-step sw-jr-pr-done">🛵 Rider Assigned</div>
          <div className="sw-jr-pr-track-step sw-jr-pr-active">🚚 On the Way</div>
          <div className="sw-jr-pr-track-step">📍 Out for Delivery</div>
          <div className="sw-jr-pr-track-step">✅ Delivered</div>
        </div>

        <div className="sw-jr-pr-track-side">
          <div className="sw-jr-pr-track-rider">
            <img src="https://i.pravatar.cc/100?img=12" alt="rider" />
            <div>
              <b>Ramesh Kumar</b>
              <p>Delivery Partner</p>
              <span>📞 +91 9876543210</span>
            </div>
          </div>

          <div className="sw-jr-pr-track-eta">
            ⏱ ETA: <b>15–20 mins</b>
          </div>

          <div className="sw-jr-pr-track-map">

            <MapContainer
  center={pickup}
  zoom={14}
  style={{ height: "240px", borderRadius: "16px" }}
>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

  {/* Rider */}
  <Marker position={riderPosition} icon={riderIcon} />

  {/* Destination */}
  <Marker
  position={drop}
  icon={L.divIcon({
    className: "",
    html: `<div style="
      background:#22c55e;
      width:20px;
      height:20px;
      border-radius:50%;
      border:3px solid white;
      box-shadow:0 0 12px rgba(34,197,94,0.7);
    "></div>`,
    iconSize: [20, 20],
  })}
/>



  {/* Route Line */}
  {routeCoords.length > 0 && (
  <>
    {/* Shadow Line */}
    <Polyline
  positions={routeCoords}
  pathOptions={{
    color: "#22c55e",
    weight: 6,
    opacity: 0.9,
    lineCap: "round",
    lineJoin: "round",
    dashArray: "8 8", 
  }}
/>

   

    {/* Main Route */}
    <Polyline
  positions={routeCoords}
  pathOptions={{
    color: "#000",
    weight: 10,
    opacity: 0.08,
  }}
/>

   
  </>
)}

<AutoFollow position={riderPosition} />

  
</MapContainer>

         
          </div>
        </div>
      </div>
    </div>
  </div>
)}
                



           


    </div >
  );
};

export default SwiftParcel;

function AutoFollow({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, map.getZoom(), {
      animate: true,
    }); 
   }, [position]);

  return null;
}



