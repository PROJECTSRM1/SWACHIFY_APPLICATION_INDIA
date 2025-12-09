// EducationPage.tsx
import CommonHeader from "../../pages/landing/Header";
// import "./Education.css";
import { useNavigate } from "react-router-dom";
import { Button, Card, Row, Col } from "antd";
import FooterSection from "../../pages/landing/FooterSection";
import "../../pages/landing/FooterSection.css";

// HERO IMAGE
import heroImage from "../../assets/landingimages/Education.jpg";

// service card images
import eduImg1 from "../../assets/landingimages/IT.jpg";
import eduImg2 from "../../assets/landingimages/SSC.jpg";
import eduImg3 from "../../assets/landingimages/INTER.jpg";
import eduImg4 from "../../assets/landingimages/BTECH.jpg";
import eduImg5 from "../../assets/landingimages/COMPETITIVE.jpg";
import eduImg6 from "../../assets/landingimages/SKILL.jpg";

// why-card images
import whyImg1 from "../../assets/landingimages/EXPERT.jpg";
import whyImg2 from "../../assets/landingimages/Curriculum.jpg";
import whyImg3 from "../../assets/landingimages/recorded.jpg";
import whyImg4 from "../../assets/landingimages/placement.jpg";
import whyImg5 from "../../assets/landingimages/FEES.jpg";
import whyImg6 from "../../assets/landingimages/certified.jpg";

// 🔹 JSON DATA
import educationData from "../../data/educationData.json";

// 🔹 Map JSON imageKey -> actual imported image
const serviceImageMap: Record<string, string> = {
  it: eduImg1,
  ssc: eduImg2,
  inter: eduImg3,
  btech: eduImg4,
  competitive: eduImg5,
  skill: eduImg6,
};

const whyImageMap: Record<string, string> = {
  expert: whyImg1,
  curriculum: whyImg2,
  recorded: whyImg3,
  placement: whyImg4,
  fees: whyImg5,
  certified: whyImg6,
};

const EducationPage = () => {
  const navigate = useNavigate();

  // Build arrays with real image paths based on JSON keys
  const educationServices = educationData.services.map((item) => ({
    ...item,
    image: serviceImageMap[item.imageKey] || eduImg1, // fallback
  }));

  const whyCards = educationData.whyCards.map((item) => ({
    ...item,
    image: whyImageMap[item.imageKey] || whyImg1,
  }));

  const scrollToServices = () => {
    document.getElementById("services-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="sw-ep-classname-landing-container">
      <CommonHeader selectedKey="education" />

      {/* HERO SECTION */}
      <section
        className="sw-ep-classname-hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="sw-ep-classname-hero-content">
          <h1>Skills to transform your career and life</h1>
          <p className="sw-ep-classname-hero-subtitle">
            Learn, upskill and grow with curated programs for IT, academics and competitive exams.
          </p>

          <Button type="primary" size="large" onClick={scrollToServices}>
            Explore Programs
          </Button>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section
        id="services-section"
        className="sw-ep-classname-services-section"
      >
        <h2 className="sw-ep-classname-section-title">Our Education Services</h2>
        <p className="sw-ep-classname-section-subtitle">
          Training, certification and resources for professionals, students and
          job seekers.
        </p>

        <Row gutter={[24, 24]} justify="center">
          {educationServices.map((item) => (
            <Col xs={24} sm={12} md={8} key={item.id}>
              <Card
                hoverable
                className="sw-ep-classname-service-card"
                onClick={() => navigate(item.route)}
              >
                <div className="sw-ep-classname-service-icon">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="sw-ep-classname-service-img"
                  />
                </div>
                <h3 className="sw-ep-classname-service-title">{item.title}</h3>
                <p className="sw-ep-classname-service-desc">{item.desc}</p>
                <span className="sw-ep-classname-learn-more">Learn More →</span>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* WHY CHOOSE US */}
      <section className="sw-ep-classname-why-choose-section">
        <div className="sw-ep-classname-container">
          <h2 className="sw-ep-classname-section-title">
            Why Choose Our Education Platform
          </h2>
          <p className="sw-ep-classname-section-subtitle">
            Practical learning, real projects and direct industry connection.
          </p>

          <Row gutter={[20, 20]} justify="center">
            {whyCards.map((card) => (
              <Col xs={24} sm={12} md={8} key={card.id}>
                <Card className="sw-ep-classname-why-card" hoverable>
                  <div
                    style={{ display: "flex", gap: 12, alignItems: "center" }}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="sw-ep-classname-why-card-img"
                    />
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
      <FooterSection selectedKey="education" />
    </div>
  );
};

export default EducationPage;
