import React, { useState } from "react";
import CleaningHeader from "./CleaningHeader";
import "./KitchenCleaning.css"; // reuse same styles
import { Modal, Input, Button } from "antd";

const propertyTypes = [
  { title: "Office", price: 1999 },
  { title: "Shop", price: 1499 },
  { title: "Restaurant", price: 2499 },
  { title: "Warehouse", price: 2999 },
];

const CommercialCleaning: React.FC = () => {
  const [selected, setSelected] = useState<any>(null);
  const [step, setStep] = useState<"select" | "login" | "otp" | "done">("select");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <>
      <CleaningHeader />

      <section className="kc-page">
        <div className="kc-left">
          <h1>Commercial Cleaning</h1>
          <p className="kc-rating">⭐ 4.7 (1.1M bookings)</p>

          <h3>Select property type</h3>

          <div className="kc-services">
            {propertyTypes.map((p, i) => (
              <div key={i} className="kc-card">
                <div>
                  <h4>{p.title}</h4>
                  <p className="kc-price">Starting at ₹{p.price}</p>
                </div>
                <button
                  className="kc-add-btn"
                  onClick={() => {
                    setSelected(p);
                    setStep("login");
                  }}
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGIN */}
      <Modal open={step === "login"} footer={null} centered>
        <Input
          placeholder="Enter mobile number"
          maxLength={10}
          value={mobile}
          onChange={(e) =>
            setMobile(e.target.value.replace(/[^0-9]/g, ""))
          }
        />
        <Button
          type="primary"
          block
          disabled={mobile.length !== 10}
          onClick={() => setStep("otp")}
          style={{ marginTop: 16 }}
        >
          Continue
        </Button>
      </Modal>

      {/* OTP */}
      <Modal open={step === "otp"} footer={null} centered>
        <Input
          placeholder="Enter OTP"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
        />
        <Button
          type="primary"
          block
          disabled={otp.length !== 6}
          onClick={() => setStep("done")}
          style={{ marginTop: 16 }}
        >
          Verify & Book
        </Button>
      </Modal>

      {/* DONE */}
      <Modal open={step === "done"} footer={null} centered closable={false}>
        <h3>🎉 Booking Requested</h3>
        <p>
          Our team will contact you shortly for <b>{selected?.title}</b> cleaning.
        </p>
        <Button
          type="primary"
          block
          onClick={() => window.location.href = "/cleaningservice"}
        >
          Done
        </Button>
      </Modal>
    </>
  );
};

export default CommercialCleaning;
