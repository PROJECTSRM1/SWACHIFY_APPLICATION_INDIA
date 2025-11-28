import React, { useState } from "react";
import "./Dashboard.css";

import ConstructionServices from "../building/building";
import Packersandmovers from "./PackersAndMovers/Packersandmovers";
import BuySaleProducts from "./buy&sale/BuySaleProducts";
import HomeServices from "./homeservices/HomeServices";
import ServicesPage from "./homerentals/pages/ServicesPage";

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // List of services that will be displayed
  const servicesList = [
    
    { name: "Packers and Movers / Transport", component: <Packersandmovers /> },
    { name: "Home Services", component: <HomeServices /> },
    { name: "Home & Apartments Rental", component: <ServicesPage /> },
    { name: "Building & Construction Raw Materials", component: <ConstructionServices /> },
    { name: "Buy & Sale Products", component: <BuySaleProducts /> },
  ];

  // Normalizer for fuzzy search
  const normalize = (str: string) =>
    str.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");

  const filteredServices = servicesList.filter((service) => {
    const name = normalize(service.name);
    const query = normalize(searchQuery);
    if (!query) return true;
    return (
      name.includes(query) ||
      query.includes(name) ||
      name.startsWith(query) ||
      name.endsWith(query)
    );
  });

  return (
    <div className="dashboard-container">

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

      {/* Render only filtered services */}
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
