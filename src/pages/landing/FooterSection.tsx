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
            <li>Cleaning&Home Services</li>
            <li>Transport</li>
            <li>Buy/Sale/Rentals</li>
            <li>Raw Materials</li>
            <li>Education</li>
            <li>Swachify Products</li>
            <li>Freelancer</li>
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
            <Phone className="contact-icon " aria-hidden/>
            <span className="contact-text">+1 (555) 123-4567</span>
          </div>

          <div className="contact-row">
            <MailOutlined className="contact-icon" />
            <span className="contact-text">info@homeservices.com</span>
          </div>

          <div className="contact-row">
            <EnvironmentOutlined className="contact-icon" />
            <span className="contact-text">123 Service Street, City, State</span>
          </div>

          <div className="contact-row">
            <GlobalOutlined className="contact-icon" />
            <span className="contact-text">www.swachifyindia.com</span>
          </div>

          <div className="sw-lp-socials" aria-hidden>
            <a className="sw-lp-social-btn" href="#" aria-label="facebook"><FacebookOutlined /></a>
            <a className="sw-lp-social-btn" href="#" aria-label="twitter"><TwitterOutlined /></a>
            <a className="sw-lp-social-btn" href="#" aria-label="instagram"><InstagramOutlined /></a>
            <a className="sw-lp-social-btn" href="#" aria-label="linkedin"><LinkedinOutlined /></a>
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
