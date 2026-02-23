import React from "react";
import { Row, Col, Card, Statistic, Table, Tag } from "antd";
import {
  BuildOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
//   TransactionOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import "./RawMaterialsDashboard.css";

interface Props {
  activePage: string;
}

const RawMaterialsDashboard: React.FC<Props> = ({ activePage }) => {

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

  if (activePage === "Settings") return null;

  /* ================= MATERIALS ================= */

  if (activePage === "Materials") {
    return (
      <Card className="raw-main-card">
        <h3 className="section-title">All Materials</h3>
        <Table
          dataSource={materials}
          pagination={false}
          columns={[
            { title: "Material", dataIndex: "name", align: "left" },
            { title: "Supplier", dataIndex: "supplier", align: "left" },
            { title: "Price (₹)", dataIndex: "price", align: "left" },
            { title: "Stock", dataIndex: "stock", align: "left" },
          ]}
        />
      </Card>
    );
  }

  /* ================= SUPPLIERS ================= */

  if (activePage === "Suppliers") {
    return (
      <Card className="raw-main-card">
        <h3 className="section-title">Suppliers</h3>
        <Table
          dataSource={suppliers}
          pagination={false}
          columns={[
            { title: "Supplier Name", dataIndex: "name", align: "left" },
            { title: "Contact", dataIndex: "contact", align: "left" },
            { title: "Materials Supplied", dataIndex: "materials", align: "left" },
          ]}
        />
      </Card>
    );
  }

  /* ================= ORDERS ================= */

  if (activePage === "Orders") {
    return (
      <Card className="raw-main-card">
        <h3 className="section-title">Orders</h3>
        <Table
          dataSource={orders}
          pagination={false}
          columns={[
            { title: "Order ID", dataIndex: "id", align: "left" },
            { title: "Material", dataIndex: "material", align: "left" },
            { title: "Quantity", dataIndex: "quantity", align: "left" },
            { title: "Amount (₹)", dataIndex: "amount", align: "left" },
            {
              title: "Status",
              dataIndex: "status",
              align: "left",
              render: (status) =>
                status === "Delivered"
                  ? <Tag color="green">Delivered</Tag>
                  : <Tag color="orange">Pending</Tag>,
            },
          ]}
        />
      </Card>
    );
  }

  /* ================= TRANSACTIONS ================= */

  if (activePage === "Transactions") {
    return (
      <Card className="raw-main-card">
        <h3 className="section-title">Transactions</h3>
        <Table
          dataSource={transactions}
          pagination={false}
          columns={[
            { title: "Transaction ID", dataIndex: "id", align: "left" },
            { title: "Vendor", dataIndex: "vendor", align: "left" },
            { title: "Amount (₹)", dataIndex: "amount", align: "left" },
            { title: "Date", dataIndex: "date", align: "left" },
            {
              title: "Status",
              dataIndex: "status",
              align: "left",
              render: (status) =>
                status === "Completed"
                  ? <Tag color="green">Completed</Tag>
                  : <Tag color="orange">Pending</Tag>,
            },
          ]}
        />
      </Card>
    );
  }

  /* ================= REVENUE ================= */

  if (activePage === "Revenue") {

    const avgOrderValue =
      totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    return (
      <div className="raw-dashboard-wrapper">

        <Row gutter={[20, 20]} style={{ marginBottom: 30 }}>

          <Col xs={24} sm={12} md={6}>
            <Card className="raw-card highlight">
              <Statistic title="Total Revenue" value={totalRevenue} prefix="₹" />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card className="raw-card order-card">
              <Statistic title="Total Orders" value={totalOrders} />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card className="raw-card material-card">
              <Statistic title="Avg Order Value" value={avgOrderValue} prefix="₹" />
            </Card>
          </Col>

        </Row>

      </div>
    );
  }

  /* ================= DASHBOARD ================= */

  return (
    <div className="raw-dashboard-wrapper">

      <Row gutter={[20, 20]} style={{ marginBottom: 30 }}>

        <Col xs={24} sm={12} md={6}>
          <Card className="raw-card material-card">
            <Statistic title="Materials" value={totalMaterials} prefix={<BuildOutlined />} />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="raw-card highlight">
            <Statistic title="Revenue" value={totalRevenue} prefix={<DollarOutlined />} />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="raw-card order-card">
            <Statistic title="Orders" value={totalOrders} prefix={<ShoppingCartOutlined />} />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="raw-card supplier-card">
            <Statistic title="Suppliers" value={totalSuppliers} prefix={<TeamOutlined />} />
          </Card>
        </Col>

      </Row>

      <Card className="raw-main-card">
        <h3 className="section-title">Recent Orders</h3>
        <Table
          dataSource={orders}
          pagination={false}
          columns={[
            { title: "Order ID", dataIndex: "id", align: "left" },
            { title: "Material", dataIndex: "material", align: "left" },
            { title: "Quantity", dataIndex: "quantity", align: "left" },
            { title: "Amount (₹)", dataIndex: "amount", align: "left" },
            { title: "Status", dataIndex: "status", align: "left" },
          ]}
        />
      </Card>

    </div>
  );
};

export default RawMaterialsDashboard;
