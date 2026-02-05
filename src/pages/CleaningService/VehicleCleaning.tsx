import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import CleaningHeader from "./CleaningHeader";
import "./VehicleCleaning.css";
import BookCleaningScreenWeb from "../../pages/dashboard/homeservices/BookCleaningScreenWeb";
import { customerLogin } from "../../api/customerAuth";
import { useNavigate } from "react-router";

type VehicleType = "Bike" | "Car" | "SUV";

const vehiclePackages: Record<
  VehicleType,
  { 
    title: string; 
    price: number; 
    duration: string;
    features: string[];
  }[]
> = {
  Bike: [
    { 
      title: "Basic Bike Wash", 
      price: 199, 
      duration: "20 mins",
      features: ["Exterior wash", "Tire cleaning", "Dashboard wipe"]
    },
    { 
      title: "Premium Bike Wash", 
      price: 299, 
      duration: "35 mins",
      features: ["Deep exterior wash", "Engine bay cleaning", "Polish & shine", "Seat cleaning"]
    },
  ],
  Car: [
    { 
      title: "Exterior Car Wash", 
      price: 399, 
      duration: "30 mins",
      features: ["Pressure wash", "Foam treatment", "Tire shine", "Windows cleaning"]
    },
    { 
      title: "Interior + Exterior", 
      price: 699, 
      duration: "60 mins",
      features: ["Complete exterior wash", "Vacuum cleaning", "Dashboard polish", "Seat cleaning"]
    },
    { 
      title: "Deep Car Cleaning", 
      price: 999, 
      duration: "90 mins",
      features: ["Premium exterior wash", "Interior detailing", "AC vent cleaning", "Wax polish"]
    },
  ],
  SUV: [
    { 
      title: "Exterior SUV Wash", 
      price: 499, 
      duration: "40 mins",
      features: ["Heavy-duty wash", "Under-chassis spray", "Tire treatment", "Window shine"]
    },
    { 
      title: "Interior + Exterior", 
      price: 899, 
      duration: "75 mins",
      features: ["Complete exterior", "Full interior vacuum", "Dashboard & console", "Seat treatment"]
    },
    { 
      title: "Deep SUV Cleaning", 
      price: 1299, 
      duration: "120 mins",
      features: ["Premium exterior", "Complete interior detailing", "Engine bay wash", "Premium wax coating"]
    },
  ],
};

const vehicleIcons: Record<VehicleType, string> = {
  Bike: "🏍️",
  Car: "🚗",
  SUV: "🚙"
};

