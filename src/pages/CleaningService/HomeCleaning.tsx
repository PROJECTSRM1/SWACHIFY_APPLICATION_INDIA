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
                onClick={() =>
                  navigate(
                    `/cleaning/home/${s.title
                      .toLowerCase()
                      .replace(" cleaning", "")}`
                  )
                }
              >
                <span className="hc-icon">{s.icon}</span>
                <p>{s.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hc-right">
          <div className="hc-media">
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="hc-video"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeCleaning;
