import React from "react";
import "./StudentDetails.css";
import { Modal } from "antd";
import { useState } from "react";


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
  const [editMode, setEditMode] = useState(false);

const [formData, setFormData] = useState({
  name: student.name,
  year: student.year,
  studentId: student.studentId,
  avatar: student.avatar,

  fatherName: "Mr. Suresh Sharma",
  background: "Science Stream, CBSE",
  admissionDate: "15 Aug 2021",

  aadhaar: "**** 8920",
  pan: "ABCP****3D",

  scholarshipAmount: "25000",
  scholarshipDate: "10 Oct 2023",

  sgpa: "8.92",
  attendance: "92",
  backlogs: "0",
});

 
  const [menuOpen, setMenuOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await fetch(
        `http://localhost:5000/api/students/${student.studentId}`,
        { method: "DELETE" }
      );

      Modal.success({
        title: "Student Deleted",
        onOk: onBack,
      });
    } catch (error) {
      Modal.error({
        title: "Delete Failed",
      });
    }
  };

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};
const EditableField = ({
  name,
  value,
  editMode,
}: {
  label?: string;
  name: string;
  value: string;
  editMode: boolean;
}) =>
  editMode ? (
    <input
      className="sd-input"
      name={name}
      value={value}
      onChange={handleChange}
    />
  ) : (
    <strong>{value}</strong>
  );
  const handleSave = async () => {
  await fetch(
    `http://localhost:5000/api/students/${student.studentId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
  );
  setEditMode(false);
};

const handleCancel = () => {
  setFormData({
    name: student.name,
    year: student.year,
    studentId: student.studentId,
    avatar: student.avatar,

    fatherName: "Mr. Suresh Sharma",
    background: "Science Stream, CBSE",
    admissionDate: "15 Aug 2021",

    aadhaar: "**** 8920",
    pan: "ABCP****3D",

    scholarshipAmount: "25000",
    scholarshipDate: "10 Oct 2023",

    sgpa: "8.92",
    attendance: "92",
    backlogs: "0",
  });
  setEditMode(false);
};



  return (
     <div className="sd-wrapper">
    <div className="sd-page">
      {/* HEADER */}
      <header className="sd-header">
        <button className="sd-back" onClick={onBack}>←</button>
        <h2>Student Details</h2>
      <div style={{ position: "relative", marginLeft: "auto" }}>

  <span
    className="sd-menu"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    ⋮
  </span>

  {menuOpen && (
    <div className="sd-dropdown">
<div
  onClick={() => {
    setEditMode(true);
    setMenuOpen(false);
  }}
>
  ✏ Edit Profile
</div>


      <div
        className="danger"
        onClick={() =>
          Modal.confirm({
            title: "Delete Student?",
            content: "This action cannot be undone",
            okType: "danger",
            onOk: handleDelete,
          })
        }
      >
        🗑 Delete Student
      </div>
    </div>
  )}
</div>

      </header>

      {/* PROFILE CARD */}
      <div className="sd-profile-card">
        <img src={student.avatar} className="sd-avatar" />

        <div className="sd-profile-info">
{editMode ? (
  <>
    <input
      className="sd-input"
      name="name"
      value={formData.name}
      onChange={handleChange}
    />

    <input
      className="sd-input"
      name="year"
      value={formData.year}
      onChange={handleChange}
    />
  </>
) : (
  <>
    <h3>{formData.name}</h3>
    <p>B.Tech Computer Science | {formData.year}</p>
  </>
)}
{editMode && (
  <div className="sd-edit-actions">
    <button className="sd-save" onClick={handleSave}>
      Save
    </button>

    <button className="sd-cancel" onClick={handleCancel}>
      Cancel
    </button>
  </div>
)}

          <span className="sd-id">{student.studentId}</span>
        </div>
      </div>

<div className="sd-info-card">
  <div className="sd-info-row">
    <span>Father's Name</span>
    <EditableField
      name="fatherName"
      value={formData.fatherName}
      editMode={editMode}
    />
  </div>

  <div className="sd-info-row">
    <span>Background</span>
    <EditableField
      name="background"
      value={formData.background}
      editMode={editMode}
    />
  </div>

  <div className="sd-info-row">
    <span>Admission Date</span>
    <EditableField
      name="admissionDate"
      value={formData.admissionDate}
      editMode={editMode}
    />
  </div>
</div>


      {/* IDENTITY DOCUMENTS */}
      <h4 className="sd-section">Identity Documents</h4>

<div className="sd-doc">
  🪪 Aadhaar:
  <EditableField
    name="aadhaar"
    value={formData.aadhaar}
    editMode={editMode}
  />
</div>

<div className="sd-doc">
  💳 PAN:
  <EditableField
    name="pan"
    value={formData.pan}
    editMode={editMode}
  />
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
    <EditableField
      name="sgpa"
      value={formData.sgpa}
      editMode={editMode}
    />
  </div>

  <div>
    <span>Attendance</span>
    <EditableField
      name="attendance"
      value={formData.attendance}
      editMode={editMode}
    />
  </div>

  <div>
    <span>Backlogs</span>
    <EditableField
      name="backlogs"
      value={formData.backlogs}
      editMode={editMode}
    />
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
