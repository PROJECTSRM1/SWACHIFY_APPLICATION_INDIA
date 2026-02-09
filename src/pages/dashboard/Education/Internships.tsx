import { useEffect, useMemo, useState } from "react";
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

/* ================= FILTERS ================= */

const filters = ["All", "Design", "Engineering", "Marketing", "Remote"];


/* ================= COMPONENT ================= */

const Internships = ({ onBack }: Props) => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);

  const [activeFilter, setActiveFilter] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedInternship, setSelectedInternship] =
    useState<Internship | null>(null);
  const [showReview, setShowReview] = useState(false);

  /* ================= FETCH API ================= */

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch(
          "https://swachify-india-be-1-mcrb.onrender.com/internship/application"
        );
        const json = await res.json();

        if (json.status && Array.isArray(json.data)) {
          const mapped: Internship[] = json.data.map((item: any) => ({
            id: item.id,
            title: item.role_description,
            company: item.company_name,
            logoColor: "#4F46E5", // fallback brand color
            location: item.company_address || "Remote",
            duration: item.internship_duration_id
              ? `Duration ${item.internship_duration_id}`
              : "Flexible",
            type: item.internship_stipend ? "Paid" : null,
            isRemote: item.location_type_id === 2, // adjust if backend enum changes
            description: item.requirements,
            category:
              item.sub_module_id === 4
                ? "engineering"
                : item.sub_module_id === 7
                ? "marketing"
                : "design",
          }));

          setInternships(mapped);
        }
      } catch (err) {
        console.error("Failed to load internships", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

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
  }, [activeFilter, search, internships]);

  /* ================= RENDER ================= */

  return (
    <div className="internships-wrapper">
    <div className="internships-web">
      {showReview ? (
        <ReviewApplication onBack={() => setShowReview(false)} />
      ) : selectedInternship ? (
        <InternshipDetails
          internship={selectedInternship}
          onBack={() => setSelectedInternship(null)}
          onApply={() => setShowReview(true)}
        />
      ) : (
        <>
          {/* ===== HEADER ===== */}
          <div className="internships-header">
            <button className="internships-back" onClick={() => onBack?.()}>
              ←
            </button>

            <h1>Internships</h1>

            <input
              className="internships-search"
              placeholder="Search role, company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* ===== FILTERS ===== */}
          <div className="internships-filters">
            <div className="internships-tabs">
              {filters.map((f, i) => (
                <button
                  key={f}
                  className={i === activeFilter ? "active" : ""}
                  onClick={() => setActiveFilter(i)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* ===== CONTENT ===== */}
          {loading ? (
            <div className="empty">Loading internships...</div>
          ) : filteredData.length === 0 ? (
            <div className="empty">No internships found</div>
          ) : (
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
                     <h3 className={expandedId === i.id ? "title expanded" : "title"}>
  {i.title}
</h3>

{i.title.length > 40 && (
  <button
    className="view-more"
    onClick={() =>
      setExpandedId(expandedId === i.id ? null : i.id)
    }
  >
    {expandedId === i.id ? "View less" : "View more"}
  </button>
)}

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
          )}
        </>
      )}
    </div>
    </div>
  );
};

export default Internships;
