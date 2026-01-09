import React, { useState } from "react";
import { Checkbox } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./Preference.css";

const SERVICES = [
  "Cleaning & Home Services",
  "Transport",
  "Buy/Sell/Rental",
  "Raw Materials",
  "Education",
  "Swachify Products",
  "Freelancer",
];

const Preference: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  return (
    <div className="preference-page">
      {/* Header */}
      <div className="preference-header">
        <ArrowLeftOutlined onClick={onBack} />
        <span>Preferences</span>
      </div>

      {/* Card */}
      <div className="preference-card">
        <h3>Service Preferences</h3>
        <p className="preference-desc">
          Select the services you want to see on your home page.
          If you disable all services, all services will be shown.
        </p>

        <div className="preference-list">
          {SERVICES.map((s) => (
            <label key={s} className="preference-item">
              <Checkbox
                checked={selected.includes(s)}
                onChange={() => toggle(s)}
              />
              <span>{s}</span>
            </label>
          ))}
        </div>

        <p className="preference-footer">
          All services will be displayed on the home page.
        </p>
      </div>
    </div>
  );
};

export default Preference;
