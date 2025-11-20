import React, { useState } from "react";
import { Row, Col, Card, Button, Typography, Form, Input, DatePicker, Select } from "antd";
import { Link } from "react-router-dom";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import "./ConstructionMaterials.css";
import heroImage from "../../assets/landingimages/brickwall.jpg";
import cc from "../../assets/landingimages/card1.jpg"

const { Title, Text } = Typography;
const { Option } = Select;

/* ================= NAVBAR SECTION ================= */
interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavbarSection: React.FC<NavbarProps> = ({ menuOpen, setMenuOpen }) => (
  <>
    <nav className="navbar">
      <div className="nav-logo">Swachify India</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cleaningservice">Cleaning</Link></li>
        <li><Link to="/LandingPackers">Packers & Movers</Link></li>
        <li><Link to="/home_service">Home Services</Link></li>
        <li><Link to="/homeapartment">Rentals</Link></li>
        <li><Link to="/Buy_SaleHouseProducts">Commercial Plots</Link></li>
        <li><Link to="/ConstructionMaterials">Construction Materials</Link></li>
        <li><Link to="/contactus">ContactUs</Link></li>
        <li><Link to="/Cart">Cart</Link></li>
        <li><Link to="/Login">Login</Link></li>
      </ul>
      <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
      </div>
    </nav>
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

/* ================= DATA ================= */
const services = [
  { title: "Free Delivery", description: "On orders above $500 within 50 miles" },
  { title: "Same-Day Dispatch", description: "Orders placed before 2 PM ship the same day" },
  { title: "Quality Assured", description: "All materials tested and certified" },
  { title: "Quantity Calculator", description: "Free estimation service for your project" }
];
const featuredProducts = [
  {
    title: "Premium Portland Cement",
    image: "https://via.placeholder.com/300x200?text=Cement",
    price: "$8.50 per bag (50kg)",
    rating: "4.8/5",
    details: ["High Strength", "Quick Setting", "Weather Resistant"]
  },
  {
    title: "TMT Steel Bars (Fe 500)",
    image: "https://via.placeholder.com/300x200?text=Steel",
    price: "$650 per ton",
    rating: "4.9/5",
    details: ["High Tensile", "Corrosion Resistant", "ISI Certified"]
  },
  {
    title: "AAC Blocks",
    image: "https://via.placeholder.com/300x200?text=AAC+Blocks",
    price: "$2.20 per block",
    rating: "4.7/5",
    details: ["Lightweight", "Thermal Insulation", "Fire Resistant"]
  },
  {
    title: "M-Sand (Manufactured Sand)",
    image: "https://via.placeholder.com/300x200?text=MSand",
    price: "$45 per ton",
    rating: "4.6/5",
    details: ["Consistent Quality", "Eco Friendly", "No Impurities"]
  }
];
const productCategories = [
  {
    title: "Cement & Concrete",
    items: ["Portland Cement", "Ready-Mix Concrete", "Mortar", "Grout"],
    image: "cc"
  },
  {
    title: "Steel & Metals",
    items: ["TMT Bars", "Steel Beams", "Wire Mesh", "Angles & Channels"],
    image: "https://via.placeholder.com/400x260?text=Steel"
  },
  {
    title: "Bricks & Blocks",
    items: ["Red Bricks", "Fly Ash Bricks", "AAC Blocks", "Concrete Blocks"],
    image: "https://via.placeholder.com/400x260?text=Bricks"
  },
  {
    title: "Sand & Aggregates",
    items: ["River Sand", "M Sand", "Coarse Aggregates", "Stone Chips"],
    image: "https://via.placeholder.com/400x260?text=Sand"
  },
  {
    title: "Roofing Materials",
    items: ["Roof Tiles", "Metal Sheets", "Waterproofing", "Insulation"],
    image: "https://via.placeholder.com/400x260?text=Roofing"
  },
  {
    title: "Plumbing & Electrical",
    items: ["PPR Pipes", "Copper Wires", "Switches", "Fittings"],
    image: "https://via.placeholder.com/400x260?text=Plumbing"
  }
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

/* ================= REQUEST QUOTE (FULL FORM matching screenshot) ================= */
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
                <Form.Item label="Email *" name="email" rules={[{ required: true, message: "Please enter email" }]}>
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
  return (
    <div className="construction-materials-container">
      <NavbarSection menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay">
          <h1>Quality Building Materials at Best Prices</h1>
          <p>Browse our comprehensive range of construction materials delivered to your site.</p>
          <div className="hero-buttons">
            <Button type="primary" size="large" style={{ marginRight: 20 }}>Browse Catalog</Button>
            <Button size="large">Get Bulk Quote</Button>
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="product-categories">
        <div className="pc-inner">
          <h2>Product Categories</h2>
          <p className="pc-sub">3 cards on top, 3 on bottom — centered perfectly.</p>

          <div className="pc-grid" role="list">
            {(() => {
              const needed = 6;
              const fallback = {
                title: "More coming soon",
                items: [],
                image: "https://via.placeholder.com/400x260?text=Coming+Soon"
              };
              const items = Array.from({ length: needed }, (_, i) => productCategories[i] ?? fallback);
              return items.map((category, i) => (
                <article className="pc-grid-item" key={i} role="listitem">
                  <Card hoverable className="pc-card" cover={<img src={category.image} alt={category.title} />}>
                    <div className="pc-card-inner">
                      <h3>{category.title}</h3>
                      {category.items && category.items.length > 0 ? (
                        <ul>
                          {category.items.map((it, j) => <li key={j}>{it}</li>)}
                        </ul>
                      ) : (
                        <p className="pc-placeholder">Details coming soon</p>
                      )}
                      <div className="pc-card-actions">
                        <Button type="primary" block>Browse</Button>
                      </div>
                    </div>
                  </Card>
                </article>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section className="our-services">
        <div className="os-inner">
          <h2>Our Services</h2>
          <div className="services-grid" role="list">
            {services.map((service, i) => (
              <div className="service-grid-item" key={i} role="listitem">
                <div className="service-card">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
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
          <div className="featured-grid" role="list">
            {featuredProducts.map((product, i) => (
              <article className="featured-item" key={i} role="listitem">
                <div className="featured-card">
                  <div className="featured-media">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="featured-body">
                    <h3>{product.title}</h3>
                    <p className="fp-price">Price: {product.price}</p>
                    <p className="fp-rating">Rating: {product.rating}</p>
                    <ul>
                      {product.details.map((d, j) => <li key={j}>{d}</li>)}
                    </ul>
                    <div className="fp-action">
                      <Button type="primary" block>Request Quote</Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: REQUEST QUOTE FORM (inserted below featured products and above why choose us) */}
      <RequestQuote />

      <WhyChooseUs />
      <TrustedBrands />
      <NewFooter />
    </div>
  );
};

export default ConstructionMaterials;