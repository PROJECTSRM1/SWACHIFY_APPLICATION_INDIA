import React, { useState } from "react";
import EquipmentDetails from "./FormMaterialSupply";

import cementimg from "../../../assets/Building/cement.jpg";
import sandimg from "../../../assets/Building/sand.jpg";
import brickimg from "../../../assets/Building/bricks.jpg";
import steelimg from "../../../assets/Building/steel.jpeg";
import pipesimg from "../../../assets/Building/pipes.jpg";
import tilesimg from "../../../assets/Building/tiles.jpg";

const materials = [
  { id: 1, title: "Cement", description: "High quality cement for all construction needs", price: "800", img: cementimg },
  { id: 2, title: "Sand", description: "River sand and M sand for construction", price: "450", img: sandimg },
  { id: 3, title: "Bricks", description: "Red bricks and fly ash bricks", price: "200", img: brickimg },
  { id: 4, title: "Steel & TMT Bars", description: "High grade steel bars and rods", price: "650", img: steelimg },
  { id: 5, title: "Pipes", description: "PVC and plumbing pipes for water supply", price: "250", img: pipesimg },
  { id: 6, title: "Marble & Tiles", description: "Premium marble and flooring tiles", price: "405", img: tilesimg },
];

const MaterialSupply: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="sw-br-wrapper">
      <div className="sw-br-header">
        <h2>Material Supply</h2>
        <p>{materials.length} services available</p>
      </div>

      <div className="sw-br-grid">
        {materials.map((item) => (
          <div className="sw-br-card" key={item.id}>
            <div className="sw-br-card-img">
              <img src={item.img} alt={item.title} />
            </div>

            <div className="sw-br-card-content">
              <h3>{item.title}</h3>
              <p className="sw-br-desc">{item.description}</p>

              <div className="sw-br-bottom-row">
                <p className="sw-br-price">₹{item.price}</p>

                <button
                  className="sw-br-btn"
                  onClick={() => setSelectedId(item.id)}
                >
                  View Details
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {selectedId !== null && (
        <EquipmentDetails 
          id={selectedId} 
          onClose={() => setSelectedId(null)} 
        />
      )}
    </div>
  );
};

export default MaterialSupply;
