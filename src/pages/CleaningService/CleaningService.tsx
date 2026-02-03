import React, { useState } from "react";
import { Modal } from "antd";
import CleaningHeader from "./CleaningHeader";
import "./CleaningService.css";
import { useNavigate } from "react-router-dom";


import hero1 from "../../assets/CleaningServices/LR2.jpg";
import hero2 from "../../assets/CleaningServices/KItchen1.jpg";
import hero3 from "../../assets/CleaningServices/Cleaning1.png";
import hero4 from "../../assets/CleaningServices/Kitchen2.jpg";

const services = [
  {
    title: "Cleaning Services",
    badge: "POPULAR",
    icon: "🧼",
    type: "cleaning",
  },
  {
    title: "Home Services",
    icon: "🏠",
    type: "home",
  },
];

const cleaningSubServices = [
  { title: "Home Cleaning", icon: "🏠" },
  { title: "Commercial Cleaning", icon: "🏢" },
  { title: "Vehicle Cleaning", icon: "🚗" },
];

const homeSubServices = [
  { title: "Plumbing", icon: "🚰" },
  { title: "Painting", icon: "🎨" },
  { title: "Electrician", icon: "⚡" },
  { title: "AC Repair", icon: "❄️" },
  { title: "Chef", icon: "👨‍🍳" },
];

const CleaningService: React.FC = () => {
    const navigate = useNavigate();
  const [openCleaningModal, setOpenCleaningModal] = useState(false);
  const [openHomeModal, setOpenHomeModal] = useState(false);

  const handleServiceClick = (type: string) => {
    if (type === "cleaning") {
      setOpenCleaningModal(true);
    }
    if (type === "home") {
      setOpenHomeModal(true);
    }
  };

  return (
    <>
      {/* ✅ EXISTING HEADER – DO NOT TOUCH */}
      <CleaningHeader />

      {/* ✅ HERO / SERVICES SECTION */}
      <section className="cs-container">
        <div className="cs-hero">
          {/* LEFT */}
          <div className="cs-left">
            <h1>Home services at your doorstep</h1>

            <div className="cs-box">
              <h3>What are you looking for?</h3>

              <div className="cs-services">
                {services.map((s, i) => (
                  <div
                    key={i}
                    className="cs-service-card"
                    onClick={() => handleServiceClick(s.type)}
                  >
                    {s.badge && <span className="cs-badge">{s.badge}</span>}
                    <div className="cs-icon">{s.icon}</div>
                    <p>{s.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="cs-right">
            <div className="cs-img-grid">
              <img src={hero1} alt="Cleaning service" />
              <img src={hero2} alt="Cleaning service" />
              <img src={hero3} alt="Cleaning service" />
              <img src={hero4} alt="Cleaning service" />
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="cs-stats">
          <div>
            ⭐ <strong>4.8</strong>
            <p>Service Rating*</p>
          </div>
          <div>
            👥 <strong>12M+</strong>
            <p>Customers Globally*</p>
          </div>
        </div>
      </section>

      {/* ✅ CLEANING SERVICES POPUP */}
      <Modal
        open={openCleaningModal}
        onCancel={() => setOpenCleaningModal(false)}
        footer={null}
        centered
        width={420}
        title="Select Cleaning Service"
      >
        <div className="cs-popup-services">
  {cleaningSubServices.map((s, i) => (
    <div
      key={i}
      className="cs-popup-card"
      onClick={() => {
        setOpenCleaningModal(false);

        if (s.title === "Home Cleaning") {
          navigate("/cleaning/home");
        }
      }}
    >
      <span className="cs-popup-icon">{s.icon}</span>
      <p>{s.title}</p>
    </div>
  ))}
</div>

      </Modal>

      {/* ✅ HOME SERVICES POPUP */}
      <Modal
        open={openHomeModal}
        onCancel={() => setOpenHomeModal(false)}
        footer={null}
        centered
        width={520}
        title="Select Home Service"
      >
        <div className="cs-popup-services">
          {homeSubServices.map((s, i) => (
            <div key={i} className="cs-popup-card">
              <span className="cs-popup-icon">{s.icon}</span>
              <p>{s.title}</p>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default CleaningService;
