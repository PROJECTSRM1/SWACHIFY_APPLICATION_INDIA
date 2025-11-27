import { useState } from "react";
import { Card, Button } from "antd";
import "./HomeServices.css";
import { popupData } from "./popupData"; // Correct import
import type { PopupCategory } from "./popupData"; // Correct import of type
import { ToolOutlined } from "@ant-design/icons";
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
import ServiceRequestForm from "./ServiceDetailsForm";

export default function HomeServices() {
  const [selectedService, setSelectedService] = useState<PopupCategory | null>(null);
  const [selectedSubService, setSelectedSubService] = useState<any>(null);

  const [detailsPopupOpen, setDetailsPopupOpen] = useState(false);
  const [formPopupOpen, setFormPopupOpen] = useState(false);

  const [showAll, setShowAll] = useState(false);

  const services = [
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

  const displayedCards = showAll ? services : services.slice(0, 4);
  
  // OPEN POPUP 1
const openDetailsPopup = (serviceTitle: string) => {
  const data = popupData[serviceTitle];
  if (!data) return;

  setSelectedService(data);
  setSelectedSubService(null);

  setFormPopupOpen(false);
  setDetailsPopupOpen(true);
};

// OPEN POPUP 2
const openFormPopup = (subService: any) => {
  setSelectedSubService(subService);

  setDetailsPopupOpen(false);
  setFormPopupOpen(true);
};

// SUBMIT POPUP 2

const handleFormSubmit = (formData: any) => {
  const payload = {
    ...formData,
    serviceInfo: {
      title: selectedSubService.title,
      price: selectedSubService.price,
      image: selectedSubService.image,
      description: selectedSubService.description,
      includedList: selectedSubService.includedList,
    },
      //  serviceInfo: selectedSubService,
  };

  console.log("Payload to backend:", payload);

  // axios.post("/api/service-request", payload)
  //   .then(res => console.log(res))
  //   .catch(err => console.error(err));

  setFormPopupOpen(false);
  setDetailsPopupOpen(true);
};


// CANCEL POPUP 2
const handleFormCancel = () => {
  setFormPopupOpen(false);
  setDetailsPopupOpen(true);
};



  return (
    <div className="home-services-container">
      {/* HEADER */}
      <div className="services-top-banner">

        <div className="banner-left">
  <div className="banner-icon"><ToolOutlined /></div>

  <div className="banner-text">
    <h2 className="banner-title">Home Services</h2>
    <p className="banner-subtitle">{services.length} services available</p>
  </div>
</div>

 


  <Button
  size="small"
  className="header-viewall-btn"
  onClick={() => setShowAll(!showAll)}
>
  {showAll ? "Show Less" : "View All Services"}
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
                onClick={() => openDetailsPopup(service.title)}
              >
                View Details
              </Button>
            </Card>
          </div>
        ))}
      </div>

      {detailsPopupOpen && selectedService && (
  <ServiceDetailsPopup
    open={detailsPopupOpen}
    onClose={() => setDetailsPopupOpen(false)}
    mainTitle={selectedService.mainTitle}
    subServices={selectedService.subServices}
    onOpenForm={openFormPopup}
  />
)}

{formPopupOpen && selectedSubService && (
  <ServiceRequestForm
    open={formPopupOpen}
    onCancel={handleFormCancel}
    onSubmit={handleFormSubmit}
    image={selectedSubService.image}
    title={selectedSubService.title}
    description={selectedSubService.description}
    includedList={selectedSubService.includedList}
    issues={selectedSubService.issues}
    totalprice={selectedSubService.totalprice}
  />
)}     
    </div>
  );
}