import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdArrowBackIosNew,
  MdInfo,
  MdCheck,
  MdRemove,
  MdAdd,
} from "react-icons/md";
import "./HomeSubCatWeb.css";

type PropertyType = "1BHK" | "2BHK" | "3BHK" | "Studio" | "Villa";
type ServiceKey = "standard" | "deep" | "sanitization" | "window";
type ServicesState = Record<ServiceKey, boolean>;

type Pricing = {
  standard: number;
  deep: number;
  sanitization: number;
  window: number;
  description: string;
};

type HomeSubCatWebProps = {
  propertyType: PropertyType;
  onClose: () => void;
  onContinue: (data: {
    propertyType: PropertyType;
    selectedServices: string[];
    windowCount: number;
    totalPrice: string;
  }) => void;
};

const PRICING_CONFIG: Record<PropertyType, Pricing> = {
  "1BHK": { standard: 49, deep: 89, sanitization: 25, window: 15, description: "1 Bedroom, Hall & Kitchen setup" },
  "2BHK": { standard: 79, deep: 139, sanitization: 35, window: 15, description: "2 Bedrooms, Hall & Kitchen setup" },
  "3BHK": { standard: 109, deep: 189, sanitization: 45, window: 15, description: "3 Bedrooms, Hall & Kitchen setup" },
  "Studio": { standard: 39, deep: 69, sanitization: 20, window: 12, description: "Studio apartment" },
  "Villa": { standard: 149, deep: 249, sanitization: 65, window: 20, description: "Independent villa" },
};

const formatMoney = (n: number) => `$${n.toFixed(2)}`;

const HomeSubCatWeb: React.FC<HomeSubCatWebProps> = ({ onContinue }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const propertyType: PropertyType =
    (location.state?.propertyType as PropertyType) || "1BHK";

  const pricing = PRICING_CONFIG[propertyType];

  const [services, setServices] = useState<ServicesState>({
    standard: true,
    deep: false,
    sanitization: false,
    window: false,
  });

  const [windowCount, setWindowCount] = useState(2);

  const toggleService = (key: ServiceKey) => {
    setServices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectedServiceTitles = useMemo(() => {
    const s: string[] = [];
    if (services.standard) s.push("Floor Cleaning");
    if (services.deep) s.push("Deep Cleaning");
    if (services.sanitization) s.push("Sanitization");
    if (services.window) s.push("Window Cleaning");
    return s;
  }, [services]);

  const total = useMemo(() => {
    let t = 0;
    if (services.standard) t += pricing.standard;
    if (services.deep) t += pricing.deep;
    if (services.sanitization) t += pricing.sanitization;
    if (services.window) t += pricing.window * windowCount;
    return t;
  }, [services, pricing, windowCount]);

  return (
    <div className="hsc_page">
      {/* HEADER */}
      <header className="hsc_header">
        <div className="hsc_headerLeft">
          <button className="hsc_iconBtn" onClick={() => navigate(-1)}>
            <MdArrowBackIosNew size={18} />
          </button>
          <h1 className="hsc_headerTitle">{propertyType} Service Options</h1>
        </div>
        <button className="hsc_helpBtn">Help</button>
      </header>

      {/* CONTENT */}
      <main className="hsc_main">
        <h2 className="hsc_sectionTitle"></h2>
        <p className="hsc_sectionSubtitle">
          Tailored for a {pricing.description}.
        </p>

        <section className="hsc_serviceList">
          {/* Standard */}
          <button className="hsc_serviceItem" onClick={() => toggleService("standard")}>
            <div className="hsc_serviceContent">
              <div className={`hsc_checkbox ${services.standard ? "hsc_checkboxChecked" : ""}`}>
                {services.standard && <MdCheck size={14} />}
              </div>
              <div>
                <p className="hsc_serviceName">Standard Cleaning</p>
                <p className="hsc_servicePrice">{formatMoney(pricing.standard)}</p>
                <p className="hsc_serviceDesc">2 hrs • Dusting, mopping, kitchen & bathroom</p>
              </div>
            </div>
            <span className="hsc_includedText">INCLUDED</span>
          </button>

          {/* Deep */}
          <button className="hsc_serviceItem" onClick={() => toggleService("deep")}>
            <div className="hsc_serviceContent">
              <div className={`hsc_checkbox ${services.deep ? "hsc_checkboxChecked" : ""}`}>
                {services.deep && <MdCheck size={14} />}
              </div>
              <div>
                <p className="hsc_serviceName">Deep Cleaning</p>
                <p className="hsc_servicePrice">{formatMoney(pricing.deep)}</p>
                <p className="hsc_serviceDesc">4 hrs • Cabinets, vents, grime removal</p>
              </div>
            </div>
            <span className="hsc_addText">{services.deep ? "Added" : "Add"}</span>
          </button>

          {/* Window */}
          <div className="hsc_serviceItemExpanded">
            <button className="hsc_serviceItemTop" onClick={() => toggleService("window")}>
              <div className="hsc_serviceContent">
                <div className={`hsc_checkbox ${services.window ? "hsc_checkboxChecked" : ""}`}>
                  {services.window && <MdCheck size={14} />}
                </div>
                <div>
                  <p className="hsc_serviceName">Window Cleaning</p>
                  <p className="hsc_servicePrice">
                    {formatMoney(pricing.window)} / window
                  </p>
                </div>
              </div>
            </button>

            <div className="hsc_quantityRow">
              <span>Number of windows</span>
              <div className="hsc_quantitySelector">
                <button onClick={() => setWindowCount(Math.max(1, windowCount - 1))}>
                  <MdRemove />
                </button>
                <strong>{windowCount}</strong>
                <button onClick={() => setWindowCount(windowCount + 1)}>
                  <MdAdd />
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="hsc_tip">
          <MdInfo />
          <p>
            We recommend <b>Deep Cleaning</b> if it’s been more than 3 months.
          </p>
        </div>
      </main>

      {/* FOOTER (NORMAL FLOW – FIXED) */}
      <div className="hsc_footer">
        <div className="hsc_summaryTab">
          <div>
            <p className="hsc_summaryLabel">TOTAL ESTIMATED</p>
            <p className="hsc_summaryTotal">{formatMoney(total)}</p>
          </div>
          <button
            className="hsc_continueBtn"
            onClick={() =>
              onContinue({
                propertyType,
                selectedServices: selectedServiceTitles,
                windowCount,
                totalPrice: total.toFixed(2),
              })
            }
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeSubCatWeb;
