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
  setActivePage: (page: string) => void;
}

const ProductsDashboard: React.FC<Props> = ({
  activePage,
  setActivePage,
}) => {

  /* ================= DATA ================= */

  const products = [
    { key: 1, name: "Organic Jute Shopping Bag", category: "Entrepreneur", price: 550, rating: 4.6, stock: 30 },
    { key: 2, name: "Bamboo Toothbrush Set", category: "Sustainable", price: 800, rating: 4.6, stock: 45 },
    { key: 3, name: "Recycled Paper Notebooks", category: "Recycled", price: 450, rating: 4.3, stock: 50 },
    { key: 4, name: "Reusable Beeswax Wraps", category: "Sustainable", price: 650, rating: 4.5, stock: 35 },
    { key: 5, name: "Eco-Friendly Cleaning Kit", category: "Cleaners", price: 1200, rating: 4.7, stock: 20 },
  ];

  const orders = [
    { key: 1, id: "#SW001", product: "Organic Jute Shopping Bag", amount: 550, status: "Delivered" },
    { key: 2, id: "#SW002", product: "Bamboo Toothbrush Set", amount: 800, status: "Pending" },
    { key: 3, id: "#SW003", product: "Eco-Friendly Cleaning Kit", amount: 1200, status: "Delivered" },
  ];

  const totalProducts = products.length;
  const totalRevenue = orders.reduce((acc, o) => acc + o.amount, 0);
  const totalCategories = new Set(products.map(p => p.category)).size;
  const totalOrders = orders.length;

  /* ================= COMMON WRAPPER ================= */

  const renderPage = (title: string, table: React.ReactNode) => (
    <div className="products-page-wrapper">
      <div className="products-section-header">
        <h3>{title}</h3>
      </div>
      <Card className="products-main-card">
        {table}
      </Card>
    </div>
  );

  /* ================= PRODUCTS PAGE ================= */

  if (activePage === "Products") {
    return renderPage(
      "Product Management",
      <Table
        dataSource={products}
        pagination={false}
        columns={[
          { title: "Product Name", dataIndex: "name" },
          { title: "Category", dataIndex: "category" },
          { title: "Price (₹)", dataIndex: "price" },
          { title: "Rating", dataIndex: "rating" },
          { title: "Stock", dataIndex: "stock" },
        ]}
      />
    );
  }

  /* ================= ORDERS PAGE ================= */

  if (activePage === "Orders") {
    return renderPage(
      "Order Management",
      <Table
        dataSource={orders}
        pagination={false}
        columns={[
          { title: "Order ID", dataIndex: "id" },
          { title: "Product", dataIndex: "product" },
          { title: "Amount (₹)", dataIndex: "amount" },
          {
            title: "Status",
            dataIndex: "status",
            render: (status) =>
              status === "Delivered" ? (
                <Tag color="green">Delivered</Tag>
              ) : (
                <Tag color="orange">Pending</Tag>
              ),
          },
        ]}
      />
    );
  }

  /* ================= REVENUE PAGE ================= */

  if (activePage === "Revenue") {
    return (
      <div className="products-dashboard-wrapper">

        <Row gutter={[20, 20]} style={{ marginBottom: 30 }}>
          <Col xs={24} sm={12} md={6}>
            <Card className="products-stat-card revenue-card">
              <Statistic title="Total Revenue" value={totalRevenue} prefix="₹" />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card className="products-stat-card orders-card">
              <Statistic title="Total Orders" value={totalOrders} />
            </Card>
          </Col>
        </Row>

        {renderPage(
          "Revenue Details",
          <Table
            dataSource={orders}
            pagination={false}
            columns={[
              { title: "Order ID", dataIndex: "id" },
              { title: "Product", dataIndex: "product" },
              { title: "Amount (₹)", dataIndex: "amount" },
            ]}
          />
        )}
      </div>
    );
  }

  /* ================= DASHBOARD ================= */

  return (
    <div className="products-dashboard-wrapper">

      <Row gutter={[20, 20]} style={{ marginBottom: 30 }}>

        <Col xs={24} sm={12} md={6}>
          <Card
            className="products-stat-card product-card"
            onClick={() => setActivePage("Products")}
          >
            <Statistic
              title="Total Products"
              value={totalProducts}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card
            className="products-stat-card revenue-card"
            onClick={() => setActivePage("Revenue")}
          >
            <Statistic
              title="Revenue"
              value={totalRevenue}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="products-stat-card category-card">
            <Statistic
              title="Categories"
              value={totalCategories}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card
            className="products-stat-card orders-card"
            onClick={() => setActivePage("Orders")}
          >
            <Statistic
              title="Orders"
              value={totalOrders}
              prefix={<OrderedListOutlined />}
            />
          </Card>
        </Col>

      </Row>

      {renderPage(
        "Recent Orders",
        <Table
          dataSource={orders}
          pagination={false}
          columns={[
            { title: "Order ID", dataIndex: "id" },
            { title: "Product", dataIndex: "product" },
            { title: "Amount (₹)", dataIndex: "amount" },
            {
              title: "Status",
              dataIndex: "status",
              render: (status) =>
                status === "Delivered" ? (
                  <Tag color="green">Delivered</Tag>
                ) : (
                  <Tag color="orange">Pending</Tag>
                ),
            },
          ]}
        />
      )}

    </div>
  );
};

export default ProductsDashboard;