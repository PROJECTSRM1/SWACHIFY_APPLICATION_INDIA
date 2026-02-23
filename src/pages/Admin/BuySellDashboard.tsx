import React from "react";
import { Row, Col, Card, Statistic, Table, Tag } from "antd";
import {
  HomeOutlined,
  DollarOutlined,
  FileDoneOutlined,
  TransactionOutlined,
} from "@ant-design/icons";

import "./BuySellDashboard.css";

interface Props {
  activePage: string;
}

const BuySellDashboard: React.FC<Props> = ({ activePage }) => {

  /* ================= DATA ================= */

  const properties = [
    { key: 1, title: "2BHK Apartment", location: "Hyderabad", price: 5500000, status: "Available" },
    { key: 2, title: "Villa in Gachibowli", location: "Hyderabad", price: 12500000, status: "Sold" },
    { key: 3, title: "3BHK Flat", location: "Bangalore", price: 7800000, status: "Available" },
  ];

  const deals = [
    { key: 1, id: "#DL001", property: "2BHK Apartment", amount: 5500000, status: "Closed" },
    { key: 2, id: "#DL002", property: "Villa in Gachibowli", amount: 12500000, status: "Closed" },
    { key: 3, id: "#DL003", property: "3BHK Flat", amount: 7800000, status: "Pending" },
  ];

  const transactions = [
    {
      key: 1,
      id: "#TXN001",
      client: "Ramesh",
      property: "2BHK Apartment",
      amount: 5500000,
      date: "12 Feb 2026",
      status: "Completed",
    },
    {
      key: 2,
      id: "#TXN002",
      client: "Suresh",
      property: "Villa in Gachibowli",
      amount: 12500000,
      date: "15 Feb 2026",
      status: "Completed",
    },
    {
      key: 3,
      id: "#TXN003",
      client: "Anita",
      property: "3BHK Flat",
      amount: 7800000,
      date: "18 Feb 2026",
      status: "Pending",
    },
  ];

  const totalProperties = properties.length;
  const totalDeals = deals.length;
  const totalRevenue = transactions.reduce((acc, t) => acc + t.amount, 0);

  /* ================= SETTINGS ================= */
  if (activePage === "Settings") return null;

  /* ================= PROPERTIES ================= */
  if (activePage === "Properties") {
    return (
      <Card className="buysell-main-card">
        <h3 className="section-title">All Properties</h3>
        <Table
          dataSource={properties}
          pagination={false}
          columns={[
            { title: "Property", dataIndex: "title", align: "left" },
            { title: "Location", dataIndex: "location", align: "left" },
            { title: "Price (₹)", dataIndex: "price", align: "left" },
            {
              title: "Status",
              dataIndex: "status",
              align: "left",
              render: (status) =>
                status === "Sold"
                  ? <Tag color="red">Sold</Tag>
                  : <Tag color="green">Available</Tag>,
            },
          ]}
        />
      </Card>
    );
  }

  /* ================= DEALS ================= */
  if (activePage === "Deals") {
    return (
      <Card className="buysell-main-card">
        <h3 className="section-title">Deals</h3>
        <Table
          dataSource={deals}
          pagination={false}
          columns={[
            { title: "Deal ID", dataIndex: "id", align: "left" },
            { title: "Property", dataIndex: "property", align: "left" },
            { title: "Amount (₹)", dataIndex: "amount", align: "left" },
            {
              title: "Status",
              dataIndex: "status",
              align: "left",
              render: (status) =>
                status === "Closed"
                  ? <Tag color="green">Closed</Tag>
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
      <Card className="buysell-main-card">
        <h3 className="section-title">Transactions</h3>
        <Table
          dataSource={transactions}
          pagination={false}
          columns={[
            { title: "Transaction ID", dataIndex: "id", align: "left" },
            { title: "Client", dataIndex: "client", align: "left" },
            { title: "Property", dataIndex: "property", align: "left" },
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

  const totalTransactions = transactions.length;
  const avgDealValue =
    totalTransactions > 0
      ? Math.round(totalRevenue / totalTransactions)
      : 0;

  const monthlyRevenue = [
    { key: 1, month: "Jan", revenue: 8500000 },
    { key: 2, month: "Feb", revenue: 9200000 },
    { key: 3, month: "Mar", revenue: 7800000 },
  ];

  const revenueByProperty = [
    { key: 1, type: "Apartments", revenue: 13300000 },
    { key: 2, type: "Villas", revenue: 12500000 },
    { key: 3, type: "Flats", revenue: 7800000 },
  ];

  const thisMonthRevenue = 9200000;

  const topProperty = "Villa in Gachibowli";

  return (
    <div className="buysell-dashboard-wrapper">

      {/* TOP ANALYTICS CARDS */}
      <Row gutter={[20, 20]} style={{ marginBottom: 30 }}>

        <Col xs={24} sm={12} md={6}>
          <Card className="buysell-card highlight">
            <Statistic title="Total Revenue" value={totalRevenue} prefix="₹" />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="buysell-card deal-card">
            <Statistic title="Total Transactions" value={totalTransactions} />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="buysell-card property-card">
            <Statistic title="Avg Deal Value" value={avgDealValue} prefix="₹" />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="buysell-card transaction-card">
            <Statistic title="This Month Revenue" value={thisMonthRevenue} prefix="₹" />
          </Card>
        </Col>

      </Row>

      {/* REVENUE BY PROPERTY TYPE */}
      <Card className="buysell-main-card" style={{ marginBottom: 30 }}>
        <h3 className="section-title">Revenue by Property Type</h3>
        <Table
          dataSource={revenueByProperty}
          pagination={false}
          columns={[
            { title: "Property Type", dataIndex: "type", align: "left" },
            { title: "Revenue (₹)", dataIndex: "revenue", align: "left" },
          ]}
        />
      </Card>

      {/* MONTHLY REVENUE */}
      <Card className="buysell-main-card" style={{ marginBottom: 30 }}>
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

      {/* TOP PERFORMING PROPERTY */}
      <Card className="buysell-main-card">
        <h3 className="section-title">Top Performing Property</h3>
        <p style={{ fontSize: "16px", fontWeight: 500 }}>
          🏆 {topProperty}
        </p>
      </Card>

    </div>
  );
}


  /* ================= DASHBOARD ================= */

  return (
    <div className="buysell-dashboard-wrapper">

      <Row gutter={[20, 20]} style={{ marginBottom: 30 }}>

        <Col xs={24} sm={12} md={6}>
          <Card className="buysell-card property-card">
            <Statistic
              title="Properties Listed"
              value={totalProperties}
              prefix={<HomeOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="buysell-card highlight">
            <Statistic
              title="Revenue"
              value={totalRevenue}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="buysell-card deal-card">
            <Statistic
              title="Deals"
              value={totalDeals}
              prefix={<FileDoneOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card className="buysell-card transaction-card">
            <Statistic
              title="Transactions"
              value={transactions.length}
              prefix={<TransactionOutlined />}
            />
          </Card>
        </Col>

      </Row>

      {/* Recent Transactions */}
      <Card className="buysell-main-card">
        <h3 className="section-title">Recent Transactions</h3>
        <Table
          dataSource={transactions}
          pagination={false}
          columns={[
            { title: "Transaction ID", dataIndex: "id", align: "left" },
            { title: "Client", dataIndex: "client", align: "left" },
            { title: "Property", dataIndex: "property", align: "left" },
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

    </div>
  );
};

export default BuySellDashboard;
