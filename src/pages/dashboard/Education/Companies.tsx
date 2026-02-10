import { useEffect, useMemo, useState } from "react";
import "./Companies.css";
import JobDetails from "./JobDetails";

/* =======================
   Types
======================= */


type Company = {
  id: number;
  name: string;
  industry: string;
  description: string;
  location: string;
  size: string;
  status: "Active" | "Hiring Frozen";
};


type ApiJobOpening = {
  id: number;
  job_id: number;
  company_name: string;
  company_address: string;
  industry_id: number | null;
  company_size_id: number | null;
  role_description: string;
  requirements: string;
  is_active: boolean;
};


type Props = {
  onBack: () => void;
};

/* =======================
   Filters
======================= */

const INDUSTRIES = [
  "All",
  "Software Engineering",
  "EdTech",
  "Finance & Banking",
  "Green Energy",
  "Healthcare",
];

const LOCATIONS = ["All", "Bangalore","Delhi", "Mumbai", "Hyderabad", "Chennai", "Pune"];
const SIZES = ["All", "50-200", "200-500", "500+", "1000+"];

/* =======================
   Component
======================= */

export default function Companies({ onBack }: Props) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);


  const [industry, setIndustry] = useState("All");
  const [location, setLocation] = useState("All");
  const [size, setSize] = useState("All");
 const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);


  /* =======================
     Fetch Companies
  ======================= */

useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await fetch(
        "https://swachify-india-be-1-mcrb.onrender.com/api/jobs/openings"
      );
      const data: ApiJobOpening[] = await res.json();

      // 🔹 group jobs by company name
      const companyMap = new Map<string, Company>();

      data.forEach(job => {
        if (!companyMap.has(job.company_name)) {
          companyMap.set(job.company_name, {
            id: job.id, // first job id as company id
            name: job.company_name,
            industry: job.industry_id
              ? `Industry ${job.industry_id}`
              : "Not Specified",
            description:
              "Explore job openings and internships at this company.",
            location: job.company_address || "Location not specified",
            size: job.company_size_id
              ? `Size ${job.company_size_id}`
              : "Not specified",
            status: job.is_active ? "Active" : "Hiring Frozen",
          });
        }
      });

      setCompanies(Array.from(companyMap.values()));
    } catch (err) {
      console.error("Failed to fetch job openings", err);
    } finally {
      setLoading(false);
    }
  };

  fetchJobs();
}, []);


  /* =======================
     Filtering Logic
  ======================= */

  const filteredCompanies = useMemo(() => {
    return companies.filter(c => {
      // if (tab === "active" && c.status !== "Active") return false;
      if (industry !== "All" && c.industry !== industry) return false;
     if (
  location !== "All" &&
  !c.location.toLowerCase().includes(location.toLowerCase())
) {
  return false;
}

      if (size !== "All" && c.size !== size) return false;
      return true;
    });
  }, [companies, industry, location, size]);

  /* =======================
     Job Details View
  ======================= */

 if (selectedCompany) {
  return (
    <JobDetails
      company={selectedCompany}
      onBack={() => setSelectedCompany(null)}
    />
  );
}


  /* =======================
     UI
  ======================= */

  return (
     <div className="companies-wrapper">
    <div className="companies-layout">
      <div className="page-header">
        <div className="header-left">
          <button className="companies-back-btn" onClick={onBack}>
            ←
          </button>
          <h2>Companies</h2>
        </div>
      </div>

      {/* <div className="tabs">
        <button
          className={`tab ${tab === "all" ? "active" : ""}`}
          onClick={() => setTab("all")}
        >
          All Companies
        </button>
        <button
          className={`tab ${tab === "active" ? "active" : ""}`}
          onClick={() => setTab("active")}
        >
          Actively Hiring
        </button>
      </div> */}

      <div className="filters">
        <select value={industry} onChange={e => setIndustry(e.target.value)}>
          {INDUSTRIES.map(i => (
            <option key={i}>{i}</option>
          ))}
        </select>

        <select value={location} onChange={e => setLocation(e.target.value)}>
          {LOCATIONS.map(l => (
            <option key={l}>{l}</option>
          ))}
        </select>

        <select value={size} onChange={e => setSize(e.target.value)}>
          {SIZES.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading companies...</div>
      ) : (
        <div className="company-grid">
          {filteredCompanies.map(company => (
            <div key={company.id} className="company-card">
              <div className="card-header">
                <div className="avatar">{company.name[0]}</div>
                <div>
                  <h3>{company.name}</h3>
                  <span className="industry">{company.industry}</span>
                </div>
              </div>

              <p className="desc">{company.description}</p>

              <div className="meta">
                <span>📍 {company.location}</span>
                <span>👥 {company.size}</span>
              </div>

              <div className="card-footer">
                <span
                  className={`company-status ${
                    company.status === "Active" ? "active" : "frozen"
                  }`}
                >
                  {company.status}
                </span>

                <button
  type="button"
  className="primary-btn"
  onClick={() => setSelectedCompany(company)}
>
  View Opportunities
</button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
