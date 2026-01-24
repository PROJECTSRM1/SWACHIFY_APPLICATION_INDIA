import React, { useMemo, useState } from "react";
import {
  MdArrowBack,
  MdComputer,
  MdChair,
  MdBusiness,
  MdStore,
  MdWarehouse,
} from "react-icons/md";
import "./CommercialSubWeb.css";

type PropertyType = "small" | "medium" | "large" | "retail" | "warehouse";

type PropertyOption = {
  id: PropertyType;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  price: string;
  isQuote?: boolean;
};

export type CommercialType =
  | "small"
  | "medium"
  | "large"
  | "retail"
  | "warehouse";

type CommercialSubWebProps = {
  onClose: () => void;
  onContinue: (propertyType: CommercialType) => void;
};



const CommercialSubWeb: React.FC<CommercialSubWebProps> = ({
  onClose,
  onContinue,
}) => {
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyType>("medium");

  const properties: PropertyOption[] = useMemo(
    () => [
      {
        id: "small",
        icon: <MdComputer size={26} />,
        title: "Small Office",
        subtitle: "Up to 500 sqft",
        price: "From ₹3,999",
      },
      {
        id: "medium",
        icon: <MdChair size={26} />,
        title: "Medium Office",
        subtitle: "500 – 2000 sqft",
        price: "From ₹7,999",
      },
      {
        id: "large",
        icon: <MdBusiness size={26} />,
        title: "Large Corporate Office",
        subtitle: "2000+ sqft",
        price: "Get Quote",
        isQuote: true,
      },
      {
        id: "retail",
        icon: <MdStore size={26} />,
        title: "Retail / Showroom",
        subtitle: "Customer-facing space",
        price: "From ₹5,999",
      },
      {
        id: "warehouse",
        icon: <MdWarehouse size={26} />,
        title: "Warehouse / Clinic",
        subtitle: "Deep sanitation",
        price: "From ₹11,999",
      },
    ],
    []
  );

  return (
    <div className="cs_page">
      {/* HEADER */}
      <header className="cs_header">
        <button className="cs_backBtn" onClick={onClose}>
          <MdArrowBack size={22} />
        </button>
        <h1 className="cs_headerTitle">Commercial Cleaning</h1>
        <div />
      </header>

      {/* MAIN */}
      <main className="cs_main">
        <section className="cs_intro">
          <h2>Select property type</h2>
          <p>
            Choose the option that best describes your commercial workspace.
          </p>
        </section>

        <section className="cs_grid">
          {properties.map((property) => {
            const active = selectedProperty === property.id;

            return (
              <button
                key={property.id}
                type="button"
                className={`cs_card ${active ? "cs_cardActive" : ""}`}
                onClick={() => setSelectedProperty(property.id)}
              >
                <div className={`cs_iconBox ${active ? "active" : ""}`}>
                  {property.icon}
                </div>

                <div className="cs_cardBody">
                  <h3>{property.title}</h3>
                  <p>{property.subtitle}</p>
                </div>

                <div
                  className={`cs_price ${
                    property.isQuote ? "quote" : ""
                  }`}
                >
                  {property.price}
                </div>
              </button>
            );
          })}
        </section>

        {/* CONTINUE BUTTON (INSIDE CONTAINER) */}
        <div className="cs_continueWrapper">
         <button
  className="cs_continueBtn"
  onClick={() => onContinue(selectedProperty)}
>
  Continue
</button>


        </div>
      </main>
    </div>
  );
};

export default CommercialSubWeb;
