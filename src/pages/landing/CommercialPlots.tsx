import React, { useMemo, useState } from "react";
import {
  Layout,
  Menu,
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
import {
  HomeOutlined,
  SearchOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./commercialplots.css";

/* Update this path to your hero/background image file in your repo */
import heroImg from "../../assets/landingimages/property4.jfif";

/* Replace these imports with your real images */
import card1 from "../../assets/landingimages/building.jpg";
import card2 from "../../assets/landingimages/commercial plot.jpg";
import card3 from "../../assets/landingimages/land.jpg";
import card4 from "../../assets/landingimages/plot.jpg";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

type Product = {
  id: number;
  img: string;
  title: string;
  desc: string;
  price: string;
  category?: string;
};

const navItems = [
  { key: "home", label: <Link to="/">Home</Link> },
  { key: "cleaning", label: <Link to="/cleaningservice">Cleaning</Link> },
  { key: "packers", label: <Link to="/LandingPackers">Packers & Movers</Link> },
  { key: "home_services", label: <Link to="/home_service">Home Services</Link> },
  { key: "rentals", label: <Link to="/rentals">Rentals</Link> },
  { key: "commercial", label: <Link to="/commercial-plots">Buy&Sale Properties</Link> },
  { key: "materials", label: <Link to="/ConstructionMaterials">Construction Materials</Link> },
];

const propertyTypes = [
  { id: "apt", title: "Apartments", count: "1,250+", sub: "Properties" },
  { id: "house", title: "Houses", count: "800+", sub: "Properties" },
  { id: "villa", title: "Villas", count: "350+", sub: "Properties" },
  { id: "studio", title: "Studio", count: "600+", sub: "Properties" },
];

const PRODUCTS: Product[] = [
  { id: 1, img: card1, title: " Building - 1000 sq.ft", desc: "Prime commercial plot in business district", price: "$50,000", category: "Retail" },
  { id: 2, img: card2, title: " Plot - 2500 sq.ft", desc: "Large commercial plot near highway", price: "$120,000", category: "Industrial" },
  { id: 3, img: card3, title: " Land - 5000 sq.ft", desc: "Premium location for development", price: "$250,000", category: "Mixed" },
  { id: 4, img: card4, title: "Corner Plot - 3000 sq.ft", desc: "Corner plot with excellent visibility", price: "$180,000", category: "Retail" },
];

const CommercialPlots: React.FC = () => {
  // search/filter state
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState<string | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);

  // booking form state (simple, local)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const [setBookingDate] = useState<any>(null);

  // auth modal state
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState<"login" | "register">("login");

  // login/register forms
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const filteredProducts = useMemo(() => {
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
  };

  const onRegisterFinish = (values: any) => {
    console.log("Register:", values);
    message.success("Registered (demo)");
    setAuthModalVisible(false);
    registerForm.resetFields();
  };

  const validateConfirm = (_: any, val: string) => {
    const pwd = registerForm.getFieldValue("password");
    if (!val || val === pwd) return Promise.resolve();
    return Promise.reject(new Error("Passwords do not match"));
  };

  return (
    <Layout className="cp-layout">
      <Header className="cp-header">
        <div className="cp-logo"><span className="cp-logo-text">SWACHIFY INDIA</span></div>

        <Menu mode="horizontal" selectable={false} className="cp-menu" items={navItems} />

        <Button
          type="primary"
          className="cp-contact-btn"
          onClick={() => {
            setActiveAuthTab("login");
            setAuthModalVisible(true);
          }}
        >
          Sign Up
        </Button>
      </Header>

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
                  label="Email or Phone"
                  name="identifier"
                  rules={[{ required: true, message: "Please enter email or phone" }]}
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

                <Form.Item
                  label="Confirm Password"
                  name="confirm"
                  dependencies={["password"]}
                  rules={[{ required: true, message: "Confirm password" }, { validator: validateConfirm }]}
                >
                  <Input.Password placeholder="Confirm password" />
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

      <Content className="cp-content">
        {/* =========================
            SEARCH HERO (AntD inputs) with background image
           ========================= */}
        <section
          className="cp-search-hero"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(138,43,226,0.72), rgba(155,89,255,0.72)), url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="cp-search-inner">
            <div className="cp-search-breadcrumb">
              <span className="search-crumb-icon">🏠</span>
              <span>Buy & Sale Properties</span>
            </div>

            <h1 className="cp-search-title">Find Your Perfect Property</h1>
            <p className="cp-search-sub">
              Browse thousands of properties. From cozy studios to luxury penthouses, find a place you'll love to call home.
            </p>

            <div className="cp-search-box">
              <div className="cp-search-field">
                <Input
                  placeholder="Enter city or neighborhood"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="cp-search-input"
                  allowClear
                />
              </div>

              <div className="cp-search-field">
                <Select
                  placeholder="Property Type"
                  value={searchType}
                  onChange={(val) => setSearchType(val)}
                  className="cp-search-select"
                  allowClear
                >
                  <Option value="retail">Retail</Option>
                  <Option value="industrial">Industrial</Option>
                  <Option value="mixed">Mixed</Option>
                </Select>
              </div>

              <Button
                className="cp-search-btn"
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
        <section className="cp-browse-section">
          <div className="cp-browse-inner">
            <Title level={2} className="cp-browse-title">Browse by Property Type</Title>

            <div className="cp-browse-row" role="list">
              {propertyTypes.map((pt) => (
                <div
                  key={pt.id}
                  className="browse-card-wrap"
                  role="listitem"
                  onClick={() => setSelectedType(pt.id === selectedType ? undefined : pt.id)}
                >
                  <div className={`browse-card ${selectedType === pt.id ? "browse-card--active" : ""}`}>
                    <div className="browse-icon">
                      <div className="browse-icon-circle"><HomeOutlined /></div>
                    </div>

                    <div className="browse-body">
                      <div className="browse-title">{pt.title}</div>
                      <div className="browse-count">{pt.count}</div>
                      <div className="browse-sub">{pt.sub}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cp-products-section">
          <div className="cp-products-inner">
            <Row justify="center" style={{ marginBottom: 8 }}>
              <Col>
                <Title level={3} className="cp-products-title">Featured Quick Listings</Title>
              </Col>
            </Row>

            <div className="product-grid" aria-live="polite">
              {filteredProducts.map((item) => (
                <Card
                  key={item.id}
                  className="product-card"
                  cover={
                    <div className="product-image-wrap">
                      <img src={item.img} alt={item.title} className="product-image" />
                    </div>
                  }
                >
                  <div className="product-body">
                    <h4 className="product-title">{item.title}</h4>
                    <p className="product-desc">{item.desc}</p>

                    <div className="product-meta">
                      <div className="product-price">{item.price}</div>
                      <Space>
                        <Button className="product-btn" onClick={() => {/* navigate to details */}}>
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

        <section className="cp-process-section">
          <div className="cp-process-inner">
            <Title level={2} className="cp-process-title">How It Works</Title>

            <div className="process-row">
              <div className="process-step">
                <div className="step-circle">1</div>
                <div className="step-line" />
                <div className="step-title">Search & Filter</div>
                <div className="step-desc">Browse properties matching your needs</div>
              </div>

              <div className="process-step">
                <div className="step-circle">2</div>
                <div className="step-line" />
                <div className="step-title">Schedule Viewing</div>
                <div className="step-desc">Visit properties at your convenience</div>
              </div>

              <div className="process-step">
                <div className="step-circle">3</div>
                <div className="step-line" />
                <div className="step-title">Submit Application</div>
                <div className="step-desc">Complete the rental application</div>
              </div>

              <div className="process-step">
                <div className="step-circle">4</div>
                <div className="step-line" />
                <div className="step-title">Move In</div>
                <div className="step-desc">Sign lease and get your keys</div>
              </div>
            </div>
          </div>
        </section>

        <section className="cp-booking-section">
          <div className="cp-booking-inner">
            <Title level={2} className="cp-booking-title">Schedule a Consultation</Title>
            <Paragraph className="cp-booking-sub">Let our experts guide you to the right investment opportunity</Paragraph>

            <div className="cp-booking-card">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <label className="booking-label">Full Name *</label>
                  <Input placeholder="John Doe" className="booking-input" />
                </Col>
                <Col xs={24} md={12}>
                  <label className="booking-label">Email *</label>
                  <Input placeholder="john@example.com" className="booking-input" />
                </Col>

                <Col xs={24} md={12}>
                  <label className="booking-label">Phone Number *</label>
                  <Input placeholder="+1 (555) 123-4567" className="booking-input" />
                </Col>
                <Col xs={24} md={12}>
                  <label className="booking-label">Service Type *</label>
                  <Select placeholder="Select Commercial Plots" className="booking-input" value={searchType} onChange={(v) => setSearchType(v)}>
                    <Option value="commercial">Commercial Plots</Option>
                    <Option value="site">Site Visit</Option>
                    <Option value="consult">Investment Consultation</Option>
                  </Select>
                </Col>

                <Col xs={24}>
                  <label className="booking-label">Service Address *</label>
                  <Input placeholder="123 Main St, City, State, ZIP" className="booking-input" />
                </Col>

                <Col xs={24} md={12}>
                  <label className="booking-label">Preferred Date *</label>
                  <DatePicker onChange={(d) => setBookingDate(d)} className="booking-input fullwidth" />
                </Col>
                <Col xs={24} md={12}>
                  <label className="booking-label">Preferred Time *</label>
                  <Select placeholder="Select time slot" className="booking-input">
                    <Option>9:00 AM – 11:00 AM</Option>
                    <Option>11:00 AM – 1:00 PM</Option>
                    <Option>2:00 PM – 4:00 PM</Option>
                    <Option>4:00 PM – 6:00 PM</Option>
                  </Select>
                </Col>

                <Col xs={24}>
                  <label className="booking-label">Additional Details</label>
                  <Input.TextArea rows={4} placeholder="Tell us more about your requirements..." className="booking-textarea" />
                </Col>

                <Col xs={24}>
                  <Button type="primary" block className="booking-submit">Submit Booking Request</Button>
                </Col>
              </Row>
            </div>
          </div>
        </section>
      </Content>

      <Footer className="cp-footer">
        <div className="cp-footer-inner">
          <div className="cp-footer-col">
            <h4>About Us</h4>
            <p>Your trusted partner for all home and property-related services. Quality, reliability, and customer satisfaction guaranteed.</p>
          </div>

          <div className="cp-footer-col">
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

          <div className="cp-footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>

          <div className="cp-footer-col">
            <h4>Contact Info</h4>
            <p>📞 +1 (555) 123-4567</p>
            <p>📧 info@homeservices.com</p>
            <p>📍 123 Service Street, City, State</p>
          </div>
        </div>

        <div className="cp-footer-bottom">© {new Date().getFullYear()} Home Services. All rights reserved.</div>
      </Footer>
    </Layout>
  );
};

export default CommercialPlots;
