import React from "react";
import { MdArrowBack, MdClose } from "react-icons/md";
import "./ServiceCategoryScreenWeb.css";

type ServiceCategoryScreenWebProps = {
  onClose: () => void;
  onSelectHomeCleaning: () => void;
  onSelectCommercialCleaning?: () => void;
  onSelectVehicleCleaning?: () => void;
};

const ServiceCategoryScreenWeb: React.FC<ServiceCategoryScreenWebProps> = ({
  onClose,
  onSelectHomeCleaning,
  onSelectCommercialCleaning,
  onSelectVehicleCleaning,
}) => {
  return (
    <div className="scw_page">
      {/* Header */}
      <header className="scw_header">
        <button className="scw_iconBtn" onClick={onClose}>
          <MdArrowBack size={22} />
        </button>

        <h1>Select a Service</h1>

        <button className="scw_iconBtn" onClick={onClose}>
          <MdClose size={22} />
        </button>
      </header>

      {/* Content */}
      <main className="scw_content">
        <h2 className="scw_sectionTitle">Cleaning Categories</h2>

        <div className="scw_cards">
          <div className="scw_card" onClick={onSelectHomeCleaning}>
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900"
              alt="Home Cleaning"
            />
            <div>
              <h3>Home Cleaning</h3>
              <p>Deep & regular house cleaning</p>
            </div>
          </div>

          <div
            className="scw_card"
            onClick={() => onSelectCommercialCleaning?.()}
          >
            <img
              src="https://www.classaclean.com/wp-content/uploads/2023/02/mixed-race-janitors-doing-spring-cleaning-of-house-2021-12-09-06-24-26-utc-scaled.jpg"
              alt="Commercial Cleaning"
            />
            <div>
              <h3>Commercial Cleaning</h3>
              <p>Office & workspace sanitation</p>
            </div>
          </div>

          <div
            className="scw_card"
            onClick={() => onSelectVehicleCleaning?.()}
          >
            <img
              src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=900"
              alt="Vehicle Cleaning"
            />
            <div>
              <h3>Vehicle Cleaning</h3>
              <p>Interior & exterior wash</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceCategoryScreenWeb;
