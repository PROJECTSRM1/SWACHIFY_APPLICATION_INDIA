import { useEffect, useState } from "react";
import "./BuysaleProducts.css";
import {
  MdSearch,
  MdLocationOn,
  MdStar,
  MdExpandMore,
  MdAdd,
} from "react-icons/md";

const handleDelete = (
  id: string,
  setProperties: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const stored = JSON.parse(
    localStorage.getItem("marketplace_listings") || "[]"
  );

  const updated = stored.filter((item: any) => String(item.id) !== id);

  localStorage.setItem("marketplace_listings", JSON.stringify(updated));

  // refresh UI
  const refreshed = [
    ...getUserListings(),
    ...DUMMY_PROPERTIES,
  ];

  setProperties(refreshed);
};


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
  category: "land" | "apartment" | "house" | "vehicle" | "commercial";
  landType?: string;
  ownerName?: string;
  documents?: string[];
  registrationStatus?: string;
  registrationValue?: string;
  marketValue?: string;
  description?: string;

  isUserListing?: boolean;
}

/* =======================
   DUMMY DATA (UNCHANGED – ALL CARDS KEPT)
======================= */


const DUMMY_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "1 BHK Villa in Downtown",
    price: "₹1,20,000",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    area: "Hyderabad",
    sqft: "1200",
    bhk: "1 BHK",
    distance: "2.7 km away",
    listingType: "buy",
    category: "house",
  },

  {
    id: "3",
    title: "Open Land Near Highway",
    price: "₹2,40,000",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    area: "Shamshabad",
    sqft: "2000",
    distance: "6.3 km away",
    listingType: "buy",
    category: "land",
  },

  {
    id: "4",
    title: "3 BHK Independent House",
    price: "₹1,80,000",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    area: "Kukatpally",
    sqft: "1600",
    bhk: "3 BHK",
    distance: "3.8 km away",
    listingType: "buy",
    category: "house",
  },

  {
    id: "5",
    title: "2 BHK Apartment for Rent",
    price: "₹18,000 / month",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    area: "Gachibowli",
    sqft: "1100",
    bhk: "2 BHK",
    distance: "1.5 km away",
    listingType: "rent",
    category: "apartment",
  },

  /* VEHICLES */
  {
    id: "10",
    title: "Yamaha R15 V4",
    price: "₹1,82,000",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    area: "Kukatpally",
    sqft: "",
    distance: "2.6 km away",
    listingType: "buy",
    category: "vehicle",
  },
  {
    id: "16",
    title: "Hyundai i20 Sportz",
    price: "₹9,40,000",
    image: "https://th.bing.com/th/id/OIP.ZKNVZarz3HYsUlg24taeLwHaEK?w=290&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
    rating: 4.5,
    area: "Uppal",
    sqft: "",
    distance: "3.9 km away",
    listingType: "buy",
    category: "vehicle",
  },
];


const PROPERTY_TYPE_OPTIONS = [
  { label: "All", category: "all" },

  { label: "Apartment", category: "apartment" },
  { label: "Villa", category: "house" },
  { label: "Independent House", category: "house" },

  { label: "Land", category: "land" },

  { label: "Bike", category: "vehicle" },
  { label: "Car", category: "vehicle" },
  { label: "Lorry", category: "vehicle" },
  { label: "Auto", category: "vehicle" },
];

// ✅ READ USER POSTED LISTINGS FROM LOCAL STORAGE
const getUserListings = (): (Property & { isUserListing: boolean })[] => {
  const stored = JSON.parse(
    localStorage.getItem("marketplace_listings") || "[]"
  );

  return stored.map((item: any) => ({
    id: String(item.id),

    title: "Land for Sale",

    price:
      item.listingType === "rent"
        ? `₹${item.price} / month`
        : `₹${item.price}`,

    image: item.images?.[0],
    images: item.images,

    rating: 4.5,
    area: item.landArea || "Near Your Area",
    sqft: item.landSqft || "",

    landType: item.landType,
    ownerName: item.registeredOwner,
    documents: item.documents,
    registrationStatus: item.registrationStatus,
    registrationValue: item.registrationValue,
    marketValue: item.marketValue,
    description: item.description,

    distance: "Just now",

    // ✅ THIS IS THE KEY FIX
    listingType: item.listingType === "rent" ? "rent" : "buy",

    category: "land",
    isUserListing: true,
  }));
};




