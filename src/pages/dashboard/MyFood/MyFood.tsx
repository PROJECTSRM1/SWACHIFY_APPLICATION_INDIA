// import { useState } from "react";
import { useState, useRef, useEffect } from "react";
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
  CloseCircleFilled,
} from "@ant-design/icons";

/* FEATURED FOOD */

const featured = [
  {
    name: "Pizza",
    slug: "pizza",
    img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
  },
  {
    name: "Burger",
    slug: "burger",
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    name: "Sushi",
    slug: "sushi",
    img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351",
  },
  {
    name: "Pasta",
    slug: "pasta",
    img: "https://images.unsplash.com/photo-1525755662778-989d0524087e",
  },
  {
    name: "Tacos",
    slug: "tacos",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  },
  {
    name: "Noodles",
    slug: "noodles",
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
  },
  {
    name: "Ramen",
    slug: "ramen",
    img: "https://images.unsplash.com/photo-1557872943-16a5ac26437e",
  },
  {
    name: "Chilli Chicken",
    slug: "chilliChicken",
    img: "https://images.unsplash.com/photo-1604909052743-94e838986d24",
  },
  {
    name: "Soup",
    slug: "soup",
    img: "https://images.unsplash.com/photo-1547592180-85f173990554",
  },
];

/* RESTAURANTS */

const restaurants = [
  {
    id: 0,
    name: "Rose Garden Restaurant",
    cuisine: "Burger · Chicken · Rice · Wings",
    rating: 4.7,
    time: "20 min",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    categories: ["pizza", "burger", "chicken", "rice", "wings"],
  },
  {
    id: 1,
    name: "The Spice Route",
    cuisine: "Indian · Biryani · Curry · Naan",
    rating: 4.5,
    time: "30 min",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    categories: ["biryani", "curry", "naan", "indian"],
  },
  {
    id: 2,
    name: "Urban Grill House",
    cuisine: "BBQ · Steak · Burgers",
    rating: 4.6,
    time: "25 min",
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    categories: ["bbq", "steak", "burger"],
  },
  {
    id: 3,
    name: "Ocean Sushi Bar",
    cuisine: "Japanese · Sushi · Ramen",
    rating: 4.8,
    time: "18 min",
    img: "https://images.unsplash.com/photo-1553621042-f6e147245754",
    categories: ["sushi", "ramen"],
  },
];

const MyFood = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [cartCount, setCartCount] = useState(0);

  const recentKeywords = ["Burger", "Sushi", "Pizza", "Tacos"];

  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const totalItems = storedCart.reduce(
      (sum: number, item: any) => sum + item.qty,
      0,
    );

    setCartCount(totalItems);
  };

  useEffect(() => {
    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const handleCategoryClick = (slug: string) => {
    navigate(`/category/${slug}`);
  };

  const handleSearch = (value: string) => {
    setQuery(value);

    const q = value.toLowerCase();

    const filtered = restaurants.filter((r) => {
      return (
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.categories.some((c) => c.includes(q))
      );
    });

    setFilteredRestaurants(filtered);
  };

  const searchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowDropdown(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // const [cart, setCart] = useState(0);

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

        <div className="search-container" ref={searchRef}>
          <div className="search-bar">
            <SearchOutlined className="search-icon" />
            <input
              type="text"
              placeholder="Search dishes, restaurants..."
              value={query}
              onFocus={() => setShowDropdown(true)}
              onChange={(e) => {
                setShowDropdown(true);
                handleSearch(e.target.value);
              }}
            />
            {query && (
              <CloseCircleFilled
                className="clear-icon"
                onClick={() => {
                  setQuery("");
                  setFilteredRestaurants(restaurants);
                  setShowDropdown(false);
                }}
              />
            )}
          </div>

          {showDropdown && (
            <div className="search-dropdown">
              {/* RECENT KEYWORDS */}

              {query === "" && (
                <>
                  <h4>Recent Keywords</h4>

                  <div className="keyword-list">
                    {recentKeywords.map((k, i) => (
                      <span
                        key={i}
                        className="keyword"
                        onClick={() => handleSearch(k)}
                      >
                        {k}
                      </span>
                    ))}
                  </div>

                  <h4>Suggested Restaurants</h4>

                  {restaurants.map((r, i) => (
                    <div
                      key={i}
                      className="search-restaurant"
                      onClick={() => {
                        setShowDropdown(false);
                        navigate(`/restaurant/${r.id}`);
                      }}
                    >
                      <img src={r.img} />

                      <div>
                        <p>{r.name}</p>
                        <span>
                          <StarFilled /> {r.rating}
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* FILTERED RESULTS */}

              {query !== "" && (
                <>
                  <h4>Restaurants</h4>

                  {filteredRestaurants.map((r) => (
                    <div
                      key={r.id}
                      className="search-restaurant"
                      onClick={() => navigate(`/restaurant/${r.id}`)}
                    >
                      <img src={r.img} alt={r.name} />

                      <div>
                        <p>{r.name}</p>
                        <span>
                          <StarFilled /> {r.rating}
                        </span>
                      </div>
                    </div>
                  ))}

                  {filteredRestaurants.length === 0 && (
                    <p className="no-results">No restaurants found</p>
                  )}
                </>
              )}
            </div>
          )}

          <div className="cart-btn" onClick={() => navigate("/cart")}>
            <div className="cart-icon-wrapper">
              <ShoppingCartOutlined className="cart-icon" />

              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
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
            <div
              key={i}
              className="featured-card"
              onClick={() => handleCategoryClick(item.slug)}
              style={{ cursor: "pointer" }}
            >
              <img src={item.img} alt={item.name} />

              <div className="featured-overlay">
                <h3>{item.name}</h3>
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
              onClick={() => navigate(`/restaurant/${r.id}`)}
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
