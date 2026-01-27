import { useState } from "react";
import "./ReviewApplication.css";
import ApplicationSuccess from "./ApplicationSuccess"; // ✅ ADD THIS

type Props = {
  onBack?: () => void;
};

const ReviewApplication = ({ onBack }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false); // ✅ ADD THIS

  const [dob, setDob] = useState("January 15, 2001");
  const [gender, setGender] = useState("Non-binary");
  const [degree, setDegree] = useState("B.Sc. Computer Science");
  const [college, setCollege] = useState("Stanford University, 2024");
  const [email, setEmail] = useState("alex.johnson@edu-mail.com");
  const [phone, setPhone] = useState("+1 (555) 012-3456");

  // ✅ SUCCESS SCREEN
  if (submitted) {
    return (
      <ApplicationSuccess
        onViewStatus={() => alert("View Application Status")}
        onExplore={() => onBack?.()}
      />
    );
  }

  return (
    <div className="review-web">
      {/* Header */}
      <header className="review-header">
        <button className="review-back-btn" onClick={onBack}>←</button>

        <h1>Review Application</h1>
        <button className="edit-all" onClick={() => setEditMode(!editMode)}>
          {editMode ? "Save Changes" : "Edit All"}
        </button>
      </header>

      {/* Profile */}
      <div className="profile-box">
        <img
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200"
          alt="profile"
        />
        <div>
          <h2>Alex Johnson</h2>
          <p className="app-id">Application ID: INT-2024-8832</p>
          <span className="status">Draft</span>
        </div>
      </div>

      {/* Content Grid */}
      <div className="content-grid">
        <Section title="Basic Information">
          <Row label="Date of Birth" value={dob} editable={editMode} onChange={setDob} />
          <Row label="Gender" value={gender} editable={editMode} onChange={setGender} />
        </Section>

        <Section title="Educational Qualifications">
          <Row label="Degree" value={degree} editable={editMode} onChange={setDegree} />
          <Row label="University" value={college} editable={editMode} onChange={setCollege} />
        </Section>

        <Section title="Contact Information">
          <Row label="Email" value={email} editable={editMode} onChange={setEmail} />
          <Row label="Phone" value={phone} editable={editMode} onChange={setPhone} />
        </Section>
      </div>

      {/* Declaration */}
      <div className="declaration-inline">
        <input
          type="checkbox"
          checked={accepted}
          onChange={() => setAccepted(!accepted)}
        />
        <span>
          I confirm that the information provided is accurate and complete to the
          best of my knowledge.
        </span>
      </div>

      {/* Footer */}
      <footer className="review-footer">
        <button
          className="submit-btn"
          disabled={!accepted}
          onClick={() => setSubmitted(true)} // ✅ ONLY CHANGE HERE
        >
          Submit Application →
        </button>
      </footer>
    </div>
  );
};

export default ReviewApplication;

/* ---------- Components ---------- */

const Section = ({ title, children }: any) => (
  <div className="section">
    <h3>{title}</h3>
    {children}
  </div>
);

const Row = ({ label, value, editable, onChange }: any) => (
  <div className="row">
    <span className="row-label">{label}</span>
    {editable ? (
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    ) : (
      <span className="row-value">{value}</span>
    )}
  </div>
);
