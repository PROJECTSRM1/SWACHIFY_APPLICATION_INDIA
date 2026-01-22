import { useMemo, useState } from "react";
import "./Training.css";
import CourseEnroll from "./CourseEnroll";
import CourseDetails from "./CourseDetails";

type Props = {
  onBack: () => void;
};

type Category = "All" | "Java" | "Python" | "Management";

interface Course {
  id: number;
  title: string;
  subtitle: string;
  progress: number;
  price: number;
  status?: string;
  modules: string[];
  category: Exclude<Category, "All">;
  image: string;
}

const CATEGORIES: Category[] = ["All", "Java", "Python", "Management"];

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518779578993-ec3579fee39f";

const COURSES: Course[] = [
  {
    id: 1,
    title: "Java Microservices Architecture",
    subtitle: "Advanced Backend Development",
    progress: 75,
    price: 999,
    status: "IN PROGRESS",
    category: "Java",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    modules: [
      "Spring Boot Basics",
      "REST APIs",
      "Microservices Design",
      "Docker & Kubernetes",
    ],
  },
  {
    id: 2,
    title: "Python for Data Engineering",
    subtitle: "Data Pipelines & ETL mastery",
    progress: 42,
    price: 499,
    category: "Python",
    image:
      "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
    modules: [
      "Python Fundamentals",
      "ETL Pipelines",
      "Apache Airflow",
      "Data Warehousing",
    ],
  },
  {
    id: 3,
    title: "Project Management Pro",
    subtitle: "Agile & Scrum Methodologies",
    progress: 12,
    price: 999,
    category: "Management",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    modules: [
      "Project Lifecycle",
      "Agile & Scrum",
      "Risk Management",
      "Stakeholder Communication",
    ],
  },
  {
    id: 4,
    title: "Advanced Java DSA",
    subtitle: "Problem Solving & Competitive Coding",
    progress: 0,
    price: 999,
    category: "Java",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    modules: [
      "Arrays & Strings",
      "Recursion & Backtracking",
      "Trees & Graphs",
      "Dynamic Programming",
      "Interview Patterns",
    ],
  },
  {
    id: 5,
    title: "Python Machine Learning Bootcamp",
    subtitle: "ML from Scratch to Deployment",
    progress: 18,
    price: 999,
    category: "Python",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    modules: [
      "Python for ML",
      "Supervised Learning",
      "Unsupervised Learning",
      "Model Evaluation",
      "ML Deployment",
    ],
  },
  {
    id: 6,
    title: "Leadership & Team Management",
    subtitle: "Managing High Performance Teams",
    progress: 60,
    price: 499,
    category: "Management",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786",
    modules: [
      "Leadership Styles",
      "Team Motivation",
      "Conflict Resolution",
      "Decision Making",
    ],
  },
];

export default function TrainingPage({ onBack }: Props) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredCourses = useMemo(() => {
    return activeCategory === "All"
      ? COURSES
      : COURSES.filter(c => c.category === activeCategory);
  }, [activeCategory]);

  // COURSE DETAILS PAGE
  if (selectedCourse && showDetails) {
    return (
      <CourseDetails
        course={selectedCourse}
        onBack={() => setShowDetails(false)}
      />
    );
  }

  // ENROLL PAGE
  if (selectedCourse) {
    return (
      <CourseEnroll
        course={{
          id: selectedCourse.id,
          title: selectedCourse.title,
          duration: "6 Weeks",
          rating: 4.8,
          features: selectedCourse.modules,
          image: selectedCourse.image,
        }}
        onBack={() => setSelectedCourse(null)}
        onConfirm={() => setShowDetails(true)}
      />
    );
  }

  return (
    <div className="training-page">
      <div className="training-header">
        <button className="back-btn" onClick={onBack}>←</button>
        <div>
          <h1>Active Training</h1>
          <p>Pick up where you left off</p>
        </div>
      </div>

      <div className="category-row">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`category-btn ${cat === activeCategory ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="course-grid">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card">
            <div className="image-wrapper">
              <img
                src={course.image}
                alt={course.title}
                onError={e => {
                  (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
              />
            </div>

            <div className="course-body">
              {course.status && (
                <span className="status-badge">{course.status}</span>
              )}

              <h3>{course.title}</h3>
              <p className="course-subtitle">{course.subtitle}</p>

              <div className="progress-row">
                <div className="progress-bg">
                  <div
                    className="progress-fill"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <span>{course.progress}%</span>
              </div>

              <div className="modules">
                <p className="modules-title">
                  Modules Included ({course.modules.length})
                </p>
                <ul>
                  {course.modules.map(m => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>

              <div className="card-footer">
                <span className="price">₹{course.price}</span>
                <button
                  className="enroll-btn"
                  onClick={() => setSelectedCourse(course)}
                >
                  ENROLL NOW →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
