import { useState } from "react";
import "./JobDetails.css";

type Company = {
  id: number;
  name: string;
  industry: string;
  description: string;
  location: string;
  size: string;
  isRemote: boolean;
};

type Props = {
  companyId: number;
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
    isRemote: false,
  },
  {
    id: 2,
    name: "EduGrow",
    industry: "EdTech",
    description:
      "Helping students learn faster through personalized curriculum and AI tutoring.",
    location: "Austin, TX",
    size: "50-200",
    isRemote: false,
  },
  {
    id: 3,
    name: "Apex Banking",
    industry: "Finance & Banking",
    description:
      "Global financial solutions with secure modern banking infrastructure.",
    location: "London, UK",
    size: "1000+",
    isRemote: false,
  },
  {
    id: 4,
    name: "EcoDynamics",
    industry: "Green Energy",
    description:
      "Developing sustainable energy grids powered by next-gen solar technology.",
    location: "Remote",
    size: "50-200",
    isRemote: true,
  },
];

const getJobData = (company: Company) => ({
  title:
    company.id === 1
      ? "Senior Full Stack Developer"
      : company.id === 2
      ? "Product Manager – EdTech"
      : company.id === 3
      ? "Senior Financial Analyst"
      : "Senior Renewable Energy Engineer",
  salary: "$120k – $180k / yr",
  notice: "30 Days",
  description:
    "We are looking for an experienced professional to join our team and work on impactful, large-scale products using modern technologies.",
  requirements: [
    "5+ years of relevant experience",
    "Strong problem-solving skills",
    "Experience with scalable systems",
    "Excellent communication skills",
  ],
});

export default function JobDetails({ companyId, onBack }: Props) {
  const [expanded, setExpanded] = useState(false);

  const company = COMPANIES.find(c => c.id === companyId)!;
  const job = getJobData(company);

  return (
    <div className="job-layout">
      {/* HEADER */}
      <div className="job-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h3>Job Details</h3>
        <div />
      </div>

      <div className="job-main">
        {/* TITLE */}
        <div className="job-title">
          <h1>{job.title}</h1>
          <p>{company.name} • 2 days ago</p>
        </div>

        {/* INFO GRID */}
        <div className="info-grid">
          <div className="info-card">
            <span className="label">Location</span>
            <span>{company.location}</span>
          </div>
          <div className="info-card">
            <span className="label">Salary</span>
            <span>{job.salary}</span>
          </div>
          <div className="info-card">
            <span className="label">Notice Period</span>
            <span>{job.notice}</span>
          </div>
          <div className="info-card">
            <span className="label">Job Type</span>
            <span>{company.isRemote ? "Remote" : "On-site"}</span>
          </div>
        </div>

        {/* ABOUT */}
        <section>
          <h2>About the Role</h2>
          <p className={!expanded ? "clamp" : ""}>{job.description}</p>
          <button className="link" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Read less" : "Read more"}
          </button>
        </section>

        {/* REQUIREMENTS */}
        <section>
          <h2>Requirements</h2>
          <ul>
            {job.requirements.map((r, i) => (
              <li key={i}>✔ {r}</li>
            ))}
          </ul>
        </section>

        {/* ✅ OFFICE LOCATION */}
        <section>
          <h2>Office Location</h2>
          <div className="map-box">
            <span>📍 {company.location}</span>
          </div>
        </section>

        {/* ✅ IMPORTANT NOTICE */}
        <div className="notice-box">
          <strong>Important Notice</strong>
          <p>
            Please check the job details carefully before applying.
            Applications cannot be edited once submitted.
          </p>
        </div>
      </div>

      {/* APPLY */}
      <div className="apply-bar">
        <button className="apply-btn">Apply Now →</button>
      </div>
    </div>
  );
}
