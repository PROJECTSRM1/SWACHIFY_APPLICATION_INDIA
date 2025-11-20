import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import excavatorImg from "../../../assets/Building/excavator.jpg";
import loaderImg from "../../../assets/Building/loader.jpg";
import craneImg from "../../../assets/Building/crane.jpg";
import mixerImg from "../../../assets/Building/concretemixer.jpg";

const machinery = [
  { id: "1", title: "Excavator Rental", price: "150", img: excavatorImg, description: "Heavy-duty excavators suitable for construction and earthwork tasks." },
  { id: "2", title: "Loader Rental", price: "200", img: loaderImg, description: "Efficient loaders for material handling and lifting tasks." },
  { id: "3", title: "Crane Rental", price: "300", img: craneImg, description: "High-capacity cranes for lifting heavy materials and machinery." },
  { id: "4", title: "Concrete Mixer Rental", price: "120", img: mixerImg, description: "Portable and truck-mounted concrete mixers for efficient construction." },
];

const MachineryDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const machine = machinery.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!machine) return <p>Machine not found</p>;

  const unitPrice = Number(machine.price.replace("₹", ""));
  const totalPrice = unitPrice * quantity;

  return (
    <div className="mach-details-modal">
      <div className="mach-details-box">

        {/* HEADER */}
        <div className="mach-details-header">
          <h2>{machine.title}</h2>
          <button className="mach-close-btn" onClick={() => navigate(-1)}>✕</button>
        </div>

        <div className="mach-top-section">

          {/* LEFT SIDE */}
          <div className="mach-left-side">
            <div className="mach-image-box">
              <img src={machine.img} alt={machine.title} />
            </div>

            <p className="mach-description">{machine.description}</p>

            <div className="mach-service-price-box">
              <p className="mach-sp-title">Rental Price</p>
              <p className="mach-sp-value">₹{totalPrice}</p>
            </div>

            <h3 className="mach-included-title">What's Included</h3>
            <ul className="mach-included-list">
              <li>✓ On-time delivery</li>
              <li>✓ Equipment safety check</li>
              <li>✓ Breakdown support</li>
              <li>✓ Operator support (optional)</li>
              <li>✓ Fuel support (if applicable)</li>
              <li>✓ Invoice & documentation</li>
            </ul>
          </div>

          {/* RIGHT FORM */}
          <div className="mach-form-side">
            <div className="mach-form-section">

              <h3 className="mach-section-title">Rental Details</h3>

              {/* CUSTOMER NAME + RENTAL TYPE */}
              <div className="mach-row">
                <div className="mach-form-item">
                  <label>Customer Name</label>
                  <input type="text" placeholder="Enter customer name" />
                </div>

                <div className="mach-form-item">
                  <label>Rental Type</label>
                  <select>
                    <option>Select</option>
                    <option>With Operator</option>
                    <option>Without Operator</option>
                  </select>
                </div>
              </div>

              {/* QUANTITY + RENTAL DATE */}
              <div className="mach-row">
                <div className="mach-form-item">
                  <label>Quantity</label>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>

                <div className="mach-form-item">
                  <label>Rental Date</label>
                  <input type="date" />
                </div>
              </div>

              {/* CONTACT */}
              <div className="mach-row">
                <div className="mach-form-item">
                  <label>Contact Number</label>
                  <input type="text" placeholder="Enter contact number" />
                </div>
              </div>

              {/* ADDRESS */}
              <div className="mach-row">
                <div className="mach-form-item full-width">
                  <label>Site Address</label>
                  <textarea placeholder="Enter site address" />
                </div>
              </div>

              <h3 className="mach-section-title">Additional Services</h3>

              <div className="mach-checkbox-row">
                <label><input type="checkbox" /> Fuel Supply</label>
                <label><input type="checkbox" /> Operator Required</label>
                <label><input type="checkbox" /> Extra Attachments</label>
                <label><input type="checkbox" /> Maintenance Support</label>
              </div>

              <div className="mach-row">
                <div className="mach-form-item full-width">
                  <label>Special Instructions</label>
                  <textarea placeholder="Any specific requirements..." />
                </div>
              </div>

              <div className="mach-button-row">
                <button className="mach-cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
                <button className="mach-add-btn">Add to Cart</button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MachineryDetails;
