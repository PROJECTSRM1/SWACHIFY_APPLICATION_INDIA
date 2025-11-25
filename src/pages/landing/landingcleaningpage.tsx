// src/pages/landing/LandingCleaningPage.tsx
import React, { useState } from "react";
// add this
import { setUserDetails } from "../../utils/helpers/storage";
import { Phone } from "lucide-react";
// import { Menu } from 'antd'    

/***** ADDED ICONS: Menu & Close for hamburger *****/
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Menu,
  Modal,
  Tabs,
  Checkbox,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  CheckCircleOutlined,
  // PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import "./landingcleaningpage.css";

/* (asset imports and placeholders unchanged) */
import s1 from "../../assets/landingimages/landinghomecleaning.jpg";
import s2 from "../../assets/landingimages/landingofficecleaning.jpg";
import s3 from "../../assets/landingimages/moveinoutcleaning.jpg";
import s4 from "../../assets/landingimages/regularmaintenance.jpg";
import s5 from "../../assets/landingimages/landingkitchen&bathroomcleaning.jpg";
import s6 from "../../assets/landingimages/sofa&upholsterycleaning.jpg";
import s7 from "../../assets/landingimages/landingcarpetcleaning.jpg";
import s8 from "../../assets/landingimages/postconstruction.jpg";

const { TextArea } = Input;
const { TabPane } = Tabs;

/* ================================
   HSHeader component (updated)
   Re-uses .hs-* CSS classes so it will match your other header/UI
   ================================= */
type HSHeaderProps = {
  selectedKey?: string;
  onSignUp?: () => void;
};

export const HSHeader: React.FC<HSHeaderProps> = ({
  selectedKey = "",
  onSignUp = () => {},
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const headerNav = [
    { key: "home", label: <Link to="/landing">Home</Link> },
    { key: "cleaning", label: <Link to="/cleaningservice">Cleaning</Link> },
    { key: "packers", label: <Link to="/LandingPackers">Packers & Movers</Link> },
    { key: "home_services", label: <Link to="/home_service">Home Services</Link> },
    { key: "rentals", label: <Link to="/rentals">Rentals</Link> },
    { key: "commercial", label: <Link to="/commercial-plots">Buy&Sale Properties</Link> },
    { key: "materials", label: <Link to="/ConstructionMaterials">Construction Materials</Link> },
    { key: "freelancer", label: <Link to="/Freelancer">Freelancer</Link> }
  ];

  // IMPORTANT: ensure if selectedKey is empty we pass an empty array so AntD highlights nothing.
  const selectedKeysArray = selectedKey ? [selectedKey] : [];

  return (
    <header className="hs-navbar" role="banner" aria-label="Primary header">
      <div className="hs-navbar-logo" aria-hidden>
        <span className="hs-logo-text">SWACHIFY INDIA</span>
      </div>

      {/* ======= NEW: Hamburger button placed between logo and menu/sign-up ======= */}
      <button
        className="mobile-menu-icon"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((s) => !s)}
        type="button"
      >
        {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
      </button>

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

      {/* ======= DROPDOWN MOBILE MENU (toggled by hamburger) ======= */}
      {menuOpen && (
        <ul className="mobile-menu" role="menu" aria-label="Mobile primary navigation">
          {headerNav.map((nav) => (
            <li key={nav.key} role="none">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                role="menuitem"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  // use Link's navigation by programmatic fallback:
                  // If nav.label is a Link, click it by navigating to same path:
                  // We extract the 'to' prop if present.
                  // For simplicity, replace with window.location (safe for client routing dev).
                  const linkEl = (nav.label as any)?.props?.to;
                  if (linkEl) {
                    window.location.href = linkEl;
                  }
                }}
              >
                {/* render the label (Link) text without changing original Link logic */}
                {/** If label is a Link component, render its children text */}
                {typeof nav.label === "string" ? nav.label : (nav.label as any).props?.children ?? nav.key}
              </a>
            </li>
          ))}

          <li role="none">
            <a
              role="menuitem"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                onSignUp();
              }}
            >
              Login / Sign Up
            </a>
          </li>
        </ul>
      )}
    </header>
  );
};
/* ================================
   End HSHeader
   ================================= */

