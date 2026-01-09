import React, { useState } from "react";
import { Avatar, Button, Input, Tag, Upload, message } from "antd";
import {
  UserOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "../pages/profile.css";

interface Education {
  degree: string;
  institution: string;
  percentage: string;
}

interface Certificate {
  name: string;
  issuedBy: string;
  year: string;
}

const ProfilePage: React.FC = () => {
  const [editPersonal, setEditPersonal] = useState(false);
  const [editEducation, setEditEducation] = useState(false);
  const [editCertificate, setEditCertificate] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "sdfgbnm@gmail.com",
    mobile: "9876543210",
    aadhaar: "123456789012",
    location: "Bangalore",
  });

  const [educationForm, setEducationForm] = useState<Education>({
    degree: "",
    institution: "",
    percentage: "",
  });

  const [educations, setEducations] = useState<Education[]>([]);

  const [certificateForm, setCertificateForm] = useState<Certificate>({
    name: "",
    issuedBy: "",
    year: "",
  });

  const [certificates, setCertificates] = useState<Certificate[]>([]);

  const [editNoc, setEditNoc] = useState(false);

const [noc, setNoc] = useState({
  certificateNumber: "",
  policeStation: "",
  issueYear: "",
});

const handleSaveNoc = () => {
  setEditNoc(false);
};



  const handleAvatarUpload = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target?.result as string);
      message.success("Profile image updated!");
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleProfileChange = (key: string, value: string) => {
    setProfile({ ...profile, [key]: value });
  };

  const addEducation = () => {
    if (!educationForm.degree || !educationForm.institution) return;
    setEducations([...educations, educationForm]);
    setEducationForm({ degree: "", institution: "", percentage: "" });
  };

  const removeEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const addCertificate = () => {
    if (!certificateForm.name || !certificateForm.issuedBy) return;
    setCertificates([...certificates, certificateForm]);
    setCertificateForm({ name: "", issuedBy: "", year: "" });
  };

  const removeCertificate = (index: number) => {
    setCertificates(certificates.filter((_, i) => i !== index));
  };

  return (
    <div className="profile-wrapper">
      {/* HEADER */}
      <div className="profile-header">
        <div className="avatar-wrapper">
          <Upload beforeUpload={handleAvatarUpload} showUploadList={false}>
            <Avatar
              size={88}
              src={avatar || undefined}
              icon={!avatar && <UserOutlined />}
              className="avatar-img"
            />
            <div className="avatar-upload-btn">
              <UploadOutlined />
            </div>
          </Upload>
        </div>
        <h2>{profile.firstName} {profile.lastName}</h2>
        <p>{profile.email}</p>
      </div>

      {/* PERSONAL INFO */}
      <div className="profile-card">
        <div className="card-header">
          <h3>Personal Information</h3>
          <EditOutlined onClick={() => setEditPersonal(!editPersonal)} />
        </div>

        {!editPersonal ? (
<div className="info-grid">
            <Info label="First Name" value={profile.firstName} />
            <Info label="Last Name" value={profile.lastName} />
            <Info label="Email" value={profile.email} />
            <Info label="Mobile Number" value={profile.mobile} />
            <Info label="Aadhaar Number" value={profile.aadhaar} />
            <Info label="Location" value={profile.location} />
            <Info label="Work Type" value="assigning-for-work" />
            <div>
              <span className="label">Services</span>
              <Tag className="service-tag">Cleaning & Home Services</Tag>
            </div>
          </div>
        ) : (
          <div className="edit-grid">
            <Input value={profile.firstName} onChange={(e) => handleProfileChange("firstName", e.target.value)} />
            <Input value={profile.lastName} onChange={(e) => handleProfileChange("lastName", e.target.value)} />
            <Input value={profile.email} disabled />
            <Input value={profile.mobile} onChange={(e) => handleProfileChange("mobile", e.target.value)} />
            <Input value={profile.aadhaar} onChange={(e) => handleProfileChange("aadhaar", e.target.value)} />
            <Input value={profile.location} onChange={(e) => handleProfileChange("location", e.target.value)} />
            <Button type="primary" className="save-btn" onClick={() => setEditPersonal(false)}>
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* EDUCATION */}
      <div className="profile-card">
        <div className="card-header">
          <h3>Educational Qualification</h3>
          <EditOutlined onClick={() => setEditEducation(!editEducation)} />
        </div>

        {!editEducation && educations.length === 0 && (
          <p className="empty-text">No educational qualification added yet.</p>
        )}

        {editEducation && (
          <div className="education-box">
            <Input
              placeholder="Degree"
              value={educationForm.degree}
              onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
            />
            <Input
              placeholder="Institution"
              value={educationForm.institution}
              onChange={(e) => setEducationForm({ ...educationForm, institution: e.target.value })}
            />
            <Input
              placeholder="Percentage"
              value={educationForm.percentage}
              onChange={(e) => setEducationForm({ ...educationForm, percentage: e.target.value })}
            />
            <Button type="primary" onClick={addEducation}>Add Education</Button>
          </div>
        )}

        {educations.map((edu, i) => (
          <div key={i} className="education-item">
            <div>
              <strong>{edu.degree}</strong>
              <p>{edu.institution} • {edu.percentage}</p>
            </div>
            <span className="remove-text" onClick={() => removeEducation(i)}>Remove</span>
          </div>
        ))}
      </div>

      {/* CERTIFICATES */}
      <div className="profile-card">
        <div className="card-header">
          <h3>Certificates</h3>
          <EditOutlined onClick={() => setEditCertificate(!editCertificate)} />
        </div>

        {!editCertificate && certificates.length === 0 && (
          <p className="empty-text">No certificates added yet.</p>
        )}

        {editCertificate && (
          <div className="education-box">
            <Input placeholder="Certificate Name" value={certificateForm.name}
              onChange={(e) => setCertificateForm({ ...certificateForm, name: e.target.value })} />
            <Input placeholder="Issued By" value={certificateForm.issuedBy}
              onChange={(e) => setCertificateForm({ ...certificateForm, issuedBy: e.target.value })} />
            <Input placeholder="Year" value={certificateForm.year}
              onChange={(e) => setCertificateForm({ ...certificateForm, year: e.target.value })} />
            <Button type="primary" onClick={addCertificate}>Add Certificate</Button>
          </div>
        )}

        {certificates.map((c, i) => (
          <div key={i} className="education-item">
            <div>
              <strong>{c.name}</strong>
              <p>{c.issuedBy} • {c.year}</p>
            </div>
            <span className="remove-text" onClick={() => removeCertificate(i)}>Remove</span>
          </div>
        ))}
      </div>
      {/* ===== NO OBJECTION CERTIFICATE (NOC) ===== */}
<div className="profile-card">
  <div className="card-header">
    <h3>No Objection Certificate (NOC)</h3>
    <EditOutlined onClick={() => setEditNoc(!editNoc)} />
  </div>

  {!editNoc ? (
    <div className="info-grid info-grid-3">
      <Info
        label="Certificate Number"
        value={noc.certificateNumber || "Not provided"}
      />
      <Info
        label="Near Police Station"
        value={noc.policeStation || "Not provided"}
      />
      <Info
        label="Issue Year"
        value={noc.issueYear || "Not provided"}
      />
    </div>
  ) : (
    <div className="edit-grid">
      <Input
        placeholder="Enter certificate number"
        value={noc.certificateNumber}
        onChange={(e) =>
          setNoc({ ...noc, certificateNumber: e.target.value })
        }
      />
      <Input
        placeholder="Enter police station name"
        value={noc.policeStation}
        onChange={(e) =>
          setNoc({ ...noc, policeStation: e.target.value })
        }
      />
      <Input
        placeholder="Enter issue year"
        value={noc.issueYear}
        onChange={(e) =>
          setNoc({ ...noc, issueYear: e.target.value })
        }
      />

      <Button
        type="primary"
        className="save-btn"
        onClick={handleSaveNoc}
      >
        Save Changes
      </Button>
    </div>
  )}
</div>

    </div>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="label">{label}</span>
    <p className="value">{value}</p>
  </div>
);

export default ProfilePage;

