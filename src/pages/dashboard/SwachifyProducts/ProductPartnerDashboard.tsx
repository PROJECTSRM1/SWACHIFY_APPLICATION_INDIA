import React, { useState } from "react";
import { ShoppingBag, Box, Trash2 } from "lucide-react";
import "./ProductPartnerDashboard.css";

const ProductPartnerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"orders" | "inventory">("orders");

  return (
    <div className="web-layout">
      {/* 1. FIXED LEFT NAVIGATION (Web Exclusive) */}
      <aside className="web-sidebar">
        <div className="logo-section">
          <div className="logo-icon">N</div>
          <span className="logo-text">Nature's Essence</span>
        </div>

        <nav className="web-nav">
          {/* <button className="web-nav-link active">
            <LayoutDashboard size={20} /> Dashboard
          </button> */}
          <button
            className={`web-nav-link ${activeTab === "orders" ? "selected" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingBag size={20} /> Orders
          </button>
          <button
            className={`web-nav-link ${activeTab === "inventory" ? "selected" : ""}`}
            onClick={() => setActiveTab("inventory")}
          >
            <Box size={20} /> Inventory
          </button>
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="web-main">
        <header className="web-header">
          <h1 className="web-title">
            {activeTab === "orders" ? "Order Management" : "Inventory Manager"}
          </h1>
          <div className="header-actions">
            {/* <button className="add-btn-web">
              <Plus size={18} /> Add New{" "}
              {activeTab === "orders" ? "Order" : "Product"}
            </button> */}
          </div>
        </header>

        {/* 3. TOP STATS ROW (Expanded for Web) */}
        <section className="web-stats-row">
          <div className="web-stat-card">
            <p className="web-stat-label">Total Revenue</p>
            <p className="web-stat-value">₹1,699</p>
            <span className="trend-up">+12% from last month</span>
          </div>
          <div className="web-stat-card">
            <p className="web-stat-label">Active Orders</p>
            <p className="web-stat-value">2</p>
          </div>
          <div className="web-stat-card">
            <p className="web-stat-label">Product Stock</p>
            <p className="web-stat-value">6</p>
          </div>
        </section>

        {/* 4. DATA GRID (Multi-column view) */}
        <div className="web-data-grid">
          {activeTab === "orders" ? (
            <>
              <OrderCardWeb
                name="Rahul Sharma"
                time="Today, 10:30 AM"
                prod="Bamboo Toothbrush"
                price="₹499"
                initial="R"
              />
              <OrderCardWeb
                name="Ananya Iyer"
                time="Yesterday, 04:45 PM"
                prod="Cotton Tote Bag"
                price="₹1,200"
                initial="A"
              />
              <OrderCardWeb
                name="Suresh Raina"
                time="Yesterday, 02:00 PM"
                prod="Lavender Soap"
                price="₹499"
                initial="S"
              />
            </>
          ) : (
            <>
              <InventoryCardWeb
                name="Bamboo Toothbrush Set"
                price="₹500"
                stock="12"
              />
              <InventoryCardWeb
                name="Glass Water Bottle"
                price="₹1,000"
                stock="12"
              />
              <InventoryCardWeb
                name="Organic Cotton Tote"
                price="₹1,500"
                stock="12"
              />
              <InventoryCardWeb
                name="Handmade Lavender Soap"
                price="₹10,000"
                stock="12"
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

// Simplified components for the Web Grid
const OrderCardWeb = ({ name, time, prod, price, initial }: any) => (
  <div className="web-card">
    <div className="web-card-header">
      <div className="avatar-web">{initial}</div>
      <div>
        <p className="web-card-name">{name}</p>
        <p className="web-card-sub">{time}</p>
      </div>
      <span className="web-badge">Paid</span>
    </div>
    <div className="web-card-body">
      <p>{prod}</p>
      <p className="web-card-price">{price}</p>
    </div>
    <button className="web-action-btn">Ship Order</button>
  </div>
);

const InventoryCardWeb = ({ name, price, stock }: any) => (
  <div className="web-card inventory">
    <div className="web-card-name-lg">{name}</div>
    <p className="web-card-price">{price}</p>
    <p className="web-card-sub">Stock: {stock} units</p>
    <div className="web-card-footer">
      <button className="web-action-btn secondary">Edit</button>
      <button className="delete-icon-btn">
        <Trash2 size={18} />
      </button>
    </div>
  </div>
);

export default ProductPartnerDashboard;
