import { useState } from "react";
import "./CourseEnroll.css";

type Course = {
  id: number;
  title: string;
  duration: string;
  rating: number;
  features: string[];
  image: string;
};

type Props = {
  course: Course;
  onBack: () => void;
  onConfirm: () => void;
};

/* ✅ BRANCHES BY QUALIFICATION */
const BRANCHES: Record<string, string[]> = {
  "B.Tech": [
    "Computer Science",
    "Information Technology",
    "AI & ML",
    "Electronics & Communication",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
  ],
  "B.E": [
    "Computer Science",
    "Electronics",
    "Electrical",
    "Mechanical",
    "Civil",
  ],
  "B.Sc": [
    "Computer Science",
    "Information Technology",
    "Mathematics",
    "Physics",
    "Statistics",
  ],
  "M.Tech": [
    "Computer Science",
    "Data Science",
    "VLSI",
    "Power Systems",
    "Structural Engineering",
  ],
  "MCA": [
    "Computer Applications",
    "Software Engineering",
    "Data Science",
  ],
};

export default function CourseEnroll({ course, onBack, onConfirm }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    college: "",
    qualification: "",
    branch: "",
    year: "",
  });

  const branches = BRANCHES[form.qualification] || [];

  /* ✅ STRICT VALIDATION */
  const isValid =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.college.trim() !== "" &&
    form.qualification.trim() !== "" &&
    (branches.length === 0 || form.branch.trim() !== "") &&
    /^\d{4}$/.test(form.year) &&
    Number(form.year) >= 1990 &&
    Number(form.year) <= 2030;

  return (
    <div className="enroll-page">
      <div className="enroll-container">
        {/* HEADER */}
       <div className="enroll-header">
  <button className="back-btn back-btn-fixed" onClick={onBack}>
    ← 
  </button>

  <div className="enroll-title">
    <h2>Enrollment Details</h2>
    <span className="step">Step 3 of 3</span>
  </div>
</div>



        {/* COURSE CARD */}
        <div className="course-card-enroll">
          <span className="premium-badge">Premium Course</span>

          <img
            src={course.image}
            alt={course.title}
            className="course-image"
          />

          <h1>{course.title}</h1>

          <div className="meta">
            <span>⏱ {course.duration}</span>
            <span>⭐ {course.rating} Rating</span>
          </div>

          <div className="features">
            {course.features.map((f) => (
              <span key={f}>✔ {f}</span>
            ))}
          </div>
        </div>

        {/* FORM */}
        <div className="form-section">
          <h3>Personal Information</h3>

          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <h3>Academic Background</h3>

          <input
            placeholder="University / College Name"
            value={form.college}
            onChange={(e) =>
              setForm({ ...form, college: e.target.value })
            }
          />

          <div className="row">
            {/* QUALIFICATION */}
            <select
              value={form.qualification}
              onChange={(e) =>
                setForm({
                  ...form,
                  qualification: e.target.value,
                  branch: "",
                })
              }
            >
              <option value="">Select Qualification</option>
              <option value="B.Tech">B.Tech</option>
              <option value="B.E">B.E</option>
              <option value="B.Sc">B.Sc</option>
              <option value="M.Tech">M.Tech</option>
              <option value="MCA">MCA</option>
            </select>

            {/* YEAR */}
            <input
              type="number"
              placeholder="Graduation Year (YYYY)"
              value={form.year}
              min={1990}
              max={2030}
              onChange={(e) =>
                setForm({ ...form, year: e.target.value })
              }
            />
          </div>

          {/* 🔥 BRANCHES FOR ALL QUALIFICATIONS */}
          {branches.length > 0 && (
            <select
              value={form.branch}
              onChange={(e) =>
                setForm({ ...form, branch: e.target.value })
              }
            >
              <option value="">Select Branch</option>
              {branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* CONFIRM */}
        <button
          className="confirm-btn"
          disabled={!isValid}
          onClick={onConfirm}
        >
          Confirm & Enroll →
        </button>
      </div>
    </div>
  );
}
