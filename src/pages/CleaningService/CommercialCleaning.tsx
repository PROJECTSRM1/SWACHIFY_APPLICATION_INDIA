import React, { useState } from "react";
import CleaningHeader from "./CleaningHeader";
import "./CommercialCleaning.css";
import { Modal, Input, Button } from "antd";
import commercialvideo from "../../../src/assets/4203186-hd_1920_1080_24fps.mp4";
import BookCleaningScreenWeb from "../../pages/dashboard/homeservices/BookCleaningScreenWeb";

const propertyTypes = [
  { 
    title: "Office", 
    price: 1999,
    icon: "🏢",
    description: "Professional workspace cleaning",
    features: ["Desk sanitization", "Floor cleaning", "Washroom maintenance"]
  },
  { 
    title: "Shop", 
    price: 1499,
    icon: "🏪",
    description: "Retail space deep cleaning",
    features: ["Display cleaning", "Floor polishing", "Window cleaning"]
  },
  { 
    title: "Restaurant", 
    price: 2499,
    icon: "🍽️",
    description: "Food service area cleaning",
    features: ["Kitchen deep clean", "Dining area", "Grease removal"]
  },
  { 
    title: "Warehouse", 
    price: 2999,
    icon: "🏭",
    description: "Large-scale industrial cleaning",
    features: ["High-ceiling cleaning", "Floor scrubbing", "Dust removal"]
  },
];

