import React, { useState } from "react";
import { Modal } from "antd";
import CleaningHeader from "./CleaningHeader";
import "./CleaningService.css";
import { useNavigate } from "react-router-dom";

import hero1 from "../../assets/CleaningServices/LR2.jpg";
import hero2 from "../../assets/CleaningServices/KItchen1.jpg";
import hero3 from "../../assets/CleaningServices/Cleaning1.png";
import hero4 from "../../assets/CleaningServices/Kitchen2.jpg";

const services = [
  {
    title: "Cleaning Services",
    badge: "POPULAR",
    icon: "🧼",
    type: "cleaning",
  },
  {
    title: "Home Services",
    icon: "🏠",
    type: "home",
  },
];

const cleaningSubServices = [
  { title: "Home Cleaning", icon: "🏠" },
  { title: "Commercial Cleaning", icon: "🏢" },
  { title: "Vehicle Cleaning", icon: "🚗" },
];

const homeSubServices = [
  { title: "Plumbing", icon: "🚰" },
  { title: "Painting", icon: "🎨" },
  { title: "Electrician", icon: "⚡" },
  { title: "AC Repair", icon: "❄️" },
  { title: "Chef", icon: "👨‍🍳" },
];

const plumbingSubServices = [
  { title: "Pipe Leakage", icon: "🚿", route: "/plumbing/pipe-leakage" },
  { title: "Tap Fixing", icon: "🚰", route: "/plumbing/tap-fixing" },
  { title: "Bathroom Fitting", icon: "🛁", route: "/plumbing/bathroom-fitting" },
  { title: "Water Tank Cleaning", icon: "💧", route: "/plumbing/water-tank-cleaning" },
];

const paintingSubServices = [
  { title: "Interior Painting", icon: "🏠", route: "/painting/interior" },
  { title: "Exterior Painting", icon: "🏢", route: "/painting/exterior" },
  { title: "Wall Texture", icon: "🎨", route: "/painting/wall-texture" },
  { title: "Repainting", icon: "🖌️", route: "/painting/repainting" },
];

const electricianSubServices = [
  { title: "Wiring", icon: "🔌", route: "/electrician/wiring" },
  { title: "Fan Repair", icon: "🌀", route: "/electrician/fan-repair" },
  { title: "Light Installation", icon: "💡", route: "/electrician/light-installation" },
  { title: "Power Backup Setup", icon: "🔋", route: "/electrician/power-backup" },
];

const acRepairSubServices = [
  { title: "AC Installation", icon: "❄️", route: "/ac/installation" },
  { title: "AC Gas Refill", icon: "🧊", route: "/ac/gas-refill" },
  { title: "AC General Service", icon: "🛠️", route: "/ac/general-service" },
  { title: "AC Uninstallation", icon: "📦", route: "/ac/uninstallation" },
];

const chefSubServices = [
  { title: "Home Cooking", icon: "🍲", route: "/chef/home-cooking" },
  { title: "Party Catering", icon: "🎉", route: "/chef/party-catering" },
  { title: "Weekly Meal Plan", icon: "📅", route: "/chef/weekly-meal-plan" },
  { title: "Festival Cooking", icon: "🎊", route: "/chef/festival-cooking" },
];

const popularServices = [
  {
    title: "Bathroom Cleaning",
    price: "₹399",
    rating: "4.82",
    reviews: "(284K)",
    image: hero2,
    tag: "Bestseller"
  },
  {
    title: "Kitchen Cleaning",
    price: "₹599",
    rating: "4.79",
    reviews: "(178K)",
    image: hero1,
    tag: "Popular"
  },
  {
    title: "Full Home Cleaning",
    price: "₹1,499",
    rating: "4.85",
    reviews: "(432K)",
    image: hero3,
    tag: "Trending"
  },
  {
    title: "Sofa Cleaning",
    price: "₹799",
    rating: "4.81",
    reviews: "(156K)",
    image: hero4,
    tag: null
  }
];

