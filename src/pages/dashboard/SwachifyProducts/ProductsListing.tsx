import React, { useState, useEffect } from "react";
import { Input, message } from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
  FilterOutlined,
  ShopOutlined,
  StarFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./ProductsListing.css";
import { getProducts, initializeMockData, type Product } from "./productStore";
import { useCart } from "../../../context/CartContext";

interface ProductsListingProps {
  searchQuery?: string;
  onRegister: () => void;
}

const FEATURED_ENTREPRENEURS = [
  { id: "1", name: "Sarah K.", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "2", name: "Mark T.", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: "3", name: "Elena R.", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: "4", name: "James W.", avatar: "https://i.pravatar.cc/150?img=13" },
  { id: "5", name: "Sofia L.", avatar: "https://i.pravatar.cc/150?img=9" },
];

const ProductsListing: React.FC<ProductsListingProps> = ({
  searchQuery: initialSearchQuery = "",
  onRegister,
}) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [activeFilter, setActiveFilter] = useState<string>("All Products");

  // Cart & Wishlist
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [activeFilter, searchQuery, products]);

  const fetchProducts = async () => {
    initializeMockData();
    const storedProducts = getProducts();
    setProducts(storedProducts);
  };

  const filterProducts = () => {
    let filtered = [...products];
    if (activeFilter !== "All Products") {
      filtered = filtered.filter((p) => p.category === activeFilter);
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.company.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: parseInt(product.id),
      title: product.name,
      image: product.image,
      quantity: 1,
      price: product.price,
      totalPrice: product.price,
      customerName: "",
      email: "",
      deliveryType: "Standard",
      deliveryDate: "",
      deliveryTime: "",
      contact: "",
      address: "",
      instructions: `Product from ${product.company}`,
    };
    addToCart(cartItem);
    message.success(`${product.name} added to cart!`);
  };

  return (
    <div className="sw-products-listing-page">
      <div className="sw-products-top-group">
        <header className="sw-page-inner-header">
          <button className="sw-back-btn" onClick={() => navigate("/landing")} aria-label="Go back">
            <ArrowLeftOutlined />
          </button>
          <h1 className="sw-page-title">Swachify Products</h1>
          <div style={{ width: 32 }} />
        </header>

        <div className="sw-listing-controls">
          <div className="sw-search-wrapper">
            <span className="sw-search-icon-absolute">
              <SearchOutlined />
            </span>
            <Input
              placeholder="Search products, services, brands..."
              className="sw-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="sw-register-btn-main" onClick={onRegister}>
            <ShopOutlined /> Register Product
          </button>

          <div className="sw-categories-scroll">
            {["All Products", "Sustainable", "Recycled", "Cleaners"].map((cat) => (
              <div
                key={cat}
                className={`sw-category-chip ${activeFilter === cat ? "active" : ""}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat === "Sustainable" && <span style={{ marginRight: 6 }}>🍃</span>}
                {cat === "Recycled" && <span style={{ marginRight: 6 }}>♻️</span>}
                {cat === "Cleaners" && <span style={{ marginRight: 6 }}>🧴</span>}
                {cat}
              </div>
            ))}
          </div>

          <button className="sw-filter-sort-btn">
            <FilterOutlined /> Sort & Filter
          </button>
        </div>
      </div>

      {/* 4. Results Count */}
      <div className="sw-results-count">
        {filteredProducts.length} products found
      </div>

      {/* 5. Product Grid */}
      <div className="sw-products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="sw-product-card">
            <div className="sw-card-image-container">
              <img src={product.image} alt={product.name} className="sw-card-image" />
              <div className="sw-card-badge">{product.category === 'Entrepreneur' ? 'Entrepreneur' : 'Company'}</div>
              <button
                className="sw-cart-add-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              >
                <ShoppingCartOutlined />
              </button>
            </div>
            <div className="sw-card-details">
              <h3 className="sw-product-name">{product.name}</h3>
              <p className="sw-brand-name">{product.company}</p>
              <div className="sw-meta-info">
                <span className="sw-rating">
                  <StarFilled style={{ color: "#fbbf24" }} /> {product.rating}
                </span>
                <span className="sw-distance">
                  <EnvironmentOutlined /> {product.distance}
                </span>
              </div>
              <div className="sw-price">₹{product.price.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 6. Featured Entrepreneurs */}
      <section className="sw-featured-section">
        <h2 className="sw-section-title">Featured Entrepreneurs</h2>
        <div className="sw-entrepreneurs-row">
          {FEATURED_ENTREPRENEURS.map((ent) => (
            <div key={ent.id} className="sw-entrepreneur-item">
              <div className="sw-entrepreneur-avatar-container">
                <img src={ent.avatar} alt={ent.name} className="sw-entrepreneur-avatar" />
              </div>
              <span className="sw-entrepreneur-name">{ent.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom nav removed to use global footer */}
    </div>
  );
};

export default ProductsListing;