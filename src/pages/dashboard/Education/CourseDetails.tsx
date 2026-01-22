import { useState } from "react";
import "./CourseDetails.css";

type CourseMaterial = {
  id: number;
  title: string;
  type: "PDF" | "DOCX";
  size: string;
  url: string;
};

const materials: CourseMaterial[] = [
  {
    id: 1,
    title: "Course Syllabus & Schedule",
    type: "PDF",
    size: "2.4 MB",
    url: "#",
  },
  {
    id: 2,
    title: "Design Thinking Workbook",
    type: "DOCX",
    size: "1.1 MB",
    url: "#",
  },
];

type Props = {
  course: {
    title: string;
    image: string;
  };
  onBack: () => void;
};

export default function CourseDetails({ course, onBack }: Props) {
  const [tab, setTab] = useState<"documents" | "media">("documents");

  return (
    <div className="course-details-page">
        {/* BACK BUTTON – OUTSIDE IMAGE */}
  <button className="page-back-btn" onClick={onBack}>
    ← Back
  </button>
      {/* HERO */}
      <div
        className="course-hero"
        style={{ backgroundImage: `url(${course.image})` }}
      >
       

        <h1>{course.title}</h1>
      </div>

      {/* STATS */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon">⏱</div>
          <div>
            <span className="label">Duration</span>
            <strong>4 Weeks</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div>
            <span className="label">Rating</span>
            <strong>4.5 / 5.0</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✔</div>
          <div>
            <span className="label">Hours</span>
            <strong>30 Hours</strong>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="content-card">
        {/* TABS */}
        <div className="tabs">
          <button
            className={`tab ${tab === "documents" ? "active" : ""}`}
            onClick={() => setTab("documents")}
          >
            Documents
          </button>
          <button
            className={`tab ${tab === "media" ? "active" : ""}`}
            onClick={() => setTab("media")}
          >
            Media (Videos)
          </button>
        </div>

        {/* DOCUMENTS TAB */}
        {tab === "documents" && (
          <>
            <div className="materials-header">
              <h3>Course Materials</h3>
              <button className="view-all">View All</button>
            </div>

            <div className="materials-list">
              {materials.map(m => (
                <div
                  key={m.id}
                  className="material-item"
                  onClick={() => window.open(m.url, "_blank")}
                >
                  <div className={`file-icon ${m.type.toLowerCase()}`}>
                    {m.type}
                  </div>

                  <div className="file-info">
                    <p className="file-title">{m.title}</p>
                    <span className="file-size">
                      {m.type} • {m.size}
                    </span>
                  </div>

                  <button
                    className="download-btn"
                    onClick={e => {
                      e.stopPropagation();
                      window.open(m.url, "_blank");
                    }}
                  >
                    ⬇
                  </button>
                </div>
              ))}
            </div>

            <div className="locked-info">
              🔒 Progress tracking will be available once the course is unlocked.
            </div>
          </>
        )}

        {/* MEDIA TAB */}
        {tab === "media" && (
          <div className="locked-info">
            🎥 Video content will be available once the course is unlocked.
          </div>
        )}
      </div>
    </div>
  );
}
