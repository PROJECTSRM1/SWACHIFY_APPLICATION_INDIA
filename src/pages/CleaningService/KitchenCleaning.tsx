import React from "react";
import CleaningHeader from "./CleaningHeader";
import "./KitchenCleaning.css";

import kitchenImg from "../../assets/CleaningServices/Kitchen2.jpg";

const kitchenServices = [
  { title: "Basic Kitchen Cleaning", price: 499, duration: "45 mins" },
  { title: "Deep Kitchen Cleaning", price: 899, duration: "1 hr 30 mins" },
  { title: "Chimney Cleaning", price: 699, duration: "60 mins" },
  { title: "Fridge Cleaning", price: 399, duration: "30 mins" },
];

const KitchenCleaning: React.FC = () => {
  return (
    <>
      {/* ✅ CONSTANT HEADER */}
      <CleaningHeader />

      <section className="kc-page">
        {/* LEFT */}
        <div className="kc-left">
          <h1>Kitchen Cleaning</h1>
          <p className="kc-rating">⭐ 4.8 (2.3M bookings)</p>

          <h3 className="kc-section-title">Select a service</h3>

          <div className="kc-services">
            {kitchenServices.map((s, i) => (
              <div key={i} className="kc-card">
                <div>
                  <h4>{s.title}</h4>
                  <p className="kc-muted">{s.duration}</p>
                  <p className="kc-price">₹{s.price}</p>
                </div>

                <button className="kc-add-btn">Add</button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="kc-right">
          <img src={kitchenImg} alt="Kitchen cleaning" />

          <div className="kc-cart">
            <h4>No items in your cart</h4>

            <div className="kc-promise">
              <h5>Swachify Promise</h5>
              <ul>
                <li>✔ Verified Professionals</li>
                <li>✔ Safe & Hygienic</li>
                <li>✔ Transparent Pricing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default KitchenCleaning;
