import React, { useState, useMemo, useEffect } from 'react';
import { Layout, Card, Tag, Button, Typography, Select, Row, Col, Empty, message, Dropdown, Menu, Space } from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined, DollarCircleOutlined, UserOutlined, ArrowRightOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
// CORRECTED PATH: '../../../index.css'
// import '../../../index.css'; 

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// --- MOCK DATA STRUCTURES ---
interface Job {
  ticketId: string;
  title: string;
  category: string;
  status: 'In Progress' | 'Completed';
  location: string;
  date: string;
  price: number;
  customer?: string;
  description?: string;
  estimatedPrice?: number;
}

// Mock data (using localStorage for simplicity)
const MOCK_DATA: Job[] = [
  {
    ticketId: 'TKT003',
    title: 'Home Services - Plumbing',
    category: 'Plumbing',
    status: 'In Progress',
    location: 'HSR Layout, Bangalore',
    date: '2025-11-27',
    price: 800,
  },
  {
    ticketId: 'TKT001',
    title: 'Cleaning - Deep Cleaning',
    category: 'Cleaning',
    status: 'Completed',
    location: 'MG Road, Bangalore',
    date: '2025-11-20',
    price: 3000,
  },
];

const AVAILABLE_REQUESTS: Job[] = [
  {
    ticketId: 'TKT001',
    title: 'Cleaning - Deep Cleaning',
    category: 'Cleaning',
    status: 'In Progress',
    location: 'MG Road, Bangalore',
    date: '2025-11-28 at 10:00 AM',
    customer: 'Rajesh Kumar',
    description: '3BHK apartment deep cleaning required',
    estimatedPrice: 3000,
    price: 3000,
  },
  {
    ticketId: 'TKT004',
    title: 'Home Services - Plumbing',
    category: 'Plumbing',
    status: 'In Progress',
    location: 'Koramangala, Bangalore',
    date: '2025-11-29 at 2:00 PM',
    customer: 'Priya Sharma',
    description: 'Bathroom tap leaking issue',
    estimatedPrice: 500,
    price: 500,
  },
  {
    ticketId: 'TKT005',
    title: 'Home Services - Electrical',
    category: 'Electrical',
    status: 'In Progress',
    location: 'Whitefield, Bangalore',
    date: '2025-11-29 at 4:00 PM',
    customer: 'Amit Singh',
    description: 'Install new ceiling fan in living room.',
    estimatedPrice: 1200,
    price: 1200,
  },
];

// Utility to fetch user name from registration data (MOCK)
const getMockUserName = () => {
  try {
    // This key is set during registration/login flows in your code.
    const stored = localStorage.getItem('swachify_registered_user'); 
    if (stored) {
      const user = JSON.parse(stored);
      // Use fullname if available, otherwise email, otherwise default
      return user.fullname || user.email || "Freelancer";
    }
  } catch (e) {
    console.error("Failed to parse user data from localStorage", e);
  }
  return "User"; 
};


const MOCK_USER = {
  name: getMockUserName(),
  skills: ['Cleaning', 'Home Services', 'Plumbing', 'Electrical'],
};


// --- REDESIGNED HEADER COMPONENT with Profile Dropdown ---
const HeaderComponent: React.FC<{ userName: string, onLogout: () => void }> = ({ userName, onLogout }) => {
    
    // Dropdown menu content
    const menu = (
        <Menu 
            onClick={(e) => { if (e.key === 'logout') onLogout(); }} 
            style={{ borderRadius: '8px', overflow: 'hidden', minWidth: 150 }}
        >
            {/* Display the full name of the logged-in account */}
            <Menu.Item key="name" disabled style={{ fontWeight: '600', color: '#102030' }}>
                {userName}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ color: '#dc3545', fontWeight: '500' }}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Header className="sw-frd-header">
            <div className="sw-frd-logo-area">
                <Text strong className="sw-frd-logo-text">SWACHIFY INDIA</Text>
                <Text className="sw-frd-portal-text">Freelancer Portal</Text>
            </div>
            
            <div className="sw-frd-user-area">
                <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                    {/* Replaced 'Welcome, User' text with profile icon button */}
                    <Button 
                        type="default" 
                        className="sw-frd-profile-btn" 
                        icon={<UserOutlined style={{ fontSize: '18px' }} />}
                        style={{ padding: '0 12px', height: '40px', borderRadius: '8px' }}
                    >
                      Profile
                        {/* Optional arrow icon for dropdown hint */}
                        <DownOutlined style={{ fontSize: '12px', marginLeft: '4px' }} />
                    </Button>
                </Dropdown>
            </div>
        </Header>
    );
};

