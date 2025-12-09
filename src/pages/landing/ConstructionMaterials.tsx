// src/pages/landing/ConstructionMaterials.tsx
import React, { useState, useEffect } from "react";
import CommonHeader from "../../pages/landing/Header";
import "../../index.css";
import FooterSection from "../../pages/landing/FooterSection";
import "../../pages/landing/FooterSection.css";
import {
  Row,
  Col,
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

// 🔹 JSON CONFIG IMPORT
import educationData from "../../data/educationData.json";

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

/**
 * Allow calling the header modal helper added by CommonHeader
 * (CommonHeader sets window.openAuthModal in its useEffect)
 */
declare global {
  interface Window {
    openAuthModal?: (tab?: "login" | "register") => void;
    closeAuthModal?: () => void;
  }
}

/* ================= NAVBAR SECTION ================= */
const NavbarSection: React.FC = () => (
  <>
    <CommonHeader selectedKey="ConstructionMaterials" />
  </>
);

/* ================= TYPES FOR JSON CONFIG ================= */
type ConstructionHeroConfig = {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  backgroundImageKey: string;
};

type ConstructionServiceConfig = {
  id: number;
  title: string;
  description: string;
};

type ConstructionCategoryConfig = {
  id: number;
  title: string;
  items: string[];
  imageKey: string;
};

type ConstructionFeaturedProductConfig = {
  id: number;
  title: string;
  price: string;
  rating: string;
  details: string[];
  imageKey: string;
};

/* ================= IMAGE MAPS ================= */
const constructionHeroBgMap: Record<string, string> = {
  constructionHero: brickwalss,
};

const constructionCategoryImageMap: Record<string, string> = {
  cementConcrete: cementandconcrete,
  steelMetals: steelandmetals,
  bricksBlocks: bricksandblocks,
  sandAggregates: sandandaggregates,
  roofingMaterials: roofingmaterials,
  plumbingElectrical: plumbingandelectrical,
};

const constructionFeaturedImageMap: Record<string, string> = {
  premiumPortlandCement: premiumportlandcement,
  tmtSteelBars: tmtsteelbars,
  aacBlocks: aacblocks,
  mSand: msand,
};

/* ================= READ DATA FROM JSON ================= */
const constructionHero: ConstructionHeroConfig =
  (educationData as any).constructionHero || {
    title: "Quality Building Materials at Best Prices",
    subtitle: "Browse our comprehensive range of construction materials.",
    primaryButtonText: "Browse Catalog",
    secondaryButtonText: "Get Bulk Quote",
    backgroundImageKey: "constructionHero",
  };

const heroBackgroundImage =
  constructionHeroBgMap[constructionHero.backgroundImageKey] || brickwalss;

const constructionServicesConfig: ConstructionServiceConfig[] =
  ((educationData as any).constructionServices as ConstructionServiceConfig[]) ||
  [];

const services = constructionServicesConfig.map((s) => ({
  title: s.title,
  description: s.description,
}));

const constructionCategoriesConfig: ConstructionCategoryConfig[] =
  ((educationData as any)
    .constructionCategories as ConstructionCategoryConfig[]) || [];

const productCategories = constructionCategoriesConfig.map((category) => ({
  title: category.title,
  items: category.items,
  image:
    constructionCategoryImageMap[category.imageKey] || cementandconcrete,
}));

const constructionFeaturedConfig: ConstructionFeaturedProductConfig[] =
  ((educationData as any)
    .constructionFeaturedProducts as ConstructionFeaturedProductConfig[]) || [];

const featuredProducts = constructionFeaturedConfig.map((p) => ({
  title: p.title,
  price: p.price,
  rating: p.rating,
  details: p.details,
  image: constructionFeaturedImageMap[p.imageKey] || premiumportlandcement,
}));

/* ================= AUTH MODAL (kept for local pages if needed) ================= */
const AuthModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}> = ({ visible, onClose, onSuccess }) => {
  const [activeKey, setActiveKey] = useState("login");
  const handleLoginFinish = () => {
    onSuccess();
    onClose();
  };
  const handleRegisterFinish = () => {
    onSuccess();
    onClose();
  };
  console.log(AuthModal, RequestQuote);
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={520}
      className="sw-lcm-classname-auth-modal"
    >
      <Tabs
        activeKey={activeKey}
        onChange={(k) => setActiveKey(k)}
        className="sw-lcm-classname-auth-tabs"
      >
        <TabPane tab="Login" key="login">
          <Form layout="vertical" onFinish={handleLoginFinish}>
            <Form.Item
              label={<span className="sw-lcm-classname-required"> Email / Phone</span>}
              name="identifier"
              rules={[{ required: true }]}
            >
              <Input placeholder="john@example.com" />
            </Form.Item>
            <Form.Item
              label={<span className="sw-lcm-classname-required">Password</span>}
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Register" key="register">
          <Form layout="vertical" onFinish={handleRegisterFinish}>
            <Form.Item
              name="fullName"
              label={<span className="sw-lcm-classname-required"> Full name</span>}
              rules={[{ required: true }]}
            >
              <Input placeholder="John Doe" />
            </Form.Item>
            <Form.Item
              name="email"
              label={<span className="sw-lcm-classname-required"> Email</span>}
              rules={[{ required: true, type: "email" }]}
            >
              <Input placeholder="john@example.com" />
            </Form.Item>
            <Form.Item
              name="phone"
              label={<span className="sw-lcm-classname-required"> Phone</span>}
              rules={[{ required: true }]}
            >
              <Input placeholder="+1 555 123 4567" />
            </Form.Item>
            <Form.Item
              name="password"
              label={<span className="sw-lcm-classname-required"> Password</span>}
              rules={[{ required: true }]}
            >
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
                    if (!value || getFieldValue("password") === value)
                      return Promise.resolve();
                    return Promise.reject(
                      new Error("Passwords do not match")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
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
        <Title level={2} className="sw-lcm-classname-rq-title">
          Request a Quote
        </Title>
        <Text className="sw-lcm-classname-rq-sub">
          Tell us about your project and get a customized quote
        </Text>
        <div className="sw-lcm-classname-rq-card">
          <Form
            onFinish={handleSubmit}
            layout="vertical"
            className="sw-lcm-classname-rq-form"
          >
            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Full Name *"
                  name="fullName"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="John Doe" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Email *"
                  name="email"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="john@example.com" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Phone Number *"
                  name="phone"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="+1 555 123 4567" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Service Type *"
                  name="service"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select Material">
                    <Option value="construction-materials">
                      Construction Materials
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24}>
                <Form.Item
                  label="Service Address *"
                  name="address"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="123 Main St" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Preferred Date *"
                  name="date"
                  rules={[{ required: true }]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Preferred Time *"
                  name="time"
                  rules={[{ required: true }]}
                >
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
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="sw-lcm-classname-rq-submit"
            >
              Submit Booking Request
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
};

/* ================= MAIN PAGE ================= */
const ConstructionMaterials: React.FC = () => {
  const [authVisible, setAuthVisible] = useState<boolean>(false);

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
  console.log(handleAuthSuccess);

  return (
    <div className="sw-lcm-classname-construction-materials-container">
      <NavbarSection />
      {/* HERO */}
      <section
        className="sw-lcm-classname-hero-section"
        style={{
          backgroundImage: `url(${heroBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="sw-lcm-classname-hero-overlay">
          <h1>{constructionHero.title}</h1>
          <p>{constructionHero.subtitle}</p>
          <div className="sw-lcm-classname-hero-buttons">
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
                  // fallback: show local auth modal (keeps behavior safe if header helper isn't mounted)
                  setAuthVisible(true);
                  console.warn(
                    "openAuthModal not available on window. Showing local auth modal as fallback."
                  );
                }
              }}
            >
              {constructionHero.primaryButtonText}
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
                  console.warn(
                    "openAuthModal not available on window. Showing local auth modal as fallback."
                  );
                }
              }}
            >
              {constructionHero.secondaryButtonText}
            </Button>
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
                    <ul>
                      {category.items.map((it, j) => (
                        <li key={j}>{it}</li>
                      ))}
                    </ul>
                    <Button
                      type="primary"
                      block
                      onClick={() => {
                        // Open header auth modal (register tab) — header will redirect to dashboard after login
                        if ((window as any).openAuthModal) {
                          (window as any).openAuthModal("register");
                        } else {
                          console.warn(
                            "openAuthModal not available on window. Ensure CommonHeader is mounted."
                          );
                        }
                      }}
                    >
                      Browse
                    </Button>
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
                  <div className="sw-lcm-classname-featured-media">
                    <img src={p.image} alt={p.title} />
                  </div>
                  <div className="sw-lcm-classname-featured-body">
                    <h3>{p.title}</h3>
                    <p className="sw-lcm-classname-fp-price">
                      Price: {p.price}
                    </p>
                    <p className="sw-lcm-classname-fp-rating">
                      Rating: {p.rating}
                    </p>
                    <ul>
                      {p.details.map((d, j) => (
                        <li key={j}>{d}</li>
                      ))}
                    </ul>
                    <Button
                      type="primary"
                      block
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
                      Request Quote
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* REQUEST QUOTE (optional / as per your original layout) */}
      {/* <RequestQuote /> */}

      {/* AUTH MODAL (local fallback) */}
      <AuthModal
        visible={authVisible}
        onClose={() => setAuthVisible(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* FOOTER */}
      <FooterSection selectedKey="ConstructionMaterials" />
    </div>
  );
};

export default ConstructionMaterials;
