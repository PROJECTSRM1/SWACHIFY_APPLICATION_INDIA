import React from "react";
import { Row, Col, Card, Statistic, Table } from "antd";
import {
  BookOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";

import "./EducationDashboard.css";

interface Props {
  activePage: string;
  setActivePage: (page: string) => void;
}

const EducationDashboard: React.FC<Props> = ({
  activePage,
  setActivePage,
}) => {

  /* ================= DATA ================= */

  const coursesData = [
    { key: 1, name: "React Course", students: 120, revenue: 120000 },
    { key: 2, name: "Java Course", students: 90, revenue: 90000 },
    { key: 3, name: "Python Course", students: 150, revenue: 150000 },
  ];

  const studentsData = [
    { key: 1, name: "Anita", course: "React Course", fee: 1000 },
    { key: 2, name: "Rahul", course: "Java Course", fee: 1000 },
    { key: 3, name: "Sneha", course: "Python Course", fee: 1000 },
  ];

  const totalCourses = coursesData.length;
  const totalStudents = studentsData.length;
  const totalRevenue = coursesData.reduce((acc, c) => acc + c.revenue, 0);

  /* ================= COMMON PAGE WRAPPER ================= */

  const renderPage = (title: string, table: React.ReactNode) => (
    <div className="education-page-wrapper">
      <div className="education-section-header">
        <h3>{title}</h3>
      </div>
      <Card className="education-main-card">
        {table}
      </Card>
    </div>
  );

  /* ================= COURSES PAGE ================= */

  if (activePage === "Courses") {
    return renderPage(
      "Course Management",
      <Table
        dataSource={coursesData}
        pagination={false}
        scroll={{ x: "max-content" }}
        columns={[
          { title: "Course Name", dataIndex: "name" },
          { title: "Students", dataIndex: "students" },
          { title: "Revenue", dataIndex: "revenue" },
        ]}
      />
    );
  }

  /* ================= STUDENTS PAGE ================= */

  if (activePage === "Students") {
    return renderPage(
      "Student Management",
      <Table
        dataSource={studentsData}
        pagination={false}
        scroll={{ x: "max-content" }}
        columns={[
          { title: "Student Name", dataIndex: "name" },
          { title: "Course", dataIndex: "course" },
          { title: "Fee Paid", dataIndex: "fee" },
        ]}
      />
    );
  }

  /* ================= REVENUE PAGE ================= */

  if (activePage === "Revenue") {
    return (
      <div className="education-dashboard-wrapper">

        <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
          <Col xs={24} md={8}>
            <Card className="education-stat-card revenue-card">
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
            dataSource={coursesData}
            pagination={false}
            columns={[
              { title: "Course Name", dataIndex: "name" },
              { title: "Students", dataIndex: "students" },
              { title: "Revenue", dataIndex: "revenue" },
            ]}
          />
        )}
      </div>
    );
  }

  /* ================= DASHBOARD ================= */

  return (
    <div className="education-dashboard-wrapper">

      {/* STAT CARDS */}
      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>

        <Col xs={24} sm={12} md={8}>
          <Card
            className="education-stat-card courses-card"
            onClick={() => setActivePage("Courses")}
          >
            <Statistic
              title="Total Courses"
              value={totalCourses}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            className="education-stat-card students-card"
            onClick={() => setActivePage("Students")}
          >
            <Statistic
              title="Total Students"
              value={totalStudents}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            className="education-stat-card revenue-card"
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

      {/* STUDENT MANAGEMENT PREVIEW */}
      {renderPage(
        "Recent Students",
        <Table
          dataSource={studentsData}
          pagination={false}
          columns={[
            { title: "Student Name", dataIndex: "name" },
            { title: "Course", dataIndex: "course" },
            { title: "Fee Paid", dataIndex: "fee" },
          ]}
        />
      )}

    </div>
  );
};

export default EducationDashboard;