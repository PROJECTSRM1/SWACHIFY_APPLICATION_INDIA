import React from "react";
import CleaningHeader from "./CleaningHeader";
import "./HomeCleaning.css";
import { useNavigate } from "react-router-dom";

const homeCleaningServices = [
  { title: "Kitchen Cleaning", icon: "🍳" },
  { title: "Bathroom Cleaning", icon: "🚿" },
  { title: "Sofa Cleaning", icon: "🛋️" },
  { title: "Bedroom Cleaning", icon: "🛏️" },
  { title: "Window Cleaning", icon: "🪟" },
];

const HomeCleaning: React.FC = () => {
    const navigate = useNavigate();

  return (
    <>
      {/* ✅ CONSTANT HEADER */}
      <CleaningHeader />

      <section className="hc-container">
        <div className="hc-left">
          <h1>Home Cleaning</h1>
          <p>Select a service</p>

          <div className="hc-services">
            {homeCleaningServices.map((s, i) => (
              <div
  key={i}
  className="hc-card"
  onClick={() => {
    if (s.title === "Kitchen Cleaning") {
      navigate("/cleaning/home/kitchen");
    }
  }}
>
  <span className="hc-icon">{s.icon}</span>
  <p>{s.title}</p>
</div>

            ))}
          </div>
        </div>

        {/* RIGHT IMAGE / VIDEO PLACEHOLDER */}
        <div className="hc-right">
          <div className="hc-media">
            {/* Later you can replace with video / image */}
            <p>Service preview</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeCleaning;
