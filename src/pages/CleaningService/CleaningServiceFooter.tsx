import { Link } from "react-router-dom";
import "../../../src/pages/CleaningService/CleaningServiceFooter.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* COMPANY */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/support/about">About Us</Link>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Anti Discrimination</a>
              </li>
            </ul>
          </div>

          {/* CUSTOMERS */}
          <div className="footer-col">
            <h4>For Customers</h4>
            <ul>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/support/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/portfolio">Portfolio</Link>
              </li>
            </ul>
          </div>

          {/* PARTNERS */}
          <div className="footer-col">
            <h4>For Partners</h4>
            <ul>
              <li>
                <a href="#">Register as Professional</a>
              </li>
              <li>
                <a href="#">Partner Help Center</a>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div className="footer-col">
            <h4>Social Links</h4>
            <div className="footer-social">
              <a href="#">📘</a>
              <a href="#">📷</a>
              <a href="#">🐦</a>
              <a href="#">💼</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © 2024 Swachify. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
