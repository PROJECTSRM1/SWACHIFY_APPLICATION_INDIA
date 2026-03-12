import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";

import "./FoodDetails.css";

const FoodDetails = () => {


  const navigate = useNavigate();
  const [added, setAdded] = useState(false);


  const handleAddToCart = () => {
  setAdded(true);

  setTimeout(() => {
    navigate("/MyFood");
  }, 1000);
};


  const location = useLocation();
const { item, restaurant } = location.state || {};



if (!item) {
  return <div>No item selected</div>;
}

  const [size, setSize] = useState("14");
  const [qty, setQty] = useState(1);

  const sizes = ["10", "14", "16"];

  const sizePriceMultiplier: Record<string, number> = {
    "10": 1,
    "14": 1.3,
    "16": 1.6,
  };

  const finalPrice = Math.round(item.price * sizePriceMultiplier[size]) * qty;

  const ingredients = ["Salt", "Protein", "Herbs", "Spices", "Greens"];

  const restaurantName = restaurant?.name || item?.restaurant;

  

  return (
    <div className="details-page">
      <div className="details-header">
        <ArrowLeftOutlined onClick={() => navigate(-1)} />
        <h2>Details</h2>
      </div>
      <div className="details-image-wrapper">
        <img src={item.img} alt={item.name} className="details-image" />
      </div>

      <div className="details-content">
        <div className="restaurant-badge">{restaurantName}</div>

        <h1>{item.name}</h1>

        <p>
          A delicious dish prepared with the finest ingredients. Topped with
          fresh herbs and house-made sauce.
        </p>

       <div className="meta">
  ⭐⭐ {restaurant?.rating ?? item?.rating ?? 4.5} | 🚚 Free | ⏱  {restaurant?.time ?? "25 min"}
</div>

        {/* SIZE */}

        <h3>SIZE</h3>

        <div className="size-options">
          {sizes.map((s) => (
            <button
              key={s}
              className={size === s ? "size active" : "size"}
              onClick={() => setSize(s)}
            >
              {s}"
              {/* {s}" (${Math.round(item.price * sizePriceMultiplier[s])}) */}
            </button>
          ))}
        </div>

        {/* INGREDIENTS */}

        <h3>INGREDIENTS</h3>

        <div className="ingredients">
          {ingredients.map((i) => (
            <div key={i} className="ingredient">
              {i}
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}

      <div className="details-footer">
        <span className="price">${finalPrice}</span>

        <div className="qty">
          <button
            disabled={qty <= 1}
            onClick={() => setQty((prev) => Math.max(1, prev - 1))}
          >
            -
          </button>

          <span>{qty}</span>

          <button onClick={() => setQty((prev) => prev + 1)}>+</button>
        </div>

        <button
  className={`details-cart-btn ${added ? "added" : ""}`}
  onClick={handleAddToCart}
>
  {added ? "ADDED TO CART" : "ADD TO CART"}
</button>


      </div>
    </div>
  );
};

export default FoodDetails;
