import { useState } from "react";
import CommonHeader from "../../landing/Header";
// import FooterSection from "../../landing/FooterSection";
import "./MyFood.css";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeftOutlined,
  SearchOutlined,
  StarFilled,
  ClockCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

/* FEATURED FOOD */

const featured = [
  {
    name: "Pizza",
    img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
  },
  {
    name: "Burger",
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    name: "Sushi",
    img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351",
  },
  {
    name: "Pasta",
    img: "https://images.unsplash.com/photo-1525755662778-989d0524087e",
  },
  {
    name: "Tacos",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  },
  {
    name: "Noodles",
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
  },
  {
    name: "Ramen",
    img: "https://images.unsplash.com/photo-1557872943-16a5ac26437e",
  },
  {
    name: "Chilli Chicken",
    img: "https://images.unsplash.com/photo-1604909052743-94e838986d24",
  },
  {
    name: "Soup",
    img: "https://images.unsplash.com/photo-1547592180-85f173990554",
  },
];

/* RESTAURANTS */

const restaurants = [
  {
    name: "Rose Garden Restaurant",
    cuisine: "Burger · Chicken · Rice · Wings",
    rating: 4.7,
    time: "20 min",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
  },
  {
    name: "The Spice Route",
    cuisine: "Indian · Biryani · Curry · Naan",
    rating: 4.5,
    time: "30 min",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
  },
  {
    name: "Urban Grill House",
    cuisine: "BBQ · Steak · Burgers",
    rating: 4.6,
    time: "25 min",
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
  },
  {
    name: "Ocean Sushi Bar",
    cuisine: "Japanese · Sushi · Ramen",
    rating: 4.8,
    time: "18 min",
    img: "https://images.unsplash.com/photo-1553621042-f6e147245754",
  },
];

const MyFood = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(0);

  return (
    <div className="food-root">
      <CommonHeader selectedKey="myfood" />

      {/* BACK BUTTON */}
      <div className="food-back-btn" onClick={() => navigate("/")}>
        <ArrowLeftOutlined /> Back
      </div>

      {/* HERO */}
      <section className="food-hero">
        <h1>
          Discover <span>Delicious Food</span>
        </h1>

        <div className="search-container">
          <div className="search-bar">
            <SearchOutlined className="search-icon" />
            <input type="text" placeholder="Search dishes, restaurants..." />
          </div>

          <div className="cart-btn">
            <div className="cart-icon-wrapper">
              <ShoppingCartOutlined className="cart-icon" />
              <span className="cart-count">{cart}</span>
            </div>
            <span className="cart-label">Cart</span>
          </div>
        </div>
      </section>

      {/* FEATURED DISHES */}

      <section className="food-section">
        <h2>All Categories</h2>

        <div className="featured-grid">
          {featured.map((item, i) => (
            <div key={i} className="featured-card">
              {/* <img src={item.img} /> */}
              <img src={item.img} alt={item.name} />
              <div className="featured-overlay">
                <h3>{item.name}</h3>
                <button onClick={() => setCart(cart + 1)} className="add-btn">
                  <ShoppingCartOutlined /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RESTAURANTS */}

      <section className="food-section">
        <h2>Open Restaurants</h2>

        <div className="restaurant-grid">
          {restaurants.map((r, i) => (
            <div
              key={i}
              className="restaurant-card"
              onClick={() => navigate(`/restaurant/${i}`)}
            >
              <img src={r.img} alt={r.name} />

              <div className="restaurant-info">
                <h3>{r.name}</h3>
                <p>{r.cuisine}</p>

                <div className="restaurant-meta">
                  <span>
                    <StarFilled /> {r.rating}
                  </span>

                  <span>
                    <ClockCircleOutlined /> {r.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <FooterSection selectedKey="myfood" /> */}
    </div>
  );
};

export default MyFood;
