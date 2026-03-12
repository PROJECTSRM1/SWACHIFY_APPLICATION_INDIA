import React, { useState, useRef } from "react";
import {
  ArrowLeftOutlined,
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
  StarFilled,
  ClockCircleOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

import { useNavigate, useParams } from "react-router-dom";

import "./CategoryPage.css";

const CategoryPage: React.FC = () => {

  const { categoryName } = useParams<{ categoryName: string }>();

  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();


  const categories = [
  { name: "Pizza", slug: "pizza" },
  { name: "Burger", slug: "burger" },
  { name: "Sushi", slug: "sushi" },
  { name: "Pasta", slug: "pasta" },
  { name: "Tacos", slug: "tacos" },
  { name: "Noodles", slug: "noodles" },
  { name: "Ramen", slug: "ramen" },
  { name: "Chilli Chicken", slug: "chilliChicken" },
  { name: "Soup", slug: "soup" }
];

  /* -------------------------------
     PIZZA ITEMS (UNCHANGED)
  -------------------------------- */

  const pizzas = [

        {
      id: 1,
      name: "Margherita Classic",
      restaurant: "Bella Italia",
      price: 12,
      rating: 4.8,
      img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800",
    },
    {
      id: 2,
      name: "Pepperoni Feast",
      restaurant: "Rose Garden",
      price: 15,
      rating: 4.6,
      img: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=800",
    },
    {
      id: 3,
      name: "BBQ Chicken Pizza",
      restaurant: "Pansi Restaurant",
      price: 14,
      rating: 4.5,
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800",
    },
    {
      id: 4,
      name: "Veggie Supreme",
      restaurant: "Cafenio Club",
      price: 11,
      rating: 4.3,
      img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800",
    },
    {
      id: 5,
      name: "Four Cheese Pizza",
      restaurant: "Bella Italia",
      price: 16,
      rating: 4.9,
      img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800"
    },
    {
      id: 6,
      name: "Buffalo Pizza",
      restaurant: "Cafenio Coffee",
      price: 13,
      rating: 4.4,
      img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=800",
    },
  ];

  /* -------------------------------
     PIZZA RESTAURANTS
  -------------------------------- */

  const pizzaRestaurants = [

     {
      id: 1,
      name: "Bella Italia",
      tags: "Italian • Pizza • Pasta • Tiramisu",
      rating: 4.9,
      time: "25 min",
      fee: "Free",
      img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200",
    },
    {
      id: 2,
      name: "Rose Garden",
      tags: "Pizza • Burgers • Salads",
      rating: 4.7,
      time: "20 min",
      fee: "Free",
      img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200",
    },
    {
      id: 3,
      name: "Cafenio Coffee Club",
      tags: "Coffee • Pastries • Pizza",
      rating: 4.4,
      time: "18 min",
      fee: "Rs29",
      img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200",
    },

  ];


  const burgers = [
  {
    id: 1,
    name: "Burger Bistro",
    restaurant: "Rose Garden",
    price: 40,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800",
  },
  {
    id: 2,
    name: "Smokin' Burger",
    restaurant: "Cafenio Restaurant",
    price: 60,
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800",
  },
  {
    id: 3,
    name: "Buffalo Burgers",
    restaurant: "Kaji Firm Kitchen",
    price: 75,
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800",
  },
  {
  id: 4,
  name: "Bullseye Burgers",
  restaurant: "Kabab Restaurant",
  price: 94,
  rating: 4.4,
  img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
},
  
  {
    id: 5,
    name: "Double Smash Bu...",
    restaurant: "The Spice Route",
    price: 55,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800",
  },

  {
  id: 6,
  name: "Crispy Chick Burg...",
  restaurant: "American Spicy",
  price: 48,
  rating: 4.3,
  img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
}



];

/* -------------------------------
     BURGER RESTAURANTS
 -------------------------------- */

const burgerRestaurants = [
  {
    id: 1,
    name: "Rose Garden Restaurant",
    tags: "Burger • Chicken • Rice • Wings",
    rating: 4.7,
    time: "20 min",
    fee: "Free",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200",
  },
  {
    id: 2,
    name: "American Spicy Burger Shop",
    tags: "Burgers • Fries • Shakes",
    rating: 4.3,
    time: "18 min",
    fee: "Rs19",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200",
  },
  {
    id: 3,
    name: "Tasty Treat Gallery",
    tags: "Multi • Grill • Wings • Burgers",
    rating: 4.7,
    time: "22 min",
    fee: "Free",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200",
  },
];


/* -------------------------------
      SUSHI ITEMS
 -------------------------------- */
const sushis = [
  {
    id: 1,
    name: "Salmon Nigiri",
    restaurant: "Sakura Sushi Bar",
    price: 18,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800",
  },
  {
    id: 2,
    name: "Dragon Roll",
    restaurant: "Sakura Sushi Bar",
    price: 22,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800",
  },
  {
    id: 3,
    name: "Tuna Sashimi",
    restaurant: "Tokyo Kitchen",
    price: 20,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=800",
  },
  {
  id: 4,
  name: "Rainbow Roll",
  restaurant: "Sakura Sushi Bar",
  price: 25,
  rating: 4.9,
  img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
},
{
  id: 5,
  name: "Spicy Tuna Roll",
  restaurant: "Tokyo Kitchen",
  price: 19,
  rating: 4.6,
  img: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800",
},
{
  id: 6,
  name: "Tempura Roll",
  restaurant: "Sakura Sushi Bar",
  price: 21,
  rating: 4.5,
  img: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&auto=format&fit=crop",
}

];

/* -------------------------------
      SUSHI RESTAURANTS
 -------------------------------- */
const sushiRestaurants = [
  {
    id: 1,
    name: "Sakura Sushi Bar",
    tags: "Japanese • Sushi • Ramen • Tempura",
    rating: 4.8,
    time: "25 min",
    fee: "Rs29",
    img: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1200",
  },
  {
    id: 2,
    name: "Tokyo Kitchen",
    tags: "Sushi • Ramen • Bento • Miso",
    rating: 4.7,
    time: "30 min",
    fee: "Free",
    img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=1200",
  },
];

const pastas = [
 {
  id: 1,
  name: "Creamy Broccoli Pasta",
  restaurant: "Bella Italia",
  price: 18,
  rating: 4.8,
  img: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&auto=format&fit=crop",
},
{
  id: 2,
  name: "Spicy Penne Arrabbiata",
  restaurant: "The Pasta House",
  price: 14,
  rating: 4.6,
  img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&auto=format&fit=crop",
},
 
  {
    id: 3,
    name: "Classic Carbonara",
    restaurant: "Bella Italia",
    price: 20,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=800",
  },
  {
    id: 4,
    name: "Pesto Genovese",
    restaurant: "Cafenio Coffee Club",
    price: 16,
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=800",
  },
  {
    id: 5,
    name: "Truffle Mushroom Pasta",
    restaurant: "The Pasta House",
    price: 22,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800",
  },
  {
  id: 6,
  name: "Tomato Basil Fusilli",
  restaurant: "Bella Italia",
  price: 13,
  rating: 4.4,
  img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&auto=format&fit=crop",
} 
];

/* -------------------------------
      PASTA RESTAURANTS
 -------------------------------- */

const pastaRestaurants = [
  {
    id: 1,
    name: "Bella Italia",
    tags: "Italian • Pizza • Pasta • Tiramisu",
    rating: 4.9,
    time: "25 min",
    fee: "Free",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200",
  },
  {
    id: 2,
    name: "The Pasta House",
    tags: "Pasta • Italian • Wine • Salads",
    rating: 4.7,
    time: "35 min",
    fee: "Rs49",
    img: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=1200",
  },
];


/* -------------------------------
      TACOS
-------------------------------- */
const tacos = [
  {
    id: 1,
    name: "Beef Tacos",
    restaurant: "The Spice Route",
    price: 9,
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=800",
  },
    {
    id: 2,
    name: "Chicken Tacos",
    restaurant: "Pansi Restaurant",
    price: 8,
    rating: 4.4,
    img: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Shrimp Tacos",
    restaurant: "The Spice Route",
    price: 11,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Fish Tacos",
    restaurant: "Coastal Eats",
    price: 10,
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Carnitas Tacos",
    restaurant: "Pansi Restaurant",
    price: 9,
    rating: 4.3,
    img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&auto=format&fit=crop",
  },
  {
  id: 6,
  name: "Veggie Tacos",
  restaurant: "The Spice Route",
  price: 8,
  rating: 4.2,
  img: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&auto=format&fit=crop",
}
];

/* -------------------------------
      TACO RESTAURANTS
-------------------------------- */
const tacoRestaurants = [
  {
    id: 1,
    name: "The Spice Route",
    tags: "Tacos • Indian • Biryani • Curry",
    rating: 4.5,
    time: "30 min",
    fee: "Free",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200",
  },
  {
    id: 2,
    name: "Pansi Restaurant",
    tags: "Multi-Cuisine • Rice • Tacos",
    rating: 4.7,
    time: "22 min",
    fee: "Free",
    img: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=1200",
  },
  {
    id: 3,
    name: "Coastal Eats",
    tags: "Seafood • Tacos • Wraps",
    rating: 4.5,
    time: "25 min",
    fee: "Rs15",
    img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1200",
  },
];


/* -------------------------------
      NOODLES
-------------------------------- */
const noodles = [
  {
    id: 1,
    name: "Pad Thai",
    restaurant: "Bangkok Bistro",
    price: 12,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800",
  },
  {
    id: 2,
    name: "Spicy Ramen",
    restaurant: "Tokyo Kitchen",
    price: 14,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1614563637806-1d0e645e0940?q=80&w=800",
  },
  {
    id: 3,
    name: "Lo Mein",
    restaurant: "Golden Wok",
    price: 10,
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800",
  },
  {
    id: 4,
    name: "Udon Soup",
    restaurant: "Sakura Sushi Bar",
    price: 13,
    rating: 4.6,
   
  
    // Option C: Different photographer ID
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80",
 }
 
];

/* -------------------------------
      NOODLE RESTAURANTS
-------------------------------- */
const noodleRestaurants = [
  {
    id: 1,
    name: "Bangkok Bistro",
    tags: "Thai • Noodles • Spicy • Curry",
    rating: 4.8,
    time: "35 min",
    fee: "Rs20",
    img: "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1200",
  },

 {
    id: 2,
    name: "Golden Wok",
    tags: "Chinese • Stir-fry • Noodles",
    rating: 4.4,
    time: "20 min",
    fee: "Free",
    // Direct, permanent Unsplash asset URL
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1200",
  },
];

/* -------------------------------
      RAMEN DISHES
-------------------------------- */
const ramens = [
{
  id: 1,
  name: "Tonkotsu Ramen",
  restaurant: "Tokyo Bowl",
  price: 220,
  rating: 4.7,
  img: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=800&q=80",
},

  {
    id: 2,
    name: "Chicken Shoyu Ramen",
    restaurant: "Noodle House",
    price: 210,
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1614563637806-1d0e645e0940?w=800",
  },

  {
    id: 3,
    name: "Seafood Ramen Bowl",
    restaurant: "Ocean Taste",
    price: 260,
    rating: 4.4,
    img: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=800",
  },

  {
    id: 4,
    name: "Black Garlic Ramen",
    restaurant: "Kyoto Kitchen",
    price: 250,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=800",
  },
];
/* -------------------------------
        RAMEN RESTAURANTS
-------------------------------- */

const ramenRestaurants = [
  {
    id: 1,
    name: "Tokyo Bowl Ramen House",
    tags: "Ramen • Noodles • Sushi • Rice",
    rating: 4.7,
    time: "20 min",
    fee: "Free",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200",
  },
  {
  id: 2,
  name: "Ramen Street Kitchen",
  tags: "Japanese • Ramen • Dumplings",
  rating: 4.5,
  time: "18 min",
  fee: "Rs25",
  img: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=1200",
},

 
  {
    id: 3,
    name: "Kyoto Noodle Bar",
    tags: "Ramen • Sushi • Asian",
    rating: 4.6,
    time: "22 min",
    fee: "Free",
    img: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1200",
  },
];


const chilliChickens = [
  {
    id: 1,
    name: "Classic Chilli Chicken",
    restaurant: "Dragon Wok",
    price: 180,
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=800&q=80",
  },
  {
  id: 2,
  name: "Dry Chilli Chicken",
  restaurant: "Spice Bowl",
  price: 170,
  rating: 4.5,
  img: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=800&q=80",
 
},
  
  {
    id: 3,
    name: "Gravy Chilli Chicken",
    restaurant: "Hot Pan Kitchen",
    price: 190,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Garlic Chilli Chicken",
    restaurant: "Red Pepper House",
    price: 200,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80",
  },
];

const chilliChickenRestaurants = [
  {
    id: 1,
    name: "Dragon Wok Chinese",
    tags: "Chinese • Chilli Chicken • Noodles • Fried Rice",
    rating: 4.6,
    time: "20 min",
    fee: "Free",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    name: "Spice Bowl Asian Kitchen",
    tags: "Asian • Chinese • Chicken",
    rating: 4.4,
    time: "18 min",
    fee: "Rs20",
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    name: "Hot Pan Chinese House",
    tags: "Chinese • Grill • Chicken",
    rating: 4.7,
    time: "22 min",
    fee: "Free",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
];

const soups = [
  {
    id: 1,
    name: "Hot & Sour Soup",
    restaurant: "The Soup Spoon",
    price: 120,
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800",
  },
  {
  id: 2,
  name: "Creamy Tomato Soup",
  restaurant: "Healthy Bowls",
  price: 110,
  rating: 4.7,
  img: "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=800&q=80",
},
{
    id: 3,
    name: "Chicken Manchow",
    restaurant: "Oriental Mist",
    price: 140,
    rating: 4.6,
    // Updated with a high-quality Asian soup image
    img: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800",
  },
  {
  id: 4,
  name: "Sweet Corn Veg",
  restaurant: "The Soup Spoon",
  price: 115,
  rating: 4.4,
  img: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?q=80&w=800",
}
 
];
const soupRestaurants = [
  {
    id: 1,
    name: "The Soup Spoon",
    tags: "Soups • Healthy • Salads",
    rating: 4.5,
    time: "15 min",
    fee: "Free",
    img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200",
  },
  {
    id: 2,
    name: "Healthy Bowls",
    tags: "Organic • Soup • Continental",
    rating: 4.7,
    time: "20 min",
    fee: "Rs15",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200",
  },
  {
    id: 3,
    name: "Oriental Mist",
    tags: "Chinese • Soups • Appetizers",
    rating: 4.6,
    time: "22 min",
    fee: "Free",
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200",
  },
];
  /* -------------------------------
     GENERIC CUISINE DATA
  -------------------------------- */

  const cuisineData: any = {
    pizza: {
      items: pizzas,
      restaurants: pizzaRestaurants,
    },

    burger:{
        items: burgers,
        restaurants: burgerRestaurants, 
    },

    sushi: {
        items: sushis,
        restaurants: sushiRestaurants,
    },

    pasta:{
        items: pastas,
        restaurants: pastaRestaurants,
    },

    tacos: {
        items: tacos,
        restaurants: tacoRestaurants,
    },

    noodles: {
        items: noodles,
        restaurants: noodleRestaurants,
    },
    ramen : {
      items: ramens,
      restaurants: ramenRestaurants,
    },
    chilliChicken: {
      items: chilliChickens,
      restaurants: chilliChickenRestaurants,
    },
    soup: {
      items: soups,
      restaurants: soupRestaurants,
    },
    




  
  };
  const key = (categoryName || "pizza")
  .replace(/\s+/g, "")      // remove spaces
  .replace(/^./, (c) => c.toLowerCase()); // lowercase first letter

const currentCuisine = cuisineData[key] || cuisineData.pizza;



  const items = currentCuisine.items;
  const restaurants = currentCuisine.restaurants;

  /* -------------------------------
     GENERIC SEARCH FILTER
  -------------------------------- */

  const filteredItems = items.filter((item: any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRestaurants = restaurants.filter((res: any) =>
    res.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="category-container">

      {/* HEADER */}

      <header className="category-header">

        <div className="header-left">
            <button
    className="icon-btn"
    onClick={() => navigate("/MyFood")}
  >
    
            <ArrowLeftOutlined />
          </button>

          <div 
           className="dropdown-selector"
    onClick={() => setShowDropdown(!showDropdown)}
          >
            {(categoryName || "pizza").toUpperCase()} <span className="chevron">▼</span>
          </div>
          {showDropdown && (
    <div className="dropdown-menu">
      {categories.map((cat) => (
        <div
          key={cat.slug}
          className="dropdown-item"
          onClick={() => {
            navigate(`/category/${cat.slug}`);
            setShowDropdown(false);
          }}
        >
          {cat.name}
        </div>
      ))}
    </div>
  )}
        </div>

        <div className="header-right">

          <div className={`search-wrapper ${searchOpen ? "open" : ""}`}>

            <button
              className="icon-btn search-btn"
              onClick={() => {
                setSearchOpen(!searchOpen);
                setTimeout(() => inputRef.current?.focus(), 200);
              }}
            >
              <SearchOutlined />
            </button>

            <input
              ref={inputRef}
              type="text"
              placeholder="Search cuisine or restaurant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

          </div>

          <button className="icon-btn">
            <FilterOutlined />
          </button>

        </div>

      </header>

      {/* CONTENT */}

      <main className="content-area">

        {/* ITEMS */}

        <section className="section-block">

          <h2 className="section-title">
            Popular {(categoryName || "pizza").toUpperCase()}
          </h2>

          <div className="product-grid">

            {filteredItems.map((pizza: any) => (

              <div key={pizza.id} className="product-card">

                <div className="product-image-wrapper">
                  <img src={pizza.img} alt={pizza.name} />
                </div>

                <div className="product-info">

                  <h3>{pizza.name}</h3>

                  <p className="res-name">{pizza.restaurant}</p>

                  <div className="product-footer">

                    <div className="rating">
                      <StarFilled className="star-icon" />
                      {pizza.rating}
                    </div>

                  </div>

                  <div className="price-row">

                    <span className="price">${pizza.price}</span>

                    <button className="add-btn-circle">
                      <PlusOutlined />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* RESTAURANTS */}

        <section className="section-block">

          <div className="section-header">

            <h2 className="section-title">Open Restaurants</h2>

            <button className="see-all">
              See All ❯
            </button>

          </div>

          <div className="restaurant-list">

            {filteredRestaurants.map((res: any) => (

              <div key={res.id} className="restaurant-card">

                <div className="res-image">
                  <img src={res.img} alt={res.name} />
                </div>

                <div className="res-details">

                  <h3>{res.name}</h3>

                  <p className="res-tags">{res.tags}</p>

                  <div className="res-meta">

                    <span>
                      <StarFilled className="star-icon" /> {res.rating}
                    </span>

                    <span>
                      <ShoppingOutlined /> {res.fee}
                    </span>

                    <span>
                      <ClockCircleOutlined /> {res.time}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
};

export default CategoryPage;