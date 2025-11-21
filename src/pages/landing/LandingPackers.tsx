// src/pages/landing/LandingPackers.tsx
import React, { useState } from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Menu,
  Modal,
  Tabs,
} from 'antd';
import {
  CheckCircleOutlined,
  TruckOutlined,
  SafetyCertificateOutlined,
  DollarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPackers.css';

// === IMAGE IMPORTS - ensure these files exist in src/assets/landingimages ===
import heroPackers from '../../assets/landingimages/Packers.jpg';
import packingServicesImg from '../../assets/landingimages/PackingServices .jpg';
import localandlongdistance from '../../assets/landingimages/localandlongdistance.jpg';
import residentialMovingImg from '../../assets/landingimages/residential-moving.jpg';
import officeRelocationImg from '../../assets/landingimages/office-relocation.jpg';
import vehicleTransportImg from '../../assets/landingimages/vehicle-transport.jpg';
import Loadingtransport from '../../assets/landingimages/Loadingtransport.jpg';
import insurance from '../../assets/landingimages/insurance.jpeg';
// ========================================================================

const { Option } = Select;
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
      '1-5 bedroom homes',
      'Packing & unpacking',
      'Furniture disassembly/assembly',
      'Storage solutions available'
    ],
    image: residentialMovingImg,
  },
  {
    title: 'Office Relocation',
    price: 'Custom Quote',
    features: [
      'Minimal business disruption',
      'After hours moving',
      'IT equipment handling',
      'Floor plan setup'
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
      'Insurance included'
    ],
    image: vehicleTransportImg,
  },
];

const whyChooseUs = [
  {
    icon: <UserOutlined style={{ fontSize: 30, color: '#00aa33' }} />,
    title: 'Expert Team',
    desc: 'Trained professionals with years of moving experience.',
  },
  {
    icon: <ClockCircleOutlined style={{ fontSize: 30, color: '#1677ff' }} />,
    title: 'On-Time Delivery',
    desc: 'We respect your time and ensure punctual service.',
  },
  {
    icon: <SafetyCertificateOutlined style={{ fontSize: 30, color: '#ff7a00' }} />,
    title: 'Full Insurance',
    desc: 'Complete coverage for your belongings during transit.',
  },
];

