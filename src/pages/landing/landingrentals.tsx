import React, { useState } from "react";
import { Row, Col, Card, Button, Form, Input, Select, DatePicker, Menu, Modal, Tabs, Checkbox } from "antd";
// add this
import { Phone } from "lucide-react";

// ADDED ICON IMPORTS (no other imports changed)
import {
  SearchOutlined,
  HeartOutlined,
  HomeOutlined,
  ShopOutlined,
  CrownOutlined,
  AppstoreOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  FilterOutlined,
  LinkedinOutlined
} from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";

import "./landingrentals.css";

const { Option } = Select;
const { TabPane } = Tabs;

/* ================================ HSHeader component ================================ */
type HSHeaderProps = {
  selectedKey?: string;
  onSignUp?: () => void;
};

export const HSHeader: React.FC<HSHeaderProps> = ({ selectedKey = "", onSignUp = () => {} }) => {
  const headerNav = [
    { key: "home", label: <Link to="/">Home</Link> },
    { key: "cleaning", label: <Link to="/cleaningservice">Cleaning</Link> },
    { key: "packers", label: <Link to="/LandingPackers">Packers & Movers</Link> },
    { key: "home_services", label: <Link to="/home_service">Home Services</Link> },
    { key: "rentals", label: <Link to="/rentals">Rentals</Link> },
    { key: "commercial", label: <Link to="/commercial-plots">Buy&Sale Properties</Link> },
    { key: "materials", label: <Link to="/ConstructionMaterials">Construction Materials</Link> },
  ];

  const selectedKeysArray = selectedKey ? [selectedKey] : [];

  return (
    <header className="hs-navbar" role="banner" aria-label="Primary header">
      <div className="hs-navbar-logo" aria-hidden>
        <span className="hs-logo-text">SWACHIFY INDIA</span>
      </div>

      <Menu
        mode="horizontal"
        selectedKeys={selectedKeysArray}
        className="hs-navbar-menu"
        items={headerNav}
        role="navigation"
        aria-label="Primary navigation"
      />

      <Button
        type="primary"
        className="hs-contact-btn"
        onClick={onSignUp}
        aria-label="Sign up"
      >
        Sign Up
      </Button>
    </header>
  );
};
/* ================================ End HSHeader ================================ */

/* ========== IMAGE IMPORTS ========== */
import heroimg from "../../assets/landingimages/landingrenatlshero.jpg";
import apt1 from "../../assets/landingimages/2bhkapartment.jpg";
import apt2 from "../../assets/landingimages/3bhkpenthouse.jpg";
import apt3 from "../../assets/landingimages/cozystudioapartment.jpg";
import apt4 from "../../assets/landingimages/spaciousfamilyhouse.jpg";
import apt5 from "../../assets/landingimages/luxuryvillawithpool.jpg";
import apt6 from "../../assets/landingimages/modern1bhkflat.jpg";
/* ======================================================= */

