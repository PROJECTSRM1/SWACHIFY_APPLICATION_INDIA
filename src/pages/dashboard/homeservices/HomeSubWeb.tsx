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
import kitchen from "../../../assets/CleaningServices/kitchen.png";
 import bathroom from "../../../assets/CleaningServices/bathroom.png";
 import sofa from "../../../assets/CleaningServices/sofa.png";
 import bedroom from "../../../assets/CleaningServices/bedroom.png";
 //import window from "../../../assets/CleaningServices/window.png";
 //import home from "../../../assets/CleaningServices/home.png";
type PropertyOption = {
  id: string;
  icon: React.ReactNode;
  title: string;
  price: string;
  image?: string;
  description?: string;
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
      { id: "1bhk", icon: <MdBed />, title: "kitchen", price: "₹80", image: kitchen,description:"Degreasing, cabinets & appliances" },
      { id: "2bhk", icon: <MdBed />, title: "bathroom", price: "₹120", image: bathroom,description:"Sanitization & tile scrubbing" },
      { id: "3bhk", icon: <MdApartment />, title: "sofa", price: "₹180",image: sofa ,description:"Deep vacuuming & stain removal" },
      { id: "studio", icon: <MdApartment />, title: "bedroom", price: "₹65",image: bedroom,description:"Dusting, bedding & floor care" },
      { id: "villa", icon: <MdVilla />, title: "window", price: "₹250",image: kitchen,description:"Interior & exterior glass shine" },
    //   { id: "villa", icon: <MdVilla />, title: "Villa / Penthouse", price: "₹250",  },

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
                  {opt.image && (
  <div className="hsw_imageWrap">
    <img src={opt.image} alt={opt.title} />
  </div>
)}
<div>{opt.description}</div>

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
