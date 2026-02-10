import React, { useState } from "react";
import { Modal } from "antd";
import "./Portfolio.css";
import CleaningHeader from "./CleaningHeader";
import Footer from "../../../src/pages/CleaningService/CleaningServiceFooter";

import p1 from "../../assets/CleaningServices/LR2.jpg";
import p2 from "../../assets/CleaningServices/Kitchen1.jpg";
import p3 from "../../assets/CleaningServices/Cleaning1.png";
import p4 from "../../assets/CleaningServices/Kitchen2.jpg";

const portfolioData = [
  {
    category: "Residential",
    image: p1,
    title: "Living Room Deep Cleaning",
  },
  {
    category: "Residential",
    image: p2,
    title: "Kitchen Cleaning Service",
  },
  {
    category: "Commercial",
    image: p3,
    title: "Office Cleaning",
  },
  {
    category: "Commercial",
    image: p4,
    title: "Corporate Space Cleaning",
  },
];

const categories = ["All", "Residential", "Commercial"];

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredData =
    activeCategory === "All"
      ? portfolioData
      : portfolioData.filter((item) => item.category === activeCategory);

  return (
    <>
      <CleaningHeader />

      <section className="portfolio-hero">
        <h1>Our Portfolio</h1>
        <p>Explore our recent cleaning projects</p>
      </section>

      <section className="portfolio-container">
        {/* FILTER BUTTONS */}
        <div className="portfolio-filters">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`portfolio-filter-btn ${
                activeCategory === cat ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GALLERY GRID */}
        <div className="portfolio-grid">
          {filteredData.map((item, i) => (
            <div
              key={i}
              className="portfolio-card"
              onClick={() => setSelectedImage(item.image)}
            >
              <img src={item.image} alt={item.title} />
              <div className="portfolio-overlay">
                <h4>{item.title}</h4>
                <span>{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IMAGE MODAL */}
      <Modal
        open={!!selectedImage}
        footer={null}
        onCancel={() => setSelectedImage(null)}
        centered
        width={800}
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Portfolio"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        )}
      </Modal>
      <section className="portfolio-faq">
        <div className="faq-container">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-item">
            <h4>How often should I schedule professional cleaning?</h4>
            <p>
              For residential spaces, we recommend weekly or bi-weekly cleaning.
              Commercial spaces may require daily or customized schedules
              depending on usage.
            </p>
          </div>

          <div className="faq-item">
            <h4>Do you bring your own cleaning supplies?</h4>
            <p>
              Yes, our team brings professional-grade equipment and eco-friendly
              cleaning products for all services.
            </p>
          </div>

          <div className="faq-item">
            <h4>Are your cleaning professionals insured?</h4>
            <p>
              Absolutely. All our cleaning experts are trained,
              background-checked, and fully insured.
            </p>
          </div>

          <div className="faq-item">
            <h4>How can I book a cleaning service?</h4>
            <p>
              You can contact us through our website, phone, or request a quote
              directly from our contact page.
            </p>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </>
  );
};

export default Portfolio;
