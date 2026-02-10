import React, { useState } from "react";
import { Switch, Modal, Form, Input, Button } from "antd";
// import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  type SectionType = "education" | "noc" | "expertise" | null;

const [activeSection, setActiveSection] = useState<SectionType>(null);
const [nocClear, setNocClear] = useState<"yes" | "no" | null>(null);


  // mock user data
  const [user, setUser] = useState({
    username: "harishyadav555",
    email: "harishyadav555@gmail.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
  });

  // edit modal
  const [editOpen, setEditOpen] = useState(false);

  // dashboard config
  const [dashboard, setDashboard] = useState({
    wishlist: true,
    housing: true,
    education: true,
    marketplace: false,
    swachify: true,
  });

  // mock dynamic wishlist data
  const wishlistCount =
    (dashboard.education ? 2 : 0) +
    (dashboard.housing ? 1 : 0) +
    (dashboard.swachify ? 3 : 0);

  return (
 <div className="profile-page">
  {/* HEADER */}
<div className="profile-header">
  <button className="back-btn" onClick={() => navigate("/app/dashboard")}>
    ← Back
  </button>
  <h1>Profile Settings</h1>
</div>


  <div className="profile-layout">
    {/* LEFT COLUMN */}
    <div className="profile-left">
      <div className="profile-card profile-top">
        <img
          src="https://i.pravatar.cc/150"
          alt="profile"
          className="profile-avatar"
        />

        <div className="profile-info">
          <h3>{user.username}</h3>
          <p>{user.email}</p>
          <span className="edit-link" onClick={() => setEditOpen(true)}>
            Edit Profile
          </span>
        </div>
      </div>

<div
  className={`profile-card section-card ${activeSection === "education" ? "active" : ""}`}
  onClick={() => setActiveSection("education")}
>
  Education Qualification
</div>

<div
  className={`profile-card section-card ${activeSection === "noc" ? "active" : ""}`}
  onClick={() => setActiveSection("noc")}
>
  NOC Details
</div>

<div
  className={`profile-card section-card ${activeSection === "expertise" ? "active" : ""}`}
  onClick={() => setActiveSection("expertise")}
>
  Freelancer / Employee Expertise
</div>

    </div>

    {/* RIGHT COLUMN */}
    <div className="profile-right">
      <div className="profile-card">
        <h2>Basic Information</h2>

        <div className="info-row">
          <span>Phone</span>
          <span>{user.phone}</span>
        </div>

        <div className="info-row">
          <span>Location</span>
          <span>{user.location}</span>
        </div>
      </div>
{activeSection === "education" && (
  <div className="profile-card">
    <h2>Education Qualification</h2>

    <Input placeholder="Degree (e.g. B.Tech Computer Science)" />
    <Input placeholder="Institution (e.g. Stanford University)" style={{ marginTop: 12 }} />
    <Input placeholder="Percentage (e.g. 85%)" style={{ marginTop: 12 }} />
    <Input placeholder="Years (MM/YYYY - MM/YYYY)" style={{ marginTop: 12 }} />
    <Input placeholder="Internship Join Date" style={{ marginTop: 12 }} />
  </div>
)}
{activeSection === "noc" && (
  <div className="profile-card">
    <h2>NOC Details</h2>

<div className="noc-radio-group">
  <p className="noc-label">Candidate Case Clear</p>

  <div className="radio-options">
    <label>
      <input
        type="radio"
        name="noc"
        value="yes"
        checked={nocClear === "yes"}
        onChange={() => setNocClear("yes")}
      />
      Yes
    </label>

    <label>
      <input
        type="radio"
        name="noc"
        value="no"
        checked={nocClear === "no"}
        onChange={() => setNocClear("no")}
      />
      No
    </label>
  </div>
</div>



    {nocClear === "yes" && (
      <>
        <Input placeholder="Certificate Number" style={{ marginTop: 12 }} />
        <Input placeholder="Near Police Station" style={{ marginTop: 12 }} />
        <Input placeholder="Issue Year (e.g. 2024)" style={{ marginTop: 12 }} />
      </>
    )}

    {nocClear === "no" && (
      <>
        <Input placeholder="Case Number" style={{ marginTop: 12 }} />
        <Input placeholder="Near Police Station" style={{ marginTop: 12 }} />
        <Input placeholder="Issue Year (e.g. 2024)" style={{ marginTop: 12 }} />
      </>
    )}
  </div>
)}
{activeSection === "expertise" && (
  <div className="profile-card">
    <h2>Freelancer / Employee Expertise</h2>

    <Input placeholder="Services (UI Design, Web Dev...)" />
    <Input placeholder="Years of Experience (e.g. 5)" style={{ marginTop: 12 }} />
    <Input.TextArea
      placeholder="Additional Skills"
      rows={4}
      style={{ marginTop: 12 }}
    />

    <div className="radio-row" style={{ marginTop: 12 }}>
      <span>Driving License</span>
      <label>
        <input type="radio" name="dl" /> Yes
      </label>
      <label>
        <input type="radio" name="dl" /> No
      </label>
    </div>
  </div>
)}

      <div className="profile-card">
        <h2>Customize Dashboard</h2>
        <p className="muted">
          Enable services you want to see on your dashboard.
        </p>

        <div className="toggle-row">
          <span>Wishlist ({wishlistCount})</span>
<Switch
  checked={dashboard.wishlist}
  onChange={(checked) =>
    setDashboard((prev) => ({
      ...prev,
      wishlist: checked,
    }))
  }
/>
        </div>

        <div className="toggle-row">
          <span>Education</span>
<Switch
  checked={dashboard.education}
  onChange={(checked) =>
    setDashboard((prev) => ({
      ...prev,
      education: checked,
    }))
  }
/>
        </div>

        <div className="toggle-row">
          <span>Housing & Cleaning</span>
<Switch
  checked={dashboard.housing}
  onChange={(checked) =>
    setDashboard((prev) => ({
      ...prev,
      housing: checked,
    }))
  }
/>
        </div>

        <div className="toggle-row">
          <span>Marketplace</span>
<Switch
  checked={dashboard.marketplace}
  onChange={(checked) =>
    setDashboard((prev) => ({
      ...prev,
      marketplace: checked,
    }))
  }
/>
        </div>

        <div className="toggle-row">
          <span>Swachify</span>
<Switch
  checked={dashboard.swachify}
  onChange={(checked) =>
    setDashboard((prev) => ({
      ...prev,
      swachify: checked,
    }))
  }
/>
        </div>
      </div>
    </div>
  </div>

  <button
    className="logout-btn1"
    onClick={() => {
      localStorage.clear();
      navigate("/landing");
    }}
  >
    Logout
  </button>
  {/* EDIT PROFILE MODAL */}
<Modal
  open={editOpen}
  title="Edit Profile"
  onCancel={() => setEditOpen(false)}
  footer={null}
  destroyOnClose
>
  <Form
    layout="vertical"
    initialValues={user}
    onFinish={(values) => {
      setUser(values);
      setEditOpen(false);
    }}
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, type: "email" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item label="Phone" name="phone">
      <Input />
    </Form.Item>

    <Form.Item label="Location" name="location">
      <Input />
    </Form.Item>

    <Button type="primary" htmlType="submit" block>
      Save Changes
    </Button>
  </Form>
</Modal>

</div>

  );
};

export default Profile;