const LandingPackers: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authVisible, setAuthVisible] = useState(false);
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Received values:', values);
  };

  // Auth handlers — on successful login navigate to dashboard
  const handleLogin = (values: any) => {
    console.log('Login values:', values);
    // TODO: call auth API here. On success:
    setAuthVisible(false);
    // navigate to dashboard as requested
    navigate('/dashboard');
  };

  const handleRegister = (values: any) => {
    console.log('Register values:', values);
    // TODO: register API. On success you can either log in automatically or keep modal closed.
    setAuthVisible(false);
    navigate('/dashboard'); // optional: navigate after register (keeps same behavior)
  };

  // Minimal Auth modal: matches the "second/third pic" layout (centered form with no left images)
  const AuthModal = () => (
    <Modal
      open={authVisible}
      onCancel={() => setAuthVisible(false)}
      footer={null}
      centered
      width={560}
      className="auth-modal--packers"
      closeIcon={<span style={{ fontSize: 20, color: "#9aa4b2" }}>✕</span>}
      bodyStyle={{ padding: 28 }}
      aria-labelledby="auth-modal-title"
    >
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <Tabs defaultActiveKey="login" type="line" centered>
          <TabPane tab="Login" key="login">
            <Form
              form={loginForm}
              layout="vertical"
              onFinish={handleLogin}
              initialValues={{ remember: true }}
            >
              <Form.Item
                label={<span style={{ fontWeight: 600 }}>Email / Phone</span>}
                name="identifier"
                rules={[{ required: true, message: "Please enter email / phone" }]}
              >
                <Input placeholder="john@example.com or +1 555 123 4567" />
              </Form.Item>

              <Form.Item
                label={<span style={{ fontWeight: 600 }}>Password</span>}
                name="password"
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block style={{ height: 44 }}>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Register" key="register">
            <Form
              form={registerForm}
              layout="vertical"
              onFinish={handleRegister}
            >
              <Form.Item
                label={<span style={{ fontWeight: 600 }}>Full name</span>}
                name="fullName"
                rules={[{ required: true, message: "Please enter your full name" }]}
              >
                <Input placeholder="John Doe" />
              </Form.Item>

              <Form.Item
                label={<span style={{ fontWeight: 600 }}>Email</span>}
                name="email"
                rules={[{ required: true, type: "email", message: "Please enter valid email" }]}
              >
                <Input placeholder="john@example.com" />
              </Form.Item>

              <Form.Item
                label={<span style={{ fontWeight: 600 }}>Phone</span>}
                name="phone"
                rules={[{ required: true, message: "Please enter phone number" }]}
              >
                <Input placeholder="+1 555 123 4567" />
              </Form.Item>

              <Form.Item
                label={<span style={{ fontWeight: 600 }}>Password</span>}
                name="regPassword"
                rules={[{ required: true, message: "Please choose a password" }]}
              >
                <Input.Password placeholder="Choose a password" />
              </Form.Item>

              <Form.Item
                label={<span style={{ fontWeight: 600 }}>Confirm Password</span>}
                name="confirmPassword"
                dependencies={['regPassword']}
                rules={[
                  { required: true, message: "Please confirm password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('regPassword') === value) {
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
                <Button type="primary" htmlType="submit" block style={{ height: 44 }}>
                  Register
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </Modal>
  );

  return (
    <div className="packes-container">
      {/* NAVBAR */}
      <header className="hs-navbar">
        <div className="hs-navbar-logo">
          <span className="hs-logo-text">SWACHIFY INDIA</span>
        </div>

        <Menu mode="horizontal" selectedKeys={["home-services"]} className="hs-navbar-menu" items={navItems} />

        <Button
          type="primary"
          className="hs-contact-btn"
          onClick={() => setAuthVisible(true)}
        >
          Sign Up
        </Button>
      </header>

      {menuOpen && (
        <ul className="mobile-menu">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/cleaningservice" onClick={() => setMenuOpen(false)}>Cleaning</Link></li>
          <li><Link to="/LandingPackers" onClick={() => setMenuOpen(false)}>Packers & Movers</Link></li>
          <li><Link to="/home_service" onClick={() => setMenuOpen(false)}>Home Services</Link></li>
          <li><Link to="/homeapartment" onClick={() => setMenuOpen(false)}>Rentals</Link></li>
          <li><Link to="/Buy_SaleHouseProducts" onClick={() => setMenuOpen(false)}>Commercial Plots</Link></li>
          <li><Link to="/ConstructionMaterials" onClick={() => setMenuOpen(false)}>Construction Materials</Link></li>
          <li><Link to="/contactus" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          <li><Link to="/Cart" onClick={() => setMenuOpen(false)}>Cart</Link></li>
          <li><Link to="/Login" onClick={() => setMenuOpen(false)}>Login</Link></li>
        </ul>
      )}

      {/* render auth modal */}
      <AuthModal />

      {/* HERO */}
      <section className="packes-hero" style={{ backgroundImage: `url(${heroPackers})` }}>
        <div className="hero-overlay">
          <h1>Stress-Free Relocation Services</h1>
          <p>From packing to delivery, we make moving seamless and efficient.</p>
          <Button type="primary" size="large">Book Now</Button>
        </div>
      </section>

      {/* SERVICES */}
      <section className="packes-services">
        <h2>Our Services</h2>
        <p>Your trusted relocation partner across cities and states.</p>
        <div className="services-row">
          {services.map((item, i) => (
            <Card key={i} className="packes-card" hoverable>
              <img src={item.img} alt={item.title} className="service-img" />
              <div className="packes-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* TYPES OF SERVICES */}
      <section className="types-of-services">
        <h2>Types of Moving Services</h2>
        <p>Whether you're moving your home, office, or vehicle, we've got you covered.</p>
        <div className="types-row">
          {typesOfServices.map((service, i) => (
            <Card
              key={i}
              className="service-card"
              hoverable
              cover={<img src={service.image} alt={service.title} className="service-img" />}
            >
              <h3>{service.title}</h3>
              <p>Starting at {service.price}</p>
              <ul>
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <Button type="primary" size="large">Get Quote</Button>
            </Card>
          ))}
        </div>
      </section>

      {/* REQUEST QUOTE */}
      <section className="request-quote">
        <h2>Request a Moving Quote</h2>
        <p>Tell us about your move and get a customized quote</p>
        <div className="quote-form-container">
          <Form name="request_quote" onFinish={onFinish} layout="vertical">
            <Form.Item label="Full Name" name="fullName" rules={[{ required: true }]}>
              <Input prefix={<UserOutlined />} placeholder="John Doe" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input prefix={<MailOutlined />} placeholder="john@example.com" />
            </Form.Item>
            <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true }]}>
              <Input placeholder="+1 (555) 123-4567" />
            </Form.Item>
            <Form.Item label="Service Type" name="serviceType" rules={[{ required: true }]}>
              <Select placeholder="Select Service">
                <Option value="basic">Basic Service</Option>
                <Option value="standard">Standard Service</Option>
                <Option value="premium">Premium Service</Option>
                <Option value="emergency">Emergency Service</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Service Address" name="serviceAddress" rules={[{ required: true }]}>
              <Input placeholder="123 Main St, City, State, ZIP" />
            </Form.Item>
            <Form.Item label="Preferred Date" name="preferredDate" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Preferred Time" name="preferredTime" rules={[{ required: true }]}>
              <Select placeholder="Select Time Slot">
                <Option value="8am-10am">8:00 AM - 10:00 AM</Option>
                <Option value="10am-12pm">10:00 AM - 12:00 PM</Option>
                <Option value="12pm-2pm">12:00 PM - 2:00 PM</Option>
                <Option value="2pm-4pm">2:00 PM - 4:00 PM</Option>
                <Option value="4pm-6pm">4:00 PM - 6:00 PM</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Additional Details" name="additionalDetails">
              <Input.TextArea rows={3} placeholder="Tell us more..." />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Booking Request
            </Button>
          </Form>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <h2 className="hiw-title">How It Works</h2>
        <div className="hiw-steps">
          {[1,2,3,4].map((n) => (
            <div className="hiw-step" key={n}>
              <div className="hiw-step-top">
                <span className="hiw-circle">{n}</span>
              </div>
              <div className="hiw-texts">
                <div className="hiw-step-title">
                  {n === 1 ? 'Get a Quote' : n === 2 ? 'Schedule Your Move' : n === 3 ? 'We Pack & Load' : 'Safe Delivery'}
                </div>
                <div className="hiw-step-sub">
                  {n === 1 ? 'Contact us for a free estimate' :
                   n === 2 ? 'Choose your preferred date and time' :
                   n === 3 ? 'Our team handles everything carefully' : 'Your belongings arrive safely'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-choose-us">
        <h2>Why Choose Us</h2>
        <div className="choose-us-wrapper">
          {whyChooseUs.map((item, i) => (
            <div className="choose-us-card" key={i}>
              <div className="choose-us-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h3>About Us</h3>
            <p>Your trusted partner for all home and property-related services. Quality, reliability, and customer satisfaction guaranteed.</p>
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
            <p>✓ info@homeservices.com</p>
            <p>📍 123 Service Street, City, State</p>
            <div className="social-icons">🌐 🎧 📷 🧭</div>
          </div>
        </div>
        <p className="footer-bottom">© 2025 Home Services. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPackers;
