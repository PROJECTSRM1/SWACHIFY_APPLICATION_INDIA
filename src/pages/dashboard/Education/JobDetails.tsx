import { useEffect, useState } from "react";
import "./JobDetails.css";

/* =======================
   Types
======================= */

export type Company = {
  id: number;
  name: string;
  industry: string;
  description: string;
  location: string;
  size: string;
  status: "Active" | "Hiring Frozen";
};

type ApiJob = {
  id: number;
  role_description: string;
  requirements: string;
  is_active: boolean;
};

type Props = {
  company: Company;
  onBack: () => void;
};

export default function JobDetails({ company, onBack }: Props) {
  const [job, setJob] = useState<ApiJob | null>(null);
  const [loading, setLoading] = useState(true);

  /* =======================
     Fetch job for company
  ======================= */

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(
          "https://swachify-india-be-1-mcrb.onrender.com/api/jobs/openings",
          { cache: "no-store" }
        );

        const data: any[] = await res.json();

        // pick first job for this company
        const match = data.find(
          (j) => j.company_name === company.name
        );

        if (match) {
          setJob({
            id: match.id,
            role_description: match.role_description,
            requirements: match.requirements,
            is_active: match.is_active,
          });
        }
      } catch (err) {
        console.error("Failed to load job details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [company.name]);

  /* =======================
     UI
  ======================= */

  if (loading) {
    return <div className="loading">Loading job details...</div>;
  }

  if (!job) {
    return <p className="students-empty">No job available</p>;
  }

  return (
        <div className="job-wrapper">
    <div className="job-layout">
      {/* HEADER */}
      <div className="job-header">
        <button className="job-back-btn" onClick={onBack}>←</button>
        <h3>{company.name}</h3>
        <div />
      </div>

      <div className="job-main">
        {/* TITLE */}
        <div className="job-title">
          <h1>{job.role_description}</h1>
          <p>{company.name} • Recently posted</p>
        </div>

        {/* INFO GRID */}
        <div className="info-grid">
          <div className="info-card">
            <span className="label">Location</span>
            <span>{company.location}</span>
          </div>

          <div className="info-card">
            <span className="label">Salary</span>
            <span>₹6 – 12 LPA</span>
          </div>

          <div className="info-card">
            <span className="label">Notice Period</span>
            <span>30 Days</span>
          </div>

          <div className="info-card">
            <span className="label">Job Type</span>
            <span>Full Time</span>
          </div>
        </div>

        {/* ABOUT */}
        <section>
          <h2>About the Role</h2>
          <p>{job.role_description}</p>
        </section>

        {/* REQUIREMENTS */}
        <section>
          <h2>Requirements</h2>
          <ul>
            {job.requirements
              .split(",")
              .map((r, i) => (
                <li key={i}>{r.trim()}</li>
              ))}
          </ul>
        </section>
      </div>

      {/* APPLY */}
      <div className="apply-bar">
        <button className="apply-btn">Apply Now →</button>
      </div>
    </div>
    </div>
  );
}
