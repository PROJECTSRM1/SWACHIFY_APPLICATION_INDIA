// src/pages/landing/LandingPackers.tsx
import React, { useState } from 'react';
// import { Row, Col, Card, Button, Form, Input, Select, DatePicker,Menu } from 'antd';
import {  Card, Button, Form, Input, Select, DatePicker, Menu} from 'antd';
import {
  CheckCircleOutlined,
  TruckOutlined,
  SafetyCertificateOutlined,
  DollarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  InboxOutlined,
  // MenuOutlined,
  // CloseOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './LandingPackers.css';

// === IMAGE IMPORTS - ensure these files exist in src/assets/landingimages ===
import heroPackers from '../../assets/landingimages/Packers.jpg';
import packingServicesImg from '../../assets/landingimages/PackingServices .jpg';
import localandlongdistance from '../../assets/landingimages/localandlongdistance.jpg';
import residentialMovingImg from '../../assets/landingimages/residential-moving.jpg';
import officeRelocationImg from '../../assets/landingimages/office-relocation.jpg';
import vehicleTransportImg from '../../assets/landingimages/vehicle-transport.jpg';
import Loadingtransport from '../../assets/landingimages/Loadingtransport.jpg'
import insurance from '../../assets/landingimages/insurance.jpeg'

// ========================================================================

const { Option } = Select;

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
    img: packingServicesImg, // packing & unpacking
    icon: <CheckCircleOutlined style={{ fontSize: 30, color: '#00aa33' }} />,
    title: 'Packing Services',
    desc: 'Professional packing with premium quality materials.',
  },
  {
    img: Loadingtransport, // loading / transport
    icon: <DollarOutlined style={{ fontSize: 30, color: '#8b00ff' }} />,
    title: 'Loading Transport',
    desc: 'Best value moving services at competitive rates.',
  },
  {
    img: localandlongdistance, // local & long distance
    icon: <TruckOutlined style={{ fontSize: 30, color: '#1677ff' }} />,
    title: 'Local & Long Distance',
    desc: 'Reliable transportation services ensuring safe relocations.',
  },
  {
    img: insurance, // insurance/boxes (reuse packing image or change to boxes image)
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

  const onFinish = (values: any) => {
    console.log('Received values:', values);
  };

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
          onClick={() => {
            // setActiveTab("login");
            // setAuthModalVisible(true);
          }}
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
              <Input prefix={<InboxOutlined />} placeholder="john@example.com" />
            </Form.Item>
            <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true }]}>
              <Input prefix={<PhoneOutlined />} placeholder="+1 (555) 123-4567" />
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