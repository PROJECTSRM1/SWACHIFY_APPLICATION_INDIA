import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, Input, Button } from "antd";
import CleaningHeader from "./CleaningHeader";
import "./KitchenCleaning.css";
import BookCleaningScreenWeb from "../../pages/dashboard/homeservices/BookCleaningScreenWeb";

import kitchenImg from "../../assets/CleaningServices/Kitchen2.jpg";
import bathroomImg from "../../assets/CleaningServices/bathroom.jpeg";
import sofaImg from "../../assets/CleaningServices/conference.jpg";
import bedroomImg from "../../assets/CleaningServices/bedroom.png";
import windowImg from "../../assets/CleaningServices/window.png";

type Service = {
  title: string;
  price: number;
  duration: string;
};

const SERVICE_CONFIG: Record<
  string,
  { title: string; image: string; services: Service[] }
> = {
  kitchen: {
    title: "Kitchen Cleaning",
    image: kitchenImg,
    services: [
      { title: "Basic Kitchen Cleaning", price: 499, duration: "45 mins" },
      { title: "Deep Kitchen Cleaning", price: 899, duration: "1 hr 30 mins" },
      { title: "Chimney Cleaning", price: 699, duration: "60 mins" },
      { title: "Fridge Cleaning", price: 399, duration: "30 mins" },
    ],
  },
  bathroom: {
    title: "Bathroom Cleaning",
    image: bathroomImg,
    services: [
      { title: "Basic Bathroom Cleaning", price: 399, duration: "40 mins" },
      { title: "Deep Bathroom Cleaning", price: 699, duration: "1 hr" },
    ],
  },
  sofa: {
    title: "Sofa Cleaning",
    image: sofaImg,
    services: [
      { title: "3-Seater Sofa Cleaning", price: 599, duration: "45 mins" },
      { title: "5-Seater Sofa Cleaning", price: 899, duration: "75 mins" },
    ],
  },
  bedroom: {
    title: "Bedroom Cleaning",
    image: bedroomImg,
    services: [
      { title: "Bedroom Cleaning", price: 499, duration: "45 mins" },
      { title: "Mattress Cleaning", price: 399, duration: "30 mins" },
    ],
  },
  window: {
    title: "Window Cleaning",
    image: windowImg,
    services: [
      { title: "Window Cleaning (per window)", price: 99, duration: "10 mins" },
    ],
  },
};

const HomeCleaningCategory: React.FC = () => {
  const { category = "kitchen" } = useParams();
  const config = SERVICE_CONFIG[category];

  const [cart, setCart] = useState<Service[]>([]);
 const [step, setStep] = useState<
  "services" | "login" | "otp" | "booking" | "done"
>("services");

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const addToCart = (item: Service) => {
    if (!cart.find((c) => c.title === item.title)) {
      setCart([...cart, item]);
    }
  };

  const total = cart.reduce((s, i) => s + i.price, 0);

  if (!config) return null;

  return (
    <>
      <CleaningHeader />

      <section className="kc-page">
        {/* LEFT */}
        <div className="kc-left">
          <h1>{config.title}</h1>
          <p className="kc-rating">⭐ 4.8 (2.3M bookings)</p>

          <h3 className="kc-section-title">Select a service</h3>

          <div className="kc-services">
            {config.services.map((s, i) => (
              <div key={i} className="kc-card">
                <div>
                  <h4>{s.title}</h4>
                  <p className="kc-muted">{s.duration}</p>
                  <p className="kc-price">₹{s.price}</p>
                </div>

                <button
                  className="kc-add-btn"
                  onClick={() => addToCart(s)}
                  disabled={cart.some((c) => c.title === s.title)}
                >
                  {cart.some((c) => c.title === s.title) ? "Added" : "Add"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="kc-right">
          <img src={config.image} alt={config.title} />

          <div className="kc-cart">
            <h4>Cart</h4>

            {cart.length === 0 ? (
              <p>No items in your cart</p>
            ) : (
              <>
                {cart.map((item, i) => (
                  <div key={i} className="kc-cart-item">
                    <span>{item.title}</span>
                    <strong>₹{item.price}</strong>
                  </div>
                ))}

                <div className="kc-cart-total">
                  <span>Total</span>
                  <strong>₹{total}</strong>
                </div>

                <button
                  className="kc-proceed-btn"
                  onClick={() => setStep("login")}
                >
                  Proceed
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* LOGIN */}
      <Modal
  open={step === "login"}
  footer={null}
  centered
  onCancel={() => setStep("services")}
  className="auth-modal"
  closeIcon={<span className="auth-close">✕</span>}
>
  <div className="auth-box">
    <h3 className="auth-title">Login to continue</h3>

    <p className="auth-subtitle">
      We’ll send a one-time password to your mobile
    </p>

    <Input
      className="auth-input"
      placeholder="Enter 10-digit mobile number"
      maxLength={10}
      value={mobile}
      onChange={(e) =>
        setMobile(e.target.value.replace(/[^0-9]/g, ""))
      }
    />

    <Button
      type="primary"
      block
      className="auth-button"
      disabled={mobile.length !== 10}
      onClick={() => setStep("otp")}
    >
      Continue
    </Button>

    <p className="auth-note">
      By continuing, you agree to our Terms & Privacy Policy
    </p>
  </div>
</Modal>
<Modal
  open={step === "otp"}
  footer={null}
  centered
  onCancel={() => setStep("login")}
  className="auth-modal"
  closeIcon={<span className="auth-close">✕</span>}
>
  <div className="auth-box">
    <h3 className="auth-title">Verify OTP</h3>

    <p className="auth-subtitle">
      Enter the 6-digit code sent to <strong>{mobile}</strong>
    </p>

    <Input
      className="auth-input otp-input"
      placeholder="Enter OTP"
      maxLength={6}
      value={otp}
      onChange={(e) =>
        setOtp(e.target.value.replace(/[^0-9]/g, ""))
      }
    />

    <Button
      type="primary"
      block
      className="auth-button"
      disabled={otp.length !== 6}
      onClick={() => setStep("done")}
    >
      Verify & Book
    </Button>
  </div>
</Modal>   

      <Modal open={step === "done"} footer={null} centered closable={false}>
        <h3>🎉 Booking Confirmed</h3>
        <p>Total Paid: ₹{total}</p>
        <Button type="primary" block onClick={() => window.location.reload()}>
          Done
        </Button>
      </Modal>
      {/* BOOKING DETAILS */}
{/* <Modal open={step === "booking"} footer={null} centered>
  <h3>Booking details</h3>

  <Input.TextArea
    placeholder="Enter service address"
    rows={3}
    style={{ marginBottom: 12 }}
  />

  <Input
    type="date"
    style={{ marginBottom: 12 }}
  />

  <Input
    type="time"
    style={{ marginBottom: 16 }}
  />

  <Button
    type="primary"
    block
    onClick={() => setStep("done")}
  >
    Confirm booking
  </Button>
</Modal> */}
{step === "booking" && (
  <div className="uc-overlay">
    <div className="uc-modal">
      <BookCleaningScreenWeb
       selectedServices={cart.map((c, i) => ({
  id: String(i),
  title: c.title,
  price: c.price,
  category: "homeServices",
}))}

        consultationCharge={total}
        serviceContext="homeServices"
        onClose={() => setStep("services")}
      />
    </div>
  </div>
)}


    </>
  );
};

export default HomeCleaningCategory;
