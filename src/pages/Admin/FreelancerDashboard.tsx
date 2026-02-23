import React, { useState } from "react";
import { Row, Col, Card, Statistic, Table, Button, message } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import "./FreelancerDashboard.css";

interface Props {
  activePage: string;
  setActivePage: (page: string) => void;
}

interface Freelancer {
  key: number;
  name: string;
  skill: string;
  experience: string;
  status: "Active" | "Pending" | "Rejected";
}

const FreelancerDashboard: React.FC<Props> = ({
  activePage,
  setActivePage,
}) => {

  /* ================= STATE ================= */

  const [freelancers, setFreelancers] = useState<Freelancer[]>([
    {
      key: 1,
      name: "Ravi Kumar",
      skill: "Electrician",
      experience: "3 Years",
      status: "Active",
    },
    {
      key: 2,
      name: "Anil Reddy",
      skill: "Plumber",
      experience: "2 Years",
      status: "Pending",
    },
    {
      key: 3,
      name: "Meena",
      skill: "Beautician",
      experience: "4 Years",
      status: "Rejected",
    },
    {
      key: 4,
      name: "Suresh",
      skill: "Driver",
      experience: "5 Years",
      status: "Pending",
    },
  ]);

  /* ================= STATUS UPDATE ================= */

  const updateStatus = (id: number, newStatus: Freelancer["status"]) => {
    setFreelancers((prev) =>
      prev.map((f) =>
        f.key === id ? { ...f, status: newStatus } : f
      )
    );

    message.success(`Freelancer moved to ${newStatus}`);
  };

  /* ================= FILTERED LISTS ================= */

  const activeFreelancers = freelancers.filter(
    (f) => f.status === "Active"
  );

  const pendingFreelancers = freelancers.filter(
    (f) => f.status === "Pending"
  );

  const rejectedFreelancers = freelancers.filter(
    (f) => f.status === "Rejected"
  );

  /* ================= COMMON COLUMNS ================= */

  const baseColumns = [
    { title: "Name", dataIndex: "name" },
    { title: "Skill", dataIndex: "skill" },
    { title: "Experience", dataIndex: "experience" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <span
          className={`freelancer-status-badge ${
            status === "Active"
              ? "freelancer-status-active"
              : status === "Pending"
              ? "freelancer-status-pending"
              : "freelancer-status-rejected"
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

  /* ================= PENDING PAGE WITH ACTIONS ================= */

  if (activePage === "Pending Freelancers") {
    return (
      <div className="freelancer-dashboard-container">
        <Card className="freelancer-table-card">
          <h3 className="freelancer-section-title">
            Pending Freelancers
          </h3>

          <Table
            dataSource={pendingFreelancers}
            pagination={false}
            scroll={{ x: "max-content" }}
            columns={[
              ...baseColumns,
              {
                title: "Actions",
                render: (_: any, record: Freelancer) => (
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() =>
                        updateStatus(record.key, "Active")
                      }
                    >
                      Accept
                    </Button>

                    <Button
                      danger
                      size="small"
                      onClick={() =>
                        updateStatus(record.key, "Rejected")
                      }
                    >
                      Reject
                    </Button>
                  </div>
                ),
              },
            ]}
          />
        </Card>
      </div>
    );
  }

  /* ================= ACTIVE PAGE ================= */

  if (activePage === "Active Freelancers") {
    return (
      <div className="freelancer-dashboard-container">
        <Card className="freelancer-table-card">
          <h3 className="freelancer-section-title">
            Active Freelancers
          </h3>

          <Table
            dataSource={activeFreelancers}
            pagination={false}
            scroll={{ x: "max-content" }}
            columns={baseColumns}
          />
        </Card>
      </div>
    );
  }

  /* ================= REJECTED PAGE ================= */

  if (activePage === "Rejected Freelancers") {
    return (
      <div className="freelancer-dashboard-container">
        <Card className="freelancer-table-card">
          <h3 className="freelancer-section-title">
            Rejected Freelancers
          </h3>

          <Table
            dataSource={rejectedFreelancers}
            pagination={false}
            scroll={{ x: "max-content" }}
            columns={baseColumns}
          />
        </Card>
      </div>
    );
  }

  /* ================= DASHBOARD ================= */

  return (
    <div className="freelancer-dashboard-container">

      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8}>
          <Card
            className="freelancer-stat-card freelancer-stat-active"
            onClick={() => setActivePage("Active Freelancers")}
          >
            <Statistic
              title="Active Freelancers"
              value={activeFreelancers.length}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            className="freelancer-stat-card freelancer-stat-pending"
            onClick={() => setActivePage("Pending Freelancers")}
          >
            <Statistic
              title="Pending Freelancers"
              value={pendingFreelancers.length}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            className="freelancer-stat-card freelancer-stat-rejected"
            onClick={() => setActivePage("Rejected Freelancers")}
          >
            <Statistic
              title="Rejected Freelancers"
              value={rejectedFreelancers.length}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card className="freelancer-table-card">
        <h3 className="freelancer-section-title">
          Recent Freelancers
        </h3>

        <Table
          dataSource={freelancers}
          pagination={false}
          scroll={{ x: "max-content" }}
          columns={baseColumns}
        />
      </Card>
    </div>
  );
};

export default FreelancerDashboard;