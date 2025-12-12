// src/pages/landing/CommercialPlots.tsx
import React, { useRef, useState } from "react";
import CommonHeader from "../../pages/landing/Header";
import "../../pages/landing/Header.css"; // import CSS for header
import FooterSection from "../../pages/landing/FooterSection";
import "../../pages/landing/FooterSection.css";
import {
  Layout,
  Row,
  Col,
  Button,
  Typography,
  Input,
  Select,
  DatePicker,
  Card,
  Space,
  Form,
} from "antd";
import { HomeOutlined, SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

/* Hero/background image */
import heroImg from "../../assets/landingimages/property4.jpg";

/* Card images */
import card1 from "../../assets/landingimages/building.jpg";
import card2 from "../../assets/landingimages/commercial plot.jpg";
import card3 from "../../assets/landingimages/land.jpg";
import card4 from "../../assets/landingimages/plot.jpg";

/* ✅ JSON data import */
import educationData from "../../data/educationData.json";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

/* Map JSON imageKey -> actual imported image paths */
const imageMap: Record<string, string> = {
  building: card1,
  commercialPlot: card2,
  land: card3,
  cornerPlot: card4,
};

type Product = {
  id: number;
  img: string;
  title: string;
  desc: string;
  price: string;
  category?: string;
};

type CommercialPlotJson = {
  id: number;
  imageKey: string; // simpler & safer
  title: string;
  desc: string;
  price: string;
  category?: string;
};

/* 👇 take only the commercialPlots array from the big JSON */
const commercialPlotsJson: CommercialPlotJson[] =
  ((educationData as any).commercialPlots || []) as CommercialPlotJson[];

const PRODUCTS: Product[] = commercialPlotsJson.map((item) => ({
  id: item.id,
  title: item.title,
  desc: item.desc,
  price: item.price,
  category: item.category,
  img: imageMap[item.imageKey] || card1, // fallback just in case
}));

/* ========== Browse by Property Type from JSON ========== */

type PropertyTypeJson = {
  id: string;
  title: string;
  count: string;
  sub: string;
};

const propertyTypes: PropertyTypeJson[] =
  ((educationData as any).commercialPropertyTypes || []) as PropertyTypeJson[];

const CommercialPlots: React.FC = () => {
  // example unused state in your original code was removed
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState<string | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
  const [bookingForm] = Form.useForm();
  const navigate = useNavigate();

  // ref pointing to the featured listings section
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const disablePastDates = (current: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return current && current < today; // disable all past dates
  };

  const filteredProducts = React.useMemo(() => {
    const q = searchLocation.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
      const matchesType = !searchType || (p.category?.toLowerCase() === searchType.toLowerCase());
      // also respect selectedType (from the browse cards) if set (optional)
      const matchesSelectedType = !selectedType || selectedType === "" || p.category?.toLowerCase() === selectedType.toLowerCase();
      return matchesQuery && matchesType && matchesSelectedType;
    });
  }, [searchLocation, searchType, selectedType]);

  const handleBookingSubmit = () => {
    if ((window as any).openAuthModal) {
      (window as any).openAuthModal("register"); // Opens Sign-Up page/modal
    } else {
      navigate("/signup"); // fallback direct route if modal not available
    }
  };

  // Scroll function: smooth scroll to featured quick listings
  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // allow pressing Enter in search input to scroll as well
  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      scrollToResults();
    }
  };

  return (
    <Layout className="sw-cp-cp-layout">
      {/* Header must be mounted so it can open the modal via window.openAuthModal */}
      <CommonHeader selectedKey="commercial-plots" />
      <Content className="sw-cp-cp-content">
        {/* =========================
            SEARCH HERO
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
              Browse thousands of properties. From cozy studios to luxury
              penthouses, find a place you'll love to call home.
            </p>
            <div className="sw-cp-cp-search-box">
              <div className="sw-cp-cp-search-field">
                <Input
                  placeholder="Enter city or neighborhood"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onKeyDown={handleSearchEnter}
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
                  // keep search logic (state) and scroll to results
                  scrollToResults();
                }}
              >
                <SearchOutlined />
                <span>Search</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Browse by property type – NOW DYNAMIC FROM JSON */}
        <section className="sw-cp-cp-browse-section">
          <div className="sw-cp-cp-browse-inner">
            <Title level={2} className="sw-cp-cp-browse-title">Browse by Property Type</Title>
            <div className="sw-cp-cp-browse-row" role="list">
              {propertyTypes.map((pt) => (
                <div
                  key={pt.id}
                  className="sw-cp-browse-card-wrap"
                  role="listitem"
                  onClick={() =>
                    setSelectedType(pt.id === selectedType ? undefined : pt.id)
                  }
                >
                  <div
                    className={`sw-cp-browse-card ${
                      selectedType === pt.id
                        ? "sw-cp-browse-card--active"
                        : ""
                    }`}
                  >
                    <div className="sw-cp-browse-icon">
                      <div className="sw-cp-browse-icon-circle">
                        <HomeOutlined />
                      </div>
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

        {/* Products grid */}
        {/* attach ref here so scrollIntoView lands at start of this block */}
        <section className="sw-cp-cp-products-section" ref={resultsRef}>
          <div className="sw-cp-cp-products-inner">
            <Row justify="center" style={{ marginBottom: 8 }}>
              <Col>
                <Title level={3} className="sw-cp-cp-products-title">
                  Featured Quick Listings
                </Title>
              </Col>
            </Row>
            <div className="sw-cp-product-grid" aria-live="polite">
              {filteredProducts.map((item) => (
                <Card
                  key={item.id}
                  className="sw-cp-product-card"
                  cover={
                    <div className="sw-cp-product-image-wrap">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="sw-cp-product-image"
                      />
                    </div>
                  }
                >
                  <div className="sw-cp-product-body">
                    <h4 className="sw-cp-product-title">{item.title}</h4>
                    <p className="sw-cp-product-desc">{item.desc}</p>
                    <div className="sw-cp-product-meta">
                      <div className="sw-cp-product-price">{item.price}</div>
                      <Space>
                        <Button
                          className="sw-cp-product-btn"
                          onClick={() => {
                            if ((window as any).openAuthModal) {
                              (window as any).openAuthModal("register");
                            } else {
                              console.warn(
                                "openAuthModal not available on window. Ensure CommonHeader is mounted."
                              );
                            }
                          }}
                        >
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

        {/* Process section */}
        <section className="sw-cp-cp-process-section">
          <div className="sw-cp-cp-process-inner">
            <Title level={2} className="sw-cp-cp-process-title">How It Works</Title>
            <div className="sw-cp-process-row">
              <div className="sw-cp-process-step">
                <div className="sw-cp-step-circle">1</div>
                <div className="sw-cp-step-line" />
                <div className="sw-cp-step-title">Search & Filter</div>
                <div className="sw-cp-step-desc">
                  Browse properties matching your needs
                </div>
              </div>
              <div className="sw-cp-process-step">
                <div className="sw-cp-step-circle">2</div>
                <div className="sw-cp-step-line" />
                <div className="sw-cp-step-title">Schedule Viewing</div>
                <div className="sw-cp-step-desc">
                  Visit properties at your convenience
                </div>
              </div>
              <div className="sw-cp-process-step">
                <div className="sw-cp-step-circle">3</div>
                <div className="sw-cp-step-line" />
                <div className="sw-cp-step-title">Submit Application</div>
                <div className="sw-cp-step-desc">
                  Complete the rental application
                </div>
              </div>
              <div className="sw-cp-process-step">
                <div className="sw-cp-step-circle">4</div>
                <div className="sw-cp-step-line" />
                <div className="sw-cp-step-title">Move In</div>
                <div className="sw-cp-step-desc">
                  Sign lease and get your keys
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking form */}
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
                  <Form.Item
                    label="Full Name"
                    name="fullname"
                    rules={[
                      { required: true, message: "Please enter your name" },
                    ]}
                  >
                    <Input
                      className="sw-cp-hs-booking-input"
                      placeholder="John Doe"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter email" },
                      { type: "email", message: "Invalid email" },
                    ]}
                  >
                    <Input
                      className="sw-cp-hs-booking-input"
                      placeholder="john@example.com"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[
                      { required: true, message: "Please enter phone" },
                    ]}
                  >
                    <Input
                      className="sw-cp-hs-booking-input"
                      placeholder="+1 (555) 123-4567"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Service Type"
                    name="serviceType"
                    rules={[
                      {
                        required: true,
                        message: "Please select service type",
                      },
                    ]}
                  >
                    <Select
                      className="sw-cp-hs-booking-input"
                      placeholder="Select Commercial Services"
                    >
                      <Option value="commercial-plots">Commercial Plots</Option>
                      <Option value="site-visit">Site Visit</Option>
                      <Option value="consultation">
                        Investment Consultation
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label="Service Address"
                    name="address"
                    rules={[
                      { required: true, message: "Please enter address" },
                    ]}
                  >
                    <Input
                      className="sw-cp-hs-booking-input"
                      placeholder="123 Main St, City, State, ZIP"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Preferred Date"
                    name="date"
                    rules={[{ required: true, message: "Please pick a date"}]}>
                    <DatePicker
                      className="sw-cp-date-input"
                      disabledDate={disablePastDates}/>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Preferred Time" name="time" rules={[{ required: true, message: "Please select a time"}]}>
                    <Select className="sw-cp-hs-booking-input" placeholder="Select time slot">
                      <Option value="morning">Morning (9am - 12pm)</Option>
                      <Option value="afternoon">Afternoon (12pm - 4pm)</Option>
                      <Option value="evening">Evening (4pm - 8pm)</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Additional Details" name="details">
                    <Input.TextArea
                      className="sw-cp-hs-booking-textarea"
                      placeholder="Tell us more about your requirements..."
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      className="sw-cp-hs-booking-submit"
                      block
                    >
                      Submit Booking Request
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Content>
      <FooterSection selectedKey="CommercialPlots" />
    </Layout>
  );
};

export default CommercialPlots;