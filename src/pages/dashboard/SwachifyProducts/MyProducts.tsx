import React, { useState, useEffect } from "react";
import { Button, Card, message, Empty, Badge } from "antd";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  StarFilled,
  ShopOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { getProducts, deleteProduct, type Product } from "./productStore";
import "./MyProducts.css";

interface MyProductsProps {
  onBack: () => void;
}

const MyProducts: React.FC<MyProductsProps> = ({ onBack }) => {
  const [products, setProducts] = useState<(Product & { quantity: number })[]>(
    [],
  );

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const allProducts = getProducts().map((p) => ({
      ...p,
      quantity: 1,
    }));
    setProducts(allProducts);
  };

  const increaseQty = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)),
    );
  };

  const decreaseQty = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p,
      ),
    );
  };

  const handleDelete = (productId: string) => {
    deleteProduct(productId);
    message.success("Product deleted successfully");
    loadProducts();
  };

  const totalAmount = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0,
  );

  const totalRevenue = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0,
  );

  const avgRating =
    products.length > 0
      ? products.reduce((sum, p) => sum + p.rating, 0) / products.length
      : 0;

  return (
    <div className="my-products-page">
      {/* Header */}
      <div className="sw-register-dashboard-header">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
          className="sw-register-dashboard-back-btn"
        ></Button>
        <h1 className="sw-register-dashboard-title">My Products</h1>
      </div>
      <div className="content-wrapper">
        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <ShopOutlined className="stat-icon-inner" />
              <span className="stat-title">Total Products</span>
            </div>

            <div className="stat-value">{products.length}</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <DollarOutlined className="stat-icon-inner" />
              <span className="stat-title">Inventory Value</span>
            </div>

            <div className="stat-value">₹{totalRevenue.toLocaleString()}</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <StarFilled className="stat-icon-inner" />
              <span className="stat-title">Average Rating</span>
            </div>

            <div className="stat-value">{avgRating.toFixed(1)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <Badge className="stat-icon-inner" />
              <span className="stat-title">Featured</span>
            </div>

            <div className="stat-value">
              {products.filter((p) => p.isFeatured).length}
            </div>
          </div>
        </div>

        {/* PRODUCTS LIST */}
        <Card className="products-card" bordered={false}>
          {products.length === 0 ? (
            <Empty description="No products yet" />
          ) : (
            <>
              <div className="cart-list">
                {products.map((product) => (
                  <div key={product.id} className="cart-card">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="cart-image"
                    />

                    <div className="cart-info">
                      <h3>{product.name}</h3>
                      <p className="company-name">{product.company}</p>

                      <div className="price">
                        ₹{product.price.toLocaleString()}
                      </div>

                      <div className="quantity-controls">
                        <button onClick={() => decreaseQty(product.id)}>
                          −
                        </button>
                        <span>{product.quantity}</span>
                        <button onClick={() => increaseQty(product.id)}>
                          +
                        </button>
                      </div>
                    </div>

                    <Button
                      danger
                      shape="circle"
                      size="large"
                      icon={<DeleteOutlined />}
                      className="cart-delete-btn"
                      onClick={() => handleDelete(product.id)}
                    />
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="total-row">
                  <span>Total Amount</span>
                  <span className="total-price">
                    ₹{totalAmount.toLocaleString()}
                  </span>
                </div>

                <Button
                  type="primary"
                  size="large"
                  block
                  className="checkout-btn"
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MyProducts;
