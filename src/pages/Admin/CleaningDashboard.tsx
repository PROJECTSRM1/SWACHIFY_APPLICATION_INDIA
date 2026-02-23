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
}

const CleaningDashboard: React.FC<Props> = ({ activePage }) => {
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
    },
    {
      key: 2,
      id: "BK-02",
      customer: "Rahul",
      service: "Kitchen Cleaning",
      date: "14 Feb 2026",
      status: "Pending",
    },
    {
      key: 3,
      id: "BK-03",
      customer: "Sneha",
      service: "Bathroom Cleaning",
      date: "18 Feb 2026",
      status: "Completed",
    },
  ];

  if (activePage === "Settings" || activePage === "Logout") {
    return null;
  }

  /* CLEANERS PAGE */
  if (activePage === "Cleaners") {
    return (
      <Card className="cleaning-main-card">
        <Table
          dataSource={cleanersData}
          pagination={false}
          columns={[
            { title: "Name", dataIndex: "name", align: "left" },
            { title: "Rating", dataIndex: "rating", align: "left" },
            {
              title: "Status",
              dataIndex: "status",
              align: "left",
              render: (status) => (
                <span className="cleaning-status active">{status}</span>
              ),
            },
          ]}
        />
      </Card>
    );
  }

  /* BOOKINGS PAGE */
  if (activePage === "Bookings") {
    return (
      <Card className="cleaning-main-card">
        <Table
          dataSource={bookingsData}
          pagination={false}
          columns={[
            { title: "Booking ID", dataIndex: "id", align: "left" },
            { title: "Customer", dataIndex: "customer", align: "left" },
            { title: "Service", dataIndex: "service", align: "left" },
            { title: "Date", dataIndex: "date", align: "left" },
            {
              title: "Status",
              dataIndex: "status",
              align: "left",
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
      </Card>
    );
  }

  /* REVENUE PAGE */
  if (activePage === "Revenue") {
    return (
      <Row gutter={[20, 20]}>
        <Col xs={24} md={8}>
          <Card className="cleaning-card highlight">
            <Statistic
              title="Monthly Revenue"
              value={250000}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
      </Row>
    );
  }


return (
  <div className="cleaning-dashboard-wrapper">

    {/* STATS CARDS */}
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} md={8}>
        <Card className="cleaning-card">
          <Statistic
            title="Total Cleaners"
            value={85}
            prefix={<TeamOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8}>
        <Card className="cleaning-card">
          <Statistic
            title="Bookings"
            value={320}
            prefix={<CalendarOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8}>
        <Card className="cleaning-card highlight">
          <Statistic
            title="Revenue"
            value={250000}
            prefix={<DollarOutlined />}
          />
        </Card>
      </Col>
    </Row>

    {/* BOOKING MANAGEMENT FULL WIDTH */}
    <Row>
      <Col span={24}>
        <Card className="cleaning-main-card">
          <div className="cleaning-section-header">
            <h3>Booking Management</h3>
            <button className="cleaning-view-btn">View All</button>
          </div>

          <Table
            dataSource={bookingsData}
            pagination={false}
            columns={[
              { title: "Booking ID", dataIndex: "id", align: "left" },
              { title: "Customer", dataIndex: "customer", align: "left" },
              { title: "Service", dataIndex: "service", align: "left" },
              { title: "Date", dataIndex: "date", align: "left" },
              {
                title: "Status",
                dataIndex: "status",
                align: "left",
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
              {
                title: "Action",
                align: "left",
                render: () => (
                  <button className="cleaning-action-btn">View</button>
                ),
              },
            ]}
          />
        </Card>
      </Col>
    </Row>

  </div>
);


};

export default CleaningDashboard;
