import { useMemo, useState } from "react";
import "./Training.css";

/* ================= TYPES ================= */

type Category = "All" | "Java" | "Python" | "Management";

type Training = {
  id: number;
  title: string;
  subtitle: string;
  category: Exclude<Category, "All">;
  progress: number;
  price: number;
  modules: string[];
  status?: "IN PROGRESS";
  image: string;
};

type Props = {
  onBack?: () => void;
};

/* ================= DATA ================= */

const TRAININGS: Training[] = [
  {
    id: 1,
    title: "Java Microservices Architecture",
    subtitle: "Advanced Backend Development",
    category: "Java",
    progress: 75,
    price: 999,
    status: "IN PROGRESS",
    modules: [
      "Spring Boot Basics",
      "REST APIs",
      "Microservices Design",
      "Docker & Kubernetes",
    ],
    image:
      "https://images.unsplash.com/photo-1581091215363-9d6c99f145d3?w=1400",
  },
  {
    id: 2,
    title: "Python for Data Engineering",
    subtitle: "Data Pipelines & ETL Mastery",
    category: "Python",
    progress: 42,
    price: 499,
    modules: [
      "Python Fundamentals",
      "ETL Pipelines",
      "Apache Airflow",
      "Data Warehousing",
    ],
    image:
      "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=1400",
  },
  {
    id: 3,
    title: "Project Management Pro",
    subtitle: "Agile & Scrum Methodologies",
    category: "Management",
    progress: 12,
    price: 999,
    modules: [
      "Project Lifecycle",
      "Agile & Scrum",
      "Risk Management",
      "Stakeholder Communication",
    ],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400",
  },
];

/* ================= COMPONENT ================= */

export default function TrainingPage({ onBack }: Props) {
  console.log("TrainingPage rendered"); // debug-safe

  const [category, setCategory] = useState<Category>("All");

  const filteredTrainings = useMemo(() => {
    if (category === "All") return TRAININGS;
    return TRAININGS.filter(t => t.category === category);
  }, [category]);

  return (
    <div className="training-page">
      {/* HEADER */}
      <div className="training-header">
        <h2 className="back-title" onClick={() => onBack?.()}>
          ← Active Training
        </h2>
        <p className="sub-text">Pick up where you left off</p>
      </div>

      {/* CATEGORY FILTER */}
      <div className="category-row">
        {(["All", "Java", "Python", "Management"] as const).map(cat => (
          <button
            key={cat}
            className={`category-btn ${category === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* TRAINING LIST */}
      <div className="training-list">
        {filteredTrainings.map(course => (
          <div key={course.id} className="training-card">
            <img
              className="course-image"
              src={course.image}
              alt={course.title}
            />

            <div className="course-body">
              {course.status && (
                <span className="status-badge">{course.status}</span>
              )}

              <h3>{course.title}</h3>
              <p className="subtitle">{course.subtitle}</p>

              {/* PROGRESS */}
              <div className="progress-row">
                <div className="progress-bg">
                  <div
                    className="progress-fill"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <span className="progress-text">{course.progress}%</span>
              </div>

              {/* MODULES */}
              <div className="modules-box">
                <p>Modules Included ({course.modules.length})</p>
                <ul>
                  {course.modules?.map(module => (
                    <li key={module}>• {module}</li>
                  ))}
                </ul>
              </div>

              {/* FOOTER */}
              <div className="course-footer">
                <span className="price">₹{course.price}</span>
                <button className="action-btn">
                  {course.progress > 0 ? "Continue →" : "Enroll Now →"}
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredTrainings.length === 0 && (
          <p className="empty-text">No trainings found</p>
        )}
      </div>
    </div>
  );
}
