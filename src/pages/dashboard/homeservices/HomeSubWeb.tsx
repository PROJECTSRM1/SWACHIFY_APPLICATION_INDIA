import React, { useMemo, useState } from "react";
import {
  MdArrowBack,
  MdSearch,
  MdBed,
  MdApartment,
  MdVilla,
  MdCheck,
} from "react-icons/md";
import "./HomeSubWeb.css";

type PropertyOption = {
  id: string;
  icon: React.ReactNode;
  title: string;
  price: string;
};

type HomeSubWebProps = {
  onBack: () => void;
  onContinue: (propertyType: string) => void;
};

const HomeSubWeb: React.FC<HomeSubWebProps> = ({ onBack, onContinue }) => {
  const [selectedProperty, setSelectedProperty] = useState("1bhk");
  const [search, setSearch] = useState("");

  const options: PropertyOption[] = useMemo(
    () => [
      { id: "1bhk", icon: <MdBed />, title: "1 BHK", price: "$80" },
      { id: "2bhk", icon: <MdBed />, title: "2 BHK", price: "$120" },
      { id: "3bhk", icon: <MdApartment />, title: "3 BHK+", price: "$180" },
      { id: "studio", icon: <MdApartment />, title: "Studio", price: "$65" },
      { id: "villa", icon: <MdVilla />, title: "Villa / Penthouse", price: "$250" },
    ],
    []
  );

  const filtered = options.filter((o) =>
    o.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="hsw_page">
      {/* HEADER */}
      <header className="hsw_header">
        <button onClick={onBack} className="hsw_backBtn">
          <MdArrowBack size={20} />
        </button>
        <h1>Choose Property Type</h1>
        <div />
      </header>

      {/* SEARCH */}
      <div className="hsw_search">
        <MdSearch />
        <input
          placeholder="Search property type"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LIST */}
      <div className="hsw_list">
        {filtered.map((opt) => {
          const active = opt.id === selectedProperty;

          return (
            <div
              key={opt.id}
              className={`hsw_card ${active ? "active" : ""}`}
              onClick={() => setSelectedProperty(opt.id)}
            >
              <div className="hsw_left">
                <div className="hsw_icon">{opt.icon}</div>
                <div>
                  <h3>{opt.title}</h3>
                  <p>Starting from {opt.price}</p>
                </div>
              </div>

              {active && (
                <div className="hsw_check">
                  <MdCheck />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <footer className="hsw_footer">
        <button onClick={() => onContinue(selectedProperty)}>
          Continue
        </button>
      </footer>
    </div>
  );
};

export default HomeSubWeb;
