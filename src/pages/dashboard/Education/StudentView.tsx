import React, { useState } from "react";
import "./StudentView.css";
import BranchStudents from "../../dashboard/Education/BranchStudents";

type View = "branches" | "students";

interface Branch {
  id: number;
  name: string;
  location: string;
  students: number;
}

const BRANCHES: Branch[] = [
  { id: 1, name: "Engineering & Tech", location: "Main Campus, Block A", students: 1240 },
  { id: 2, name: "Arts & Humanities", location: "West Wing, Block C", students: 856 },
  { id: 3, name: "Pure Sciences", location: "Science Block", students: 642 },
];

interface Props {
  onBack: () => void;
}

const StudentView: React.FC<Props> = ({ onBack }) => {
  const [view, setView] = useState<View>("branches");
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  if (view === "students" && selectedBranch) {
    return (
      <BranchStudents
        branch={selectedBranch}
        onBack={() => setView("branches")}
      />
    );
  }

  return (
    <div className="sv-page">
      {/* HEADER */}
      <header className="sv-header">
        <h2>Branch Directory</h2>
        <div className="sv-header-actions">
          <span className="sv-icon">🔍</span>
          <span className="sv-icon">⚙️</span>
        </div>
      </header>

      {/* STATS */}
      <div className="sv-stats">
        <div className="sv-stat-card blue">
          <div className="sv-stat-icon">👥</div>
          <div>
            <p>Total Students</p>
            <h3>4,285</h3>
          </div>
        </div>

        <div className="sv-stat-card orange">
          <div className="sv-stat-icon">🏫</div>
          <div>
            <p>Branch Count</p>
            <h3>12</h3>
          </div>
        </div>
      </div>

      <div className="sv-section-head">
        <h3>Institutions</h3>
        <span className="sv-updated">Updated 2h ago</span>
      </div>

      {/* BRANCH LIST */}
      {BRANCHES.map((b) => (
        <div key={b.id} className="sv-branch-card">
          <div className="sv-branch-top">
            <div className="sv-branch-icon">🎓</div>

            <div className="sv-branch-info">
              <h4>{b.name}</h4>
              <p>{b.location}</p>
            </div>

            <span className="sv-active">ACTIVE</span>
          </div>

          <div className="sv-branch-footer">
            <div className="sv-avatars">
              <span className="av one" />
              <span className="av two" />
              <span className="av three">+{Math.floor(b.students / 100)}k</span>
            </div>

            <span className="sv-count">
              <b>{b.students}</b> Students enrolled
            </span>
          </div>

          <button
            className="sv-primary"
            onClick={() => {
              setSelectedBranch(b);
              setView("students");
            }}
          >
            View Students →
          </button>
        </div>
      ))}

      <button className="sv-back" onClick={onBack}>
        ← Back to Partner Portal
      </button>
    </div>
  );
};

export default StudentView;
