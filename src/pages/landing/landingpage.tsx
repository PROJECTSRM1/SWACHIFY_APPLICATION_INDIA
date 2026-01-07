// LandingPage.tsx
import CommonHeader from "../../pages/landing/Header";
import "../../index.css";

import { useNavigate } from "react-router-dom";
import { Button, Card, Row, Col } from "antd";
import FooterSection from "../../pages/landing/FooterSection";
import "../../pages/landing/FooterSection.css";


import {
  HomeOutlined,
  TruckOutlined,
  ToolOutlined,
  ShopOutlined,
  ApartmentOutlined,
  BuildOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

import heroImage from "../../assets/landingimages/hero.jpg";

// 🔹 Import shared JSON config
import educationData from "../../data/educationData.json";
import type React from "react";

// 🔹 Types (optional, just for clarity)
type LandingService = {
  id: number;
  iconKey: string;
  title: string;
  desc: string;
  route: string;
};

type LandingWhyCard = {
  iconKey: string;
  title: string;
  desc: string;
};

type LandingHero = {
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundImageKey: string;
};

// 🔹 Map hero background imageKey -> actual import
const heroBgMap: Record<string, string> = {
  landingHero: heroImage,
};

// 🔹 Extract hero data from JSON with fallback
const landingHero: LandingHero = (educationData as any).landingHero || {
  title: "Transform Your Home & Property Services",
  subtitle: "Your trusted solution for cleaning, moving, rentals, construction, and more.",
  buttonText: "Get Started",
  backgroundImageKey: "landingHero",
};

// 🔹 Resolve background image
const heroBackgroundImage =
  heroBgMap[landingHero.backgroundImageKey] ?? heroImage;

// 🔹 Icon maps for services & why-cards
const landingServiceIconMap: Record<string, React.ReactNode> = {
  home: <HomeOutlined style={{ fontSize: 28, color: "#1677ff" }} />,
  truck: <TruckOutlined style={{ fontSize: 28, color: "#00aa33" }} />,
  shop: <ShopOutlined style={{ fontSize: 28, color: "#ff7a00" }} />,
  build: <BuildOutlined style={{ fontSize: 28, color: "#8b00ff" }} />,
  book: <BookOutlined style={{ fontSize: 28, color: "#ff3333" }} />,
  cart: <ShoppingCartOutlined style={{ fontSize: 28, color: "#ffaa00" }} />,
  user: <UserOutlined style={{ fontSize: 28, color: "#ffaa00" }} />,
};

const landingWhyIconMap: Record<string, React.ReactNode> = {
  tools: <ToolOutlined style={{ fontSize: 28, color: "#ff7a00" }} />,
  home: <HomeOutlined style={{ fontSize: 28, color: "#1677ff" }} />,
  truck: <TruckOutlined style={{ fontSize: 28, color: "#00aa33" }} />,
  build: <BuildOutlined style={{ fontSize: 28, color: "#ffaa00" }} />,
  apartment: <ApartmentOutlined style={{ fontSize: 28, color: "#8b00ff" }} />,
  shop: <ShopOutlined style={{ fontSize: 28, color: "#ff3333" }} />,
};

// 🔹 Read services & why-choose-us from JSON
const landingServicesConfig: LandingService[] =
  ((educationData as any).landingServices as LandingService[]) || [];

const services = landingServicesConfig.map((item) => ({
  icon: landingServiceIconMap[item.iconKey] || null,
  title: item.title,
  desc: item.desc,
  route: item.route,
}));

const landingWhyConfig: LandingWhyCard[] =
  ((educationData as any).landingWhyChooseUs as LandingWhyCard[]) || [];

const whyChooseCards = landingWhyConfig.map((item) => ({
  icon: landingWhyIconMap[item.iconKey] || null,
  title: item.title,
  desc: item.desc,
}));

const LandingPage = () => {
  const navigate = useNavigate();

  const scrollToServices = () => {
    document.getElementById("services-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="sw-lp-classname-landing-container">
      <CommonHeader selectedKey="landing" />

      {/* HERO SECTION */}
      <section
        className="sw-lp-classname-hero-section"
        style={{ backgroundImage: `url(${heroBackgroundImage})` }}
      >
        <div className="sw-lp-classname-hero-content">
          <h1>{landingHero.title}</h1>
          <p>{landingHero.subtitle}</p>

          <Button type="primary" size="large" onClick={scrollToServices}>
            {landingHero.buttonText}
          </Button>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services-section" className="sw-lp-classname-services-section">
        <h2 className="sw-lp-classname-section-title">Our Services</h2>
        <p className="sw-lp-classname-section-subtitle">
          Comprehensive solutions for all your home and property needs
        </p>

        <Row gutter={[24, 24]} justify="center">
          {services.map((item, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                hoverable
                className="sw-lp-classname-service-card"
                onClick={() => navigate(item.route)}
              >
                <div className="sw-lp-classname-service-icon">{item.icon}</div>
                <h3 className="sw-lp-classname-service-title">{item.title}</h3>
                <p className="sw-lp-classname-service-desc">{item.desc}</p>
                <span className="sw-lp-classname-learn-more">Learn More →</span>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* WHY CHOOSE US */}
      <section className="sw-lp-classname-why-choose-section">
        <div className="sw-lp-classname-container">
          <h2 className="sw-lp-classname-section-title">Why Choose Our Service</h2>
          <p className="sw-lp-classname-section-subtitle">
            We focus on quality, trust and speed — built to make your life easier.
          </p>

          <Row gutter={[20, 20]} justify="center">
            {whyChooseCards.map((card, i) => (
              <Col xs={24} sm={12} md={8} key={i}>
                <Card className="sw-lp-classname-why-card" hoverable>
                  <div style={{ display: "flex", gap: 12 }}>
                    {card.icon}
                    <div>
                      <h4>{card.title}</h4>
                      <p>{card.desc}</p>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* FOOTER (still via FooterSection component) */}
      <FooterSection selectedKey="LandingPackers" />
    </div>
  );
};

export default LandingPage;