const VehicleCleaning: React.FC = () => {
   const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState<VehicleType | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [step, setStep] = useState<
    "services" | "login" | "otp" | "booking" | "done"
  >("services");

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const isAuthenticated = !!localStorage.getItem("accessToken");
const [identifier, setIdentifier] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
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

  const addToCart = (item: any) => {
    if (!cart.find((c) => c.title === item.title)) {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (item: any) => {
    setCart(cart.filter((c) => c.title !== item.title));
  };

  const resetSelection = () => {
    setVehicleType(null);
    setCart([]);
  };

  return (
    <>
      <CleaningHeader />

      <section className="vc-page">
        {/* LEFT SECTION */}
        <div className="vc-left">
          <div className="vc-hero">
            <div className="vc-breadcrumb">
              Home / Services / Vehicle Cleaning
            </div>
            <h1 className="vc-main-title">Vehicle Cleaning Services</h1>
            <p className="vc-description">
              Professional cleaning for your bike, car, or SUV
            </p>
            
            <div className="vc-stats">
              <div className="vc-stat-item">
                <span className="vc-stat-icon">⭐</span>
                <div>
                  <div className="vc-stat-value">4.8</div>
                  <div className="vc-stat-label">Rating</div>
                </div>
              </div>
              <div className="vc-stat-divider"></div>
              <div className="vc-stat-item">
                <span className="vc-stat-icon">📋</span>
                <div>
                  <div className="vc-stat-value">980K+</div>
                  <div className="vc-stat-label">Bookings</div>
                </div>
              </div>
              <div className="vc-stat-divider"></div>
              <div className="vc-stat-item">
                <span className="vc-stat-icon">✓</span>
                <div>
                  <div className="vc-stat-value">Expert</div>
                  <div className="vc-stat-label">Cleaners</div>
                </div>
              </div>
            </div>
          </div>

          {/* VEHICLE TYPE SELECTION */}
          {!vehicleType && (
            <div className="vc-selection-section">
              <h3 className="vc-section-title">Select Your Vehicle Type</h3>
              
              <div className="vc-vehicle-grid">
                {(["Bike", "Car", "SUV"] as VehicleType[]).map((v) => (
                  <div 
                    key={v} 
                    className="vc-vehicle-card"
                    onClick={() => setVehicleType(v)}
                  >
                    <div className="vc-vehicle-icon-wrapper">
                      <span className="vc-vehicle-icon">{vehicleIcons[v]}</span>
                    </div>
                    <h4 className="vc-vehicle-name">{v}</h4>
                    <button className="vc-select-btn">
                      Select {v}
                    </button>
                  </div>
                ))}
              </div>

              <div className="vc-info-banner">
                <div className="vc-info-icon">ℹ️</div>
                <div>
                  <strong>Choose your vehicle type</strong>
                  <p>We offer customized cleaning packages for each vehicle category</p>
                </div>
              </div>
            </div>
          )}

          {/* PACKAGES SELECTION */}
          {vehicleType && (
            <div className="vc-packages-section">
              <div className="vc-selected-vehicle">
                <div className="vc-selected-header">
                  <span className="vc-selected-icon">{vehicleIcons[vehicleType]}</span>
                  <div>
                    <h3 className="vc-section-title">{vehicleType} Cleaning Packages</h3>
                    <p className="vc-selected-subtitle">Choose one or more packages</p>
                  </div>
                </div>
                <button className="vc-change-btn" onClick={resetSelection}>
                  Change Vehicle
                </button>
              </div>

              <div className="vc-packages">
                {vehiclePackages[vehicleType].map((pkg, i) => {
                  const isAdded = cart.find((c) => c.title === pkg.title);
                  
                  return (
                    <div 
                      key={i} 
                      className={`vc-package-card ${isAdded ? 'vc-card-added' : ''}`}
                    >
                      <div className="vc-package-header">
                        <div>
                          <h4 className="vc-package-name">{pkg.title}</h4>
                          <div className="vc-package-meta">
                            <span className="vc-duration">
                              <span className="vc-meta-icon">⏱</span>
                              {pkg.duration}
                            </span>
                          </div>
                        </div>
                        {isAdded && (
                          <span className="vc-added-badge">✓ Added</span>
                        )}
                      </div>

                      <div className="vc-features">
                        {pkg.features.map((feature, idx) => (
                          <div key={idx} className="vc-feature-item">
                            <span className="vc-check-icon">✓</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="vc-package-footer">
                        <div className="vc-price-section">
                          <span className="vc-price">₹{pkg.price}</span>
                        </div>
                        <button
                          className={`vc-add-btn ${isAdded ? 'vc-added' : ''}`}
                          onClick={() => isAdded ? removeFromCart(pkg) : addToCart(pkg)}
                        >
                          {isAdded ? "Remove" : "Add"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="vc-benefits">
            <h3 className="vc-benefits-title">Why Choose Our Service?</h3>
            <div className="vc-benefits-grid">
              <div className="vc-benefit-item">
                <div className="vc-benefit-icon">🧼</div>
                <div className="vc-benefit-content">
                  <strong>Premium Products</strong>
                  <p>High-quality cleaning solutions</p>
                </div>
              </div>
              <div className="vc-benefit-item">
                <div className="vc-benefit-icon">👨‍🔧</div>
                <div className="vc-benefit-content">
                  <strong>Expert Technicians</strong>
                  <p>Trained professionals</p>
                </div>
              </div>
              <div className="vc-benefit-item">
                <div className="vc-benefit-icon">📍</div>
                <div className="vc-benefit-content">
                  <strong>Doorstep Service</strong>
                  <p>We come to your location</p>
                </div>
              </div>
              <div className="vc-benefit-item">
                <div className="vc-benefit-icon">💯</div>
                <div className="vc-benefit-content">
                  <strong>100% Satisfaction</strong>
                  <p>Quality guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION - CART */}
        <div className="vc-right">
          <div className="vc-sticky-container">
            <div className="vc-cart">
              <div className="vc-cart-header">
                <h4 className="vc-cart-title">Your Cart</h4>
                {cart.length > 0 && (
                  <span className="vc-cart-count">{cart.length} item{cart.length > 1 ? 's' : ''}</span>
                )}
              </div>

              {vehicleType && (
                <div className="vc-cart-vehicle">
                  <span className="vc-cart-vehicle-icon">{vehicleIcons[vehicleType]}</span>
                  <div>
                    <div className="vc-cart-vehicle-type">{vehicleType}</div>
                    <div className="vc-cart-vehicle-label">Selected Vehicle</div>
                  </div>
                </div>
              )}

              {cart.length === 0 ? (
                <div className="vc-empty-cart">
                  <div className="vc-empty-icon">🛒</div>
                  <p className="vc-empty-text">
                    {vehicleType ? "No packages selected" : "Select a vehicle to start"}
                  </p>
                  <p className="vc-empty-subtext">
                    {vehicleType ? "Add cleaning packages to your cart" : "Choose your vehicle type first"}
                  </p>
                </div>
              ) : (
                <>
                  <div className="vc-cart-items">
                    {cart.map((item, i) => (
                      <div key={i} className="vc-cart-item">
                        <div className="vc-cart-item-details">
                          <span className="vc-cart-item-name">{item.title}</span>
                          <span className="vc-cart-item-duration">{item.duration}</span>
                        </div>
                        <div className="vc-cart-item-price-section">
                          <strong className="vc-cart-item-price">₹{item.price}</strong>
                          <button 
                            className="vc-remove-btn"
                            onClick={() => removeFromCart(item)}
                            title="Remove"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="vc-cart-summary">
                    <div className="vc-cart-total">
                      <span className="vc-total-label">Total Amount</span>
                      <strong className="vc-total-amount">₹{total}</strong>
                    </div>
                    
                    <div className="vc-savings-info">
                      💰 Professional service at your doorstep
                    </div>
                  </div>

                  <button
  className="vc-proceed-btn"
  onClick={() => setStep(isAuthenticated ? "booking" : "login")}
>
                    <span>Proceed to Book</span>
                    <span className="vc-btn-arrow">→</span>
                  </button>
                </>
              )}
            </div>

            {!vehicleType && (
              <div className="vc-help-card">
                <div className="vc-help-icon">💡</div>
                <h4>How it works</h4>
                <ol className="vc-help-steps">
                  <li>Select your vehicle type</li>
                  <li>Choose cleaning packages</li>
                  <li>Book your preferred slot</li>
                  <li>We'll come to your location</li>
                </ol>
              </div>
            )}
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

      {/* BOOKING DETAILS */}
      {step === "booking" && cart.length > 0 && (
        <div className="uc-overlay">
          <div className="uc-modal">
            <BookCleaningScreenWeb
              selectedServices={cart.map((c, i) => ({
                id: `vehicle-${i}`,
                title: `${vehicleType} - ${c.title}`,
                price: c.price,
                category: "vehicle",
              }))}
              consultationCharge={total}
              serviceContext="vehicle"
              meta={{
                vehicleType,
                subServices: cart.map((c) => ({
                  name: c.title,
                  price: c.price,
                })),
              }}
              onClose={() => {
                setStep("services");
                setVehicleType(null);
                setCart([]);
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

export default VehicleCleaning;
