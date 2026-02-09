import React, { useEffect, useState } from "react";
import "./CandidateProfile.css";

export type Student = {
  id: number;
  name: string;
  program: string;
  avatar: string;
  rating: number;
 status: "Active" | "Completed" | "In Progress";

  attendance: number;
  shift: string;
  resumeUrl?: string; // ✅ FIX 1
};

type Props = {
  student: Student;
  onBack: () => void;
};
type FamilyMember = {
  id: number;
  relation: string;
  name: string;
  phone: string;
};



const CandidateProfile: React.FC<Props> = ({ student, onBack }) => {
  const [criminal, setCriminal] = useState<"YES" | "NO">("NO");
  const [isEditing, setIsEditing] = useState(false);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);

  // 🔹 PROFILE DATA
  const [aadhaar, setAadhaar] = useState("");
  const [pan, setPan] = useState("");
  const [location, setLocation] = useState("");
  const [education, setEducation] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [noc, setNoc] = useState<any>(null);
  // EDITABLE COPIES (for modal)
const [editLocation, setEditLocation] = useState("");
const [editAadhaar, setEditAadhaar] = useState("");
const [editPan, setEditPan] = useState("");
const [profilePhoto, setProfilePhoto] = useState(student.avatar);

const [resumeFile, setResumeFile] = useState<File | null>(null);
const [resumeUrl, setResumeUrl] = useState<string | null>(student.resumeUrl || null);
const handleResumeUpload = (file: File) => {
  setResumeFile(file);
  setResumeUrl(URL.createObjectURL(file)); // 👈 instant preview & download
};




const [editEducation, setEditEducation] = useState<any[]>([]);



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
useEffect(() => {
  fetch(
    `https://swachify-india-be-1-mcrb.onrender.com/api/education/${student.id}/family-members`
  )
    .then((res) => res.json())
    .then((data) => {
      const mapped = (data || []).map((item: any) => ({
        id: item.id,
        relation: item.relation_type, // ✅ FIX
        name: `${item.first_name} ${item.last_name}`.trim(), // ✅ FIX
        phone: item.phone_number, // ✅ FIX
      }));

      setFamilyMembers(mapped);
    })
    .catch(() => setFamilyMembers([]));
}, [student.id]);



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

          <button
  className="cp-btn primary"
  onClick={() => {
    setEditLocation(location);
    setEditAadhaar(aadhaar);
    setEditPan(pan);
    setEditEducation([...education]);
    setIsEditing(true);
  }}
>
  ✎ Edit Profile
</button>

        </div>

        {/* ✅ RESUME ACTIONS */}
       <div className="cp-resume-right">

  {/* Upload / Replace */}
  <label className="cp-resume-upload">
    <span className="cp-cloud">☁️</span>
    <span>{resumeFile ? "Replace Resume" : "Upload Resume"}</span>

    <input
      type="file"
      accept=".pdf,.doc,.docx"
      hidden
      onChange={(e) => {
        if (e.target.files?.[0]) {
          handleResumeUpload(e.target.files[0]);
        }
      }}
    />
  </label>

  {/* File info */}
  {resumeFile && (
    <div className="cp-resume-row">

      <span className="cp-resume-filename">
        📄 {resumeFile.name}
      </span>

      <div className="cp-resume-controls">
        <a
          href={resumeUrl!}
          download
          className="cp-download-btn"
          title="Download resume"
        >
          ⬇️ Download
        </a>

        <button
          className="cp-remove-btn"
          title="Remove resume"
          onClick={() => {
            setResumeFile(null);
            setResumeUrl(null);
          }}
        >
          ✕
        </button>
      </div>

    </div>
  )}
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
           {/* ✅ Family Details — CORRECT POSITION */}
<section className="cp-section">
  <h4>Family Details</h4>

  {familyMembers.length === 0 ? (
    <div className="cp-card">
      <p className="cp-muted">No family details available</p>
    </div>
  ) : (
    familyMembers.map((member) => (
      <div className="cp-card cp-family-card" key={member.id}>
        <div className="cp-family-row">
          <strong>{member.relation}</strong>
          <span>{member.name}</span>
          <span className="cp-phone">📞 {member.phone}</span>
        </div>
      </div>
    ))
  )}
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
    <div className="cp-modal large">

      {/* 🔒 FIXED HEADER */}
      <div className="cp-modal-fixed-header">
        <h3>Edit Profile</h3>

        <button
          className="cp-close"
          onClick={() => setIsEditing(false)}
        >
          ✕
        </button>
      </div>

      {/* 📜 SCROLLABLE BODY */}
      <div className="cp-modal-body">

        {/* PHOTO EDIT */}
        <div className="cp-photo-edit">
          <img src={profilePhoto} />

          <label className="cp-photo-btn">
            Change Photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setProfilePhoto(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </label>
        </div>

        {/* FORM GRID */}
        <div className="cp-edit-grid">

          <h4>Personal Details</h4>

          <div className="cp-field">
            <label>Location</label>
            <input
              className="cp-input"
              value={editLocation}
              onChange={(e) => setEditLocation(e.target.value)}
            />
          </div>

          <div className="cp-field">
            <label>Aadhaar</label>
            <input
              className="cp-input"
              value={editAadhaar}
              onChange={(e) => setEditAadhaar(e.target.value)}
            />
          </div>

          <div className="cp-field">
            <label>PAN</label>
            <input
              className="cp-input"
              value={editPan}
              onChange={(e) => setEditPan(e.target.value)}
            />
          </div>



   


       

          <h4>Education</h4>

          {editEducation.map((e, i) => (
            <div key={i} className="cp-edu-card">
              <div className="cp-field">
                <label>Degree</label>
                <input
                  className="cp-input"
                  value={e.degree}
                  onChange={(ev) => {
                    const copy = [...editEducation];
                    copy[i].degree = ev.target.value;
                    setEditEducation(copy);
                  }}
                />
              </div>

              <div className="cp-field">
                <label>Institute</label>
                <input
                  className="cp-input"
                  value={e.institute}
                  onChange={(ev) => {
                    const copy = [...editEducation];
                    copy[i].institute = ev.target.value;
                    setEditEducation(copy);
                  }}
                />
              </div>

              <div className="cp-field">
                <label>Percentage</label>
                <input
                  className="cp-input"
                  value={e.percentage}
                  onChange={(ev) => {
                    const copy = [...editEducation];
                    copy[i].percentage = ev.target.value;
                    setEditEducation(copy);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔒 FIXED FOOTER */}
      <div className="cp-modal-fixed-footer">
        <button
          className="cp-btn secondary"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>

        <button
          className="cp-btn primary"
          onClick={async () => {
            setLocation(editLocation);
            setAadhaar(editAadhaar);
            setPan(editPan);
            setEducation(editEducation);

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
  </div>
)}


    </div>
  );
};

export default CandidateProfile;
