import React, { useState } from "react";
import "./Education.css";
import { useEffect } from "react";

import Companies from "../Education/Companies";
import Students from "../Education/Students";
import type { Student } from "../Education/Students";
import Internship from "../Education/Internships";
import CandidateProfile from "../Education/CandidateProfile";
import TrainingPage from "./TrainingPage";
import Institutions from "../Education/Institutions";
import InstitutionAccessMode from "./InstitutionAccessMode";
import { speak } from "../../../utils/constants/aiVoice";


import InstitutionAuthModal from "../../dashboard/Education/InstitutionAuthModal";

type TrendingStudent = {
  id: number;
  name: string;
  program: string;
  academicScore: number;
  rating: string;
  status: "active" | "completed";
  shift: string;
  avatar: string;
};

type Page =
  | "home"
  | "students"
  | "internships"
  | "companies"
  | "training"
  | "institution-login"   // access mode
  | "institution-register"// registration form
  | "candidateProfile";


type ApiTrendingStudent = {
  full_name: string;
  institute: string;
  degree: string;
  attendance_percentage: number;
  active: boolean;
};


const Education: React.FC = () => {
  const [page, setPage] = useState<Page>("home");
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);
  const [showAllTrending, setShowAllTrending] = useState(false);
  const [showInstitutionPortal, setShowInstitutionPortal] = useState(false);
  const [trendingStudents, setTrendingStudents] = useState<TrendingStudent[]>([]);
const [loadingTrending, setLoadingTrending] = useState(false);
const categoriesRef = React.useRef<HTMLDivElement>(null);
const SEARCH_ITEMS = [
  { label: "Students", page: "students" },
  { label: "Internships", page: "internships" },
  { label: "Companies", page: "companies" },
  { label: "Training", page: "training" },
] as const;
const filteredSearch = SEARCH_ITEMS.filter((item) =>
  item.label.toLowerCase().includes(query.toLowerCase())
);


useEffect(() => {
  const fetchTrendingStudents = async () => {
    try {
      setLoadingTrending(true);
      const res = await fetch(
  "https://swachify-india-be-1-mcrb.onrender.com/internship/application/trending"
);

      const data: ApiTrendingStudent[] = await res.json();

      const mapped = data
        .filter((s) => s.active)
        .sort(
          (a, b) => b.attendance_percentage - a.attendance_percentage
        )
        .map((s, index) => ({
          id: index + 1,
          name: s.full_name,
          program: s.degree,
          academicScore: s.attendance_percentage,
          rating: Math.min(5, (s.attendance_percentage / 20)).toFixed(1),
          status: "active" as const,

          shift: "09:00 AM - 06:00 PM",
avatar:
  index % 2 === 0
    ? `https://randomuser.me/api/portraits/men/${index % 90}.jpg`
    : `https://randomuser.me/api/portraits/women/${index % 90}.jpg`,

        }));

      setTrendingStudents(mapped);
    } catch (err) {
      console.error("Trending fetch failed", err);
    } finally {
      setLoadingTrending(false);
    }
  };

  fetchTrendingStudents();
}, []);

useEffect(() => {
  speak("Welcome to Education. Explore students, internships, companies and training programs.");
}, []);
useEffect(() => {
  switch (page) {
    case "students":
      speak("Welcome to Students section. Discover top performing students.");
      break;

    case "internships":
      speak("Welcome to Internships. Find opportunities that shape your career.");
      break;

    case "companies":
      speak("Welcome to Companies. Explore hiring organizations.");
      break;

    case "training":
      speak("Welcome to Training programs. Upskill yourself with the best courses.");
      break;

    case "institution-login":
      speak("Welcome to Institution access portal.");
      break;

    case "institution-register":
      speak("Institution registration page. Please fill in the details.");
      break;

    default:
      break;
  }
}, [page]);



  // const trendingStudents = studentsData
  //   .filter((s) => s.academicScore > 80)
  //   .sort((a, b) => b.academicScore - a.academicScore);

  // const filteredResults = searchableItems.filter((item) =>
  //   item.toLowerCase().includes(query.toLowerCase())
  // );

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
   {page === "institution-login" && (
  <InstitutionAccessMode onClose={() => setPage("home")} />
)}

{page === "institution-register" && (
  <Institutions onBack={() => setPage("home")} />
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
        {/* 🔙 BACK BUTTON */}
<button
  className="edu-hero-back"
  onClick={() => window.history.back()}
>
  ← Back
</button>


        <div className="edu-featured-content">
          <div className="edu-featured-left">
            <span className="edu-tag">FEATURED</span>
            <h2>Top University of the Week</h2>
           <p className="edu-hero-desc">
  Discover the latest computer science programs...
</p>


 <button
  className="edu-view-details-btn"
  onClick={() =>
    categoriesRef.current?.scrollIntoView({ behavior: "smooth" })
  }
>
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
  setSearched(true);
}}

              />
              <button onClick={() => query && setSearched(true)}>
                🔍
              </button>
            </div>
   


{searched && query && (
  <div className="edu-search-result">
    {/* show what user typed */}
{filteredSearch.length > 0 && (
  <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "6px" }}>
    Searching for: <b>{query}</b>
  </div>
)}


    {filteredSearch.length > 0 ? (
      filteredSearch.map((item) => (
        <button
          key={item.label}
onClick={() => {
  setPage(item.page as Page);

  setTimeout(() => {
    setSearched(false);
    setQuery("");
  }, 0);
}}

        >
          {item.label}
        </button>
      ))
    ) : (
      <div style={{ fontSize: "13px", color: "#dc2626" }}>
        ❌ Not found
      </div>
    )}
  </div>
)}


          </div>
        </div>
      </div>

      {/* CATEGORIES */}
     <div className="edu-section" ref={categoriesRef}>

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

  {/* ✅ NEW */}
  <div onClick={() => setShowInstitutionPortal(true)}>
  <span className="edu-red">🏫</span>
  <p>Institutions</p>
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
  {loadingTrending ? (
    <p className="edu-loading">Loading trending students...</p>
  ) : trendingStudents.length === 0 ? (
    <p className="edu-loading">No trending students found</p>
  ) : (
    (showAllTrending
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
            {student.academicScore}% Attendance
          </p>

          <div className="edu-rating">
            ⭐ {student.rating}
          </div>

          <span className="edu-status active">ACTIVE</span>
          <p className="edu-shift">{student.shift}</p>
        </div>
      </div>
    ))
  )}
</div>

   {showInstitutionPortal && (
  <InstitutionAuthModal
    onClose={() => setShowInstitutionPortal(false)}

    // ✅ LOGIN → Access Mode
    onLoginSuccess={() => {
      setShowInstitutionPortal(false);
      setPage("institution-login");
    }}

    // ✅ REGISTER → Registration Form (THIS FORM)
    onRegister={() => {
      setShowInstitutionPortal(false);
      setPage("institution-register");
    }}
  />
)}


      </div>
    </div>
  );
};

export default Education;