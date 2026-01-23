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
const [selectedPropertyType, setSelectedPropertyType] = useState<string[]>([]);
const [openbookcleaningweb, setOpenbookcleaningweb] = useState(false);
const [openCommercialPopup, setOpenCommercialPopup] = useState(false);
const [openHomePopup, setOpenHomePopup] = useState(false);
const [openVehiclePopup, setOpenVehiclePopup] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [bookingPayload, setBookingPayload] = useState<any>(null);

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
    setSelectedPropertyType([propertyType]);
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
    setOpenHomeSubCatPopup(false);

    // ✅ STORE DATA HERE
    setBookingPayload({
      selectedServices: data.selectedServices,
      consultationCharge: Number(data.totalPrice),
    });

    setOpenbookcleaningweb(true);
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

{openbookcleaningweb && bookingPayload && (
  <div className="sc_popupOverlay">
    <div className="sc_popupContent">
      <BookCleaningScreenWeb
        selectedServices={bookingPayload.selectedServices}
        consultationCharge={bookingPayload.consultationCharge}
        onClose={() => {
          setOpenbookcleaningweb(false);
          setOpenHomeSubCatPopup(true); // 👈 BACK TO PREVIOUS POPUP
        }}
      />
    </div>
  </div>
)}

{openCommercialPopup && (
  <div className="sc_popupOverlay">
    <div className="sc_popupContent">
      <CommercialSubWeb
        onClose={() => setOpenCommercialPopup(false)}
        onContinue={(propertyType) => {
          // 1️⃣ Close commercial popup
          setOpenCommercialPopup(false);

          // 2️⃣ Set booking payload (REQUIRED)
          setBookingPayload({
            selectedServices: [`Commercial Cleaning - ${propertyType}`],
            consultationCharge: 0, // or your commercial base price
          });

          // 3️⃣ Open booking popup
          setOpenbookcleaningweb(true);
        }}
      />
    </div>
  </div>
)}


{openVehiclePopup && (
  <div className="sc_popupOverlay">
    <div className="sc_popupContent">
      <VehicleSubWeb
        onClose={() => setOpenVehiclePopup(false)}
        onContinue={(data) => {
          // 1️⃣ close vehicle popup
          setOpenVehiclePopup(false);

          // 2️⃣ SET BOOKING PAYLOAD (THIS WAS THE CORE ISSUE)
          setBookingPayload({
            selectedServices: [
              `Vehicle Cleaning - ${data.categoryId} (${data.serviceType})`,
            ],
            consultationCharge: data.price,
            duration: data.duration,
          });

          // 3️⃣ open booking popup
          setOpenbookcleaningweb(true);
        }}
      />
    </div>
  </div>
)}




    </>
  );
};

export default HomeServices;
