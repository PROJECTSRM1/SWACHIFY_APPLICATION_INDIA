import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import CleaningHeader from "./CleaningHeader";
import "./KitchenCleaning.css";

import kitchenImg from "../../assets/CleaningServices/Kitchen2.jpg";

type CartItem = {
  title: string;
  price: number;
  duration: string;
};

const kitchenServices = [
  { title: "Basic Kitchen Cleaning", price: 499, duration: "45 mins" },
  { title: "Deep Kitchen Cleaning", price: 899, duration: "1 hr 30 mins" },
  { title: "Chimney Cleaning", price: 699, duration: "60 mins" },
  { title: "Fridge Cleaning", price: 399, duration: "30 mins" },
];

type Step = "services" | "login" | "otp" | "confirmed";

const KitchenCleaning: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [step, setStep] = useState<Step>("services");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const addToCart = (item: CartItem) => {
    if (!cart.find((c) => c.title === item.title)) {
      setCart([...cart, item]);
    }
  };

  const total = cart.reduce((s, i) => s + i.price, 0);

  return (
    <>
      <CleaningHeader />

      <section className="kc-page">
        {/* LEFT */}
        <div className="kc-left">
          <h1>Kitchen Cleaning</h1>
          <p className="kc-rating">⭐ 4.8 (2.3M bookings)</p>

          <h3 className="kc-section-title">Select a service</h3>

          <div className="kc-services">
            {kitchenServices.map((s, i) => (
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
          <img src={kitchenImg} alt="Kitchen cleaning" />

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

            <div className="kc-promise">
              <h5>Swachify Promise</h5>
              <ul>
                <li>✔ Verified Professionals</li>
                <li>✔ Safe & Hygienic</li>
                <li>✔ Transparent Pricing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* LOGIN MODAL */}
      <Modal
        open={step === "login"}
        footer={null}
        centered
        onCancel={() => setStep("services")}
        title="Login to continue"
      >
        <p>Enter your mobile number</p>

        <Input
          placeholder="10-digit mobile number"
          maxLength={10}
          value={mobile}
          onChange={(e) =>
            setMobile(e.target.value.replace(/[^0-9]/g, ""))
          }
        />

        <Button
          type="primary"
          block
          style={{ marginTop: 16 }}
          disabled={mobile.length !== 10}
          onClick={() => {
            console.log("OTP sent to", mobile);
            setStep("otp");
          }}
        >
          Continue
        </Button>
      </Modal>

      {/* OTP MODAL */}
      <Modal
        open={step === "otp"}
        footer={null}
        centered
        onCancel={() => setStep("login")}
        title="Verify OTP"
      >
        <p>Enter the 6-digit OTP sent to {mobile}</p>

        <Input
          placeholder="OTP"
          maxLength={6}
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value.replace(/[^0-9]/g, ""))
          }
        />

        <Button
          type="primary"
          block
          style={{ marginTop: 16 }}
          disabled={otp.length !== 6}
          onClick={() => {
            console.log("OTP verified");
            setStep("confirmed");
          }}
        >
          Verify & Book
        </Button>
      </Modal>

      {/* CONFIRMATION MODAL */}
      <Modal
        open={step === "confirmed"}
        footer={null}
        centered
        closable={false}
      >
        <h3>🎉 Booking Confirmed!</h3>
        <p>Your kitchen cleaning service has been booked.</p>

        <div style={{ marginTop: 12 }}>
          <strong>Total Paid: ₹{total}</strong>
        </div>

        <Button
          type="primary"
          block
          style={{ marginTop: 16 }}
          onClick={() => {
            setCart([]);
            setMobile("");
            setOtp("");
            setStep("services");
          }}
        >
          Done
        </Button>
      </Modal>
    </>
  );
};

export default KitchenCleaning;
