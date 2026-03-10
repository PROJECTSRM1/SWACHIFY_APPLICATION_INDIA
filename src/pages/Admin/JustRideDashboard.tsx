import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  message,
} from "antd";
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
  /* ================= RIDES DATA ================= */

  const ridesData = [
    { key: 1, rider: "Anita", driver: "Ramesh", fare: 450, status: "Completed", rating: 4 },
    { key: 2, rider: "Rahul", driver: "Suresh", fare: 600, status: "Completed", rating: 5 },
    { key: 3, rider: "Sneha", driver: "Anil", fare: 300, status: "Pending", rating: 0 },
    { key: 4, rider: "Kiran", driver: "Ramesh", fare: 500, status: "Completed", rating: 5 },
  ];

  /* ================= COMPLAINTS DATA ================= */

  const complaintsData = [
    {
      key: 1,
      driver: "Ramesh",
      rider: "Anita",
      complaint: "Rash driving",
      date: "2026-02-20",
      severity: "High",
    },
    {
      key: 2,
      driver: "Anil",
      rider: "Sneha",
      complaint: "Late pickup",
      date: "2026-02-21",
      severity: "Medium",
    },
  ];

  /* ================= DRIVER STATUS STATE ================= */

  const [driverStatus, setDriverStatus] = useState<any>({
    Ramesh: "Active",
    Suresh: "Active",
    Anil: "Active",
  });

  /* ================= DRIVER CALCULATION ================= */

  const driverNames = ["Ramesh", "Suresh", "Anil"];

  const driversData = driverNames.map((driver, index) => {
    const completedRides = ridesData.filter(
      (r) => r.driver === driver && r.status === "Completed"
    );

    const totalEarnings = completedRides.reduce(
      (acc, r) => acc + r.fare,
      0
    );

    const avgRating =
      completedRides.length > 0
        ? (
            completedRides.reduce((acc, r) => acc + r.rating, 0) /
            completedRides.length
          ).toFixed(1)
        : "0";

    return {
      key: index,
      name: driver,
      completedRides,
      totalEarnings,
      avgRating,
      complaints: complaintsData.filter((c) => c.driver === driver),
      status: driverStatus[driver] || "Active",
    };
  });

  const totalDrivers = driversData.length;
  const totalRides = ridesData.length;

  const initialRevenue = ridesData
    .filter((r) => r.status === "Completed")
    .reduce((acc, r) => acc + r.fare, 0);

  const [availableRevenue, setAvailableRevenue] =
    useState<number>(initialRevenue);

  const [driverModal, setDriverModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  const [complaintsModal, setComplaintsModal] = useState(false);
  const [selectedDriverComplaints, setSelectedDriverComplaints] = useState<any>(null);

  const [withdrawModal, setWithdrawModal] = useState(false);
  const [form] = Form.useForm();

  const handleWithdraw = (values: any) => {
    const amount = values.amount;

    if (amount > availableRevenue) {
      message.error("Insufficient balance");
      return;
    }

    setAvailableRevenue((prev) => prev - amount);
    message.success("Withdrawal request submitted successfully");
    form.resetFields();
    setWithdrawModal(false);
  };

  const renderPage = (title: string, table: React.ReactNode) => (
    <div className="ride-page-wrapper">
      <div className="ride-section-header">
        <h3>{title}</h3>
      </div>
      <Card className="ride-main-card">{table}</Card>
    </div>
  );

  /* ================= DRIVERS PAGE ================= */

  if (activePage === "Drivers") {
    return (
      <>
        {renderPage(
          "Driver Management",
          <Table
            dataSource={driversData}
            pagination={false}
            rowKey="key"
            scroll={{ x: "max-content" }}
            columns={[
              { title: "Driver Name", dataIndex: "name" },

              {
                title: "Status",
                render: (_, record: any) => (
                  <span
                    style={{
                      color:
                        record.status === "Suspended"
                          ? "red"
                          : record.status === "On Hold"
                          ? "orange"
                          : "green",
                      fontWeight: 600,
                    }}
                  >
                    {record.status}
                  </span>
                ),
              },

              {
                title: "Completed Rides",
                render: (_, record: any) =>
                  record.completedRides.length,
              },

              {
                title: "Total Earnings (₹)",
                dataIndex: "totalEarnings",
              },

              {
                title: "Complaints",
                render: (_, record: any) => (
                  <Button
                    danger={record.complaints.length > 0}
                    onClick={() => {
                      setSelectedDriverComplaints(record);
                      setComplaintsModal(true);
                    }}
                  >
                    {record.complaints.length}
                  </Button>
                ),
              },

              {
                title: "Action",
                render: (_, record: any) => (
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button
                      onClick={() => {
                        setSelectedDriver(record);
                        setDriverModal(true);
                      }}
                    >
                      View
                    </Button>

                    <Button
                      danger
                      onClick={() =>
                        setDriverStatus((prev: any) => ({
                          ...prev,
                          [record.name]: "Suspended",
                        }))
                      }
                    >
                      Suspend
                    </Button>

                    <Button
                      onClick={() =>
                        setDriverStatus((prev: any) => ({
                          ...prev,
                          [record.name]: "On Hold",
                        }))
                      }
                    >
                      Hold
                    </Button>

                    <Button
                      type="primary"
                      onClick={() =>
                        setDriverStatus((prev: any) => ({
                          ...prev,
                          [record.name]: "Active",
                        }))
                      }
                    >
                      Activate
                    </Button>
                  </div>
                ),
              },
            ]}
          />
        )}

        {/* DRIVER DETAILS MODAL */}
        <Modal
          title={`Driver Details - ${selectedDriver?.name}`}
          open={driverModal}
          onCancel={() => setDriverModal(false)}
          footer={null}
          width={600}
          centered
        >
          <Table
            dataSource={selectedDriver?.completedRides || []}
            pagination={false}
            rowKey="key"
            columns={[
              { title: "Rider", dataIndex: "rider" },
              { title: "Fare (₹)", dataIndex: "fare" },
              { title: "Rating", dataIndex: "rating" },
            ]}
          />
        </Modal>

        {/* COMPLAINTS MODAL */}
        <Modal
          title={`Complaints - ${selectedDriverComplaints?.name}`}
          open={complaintsModal}
          onCancel={() => setComplaintsModal(false)}
          footer={null}
          centered
          width={700}
        >
          <Table
            dataSource={selectedDriverComplaints?.complaints || []}
            pagination={false}
            rowKey="key"
            columns={[
              { title: "Rider", dataIndex: "rider" },
              { title: "Complaint", dataIndex: "complaint" },
              { title: "Severity", dataIndex: "severity" },
              { title: "Date", dataIndex: "date" },
            ]}
          />
        </Modal>
      </>
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
          { title: "Fare (₹)", dataIndex: "fare" },
          { title: "Status", dataIndex: "status" },
        ]}
      />
    );
  }

  /* ================= REVENUE PAGE ================= */

  if (activePage === "Revenue") {
    return (
      <div className="ride-dashboard-wrapper">
        <Row gutter={[20, 20]}>
          <Col xs={24} md={12}>
            <Card className="ride-stat-card revenue-card">
              <Statistic
                title="Available Revenue"
                value={availableRevenue}
                prefix={<DollarOutlined />}
              />
              <Button
                type="primary"
                block
                style={{ marginTop: 16 }}
                onClick={() => setWithdrawModal(true)}
              >
                Withdraw to Bank
              </Button>
            </Card>
          </Col>
        </Row>

        <Modal
          title="Withdraw Revenue"
          open={withdrawModal}
          onCancel={() => setWithdrawModal(false)}
          footer={null}
          centered
        >
          <Form form={form} layout="vertical" onFinish={handleWithdraw}>
            <Form.Item name="accountName" label="Account Holder" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="bankName" label="Bank Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="accountNumber" label="Account Number" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="ifsc" label="IFSC Code" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="amount" label="Amount (₹)" rules={[{ required: true }]}>
              <InputNumber style={{ width: "100%" }} min={1} max={availableRevenue} />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Confirm Withdraw
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }

  /* ================= DEFAULT DASHBOARD ================= */

  return (
    <div className="ride-dashboard-wrapper">
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
      value={availableRevenue}
      prefix={<DollarOutlined />}
    />
  </Card>
</Col>
      </Row>

      {renderPage(
        "Recent Rides",
        <Table
          dataSource={ridesData}
          pagination={false}
          scroll={{ x: "max-content" }}
          columns={[
            { title: "Rider", dataIndex: "rider" },
            { title: "Driver", dataIndex: "driver" },
            { title: "Fare (₹)", dataIndex: "fare" },
            { title: "Status", dataIndex: "status" },
          ]}
        />
      )}
    </div>
  );
};

export default JustRideDashboard;