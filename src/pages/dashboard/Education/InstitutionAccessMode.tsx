import React, { useState } from "react";
import "./InstitutionAccessMode.css";
import ManagementOverview from "../../dashboard/Education/ManagementOverview";
import StudentView from "../../dashboard/Education/StudentView";

interface InstitutionAccessModeProps {
  onClose?: () => void;
}

type View = "portal" | "management" | "student";

const InstitutionAccessMode: React.FC<InstitutionAccessModeProps> = ({
  onClose,
}) => {
  const [view, setView] = useState<View>("portal");

  /* ================= MANAGEMENT VIEW ================= */
  if (view === "management") {
    return <ManagementOverview onBack={() => setView("portal")} />;
  }

  /* ================= STUDENT VIEW ================= */
  if (view === "student") {
    return <StudentView onBack={() => setView("portal")} />;
  }

  /* ================= PARTNER PORTAL ================= */
  return (
       <div className="access-wrapper">
    <div className="access-page">
      <div className="access-container">
        {/* HEADER */}
        <div className="access-header">
          <button className="access-close" onClick={onClose}>
            ←</button>
          <h2>Partner Portal</h2>
        </div>

        {/* TITLE */}
        <h1 className="access-title">Welcome back</h1>
        <p className="access-subtitle">
          Please select your access mode to continue
        </p>

        {/* STUDENT VIEW */}
        <div className="access-card">
          <div className="access-card-media student-bg">
            <div className="access-icon">🎓</div>
          </div>

          <div className="access-card-body">
            <div className="access-card-head">
              <h3>Student View</h3>
              <span className="access-badge preview">PREVIEW</span>
            </div>

            <p>
              Access course materials, grades, and all student-facing
              features to verify the learning experience.
            </p>

            <button
              className="access-btn primary"
              onClick={() => setView("student")}
            >
              Enter Student View
            </button>
          </div>
        </div>

        {/* MANAGEMENT VIEW */}
        <div className="access-card">
          <div className="access-card-media management-bg">
            <div className="access-icon">📊</div>
          </div>

          <div className="access-card-body">
            <div className="access-card-head">
              <h3>Management View</h3>
              <span className="access-badge admin">ADMIN</span>
            </div>

            <p>
              Review analytics, manage enrollments, configure portal
              settings, and generate institution reports.
            </p>

            <button
              className="access-btn primary"
              onClick={() => setView("management")}
            >
              Enter Management View
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="access-footer">
          <p>
            Need assistance with your account?{" "}
            <span className="access-link">
              Contact System Administrator
            </span>
          </p>

          <div className="access-status">
            <span className="dot" />
            All systems operational
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default InstitutionAccessMode;
