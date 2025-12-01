import { useNavigate } from "react-router-dom";
import  { useState } from "react";

import {
  // SearchOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined,
  StarOutlined,
  UserOutlined,
  ArrowRightOutlined,
  SafetyCertificateOutlined,
  RiseOutlined,
  PhoneOutlined,
  MailOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

import {
  Layout,
  Input,
  Button,
  Row,
  Col,
  Card,
  Tag,
  Statistic,
  Menu,
  Modal,
  Tabs,
  Form,
  // Checkbox,
  message,
} from "antd";

import "./Freelancer.css";

const {  Content } = Layout;
const { TabPane } = Tabs;

// Navigation items from Home Service
const navItems = [
  { key: "home", label: <a href="/landing">Home</a> },
  { key: "cleaning", label: <a href="/cleaningservice">Cleaning</a> },
  { key: "packers", label: <a href="/LandingPackers">Packers & Movers</a> },
  { key: "home_services", label: <a href="/home_service">Home Services</a> },
  { key: "rentals", label: <a href="/rentals">Rentals</a> },
  { key: "commercial", label: <a href="/commercial-plots">Buy&Sale Properties</a> },
  { key: "materials", label: <a href="/ConstructionMaterials">Construction Materials</a> },
  { key: "freelancer", label: <a href="/Freelancer">Freelancer</a> },
];

// Categories
const serviceCategories = [
  { icon: "🏠", name: "Home Services", count: 156 },
  { icon: "🔧", name: "Repair & Fix", count: 89 },
  { icon: "🎨", name: "Creative Work", count: 234 },
  { icon: "💼", name: "Business Help", count: 178 },
  { icon: "🚚", name: "Moving & Shifting", count: 67 },
  { icon: "🧹", name: "Cleaning Services", count: 145 },
];

// Live Requests
const liveRequests = [
  {
    id: 1,
    title: "House Shifting - Packing",
    location: "Gachibowli, Hyderabad",
    price: "₹1200",
    timeAgo: "10 min ago",
    urgency: "high",
    category: "Moving",
    description: "Need help packing and loading luggage for a 2BHK.",
  },
  {
    id: 2,
    title: "Deep Cleaning - Apartment",
    location: "Banjara Hills, Hyderabad",
    price: "₹1200",
    timeAgo: "35 min ago",
    urgency: "medium",
    category: "Cleaning",
    description: "Deep cleaning required for 3BHK apartment.",
  },
  {
    id: 3,
    title: "Plumbing Repair",
    location: "Madhapur, Hyderabad",
    price: "₹800",
    timeAgo: "1 hour ago",
    urgency: "high",
    category: "Repair",
    description: "Fix leaking kitchen sink and bathroom tap.",
  },
];

const stats = [
  { icon: <RiseOutlined />, label: "Active Tasks", value: "2,456+" },
  { icon: <UserOutlined />, label: "Freelancers", value: "10,000+" },
  { icon: <StarOutlined />, label: "Avg Rating", value: "4.8" },
  { icon: <SafetyCertificateOutlined />, label: "Verified Jobs", value: "100%" },
];

export default function Freelancer() {
  const navigate = useNavigate();

  // -----------------------------
  // Sign Up / Login Modal (copied)
  // -----------------------------
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const onLoginFinish = () => {
    message.success("Logged in (demo)");
    setAuthModalVisible(false);
  };

  const onRegisterFinish = () => {
    message.success("Registered (demo)");
    setAuthModalVisible(false);
  };

  return (
    <Layout className="swf-layout">

      {/* --------------------------- */}
      {/*   HOME-SERVICE HEADER HERE   */}
      {/* --------------------------- */}
      <header className="hs-navbar">
        <div className="hs-navbar-logo">
          <span className="hs-logo-text">SWACHIFY INDIA</span>
        </div>

        <Menu
          mode="horizontal"
          selectedKeys={["freelancer"]}
          className="hs-navbar-menu"
          items={navItems}
        />

        <Button
          type="primary"
          className="hs-contact-btn"
          onClick={() => {
            setActiveTab("login");
            setAuthModalVisible(true);
          }}
        >
          Sign Up
        </Button>
      </header>

      {/* Modal */}
      <Modal
        centered
        open={authModalVisible}
        footer={null}
        onCancel={() => setAuthModalVisible(false)}
        width={420}
      >
        <Tabs activeKey={activeTab} onChange={(k) => setActiveTab(k)}>
          <TabPane tab="Login" key="login">
            <Form form={loginForm} layout="vertical" onFinish={onLoginFinish}>
              <Form.Item name="identifier" label="Email or Phone" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Input.Password />
              </Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form>
          </TabPane>

          <TabPane tab="Register" key="register">
            <Form form={registerForm} layout="vertical" onFinish={onRegisterFinish}>
              <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Input.Password />
              </Form.Item>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>

      {/* --------------------------- */}
      {/*          HERO SECTION        */}
      {/* --------------------------- */}

      <div className="sw-fr-hero">
        <div className="sw-fr-hero-overlay"></div>

        <Content className="sw-fr-hero-content">
          <h1 className="sw-fr-hero-title">
            Find the Right Tasks <br /> That Match Your Skills
          </h1>

          <p className="sw-fr-hero-sub">Verified jobs. Nearby opportunities. Instant earning.</p>

          <div className="sw-fr-hero-buttons">
            <Button
              className="sw-fr-bt1"
              type="default"
              size="large"
              shape="round"
              onClick={() => navigate("/servicerequests")}
              icon={<ArrowRightOutlined />}
            >
              View Live Requests
            </Button>

            <Button
            className="sw-fr-bt1"
              type="default"
              size="large"
              shape="round"
              onClick={() => navigate("/freelancerregistration")}
            >
              Become a Freelancer
            </Button>
          </div>

          <Row gutter={16} className="sw-fr-stats">
            {stats.map((s, index) => (
              <Col xs={12} md={6} key={index}>
                <Card bordered={false} className="sw-fr-stat-card">
                  <Statistic
                    title={s.label}
                    value={s.value}
                    prefix={s.icon}
                    valueStyle={{ color: "#fff" }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </div>

      {/* Categories */}
      <Content className="sw-fr-section">
        <h2 className="sw-fr-section-title">Browse Categories</h2>

        <Row gutter={[20, 20]}>
          {serviceCategories.map((cat, i) => (
            <Col xs={12} sm={8} md={6} lg={4} key={i}>
              <Card hoverable className="sw-fr-category-card">
                <div className="sw-fr-category-icon">{cat.icon}</div>
                <h4 className="sw-fr-category-name">{cat.name}</h4>
                <p className="sw-fr-category-count">{cat.count} jobs</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>

      {/* Live Requests */}
      <Content className="sw-fr-section">
        <div className="sw-fr-section-header">
          <div>
            <h2>Live Service Requests Near You</h2>
            <p>Accept a task and start earning instantly</p>
          </div>

          <Button
            type="primary"
            shape="round"
            icon={<ArrowRightOutlined />}
            onClick={() => navigate("/servicerequests")}
          >
            View All
          </Button>
        </div>

        <Row gutter={[20, 20]}>
          {liveRequests.map((req) => (
            <Col xs={24} md={12} lg={8} key={req.id}>
              <Card hoverable className="sw-fr-request-card">
                <Tag
                  color={
                    req.urgency === "high"
                      ? "red"
                      : req.urgency === "medium"
                      ? "gold"
                      : "green"
                  }
                  className="sw-fr-urgency-tag"
                >
                  {req.urgency === "high" ? "Urgent" : req.category}
                </Tag>

                <h3 className="sw-fr-request-title">{req.title}</h3>
                <p className="sw-fr-request-desc">{req.description}</p>

                <div className="sw-fr-request-info">
                  <p>
                    <EnvironmentOutlined /> {req.location}
                  </p>
                  <p>
                    <ClockCircleOutlined /> {req.timeAgo}
                  </p>
                </div>

                <div className="sw-fr-request-bottom">
                  <span className="sw-fr-price">
                    <DollarCircleOutlined /> {req.price}
                  </span>

                  <div className="sw-fr-request-actions">
                    <Button type="primary" shape="round">
                      Accept
                    </Button>
                    <Button className="sw-fr-bt1" shape="round">View</Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>

      {/* Footer */}
      <footer className="sw-fr-hs-footer">
        <div className="sw-fr-hs-footer-inner">
          <div className="sw-fr-hs-footer-col hs-footer-about">
            <h4>About Us</h4>
            <p>
              Your trusted partner for all home and property-related services.
              Quality, reliability, and customer satisfaction guaranteed.
            </p>
          </div>

          <div className="sw-fr-hs-footer-col hs-footer-services">
            <h4>Services</h4>
            <ul>
              <li>Cleaning Service</li>
              <li>Packers & Movers</li>
              <li>Home Services</li>
              <li>Rentals</li>
              <li>Commercial Plots</li>
              <li>Construction Materials</li>
            </ul>
          </div>

          <div className="sw-fr-hs-footer-col hs-footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>

          <div className="sw-fr-hs-footer-col hs-footer-contact">
            <h4>Contact Info</h4>
            <div className="sw-fr-hs-contact-row">
              <PhoneOutlined />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="sw-fr-hs-contact-row">
              <MailOutlined />
              <span>info@homeservices.com</span>
            </div>
            <div className="sw-fr-hs-contact-row">
              <EnvironmentOutlined />
              <span>123 Service Street, City, State</span>
            </div>

            <div className="sw-fr-hs-footer-socials">
              <a>
                <FacebookOutlined />
              </a>
              <a>
                <TwitterOutlined />
              </a>
              <a>
                <InstagramOutlined />
              </a>
              <a>
                <LinkedinOutlined />
              </a>
            </div>
          </div>
        </div>

        <div className="sw-fr-hs-footer-bottom">
          <div className="sw-fr-hs-footer-line" />
          <div className="sw-fr-hs-footer-copy">
            © {new Date().getFullYear()} Home Services. All rights reserved.
          </div>
        </div>
      </footer>
    </Layout>
  );
}


