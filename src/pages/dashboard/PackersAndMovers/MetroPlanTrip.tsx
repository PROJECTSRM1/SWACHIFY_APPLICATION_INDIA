import React, { useState } from "react";
import QRCode from "qrcode";
import "./Metro.css";
import { customerLogin } from "../../../api/customerAuth";
import { Button, Input, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";


const stations = [
  { name: "Miyapur", line: "Red" },
  { name: "JNTU College", line: "Red" },
  { name: "KPHB Colony", line: "Red" },
  { name: "Kukatpally", line: "Red" },
  { name: "Moosapet", line: "Red" },
  { name: "Bharat Nagar", line: "Red" },
  { name: "Erragadda", line: "Red" },
  { name: "ESI Hospital", line: "Red" },
  { name: "S.R. Nagar", line: "Red" },
  { name: "Ameerpet", line: "Interchange" },
  { name: "Panjagutta", line: "Red" },
  { name: "Irrum Manzil", line: "Red" },
  { name: "Khairatabad", line: "Red" },
  { name: "Lakdikapul", line: "Red" },
  { name: "Assembly", line: "Red" },
  { name: "Nampally", line: "Red" },
  { name: "Gandhi Bhavan", line: "Red" },
  { name: "Osmania Medical", line: "Red" },
  { name: "MGBS", line: "Interchange" },

  { name: "Nagole", line: "Blue" },
  { name: "Uppal", line: "Blue" },
  { name: "Stadium", line: "Blue" },
  { name: "NGRI", line: "Blue" },
  { name: "Habsiguda", line: "Blue" },
  { name: "Tarnaka", line: "Blue" },
  { name: "Mettuguda", line: "Blue" },
  { name: "Secunderabad East", line: "Blue" },
  { name: "Parade Ground", line: "Interchange" },
  { name: "Paradise", line: "Blue" },
  { name: "Rasoolpura", line: "Blue" },
  { name: "Prakash Nagar", line: "Blue" },
  { name: "Begumpet", line: "Blue" },
  { name: "Madhura Nagar", line: "Blue" },
  { name: "Yousufguda", line: "Blue" },
  { name: "Jubilee Hills Rd 5", line: "Blue" },
  { name: "Jubilee Hills CP", line: "Blue" },
  { name: "Peddamma Temple", line: "Blue" },
  { name: "Madhapur", line: "Blue" },
  { name: "Durgam Cheruvu", line: "Blue" },
  { name: "Hitech City", line: "Blue" },
  { name: "Raidurg", line: "Blue" },

  { name: "JBS Parade Ground", line: "Green" },
  { name: "Secunderabad West", line: "Green" },
  { name: "Gandhi Hospital", line: "Green" },
  { name: "Musheerabad", line: "Green" },
  { name: "RTC X Roads", line: "Green" },
  { name: "Chikkadpally", line: "Green" },
  { name: "Narayanaguda", line: "Green" },
  { name: "Sultan Bazar", line: "Green" },
  { name: "JBS", line: "Green" }
];

const MetroPlanTrip: React.FC<{ closePlan: () => void; showQR: (d: any) => void }> = ({
  closePlan,
  showQR
}) => {
  const [showPopup, setShowPopup] = useState(false);
 const [popupType, setPopupType] = useState<"boarding" | "dropoff" | null>(null);


  const [boarding, setBoarding] = useState("Select");
  const [dropoff, setDropoff] = useState("Select");
  const [tripType, setTripType] = useState("oneway");

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  
  
  
  // Example auth check (replace with your real auth logic)
 
  
  
  const onLogin = async (values: any) => {
    const res: any = await customerLogin({
      email_or_phone: values.identifier,
      password: values.password,
    });
  
    localStorage.setItem("user_id", res.user_id);
    localStorage.setItem("accessToken", res.access_token);
    localStorage.setItem("user", JSON.stringify(res));
  };
  
  

  const calculateFare = () => {
    if (boarding === "Select" || dropoff === "Select") return 0;

    const startIndex = stations.findIndex((s) => s.name === boarding);
    const endIndex = stations.findIndex((s) => s.name === dropoff);

    const distance = Math.abs(startIndex - endIndex);

    if (distance <= 2) return tripType === "oneway" ? 10 : 20;
    if (distance <= 5) return tripType === "oneway" ? 20 : 40;
    if (distance <= 9) return tripType === "oneway" ? 30 : 60;
    if (distance <= 14) return tripType === "oneway" ? 40 : 80;

    return tripType === "oneway" ? 50 : 100;
  };

  const fare = calculateFare();

  const handlePay = async () => {
   const isLoggedIn = !!localStorage.getItem("accessToken");
    console.log("isLoggedIn:", isLoggedIn);

  if (!isLoggedIn) {
    setShowLoginModal(true);   // 🔐 open login popup
    return;
  }

  if (boarding === "Select" || dropoff === "Select") {
    alert("Please select stations.");
    return;
  }

  const ticketId = `T-${Math.floor(100000 + Math.random() * 900000)}`;

  const qrPayload = {
    from: boarding,
    to: dropoff,
    tripType,
    fare,
    ticketId,
    time: Date.now()
  };

  const qrUrl = await QRCode.toDataURL(JSON.stringify(qrPayload));

  showQR({
    ...qrPayload,
    qr: qrUrl
  });

  closePlan();
};


  return (
    <div className="sw-jr-page">
      <div className="sw-jr-center-box">
        <div className="sw-jr-back-btn" onClick={closePlan}>
          ← BACK
        </div>

        <div className="sw-jr-big-title">Plan Your Trip</div>

        <div className="sw-jr-input-card">
          <div className="sw-jr-input-label">BOARDING STATION</div>
          <div className="sw-jr-input-box" onClick={() => {
            setPopupType("boarding");
            setShowPopup(true);
          }}>
            {boarding}
          </div>
        </div>

        <div className="sw-jr-swap-wrap">
          <div className="sw-jr-swap-arrow">⇅</div>
        </div>

        <div className="sw-jr-input-card">
          <div className="sw-jr-input-label">DROP-OFF STATION</div>
          <div className="sw-jr-input-box" onClick={() => {
            setPopupType("dropoff");
            setShowPopup(true);
          }}>
            {dropoff}
          </div>
        </div>

        <div className="sw-jr-trip-tabs">
          <div
            className={`sw-jr-trip-tab ${tripType === "oneway" ? "active" : ""}`}
            onClick={() => setTripType("oneway")}
          >
            ONE WAY
          </div>

          <div
            className={`sw-jr-trip-tab ${tripType === "twoway" ? "active" : ""}`}
            onClick={() => setTripType("twoway")}
          >
            TWO WAY
          </div>
        </div>

        <div className="sw-jr-fare-box">
          <div className="sw-jr-fare-label">FARE</div>
          <div className="sw-jr-fare-amount">₹{fare}</div>
        </div>

        <div className="sw-jr-pay-btn" 
          onClick={() => {
    console.log("PAY CLICKED");
    handlePay();
  }}
        >
          PAY ₹{fare} & BOOK
        </div>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="sw-jr-popup-overlay">
          <div className="sw-jr-popup-box">
            <div className="sw-jr-popup-header">
              <span className="sw-jr-popup-title">
                {popupType === "boarding" ? "Boarding Station" : "Drop-off Station"}
              </span>
              <span className="sw-jr-popup-close" onClick={() => setShowPopup(false)}>✕</span>
            </div>

            <div className="sw-jr-popup-list">
              {stations.map((s) => (
                <div
                  key={s.name}
                  className="sw-jr-popup-station"
                  onClick={() => {
                    popupType === "boarding" ? setBoarding(s.name) : setDropoff(s.name);
                    setShowPopup(false);
                  }}
                >
                  <div className={`sw-jr-popup-dot ${s.line.toLowerCase()}`}></div>
                  <div>
                    <div className="sw-jr-popup-station-name">{s.name}</div>
                    <div className="sw-jr-popup-line">
                      {s.line === "Interchange" ? "Interchange Line" : `${s.line} Line`}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
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
    handlePay();   // 🔁 continue booking after login
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

    </div>
  );
};

export default MetroPlanTrip;
