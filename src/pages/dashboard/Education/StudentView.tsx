import React, { useEffect, useState } from "react";
import "./StudentView.css";
import BranchStudents from "../../dashboard/Education/BranchStudents";

type View = "branches" | "students";

interface Branch {
  id: number;
  name: string;
  location: string;
  students: number;
}

interface ApiBranch {
  branch_id: number;
  branch_name: string;
  location: string;
  status: string;
  student_count: number;
  total_students: number;
  branch_count: number;
}

interface Props {
  onBack: () => void;
}

const StudentView: React.FC<Props> = ({ onBack }) => {
  const [view, setView] = useState<View>("branches");
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [totalStudents, setTotalStudents] = useState(0);
  const [branchCount, setBranchCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://swachify-india-be-1-mcrb.onrender.com/institution/student/branch-directory"
      );

      const data: ApiBranch[] = await res.json();

      if (data.length > 0) {
        setTotalStudents(data[0].total_students);
        setBranchCount(data[0].branch_count);
      }

      const formatted: Branch[] = data.map((b) => ({
        id: b.branch_id,
        name: b.branch_name,
        location: b.location,
        students: b.student_count,
      }));

      setBranches(formatted);
    } catch (err) {
      console.error("Failed to load branch directory", err);
    } finally {
      setLoading(false);
    }
  };

  if (view === "students" && selectedBranch) {
    return (
      <BranchStudents
        branch={{
          id: selectedBranch.id,
          name: selectedBranch.name,
          location: selectedBranch.location,
        }}
        onBack={() => setView("branches")}
      />
    );
  }

  return (
    <div className="sv-wrapper">
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
              <h3>{totalStudents}</h3>
            </div>
          </div>

          <div className="sv-stat-card orange">
            <div className="sv-stat-icon">🏫</div>
            <div>
              <p>Branch Count</p>
              <h3>{branchCount}</h3>
            </div>
          </div>
        </div>

        <div className="sv-section-head">
          <h3>Institutions</h3>
          <span className="sv-updated">Updated just now</span>
        </div>

        {loading && <p style={{ padding: 16 }}>Loading branches…</p>}

        {/* 🔥 GRID WRAPPER */}
        {!loading && (
          <div className="sv-branch-grid">
            {branches.map((b) => (
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
                    <span className="av three">
                      +{Math.floor(b.students / 100)}k
                    </span>
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
          </div>
        )}

        <button className="sv-back" onClick={onBack}>
          ← Back to Partner Portal
        </button>
      </div>
    </div>
  );
};

export default StudentView;
