import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, Input, Button } from "antd";
import CleaningHeader from "./CleaningHeader";
import "./KitchenCleaning.css";
import BookCleaningScreenWeb from "../../pages/dashboard/homeservices/BookCleaningScreenWeb";

import kitchenImg from "../../assets/CleaningServices/Kitchen2.jpg";
import bathroomImg from "../../assets/CleaningServices/bathroom.jpeg";
import sofaImg from "../../assets/CleaningServices/conference.jpg";
import bedroomImg from "../../assets/CleaningServices/bedroom.png";
import windowImg from "../../assets/CleaningServices/window.png";
import { customerLogin } from "../../api/customerAuth";
import { useNavigate } from "react-router-dom";

type Service = {
  title: string;
  price: number;
  duration: string;
};

const SERVICE_CONFIG: Record<
  string,
  { title: string; image: string; services: Service[]; description: string }
> = {
  kitchen: {
    title: "Kitchen Cleaning",
    image: kitchenImg,
    description: "Professional deep cleaning for your kitchen",
    services: [
      { title: "Basic Kitchen Cleaning", price: 499, duration: "45 mins" },
      { title: "Deep Kitchen Cleaning", price: 899, duration: "1 hr 30 mins" },
      { title: "Chimney Cleaning", price: 699, duration: "60 mins" },
      { title: "Fridge Cleaning", price: 399, duration: "30 mins" },
    ],
  },
  bathroom: {
    title: "Bathroom Cleaning",
    image: bathroomImg,
    description: "Sanitize and sparkle your bathrooms",
    services: [
      { title: "Basic Bathroom Cleaning", price: 399, duration: "40 mins" },
      { title: "Deep Bathroom Cleaning", price: 699, duration: "1 hr" },
    ],
  },
  sofa: {
    title: "Sofa Cleaning",
    image: sofaImg,
    description: "Professional upholstery care and stain removal",
    services: [
      { title: "3-Seater Sofa Cleaning", price: 599, duration: "45 mins" },
      { title: "5-Seater Sofa Cleaning", price: 899, duration: "75 mins" },
    ],
  },
  bedroom: {
    title: "Bedroom Cleaning",
    image: bedroomImg,
    description: "Complete bedroom refresh and mattress care",
    services: [
      { title: "Bedroom Cleaning", price: 499, duration: "45 mins" },
      { title: "Mattress Cleaning", price: 399, duration: "30 mins" },
    ],
  },
  window: {
    title: "Window Cleaning",
    image: windowImg,
    description: "Crystal clear windows inside and out",
    services: [
      { title: "Window Cleaning (per window)", price: 99, duration: "10 mins" },
    ],
  },
  "full deep": {
  title: "Full Home Deep Cleaning",
  image: bedroomImg,
  description: "Complete deep cleaning for your entire home",
  services: [
    { title: "1 BHK Full Deep Cleaning", price: 2499, duration: "3 – 4 hrs" },
    { title: "2 BHK Full Deep Cleaning", price: 3499, duration: "4 – 5 hrs" },
    { title: "3 BHK Full Deep Cleaning", price: 4499, duration: "5 – 6 hrs" },
  ],
},
};

