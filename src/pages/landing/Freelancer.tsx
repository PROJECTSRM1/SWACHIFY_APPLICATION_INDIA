import React, { useMemo, useState } from "react";
import "./Freelancer.css";

/* ================= TYPES ================= */

interface OrganisationDetails {
  orgName: string;
  gstin: string;
  group: number;
}

interface ServiceProvider {
  id: string;
  name: string;
  service: string;
  rating: number;
  reviews: number;
  skills: string[];
  hourlyRate: number;
  image: string;
  isActive: boolean;
  isEnrolled: boolean;
  organisation?: OrganisationDetails;
  cuisineStyle?: "North" | "South";
}

/* ================= DATA ================= */

const serviceProviders: ServiceProvider[] = [
  {
    id: "1",
    name: "Ramesh Kumar",
    service: "Plumber",
    rating: 4.8,
    reviews: 156,
    skills: ["Pipe Fitting", "Drainage"],
    hourlyRate: 350,
    image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=800",
    isActive: true,
    isEnrolled: true,
  },
  {
    id: "2",
    name: "Lakshmi Devi",
    service: "Cleaner",
    rating: 5.0,
    reviews: 203,
    skills: ["Deep Cleaning", "Sanitization"],
    hourlyRate: 250,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
    isActive: false,
    isEnrolled: true,
  },
  {
    id: "3",
    name: "Suresh Reddy",
    service: "Electrician",
    rating: 4.7,
    reviews: 98,
    skills: ["Wiring", "Repair"],
    hourlyRate: 400,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800",
    isActive: true,
    isEnrolled: true,
    organisation: {
      orgName: "Sparkle Cleaning Pvt Ltd",
      gstin: "29ABCDE1234F1Z5",
      group: 10,
    },
  },
  {
    id: "24",
    name: "Priya Mani",
    service: "Chef",
    cuisineStyle: "South",
    rating: 4.9,
    reviews: 88,
    skills: ["Andhra Cuisine", "Meals"],
    hourlyRate: 500,
    image: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?w=800",
    isActive: true,
    isEnrolled: true,
  },
  {
    id: "25",
    name: "Sajid Khan",
    service: "Chef",
    cuisineStyle: "North",
    rating: 4.8,
    reviews: 112,
    skills: ["Tandoori", "Mughlai"],
    hourlyRate: 600,
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=800",
    isActive: true,
    isEnrolled: true,
  },
  {
    id: "26",
    name: "Karthik Raja",
    service: "Chef",
    cuisineStyle: "South",
    rating: 4.7,
    reviews: 45,
    skills: ["Chettinad", "Dosa"],
    hourlyRate: 450,
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800",
    isActive: true,
    isEnrolled: true,
  },
];

const categories = ["All", "Chef", "Plumber", "Cleaner", "Electrician", "Washer"];

/* ================= COMPONENT ================= */

const Freelancer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [chefStyle, setChefStyle] = useState<"North" | "South">("South");

  const filteredProviders = useMemo(() => {
    return serviceProviders.filter((p) => {
      if (!p.isEnrolled) return false;
      if (showOnlyActive && !p.isActive) return false;
      if (selectedCategory !== "All" && p.service !== selectedCategory)
        return false;
      if (selectedCategory === "Chef" && p.cuisineStyle !== chefStyle)
        return false;

      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.service.toLowerCase().includes(q) ||
        p.skills.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery, showOnlyActive, chefStyle]);

  return (
    <div className="container">
      {/* HEADER */}
      <header className="header">
        <button className="icon" onClick={() => window.history.back()}>
          ←
        </button>
        <h1 className="header-title">Freelancers</h1>
      </header>

      {/* SEARCH */}
      <div className="search-row">
        <input
          placeholder="Search services or names"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className={`filter ${showOnlyActive ? "active" : ""}`}
          onClick={() => setShowOnlyActive((p) => !p)}
        >
          Filter
        </button>
      </div>

      {/* CATEGORIES */}
      <div className="categories">
        {categories.map((c) => (
          <button
            key={c}
            className={`chip ${selectedCategory === c ? "active" : ""}`}
            onClick={() => setSelectedCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* CHEF STYLE */}
      {selectedCategory === "Chef" && (
        <div className="chef-toggle">
          <button
            className={chefStyle === "South" ? "active" : ""}
            onClick={() => setChefStyle("South")}
          >
            South Style
          </button>
          <button
            className={chefStyle === "North" ? "active" : ""}
            onClick={() => setChefStyle("North")}
          >
            North Style
          </button>
        </div>
      )}

      {/* LIST */}
      <div className="list">
        {filteredProviders.map((p) => (
          <div key={p.id} className="card">
            <img src={p.image} alt={p.name} />

            <div className="card-body">
              <div className="top">
                <div>
                  <h3>{p.name}</h3>
                  <span>{p.service}</span>
                </div>
                <div className="rating">
                  ⭐ {p.rating} ({p.reviews})
                </div>
              </div>

              <div className="status">
                <span className={`dot ${p.isActive ? "green" : "red"}`} />
                {p.isActive ? "Active" : "Inactive"}
              </div>

              {p.organisation && (
                <div className="org">
                  <strong>{p.organisation.orgName}</strong>
                  <small>GSTIN: {p.organisation.gstin}</small>
                </div>
              )}

              <div className="skills">
                {p.skills.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>

              <div className="footer">
                <div>
                  <small>STARTING AT</small>
                  <div className="price">₹{p.hourlyRate}/hr</div>
                </div>
                <button className="primary">Book Now</button>
              </div>
            </div>
          </div>
        ))}

        {filteredProviders.length === 0 && (
          <p className="empty">No service providers found</p>
        )}
      </div>
    </div>
  );
};

export default Freelancer;
