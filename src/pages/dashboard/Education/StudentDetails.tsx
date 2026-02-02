import React from "react";
import "./StudentDetails.css";

interface Props {
  student: {
    name: string;
    year: string;
    studentId: string;
    avatar: string;
  };
  onBack: () => void;
}

const StudentDetails: React.FC<Props> = ({ student, onBack }) => {
  return (
     <div className="sd-wrapper">
    <div className="sd-page">
      {/* HEADER */}
      <header className="sd-header">
        <button className="sd-back" onClick={onBack}>←</button>
        <h2>Student Details</h2>
        <span className="sd-menu">⋮</span>
      </header>

      {/* PROFILE CARD */}
      <div className="sd-profile-card">
        <img src={student.avatar} className="sd-avatar" />

        <div className="sd-profile-info">
          <h3>{student.name}</h3>
          <p>B.Tech Computer Science | {student.year}</p>
          <span className="sd-id">{student.studentId}</span>
        </div>
      </div>

      {/* BASIC DETAILS */}
      <div className="sd-info-card">
        <div className="sd-info-row">
          <span>Father's Name</span>
          <strong>Mr. Suresh Sharma</strong>
        </div>

        <div className="sd-info-row">
          <span>Background</span>
          <strong>Science Stream, CBSE</strong>
        </div>

        <div className="sd-info-row">
          <span>Admission Date</span>
          <strong>15 Aug 2021</strong>
        </div>
      </div>

      {/* IDENTITY DOCUMENTS */}
      <h4 className="sd-section">Identity Documents</h4>

      <div className="sd-doc">
        🪪 Aadhaar: **** 8920
        <span>⚙</span>
      </div>

      <div className="sd-doc">
        💳 PAN: ABCP****3D
        <span>⚙</span>
      </div>

      {/* SCHOLARSHIP */}
      <div className="sd-scholarship">
        <div>
          <h5>MERIT SCHOLARSHIP</h5>
          <h3>₹ 25,000.00</h3>
          <p>Disbursed on 10 Oct 2023</p>
        </div>
        🏅
      </div>

      {/* FEES */}
      <h4 className="sd-section">Fee Installments</h4>

      <div className="sd-fee paid">
        <span>✔</span>
        <div>
          <h5>1st Installment</h5>
          <p>Paid on 12 Sep</p>
        </div>
        <strong>₹ 45,000</strong>
      </div>

      <div className="sd-fee overdue">
        <span>⚠</span>
        <div>
          <h5>2nd Installment</h5>
          <p>Overdue (Due 05 Jan)</p>
        </div>
        <strong>₹ 45,000</strong>
      </div>

      <div className="sd-fee upcoming">
        <span>⏳</span>
        <div>
          <h5>3rd Installment</h5>
          <p>Due 20 May 2024</p>
        </div>
        <strong>₹ 45,000</strong>
      </div>

      {/* ACADEMIC PROGRESS */}
      <h4 className="sd-section">Academic Progress</h4>

      <div className="sd-progress">
        <div>
          <span>Current SGPA</span>
          <strong className="blue">8.92</strong>
        </div>
        <div>
          <span>Attendance</span>
          <strong>92%</strong>
        </div>
        <div>
          <span>Backlogs</span>
          <strong>0</strong>
        </div>
      </div>

      {/* ACTIONS */}
      <button className="sd-primary">
        ⬇ Download Transcript
      </button>

      <button className="sd-secondary">
        ✉ Contact Administrator
      </button>
    </div>
    </div>
  );
};

export default StudentDetails;
