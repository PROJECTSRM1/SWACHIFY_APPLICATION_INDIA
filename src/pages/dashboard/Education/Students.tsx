import React, { useMemo, useState } from "react";
import "./Students.css";

export interface Student {
  id: number;
  name: string;
  program: string;
  avatar: string;
  rating: number;
  status: "Active" | "Completed";
  attendance: number;
  shift: string;
  certs: string[];
}

type StudentsProps = {
  onBack: () => void;
  onSelectStudent: (student: Student) => void;
};

const studentsData: Student[] = [
  {
    id: 2045,
    name: "Sarah Jenkins",
    program: "B.Tech Computer Science",
    rating: 4.8,
    status: "Active",
    attendance: 92,
    shift: "10:00 AM - 07:00 PM",
    certs: ["Java", "Python"],
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 1988,
    name: "Michael Chen",
    program: "M.S. Data Science",
    rating: 4.5,
    status: "Completed",
    attendance: 88,
    shift: "10:00 AM - 07:00 PM",
    certs: ["Python"],
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2092,
    name: "Emily Rodriguez",
    program: "B.E. Information Technology",
    rating: 4.9,
    status: "Active",
    attendance: 95,
    shift: "10:00 AM - 07:00 PM",
    certs: ["React"],
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2101,
    name: "David Kim",
    program: "B.S. Software Engineering",
    rating: 4.7,
    status: "Completed",
    attendance: 90,
    shift: "09:30 AM - 06:30 PM",
    certs: ["Java"],
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 2112,
    name: "Ananya Rao",
    program: "B.Tech AI & ML",
    rating: 4.6,
    status: "Active",
    attendance: 91,
    shift: "10:00 AM - 07:00 PM",
    certs: ["Python", "React"],
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 2125,
    name: "Rahul Mehta",
    program: "B.E. Computer Engineering",
    rating: 4.4,
    status: "Completed",
    attendance: 87,
    shift: "09:00 AM - 06:00 PM",
    certs: ["Angular"],
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
  },
];

const Students: React.FC<StudentsProps> = ({ onBack, onSelectStudent }) => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "top" | "recent">("all");
  const [aggregate, setAggregate] = useState("");
  const [cert, setCert] = useState("");
  const [internship, setInternship] = useState("");

  const filtered = useMemo(() => {
    let data = [...studentsData];

    if (tab === "top") data = data.filter((s) => s.rating >= 4.7);
    if (tab === "recent")
      data = [...data].sort((a, b) => b.id - a.id).slice(0, 4);

    if (aggregate === "90+") data = data.filter((s) => s.attendance >= 90);
    if (aggregate === "80-90")
      data = data.filter((s) => s.attendance >= 80 && s.attendance < 90);

    if (cert) data = data.filter((s) => s.certs.includes(cert));
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
  }, [search, tab, aggregate, cert, internship]);

  return (
    <div className="students-root">
      {/* HEADER */}
      <div className="students-header">
        <button className="students-back" onClick={onBack}>←</button>
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
          <button onClick={() => setTab("all")} className={tab === "all" ? "active" : ""}>
            All Students
          </button>
          <button onClick={() => setTab("top")} className={tab === "top" ? "active" : ""}>
            Top Performers
          </button>
          <button onClick={() => setTab("recent")} className={tab === "recent" ? "active" : ""}>
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

          <select onChange={(e) => setCert(e.target.value)}>
            <option value="">Cert</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="React">React</option>
            <option value="Angular">Angular</option>
          </select>

          <select onChange={(e) => setInternship(e.target.value)}>
            <option value="">Internship</option>
            <option value="Active">In Progress</option>
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