/* ============================
   remainder of file unchanged (only HSHeader above added hamburger)
   ... rest of LandingCleaningPage component and helpers unchanged
   (copied exactly from your provided file)
   ============================ */

const serviceList = [
  { title: "Residential Cleaning", desc: "Homes, apartments, and condos", img: s1 },
  { title: "Office Cleaning", desc: "Commercial spaces and offices", img: s2 },
  { title: "Move In/Out Cleaning", desc: "Deep cleaning for relocations", img: s3 },
  { title: "Regular Maintenance", desc: "Weekly, bi-weekly, or monthly", img: s4 },
  { title: "Kitchen & Bathroom", desc: "Sanitization & deep scrubbing", img: s5 },
  { title: "Sofa & Upholstery", desc: "Shampoo and stain removal", img: s6 },
  { title: "Carpet Cleaning", desc: "Foam wash & extraction", img: s7 },
  { title: "Post-Construction", desc: "Debris removal & polish", img: s8 },
];

const packages = [
  {
    name: "Basic Clean",
    price: "$79",
    time: "2-3 hours",
    bullets: [
      "General cleaning",
      "Dusting and vacuuming",
      "Kitchen cleaning",
      "Bathroom cleaning",
      "Up to 1000 sq ft",
    ],
  },
  {
    name: "Deep Clean",
    price: "$149",
    time: "4-5 hours",
    bullets: [
      "Everything in Basic",
      "Inside appliances",
      "Baseboards and walls",
      "Window cleaning",
      "Up to 2000 sq ft",
    ],
    popular: true,
  },
  {
    name: "Premium Clean",
    price: "$249",
    time: "Full day",
    bullets: [
      "Everything in Deep",
      "Inside cabinets",
      "Oven deep clean",
      "Refrigerator cleaning",
      "Unlimited square footage",
    ],
  },
];