const CommercialCleaning: React.FC = () => {
  const [selected, setSelected] = useState<any>(null);
  const [step, setStep] = useState<
    "select" | "login" | "otp" | "booking" | "done"
  >("select");

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const isAuthenticated = !!localStorage.getItem("accessToken");


  return (
    <>
      <CleaningHeader />

      <section className="cc-page">
        {/* LEFT SECTION */}
        <div className="cc-left">
          <div className="cc-hero">
            <div className="cc-breadcrumb">
              Home / Cleaning Services / Commercial Cleaning
            </div>
            <h1 className="cc-main-title">Commercial Cleaning Services</h1>
            <p className="cc-description">
              Professional cleaning solutions for your business premises
            </p>
            
            <div className="cc-stats">
              <div className="cc-stat-item">
                <span className="cc-stat-icon">⭐</span>
                <div>
                  <div className="cc-stat-value">4.7</div>
                  <div className="cc-stat-label">Rating</div>
                </div>
              </div>
              <div className="cc-stat-divider"></div>
              <div className="cc-stat-item">
                <span className="cc-stat-icon">📋</span>
                <div>
                  <div className="cc-stat-value">1.1M+</div>
                  <div className="cc-stat-label">Bookings</div>
                </div>
              </div>
              <div className="cc-stat-divider"></div>
              <div className="cc-stat-item">
                <span className="cc-stat-icon">🏢</span>
                <div>
                  <div className="cc-stat-value">24/7</div>
                  <div className="cc-stat-label">Available</div>
                </div>
              </div>
            </div>
          </div>

          <div className="cc-properties-section">
            <h3 className="cc-section-title">Select Your Property Type</h3>
            
            <div className="cc-properties-grid">
              {propertyTypes.map((property, i) => (
                <div 
                  key={i} 
                  className={`cc-property-card ${selected?.title === property.title ? 'cc-card-selected' : ''}`}
                  onClick={() => setSelected(property)}
                >
                  <div className="cc-card-header">
                    <div className="cc-icon-circle">
                      <span className="cc-property-icon">{property.icon}</span>
                    </div>
                    <div className="cc-card-title-section">
                      <h4 className="cc-property-title">{property.title}</h4>
                      <p className="cc-property-desc">{property.description}</p>
                    </div>
                  </div>

                  <div className="cc-features-list">
                    {property.features.map((feature, idx) => (
                      <div key={idx} className="cc-feature-tag">
                        <span className="cc-check-icon">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="cc-card-footer">
                    <div className="cc-price-section">
                      <span className="cc-price-label">Starting at</span>
                      <span className="cc-price">₹{property.price}</span>
                    </div>
                    <button
                      className={`cc-select-btn ${selected?.title === property.title ? 'cc-selected' : ''}`}
                      onClick={(e) => {
  e.stopPropagation();

  if (selected?.title === property.title) {
    setStep(isAuthenticated ? "booking" : "login");
  } else {
    setSelected(property);
  }
}}

                    >
                      {selected?.title === property.title ? "Book Now →" : "Select"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cc-benefits">
            <h3 className="cc-benefits-title">Why Choose Our Commercial Services?</h3>
            <div className="cc-benefits-grid">
              <div className="cc-benefit-item">
                <div className="cc-benefit-icon">👥</div>
                <div className="cc-benefit-content">
                  <strong>Trained Professionals</strong>
                  <p>Experienced commercial cleaning staff</p>
                </div>
              </div>
              <div className="cc-benefit-item">
                <div className="cc-benefit-icon">🔧</div>
                <div className="cc-benefit-content">
                  <strong>Industrial Equipment</strong>
                  <p>Latest cleaning technology & tools</p>
                </div>
              </div>
              <div className="cc-benefit-item">
                <div className="cc-benefit-icon">⏰</div>
                <div className="cc-benefit-content">
                  <strong>Flexible Timing</strong>
                  <p>Schedule as per your business hours</p>
                </div>
              </div>
              <div className="cc-benefit-item">
                <div className="cc-benefit-icon">💰</div>
                <div className="cc-benefit-content">
                  <strong>Transparent Pricing</strong>
                  <p>No hidden charges or surprises</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="cc-right">
          <div className="cc-sticky-container">
            <div className="cc-video-container">
              <video
                src={commercialvideo}
                autoPlay
                muted
                loop
                playsInline
                className="cc-video"
              />
              <div className="cc-video-overlay">
                <div className="cc-video-badge">
                  <span className="cc-badge-icon">⚡</span>
                  <div>
                    <div className="cc-badge-title">Quick Response</div>
                    <div className="cc-badge-subtitle">Same-day service available</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cc-info-card">
              <h4 className="cc-info-title">Service Highlights</h4>
              <div className="cc-highlights">
                <div className="cc-highlight-item">
                  <span className="cc-highlight-icon">✓</span>
                  <span>Trained commercial staff</span>
                </div>
                <div className="cc-highlight-item">
                  <span className="cc-highlight-icon">✓</span>
                  <span>Industrial-grade equipment</span>
                </div>
                <div className="cc-highlight-item">
                  <span className="cc-highlight-icon">✓</span>
                  <span>Flexible scheduling options</span>
                </div>
                <div className="cc-highlight-item">
                  <span className="cc-highlight-icon">✓</span>
                  <span>Transparent pricing model</span>
                </div>
                <div className="cc-highlight-item">
                  <span className="cc-highlight-icon">✓</span>
                  <span>Post-service quality check</span>
                </div>
                <div className="cc-highlight-item">
                  <span className="cc-highlight-icon">✓</span>
                  <span>Eco-friendly products</span>
                </div>
              </div>

              {selected && (
                <div className="cc-selected-info">
                  <div className="cc-selected-header">
                    <span className="cc-selected-icon">{selected.icon}</span>
                    <div>
                      <div className="cc-selected-name">{selected.title} Cleaning</div>
                      <div className="cc-selected-price">₹{selected.price} onwards</div>
                    </div>
                  </div>
                  <button
                    className="cc-proceed-btn"
                    onClick={() => setStep("login")}
                  >
                    <span>Proceed to Book</span>
                    <span className="cc-btn-arrow">→</span>
                  </button>
                </div>
              )}

              {!selected && (
                <div className="cc-help-text">
                  <div className="cc-help-icon">ℹ️</div>
                  <p>Select a property type above to get started with your commercial cleaning service</p>
                </div>
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
        onCancel={() => setStep("select")}
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
            placeholder="Enter 10-digit mobile number"
            maxLength={10}
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value.replace(/[^0-9]/g, ""))
            }
          />

          <Button
            type="primary"
            block
            className="auth-button"
            disabled={mobile.length !== 10}
            onClick={() => setStep("otp")}
          >
            Continue
          </Button>

          <p className="auth-note">
            By continuing, you agree to our Terms & Privacy Policy
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
          <h3 className="success-title">Booking Requested!</h3>
          <p className="success-message">
            Our team will contact you shortly for <strong>{selected?.title}</strong> cleaning service.
          </p>
          
          <div className="success-details">
            <div className="success-detail-row">
              <span className="success-label">Service Type</span>
              <strong className="success-value">{selected?.title}</strong>
            </div>
            <div className="success-detail-row">
              <span className="success-label">Starting Price</span>
              <strong className="success-value">₹{selected?.price}</strong>
            </div>
          </div>

          <Button
            type="primary"
            block
            className="success-button"
            onClick={() => (window.location.href = "/cleaningservice")}
          >
            Done
          </Button>
        </div>
      </Modal>

      {/* BOOKING DETAILS */}
      {step === "booking" && selected && (
        <div className="uc-overlay">
          <div className="uc-modal">
            <BookCleaningScreenWeb
              selectedServices={[
                {
                  id: "commercial-1",
                  title: `${selected.title} Cleaning`,
                  price: selected.price,
                  category: "commercial",
                },
              ]}
              consultationCharge={selected.price}
              serviceContext="commercial"
              onClose={() => setStep("select")}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CommercialCleaning;
