// FooterSection.tsx
import React from "react";
import { Phone } from "lucide-react";
import {
  MailOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "./FooterSection.css";
import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";

type FooterSectionProps = {
  selectedKey?: string;
};

const FooterSection: React.FC<FooterSectionProps> = ({ selectedKey }) => {
  return (
    <footer
      className="sw-lp-classname-footer"
      role="contentinfo"
      aria-label="Footer"
      data-selected={selectedKey ?? ""}
    >
      <div className="sw-lp-classname-footer-inner">
        {/* About */}
        <div className="sw-lp-col about">
          <h4>About Us</h4>
          <p className="about-text">
            Your trusted partner for all home and property-related services.
            Quality, reliability, and customer satisfaction guaranteed.
          </p>
        </div>

        {/* Services */}
        <div className="sw-lp-col">
          <h5>Services</h5>
          <ul className="sw-lp-links-list">
            <li>
              <Link to="/education" onClick={() => window.scrollTo(0, 0)}>
                Education
              </Link>
            </li>

            <li>
              <Link to="/healthcare" onClick={() => window.scrollTo(0, 0)}>
                Health Care
              </Link>
            </li>

            <li>
              <Link to="/landingpackers" onClick={() => window.scrollTo(0, 0)}>
                Just ride
              </Link>
            </li>

            <li>
              <Link
                to="/swachifyproducts"
                onClick={() => window.scrollTo(0, 0)}
              >
                Swachify Products
              </Link>
            </li>

            <li>
              <Link to="/cleaningservice" onClick={() => window.scrollTo(0, 0)}>
                Cleaning & Home Services
              </Link>
            </li>

            <li>
              <Link to="/buysaleproducts" onClick={() => window.scrollTo(0, 0)}>
                Buy / Sale / Rentals
              </Link>
            </li>

            <li>
              <Link to="/rawmaterials" onClick={() => window.scrollTo(0, 0)}>
                Raw Materials
              </Link>
            </li>

            <li>
              <Link to="/freelancer" onClick={() => window.scrollTo(0, 0)}>
                Freelancer
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard" onClick={() => window.scrollTo(0, 0)}>
                Admin
              </Link>
            </li>

            {/* <li>
              <a
                href="/ConstructionMaterials"
                onClick={() => window.scrollTo(0, 0)}
              >
                Raw Materials
              </a>
            </li> */}
          </ul>
        </div>

        {/* Quick Links */}
        <div className="sw-lp-col">
          <h5>Quick Links</h5>
          <ul className="sw-lp-links-list">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Careers</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="sw-lp-col contact-col">
          <h5>Contact Info</h5>

          <div className="contact-row">
            <Phone className="contact-icon " aria-hidden />
            <span className="contact-text">+1 (555) 123-4567</span>
          </div>

          <div className="contact-row">
            <MailOutlined className="contact-icon" />
            <span className="contact-text">info@homeservices.com</span>
          </div>

          <div className="contact-row">
            <EnvironmentOutlined className="contact-icon" />
            <span className="contact-text">
              123 Service Street, City, State
            </span>
          </div>

          <div className="contact-row">
            <GlobalOutlined className="contact-icon" />
            <span className="contact-text">www.swachifyindia.com</span>
          </div>

          <div className="sw-lp-socials" aria-hidden>
            <a
              className="sw-lp-social-btn"
              href="https://www.facebook.com"
              aria-label="facebook"
            >
              <FacebookOutlined />
            </a>
            <a
              className="sw-lp-social-btn"
              href="https://www.twitter.com"
              aria-label="twitter"
            >
              <TwitterOutlined />
            </a>
            <a
              className="sw-lp-social-btn"
              href="https://www.instagram.com"
              aria-label="instagram"
            >
              <InstagramOutlined />
            </a>
            <a
              className="sw-lp-social-btn"
              href="https://www.linkedin.com"
              aria-label="linkedin"
            >
              <LinkedinOutlined />
            </a>
          </div>
        </div>
      </div>

      <div className="sw-lp-footer-sep" />

      <div className="sw-lp-footer-copy">
        © 2025 Swachify India. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
