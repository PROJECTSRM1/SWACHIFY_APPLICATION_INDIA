// c:/Users/Manikantha.N/Desktop/SWACHIFY_APPLICATION_INDIA/src/pages/landing/ConstructionMaterials.tsx
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Menu,
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
import { Link, useNavigate } from "react-router-dom";
import "./ConstructionMaterials.css";
import heroImage from "../../assets/landingimages/brickwall.jpg";

import Premium from "../../assets/landingimages/PremiumPortlandCement.jpg";
import TMTsteelbars from "../../assets/landingimages/TMTSteelBars.jpg";
import AACBlocks from "../../assets/landingimages/AACBlocks.jpeg";
import MSand from "../../assets/landingimages/M.Sand.jpg";

import CementConcrete from "../../assets/landingimages/Cement&Concrete.jpg";
import SteelMetals from "../../assets/landingimages/Steel&Metals.jpg";
import BricksBlocks from "../../assets/landingimages/Bricks&Blocks.jpg";
import SandAggregates from "../../assets/landingimages/Sand&Aggregates.jpg";
import RoofingMaterials from "../../assets/landingimages/RoofingMaterials.jpg";
import PlumbingElectrical from "../../assets/landingimages/Plumbing&Electrical.jpeg";



const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

/* ================= NAV ITEMS ================= */
const navItems = [
  { key: "home", label: <Link to="/">Home</Link> },
  { key: "cleaning", label: <Link to="/cleaningservice">Cleaning</Link> },
  { key: "packers", label: <Link to="/LandingPackers">Packers & Movers</Link> },
  { key: "home_services", label: <Link to="/home_service">Home Services</Link> },
  { key: "rentals", label: <Link to="/rentals">Rentals</Link> },
  { key: "commercial", label: <Link to="/commercial-plots">Buy&Sale Properties</Link> },
  { key: "materials", label: <Link to="/ConstructionMaterials">Construction Materials</Link> },
];

/* ================= NAVBAR SECTION ================= */
interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavbarSection: React.FC<NavbarProps> = ({ menuOpen, setMenuOpen }) => (
  <>
    <header className="hs-navbar">
      <div className="hs-navbar-logo">
        <span className="hs-logo-text">SWACHIFY INDIA</span>
      </div>

      <Menu
        mode="horizontal"
        selectedKeys={["home-services"]}
        className="hs-navbar-menu"
        items={navItems}
      />

      {/* Sign Up button triggers modal */}
      <Button type="primary" className="hs-contact-btn">
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
  </>
);

/* ================= DATA (unchanged) ================= */
const services = [
  { title: "Free Delivery", description: "On orders above $500 within 50 miles" },
  { title: "Same-Day Dispatch", description: "Orders placed before 2 PM ship the same day" },
  { title: "Quality Assured", description: "All materials tested and certified" },
  { title: "Quantity Calculator", description: "Free estimation service for your project" },
];

const featuredProducts = [
  {
    title: "Premium Portland Cement",
    image: Premium,
    price: "$8.50 per bag (50kg)",
    rating: "4.8/5",
    details: ["High Strength", "Quick Setting", "Weather Resistant"],
  },
  {
    title: "TMT Steel Bars (Fe 500)",
    image: TMTsteelbars,
    price: "$650 per ton",
    rating: "4.9/5",
    details: ["High Tensile", "Corrosion Resistant", "ISI Certified"],
  },
  {
    title: "AAC Blocks",
    image: AACBlocks,
    price: "$2.20 per block",
    rating: "4.7/5",
    details: ["Lightweight", "Thermal Insulation", "Fire Resistant"],
  },
  {
    title: "M-Sand (Manufactured Sand)",
    image: MSand,
    price: "$45 per ton",
    rating: "4.6/5",
    details: ["Consistent Quality", "Eco Friendly", "No Impurities"],
  },
];

