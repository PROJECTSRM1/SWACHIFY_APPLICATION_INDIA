import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
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
  Modal,
  Tabs,
  Form,
  message,
} from "antd";


const { Content } = Layout;
const { TabPane } = Tabs;


const serviceCategories = [
  { icon: "🏠", name: "Cleaning & Home Services", count: 10, codes: ["Cleaning", "Home", "Moving"] },
  { icon: "🚚", name: "Transport", count: 15, codes: ["Transport"] },
  { icon: "🏢", name: "Buy/Sale/Rentals", count: 23, codes: ["Property"] },
  { icon: "🧱", name: "Raw Materials", count: 14, codes: ["Materials"] },
  { icon: "📚", name: "Education", count: 17, codes: ["Education"] },
  { icon: "🛍️", name: "Swachify Products", count: 27, codes: ["Products"] },
];


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
    title: "Truck Needed",
    location: "Miyapur",
    price: "₹1500",
    timeAgo: "1 hour ago",
    urgency: "high",
    category: "Transport",
    description: "Transport furniture from Ameerpet to Kukatpally",
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

  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

 
  const [selectedCodes, setSelectedCodes] = useState<string[] | null>(null);

  const onLoginFinish = () => {
    message.success("Logged in (demo)");
    setAuthModalVisible(false);
  };

  const onRegisterFinish = () => {
    message.success("Registered (demo)");
    setAuthModalVisible(false);
  };


  const filteredRequests = !selectedCodes
    ? liveRequests
    : liveRequests.filter((req) => selectedCodes.includes(req.category));


  
  const handleCategoryClick = (codes: string[]) => {
    if (selectedCodes && selectedCodes.join(",") === codes.join(",")) {
      setSelectedCodes(null); 
    } else {
      setSelectedCodes(codes); 
    }
  };



  return (
    <Layout className="sw-fr-layout">
      <header className="sw-fr-fix-header">
        <div className="sw-fr-fix-header-left">Swachify Freelancer</div>

        <div className="sw-fr-header-actions">
          <Button
            type="primary"
            className="sw-fr-fix-header-btn"
            onClick={() => navigate("/landing")}
          >
            Back
          </Button>

          <Button
            type="primary"
            className="sw-fr-fix-header-btn"
            onClick={() => navigate("/freelancerregistration")}
          >
            Login / Register
          </Button>


        </div>

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

      {/* Hero */}
      <div className="sw-fr-hero">
        <div className="sw-fr-hero-overlay"></div>

        <Content className="sw-fr-hero-content">
          <h1 className="sw-fr-hero-title">
            Find the Right Tasks <br /> That Match Your Skills
          </h1>

          <p className="sw-fr-hero-sub">Verified jobs. Nearby opportunities. Instant earning.</p>

          <div className="sw-fr-hero-buttons">
            <Button
              type="default"
              size="large"
              shape="round"
              onClick={() => navigate("/servicerequests")}
              icon={<ArrowRightOutlined />}
            >
              View Live Requests
            </Button>

            <Button
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

              <Card
                hoverable
                className={`sw-fr-category-card ${selectedCodes &&
                    selectedCodes.join(",") === cat.codes.join(",")
                    ? "sw-fr-category-card-active"
                    : ""
                  }`}
                onClick={() => handleCategoryClick(cat.codes)}
              >
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
          {filteredRequests.map((req) => (
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
                    <Button onClick={() => navigate("/freelancerregistration")} type="primary" shape="round">
                      Accept
                    </Button>
                   
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>

      {/* Footer */}
      <footer className="hs-footer">
        <div className="hs-footer-inner">
          <div className="hs-footer-col hs-footer-about">
            <h4>About Us</h4>
            <p>
              Your trusted partner for all home and property-related services.
              Quality, reliability, and customer satisfaction guaranteed.
            </p>
          </div>

          <div className="hs-footer-col hs-footer-services">
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

          <div className="hs-footer-col hs-footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>

          <div className="hs-footer-col hs-footer-contact">
            <h4>Contact Info</h4>
            <div className="hs-contact-row">
              <PhoneOutlined />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="hs-contact-row">
              <MailOutlined />
              <span>info@homeservices.com</span>
            </div>
            <div className="hs-contact-row">
              <EnvironmentOutlined />
              <span>123 Service Street, City, State</span>
            </div>

            <div className="hs-footer-socials">
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

        <div className="hs-footer-bottom">
          <div className="hs-footer-line" />
          <div className="hs-footer-copy">
            © {new Date().getFullYear()} Home Services. All rights reserved.
          </div>
        </div>
      </footer>
    </Layout>
  );
}
