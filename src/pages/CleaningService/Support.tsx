import { useParams } from "react-router-dom";
import CleaningHeader from "../../../src/pages/CleaningService/CleaningHeader";
import "./Support.css";
import Footer from "./CleaningServiceFooter";

const Support: React.FC = () => {
  const { type } = useParams();

  const renderContent = () => {
    switch (type) {
      case "contact":
        return (
          <div className="support-section">
            <h2>Contact Us</h2>
            <p>We are available 24/7 to assist you.</p>

            <div className="support-card">
              <p>
                <strong>📞 Phone:</strong> +91 98765 43210
              </p>
              <p>
                <strong>📧 Email:</strong> support@swachify.com
              </p>
              <p>
                <strong>📍 Address:</strong> Mumbai, India
              </p>
            </div>
          </div>
        );

      case "about":
        return (
          <div className="support-section">
            <h2>About Us</h2>
            <p>
              Swachify is a trusted cleaning service provider offering
              residential and commercial cleaning solutions.
            </p>
            <p>
              Our professionals are trained, verified, and committed to
              delivering high-quality service every time.
            </p>
          </div>
        );

      case "faq":
        return (
          <div className="support-section">
            <h2>Frequently Asked Questions</h2>

            <div className="faq-item">
              <h4>How do I book a service?</h4>
              <p>Select your service and choose your preferred date & time.</p>
            </div>

            <div className="faq-item">
              <h4>Are professionals verified?</h4>
              <p>Yes, all our staff are background-checked.</p>
            </div>

            <div className="faq-item">
              <h4>Can I cancel a booking?</h4>
              <p>You can cancel up to 2 hours before service time.</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="support-section">
            <h2>Support Center</h2>
            <p>Please select an option from the Support menu.</p>
          </div>
        );
    }
  };

  return (
    <>
      <CleaningHeader />

      <div className="support-page">
        <section className="support-hero">
          <h1>
            {type === "contact" && "Contact Us"}
            {type === "about" && "About Us"}
            {type === "faq" && "FAQ"}
            {!type && "Support"}
          </h1>
        </section>

        <div className="support-content">{renderContent()}</div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Support;
