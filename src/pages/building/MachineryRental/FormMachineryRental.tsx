import React, { useState, useRef } from "react";
import { useCart } from "../../../context/CartContext";

import excavatorImg from "../../../assets/Building/excavator.jpg";
import loaderImg from "../../../assets/Building/loader.jpg";
import craneImg from "../../../assets/Building/crane.jpg";
import mixerImg from "../../../assets/Building/concretemixer.jpg";
import { message } from "antd";

const machinery = [
  { id: 1, title: "Excavator Rental", price: "150", img: excavatorImg },
  { id: 2, title: "Loader Rental", price: "200", img: loaderImg },
  { id: 3, title: "Crane Rental", price: "300", img: craneImg },
  { id: 4, title: "Concrete Mixer Rental", price: "120", img: mixerImg },
];

interface FormProps {
  id: number;
  onClose: () => void;
}

const MachineryDetails: React.FC<FormProps> = ({ id, onClose }) => {
  const machine = machinery.find((item) => item.id === id);
  const { addToCart } = useCart();
  const formRef = useRef<HTMLFormElement>(null);

  if (!machine) return null;

  const [quantity, setQuantity] = useState(0);
  const [rentalType, setRentalType] = useState("");
  const [fuelSupply, setFuelSupply] = useState(false);

  // ✅ OTP STATE (ADDED)
  const [showOtpFields, setShowOtpFields] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [, setOtpError] = useState("");



  const basePrice = Number(machine.price) * quantity;
  const operatorCharge = rentalType === "With Operator" ? 150 : 0;
  const fuelCharge = fuelSupply ? 200 : 0;
  const totalPrice = basePrice + operatorCharge + fuelCharge;

  const handleReset = () => {
    formRef.current?.reset();
    setQuantity(1);
    setRentalType("");
    setFuelSupply(false);
    setShowOtpFields(false);
  };

  const handleAddToCart = () => {
    const form = formRef.current!;
    addToCart({
      id: machine.id,
      title: machine.title,
      image: machine.img,
      quantity,
      basePrice,
      operatorCharge,
      fuelCharge,
      totalPrice,
      price: machine.price,
      customerName: form.customerName.value,
      deliveryType: rentalType,
      deliveryDate: form.rentalDate.value,
      contact: form.contact.value,
      email: form.email.value,
      address: form.address.value,
      instructions: form.instructions.value,
    });

    message.success("Item added to cart");
    onClose();
  };

  return (
    <div className="sw-br-mach-details-modal">
      <div className="sw-br-mach-details-box">

        <div className="sw-br-mach-details-header">
          <h2>{machine.title}</h2>
          <button className="sw-br-mach-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="sw-br-mach-top-section">

          <div className="sw-br-mach-left-side">
            <div className="sw-br-mach-image-box">
              <img src={machine.img} alt={machine.title} />
            </div>

            <div className="sw-br-mach-service-price-box">
              <p className="sw-br-mach-sp-title">Rental Price</p>
              <p className="sw-br-mach-sp-value">₹{totalPrice}</p>
            </div>

            <h3 className="sw-br-mach-included-title">What's Included</h3>
            <ul className="sw-br-mach-included-list">
              <li>On-time delivery</li>
              <li>Equipment safety check</li>
              <li>Breakdown support</li>
              <li>Operator support (optional)</li>
              <li>Fuel support (optional)</li>
              <li>Invoice & documentation</li>
            </ul>
          </div>

          <form ref={formRef} className="sw-br-mach-form-side">
            <div className="sw-br-mach-form-section">

              <h3 className="sw-br-mach-section-title">Rental Details</h3>

              <div className="sw-br-mach-row">
                <div className="sw-br-mach-form-item">
                  <label>Customer Name</label>
                  <input type="text" name="customerName" placeholder="Enter customer name" />
                </div>

                <div className="sw-br-mach-form-item">
                  <label>Rental Type</label>
                  <select
                    value={rentalType}
                    onChange={(e) => setRentalType(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="With Operator">With Operator (+₹150)</option>
                    <option value="Without Operator">Without Operator</option>
                  </select>
                </div>
              </div>

              <div className="sw-br-mach-row">
                <div className="sw-br-mach-form-item">
                  <label>Quantity</label>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>

                <div className="sw-br-mach-form-item">
                  <label>Rental Date</label>
                  <input
                    type="date"
                    name="rentalDate"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              {/* CONTACT + EMAIL */}
              <div className="sw-br-mach-row">

  {/* EMAIL — FIRST */}
  <div className="sw-br-mach-form-item">
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

  {/* CONTACT NUMBER — SECOND (Send OTP here) */}
  <div className="sw-br-mach-form-item">
    <label>Contact Number</label>
    <div className="sw-br-otp-input">
      <input
        type="text"
        name="contact"
        placeholder="Contact number"
      />

      {!otpVerified && !showOtpFields && (
        <span
          className="sw-br-send-otp"
          onClick={() => setShowOtpFields(true)}
        >
          
          Send OTP
        </span>
      )}

      {otpVerified && <span className="sw-br-otp-verified">✓</span>}
    </div>
  </div>

</div>


              {/* OTP FIELDS */}
              {showOtpFields && (
                <div className="sw-br-mach-row">
                  <div className="sw-br-mach-form-item">
                    <label>Phone OTP</label>
<input
  type="text"
  placeholder="Enter Phone OTP"
  value={phoneOtp}
  maxLength={4}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, ""); // numbers only
    if (value.length <= 4) {
      setPhoneOtp(value);
      setOtpError("");
    }
  }}
/>
                  </div>

                  <div className="sw-br-mach-form-item">
                    <label>Email OTP</label>
                    <input type="text" placeholder="Enter Email OTP" />
                  </div>

                  <div className="sw-br-mach-form-item">
                    <button type="button" className="sw-br-mach-otp-btn" style={{ marginTop: "22px" }}
                   onClick={() => {
                    setOtpVerified(true);
                    setShowOtpFields(false);
                    message.success("OTP Verified"); }} >
                      Verify OTP </button>

                  </div>
                </div>
              )}

              <div className="sw-br-mach-form-item full-width">
                <label>Site Address</label>
                <textarea name="address"></textarea>
              </div>

              <h3 className="sw-br-mach-section-title">Additional Services</h3>

              <div className="sw-br-mach-checkbox-row">
                <label>
                  <input
                    type="checkbox"
                    checked={fuelSupply}
                    onChange={(e) => setFuelSupply(e.target.checked)}
                  />
                  Fuel Supply (+₹200)
                </label>
              </div>

              <div className="sw-br-mach-form-item full-width">
                <label>Special Instructions</label>
                <textarea name="instructions"></textarea>
              </div>

              <div className="sw-br-mach-button-row">
                <button
                  type="button"
                  className="sw-br-mach-cancel-btn"
                  onClick={handleReset}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="sw-br-mach-add-btn"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>

            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default MachineryDetails;
