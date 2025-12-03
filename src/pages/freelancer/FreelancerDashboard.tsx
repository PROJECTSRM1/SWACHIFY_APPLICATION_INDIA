// src/pages/FreelancerDashboard.tsx
import React, { useState, useMemo, useEffect } from 'react';
import {
  Layout,
  Card,
  Tag,
  Button,
  Typography,
  Select,
  Row,
  Col,
  Empty,
  message,
  Dropdown,
  Menu,
  Space,
} from 'antd';
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined,
  UserOutlined,
  ArrowRightOutlined,
  LogoutOutlined,
  StarFilled,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
// import '../../../index.css'; // keep this if needed
// import './FreelancerDashboard.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// --- TYPES ---
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

// --- MOCK DATA ---
const INITIAL_JOBS: Job[] = [
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

const INITIAL_AVAILABLE_REQUESTS: Job[] = [
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
    const stored = localStorage.getItem('swachify_registered_user');
    if (stored) {
      const user = JSON.parse(stored);
      return user.fullname || user.email || 'Freelancer';
    }
  } catch (e) {
    console.error('Failed to parse user data from localStorage', e);
  }
  return 'User';
};

const MOCK_USER = {
  name: getMockUserName(),
  skills: ['Cleaning', 'Home Services', 'Plumbing', 'Electrical'],
};

// --- HEADER WITH PROFILE DROPDOWN ---
const HeaderComponent: React.FC<{ userName: string; onLogout: () => void }> = ({
  userName,
  onLogout,
}) => {
  const menu = (
    <Menu
      onClick={(e) => {
        if (e.key === 'logout') onLogout();
      }}
      style={{ borderRadius: '8px', overflow: 'hidden', minWidth: 180 }}
    >
      <Menu.Item key="name" disabled style={{ fontWeight: 600, color: '#102030' }}>
        {userName}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ color: '#dc3545', fontWeight: 500 }}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="sw-frd-header">
      <div className="sw-frd-logo-area">
        <Text strong className="sw-frd-logo-text">
          SWACHIFY INDIA
        </Text>
        <Text className="sw-frd-portal-text">Freelancer Portal</Text>
      </div>

      <div className="sw-frd-user-area">
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <Button
            type="default"
            className="sw-frd-profile-btn"
            icon={<UserOutlined style={{ fontSize: 18 }} />}
          >
            {/* <DownOutlined style={{ fontSize: 10, marginLeft: 0 }} /> */}
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

// --- SMALL COMPONENTS ---
const UserSkills: React.FC<{ skills: string[] }> = ({ skills }) => (
  <div className="sw-frd-section">
    <div className="sw-frd-section-header">
      <Title level={4} className="sw-frd-section-title">
        My Skills
      </Title>
      <Text className="sw-frd-section-subtitle">Used to match you with the right jobs</Text>
    </div>
    <div className="sw-frd-skills-container">
      {skills.map((skill) => (
        <Tag key={skill} className="sw-frd-skill-tag">
          {skill}
        </Tag>
      ))}
    </div>
  </div>
);

const JobCard: React.FC<{ job: Job; isActive: boolean; onMarkComplete?: (id: string) => void }> = ({
  job,
  isActive,
  onMarkComplete,
}) => (
  <Card className="sw-frd-job-card" bordered={false}>
    <Row justify="space-between" align="top">
      <Col xs={24} sm={18}>
        <div className="sw-frd-job-meta">
          <Text strong className="sw-frd-job-title">
            {job.title}
          </Text>
          <Tag color={isActive ? 'blue' : 'green'} className="sw-frd-status-tag">
            {job.status === 'In Progress' ? 'In Progress' : 'Completed'}
          </Tag>
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

        {isActive && onMarkComplete && (
          <Button
            type="primary"
            className="sw-frd-complete-btn"
            onClick={() => onMarkComplete(job.ticketId)}
          >
            Mark as Completed
          </Button>
        )}
      </Col>
    </Row>
  </Card>
);

