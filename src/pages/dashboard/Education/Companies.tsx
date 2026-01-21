import React, { useMemo, useState } from "react";
import "./Companies.css";
import JobDetails from "./JobDetails";

type Company = {
  id: number;
  name: string;
  industry: string;
  description: string;
  location: string;
  size: string;
  isRemote?: boolean;
  status: "Active" | "Hiring Frozen";
};
type Props = {
  onBack: () => void;
};


const COMPANIES: Company[] = [
  {
    id: 1,
    name: "TechFlow Systems",
    industry: "Software Engineering",
    description:
      "Leading the way in AI and machine learning solutions for enterprise clients.",
    location: "San Francisco, CA",
    size: "500+",
    status: "Active",
  },
  {
    id: 2,
    name: "EduGrow",
    industry: "EdTech",
    description:
      "Helping students learn faster through personalized curriculum and AI-driven tutoring.",
    location: "Austin, TX",
    size: "50-200",
    status: "Active",
  },
  {
    id: 3,
    name: "Apex Banking",
    industry: "Finance & Banking",
    description:
      "Global financial solutions with secure modern banking infrastructure.",
    location: "London, UK",
    size: "1000+",
    status: "Hiring Frozen",
  },
  {
    id: 4,
    name: "EcoDynamics",
    industry: "Green Energy",
    description:
      "Developing sustainable energy grids powered by next-gen solar technology.",
    location: "Remote",
    size: "50-200",
    status: "Active",
  },
  {
    id: 5,
    name: "CloudNine Solutions",
    industry: "Software Engineering",
    description:
      "Building next-generation cloud infrastructure and DevOps tools.",
    location: "Seattle, WA",
    size: "200-500",
    status: "Active",
  },
  {
    id: 6,
    name: "HealthTech Innovations",
    industry: "Healthcare",
    description:
      "Revolutionizing patient care with AI-powered diagnostic platforms.",
    location: "Boston, MA",
    size: "100-200",
    status: "Active",
  },
];

const INDUSTRIES = [
  "All",
  "Software Engineering",
  "EdTech",
  "Finance & Banking",
  "Green Energy",
  "Healthcare",
];

const LOCATIONS = [
  "All",
  "San Francisco, CA",
  "Austin, TX",
  "London, UK",
  "Remote",
  "Seattle, WA",
  "Boston, MA",
];

const SIZES = ["All", "50-200", "100-200", "200-500", "500+", "1000+"];

export default function Companies({ onBack }: Props) {

  const [tab, setTab] = useState<"all" | "active">("all");
  const [industry, setIndustry] = useState("All");
  const [location, setLocation] = useState("All");
  const [size, setSize] = useState("All");
  const [selectedCompanyId, setSelectedCompanyId] =
    useState<number | null>(null);

  const filteredCompanies = useMemo(() => {
    return COMPANIES.filter(c => {
      if (tab === "active" && c.status !== "Active") return false;
      if (industry !== "All" && c.industry !== industry) return false;
      if (location !== "All" && c.location !== location) return false;
      if (size !== "All" && c.size !== size) return false;
      return true;
    });
  }, [tab, industry, location, size]);

  /* ✅ FIXED: render JobDetails with correct props */
  if (selectedCompanyId !== null) {
    return (
      <JobDetails
        companyId={selectedCompanyId}
        onBack={() => setSelectedCompanyId(null)}
      />
    );
  }

  return (
    <div className="companies-layout">
      <div className="page-header">
        <div className="header-left">
          <button className="back-btn" onClick={onBack}>

            ←
          </button>
          <h2>Companies</h2>
        </div>
      </div>

      <div className="tabs">
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
      </div>

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
                className={`status ${
                  company.status === "Active" ? "active" : "frozen"
                }`}
              >
                {company.status}
              </span>

              <button
                type="button"
                className="primary-btn"
                onClick={() => setSelectedCompanyId(company.id)}
              >
                View Opportunities
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
