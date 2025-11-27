import React, { useState } from "react";
import "./Transpotation.css";
import { useCart } from "../../../context/CartContext";

import materialpickupimg from "../../../assets/Building/material pickup.jpg";
import deliveryservicesimg from "../../../assets/Building/Delivery services.jpg";

const Transportation = [
  { id: 1, title: "Material Supply", price: "800", img: materialpickupimg, },
  { id: 2, title: "Delivery Services", price: "450", img: deliveryservicesimg, },
];

interface FormProps {
  id: number;
  onClose: () => void;
}

const TransportationForm: React.FC<FormProps> = ({ id, onClose }) => {
  const material = Transportation.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(1);
  const {addToCart}=useCart();
  const [customerName, setCustomerName] = useState("");
  const [rentalType, setRentalType] = useState("");
  const [rentalDate, setRentalDate] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");

  if (!material) return <p>Material not found</p>;
  const handleaddtocart = () =>{
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
  alert("Item added to cart!");
  onClose();  
};

  const unitPrice = Number(material.price);
  const totalPrice = unitPrice * quantity;

  return (
    <div className="tf-wrapper">
      <div className="tf-container">

        <div className="tf-header">
          <h2>{material.title}</h2>
          <button className="tf-close" onClick={onClose}>✕</button>
        </div>

        <div className="tf-main">

          <div className="tf-left">
            <div className="tf-image">
              <img src={material.img} alt={material.title} />
            </div>
            <div className="tf-price-box">
              <p className="tf-price-label">Service Price</p>
              <p className="tf-price-value">₹{totalPrice}</p>
            </div>

            <h3 className="tf-included-title">What's Included</h3>
            <ul className="tf-included-list">
              <li>✓ Quality certified materials</li>
              <li>✓ Timely delivery</li>
              <li>✓ Doorstep delivery</li>
              <li>✓ Quality assurance</li>
              <li>✓ Return/exchange policy</li>
              <li>✓ Technical support</li>
              <li>✓ Bulk order discounts</li>
              <li>✓ Invoice and documentation</li>
            </ul>
          </div>

          <div className="tf-form-box">
            <h3 className="tf-form-title">Service Details</h3>

            <div className="tf-grid">
              <div className="tf-field">
                <label>Customer Name</label>
                <input type="text" placeholder="Site manager name" value={customerName} onChange={(e)=>setCustomerName(e.target.value)} />
              </div>

              <div className="tf-field">
                <label>Delivery Type</label>
                <select value={rentalType} onChange={(e)=>setRentalType(e.target.value)}>
                  <option>Select</option>
                  <option>Door Delivery</option>
                  <option>Pick-up</option>
                </select>
              </div>
            </div>

            <div className="tf-grid">
              <div className="tf-field">
                <label>Quantity</label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <div className="tf-field">
                <label>Delivery Date</label>
                <input type="date" value={rentalDate} onChange={(e)=>setRentalDate(e.target.value)} />
              </div>
            </div>

            <div className="tf-field">
              <label>Contact Number</label>
              <input type="text" placeholder="Contact number" value={contact} onChange={(e)=>setContact(e.target.value)} />
            </div>

            <div className="tf-field">
              <label>Delivery Address</label>
              <textarea placeholder="Construction site address" value={address} onChange={(e)=>setAddress(e.target.value)}></textarea>
            </div>

            <h3 className="tf-form-title">Additional Services</h3>

            <div className="tf-checkbox-group">
              <label><input type="checkbox" /> Unloading Service</label>
              <label><input type="checkbox" /> Quality Certificate</label>
              <label><input type="checkbox" /> Installation Support</label>
              <label><input type="checkbox" /> Storage Option</label>
            </div>

            <div className="tf-field">
              <label>Special Instructions</label>
              <textarea placeholder="Any specific requirements, access instructions, etc..." value={instructions} onChange={(e)=>setInstructions(e.target.value)}></textarea>
            </div>

            <div className="tf-buttons">
              <button className="tf-btn cancel" onClick={onClose}>Cancel</button>
              <button className="tf-btn add" onClick={handleaddtocart}>Add to Cart</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TransportationForm;
