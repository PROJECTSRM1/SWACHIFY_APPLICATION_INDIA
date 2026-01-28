import React, { useState } from "react";
import "./Education.css";

import Companies from "../Education/Companies";
import Students from "../Education/Students";
import type { Student } from "../Education/Students";
import Internship from "../Education/Internships";
import CandidateProfile from "../Education/CandidateProfile";
import TrainingPage from "./TrainingPage";

type Page =
  | "home"
  | "students"
  | "internships"
  | "companies"
  | "training"
  | "candidateProfile";

type TrendingStudent = {
  id: number;
  name: string;
  program: string;
  avatar: string;
  academicScore: number;
  rating: number;
  status: "active" | "completed";
  shift: string;
};

const studentsData: TrendingStudent[] = [
  {
    id: 2125,
    name: "Ananya Rao",
    program: "B.Tech AI & ML",
    rating: 4.6,
    status: "active",
    academicScore: 91,
    shift: "09:00 AM - 06:00 PM",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
  },
  {
    id: 2140,
    name: "Sneha Iyer",
    program: "B.Tech Information Technology",
    rating: 4.9,
    status: "active",
    academicScore: 97,
    shift: "09:30 AM - 06:30 PM",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200",
  },
  {
    id: 2045,
    name: "Sarah Jenkins",
    program: "B.Tech Computer Science",
    rating: 4.8,
    status: "active",
    academicScore: 92,
    shift: "10:00 AM - 07:00 PM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  },
  {
    id: 2092,
    name: "Emily Rodriguez",
    program: "B.E. Information Tech",
    rating: 4.9,
    status: "active",
    academicScore: 95,
    shift: "10:00 AM - 07:00 PM",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
  },
  {
    id: 2101,
    name: "David Kim",
    program: "B.S. Software Eng",
    rating: 4.7,
    status: "completed",
    academicScore: 90,
    shift: "10:00 AM - 07:00 PM",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
  },
];

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
  const [showAllTrending, setShowAllTrending] = useState(false);

  const trendingStudents = studentsData
    .filter((s) => s.academicScore > 80)
    .sort((a, b) => b.academicScore - a.academicScore);

  const filteredResults = searchableItems.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  if (page !== "home") {
    return (
      <div className="edu-fullscreen-page">
        {page === "students" && (
          <Students
            onBack={() => setPage("home")}
            onSelectStudent={(student) => {
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

  return (
    <div className="edu-wrapper">
      {/* FEATURED */}
      <div className="edu-featured">
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?w=1400"
          alt="featured"
        />

        <div className="edu-blue-overlay" />

        <div className="edu-featured-content">
          <div className="edu-featured-left">
            <span className="edu-tag">FEATURED</span>
            <h2>Top University of the Week</h2>
            <p>Discover the latest computer science programs...</p>

            <button className="edu-view-details-btn">
              View Details →
            </button>
          </div>

          <div className="edu-featured-search-wrapper">
            <div className="edu-featured-search">
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
              <div className="edu-search-result">
                {filteredResults.length ? (
                  <span>
                    Found: <b>{filteredResults.join(", ")}</b>
                  </span>
                ) : (
                  <span className="edu-not-found">Not available</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="edu-section">
        <h3 className="edu-section-title">Explore Categories</h3>

        <div className="edu-category-grid">
          <div onClick={() => setPage("students")}>
            <span className="edu-blue">🎓</span>
            <p>Students</p>
          </div>

          <div onClick={() => setPage("internships")}>
            <span className="edu-purple">💼</span>
            <p>Internships</p>
          </div>

          <div onClick={() => setPage("companies")}>
            <span className="edu-orange">🏢</span>
            <p>Companies</p>
          </div>

          <div onClick={() => setPage("training")}>
            <span className="edu-green">🧭</span>
            <p>Training</p>
          </div>
        </div>
      </div>

      {/* TRENDING */}
      <div className="edu-section">
        <div className="edu-trending-header">
          <h3 className="edu-trending-title">Trending Now</h3>

          <button
            className="edu-view-all-btn"
            onClick={() => setShowAllTrending(!showAllTrending)}
          >
            {showAllTrending ? "Show Less" : "View All"}
          </button>
        </div>

        <div className="edu-trending-list">
          {(showAllTrending
            ? trendingStudents
            : trendingStudents.slice(0, 4)
          ).map((student) => (
            <div key={student.id} className="edu-trending-row-card">
              <img
                src={student.avatar}
                alt={student.name}
                className="edu-trending-avatar"
              />

              <div className="edu-trending-info">
                <h4>{student.name}</h4>
                <p className="edu-program">{student.program}</p>
                <p className="edu-score">
                  {student.academicScore}% Academic Score
                </p>

                <div className="edu-trending-footer">
                  <div className="edu-rating">
                    <span className="edu-star">⭐</span>
                    <span>{student.rating}</span>
                  </div>
                </div>

                <span
                  className={`edu-status ${student.status}`}
                >
                  {student.status.toUpperCase()}
                </span>

                <p className="edu-shift">{student.shift}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;