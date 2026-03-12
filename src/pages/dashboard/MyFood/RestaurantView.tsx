import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeftOutlined,
  StarFilled,
  ClockCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import "./RestaurantView.css";

type MenuItem = {
  name: string;
  price: number;
  img: string;
};

type RestaurantMenu = {
  name: string;
  rating: number;
  time: string;
  img: string;
  categories: Record<string, MenuItem[]>;
};

const restaurants: RestaurantMenu[] = [
  {
    name: "Rose Garden Restaurant",
    rating: 4.7,
    time: "20 min",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    categories: {
      Pizza: [
        {
          name: "Margherita Pizza",
          price: 18,
          img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800",
        },
        {
          name: "Pepperoni Pizza",
          price: 20,
          img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800",
        },
      ],
      Burger: [
        {
          name: "Burger Ferguson",
          price: 40,
          img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
        },
        {
          name: "Rockin' Burgers",
          price: 40,
          img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
        },
      ],

      Wings: [
        {
          name: "Honey Garlic Wings",
          price: 36,
          img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800",
        },
        {
          name: "Grilled Chicken",
          price: 42,
          img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
        },
      ],

      Chicken: [
        {
          name: "Crispy Chicken",
          price: 38,
          img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800",
        },
        {
          name: "Buffalo Wings",
          price: 32,
          img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800",
        },
      ],

      Rice: [
        {
          name: "Veg Fried Rice",
          price: 22,
          img: "https://images.unsplash.com/photo-1604908177453-7462950a6a3b?w=800",
        },
        {
          name: "Chicken Biryani",
          price: 28,
          img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800",
        },
        {
          name: "Thai Basil Rice",
          price: 24,
          img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
        },
        {
          name: "Egg Rice Bowl",
          price: 20,
          img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
        },
      ],
    },
  },

  {
    name: "The Spice Route",
    rating: 4.5,
    time: "30 min",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    categories: {
      Indian: [
        {
          name: "Dal Makhani",
          price: 14,
          img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop",
        },
        {
          name: "Palak Paneer",
          price: 15,
          img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800",
        },
      ],

      Biryani: [
        {
          name: "Hyderabadi Biryani",
          price: 18,
          img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800",
        },
        {
          name: "Chicken Biryani",
          price: 17,
          img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800",
        },
      ],

      Curry: [
        {
          name: "Butter Chicken",
          price: 16,
          img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800",
        },
        {
          name: "Paneer Tikka Masala",
          price: 15,
          img: "https://images.unsplash.com/photo-1605478371310-a9f1e96b4ff4?w=800",
        },
      ],

      Naan: [
        {
          name: "Garlic Naan",
          price: 4,
          img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800",
        },
        {
          name: "Butter Naan",
          price: 3,
          img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800",
        },
      ],
    },
  },

  {
    name: "Urban Grill House",
    rating: 4.6,
    time: "25 min",
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    categories: {
      BBQ: [
        {
          name: "BBQ Chicken",
          price: 22,
          img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
        },
        {
          name: "BBQ Ribs",
          price: 24,
          img: "https://images.unsplash.com/photo-1558030006-450675393462?w=800",
        },
      ],

      Steak: [
        {
          name: "Grilled Steak",
          price: 28,
          img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800",
        },
        {
          name: "Pepper Steak",
          price: 26,
          img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
        },
      ],

      Burgers: [
        {
          name: "Cheese Grill Burger",
          price: 18,
          img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
        },
        {
          name: "Smoked Beef Burger",
          price: 20,
          img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
        },
      ],
    },
  },

  {
    name: "Ocean Sushi Bar",
    rating: 4.8,
    time: "18 min",
    img: "https://images.unsplash.com/photo-1553621042-f6e147245754",
    categories: {
      Sushi: [
        {
          name: "Salmon Sushi",
          price: 18,
          img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
        },
        {
          name: "Tuna Sushi",
          price: 19,
          img: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800",
        },
      ],

      Ramen: [
        {
          name: "Chicken Ramen",
          price: 16,
          img: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800",
        },
        {
          name: "Spicy Ramen",
          price: 17,
          img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800",
        },
      ],
    },
  },
];

const RestaurantView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const restaurant = restaurants[Number(id) || 0];

  const categoryKeys = Object.keys(restaurant.categories);

  const [activeTab, setActiveTab] = useState(categoryKeys[0]);

  return (
    <div className="restaurant-page">
      {/* HEADER */}
      <div className="restaurant-top">
        <ArrowLeftOutlined onClick={() => navigate(-1)} />
        <h2>Restaurant View</h2>
      </div>

      {/* IMAGE */}
      <div className="restaurant-image">
        <img src={restaurant.img} alt={restaurant.name} />
      </div>

      {/* DETAILS */}
      <div className="restaurant-details">
        <h1>{restaurant.name}</h1>

        <p>
          Maecenas sed diam eget risus varius blandit sit amet non magna.
          Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
        </p>

        <div className="restaurant-meta">
          <span>
            <StarFilled /> {restaurant.rating}
          </span>

          <span>🚚 Free</span>

          <span>
            <ClockCircleOutlined /> {restaurant.time}
          </span>
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div className="menu-tabs">
        {categoryKeys.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab} ({restaurant.categories[tab].length})
          </button>
        ))}
      </div>

      {/* FOOD GRID */}
      <div className="food-grid">
        {restaurant.categories[activeTab].map((item, i) => (
          <div
            key={i}
            className="food-card"
            onClick={() =>
              navigate("/food-details", {
                state: { item, restaurant },
              })
            }
          >
            <img src={item.img} alt={item.name} />

            <div className="food-info">
              <h3>{item.name}</h3>
              <p>{restaurant.name}</p>

              <div className="food-bottom">
                <span>${item.price}</span>

                <button
                  className="food-add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Added:", item.name);
                  }}
                >
                  <PlusOutlined />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantView;
