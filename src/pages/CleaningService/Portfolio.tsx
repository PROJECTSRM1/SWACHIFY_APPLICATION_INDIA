import React, { useState } from "react";
import { Modal } from "antd";
import "./Portfolio.css";
import CleaningHeader from "./CleaningHeader";
import Footer from "../../../src/pages/CleaningService/CleaningServiceFooter";

import p1 from "../../assets/CleaningServices/LR2.jpg";
import p2 from "../../assets/CleaningServices/KItchen1.jpg";
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
      <Footer></Footer>
    </>
  );
};

export default Portfolio;
