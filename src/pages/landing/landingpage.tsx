// LandingPage.tsx
import CommonHeader from "../../pages/landing/Header";
import "../../index.css";

import { useNavigate } from "react-router-dom";
import { Button, Card, Row, Col } from "antd";
import FooterSection from '../../pages/landing/FooterSection';
import "../../pages/landing/FooterSection.css"


import {
  HomeOutlined,
  TruckOutlined,
  ToolOutlined,
  ShopOutlined,
  ApartmentOutlined,
  BuildOutlined,
  // PhoneOutlined,
  // MailOutlined,
  // EnvironmentOutlined,
  // GlobalOutlined
} from "@ant-design/icons";
import heroImage from "../../assets/landingimages/hero.jpg";

const services = [
  {
    icon: <HomeOutlined style={{ fontSize: 28, color: "#1677ff" }} />,
    title: "Cleaning Service",
    desc: "Professional cleaning solutions for your home and office.",
    route: "/cleaningservice",
  },
  {
    icon: <TruckOutlined style={{ fontSize: 28, color: "#00aa33" }} />,
    title: "Packers & Movers",
    desc: "Safe and reliable relocation services with complete packing solutions.",
    route: "/LandingPackers",
  },
  {
    icon: <ToolOutlined style={{ fontSize: 28, color: "#ff7a00" }} />,
    title: "Home Services",
    desc: "Expert plumbing, electrical, carpentry and home maintenance.",
    route: "/home_service",
  },
  {
    icon: <ApartmentOutlined style={{ fontSize: 28, color: "#8b00ff" }} />,
    title: "Home & Apartments Rental",
    desc: "Find your perfect home with our vast rental listings.",
    route: "/rentals",
  },
  {
    icon: <ShopOutlined style={{ fontSize: 28, color: "#ff3333" }} />,
    title: "Commercial Plots",
    desc: "Premium commercial plots with excellent investment potential.",
    route: "/commercial-plots",
  },
  {
    icon: <BuildOutlined style={{ fontSize: 28, color: "#ffaa00" }} />,
    title: "Construction Raw Materials",
    desc: "Quality cement, bricks, and materials at best prices.",
    route: "/ConstructionMaterials",
  },
];

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
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="sw-lp-classname-hero-content">
          <h1>Transform Your Home & Property Services</h1>
          <p>Your trusted solution for cleaning, moving, rentals, construction, and more.</p>

          <Button type="primary" size="large" onClick={scrollToServices}>
            Get Started
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
            {[ 
              { icon: <ToolOutlined style={{ fontSize: 28, color: "#ff7a00" }} />, title: "Skilled Professionals", desc: "Verified, trained technicians who deliver quality service." },
              { icon: <HomeOutlined style={{ fontSize: 28, color: "#1677ff" }} />, title: "Trusted & Local", desc: "Local teams committed to timely service." },
              { icon: <TruckOutlined style={{ fontSize: 28, color: "#00aa33" }} />, title: "Transparent Pricing", desc: "Clear quotes with no hidden charges." },
              { icon: <BuildOutlined style={{ fontSize: 28, color: "#ffaa00" }} />, title: "Licensed & Insured", desc: "Fully insured technicians and certified service providers." },
              { icon: <ApartmentOutlined style={{ fontSize: 28, color: "#8b00ff" }} />, title: "Satisfaction Guarantee", desc: "If you're not satisfied, we fix it." },
              { icon: <ShopOutlined style={{ fontSize: 28, color: "#ff3333" }} />, title: "24/7 Support", desc: "Round-the-clock emergency support." },
            ].map((card, i) => (
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

      {/* FOOTER */}
      {/* <footer className="sw-lp-classname-footer">
        <div className="sw-lp-classname-footer-grid">
          
          <div>
            <h3>About Us</h3>
            <p>Your trusted partner for all home and property needs.</p>
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

            <div className="sw-lp-classname-contact-item">
              <PhoneOutlined /> <span>+1 (555) 123-4567</span>
            </div>

            <div className="sw-lp-classname-contact-item">
              <MailOutlined /> <span>info@homeservices.com</span>
            </div>

            <div className="sw-lp-classname-contact-item">
              <EnvironmentOutlined /> <span>123 Service Street, City, State</span>
            </div>

            <div className="sw-lp-classname-contact-item">
              <GlobalOutlined /> <span>www.homeservices.com</span>
            </div>

          </div>
        </div>

        <p className="sw-lp-classname-footer-bottom">
          © 2025 Home Services. All rights reserved.
        </p>
      </footer> */}
      <FooterSection selectedKey="LandingPackers" />

    </div>
  );
};

export default LandingPage;