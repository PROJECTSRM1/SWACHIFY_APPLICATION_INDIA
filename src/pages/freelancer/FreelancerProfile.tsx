import React, { useState, useEffect } from 'react';
import { Layout, Card, Typography, Button, Space, Tag, Row, Col, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, LogoutOutlined, ToolOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


const { Content } = Layout;
const { Title, Text } = Typography;

interface UserData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
}

// Utility to load user data from localStorage (same structure as saved in Registration)
const loadUserData = (): UserData | null => {
  try {
    const stored = localStorage.getItem('swachify_registered_user');
    if (stored) {
      return JSON.parse(stored) as UserData;
    }
  } catch (e) {
    console.error("Failed to parse user data:", e);
  }
  return null;
};


const FreelancerProfile: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const data = loadUserData();
    if (data) {
      setUserData(data);
    } else {
      message.error("User data not found. Please log in.");
      navigate('/freelancerlogin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('freelancerLoggedIn');
    localStorage.removeItem('swachify_registered_user'); // Clear user data as well
    navigate('/freelancerlogin');
  };

  if (!userData) {
    return (
      <Content className="sw-frd-content-main" style={{ textAlign: 'center', padding: '50px' }}>
        <Title level={4}>Loading Profile...</Title>
      </Content>
    );
  }

  return (
    <Content className="sw-frd-content-main">
      <Button 
        onClick={() => navigate('/app/freelancer-dashboard')}
        icon={<ArrowLeftOutlined />}
        type="default"
        style={{ marginBottom: 24, borderRadius: 8 }}
      >
        Back to Dashboard
      </Button>

      <Card 
        title={<Title level={3} style={{ margin: 0 }}>Freelancer Profile</Title>}
        extra={<Button danger onClick={handleLogout} icon={<LogoutOutlined />}>Logout</Button>}
        bordered={false}
        className="sw-frd-section"
        style={{ maxWidth: 800, margin: '0 auto' }}
      >
        <Row gutter={[24, 24]} style={{ marginBottom: 20 }}>
          <Col span={24}>
            <Title level={4} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: 8, marginBottom: 16 }}>
              Personal Details
            </Title>
          </Col>

          <Col xs={24} md={12}>
            <Space direction="vertical" size={4}>
              <Text strong><UserOutlined style={{ marginRight: 8 }} /> Full Name:</Text>
              <Text>{userData.fullName}</Text>
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Space direction="vertical" size={4}>
              <Text strong><MailOutlined style={{ marginRight: 8 }} /> Email:</Text>
              <Text>{userData.email}</Text>
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Space direction="vertical" size={4}>
              <Text strong><PhoneOutlined style={{ marginRight: 8 }} /> Phone:</Text>
              <Text>{userData.phone}</Text>
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Space direction="vertical" size={4}>
              <Text strong><EnvironmentOutlined style={{ marginRight: 8 }} /> Location:</Text>
              <Text>{userData.location}</Text>
            </Space>
          </Col>
        </Row>

        <Title level={4} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: 8, marginBottom: 16 }}>
          <ToolOutlined style={{ marginRight: 8 }} /> Expertise
        </Title>
        
        <Space wrap size={[0, 8]}>
          {userData.skills.length > 0 ? (
            userData.skills.map(skill => (
              <Tag key={skill} color="blue" style={{ fontSize: '14px', padding: '6px 12px', borderRadius: '16px' }}>{skill}</Tag>
            ))
          ) : (
            <Text italic>No skills selected.</Text>
          )}
        </Space>
      </Card>
    </Content>
  );
};

export default FreelancerProfile;