/* =======================
   COMPONENT
======================= */
export default function MarketplaceWeb() {
  const [openSellForm, setOpenSellForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Detecting location...");
  const [manualLocation, setManualLocation] = useState<string | null>(null);
  const [editingLocation, setEditingLocation] = useState(false);
const [tempLocation, setTempLocation] = useState("");


  const [properties, setProperties] = useState<
  (Property & { isUserListing?: boolean })[]
>([]);

  const [filterType, setFilterType] = useState<"all" | "buy" | "rent">("all");

  const [activeCategory, setActiveCategory] = useState<
    "all" | "land" | "apartment" | "house" | "vehicle" | "commercial"
  >("all");

  const [showDropdown, setShowDropdown] = useState(false);

  /* FILTER STATES (UNCHANGED) */
  const [showPropertyType, setShowPropertyType] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  /* LABEL STATES (UI ONLY) */
  const [propertyTypeLabel, setPropertyTypeLabel] = useState("Property Type");
  const [dateLabel, setDateLabel] = useState("Updated Date");
  const [ratingLabel, setRatingLabel] = useState("Ratings");

 useEffect(() => {
  const userListings = getUserListings();
  setProperties([...userListings, ...DUMMY_PROPERTIES]);

  if (!manualLocation) {
    detectLocation();
  }
}, [manualLocation]);



useEffect(() => {
  const refreshListings = () => {
    const userListings = getUserListings();
    setProperties([...userListings, ...DUMMY_PROPERTIES]);
  };

  window.addEventListener("listing-added", refreshListings);
  return () =>
    window.removeEventListener("listing-added", refreshListings);
}, []);

 const detectLocation = () => {
  if (!navigator.geolocation) {
    setLocation("Near Your Area");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        const address = data.address || {};

        const city =
          address.city ||
          address.town ||
          address.village ||
          address.suburb ||
          address.county ||
          "";

        const state = address.state || "";

        if (city && state) {
          setLocation(`Near ${city}, ${state}`);
        } else if (city) {
          setLocation(`Near ${city}`);
        } else if (state) {
          setLocation(`Near ${state}`);
        } else {
          setLocation("Near Your Area");
        }
      } catch {
        setLocation("Near Your Area");
      }
    },
    () => setLocation("Near Your Area")
  );
};



  /* =======================
     FILTER LOGIC (100% SAME)
  ======================= */
