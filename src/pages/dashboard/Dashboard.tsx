import React from "react";
import HeaderBar from "../../components/header/header";
import "./Dashboard.css";
import ConstructionServices from "../building/building";
import Packersandmovers from "./PackersAndMovers/Packersandmovers";
import CleaningService from "./cleaningservice/CleaningService";
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

    <ServicesPage/>
   
      <ConstructionServices/>
      
      

      {/* Later: You can add responsive service cards here */}

    </div>
  );
};

export default Dashboard;
