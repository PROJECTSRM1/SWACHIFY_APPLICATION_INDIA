import React, { useState } from "react";
import {
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Card,
  Modal,
  Tabs,
  Form,
  Input,
  Checkbox,
  message,
} from "antd";
import {
  ToolOutlined,
  CheckOutlined,
  BgColorsOutlined,
  SlidersOutlined,
  ApiOutlined,
  BuildOutlined,
  ThunderboltOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import "./homeservice.css";

const HERO_BG = "../src/assets/landingimages/hero.png"; // keep as your path
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const navItems = [
  { key: "home", label: <Link to="/">Home</Link> },
  { key: "cleaning", label: <Link to="/cleaningservice">Cleaning</Link> },
  { key: "packers", label: <Link to="/LandingPackers">Packers & Movers</Link> },
  { key: "home_services", label: <Link to="/home_service">Home Services</Link> },
  { key: "rentals", label: <Link to="/homeapartment">Rentals</Link> },
  { key: "commercial", label: <Link to="/commercial-plots">Buy&Sale Properties</Link> },
  { key: "materials", label: <Link to="/raw-material">Construction Materials</Link> },
];

const cardRows = [
  [
    {
      image:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
      icon: <ThunderboltOutlined style={{ color: "#faad14", fontSize: 32 }} />,
      title: "Electrical Services",
      price: "$75/hr",
      features: [
        "Wiring & rewiring",
        "Circuit breaker installation",
        "Light fixture installation",
        "Electrical repairs",
        "Safety inspections",
      ],
    },
    {
      image:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80",
      icon: <ApiOutlined style={{ color: "#1890ff", fontSize: 32 }} />,
      title: "Plumbing Services",
      price: "$80/hr",
      features: [
        "Leak repairs",
        "Pipe installation",
        "Drain cleaning",
        "Water heater service",
        "Bathroom/kitchen plumbing",
      ],
    },
    {
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
      icon: <BuildOutlined style={{ color: "#fa8c16", fontSize: 32 }} />,
      title: "Carpentry",
      price: "$70/hr",
      features: [
        "Custom furniture",
        "Cabinet installation",
        "Door & window repair",
        "Deck building",
        "Trim & molding",
      ],
    },
  ],
  [
    {
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      icon: <BgColorsOutlined style={{ color: "#9254de", fontSize: 32 }} />,
      title: "Painting Services",
      price: "$50/hr",
      features: [
        "Interior painting",
        "Exterior painting",
        "Wallpaper installation",
        "Texture coating",
        "Color consultation",
      ],
    },
    {
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
      icon: <SlidersOutlined style={{ color: "#13c2c2", fontSize: 32 }} />,
      title: "HVAC Services",
      price: "$90/hr",
      features: [
        "AC installation & repair",
        "Heating system maintenance",
        "Duct cleaning",
        "Thermostat installation",
        "Air quality testing",
      ],
    },
    {
      image: HERO_BG,
      icon: <ToolOutlined style={{ color: "#595959", fontSize: 32 }} />,
      title: "Handyman Services",
      price: "$60/hr",
      features: [
        "General repairs",
        "Furniture assembly",
        "Mounting & installation",
        "Drywall repair",
        "Small renovations",
      ],
    },
  ],
];

const Home_Service: React.FC = () => {
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Login form
  const [loginForm] = Form.useForm();
  // Register form
  const [registerForm] = Form.useForm();

  const onLoginFinish = (values: any) => {
    // Replace with your auth flow
    console.log("Login values:", values);
    message.success("Logged in (demo)");
    setAuthModalVisible(false);
    loginForm.resetFields();
  };

  const onRegisterFinish = (values: any) => {
    // Replace with real register API call
    console.log("Register values:", values);
    message.success("Registered (demo)");
    setAuthModalVisible(false);
    registerForm.resetFields();
  };

  const onRegisterValidatePassword = (_: any, value: string) => {
    const password = registerForm.getFieldValue("password");
    if (!value || value === password) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Passwords do not match"));
  };

  return (
    <div className="hs-root">
      <header className="hs-navbar">
        <div className="hs-navbar-logo">
          <span className="hs-logo-text">SWACHIFY INDIA</span>
        </div>

        <Menu mode="horizontal" selectedKeys={["home-services"]} className="hs-navbar-menu" items={navItems} />

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

      <Modal
        title={null}
        centered
        open={authModalVisible}
        onCancel={() => setAuthModalVisible(false)}
        footer={null}
        bodyStyle={{ padding: 0 }}
        width={420}
        destroyOnClose
      >
        <div style={{ padding: 22 }}>
          <Tabs
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key as "login" | "register")}
            centered
            size="large"
          >
            <TabPane tab="Login" key="login">
              <Form
                form={loginForm}
                layout="vertical"
                name="loginForm"
                initialValues={{ remember: true }}
                onFinish={onLoginFinish}
              >
                <Form.Item
                  label="Email or Phone"
                  name="identifier"
                  rules={[{ required: true, message: "Please enter email or phone" }]}
                >
                  <Input placeholder="john@example.com or +1 555 123 4567" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please enter your password" }]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: 6 }}>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                  <Button type="primary" htmlType="submit" block>
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>

            <TabPane tab="Register" key="register">
              <Form form={registerForm} layout="vertical" name="registerForm" onFinish={onRegisterFinish}>
                <Form.Item
                  label="Full name"
                  name="name"
                  rules={[{ required: true, message: "Please enter your name" }]}
                >
                  <Input placeholder="John Doe" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input placeholder="john@example.com" />
                </Form.Item>

                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[{ required: true, message: "Please enter your phone number" }]}
                >
                  <Input placeholder="+1 555 123 4567" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please provide a password" }]}
                >
                  <Input.Password placeholder="Choose a password" />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="confirm"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Please confirm your password" },
                    { validator: onRegisterValidatePassword },
                  ]}
                >
                  <Input.Password placeholder="Confirm password" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </Modal>

      <div
        className="hs-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(200,80,0,0.56) 0%, rgba(230,95,30,0.7) 100%), url(${HERO_BG})`,
        }}
      >
        <Row className="hs-hero-content" align="middle">
          <Col xs={24} md={16}>
            <div className="hs-hero-inner">
              <div className="hs-hero-line">
                <ToolOutlined style={{ fontSize: 30, color: "#fff", marginRight: 14 }} />
                <span className="hs-hero-subtitle">Professional Home Services</span>
              </div>
              <Title className="hs-hero-head" level={1}>
                Expert Solutions for Every
                <br />
                Home Repair
              </Title>
              <Paragraph className="hs-hero-desc">
                From plumbing to electrical, carpentry to HVAC – our skilled professionals are ready to handle all your home service needs.
              </Paragraph>
              <div className="hs-hero-actions">
                <Button type="primary" size="large" className="hs-book-btn">
                  Book Service
                </Button>
                <Button type="primary" danger size="large" className="hs-emergency-btn">
                  Emergency? Call Now
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Service cards and subsequent sections unchanged (kept as your existing code) */}
      {cardRows.map((row, idx) => (
        <div key={idx} className="hs-section-root">
          {idx === 0 && (
            <div className="hs-section-head">
              <div className="hs-section-title">Our Home Services</div>
              <div className="hs-section-sub">Professional technicians for all your home maintenance and repair needs</div>
            </div>
          )}

          <Row gutter={[28, 36]} justify="center" className="hs-cards-row">
            {row.map((card, cidx) => (
              <Col key={cidx} xs={24} sm={24} md={12} lg={8} className="hs-col">
                <Card
                  className="hs-card"
                  cover={<img alt={card.title} src={card.image} className="hs-card-img" />}
                  bordered={false}
                >
                  <div className="hs-card-icon">{card.icon}</div>

                  <div className="hs-card-title-price">
                    <span className="hs-card-title">{card.title}</span>
                    <span className="hs-card-price">{card.price}</span>
                  </div>

                  <ul className="hs-card-features">
                    {card.features.map((f) => (
                      <li key={f}>
                        <CheckOutlined className="hs-check-icon" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button type="primary" block size="large" className="hs-book-btn">
                    Book Now
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}

      {/* Emergency section (kept unchanged) */}
      <div className="hs-emergency-wrap">
        <div className="hs-emergency-head">
          <h2>24/7 Emergency Services</h2>
          <p>Home emergencies don't wait. Neither do we. Our rapid response team is available round the clock.</p>
        </div>

        <Row gutter={[28, 32]} justify="center" className="hs-cards-row">
          <Col xs={24} sm={12} md={6}>
            <Card className="hs-em-card" bordered={false}>
              <div className="hs-em-icon">
                <ApiOutlined style={{ fontSize: 40, color: "#e53935", background: "#ffebee", padding: 12, borderRadius: "50%" }} />
              </div>
              <div className="hs-em-title">Burst Pipes</div>
              <div className="hs-em-response">Response: 30 min</div>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card className="hs-em-card" bordered={false}>
              <div className="hs-em-icon">
                <ThunderboltOutlined style={{ fontSize: 40, color: "#e53935", background: "#ffebee", padding: 12, borderRadius: "50%" }} />
              </div>
              <div className="hs-em-title">Power Outage</div>
              <div className="hs-em-response">Response: 45 min</div>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card className="hs-em-card" bordered={false}>
              <div className="hs-em-icon">
                <ToolOutlined style={{ fontSize: 40, color: "#e53935", background: "#ffebee", padding: 12, borderRadius: "50%" }} />
              </div>
              <div className="hs-em-title">Gas Leaks</div>
              <div className="hs-em-response">Response: 20 min</div>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card className="hs-em-card" bordered={false}>
              <div className="hs-em-icon">
                <BuildOutlined style={{ fontSize: 40, color: "#e53935", background: "#ffebee", padding: 12, borderRadius: "50%" }} />
              </div>
              <div className="hs-em-title">Heating Failure</div>
              <div className="hs-em-response">Response: 1 hour</div>
            </Card>
          </Col>
        </Row>

        <div className="hs-emergency-btn-wrap">
          <Button type="primary" className="hs-emergency-main-btn">
            Call Emergency: +1 (555) 911-HOME
          </Button>
        </div>
      </div>

      {/* Footer (kept unchanged) */}
      <footer className="hs-footer">
        <div className="hs-footer-inner">
          <div className="hs-footer-col hs-footer-about">
            <h4>About Us</h4>
            <p>
              Your trusted partner for all home and property-related services. Quality,
              reliability, and customer satisfaction guaranteed.
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
              <a aria-label="facebook">
                <FacebookOutlined />
              </a>
              <a aria-label="twitter">
                <TwitterOutlined />
              </a>
              <a aria-label="instagram">
                <InstagramOutlined />
              </a>
              <a aria-label="linkedin">
                <LinkedinOutlined />
              </a>
            </div>
          </div>
        </div>

        <div className="hs-footer-bottom">
          <div className="hs-footer-line" />
          <div className="hs-footer-copy">© {new Date().getFullYear()} Home Services. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default Home_Service;
