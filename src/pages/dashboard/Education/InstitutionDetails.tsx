import React, { useState } from "react";
import "./InstitutionDetails.css";

type Props = {
  institution: any;
  onBack: () => void;
};

const InstitutionDetails: React.FC<Props> = ({ institution, onBack }) => {
  const [tab, setTab] = useState("overview");

  return (
    <div className="inst-wrapper">

      {/* HERO */}
      <div className="inst-hero">
      <img
  src={institution.image}
  alt={institution.name}
  loading="lazy"
  referrerPolicy="no-referrer"
  onError={(e) => {
    (e.currentTarget as HTMLImageElement).src =
      "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80";
  }}
/>

        <button className="inst-back" onClick={onBack}>←</button>

        <div className="inst-overlay" />

        <div className="inst-hero-content">
          <h1>{institution.name}</h1>
          <p>📍 {institution.city}</p>
          <span className="inst-rating">⭐ {institution.rating}</span>
        </div>
      </div>

      {/* STATS */}
      <div className="inst-stats">
        <div>
          <h3>{institution.students}</h3>
          <p>Students</p>
        </div>

        <div>
          <h3>{institution.seats}</h3>
          <p>Seats Open</p>
        </div>

        <div>
          <h3>{institution.branches}</h3>
          <p>Branches</p>
        </div>

        <div>
          <h3>{institution.courses}</h3>
          <p>Courses</p>
        </div>
      </div>

      {/* TABS */}
      <div className="inst-tabs">
        <button
          className={tab === "overview" ? "active" : ""}
          onClick={() => setTab("overview")}
        >
          Overview
        </button>

        <button
          className={tab === "facilities" ? "active" : ""}
          onClick={() => setTab("facilities")}
        >
          Facilities
        </button>

        <button
          className={tab === "courses" ? "active" : ""}
          onClick={() => setTab("courses")}
        >
          Courses
        </button>

        <button
          className={tab === "branches" ? "active" : ""}
          onClick={() => setTab("branches")}
        >
          Branches
        </button>
      </div>

      {/* CONTENT */}
      <div className="inst-content">

        {tab === "overview" && (
          <div className="inst-card">
            <h2>About</h2>
            <p>{institution.about}</p>

            <div className="inst-grid">
              <div>
                <h3>3000</h3>
                <p>Capacity</p>
              </div>

              <div>
                <h3>2780</h3>
                <p>Enrolled</p>
              </div>

              <div>
                <h3>180</h3>
                <p>Faculty</p>
              </div>
            </div>
          </div>
        )}

{tab === "facilities" && (
  <div className="inst-card">
    <h2>Facilities & Infrastructure</h2>

    {(institution.facilities ?? []).length > 0 ? (
      institution.facilities.map((f: string, i: number) => (
        <div key={i} className="facility-row">
          <span>✔ {f}</span>
          <span className="yes">Yes</span>
        </div>
      ))
    ) : (
      <p>No facilities information available</p>
    )}
  </div>
)}

{tab === "courses" && (
  <div className="inst-card">
    <h2>Courses Offered</h2>

    {(institution.coursesList ?? []).length > 0 ? (
      institution.coursesList.map((c: any, i: number) => (
        <div key={i} className="course-card">
          <div>
            <h3>{c.name}</h3>
            <p>{c.fee}</p>
          </div>

          <span className="seat-badge">{c.seats} Seats</span>
        </div>
      ))
    ) : (
      <p>No courses available</p>
    )}
  </div>
)}

{tab === "branches" && (
  <div className="inst-card">
    <h2>Our Branches</h2>

    {(institution.branchList ?? []).length > 0 ? (
      institution.branchList.map((b: any, i: number) => (
        <div key={i} className="branch-card">
          <h3>{b.city}</h3>
          <p>{b.address}</p>

          <div className="branch-info">
            <span>{b.seats} Seats</span>
            <span>{b.phone}</span>
          </div>
        </div>
      ))
    ) : (
      <p>No branches available</p>
    )}
  </div>
)}
      </div>

      {/* FOOTER */}
<div className="inst-footer">
  <div className="inst-footer-inner">
    <button className="apply-btn">Apply Now</button>
    <button className="contact-btn">Contact</button>
  </div>
</div>
    </div>
  );
};

export default InstitutionDetails;