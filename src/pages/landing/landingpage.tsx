// import React from "react";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../../pages/landing/Header";
import FooterSection from "../../pages/landing/FooterSection";
import "../../pages/landing/FooterSection.css";
import "./LandingPage.css";
import { useEffect, useState } from "react";



import {
  HomeOutlined,
  TruckOutlined,
  ShopOutlined,
  BuildOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

/* RIGHT SIDE IMAGES */
import img1 from "../../assets/cleaning and home.jpg";
import img2 from "../../assets/education1.jpg";
import img3 from "../../assets/swachify product.jpg";
import img4 from "../../assets/transport.jpg";
import img5 from "../../assets/health care.jpg";

/* SERVICES */
const services = [
  {
    title: "Education",
    icon: <BookOutlined />,
    route: "/education",             // ✅ public
  },
  {
    title: "Health Care",
    icon: <UserOutlined />,
    route: "/healthcare",            // ✅ public
  },
  {
    title: "Just Ride",
    icon: <TruckOutlined />,
    route: "/LandingPackers",        // ✅ public
  },
  {
    title: "Swachify Products",
    icon: <ShoppingCartOutlined />,
    route: "/swachifyproducts",     // ✅ public
  },
  {
    title: "Cleaning & Home Services",
    icon: <HomeOutlined />,
    route: "/cleaningservice",       // ✅ public
  },

  {
    title: "Buy / Sale / Rentals",
    icon: <ShopOutlined />,
    route: "/BuySaleProducts",      // ✅ public
  },
  {
    title: "Raw Materials",
    icon: <BuildOutlined />,
    route: "/Rawmaterials", // ✅ public
  },



];
/* HERO BACKGROUND IMAGES */
const heroImages = [
  img2, // Education
  img5, // Health Care
  img4, // Just Ride
  img3, // Swachify Products (fruits/vegetables)
  img1, // Cleaning & Home
];


const LandingPage = () => {
  const navigate = useNavigate();
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // ⏱ 5 seconds

    return () => clearInterval(interval);
  }, []);


  return (
    
<div className="sw-landing-root">
  <CommonHeader selectedKey="landing" />

  {/* HERO – FULL WIDTH */}
<section className="sw-main-hero">
  {/* 🔥 BACKGROUND IMAGE */}
  <div
    className="sw-hero-bg"
    style={{ backgroundImage: `url(${heroImages[bgIndex]})` }}
  />

  {/* CONTENT */}
  <div className="sw-hero-content">
    <span className="sw-badge">
      Trusted by 1M+ Indians across 100+ cities
    </span>

    <h1>
      Your Life, <span>Simplified</span>
    </h1>

    <p>
      From education to healthcare, transport to home services – everything
      you need in one powerful platform.
    </p>

    <div className="sw-hero-actions">
      <button
        className="primary-btn"
        onClick={() =>
          document
            .querySelector("#services")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Explore Services
      </button>

      <button className="secondary-btn">Download App</button>
    </div>

    <div className="sw-hero-stats">
      ⭐ 4.8/5 Rating | ✅ Verified Professionals | ⏰ 24/7 Support
    </div>
  </div>
</section>


  {/* SERVICES */}
  <section id="services" className="sw-uc-services">
    <div className="sw-uc-container">
      {/* LEFT */}
      <div className="sw-uc-left">
        <h2>What are you looking for?</h2>

        <div className="sw-uc-grid">
          {services.map((item, index) => (
            <div
              key={index}
              className="sw-uc-card"
              onClick={() => navigate(item.route)}
            >
              <div className="sw-uc-icon-wrap">
                <div className="sw-uc-icon">{item.icon}</div>
              </div>
              <div className="sw-uc-text">{item.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="sw-uc-right">
        <div className="sw-uc-images">
          <img src={img1} className="img big" />
          <img src={img2} className="img" />
          <img src={img3} className="img" />
          <img src={img4} className="img" />
          <img src={img5} className="img" />
        </div>
      </div>
    </div>
  </section>

  <FooterSection selectedKey="LandingPackers" />
</div>

  );
};

export default LandingPage;
