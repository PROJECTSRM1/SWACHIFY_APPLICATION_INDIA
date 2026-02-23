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
}

const EducationDashboard: React.FC<Props> = ({ activePage }) => {

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
  const totalStudents = coursesData.reduce((acc, c) => acc + c.students, 0);
  const totalRevenue = coursesData.reduce((acc, c) => acc + c.revenue, 0);

  /* ================= COURSES PAGE ================= */

  if (activePage === "Courses") {
    return (
      <Card className="education-main-card">
        <Table
          dataSource={coursesData}
          pagination={false}
          columns={[
            { title: "Course Name", dataIndex: "name", align: "left" },
            { title: "Students", dataIndex: "students", align: "left" },
            { title: "Revenue", dataIndex: "revenue", align: "left" },
          ]}
        />
      </Card>
    );
  }

  /* ================= STUDENTS PAGE ================= */

  if (activePage === "Students") {
    return (
      <Card className="education-main-card">
        <Table
          dataSource={studentsData}
          pagination={false}
          columns={[
            { title: "Student Name", dataIndex: "name", align: "left" },
            { title: "Course", dataIndex: "course", align: "left" },
            { title: "Fee Paid", dataIndex: "fee", align: "left" },
          ]}
        />
      </Card>
    );
  }

  /* ================= REVENUE PAGE ================= */

  if (activePage === "Revenue") {
    return (
      <div className="education-dashboard-wrapper">

        <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
          <Col xs={24} md={8}>
            <Card className="education-card highlight">
              <Statistic
                title="Total Revenue"
                value={totalRevenue}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Card className="education-main-card">
          <div className="education-section-header">
            <h3>Revenue by Course</h3>
          </div>

          <Table
            dataSource={coursesData}
            pagination={false}
            columns={[
              { title: "Course Name", dataIndex: "name", align: "left" },
              { title: "Students", dataIndex: "students", align: "left" },
              { title: "Revenue", dataIndex: "revenue", align: "left" },
            ]}
          />
        </Card>

      </div>
    );
  }

  
/* ================= DEFAULT DASHBOARD ================= */

if (activePage === "Dashboard") {
  return (
    <div className="education-dashboard-wrapper">

      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={12}>
          <Card className="education-card">
            <Statistic
              title="Total Courses"
              value={totalCourses}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={12}>
          <Card className="education-card">
            <Statistic
              title="Total Students"
              value={totalStudents}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card className="education-main-card">
        <div className="education-section-header">
          <h3>Student Management</h3>
        </div>

        <Table
          dataSource={studentsData}
          pagination={false}
          columns={[
            { title: "Student Name", dataIndex: "name", align: "left" },
            { title: "Course", dataIndex: "course", align: "left" },
            { title: "Fee Paid", dataIndex: "fee", align: "left" },
          ]}
        />
      </Card>

    </div>
  );
}

return null;

};

export default EducationDashboard;
