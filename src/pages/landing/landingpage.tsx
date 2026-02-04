// import React from "react";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../../pages/landing/Header";
import FooterSection from "../../pages/landing/FooterSection";
import "../../pages/landing/FooterSection.css";
import "./LandingPage.css";

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


const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="sw-landing-root">
      <CommonHeader selectedKey="landing" />

      {/* HERO */}
      <section className="sw-hero">
        <div className="sw-hero-content">
          <h1>Home services at your doorstep</h1>
          <p>
            One platform for cleaning, transport, rentals, construction,
            education and more.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="sw-uc-services">
        <div className="sw-uc-container">
          {/* LEFT */}
          <div className="sw-uc-left">
            <h2>What are you looking for?</h2>

            <div className="sw-uc-grid">
              {services.map((item, index) => (
                <div
                  key={index}
                  className="sw-uc-card"
                  onClick={() => {
                    // ✅ allow dashboard access as guest


                    // navigate to dashboard page
                    navigate(item.route);
                  }}
                >

                  <div className="sw-uc-icon">{item.icon}</div>
                  <div className="sw-uc-text">{item.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – IMAGE CARDS */}
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
