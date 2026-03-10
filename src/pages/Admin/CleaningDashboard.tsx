import React from "react";
import { Row, Col, Card, Statistic, Table } from "antd";
import {
  TeamOutlined,
  CalendarOutlined,
  DollarOutlined,
} from "@ant-design/icons";

import "./CleaningDashboard.css";

interface Props {
  activePage: string;
  setActivePage: (page: string) => void;
}

const CleaningDashboard: React.FC<Props> = ({
  activePage,
  setActivePage,
}) => {

  /* ================= DATA ================= */

  const cleanersData = [
    { key: 1, name: "Ramesh", rating: 4.8, status: "Active" },
    { key: 2, name: "Suresh", rating: 4.5, status: "Active" },
  ];

  const bookingsData = [
    {
      key: 1,
      id: "BK-01",
      customer: "Anita",
      service: "Deep Cleaning",
      date: "10 Feb 2026",
      status: "Completed",
      amount: 5000,
    },
    {
      key: 2,
      id: "BK-02",
      customer: "Rahul",
      service: "Kitchen Cleaning",
      date: "14 Feb 2026",
      status: "Pending",
      amount: 3500,
    },
    {
      key: 3,
      id: "BK-03",
      customer: "Sneha",
      service: "Bathroom Cleaning",
      date: "18 Feb 2026",
      status: "Completed",
      amount: 4000,
    },
  ];

  const totalCleaners = cleanersData.length;
  const totalBookings = bookingsData.length;
  const totalRevenue = bookingsData.reduce(
    (acc, booking) => acc + booking.amount,
    0
  );

  /* ================= COMMON PAGE WRAPPER ================= */

  const renderPage = (title: string, table: React.ReactNode) => (
    <div className="cleaning-page-wrapper">
      <div className="cleaning-section-header">
        <h3>{title}</h3>
      </div>
      <Card className="cleaning-main-card">{table}</Card>
    </div>
  );

  /* ================= CLEANERS PAGE ================= */

  if (activePage === "Cleaners") {
    return renderPage(
      "Cleaner Management",
      <Table
        dataSource={cleanersData}
        pagination={false}
        columns={[
          { title: "Name", dataIndex: "name" },
          { title: "Rating", dataIndex: "rating" },
          {
            title: "Status",
            dataIndex: "status",
            render: (status) => (
              <span className="cleaning-status active">{status}</span>
            ),
          },
        ]}
      />
    );
  }

  /* ================= BOOKINGS PAGE ================= */

  if (activePage === "Bookings") {
    return renderPage(
      "Booking Management",
      <Table
        dataSource={bookingsData}
        pagination={false}
        columns={[
          { title: "Booking ID", dataIndex: "id" },
          { title: "Customer", dataIndex: "customer" },
          { title: "Service", dataIndex: "service" },
          { title: "Date", dataIndex: "date" },
          {
            title: "Status",
            dataIndex: "status",
            render: (status) => (
              <span
                className={
                  status === "Completed"
                    ? "cleaning-status active"
                    : "cleaning-status pending"
                }
              >
                {status}
              </span>
            ),
          },
        ]}
      />
    );
  }

  /* ================= REVENUE PAGE ================= */

  if (activePage === "Revenue") {
    return (
      <div className="cleaning-dashboard-wrapper">

        <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
          <Col xs={24} md={8}>
            <Card className="cleaning-stat-card revenue-card">
              <Statistic
                title="Total Revenue"
                value={totalRevenue}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {renderPage(
          "Revenue Details",
          <Table
            dataSource={bookingsData}
            pagination={false}
            columns={[
              { title: "Booking ID", dataIndex: "id" },
              { title: "Customer", dataIndex: "customer" },
              { title: "Service", dataIndex: "service" },
              { title: "Amount", dataIndex: "amount" },
              { title: "Date", dataIndex: "date" },
            ]}
          />
        )}
      </div>
    );
  }

  /* ================= DASHBOARD ================= */

  return (
    <div className="cleaning-dashboard-wrapper">

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>

        <Col xs={24} sm={12} md={8}>
          <Card
            className="cleaning-stat-card cleaners-card"
            onClick={() => setActivePage("Cleaners")}
          >
            <Statistic
              title="Total Cleaners"
              value={totalCleaners}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            className="cleaning-stat-card bookings-card"
            onClick={() => setActivePage("Bookings")}
          >
            <Statistic
              title="Total Bookings"
              value={totalBookings}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            className="cleaning-stat-card revenue-card"
            onClick={() => setActivePage("Revenue")}
          >
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>

      </Row>

      {renderPage(
        "Recent Bookings",
        <Table
          dataSource={bookingsData}
          pagination={false}
          columns={[
            { title: "Booking ID", dataIndex: "id" },
            { title: "Customer", dataIndex: "customer" },
            { title: "Service", dataIndex: "service" },
            { title: "Date", dataIndex: "date" },
          ]}
        />
      )}

    </div>
  );
};

export default CleaningDashboard;