import { useState } from "react";
import { Card, Button } from "antd";
import type { FC } from "react";

import MaterialSupply from "../building/MaterialSupply/ModMaterialSupply";
import MachineryRental from "../building/MachineryRental/MachineryRental";
import Transpotation from "../building/Transpotation/Transpotation";
import ModalWrapper from "../../components/ModalWrapper";

import materialImg from "../../assets/Building/material supply.jpg";
import rentalImg from "../../assets/Building/rental.jpg";
import transportImg from "../../assets/Building/transportation.jpg";
import bulkImg from "../../assets/Building/BulkProcurement.jpg";

interface ServiceItem {
  title: string;
  description: string;
  image: string;
  route?: any;
  key: string;
}

const services: ServiceItem[] = [
  {
    title: "Material Supply",
    description: "Quality construction materials with verified vendors",
    image: materialImg,
    route: "/app/material-su~pply",
    key: "material"
  },
  {
    title: "Machinery Rental",
    description: "Rent construction equipment with operator support",
    image: rentalImg,
    route: "/app/machinery-rental",
    key: "machinery"
  },
  {
    title: "Transportation",
    description: "Material pickup and delivery with GPS tracking",
    image: transportImg,
    route: "/app/Transpotation",
    key: "transport"
  },
  {
    title: "Bulk Procurement",
    description: "Large-scale orders with vendor management",
    image: bulkImg,
    route: "/app/bulk-procurement",
    key: "bulk"
  }
];

const ConstructionServices: FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const renderPopupContent = () => {
    switch (selectedService) {
      case "material":
        return <MaterialSupply />;
      case "machinery":
        return <MachineryRental />;
      case "transport":
        return <Transpotation />;
      case "bulk":
        return <div style={{ padding: 20 }}>Bulk Procurement Coming Soon</div>;
      default:
        return null;
    }
  };

  return (
    <div className="sw-br-bc-wrapper">

      <div className="sw-br-bc-header">
        <span className="sw-br-bc-title">Building & Construction Raw Materials</span>
        <span className="sw-br-bc-subtitle">{services.length} services available</span>
      </div>

      <div className="sw-br-bc-grid">
        {services.map((service, index) => (
          <Card
            key={index}
            hoverable
            className="sw-br-bc-card"
            cover={
              <img
                src={service.image}
                alt={service.title}
                className="sw-br-bc-image"
              />
            }
          >
            <h3 className="sw-br-bc-card-title">{service.title}</h3>
            <p className="sw-br-bc-card-desc">{service.description}</p>

            <Button
              block
              className="sw-br-bc-btn"
              onClick={() => setSelectedService(service.key)}
            >
              View Details
            </Button>
          </Card>
        ))}
      </div>

      {selectedService && (
        <ModalWrapper onClose={() => setSelectedService(null)}>
          {renderPopupContent()}
        </ModalWrapper>
      )}

    </div>
  );
};

export default ConstructionServices;