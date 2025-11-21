import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../MaterialSupply/ModMaterialSupply.css";

import cementimg from "../../../assets/Building/cement.jpg";
import sandimg from "../../../assets/Building/sand.jpg";
import brickimg from "../../../assets/Building/bricks.jpg";
import steelimg from "../../../assets/Building/steel.jpeg";
import pipesimg from "../../../assets/Building/pipes.jpg";
import tilesimg from "../../../assets/Building/tiles.jpg";

const materials = [
  { id: "1", title: "Cement", price: "800", img: cementimg, description: "Premium quality cement for construction" },
  { id: "2", title: "Sand", price: "450", img: sandimg, description: "River sand and M sand for construction" },
  { id: "3", title: "Bricks", price: "200", img: brickimg, description: "Red bricks and fly ash bricks" },
  { id: "4", title: "Steel & TMT Bars", price: "650", img: steelimg, description: "High grade steel bars and rods" },
  { id: "5", title: "Pipes", price: "250", img: pipesimg, description: "PVC and plumbing pipes for water supply" },
  { id: "6", title: "Marble & Tiles", price: "450", img: tilesimg, description: "Premium marble and flooring tiles" },
];

const EquipmentDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const material = materials.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!material) return <p>Material not found</p>;

  
  const unitPrice = Number(material.price.replace("₹", ""));
  const totalPrice = unitPrice * quantity;

  return (
    <div className="details-modal">
      <div className="details-box">

        <div className="details-header">
          <h2>{material.title}</h2>
          <button className="close-btn" onClick={() => navigate(-1)}>✕</button>
        </div>

        <div className="top-section">

          <div className="left-side">
            <div className="image-box">
              <img src={material.img} alt={material.title} />
            </div>

            <p className="material-description">{material.description}</p>

            <div className="service-price-box">
              <p className="sp-title">Service Price</p>
              <p className="sp-value">₹{totalPrice}</p>
            </div>

            <h3 className="included-title">What's Included</h3>
            <ul className="mach-included-list">
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

          <div className="form-side">
            <div className="form-section">

              <h3 className="section-title">Service Details</h3>

              <div className="row">
                <div className="form-item">
                  <label>Customer Name</label>
                  <input type="text" placeholder="Site manager name" />
                </div>

                <div className="form-item">
                  <label>Delivery Type</label>
                  <select>
                    <option>Select</option>
                    <option>Door Delivery</option>
                    <option>Pick-up</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="form-item">
                  <label>Quantity</label>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>

                <div className="form-item">
                  <label>Delivery Date</label>
                  <input type="date" />
                </div>
              </div>

              <div className="row">
                <div className="form-item">
                  <label>Contact Number</label>
                  <input type="text" placeholder="Contact number" />
                </div>
              </div>

              <div className="row">
                <div className="form-item full-width">
                  <label>Delivery Address</label>
                  <textarea placeholder="Construction site address" />
                </div>
              </div>

              <h3 className="section-title">Additional Services</h3>

              <div className="checkbox-row">
                <label className="checkbox-item"><input type="checkbox" /> Unloading Service</label>
                <label className="checkbox-item"><input type="checkbox" /> Quality Certificate</label>
                <label className="checkbox-item"><input type="checkbox" /> Installation Support</label>
                <label className="checkbox-item"><input type="checkbox" /> Storage Option</label>
              </div>

              <div className="row">
                <div className="form-item full-width">
                  <label>Special Instructions</label>
                  <textarea placeholder="Any specific requirements, access instructions, etc..." />
                </div>
              </div>

              <div className="button-row">
                <button className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
                <button className="add-btn">Add to Cart</button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;
