import React, { useState } from "react";
import "./BranchStudents.css";
import StudentDetails from "./StudentDetails";

interface Student {
  id: number;
  name: string;
  year: string;
  studentId: string;
  avatar: string;
}

interface Props {
  branch: {
    name: string;
    location?: string;
  };
  onBack: () => void;
}

const STUDENTS: Student[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    year: "Year 3",
    studentId: "STU987654",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Ananya Kapoor",
    year: "Year 2",
    studentId: "STU987210",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    year: "Year 4",
    studentId: "STU987889",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: 4,
    name: "Priya Verma",
    year: "Year 1",
    studentId: "STU987112",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const BranchStudents: React.FC<Props> = ({ branch, onBack }) => {
  const [selected, setSelected] = useState<Student | null>(null);

  if (selected) {
    return (
      <StudentDetails
        student={selected}
        onBack={() => setSelected(null)}
      />
    );
  }

  return (
     <div className="bsx-wrapper">
    <div className="bsx-page">
      {/* HEADER */}
      <header className="bsx-header">
        <button className="bsx-back" onClick={onBack}>←</button>
        <div>
          <h2>{branch.name}</h2>
          <p className="bsx-sub">{branch.location || "Main Campus"}</p>
        </div>
      </header>

      {/* SEARCH */}
      <div className="bsx-search">
        🔍
        <input placeholder="Search by name or student ID" />
      </div>

      {/* LIST HEADER */}
      <div className="bsx-list-head">
        <span>STUDENTS ({STUDENTS.length})</span>
        {/* <button className="bsx-sort">Sort by Name</button> */}
      </div>

      {/* LIST */}
    {/* LIST */}
<div className="bsx-list">
  {STUDENTS.map((s) => (
    <div
      key={s.id}
      className="bsx-card"
      onClick={() => setSelected(s)}
    >
      <div className="bsx-avatar-wrap">
        <img src={s.avatar} className="bsx-avatar-img" />
      </div>

      <div className="bsx-info">
        <h4>{s.name}</h4>

        <div className="bsx-meta">
          <span className="bsx-id">{s.studentId}</span>
          <span className="bsx-year">{s.year}</span>
        </div>
      </div>

      <span className="bsx-arrow">›</span>
    </div>
  ))}
</div>


      <button className="bsx-load">⟳ Load More Students</button>
    </div>
    </div>
  );
};

export default BranchStudents;
