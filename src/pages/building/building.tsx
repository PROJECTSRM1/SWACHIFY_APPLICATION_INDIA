// import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "antd";
import type { FC } from "react";
import materialImg from "../../assets/Building/material supply.png";
import rentalImg from "../../assets/Building/rental.jpg";
import transportImg from "../../assets/Building/transportation.jpg";
import bulkImg from "../../assets/Building/BulkProcurement.jpg"

import "./building.css";

interface ServiceItem {
  title: string;
  description: string;
  image: string;
  route?:any;
}

const services: ServiceItem[] = [
  {
    title: "Material Supply",
    description: "Quality construction materials with verified vendors",
    image:materialImg,
     route: "/app/material-supply",
  },
  {
    title: "Machinery Rental",
    description: "Rent construction equipment with operator support",
    image: rentalImg,
    route: "/app/Machinery-rental"
  },
  {
    title: "Transportation",
    description: "Material pickup and delivery with GPS tracking",
    image:  transportImg,
    route:"/app/Transpotation"
  },
  {
    title: "Bulk Procurement",
    description: "Large-scale orders with vendor management",
    image: bulkImg,
  },
];

const ConstructionServices: FC = () => {
   const navigate = useNavigate();
  return (
    <div className="cs-wrapper">
      <div className="cs-header">
        <span className="cs-title">Building & Construction Raw Materials</span>
        <span className="cs-subtitle">4 services available</span>
      </div>

      <div className="cs-grid">
        {services.map((service, index) => (
          <Card
            key={index}
            hoverable
            className="cs-card"
            cover={<img src={service.image} alt={service.title} className="cs-image" />}
          >
            <h3 className="cs-card-title">{service.title}</h3>
            <p className="cs-card-desc">{service.description}</p>
            <Button type="default" block className="cs-button"   onClick={() => service.route && navigate(service.route)}>
              View Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConstructionServices;
