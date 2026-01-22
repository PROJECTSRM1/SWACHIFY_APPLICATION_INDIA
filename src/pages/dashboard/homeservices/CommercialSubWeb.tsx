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

type CommercialSubWebProps = {
  onClose: () => void;
  onContinue: (propertyType: PropertyType) => void;
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
        icon: <MdComputer size={28} />,
        title: "Small Office",
        subtitle: "Up to 500 sqft",
        price: "From $49",
      },
      {
        id: "medium",
        icon: <MdChair size={28} />,
        title: "Medium Office",
        subtitle: "500–2000 sqft",
        price: "From $129",
      },
      {
        id: "large",
        icon: <MdBusiness size={28} />,
        title: "Large Corporate Office",
        subtitle: "2000+ sqft",
        price: "Quote",
        isQuote: true,
      },
      {
        id: "retail",
        icon: <MdStore size={28} />,
        title: "Retail Shop / Showroom",
        subtitle: "Public facing areas",
        price: "From $89",
      },
      {
        id: "warehouse",
        icon: <MdWarehouse size={28} />,
        title: "Warehouse / Clinic",
        subtitle: "Specialized sanitation",
        price: "From $199",
      },
    ],
    []
  );

  return (
    <div className="cs_page">
      {/* HEADER */}
      <header className="cs_header">
        <button
          className="cs_backBtn"
          type="button"
          onClick={onClose}
          aria-label="Back"
        >
          <MdArrowBack size={22} />
        </button>

        <h1 className="cs_headerTitle">Commercial Property</h1>
        <div className="cs_backBtn cs_headerSpacer" />
      </header>

      {/* CONTENT */}
      <main className="cs_main">
        <section className="cs_headlineContainer">
          <h2 className="cs_headline">Select property type</h2>
          <p className="cs_description">
            Choose the option that best describes your commercial workspace.
          </p>
        </section>

        <section className="cs_list">
          {properties.map((property) => {
            const isSelected = selectedProperty === property.id;

            return (
              <button
                key={property.id}
                type="button"
                className={`cs_card ${
                  isSelected ? "cs_cardSelected" : ""
                }`}
                onClick={() => setSelectedProperty(property.id)}
              >
                <div
                  className={`cs_iconWrap ${
                    isSelected ? "cs_iconWrapSelected" : ""
                  }`}
                >
                  {property.icon}
                </div>

                <div className="cs_info">
                  <p className="cs_title">{property.title}</p>
                  <p className="cs_subtitle">{property.subtitle}</p>
                </div>

                <div className="cs_priceWrap">
                  <span
                    className={`cs_price ${
                      property.isQuote
                        ? "cs_priceQuote"
                        : "cs_priceNormal"
                    }`}
                  >
                    {property.price}
                  </span>
                </div>
              </button>
            );
          })}
        </section>

        <div className="cs_bottomSpacer" />
      </main>

      {/* FOOTER */}
      <footer className="cs_bottomFixed">
        <div className="cs_actionArea">
          <button
            className="cs_continueBtn"
            type="button"
            onClick={() => onContinue(selectedProperty)}
          >
            Continue to Schedule
          </button>
        </div>
      </footer>
    </div>
  );
};

export default CommercialSubWeb;
