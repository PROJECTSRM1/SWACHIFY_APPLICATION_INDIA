import React, { useState } from "react";
import "./ManagementOverview.css";

interface ManagementOverviewProps {
  onBack: () => void;
}

interface StudentForm {
  name: string;
  studentId: string;
  year: string;
  branch: string;
}

const ManagementOverview: React.FC<ManagementOverviewProps> = ({ onBack }) => {
  /* EXISTING STATES */
  const [showBus, setShowBus] = useState(false);
  const [showExam, setShowExam] = useState(false);

  /* NEW: ADD STUDENT STATES */
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [studentForm, setStudentForm] = useState<StudentForm>({
    name: "",
    studentId: "",
    year: "",
    branch: "",
  });

  /* EXISTING FUNCTION */
  const sendSMSAlert = () => {
    alert("📩 SMS Alert Sent to Parents Successfully!");
  };

  /* NEW: SAVE STUDENT */
  const saveStudent = () => {
    if (
      !studentForm.name ||
      !studentForm.studentId ||
      !studentForm.year ||
      !studentForm.branch
    ) {
      alert("⚠️ Please fill all fields");
      return;
    }

    const existing = JSON.parse(
      localStorage.getItem("students") || "[]"
    );

    localStorage.setItem(
      "students",
      JSON.stringify([
        ...existing,
        {
          id: Date.now(),
          ...studentForm,
        },
      ])
    );

    setStudentForm({
      name: "",
      studentId: "",
      year: "",
      branch: "",
    });

    setShowAddStudent(false);
    alert("✅ Student Added Successfully");
  };

  return (
      <div className="bsx-wrapper">
    <div className="mgmtw-page">
      {/* HEADER */}
      <header className="mgmtw-header">
        <div className="mgmtw-header-left">
          <button className="mgmtw-back" onClick={onBack}>←</button>
          <h2>Management Overview</h2>
        </div>
        <span className="mgmtw-bell">🔔</span>
      </header>

      <div className="mgmtw-container">

        {/* 🔹 ADD NEW STUDENT (TOP ACTION) */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
          <button
            className="mgmtw-action"
            onClick={() => setShowAddStudent(true)}
          >
            ➕ Add New Student
          </button>
        </div>

        {/* ENROLLMENT */}
        <section>
          <h3 className="mgmtw-section-title">Enrollment Status</h3>

          <div className="mgmtw-grid-2">
            <div className="mgmtw-card">
              <div className="mgmtw-card-top">
                <div className="mgmtw-icon blue">🎓</div>
                <span className="mgmtw-muted">Total Capacity</span>
              </div>

              <h1 className="mgmtw-number">500</h1>

              <div className="mgmtw-progress">
                <span style={{ width: "84%" }} />
              </div>

              <span className="mgmtw-muted">84% Occupancy</span>
            </div>

            <div className="mgmtw-card">
              <div className="mgmtw-card-top">
                <div className="mgmtw-icon green">✔</div>
                <span className="mgmtw-muted">Approved Seats</span>
              </div>

              <h1 className="mgmtw-number">420</h1>
              <span className="mgmtw-pill success">+12 new</span>
            </div>
          </div>
        </section>

        {/* OPERATIONS */}
        <section>
          <h3 className="mgmtw-section-title">Operations Status</h3>

          <div className="mgmtw-grid-2">
            <div className="mgmtw-card">
              <div className="mgmtw-card-top">
                <div className="mgmtw-icon blue">🚌</div>
                <span className="mgmtw-dot online" />
              </div>

              <h4>Bus Tracking</h4>
              <p className="mgmtw-muted">3 Buses Online</p>

              <button
                className="mgmtw-action"
                onClick={() => setShowBus(true)}
              >
                Track Bus
              </button>
            </div>

            <div className="mgmtw-card">
              <div className="mgmtw-card-top">
                <div className="mgmtw-icon blue">💬</div>
                <span className="mgmtw-dot online" />
              </div>

              <h4>SMS Alerts</h4>
              <p className="mgmtw-muted">System Online</p>

              <button
                className="mgmtw-action success"
                onClick={sendSMSAlert}
              >
                Send SMS Alert
              </button>
            </div>
          </div>
        </section>

        {/* PAYROLL */}
        <section>
          <h3 className="mgmtw-section-title">Staff & Payroll</h3>

          <div className="mgmtw-card mgmtw-split">
            <div>
              <h4>Monthly Payroll</h4>
              <p className="mgmtw-muted">September 2023</p>
            </div>

            <div className="mgmtw-pay">
              <h2>$45,200</h2>
              <span className="mgmtw-muted">Total Disbursement</span>
            </div>
          </div>
        </section>

        {/* MAINTENANCE */}
        <section>
          <h3 className="mgmtw-section-title">Maintenance Accountability</h3>

          <div className="mgmtw-card">
            <div className="mgmtw-card-top">
              <span className="mgmtw-muted">Maintenance Budget</span>
              <span className="mgmtw-pill warn">Under Budget</span>
            </div>

            <h2>$12,400 <span className="mgmtw-muted">/ $15k</span></h2>

            <div className="mgmtw-progress">
              <span style={{ width: "82%" }} />
            </div>

            <div className="mgmtw-budget-row">
              <span>Facility</span>
              <span>IT Infrastructure</span>
              <span>Misc</span>
            </div>
          </div>
        </section>

        {/* EXAMS */}
        <section>
          <h3 className="mgmtw-section-title">Exam Alerts</h3>

          <div className="mgmtw-alert">
            <div className="mgmtw-icon orange">🔔</div>
            <div>
              <strong>Mid-Term Exams</strong>
              <p>Starts from <b>15 Oct 2026</b></p>
            </div>
          </div>

          <div className="mgmtw-alert">
            <div className="mgmtw-icon blue">📅</div>
            <div>
              <strong>Exam Schedule</strong>
              <p>Draft version ready</p>

              <button
                className="mgmtw-link"
                onClick={() => setShowExam(true)}
              >
                View Schedule
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ADD STUDENT MODAL */}
      {showAddStudent && (
        <div className="mgmtw-modal">
          <div className="mgmtw-modal-card">
            <h3>Add New Student</h3>

            <input
              placeholder="Student Name"
              value={studentForm.name}
              onChange={(e) =>
                setStudentForm({ ...studentForm, name: e.target.value })
              }
            />

            <input
              placeholder="Student ID"
              value={studentForm.studentId}
              onChange={(e) =>
                setStudentForm({ ...studentForm, studentId: e.target.value })
              }
            />

            <input
              placeholder="Year"
              value={studentForm.year}
              onChange={(e) =>
                setStudentForm({ ...studentForm, year: e.target.value })
              }
            />

            <input
              placeholder="Branch (CSE / ECE / EEE)"
              value={studentForm.branch}
              onChange={(e) =>
                setStudentForm({ ...studentForm, branch: e.target.value })
              }
            />

            <button className="mgmtw-action success" onClick={saveStudent}>
              Save Student
            </button>

            <button onClick={() => setShowAddStudent(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* BUS TRACKING MODAL */}
      {showBus && (
        <div className="mgmtw-modal">
          <div className="mgmtw-modal-card">
            <h3>Live Bus Tracking</h3>

            <iframe
              title="bus-map"
              width="100%"
              height="300"
              loading="lazy"
              src="https://www.google.com/maps?q=17.385044,78.486671&z=14&output=embed"
            />

            <button onClick={() => setShowBus(false)}>Close</button>
          </div>
        </div>
      )}

      {/* EXAM SCHEDULE MODAL */}
      {showExam && (
        <div className="mgmtw-modal">
          <div className="mgmtw-modal-card">
            <h3>Exam Schedule</h3>

            <ul className="mgmtw-list">
              <li>📘 Mathematics – 15 Oct</li>
              <li>📕 Science – 17 Oct</li>
              <li>📗 English – 19 Oct</li>
              <li>📙 Social Studies – 21 Oct</li>
            </ul>

            <button onClick={() => setShowExam(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ManagementOverview;
