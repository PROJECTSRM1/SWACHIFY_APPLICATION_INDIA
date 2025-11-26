import React, { useState } from "react";
import { useCart } from "../../../context/CartContext";

import excavatorImg from "../../../assets/Building/excavator.jpg";
import loaderImg from "../../../assets/Building/loader.jpg";
import craneImg from "../../../assets/Building/crane.jpg";
import mixerImg from "../../../assets/Building/concretemixer.jpg";
import { message } from "antd";

const machinery = [
  { id: 1, title: "Excavator Rental", price: "150", img: excavatorImg, description: "Heavy-duty excavators suitable for construction and earthwork tasks." },
  { id: 2, title: "Loader Rental", price: "200", img: loaderImg, description: "Efficient loaders for material handling and lifting tasks." },
  { id: 3, title: "Crane Rental", price: "300", img: craneImg, description: "High-capacity cranes for lifting heavy materials and machinery." },
  { id: 4, title: "Concrete Mixer Rental", price: "120", img: mixerImg, description: "Portable and truck-mounted concrete mixers for efficient construction." },
];

interface FormProps {
  id: number;
  onClose: () => void;
}

const MachineryDetails: React.FC<FormProps> = ({ id, onClose }) => {

  const machine = machinery.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
const [customerName, setCustomerName] = useState("");
const [rentalType, setRentalType] = useState("");
const [rentalDate, setRentalDate] = useState("");
const [contact, setContact] = useState("");
const [address, setAddress] = useState("");
const [instructions, setInstructions] = useState("");




  if (!machine) return null;
  const handleaddtocart = () =>{
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
    instructions
  });
  message.success("item added to cart");

  onClose();  
};

  const totalPrice = Number(machine.price) * quantity;

  return (
    <div className="mach-details-modal">
      <div className="mach-details-box">

        {/* HEADER */}
        <div className="mach-details-header">
          <h2>{machine.title}</h2>
          <button className="mach-close-btn" onClick={onClose}>✕</button>
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
              <li>On-time delivery</li>
              <li>Equipment safety check</li>
              <li>Breakdown support</li>
              <li>Operator support (optional)</li>
              <li>Fuel support (if applicable)</li>
              <li>Invoice & documentation</li>
            </ul>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="mach-form-side">
            <div className="mach-form-section">

              <h3 className="mach-section-title">Rental Details</h3>

              <div className="mach-row">
                <div className="mach-form-item">
                  <label>Customer Name</label>
                  <input type="text" placeholder="Enter customer name" value={customerName} onChange={(e)=>setCustomerName(e.target.value)} />
                </div>

                <div className="mach-form-item">
                  <label>Rental Type</label>
                  <select value={rentalType} onChange={(e)=>setRentalType(e.target.value)}>
                    <option>Select</option>
                    <option>With Operator</option>
                    <option>Without Operator</option>
                  </select>
                </div>
              </div>

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
                  <input type="date" value={rentalDate} onChange={(e)=>setRentalDate(e.target.value)} />
                </div>
              </div>

              <div className="mach-form-item full-width">
                <label>Contact Number</label>
                <input type="text" placeholder="Enter contact number" value={contact} onChange={(e)=>setContact(e.target.value)} />
              </div>

              <div className="mach-form-item full-width">
                <label>Site Address</label>
                <textarea placeholder="Enter site address" value={address} onChange={(e)=>setAddress(e.target.value)}></textarea>
              </div>

              <h3 className="mach-section-title">Additional Services</h3>

              <div className="mach-checkbox-row">
                <label><input type="checkbox" /> Fuel Supply</label>
                <label><input type="checkbox" /> Operator Required</label>
                <label><input type="checkbox" /> Extra Attachments</label>
                <label><input type="checkbox" /> Maintenance Support</label>
              </div>

              <div className="mach-form-item full-width">
                <label>Special Instructions</label>
                <textarea placeholder="Any specific requirements..." value={instructions} onChange={(e)=>setInstructions(e.target.value)}/>
              </div>

              <div className="mach-button-row">
                <button className="mach-cancel-btn" onClick={onClose}>Cancel</button>
                <button className="mach-add-btn" onClick={handleaddtocart}>Add to Cart</button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MachineryDetails;
