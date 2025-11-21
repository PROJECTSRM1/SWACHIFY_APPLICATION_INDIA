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
import { Link } from "react-router-dom";
import "./ConstructionMaterials.css";
import heroImage from "../../assets/landingimages/brickwall.jpg";

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

      {/* DO NOT MODIFY BUTTON */}
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
    image: "https://via.placeholder.com/300x200?text=Cement",
    price: "$8.50 per bag (50kg)",
    rating: "4.8/5",
    details: ["High Strength", "Quick Setting", "Weather Resistant"],
  },
  {
    title: "TMT Steel Bars (Fe 500)",
    image: "https://via.placeholder.com/300x200?text=Steel",
    price: "$650 per ton",
    rating: "4.9/5",
    details: ["High Tensile", "Corrosion Resistant", "ISI Certified"],
  },
  {
    title: "AAC Blocks",
    image: "https://via.placeholder.com/300x200?text=AAC+Blocks",
    price: "$2.20 per block",
    rating: "4.7/5",
    details: ["Lightweight", "Thermal Insulation", "Fire Resistant"],
  },
  {
    title: "M-Sand (Manufactured Sand)",
    image: "https://via.placeholder.com/300x200?text=MSand",
    price: "$45 per ton",
    rating: "4.6/5",
    details: ["Consistent Quality", "Eco Friendly", "No Impurities"],
  },
];

const productCategories = [
  {
    title: "Cement & Concrete",
    items: ["Portland Cement", "Ready-Mix Concrete", "Mortar", "Grout"],
    image: "https://via.placeholder.com/400x260?text=Cement",
  },
  {
    title: "Steel & Metals",
    items: ["TMT Bars", "Steel Beams", "Wire Mesh", "Angles & Channels"],
    image: "https://via.placeholder.com/400x260?text=Steel",
  },
  {
    title: "Bricks & Blocks",
    items: ["Red Bricks", "Fly Ash Bricks", "AAC Blocks", "Concrete Blocks"],
    image: "https://via.placeholder.com/400x260?text=Bricks",
  },
  {
    title: "Sand & Aggregates",
    items: ["River Sand", "M Sand", "Coarse Aggregates", "Stone Chips"],
    image: "https://via.placeholder.com/400x260?text=Sand",
  },
  {
    title: "Roofing Materials",
    items: ["Roof Tiles", "Metal Sheets", "Waterproofing", "Insulation"],
    image: "https://via.placeholder.com/400x260?text=Roofing",
  },
  {
    title: "Plumbing & Electrical",
    items: ["PPR Pipes", "Copper Wires", "Switches", "Fittings"],
    image: "https://via.placeholder.com/400x260?text=Plumbing",
  },
];

