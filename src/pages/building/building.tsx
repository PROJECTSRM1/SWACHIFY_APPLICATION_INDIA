import { useEffect, useState } from "react";
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

/* 🔹 PROPS FROM DASHBOARD */
interface Props {
  searchQuery?: string;
  clearSearch?: () => void;
}

interface ServiceItem {
  title: string;
  description: string;
  image: string;
  key: string;
}

/* 🔹 NORMALIZER (SAME AS PACKERS) */
const normalize = (s: string) =>
  s.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");

const services: ServiceItem[] = [
  {
    title: "Material Supply",
    description: "Quality construction materials with verified vendors",
    image: materialImg,
    key: "material",
  },
  {
    title: "Machinery Rental",
    description: "Rent construction equipment with operator support",
    image: rentalImg,
    key: "machinery",
  },
  {
    title: "Transportation",
    description: "Material pickup and delivery with GPS tracking",
    image: transportImg,
    key: "transport",
  },
  {
    title: "Bulk Procurement",
    description: "Large-scale orders with vendor management",
    image: bulkImg,
    key: "bulk",
  },
];

const ConstructionServices: FC<Props> = ({ searchQuery, clearSearch }) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  /* 🔹 AUTO OPEN BASED ON SEARCH (KEY PART) */
  useEffect(() => {
    if (!searchQuery || selectedService) return;

    const q = normalize(searchQuery);

    // 🧱 Material Supply
    if (
      q.includes(normalize("cement")) ||
      q.includes(normalize("steel")) ||
      q.includes(normalize("sand")) ||
      q.includes(normalize("tmt bars")) ||
      q.includes(normalize("steel")) ||
      q.includes(normalize("bricks")) ||
      q.includes(normalize("pipes")) ||
      q.includes(normalize("marble")) ||
      q.includes(normalize("tiles")) ||
      q.includes(normalize("material"))

    ) {
      setSelectedService("material");
      return;
    }

    // 🚜 Machinery Rental
    if (q.includes(normalize("machinery"))
    ) {
      setSelectedService("machinery");
      return;
    }

    // 🚚 Transportation
    if (
      q.includes(normalize("transport")) ||
      q.includes(normalize("construction transport"))
    ) {
      setSelectedService("transport");
      return;
    }

    // 📦 Bulk
    if (q.includes(normalize("bulk"))) {
      setSelectedService("bulk");
    }
  }, [searchQuery, selectedService]);

  const closeModal = () => {
    setSelectedService(null);
    clearSearch?.(); // ✅ SAME AS PACKERS & MOVERS
  };

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
        <span className="sw-br-bc-title">
          Building & Construction Raw Materials
        </span>
        <span className="sw-br-bc-subtitle">
          {services.length} services available
        </span>
      </div>

      {/* GRID */}
      <div className="sw-br-bc-grid">
        {services.map((service) => (
          <Card
            key={service.key}
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

      {/* MODAL */}
      {selectedService && (
        <ModalWrapper onClose={closeModal}>
          {renderPopupContent()}
        </ModalWrapper>
      )}
    </div>
  );
};

export default ConstructionServices;
