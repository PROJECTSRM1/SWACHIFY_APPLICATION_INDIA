import { useState } from "react";
import { Button, Select } from "antd";
import "./Companies.css";

const { Option } = Select;

type Company = {
  id: number;
  name: string;
  industry: string;
  location: string;
  size: "Small" | "Medium" | "Large";
  jobs: number;
  internships: number;
};

const COMPANIES: Company[] = [
  {
    id: 1,
    name: "Tech Innovators Pvt Ltd",
    industry: "IT",
    location: "Bangalore",
    size: "Large",
    jobs: 12,
    internships: 5,
  },
  {
    id: 2,
    name: "Brand Masters Inc",
    industry: "Marketing",
    location: "Mumbai",
    size: "Medium",
    jobs: 6,
    internships: 3,
  },
  {
    id: 3,
    name: "Analytics Hub",
    industry: "Finance",
    location: "Pune",
    size: "Small",
    jobs: 4,
    internships: 6,
  },
  {
    id: 4,
    name: "Creative Studio",
    industry: "Design",
    location: "Hyderabad",
    size: "Small",
    jobs: 3,
    internships: 4,
  },
  {
    id: 5,
    name: "Investment Solutions",
    industry: "Finance",
    location: "Delhi",
    size: "Large",
    jobs: 15,
    internships: 7,
  },
  {
    id: 6,
    name: "Media House Publications",
    industry: "Media",
    location: "Madurai",
    size: "Medium",
    jobs: 8,
    internships: 8,
  },
];

type CompaniesProps = {
  onBack?: () => void;
};

export default function Companies({ onBack }: CompaniesProps) {

  const [showFilters, setShowFilters] = useState(false);
  const [industry, setIndustry] = useState("all");
  const [location, setLocation] = useState("all");
  const [size, setSize] = useState("all");
  const [sort, setSort] = useState<"relevance" | "jobs">("relevance");

  const filteredCompanies = COMPANIES
    .filter(c => (industry === "all" ? true : c.industry === industry))
    .filter(c => (location === "all" ? true : c.location === location))
    .filter(c => (size === "all" ? true : c.size === size))
    .sort((a, b) => (sort === "jobs" ? b.jobs - a.jobs : 0));

  return (
    <div className="page">
      {/* HEADER */}
      <div className="header">
<div className="back" onClick={() => onBack?.()}>←</div>
        <div className="title">Companies</div>
        <Button
          className="filter-btn"
          onClick={() => setShowFilters(prev => !prev)}
        >
          Filters
        </Button>
      </div>

      {/* FILTER PANEL */}
      {showFilters && (
        <div className="filter-panel">
          <h3>Filter & Sort</h3>

          <div className="filter-row">
            <div>
              <label>Industry</label>
              <Select value={industry} onChange={setIndustry} style={{ width: "100%" }}>
                <Option value="all">All Industries</Option>
                <Option value="IT">IT</Option>
                <Option value="Marketing">Marketing</Option>
                <Option value="Finance">Finance</Option>
                <Option value="Design">Design</Option>
                <Option value="Media">Media</Option>
              </Select>
            </div>

            <div>
              <label>Location</label>
              <Select value={location} onChange={setLocation} style={{ width: "100%" }}>
                <Option value="all">All Locations</Option>
                <Option value="Bangalore">Bangalore</Option>
                <Option value="Mumbai">Mumbai</Option>
                <Option value="Pune">Pune</Option>
                <Option value="Hyderabad">Hyderabad</Option>
                <Option value="Delhi">Delhi</Option>
                <Option value="Madurai">Madurai</Option>
              </Select>
            </div>

            <div>
              <label>Company Size</label>
              <Select value={size} onChange={setSize} style={{ width: "100%" }}>
                <Option value="all">All Sizes</Option>
                <Option value="Small">Small (10–100 employees)</Option>
                <Option value="Medium">Medium (100–500 employees)</Option>
                <Option value="Large">Large (500+ employees)</Option>
              </Select>
            </div>
          </div>

          <div className="sort">
            <Button
              className={sort === "relevance" ? "sort-active" : ""}
              onClick={() => setSort("relevance")}
            >
              Relevance
            </Button>

            <Button
              className={sort === "jobs" ? "sort-active" : ""}
              onClick={() => setSort("jobs")}
            >
              Most Opportunities
            </Button>
          </div>

          <Button className="black-btn" onClick={() => setShowFilters(false)}>
            Apply Filters
          </Button>
        </div>
      )}

      {/* COMPANY LIST */}
      <div className="list">
        {filteredCompanies.map(company => (
          <div key={company.id} className="company-card">
            <div className="company-top">
              <div className="company-icon">🏢</div>

              <div className="company-info">
                <h3>{company.name}</h3>

                <div className="company-size">
                  {company.size}
                </div>

                <div className="company-meta">
                  <div className="location">
                    📍 <span>{company.location}</span>
                  </div>
                  <span className="pill">{company.industry}</span>
                </div>

                <p className="company-desc">
                  Digital media company producing content across multiple platforms.
                </p>
              </div>
            </div>

            <div className="openings-box">
              <div>
                <span className="label">Job Openings</span>
                <span className="count">{company.jobs}</span>
              </div>

              <div>
                <span className="label">Internship Openings</span>
                <span className="count">{company.internships}</span>
              </div>
            </div>

            <Button className="cta-btn" block>
              View Opportunities
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
