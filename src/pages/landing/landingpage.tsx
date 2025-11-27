
// at top of LandingPage.tsx
import CommonHeader from "../../pages/landing/Header";
import "../../pages/landing/Header.css"; // import CSS for header
import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  Row,
  Col,
} from "antd";

import {
  HomeOutlined,
  TruckOutlined,
  ToolOutlined,
  ShopOutlined,
  ApartmentOutlined,
  BuildOutlined,


} from "@ant-design/icons";

import "./landingpage.css";
import heroImage from "../../assets/landingimages/hero.jpg";


const services = [
  {
    icon: <HomeOutlined style={{ fontSize: 28, color: "#1677ff" }} />,
    title: "Cleaning Service",
    desc: "Professional cleaning solutions for your home and office. Deep cleaning, regular maintenance, and specialized services.",
    route: "/cleaningservice",
  },
  {
    icon: <TruckOutlined style={{ fontSize: 28, color: "#00aa33" }} />,
    title: "Packers & Movers",
    desc: "Safe and reliable relocation services. Local and long-distance moving with complete packing solutions.",
    route: "/LandingPackers",
  },
  {
    icon: <ToolOutlined style={{ fontSize: 28, color: "#ff7a00" }} />,
    title: "Home Services",
    desc: "Expert plumbing, electrical, carpentry, and maintenance services. Quick response and quality workmanship.",
    route: "/home_service",
  },
  {
    icon: <ApartmentOutlined style={{ fontSize: 28, color: "#8b00ff" }} />,
    title: "Home & Apartments Rental",
    desc: "Find your perfect home with our extensive rental listings. Apartments, houses, and furnished options available.",
    route: "/rentals",
  },
  {
    icon: <ShopOutlined style={{ fontSize: 28, color: "#ff3333" }} />,
    title: "commercial-plots",
    desc: "Premium commercial plots in prime locations. Excellent investment opportunities.",
    route: "/commercial-plots",
  },
  {
    icon: <BuildOutlined style={{ fontSize: 28, color: "#ffaa00" }} />,
    title: "Construction Raw Materials",
    desc: "Quality cement, bricks, and building materials at competitive prices.",
    route: "/ConstructionMaterials",
  },
];


const LandingPage = () => {
const navigate=useNavigate();

  const scrollToServices = () => {
    const section = document.getElementById("services-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing-container">
     {/* REPLACE old header with this single component */}
<CommonHeader selectedKey="landing" />


      {/* 🟦 HERO SECTION */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-content">
          <h1>Transform Your Home & Property Services</h1>
          <p >Your trusted solution for cleaning, moving, rentals, construction, and more.</p> 
          
          
          <Button type="primary" size="large" onClick={scrollToServices}>
            Get Started
          </Button>
        </div>
      </section>

      {/* 🟦 SERVICES SECTION */}
      
      <section id="services-section" className="services-section">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          Comprehensive solutions for all your home and property needs
        </p>

        <Row gutter={[24, 24]} justify="center">
          {services.map((item, i) => (
            <Col xs={24} sm={12} md={8} key={i}>
              <Card
                className="service-card"
                hoverable
                onClick={() => navigate(item.route)}
                style={{ cursor: "pointer" }}
              >
                <div className="service-icon">{item.icon}</div>
                <h3 className="service-title">{item.title}</h3>
                <p className="service-desc">{item.desc}</p>
                <a className="learn-more" href="#" onClick={(e) => e.preventDefault()}>
                  Learn More →
                </a>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* ===== NEW: WHY CHOOSE OUR SERVICE SECTION (placed below Our Services) ===== */}
      <section id="why-choose-section" className="why-choose-section" style={{ padding: "40px 20px" }}>
        <div className="container" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 className="section-title" style={{ textAlign: "center" }}>Why Choose Our Service</h2>
          <p className="section-subtitle" style={{ textAlign: "center", marginBottom: 28 }}>
            We focus on quality, trust and speed — built to make your life easier.
          </p>

          <Row gutter={[20, 20]} justify="center">
            <Col xs={24} sm={12} md={8}>
              <Card className="why-card" bordered={false} hoverable>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <ToolOutlined style={{ fontSize: 28, color: "#ff7a00" }} />
                  <div>
                    <h4 style={{ marginBottom: 6 }}>Skilled Professionals</h4>
                    <p style={{ margin: 0, fontSize: 14 }}>
                      Verified, trained technicians who deliver quality workmanship every time.
                    </p>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Card className="why-card" bordered={false} hoverable>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <HomeOutlined style={{ fontSize: 28, color: "#1677ff" }} />
                  <div>
                    <h4 style={{ marginBottom: 6 }}>Trusted & Local</h4>
                    <p style={{ margin: 0, fontSize: 14 }}>
                      Local teams who know your area and are committed to timely service.
                    </p>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Card className="why-card" bordered={false} hoverable>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <TruckOutlined style={{ fontSize: 28, color: "#00aa33" }} />
                  <div>
                    <h4 style={{ marginBottom: 6 }}>Transparent Pricing</h4>
                    <p style={{ margin: 0, fontSize: 14 }}>
                      Clear quotes with no hidden fees — affordable packages for every need.
                    </p>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Card className="why-card" bordered={false} hoverable>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <BuildOutlined style={{ fontSize: 28, color: "#ffaa00" }} />
                  <div>
                    <h4 style={{ marginBottom: 6 }}>Licensed & Insured</h4>
                    <p style={{ margin: 0, fontSize: 14 }}>
                      Professional services backed by proper licensing and insurance.
                    </p>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Card className="why-card" bordered={false} hoverable>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <ApartmentOutlined style={{ fontSize: 28, color: "#8b00ff" }} />
                  <div>
                    <h4 style={{ marginBottom: 6 }}>Satisfaction Guarantee</h4>
                    <p style={{ margin: 0, fontSize: 14 }}>
                      We stand behind our work — if you're not happy, we'll make it right.
                    </p>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Card className="why-card" bordered={false} hoverable>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <ShopOutlined style={{ fontSize: 28, color: "#ff3333" }} />
                  <div>
                    <h4 style={{ marginBottom: 6 }}>24/7 Support</h4>
                    <p style={{ margin: 0, fontSize: 14 }}>
                      Emergency response and customer support available round the clock.
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
      {/* ===== end why choose section ===== */}

      {/* 🟦 FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h3>About Us</h3>
            <p>
              Your trusted partner for all home and property-related services.
              Quality, reliability, and customer satisfaction guaranteed.
            </p>
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
            <p>📧 info@homeservices.com</p>
            <p>📍 123 Service Street, City, State</p>
            <div className="social-icons">🌐 🎯 📸 🔗</div>
          </div>
        </div>

        <p className="footer-bottom">
          © 2025 Home Services. All rights reserved.
        </p>
      </footer>

  
    </div>
  );
};

export default LandingPage;
