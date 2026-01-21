import { useEffect, useState } from "react";
import "./BuysaleProducts.css";
import {
  MdSearch,
  MdLocationOn,
  MdStar,
  MdExpandMore,
  MdAdd,
} from "react-icons/md";

import Modal from "./ForBuysale";
import SellItem from "./PopupForm";
import BuyerPageWeb from "./CardDetails";

/* =======================
   TYPES
======================= */
export interface Property {
  id: string;
  title: string;
  price: string;
  image: string;
  rating: number;
  area: string;
  sqft: string;
  bhk?: string;
  distance: string;
  listingType: "buy" | "rent";
}

/* =======================
   DUMMY DATA
======================= */
const DUMMY_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "1 BHK Villa in Downtown",
    price: "₹1,20,000",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    rating: 4.9,
    area: "Hyderabad",
    sqft: "1200",
    bhk: "1 BHK",
    distance: "2.7 km away",
    listingType: "buy",
  },
  {
    id: "2",
    title: "Agriculture Land in Industry",
    price: "₹1,00,000",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    rating: 4.6,
    area: "Village",
    sqft: "1000",
    distance: "2.7 km away",
    listingType: "buy",
  },
  {
    id: "3",
    title: "Open Land for Sale",
    price: "₹80,000",
    image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab",
    rating: 4.4,
    area: "Outskirts",
    sqft: "1500",
    distance: "4.1 km away",
    listingType: "buy",
  },
  {
    id: "4",
    title: "Farm Land Near Highway",
    price: "₹2,40,000",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    rating: 4.8,
    area: "Highway",
    sqft: "2000",
    distance: "6.3 km away",
    listingType: "buy",
  },
  {
    id: "5",
    title: "Residential Plot",
    price: "₹95,000",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    rating: 4.5,
    area: "Suburb",
    sqft: "900",
    distance: "1.9 km away",
    listingType: "buy",
  },
];

/* =======================
   COMPONENT
======================= */
export default function MarketplaceWeb() {
  const [openSellForm, setOpenSellForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Detecting location...");
  const [properties, setProperties] = useState<Property[]>([]);

  /* =======================
     INIT
  ======================= */
  useEffect(() => {
    setProperties(DUMMY_PROPERTIES);
    detectLocation();
  }, []);

  /* =======================
     LOCATION
  ======================= */
  const detectLocation = () => {
    navigator.geolocation?.getCurrentPosition(
      async (pos) => {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
        );
        const data = await res.json();
        setLocation(`Near ${data?.address?.city || "Your Area"}`);
      },
      () => setLocation("Near Your Area")
    );
  };

  return (
    <>
      <div className="page">
        <section className="marketplace-section">
          <div className="container">

            {/* HEADER */}
            <header className="web-header">
              <div className="header-left">
                <h1>Marketplace</h1>
                <button className="dropdown">
                  Buy <MdExpandMore />
                </button>
              </div>

              <button className="sell-btn" onClick={() => setOpenSellForm(true)}>
                <MdAdd /> Sell / Rent
              </button>
            </header>

            {/* SEARCH */}
            <div className="search-box">
              <MdSearch />
              <input
                placeholder="Search homes, cars, land..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* LOCATION */}
            <div className="location-bar">
              <div>
                <span className="label">CURRENT LOCATION</span>
                <div className="loc-row">
                  <MdLocationOn />
                  <strong>{location}</strong>
                </div>
              </div>
              <span className="change">Change</span>
            </div>

            {/* GRID */}
            <div className="property-grid">
              {properties.map((p) => (
                <div
                  key={p.id}
                  className="property-card"
                  onClick={() => setSelectedProperty(p)}
                >
                  <div className="image-wrapper">
                    <img src={p.image} alt={p.title} />
                    <span className="badge">FOR SALE</span>
                    <div className="rating">
                      <MdStar /> {p.rating}
                    </div>
                  </div>

                  <div className="card-body">
                    <h3>{p.title}</h3>
                    <div className="price">{p.price}</div>
                    <div className="meta">
                      <span>📍 {p.area}</span>
                      <span>📐 {p.sqft} sqft</span>
                      {p.bhk && <span>🛏 {p.bhk}</span>}
                      <span>📍 {p.distance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      </div>

      {/* SELL POPUP */}
      {openSellForm && (
        <Modal onClose={() => setOpenSellForm(false)}>
          <SellItem onClose={() => setOpenSellForm(false)} />
        </Modal>
      )}

      {/* PROPERTY DETAILS POPUP */}
      {selectedProperty && (
        <Modal onClose={() => setSelectedProperty(null)}>
          <BuyerPageWeb
            property={selectedProperty}
            onBack={() => setSelectedProperty(null)}
          />
        </Modal>
      )}
    </>
  );
}
