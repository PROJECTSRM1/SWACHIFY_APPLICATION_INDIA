import React, { useState, useRef } from "react";
import { useCart } from "../../../context/CartContext";

import cementimg from "../../../assets/Building/cement.jpg";
import sandimg from "../../../assets/Building/sand.jpg";
import brickimg from "../../../assets/Building/bricks.jpg";
import steelimg from "../../../assets/Building/steel.jpeg";
import pipesimg from "../../../assets/Building/pipes.jpg";
import tilesimg from "../../../assets/Building/tiles.jpg";
import message from "antd/es/message";

const materials = [
  { id: 1, title: "Cement", price: "800", img: cementimg },
  { id: 2, title: "Sand", price: "700", img: sandimg },
  { id: 3, title: "Bricks", price: "200", img: brickimg },
  { id: 4, title: "Steel & TMT Bars", price: "650", img: steelimg },
  { id: 5, title: "Pipes", price: "250", img: pipesimg },
  { id: 6, title: "Marble & Tiles", price: "450", img: tilesimg },
];

interface FormProps {
  id: number;
  onClose: () => void;
}

const EquipmentDetails: React.FC<FormProps> = ({ id, onClose }) => {
  const material = materials.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("kg"); 

  const [deliveryType, setDeliveryType] = useState("");
  const [unloading, setUnloading] = useState(false);
  const [preferredDate, setPreferredDate] = useState("");
const [preferredTime, setPreferredTime] = useState("");


  const [showOtpFields, setShowOtpFields] = useState(false);
const [otpVerified, setOtpVerified] = useState(false);
const [phoneOtp, setPhoneOtp] = useState("");
const [emailOtp, setEmailOtp] = useState("");
const [otpError, setOtpError] = useState("");
const [contactValue, setContactValue] = useState("+91 ");
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidMobile = (mobile: string) =>
  /^\+91\s\d{10}$/.test(mobile);




  const formRef = useRef<HTMLFormElement>(null);

  if (!material) return null;

  const finalQuantity =
    unit === "ton" ? quantity * 1000 : quantity; 

  const basePrice = Number(material.price) * finalQuantity;

  const deliveryCharge = deliveryType === "Door Delivery" ? 150 : 0;
  const unloadingCharge = unloading ? 200 : 0;

  const totalPrice = basePrice + deliveryCharge + unloadingCharge;

  const { addToCart } = useCart();
const handleReset = () => {
  formRef.current?.reset();
  setQuantity(1);
  setUnit("kg");
  setDeliveryType("");
  setUnloading(false);
};

const handleAddToCart = () => {

  if (!deliveryType) {
  message.error("Please select delivery type (Pick-up or Door Delivery)");
  return;
}

  if (finalQuantity <= 0) {
  message.error("Quantity must be at least 1");
  return;
}

  if (!preferredDate || !preferredTime) {
  message.error("Please select preferred date and time slot");
  return;
}

  const customerName = (formRef.current?.elements.namedItem(
    "customerName"
  ) as HTMLInputElement)?.value;

  const email = (formRef.current?.elements.namedItem(
    "email"
  ) as HTMLInputElement)?.value;

  const contact = contactValue;

  const address = (formRef.current?.elements.namedItem(
    "address"
  ) as HTMLTextAreaElement)?.value;

  const instructions = (formRef.current?.elements.namedItem(
    "instructions"
  ) as HTMLTextAreaElement)?.value;

  addToCart({
    id: Date.now(),
    title: material.title,
    image: material.img,

    quantity: finalQuantity,
    unit,
    price: material.price,
    basePrice,
    deliveryCharge,
    unloadingCharge,
    totalPrice,

    customerName,
    email,
    contact,
    address,
    instructions,

    deliveryType,
    deliveryDate: preferredDate,
    deliveryTime: preferredTime.split("-")[0],
      

   paymentDone: true, // or remove it completely
workStatus: "pending",

  });

  // ✅ THESE TWO LINES WERE MISSING
  message.success("Item added to cart");
  onClose();
};

  return (
    <div className="sw-br-modal">
      <div className="sw-br-modal-box">
        
        <div className="sw-br-modal-header">
          <h2>{material.title}</h2>
          <button className="sw-br-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="sw-br-top">

          <div className="sw-br-left">
            <div className="sw-br-image-box">
              <img src={material.img} alt={material.title} />
            </div>

            <div className="sw-br-price-box">
              <p className="sw-br-price-title">Total Price</p>
              <p className="sw-br-price-value">₹{totalPrice}</p>
            </div>

            <h3 className="sw-br-inc-title">What's Included</h3>
            <ul className="sw-br-inc-list">
              <li>Quality certified materials</li>
              <li>Timely delivery</li>
              <li>Doorstep delivery</li>
              <li>Quality assurance</li>
              <li>Return/exchange policy</li>
              <li>Technical support</li>
              <li>Bulk order discounts</li>
              <li>Invoice and documentation</li>
            </ul>
          </div>

          
          <form className="sw-br-form" ref={formRef}>
            <div className="sw-br-form-box">

              <h3 className="sw-br-form-title">Service Details</h3>

              <div className="sw-br-row">
                <div className="sw-br-field">
                  <label>Customer Name</label>
                  <input type="text" name="customerName" placeholder="Site manager name" />
                </div>

                <div className="sw-br-field">
                  <label>Delivery Type</label>
                  <select
                    name="deliveryType"
                    value={deliveryType}
                    onChange={(e) => setDeliveryType(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Door Delivery">Door Delivery (+₹150)</option>
                    <option value="Pick-up">Pick-up</option>
                  </select>
                </div>
              </div>

              <div className="sw-br-row">
                <div className="sw-br-field">
                  {/* ROW 2 — Quantity | EMPTY */}
<div className="sw-br-row">
  <div className="sw-br-field">
    <label>Quantity</label>
    <div className="sw-br-qty-group">
  <input
    type="number"
    min={1}
    value={quantity}
    onChange={(e) =>
      setQuantity(Math.max(1, Number(e.target.value)))
    }
  />

  <select value={unit} onChange={(e) => setUnit(e.target.value)}>
    <option value="kg">Kg</option>
    <option value="ton">Ton</option>
  </select>
</div>

  </div>

  {/* EMPTY COLUMN */}
  <div className="sw-br-field"></div>
</div>

{/* ROW 3 — Preferred Date | Preferred Time Slot */}
<div className="sw-br-row">
  <div className="sw-br-field">
    <label>Preferred Date</label>
    <input
      type="date"
      value={preferredDate}
      min={new Date().toISOString().split("T")[0]}
      onChange={(e) => setPreferredDate(e.target.value)}
    />
  </div>

  <div className="sw-br-field">
    <label>Preferred Time Slot</label>
    <select
      value={preferredTime}
      onChange={(e) => setPreferredTime(e.target.value)}
    >
      <option value="">Select</option>
      <option value="09:00-11:00">09:00 AM - 11:00 AM</option>
      <option value="11:00-13:00">11:00 AM - 01:00 PM</option>
      <option value="13:00-15:00">01:00 PM - 03:00 PM</option>
      <option value="15:00-17:00">03:00 PM - 05:00 PM</option>
      <option value="17:00-19:00">05:00 PM - 07:00 PM</option>
    </select>
  </div>
  </div>

</div>

              </div>
                  {/* EMAIL + CONTACT — SIDE BY SIDE */}
{/* EMAIL + CONTACT */}
<div className="sw-br-row">

  <div className="sw-br-field">
    <label>Email</label>
    <div className="sw-br-otp-input">
      <input
        type="email"
        name="email"
        placeholder="Enter email address"
      />
      {otpVerified && <span className="sw-br-otp-verified">✓</span>}
    </div>
  </div>

  {/* CONTACT — SECOND */}
  <div className="sw-br-field">
    <label>Contact Number</label>
    <div className="sw-br-otp-input">
      <input
  type="text"
  name="contact"
  value={contactValue}
  placeholder="Contact number"
  onChange={(e) => {
    let value = e.target.value;  
    if (!value.startsWith("+91 ")) {
      value = "+91 ";
    }
    const digits = value.slice(4).replace(/\D/g, "");
    setContactValue("+91 " + digits.slice(0, 10));
  }}
/>
      {!otpVerified && !showOtpFields && (
        <span
          className="sw-br-send-otp"
onClick={() => {
  const emailInput = (formRef.current?.elements.namedItem(
    "email"
  ) as HTMLInputElement)?.value;

  if (!emailInput || !isValidEmail(emailInput)) {
    message.error("Please enter a valid email address");
    return;
  }

  if (!isValidMobile(contactValue)) {
    message.error("Please enter a valid 10-digit mobile number");
    return;
  }

  setShowOtpFields(true);
  message.success("OTP sent successfully");
}}
        >
          Send OTP
        </span>
      )}

      {otpVerified && <span className="sw-br-otp-verified">✓</span>}
    </div>
  </div>

</div>
{showOtpFields && (
  <div className="sw-br-row">

    <div className="sw-br-field">
      <label>Phone OTP</label>
      <input
        type="text"
        placeholder="Enter Phone OTP"
        maxLength={4}
        value={phoneOtp}
        onChange={(e) => {
          const v = e.target.value.replace(/\D/g, "");
          if (v.length <= 4) {
            setPhoneOtp(v);
            setOtpError("");
          }
        }}
      />
    </div>

    <div className="sw-br-field">
      <label>Email OTP</label>
      <input
        type="text"
        placeholder="Enter Email OTP"
        maxLength={4}
        value={emailOtp}
        onChange={(e) => {
          const v = e.target.value.replace(/\D/g, "");
          if (v.length <= 4) {
            setEmailOtp(v);
            setOtpError("");
          }
        }}
      />

      {otpError && (
        <p style={{ color: "red", fontSize: "12px" }}>{otpError}</p>
      )}
    </div>

    <div className="sw-br-field" style={{ justifyContent: "flex-end" }}>
      <button
        type="button"
        className="sw-br-mach-otp-btn"
        onClick={() => {
          if (phoneOtp.length !== 4 || emailOtp.length !== 4) {
            setOtpError("OTP must be exactly 4 digits");
            return;
          }

          setOtpVerified(true);
          setShowOtpFields(false);
          setOtpError("");
          message.success("OTP Verified");
        }}
      >
        Verify OTP
      </button>
    </div>

  </div>
)}

        
              <div className="sw-br-field sw-br-full">
                <label>Delivery Address</label>
                <textarea name="address" placeholder="Construction site address" />
              </div>

              <h3 className="sw-br-form-title">Additional Services</h3>

              <div className="sw-br-check-grid">
                <label>
                  <input
                    type="checkbox"
                    checked={unloading}
                    onChange={(e) => setUnloading(e.target.checked)}
                  />
                  Unloading Service (+₹200)
                </label>
              </div>

              <div className="sw-br-field sw-br-full">
                <label>Special Instructions</label>
                <textarea name="instructions" placeholder="Any specific requirements..." />
              </div>

            </div>

            <div className="sw-br-buttons">
              <button type="button" className="sw-br-cancel" onClick={handleReset}>
                Cancel
              </button>
              <button
  type="button"
  className="sw-br-add"
  onClick={handleAddToCart}
  disabled={!otpVerified}
  style={{
    background: otpVerified ? "black" : "#9ca3af",
    cursor: otpVerified ? "pointer" : "not-allowed",
  }}
>
  Add to Cart
</button>


            </div>

          </form>

        </div>

      </div>
    </div>
  );
};

export default EquipmentDetails;