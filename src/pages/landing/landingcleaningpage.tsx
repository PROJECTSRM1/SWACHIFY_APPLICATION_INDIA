// src/pages/landing/LandingCleaningPage.tsx
import React, { useState } from "react";
import { setUserDetails } from "../../utils/helpers/storage";
import { Phone } from "lucide-react";
import CommonHeader from "../../pages/landing/Header";
import "../../pages/landing/Header.css";
import FooterSection from '../../pages/landing/FooterSection';
import "../../pages/landing/FooterSection.css"

import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
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
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
// import "./landingcleaningpage.css";

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
   HSHeader component (no inline styles)
   Re-uses .hs-* CSS classes so it will match your other header/UI
   ================================= */
type HSHeaderProps = {
  selectedKey?: string;
  onSignUp?: () => void;
};

export const HSHeader: React.FC<HSHeaderProps> = () => {
  return (
    <div>
      <CommonHeader selectedKey="cleaningservice" />
    </div>
  );
};
/* ================================
   End HSHeader
   ================================= */

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

    console.log("__logs", userData);
    setUserDetails("user", userData);

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
        className="lr-auth-modal"
        width={560}
        aria-labelledby="auth-modal-title"
      >
        <div className="auth-modal-inner">
          <Tabs defaultActiveKey="login" type="line" centered>
            <TabPane tab="Login" key="login">
              <Form
                form={loginForm}
                layout="vertical"
                onFinish={onLogin}
                initialValues={{ remember: true }}
              >
                <Form.Item
                  label={<span className="form-label">Email / Phone</span>}
                  name="identifier"
                  rules={[{ required: true, message: "Please enter email / phone" }]}
                >
                  <Input placeholder="john@example.com or +1 555 123 4567" />
                </Form.Item>

                <Form.Item
                  label={<span className="form-label">Password</span>}
                  name="password"
                  rules={[{ required: true, message: "Please enter your password" }]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block className="lr-btn-large">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>

            <TabPane tab="Register" key="register">
              <Form form={registerForm} layout="vertical" onFinish={onRegister}>
                <Form.Item
                  label={<span className="form-label">Full name</span>}
                  name="fullName"
                  rules={[{ required: true, message: "Please enter your full name" }]}
                >
                  <Input placeholder="John Doe" />
                </Form.Item>

                <Form.Item
                  label={<span className="form-label">Email</span>}
                  name="email"
                  rules={[{ required: true, type: "email", message: "Please enter valid email" }]}
                >
                  <Input placeholder="john@example.com" />
                </Form.Item>

                <Form.Item
                  label={<span className="form-label">Phone</span>}
                  name="phone"
                  rules={[{ required: true, message: "Please enter phone number" }]}
                >
                  <Input placeholder="+1 555 123 4567" />
                </Form.Item>

                <Form.Item
                  label={<span className="form-label">Password</span>}
                  name="regPassword"
                  rules={[{ required: true, message: "Please choose a password" }]}
                >
                  <Input.Password placeholder="Choose a password" />
                </Form.Item>

                <Form.Item
                  label={<span className="form-label">Confirm Password</span>}
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
                  <Button type="primary" htmlType="submit" block className="lr-btn-large">
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
    <div className="sw-lc-page">
      <HSHeader onSignUp={() => setAuthVisible(true)} />
      <AuthModal />

      {/* HERO */}
      <section className="sw-lc-hero sw-lc-hero--large">
        <div className="sw-lc-hero-inner">
          <div className="sw-lc-hero-content">
            <div className="sw-lc-hero-top">
              <span className="sw-lc-hero-icon" aria-hidden>
                <svg className="sw-lc-hero-star" viewBox="0 0 24 24" fill="none" role="img" aria-hidden>
                  <path className="sw-lc-hero-star-path" d="M12 2l1.8 4L18 8l-4 1.8L12 14l-1.8-4L6 8l4.2-2L12 2z" />
                </svg>
              </span>

              <span className="sw-lc-hero-sub">Professional Cleaning Service</span>
            </div>

            <h1 className="sw-lc-hero-title">Sparkling Clean Homes &amp; Offices</h1>

            <p className="sw-lc-hero-desc">
              Experience the difference with our professional cleaning services. We bring cleanliness,
              hygiene, and peace of mind to your space.
            </p>

            <div className="sw-lc-hero-ctas">
              <button className="sw-lc-cta sw-lc-cta--ghost">Book Now</button>
              <button className="sw-lc-cta sw-lc-cta--primary">Get Quote</button>
            </div>
          </div>
        </div>
      </section>

      <main className="sw-lc-container">
        {/* SERVICES GRID */}
        <section className="sw-lc-services">
          <h2 className="sw-lc-section-title">Our Cleaning Services</h2>
          <p className="sw-lc-sub muted">Comprehensive solutions for all your home and property needs</p>

          <Row gutter={[24, 24]}>
            {serviceList.map((s, idx) => (
              <Col xs={24} sm={12} md={6} key={idx}>
                <Card hoverable className="sw-lc-service-card" cover={<img src={s.img} alt={s.title} />}>
                  <div className="sw-lc-service-body">
                    <h3>{s.title}</h3>
                    <p className="muted">{s.desc}</p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* INCLUDED */}
        <section className="sw-lc-included" aria-labelledby="included-heading">
          <div className="sw-lc-included-inner">
            <h2 id="included-heading" className="sw-lc-section-title">What's Included</h2>
            <p className="sw-lc-sub muted">Our comprehensive cleaning service covers every corner of your space</p>
            <div className="sw-lc-included-grid" role="list">
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
                <div key={i} className="sw-lc-included-box" role="listitem" aria-label={txt}>
                  <div className="sw-lc-included-left" aria-hidden>
                    <svg className="sw-lc-include-check" viewBox="0 0 24 24" fill="none" role="img" aria-hidden>
                      <path className="sw-lc-include-check-path" d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>

                  <div className="sw-lc-included-text">{txt}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="sw-lc-pricing">
          <h2 className="sw-lc-section-title">Pricing Packages</h2>
          <p className="sw-lc-sub muted">Choose the package that best fits your needs</p>

          <Row gutter={[24, 24]} justify="center">
            {packages.map((p, i) => (
              <Col xs={24} sm={12} md={8} key={i}>
                <div className={`sw-lc-price-card ${p.popular ? "popular" : ""}`}>
                  {p.popular && <div className="sw-lc-badge">Most Popular</div>}
                  <h3>{p.name}</h3>
                  <div className="sw-lc-price">
                    <span className="sw-lc-amount">{p.price}</span>
                    <span className="sw-lc-suffix"> / service</span>
                  </div>
                  <div className="sw-lc-time">{p.time}</div>
                  <ul className="sw-lc-bullets">
                    {p.bullets.map((b, idx) => (
                      <li key={idx}>
                        <CheckCircleOutlined className="sw-lc-bullet" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Button type={p.popular ? "primary" : "default"} block className="sw-lc-price-cta">
                    Select Package
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        {/* BOOKING */}
        <section className="sw-lc-booking">
          <h2 className="sw-lc-section-title">Book Your Cleaning Service</h2>
          <p className="sw-lc-sub muted">Fill out the form below and we'll get back to you within 24 hours</p>

          <div className="sw-lc-booking-card">
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
                    <DatePicker className="sw-lc-datepicker" />
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
                    <Button htmlType="submit" className="sw-lc-submit-btn" size="large" block>
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
    <section className="sw-lc-why pale sw-lc-why-centered" aria-labelledby="why-choose-heading">
      <div className="sw-lc-why-inner">
        <h2 id="why-choose-heading" className="sw-lc-section-title">
          Why Choose Our Cleaning Service
        </h2>

        <div className="sw-lc-why-grid" role="list">
          <div className="sw-lc-why-item" role="listitem">
            <div className="sw-lc-why-icon-circle" aria-hidden>
              <svg className="sw-lc-why-svg" viewBox="0 0 24 24" fill="none" role="img" aria-hidden>
                <path className="sw-lc-why-path" d="M12 2L4 5v6c0 5 4 9 8 9s8-4 8-9V5l-8-3z" />
              </svg>
            </div>

            <div className="sw-lc-why-title">Insured & Bonded</div>
            <div className="sw-lc-why-desc">
              All our staff are fully insured and background-checked for your peace of mind
            </div>
          </div>

          <div className="sw-lc-why-item" role="listitem">
            <div className="sw-lc-why-icon-circle" aria-hidden>
              <svg className="sw-lc-why-svg" viewBox="0 0 24 24" fill="none" role="img" aria-hidden>
                <path className="sw-lc-why-path" d="M12 3l1.8 4 4 1.8-4 1.8L12 15l-1.8-4-4-1.8 4-1.8L12 3z" />
              </svg>
            </div>

            <div className="sw-lc-why-title">Satisfaction Guarantee</div>
            <div className="sw-lc-why-desc">
              Not happy with the results? We'll re-clean for free within 24 hours
            </div>
          </div>

          <div className="sw-lc-why-item" role="listitem">
            <div className="sw-lc-why-icon-circle sw-lc-why-icon-circle--dollar" aria-hidden>
              <svg className="sw-lc-why-dollar-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
                <text className="sw-lc-why-dollar-text" x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                  $
                </text>
              </svg>
            </div>

            <div className="sw-lc-why-title">Transparent Pricing</div>
            <div className="sw-lc-why-desc">No hidden fees or surprise charges. What you see is what you pay</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DarkFooter() {
  return (
    // <footer className="sw-lc-footer">
    //   <div className="sw-lc-footer-inner">
    //     <div className="sw-lc-footer-col">
    //       <h4 className="sw-lc-footer-title">About Us</h4>
    //       <p className="sw-lc-footer-about">
    //         Your trusted partner for all home and property-related services. Quality, reliability,
    //         and customer satisfaction guaranteed.
    //       </p>
    //     </div>

    //     <div className="sw-lc-footer-col">
    //       <h4 className="sw-lc-footer-title">Services</h4>
    //       <ul className="sw-lc-footer-links" aria-label="Services">
    //         <li><a href="#cleaning">Cleaning Service</a></li>
    //         <li><a href="#packers">Packers &amp; Movers</a></li>
    //         <li><a href="#homes">Home Services</a></li>
    //         <li><a href="#rentals">Rentals</a></li>
    //         <li><a href="#commercial">Commercial Plots</a></li>
    //         <li><a href="#materials">Construction Materials</a></li>
    //       </ul>
    //     </div>

    //     <div className="sw-lc-footer-col">
    //       <h4 className="sw-lc-footer-title">Quick Links</h4>
    //       <ul className="sw-lc-footer-links" aria-label="Quick links">
    //         <li><a href="/">Home</a></li>
    //         <li><a href="/about">About</a></li>
    //         <li><a href="/contact">Contact</a></li>
    //         <li><a href="/careers">Careers</a></li>
    //       </ul>
    //     </div>

    //     <div className="sw-lc-footer-col">
    //       <h4 className="sw-lc-footer-title">Contact Info</h4>

    //       <ul className="sw-lc-contact-list">
    //         <div className="sw-lc-contact-row">
    //           <Phone className="sw-lc-contact-icon sw-lc-thin-phone" aria-hidden />
    //           <span className="sw-lc-contact-text"> +1 (555) 123-4567</span>
    //         </div>

    //         <li>
    //           <MailOutlined className="sw-lc-contact-icon" />
    //           <span className="sw-lc-contact-text">info@homeservices.com</span>
    //         </li>

    //         <li>
    //           <EnvironmentOutlined className="sw-lc-contact-icon" />
    //           <span className="sw-lc-contact-text">123 Service Street, City, State</span>
    //         </li>
    //       </ul>

    //       <div className="sw-lc-socials" >
    //         <a aria-label="facebook" className="sw-lc-social-link" href="#"><FacebookOutlined /></a>
    //         <a aria-label="twitter" className="sw-lc-social-link" href="#"><TwitterOutlined /></a>
    //         <a aria-label="instagram" className="sw-lc-social-link" href="#"><InstagramOutlined /></a>
    //         <a aria-label="linkedin" className="sw-lc-social-link" href="#"><LinkedinOutlined /></a>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="sw-lc-footer-bottom">
    //     <div className="sw-lc-footer-bottom-inner">
    //       <span>© 2025 Home Services. All rights reserved.</span>
    //     </div>
    //   </div>
    // </footer>
    <FooterSection selectedKey="landingcleaningpage" />
      
    
  );
}

export default LandingCleaningPage;
