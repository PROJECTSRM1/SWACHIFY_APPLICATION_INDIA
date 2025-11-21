import  { useState } from "react";
import {
  Button,
  Card,
  Row,
  Col,
  Menu,
  Modal,
  Tabs,
  Form,
  Input,
  Checkbox,
} from "antd";
import { Link } from "react-router-dom";

import {
  HomeOutlined,
  TruckOutlined,
  ToolOutlined,
  ShopOutlined,
  ApartmentOutlined,
  BuildOutlined,
} from "@ant-design/icons";

import "./landingpage.css";
import heroImage from "../../assets/landingimages/hero.jpg";

const { TabPane } = Tabs;

const navItems = [
  { key: "home", label: <Link to="/">Home</Link> },
  { key: "cleaning", label: <Link to="/cleaningservice">Cleaning</Link> },
  { key: "packers", label: <Link to="/LandingPackers">Packers & Movers</Link> },
  { key: "home_services", label: <Link to="/home_service">Home Services</Link> },
  { key: "rentals", label: <Link to="/rentals">Rentals</Link> },
  { key: "commercial", label: <Link to="/commercial-plots">Buy&Sale Properties</Link> },
  { key: "materials", label: <Link to="/ConstructionMaterials">Construction Materials</Link> },
];

const services = [
  {
    icon: <HomeOutlined style={{ fontSize: 28, color: "#1677ff" }} />,
    title: "Cleaning Service",
    desc: "Professional cleaning solutions for your home and office. Deep cleaning, regular maintenance, and specialized services.",
  },
  {
    icon: <TruckOutlined style={{ fontSize: 28, color: "#00aa33" }} />,
    title: "Packers & Movers",
    desc: "Safe and reliable relocation services. Local and long-distance moving with complete packing solutions.",
  },
  {
    icon: <ToolOutlined style={{ fontSize: 28, color: "#ff7a00" }} />,
    title: "Home Services",
    desc: "Expert plumbing, electrical, carpentry, and maintenance services. Quick response and quality workmanship.",
  },
  {
    icon: <ApartmentOutlined style={{ fontSize: 28, color: "#8b00ff" }} />,
    title: "Home & Apartments Rental",
    desc: "Find your perfect home with our extensive rental listings. Apartments, houses, and furnished options available.",
  },
  {
    icon: <ShopOutlined style={{ fontSize: 28, color: "#ff3333" }} />,
    title: "commercial-plots",
    desc: "Premium commercial plots in prime locations. Excellent investment opportunities.",
  },
  {
    icon: <BuildOutlined style={{ fontSize: 28, color: "#ffaa00" }} />,
    title: "Construction Raw Materials",
    desc: "Quality cement, bricks, and building materials at competitive prices.",
  },
];

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState<"login" | "register">("register");

  // ⭐ Scroll to Services Section
  const scrollToServices = () => {
    const section = document.getElementById("services-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  // Handlers for modal
  const openAuthModal = (tab: "login" | "register" = "register") => {
    setActiveAuthTab(tab);
    setAuthModalVisible(true);
  };
  const closeAuthModal = () => setAuthModalVisible(false);

  // Submit handlers (wire up to your auth later)
  const onLogin = (values: any) => {
    console.log("login values", values);
    // TODO: call login API
    closeAuthModal();
  };
  const onRegister = (values: any) => {
    console.log("register values", values);
    // TODO: call register API
    closeAuthModal();
  };

  return (
    <div className="landing-container">
      {/* 🟦 NAVBAR */}
      <header className="hs-navbar">
        <div className="hs-navbar-logo">
          <span className="hs-logo-text">SWACHIFY INDIA</span>
        </div>

        <Menu mode="horizontal" selectedKeys={["home-services"]} className="hs-navbar-menu" items={navItems} />

        <Button
          type="primary"
          className="hs-contact-btn"
          onClick={() => openAuthModal("register")}
        >
          Sign Up
        </Button>
      </header>

      {/* DROPDOWN MOBILE MENU */}
      {menuOpen && (
        <ul className="mobile-menu">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/cleaningservice" onClick={() => setMenuOpen(false)}>Cleaning</Link></li>
          <li><Link to="/LandingPackers" onClick={() => setMenuOpen(false)}>Packers & Movers</Link></li>
          <li><Link to="/home_service" onClick={() => setMenuOpen(false)}>Home Services</Link></li>
          <li><Link to="/rentals" onClick={() => setMenuOpen(false)}>Rentals</Link></li>
          <li><Link to="/commercial-plots" onClick={() => setMenuOpen(false)}>Commercial Plots</Link></li>
          <li><Link to="/ConstructionMaterials" onClick={() => setMenuOpen(false)}>Construction Materials</Link></li>
          <li><Link to="/contactus" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          <li><Link to="/Cart" onClick={() => setMenuOpen(false)}>Cart</Link></li>
          <li><Link to="/Login" onClick={() => setMenuOpen(false)}>Login</Link></li>
        </ul>
      )}

      {/* 🟦 HERO SECTION */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-content">
          <h1>Transform Your Home & Property Services</h1>
          <p>Your trusted solution for cleaning, moving, rentals, construction, and more.</p>

          {/* ⭐ CALL SCROLL FUNCTION */}
          <Button type="primary" size="large" onClick={scrollToServices}>
            Get Started
          </Button>
        </div>
      </section>

      {/* 🟦 SERVICES SECTION */}
      <section id="services-section" className="services-section">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          Comprehensive solutions for all your home and property needs
        </p>

        <Row gutter={[24, 24]} justify="center">
          {services.map((item, i) => (
            <Col xs={24} sm={12} md={8} key={i}>
              <Card className="service-card" hoverable>
                <div className="service-icon">{item.icon}</div>
                <h3 className="service-title">{item.title}</h3>
                <p className="service-desc">{item.desc}</p>
                <a className="learn-more" href="#">
                  Learn More →
                </a>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* 🟦 FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h3>About Us</h3>
            <p>
              Your trusted partner for all home and property-related services.
              Quality, reliability, and customer satisfaction guaranteed.
            </p>
          </div>

          <div>
            <h3>Services</h3>
            <ul>
              <li>Cleaning Service</li>
              <li>Packers & Movers</li>
              <li>Home Services</li>
              <li>Rentals</li>
              <li>Commercial Plots</li>
              <li>Construction Materials</li>
            </ul>
          </div>

          <div>
            <h3>Quick Links</h3>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>

          <div>
            <h3>Contact Info</h3>
            <p>📞 +1 (555) 123-4567</p>
            <p>📧 info@homeservices.com</p>
            <p>📍 123 Service Street, City, State</p>
            <div className="social-icons">🌐 🎯 📸 🔗</div>
          </div>
        </div>

        <p className="footer-bottom">
          © 2025 Home Services. All rights reserved.
        </p>
      </footer>

      {/* ===== AUTH MODAL (Login / Register) ===== */}
      <Modal
        open={authModalVisible}
        onCancel={closeAuthModal}
        footer={null}
        centered
        width={520}
        bodyStyle={{ padding: 24 }}
        className="auth-modal"
        closeIcon={<span className="auth-close">✕</span>}
      >
        <div className="auth-modal-inner">
          <Tabs
            activeKey={activeAuthTab}
            onChange={(key) => setActiveAuthTab(key as "login" | "register")}
            className="auth-tabs"
          >
            <TabPane tab="Login" key="login">
              <Form layout="vertical" onFinish={onLogin}>
                <Form.Item
                  label={<span className="required-label">Email / Phone</span>}
                  name="identifier"
                  rules={[{ required: true, message: "Please input email or phone" }]}
                >
                  <Input placeholder="john@example.com or +1 555 123 4567" />
                </Form.Item>

                <Form.Item
                  label={<span className="required-label">Password</span>}
                  name="password"
                  rules={[{ required: true, message: "Please input password" }]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>

            <TabPane tab="Register" key="register">
              <Form layout="vertical" onFinish={onRegister}>
                <Form.Item
                  label={<span className="required-label">Full name</span>}
                  name="fullname"
                  rules={[{ required: true, message: "Please input full name" }]}
                >
                  <Input placeholder="John Doe" />
                </Form.Item>

                <Form.Item
                  label={<span className="required-label">Email</span>}
                  name="email"
                  rules={[{ required: true, message: "Please input email" }, { type: "email", message: "Enter a valid email" }]}
                >
                  <Input placeholder="john@example.com" />
                </Form.Item>

                <Form.Item
                  label={<span className="required-label">Phone</span>}
                  name="phone"
                  rules={[{ required: true, message: "Please input phone" }]}
                >
                  <Input placeholder="+1 555 123 4567" />
                </Form.Item>

                <Form.Item
                  label={<span className="required-label">Password</span>}
                  name="password"
                  rules={[{ required: true, message: "Please input password" }]}
                >
                  <Input.Password placeholder="Choose a password" />
                </Form.Item>

                <Form.Item
                  label={<span className="required-label">Confirm Password</span>}
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: "Please confirm password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Passwords do not match'));
                      },
                    }),
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
    </div>
  );
};

export default LandingPage;
