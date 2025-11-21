import React from "react";
import '../MachineryRental/MachineryRental.css';
import excavatorImg from "../../../assets/Building/excavator.jpg";
import loaderImg from "../../../assets/Building/loader.jpg";
import craneImg from "../../../assets/Building/crane.jpg";
import mixerImg from "../../../assets/Building/concretemixer.jpg";
import { useNavigate } from "react-router-dom";

const machinery = [
  {
    id: 1,
    title: "Excavators Rental",
    description: "Heavy-duty excavators suitable for construction and earthwork tasks.",
    price: "150",
    img: excavatorImg
  },
  {
    id: 2,
    title: "Loader Rental",
    description: "Efficient loaders for material handling, lifting and site work.",
    price: "200",
    img: loaderImg
  },
  {
    id: 3,
    title: "Crane Rental",
    description: "High-capacity cranes for lifting heavy materials and machinery.",
    price: "300",
    img: craneImg
  },
  {
    id: 4,
    title: "Concrete Mixer Rental",
    description: "Portable and truck-mounted concrete mixers for efficient construction.",
    price: "120",
    img: mixerImg
  },
];

const MachineryRental: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="machinery-wrapper">

      {/* Page Header */}
      <div className="machinery-header">
        <h2>Construction Equipment Rental</h2>
        <p>{machinery.length} services available</p>
      </div>

      {/* Cards Grid */}
      <div className="machinery-grid">
        {machinery.map((item) => (
          <div className="machinery-card" key={item.id}>
            
            <div className="card-img">
              <img src={item.img} alt={item.title} />
            </div>

            <h3>{item.title}</h3>
            <p className="machinery-desc">{item.description}</p>

            <div className="machinery-bottom">
              <p className="machinery-price">{item.price}</p>
              <button className="machinery-btn" onClick={() => navigate(`/app/machinery/${item.id}`)}>
                View Details
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default MachineryRental;