const UserSkills: React.FC<{ skills: string[] }> = ({ skills }) => (
  <div className="sw-frd-section">
    <Title level={4} className="sw-frd-section-title">My Skills</Title>
    <div className="sw-frd-skills-container">
      {skills.map(skill => (
        <Tag key={skill} className="sw-frd-skill-tag">{skill}</Tag>
      ))}
    </div>
  </div>
);

const JobCard: React.FC<{ job: Job, isActive: boolean, onMarkComplete: (id: string) => void }> = ({ job, isActive, onMarkComplete }) => (
  <Card className="sw-frd-job-card" bordered={false}>
    <Row justify="space-between" align="top">
      <Col xs={24} sm={18}>
        <div className="sw-frd-job-meta">
          <Text strong className="sw-frd-job-title">{job.title}</Text>
          <Tag color={isActive ? 'blue' : 'green'} className="sw-frd-status-tag">{job.status === 'In Progress' ? 'In Progress' : 'Completed'}</Tag>
          <Text className="sw-frd-price">₹{job.price.toLocaleString()}</Text>
        </div>
        <Text className="sw-frd-ticket-id">Ticket ID: {job.ticketId}</Text>
        
        <div className="sw-frd-details-row">
          <Text className="sw-frd-detail-item">
            <EnvironmentOutlined className="sw-frd-icon-sm" /> {job.location}
          </Text>
          <Text className="sw-frd-detail-item">
            <ClockCircleOutlined className="sw-frd-icon-sm" /> {job.date}
          </Text>
        </div>

        {isActive && (
          <Button type="primary" className="sw-frd-complete-btn" onClick={() => onMarkComplete(job.ticketId)}>
            Mark as Completed
          </Button>
        )}
      </Col>
    </Row>
  </Card>
);

const RequestCard: React.FC<{ request: Job, onAccept: (req: Job) => void }> = ({ request, onAccept }) => (
  <Card className="sw-frd-request-card" bordered={false}>
    <Row justify="space-between" align="top">
      <Col xs={24} sm={18}>
        <div className="sw-frd-request-header">
          <Text strong className="sw-frd-request-title">{request.title}</Text>
          <Text className="sw-frd-request-price">₹{request.estimatedPrice?.toLocaleString()}</Text>
        </div>
        <Text className="sw-frd-ticket-id">Ticket ID: {request.ticketId}</Text>
        <Text className="sw-frd-customer">Customer: {request.customer}</Text>
        <Text className="sw-frd-request-desc-text">{request.description}</Text>

        <div className="sw-frd-details-row">
          <Text className="sw-frd-detail-item">
            <EnvironmentOutlined className="sw-frd-icon-sm" /> {request.location}
          </Text>
          <Text className="sw-frd-detail-item">
            <ClockCircleOutlined className="sw-frd-icon-sm" /> {request.date}
          </Text>
          <Text className="sw-frd-detail-item sw-frd-estimated">
            <DollarCircleOutlined className="sw-frd-icon-sm" /> Estimated: ₹{request.estimatedPrice?.toLocaleString()}
          </Text>
        </div>
      </Col>
    </Row>
    <Button 
      type="primary" 
      danger 
      className="sw-frd-accept-btn" 
      onClick={() => onAccept(request)}
      icon={<ArrowRightOutlined />}
    >
      Accept Request
    </Button>
  </Card>
);

const FreelancerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeJobs, setActiveJobs] = useState<Job[]>(MOCK_DATA);
  const [requestFilter, setRequestFilter] = useState<'All Requests' | 'Matched to My Skills'>('All Requests');

  const { skills } = MOCK_USER;
  
  // Filter logic for available requests
  const filteredRequests = useMemo(() => {
    if (requestFilter === 'All Requests') {
      return AVAILABLE_REQUESTS;
    }
    const userSkillsSet = new Set(skills);
    return AVAILABLE_REQUESTS.filter(req => userSkillsSet.has(req.category));
  }, [requestFilter, skills]);

  const activeJobsInProgress = useMemo(() => activeJobs.filter(job => job.status === 'In Progress'), [activeJobs]);

  // Handler for marking a job as complete
  const handleMarkComplete = (id: string) => {
    setActiveJobs(prev => 
      prev.map(job => 
        job.ticketId === id ? { ...job, status: 'Completed' } : job
      )
    );
    message.success(`Job ${id} marked as completed.`);
  };

  // Handler for accepting a new request
  const handleAcceptRequest = (request: Job) => {
    // 1. Remove from available requests list (on client side)
    const updatedRequests = AVAILABLE_REQUESTS.filter(req => req.ticketId !== request.ticketId);
    // 2. Add to the active jobs list
    const newActiveJob: Job = {
      ...request,
      status: 'In Progress',
      // Reset date format for active view
      date: new Date().toISOString().slice(0, 10), 
      price: request.estimatedPrice || request.price,
    };
    setActiveJobs(prev => [...prev.filter(j => j.ticketId !== request.ticketId), newActiveJob]);
    
    // In a real application, this would involve an API call to reserve the job.
    message.success(`Request ${request.ticketId} accepted! It is now in your active jobs.`);
  };

  const handleLogout = () => {
    // Clear user session mock data
    localStorage.removeItem('freelancerLoggedIn');
    navigate('/freelancerlogin');
  };

  useEffect(() => {
    // Optional: Check if user is logged in
    const isLoggedIn = localStorage.getItem('freelancerLoggedIn');
    if (!isLoggedIn) {
      // navigate('/freelancerlogin');
    }
  }, [navigate]);

  return (
    <Layout className="sw-frd-layout-container">
      <HeaderComponent userName={MOCK_USER.name} onLogout={handleLogout} />
      
      <Content className="sw-frd-content-main">
        <UserSkills skills={skills} />

        {/* My Active Jobs */}
        <div className="sw-frd-section">
          <Title level={4} className="sw-frd-section-title">My Active Jobs</Title>
          <div className="sw-frd-active-jobs-container">
            {activeJobsInProgress.length > 0 ? (
              <JobCard job={activeJobsInProgress[0]} isActive={true} onMarkComplete={handleMarkComplete} />
            ) : (
              <Empty description="No jobs currently in progress." image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        </div>

        {/* Available Requests */}
        <div className="sw-frd-section">
          <Row justify="space-between" align="middle" className="sw-frd-available-header">
            <Title level={4} className="sw-frd-section-title sw-frd-requests-title">Available Requests</Title>
            <Select 
              value={requestFilter}
              onChange={(value) => setRequestFilter(value as any)}
              className="sw-frd-filter-select"
            >
              <Option value="All Requests">All Requests</Option>
              <Option value="Matched to My Skills">Matched to My Skills</Option>
            </Select>
          </Row>
          
          <div className="sw-frd-requests-list">
            {filteredRequests.length > 0 ? (
              filteredRequests.map(req => (
                <RequestCard key={req.ticketId} request={req} onAccept={handleAcceptRequest} />
              ))
            ) : (
              <Empty description={`No available requests matching "${requestFilter}" criteria.`} image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default FreelancerDashboard;