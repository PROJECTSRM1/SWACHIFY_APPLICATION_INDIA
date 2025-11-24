import { useState } from "react";
import { Card, Button } from "antd";
import "./HomeServices.css";
import { popupData } from "./popupData"; // Correct import
import type { PopupCategory } from "./popupData"; // Correct import of type
import cleaningservices from "../../../assets/HomeServices/cleaningservices.jpg";
import electricalservices from "../../../assets/HomeServices/electricalservices.jpg";
import plumbingservices from "../../../assets/HomeServices/plumbingservices.jpg";
import appliancesrepair from "../../../assets/HomeServices/appliancesrepair.jpg";
import carpentryfurniture from "../../../assets/HomeServices/carpentary&furniture.jpg";
import paintingrenovation from "../../../assets/HomeServices/painting&renovation.jpg";
import hvaccooling from "../../../assets/HomeServices/hvac&cooling.jpg";
import gardeningoutdoor from "../../../assets/HomeServices/gardening&outdoorcleaning.jpg";
import handymangeneralrepair from "../../../assets/HomeServices/handymangenralrepair.jpg";
import homesecurityservice from "../../../assets/HomeServices/homesecuritservices.webp";

import ServiceDetailsPopup from "./ServiceDetailsPopup";


interface ServiceItem {
  title: string;
  description: string;
  price: string;
  image: string;
}

const services: ServiceItem[] = [
  { title: "Cleaning Services", description: "Professional cleaning service", price: "$120", image: cleaningservices },
  { title: "Electrical Services", description: "Licensed electrical repair", price: "$130", image: electricalservices },
  { title: "Plumbing Service", description: "Expert plumbing repairs", price: "$120", image: plumbingservices },
  { title: "Appliances Repair", description: "All home appliance repairs", price: "$100", image: appliancesrepair },
  { title: "Carpentry & Furniture", description: "Woodwork & furniture repairs", price: "$200", image: carpentryfurniture },
  { title: "Painting & Renovation", description: "Interior & exterior painting", price: "$400", image: paintingrenovation },
  { title: "HVAC & Cooling", description: "AC repair & service", price: "$150", image: hvaccooling },
  { title: "Gardening & Outdoor Care", description: "Garden maintenance", price: "$90", image: gardeningoutdoor },
  { title: "Handyman / General Repair", description: "General repairs", price: "$110", image: handymangeneralrepair },
  { title: "Home Security Services", description: "CCTV installation", price: "$250", image: homesecurityservice },
];

export default function HomeServices() {
  const [selectedService, setSelectedService] = useState<PopupCategory | null>(null);

  const [popupOpen, setPopupOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const displayedCards = showAll ? services : services.slice(0, 4);

  // Safe openPopup function
  const openPopup = (serviceTitle: string) => {
    const data = popupData[serviceTitle];
    if (data) {
      setSelectedService(data);
      setPopupOpen(true);
    } else {
      console.warn("No popup data found for:", serviceTitle);
    }
  };

  return (
    <div className="home-services-container">
      {/* HEADER */}
      <div className="services-top-banner">
        <div>
          <h2 className="banner-title">Home Services</h2>
          <p className="banner-subtitle">{services.length} services available</p>
        </div>

        <Button
          className="header-viewall-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All"}
        </Button>
      </div>

      {/* GRID */}
      <div className="services-card-grid">
  {displayedCards.map((service, i) => (
    <div className="service-card-wrapper" key={i}>
      <Card
        hoverable
        className="service-card"
        cover={<img src={service.image} alt="" className="service-image" />}
      >
        <h3 className="service-title">{service.title}</h3>

        <Button
          className="details-btn"
          block
          onClick={() => openPopup(service.title)}
        >
          View Details
        </Button>
      </Card>
    </div>
  ))}
</div>

      {/* Popup */}
      {popupOpen && selectedService && (
        <ServiceDetailsPopup
          open={popupOpen}
          onClose={() => {
            setPopupOpen(false);
            setSelectedService(null);
          }}
          mainTitle={selectedService.mainTitle}
          subServices={selectedService.subServices || []} // Fallback if subServices is empty
        />
      )}
    </div>
  );
}
