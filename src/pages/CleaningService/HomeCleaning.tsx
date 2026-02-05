import React from "react";
import CleaningHeader from "./CleaningHeader";
import "./HomeCleaning.css";
import { useNavigate } from "react-router-dom";
import cleaning from "../../../src/assets/5592525-hd_1920_1080_24fps.mp4";

const homeCleaningServices = [
  { 
    title: "Kitchen Cleaning", 
    icon: "🍳",
    description: "Deep clean for kitchen & appliances"
  },
  { 
    title: "Bathroom Cleaning", 
    icon: "🚿",
    description: "Sanitize & sparkle your bathrooms"
  },
  { 
    title: "Sofa Cleaning", 
    icon: "🛋️",
    description: "Professional upholstery care"
  },
  { 
    title: "Bedroom Cleaning", 
    icon: "🛏️",
    description: "Complete bedroom refresh"
  },
  { 
    title: "Window Cleaning", 
    icon: "🪟",
    description: "Crystal clear windows inside-out"
  },
  {
  title: "Full Deep Cleaning",
  icon: "🏠",
  description: "Complete home deep cleaning"
}
];

const HomeCleaning: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="hc-wrapper">
      <CleaningHeader />

      <section className="hc-container">
        <div className="hc-content">
          <div className="hc-header">
            <h1 className="hc-title">Home Cleaning Services</h1>
            <p className="hc-subtitle">
              Professional cleaning at your doorstep • Verified professionals • Safe & Secure
            </p>
          </div>

          <div className="hc-services-grid">
            {homeCleaningServices.map((service, index) => (
              <div
                key={index}
                className="hc-service-card"
                onClick={() =>
                  navigate(
                    `/cleaning/home/${service.title
                      .toLowerCase()
                      .replace(" cleaning", "")}`,
                  )
                }
              >
                <div className="hc-card-content">
                  <div className="hc-icon-wrapper">
                    <span className="hc-icon">{service.icon}</span>
                  </div>
                  <div className="hc-card-text">
                    <h3 className="hc-service-title">{service.title}</h3>
                    <p className="hc-service-desc">{service.description}</p>
                  </div>
                  <div className="hc-arrow">→</div>
                </div>
              </div>
            ))}
          </div>

          <div className="hc-features">
            <div className="hc-feature">
              <span className="feature-icon">✓</span>
              <span>Background verified professionals</span>
            </div>
            <div className="hc-feature">
              <span className="feature-icon">✓</span>
              <span>Eco-friendly cleaning products</span>
            </div>
            <div className="hc-feature">
              <span className="feature-icon">✓</span>
              <span>100% satisfaction guaranteed</span>
            </div>
          </div>
        </div>

        <div className="hc-media-section">
          <div className="hc-video-container">
            <video
              src={cleaning}
              autoPlay
              muted
              loop
              playsInline
              className="hc-video"
            />
            <div className="hc-video-overlay">
              <div className="hc-badge">
                <span className="badge-icon">⭐</span>
                <div>
                  <div className="badge-rating">4.8</div>
                  <div className="badge-text">50k+ bookings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeCleaning;
