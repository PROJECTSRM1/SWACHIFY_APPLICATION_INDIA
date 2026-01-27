import React, { useState } from "react";
import "./CleaningServicesScreenWeb.css";
import ServiceDetailsScreenWeb from "./ServiceDetailsScreenWeb";
import BookCleaningScreenWeb from "./BookCleaningScreenWeb";

import img1 from "../../../assets/pack1.jpg";
import img2 from "../../../assets/pack2.jpg";
import img3 from "../../../assets/pack3.jpg";
import img4 from "../../../assets/pack6.jpg";
import img5 from "../../../assets/pack7.jpg";

type Service = {
  id: string;
  title: string;
  price: string;
  category: "Home" | "Apartment" | "Commercial" | "Vehicle";
  image: string;
};

const SERVICES: Service[] = [
  { id: "1", title: "Plumbing", price: "From $20", category: "Home", image: img1 },
  { id: "2", title: "Painting", price: "From $30", category: "Home", image: img2 },
  { id: "3", title: "Electrician", price: "From $25", category: "Home", image: img3 },
  { id: "5", title: "AC Repair", price: "From $28", category: "Apartment", image: img4 },
  { id: "6", title: "Chef", price: "From $35", category: "Commercial", image: img5 },
];

const CleaningServicesScreenWeb: React.FC = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingData, setBookingData] = useState<{
    selectedServices: any[];
    consultationCharge: number;
  } | null>(null);

  const openServiceDetails = (service: Service) => {
    setSelectedService(service);
    setOpenDetails(true);
  };

  return (
    <>
      {/* MAIN SERVICE LIST */}
      <div className="csw_page">
        <header className="csw_header">
          <button
            className="csw_back"
            onClick={() => {
              if (openDetails || openBooking) {
                setOpenDetails(false);
                setOpenBooking(false);
                setSelectedService(null);
              } else {
                window.history.back();
              }
            }}
          >
            ←
          </button>

          <h1>Home Services</h1>
          <div className="csw_spacer" />
        </header>

        <div className="csw_content">
          <h2>Select the type of cleaning you need today.</h2>
          <p>Choose one or more services to proceed with your booking.</p>
        </div>

        <div className="csw_grid">
          {SERVICES.map((item) => (
            <div
              key={item.id}
              className="csw_card"
              onClick={() => openServiceDetails(item)}
            >
              <div className="csw_imgWrap">
                <img src={item.image} alt={item.title} />
              </div>
              <p className="csw_title">{item.title}</p>
              <p className="csw_price">{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICE DETAILS POPUP */}
     {/* SERVICE DETAILS MODAL */}
{openDetails && selectedService && (
  <div className="csw_modalOverlay">
    <div className="csw_modalContent">
      <ServiceDetailsScreenWeb
        serviceTitle={selectedService.title}
        onBack={() => {
          setOpenDetails(false);
          setSelectedService(null);
        }}
        onProceed={(data) => {
          setBookingData(data);
          setOpenDetails(false);
          setOpenBooking(true);
        }}
      />
    </div>
  </div>
)}

{/* BOOKING MODAL */}
{openBooking && bookingData && (
  <div className="csw_modalOverlay">
    <div className="csw_modalContent">
      <BookCleaningScreenWeb
        selectedServices={bookingData.selectedServices}
        consultationCharge={bookingData.consultationCharge}
        serviceContext="home"
        onClose={() => {
          setOpenBooking(false);
          setBookingData(null);
        }}
      />
    </div>
  </div>
)}

    </>
  );
};

export default CleaningServicesScreenWeb;
