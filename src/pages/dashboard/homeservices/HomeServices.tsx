// src/pages/.../HomeServices.tsx
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import ServiceCategoryScreenWeb from "./ServiceCategoryScreenWeb";
import HomeSubWeb from "./HomeSubWeb";
import HomeSubCatWeb from "./HomeSubCatWeb";
import BookCleaningScreenWeb from "./BookCleaningScreenWeb";
import CommercialSubWeb from "./CommercialSubWeb";
import VehicleSubWeb from "./VehicleSubWeb";
import { useEffect } from "react";
import "./HomeServices.css"

import "./CleaningCategoryWeb.css";
import "./ServiceCategoryScreenWeb.css";
import CleaningServicesScreenWeb from "./CleaningServicesScreenWeb";

interface HomeServicesProps {
  searchQuery?: string;
  clearSearch?: () => void;
}

const HomeServices: React.FC<HomeServicesProps> = () => {
  // const navigate = useNavigate();

  const [openCleaningPopup, setOpenCleaningPopup] = useState(false);
  const [openHomeSubPopup, setOpenHomeSubPopup] = useState(false);
  const [openHomeSubCatPopup, setOpenHomeSubCatPopup] = useState(false);
const [selectedPropertyType, setSelectedPropertyType] = useState<string>("1bhk");
const [openbookcleaningweb, setOpenbookcleaningweb] = useState(false);
const [openCommercialPopup, setOpenCommercialPopup] = useState(false);
const [openHomePopup, setOpenHomePopup] = useState(false);
const [openVehiclePopup, setOpenVehiclePopup] = useState(false);
  const [showAll, setShowAll] = useState(false);

useEffect(() => {
  setOpenCleaningPopup(false);
  setOpenHomeSubPopup(false);
  setOpenHomeSubCatPopup(false);
  setOpenbookcleaningweb(false);
}, []);



  return (
    <>
    
     
{/* ===== CLEANING SECTION ===== */}
<section className="cleaning-section">
  <div className="cleaning-header">
    <div>
      <h2 className="cleaning-title">Housing Services</h2>
      <p className="cleaning-subtitle">2 services available</p>
    </div>

    <button
      className="cleaning-viewall-btn"
      onClick={() => setShowAll(prev => !prev)}
    >
      {showAll ? "Show Less" : "View All"}
    </button>
  </div>

  <div className="cleaning-cards">
    {/* Cleaning */}
    <button
      className="service-card"
      onClick={() => setOpenCleaningPopup(true)}
    >
      <img
        src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900"
        alt="Cleaning"
      />
      <div className="service-card-content">
        <h3>Cleaning</h3>
        <p>Residential & Commercial</p>
      </div>
    </button>

    {/* Home Services */}
    <button
      className="service-card"
      onClick={() => setOpenHomePopup(true)}
    >
      <img
        src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80"
        alt="Home Services"
      />
      <div className="service-card-content">
        <h3>Home Services</h3>
        <p>Plumbing, Electrical & More</p>
      </div>
    </button>
  </div>
</section>



      {/* 🔥 POPUP 1 — SERVICE CATEGORY */}
      {openCleaningPopup && (
        <div className="sc_popupOverlay">
          <div className="sc_popupContent">
            <ServiceCategoryScreenWeb
  onClose={() => setOpenCleaningPopup(false)}

  onSelectHomeCleaning={() => {
    setOpenCleaningPopup(false);   // close current
    setOpenHomeSubPopup(true);     // open home flow
  }}

  onSelectCommercialCleaning={() => {
    setOpenCleaningPopup(false);   // ✅ close service category
    setOpenCommercialPopup(true);  // ✅ open commercial popup
  }}

  onSelectVehicleCleaning={() => {
    setOpenCleaningPopup(false);  
    setOpenVehiclePopup(true);
  }}
/>


            {/* <button
              className="sc_popupClose"
              onClick={() => setOpenCleaningPopup(false)}
              aria-label="Close"
            >
              ✕
            </button> */}
          </div>
        </div>
      )}
       {openHomePopup && (
        <div className="sc_popupOverlay">
          <div className="sc_popupContent">
            <CleaningServicesScreenWeb />


            {/* <button
              className="sc_popupClose"
              onClick={() => setOpenCleaningPopup(false)}
              aria-label="Close"
            >
              ✕
            </button> */}
          </div>
        </div>
      )}

      {/* 🔥 POPUP 2 — HOME CLEANING SUB */}
      {openHomeSubPopup && (
        <div className="sc_popupOverlay">
          <div className="sc_popupContent">
           <HomeSubWeb
  onBack={() => setOpenHomeSubPopup(false)}
  onContinue={(propertyType) => {
    setSelectedPropertyType(propertyType);
   // setOpenHomeSubPopup(false);
    setOpenHomeSubCatPopup(true);
  }}
/>

            {/* <button
              className="sc_popupClose"
              onClick={() => setOpenHomeSubPopup(false)}
              aria-label="Close"
            >
              ✕
            </button> */}
          </div>
          {/* 🔥 POPUP 3 — HOME CLEANING SERVICE OPTIONS */}



        </div>
      )}
      {openHomeSubCatPopup && (
  <div className="sc_popupOverlay">
    <div className="sc_popupContent">
      <HomeSubCatWeb
        propertyType={selectedPropertyType as any}
        onClose={() => setOpenHomeSubCatPopup(false)}
        onContinue={(data) => {
          // ✅ close current popup
          setOpenHomeSubCatPopup(false);

          // ✅ open booking popup
          setOpenbookcleaningweb(true);

          console.log("Booking data:", data);
        }}
      />

      {/* <button
        className="sc_popupClose"
        onClick={() => setOpenHomeSubCatPopup(false)}
      >
        ✕
      </button> */}
    </div>
  </div>
)}

{openbookcleaningweb && (
  <div className="sc_popupOverlay">
    <div className="sc_popupContent">
      <BookCleaningScreenWeb />

      {/* <button
        className="sc_popupClose"
        onClick={() => setOpenbookcleaningweb(false)}
      >
        ✕
      </button> */}
    </div>
  </div>
)}
{openCommercialPopup && (
  <div className="sc_popupOverlay">
    <div className="sc_popupContent">
      <CommercialSubWeb
        onClose={() => setOpenCommercialPopup(false)}
        onContinue={(propertyType) => {
          // ✅ close commercial popup
          setOpenCommercialPopup(false);

          // ✅ open booking popup
          setOpenbookcleaningweb(true);

          console.log("Commercial property:", propertyType);
        }}
      />

      {/* <button
        className="sc_popupClose"
        onClick={() => setOpenCommercialPopup(false)}
      >
        ✕
      </button> */}
    </div>
  </div>
)}

{openVehiclePopup && (
  <div className="sc_popupOverlay">
    <div className="sc_popupContent">
      <VehicleSubWeb
        onClose={() => setOpenVehiclePopup(false)}
        onContinue={(data) => {
          setOpenVehiclePopup(false);
          setOpenbookcleaningweb(true);
          console.log("Vehicle booking:", data);
        }}
      />
    </div>
  </div>
)}


    </>
  );
};

export default HomeServices;
