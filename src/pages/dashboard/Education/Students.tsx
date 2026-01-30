import React, { useEffect, useMemo, useState } from "react";
import "./Students.css";

export interface Student {
  id: number;
  name: string;
  program: string;
  avatar: string;
  rating: number;
  status: "In Progress" | "Completed";
  attendance: number;
  shift: string;
  certs: string[];
}


type StudentsProps = {
  onBack: () => void;
  onSelectStudent: (student: Student) => void;
};

const Students: React.FC<StudentsProps> = ({ onBack, onSelectStudent }) => {
  const [studentsData, setStudentsData] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "top" | "recent">("all");
  const [aggregate, setAggregate] = useState("");
  const [certificate, setCertificate] = useState("");
  const [internship, setInternship] = useState("");

  /* =======================
     FETCH STUDENTS (BASED ON TAB)
  ======================= */

  useEffect(() => {
    let url =
      "https://swachify-india-be-1-mcrb.onrender.com/api/education/students-list";

    if (tab === "top") {
      url =
        "https://swachify-india-be-1-mcrb.onrender.com/api/education/students/top-performers";
    }

    if (tab === "recent") {
      url =
        "https://swachify-india-be-1-mcrb.onrender.com/api/education/students/recent-joiners";
    }

   fetch(url, { cache: "no-store" })

      .then((res) => res.json())
      .then((data) => {
      const mapped: Student[] = data.map((item: any, index: number) => ({
  id: item.user_id,
  name: item.student_name,
  program: item.degree,
  rating: item.rating,

  // ✅ NORMALIZATION HERE
  status:
    item.internship_status?.toLowerCase() === "in progress"
      ? "In Progress"
      : "Completed",

  attendance: item.attendance_percentage,
  certs: item.skill ? [item.skill] : [],
  shift: "10:00 AM - 07:00 PM",
  avatar: `https://randomuser.me/api/portraits/men/${index + 10}.jpg`,
}));


        setStudentsData(mapped);
      })
      .catch((err) => console.error(err));
  }, [tab]);

  /* =======================
     FILTERING (UNCHANGED)
  ======================= */

  const filtered = useMemo(() => {
    let data = [...studentsData];

    if (aggregate === "90+") data = data.filter((s) => s.attendance >= 90);
    if (aggregate === "80-90")
      data = data.filter((s) => s.attendance >= 80 && s.attendance < 90);
    if (aggregate === "60-80")
      data = data.filter((s) => s.attendance >= 60 && s.attendance < 80);

    if (certificate) data = data.filter((s) => s.certs.includes(certificate));
    if (internship) data = data.filter((s) => s.status === internship);

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.id.toString().includes(q)
      );
    }

    return data;
  }, [studentsData, search, aggregate, certificate, internship]);

  return (
    <div className="students-root">
      {/* HEADER */}
      <div className="students-header">
        <button className="students-back" onClick={onBack}>
          ←
        </button>
        <h2>Students</h2>
        <input
          className="students-search"
          placeholder="Search by name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FILTERS */}
      <div className="students-filters">
        <div className="students-tabs">
          <button
            onClick={() => setTab("all")}
            className={tab === "all" ? "active" : ""}
          >
            All Students
          </button>
          <button
            onClick={() => setTab("top")}
            className={tab === "top" ? "active" : ""}
          >
            Top Performers
          </button>
          <button
            onClick={() => setTab("recent")}
            className={tab === "recent" ? "active" : ""}
          >
            Recent Joiners
          </button>
        </div>

        <div className="students-dropdowns">
          <select onChange={(e) => setAggregate(e.target.value)}>
            <option value="">Aggregate</option>
            <option value="90+">90%+</option>
            <option value="80-90">80–90%</option>
            <option value="60-80">60–80%</option>
          </select>

          <select onChange={(e) => setCertificate(e.target.value)}>
            <option value="">Certificate</option>
            <option value="Python">Python</option>
            <option value="CSS">CSS</option>
          </select>

        <select
  value={internship}
  onChange={(e) => setInternship(e.target.value)}
>
  <option value="" disabled hidden>
    
  </option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</select>


        </div>
      </div>

      {/* GRID */}
      <div className="students-grid">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="students-card"
            onClick={() => onSelectStudent(s)}
            style={{ cursor: "pointer" }}
          >
            <img src={s.avatar} alt={s.name} />

            <div className="students-info">
              <div className="students-top">
                <h3>{s.name}</h3>
                <span className="students-rating">⭐ {s.rating}</span>
              </div>

              <p className="students-program">{s.program}</p>
              <p className="students-meta">{s.attendance}% Attendance</p>
              <p className="students-meta">{s.shift}</p>

              <div className="students-footer">
                <span>ID: {s.id}</span>
                <span className={`students-status ${s.status.toLowerCase()}`}>
                  {s.status}
                </span>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="students-empty">No students found</p>
        )}
      </div>
    </div>
  );
};

export default Students;
