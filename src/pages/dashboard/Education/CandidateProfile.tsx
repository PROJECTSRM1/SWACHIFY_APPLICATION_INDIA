import React, { useEffect, useState } from "react";
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
  resumeUrl?: string; // ✅ FIX 1
};

type Props = {
  student: Student;
  onBack: () => void;
};

const CandidateProfile: React.FC<Props> = ({ student, onBack }) => {
  const [criminal, setCriminal] = useState<"YES" | "NO">("NO");
  const [isEditing, setIsEditing] = useState(false);

  // 🔹 PROFILE DATA
  const [aadhaar, setAadhaar] = useState("");
  const [pan, setPan] = useState("");
  const [location, setLocation] = useState("");
  const [education, setEducation] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [noc, setNoc] = useState<any>(null);

  // 🔹 SAVE APIs
  const saveFullProfile = async () => {
    await fetch(
      `https://swachify-india-be-1-mcrb.onrender.com/api/education/students/${student.id}/full-profile`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ education, certificates, noc }),
      }
    );
  };

  const saveAttendance = async () => {
    await fetch(
      `https://swachify-india-be-1-mcrb.onrender.com/api/education/students/${student.id}/attendance`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attendance_percentage: student.attendance,
        }),
      }
    );
  };

  const saveInternshipStatus = async () => {
    await fetch(
      `https://swachify-india-be-1-mcrb.onrender.com/api/education/students/${student.id}/internship-status`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          internship_status: student.status,
        }),
      }
    );
  };

  // 🔹 FETCH PROFILE
  useEffect(() => {
    fetch(
      `https://swachify-india-be-1-mcrb.onrender.com/api/education/students/${student.id}/full-profile`
    )
      .then((r) => r.json())
      .then((data) => {
        const ids = data.profile?.government_id || [];

        setAadhaar(ids.find((i: any) => i.id_type === "Aadhaar")?.id_number || "—");
        setPan(ids.find((i: any) => i.id_type === "PAN")?.id_number || "—");
        setLocation(data.profile?.location || "—");

        setEducation(data.education || []);
        setCertificates(data.certificates || []);
        setNoc(data.noc || null);
      });
  }, [student.id]);

  return (
    <div className="cp-root">
      {/* HEADER */}
      <div className="cp-header">
        <button className="cp-back" onClick={onBack}>←</button>
        <h2>Candidate Profile</h2>
      </div>

      {/* TOP CARD */}
      <div className="cp-top">
        <div className="cp-avatar-wrap">
          <img src={student.avatar} />
          {student.status === "Active" && <span className="cp-dot" />}
        </div>

        <div className="cp-main">
          <h3>{student.name}</h3>
          <p className="cp-id">#{student.id}</p>
          <p className="cp-sub">{student.program}</p>

          <div className="cp-actions">
            <button className="cp-btn secondary">⬇ PDF Report</button>
            <button className="cp-btn primary" onClick={() => setIsEditing(true)}>
              ✎ Edit Profile
            </button>
          </div>
        </div>

        {/* ✅ RESUME ACTIONS */}
        <div className="cp-resume-right">
          <label className="cp-resume-btn">
            <span className="icon">⬆</span>
            Upload Resume
            <input type="file" hidden />
          </label>

          <a
            className="cp-resume-btn"
            href={student.resumeUrl || "#"}
            download
          >
            <span className="icon">⬇</span>
            Download Resume
          </a>
        </div>
      </div>

      {/* GRID */}
      <div className="cp-grid">
        {/* LEFT */}
        <div className="cp-col">
          <section className="cp-section">
            <h4>Personal Identity</h4>

            <div className="cp-card"><strong>Aadhaar</strong><p>{aadhaar}</p></div>
            <div className="cp-card"><strong>PAN</strong><p>{pan}</p></div>
            <div className="cp-card"><strong>Location</strong><p>{location}</p></div>

            <div className="cp-card">
              <strong>NOC Details</strong>
              {noc ? (
                <>
                  <p>NOC No: {noc.noc_number}</p>
                  <p>{noc.police_station_name}</p>
                  <p>Year: {noc.issue_year}</p>
                  <p className="approved">NOC Verified</p>

                  <a className="cp-upload" href={noc.upload_noc} download>
                    ⬇ Download NOC
                  </a>
                </>
              ) : (
                <p className="approved">No criminal cases</p>
              )}

              <div className="noc-row">
                <span>Criminal Background</span>
                <select
                  value={criminal}
                  onChange={(e) => setCriminal(e.target.value as any)}
                >
                  <option value="NO">NO</option>
                  <option value="YES">YES</option>
                </select>
              </div>
            </div>
          </section>

          <section className="cp-section">
            <h4>Education</h4>
            {education.map((e, i) => (
              <div className="cp-card" key={i}>
                <strong>{e.degree}</strong>
                <p>Score: {e.percentage}%</p>
                <p className="cp-muted">{e.institute}</p>
              </div>
            ))}
          </section>
        </div>

        {/* RIGHT */}
        <div className="cp-col">
          <section className="cp-section">
            <h4>Work Details</h4>

            <div className="cp-card"><strong>Attendance</strong><p>{student.attendance}%</p></div>
            <div className="cp-card"><strong>Shift</strong><p>{student.shift}</p></div>
            <div className="cp-card">
              <strong>Status</strong>
              <p className={student.status === "Active" ? "active" : "completed"}>
                {student.status}
              </p>
            </div>
          </section>

          <section className="cp-section">
            <h4>Certificates</h4>
            {certificates.map((c, i) => (
              <div className="cp-card" key={i}>
                <strong>{c.certificate_name}</strong>
                <p>{c.issued_by} · {c.year}</p>

                <a className="cp-upload" href={c.upload_certificate} download>
                  ⬇ Download Certificate
                </a>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* SAVE */}
      {isEditing && (
        <div className="cp-modal-overlay">
          <div className="cp-modal">
            <button
              className="cp-btn primary"
              onClick={async () => {
                await saveFullProfile();
                await saveAttendance();
                await saveInternshipStatus();
                setIsEditing(false);
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateProfile;
