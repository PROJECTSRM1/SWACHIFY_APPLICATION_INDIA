import { useState } from "react";
import "./GovernmentCoursesWeb.css";

type Props = { onBack: () => void };

interface GovCourse {
  id: number;
  title: string;
  subtitle: string;
  status?: string;
  category: string;
  price: string;
  image: string;
}

const CATEGORIES = ["All", "UPSC", "SSC", "Banking", "Railway", "State PSC"];

const GOV_COURSES: GovCourse[] = [
  {
    id: 1,
    title: "UPSC CSE Complete Prep",
    subtitle: "Prelims + Mains + Interview",
    status: "MOST POPULAR",
    category: "UPSC",
    price: "₹4,999",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800",
  },
  {
    id: 2,
    title: "SSC CGL — Tier I & II",
    subtitle: "Combined Graduate Level Exam",
    status: "HIGH DEMAND",
    category: "SSC",
    price: "₹1,999",
    image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800",
  },
  {
    id: 3,
    title: "SBI PO / IBPS PO Mastery",
    subtitle: "Bank Probationary Officer Prep",
    status: "IN PROGRESS",
    category: "Banking",
    price: "₹2,499",
    image: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=800",
  },
  {
    id: 4,
    title: "RRB NTPC Complete Course",
    subtitle: "Non-Technical Popular Categories",
    category: "Railway",
    price: "₹1,499",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800",
  },
  {
    id: 5,
    title: "TSPSC Group-I / Group-II",
    subtitle: "Telangana State Public Service Exam",
    status: "NEW BATCH",
    category: "State PSC",
    price: "₹2,999",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800",
  },
  {
    id: 6,
    title: "SSC CHSL — 10+2 Level",
    subtitle: "Combined Higher Secondary Level",
    category: "SSC",
    price: "₹1,299",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
  },
  {
    id: 7,
    title: "NABARD / RBI Grade B",
    subtitle: "Central Banking Exams",
    status: "PREMIUM",
    category: "Banking",
    price: "₹3,499",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
  },
  {
    id: 8,
    title: "RRB ALP — Assistant Loco Pilot",
    subtitle: "Technical Trades & CBT Exam",
    category: "Railway",
    price: "₹1,799",
    image: "https://images.unsplash.com/photo-1535432977763-5d3c0df28a1f?w=800",
  },
];

export default function GovernmentCoursesWeb({ onBack }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? GOV_COURSES
      : GOV_COURSES.filter((c) => c.category === activeCategory);

  return (
    <div className="gov-wrapper">
      <div className="gov-header">
        <button onClick={onBack}>←</button>
        <h1>Government Courses</h1>
      </div>

      {/* Category Filter */}
      <div className="gov-categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`gov-cat-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="gov-grid">
        {filtered.map((course) => (
          <div key={course.id} className="gov-card">
            <img src={course.image} alt={course.title} />
            <div className="gov-body">
              {course.status && (
                <span className={`badge ${course.status.replace(" ", "").toLowerCase()}`}>
                  {course.status}
                </span>
              )}
              <h3>{course.title}</h3>
              <p>{course.subtitle}</p>
              <div className="price">{course.price}</div>
              <button>ENROLL NOW →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}