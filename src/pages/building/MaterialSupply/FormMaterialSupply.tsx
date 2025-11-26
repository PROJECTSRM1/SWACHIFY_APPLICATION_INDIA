import React, { useState } from "react";
import "../MaterialSupply/ModMaterialSupply.css";
import { useCart } from "../../../context/CartContext";


import cementimg from "../../../assets/Building/cement.jpg";
import sandimg from "../../../assets/Building/sand.jpg";
import brickimg from "../../../assets/Building/bricks.jpg";
import steelimg from "../../../assets/Building/steel.jpeg";
import pipesimg from "../../../assets/Building/pipes.jpg";
import tilesimg from "../../../assets/Building/tiles.jpg";

const materials = [
  { id: 1, title: "Cement", price: "800", img: cementimg, description: "Premium quality cement for construction" },
  { id: 2, title: "Sand", price: "450", img: sandimg, description: "River sand and M sand for construction" },
  { id: 3, title: "Bricks", price: "200", img: brickimg, description: "Red bricks and fly ash bricks" },
  { id: 4, title: "Steel & TMT Bars", price: "650", img: steelimg, description: "High grade steel bars and rods" },
  { id: 5, title: "Pipes", price: "250", img: pipesimg, description: "PVC and plumbing pipes for water supply" },
  { id: 6, title: "Marble & Tiles", price: "450", img: tilesimg, description: "Premium marble and flooring tiles" },
];

interface FormProps {
  id: number;
  onClose: () => void;
}

const EquipmentDetails: React.FC<FormProps> = ({ id, onClose }) => {
  const material = materials.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!material) return null;

  const totalPrice = Number(material.price) * quantity;
  const { addToCart } = useCart();
  const handleAddToCart = () => {
  const customerName = (document.querySelector(".form-side input[placeholder='Site manager name']") as HTMLInputElement)?.value;
  const deliveryType = (document.querySelector(".form-side select") as HTMLSelectElement)?.value;
  const deliveryDate = (document.querySelector(".form-side input[type='date']") as HTMLInputElement)?.value;
  const contact = (document.querySelector(".form-side input[placeholder='Contact number']") as HTMLInputElement)?.value;
  const address = (document.querySelector(".form-side textarea[placeholder='Construction site address']") as HTMLTextAreaElement)?.value;
  const instructions = (document.querySelector(".form-side textarea[placeholder='Any specific requirements...']") as HTMLTextAreaElement)?.value;

  addToCart({
    id: material.id,
    title: material.title,
    image: material.img,
    quantity,
    price: material.price,
    totalPrice,
    customerName,
    deliveryType,
    deliveryDate,
    contact,
    address,
    instructions
  });

  alert("Item added to cart!");
  onClose();
};


  return (
    <div className="details-modal">
      <div className="details-box">

        <div className="details-header">
          <h2>{material.title}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
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

              <div className="form-item full-width">
                <label>Contact Number</label>
                <input type="text" placeholder="Contact number" />
              </div>

              <div className="form-item full-width">
                <label>Delivery Address</label>
                <textarea placeholder="Construction site address" />
              </div>

              <h3 className="section-title">Additional Services</h3>

              <div className="checkbox-row">
                <label><input type="checkbox"/> Unloading Service</label>
                <label><input type="checkbox" /> Quality Certificate</label>
                <label><input type="checkbox" /> Installation Support</label>
                <label><input type="checkbox" /> Storage Option</label>
              </div>

              <div className="form-item full-width">
                <label>Special Instructions</label>
                <textarea placeholder="Any specific requirements..." />
              </div>

              <div className="button-row">
                <button className="cancel-btn" onClick={onClose}>Cancel</button>
                <button className="add-btn" onClick={handleAddToCart}>Add to Cart</button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EquipmentDetails;
