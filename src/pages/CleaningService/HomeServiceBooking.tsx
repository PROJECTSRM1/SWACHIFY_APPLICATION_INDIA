import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, Input, Button } from "antd";
import CleaningHeader from "./CleaningHeader";
import { HOME_SERVICE_CONFIG } from "./homeServiceConfig";
import "./HomeServiceBooking.css";
import BookCleaningScreenWeb from "../../pages/dashboard/homeservices/BookCleaningScreenWeb";
import { customerLogin } from "../../api/customerAuth";
import { useNavigate } from "react-router-dom";

const HomeServiceBooking: React.FC = () => {
  const { serviceKey } = useParams<{ serviceKey: string }>();
  const config = HOME_SERVICE_CONFIG[serviceKey!];
  const navigate = useNavigate();


  const [cart, setCart] = useState<any | null>(null);
  const [step, setStep] = useState<
    "idle" | "login" | "otp" | "booking" | "done"
  >("idle");

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
  !!localStorage.getItem("accessToken")
);


useEffect(() => {
  const handleStorageChange = () => {
    setIsAuthenticated(!!localStorage.getItem("accessToken"));
  };

  window.addEventListener("storage", handleStorageChange);
  handleStorageChange(); // initial sync

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);
  
   const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
      <div className="hsb-error">
        <div className="hsb-error-content">
          <div className="hsb-error-icon">🔍</div>
          <h2>Service not found</h2>
          <p>The requested service could not be found.</p>
          <Button type="primary" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <CleaningHeader />

      <section className="hsb-page">
        {/* LEFT SECTION */}
        <div className="hsb-left">
          <div className="hsb-hero">
            <div className="hsb-breadcrumb">
              Home / Services / {config.title}
            </div>
            <h1 className="hsb-main-title">{config.title}</h1>
            <p className="hsb-description">
              Professional service at your doorstep
            </p>
            
            <div className="hsb-stats">
              <div className="hsb-stat-item">
                <span className="hsb-stat-icon">⭐</span>
                <div>
                  <div className="hsb-stat-value">{config.rating}</div>
                  <div className="hsb-stat-label">Rating</div>
                </div>
              </div>
              <div className="hsb-stat-divider"></div>
              <div className="hsb-stat-item">
                <span className="hsb-stat-icon">📋</span>
                <div>
                  <div className="hsb-stat-value">{config.bookings}</div>
                  <div className="hsb-stat-label">Bookings</div>
                </div>
              </div>
              <div className="hsb-stat-divider"></div>
              <div className="hsb-stat-item">
                <span className="hsb-stat-icon">✓</span>
                <div>
                  <div className="hsb-stat-value">Verified</div>
                  <div className="hsb-stat-label">Professionals</div>
                </div>
              </div>
            </div>
          </div>

          <div className="hsb-services-section">
            <h3 className="hsb-section-title">Available Services</h3>
            
            <div className="hsb-services">
              {config.services.map((service) => {
                const isSelected = cart?.id === service.id;
                
                return (
                  <div 
                    key={service.id} 
                    className={`hsb-card ${isSelected ? 'hsb-card-selected' : ''}`}
                    onClick={() => setCart(service)}
                  >
                    <div className="hsb-card-content">
                      <div className="hsb-card-header">
                        <h4 className="hsb-service-name">{service.title}</h4>
                        {isSelected && (
                          <span className="hsb-selected-badge">✓ Selected</span>
                        )}
                      </div>
                      
                      <div className="hsb-service-details">
                        <div className="hsb-detail-item">
                          <span className="hsb-detail-icon">⏱</span>
                          <span className="hsb-detail-text">{service.duration}</span>
                        </div>
                      </div>
                      
                      <div className="hsb-card-footer">
                        <div className="hsb-price-section">
                          <span className="hsb-price">₹{service.price}</span>
                        </div>
                        
                        <button
                          className={`hsb-add-btn ${isSelected ? 'hsb-added' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isSelected) {
                              setCart(null);
                            } else {
                              setCart(service);
                            }
                          }}
                        >
                          {isSelected ? "Remove" : "Select"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hsb-features-info">
            <div className="hsb-feature-item">
              <span className="hsb-feature-icon">🛡️</span>
              <div>
                <strong>Safe & Secure</strong>
                <p>Background verified professionals</p>
              </div>
            </div>
            <div className="hsb-feature-item">
              <span className="hsb-feature-icon">💯</span>
              <div>
                <strong>Quality Assured</strong>
                <p>Premium service guaranteed</p>
              </div>
            </div>
            <div className="hsb-feature-item">
              <span className="hsb-feature-icon">⚡</span>
              <div>
                <strong>Quick Service</strong>
                <p>Prompt and efficient delivery</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="hsb-right">
          <div className="hsb-sticky-container">
            {/* Video Preview */}
            {config.video && (
              <div className="hsb-video-container">
                <video
                  src={config.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="hsb-video"
                  poster="https://via.placeholder.com/600x400?text=Service+Preview"
                  onError={(e: any) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="hsb-video-overlay">
                  <div className="hsb-video-badge">
                    <span className="hsb-badge-icon">▶</span>
                    <span>Service Preview</span>
                  </div>
                </div>
              </div>
            )}

            {/* Cart */}
            <div className="hsb-cart">
              <div className="hsb-cart-header">
                <h4 className="hsb-cart-title">Your Selection</h4>
                {cart && (
                  <span className="hsb-cart-count">1 item</span>
                )}
              </div>

              {!cart ? (
                <div className="hsb-empty-cart">
                  <div className="hsb-empty-icon">🛒</div>
                  <p className="hsb-empty-text">No service selected</p>
                  <p className="hsb-empty-subtext">Choose a service from the list</p>
                </div>
              ) : (
                <>
                  <div className="hsb-cart-item">
                    <div className="hsb-cart-item-details">
                      <span className="hsb-cart-item-name">{cart.title}</span>
                      <span className="hsb-cart-item-duration">{cart.duration}</span>
                    </div>
                    <div className="hsb-cart-item-price-section">
                      <strong className="hsb-cart-item-price">₹{cart.price}</strong>
                      <button 
                        className="hsb-remove-btn"
                        onClick={() => setCart(null)}
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  <div className="hsb-cart-summary">
                    <div className="hsb-cart-total">
                      <span className="hsb-total-label">Total Amount</span>
                      <strong className="hsb-total-amount">₹{cart.price}</strong>
                    </div>
                  </div>

                 <button
  className="vc-proceed-btn"
  onClick={() => setStep(isAuthenticated ? "booking" : "login")}
>
                    <span>Proceed to Book</span>
                    <span className="hsb-btn-arrow">→</span>
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
        onCancel={() => setStep("idle")}
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

      {/* BOOKING DETAILS */}
      {step === "booking" && cart && (
        <div className="uc-overlay">
          <div className="uc-modal">
            <BookCleaningScreenWeb
              selectedServices={[
                {
                  id: cart.id,
                  title: cart.title,
                  price: cart.price,
                  category: "homeServices",
                },
              ]}
              consultationCharge={cart.price}
              serviceContext="homeServices"
              meta={{
                serviceKey,
              }}
              onClose={() => {
                setStep("idle");
                setCart(null);
                setMobile("");
                setOtp("");
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HomeServiceBooking;