const HomeCleaningCategory: React.FC = () => {
   const navigate = useNavigate();
  const { category = "kitchen" } = useParams();
  const config = SERVICE_CONFIG[category];

  const [cart, setCart] = useState<Service[]>([]);
  const [step, setStep] = useState<
    "services" | "login" | "otp" | "booking" | "done"
  >("services");
  const [identifier, setIdentifier] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

  const [mobile,] = useState("");
  const [otp, setOtp] = useState("");

  const addToCart = (item: Service) => {
    if (!cart.find((c) => c.title === item.title)) {
      setCart([...cart, item]);
    }
  };
  const isAuthenticated = !!localStorage.getItem("accessToken");


  const removeFromCart = (item: Service) => {
    setCart(cart.filter((c) => c.title !== item.title));
  };

  const total = cart.reduce((s, i) => s + i.price, 0);

  const onLogin = async (values: any) => {
    try{
      const res: any = await customerLogin({
              email_or_phone: values.identifier,
              password: values.password,
            });
            localStorage.setItem("user_id", res.user_id);
      
            localStorage.setItem("accessToken", res.access_token);
            localStorage.setItem("user", JSON.stringify(res));
    }
    catch(error){
      console.error("Login failed:", error);
    }
  }

 if (!config) {
  return (
    <>
      <CleaningHeader />
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Service not found</h2>
        <p>Category: <b>{category}</b></p>
      </div>
    </>
  );
}

  return (
    <>
      <CleaningHeader />

      <section className="kc-page">
        {/* LEFT SECTION */}
        <div className="kc-left">
          <div className="kc-hero">
            <div className="kc-breadcrumb">
              Home / Cleaning Services / {config.title}
            </div>
            <h1 className="kc-main-title">{config.title}</h1>
            <p className="kc-description">{config.description}</p>
            
            <div className="kc-stats">
              <div className="kc-stat-item">
                <span className="kc-stat-icon">⭐</span>
                <div>
                  <div className="kc-stat-value">4.8</div>
                  <div className="kc-stat-label">Rating</div>
                </div>
              </div>
              <div className="kc-stat-divider"></div>
              <div className="kc-stat-item">
                <span className="kc-stat-icon">📋</span>
                <div>
                  <div className="kc-stat-value">2.3M+</div>
                  <div className="kc-stat-label">Bookings</div>
                </div>
              </div>
              <div className="kc-stat-divider"></div>
              <div className="kc-stat-item">
                <span className="kc-stat-icon">✓</span>
                <div>
                  <div className="kc-stat-value">Verified</div>
                  <div className="kc-stat-label">Professionals</div>
                </div>
              </div>
            </div>
          </div>

          <div className="kc-services-section">
            <h3 className="kc-section-title">Available Services</h3>
            
            <div className="kc-services">
              {config.services.map((s, i) => {
                const isAdded = cart.some((c) => c.title === s.title);
                
                return (
                  <div key={i} className={`kc-card ${isAdded ? 'kc-card-added' : ''}`}>
                    <div className="kc-card-content">
                      <div className="kc-card-header">
                        <h4 className="kc-service-name">{s.title}</h4>
                        {isAdded && <span className="kc-added-badge">✓ Added</span>}
                      </div>
                      
                      <div className="kc-service-details">
                        <div className="kc-detail-item">
                          <span className="kc-detail-icon">⏱</span>
                          <span className="kc-detail-text">{s.duration}</span>
                        </div>
                      </div>
                      
                      <div className="kc-card-footer">
                        <div className="kc-price-section">
                          <span className="kc-price">₹{s.price}</span>
                        </div>
                        
                        <button
                          className={`kc-add-btn ${isAdded ? 'kc-added' : ''}`}
                          onClick={() => isAdded ? removeFromCart(s) : addToCart(s)}
                        >
                          {isAdded ? "Remove" : "Add"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="kc-features-info">
            <div className="kc-feature-item">
              <span className="kc-feature-icon">🛡️</span>
              <div>
                <strong>Safe & Secure</strong>
                <p>Background verified professionals</p>
              </div>
            </div>
            <div className="kc-feature-item">
              <span className="kc-feature-icon">🌿</span>
              <div>
                <strong>Eco-Friendly</strong>
                <p>Chemical-free cleaning products</p>
              </div>
            </div>
            <div className="kc-feature-item">
              <span className="kc-feature-icon">💯</span>
              <div>
                <strong>100% Satisfaction</strong>
                <p>Money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="kc-right">
          <div className="kc-sticky-container">
            <div className="kc-image-container">
              <img src={config.image} alt={config.title} className="kc-main-image" />
              <div className="kc-image-overlay">
                <div className="kc-overlay-badge">
                  <span className="kc-badge-icon">⚡</span>
                  <span>Quick Service</span>
                </div>
              </div>
            </div>

            <div className="kc-cart">
              <div className="kc-cart-header">
                <h4 className="kc-cart-title">Your Cart</h4>
                {cart.length > 0 && (
                  <span className="kc-cart-count">{cart.length} item{cart.length > 1 ? 's' : ''}</span>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="kc-empty-cart">
                  <div className="kc-empty-icon">🛒</div>
                  <p className="kc-empty-text">Your cart is empty</p>
                  <p className="kc-empty-subtext">Add services to get started</p>
                </div>
              ) : (
                <>
                  <div className="kc-cart-items">
                    {cart.map((item, i) => (
                      <div key={i} className="kc-cart-item">
                        <div className="kc-cart-item-details">
                          <span className="kc-cart-item-name">{item.title}</span>
                          <span className="kc-cart-item-duration">{item.duration}</span>
                        </div>
                        <div className="kc-cart-item-price-section">
                          <strong className="kc-cart-item-price">₹{item.price}</strong>
                          <button 
                            className="kc-remove-btn"
                            onClick={() => removeFromCart(item)}
                            title="Remove"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="kc-cart-summary">
                    <div className="kc-cart-total">
                      <span className="kc-total-label">Total Amount</span>
                      <strong className="kc-total-amount">₹{total}</strong>
                    </div>
                    
                    <div className="kc-savings-info">
                      💰 You're saving ₹{Math.floor(total * 0.1)} on this booking
                    </div>
                  </div>

                 <button
  className="kc-proceed-btn"
  onClick={() => {
    if (isAuthenticated) {
      // ✅ User already logged in → go directly to booking
      setStep("booking");
    } else {
      // ❌ Not logged in → show login flow
      setStep("login");
    }
  }}
>
  <span>Proceed to Book</span>
  <span className="kc-btn-arrow">→</span>
</button>

                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* LOGIN MODAL */}
      <Modal
        open={step === "login"}
        footer={null}
        centered
        onCancel={() => setStep("services")}
        className="auth-modal"
        closeIcon={<span className="auth-close">✕</span>}
      >
        <div className="auth-box">
          <div className="auth-icon">📱</div>
          <h3 className="auth-title">Login to continue</h3>
          <p className="auth-subtitle">
            We'll send a one-time password to your mobile
          </p>

         <Input
  className="auth-input"
  placeholder="Email or mobile number"
  value={identifier}
  onChange={(e) => setIdentifier(e.target.value)}
/>

<Input.Password
  className="auth-input"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>


         <Button
  type="primary"
  block
  className="auth-button"
  loading={loading}
  disabled={!identifier || !password}
  onClick={async () => {
    try {
      setLoading(true);

      await onLogin({
        identifier,
        password,
      });

      // ✅ login success → go to booking
      setStep("booking");
    } catch (e) {
      // optional toast
    } finally {
      setLoading(false);
    }
  }}
>
  Login & Continue
</Button>


         <p className="auth-note">
  Don’t have an account?{" "}
  <span
    style={{ color: "#1677ff", cursor: "pointer", fontWeight: 500 }}
    onClick={() => {
      // ✅ save where user came from
      localStorage.setItem(
        "postAuthRedirect",
        window.location.pathname
      );

      navigate("/");

      setTimeout(() => {
        if ((window as any).openAuthModal) {
          (window as any).openAuthModal("register");
        }
      }, 0);
    }}
  >
    Register
  </span>
</p>
        </div>
      </Modal>

      {/* OTP MODAL */}
      <Modal
        open={step === "otp"}
        footer={null}
        centered
        onCancel={() => setStep("login")}
        className="auth-modal"
        closeIcon={<span className="auth-close">✕</span>}
      >
        <div className="auth-box">
          <div className="auth-icon">🔐</div>
          <h3 className="auth-title">Verify OTP</h3>
          <p className="auth-subtitle">
            Enter the 6-digit code sent to <strong>{mobile}</strong>
          </p>

          <Input
            className="auth-input otp-input"
            placeholder="Enter OTP"
            maxLength={6}
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/[^0-9]/g, ""))
            }
          />

          <Button
            type="primary"
            block
            className="auth-button"
            disabled={otp.length !== 6}
            onClick={() => {
              setOtp("");
              setStep("booking");
            }}
          >
            Verify & Continue
          </Button>

          <button className="auth-resend-btn">
            Didn't receive code? <strong>Resend</strong>
          </button>
        </div>
      </Modal>

      {/* DONE MODAL */}
      <Modal 
        open={step === "done"} 
        footer={null} 
        centered 
        closable={false}
        className="auth-modal success-modal"
      >
        <div className="auth-box success-box">
          <div className="success-icon">🎉</div>
          <h3 className="success-title">Booking Confirmed!</h3>
          <p className="success-message">Your cleaning service has been booked successfully</p>
          
          <div className="success-details">
            <div className="success-detail-item">
              <span className="success-label">Total Paid</span>
              <strong className="success-value">₹{total}</strong>
            </div>
          </div>

          <Button 
            type="primary" 
            block 
            className="success-button"
            onClick={() => window.location.reload()}
          >
            Done
          </Button>
        </div>
      </Modal>

      {/* BOOKING DETAILS */}
      {step === "booking" && (
        <div className="uc-overlay">
          <div className="uc-modal">
            <BookCleaningScreenWeb
              selectedServices={cart.map((c, i) => ({
                id: String(i),
                title: c.title,
                price: c.price,
                category: "homeServices",
              }))}
              consultationCharge={total}
              serviceContext="homeServices"
              onClose={() => setStep("services")}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HomeCleaningCategory;
