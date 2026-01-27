// src/pages/.../HomeServices.tsx
import React, { useEffect, useState } from "react";

import ServiceCategoryScreenWeb from "./ServiceCategoryScreenWeb";
import HomeSubWeb from "./HomeSubWeb";
import HomeSubCatWeb from "./HomeSubCatWeb";
import BookCleaningScreenWeb from "./BookCleaningScreenWeb";
import CommercialSubWeb from "./CommercialSubWeb";
import VehicleSubWeb from "./VehicleSubWeb";
import CleaningServicesScreenWeb from "./CleaningServicesScreenWeb";

import "./HomeServices.css";
import "./CleaningCategoryWeb.css";
import "./ServiceCategoryScreenWeb.css";

/* ================= TYPES ================= */

type SelectedService = {
  id: string;
  title: string;
  price: number;
};

type ServiceContext = "home" | "commercial" | "vehicle";

type CommercialType =
  | "small"
  | "medium"
  | "large"
  | "retail"
  | "warehouse";

/* ================= COMPONENT ================= */

const HomeServices: React.FC = () => {
  /* ---------- POPUP STATES ---------- */
  const [openCleaningPopup, setOpenCleaningPopup] = useState(false);
  const [openHomeSubPopup, setOpenHomeSubPopup] = useState(false);
  const [openHomeSubCatPopup, setOpenHomeSubCatPopup] = useState(false);
  const [openCommercialPopup, setOpenCommercialPopup] = useState(false);
  const [openVehiclePopup, setOpenVehiclePopup] = useState(false);
  const [openHomePopup, setOpenHomePopup] = useState(false);
  const [openBookCleaning, setOpenBookCleaning] = useState(false);

  /* ---------- FLOW DATA ---------- */
  const [selectedPropertyType, setSelectedPropertyType] =
    useState<SelectedService[]>([]);

  const [serviceContext, setServiceContext] =
    useState<ServiceContext>("home");

  const [bookingPayload, setBookingPayload] = useState<{
    selectedServices: string[] | SelectedService[];
    consultationCharge: number;
    meta?: any;
  } | null>(null);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setOpenCleaningPopup(false);
    setOpenHomeSubPopup(false);
    setOpenHomeSubCatPopup(false);
    setOpenBookCleaning(false);
  }, []);

  /* ---------- COMMERCIAL MAP ---------- */
  const COMMERCIAL_SERVICE_MAP: Record<
    CommercialType,
    { title: string; price: number }
  > = {
    small: { title: "Small Office Cleaning", price: 3999 },
    medium: { title: "Medium Office Cleaning", price: 7999 },
    large: { title: "Large Corporate Office Cleaning", price: 0 },
    retail: { title: "Retail / Showroom Cleaning", price: 5999 },
    warehouse: { title: "Warehouse / Clinic Cleaning", price: 11999 },
  };

  /* ================= RENDER ================= */

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
            onClick={() => setShowAll((p) => !p)}
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

      {/* ===== POPUP 1 — SERVICE CATEGORY ===== */}
      {openCleaningPopup && (
        <div className="sc_popupOverlay">
          <div className="sc_popupContent">
            <ServiceCategoryScreenWeb
              onClose={() => setOpenCleaningPopup(false)}
              onSelectHomeCleaning={() => {
                setServiceContext("home");
                setOpenCleaningPopup(false);
                setOpenHomeSubPopup(true);
              }}
              onSelectCommercialCleaning={() => {
                setServiceContext("commercial");
                setOpenCleaningPopup(false);
                setOpenCommercialPopup(true);
              }}
              onSelectVehicleCleaning={() => {
                setServiceContext("vehicle");
                setOpenCleaningPopup(false);
                setOpenVehiclePopup(true);
              }}
            />
          </div>
        </div>
      )}

      {/* ===== HOME SERVICES LIST ===== */}
      {openHomePopup && (
        <div className="sc_popupOverlay">
          <div className="sc_popupContent">
            <CleaningServicesScreenWeb />
          </div>
        </div>
      )}

      {/* ===== HOME CLEANING SUB ===== */}
      {openHomeSubPopup && (
        <div className="sc_popupOverlay">
          <div className="sc_popupContent">
            <HomeSubWeb
              onBack={() => setOpenHomeSubPopup(false)}
              onContinue={(services) => {
                setSelectedPropertyType(services);
                setOpenHomeSubCatPopup(true);
              }}
            />
          </div>
        </div>
      )}

      {/* ===== HOME CLEANING CATEGORY ===== */}
      {openHomeSubCatPopup && (
        <div className="sc_popupOverlay">
          <div className="sc_popupContent">
            <HomeSubCatWeb
              propertyType={selectedPropertyType as any}
              onClose={() => setOpenHomeSubCatPopup(false)}
              onContinue={(data) => {
                setOpenHomeSubCatPopup(false);
                setBookingPayload({
                  selectedServices: data.selectedServices,
                  consultationCharge: Number(data.totalPrice),
                });
                setOpenBookCleaning(true);
              }}
            />
          </div>
        </div>
      )}

      {/* ===== COMMERCIAL ===== */}
      {openCommercialPopup && (
        <div className="sc_popupOverlay">
          <div className="sc_popupContent">
            <CommercialSubWeb
              onClose={() => setOpenCommercialPopup(false)}
              onContinue={(type: CommercialType) => {
                const service = COMMERCIAL_SERVICE_MAP[type];
                setOpenCommercialPopup(false);
                setBookingPayload({
                  selectedServices: [service.title],
                  consultationCharge: service.price,
                });
                setOpenBookCleaning(true);
              }}
            />
          </div>
        </div>
      )}

      {/* ===== VEHICLE ===== */}
      {openVehiclePopup && (
        <div className="sc_popupOverlay">
          <div className="sc_popupContent">
            <VehicleSubWeb
              onClose={() => setOpenVehiclePopup(false)}
              onContinue={(data) => {
                setOpenVehiclePopup(false);
                setBookingPayload({
                  selectedServices: data.selectedServices,
                  consultationCharge: data.consultationCharge,
                  meta: data.meta,
                });
                setOpenBookCleaning(true);
              }}
            />
          </div>
        </div>
      )}

      {/* ===== BOOK CLEANING (COMMON) ===== */}
      {openBookCleaning && bookingPayload && (
        <div className="sc_popupOverlay">
          <div className="sc_popupContent">
            <BookCleaningScreenWeb
  selectedServices={
    bookingPayload.selectedServices.map((s: any) =>
      typeof s === "string" ? s : s.title
    )
  }
  consultationCharge={bookingPayload.consultationCharge}
  serviceContext={serviceContext}
  onClose={() => setOpenBookCleaning(false)}
/>

          </div>
        </div>
      )}
    </>
  );
};

export default HomeServices;
