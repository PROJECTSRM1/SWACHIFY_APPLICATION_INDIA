import { useState } from "react";
import "./Internships.css";

interface Internship {
  title: string;
  company: string;
  location: string;
  deadline: string;
  duration: string;
  stipend: string;
  description: string;
  tag?: string;
}

const internships: Internship[] = [
  {
    title: "Software Development Intern",
    company: "Tech Innovators",
    location: "Bangalore",
    deadline: "20/02/2025",
    duration: "3 months",
    stipend: "₹15,000/month",
    description:
      "Work on real-world projects using React, Node.js, and cloud technologies.",
    tag: "IT",
  },
  {
    title: "Marketing Intern",
    company: "Brand Masters",
    location: "Mumbai",
    deadline: "25/02/2025",
    duration: "6 months",
    stipend: "₹10,000/month",
    description:
      "Assist in social media campaigns, content creation, and market research.",
    tag: "Marketing",
  },
  {
    title: "Data Science Intern",
    company: "Analytics Hub",
    location: "Pune",
    deadline: "15/02/2025",
    duration: "4 months",
    stipend: "₹18,000/month",
    description:
      "Learn and apply machine learning algorithms to solve business problems.",
    tag: "IT",
  },
  {
    title: "Graphic Design Intern",
    company: "Creative Studio",
    location: "Hyderabad",
    deadline: "01/03/2025",
    duration: "3 months",
    stipend: "₹12,000/month",
    description:
      "Create visual content for digital platforms and branding materials.",
    tag: "Design",
  },
  {
    title: "Finance Intern",
    company: "Investment Solutions",
    location: "Delhi",
    deadline: "10/03/2025",
    duration: "6 months",
    stipend: "₹20,000/month",
    description:
      "Support financial analysis, reporting, and investment research activities.",
    tag: "Finance",
  },
  {
    title: "Content Writing Intern",
    company: "Media House",
    location: "Bangalore",
    deadline: "30/01/2025",
    duration: "2 months",
    stipend: "₹8,000/month",
    description:
      "Write engaging articles, blog posts, and web content on various topics.",
    tag: "Media",
  },
];

type InternshipProps = {
  onBack?: () => void;
};


const Internship = ({ onBack }: InternshipProps) => {

  const [showFilters, setShowFilters] = useState(false);
  const [industry, setIndustry] = useState("All");
  const [location, setLocation] = useState("All");
  const [duration, setDuration] = useState("All");
  const [sortBy, setSortBy] = useState<"relevance" | "deadline">("relevance");

  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const filteredInternships = internships
    .filter((item) => {
      const industryMatch =
        industry === "All" || item.tag === industry || !item.tag;

      const locationMatch =
        location === "All" || item.location === location;

      const durationMatch =
        duration === "All" || item.duration === duration;

      return industryMatch && locationMatch && durationMatch;
    })
    .sort((a, b) => {
      if (sortBy === "deadline") {
        return (
          parseDate(a.deadline).getTime() -
          parseDate(b.deadline).getTime()
        );
      }
      return 0; // relevance
    });

  return (
    <div className="internship-page">
      {/* Header */}
      <div className="header-wrapper">
        <div className="page-header">
          <div className="back-arrow-title">
<span
  className="back-arrow"
  onClick={() => onBack?.()}
>
  ←
</span>
            <h2>Internship Opportunities</h2>
          </div>

          <button
            className="filter-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 3 10 12 10 19 14 21 14 12 22 3" />
            </svg>
            Filters
          </button>
        </div>
      </div>

      {/* Filter & Sort Panel */}
      {showFilters && (
        <div className="filter-panel">
          <h3>Filter & Sort</h3>

          <div className="filter-row">
            <div>
              <label>Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="All">All Industries</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Design">Design</option>
                <option value="Media">Media</option>
              </select>
            </div>

            <div>
              <label>Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="All">All Locations</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Delhi">Delhi</option>
                {/* <option value="Remote">Remote</option> */}
              </select>
            </div>

            <div>
              <label>Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="All">All Durations</option>
                <option value="2 months">2 months</option>
                <option value="3 months">3 months</option>
                <option value="4 months">4 months</option>
                <option value="6 months">6 months</option>
              </select>
            </div>
          </div>

          <div className="sort-row">
            <span>Sort By</span>

            <button
              className={sortBy === "relevance" ? "active" : ""}
              onClick={() => setSortBy("relevance")}
            >
              Relevance
            </button>

            <button
              className={sortBy === "deadline" ? "active" : ""}
              onClick={() => setSortBy("deadline")}
            >
              Application Deadline
            </button>
          </div>
        </div>
      )}

      {/* Internship List */}
      <div className="internship-list">
        {filteredInternships.map((item, index) => (
          <div className="internship-card" key={index}>
            <div className="card-header">
              <h3>{item.title}</h3>
              {item.tag && <span className="tag">{item.tag}</span>}
            </div>

            <p className="company">{item.company}</p>

            <div className="info-row">
              <span>📍 {item.location}</span>
              <span>⏳ {item.duration}</span>
            </div>

            <div className="info-row">
              <span>📅 Deadline: {item.deadline}</span>
              <span className="stipend">{item.stipend}</span>
            </div>

            <p className="description">{item.description}</p>

            <button className="apply-btn">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Internship;
