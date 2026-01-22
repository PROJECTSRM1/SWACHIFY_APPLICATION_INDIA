import React, { useMemo, useState } from "react";
import {
  MdArrowBackIosNew,
  MdInfoOutline,
  MdDirectionsCar,
  MdAirportShuttle,
  MdTwoWheeler,
  MdLocalShipping,
  MdPedalBike,
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

const formatMoney = (n: number) => `₹${n.toFixed(0)}`;

const VehicleSubWeb: React.FC<VehicleSubWebProps> = ({
  onClose,
  onContinue,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("hatchback");
  const [selectedService, setSelectedService] =
    useState<ServiceType>("Full Wash");

  const categories: VehicleCategory[] = useMemo(
    () => [
      {
        id: "hatchback",
        name: "Hatchback / Sedan",
        icon: <MdDirectionsCar size={26} />,
        description: "Small to medium cars",
        duration: "45 – 60 mins",
        prices: { interior: 999, exterior: 699, fullWash: 1299 },
      },
      {
        id: "suv",
        name: "SUV / Luxury",
        icon: <MdAirportShuttle size={26} />,
        description: "Large & premium cars",
        duration: "60 – 90 mins",
        prices: { interior: 1499, exterior: 999, fullWash: 1899 },
      },
      {
        id: "motorcycle",
        name: "Motorcycle",
        icon: <MdTwoWheeler size={26} />,
        description: "Bikes & scooters",
        duration: "20 – 30 mins",
        prices: { interior: 0, exterior: 299, fullWash: 299 },
      },
      {
        id: "van",
        name: "Commercial Van",
        icon: <MdLocalShipping size={26} />,
        description: "Transport vehicles",
        duration: "75 – 120 mins",
        prices: { interior: 1799, exterior: 1299, fullWash: 2199 },
      },
      {
        id: "bicycle",
        name: "Bicycle",
        icon: <MdPedalBike size={26} />,
        description: "All cycle types",
        duration: "15 – 25 mins",
        prices: { interior: 0, exterior: 199, fullWash: 199 },
      },
    ],
    []
  );

  const currentCategory = categories.find(
    (c) => c.id === selectedCategory
  );

  const price =
    currentCategory?.prices[
      selectedService === "Interior"
        ? "interior"
        : selectedService === "Exterior"
        ? "exterior"
        : "fullWash"
    ] || 0;

  return (
    <div className="vs_page">
      {/* HEADER */}
      <header className="vs_header">
        <button className="vs_headerBtn" onClick={onClose}>
          <MdArrowBackIosNew size={18} />
        </button>
        <h1 className="vs_headerTitle">Vehicle Cleaning</h1>
        <button className="vs_headerBtn">
          <MdInfoOutline size={22} />
        </button>
      </header>

      {/* MAIN */}
      <main className="vs_main">
        <h2>Select vehicle type</h2>
        <p className="vs_subtitle">
          Pricing depends on vehicle size & service
        </p>

        {/* DESKTOP GRID */}
        <div className="vs_grid">
          {categories.map((c) => {
            const active = c.id === selectedCategory;

            return (
              <button
                key={c.id}
                className={`vs_card ${active ? "active" : ""}`}
                onClick={() => setSelectedCategory(c.id)}
              >
                <div className="vs_icon">{c.icon}</div>

                <h3>{c.name}</h3>
                <p>{c.description}</p>

                <div className="vs_priceRow">
                  <span>{formatMoney(c.prices.fullWash)}</span>
                  <small>Full Wash</small>
                </div>
              </button>
            );
          })}
        </div>

        {/* SERVICE TOGGLE */}
        <div className="vs_serviceToggle">
          {(["Interior", "Exterior", "Full Wash"] as ServiceType[]).map(
            (type) => (
              <button
                key={type}
                className={
                  selectedService === type ? "active" : ""
                }
                onClick={() => setSelectedService(type)}
              >
                {type}
              </button>
            )
          )}
        </div>

        {/* CTA */}
        <div className="vs_cta">
          <div>
            <strong>{formatMoney(price)}</strong>
            <span>{currentCategory?.duration}</span>
          </div>

          <button
            onClick={() =>
              onContinue({
                categoryId: selectedCategory,
                serviceType: selectedService,
                price,
                duration: currentCategory?.duration || "",
              })
            }
          >
            Book Now <MdArrowForward />
          </button>
        </div>
      </main>
    </div>
  );
};

export default VehicleSubWeb;