const features = [
  {
    icon: "✓",
    title: "Verified Professionals",
    description: "Background checked & trained professionals"
  },
  {
    icon: "⭐",
    title: "Rated Services",
    description: "Choose from highly rated & reviewed services"
  },
  {
    icon: "🛡️",
    title: "Hassle-free Booking",
    description: "Book in <60 seconds with instant confirmation"
  },
  {
    icon: "💰",
    title: "Transparent Pricing",
    description: "See fixed prices before you book. No hidden charges"
  }
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    comment: "Excellent service! The cleaning was thorough and the staff was very professional. Highly recommend!",
    service: "Home Cleaning"
  },
  {
    name: "Rajesh Kumar",
    location: "Delhi",
    rating: 5,
    comment: "Very satisfied with the plumbing work. Quick response and fixed the issue immediately.",
    service: "Plumbing"
  },
  {
    name: "Anita Patel",
    location: "Bangalore",
    rating: 4,
    comment: "Great experience with the AC service. Professional and courteous team.",
    service: "AC Repair"
  }
];

const CleaningService: React.FC = () => {
  const navigate = useNavigate();
  const [openCleaningModal, setOpenCleaningModal] = useState(false);
  const [openHomeModal, setOpenHomeModal] = useState(false);
  const [openPlumbingModal, setOpenPlumbingModal] = useState(false);
  const [openPaintingModal, setOpenPaintingModal] = useState(false);
  const [openElectricianModal, setOpenElectricianModal] = useState(false);
  const [openACModal, setOpenACModal] = useState(false);
  const [openChefModal, setOpenChefModal] = useState(false);

  const handleServiceClick = (type: string) => {
    if (type === "cleaning") {
      setOpenCleaningModal(true);
    }
    if (type === "home") {
      setOpenHomeModal(true);
    }
  };

  return (
    <>
      <CleaningHeader />

      {/* HERO SECTION */}
      <section className="cs-container">
        <div className="cs-hero">
          <div className="cs-left">
            <h1>Home services at your doorstep</h1>

            <div className="cs-box">
              <h3>What are you looking for?</h3>

              <div className="cs-services">
                {services.map((s, i) => (
                  <div
                    key={i}
                    className="cs-service-card"
                    onClick={() => handleServiceClick(s.type)}
                  >
                    {s.badge && <span className="cs-badge">{s.badge}</span>}
                    <div className="cs-icon">{s.icon}</div>
                    <p>{s.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="cs-right">
            <div className="cs-img-grid">
              <img src={hero1} alt="Cleaning service" />
              <img src={hero2} alt="Cleaning service" />
              <img src={hero3} alt="Cleaning service" />
              <img src={hero4} alt="Cleaning service" />
            </div>
          </div>
        </div>

        <div className="cs-stats">
          <div>
            ⭐ <strong>4.8</strong>
            <p>Service Rating*</p>
          </div>
          <div>
            👥 <strong>12M+</strong>
            <p>Customers Globally*</p>
          </div>
        </div>
      </section>

      {/* POPULAR SERVICES SECTION */}
      <section className="cs-popular-section">
        <div className="cs-section-container">
          <h2 className="cs-section-title">Most booked services</h2>
          <div className="cs-popular-grid">
            {popularServices.map((service, i) => (
              <div key={i} className="cs-popular-card">
                {service.tag && <span className="cs-service-tag">{service.tag}</span>}
                <div className="cs-popular-image">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="cs-popular-content">
                  <h4>{service.title}</h4>
                  <div className="cs-popular-rating">
                    <span className="cs-rating-star">★ {service.rating}</span>
                    <span className="cs-rating-count">{service.reviews}</span>
                  </div>
                  <div className="cs-popular-footer">
                    <span className="cs-popular-price">{service.price}</span>
                    <button className="cs-book-btn">Book</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="cs-features-section">
        <div className="cs-section-container">
          <h2 className="cs-section-title">Why choose us?</h2>
          <div className="cs-features-grid">
            {features.map((feature, i) => (
              <div key={i} className="cs-feature-card">
                <div className="cs-feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="cs-how-section">
        <div className="cs-section-container">
          <h2 className="cs-section-title">How it works</h2>
          <div className="cs-steps-container">
            <div className="cs-step">
              <div className="cs-step-number">1</div>
              <h4>Select a service</h4>
              <p>Choose from our wide range of home services</p>
            </div>
            <div className="cs-step-arrow">→</div>
            <div className="cs-step">
              <div className="cs-step-number">2</div>
              <h4>Pick a slot</h4>
              <p>Select your preferred date and time</p>
            </div>
            <div className="cs-step-arrow">→</div>
            <div className="cs-step">
              <div className="cs-step-number">3</div>
              <h4>Make payment</h4>
              <p>Pay securely online after the service</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="cs-testimonials-section">
        <div className="cs-section-container">
          <h2 className="cs-section-title">What our customers say</h2>
          <div className="cs-testimonials-grid">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="cs-testimonial-card">
                <div className="cs-testimonial-header">
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p className="cs-testimonial-location">{testimonial.location}</p>
                  </div>
                  <div className="cs-testimonial-rating">
                    {"★".repeat(testimonial.rating)}
                  </div>
                </div>
                <p className="cs-testimonial-comment">"{testimonial.comment}"</p>
                <span className="cs-testimonial-service">{testimonial.service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APP DOWNLOAD SECTION */}
      <section className="cs-app-section">
        <div className="cs-section-container">
          <div className="cs-app-content">
            <div className="cs-app-left">
              <h2>Download our app for exclusive offers</h2>
              <p>Get access to special discounts and book services on the go</p>
              <div className="cs-app-buttons">
                <button className="cs-app-store-btn">
                  <span className="cs-app-icon">📱</span>
                  <div>
                    <small>Download on the</small>
                    <strong>App Store</strong>
                  </div>
                </button>
                <button className="cs-app-store-btn">
                  <span className="cs-app-icon">🤖</span>
                  <div>
                    <small>Get it on</small>
                    <strong>Google Play</strong>
                  </div>
                </button>
              </div>
            </div>
            <div className="cs-app-right">
              <div className="cs-app-mockup">📱</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cs-footer">
        <div className="cs-section-container">
          <div className="cs-footer-grid">
            <div className="cs-footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About us</a></li>
                <li><a href="#">Terms & conditions</a></li>
                <li><a href="#">Privacy policy</a></li>
                <li><a href="#">Anti discrimination</a></li>
              </ul>
            </div>
            <div className="cs-footer-col">
              <h4>For customers</h4>
              <ul>
                <li><a href="#">UC reviews</a></li>
                <li><a href="#">Categories near you</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact us</a></li>
              </ul>
            </div>
            <div className="cs-footer-col">
              <h4>For partners</h4>
              <ul>
                <li><a href="#">Register as professional</a></li>
                <li><a href="#">Partner help center</a></li>
              </ul>
            </div>
            <div className="cs-footer-col">
              <h4>Social links</h4>
              <div className="cs-social-links">
                <a href="#" className="cs-social-icon">📘</a>
                <a href="#" className="cs-social-icon">📷</a>
                <a href="#" className="cs-social-icon">🐦</a>
                <a href="#" className="cs-social-icon">💼</a>
              </div>
            </div>
          </div>
          <div className="cs-footer-bottom">
            <p>© 2024 Company Name. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <Modal
        open={openCleaningModal}
        onCancel={() => setOpenCleaningModal(false)}
        footer={null}
        centered
        width={420}
        title="Select Cleaning Service"
      >
        <div className="cs-popup-services">
          {cleaningSubServices.map((s, i) => (
            <div
              key={i}
              className="cs-popup-card"
              onClick={() => {
                setOpenCleaningModal(false);
                if (s.title === "Home Cleaning") {
                  navigate("/cleaning/home");
                }
                if (s.title === "Commercial Cleaning") {
    navigate("/cleaning/commercial");
  }
              }}
            >
              <span className="cs-popup-icon">{s.icon}</span>
              <p>{s.title}</p>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        open={openHomeModal}
        onCancel={() => setOpenHomeModal(false)}
        footer={null}
        centered
        width={520}
        title="Select Home Service"
      >
        <div className="cs-popup-services">
          {homeSubServices.map((s, i) => (
            <div
              key={i}
              className="cs-popup-card"
              onClick={() => {
                if (s.title === "Plumbing") {
                  setOpenHomeModal(false);
                  setOpenPlumbingModal(true);
                }
                if (s.title === "Painting") {
                  setOpenHomeModal(false);
                  setOpenPaintingModal(true);
                }
                if (s.title === "Electrician") {
                  setOpenHomeModal(false);
                  setOpenElectricianModal(true);
                }
                if (s.title === "AC Repair") {
                  setOpenHomeModal(false);
                  setOpenACModal(true);
                }
                if (s.title === "Chef") {
                  setOpenHomeModal(false);
                  setOpenChefModal(true);
                }
              }}
            >
              <span className="cs-popup-icon">{s.icon}</span>
              <p>{s.title}</p>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        open={openPlumbingModal}
        onCancel={() => setOpenPlumbingModal(false)}
        footer={null}
        centered
        width={520}
        title="Select Plumbing Service"
      >
        <div className="cs-popup-services">
          {plumbingSubServices.map((s, i) => (
            <div
              key={i}
              className="cs-popup-card"
              onClick={() => {
                setOpenPlumbingModal(false);
                navigate(s.route);
              }}
            >
              <span className="cs-popup-icon">{s.icon}</span>
              <p>{s.title}</p>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        open={openPaintingModal}
        onCancel={() => setOpenPaintingModal(false)}
        footer={null}
        centered
        width={520}
        title="Select Painting Service"
      >
        <div className="cs-popup-services">
          {paintingSubServices.map((s, i) => (
            <div
              key={i}
              className="cs-popup-card"
              onClick={() => {
                setOpenPaintingModal(false);
                navigate(s.route);
              }}
            >
              <span className="cs-popup-icon">{s.icon}</span>
              <p>{s.title}</p>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        open={openElectricianModal}
        onCancel={() => setOpenElectricianModal(false)}
        footer={null}
        centered
        width={520}
        title="Select Electrician Service"
      >
        <div className="cs-popup-services">
          {electricianSubServices.map((s, i) => (
            <div
              key={i}
              className="cs-popup-card"
              onClick={() => {
                setOpenElectricianModal(false);
                navigate(s.route);
              }}
            >
              <span className="cs-popup-icon">{s.icon}</span>
              <p>{s.title}</p>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        open={openACModal}
        onCancel={() => setOpenACModal(false)}
        footer={null}
        centered
        width={520}
        title="Select AC Repair Service"
      >
        <div className="cs-popup-services">
          {acRepairSubServices.map((s, i) => (
            <div
              key={i}
              className="cs-popup-card"
              onClick={() => {
                setOpenACModal(false);
                navigate(s.route);
              }}
            >
              <span className="cs-popup-icon">{s.icon}</span>
              <p>{s.title}</p>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        open={openChefModal}
        onCancel={() => setOpenChefModal(false)}
        footer={null}
        centered
        width={520}
        title="Select Chef Service"
      >
        <div className="cs-popup-services">
          {chefSubServices.map((s, i) => (
            <div
              key={i}
              className="cs-popup-card"
              onClick={() => {
                setOpenChefModal(false);
                navigate(s.route);
              }}
            >
              <span className="cs-popup-icon">{s.icon}</span>
              <p>{s.title}</p>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default CleaningService;
