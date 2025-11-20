import React from "react";
import HeaderBar from "../../components/header/header";
import "./Dashboard.css";
import Packersandmovers from "./PackersAndMovers/Packersandmovers";

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
      <Packersandmovers></Packersandmovers>

      {/* Later: You can add responsive service cards here */}

    </div>
  );
};

export default Dashboard;
