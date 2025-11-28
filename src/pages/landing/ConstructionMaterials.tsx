// c:/Users/Manikantha.N/Desktop/SWACHIFY_APPLICATION_INDIA/src/pages/landing/ConstructionMaterials.tsx
import React, { useState, useEffect } from "react";
import CommonHeader from "../../pages/landing/Header";
import "../../index.css"
import {
  Row,
  Col,
  // Menu,
  Card,
  Button,
  Typography,
  Form,
  Input,
  DatePicker,
  Select,
  Modal,
  Tabs,
  Checkbox,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  // MenuOutlined,
  // CloseOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import brickwalss from "../../assets/landingimages/brickwall.jpg";
import premiumportlandcement from "../../assets/landingimages/PremiumPortlandCement.jpg";
import tmtsteelbars from "../../assets/landingimages/TMTSteelBars.jpg";
import aacblocks from "../../assets/landingimages/AACBlocks.jpeg";
import msand from "../../assets/landingimages/M.Sand.jpg";
import cementandconcrete from "../../assets/landingimages/Cement&Concrete.jpg";
import steelandmetals from "../../assets/landingimages/Steel&Metals.jpg";
import bricksandblocks from "../../assets/landingimages/Bricks&Blocks.jpg";
import sandandaggregates from "../../assets/landingimages/Sand&Aggregates.jpg";
import roofingmaterials from "../../assets/landingimages/RoofingMaterials.jpg";
import plumbingandelectrical from "../../assets/landingimages/Plumbing&Electrical.jpeg";
const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
/* ================= NAVBAR SECTION ================= */
const NavbarSection: React.FC = () => (
  <>
    <CommonHeader selectedKey="ConstructionMaterials" />
  </>
);
/* ================= DATA ================= */
const services = [
  { title: "Free Delivery", description: "On orders above $500 within 50 miles" },
  { title: "Same-Day Dispatch", description: "Orders placed before 2 PM ship the same day" },
  { title: "Quality Assured", description: "All materials tested and certified" },
  { title: "Quantity Calculator", description: "Free estimation service for your project" },
];
const featuredProducts = [
  {
    title: "Premium Portland Cement",
    image: premiumportlandcement,
    price: "$8.50 per bag (50kg)",
    rating: "4.8/5",
    details: ["High Strength", "Quick Setting", "Weather Resistant"],
  },
  {
    title: "TMT Steel Bars (Fe 500)",
    image: tmtsteelbars,
    price: "$650 per ton",
    rating: "4.9/5",
    details: ["High Tensile", "Corrosion Resistant", "ISI Certified"],
  },
  {
    title: "AAC Blocks",
    image: aacblocks,
    price: "$2.20 per block",
    rating: "4.7/5",
    details: ["Lightweight", "Thermal Insulation", "Fire Resistant"],
  },
  {
    title: "M-Sand (Manufactured Sand)",
    image: msand,
    price: "$45 per ton",
    rating: "4.6/5",
    details: ["Consistent Quality", "Eco Friendly", "No Impurities"],
  },
];
const productCategories = [
  {
    title: "Cement & Concrete",
    items: ["Portland Cement", "Ready-Mix Concrete", "Mortar", "Grout"],
    image: cementandconcrete,
  },
  {
    title: "Steel & Metals",
    items: ["TMT Bars", "Steel Beams", "Wire Mesh", "Angles & Channels"],
    image: steelandmetals,
  },
  {
    title: "Bricks & Blocks",
    items: ["Red Bricks", "Fly Ash Bricks", "AAC Blocks", "Concrete Blocks"],
    image: bricksandblocks,
  },
  {
    title: "Sand & Aggregates",
    items: ["River Sand", "M Sand", "Coarse Aggregates", "Stone Chips"],
    image: sandandaggregates,
  },
  {
    title: "Roofing Materials",
    items: ["Roof Tiles", "Metal Sheets", "Waterproofing", "Insulation"],
    image: roofingmaterials,
  },
  {
    title: "Plumbing & Electrical",
    items: ["PPR Pipes", "Copper Wires", "Switches", "Fittings"],
    image: plumbingandelectrical,
  },
];
/* ================= AUTH MODAL ================= */
const AuthModal: React.FC<{ visible: boolean; onClose: () => void; onSuccess: () => void }> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const [activeKey, setActiveKey] = useState("login");
  const handleLoginFinish = () => {
    onSuccess();
    onClose();
  };
  const handleRegisterFinish = () => {
    onSuccess();
    onClose();
  };
  return (
    <Modal open={visible} onCancel={onClose} footer={null} centered width={520} className="sw-lcm-classname-auth-modal">
      <Tabs activeKey={activeKey} onChange={(k) => setActiveKey(k)} className="sw-lcm-classname-auth-tabs">
        <TabPane tab="Login" key="login">
          <Form layout="vertical" onFinish={handleLoginFinish}>
            <Form.Item label={<span className="sw-lcm-classname-required"> Email / Phone</span>} name="identifier" rules={[{ required: true }]}>
              <Input placeholder="john@example.com" />
            </Form.Item>
            <Form.Item label={<span className="sw-lcm-classname-required">Password</span>} name="password" rules={[{ required: true }]}>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>Login</Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Register" key="register">
          <Form layout="vertical" onFinish={handleRegisterFinish}>
            <Form.Item name="fullName" label={<span className="sw-lcm-classname-required"> Full name</span>} rules={[{ required: true }]}>
              <Input placeholder="John Doe" />
            </Form.Item>
            <Form.Item name="email" label={<span className="sw-lcm-classname-required"> Email</span>} rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="john@example.com" />
            </Form.Item>
            <Form.Item name="phone" label={<span className="sw-lcm-classname-required"> Phone</span>} rules={[{ required: true }]}>
              <Input placeholder="+1 555 123 4567" />
            </Form.Item>
            <Form.Item name="password" label={<span className="sw-lcm-classname-required"> Password</span>} rules={[{ required: true }]}>
              <Input.Password placeholder="Choose a password" />
            </Form.Item>
            <Form.Item
              name="confirm"
              label={<span className="sw-lcm-classname-required"> Confirm Password</span>}
              dependencies={["password"]}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) return Promise.resolve();
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>Register</Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );
};
/* ================= REQUEST QUOTE ================= */
const RequestQuote: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/app/dashboard");
  };
  return (
    <section className="sw-lcm-classname-request-quote">
      <div className="sw-lcm-classname-rq-inner">
        <Title level={2} className="sw-lcm-classname-rq-title">Request a Quote</Title>
        <Text className="sw-lcm-classname-rq-sub">Tell us about your project and get a customized quote</Text>
        <div className="sw-lcm-classname-rq-card">
          <Form onFinish={handleSubmit} layout="vertical" className="sw-lcm-classname-rq-form">
            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item label="Full Name *" name="fullName" rules={[{ required: true }]}>
                  <Input placeholder="John Doe" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Email *" name="email" rules={[{ required: true }]}>
                  <Input placeholder="john@example.com" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item label="Phone Number *" name="phone" rules={[{ required: true }]}>
                  <Input placeholder="+1 555 123 4567" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Service Type *" name="service" rules={[{ required: true }]}>
                  <Select placeholder="Select Material">
                    <Option value="construction-materials">Construction Materials</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24}>
                <Form.Item label="Service Address *" name="address" rules={[{ required: true }]}>
                  <Input placeholder="123 Main St" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item label="Preferred Date *" name="date" rules={[{ required: true }]}>
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Preferred Time *" name="time" rules={[{ required: true }]}>
                  <Select placeholder="Select time">
                    <Option>8:00 AM - 10:00 AM</Option>
                    <Option>10:00 AM - 12:00 PM</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Additional Details" name="details">
              <Input.TextArea placeholder="Tell us more..." rows={4} />
            </Form.Item>
            <Button type="primary" htmlType="submit" size="large" block className="sw-lcm-classname-rq-submit">
              Submit Booking Request
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
};
/* ================= FOOTER COMPONENT ================= */
type FooterProps = {
  phone?: string;
  email?: string;
  address?: string;
  copyrightYear?: number;
  companyName?: string;
};
const Footer: React.FC<FooterProps> = ({
  phone = "+1 (555) 123-4567",
  email = "info@homeservices.com",
  address = "123 Service Street, City, State",
  copyrightYear = 2025,
  companyName = "Home Services",
}) => {
  return (
    <footer className="sw-lcm-classname-lr-footer sw-lcm-classname-site-footer" role="contentinfo" aria-label="Footer">
      <div className="sw-lcm-classname-lr-footer-inner sw-lcm-classname-lr-footer-grid">
        <div className="sw-lcm-classname-lr-footer-col">
          <h4 style={{ color: "#fff" }}>About Us</h4>
          <p className="sw-lcm-classname-lr-footer-about" style={{ color: "#fff" }}>
            Your trusted partner for all home and property-related services. Quality,
            reliability, and customer satisfaction guaranteed.
          </p>
        </div>
        <div className="sw-lcm-classname-lr-footer-col">
          <h4 style={{ color: "#fff" }}>Services</h4>
          <ul className="sw-lcm-classname-lr-footer-list" style={{ color: "#fff" }}>
            <li style={{ color: "#fff" }}>Cleaning Service</li>
            <li style={{ color: "#fff" }}>Packers &amp; Movers</li>
            <li style={{ color: "#fff" }}>Home Services</li>
            <li style={{ color: "#fff" }}>Rentals</li>
            <li style={{ color: "#fff" }}>Commercial Plots</li>
            <li style={{ color: "#fff" }}>Construction Materials</li>
          </ul>
        </div>
        <div className="sw-lcm-classname-lr-footer-col">
          <h4 style={{ color: "#fff" }}>Quick Links</h4>
          <ul className="sw-lcm-classname-lr-footer-list">
            <li style={{ color: "#fff" }}>Home</li>
            <li style={{ color: "#fff" }}>About</li>
            <li style={{ color: "#fff" }}>Contact</li>
            <li style={{ color: "#fff" }}>Careers</li>
          </ul>
        </div>
        <div className="sw-lcm-classname-lr-footer-col">
          <h4 style={{ color: "#fff" }}>Contact Info</h4>
          <ul className="sw-lcm-classname-lr-contact-list">
            <li className="sw-lcm-classname-lr-contact-phone" style={{ color: "#fff" }}>
              <PhoneOutlined aria-hidden className="sw-lcm-classname-lc-contact-icon" />
              <span className="sw-lcm-classname-lc-contact-text" style={{ color: "#fff" }}> {phone}</span>
            </li>
            <li style={{ color: "#fff" }}>
              <MailOutlined aria-hidden /> &nbsp;
              <span style={{ color: "#fff" }}>{email}</span>
            </li>
            <li style={{ color: "#fff" }}>
              <EnvironmentOutlined aria-hidden /> &nbsp; {address}
            </li>
          </ul>
          <div className="sw-lcm-classname-lr-footer-socials" aria-hidden>
            <a className="sw-lcm-classname-social" href="#" aria-label="facebook"><FacebookOutlined /></a>
            <a className="sw-lcm-classname-social" href="#" aria-label="twitter"><TwitterOutlined /></a>
            <a className="sw-lcm-classname-social" href="#" aria-label="instagram"><InstagramOutlined /></a>
            <a className="sw-lcm-classname-social" href="#" aria-label="linkedin"><LinkedinOutlined /></a>
          </div>
        </div>
      </div>
      <div className="sw-lcm-classname-lr-footer-bottom">
        <div className="sw-lcm-classname-lr-footer-sep" />
        <div className="sw-lcm-classname-lr-footer-copy" style={{ color: "#fff" }}>
          &copy; {copyrightYear} {companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
/* ================= MAIN PAGE ================= */
const ConstructionMaterials: React.FC = () => {
  const [authVisible, setAuthVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const btn = document.querySelector(".sw-lcm-classname-hs-contact-btn");
    if (!btn) return;
    const handler = () => setAuthVisible(true);
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);
  const handleAuthSuccess = () => {
    navigate("/app/dashboard");
  };
  return (
    <div className="sw-lcm-classname-construction-materials-container">
      <NavbarSection />
      {/* HERO */}
      <section
        className="sw-lcm-classname-hero-section"
        style={{
          backgroundImage: `url(${brickwalss})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="sw-lcm-classname-hero-overlay">
          <h1>Quality Building Materials at Best Prices</h1>
          <p>Browse our comprehensive range of construction materials.</p>
          <div className="sw-lcm-classname-hero-buttons">
            <Button type="primary" size="large">Browse Catalog</Button>
            <Button size="large">Get Bulk Quote</Button>
          </div>
        </div>
      </section>
      {/* PRODUCT CATEGORIES */}
      <section className="sw-lcm-classname-product-categories">
        <div className="sw-lcm-classname-pc-inner">
          <h2>Product Categories</h2>
          <div className="sw-lcm-classname-pc-grid">
            {productCategories.map((category, i) => (
              <article key={i} className="sw-lcm-classname-pc-grid-item">
                <Card
                  hoverable
                  className="sw-lcm-classname-pc-card"
                  cover={<img src={category.image} alt={category.title} />}
                >
                  <div className="sw-lcm-classname-pc-card-inner">
                    <h3>{category.title}</h3>
                    <ul>{category.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
                    <Button type="primary" block>Browse</Button>
                  </div>
                </Card>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* OUR SERVICES */}
      <section className="sw-lcm-classname-our-services">
        <div className="sw-lcm-classname-os-inner">
          <h2>Our Services</h2>
          <div className="sw-lcm-classname-services-grid">
            {services.map((s, i) => (
              <div key={i} className="sw-lcm-classname-service-grid-item">
                <div className="sw-lcm-classname-service-card">
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FEATURED PRODUCTS */}
      <section className="sw-lcm-classname-featured-products">
        <div className="sw-lcm-classname-fp-inner">
          <h2>Featured Products</h2>
          <div className="sw-lcm-classname-featured-grid">
            {featuredProducts.map((p, i) => (
              <article key={i} className="sw-lcm-classname-featured-item">
                <div className="sw-lcm-classname-featured-card">
                  <div className="sw-lcm-classname-featured-media"><img src={p.image} alt={p.title} /></div>
                  <div className="sw-lcm-classname-featured-body">
                    <h3>{p.title}</h3>
                    <p className="sw-lcm-classname-fp-price">Price: {p.price}</p>
                    <p className="sw-lcm-classname-fp-rating">Rating: {p.rating}</p>
                    <ul>{p.details.map((d, j) => <li key={j}>{d}</li>)}</ul>
                    <Button type="primary" block>Request Quote</Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* REQUEST QUOTE */}
      <RequestQuote />
      {/* AUTH MODAL */}
      <AuthModal visible={authVisible} onClose={() => setAuthVisible(false)} onSuccess={handleAuthSuccess} />
      {/* FOOTER (merged) */}
      <Footer />
    </div>
  );
};
export default ConstructionMaterials;