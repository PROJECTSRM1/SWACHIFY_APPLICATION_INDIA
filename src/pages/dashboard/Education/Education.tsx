import React, { useState } from "react";
import "./Education.css";

import Companies from "../Education/Companies";
import Students from "../Education/Students";
import JobsPage from "../Education/Jobs";
import Internship from "../Education/Internships";




interface CardItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  isDummy?: boolean;
}

const cards: CardItem[] = [
  {
    id: 1,
    title: "Students",
    description: "Browse student profiles and connect with talented individuals",
    icon: "🎓",
  },
  {
    id: 2,
    title: "Jobs",
    description: "Explore job opportunities and career openings",
    icon: "💼",
  },
  {
    id: 3,
    title: "Internships",
    description: "Find internship programs and gain experience",
    icon: "👥",
  },
  {
    id: 4,
    title: "Companies",
    description: "Discover companies and their opportunities",
    icon: "🏢",
  },
  {
    id: 5,
    title: "Corporate Training",
    description: "Professional training programs for skill development",
    icon: "📦",
    isDummy: true,
  },
];

const Education: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  
  const [page, setPage] = useState<"education" | "companies">("education");

const [activeCard, setActiveCard] = useState<
  "companies" | "students" | "jobs" | "internships" | null
>(null);




const handleBack = () => {
  setPage("education");
  setActiveCard(null);
};


return (
  <>
    {page === "education" && (
      <div className="education-container">
        {/* HEADER */}
        <div className="education-header">
          <div>
            <h2>Education</h2>
            <p>5 services available</p>
          </div>

          <button
            className="view-all-btn"
            onClick={() => setShowAll(prev => !prev)}
          >
            {showAll ? "Show Less" : "View All Services"}
          </button>
        </div>

        {/* CARDS */}
        <div className="education-grid">
          {cards
            .filter(card => showAll || !card.isDummy)
            .map(card => (
              <div className="education-card" key={card.id}>
                <div className="icon-box">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>

<button
  className="details-btn"
  onClick={() => {
    if (card.title === "Students") {
      setActiveCard("students");
      setPage("companies");
    }

    if (card.title === "Companies") {
      setActiveCard("companies");
      setPage("companies");
    }

    if (card.title === "Jobs") {
      setActiveCard("jobs");
      setPage("companies");
    }

    if (card.title === "Internships") {
      setActiveCard("internships");
      setPage("companies");
    }
  }}
>
  View Details
</button>


              </div>
            ))}
        </div>
      </div>
    )}

{page === "companies" && (
  <div className="fullscreen-page">
    {activeCard === "companies" && (
      <Companies onBack={handleBack} />
    )}

    {activeCard === "students" && (
      <Students onBack={handleBack} />
    )}

    {activeCard === "jobs" && (
      <JobsPage onBack={handleBack} />
    )}

    {activeCard === "internships" && (
      <Internship onBack={handleBack} />
    )}
  </div>
)}

  </>
);

};

export default Education;
