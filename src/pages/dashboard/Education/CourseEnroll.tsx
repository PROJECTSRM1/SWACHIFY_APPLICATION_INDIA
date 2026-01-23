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

export default function CourseEnroll({ course, onBack, onConfirm }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    college: "",
    qualification: "",
    year: "",
  });

  const isValid = Object.values(form).every(v => v.trim() !== "");

  return (
    <div className="enroll-page">
      <div className="enroll-container">
        <div className="enroll-header">
          <button className="back-btn" onClick={onBack}>← Back</button>
          <div>
            <h2>Enrollment Details</h2>
            <span className="step">Step 3 of 3</span>
          </div>
        </div>

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
            {course.features.map(f => (
              <span key={f}>✔ {f}</span>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>Personal Information</h3>
          <input
            placeholder="Full Name"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Email Address"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <h3>Academic Background</h3>
          <input
            placeholder="University / College Name"
            onChange={e => setForm({ ...form, college: e.target.value })}
          />

          <div className="row">
            <input
              placeholder="Qualification"
              onChange={e =>
                setForm({ ...form, qualification: e.target.value })
              }
            />
            <input
              placeholder="Graduation Year"
              onChange={e => setForm({ ...form, year: e.target.value })}
            />
          </div>
        </div>

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
