// src/pages/landing/CommercialPlots.tsx
import React, { useState } from "react";
import CommonHeader from "../../pages/landing/Header";
import "../../pages/landing/Header.css"; // import CSS for header
import {
  Layout,
  // Menu,
  Row,
  Col,
  Button,
  Typography,
  Input,
  Select,
  DatePicker,
  Card,
  Space,
  Modal,
  Tabs,
  Form,
  Checkbox,
  message,
} from "antd";
// near top of file — replace or extend existing icon imports
import {
  HomeOutlined,
  SearchOutlined,
  EyeOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  // MenuOutlined,
  // CloseOutlined,
} from "@ant-design/icons";

import {  useNavigate } from "react-router-dom";
// import "./commercialplots.css";

/* Update this path to your hero/background image file in your repo */
import heroImg from "../../assets/landingimages/property4.jpg";

/* Replace these imports with your real images */
import card1 from "../../assets/landingimages/building.jpg";
import card2 from "../../assets/landingimages/commercial plot.jpg";
import card3 from "../../assets/landingimages/land.jpg";
import card4 from "../../assets/landingimages/plot.jpg";

const { Content, Footer } = Layout;
const { Title } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

/* -------------------------
   HSHeader (inlined — same as Cleaning page)
   ------------------------- */
type HSHeaderProps = {
  selectedKey?: string;
  onSignUp?: () => void;
  menuOpen?: boolean;
  setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const HSHeader: React.FC<HSHeaderProps> = ({
  // selectedKey = "",
  // // onSignUp = () => {},
  // // menuOpen,
  // // setMenuOpen,
}) => {
 

  // const selectedKeysArray = selectedKey ? [selectedKey] : [];

  return (
    <>
<CommonHeader selectedKey="commercial-plots" />
    
    </>
  );
};
/* -------------------------
   End HSHeader
   ------------------------- */

/* ... rest of your code unchanged ... (kept exact as you provided) */

/* Product type, data, propertyTypes, etc. */
type Product = {
  id: number;
  img: string;
  title: string;
  desc: string;
  price: string;
  category?: string;
};

const PRODUCTS: Product[] = [
  { id: 1, img: card1, title: " Building - 1000 sq.ft", desc: "Prime commercial plot in business district", price: "$50,000", category: "Retail" },
  { id: 2, img: card2, title: " Plot - 2500 sq.ft", desc: "Large commercial plot near highway", price: "$120,000", category: "Industrial" },
  { id: 3, img: card3, title: " Land - 5000 sq.ft", desc: "Premium location for development", price: "$250,000", category: "Mixed" },
  { id: 4, img: card4, title: "Corner Plot - 3000 sq.ft", desc: "Corner plot with excellent visibility", price: "$180,000", category: "Retail" },
];

const propertyTypes = [
  { id: "apt", title: "Apartments", count: "1,250+", sub: "Properties" },
  { id: "house", title: "Houses", count: "800+", sub: "Properties" },
  { id: "villa", title: "Villas", count: "350+", sub: "Properties" },
  { id: "studio", title: "Studio", count: "600+", sub: "Properties" },
];

const CommercialPlots: React.FC = () => {
  // --- NEW: menu state for hamburger (added, used only for header mobile) ---
  const [menuOpen, setMenuOpen] = useState(false);

  // search/filter state
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState<string | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);

  // booking form state (simple, local)
  const [bookingForm] = Form.useForm();

  // auth modal state
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState<"login" | "register">("login");

  // login/register forms
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  // router
  const navigate = useNavigate();

  const filteredProducts = React.useMemo(() => {
    const q = searchLocation.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
      const matchesType = !searchType || (p.category?.toLowerCase() === searchType.toLowerCase());
      return matchesQuery && matchesType;
    });
  }, [searchLocation, searchType]);

  // Demo handlers (replace with real API)
  const onLoginFinish = (values: any) => {
    console.log("Login:", values);
    message.success("Logged in (demo)");
    setAuthModalVisible(false);
    loginForm.resetFields();
    setTimeout(() => navigate("/app/dashboard"), 150);
  };

  const onRegisterFinish = (values: any) => {
    console.log("Register:", values);
    message.success("");
    setAuthModalVisible(false);
    registerForm.resetFields();
    setTimeout(() => navigate("/app/dashboard"), 10);
  };

  // Booking submission - now using AntD Form for validation
  const handleBookingSubmit = (values: any) => {
    console.log("Consultation booking values:", values);
    message.success("Booking request submitted");
    // keep behavior consistent: optionally navigate
    setTimeout(() => navigate("/app/dashboard"), 150);
  };

  return (
    <Layout className="sw-cp-cp-layout">
      <HSHeader
        selectedKey="commercial"
        onSignUp={() => {
          setActiveAuthTab("login");
          setAuthModalVisible(true);
        }}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <Modal
        title={null}
        centered
        open={authModalVisible}
        onCancel={() => setAuthModalVisible(false)}
        footer={null}
        width={420}
        destroyOnClose
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ padding: 20 }}>
          <Tabs
            activeKey={activeAuthTab}
            onChange={(k) => setActiveAuthTab(k as "login" | "register")}
            centered
            size="large"
          >
            <TabPane tab="Login" key="login">
              <Form form={loginForm} layout="vertical" onFinish={onLoginFinish} initialValues={{ remember: true }}>
                <Form.Item
                  label="Email / Phone"
                  name="identifier"
                  rules={[{ required: true, message: "Please enter email / phone" }]}
                >
                  <Input placeholder="john@example.com or +1 555 123 4567" />
                </Form.Item>

                <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter password" }]}>
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: 8 }}>
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
              <Form form={registerForm} layout="vertical" onFinish={onRegisterFinish}>
                <Form.Item label="Full Name" name="name" rules={[{ required: true, message: "Enter your name" }]}>
                  <Input placeholder="John Doe" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Enter email" }, { type: "email", message: "Enter valid email" }]}
                >
                  <Input placeholder="john@example.com" />
                </Form.Item>

                <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "Enter phone" }]}>
                  <Input placeholder="+1 555 123 4567" />
                </Form.Item>

                <Form.Item label="Password" name="password" rules={[{ required: true, message: "Choose password" }]}>
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                  <Button type="primary" htmlType="submit" block>
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </Modal>

      <Content className="sw-cp-cp-content">
        {/* =========================
            SEARCH HERO (AntD inputs) with background image
           ========================= */}
        <section
          className="sw-cp-cp-search-hero"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(138,43,226,0.72), rgba(155,89,255,0.72)), url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="sw-cp-cp-search-inner">
            <div className="sw-cp-cp-search-breadcrumb">
              <span className="sw-cp-search-crumb-icon">🏠</span>
              <span>Buy & Sale Properties</span>
            </div>

            <h1 className="sw-cp-cp-search-title">Find Your Perfect Property</h1>
            <p className="sw-cp-cp-search-sub">
              Browse thousands of properties. From cozy studios to luxury penthouses, find a place you'll love to call home.
            </p>

            <div className="sw-cp-cp-search-box">
              <div className="sw-cp-cp-search-field">
                <Input
                  placeholder="Enter city or neighborhood"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="sw-cp-cp-search-input"
                  allowClear
                />
              </div>

              <div className="sw-cp-cp-search-field">
                <Select
                  placeholder="Property Type"
                  value={searchType}
                  onChange={(val) => setSearchType(val)}
                  className="sw-cp-cp-search-select"
                  allowClear
                >
                  <Option value="retail">Retail</Option>
                  <Option value="industrial">Industrial</Option>
                  <Option value="mixed">Mixed</Option>
                </Select>
              </div>

              <Button
                className="sw-cp-cp-search-btn"
                type="primary"
                onClick={() => {
                  // dummy: search handled by state
                }}
              >
                <SearchOutlined />
                <span>Search</span>
              </Button>
            </div>
          </div>
        </section>

        {/* rest of your sections (unchanged) */}
        <section className="sw-cp-cp-browse-section">
          <div className="sw-cp-cp-browse-inner">
            <Title level={2} className="sw-cp-cp-browse-title">Browse by Property Type</Title>

            <div className="sw-cp-cp-browse-row" role="list">
              {propertyTypes.map((pt) => (
                <div
                  key={pt.id}
                  className="sw-cp-browse-card-wrap"
                  role="listitem"
                  onClick={() => setSelectedType(pt.id === selectedType ? undefined : pt.id)}
                >
                  <div className={`sw-cp-browse-card ${selectedType === pt.id ? "sw-cp-browse-card--active" : ""}`}>
                    <div className="sw-cp-browse-icon">
                      <div className="sw-cp-browse-icon-circle"><HomeOutlined /></div>
                    </div>

                    <div className="sw-cp-browse-body">
                      <div className="sw-cp-browse-title">{pt.title}</div>
                      <div className="sw-cp-browse-count">{pt.count}</div>
                      <div className="sw-cp-browse-sub">{pt.sub}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sw-cp-cp-products-section">
          <div className="sw-cp-cp-products-inner">
            <Row justify="center" style={{ marginBottom: 8 }}>
              <Col>
                <Title level={3} className="sw-cp-cp-products-title">Featured Quick Listings</Title>
              </Col>
            </Row>

            <div className="sw-cp-product-grid" aria-live="polite">
              {filteredProducts.map((item) => (
                <Card
                  key={item.id}
                  className="sw-cp-product-card"
                  cover={
                    <div className="sw-cp-product-image-wrap">
                      <img src={item.img} alt={item.title} className="sw-cp-product-image" />
                    </div>
                  }
                >
                  <div className="sw-cp-product-body">
                    <h4 className="sw-cp-product-title">{item.title}</h4>
                    <p className="sw-cp-product-desc">{item.desc}</p>

                    <div className="sw-cp-product-meta">
                      <div className="sw-cp-product-price">{item.price}</div>
                      <Space>
                        <Button className="sw-cp-product-btn" onClick={() => {/* navigate to details */}}>
                          <EyeOutlined /> View Details
                        </Button>
                      </Space>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="sw-cp-cp-process-section">
          <div className="sw-cp-cp-process-inner">
            <Title level={2} className="sw-cp-cp-process-title">How It Works</Title>

            <div className="sw-cp-process-row">
              <div className="sw-cp-process-step">
                <div className="sw-cp-step-circle">1</div>
                <div className="sw-cp-step-line" />
                <div className="sw-cp-step-title">Search & Filter</div>
                <div className="sw-cp-step-desc">Browse properties matching your needs</div>
              </div>

              <div className="sw-cp-process-step">
                <div className="sw-cp-step-circle">2</div>
                <div className="sw-cp-step-line" />
                <div className="sw-cp-step-title">Schedule Viewing</div>
                <div className="sw-cp-step-desc">Visit properties at your convenience</div>
              </div>

              <div className="sw-cp-process-step">
                <div className="sw-cp-step-circle">3</div>
                <div className="sw-cp-step-line" />
                <div className="sw-cp-step-title">Submit Application</div>
                <div className="sw-cp-step-desc">Complete the rental application</div>
              </div>

              <div className="sw-cp-process-step">
                <div className="sw-cp-step-circle">4</div>
                <div className="sw-cp-step-line" />
                <div className="sw-cp-step-title">Move In</div>
                <div className="sw-cp-step-desc">Sign lease and get your keys</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            UPDATED: Schedule a Consultation (Home_Service booking form format)
           ========================= */}
        <div className="sw-cp-hs-booking-wrap">
          <div className="sw-cp-hs-booking-head">
            <h2>Schedule a Consultation</h2>
            <p>Let our experts guide you to the right investment opportunity</p>
          </div>

          <div className="sw-cp-hs-booking-card">
            <Form
              form={bookingForm}
              layout="vertical"
              onFinish={handleBookingSubmit}
              initialValues={{ serviceType: "Select" }}
            >
              <Row gutter={[20, 12]}>
                <Col xs={24} sm={12}>
                  <Form.Item label="Full Name" name="fullname" rules={[{ required: true, message: "Please enter your name" }]}>
                    <Input className="sw-cp-hs-booking-input" placeholder="John Doe" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter email" }, { type: "email", message: "Invalid email" }]}>
                    <Input className="sw-cp-hs-booking-input" placeholder="john@example.com" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: "Please enter phone" }]}>
                    <Input className="sw-cp-hs-booking-input" placeholder="+1 (555) 123-4567" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item label="Service Type" name="serviceType" rules={[{ required: true, message: "Please select service type" }]}>
                    <Select className="sw-cp-hs-booking-input" placeholder="Select Commercial Services">
                      <Option value="commercial-plots">Commercial Plots</Option>
                      <Option value="site-visit">Site Visit</Option>
                      <Option value="consultation">Investment Consultation</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item label="Service Address" name="address" rules={[{ required: true, message: "Please enter address" }]}>
                    <Input className="sw-cp-hs-booking-input" placeholder="123 Main St, City, State, ZIP" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item label="Preferred Date" name="date" rules={[{ required: true, message: "Please pick a date" }]}>
                    <DatePicker className="sw-cp-date-input" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item label="Preferred Time" name="time" rules={[{ required: true, message: "Please select a time" }]}>
                    <Select className="sw-cp-hs-booking-input" placeholder="Select time slot">
                      <Option value="morning">Morning (9am - 12pm)</Option>
                      <Option value="afternoon">Afternoon (12pm - 4pm)</Option>
                      <Option value="evening">Evening (4pm - 8pm)</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item label="Additional Details" name="details">
                    <Input.TextArea className="sw-cp-hs-booking-textarea" placeholder="Tell us more about your requirements..." />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item>
                    <Button htmlType="submit" className="sw-cp-hs-booking-submit" block>
                      Submit Booking Request
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        {/* ========================= END booking section ========================= */}

      </Content>

      <Footer className="sw-cp-cp-footer">
        <div className="sw-cp-cp-footer-inner">
          <div className="sw-cp-cp-footer-col">
            <h4>About Us</h4>
            <p>Your trusted partner for all home and property-related services. Quality, reliability, and customer satisfaction guaranteed.</p>
          </div>

          <div className="sw-cp-cp-footer-col">
            <h4>Services</h4>
            <ul>
              <li>Cleaning Service</li>
              <li>Packers & Movers</li>
              <li>Home Services</li>
              <li>Rentals</li>
              <li>Commercial Plots</li>
              <li>Construction Materials</li>
            </ul>
          </div>

          <div className="sw-cp-cp-footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>

          <div className="sw-cp-cp-footer-col">
            <h4>Contact Info</h4>

            <div className="sw-cp-cp-contact-row">
              <PhoneOutlined />
              <span>+1 (555) 123-4567</span>
            </div>

            <div className="sw-cp-cp-contact-row">
              <MailOutlined />
              <span>info@homeservices.com</span>
            </div>

            <div className="sw-cp-cp-contact-row">
              <EnvironmentOutlined />
              <span>123 Service Street, City, State</span>
            </div>

            {/* Social icons (styled as dark rounded squares like Home_Service) */}
            <div className="sw-cp-cp-footer-socials" aria-label="social links">
              <a aria-label="facebook" href="#" role="link">
                <FacebookOutlined />
              </a>
              <a aria-label="twitter" href="#" role="link">
                <TwitterOutlined />
              </a>
              <a aria-label="instagram" href="#" role="link">
                <InstagramOutlined />
              </a>
              <a aria-label="linkedin" href="#" role="link">
                <LinkedinOutlined />
              </a>
            </div>
          </div>
        </div>

        <div className="sw-cp-cp-footer-bottom">© {new Date().getFullYear()} Home Services. All rights reserved.</div>
      </Footer>

    </Layout>
  );
};

export default CommercialPlots;
