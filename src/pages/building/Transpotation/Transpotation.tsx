import React from "react";
import { useNavigate } from "react-router-dom";

import "../Transpotation/Transpotation.css";
import materialpickupimg from '../../../assets/Building/material pickup.jpg'
import deliveryservicesimg from '../../../assets/Building/Delivery services.jpg'

const transportServices = [
  {
    id: 1,
    title: "Material Pickup",
    description: "Fast and safe pickup services from suppliers or construction sites.",
    price: "$50",
    img: materialpickupimg
  },
  {
    id: 2,
    title: "Material Delivery Services",
    description: "Secure and timely delivery of materials to your construction location.",
    price: "$70",
    img: deliveryservicesimg
  },
];

const TransportationServices: React.FC = () => {
      const navigate = useNavigate();


  return (
    <div className="transport-wrapper">

     
      <div className="transport-header">
        <h2>Transportation Services</h2>
        <p>{transportServices.length} services available</p>
      </div>

     
      <div className="transport-grid">
        {transportServices.map((item) => (
          <div className="transport-card" key={item.id}>

            <div className="transport-img">
              <img src={item.img} alt={item.title} />
            </div>

            <h3>{item.title}</h3>
            <p className="transport-desc">{item.description}</p>

            <div className="transport-bottom">
              <p className="transport-price">{item.price}</p>

              <button
                className="transport-btn"
                onClick={() => navigate(`/app/transport/${item.id}`)}
              >
                View Details
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default TransportationServices;
