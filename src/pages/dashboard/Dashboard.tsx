import React, { useState } from "react";
import HeaderBar from "../../components/header/header";
import "./Dashboard.css";
import ConstructionServices from "../building/building";
import Packersandmovers from "./PackersAndMovers/Packersandmovers";
import CleaningService from "./cleaningservice/CleaningService";
import BuySaleProducts from "./buy&sale/BuySaleProducts";
import HomeServices from "./homeservices/HomeServices";
import ServicesPage from "./homerentals/pages/ServicesPage";

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // List of services that will be displayed
  const servicesList = [
    { name: "Cleaning Service", component: <CleaningService /> },
    { name: "Packers and Movers", component: <Packersandmovers /> },
    { name: "Home Services", component: <HomeServices /> },
    { name: "Rental Services", component: <ServicesPage /> },
    { name: "Construction Services", component: <ConstructionServices /> },
    { name: "Buy & Sale Products", component: <BuySaleProducts /> },
  ];

  // Filter based on search input
  const filteredServices = servicesList.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <HeaderBar />

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
