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

  const [quantity, setQuantity] = useState(1);

  const [customerName, setCustomerName] = useState("");
  const [rentalType, setRentalType] = useState("");
  const [rentalDate, setRentalDate] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");

  const formRef = useRef<HTMLFormElement>(null); 

  const { addToCart } = useCart();

  if (!machine) return null;

  const totalPrice = Number(machine.price) * quantity;

  // ★ RESET FORM WITHOUT CLOSING POPUP
  const handleReset = () => {
    formRef.current?.reset(); 
    setQuantity(1); 

    setCustomerName("");
    setRentalType("");
    setRentalDate("");
    setContact("");
    setAddress("");
    setInstructions("");
  };

  const handleAddToCart = () => {
    addToCart({
      id: machine.id,
      title: machine.title,
      image: machine.img,
      quantity,
      price: machine.price,
      totalPrice,
      customerName,
      deliveryType: rentalType,
      deliveryDate: rentalDate,
      contact,
      address,
      instructions,
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
              <li>Fuel support (if applicable)</li>
              <li>Invoice & documentation</li>
            </ul>
          </div>

          <form ref={formRef} className="sw-br-mach-form-side">
            <div className="sw-br-mach-form-section">

              <h3 className="sw-br-mach-section-title">Rental Details</h3>

              <div className="sw-br-mach-row">
                <div className="sw-br-mach-form-item">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    name="customerName"
                    placeholder="Enter customer name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>

                <div className="sw-br-mach-form-item">
                  <label>Rental Type</label>
                  <select
                    name="rentalType"
                    value={rentalType}
                    onChange={(e) => setRentalType(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option>With Operator</option>
                    <option>Without Operator</option>
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
                    value={rentalDate}
                    onChange={(e) => setRentalDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="sw-br-mach-form-item full-width">
                <label>Contact Number</label>
                <input
                  type="text"
                  name="contact"
                  placeholder="Enter contact number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>

              <div className="sw-br-mach-form-item full-width">
                <label>Site Address</label>
                <textarea
                  name="address"
                  placeholder="Enter site address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <h3 className="sw-br-mach-section-title">Additional Services</h3>

              <div className="sw-br-mach-checkbox-row">
                <label><input type="checkbox" /> Fuel Supply</label>
                <label><input type="checkbox" /> Operator Required</label>
                <label><input type="checkbox" /> Extra Attachments</label>
                <label><input type="checkbox" /> Maintenance Support</label>
              </div>

              <div className="sw-br-mach-form-item full-width">
                <label>Special Instructions</label>
                <textarea
                  name="instructions"
                  placeholder="Any specific requirements..."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
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
