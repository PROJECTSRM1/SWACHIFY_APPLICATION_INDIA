import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Card,
  Tag,
  Badge,
  Spin,
  Empty,
  message,
  Modal,
  Radio,
} from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
  FilterOutlined,
  ArrowLeftOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import "./ProductsListing.css";
import { getProducts, initializeMockData, type Product } from "./productStore";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";

const { Search } = Input;

const FEATURED_ENTREPRENEURS = [
  { id: "1", name: "Sarah K", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "2", name: "Mark T", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: "3", name: "Alicia M", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: "4", name: "James W", avatar: "https://i.pravatar.cc/150?img=13" },
  { id: "5", name: "Sarah L", avatar: "https://i.pravatar.cc/150?img=9" },
];

interface ProductsListingProps {
  onBack: () => void;
  searchQuery?: string;
}

const ProductsListing: React.FC<ProductsListingProps> = ({
  onBack,
  searchQuery: initialSearchQuery = "",
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [activeFilter, setActiveFilter] = useState<string>("All Products");

  // Cart context
  const { addToCart } = useCart();

  // Wishlist context
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Filter modal state
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [distanceFilter, setDistanceFilter] = useState<string>("all");
  const [sortByRating, setSortByRating] = useState<string>("recent");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [activeFilter, searchQuery, products, distanceFilter, sortByRating]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Initialize mock data if needed
      initializeMockData();

      // Get products from localStorage
      const storedProducts = getProducts();
      setProducts(storedProducts);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch products");
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Apply category filter
    if (activeFilter !== "All Products") {
      filtered = filtered.filter((p) => p.category === activeFilter);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.company.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply distance filter
    if (distanceFilter !== "all") {
      filtered = filtered.filter((p) => {
        const distance = parseFloat(p.distance.replace(" km", ""));

        switch (distanceFilter) {
          case "0-10":
            return distance >= 0 && distance <= 10;
          case "10-20":
            return distance > 10 && distance <= 20;
          case "20-40":
            return distance > 20 && distance <= 40;
          case "above40":
            return distance > 40;
          default:
            return true;
        }
      });
    }

    // Apply sorting by rating
    if (sortByRating === "high-low") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortByRating === "low-high") {
      filtered.sort((a, b) => a.rating - b.rating);
    } else if (sortByRating === "recent") {
      // Sort by isNew first, then by id (assuming newer products have higher IDs)
      filtered.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return parseInt(b.id) - parseInt(a.id);
      });
    }

    setFilteredProducts(filtered);
  };

  const handleProductClick = (productId: string) => {
    console.log("Product clicked:", productId);
    // TODO: Navigate to product details
  };

  const handleAddToCart = (product: Product) => {
    try {
      // Create cart item from product
      const cartItem = {
        id: parseInt(product.id),
        title: product.name,
        image: product.image,
        quantity: 1,
        price: product.price,
        totalPrice: product.price,
        customerName: "", // Will be filled during checkout
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
    } catch (error) {
      console.error("Error adding to cart:", error);
      message.error("Failed to add to cart");
    }
  };

  const handleToggleWishlist = (product: Product) => {
    try {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
        message.success(`${product.name} removed from wishlist`);
      } else {
        const wishlistItem = {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          company: product.company,
          category: product.category,
          rating: product.rating,
          reviews: product.reviews,
          distance: product.distance,
          isNew: product.isNew,
          isFeatured: product.isFeatured,
        };
        addToWishlist(wishlistItem);
        message.success(`${product.name} added to wishlist!`);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      message.error("Failed to update wishlist");
    }
  };

  const handleApplyFilters = () => {
    setFilterModalVisible(false);
    // Filters are already applied via useEffect
  };

  const handleResetFilters = () => {
    setDistanceFilter("all");
    setSortByRating("recent");
  };

  return (
    <div className="sw-products-listing-page">
      {/* Back Button Header */}
      <div className="sw-products-listing-header">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
          className="sw-products-back-btn"
        ></Button>
        <h1 className="sw-products-listing-title">Browse Products</h1>
      </div>

      {/* Main Content */}
      <div className="sw-products-listing-container">
        {/* Search Section */}
        {/* New Unified Action Bar */}
        <div className="sw-top-action-bar">
          {/* Search - now part of the flex row */}
          <div className="sw-search-container">
            <Search
              placeholder="Search products..."
              prefix={<SearchOutlined />}
              size="large"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              allowClear
            />
          </div>

          {/* Filter Tabs - now scrollable beside the search */}
          <div className="sw-tabs-wrapper">
            <div className="sw-filter-scroll">
              {["All Products", "Sustainable", "Recycled", "Cleaners"].map(
                (filter) => (
                  <button
                    key={filter}
                    className={`sw-nav-tab ${activeFilter === filter ? "active" : ""}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Sort Button */}
          <Button
            icon={<FilterOutlined />}
            className={`sw-sort-icon-btn ${filterModalVisible ? "active" : ""}`}
            onClick={() => setFilterModalVisible(true)}
          >
            <span className="hide-on-mobile">Sort & Filter</span>
          </Button>
        </div>

        {/* Products Count */}
        <div className="sw-products-listing-count">
          <p>{filteredProducts.length} products found</p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="sw-products-listing-loading">
            <Spin size="large" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <Empty
            description="No products found"
            className="sw-products-listing-empty"
          />
        ) : (
          <div className="sw-products-listing-grid">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                hoverable
                className="sw-product-listing-card"
                onClick={() => handleProductClick(product.id)}
                cover={
                  <div className="sw-product-listing-image-wrapper">
                    <img
                      alt={product.name}
                      src={product.image}
                      className="sw-product-listing-image"
                    />

                    {/* CATEGORY TAG */}
                    <Tag className="sw-product-image-tag">
                      {product.category}
                    </Tag>

                    {/* NEW BADGE */}
                    {product.isNew && <Badge.Ribbon text="NEW" color="red" />}

                    {/* WISHLIST HEART */}
                    <Button
                      type="text"
                      icon={
                        isInWishlist(product.id) ? (
                          <HeartFilled />
                        ) : (
                          <HeartOutlined />
                        )
                      }
                      className={`sw-product-wishlist-btn ${
                        isInWishlist(product.id) ? "active" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleWishlist(product);
                      }}
                    />

                    {/* CART FLOATING BUTTON */}
                    <Button
                      className="sw-product-cart-fab"
                      icon={<ShoppingCartOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    />
                  </div>
                }
              >
                <div className="sw-product-listing-content">
                  <h3 className="sw-product-listing-name">{product.name}</h3>

                  <p className="sw-product-listing-company">
                    {product.company}
                  </p>
                  <div className="sw-product-listing-rating">
                    <span style={{ color: "#facc15", fontSize: "14px" }}>
                      ★
                    </span>
                    <span className="sw-product-listing-rating-text">
                      {product.rating}
                    </span>
                    <span className="sw-product-listing-reviews">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="sw-product-listing-footer">
                    <div className="sw-product-footer-left">
                      <div className="sw-product-listing-location">
                        <EnvironmentOutlined />
                        <span>{product.distance}</span>
                      </div>

                      <div className="sw-product-listing-price">
                        ₹{product.price.toLocaleString()}
                      </div>
                    </div>

                    <Button
                      className="sw-product-add-to-cart-btn"
                      icon={<ShoppingCartOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    ></Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Featured Entrepreneurs Section */}
        <section className="sw-products-listing-entrepreneurs">
          <h2 className="sw-products-listing-section-title">
            Featured Entrepreneurs
          </h2>
          <div className="sw-entrepreneurs-listing-grid">
            {FEATURED_ENTREPRENEURS.map((entrepreneur) => (
              <div
                key={entrepreneur.id}
                className="sw-entrepreneur-listing-card"
              >
                <img
                  src={entrepreneur.avatar}
                  alt={entrepreneur.name}
                  className="sw-entrepreneur-listing-avatar"
                />
                <p className="sw-entrepreneur-listing-name">
                  {entrepreneur.name}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sort & Filter Modal */}
      <Modal
        title="Sort & Filter"
        open={filterModalVisible}
        onCancel={() => {
          console.log("Modal closing");
          setFilterModalVisible(false);
        }}
        footer={[
          <Button key="reset" onClick={handleResetFilters}>
            Reset All
          </Button>,
          <Button key="apply" type="primary" onClick={handleApplyFilters}>
            Apply Filters
          </Button>,
        ]}
        width={500}
        zIndex={10000}
      >
        <div style={{ padding: "20px 0" }}>
          {/* Distance Filter */}
          <div style={{ marginBottom: "30px" }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 600,
                marginBottom: "16px",
              }}
            >
              Distance from You
            </h3>
            <Radio.Group
              value={distanceFilter}
              onChange={(e) => setDistanceFilter(e.target.value)}
              style={{ width: "100%" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <Radio value="all" style={{ fontSize: "15px" }}>
                  All Distances
                </Radio>
                <Radio value="0-10" style={{ fontSize: "15px" }}>
                  0 - 10 km
                </Radio>
                <Radio value="10-20" style={{ fontSize: "15px" }}>
                  10 - 20 km
                </Radio>
                <Radio value="20-40" style={{ fontSize: "15px" }}>
                  20 - 40 km
                </Radio>
                <Radio value="above40" style={{ fontSize: "15px" }}>
                  Above 40 km
                </Radio>
              </div>
            </Radio.Group>
          </div>

          {/* Sort by Rating */}
          <div>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 600,
                marginBottom: "16px",
              }}
            >
              Sort by Rating
            </h3>
            <Radio.Group
              value={sortByRating}
              onChange={(e) => setSortByRating(e.target.value)}
              style={{ width: "100%" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <Radio value="recent" style={{ fontSize: "15px" }}>
                  Most Recent First
                </Radio>
                <Radio value="high-low" style={{ fontSize: "15px" }}>
                  Rating: High to Low
                </Radio>
                <Radio value="low-high" style={{ fontSize: "15px" }}>
                  Rating: Low to High
                </Radio>
              </div>
            </Radio.Group>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductsListing;
