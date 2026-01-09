import { useMemo, useState } from "react";
import "./Jobs.css";


type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: "Full time" | "Contract";
  industry: string;
  experience: string;
  posted: string;
  description: string;
};

const JOBS: Job[] = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Tech Solutions Pvt Ltd",
    location: "Bangalore",
    salary: "₹8-12 LPA",
    type: "Full time",
    industry: "IT",
    experience: "2-4 years",
    posted: "2 days ago",
    description:
      "Looking for experienced software engineers with strong programming skills in Java and Python.",
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "Brand Creators Inc",
    location: "Mumbai",
    salary: "₹10-15 LPA",
    type: "Full time",
    industry: "Marketing",
    experience: "5 years",
    posted: "5 days ago",
    description:
      "Seeking a creative marketing manager to lead our brand campaigns and digital marketing initiatives.",
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Analytics Corp",
    location: "Pune",
    salary: "₹6-9 LPA",
    type: "Full time",
    industry: "IT",
    experience: "1-3 years",
    posted: "1 week ago",
    description:
      "Join our data team to analyze business metrics and provide actionable insights.",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Design Studio",
    location: "Hyderabad",
    salary: "₹7-10 LPA",
    type: "Contract",
    industry: "Design",
    experience: "2-5 years",
    posted: "3 days ago",
    description:
      "Create beautiful and intuitive user interfaces for web and mobile applications.",
  },
  {
    id: 5,
    title: "Financial Analyst",
    company: "Finance Pro Services",
    location: "Delhi",
    salary: "₹9-14 LPA",
    type: "Full time",
    industry: "Finance",
    experience: "3-6 years",
    posted: "1 day ago",
    description:
      "Analyze financial data and provide strategic recommendations to senior management.",
  },
];
type JobsPageProps = {
  onBack?: () => void;
};


export default function JobsPage({ onBack }: JobsPageProps) {

  const [showFilters, setShowFilters] = useState(false);
  const [industry, setIndustry] = useState("All");
  const [location, setLocation] = useState("All");
  const [jobType, setJobType] = useState("All");
  const [sort, setSort] = useState<"relevance" | "newest">("relevance");

  const filteredJobs = useMemo(() => {
    let data = [...JOBS];

    if (industry !== "All") data = data.filter(j => j.industry === industry);
    if (location !== "All") data = data.filter(j => j.location === location);
    if (jobType !== "All") data = data.filter(j => j.type === jobType);

    if (sort === "newest") data = data.reverse();
    return data;
  }, [industry, location, jobType, sort]);

  return (
    <div className="jobs-page">
      {/* HEADER */}
      <div className="jobs-header-wrapper">
        <div className="jobs-header">
<h2 className="back-title" onClick={() => onBack?.()}>
  ← Job Opportunities
</h2>


          <button
            className="filter-btn"
            onClick={() => setShowFilters(prev => !prev)}
          >
            Filters
          </button>
        </div>
      </div>

      {/* FILTERS */}
      {showFilters && (
        <div className="filter-card">
          <h3>Filter & Sort</h3>

          <div className="filters">
            <div>
              <label>Industry</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)}>
                <option>All</option>
                <option>IT</option>
                <option>Marketing</option>
                <option>Finance</option>
                <option>Design</option>
              </select>
            </div>


            <div>
              <label>Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)}>
                <option>All</option>
                <option>Bangalore</option>
                <option>Mumbai</option>
                <option>Pune</option>
                <option>Hyderabad</option>
                <option>Delhi</option>                
              </select>
            </div>


            <div>
              <label>Job Type</label>
              <select value={jobType} onChange={e => setJobType(e.target.value)}>
                <option>All Types</option>
                <option>Full time</option>
                <option>Part Time </option>
                <option>Contract</option>
                <option>Freelancer</option>
                
              </select>
            </div>
          </div>

          <div className="sort-row">
            <button
              className={sort === "relevance" ? "active" : ""}
              onClick={() => setSort("relevance")}
            >
              Relevance
            </button>
            <button
              className={sort === "newest" ? "active" : ""}
              onClick={() => setSort("newest")}
            >
              Newest First
            </button>
          </div>
        </div>
      )}

      {/* JOB LIST */}
      <div className="job-list">
        {filteredJobs.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-top">
              <div>
                <h4>{job.title}</h4>
                <p className="company">{job.company}</p>
              </div>
              <span className="tag">{job.industry}</span>
            </div>

            <div className="job-meta-grid">
              <div className="job-meta-item">📍 {job.location}</div>
              <div className="job-meta-item">💼 {job.type}</div>
              <div className="job-meta-item">💰 {job.salary}</div>
              <div className="job-meta-item">🕒 {job.posted}</div>
            </div>

            <p className="desc">{job.description}</p>

            <div className="job-divider" />

            <div className="job-bottom">
              <span className="exp">Experience: {job.experience}</span>
              <button className="apply-btn1">Apply Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