const Landingrentals: React.FC = () => {
  const [form] = Form.useForm();

  // Auth modal state & forms
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const navigate = useNavigate();

  const onSearch = (values: any) => {
    console.log("Search:", values);
  };

  const onSchedule = (values: any) => {
    console.log("Schedule viewing:", values);
  };

  const onLoginFinish = (values: any) => {
    console.log("Login values:", values);
    // close modal, reset, then navigate
    setAuthModalVisible(false);
    loginForm.resetFields();
    setTimeout(() => navigate("/app/dashboard"), 150);
  };

  const onRegisterFinish = (values: any) => {
    console.log("Register values:", values);
    // close modal, reset, then navigate
    setAuthModalVisible(false);
    registerForm.resetFields();
    setTimeout(() => navigate("/app/dashboard"), 150);
  };

  const onRegisterValidatePassword = (_: any, value: string) => {
    const password = registerForm.getFieldValue("password");
    if (!value || value === password) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Passwords do not match"));
  };

  // === FEATURED PROPERTIES DATA ===
  const properties = [
    {
      id: 1,
      img: apt1,
      title: "Modern 2BHK Apartment",
      location: "Downtown, Manhattan",
      price: "$2,500",
      tag: "Apartment",
      beds: 2,
      baths: 2,
      sqft: "1,200 sqft",
      badges: ["Furnished", "Parking", "Pet Friendly", "Gym"],
      available: "Immediate",
    },
    {
      id: 2,
      img: apt2,
      title: "Luxury 3BHK Penthouse",
      location: "Midtown, New York",
      price: "$4,800",
      tag: "Penthouse",
      beds: 3,
      baths: 3,
      sqft: "2,100 sqft",
      badges: ["Furnished", "Balcony", "Pool", "Concierge"],
      available: "Dec 1, 2025",
    },
    {
      id: 3,
      img: apt3,
      title: "Cozy Studio Apartment",
      location: "Brooklyn Heights",
      price: "$1,600",
      tag: "Studio",
      beds: 1,
      baths: 1,
      sqft: "550 sqft",
      badges: ["Furnished", "WiFi", "Utilities Inc."],
      available: "Immediate",
    },
    {
      id: 4,
      img: apt4,
      title: "Spacious Family House",
      location: "Queens, New York",
      price: "$3,500",
      tag: "House",
      beds: 4,
      baths: 3,
      sqft: "2,500 sqft",
      badges: ["Garden", "Parking", "Pet Friendly"],
      available: "Jan 1, 2026",
    },
    {
      id: 5,
      img: apt5,
      title: "Luxury Villa with Pool",
      location: "Long Island, NY",
      price: "$6,000",
      tag: "Villa",
      beds: 5,
      baths: 4,
      sqft: "3,800 sqft",
      badges: ["Pool", "Garden", "Garage", "Smart Home"],
      available: "Immediate",
    },
    {
      id: 6,
      img: apt6,
      title: "Modern 1BHK Loft",
      location: "SoHo, Manhattan",
      price: "$2,200",
      tag: "Loft",
      beds: 1,
      baths: 1,
      sqft: "850 sqft",
      badges: ["High Ceilings", "Exposed Brick", "Parking"],
      available: "Dec 15, 2025",
    },
  ];
  // === end featured data ===

  return (
    <div className="lr-page">
      <HSHeader onSignUp={() => setAuthModalVisible(true)} />

      <Modal
        title={null}
        centered
        open={authModalVisible}
        onCancel={() => setAuthModalVisible(false)}
        footer={null}
        width={420}
        destroyOnClose
        className="lr-auth-modal"
      >
        <div className="lr-auth-modal-inner">
          <Tabs
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key as "login" | "register")}
            centered
            size="large"
            className="lr-auth-tabs"
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
                  label="Email / Phone"
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

      <section
        className="lr-hero lr-hero-with-image"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(18,72,160,0.75), rgba(47,128,237,0.55)), url(${heroimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="lr-hero-inner lr-hero-content">
          <div className="lr-hero-top">
            <small className="lr-hero-sub">
              <HomeOutlined className="lr-hero-sub-icon" />
              Home &amp; Apartments Rental
            </small>
          </div>

          <h1 className="lr-hero-title">Find Your Perfect Home</h1>
          <p className="lr-hero-desc">
            Browse thousands of rental properties. From cozy studios to luxury penthouses — find a place you'll love to call home.
          </p>

          <Form layout="inline" className="lr-search lr-search-hero" onFinish={onSearch}>
            <Form.Item name="query" className="lr-search-field lr-search-field-hero">
              <Input placeholder="Enter city or neighborhood" />
            </Form.Item>

            <Form.Item name="type" className="lr-search-field lr-search-field-hero">
              <Select placeholder="Property Type" className="lr-hero-type-select">
                <Option value="apartments">Apartments</Option>
                <Option value="houses">Houses</Option>
                <Option value="villas">Villas</Option>
                <Option value="studio">Studio</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />} className="lr-search-btn-hero">
                Search
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>

      <main className="lr-container">
        <section className="lr-types">
          <h2 className="lr-section-title">Browse by Property Type</h2>

          <Row gutter={[24, 24]} justify="center">
            {[ 
              { title: "Apartments", count: "1,250+", icon: <HomeOutlined /> },
              { title: "Houses", count: "800+", icon: <ShopOutlined /> },
              { title: "Villas", count: "350+", icon: <CrownOutlined /> },
              { title: "Studio", count: "600+", icon: <AppstoreOutlined /> },
            ].map((t, i) => (
              <Col xs={24} sm={12} md={6} key={i}>
                <Card className="lr-type-card" hoverable>
                  <div className="lr-type-ico-wrapper">
                    <div className="lr-type-ico">{t.icon}</div>
                  </div>
                  <h4>{t.title}</h4>
                  <div className="lr-type-count">{t.count}</div>
                  <div className="lr-type-sub">Properties</div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section className="lr-featured">
          <div className="lr-featured-head">
            <div>
              <h2 className="lr-section-title">Featured Properties</h2>
              <p className="lr-sub muted">Handpicked properties for you</p>
            </div>
            <div className="lr-featured-filter-btn">
              <Button icon={<FilterOutlined />}>Filters</Button>
            </div>
          </div>

          <Row gutter={[24, 24]}>
            {properties.map((p) => (
              <Col xs={24} sm={12} md={8} lg={8} key={p.id}>
                <Card
                  hoverable
                  className="lr-prop-card"
                  cover={
                    <div className="lr-cover-wrap">
                      <img src={p.img} alt={p.title} className="lr-prop-img" />
                      <div className="lr-heart"><HeartOutlined /></div>
                      <div className="lr-prop-tag">{p.tag}</div>
                    </div>
                  }
                >
                  <h3 className="lr-prop-title">{p.title}</h3>
                  <div className="lr-prop-loc">📍 {p.location}</div>

                  <div className="lr-prop-price">
                    <span className="price">{p.price}</span>
                    <span className="per">/month</span>
                  </div>

                  <div className="lr-prop-meta">🛏 {p.beds} Beds &nbsp; 🛁 {p.baths} Baths &nbsp; 📐 {p.sqft}</div>

                  <div className="lr-prop-tags">
                    {p.badges.map((b, i) => (
                      <span key={i} className="lr-badge">{b}</span>
                    ))}
                  </div>

                  <div className="lr-available">Available: {p.available}</div>

                  <Button type="primary" block className="lr-schedule-btn">Schedule Viewing</Button>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section className="lr-amenities" aria-labelledby="amenities-heading">
          <div className="lr-amenities-inner">
            <div className="lr-amenities-top">
              <div className="lr-amenities-top-btn">
                <Button className="lr-view-all-btn">View All Properties</Button>
              </div>

              <h2 id="amenities-heading" className="lr-section-title">Premium Amenities</h2>
              <p className="lr-sub muted">Enjoy world-class facilities and amenities in our properties</p>
            </div>

            <div className="lr-amenities-grid" role="list" aria-label="List of amenities">
              {[ "24/7 Security","Swimming Pool","Gym & Fitness Center","Parking","Power Backup","Elevator","Garden/Park","Children's Play Area","Club House","Maintenance Staff" ].map((amenity, i) => (
                <div key={i} className="lr-amenity" role="listitem" aria-label={amenity}>
                  <span className="lr-amenity-check" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M20 6L9 17l-5-5" stroke="#7B2CFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>

                  <span className="lr-amenity-text">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lr-booking">
          <h2 className="lr-section-title">Schedule a Viewing</h2>
          <p className="lr-sub muted">Find your dream home. Schedule a property viewing today.</p>

          <div className="lr-booking-card">
            <Form form={form} layout="vertical" onFinish={onSchedule}>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                    <Input placeholder="John Doe" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                    <Input placeholder="john@example.com" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
                    <Input placeholder="+1 (555) 123-4567" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name="serviceType" label="Service Type" rules={[{ required: true }]}>
                    <Select placeholder="Select Rental Services">
                      <Select.Option value="Apartments">Apartments</Select.Option>
                      <Select.Option value="Houses">Houses</Select.Option>
                      <Select.Option value="Villas">Villas</Select.Option>
                      <Select.Option value="Studio">Studio</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item name="address" label="Service Address" rules={[{ required: true }]}>
                    <Input placeholder="123 Main St, City, State, ZIP" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name="date" label="Preferred Date" rules={[{ required: true }]}>
                    <DatePicker className="lr-datepicker" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name="time" label="Preferred Time" rules={[{ required: true }]}>
                    <Select placeholder="Select time slot">
                      <Select.Option value="09:00-11:00">9:00 AM - 11:00 AM</Select.Option>
                      <Select.Option value="11:00-13:00">11:00 AM - 1:00 PM</Select.Option>
                      <Select.Option value="14:00-16:00">2:00 PM - 4:00 PM</Select.Option>
                      <Select.Option value="16:00-18:00">4:00 PM - 6:00 PM</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item name="details" label="Additional Details">
                    <Input.TextArea rows={4} placeholder="Tell us more about your requirements..." />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item>
                    <Button htmlType="submit" className="lr-submit-btn" size="large" block>
                      Submit Booking Request
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </section>
      </main>

      <footer className="lr-footer">
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
                <Phone className="lc-contact-icon lc-thin-phone" aria-hidden />
                <span className="lc-contact-text"> +1 (555) 123-4567</span>
              </li>
              <li><MailOutlined /> &nbsp; info@homeservices.com</li>
              <li><EnvironmentOutlined /> &nbsp; 123 Service Street, City, State</li>
            </ul>

            <div className="lr-footer-socials">
              <a aria-label="facebook" className="social" href="#"><FacebookOutlined /></a>
              <a aria-label="twitter" className="social" href="#"><TwitterOutlined /></a>
              <a aria-label="instagram" className="social" href="#"><InstagramOutlined /></a>
              <a aria-label="linkedin" className="social" href="#"><LinkedinOutlined /></a>
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

export default Landingrentals;
