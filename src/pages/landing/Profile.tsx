import React, { useState } from "react";
import { Switch, Modal, Form, Input, Button } from "antd";
// import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile: React.FC = () => {
  const navigate = useNavigate();

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

      <div className="profile-card section-card">Education Qualification</div>
      <div className="profile-card section-card">NOC Details</div>
      <div className="profile-card section-card">
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
