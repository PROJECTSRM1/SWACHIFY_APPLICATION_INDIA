// src/pages/.../HomeServices.tsx
import { useState, useEffect } from "react";

import { Card, Button,  Modal } from "antd";
// import "../../../index.css";
import { popupData } from "./popupData"; // existing
import type { PopupCategory } from "./popupData"; // existing
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

// IMPORTANT: this import expects CleaningService.tsx to be in the same folder.
// If your CleaningService lives elsewhere, fix the path accordingly.
import CleaningService from "../cleaningservice/CleaningService";

interface HomeServicesProps {
  searchQuery?: string;
  clearSearch?: () => void;
}

export default function HomeServices({
  searchQuery = "",
  clearSearch,
}: HomeServicesProps) {

  const [selectedService, setSelectedService] = useState<PopupCategory | null>(null);
  const [selectedSubService, setSelectedSubService] = useState<any>(null);

  const [detailsPopupOpen, setDetailsPopupOpen] = useState(false);
  const [formPopupOpen, setFormPopupOpen] = useState(false);

  // NEW: open embedded cleaning modal
  const [cleaningModalOpen, setCleaningModalOpen] = useState(false);

  const [showAll, setShowAll] = useState(false);
  const SERVICE_KEYWORD_MAP: Record<string, string[]> = {
  "Cleaning Services": [
    //main services
    "cleaning services",
    "residential cleaning",
    "commercial cleaning",
    "specialized cleaning",
    "post",
    "industrial cleaning",
   
 //residential cleaning
    // Homes 
       "homes","home cleaning","home services",
              "living room",
              "bedroom",
              "kitchen",
              "bathroom",
              "all services", 
    // apartments
       "apartment services","apartments","apartment cleaning","appartment",
           "studio",
           "1bhk",
           "2bhk",
           "3bhk",
    // villas
       "villa services","villas","villa cleaning",
           "small villas", 
           "duplex villas",
           "luxury villas",
    // commercial cleaning 
    // offices  
        "office","offices services","office cleaning",
            "cabin",
            "workstation",
            "conference hall",
    // shops and malls        
        "shop cleaning","shop services","shops",
        "mall cleaning","malls", "mall services",
             "shop cleaning",
             "mall cleaning",
             "showroom",
    // clinics and labs
        "clinic cleaning","clinics","clinic services",
        "lab cleaning","labs","lab services",
              "clinic cleaning",
              "laboratory",
              "diagnostic",   
    // schools
        "school cleaning","schools","school services",
             "classroom",
             "school laboratory",
              "library",
    // specialized cleaning
        // furniture cleaning
        "furniture cleaning","furniture",
                "sofa",
                "chair",
                "wooden furniture",
       // floor cleaning
        "floor cleaning","floors",
                "marble",
                "tile",
                "granite",
       // glass cleaning
        "glass cleaning","window cleaning",
                "outdoor glass",
                "high rise glass",
                "indoor glass",
                "home sanitization",
                "office sanitization",
                "commercial sanitization",
    //industrial cleaning
        //assembaly area
            "assembly services","assembly areas",
            "production line",

        // production services
           "production services",
           "warehouse rack",
           "warehouse floor",
        //Waste handling
          "waste handling","waste services",
            "heavy equipment",
            "precision tools",
            "chemical waste",
            "solid waste",
    //post construction
        //marble and granite 
          "pmarble","pgranite",
        //dust removal
          "dust",
          "indoor dust",
          "outdoor dust",
        // paint stain removal
          "paint stain tiles",
          "paint stain windows",
  ], 
  // Electrical services
  "Electrical Services": [
    "electrical",
    "electrician",
    "wiring",
    "fan",
    "circuit",
    "Switchboard",
    "Smart Home",
  ],

  // plumbing services
  "Plumbing Service": [
    "plumbing",
    "plumber",
    "pipe",
    "leak",
    "geyser installation",
    "bathroom fitting",
    "drain",
    "water",
  ],

  //Appliance repair
  "Appliances Repair": [
    "appliance",
    "washing machine",
    "fridge",
    "refrigerator",
    "ac",
    "Microwave",
    "painting",
    "tv",
  ],
};

 useEffect(() => {
  if (!searchQuery) return;

  const q = searchQuery.toLowerCase();

  for (const serviceTitle in SERVICE_KEYWORD_MAP) {
    const keywords = SERVICE_KEYWORD_MAP[serviceTitle];

    const matched = keywords.some(k => q.includes(k));

    if (!matched) continue;

    // 🔹 Cleaning → open Cleaning modal
    if (serviceTitle === "Cleaning Services") {
      if (!cleaningModalOpen) {
        setCleaningModalOpen(true);
      }
      return;
    }

    // 🔹 Other services → open details popup
    const data = popupData[serviceTitle];
    if (!data) return;

    setSelectedService(data);
    setSelectedSubService(null);
    setDetailsPopupOpen(true);
    setFormPopupOpen(false);

    return;
  }
}, [searchQuery, cleaningModalOpen]);


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

  // OPEN POPUP 1 (modified - opens cleaning modal for cleaning card)
  const openDetailsPopup = (serviceTitle: string) => {
    // If user clicked Cleaning Services, open the embedded CleaningService modal
    if (serviceTitle === "Cleaning Services") {
      setCleaningModalOpen(true);
      // ensure other popups are closed
      setDetailsPopupOpen(false);
      setFormPopupOpen(false);
      return;
    }

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
    };

    console.log("Payload to backend:", payload);

    // axios.post("/api/service-request", payload) ...
    setFormPopupOpen(false);
    setDetailsPopupOpen(true);
  };

  // CANCEL POPUP 2
  const handleFormCancel = () => {
    setFormPopupOpen(false);
    setDetailsPopupOpen(true);
  };

  return (
    <div className="sw-hs-home-services-container">
      {/* HEADER */}
      <div className="sw-hs-services-top-banner">
        <div className="sw-hs-banner-left">
          <div className="sw-hs-banner-icon"><ToolOutlined /></div>

          <div className="sw-hs-banner-text">
            <h2 className="sw-hs-banner-title">Home Services</h2>
            <p className="sw-hs-banner-subtitle">{services.length} services available</p>
          </div>
        </div>

  <Button
  size="small"
  className="sw-hs-header-viewall-btn"
  onClick={() => setShowAll(!showAll)}
>
  {showAll ? "Show Less" : "View All Services"}
  </Button>

      </div>

      {/* GRID */}
      <div className="sw-hs-services-card-grid">
        {displayedCards.map((service, i) => (
          <div className="sw-hs-service-card-wrapper" key={i}>
            <Card
              hoverable
              className="sw-hs-service-card"
              cover={<img src={service.image} alt="" className="sw-hs-service-image" />}
            >
              <h3 className="sw-hs-service-title">{service.title}</h3>

              <Button
                className="sw-hs-details-btn"
                block
                onClick={() => openDetailsPopup(service.title)}
              >
                View Details
              </Button>
            </Card>
          </div>
        ))}
      </div>

<Modal
  open={cleaningModalOpen}
  onCancel={() => {setCleaningModalOpen(false);
    clearSearch?.();
  }}
  footer={null}
  width="95%"
  centered
  // allow the modal to show default X (only close control)
  closable
  bodyStyle={{
    padding: 0,
    // internal scrolling for long content (CleaningService)
    maxHeight: "80vh",
    overflowY: "auto",
  }}
  wrapClassName="sw-hs-cleaning-embed-wrapper"
>
  {/* NOTE: removed the manual 'Close' button so only the modal's X icon will close it */}
  <div className="sw-hs-cleaning-embed" style={{ padding: 12 }}>
    <CleaningService searchQuery={searchQuery} />

  </div>
</Modal>


      {/* SERVICE DETAILS POPUP (existing) */}
      {detailsPopupOpen && selectedService && (
        <ServiceDetailsPopup
          open={detailsPopupOpen}
          onClose={() => setDetailsPopupOpen(false)}
          mainTitle={selectedService.mainTitle}
          subServices={selectedService.subServices}
          onOpenForm={openFormPopup}
        />
      )}

      {/* SERVICE REQUEST FORM (existing) */}
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