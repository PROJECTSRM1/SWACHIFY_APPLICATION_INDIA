import { useState } from "react";
import { Card, Button, Tag, Layout, Menu, Dropdown, Avatar } from "antd";
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  InboxOutlined,
  UserOutlined,
  LogoutOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
 // make sure this path is correct

const { Header } = Layout;

// ---- Types ----
type RequestStatus = "Pending" | "Accepted" | "Rejected" | "Delivered";

interface MaterialRequest {
  id: string;
  material: string;
  customerName: string;
  description: string;
  quantityLabel: string;
  location: string;
  requiredBy: string;
  status: RequestStatus;
}

// ---- Mock Initial Data ----
const initialAcceptedOrders: MaterialRequest[] = [
  {
    id: "TKT009",
    material: "Bricks",
    customerName: "Kiran Kumar",
    description: "Standard red bricks for compound wall construction",
    quantityLabel: "1000 pieces",
    location: "BTM Layout, Bangalore",
    requiredBy: "2025-11-28",
    status: "Accepted",
  },
];

const initialNewRequests: MaterialRequest[] = [
  {
    id: "TKT002",
    material: "Cement",
    customerName: "Rahul Verma",
    description: "Need 1 ton of cement for home construction",
    quantityLabel: "1 Ton",
    location: "Jayanagar, Bangalore",
    requiredBy: "2025-11-28",
    status: "Pending",
  },
  {
    id: "TKT007",
    material: "Steel",
    customerName: "Suresh Babu",
    description: "TMT steel bars for building foundation",
    quantityLabel: "500 kg",
    location: "Malleswaram, Bangalore",
    requiredBy: "2025-11-29",
    status: "Pending",
  },
];

// ---- Helper: Tag color by status ----
const getStatusColor = (status: RequestStatus) => {
  switch (status) {
    case "Pending":
      return "gold";
    case "Accepted":
      return "green";
    case "Rejected":
      return "red";
    case "Delivered":
      return "blue";
    default:
      return "default";
  }
};

const Vendor = () => {
  const navigate = useNavigate();

  const [acceptedOrders, setAcceptedOrders] =
    useState<MaterialRequest[]>(initialAcceptedOrders);
  const [newRequests, setNewRequests] =
    useState<MaterialRequest[]>(initialNewRequests);

  const profileMenu = (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Settings</Menu.Item>
    </Menu>
  );

  const handleLogout = () => {
    console.log("Logged out!");
    navigate("/landing");
  };

  // ---- Actions ----
  const handleAccept = (id: string) => {
    setNewRequests((prev) => {
      const req = prev.find((r) => r.id === id);
      if (!req) return prev;

      const updatedReq: MaterialRequest = { ...req, status: "Accepted" };
      setAcceptedOrders((prevAccepted) => [...prevAccepted, updatedReq]);

      return prev.filter((r) => r.id !== id);
    });
  };

  const handleReject = (id: string) => {
    setNewRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Rejected" } : r
      )
    );
    // or remove from list completely:
    // setNewRequests(prev => prev.filter(r => r.id !== id));
  };

  const handleMarkDelivered = (id: string) => {
    setAcceptedOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: "Delivered" } : order
      )
    );
  };

  return (
    <Layout>
      {/* Header */}
      <Header className="sw-vendor-header-container">
        <div className="sw-vendor-header-left">
          <span className="sw-brand-title">SWACHIFY INDIA</span>
          <span className="sw-vendor-portal-text">Vendor Portal</span>
        </div>

        <div className="sw-vendor-header-right">
          <Dropdown overlay={profileMenu} placement="bottomRight">
            <Avatar
              size="large"
              icon={<UserOutlined />}
              className="sw-profile-avatar"
            />
          </Dropdown>

          <Button
            type="default"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Header>

      {/* Page Content */}
      <div className="sw-vendor-page">
        {/* Vendor Info */}
        <Card className="sw-vendor-info-card">
          <div className="sw-vendor-info-row">
            <div>
              <p className="sw-vendor-label">Service Type</p>
              <p className="sw-vendor-value">Construction Materials</p>
            </div>
            <div>
              <p className="sw-vendor-label">PAN Number</p>
              <p className="sw-vendor-value">XXXXX****X</p>
            </div>
            <div>
              <p className="sw-vendor-label">TAN Number</p>
              <p className="sw-vendor-value">XXXX****X</p>
            </div>
          </div>
        </Card>

        {/* My Accepted Orders */}
        <h3 className="sw-section-title">My Accepted Orders</h3>
        {acceptedOrders.length === 0 ? (
          <p className="sw-empty-text">
            You don&apos;t have any accepted orders yet.
          </p>
        ) : (
          acceptedOrders.map((order) => (
            <Card
              key={order.id}
              className="sw-order-card sw-accepted-order"
            >
              <div className="sw-order-header-row">
                <h4>
                  {order.material}{" "}
                  <Tag color={getStatusColor(order.status)}>
                    {order.status}
                  </Tag>
                </h4>
                <span className="sw-order-id">Order ID: {order.id}</span>
              </div>

              <p>
                <strong>Customer:</strong> {order.customerName}
              </p>

              <p className="sw-request-description">{order.description}</p>

              {/* <div className="sw-order-details">
                <p>
                  <InboxOutlined /> Quantity: {order.quantityLabel}
                </p>
                <p>
                  <EnvironmentOutlined /> {order.location}
                </p>
                <p>
                  <ClockCircleOutlined /> Delivery: {order.requiredBy}
                </p>
              </div> */}

              <div className="sw-order-details">
  <p><InboxOutlined /> Quantity: {order.quantityLabel}</p>
  <p><EnvironmentOutlined /> {order.location}</p>
  <p><ClockCircleOutlined /> {order.requiredBy}</p>
</div>


              <Button
                type="primary"
                className="sw-deliver-btn"
                onClick={() => handleMarkDelivered(order.id)}
                disabled={order.status === "Delivered"}
              >
                {order.status === "Delivered"
                  ? "Marked as Delivered"
                  : "Mark as Delivered"}
              </Button>
            </Card>
          ))
        )}

        {/* New Customer Requests */}
        <h3 className="sw-section-title">New Customer Requests</h3>
        {newRequests.length === 0 ? (
          <p className="sw-empty-text">No new requests at the moment.</p>
        ) : (
          newRequests.map((req) => (
            <Card
              key={req.id}
              className="sw-order-card sw-pending-order"
            >
              <div className="sw-order-header-row">
                <h4>
                  {req.material}{" "}
                  <Tag color={getStatusColor(req.status)}>
                    {req.status}
                  </Tag>
                </h4>
                <span className="sw-order-id">Request ID: {req.id}</span>
              </div>

              <p>
                <strong>Customer:</strong> {req.customerName}
              </p>

              <p className="sw-request-description">{req.description}</p>

              <div className="sw-order-details">
                <p className="sw-icon-text"><InboxOutlined /> <span>Quantity: {req.quantityLabel}</span></p>

              
                <p>
                  <EnvironmentOutlined /> {req.location}
                </p>
                <p>
                  <ClockCircleOutlined /> Required by: {req.requiredBy}
                </p>
              </div>

              <div className="sw-request-actions">
                <Button
                  type="primary"
                  className="sw-accept-btn"
                  onClick={() => handleAccept(req.id)}
                  icon={<CheckOutlined />}
                >
                  Accept Request
                </Button>
                <Button
                  danger
                  className="sw-reject-btn"
                  onClick={() => handleReject(req.id)}
                  icon={<CloseOutlined />} 
                >
                  Reject
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </Layout>
  );
};

export default Vendor;