const RequestCard: React.FC<{ request: Job; onAccept: (req: Job) => void }> = ({
  request,
  onAccept,
}) => (
  <Card className="sw-frd-request-card" bordered={false}>
    <Row justify="space-between" align="top">
      <Col xs={24} sm={18}>
        <div className="sw-frd-request-header">
          <Text strong className="sw-frd-request-title">
            {request.title}
          </Text>
          <Text className="sw-frd-request-price">
            ₹{(request.estimatedPrice || request.price).toLocaleString()}
          </Text>
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
            <DollarCircleOutlined className="sw-frd-icon-sm" /> Estimated:{' '}
            ₹{(request.estimatedPrice || request.price).toLocaleString()}
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

// --- MAIN DASHBOARD ---
const FreelancerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeJobs, setActiveJobs] = useState<Job[]>(INITIAL_JOBS);
  const [availableRequests, setAvailableRequests] =
    useState<Job[]>(INITIAL_AVAILABLE_REQUESTS);

  const [requestFilter, setRequestFilter] = useState<
    'All Requests' | 'Matched to My Skills'
  >('All Requests');
  const [requestSort, setRequestSort] = useState<
    'Newest First' | 'Highest Price'
  >('Newest First');

  const { skills } = MOCK_USER;

  // --- METRICS / KPIs ---
  const activeJobsInProgress = useMemo(
    () => activeJobs.filter((job) => job.status === 'In Progress'),
    [activeJobs],
  );

  const completedJobs = useMemo(
    () => activeJobs.filter((job) => job.status === 'Completed'),
    [activeJobs],
  );

  const totalEarnings = useMemo(
    () => completedJobs.reduce((sum, job) => sum + job.price, 0),
    [completedJobs],
  );

  // const completionRate = useMemo(() => {
  //   const total = activeJobs.length;
  //   if (!total) return 0;
  //   return Math.round((completedJobs.length / total) * 100);
  // }, [activeJobs.length, completedJobs.length]);

  // Mock rating for UI – in a real app this would come from API
  const averageRating = 4.8;
  const upcomingJob = activeJobsInProgress[0];

  // --- FILTER & SORT AVAILABLE REQUESTS ---
  const filteredRequests = useMemo(() => {
    let list = [...availableRequests];

    if (requestFilter === 'Matched to My Skills') {
      const userSkillsSet = new Set(skills);
      list = list.filter((req) => userSkillsSet.has(req.category));
    }

    if (requestSort === 'Highest Price') {
      list.sort((a, b) => (b.estimatedPrice || b.price) - (a.estimatedPrice || a.price));
    } else {
      // Newest First - we just keep original order here; in real app use a date field
      list = list;
    }

    return list;
  }, [availableRequests, requestFilter, requestSort, skills]);

  // --- ACTION HANDLERS ---
  const handleMarkComplete = (id: string) => {
    setActiveJobs((prev) =>
      prev.map((job) =>
        job.ticketId === id ? { ...job, status: 'Completed' } : job,
      ),
    );
    message.success(`Job ${id} marked as completed.`);
  };

  const handleAcceptRequest = (request: Job) => {
    setAvailableRequests((prev) =>
      prev.filter((req) => req.ticketId !== request.ticketId),
    );

    const newActiveJob: Job = {
      ...request,
      status: 'In Progress',
      date: new Date().toISOString().slice(0, 10),
      price: request.estimatedPrice || request.price,
    };

    setActiveJobs((prev) => [
      ...prev.filter((j) => j.ticketId !== request.ticketId),
      newActiveJob,
    ]);

    message.success(
      `Request ${request.ticketId} accepted! It is now in your active jobs.`,
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('freelancerLoggedIn');
    navigate('/freelancerlogin');
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('freelancerLoggedIn');
    if (!isLoggedIn) {
      // navigate('/freelancerlogin');
    }
  }, [navigate]);

  return (
    <Layout className="sw-frd-layout-container">
      <HeaderComponent userName={MOCK_USER.name} onLogout={handleLogout} />

      <Content className="sw-frd-content-main">
        {/* OVERVIEW METRICS */}
        <section className="sw-frd-section sw-frd-overview-section">
          <div className="sw-frd-section-header">
            <Title level={4} className="sw-frd-section-title">
              Dashboard Overview
            </Title>
            <Text className="sw-frd-section-subtitle">
              Track your performance at a glance
            </Text>
          </div>

          <div className="sw-frd-overview-grid">
            <Card className="sw-frd-overview-card" bordered={false}>
              <Text className="sw-frd-overview-label">Total Earnings</Text>
              <div className="sw-frd-overview-value-row">
                <Text className="sw-frd-overview-value">
                  ₹{totalEarnings.toLocaleString()}
                </Text>
              </div>
              <Text className="sw-frd-overview-subtext">
                From {completedJobs.length} completed jobs
              </Text>
            </Card>

            <Card className="sw-frd-overview-card" bordered={false}>
              <Text className="sw-frd-overview-label">Total Completed Jobs</Text>
              <div className="sw-frd-overview-value-row">
                <Text className="sw-frd-overview-value">
                  {activeJobsInProgress.length}
                </Text>
              </div>
              <Text className="sw-frd-overview-subtext">
                Next job:{' '}
                {upcomingJob
                  ? `${upcomingJob.title} • ${upcomingJob.date}`
                  : 'No upcoming jobs'}
              </Text>
            </Card>

            <Card className="sw-frd-overview-card" bordered={false}>
              <Text className="sw-frd-overview-label">Available Jobs</Text>
              <div className="sw-frd-overview-progress">
                {/* <Progress
                  percent={completionRate}
                  size="small"
                  strokeWidth={10}
                  showInfo={false}
                /> */}
              </div>
              <div className="sw-frd-overview-value-row">
                <Text className="sw-frd-overview-value">
                  {/* {completionRate}% */}
                  {availableRequests.length}
                </Text>
              
              </div>
              <Text className="sw-frd-overview-subtext">
                Available jobs to accept {}
              </Text>
            </Card>

            <Card className="sw-frd-overview-card" bordered={false}>
              <Text className="sw-frd-overview-label">Client Rating</Text>
              <div className="sw-frd-overview-value-row">
                <Space align="center">
                  <StarFilled className="sw-frd-rating-star" />
                  <Text className="sw-frd-overview-value">
                    {averageRating.toFixed(1)}
                  </Text>
                </Space>
              </div>
              <Text className="sw-frd-overview-subtext">
                Based on recent jobs (mock data)
              </Text>
            </Card>
          </div>
        </section>

        {/* SKILLS */}
        <UserSkills skills={skills} />

        {/* ACTIVE JOBS */}
        <section className="sw-frd-section">
          <div className="sw-frd-section-header">
            <Title level={4} className="sw-frd-section-title">
              My Active Jobs
            </Title>
            <Text className="sw-frd-section-subtitle">
              Jobs you are currently working on
            </Text>
          </div>

          <div className="sw-frd-active-jobs-container">
            {activeJobsInProgress.length > 0 ? (
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                {activeJobsInProgress.map((job) => (
                  <JobCard
                    key={job.ticketId}
                    job={job}
                    isActive={true}
                    onMarkComplete={handleMarkComplete}
                  />
                ))}
              </Space>
            ) : (
              <Empty
                description="No jobs currently in progress."
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </div>
        </section>

        {/* RECENTLY COMPLETED */}
        <section className="sw-frd-section">
          <div className="sw-frd-section-header">
            <Title level={4} className="sw-frd-section-title">
              Recently Completed
            </Title>
            <Text className="sw-frd-section-subtitle">
              Last few jobs you finished
            </Text>
          </div>

          {completedJobs.length > 0 ? (
            <Space direction="vertical" size={16} style={{ width: '100%' }}>
              {completedJobs
                .slice()
                .reverse()
                .slice(0, 3)
                .map((job) => (
                  <JobCard key={job.ticketId} job={job} isActive={false} />
                ))}
            </Space>
          ) : (
            <Empty
              description="You haven't completed any jobs yet."
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </section>

        {/* AVAILABLE REQUESTS */}
        <section className="sw-frd-section">
          <Row
            justify="space-between"
            align="middle"
            className="sw-frd-available-header"
          >
            <div>
              <Title
                level={4}
                className="sw-frd-section-title sw-frd-requests-title"
              >
                Available Requests
              </Title>
              <Text className="sw-frd-section-subtitle">
                Accept a request to move it into your active jobs
              </Text>
            </div>

            <Space size={12} className="sw-frd-filter-bar">
              <Select
                value={requestFilter}
                onChange={(value) => setRequestFilter(value as any)}
                className="sw-frd-filter-select"
              >
                <Option value="All Requests">All Requests</Option>
                <Option value="Matched to My Skills">
                  Matched to My Skills
                </Option>
              </Select>

              <Select
                value={requestSort}
                onChange={(value) => setRequestSort(value as any)}
                className="sw-frd-sort-select"
              >
                <Option value="Newest First">Newest First</Option>
                <Option value="Highest Price">Highest Price</Option>
              </Select>
            </Space>
          </Row>

          <div className="sw-frd-requests-list">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((req) => (
                <RequestCard
                  key={req.ticketId}
                  request={req}
                  onAccept={handleAcceptRequest}
                />
              ))
            ) : (
              <Empty
                description={`No available requests matching "${requestFilter}" criteria.`}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </div>
        </section>
      </Content>
    </Layout>
  );
};

export default FreelancerDashboard;