/* ================= PRESENTATIONAL SUB-COMPONENTS ================= */
const WhyChooseUs: React.FC = () => {
  const features = [
    "Competitive wholesale pricing",
    "Bulk order discounts",
    "Direct from manufacturers",
    "Quality certifications included",
    "Technical support available",
    "Flexible payment options",
    "Material return policy",
    "Project consultation"
  ];
  return (
    <section className="why-choose-us">
      <div className="why-inner">
        <Title level={2} className="why-title">Why Choose Us</Title>
        <Text className="why-sub">Your trusted partner for construction material supply</Text>
        <div className="why-features">
          {features.map((f, i) => (
            <div className="why-pill" key={i}>
              <span className="why-check">✓</span>
              <span className="why-text">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TrustedBrands: React.FC = () => {
  const brands = ["UltraCem", "SteelPro", "BuildMaster", "ConcretePlus", "MegaSteel", "PrimeBricks", "QualityMix", "TopGrade"];
  return (
    <section className="trusted-brands">
      <div className="tb-inner">
        <Title level={3} className="tb-title">Trusted Brands We Supply</Title>
        <div className="brand-row">
          {brands.map((brand, i) => (
            <div className="brand-pill" key={i}>{brand}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ================= REQUEST QUOTE (full form restored) ================= */
const RequestQuote: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log("Quote request:", values);
  };

  return (
    <section className="request-quote">
      <div className="rq-inner">
        <Title level={2} className="rq-title">Request a Quote</Title>
        <Text className="rq-sub">Tell us about your project and get a customized quote for materials</Text>

        <div className="rq-card">
          <Form
            name="request_quote"
            onFinish={handleSubmit}
            layout="vertical"
            className="rq-form"
          >
            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item label="Full Name *" name="fullName" rules={[{ required: true, message: "Please enter full name" }]}>
                  <Input placeholder="John Doe" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Email *" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
                  <Input placeholder="john@example.com" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item label="Phone Number *" name="phoneNumber" rules={[{ required: true, message: "Please enter phone number" }]}>
                  <Input placeholder="+1 (555) 123-4567" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Service Type *" name="serviceType" rules={[{ required: true, message: "Please select service" }]}>
                  <Select placeholder="Select Construction Materials">
                    <Option value="construction-materials">Construction Materials</Option>
                    <Option value="cleaning-service">Cleaning Service</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24}>
                <Form.Item label="Service Address *" name="serviceAddress" rules={[{ required: true, message: "Please enter address" }]}>
                  <Input placeholder="123 Main St, City, State, ZIP" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item label="Preferred Date *" name="preferredDate" rules={[{ required: true, message: "Please pick a date" }]}>
                  <DatePicker style={{ width: "100%" }} placeholder="Pick a date" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Preferred Time *" name="preferredTime" rules={[{ required: true, message: "Please select time slot" }]}>
                  <Select placeholder="Select time slot">
                    <Option value="8am-10am">8:00 AM - 10:00 AM</Option>
                    <Option value="10am-12pm">10:00 AM - 12:00 PM</Option>
                    <Option value="12pm-2pm">12:00 PM - 2:00 PM</Option>
                    <Option value="2pm-4pm">2:00 PM - 4:00 PM</Option>
                    <Option value="4pm-6pm">4:00 PM - 6:00 PM</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24}>
                <Form.Item label="Additional Details" name="additionalDetails">
                  <Input.TextArea rows={4} placeholder="Tell us more about your requirements..." />
                </Form.Item>
              </Col>
            </Row>

            <div className="rq-submit">
              <Button htmlType="submit" type="primary" size="large">Submit Booking Request</Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

/* ================= AUTH MODAL ================= */
const AuthModal: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose,
}) => {
  const [activeKey, setActiveKey] = useState("login");

  return (
    <Modal open={visible} onCancel={onClose} footer={null} centered width={520} className="auth-modal">
      <Tabs activeKey={activeKey} onChange={(k) => setActiveKey(k)} className="auth-tabs">
        {/* LOGIN */}
        <TabPane tab="Login" key="login">
          <Form layout="vertical" onFinish={onClose}>
            <Form.Item label={<span className="required"> Email / Phone</span>} name="identifier" rules={[{ required: true }]}>
              <Input placeholder="john@example.com or +1 555 123 4567" />
            </Form.Item>

            <Form.Item label={<span className="required">Password</span>} name="password" rules={[{ required: true }]}>
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Checkbox>Remember me</Checkbox>
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>Login</Button>
            </Form.Item>
          </Form>
        </TabPane>

        {/* REGISTER */}
        <TabPane tab="Register" key="register">
          <Form layout="vertical" onFinish={onClose}>
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
            <Form.Item name="confirm" label={<span className="required"> Confirm Password</span>} dependencies={["password"]} rules={[{ required: true, message: 'Please confirm your password' }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('password') === value) { return Promise.resolve(); } return Promise.reject(new Error('Passwords do not match')); }, })]}>
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

/* ================= FOOTER ================= */
const NewFooter: React.FC = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div>
        <h3>About Us</h3>
        <p>Your trusted partner for all home and property-related services.</p>
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
        <p>✉️ info@homeservices.com</p>
        <p>📍 123 Service Street, City, State</p>
      </div>
    </div>

    <p className="footer-bottom">© 2025 Home Services. All rights reserved.</p>
  </footer>
);

/* ================= MAIN PAGE ================= */
const ConstructionMaterials: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authVisible, setAuthVisible] = useState(false);

  /* Without changing Navbar component signature */
  useEffect(() => {
    const btn = document.querySelector(".hs-contact-btn");
    if (!btn) return;

    const handler = () => setAuthVisible(true);
    btn.addEventListener("click", handler);

    return () => btn.removeEventListener("click", handler);
  }, []);

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
          <p>Browse our comprehensive range of construction materials delivered to your site.</p>

          <div className="hero-buttons">
            <Button type="primary" size="large" style={{ marginRight: 20 }}>
              Browse Catalog
            </Button>
            <Button size="large">Get Bulk Quote</Button>
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="product-categories">
        <div className="pc-inner">
          <h2>Product Categories</h2>
          <p className="pc-sub">3 cards on top, 3 on bottom — centered perfectly.</p>

          <div className="pc-grid">
            {productCategories.slice(0, 6).map((category, i) => (
              <article key={i} className="pc-grid-item">
                <Card hoverable className="pc-card" cover={<img src={category.image} alt={category.title} />}>
                  <div className="pc-card-inner">
                    <h3>{category.title}</h3>
                    <ul>
                      {category.items.map((it, j) => <li key={j}>{it}</li>)}
                    </ul>
                    <div className="pc-card-actions"><Button type="primary" block>Browse</Button></div>
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
                    <div className="fp-action"><Button type="primary" block>Request Quote</Button></div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* REQUEST QUOTE FORM */}
      <RequestQuote />

      <WhyChooseUs />
      <TrustedBrands />
      <NewFooter />

      {/* LOGIN / REGISTER MODAL */}
      <AuthModal visible={authVisible} onClose={() => setAuthVisible(false)} />
    </div>
  );
};

export default ConstructionMaterials;
