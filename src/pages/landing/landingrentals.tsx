import React, { useState } from "react";
import CommonHeader from "../../pages/landing/Header";
import "../../pages/landing/Header.css"; // import CSS for header
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  // Menu,
  Modal,
  Tabs,
  Checkbox
} from "antd";

import { Phone } from "lucide-react";

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
  LinkedinOutlined,
  // MenuOutlined,
  // CloseOutlined
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import "./landingrentals.css";

const { Option } = Select;
const { TabPane } = Tabs;

/* ========================= HSHeader WITH HAMBURGER ========================= */
type HSHeaderProps = {
  selectedKey?: string;
  onSignUp?: () => void;
};

export const HSHeader: React.FC<HSHeaderProps> = ({
  // selectedKey = "",
  // onSignUp = () => {}
}) => {
  // const [menuOpen, setMenuOpen] = useState(false);


  // const selectedKeysArray = selectedKey ? [selectedKey] : [];

  return (
 <div>
<CommonHeader selectedKey="rentals" />

 </div>
  );
};
/* ========================= END HEADER ========================= */


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
    console.log("Login:", values);
    setAuthModalVisible(false);
    loginForm.resetFields();
    setTimeout(() => navigate("/app/dashboard"), 150);
  };

  const onRegisterFinish = (values: any) => {
    console.log("Register:", values);
    setAuthModalVisible(false);
    registerForm.resetFields();
    setTimeout(() => navigate("/app/dashboard"), 150);
  };

  const onRegisterValidatePassword = (_: any, value: string) => {
    const password = registerForm.getFieldValue("password");
    if (!value || value === password) return Promise.resolve();
    return Promise.reject(new Error("Passwords do not match"));
  };

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
      available: "Immediate"
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
      available: "Dec 1, 2025"
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
      available: "Immediate"
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
      available: "Jan 1, 2026"
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
      available: "Immediate"
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
      available: "Dec 15, 2025"
    }
  ];

  return (
    <div className="lr-page">

      {/* HEADER */}
      <HSHeader onSignUp={() => setAuthModalVisible(true)} />

      {/* AUTH MODAL */}
      <Modal
        centered
        open={authModalVisible}
        onCancel={() => setAuthModalVisible(false)}
        footer={null}
        width={420}
        destroyOnClose
      >
        <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key as any)} centered>
          <TabPane tab="Login" key="login">
            <Form form={loginForm} layout="vertical" onFinish={onLoginFinish}>
              <Form.Item name="identifier" label="Email / Phone" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Button type="primary" htmlType="submit" block>Login</Button>
            </Form>
          </TabPane>

          <TabPane tab="Register" key="register">
            <Form form={registerForm} layout="vertical" onFinish={onRegisterFinish}>
              <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                <Input />
              </Form.Item>

              <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  { required: true },
                  { validator: onRegisterValidatePassword }
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Button type="primary" htmlType="submit" block>Register</Button>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>

      {/* HERO SECTION */}
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
              <HomeOutlined /> Home & Apartments Rental
            </small>
          </div>

          <h1 className="lr-hero-title">Find Your Perfect Home</h1>

          <Form layout="inline" onFinish={onSearch} className="lr-search lr-search-hero">
            <Form.Item name="query"><Input placeholder="Enter city" /></Form.Item>

            <Form.Item name="type">
              <Select placeholder="Property Type">
                <Option value="apartments">Apartments</Option>
                <Option value="houses">Houses</Option>
                <Option value="villas">Villas</Option>
                <Option value="studio">Studio</Option>
              </Select>
            </Form.Item>

            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              Search
            </Button>
          </Form>
        </div>
      </section>

      {/* PROPERTY TYPES */}
      <main className="lr-container">
        <section className="lr-types">
          <h2 className="lr-section-title">Browse by Property Type</h2>

          <Row gutter={[24, 24]} justify="center">
            {[
              { title: "Apartments", count: "1,250+", icon: <HomeOutlined /> },
              { title: "Houses", count: "800+", icon: <ShopOutlined /> },
              { title: "Villas", count: "350+", icon: <CrownOutlined /> },
              { title: "Studio", count: "600+", icon: <AppstoreOutlined /> }
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

        {/* FEATURED PROPERTIES */}
        <section className="lr-featured">
          <div className="lr-featured-head">
            <h2 className="lr-section-title">Featured Properties</h2>
            <Button icon={<FilterOutlined />}>Filters</Button>
          </div>

          <Row gutter={[24, 24]}>
            {properties.map((p) => (
              <Col xs={24} sm={12} md={8} key={p.id}>
                <Card
                  hoverable
                  className="lr-prop-card"
                  cover={
                    <div className="lr-cover-wrap">
                      <img src={p.img} className="lr-prop-img" />
                      <div className="lr-heart"><HeartOutlined /></div>
                      <div className="lr-prop-tag">{p.tag}</div>
                    </div>
                  }
                >
                  <h3>{p.title}</h3>
                  <p>📍 {p.location}</p>
                  <p className="lr-prop-price">{p.price} / month</p>
                  <p>🛏 {p.beds} Beds | 🛁 {p.baths} Baths | 📐 {p.sqft}</p>

                  <div className="lr-prop-tags">
                    {p.badges.map((b, i) => (
                      <span key={i} className="lr-badge">{b}</span>
                    ))}
                  </div>

                  <p>Available: {p.available}</p>

                  <Button type="primary" block>Schedule Viewing</Button>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* AMENITIES */}
        <section className="lr-amenities">
          <div className="lr-amenities-inner">
            <div className="lr-amenities-top">
              <button className="lr-view-all-btn">View All Properties</button>
              <div>
                <h2 className="lr-section-title">Premium Amenities</h2>
                <p className="lr-sub">Enjoy world-class facilities and amenities in our properties</p>
              </div>
            </div>

            <div className="lr-amenities-grid">
              {[
                "24/7 Security",
                "Swimming Pool",
                "Gym & Fitness Center",
                "Parking",
                "Power Backup",
                "Elevator",
                "Garden/Park",
                "Children's Play Area",
                "Club House",
                "Maintenance Staff"
              ].map((a, i) => (
                <div key={i} className="lr-amenity">
                  <span className="lr-amenity-check" aria-hidden>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M1.5 6.5L5.5 10.5L14.5 1.5" stroke="#7B2CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <div className="lr-amenity-text">{a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOOKING */}
        <section className="lr-booking">
          <h2 className="lr-section-title">Schedule a Viewing</h2>
          <div className="lr-booking-card">
            <Form layout="vertical" form={form} onFinish={onSchedule}>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Type" name="serviceType" rules={[{ required: true }]}>
                    <Select>
                      <Select.Option value="Apartments">Apartments</Select.Option>
                      <Select.Option value="Houses">Houses</Select.Option>
                      <Select.Option value="Villas">Villas</Select.Option>
                      <Select.Option value="Studio">Studio</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item label="Service Address" name="address" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Preferred Date" name="date" rules={[{ required: true }]}>
                    <DatePicker className="lr-datepicker" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Preferred Time" name="time" rules={[{ required: true }]}>
                    <Select>
                      <Select.Option value="09:00-11:00">9–11 AM</Select.Option>
                      <Select.Option value="11:00-13:00">11–1 PM</Select.Option>
                      <Select.Option value="14:00-16:00">2–4 PM</Select.Option>
                      <Select.Option value="16:00-18:00">4–6 PM</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item label="Details" name="details">
                    <Input.TextArea rows={4} />
                  </Form.Item>
                </Col>

                <Button className="lr-submit-btn" size="large" htmlType="submit" block>
                  Submit Booking Request
                </Button>
              </Row>
            </Form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="lr-footer">
        <div className="lr-footer-inner lr-footer-grid">
          <div className="lr-footer-col">
            <h4>About Us</h4>
            <p>Your trusted partner for home and property services.</p>
          </div>

          <div className="lr-footer-col">
            <h4>Services</h4>
            <ul className="lr-footer-list">
              <li>Cleaning</li>
              <li>Packers & Movers</li>
              <li>Home Services</li>
              <li>Rentals</li>
              <li>Commercial</li>
              <li>Construction</li>
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
              <li>
                <Phone className="lc-contact-icon" /> +1 (555) 123-4567
              </li>
              <li><MailOutlined /> info@homeservices.com</li>
              <li><EnvironmentOutlined /> 123 Street, City</li>
            </ul>

            <div className="lr-footer-socials">
              <FacebookOutlined />
              <TwitterOutlined />
              <InstagramOutlined />
              <LinkedinOutlined />
            </div>
          </div>
        </div>

        <div className="lr-footer-bottom">
          © 2025 Home Services. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landingrentals;
