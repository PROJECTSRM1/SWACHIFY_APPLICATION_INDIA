import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import CleaningHeader from "./CleaningHeader";
import "./KitchenCleaning.css";

type VehicleType = "Bike" | "Car" | "SUV";

const vehiclePackages: Record<
  VehicleType,
  { title: string; price: number; duration: string }[]
> = {
  Bike: [
    { title: "Basic Bike Wash", price: 199, duration: "20 mins" },
    { title: "Premium Bike Wash", price: 299, duration: "35 mins" },
  ],
  Car: [
    { title: "Exterior Car Wash", price: 399, duration: "30 mins" },
    { title: "Interior + Exterior", price: 699, duration: "60 mins" },
    { title: "Deep Car Cleaning", price: 999, duration: "90 mins" },
  ],
  SUV: [
    { title: "Exterior SUV Wash", price: 499, duration: "40 mins" },
    { title: "Interior + Exterior", price: 899, duration: "75 mins" },
    { title: "Deep SUV Cleaning", price: 1299, duration: "120 mins" },
  ],
};

const VehicleCleaning: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<VehicleType | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [step, setStep] = useState<"services" | "login" | "otp" | "done">(
    "services"
  );
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const total = cart.reduce((s, i) => s + i.price, 0);

  return (
    <>
      <CleaningHeader />

      <section className="kc-page">
        <div className="kc-left">
          <h1>Vehicle Cleaning</h1>
          <p className="kc-rating">⭐ 4.8 (980K bookings)</p>

          {/* VEHICLE TYPE */}
          {!vehicleType && (
            <>
              <h3>Select vehicle type</h3>
              <div className="kc-services">
                {(["Bike", "Car", "SUV"] as VehicleType[]).map((v) => (
                  <div key={v} className="kc-card">
                    <h4>{v}</h4>
                    <button
                      className="kc-add-btn"
                      onClick={() => setVehicleType(v)}
                    >
                      Select
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* PACKAGES */}
          {vehicleType && (
            <>
              <h3>{vehicleType} Cleaning Packages</h3>
              <div className="kc-services">
                {vehiclePackages[vehicleType].map((p, i) => (
                  <div key={i} className="kc-card">
                    <div>
                      <h4>{p.title}</h4>
                      <p className="kc-muted">{p.duration}</p>
                      <p className="kc-price">₹{p.price}</p>
                    </div>
                    <button
                      className="kc-add-btn"
                      onClick={() =>
                        !cart.find((c) => c.title === p.title) &&
                        setCart([...cart, p])
                      }
                    >
                      {cart.find((c) => c.title === p.title)
                        ? "Added"
                        : "Add"}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* CART */}
        <div className="kc-right">
          <div className="kc-cart">
            <h4>Cart</h4>

            {cart.length === 0 ? (
              <p>No items in your cart</p>
            ) : (
              <>
                {cart.map((c, i) => (
                  <div key={i} className="kc-cart-item">
                    <span>{c.title}</span>
                    <strong>₹{c.price}</strong>
                  </div>
                ))}
                <div className="kc-cart-total">
                  <strong>Total</strong>
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

     {/* OTP */}
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

{/* DONE */}
<Modal
  open={step === "done"}
  footer={null}
  centered
  closable={false}
  className="auth-modal"
>
  <div className="auth-box">
    <h3 className="auth-title">🚗 Booking Confirmed</h3>

    <p className="auth-subtitle">
      Your vehicle cleaning is scheduled.
    </p>

    <Button
      type="primary"
      block
      className="auth-button"
      onClick={() => (window.location.href = "/cleaningservice")}
    >
      Done
    </Button>
  </div>
</Modal>

    </>
  );
};

export default VehicleCleaning;
