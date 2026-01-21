import React, { useState } from "react";
import "./Education.css";

import Companies from "../Education/Companies";
import Students from "../Education/Students";
import type { Student } from "../Education/Students";

import JobsPage from "./TrainingPage";
import Internship from "../Education/Internships";
import CandidateProfile from "../Education/CandidateProfile";
import TrainingPage from "./TrainingPage";
import { useLocation } from "react-router-dom";



type Page =
  | "home"
  | "students"
  | "internships"
  | "companies"
  | "training"
  | "candidateProfile";


const searchableItems = [
  "Students",
  "Internships",
  "Companies",
  "Training",
  "Google Internship",
  "Harvard University",
];

const Education: React.FC = () => {
  const [page, setPage] = useState<Page>("home");
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);
    const location = useLocation();

// 🚨 IMPORTANT FIX:
// If we are on enrollment page, do NOT render Education
if (location.pathname.startsWith("/course")) {
  return null;
}


  const filteredResults = searchableItems.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  /* ================= FULLSCREEN PAGES ================= */
  if (page !== "home") {
    return (
      <div className="fullscreen-page">
        {page === "students" && (
          <Students
            onBack={() => setPage("home")}
            onSelectStudent={(student: Student) => {
              setSelectedStudent(student);
              setPage("candidateProfile");
            }}
          />
        )}

        {page === "candidateProfile" && selectedStudent && (
          <CandidateProfile
            student={selectedStudent}
            onBack={() => setPage("students")}
          />
        )}

        {page === "internships" && (
          <Internship onBack={() => setPage("home")} />
        )}

        {page === "companies" && (
          <Companies onBack={() => setPage("home")} />
        )}

        {page === "training" && (
  <TrainingPage onBack={() => setPage("home")} />
)}

      </div>
    );
  }

  /* ================= HOME ================= */
  return (
    <div className="edu-wrapper">
      {/* ================= FEATURED ================= */}
      <div className="edu-featured">
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?w=1400"
          alt="featured"
        />

        <div className="blue-overlay" />

        <div className="featured-content">
          <div className="featured-left">
            <span className="tag">FEATURED</span>
            <h2>Top University of the Week</h2>
            <p>Discover the latest computer science programs...</p>
            <button className="details-btn">View Details →</button>
          </div>

          <div className="featured-search-wrapper">
            <div className="featured-search">
              <input
                placeholder="Search colleges, jobs..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearched(false);
                }}
              />
              <button onClick={() => query && setSearched(true)}>
                🔍
              </button>
            </div>

            {searched && (
              <div className="search-result">
                {filteredResults.length ? (
                  <span>
                    Found: <b>{filteredResults.join(", ")}</b>
                  </span>
                ) : (
                  <span className="not-found">Not available</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= CATEGORIES ================= */}
      <div className="edu-section">
        <h3 className="section-title">Explore Categories</h3>

        <div className="category-grid">
          <div onClick={() => setPage("students")}>
            <span className="blue">🎓</span>
            <p>Students</p>
          </div>

          <div onClick={() => setPage("internships")}>
            <span className="purple">💼</span>
            <p>Internships</p>
          </div>

          <div onClick={() => setPage("companies")}>
            <span className="orange">🏢</span>
            <p>Companies</p>
          </div>

          <div onClick={() => setPage("training")}>
  <span className="green">🧭</span>
  <p>Training</p>
</div>

        </div>
      </div>

      {/* ================= TRENDING (MISSING CARDS FIXED) ================= */}
      <div className="edu-section">
        <h3 className="trending-title">Trending Now</h3>

        <div className="trending-row">
          <div className="trending-card">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800" />
            <div className="body">
              <h4>Google Internship</h4>
              <p>Software Engineering • Remote</p>
            </div>
          </div>

          <div className="trending-card">
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800" />
            <div className="body">
              <h4>Harvard University</h4>
              <p>Business Administration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
