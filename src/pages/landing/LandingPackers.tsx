// src/pages/landing/LandingPackers.tsx
import React, { useState } from "react";
import CommonHeader from "../../pages/landing/Header";
import "../../index.css";
import FooterSection from "../../pages/landing/FooterSection";
import "../../pages/landing/FooterSection.css";
import {
  Card,
  Button,
  Form,
  Input,
  Modal,
  Tabs,
  Checkbox,
  Row,
  Col,
} from "antd";
import {
  CheckCircleOutlined,
  TruckOutlined,
  SafetyCertificateOutlined,
  DollarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// === IMAGE IMPORTS ===
import heroPackers from "../../assets/landingimages/Packers.jpg";
import packingServicesImg from "../../assets/landingimages/PackingServices .jpg";
import localandlongdistance from "../../assets/landingimages/localandlongdistance.jpg";
import residentialMovingImg from "../../assets/landingimages/residential-moving.jpg";
import officeRelocationImg from "../../assets/landingimages/office-relocation.jpg";
import vehicleTransportImg from "../../assets/landingimages/vehicle-transport.jpg";
import Loadingtransport from "../../assets/landingimages/Loadingtransport.jpg";
import insurance from "../../assets/landingimages/insurance.jpeg";
// =====================

// 🔹 JSON CONFIG IMPORT
import educationData from "../../data/educationData.json";

declare global {
  interface Window {
    openAuthModal?: (tab?: "login" | "register") => void;
    closeAuthModal?: () => void;
  }
}

const { TabPane } = Tabs;

// 🔹 Types for config
type PackersHeroConfig = {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  backgroundImageKey: string;
};

type PackersServiceConfig = {
  id: number;
  imageKey: string;
  iconKey: string;
  title: string;
  desc: string;
};

type PackersTypeConfig = {
  id: number;
  title: string;
  price: string;
  imageKey: string;
  features: string[];
};

type PackersReasonConfig = {
  iconKey: string;
  title: string;
  desc: string;
};

// 🔹 Hero background map
const packersHeroBgMap: Record<string, string> = {
  packersHero: heroPackers,
};

// 🔹 Image maps
const packersImageMap: Record<string, string> = {
  packingServices: packingServicesImg,
  loadingTransport: Loadingtransport,
  localLongDistance: localandlongdistance,
  insurance: insurance,
  residentialMoving: residentialMovingImg,
  officeRelocation: officeRelocationImg,
  vehicleTransport: vehicleTransportImg,
};

// 🔹 Icon maps (keep same colors & styles as your original UI)
const packersServiceIconMap: Record<string, React.ReactNode> = {
  checkCircle: <CheckCircleOutlined style={{ fontSize: 30, color: "#00aa33" }} />,
  dollar: <DollarOutlined style={{ fontSize: 30, color: "#8b00ff" }} />,
  truck: <TruckOutlined style={{ fontSize: 30, color: "#1677ff" }} />,
  safety: (
    <SafetyCertificateOutlined style={{ fontSize: 30, color: "#ff7a00" }} />
  ),
};

const packersReasonIconMap: Record<string, React.ReactNode> = {
  user: <UserOutlined style={{ fontSize: 30, color: "#00aa33" }} />,
  clock: <ClockCircleOutlined style={{ fontSize: 30, color: "#1677ff" }} />,
  safety: (
    <SafetyCertificateOutlined style={{ fontSize: 30, color: "#ff7a00" }} />
  ),
};

// 🔹 Read data from JSON with fallbacks
const packersHero: PackersHeroConfig = (educationData as any).packersHero || {
  title: "Stress-Free Relocation Services",
  subtitle: "From packing to delivery, we make your move effortless.",
  primaryButtonText: "Book Now",
  secondaryButtonText: "Get Quote",
  backgroundImageKey: "packersHero",
};

const heroBackgroundImage =
  packersHeroBgMap[packersHero.backgroundImageKey] || heroPackers;

const packersServicesConfig: PackersServiceConfig[] =
  ((educationData as any).packersServices as PackersServiceConfig[]) || [];

const services = packersServicesConfig.map((s) => ({
  img: packersImageMap[s.imageKey] || packingServicesImg,
  icon: packersServiceIconMap[s.iconKey] || null,
  title: s.title,
  desc: s.desc,
}));

const packersTypesConfig: PackersTypeConfig[] =
  ((educationData as any).packersTypes as PackersTypeConfig[]) || [];

const typesOfServices = packersTypesConfig.map((t) => ({
  title: t.title,
  price: t.price,
  image: packersImageMap[t.imageKey] || residentialMovingImg,
  features: t.features,
}));

const packersReasonsConfig: PackersReasonConfig[] =
  ((educationData as any).packersReasons as PackersReasonConfig[]) || [];

const reasons = packersReasonsConfig.map((r) => ({
  icon: packersReasonIconMap[r.iconKey] || null,
  title: r.title,
  desc: r.desc,
}));

const LandingPackers: React.FC = () => {
  const [authVisible, setAuthVisible] = useState(false);
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = (values: any) => {
    console.log("Login:", values);
    setAuthVisible(false);
    navigate("/app/dashboard");
  };

  const handleRegister = (values: any) => {
    console.log("Register:", values);
    setAuthVisible(false);
    navigate("/app/dashboard");
  };

  const AuthModal = () => (
    <Modal
      open={authVisible}
      onCancel={() => setAuthVisible(false)}
      footer={null}
      centered
      width={550}
      className="sw-lpm-classname-auth-modal"
    >
      <Tabs defaultActiveKey="login" centered>
        <TabPane tab="Login" key="login">
          <Form form={loginForm} layout="vertical" onFinish={handleLogin}>
            <Form.Item
              label="Email / Phone"
              name="identifier"
              rules={[{ required: true }]}
            >
              <Input placeholder="john@example.com" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form>
        </TabPane>

        <TabPane tab="Register" key="register">
          <Form form={registerForm} layout="vertical" onFinish={handleRegister}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true }]}
            >
              <Input placeholder="John Doe" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input placeholder="john@example.com" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true }]}
            >
              <Input placeholder="+1 555 123 4567" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirm"
              dependencies={["password"]}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    return !value || getFieldValue("password") === value
                      ? Promise.resolve()
                      : Promise.reject("Passwords do not match");
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );

  const handleRequestQuoteSubmit = (values: any) => {
    if (typeof window !== "undefined" && (window as any).openAuthModal) {
      (window as any).openAuthModal("register");
    } else {
      setAuthVisible(true);
    }
    console.log("Request Quote submitted (redirecting to signup):", values);
  };

  return (
    <div className="sw-lpm-classname-packers-container">
      <CommonHeader selectedKey="LandingPackers" />

      <AuthModal />

      {/* HERO SECTION */}
      <section
        className="sw-lpm-classname-packes-hero"
        style={{ backgroundImage: `url(${heroBackgroundImage})` }}
      >
        <div className="sw-lpm-classname-hero-overlay">
          <h1>{packersHero.title}</h1>
          <p>{packersHero.subtitle}</p>

          <div className="sw-lpm-classname-hero-actions">
            <Button
              type="primary"
              size="large"
              onClick={() => {
                if (
                  typeof window !== "undefined" &&
                  (window as any).openAuthModal
                ) {
                  (window as any).openAuthModal("register");
                } else {
                  setAuthVisible(true);
                }
              }}
            >
              {packersHero.primaryButtonText}
            </Button>

            <Button
              size="large"
              onClick={() => {
                if (
                  typeof window !== "undefined" &&
                  (window as any).openAuthModal
                ) {
                  (window as any).openAuthModal("register");
                } else {
                  setAuthVisible(true);
                }
              }}
            >
              {packersHero.secondaryButtonText}
            </Button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="sw-lpm-classname-packes-services">
        <h2>Our Services</h2>
        <div className="sw-lpm-classname-services-row">
          {services.map((s, i) => (
            <Card key={i} className="sw-lpm-classname-packes-card">
              <img
                src={s.img}
                className="sw-lpm-classname-service-img"
                alt={s.title}
              />
              <div className="sw-lpm-classname-packes-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* TYPES OF SERVICES */}
      <section className="sw-lpm-classname-types-of-services">
        <h2>Types of Moving Services</h2>
        <div className="sw-lpm-classname-types-row">
          {typesOfServices.map((t, i) => (
            <Card
              key={i}
              className="sw-lpm-classname-service-card"
              cover={
                <img
                  src={t.image}
                  className="sw-lpm-classname-service-img"
                  alt={t.title}
                />
              }
            >
              <h3>{t.title}</h3>
              <p>Starting at {t.price}</p>
              <ul>
                {t.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
              <Button
                type="primary"
                onClick={() => {
                  if (
                    typeof window !== "undefined" &&
                    (window as any).openAuthModal
                  ) {
                    (window as any).openAuthModal("register");
                  } else {
                    setAuthVisible(true);
                  }
                }}
              >
                Get Quote
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* REQUEST QUOTE */}
      <section className="sw-lpm-classname-request-quote">
        <h2>Request a Moving Quote</h2>

        <div className="sw-lpm-classname-quote-form-wrap">
          <div className="sw-lpm-classname-quote-form-container">
            <Form
              layout="vertical"
              className="sw-lpm-classname-quote-form"
              onFinish={handleRequestQuoteSubmit}
            >
              <Row gutter={[16, 12]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Your full name" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: "email" }]}
                  >
                    <Input
                      placeholder="you@example.com"
                      prefix={<MailOutlined />}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="+1 555 123 4567" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Moving Date (optional)" name="moveDate">
                    <Input placeholder="Preferred moving date" />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    label="Pickup Address"
                    name="pickup"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Pickup address" />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    label="Delivery Address"
                    name="delivery"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Delivery address" />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item label="Additional Details" name="details">
                    <Input.TextArea
                      rows={4}
                      placeholder="Number of rooms, special items, stairs, parking, etc."
                    />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      className="sw-lpm-classname-quote-submit-btn"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="sw-lpm-classname-why-choose-us">
        <h2>Why Choose Us</h2>
        <div className="sw-lpm-classname-choose-us-wrapper">
          {reasons.map((r, i) => (
            <div key={i} className="sw-lpm-classname-choose-us-card">
              <div className="sw-lpm-classname-choose-us-icon">{r.icon}</div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <FooterSection selectedKey="LandingPackers" />
    </div>
  );
};

export default LandingPackers;
