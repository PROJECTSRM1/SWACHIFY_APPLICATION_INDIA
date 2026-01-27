import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ServiceRequestsScreenWeb.css";

type Urgency = "high" | "medium" | "low";

type Request = {
  id: string;
  tag: string;
  distance: string;
  title: string;
  description: string;
  location: string;
  time: string;
  price: string;
  rating: number;
  category: string;
  urgency: Urgency;
};

const REQUESTS: Request[] = [
  {
    id: "r1",
    tag: "Urgent",
    distance: "2.5 km",
    title: "House Shifting - Packing",
    description: "Need help packing and loading luggage for 2BHK.",
    location: "Gachibowli, Hyderabad",
    time: "10 min ago",
    price: "₹1200",
    rating: 4.8,
    category: "Moving",
    urgency: "high",
  },
  {
    id: "r2",
    tag: "Cleaning",
    distance: "3.8 km",
    title: "Deep Cleaning - Apartment",
    description: "Deep cleaning required for 3BHK apartment.",
    location: "Banjara Hills, Hyderabad",
    time: "35 min ago",
    price: "₹1200",
    rating: 4.9,
    category: "Cleaning",
    urgency: "medium",
  },
  {
    id: "r3",
    tag: "Urgent",
    distance: "1.2 km",
    title: "Plumbing Repair",
    description: "Fix leaking kitchen tap.",
    location: "Madhapur, Hyderabad",
    time: "1 hour ago",
    price: "₹800",
    rating: 4.7,
    category: "Repair",
    urgency: "low",
  },
];

const CATEGORIES = [
  "All",
  "Moving",
  "Cleaning",
  "Repair",
  "Installation",
  "Home Services",
  "Electrical",
  "Gardening",
];

const URGENCY: ("All" | Urgency)[] = ["All", "high", "medium", "low"];

const ServiceRequestsScreenWeb: React.FC = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedUrgency, setSelectedUrgency] =
    useState<"All" | Urgency>("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredRequests = useMemo(() => {
    return REQUESTS.filter((req) => {
      if (selectedCategory !== "All" && req.category !== selectedCategory)
        return false;

      if (selectedUrgency !== "All" && req.urgency !== selectedUrgency)
        return false;

      if (search.trim()) {
        const q = search.toLowerCase();
        const blob = `${req.title} ${req.description} ${req.location}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }

      return true;
    });
  }, [search, selectedCategory, selectedUrgency]);

  return (
    <div className="srw_page">
      {/* HEADER */}
      <header className="srw_header">
        <button onClick={() => navigate(-1)} className="srw_back">
          ←
        </button>
        <h1>Service Requests</h1>
      </header>

      <div className="srw_container">
        {/* SEARCH + FILTER */}
        <div className="srw_searchCard">
          <div className="srw_searchRow">
            <div className="srw_searchWrap">
              <input
                className="srw_searchInput"
                placeholder="Search for services, locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="srw_searchIcon">🔍</span>
            </div>

            <button
              className={`srw_filterBtn ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </button>
          </div>

          {showFilters && (
            <>
              <p className="srw_sectionTitle">Category</p>
              <div className="srw_chipRow">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`srw_chip ${
                      selectedCategory === cat
                        ? cat === "All"
                          ? "allActive"
                          : "active"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <p className="srw_sectionTitle">Urgency</p>
              <div className="srw_chipRow">
                {URGENCY.map((u) => (
                  <button
                    key={u}
                    className={`srw_chip ${
                      selectedUrgency === u
                        ? u === "All"
                          ? "allActive"
                          : "active"
                        : ""
                    }`}
                    onClick={() => setSelectedUrgency(u)}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <p className="srw_found">
          Found <b>{filteredRequests.length}</b> service requests
        </p>

        {/* CARDS */}
        {filteredRequests.map((req) => (
          <div key={req.id} className="srw_card">
            <div className="srw_cardTop">
              <span className="srw_tag">{req.tag}</span>
              <span className="srw_distance">{req.distance}</span>
            </div>

            <h3>{req.title}</h3>
            <p className="srw_desc">{req.description}</p>

            <p className="srw_meta">📍 {req.location}</p>
            <p className="srw_meta">⏱ {req.time}</p>

            <div className="srw_rating">
              ⭐⭐⭐⭐⭐ <b>{req.rating.toFixed(1)}</b>
            </div>

            <div className="srw_footer">
              <span className="srw_price">{req.price}</span>

              <div className="srw_actions">
                <button className="srw_accept">Accept</button>
                <button className="srw_details">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceRequestsScreenWeb;
