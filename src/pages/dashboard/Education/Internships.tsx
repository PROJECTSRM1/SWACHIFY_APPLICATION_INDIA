import { useMemo, useState } from "react";
import "./Internships.css";
import InternshipDetails from "./InternshipDetails";
import ReviewApplication from "./ReviewApplication";

/* ================= TYPES ================= */

export interface Internship {
  id: number;
  title: string;
  company: string;
  logoColor: string;
  location: string;
  duration: string;
  type: string | null;
  isRemote: boolean;
  description: string;
  category: string;
}

type Props = {
  onBack?: () => void;
};

/* ================= DATA ================= */

const internships: Internship[] = [
  {
    id: 1,
    title: "UX Design Intern",
    company: "Spotify",
    logoColor: "#1DB954",
    location: "Stockholm",
    duration: "6 Months",
    type: "Paid",
    isRemote: false,
    description:
      "Join our design team to help shape the future of audio streaming. You will work closely with researchers, product managers...",
    category: "design",
  },
  {
    id: 2,
    title: "Software Engineer Intern",
    company: "Google",
    logoColor: "#4285F4",
    location: "Remote",
    duration: "3 Months",
    type: null,
    isRemote: true,
    description:
      "Work on large-scale systems and help build the future of search. We are looking for students with strong algorithmic skills...",
    category: "engineering",
  },
  {
    id: 3,
    title: "Product Design Intern",
    company: "Apple",
    logoColor: "#000000",
    location: "Cupertino",
    duration: "Summer 2024",
    type: null,
    isRemote: false,
    description:
      "Define the user experience for Apple products. You'll work on everything from hardware interactions to software interfaces.",
    category: "design",
  },
  {
    id: 4,
    title: "Marketing Intern",
    company: "Airbnb",
    logoColor: "#FF5A5F",
    location: "Remote",
    duration: "12 Weeks",
    type: null,
    isRemote: true,
    description:
      "Support our global marketing campaigns and help tell the story of belonging anywhere.",
    category: "marketing",
  },
];

const filters = ["All", "Design", "Engineering", "Marketing", "Remote"];

/* ================= COMPONENT ================= */

const Internships = ({ onBack }: Props) => {
  const [activeFilter, setActiveFilter] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedInternship, setSelectedInternship] =
    useState<Internship | null>(null);
  const [showReview, setShowReview] = useState(false);

  /* ================= FILTER LOGIC ================= */

  const filteredData = useMemo(() => {
    let data = internships;

    if (activeFilter !== 0) {
      const f = filters[activeFilter].toLowerCase();
      data = data.filter((i) =>
        f === "remote" ? i.isRemote : i.category === f
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.company.toLowerCase().includes(q)
      );
    }

    return data;
  }, [activeFilter, search]);

  /* ================= RENDER ================= */

  return (
    <div className="internships-web">
      {showReview ? (
        /* ================= REVIEW SCREEN ================= */
        <ReviewApplication onBack={() => setShowReview(false)} />
      ) : selectedInternship ? (
        /* ================= DETAILS SCREEN ================= */
        <InternshipDetails
          internship={selectedInternship}
          onBack={() => setSelectedInternship(null)}
          onApply={() => setShowReview(true)}
        />
      ) : (
        /* ================= LIST SCREEN ================= */
        <>
          {/* Header */}
          <header className="web-header">
            <div className="left">
              <button className="back-btn" onClick={() => onBack?.()}>
                ←
              </button>
              <h1>Internships</h1>
            </div>

            <div className="search-wrapper">
              <input
                placeholder="Search role, company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="filter-icon">⚙</span>
            </div>
          </header>

          {/* Filters */}
          <div className="filter-bar">
            {filters.map((f, i) => (
              <button
                key={f}
                className={`filter-btn ${i === activeFilter ? "active" : ""}`}
                onClick={() => setActiveFilter(i)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Internship Grid */}
          <div className="internship-grid">
            {filteredData.map((i) => (
              <div className="card" key={i.id}>
                <div className="card-header">
                  <div className="company">
                    <div
                      className="logo"
                      style={{ backgroundColor: i.logoColor }}
                    >
                      {i.company[0]}
                    </div>
                    <div>
                      <h3>{i.title}</h3>
                      <p>{i.company}</p>
                    </div>
                  </div>
                  <button className="bookmark">🔖</button>
                </div>

                <div className="tags">
                  <span>📍 {i.location}</span>
                  <span>⏳ {i.duration}</span>
                  {i.type && <span>💰 {i.type}</span>}
                </div>

                <p className="desc">{i.description}</p>

                <button
                  className="apply-btn"
                  onClick={() => setSelectedInternship(i)}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Internships;