const productCategories = [
  {
    title: "Cement & Concrete",
    items: ["Portland Cement", "Ready-Mix Concrete", "Mortar", "Grout"],
    image: CementConcrete,
  },
  {
    title: "Steel & Metals",
    items: ["TMT Bars", "Steel Beams", "Wire Mesh", "Angles & Channels"],
    image: SteelMetals,
  },
  {
    title: "Bricks & Blocks",
    items: ["Red Bricks", "Fly Ash Bricks", "AAC Blocks", "Concrete Blocks"],
    image: BricksBlocks,
  },
  {
    title: "Sand & Aggregates",
    items: ["River Sand", "M Sand", "Coarse Aggregates", "Stone Chips"],
    image: SandAggregates,
  },
  {
    title: "Roofing Materials",
    items: ["Roof Tiles", "Metal Sheets", "Waterproofing", "Insulation"],
    image: RoofingMaterials,
  },
  {
    title: "Plumbing & Electrical",
    items: ["PPR Pipes", "Copper Wires", "Switches", "Fittings"],
    image: PlumbingElectrical,
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
    onSuccess(); // navigate to /app/dashboard
    onClose();
  };

  const handleRegisterFinish = () => {
    onSuccess(); // navigate to /app/dashboard
    onClose();
  };

  return (
    <Modal open={visible} onCancel={onClose} footer={null} centered width={520} className="auth-modal">
      <Tabs activeKey={activeKey} onChange={(k) => setActiveKey(k)} className="auth-tabs">
        {/* LOGIN */}
        <TabPane tab="Login" key="login">
          <Form layout="vertical" onFinish={handleLoginFinish}>
            <Form.Item label={<span className="required"> Email / Phone</span>} name="identifier" rules={[{ required: true }]}>
              <Input placeholder="john@example.com" />
            </Form.Item>

            <Form.Item label={<span className="required">Password</span>} name="password" rules={[{ required: true }]}>
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

        {/* REGISTER */}
        <TabPane tab="Register" key="register">
          <Form layout="vertical" onFinish={handleRegisterFinish}>
            <Form.Item name="fullName" label={<span className="required"> Full name</span>} rules={[{ required: true }]}>
              <Input placeholder="John Doe" />
            </Form.Item>

            <Form.Item name="email" label={<span className="required"> Email</span>} rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="john@example.com" />
            </Form.Item>

            <Form.Item name="phone" label={<span className="required"> Phone</span>} rules={[{ required: true }]}>
              <Input placeholder="+1 555 123 4567" />
            </Form.Item>

            <Form.Item name="password" label={<span className="required"> Password</span>} rules={[{ required: true }]}>
              <Input.Password placeholder="Choose a password" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label={<span className="required"> Confirm Password</span>}
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
    navigate("/app/dashboard"); // direct navigation ONLY
  };

  return (
    <section className="request-quote">
      <div className="rq-inner">
        <Title level={2} className="rq-title">Request a Quote</Title>
        <Text className="rq-sub">Tell us about your project and get a customized quote</Text>

        <div className="rq-card">
          <Form onFinish={handleSubmit} layout="vertical" className="rq-form">
            {/* Form Fields unchanged */}
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

            <Form.Item
              label="Additional Details"
              name="details"
            >
              <Input.TextArea placeholder="Tell us more..." rows={4} />
            </Form.Item>

            <Button type="primary" htmlType="submit" size="large" block>
              Submit Booking Request
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
};

/* ================= FOOTER ================= */
const NewFooter: React.FC = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div><h3>About Us</h3><p>Your trusted construction material supplier.</p></div>
      <div><h3>Quick Links</h3><ul><li>Home</li><li>Contact</li></ul></div>
      <div><h3>Contact</h3><p>📞 +1 (555) 123-4567</p></div>
    </div>
    <p className="footer-bottom">© 2025 Home Services. All rights reserved.</p>
  </footer>
);

/* ================= MAIN PAGE ================= */
const ConstructionMaterials: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authVisible, setAuthVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const btn = document.querySelector(".hs-contact-btn");
    if (!btn) return;
    const handler = () => setAuthVisible(true);
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  const handleAuthSuccess = () => {
    navigate("/app/dashboard");
  };

  return (
    <div className="construction-materials-container">

      <NavbarSection menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* HERO */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay">
          <h1>Quality Building Materials at Best Prices</h1>
          <p>Browse our comprehensive range of construction materials.</p>

          <div className="hero-buttons">
            <Button type="primary" size="large">Browse Catalog</Button>
            <Button size="large">Get Bulk Quote</Button>
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="product-categories">
        <div className="pc-inner">
          <h2>Product Categories</h2>
          <p className="pc-sub">3 cards on top, 3 below — centered properly.</p>

          <div className="pc-grid">
            {productCategories.map((category, i) => (
              <article key={i} className="pc-grid-item">
                <Card
                  hoverable
                  className="pc-card"
                  cover={<img src={category.image} alt={category.title} />}
                >
                  <div className="pc-card-inner">
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
      <section className="our-services">
        <div className="os-inner">
          <h2>Our Services</h2>
          <div className="services-grid">
            {services.map((s, i) => (
              <div key={i} className="service-grid-item">
                <div className="service-card">
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured-products">
        <div className="fp-inner">
          <h2>Featured Products</h2>

          <div className="featured-grid">
            {featuredProducts.map((p, i) => (
              <article key={i} className="featured-item">
                <div className="featured-card">
                  <div className="featured-media"><img src={p.image} alt={p.title} /></div>
                  <div className="featured-body">
                    <h3>{p.title}</h3>
                    <p className="fp-price">Price: {p.price}</p>
                    <p className="fp-rating">Rating: {p.rating}</p>
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

      <NewFooter />

      {/* LOGIN / REGISTER MODAL */}
      <AuthModal
        visible={authVisible}
        onClose={() => setAuthVisible(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default ConstructionMaterials;
