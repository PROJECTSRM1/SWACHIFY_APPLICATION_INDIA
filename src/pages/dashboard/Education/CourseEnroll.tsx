import "./CourseEnroll.css";

type Course = {
  id: number;
  title: string;
  duration: string;
  rating: number;
  features: string[];
};

type Props = {
  course: Course;
  onBack: () => void;
  onConfirm: () => void;
};

export default function CourseEnroll({
  course,
  onBack,
  onConfirm,
}: Props) {
  return (
    <div className="enroll-page">
      <div className="enroll-container">
        {/* HEADER */}
        <div className="enroll-header">
          <button className="back-btn" onClick={onBack}>← Back</button>
          <div>
            <h2>Enrollment Details</h2>
            <span className="step">Step 3 of 3</span>
          </div>
        </div>

        {/* COURSE INFO */}
        <div className="course-card-enroll">
          <span className="premium-badge">Premium Course</span>
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

        {/* FORM */}
        <div className="form-section">
          <h3>Personal Information</h3>
          <input placeholder="Full Name" />
          <input placeholder="Email Address" />

          <h3>Academic Background</h3>
          <input placeholder="University / College Name" />

          <div className="row">
            <input placeholder="Qualification" />
            <input placeholder="Graduation Year" />
          </div>
        </div>

        {/* CONFIRM */}
        <button className="confirm-btn" onClick={onConfirm}>
          Confirm & Enroll →
        </button>
      </div>
    </div>
  );
}
