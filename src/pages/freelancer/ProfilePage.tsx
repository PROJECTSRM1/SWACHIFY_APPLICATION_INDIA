import React from "react";
import { Card, Typography, Button } from "antd";
import "./ProfilePage.css";

import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  BankOutlined,
  GlobalOutlined,
  CreditCardOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

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
      <div className="profile-page-wrapper">
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
        <Card
          className="profile-card-base profile-personal-box"
          bordered={false}
        >
          <Title level={4}>Profile not found</Title>
        </Card>
      </div>
    );
  }

  return (
    <div className="profile-page-wrapper">

      {/* ✅ GO TO DASHBOARD (TOP) */}
      <div
        className="profile-dashboard-btn profile-dashboard-top"
        onClick={() => navigate("/freelancer-dashboard")}
      >
        <ArrowLeftOutlined />
        <span>Go to Dashboard</span>
      </div>

      <div className="profile-content-row">
        
        {/* Personal Details */}
        <Card
          className="profile-card-base profile-personal-box"
          bordered={false}
        >
          <div className="profile-avatar">
            <UserOutlined className="profile-avatar-icon" />
          </div>

          <h2 className="profile-section-title">Personal Details</h2>

          <div className="profile-info-row">
            <GlobalOutlined className="profile-info-icon" />
            <span>
              <b>Login ID:</b> {profile.loginId || "111702"}
            </span>
          </div>

          <div className="profile-info-row">
            <MailOutlined className="profile-info-icon" />
            <span>
              <b>Email:</b> {profile.email}
            </span>
          </div>

          <div className="profile-info-row">
            <PhoneOutlined className="profile-info-icon" />
            <span>
              <b>Phone:</b>{" "}
              {profile.phone || profile.mobile || "+91-8074407557"}
            </span>
          </div>

          <div className="profile-info-row">
            <EnvironmentOutlined className="profile-info-icon" />
            <span>
              <b>Address:</b> {profile.address || "Hyderabad"}
            </span>
          </div>
        </Card>

        {/* Bank Information */}
        <Card
          className="profile-card-base profile-bank-box"
          bordered={false}
        >
          <h2 className="profile-bank-title">Bank Information</h2>

          <div className="bank-details-grid">
            <div className="bank-detail-item">
              <div className="bank-circle-icon">
                <BankOutlined />
              </div>
              <span className="bank-label-text">Bank Name</span>
              <span className="bank-value-text">{bank.bankName}</span>
            </div>

            <div className="bank-detail-item">
              <div className="bank-circle-icon">
                <GlobalOutlined />
              </div>
              <span className="bank-label-text">IFSC Code</span>
              <span className="bank-value-text">{bank.ifsc}</span>
            </div>

            <div className="bank-detail-item">
              <div className="bank-circle-icon">
                <CreditCardOutlined />
              </div>
              <span className="bank-label-text">Account No</span>
              <span className="bank-value-text">{bank.accountNumber}</span>
            </div>
          </div>

          <div className="profile-support-note">
            To update your bank details or personal information, please contact
            our support team at{" "}
            <span
              className="profile-support-link"
              onClick={() => navigate("/freelancerlogin")}
            >
              support@swachifyindia.com
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
