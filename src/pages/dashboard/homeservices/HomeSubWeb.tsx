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

/* ================= TYPES ================= */

type PropertyOption = {
  id: string;
  icon: React.ReactNode;
  title: string;
  price: string;
  image?: string;
  description?: string;
};

type SelectedService = {
  id: string;
  title: string;
  price: number;
};

type HomeSubWebProps = {
  onBack: () => void;
  onContinue: (services: SelectedService[]) => void;
};

/* ================= COMPONENT ================= */

const HomeSubWeb: React.FC<HomeSubWebProps> = ({ onBack, onContinue }) => {
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const toggleSelect = (id: string) => {
    setSelectedProperties((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const options: PropertyOption[] = useMemo(
    () => [
      {
        id: "kitchen",
        icon: <MdBed />,
        title: "Kitchen",
        price: "₹80",
        image: kitchen,
        description: "Degreasing, cabinets & appliances",
      },
      {
        id: "bathroom",
        icon: <MdBed />,
        title: "Bathroom",
        price: "₹120",
        image: bathroom,
        description: "Sanitization & tile scrubbing",
      },
      {
        id: "sofa",
        icon: <MdApartment />,
        title: "Sofa",
        price: "₹180",
        image: sofa,
        description: "Deep vacuuming & stain removal",
      },
      {
        id: "bedroom",
        icon: <MdApartment />,
        title: "Bedroom",
        price: "₹65",
        image: bedroom,
        description: "Dusting, bedding & floor care",
      },
      {
        id: "window",
        icon: <MdVilla />,
        title: "Window",
        price: "₹250",
        image: kitchen,
        description: "Interior & exterior glass shine",
      },
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
        <h1>Choose Cleaning Services</h1>
        <div />
      </header>

      {/* SEARCH */}
      <div className="hsw_search">
        <MdSearch />
        <input
          placeholder="Search service"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LIST */}
      <div className="hsw_list">
        {filtered.map((opt) => {
          const active = selectedProperties.includes(opt.id);

          return (
            <div
              key={opt.id}
              className={`hsw_card ${active ? "active" : ""}`}
              onClick={() => toggleSelect(opt.id)}
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

                  <small>{opt.description}</small>
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
        <button
          disabled={selectedProperties.length === 0}
          onClick={() =>
            onContinue(
              options
                .filter((opt) => selectedProperties.includes(opt.id))
                .map((opt) => ({
                  id: opt.id,
                  title: opt.title,
                  price: Number(opt.price.replace("₹", "")),
                }))
            )
          }
        >
          Continue ({selectedProperties.length})
        </button>
      </footer>
    </div>
  );
};

export default HomeSubWeb;
