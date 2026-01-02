import React from "react";
import { Card, Typography, Button } from "antd";
import "./profile.css";

import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  BankOutlined,
  GlobalOutlined,
  CreditCardOutlined,
  ArrowLeftOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const getStoredProfile = () => {
  try {
    const stored = localStorage.getItem("freelancer");
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
};

const getStoredBank = () => ({
  bankName: "HDFC Bank",
  ifsc: "HDFC0001234",
  accountNumber: "**** **** **** 1234",
});

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const profile = getStoredProfile();
  const bank = getStoredBank();

  if (!profile) {
    return (
      <div className="profile-container">
        <Button className="top-back-btn" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
        <Card className="profile-card profile-personal-card" bordered={false}>
          <Title level={4}>Profile not found</Title>
        </Card>
      </div>
    );
  }

  return (
    <div className="profile-container">

      {/* Top left back button */}
     

      {/* Cards Wrapper */}
      <div className="profile-row">

        {/* Personal Details Card (tall & narrow, shifted left) */}
        <Card className="profile-card profile-personal-card" bordered={false}>
          <div className="profile-icon-wrapper">
            <UserOutlined className="profile-icon" />
          </div>
          <h2 className="card-header">Personal Details</h2>

          <div className="profile-detail-line">
            <GlobalOutlined className="detail-icon"/> <span><b>Login ID:</b> {profile.loginId || "111702"}</span>
          </div>

          <div className="profile-detail-line">
            <MailOutlined className="detail-icon"/> <span><b>Email:</b> {profile.email}</span>
          </div>

          <div className="profile-detail-line">
            <PhoneOutlined className="detail-icon"/> <span><b>Phone:</b> {profile.phone || profile.mobile || "+91-8074407557"}</span>
          </div>

          <div className="profile-detail-line">
            <EnvironmentOutlined className="detail-icon"/> <span><b>Address:</b> {profile.address || "Hyderabad"}</span>
          </div>
        </Card>

        {/* Bank Information Card (wide & shorter height) */}
      <Card className="profile-card profile-bank-card" bordered={false}>
  <h2 className="profile-title">Bank Information</h2>

  <div className="bank-info-grid">
    <div className="bank-item">
      <div className="bank-icon-wrapper"><BankOutlined className="bank-icon"/></div>
      <span className="bank-label">Bank Name</span>
      <span className="bank-value">{bank.bankName}</span>
    </div>

    <div className="bank-item">
      <div className="bank-icon-wrapper"><GlobalOutlined className="bank-icon"/></div>
      <span className="bank-label">IFSC Code</span>
      <span className="bank-value">{bank.ifsc}</span>
    </div>

    <div className="bank-item">
      <div className="bank-icon-wrapper"><CreditCardOutlined className="bank-icon"/></div>
      <span className="bank-label">Account No</span>
      <span className="bank-value">{bank.accountNumber}</span>
    </div>
  </div>

  {/* ✅ ONLY change is here */}
  <div className="bank-support-text">
  To update your bank details or personal information, please contact our support team at{" "}
  <b className="support-link" onClick={() => navigate("/freelancerlogin")}>
    support@swachifyindia.com
  </b>
</div>


</Card>

<div className="dashboard-nav-block" onClick={() => navigate("/freelancer-dashboard")}>
  <ArrowLeftOutlined />
  <span>Go to Dashboard</span>
</div>



      </div>

    </div>
  );
};

export default ProfilePage;
