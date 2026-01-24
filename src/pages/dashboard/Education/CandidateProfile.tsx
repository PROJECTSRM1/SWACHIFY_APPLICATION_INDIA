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
 const [isEditing, setIsEditing] = useState(false);
const [form, setForm] = useState<Student>(student);
const [preview, setPreview] = useState(student.avatar);



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
          <button className="cp-btn primary cp-edit-btn" onClick={() => setIsEditing(true)}>
  ✎ Edit Profile
</button>



          </div>
        </div>

        {/* ✅ RIGHT SIDE – VERTICAL RESUME BUTTONS */}
       <div className="cp-resume-right">
  <label className="cp-resume-btn">
    <span className="icon">⬆</span>
    Upload Resume
    <input type="file" hidden />
  </label>

  <button className="cp-resume-btn">
    <span className="icon">⬇</span>
    Download Resume
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
  <p className="cp-muted">Duration: Aug 2020 – May 2024</p>
</div>

<div className="cp-card">
  <strong>Bachelor of Science (IT)</strong>
  <p>Score: 9.2 CGPA</p>
  <p className="cp-muted">Duration: Jul 2017 – Apr 2021</p>
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
      {isEditing && (
  <div className="cp-modal-overlay">
    <div className="cp-modal large">
      <h3>Edit Profile</h3>

      {/* PHOTO */}
      <div className="cp-photo-edit">
        <img src={preview} alt="preview" />
        <label className="cp-photo-btn">
          Change Photo
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPreview(URL.createObjectURL(file));
                setForm({ ...form, avatar: URL.createObjectURL(file) });
              }
            }}
          />
        </label>
      </div>

      {/* FORM GRID */}
      <div className="cp-form-grid">
        <input
          className="cp-input"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="cp-input"
          placeholder="Program"
          value={form.program}
          onChange={(e) => setForm({ ...form, program: e.target.value })}
        />

        <input
          className="cp-input"
          type="number"
          placeholder="Attendance %"
          value={form.attendance}
          onChange={(e) =>
            setForm({ ...form, attendance: Number(e.target.value) })
          }
        />

        <input
          className="cp-input"
          placeholder="Shift"
          value={form.shift}
          onChange={(e) => setForm({ ...form, shift: e.target.value })}
        />

        <select
          className="cp-input"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value as "Active" | "Completed" })
          }
        >
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* ACTIONS */}
      <div className="cp-modal-actions">
        <button className="cp-btn secondary" onClick={() => setIsEditing(false)}>
          Cancel
        </button>

        <button
          className="cp-btn primary"
          onClick={() => {
            Object.assign(student, form);
            setIsEditing(false);
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}

    
    </div>
  );
};

export default CandidateProfile;
