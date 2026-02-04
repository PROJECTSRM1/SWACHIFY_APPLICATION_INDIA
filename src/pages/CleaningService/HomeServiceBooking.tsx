import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, Input, Button } from "antd";
import CleaningHeader from "./CleaningHeader";
import { HOME_SERVICE_CONFIG } from "./homeServiceConfig";
import "./KitchenCleaning.css";

const HomeServiceBooking: React.FC = () => {
  const { serviceKey } = useParams<{ serviceKey: string }>();
  const config = HOME_SERVICE_CONFIG[serviceKey!];

  const [cart, setCart] = useState<any | null>(null);

  // LOGIN FLOW STATES
  const [step, setStep] = useState<"idle" | "login" | "otp" | "done">("idle");
  const [mobile, setMobile] = useState("");

  if (!config) return <h2>Service not found</h2>;

  return (
    <>
      <CleaningHeader />

      <section className="kc-page">
        {/* LEFT */}
        <div className="kc-left">
          <h1>{config.title}</h1>
          <p className="kc-rating">
            ⭐ {config.rating} ({config.bookings})
          </p>

          <h3>Select a service</h3>

          <div className="kc-services">
            {config.services.map((s) => (
              <div key={s.id} className="kc-card">
                <div>
                  <h4>{s.title}</h4>
                  <p className="kc-muted">{s.duration}</p>
                  <p className="kc-price">₹{s.price}</p>
                </div>

                <button
                  className="kc-add-btn"
                  onClick={() => setCart(s)}
                >
                  {cart?.id === s.id ? "Added" : "Add"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="kc-right">
          {/* VIDEO PREVIEW */}
          <div style={{ marginBottom: 16 }}>
            <video
              src={config.video}
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              poster="https://via.placeholder.com/600x400?text=Service+Preview"
              style={{
                width: "100%",
                borderRadius: 16,
                background: "#000",
              }}
              onError={(e: any) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          {/* CART */}
          <div className="kc-cart">
            {!cart ? (
              <h4>No items in your cart</h4>
            ) : (
              <>
                <h4>{cart.title}</h4>
                <p>₹{cart.price}</p>
                <button
                  className="kc-add-btn"
                  onClick={() => setStep("login")}
                >
                  Proceed
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* LOGIN MODAL */}
      <Modal
        open={step === "login"}
        footer={null}
        centered
        onCancel={() => setStep("idle")}
      >
        <h3>Login to continue</h3>
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



      {/* SUCCESS MODAL */}
      <Modal
        open={step === "done"}
        footer={null}
        centered
        closable={false}
      >
        <h3>🎉 Booking Confirmed</h3>
        <p>
          Your booking for <b>{cart?.title}</b> has been placed.
        </p>
        <Button
          type="primary"
          block
          onClick={() => {
            setStep("idle");
            setCart(null);
          }}
        >
          Done
        </Button>
      </Modal>
    </>
  );
};

export default HomeServiceBooking;
