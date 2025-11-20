import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Transpotation.css";

import materialpickupimg from "../../../assets/Building/material pickup.jpg";
import deliveryservicesimg from "../../../assets/Building/Delivery services.jpg";

const Transportation = [
  { id: "1", title: "Material Supply", price: "800", img: materialpickupimg, description: "Premium quality cement for construction" },
  { id: "2", title: "Delivery Services", price: "450", img: deliveryservicesimg, description: "River sand and M sand for construction" },
];

const TransportationForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const material = Transportation.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!material) return <p>Material not found</p>;

  const unitPrice = Number(material.price);
  const totalPrice = unitPrice * quantity;

  return (
    <div className="tf-wrapper">
      <div className="tf-container">

        <div className="tf-header">
          <h2>{material.title}</h2>
          <button className="tf-close" onClick={() => navigate(-1)}>✕</button>
        </div>

        <div className="tf-main">

          <div className="tf-left">
            <div className="tf-image">
              <img src={material.img} alt={material.title} />
            </div>

            <p className="tf-description">{material.description}</p>

            <div className="tf-price-box">
              <p className="tf-price-label">Service Price</p>
              <p className="tf-price-value">₹{totalPrice}</p>
            </div>

            <h3 className="tf-included-title">What's Included</h3>
            <ul className="tf-included-list">
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

          <div className="tf-form-box">
            <h3 className="tf-form-title">Service Details</h3>

            <div className="tf-grid">
              <div className="tf-field">
                <label>Customer Name</label>
                <input type="text" placeholder="Site manager name" />
              </div>

              <div className="tf-field">
                <label>Delivery Type</label>
                <select>
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
                <input type="date" />
              </div>
            </div>

            <div className="tf-field">
              <label>Contact Number</label>
              <input type="text" placeholder="Contact number" />
            </div>

            <div className="tf-field">
              <label>Delivery Address</label>
              <textarea placeholder="Construction site address"></textarea>
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
              <textarea placeholder="Any specific requirements, access instructions, etc..."></textarea>
            </div>

            <div className="tf-buttons">
              <button className="tf-btn cancel" onClick={() => navigate(-1)}>Cancel</button>
              <button className="tf-btn add">Add to Cart</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TransportationForm;
