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
  setActivePage: (page: string) => void;
}

const BuySellDashboard: React.FC<Props> = ({
  activePage,
  setActivePage,
}) => {

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
    { key: 1, id: "#TXN001", client: "Ramesh", property: "2BHK Apartment", amount: 5500000, date: "12 Feb 2026", status: "Completed" },
    { key: 2, id: "#TXN002", client: "Suresh", property: "Villa in Gachibowli", amount: 12500000, date: "15 Feb 2026", status: "Completed" },
    { key: 3, id: "#TXN003", client: "Anita", property: "3BHK Flat", amount: 7800000, date: "18 Feb 2026", status: "Pending" },
  ];

  const totalProperties = properties.length;
  const totalDeals = deals.length;
  const totalTransactions = transactions.length;
  const totalRevenue = transactions.reduce((acc, t) => acc + t.amount, 0);

  /* ================= COMMON PAGE WRAPPER ================= */

  const renderPage = (title: string, table: React.ReactNode) => (
    <div className="buysell-page-wrapper">
      <div className="buysell-section-header">
        <h3>{title}</h3>
      </div>
      <Card className="buysell-main-card">
        {table}
      </Card>
    </div>
  );

  /* ================= PROPERTIES ================= */

  if (activePage === "Properties") {
    return renderPage(
      "Property Management",
      <Table
        dataSource={properties}
        pagination={false}
        columns={[
          { title: "Property", dataIndex: "title" },
          { title: "Location", dataIndex: "location" },
          { title: "Price (₹)", dataIndex: "price" },
          {
            title: "Status",
            dataIndex: "status",
            render: (status) =>
              status === "Sold"
                ? <Tag color="red">Sold</Tag>
                : <Tag color="green">Available</Tag>,
          },
        ]}
      />
    );
  }

  /* ================= DEALS ================= */

  if (activePage === "Deals") {
    return renderPage(
      "Deal Management",
      <Table
        dataSource={deals}
        pagination={false}
        columns={[
          { title: "Deal ID", dataIndex: "id" },
          { title: "Property", dataIndex: "property" },
          { title: "Amount (₹)", dataIndex: "amount" },
          {
            title: "Status",
            dataIndex: "status",
            render: (status) =>
              status === "Closed"
                ? <Tag color="green">Closed</Tag>
                : <Tag color="orange">Pending</Tag>,
          },
        ]}
      />
    );
  }

  /* ================= TRANSACTIONS ================= */

  if (activePage === "Transactions") {
    return renderPage(
      "Transaction Management",
      <Table
        dataSource={transactions}
        pagination={false}
        columns={[
          { title: "Transaction ID", dataIndex: "id" },
          { title: "Client", dataIndex: "client" },
          { title: "Property", dataIndex: "property" },
          { title: "Amount (₹)", dataIndex: "amount" },
          { title: "Date", dataIndex: "date" },
          {
            title: "Status",
            dataIndex: "status",
            render: (status) =>
              status === "Completed"
                ? <Tag color="green">Completed</Tag>
                : <Tag color="orange">Pending</Tag>,
          },
        ]}
      />
    );
  }

  /* ================= REVENUE ================= */

  if (activePage === "Revenue") {
    return (
      <div className="buysell-dashboard-wrapper">

        <Row gutter={[20, 20]} style={{ marginBottom: 30 }}>
          <Col xs={24} sm={12} md={6}>
            <Card className="buysell-stat-card revenue-card">
              <Statistic title="Total Revenue" value={totalRevenue} prefix="₹" />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card className="buysell-stat-card transaction-card">
              <Statistic title="Total Transactions" value={totalTransactions} />
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
              { title: "Client", dataIndex: "client" },
              { title: "Amount (₹)", dataIndex: "amount" },
            ]}
          />
        )}
      </div>
    );
  }

  /* ================= DASHBOARD ================= */

  return (
    <div className="buysell-dashboard-wrapper">

      <Row gutter={[20, 20]} style={{ marginBottom: 30 }}>

        <Col xs={24} sm={12} md={6}>
          <Card
            className="buysell-stat-card property-card"
            onClick={() => setActivePage("Properties")}
          >
            <Statistic
              title="Properties Listed"
              value={totalProperties}
              prefix={<HomeOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card
            className="buysell-stat-card revenue-card"
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
          <Card
            className="buysell-stat-card deal-card"
            onClick={() => setActivePage("Deals")}
          >
            <Statistic
              title="Deals"
              value={totalDeals}
              prefix={<FileDoneOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card
            className="buysell-stat-card transaction-card"
            onClick={() => setActivePage("Transactions")}
          >
            <Statistic
              title="Transactions"
              value={totalTransactions}
              prefix={<TransactionOutlined />}
            />
          </Card>
        </Col>

      </Row>

      {renderPage(
        "Recent Transactions",
        <Table
          dataSource={transactions}
          pagination={false}
          columns={[
            { title: "Transaction ID", dataIndex: "id" },
            { title: "Client", dataIndex: "client" },
            { title: "Property", dataIndex: "property" },
            { title: "Amount (₹)", dataIndex: "amount" },
            { title: "Date", dataIndex: "date" },
          ]}
        />
      )}

    </div>
  );
};

export default BuySellDashboard;