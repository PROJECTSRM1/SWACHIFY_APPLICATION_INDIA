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
}

const JustRideDashboard: React.FC<Props> = ({ activePage }) => {

  /* ================= MOCK DATA ================= */

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
  const totalRides = driversData.reduce((acc, d) => acc + d.rides, 0);
  const totalRevenue = ridesData.reduce((acc, r) => acc + r.fare, 0);

  /* ================= DRIVERS PAGE ================= */

  if (activePage === "Drivers") {
    return (
      <Card className="ride-main-card">
        <Table
          dataSource={driversData}
          pagination={false}
          columns={[
            { title: "Driver Name", dataIndex: "name", align: "left" },
            { title: "Vehicle", dataIndex: "vehicle", align: "left" },
            { title: "Total Rides", dataIndex: "rides", align: "left" },
          ]}
        />
      </Card>
    );
  }

  /* ================= RIDES PAGE ================= */

  if (activePage === "Rides") {
    return (
      <Card className="ride-main-card">
        <Table
          dataSource={ridesData}
          pagination={false}
          columns={[
            { title: "Rider", dataIndex: "rider", align: "left" },
            { title: "Driver", dataIndex: "driver", align: "left" },
            { title: "Fare", dataIndex: "fare", align: "left" },
            { title: "Status", dataIndex: "status", align: "left" },
          ]}
        />
      </Card>
    );
  }

  /* ================= REVENUE PAGE ================= */

  if (activePage === "Revenue") {
    return (
      <div className="ride-dashboard-wrapper">

        <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
          <Col xs={24} md={8}>
            <Card className="ride-card highlight">
              <Statistic
                title="Total Revenue"
                value={totalRevenue}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Card className="ride-main-card">
          <Table
            dataSource={ridesData}
            pagination={false}
            columns={[
              { title: "Rider", dataIndex: "rider", align: "left" },
              { title: "Driver", dataIndex: "driver", align: "left" },
              { title: "Fare", dataIndex: "fare", align: "left" },
              { title: "Status", dataIndex: "status", align: "left" },
            ]}
          />
        </Card>

      </div>
    );
  }

  /* ================= DASHBOARD ================= */

  if (activePage === "Dashboard") {
    return (
      <div className="ride-dashboard-wrapper">

        {/* Stats */}
        <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={8}>
            <Card className="ride-card">
              <Statistic
                title="Total Drivers"
                value={totalDrivers}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card className="ride-card">
              <Statistic
                title="Total Rides"
                value={totalRides}
                prefix={<CarOutlined />}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card className="ride-card highlight">
              <Statistic
                title="Revenue"
                value={totalRevenue}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Recent Rides */}
        <Card className="ride-main-card">
          <div className="ride-section-header">
            <h3>Recent Rides</h3>
          </div>

          <Table
            dataSource={ridesData}
            pagination={false}
            columns={[
              { title: "Rider", dataIndex: "rider", align: "left" },
              { title: "Driver", dataIndex: "driver", align: "left" },
              { title: "Fare", dataIndex: "fare", align: "left" },
              { title: "Status", dataIndex: "status", align: "left" },
            ]}
          />
        </Card>

      </div>
    );
  }

  return null;
};

export default JustRideDashboard;
