import React, { useState } from "react";
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
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [rentalType, setRentalType] = useState("");
  const [rentalDate, setRentalDate] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");

  if (!material) return <p>Material not found</p>;

  const unitPrice = Number(material.price);
  const totalPrice = unitPrice * quantity;

  const handleaddtocart = () => {
    addToCart({
      id: material.id,
      title: material.title,
      image: material.img,
      quantity,
      price: material.price,
      totalPrice,
      customerName,
      deliveryType: rentalType,
      deliveryDate: rentalDate,
      contact,
      address,
      instructions
    });
    message.success("item added to cart");    
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

          <div className="sw-br-form-box">
            <h3 className="sw-br-form-title">Service Details</h3>

            <div className="sw-br-grid3">
              <div className="sw-br-field3">
                <label>Customer Name</label>
                <input
                  type="text"
                  placeholder="Site manager name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              <div className="sw-br-field3">
                <label>Delivery Type</label>
                <select value={rentalType} onChange={(e)=>setRentalType(e.target.value)}>
                  <option>Select</option>
                  <option>Door Delivery</option>
                  <option>Pick-up</option>
                </select>
              </div>
            </div>

            <div className="sw-br-grid3">
              <div className="sw-br-field3">
                <label>Quantity</label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <div className="sw-br-field3">
                <label>Delivery Date</label>
                <input type="date" value={rentalDate} onChange={(e) => setRentalDate(e.target.value)} />
              </div>
            </div>

            <div className="sw-br-field3">
              <label>Contact Number</label>
              <input type="text" value={contact} onChange={(e)=>setContact(e.target.value)} />
            </div>

            <div className="sw-br-field3">
              <label>Delivery Address</label>
              <textarea value={address} onChange={(e)=>setAddress(e.target.value)}></textarea>
            </div>

            <h3 className="sw-br-form-title">Additional Services</h3>

            <div className="sw-br-checkbox-group">
              <label><input type="checkbox" /> Unloading Service</label>
              <label><input type="checkbox" /> Quality Certificate</label>
              <label><input type="checkbox" /> Installation Support</label>
              <label><input type="checkbox" /> Storage Option</label>
            </div>

            <div className="sw-br-field3">
              <label>Special Instructions</label>
              <textarea value={instructions} onChange={(e)=>setInstructions(e.target.value)}></textarea>
            </div>

            <div className="sw-br-buttons3">
              <button className="sw-br-btn-cancel" onClick={onClose}>Cancel</button>
              <button className="sw-br-btn-add" onClick={handleaddtocart}>Add to Cart</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportationForm;
