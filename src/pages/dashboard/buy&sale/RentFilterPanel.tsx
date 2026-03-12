import  { useState } from "react";
import "./RentFilterPanel.css";

export type FilterState = {
  lookingFor: "For Rent" | "For Sale" | "Both";
  propertyTypes: string[];
  facilities: string[];
  priceMin: number;
  priceMax: number;
};

const DEFAULT_FILTERS: FilterState = {
  lookingFor: "Both",
  propertyTypes: [],
  facilities: [],
  priceMin: 0,
  priceMax: 800,
};

type Props = {
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  onReset?: () => void;
};

export default function RentFilterPanel({ onClose, onApply, onReset }: Props) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const baseTypes = ["Apartment", "Penthouse", "Hotel", "Villa"];
  const moreTypes = ["Homestay", "House", "Studio"];

  const [showAllTypes, setShowAllTypes] = useState(false);

  const facilities = ["Bed room", "Bathtub", "AC", "WIFI"];

  const toggleType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter((t) => t !== type)
        : [...prev.propertyTypes, type],
    }));
  };

  const toggleFacility = (f: string) => {
    setFilters((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(f)
        ? prev.facilities.filter((v) => v !== f)
        : [...prev.facilities, f],
    }));
  };

  return (
    <div className="filter-overlay">

      <div className="filter-panel">

        <div className="filter-header">
          <h2>Filter</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* LOOKING FOR */}

        <h3 className="filter-section">Looking for</h3>

        {["For Rent", "For Sale"].map((opt) => (
          <label key={opt} className="filter-row">
            {opt}
            <input
              type="checkbox"
              checked={
                filters.lookingFor === opt || filters.lookingFor === "Both"
              }
              onChange={() =>
                setFilters({ ...filters, lookingFor: opt as any })
              }
            />
          </label>
        ))}

        {/* PROPERTY TYPE */}

        <h3 className="filter-section">Property Type</h3>

        {(showAllTypes ? [...baseTypes, ...moreTypes] : baseTypes).map((t) => (
          <label key={t} className="filter-row">
            {t}
            <input
              type="checkbox"
              checked={filters.propertyTypes.includes(t)}
              onChange={() => toggleType(t)}
            />
          </label>
        ))}

        <button
          className="show-more"
          onClick={() => setShowAllTypes(!showAllTypes)}
        >
          {showAllTypes ? "Show Less" : "Show All"}
        </button>

        {/* PRICE */}

        <h3 className="filter-section">Price Range</h3>

        <div className="price-row">
        

          <input
            type="range"
            min={0}
            max={800}
            value={filters.priceMax}
            onChange={(e) =>
              setFilters({ ...filters, priceMax: Number(e.target.value) })
            }
          />

          <div className="price-values">
            <span>${filters.priceMin}</span>
            <span>${filters.priceMax}</span>
          </div>
        </div>

        {/* FACILITIES */}

        <h3 className="filter-section">Facilities</h3>

        <div className="facility-grid">
          {facilities.map((f) => (
            <button
              key={f}
              className={
                filters.facilities.includes(f)
                  ? "facility active"
                  : "facility"
              }
              onClick={() => toggleFacility(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* FOOTER */}

        <div className="filter-footer">

          <button
            className="reset-btn"
            onClick={() => {
              setFilters(DEFAULT_FILTERS);
              if (onReset) onReset();
            }}
          >
            Reset
          </button>

          <button
            className="apply-btn"
            onClick={() => {
              onApply(filters);
              onClose();
            }}
          >
            Apply
          </button>

        </div>

      </div>
    </div>
  );
}
