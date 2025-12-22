import React, { useState } from "react";
import "./Dashboard.css";

import ConstructionServices from "../building/building";
import Packersandmovers from "./PackersAndMovers/Packersandmovers";
import BuySaleProducts from "./buy&sale/BuySaleProducts";
import HomeServices from "./homeservices/HomeServices";
import ServicesPage from "./homerentals/pages/ServicesPage";


const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  /* 🔹 Normalizer for search */
  const normalize = (str: string) =>
    str.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");

  /* 🔹 MAIN SERVICES + SUBSERVICE KEYWORDS */
  const servicesList = [
    {
      name: "Packers and Movers / Transport",
     keywords: [
  // passenger transport
  "passenger transport",
  "taxi",
  "local",
  "local taxi",
  "carpol",
  "carpooling",
  "shuttle",
  "shuttle service",

  // logistics & cargo
  "logistics and cargo",
  "goods",
  "goods delivery",
  "intercity transport",
  "delivery",
  "cargo",

  // rentals
  "rental services",
  "car rental",
  "truck rental",
  "van rental",

  // special
  "specialized transport",
  "hazardous",
  "temperature controlled",
],

      component: (
  <Packersandmovers
    searchQuery={searchQuery}
    clearSearch={() => setSearchQuery("")}
  />
),

    },
   {
  name: "Home Services",
  keywords: [
    //"cleaning services",

    "plumbing services",
    "bathroom cleaning",
    "Residential cleaning",
    
    //"electrical services",
    "electrical services",
    "Wiring",
    "fan",
    "circuit",
    "switchboard",
    "Smart Home",

    //Plumbing
    "Leak",
    "pipe",
    "geyser installation",
    "Bathroom fitting",
    "water tank",
    "drain cleaning",

    //Appliances repair
    "ac service",
    "ac",
    "washing machine",
    "Microwave servicing",
    "Microwave",
    "tv servicing",
    "Regular Maintenace",
    "Spare parts",
    "refrigerator",
    "appliances repair",
    
  ],
  component: (
    <HomeServices
      searchQuery={searchQuery}
      clearSearch={() => setSearchQuery("")}
    />
  ),
},

    {
      name: "Building & Construction Raw Materials",
      keywords: [
        "material supply",
        "cement",
        "steel",
        "marble",
        "Transportation",
        "machinery rental",
        "construction transport",
        "sand",  
        "Bricks",
        "pipes",
        "Tiles",
        "bulk procurement",
      ],
      component: (
    <ConstructionServices
      searchQuery={searchQuery}
      clearSearch={() => setSearchQuery("")}
    />
  ),
    },
    {
  name: "Buy & Sale Products",
  keywords: [
    // buy & sale
    "buy & sale products",
    "Property Listing for sale",
    "Property listing for Purchase",
    "Prime commercial plot",
    "Industrial plot",
    "Office complex",
    "Boutique hotel development land",
    "luxury Hillside villa",
    "heritage bungalow",
    "Corporate office Tower Floor",


   // "Old retail sales",
   "old retail sales",
   "Instore billing",
   "Inventory and customer records",

   
    //"online ordering",
    "online ordering",
    "online ordering and checkout",
    "Digital catalog and product search",
    "Online payments(UPI/card)",
    "Home delivery and tracking",
    "online offers and coupons",



    //"wholesale Buy near distribution",
    "Wholesale buy near distribution",
    "Price comparison and bulk orders",
    "Supplier coordination and stock tracking",

    
  ],
  component: (
    <BuySaleProducts
      searchQuery={searchQuery}
      clearSearch={() => setSearchQuery("")}
    />
  ),
},
{
  name: "House & Commercial Rentals",
  keywords: [
    // residential
    "house",
    "apartment",
    "apartments",
    "independent house",
    "independent",
    "flat",
    "1 bhk",
    "2 bhk",
    "3 bhk",
    "villa",

    // commercial
    "commercial",
    "office",
    "shop",
    "warehouse",
    "startup",
    "open plot",
  ],
  component: (
    <ServicesPage
      searchQuery={searchQuery}
      clearSearch={() => setSearchQuery("")}
    />
  ),
},


  ];

  /* 🔹 FILTER LOGIC (MAIN FIX) */
  const filteredServices = servicesList.filter((service) => {
  // 🔥 Hide Rentals when there is NO search
  if (service.name === "House & Commercial Rentals") {
    if (!searchQuery) return false;
  }

  // Show all other services when no search
  if (!searchQuery) return true;

  const query = normalize(searchQuery);
  const serviceNameMatch = normalize(service.name).includes(query);

  const subServiceMatch = service.keywords.some((key) =>
    normalize(key).includes(query)
  );

  return serviceNameMatch || subServiceMatch;
});


  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="services-section">
        <h1 className="services-title">Our Services</h1>

        <div className="services-search">
          <input
            type="text"
            placeholder="Search services..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Render filtered services */}
      {filteredServices.length > 0 ? (
        filteredServices.map((service, index) => (
          <div key={index}>{service.component}</div>
        ))
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No services found.
        </p>
      )}
    </div>
  );
};

export default Dashboard;
