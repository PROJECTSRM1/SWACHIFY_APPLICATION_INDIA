import React from "react";
import { Row, Col, Card, Statistic, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  UserOutlined,
  BankOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import "./HealthcareDashboard.css";

interface Props {
  activePage: string;
  setActivePage?: (page: string) => void;
}

/* ================= TYPES ================= */

interface Doctor {
  key: number;
  name: string;
  specialization: string;
  status: string;
}

interface Hospital {
  key: number;
  name: string;
  location: string;
  beds: number;
}

interface Claim {
  key: number;
  claimId: string;
  patient: string;
  amount: string;
  status: string;
}

interface Report {
  key: number;
  reportId: string;
  patient: string;
  type: string;
}

const HealthcareDashboard: React.FC<Props> = ({
  activePage,
  setActivePage,
}) => {

  /* ================= DATA ================= */

  const doctorsData: Doctor[] = [
    { key: 1, name: "Dr. Kumar", specialization: "Cardiology", status: "Active" },
    { key: 2, name: "Dr. Reddy", specialization: "Dental", status: "Active" },
    { key: 3, name: "Dr. Sharma", specialization: "Neurology", status: "Inactive" },
    { key: 4, name: "Dr. Meena", specialization: "Orthopedic", status: "Active" },
    { key: 5, name: "Dr. Ajay", specialization: "Pediatrics", status: "Active" },
  ];

  const hospitalsData: Hospital[] = [
    { key: 1, name: "Apollo Hospital", location: "Hyderabad", beds: 250 },
    { key: 2, name: "Care Hospital", location: "Vijayawada", beds: 180 },
    { key: 3, name: "Yashoda Hospital", location: "Secunderabad", beds: 300 },
    { key: 4, name: "Rainbow Hospital", location: "Gachibowli", beds: 150 },
  ];

  const claimsData: Claim[] = [
    { key: 1, claimId: "CLM-001", patient: "Rahul", amount: "₹25,000", status: "Approved" },
    { key: 2, claimId: "CLM-002", patient: "Sneha", amount: "₹18,000", status: "Pending" },
    { key: 3, claimId: "CLM-003", patient: "Amit", amount: "₹40,000", status: "Approved" },
    { key: 4, claimId: "CLM-004", patient: "Priya", amount: "₹12,000", status: "Rejected" },
  ];

  const reportsData: Report[] = [
    { key: 1, reportId: "REP-001", patient: "Rahul", type: "Blood Test" },
    { key: 2, reportId: "REP-002", patient: "Sneha", type: "MRI Scan" },
    { key: 3, reportId: "REP-003", patient: "Amit", type: "X-Ray" },
    { key: 4, reportId: "REP-004", patient: "Priya", type: "CT Scan" },
  ];

  /* ================= TABLE COLUMNS ================= */

  const doctorColumns: ColumnsType<Doctor> = [
    { title: "Name", dataIndex: "name" },
    { title: "Specialization", dataIndex: "specialization" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <span className={`status-badge ${status === "Active" ? "active" : "inactive"}`}>
          {status}
        </span>
      ),
    },
  ];

  const hospitalColumns: ColumnsType<Hospital> = [
    { title: "Hospital Name", dataIndex: "name" },
    { title: "Location", dataIndex: "location" },
    { title: "Total Beds", dataIndex: "beds" },
  ];

  const claimColumns: ColumnsType<Claim> = [
    { title: "Claim ID", dataIndex: "claimId" },
    { title: "Patient", dataIndex: "patient" },
    { title: "Amount", dataIndex: "amount" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <span className={`status-badge ${status === "Approved" ? "active" : "inactive"}`}>
          {status}
        </span>
      ),
    },
  ];

  const reportColumns: ColumnsType<Report> = [
    { title: "Report ID", dataIndex: "reportId" },
    { title: "Patient", dataIndex: "patient" },
    { title: "Report Type", dataIndex: "type" },
  ];

  /* ================= PAGE RENDERERS ================= */

  const renderPage = (title: string, table: React.ReactNode) => (
    <div className="healthcare-page-wrapper">
      <div className="healthcare-section-header">
        <h3>{title}</h3>
      </div>
      <Card className="healthcare-main-card">
        {table}
      </Card>
    </div>
  );

  /* ================= DASHBOARD ================= */

 const renderDashboard = () => (
  <div className="healthcare-dashboard-wrapper">

    {/* STAT CARDS */}
    <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} md={6}>
        <Card
          className="healthcare-stat-card doctors-card"
          onClick={() => setActivePage?.("Doctors")}
        >
          <Statistic
            title="Doctors"
            value={doctorsData.length}
            prefix={<UserOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card
          className="healthcare-stat-card hospitals-card"
          onClick={() => setActivePage?.("Hospitals")}
        >
          <Statistic
            title="Hospitals"
            value={hospitalsData.length}
            prefix={<BankOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card
          className="healthcare-stat-card claims-card"
          onClick={() => setActivePage?.("Medical Claims")}
        >
          <Statistic
            title="Medical Claims"
            value={claimsData.length}
            prefix={<CalendarOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card
          className="healthcare-stat-card reports-card"
          onClick={() => setActivePage?.("Medical Reports")}
        >
          <Statistic
            title="Medical Reports"
            value={reportsData.length}
            prefix={<FileTextOutlined />}
          />
        </Card>
      </Col>
    </Row>

    {/* ONLY DOCTOR MANAGEMENT */}
    {renderPage(
      "Doctor Management",
      <Table<Doctor>
        pagination={false}
        scroll={{ x: "max-content" }}
        dataSource={doctorsData}
        columns={doctorColumns}
      />
    )}

  </div>
);

  return (
    <div className="healthcare-wrapper">
      <div className="healthcare-container">

        {activePage === "Dashboard" && renderDashboard()}
        {activePage === "Doctors" &&
          renderPage("Doctor Management",
            <Table<Doctor> pagination={false} scroll={{ x: "max-content" }}
              dataSource={doctorsData} columns={doctorColumns} />
          )}

        {activePage === "Hospitals" &&
          renderPage("Hospital Management",
            <Table<Hospital> pagination={false} scroll={{ x: "max-content" }}
              dataSource={hospitalsData} columns={hospitalColumns} />
          )}

        {activePage === "Medical Claims" &&
          renderPage("Medical Claims Management",
            <Table<Claim> pagination={false} scroll={{ x: "max-content" }}
              dataSource={claimsData} columns={claimColumns} />
          )}

        {activePage === "Medical Reports" &&
          renderPage("Medical Reports Management",
            <Table<Report> pagination={false} scroll={{ x: "max-content" }}
              dataSource={reportsData} columns={reportColumns} />
          )}

      </div>
    </div>
  );
};

export default HealthcareDashboard;