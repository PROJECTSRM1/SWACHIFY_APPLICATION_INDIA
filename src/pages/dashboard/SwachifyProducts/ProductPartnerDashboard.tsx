import React, { useState, useEffect } from "react";
import { ShoppingBag, Box, Trash2 } from "lucide-react";
import "./ProductPartnerDashboard.css";
import { getProducts, updateProduct, deleteProduct, type Product } from "./productStore";
import { getOrders, type Order } from "./orderStore";
import { Modal, Form, Input, message } from "antd";

const ProductPartnerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"orders" | "inventory">("orders");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setProducts(getProducts());
    setOrders(getOrders());
  }

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteProduct(id);
        message.success('Product deleted successfully');
        loadData();
      },
    });
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue({
      name: product.name,
      price: product.price,
      stock: product.stock || 12, // Default stock if undefined
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (values: any) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: values.name,
        price: Number(values.price),
        stock: Number(values.stock),
      });
      message.success('Product updated successfully');
      setIsEditModalOpen(false);
      setEditingProduct(null);
      loadData();
    }
  };

  // Stats calculation
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const activeOrdersCount = orders.filter(
    (o) => o.status === "pending" || o.status === "processing"
  ).length;
  const productStockCount = products.length;

  return (
    <div className="web-layout">
      {/* 1. FIXED LEFT NAVIGATION (Web Exclusive) */}
      <aside className="web-sidebar">
        <div className="logo-section">
          <div className="logo-icon">N</div>
          <span className="logo-text">Nature's Essence</span>
        </div>

        <nav className="web-nav">
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
            {/* Action buttons could go here */}
          </div>
        </header>

        {/* 3. TOP STATS ROW */}
        <section className="web-stats-row">
          <div className="web-stat-card">
            <p className="web-stat-label">Total Revenue</p>
            <p className="web-stat-value">₹{totalRevenue.toLocaleString()}</p>
            <span className="trend-up">+12% from last month</span>
          </div>
          <div className="web-stat-card">
            <p className="web-stat-label">Active Orders</p>
            <p className="web-stat-value">{activeOrdersCount}</p>
          </div>
          <div className="web-stat-card">
            <p className="web-stat-label">Product Stock</p>
            <p className="web-stat-value">{productStockCount}</p>
          </div>
        </section>

        {/* 4. DATA GRID */}
        <div className="web-data-grid">
          {activeTab === "orders" ? (
            orders.length > 0 ? (
              orders.map((order) => (
                <OrderCardWeb
                  key={order.id}
                  name={order.customerName}
                  time={formatDate(order.orderDate)}
                  prod={
                    order.items.length > 0
                      ? `${order.items[0].productName} ${order.items.length > 1
                        ? `+ ${order.items.length - 1} more`
                        : ""
                      }`
                      : "No items"
                  }
                  price={`₹${order.totalAmount.toLocaleString()}`}
                  initial={order.customerName.charAt(0)}
                  status={order.paymentStatus === 'paid'}
                />
              ))
            ) : (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "20px", color: "#666" }}>
                No orders found.
              </div>
            )
          ) : (
            products.length > 0 ? (
              products.map((product) => (
                <InventoryCardWeb
                  key={product.id}
                  name={product.name}
                  price={`₹${product.price ? product.price.toLocaleString() : '0'}`}
                  stock={product.stock || "12"}
                  onEdit={() => handleEditClick(product)}
                  onDelete={() => handleDelete(product.id)}
                />
              ))
            ) : (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "20px", color: "#666" }}>
                No products in inventory.
              </div>
            )
          )}
        </div>
      </main>

      {/* Edit Modal */}
      <Modal
        title="Edit Product"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleEditSubmit}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input type="number" prefix="₹" />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: "Please enter stock quantity" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// Simplified components for the Web Grid
const OrderCardWeb = ({ name, time, prod, price, initial, status }: any) => (
  <div className="web-card">
    <div className="web-card-header">
      <div className="avatar-web">{initial}</div>
      <div>
        <p className="web-card-name">{name}</p>
        <p className="web-card-sub">{time}</p>
      </div>
      {status && <span className="web-badge">Paid</span>}
    </div>
    <div className="web-card-body">
      <p>{prod}</p>
      <p className="web-card-price">{price}</p>
    </div>
    <button className="web-action-btn">Ship Order</button>
  </div>
);

interface InventoryCardProps {
  name: string;
  price: string;
  stock: number | string;
  onEdit: () => void;
  onDelete: () => void;
}

const InventoryCardWeb = ({ name, price, stock, onEdit, onDelete }: InventoryCardProps) => (
  <div className="web-card inventory">
    <div className="web-card-name-lg">{name}</div>
    <p className="web-card-price">{price}</p>
    <p className="web-card-sub">Stock: {stock} units</p>
    <div className="web-card-footer">
      <button className="web-action-btn secondary" onClick={onEdit}>Edit</button>
      <button className="delete-icon-btn" onClick={onDelete}>
        <Trash2 size={18} />
      </button>
    </div>
  </div>
);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', { weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true });
};

export default ProductPartnerDashboard;