const filteredProperties = properties.filter((p: Property) => {
    const matchesType =
      filterType === "all" ? true : p.listingType === filterType;

    const matchesCategory =
      activeCategory === "all" ? true : p.category === activeCategory;

    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesRating =
      ratingFilter === null ? true : p.rating >= ratingFilter;

    return matchesType && matchesCategory && matchesSearch && matchesRating;
  });

  return (
    <>
      <div className="mp-page">
        <section className="mp-marketplace-section">
          <div className="mp-container">

            {/* HEADER */}
            <header className="mp-web-header">
              <div className="mp-header-left">
                <h1>Marketplace</h1>

                <div className="mp-dropdown-wrapper">
                  <button
                    className="mp-dropdown"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    {filterType === "all"
                      ? "All"
                      : filterType === "buy"
                      ? "Buy"
                      : "Rent"}{" "}
                    <MdExpandMore />
                  </button>

                  {showDropdown && (
                    <div className="mp-dropdown-menu">
                      {(["all", "buy", "rent"] as const)
                        .filter((t) => t !== filterType)
                        .map((t) => (
                          <div
                            key={t}
                            onClick={() => {
                              setFilterType(t);
                              setShowDropdown(false);
                            }}
                          >
                            {t.toUpperCase()}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              <button className="mp-sell-btn" onClick={() => setOpenSellForm(true)}>
                <MdAdd /> Sell / Rent
              </button>
            </header>

            {/* SEARCH + FILTERS */}
            <div className="mp-search-filter-row">
              <div className="mp-search-box wide">
                <MdSearch />
                <input
                  placeholder="Search homes, cars, land..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="mp-top-filters">

                {/* PROPERTY TYPE */}
<button
  onClick={() => {
    setShowPropertyType(!showPropertyType);
    setShowDateFilter(false);
    setShowRatingFilter(false);
  }}
>
  {propertyTypeLabel} <MdExpandMore />

  {showPropertyType && (
    <div className="mp-filter-dropdown">
      {PROPERTY_TYPE_OPTIONS.map((item) => (
        <div
          key={item.label}
          onClick={() => {
            setPropertyTypeLabel(item.label);
            setActiveCategory(item.category as any);
            setShowPropertyType(false);
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  )}
</button>


                {/* UPDATED DATE */}
                <button onClick={() => {
                  setShowDateFilter(!showDateFilter);
                  setShowPropertyType(false);
                  setShowRatingFilter(false);
                }}>
                  {dateLabel} <MdExpandMore />
                  {showDateFilter && (
                    <div className="mp-filter-dropdown">
                      {["All Time", "Today", "Last 7 Days", "Last 30 Days"].map(
                        (d) => (
                          <div
                            key={d}
                            onClick={() => {
                              setDateLabel(d);
                              setShowDateFilter(false);
                            }}
                          >
                            {d}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </button>

                {/* RATINGS */}
                <button onClick={() => {
                  setShowRatingFilter(!showRatingFilter);
                  setShowPropertyType(false);
                  setShowDateFilter(false);
                }}>
                  {ratingLabel} <MdExpandMore />
                  {showRatingFilter && (
                    <div className="mp-filter-dropdown">
                      {[null, 4.5, 4.0, 3.5].map((r) => (
                        <div
                          key={String(r)}
                          onClick={() => {
                            setRatingFilter(r);
                            setRatingLabel(
                              r === null ? "All Ratings" : `${r}+ Stars`
                            );
                            setShowRatingFilter(false);
                          }}
                        >
                          {r === null ? "All Ratings" : `${r}+ Stars`}
                        </div>
                      ))}
                    </div>
                  )}
                </button>

              </div>
            </div>

            
{/* LOCATION */}
<div className="mp-location-bar compact">
  <div>
    <span className="mp-label">CURRENT LOCATION</span>

    <div className="mp-loc-row">
      <MdLocationOn />

      {!editingLocation ? (
        <>
          <strong>{location}</strong>
          <span
            className="mp-change"
            onClick={() => {
              setTempLocation("");
              setEditingLocation(true);
            }}
          >
            Change
          </span>
        </>
      ) : (
        <>
          <input
            className="mp-location-input"
            placeholder="Enter city or area"
            value={tempLocation}
            onChange={(e) => setTempLocation(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && tempLocation.trim()) {
                const formatted = `Near ${tempLocation.trim()}`;
                setManualLocation(formatted);
                setLocation(formatted);
                setEditingLocation(false);
              }
            }}
          />
          <span
            className="mp-change"
            onClick={() => {
              if (tempLocation.trim()) {
                const formatted = `Near ${tempLocation.trim()}`;
                setManualLocation(formatted);
                setLocation(formatted);
              }
              setEditingLocation(false);
            }}
          >
            Save
          </span>
        </>
      )}
    </div>
  </div>
</div>


            {/* CATEGORY BUTTONS */}
            <div className="mp-categories">
              {["all", "land", "apartment", "house", "commercial", "vehicle"].map(
                (c) => (
                  <button
                    key={c}
                    className={activeCategory === c ? "active" : ""}
                    onClick={() => setActiveCategory(c as any)}
                  >
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </button>
                )
              )}
            </div>

            {/* GRID */}
            <div className="mp-property-grid">
              {filteredProperties.map((p) => (
                <div
                  key={p.id}
                  className="mp-property-card"
                  onClick={() => setSelectedProperty(p)}
                >
                  <div className="mp-image-wrapper">
  <img src={p.image} alt={p.title} />

  <span className="mp-badge">
    {p.listingType === "buy" ? "FOR SALE" : "FOR RENT"}
  </span>

  <div className="mp-rating">
    <MdStar /> {p.rating}
  </div>

  {/* ❌ DELETE BUTTON – ONLY USER POSTED CARD */}
  {"isUserListing" in p && p.isUserListing && (
    <button
      className="mp-delete-btn"
      onClick={(e) => {
        e.stopPropagation();
        handleDelete(p.id, setProperties);
      }}
    >
      ✕
    </button>
  )}
</div>


                  <div className="mp-card-body">
                    <h3>{p.title}</h3>
                    <div className="mp-price">{p.price}</div>
                    <div className="mp-meta">
                      <span>📍 {p.area}</span>
                      {p.sqft && <span>📐 {p.sqft} sqft</span>}
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

      {openSellForm && (
        <Modal onClose={() => setOpenSellForm(false)}>
          <SellItem onClose={() => setOpenSellForm(false)} />
        </Modal>
      )}

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
