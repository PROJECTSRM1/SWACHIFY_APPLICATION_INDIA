import React from "react";
import { Row, Col, Card, Statistic, Table, Tag } from "antd";
import {
  BuildOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import "./RawMaterialsDashboard.css";

interface Props {
  activePage: string;
  setActivePage: (page: string) => void;
}

const RawMaterialsDashboard: React.FC<Props> = ({
  activePage,
  setActivePage,
}) => {

  /* ================= DATA ================= */

  const materials = [
    { key: 1, name: "Recycled Plastic Granules", supplier: "GreenTech", price: 120, stock: 500 },
    { key: 2, name: "Organic Cotton Fabric", supplier: "EcoWeave", price: 250, stock: 300 },
    { key: 3, name: "Bamboo Sheets", supplier: "NatureSupplies", price: 180, stock: 400 },
  ];

  const suppliers = [
    { key: 1, name: "GreenTech", contact: "9876543210", materials: 5 },
    { key: 2, name: "EcoWeave", contact: "9123456780", materials: 3 },
    { key: 3, name: "NatureSupplies", contact: "9988776655", materials: 4 },
  ];

  const orders = [
    { key: 1, id: "#RM001", material: "Recycled Plastic Granules", quantity: 50, amount: 6000, status: "Delivered" },
    { key: 2, id: "#RM002", material: "Organic Cotton Fabric", quantity: 20, amount: 5000, status: "Pending" },
    { key: 3, id: "#RM003", material: "Bamboo Sheets", quantity: 30, amount: 5400, status: "Delivered" },
  ];

  const transactions = [
    { key: 1, id: "#TX001", vendor: "GreenTech", amount: 6000, date: "10 Feb 2026", status: "Completed" },
    { key: 2, id: "#TX002", vendor: "EcoWeave", amount: 5000, date: "12 Feb 2026", status: "Completed" },
    { key: 3, id: "#TX003", vendor: "NatureSupplies", amount: 5400, date: "15 Feb 2026", status: "Pending" },
  ];

  const totalRevenue = transactions.reduce((acc, t) => acc + t.amount, 0);
  const totalOrders = orders.length;
  const totalMaterials = materials.length;
  const totalSuppliers = suppliers.length;

  /* ================= COMMON WRAPPER ================= */

  const renderPage = (title: string, table: React.ReactNode) => (
    <div className="raw-page-wrapper">
      <div className="raw-section-header">
        <h3>{title}</h3>
      </div>
      <Card className="raw-main-card">
        {table}
      </Card>
    </div>
  );

  /* ================= MATERIALS ================= */

  if (activePage === "Materials") {
    return renderPage(
      "Material Management",
      <Table
        dataSource={materials}
        pagination={false}
        columns={[
          { title: "Material", dataIndex: "name" },
          { title: "Supplier", dataIndex: "supplier" },
          { title: "Price (₹)", dataIndex: "price" },
          { title: "Stock", dataIndex: "stock" },
        ]}
      />
    );
  }

  /* ================= SUPPLIERS ================= */

  if (activePage === "Suppliers") {
    return renderPage(
      "Supplier Management",
      <Table
        dataSource={suppliers}
        pagination={false}
        columns={[
          { title: "Supplier Name", dataIndex: "name" },
          { title: "Contact", dataIndex: "contact" },
          { title: "Materials Supplied", dataIndex: "materials" },
        ]}
      />
    );
  }

  /* ================= ORDERS ================= */

  if (activePage === "Orders") {
    return renderPage(
      "Order Management",
      <Table
        dataSource={orders}
        pagination={false}
        columns={[
          { title: "Order ID", dataIndex: "id" },
          { title: "Material", dataIndex: "material" },
          { title: "Quantity", dataIndex: "quantity" },
          { title: "Amount (₹)", dataIndex: "amount" },
          {
            title: "Status",
            dataIndex: "status",
            render: (status) =>
              status === "Delivered"
                ? <Tag color="green">Delivered</Tag>
                : <Tag color="orange">Pending</Tag>,
          },
        ]}
      />
    );
  }

  /* ================= REVENUE ================= */

if (activePage === "Revenue") {

  return (
    <div className="raw-dashboard-wrapper">

      <Row gutter={[20, 20]} style={{ marginBottom: 30 }}>

        <Col xs={24} sm={12} md={6}>
          <Card className="raw-stat-card revenue-card">
            <Statistic title="Total Revenue" value={totalRevenue} prefix="₹" />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="raw-stat-card order-card">
            <Statistic title="Total Orders" value={totalOrders} />
          </Card>
        </Col>

      </Row>

      {renderPage(
        "Revenue Transactions",
        <Table
          dataSource={transactions}
          pagination={false}
          columns={[
            { title: "Transaction ID", dataIndex: "id" },
            { title: "Vendor", dataIndex: "vendor" },
            { title: "Amount (₹)", dataIndex: "amount" },
            { title: "Date", dataIndex: "date" },
          ]}
        />
      )}

    </div>
  );
}

  /* ================= DASHBOARD ================= */

  return (
    <div className="raw-dashboard-wrapper">

      <Row gutter={[20, 20]} style={{ marginBottom: 30 }}>

        <Col xs={24} sm={12} md={6}>
          <Card
            className="raw-stat-card material-card"
            onClick={() => setActivePage("Materials")}
          >
            <Statistic title="Materials" value={totalMaterials} prefix={<BuildOutlined />} />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card
            className="raw-stat-card revenue-card"
            onClick={() => setActivePage("Revenue")}
          >
            <Statistic title="Revenue" value={totalRevenue} prefix={<DollarOutlined />} />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card
            className="raw-stat-card order-card"
            onClick={() => setActivePage("Orders")}
          >
            <Statistic title="Orders" value={totalOrders} prefix={<ShoppingCartOutlined />} />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card
            className="raw-stat-card supplier-card"
            onClick={() => setActivePage("Suppliers")}
          >
            <Statistic title="Suppliers" value={totalSuppliers} prefix={<TeamOutlined />} />
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
            { title: "Material", dataIndex: "material" },
            { title: "Quantity", dataIndex: "quantity" },
            { title: "Amount (₹)", dataIndex: "amount" },
            { title: "Status", dataIndex: "status" },
          ]}
        />
      )}

    </div>
  );
};

export default RawMaterialsDashboard;