import React from "react";
import HeaderBar from "../../components/header/header";
import "./Dashboard.css";
import ConstructionServices from "../building/building";
import Packersandmovers from "./PackersAndMovers/Packersandmovers";
import CleaningService from "./cleaningservice/CleaningService";
import BuySaleProducts from "./buy&sale/BuySaleProducts";
import HomeServices from "./homeservices/HomeServices";
import { Route, Routes } from "react-router-dom";
import ServicesPage from "./homerentals/pages/ServicesPage";
import PropertyTypePage from "./homerentals/pages/PropertyTypePage";
import ApartmentListingsPage from "./homerentals/pages/ApartmentListingsPage";
import PropertyDetailsPage from "./homerentals/pages/PropertyDetailsPage";
import CommercialPropertyTypePage from "./homerentals/pages/CommercialPropertyTypePage";
import CommercialListingsPage from "./homerentals/pages/CommercialListingsPage";
import FooterBar from "./homerentals/components/FooterBar";
import HeaderBarforrental from "./homerentals/components/HeaderBar";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <HeaderBar />

      <div className="services-section">
        <h1 className="services-title">Our Services</h1>
        <p className="services-subtitle">
          Browse through our services and add items to your cart
        </p>

        <div className="services-search">
          <input
            type="text"
            placeholder="Search services..."
            className="search-input"
          />
        </div>
      </div>
      <CleaningService/>
      <Packersandmovers></Packersandmovers>
    
      <HomeServices/>

         <div className="app-root">
      <HeaderBarforrental></HeaderBarforrental>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<ServicesPage />} />
          <Route path="/property-types" element={<PropertyTypePage />} />
          <Route path="/listings/:type" element={<ApartmentListingsPage />} />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
          <Route path="/commercial-property-types" element={<CommercialPropertyTypePage />} />
          <Route path="/commercial/:type" element={<CommercialListingsPage />} />
          <Route path="/commercial/property/:id" element={<PropertyDetailsPage />} />

        </Routes>
      </main>
      <FooterBar />
    </div>
   
      <ConstructionServices/>
      <BuySaleProducts/>
      
      

      {/* Later: You can add responsive service cards here */}

    </div>
  );
};

export default Dashboard;
