import React from "react";
import { Row, Col, Card, Statistic, Table } from "antd";
import {
  CarOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";

import "./JustRideDashboard.css";

interface Props {
  activePage: string;
  setActivePage?: (page: string) => void;
}

const JustRideDashboard: React.FC<Props> = ({
  activePage,
  setActivePage,
}) => {

  /* ================= DATA ================= */

  const driversData = [
    { key: 1, name: "Ramesh", vehicle: "Swift", rides: 120 },
    { key: 2, name: "Suresh", vehicle: "Innova", rides: 95 },
    { key: 3, name: "Anil", vehicle: "Dzire", rides: 140 },
  ];

  const ridesData = [
    { key: 1, rider: "Anita", driver: "Ramesh", fare: 450, status: "Completed" },
    { key: 2, rider: "Rahul", driver: "Suresh", fare: 600, status: "Completed" },
    { key: 3, rider: "Sneha", driver: "Anil", fare: 300, status: "Pending" },
  ];

  const totalDrivers = driversData.length;
const totalRides = ridesData.length;
const totalRevenue = ridesData.reduce((acc, r) => acc + r.fare, 0);

  /* ================= COMMON PAGE WRAPPER ================= */

  const renderPage = (title: string, table: React.ReactNode) => (
    <div className="ride-page-wrapper">
      <div className="ride-section-header">
        <h3>{title}</h3>
      </div>

      <Card className="ride-main-card">
        {table}
      </Card>
    </div>
  );

  /* ================= DRIVERS PAGE ================= */

  if (activePage === "Drivers") {
    return renderPage(
      "Driver Management",
      <Table
        dataSource={driversData}
        pagination={false}
        scroll={{ x: "max-content" }}
        columns={[
          { title: "Driver Name", dataIndex: "name" },
          { title: "Vehicle", dataIndex: "vehicle" },
          { title: "Total Rides", dataIndex: "rides" },
        ]}
      />
    );
  }

  /* ================= RIDES PAGE ================= */

  if (activePage === "Rides") {
    return renderPage(
      "Ride Management",
      <Table
        dataSource={ridesData}
        pagination={false}
        scroll={{ x: "max-content" }}
        columns={[
          { title: "Rider", dataIndex: "rider" },
          { title: "Driver", dataIndex: "driver" },
          { title: "Fare", dataIndex: "fare" },
          { title: "Status", dataIndex: "status" },
        ]}
      />
    );
  }

  /* ================= REVENUE PAGE ================= */

  if (activePage === "Revenue") {
    return (
      <div className="ride-dashboard-wrapper">

        <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
          <Col xs={24} md={8}>
            <Card className="ride-stat-card revenue-card">
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
            dataSource={ridesData}
            pagination={false}
            scroll={{ x: "max-content" }}
            columns={[
              { title: "Rider", dataIndex: "rider" },
              { title: "Driver", dataIndex: "driver" },
              { title: "Fare", dataIndex: "fare" },
              { title: "Status", dataIndex: "status" },
            ]}
          />
        )}
      </div>
    );
  }

  /* ================= DASHBOARD ================= */

  return (
    <div className="ride-dashboard-wrapper">

      {/* STAT CARDS */}
      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>

        <Col xs={24} sm={12} md={8}>
          <Card
            className="ride-stat-card drivers-card"
            onClick={() => setActivePage?.("Drivers")}
          >
            <Statistic
              title="Total Drivers"
              value={totalDrivers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            className="ride-stat-card rides-card"
            onClick={() => setActivePage?.("Rides")}
          >
            <Statistic
              title="Total Rides"
              value={totalRides}
              prefix={<CarOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            className="ride-stat-card revenue-card"
            onClick={() => setActivePage?.("Revenue")}
          >
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>

      </Row>

      {/* RECENT RIDES */}
      {renderPage(
        "Recent Rides",
        <Table
          dataSource={ridesData}
          pagination={false}
          scroll={{ x: "max-content" }}
          columns={[
            { title: "Rider", dataIndex: "rider" },
            { title: "Driver", dataIndex: "driver" },
            { title: "Fare", dataIndex: "fare" },
            { title: "Status", dataIndex: "status" },
          ]}
        />
      )}

    </div>
  );
};

export default JustRideDashboard;