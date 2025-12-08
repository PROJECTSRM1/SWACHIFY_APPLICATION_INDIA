import React, { useState, useRef } from "react";
import { useCart } from "../../../context/CartContext";

import cementimg from "../../../assets/Building/cement.jpg";
import sandimg from "../../../assets/Building/sand.jpg";
import brickimg from "../../../assets/Building/bricks.jpg";
import steelimg from "../../../assets/Building/steel.jpeg";
import pipesimg from "../../../assets/Building/pipes.jpg";
import tilesimg from "../../../assets/Building/tiles.jpg";
import message from "antd/es/message";

const materials = [
  { id: 1, title: "Cement", price: "800", img: cementimg },
  { id: 2, title: "Sand", price: "700", img: sandimg },
  { id: 3, title: "Bricks", price: "200", img: brickimg },
  { id: 4, title: "Steel & TMT Bars", price: "650", img: steelimg },
  { id: 5, title: "Pipes", price: "250", img: pipesimg },
  { id: 6, title: "Marble & Tiles", price: "450", img: tilesimg },
];

interface FormProps {
  id: number;
  onClose: () => void;
}

const EquipmentDetails: React.FC<FormProps> = ({ id, onClose }) => {
  const material = materials.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("kg"); 

  const [deliveryType, setDeliveryType] = useState("");
  const [unloading, setUnloading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  if (!material) return null;

  const finalQuantity =
    unit === "ton" ? quantity * 1000 : quantity; 

  const basePrice = Number(material.price) * finalQuantity;

  const deliveryCharge = deliveryType === "Door Delivery" ? 150 : 0;
  const unloadingCharge = unloading ? 200 : 0;

  const totalPrice = basePrice + deliveryCharge + unloadingCharge;

  const { addToCart } = useCart();

  const handleReset = () => {
    formRef.current?.reset();
    setQuantity(0);
    setUnit("kg");
    setDeliveryType("");
    setUnloading(false);
  };

  const handleAddToCart = () => {
    const customerName = (formRef.current?.elements.namedItem("customerName") as HTMLInputElement)?.value;
    const deliveryDate = (formRef.current?.elements.namedItem("deliveryDate") as HTMLInputElement)?.value;
    const contact = (formRef.current?.elements.namedItem("contact") as HTMLInputElement)?.value;
    const address = (formRef.current?.elements.namedItem("address") as HTMLTextAreaElement)?.value;
    const instructions = (formRef.current?.elements.namedItem("instructions") as HTMLTextAreaElement)?.value;

    addToCart({
      id: material.id,
      title: material.title,
      image: material.img,
      quantity: finalQuantity, 
      price: material.price,
      basePrice,
      deliveryCharge,
      unloadingCharge,
      totalPrice,
      unit, 
      customerName,
      deliveryType,
      deliveryDate,
      contact,
      address,
      instructions,
    });

    message.success("Item added to cart");
    onClose();
  };

  return (
    <div className="sw-br-modal">
      <div className="sw-br-modal-box">
        
        <div className="sw-br-modal-header">
          <h2>{material.title}</h2>
          <button className="sw-br-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="sw-br-top">

          <div className="sw-br-left">
            <div className="sw-br-image-box">
              <img src={material.img} alt={material.title} />
            </div>

            <div className="sw-br-price-box">
              <p className="sw-br-price-title">Total Price</p>
              <p className="sw-br-price-value">₹{totalPrice}</p>
            </div>

            <h3 className="sw-br-inc-title">What's Included</h3>
            <ul className="sw-br-inc-list">
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

          
          <form className="sw-br-form" ref={formRef}>
            <div className="sw-br-form-box">

              <h3 className="sw-br-form-title">Service Details</h3>

              <div className="sw-br-row">
                <div className="sw-br-field">
                  <label>Customer Name</label>
                  <input type="text" name="customerName" placeholder="Site manager name" />
                </div>

                <div className="sw-br-field">
                  <label>Delivery Type</label>
                  <select
                    name="deliveryType"
                    value={deliveryType}
                    onChange={(e) => setDeliveryType(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Door Delivery">Door Delivery (+₹150)</option>
                    <option value="Pick-up">Pick-up</option>
                  </select>
                </div>
              </div>

              <div className="sw-br-row">
                <div className="sw-br-field">
                  <label>Quantity</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="number"
                      min={0}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />

                    <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                      <option value="kg">Kg</option>
                      <option value="ton">Ton</option>
                    </select>
                  </div>
                </div>

                <div className="sw-br-field">
                  <label>Delivery Date</label>
                  <input type="date" name="deliveryDate"
                  min={new Date().toISOString().split("T")[0]}/>
                </div>
              </div>
              <div className="sw-br-field sw-br-full">
                <label>Contact Number</label>
                <input type="text" name="contact" placeholder="Contact number" />
              </div>

              
              <div className="sw-br-field sw-br-full">
                <label>Delivery Address</label>
                <textarea name="address" placeholder="Construction site address" />
              </div>

              <h3 className="sw-br-form-title">Additional Services</h3>

              <div className="sw-br-check-grid">
                <label>
                  <input
                    type="checkbox"
                    checked={unloading}
                    onChange={(e) => setUnloading(e.target.checked)}
                  />
                  Unloading Service (+₹200)
                </label>
              </div>

              <div className="sw-br-field sw-br-full">
                <label>Special Instructions</label>
                <textarea name="instructions" placeholder="Any specific requirements..." />
              </div>

            </div>

            <div className="sw-br-buttons">
              <button type="button" className="sw-br-cancel" onClick={handleReset}>
                Cancel
              </button>
              <button type="button" className="sw-br-add" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};

export default EquipmentDetails;
