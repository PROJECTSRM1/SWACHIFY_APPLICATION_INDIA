// src/pages/landing/LandingPackers.tsx
import React, { useState } from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  Menu,
  Modal,
  Tabs,
  Checkbox
} from 'antd';
import {
  CheckCircleOutlined,
  TruckOutlined,
  SafetyCertificateOutlined,
  DollarOutlined,
  UserOutlined,
  ClockCircleOutlined,
//EnvironmentOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPackers.css';

// === IMAGE IMPORTS ===
import heroPackers from '../../assets/landingimages/Packers.jpg';
import packingServicesImg from '../../assets/landingimages/PackingServices .jpg';
import localandlongdistance from '../../assets/landingimages/localandlongdistance.jpg';
import residentialMovingImg from '../../assets/landingimages/residential-moving.jpg';
import officeRelocationImg from '../../assets/landingimages/office-relocation.jpg';
import vehicleTransportImg from '../../assets/landingimages/vehicle-transport.jpg';
import Loadingtransport from '../../assets/landingimages/Loadingtransport.jpg';
import insurance from '../../assets/landingimages/insurance.jpeg';
// =====================

// const { Option } = Select;
const { TabPane } = Tabs;

const navItems = [
  { key: "home", label: <Link to="/landing">Home</Link> },
  { key: "cleaning", label: <Link to="/cleaningservice">Cleaning</Link> },
  { key: "packers", label: <Link to="/LandingPackers">Packers & Movers</Link> },
  { key: "home_services", label: <Link to="/home_service">Home Services</Link> },
  { key: "rentals", label: <Link to="/rentals">Rentals</Link> },
  { key: "commercial", label: <Link to="/commercial-plots">Buy&Sale Properties</Link> },
  { key: "materials", label: <Link to="/ConstructionMaterials">Construction Materials</Link> },
   { key: "freelancer", label: <Link to="/Freelancer">Freelancer</Link> }
    // { key: "location", label: <Link to="">Location</Link> },
];

const services = [
  {
    img: packingServicesImg,
    icon: <CheckCircleOutlined style={{ fontSize: 30, color: '#00aa33' }} />,
    title: 'Packing Services',
    desc: 'Professional packing with premium quality materials.',
  },
  {
    img: Loadingtransport,
    icon: <DollarOutlined style={{ fontSize: 30, color: '#8b00ff' }} />,
    title: 'Loading Transport',
    desc: 'Best value moving services at competitive rates.',
  },
  {
    img: localandlongdistance,
    icon: <TruckOutlined style={{ fontSize: 30, color: '#1677ff' }} />,
    title: 'Local & Long Distance',
    desc: 'Reliable transportation services ensuring safe relocations.',
  },
  {
    img: insurance,
    icon: <SafetyCertificateOutlined style={{ fontSize: 30, color: '#ff7a00' }} />,
    title: 'Insurance Coverage',
    desc: 'Fully insured service for your peace of mind.',
  },
];

const typesOfServices = [
  {
    title: 'Residential Moving',
    price: '$299',
    features: [
      '1–5 bedroom homes',
      'Packing & unpacking',
      'Furniture disassembly/assembly',
      'Storage solutions available',
    ],
    image: residentialMovingImg,
  },
  {
    title: 'Office Relocation',
    price: 'Custom Quote',
    features: [
      'Minimal disruption',
      'After-hours moving',
      'IT equipment handling',
      'Floor plan setup',
    ],
    image: officeRelocationImg,
  },
  {
    title: 'Vehicle Transport',
    price: '$499',
    features: [
      'Cars & motorcycles',
      'Enclosed transport',
      'Door to door service',
      'Insurance included',
    ],
    image: vehicleTransportImg,
  },
];

const reasons = [
  {
    icon: <UserOutlined style={{ fontSize: 30, color: '#00aa33' }} />,
    title: 'Expert Team',
    desc: 'Trained professionals with years of relocation experience.',
  },
  {
    icon: <ClockCircleOutlined style={{ fontSize: 30, color: '#1677ff' }} />,
    title: 'On-Time Delivery',
    desc: 'We value your time and ensure timely relocation.',
  },
  {
    icon: <SafetyCertificateOutlined style={{ fontSize: 30, color: '#ff7a00' }} />,
    title: 'Full Insurance',
    desc: 'Your belongings are fully covered during transit.',
  },
];

const LandingPackers: React.FC = () => {
  const [authVisible, setAuthVisible] = useState(false);
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const navigate = useNavigate();

  // 🚀 LOGIN → DIRECT NAVIGATION
  const handleLogin = (values: any) => {
    console.log("Login:", values);
    setAuthVisible(false);
    navigate("/app/dashboard");
  };

  // 🚀 REGISTER → DIRECT NAVIGATION
  const handleRegister = (values: any) => {
    console.log("Register:", values);
    setAuthVisible(false);
    navigate("/app/dashboard");
  };

  const AuthModal = () => (
    <Modal
      open={authVisible}
      onCancel={() => setAuthVisible(false)}
      footer={null}
      centered
      width={550}
      className="auth-modal"
    >
      <Tabs defaultActiveKey="login" centered>

        {/* LOGIN TAB */}
        <TabPane tab="Login" key="login">
          <Form form={loginForm} layout="vertical" onFinish={handleLogin}>
            <Form.Item
              label="Email / Phone"
              name="identifier"
              rules={[{ required: true }]}
            >
              <Input placeholder="john@example.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            {/* ⭐ Added Remember Me Checkbox */}
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form>
        </TabPane>

        {/* REGISTER TAB */}
        <TabPane tab="Register" key="register">
          <Form form={registerForm} layout="vertical" onFinish={handleRegister}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true }]}
            >
              <Input placeholder="John Doe" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input placeholder="john@example.com" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true }]}
            >
              <Input placeholder="+1 555 123 4567" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirm"
              dependencies={["password"]}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    return !value || getFieldValue("password") === value
                      ? Promise.resolve()
                      : Promise.reject("Passwords do not match");
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form>
        </TabPane>

      </Tabs>
    </Modal>
  );

  return (
    <div className="packers-container">

      {/* HEADER */}
      <header className="hs-navbar">
        <div className="hs-navbar-logo">
          <span className="hs-logo-text">SWACHIFY INDIA</span>
        </div>

        <Menu mode="horizontal" items={navItems} className="hs-navbar-menu" />

        <Button
          type="primary"
          className="hs-contact-btn"
          onClick={() => setAuthVisible(true)}
        >
          Sign Up
        </Button>
      </header>

      <AuthModal />

      {/* HERO SECTION */}
      <section
        className="packes-hero"
        style={{ backgroundImage: `url(${heroPackers})` }}
      >
        <div className="hero-overlay">
          <h1>Stress-Free Relocation Services</h1>
          <p>From packing to delivery, we make your move effortless.</p>
          <Button type="primary" size="large">Book Now</Button>
        </div>
      </section>

      {/* SERVICES */}
      <section className="packes-services">
        <h2>Our Services</h2>
        <div className="services-row">
          {services.map((s, i) => (
            <Card key={i} className="packes-card">
              <img src={s.img} className="service-img" />
              <div className="packes-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* SERVICE TYPES */}
      <section className="types-of-services">
        <h2>Types of Moving Services</h2>
        <div className="types-row">
          {typesOfServices.map((t, i) => (
            <Card
              key={i}
              className="service-card"
              cover={<img src={t.image} className="service-img" />}
            >
              <h3>{t.title}</h3>
              <p>Starting at {t.price}</p>
              <ul>
                {t.features.map((f, idx) => <li key={idx}>{f}</li>)}
              </ul>
              <Button type="primary">Get Quote</Button>
            </Card>
          ))}
        </div>
      </section>

      {/* REQUEST QUOTE */}
      <section className="request-quote">
        <h2>Request a Moving Quote</h2>
        <Form layout="vertical">
          <Form.Item label="Full Name" name="fullName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input prefix={<MailOutlined />} />
          </Form.Item>

          <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true }]}>
            {/* <Input prefix={<EnvironmentOutlined />} /> */}
          </Form.Item>

          <Button type="primary" block>Submit</Button>
        </Form>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-choose-us">
        <h2>Why Choose Us</h2>
        <div className="choose-us-wrapper">
          {reasons.map((r, i) => (
            <div key={i} className="choose-us-card">
              <div className="choose-us-icon">{r.icon}</div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
{/* FOOTER */}
<footer className="lr-footer site-footer" role="contentinfo" aria-label="Footer">
  <div className="lr-footer-inner lr-footer-grid">
    <div className="lr-footer-col">
      <h4>About Us</h4>
      <p className="lr-footer-about">
        Your trusted partner for all home and property-related services. Quality,
        reliability, and customer satisfaction guaranteed.
      </p>
    </div>
    <div className="lr-footer-col">
      <h4>Services</h4>
      <ul className="lr-footer-list">
        <li>Cleaning Service</li>
        <li>Packers & Movers</li>
        <li>Home Services</li>
        <li>Rentals</li>
        <li>Commercial Plots</li>
        <li>Construction Materials</li>
      </ul>
    </div>
    <div className="lr-footer-col">
      <h4>Quick Links</h4>
      <ul className="lr-footer-list">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Careers</li>
      </ul>
    </div>
    <div className="lr-footer-col">
      <h4>Contact Info</h4>
      <ul className="lr-contact-list">
        <li className="lr-contact-phone">
          <span aria-hidden className="lc-contact-icon">📞</span>
          <span className="lc-contact-text"> +1 (555) 123-4567</span>
        </li>
        <li>✉️ &nbsp; info@homeservices.com</li>
        <li>📍 &nbsp; 123 Service Street, City, State</li>
      </ul>
      <div className="lr-footer-socials" aria-hidden>
        <a className="social" href="#" aria-label="facebook">f</a>
        <a className="social" href="#" aria-label="twitter">t</a>
        <a className="social" href="#" aria-label="instagram">ig</a>
        <a className="social" href="#" aria-label="linkedin">in</a>
      </div>
    </div>
  </div>

  <div className="lr-footer-bottom">
    <div className="lr-footer-sep" />
    <div className="lr-footer-copy">© 2025 Home Services. All rights reserved.</div>
  </div>
</footer>

    </div>
  );
};

export default LandingPackers;
