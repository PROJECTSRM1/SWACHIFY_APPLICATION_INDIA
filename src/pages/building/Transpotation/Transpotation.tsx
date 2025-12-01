import React, { useState } from "react";
import materialpickupimg from '../../../assets/Building/material pickup.jpg'
import deliveryservicesimg from '../../../assets/Building/Delivery services.jpg'
import TransportationForm from "./FormTranspotation"; 

const transportServices = [
  {
    id: 1,
    title: "Material Pickup",
    description: "Fast and safe pickup services from suppliers or construction sites.",
    price: "₹500",
    img: materialpickupimg
  },
  {
    id: 2,
    title: "Material Delivery Services",
    description: "Secure and timely delivery of materials to your construction location.",
    price: "₹700",
    img: deliveryservicesimg
  },
];

const TransportationServices: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const openPopup = (id: number) => {
    setSelectedId(id);
    setShowPopup(true);
  };

  const closePopup = () => {
    setSelectedId(null);
    setShowPopup(false);
  };

  return (
    <div className="sw-br-transport-wrapper">

      <div className="sw-br-transport-header">
        <h2>Transportation Services</h2>
        <p>{transportServices.length} services available</p>
      </div>

      <div className="sw-br-transport-grid">
        {transportServices.map((item) => (
          <div className="sw-br-transport-card" key={item.id}>

            <div className="sw-br-transport-img">
              <img src={item.img} alt={item.title} />
            </div>

            <h3>{item.title}</h3>
            <p className="sw-br-transport-desc">{item.description}</p>

            <div className="sw-br-transport-bottom">
              <p className="sw-br-transport-price">{item.price}</p>

              <button
                className="sw-br-transport-btn"
                onClick={() => openPopup(item.id)}
              >
                View Details
              </button>
            </div>

          </div>
        ))}
      </div>

      {showPopup && (
        <div className="sw-br-modal-overlay">
          <div className="sw-br-modal-content">
            <TransportationForm id={selectedId!} onClose={closePopup} />
          </div>
        </div>
      )}

    </div>
  );
};

export default TransportationServices;
