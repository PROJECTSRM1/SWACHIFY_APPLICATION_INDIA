import React, { useMemo, useState } from "react";
import {
  MdArrowBackIosNew,
  MdInfoOutline,
  MdDirectionsCar,
  MdAirportShuttle,
  MdTwoWheeler,
  MdLocalShipping,
  MdPedalBike,
  MdExpandLess,
  MdExpandMore,
  MdArrowForward,
} from "react-icons/md";
import "./VehicleSubWeb.css";

/* ================= TYPES ================= */

type ServiceType = "Interior" | "Exterior" | "Full Wash";

type ServicePrice = {
  interior: number;
  exterior: number;
  fullWash: number;
};

type VehicleCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  duration: string;
  prices: ServicePrice;
};

type VehicleSubWebProps = {
  onClose: () => void;
  onContinue: (data: {
    categoryId: string;
    serviceType: ServiceType;
    price: number;
    duration: string;
  }) => void;
};

const formatMoney = (n: number) => `$${n.toFixed(2)}`;

/* ================= COMPONENT ================= */

const VehicleSubWeb: React.FC<VehicleSubWebProps> = ({
  onClose,
  onContinue,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("hatchback");
  const [selectedService, setSelectedService] =
    useState<ServiceType>("Full Wash");
  const [expandedItem, setExpandedItem] = useState<string>("hatchback");

  const categories: VehicleCategory[] = useMemo(
    () => [
      {
        id: "hatchback",
        name: "Hatchback/Sedan",
        icon: <MdDirectionsCar size={28} />,
        description: "Small to medium family cars",
        duration: "45 - 60 mins",
        prices: { interior: 35, exterior: 25, fullWash: 45 },
      },
      {
        id: "suv",
        name: "SUV/Luxury",
        icon: <MdAirportShuttle size={28} />,
        description: "Large vehicles & high-end cars",
        duration: "60 - 90 mins",
        prices: { interior: 55, exterior: 40, fullWash: 75 },
      },
      {
        id: "motorcycle",
        name: "Motorcycle/Bike",
        icon: <MdTwoWheeler size={28} />,
        description: "Two-wheelers and scooters",
        duration: "20 - 30 mins",
        prices: { interior: 0, exterior: 15, fullWash: 15 },
      },
      {
        id: "van",
        name: "Commercial Van",
        icon: <MdLocalShipping size={28} />,
        description: "Cargo vans and transport vehicles",
        duration: "75 - 120 mins",
        prices: { interior: 65, exterior: 50, fullWash: 95 },
      },
      {
        id: "bicycle",
        name: "Bicycle",
        icon: <MdPedalBike size={28} />,
        description: "MTB, Road, or Commuter bikes",
        duration: "15 - 25 mins",
        prices: { interior: 0, exterior: 10, fullWash: 10 },
      },
    ],
    []
  );

  const currentCategory = useMemo(
    () => categories.find((c) => c.id === selectedCategory),
    [categories, selectedCategory]
  );

  const currentPrice = useMemo(() => {
    if (!currentCategory) return 0;

    const map: Record<ServiceType, keyof ServicePrice> = {
      Interior: "interior",
      Exterior: "exterior",
      "Full Wash": "fullWash",
    };

    return currentCategory.prices[map[selectedService]];
  }, [currentCategory, selectedService]);

  const bookNow = () => {
    if (!currentCategory) return;

    onContinue({
      categoryId: currentCategory.id,
      serviceType: selectedService,
      price: currentPrice,
      duration: currentCategory.duration,
    });
  };

  return (
    <div className="vs_page">
      {/* HEADER */}
      <header className="vs_header">
        <button
          className="vs_headerBtn"
          type="button"
          onClick={onClose}
          aria-label="Back"
        >
          <MdArrowBackIosNew size={18} />
        </button>

        <h1 className="vs_headerTitle">Vehicle Cleaning</h1>

        <button
          className="vs_headerBtn"
          type="button"
          onClick={() => alert("Info")}
          aria-label="Info"
        >
          <MdInfoOutline size={22} />
        </button>
      </header>

      {/* CONTENT */}
      <main className="vs_content">
        <section className="vs_sectionHeader">
          <h2 className="vs_sectionTitle">Select Vehicle Category</h2>
          <p className="vs_sectionSubtitle">
            Prices vary based on vehicle dimensions
          </p>
        </section>

        {/* Accordion */}
        <section className="vs_accordion">
          {categories.map((category) => {
            const isExpanded = expandedItem === category.id;

            return (
              <div key={category.id} className="vs_item">
                <button
                  className="vs_itemHeader"
                  type="button"
                  onClick={() =>
                    setExpandedItem(isExpanded ? "" : category.id)
                  }
                >
                  <div className="vs_itemLeft">
                    <div className="vs_iconBox">{category.icon}</div>

                    <div className="vs_itemInfo">
                      <p className="vs_itemName">{category.name}</p>
                      <p className="vs_itemDesc">{category.description}</p>
                    </div>
                  </div>

                  {isExpanded ? (
                    <MdExpandLess size={24} />
                  ) : (
                    <MdExpandMore size={24} />
                  )}
                </button>

                {isExpanded && (
                  <div className="vs_itemBody">
                    <p className="vs_durationValue">{category.duration}</p>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        <div className="vs_bottomSpacer" />
      </main>

      {/* BOTTOM PRICE CARD */}
      <div className="vs_priceCard">
        <div className="vs_priceLeft">
          <p className="vs_priceLabel">SELECTED PRICE</p>
          <p className="vs_priceValue">{formatMoney(currentPrice)}</p>
          <p className="vs_priceSub">
            {currentCategory?.name} • {selectedService}
          </p>
        </div>

        <button className="vs_bookBtn" type="button" onClick={bookNow}>
          Book Now
          <MdArrowForward size={18} />
        </button>
      </div>
    </div>
  );
};

export default VehicleSubWeb;
