import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CleaningServicesScreenWeb.css";
import img1 from "../../../assets/pack1.jpg";
import img2 from  "../../../assets/pack2.jpg"
import img3 from  "../../../assets/pack3.jpg"
import img4 from  "../../../assets/pack6.jpg"
import img5 from  "../../../assets/pack7.jpg"
//import img2 from  "../../../assets/pack2.jpg"

type Service = {
  id: string;
  title: string;
  price: string;
  category: "Home" | "Apartment" | "Commercial" | "Vehicle";
  image: string;
};

const SERVICES: Service[] = [
  {
    id: "1",
    title: "Plumbing",
    price: "From $20",
    category: "Home",
    image: img1,
  },
  {
    id: "2",
    title: "Painting",
    price: "From $30",
    category: "Home",
    image: img2,
  },
  {
    id: "3",
    title: "Electrician",
    price: "From $25",
    category: "Home",
    image: img3,
  },
  {
    id: "5",
    title: "AC Repair",
    price: "From $28",
    category: "Apartment",
    image: img4,
  },
  {
    id: "6",
    title: "Chef",
    price: "From $35",
    category: "Commercial",
    image: img5,
  },
];

const CleaningServicesScreenWeb: React.FC = () => {
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const toggleSelect = (service: Service) => {
    navigate("/service-details", { state: { service } });
  };

  return (
    <div className="csw_page">
      {/* HEADER */}
      <header className="csw_header">
        <button className="csw_back" onClick={() => navigate(-1)}>←</button>
        <h1>Home Services</h1>
        <div style={{ width: 24 }} />
      </header>

      {/* CONTENT */}
      <div className="csw_content">
        <h2>Select the type of cleaning you need today.</h2>
        <p>Choose one or more services to proceed with your booking.</p>
      </div>

      {/* GRID */}
      <div className="csw_grid">
        {SERVICES.map((item) => {
          const isSelected = selectedServices.some((s) => s.id === item.id);

          return (
            <div
              key={item.id}
              className={`csw_card ${isSelected ? "selected" : ""}`}
              onClick={() => toggleSelect(item)}
            >
              <div className="csw_imgWrap">
                <img src={item.image} alt={item.title} />
                <div className={`csw_check ${isSelected ? "active" : ""}`}>
                  ✓
                </div>
              </div>

              <p className="csw_title">{item.title}</p>
              <p className={`csw_price ${isSelected ? "active" : ""}`}>
                {item.price}
              </p>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="csw_ctaWrap">
        <button
          className="csw_cta"
          disabled={selectedServices.length === 0}
          onClick={() =>
            navigate("/book-cleaning", { state: { selectedServices } })
          }
        >
          Continue ({selectedServices.length} Selected) →
        </button>
      </div>

      {/* BOTTOM NAV */}
      {/* <footer className="csw_bottomNav">
        <div className="active">Home</div>
        <div>Bookings</div>
        <div>Wallet</div>
        <div>Profile</div>
      </footer> */}
    </div>
  );
};

export default CleaningServicesScreenWeb;
