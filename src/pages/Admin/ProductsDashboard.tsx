import React from "react";
import { Row, Col, Card, Statistic, Table, Tag } from "antd";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  ShopOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";

import "./ProductsDashboard.css";

interface Props {
  activePage: string;
}

const ProductsDashboard: React.FC<Props> = ({ activePage }) => {

  /* ================= REAL SWACHIFY PRODUCTS ================= */

  const products = [
    {
      key: 1,
      name: "Organic Jute Shopping Bag",
      category: "Entrepreneur",
      price: 550,
      rating: 4.6,
      stock: 30,
    },
    {
      key: 2,
      name: "Bamboo Toothbrush Set",
      category: "Sustainable",
      price: 800,
      rating: 4.6,
      stock: 45,
    },
    {
      key: 3,
      name: "Recycled Paper Notebooks",
      category: "Recycled",
      price: 450,
      rating: 4.3,
      stock: 50,
    },
    {
      key: 4,
      name: "Reusable Beeswax Wraps",
      category: "Sustainable",
      price: 650,
      rating: 4.5,
      stock: 35,
    },
    {
      key: 5,
      name: "Eco-Friendly Cleaning Kit",
      category: "Cleaners",
      price: 1200,
      rating: 4.7,
      stock: 20,
    },
  ];

  const orders = [
    { key: 1, id: "#SW001", product: "Organic Jute Shopping Bag", amount: 550, status: "Delivered" },
    { key: 2, id: "#SW002", product: "Bamboo Toothbrush Set", amount: 800, status: "Pending" },
    { key: 3, id: "#SW003", product: "Eco-Friendly Cleaning Kit", amount: 1200, status: "Delivered" },
  ];

  const totalProducts = products.length;
  const totalRevenue = orders.reduce((acc, o) => acc + o.amount, 0);
  const totalCategories = 4;

  /* ================= SETTINGS ================= */

  if (activePage === "Settings") return null;

  /* ================= PRODUCTS PAGE ================= */

  if (activePage === "Products") {
    return (
      <Card className="products-main-card">
        <h3 className="section-title">All Swachify Products</h3>
        <Table
          dataSource={products}
          pagination={false}
          columns={[
            { title: "Product Name", dataIndex: "name", align: "left" },
            { title: "Category", dataIndex: "category", align: "left" },
            { title: "Price (₹)", dataIndex: "price", align: "left" },
            { title: "Rating", dataIndex: "rating", align: "left" },
            { title: "Stock", dataIndex: "stock", align: "left" },
          ]}
        />
      </Card>
    );
  }

  /* ================= ORDERS PAGE ================= */

  if (activePage === "Orders") {
    return (
      <Card className="products-main-card">
        <h3 className="section-title">Orders</h3>
        <Table
          dataSource={orders}
          pagination={false}
          columns={[
            { title: "Order ID", dataIndex: "id", align: "left" },
            { title: "Product", dataIndex: "product", align: "left" },
            { title: "Amount (₹)", dataIndex: "amount", align: "left" },
            {
              title: "Status",
              dataIndex: "status",
              align: "left",
              render: (status) =>
                status === "Delivered" ? (
                  <Tag color="green">Delivered</Tag>
                ) : (
                  <Tag color="orange">Pending</Tag>
                ),
            },
          ]}
        />
      </Card>
    );
  }

  /* ================= REVENUE PAGE ================= */

 if (activePage === "Revenue") {

  const totalOrders = orders.length;
  const averageOrderValue =
    totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const revenueByCategory = [
    { key: 1, category: "Entrepreneur", revenue: 550 },
    { key: 2, category: "Sustainable", revenue: 1450 },
    { key: 3, category: "Cleaners", revenue: 1200 },
  ];

  const monthlyRevenue = [
    { key: 1, month: "Jan", revenue: 8000 },
    { key: 2, month: "Feb", revenue: 12000 },
    { key: 3, month: "Mar", revenue: 9500 },
  ];

  return (
    <div className="products-dashboard-wrapper">

      {/* Top Revenue Stats */}
      <Row gutter={[20, 20]} style={{ marginBottom: 30 }}>

        <Col xs={24} sm={12} md={6}>
          <Card className="products-card revenue-card">
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              prefix="₹"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="products-card orders-card">
            <Statistic
              title="Total Orders"
              value={totalOrders}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="products-card product-card">
            <Statistic
              title="Avg Order Value"
              value={averageOrderValue}
              prefix="₹"
            />
          </Card>
        </Col>

      </Row>

      {/* Revenue by Category */}
      <Card className="products-main-card" style={{ marginBottom: 30 }}>
        <h3 className="section-title">Revenue by Category</h3>
        <Table
          dataSource={revenueByCategory}
          pagination={false}
          columns={[
            { title: "Category", dataIndex: "category", align: "left" },
            { title: "Revenue (₹)", dataIndex: "revenue", align: "left" },
          ]}
        />
      </Card>

      {/* Monthly Revenue */}
      <Card className="products-main-card">
        <h3 className="section-title">Monthly Revenue</h3>
        <Table
          dataSource={monthlyRevenue}
          pagination={false}
          columns={[
            { title: "Month", dataIndex: "month", align: "left" },
            { title: "Revenue (₹)", dataIndex: "revenue", align: "left" },
          ]}
        />
      </Card>

    </div>
  );
}


  /* ================= DASHBOARD ================= */

  return (
    <div className="products-dashboard-wrapper">

      {/* Attractive Cards */}
      <Row gutter={[20, 20]} style={{ marginBottom: 30 }}>

        <Col xs={24} sm={12} md={6}>
          <Card className="products-card product-card">
            <Statistic
              title="Total Products"
              value={totalProducts}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="products-card revenue-card">
            <Statistic
              title="Revenue"
              value={totalRevenue}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="products-card category-card">
            <Statistic
              title="Categories"
              value={totalCategories}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="products-card orders-card">
            <Statistic
              title="Orders"
              value={orders.length}
              prefix={<OrderedListOutlined />}
            />
          </Card>
        </Col>

      </Row>

      {/* Recent Orders */}
      <Card className="products-main-card">
        <h3 className="section-title">Recent Orders</h3>
        <Table
          dataSource={orders}
          pagination={false}
          columns={[
            { title: "Order ID", dataIndex: "id", align: "left" },
            { title: "Product", dataIndex: "product", align: "left" },
            { title: "Amount (₹)", dataIndex: "amount", align: "left" },
            {
              title: "Status",
              dataIndex: "status",
              align: "left",
              render: (status) =>
                status === "Delivered" ? (
                  <Tag color="green">Delivered</Tag>
                ) : (
                  <Tag color="orange">Pending</Tag>
                ),
            },
          ]}
        />
      </Card>

    </div>
  );
};

export default ProductsDashboard;
