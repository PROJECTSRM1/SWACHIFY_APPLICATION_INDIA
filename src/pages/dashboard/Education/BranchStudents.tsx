import React, { useState, useEffect } from "react";
import "./BranchStudents.css";
import StudentDetails from "./StudentDetails";
import axios from "axios";

interface Student {
  id: number;
  name: string;
  year: string;
  studentId: string;
  avatar: string;
  isActive: boolean;
}

interface Props {
  branch: {
    id: number;
    name: string;
    location?: string;
  };
  onBack: () => void;
}

const PAGE_SIZE = 5;

const BranchStudents: React.FC<Props> = ({ branch, onBack }) => {
  const [selected, setSelected] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchStudentsByBranch();
  }, [branch.id]);

  const fetchStudentsByBranch = async () => {
    try {
      const res = await axios.get(
        "https://swachify-india-be-1-mcrb.onrender.com/institution/student/by_branch_id",
        { params: { branch_id: branch.id } }
      );

      const formatted: Student[] = res.data.map((s: any) => ({
        id: s.id,
        name: s.student_name,
        year: s.academic_year,
        studentId: s.student_id,
        avatar:
          s.profile_image_url ||
          "https://ui-avatars.com/api/?name=" +
            encodeURIComponent(s.student_name),
        isActive: s.is_active,
      }));

      setStudents(formatted);
      setPage(1); // reset pagination on refresh
    } catch (err) {
      console.error("Students fetch error", err);
    }
  };

  /* ================= FILTERING ================= */
  const filteredStudents = students
    .filter((s) =>
      `${s.name} ${s.studentId}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((s) => (showActiveOnly ? s.isActive : true));

  const visibleStudents = filteredStudents.slice(0, page * PAGE_SIZE);

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
          <input
            placeholder="Search by name or student ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FILTER */}
        <div style={{ padding: "0 16px" }}>
          <label>
            <input
              type="checkbox"
              checked={showActiveOnly}
              onChange={() => setShowActiveOnly(!showActiveOnly)}
            />{" "}
            Show active students only
          </label>
        </div>

        {/* LIST HEADER */}
        <div className="bsx-list-head">
          <span>STUDENTS ({filteredStudents.length})</span>
          <button onClick={fetchStudentsByBranch}>⟳ Refresh</button>
        </div>

        {/* LIST */}
        <div className="bsx-list">
          {visibleStudents.map((s) => (
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
{!s.isActive && <span className="inactive">INACTIVE</span>}


              <span className="bsx-arrow">›</span>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        {visibleStudents.length < filteredStudents.length && (
          <button
            className="bsx-load"
            onClick={() => setPage((p) => p + 1)}
          >
            ⟳ Load More Students
          </button>
        )}
      </div>
    </div>
  );
};

export default BranchStudents;