const LandingCleaningPage: React.FC = () => {
  const [form] = Form.useForm();
  const [authVisible, setAuthVisible] = useState(false);
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log("Booking request:", values);
  };

  const onLogin = (values: any) => {
    console.log("Login values:", values);
    const userData = {
        name: "Test User",
        email: values.identifier,
      };
      debugger;
      console.log('__logs',userData)
      setUserDetails("user", userData);
    
      navigate("/app/dashboard");
    setAuthVisible(false);
    setTimeout(() => navigate("/app/dashboard"), 140);
  };

  const onRegister = (values: any) => {
    console.log("Register values:", values);
    setAuthVisible(false);
    setTimeout(() => navigate("/app/dashboard"), 140);
  };

  const AuthModal = () => {
    return (
      <Modal
        open={authVisible}
        onCancel={() => setAuthVisible(false)}
        footer={null}
        centered
        bodyStyle={{ padding: 28 }}
        closeIcon={<span style={{ fontSize: 20, color: "#9aa4b2" }}>✕</span>}
        className="lr-auth-modal"
        width={560}
        aria-labelledby="auth-modal-title"
      >
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <Tabs defaultActiveKey="login" type="line" centered>
            <TabPane tab="Login" key="login">
              <Form
                form={loginForm}
                layout="vertical"
                onFinish={onLogin}
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

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
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
                onFinish={onRegister}
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
                  dependencies={["regPassword"]}
                  rules={[
                    { required: true, message: "Please confirm password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("regPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Passwords do not match"));
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
  };

  return (
    <div className="lc-page">
      <HSHeader onSignUp={() => setAuthVisible(true)} />
      <AuthModal />

      {/* HERO, sections, footer etc. — unchanged from your original file */}
      <section className="lc-hero lc-hero--large">
        <div className="lc-hero-inner">
          <div className="lc-hero-content">
            <div className="lc-hero-top">
              <span className="lc-hero-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2l1.8 4L18 8l-4 1.8L12 14l-1.8-4L6 8l4.2-2L12 2z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span className="lc-hero-sub">Professional Cleaning Service</span>
            </div>

            <h1 className="lc-hero-title">Sparkling Clean Homes &amp; Offices</h1>

            <p className="lc-hero-desc">
              Experience the difference with our professional cleaning services. We bring cleanliness,
              hygiene, and peace of mind to your space.
            </p>

            <div className="lc-hero-ctas">
              <button className="lc-cta lc-cta--ghost">Book Now</button>
              <button className="lc-cta lc-cta--primary">Get Quote</button>
            </div>
          </div>
        </div>
      </section>

      <main className="lc-container">
        {/* SERVICES GRID */}
        <section className="lc-services">
          <h2 className="lc-section-title">Our Cleaning Services</h2>
          <p className="lc-sub muted">Comprehensive solutions for all your home and property needs</p>

          <Row gutter={[24, 24]}>
            {serviceList.map((s, idx) => (
              <Col xs={24} sm={12} md={6} key={idx}>
                <Card hoverable className="lc-service-card" cover={<img src={s.img} alt={s.title} />}>
                  <div className="lc-service-body">
                    <h3>{s.title}</h3>
                    <p className="muted">{s.desc}</p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* ... rest of file unchanged */}
        <section className="lc-included" aria-labelledby="included-heading">
          <div className="lc-included-inner">
            <h2 id="included-heading" className="lc-section-title">What's Included</h2>
            <p className="lc-sub muted">Our comprehensive cleaning service covers every corner of your space</p>
            <div className="lc-included-grid" role="list">
              {[
                "Deep cleaning of all rooms",
                "Kitchen and bathroom sanitization",
                "Window and glass cleaning",
                "Floor mopping and vacuuming",
                "Dusting and surface cleaning",
                "Eco-friendly cleaning products",
                "Trained and verified staff",
                "Flexible scheduling",
              ].map((txt, i) => (
                <div key={i} className="lc-included-box" role="listitem" aria-label={txt}>
                  <div className="lc-included-left" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="lc-included-text">{txt}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lc-pricing">
          <h2 className="lc-section-title">Pricing Packages</h2>
          <p className="lc-sub muted">Choose the package that best fits your needs</p>

          <Row gutter={[24, 24]} justify="center">
            {packages.map((p, i) => (
              <Col xs={24} sm={12} md={8} key={i}>
                <div className={`lc-price-card ${p.popular ? "popular" : ""}`}>
                  {p.popular && <div className="lc-badge">Most Popular</div>}
                  <h3>{p.name}</h3>
                  <div className="lc-price">
                    <span className="lc-amount">{p.price}</span>
                    <span className="lc-suffix"> / service</span>
                  </div>
                  <div className="lc-time">{p.time}</div>
                  <ul className="lc-bullets">
                    {p.bullets.map((b, idx) => (
                      <li key={idx}>
                        <CheckCircleOutlined className="lc-bullet" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Button type={p.popular ? "primary" : "default"} block>
                    Select Package
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        <section className="lc-booking">
          <h2 className="lc-section-title">Book Your Cleaning Service</h2>
          <p className="lc-sub muted">Fill out the form below and we'll get back to you within 24 hours</p>

          <div className="lc-booking-card">
            <Form form={form} layout="vertical" onFinish={onFinish}>
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
                    <Select placeholder="Select Cleaning Service">
                      <Select.Option value="Basic Service">Basic Service</Select.Option>
                      <Select.Option value="Standard Service">Standard Service</Select.Option>
                      <Select.Option value="Premium Service">Premium Service</Select.Option>
                      <Select.Option value="Emergency Service">Emergency Service</Select.Option>
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
                    <DatePicker className="lc-datepicker" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item name="time" label="Preferred Time" rules={[{ required: true }]}>
                    <Select placeholder="Select time slot">
                      <Select.Option value="08:00-10:00">8:00 AM - 10:00 AM</Select.Option>
                      <Select.Option value="10:00-12:00">10:00 AM - 12:00 PM</Select.Option>
                      <Select.Option value="12:00-14:00">12:00 PM - 2:00 PM</Select.Option>
                      <Select.Option value="14:00-16:00">2:00 PM - 4:00 PM</Select.Option>
                      <Select.Option value="16:00-18:00">4:00 PM - 6:00 PM</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item name="details" label="Additional Details">
                    <TextArea rows={4} placeholder="Tell us more about your requirements..." />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item>
                    <Button htmlType="submit" className="lc-submit-btn" size="large" block>
                      Submit Booking Request
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </section>

        <WhyChooseSection />
      </main>

      <DarkFooter />
    </div>
  );
};

function WhyChooseSection() {
  return (
    <section className="lc-why pale lc-why-centered" aria-labelledby="why-choose-heading">
      <div className="lc-why-inner">
        <h2 id="why-choose-heading" className="lc-section-title">
          Why Choose Our Cleaning Service
        </h2>

        <div className="lc-why-grid" role="list">
          <div className="lc-why-item" role="listitem">
            <div className="lc-why-icon-circle" aria-hidden>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L4 5v6c0 5 4 9 8 9s8-4 8-9V5l-8-3z"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="lc-why-title">Insured & Bonded</div>
            <div className="lc-why-desc">
              All our staff are fully insured and background-checked for your peace of mind
            </div>
          </div>

          <div className="lc-why-item" role="listitem">
            <div className="lc-why-icon-circle" aria-hidden>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3l1.8 4 4 1.8-4 1.8L12 15l-1.8-4-4-1.8 4-1.8L12 3z"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="lc-why-title">Satisfaction Guarantee</div>
            <div className="lc-why-desc">
              Not happy with the results? We'll re-clean for free within 24 hours
            </div>
          </div>

          <div className="lc-why-item" role="listitem">
            <div className="lc-why-icon-circle lc-why-icon-circle--dollar" aria-hidden>
              <svg
                className="lc-why-dollar-svg"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontFamily: "Inter, Arial, sans-serif",
                    fontWeight: 700,
                    fontSize: "20px",
                    fill: "#fff",
                  }}
                >
                  $
                </text>
              </svg>
            </div>

            <div className="lc-why-title">Transparent Pricing</div>
            <div className="lc-why-desc">No hidden fees or surprise charges. What you see is what you pay</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DarkFooter() {
  return (
    <footer className="lc-footer">
      <div className="lc-footer-inner">
        <div className="lc-footer-col">
          <h4 className="lc-footer-title">About Us</h4>
          <p className="lc-footer-about">
            Your trusted partner for all home and property-related services. Quality, reliability,
            and customer satisfaction guaranteed.
          </p>
        </div>

        <div className="lc-footer-col">
          <h4 className="lc-footer-title">Services</h4>
          <ul className="lc-footer-links" aria-label="Services">
            <li><a href="#cleaning">Cleaning Service</a></li>
            <li><a href="#packers">Packers &amp; Movers</a></li>
            <li><a href="#homes">Home Services</a></li>
            <li><a href="#rentals">Rentals</a></li>
            <li><a href="#commercial">Commercial Plots</a></li>
            <li><a href="#materials">Construction Materials</a></li>
          </ul>
        </div>

        <div className="lc-footer-col">
          <h4 className="lc-footer-title">Quick Links</h4>
          <ul className="lc-footer-links" aria-label="Quick links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </div>

        <div className="lc-footer-col">
          <h4 className="lc-footer-title">Contact Info</h4>

          <ul className="lc-contact-list">
            <div className="lc-contact-row">
              <Phone className="lc-contact-icon lc-thin-phone" aria-hidden />
              <span className="lc-contact-text"> +1 (555) 123-4567</span>
            </div>

            <li>
              <MailOutlined className="lc-contact-icon" />
              <span className="lc-contact-text">info@homeservices.com</span>
            </li>

            <li>
              <EnvironmentOutlined className="lc-contact-icon" />
              <span className="lc-contact-text">123 Service Street, City, State</span>
            </li>
          </ul>

          <div className="lc-socials" >
            <a aria-label="facebook" className="lc-social-link" href="#"><FacebookOutlined /></a>
            <a aria-label="twitter" className="lc-social-link" href="#"><TwitterOutlined /></a>
            <a aria-label="instagram" className="lc-social-link" href="#"><InstagramOutlined /></a>
            <a aria-label="linkedin" className="lc-social-link" href="#"><LinkedinOutlined /></a>
          </div>
        </div>
      </div>

      <div className="lc-footer-bottom">
        <div className="lc-footer-bottom-inner">
          <span>© 2025 Home Services. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default LandingCleaningPage;
