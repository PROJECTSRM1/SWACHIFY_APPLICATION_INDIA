import React, { useState } from "react";
import "./CandidateProfile.css";

export type Student = {
  id: number;
  name: string;
  program: string;
  avatar: string;
  rating: number;
  status: "Active" | "Completed";
  attendance: number;
  shift: string;
  resumeUrl?: string;
};

type Props = {
  student: Student;
  onBack: () => void;
};

const CandidateProfile: React.FC<Props> = ({ student, onBack }) => {
  const [criminal, setCriminal] = useState<"YES" | "NO">("NO");

  return (
    <div className="cp-root">
      {/* HEADER */}
      <div className="cp-header">
        <button className="cp-back" onClick={onBack}>←</button>
        <h2>Candidate Profile</h2>
      </div>

      {/* PROFILE TOP */}
      <div className="cp-top">
        <div className="cp-avatar-wrap">
          <img src={student.avatar} alt={student.name} />
          {student.status === "Active" && <span className="cp-dot" />}
        </div>

        <div className="cp-main">
          <h3>{student.name}</h3>
          <p className="cp-id">#{student.id}</p>
          <p className="cp-sub">{student.program}</p>

          <div className="cp-actions">
            <button className="cp-btn secondary">⬇ PDF Report</button>
            <button className="cp-btn primary">✏ Edit Profile</button>
          </div>
        </div>

        {/* ✅ RIGHT SIDE – VERTICAL RESUME BUTTONS */}
        <div className="cp-resume-right">
          <label className="cp-btn secondary">
            ⬆ Upload Resume
            <input type="file" hidden />
          </label>

          <button className="cp-btn secondary">
            ⬇ Download Resume
          </button>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="cp-grid">
        {/* LEFT COLUMN */}
        <div className="cp-col">
          <section className="cp-section">
            <h4>Personal Identity</h4>

            <div className="cp-card">
              <strong>Aadhaar Card</strong>
              <p>XXXX-XXXX-1234</p>
            </div>

            <div className="cp-card">
              <strong>PAN Card</strong>
              <p>ABCDE1234F</p>
            </div>

            <div className="cp-card">
              <strong>NOC Details</strong>

              <div className="noc-row">
                <span>Criminal Background</span>
                <select
                  value={criminal}
                  onChange={(e) =>
                    setCriminal(e.target.value as "YES" | "NO")
                  }
                >
                  <option value="NO">NO</option>
                  <option value="YES">YES</option>
                </select>
              </div>

              {criminal === "NO" && (
                <p className="approved">No criminal cases reported</p>
              )}

              {criminal === "YES" && (
                <>
                  <input
                    className="cp-input"
                    placeholder="Enter Case Number"
                  />
                  <label className="cp-upload">
                    ⬆ Upload Clean Sheet Certificate
                    <input type="file" hidden />
                  </label>
                </>
              )}
            </div>
          </section>

          <section className="cp-section">
            <h4>Education</h4>

            <div className="cp-card">
              <strong>B.Tech Computer Science</strong>
              <p>Score: 92%</p>
              <p>Duration: 2020 – 2024</p>
            </div>

            <div className="cp-card">
              <strong>Bachelor of Science (IT)</strong>
              <p>Score: 9.2 CGPA</p>
              <p>Duration: 2017 – 2021</p>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="cp-col">
          <section className="cp-section">
            <h4>Work Details</h4>

            <div className="cp-card">
              <strong>Attendance</strong>
              <p>{student.attendance}%</p>
            </div>

            <div className="cp-card">
              <strong>Shift</strong>
              <p>{student.shift}</p>
            </div>

            <div className="cp-card">
              <strong>Status</strong>
              <p className={student.status === "Active" ? "active" : "completed"}>
                {student.status}
              </p>
            </div>
          </section>

          <section className="cp-section">
            <h4>Family Details</h4>

            <div className="cp-card">
              <strong>Father</strong>
              <p>Suresh Reddy</p>
              <p>📞 +91 91234 56789</p>
            </div>

            <div className="cp-card">
              <strong>Mother</strong>
              <p>Lakshmi Reddy</p>
              <p>📞 +91 99876 54321</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
