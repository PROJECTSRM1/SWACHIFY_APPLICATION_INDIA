import React, { useState, useRef } from "react";
import { useCart } from "../../../context/CartContext";

import materialpickupimg from "../../../assets/Building/material pickup.jpg";
import deliveryservicesimg from "../../../assets/Building/Delivery services.jpg";
import { message } from "antd";

const Transportation = [
  { id: 1, title: "Material Supply", price: "800", img: materialpickupimg },
  { id: 2, title: "Delivery Services", price: "450", img: deliveryservicesimg },
];

interface FormProps {
  id: number;
  onClose: () => void;
}

const TransportationForm: React.FC<FormProps> = ({ id, onClose }) => {
  const material = Transportation.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("kg"); 

  const [customerName, setCustomerName] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
const [deliveryTime, setDeliveryTime] = useState("");

  const [contact, setContact] = useState("+91");
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");

  const [unloading, setUnloading] = useState(false);

  const [email, setEmail] = useState("");

const [showOtpFields, setShowOtpFields] = useState(false);
const [otpVerified, setOtpVerified] = useState(false);
const [phoneOtp, setPhoneOtp] = useState("");
const [emailOtp, setEmailOtp] = useState("");
const [otpError, setOtpError] = useState("");



  const formRef = useRef<HTMLFormElement>(null);
  const { addToCart } = useCart();

  if (!material) return <p>Material not found</p>;

  const finalQuantity = unit === "ton" ? quantity * 1000 : quantity;

  const basePrice = Number(material.price) * finalQuantity;
  const deliveryCharge = deliveryType === "Door Delivery" ? 150 : 0;
  const unloadingCharge = unloading ? 200 : 0;

  const totalPrice = basePrice + deliveryCharge + unloadingCharge;

  const handleReset = () => {
    formRef.current?.reset();
    setQuantity(0);
    setUnit("kg");
    setDeliveryType("");
    setUnloading(false);
    setCustomerName("");
    setDeliveryDate("");
    setContact("");
    setAddress("");
    setInstructions("");
  };

  const handleAddToCart = () => {
  addToCart({
    id: Date.now(),                 // ✅ unique id
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
    deliveryDate,                   
    deliveryTime: deliveryTime
      ? deliveryTime.split("-")[0]  
      : "",

    // ✅ SAME AS SERVICE FORM
    paymentDone: true,
    workStatus: "pending",
  });

  message.success("Item added to cart");
  onClose();
};


  return (
    <div className="sw-br-form-wrapper">
      <div className="sw-br-form-container">

        <div className="sw-br-form-header">
          <h2>{material.title}</h2>
          <button className="sw-br-form-close" onClick={onClose}>✕</button>
        </div>

        <div className="sw-br-form-main">

          <div className="sw-br-form-left">
            <div className="sw-br-form-image">
              <img src={material.img} alt={material.title} />
            </div>

            <div className="sw-br-price-box">
              <p className="sw-br-price-label">Service Price</p>
              <p className="sw-br-price-value">₹{totalPrice}</p>
            </div>

            <h3 className="sw-br-included-title">What's Included</h3>
            <ul className="sw-br-included-list">
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

          <form ref={formRef} className="sw-br-form-box">

            <h3 className="sw-br-form-title">Service Details</h3>

            <div className="sw-br-grid3">
              <div className="sw-br-field3">
                <label>Customer Name</label>
                <input 
                  type="text"
                  name="customerName"
                  placeholder="Enter Customer Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              <div className="sw-br-field3">
                <label>Delivery Type</label>
                <select
                  name="deliveryType"
                  value={deliveryType}
                  onChange={(e) => setDeliveryType(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Door Delivery">Door Delivery (+₹150)</option>
                  <option value="Pick-up">Pick-up (Free)</option>
                </select>
              </div>
            </div>

          {/* QUANTITY */}
<div className="sw-br-grid3">
  <div className="sw-br-field3">
    <label>Quantity</label>
    <div style={{ display: "flex", gap: "8px" }}>
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="kg">Kg</option>
        <option value="ton">Tons</option>
      </select>
    </div>
  </div>
</div>

{/* ✅ PREFERRED DATE + TIME (SAME ROW) */}
<div className="sw-br-grid3">
  <div className="sw-br-field3">
    <label>Preferred Date</label>
    <input
      type="date"
      name="deliveryDate"
      value={deliveryDate}
      min={new Date().toISOString().split("T")[0]}
      onChange={(e) => setDeliveryDate(e.target.value)}
    />
  </div>

  <div className="sw-br-field3">
    <label>Preferred Time Slot</label>
    <select
      name="deliveryTime"
      value={deliveryTime}
      onChange={(e) => setDeliveryTime(e.target.value)}
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
<div className="sw-br-grid3">

  {/* EMAIL FIRST */}
  <div className="sw-br-field3">
    <label>Email</label>
    <div className="sw-br-otp-input">
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Enter email address"
        onChange={(e) => setEmail(e.target.value)}
      />
      {otpVerified && <span className="sw-br-otp-verified">✓</span>}
    </div>
  </div>

  {/* CONTACT SECOND */}
  <div className="sw-br-field3">
    <label>Contact Number</label>
    <div className="sw-br-otp-input">
      <input
        type="text"
        name="contact"
        value={contact}
        placeholder="Contact number"
        onChange={(e) => {
    let value = e.target.value;  
    if (!value.startsWith("+91 ")) {
      value = "+91 ";
    }
    const digits = value.slice(4).replace(/\D/g, "");
    setContact("+91 " + digits.slice(0, 10));
  }}
/>
      {!otpVerified && !showOtpFields && (
        <span
          className="sw-br-send-otp"
          onClick={() => {
            if (!/^\d{10}$/.test(contact)) {
              message.error("Enter valid 10-digit contact number");
              return;
            }
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              message.error("Enter valid email");
              return;
            }
            setShowOtpFields(true);
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
  <div className="sw-br-grid3">

    <div className="sw-br-field3">
      <label>Phone OTP</label>
      <input
        type="text"
        maxLength={4}
        placeholder="Enter Phone OTP"
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

    <div className="sw-br-field3">
      <label>Email OTP</label>
      <input
        type="text"
        maxLength={4}
        placeholder="Enter Email OTP"
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

    <div className="sw-br-field3 sw-br-verify-wrap">
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
          message.success("OTP Verified");
        }}
      >
        Verify OTP
      </button>
    </div>

  </div>
)}





            <div className="sw-br-field3">
              <label>Delivery Address</label>
              <textarea
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>

            <h3 className="sw-br-form-title">Additional Services</h3>

            <div className="sw-br-checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={unloading}
                  onChange={(e) => setUnloading(e.target.checked)}
                />
                Unloading Service (+₹200)
              </label>
            </div>

            <div className="sw-br-field3">
              <label>Special Instructions</label>
              <textarea
                name="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              ></textarea>
            </div>

            <div className="sw-br-buttons3">
              <button type="button" className="sw-br-btn-cancel" onClick={handleReset}>
                Cancel
              </button>

              <button
  type="button"
  className="sw-br-btn-add"
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

export default TransportationForm;