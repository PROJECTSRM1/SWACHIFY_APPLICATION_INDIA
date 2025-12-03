
import { Card, Button, Tag, Layout, Menu, Dropdown, Avatar } from "antd";
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  InboxOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const Vendor = () => {
    const navigate = useNavigate();
  const profileMenu = (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Settings</Menu.Item>
    </Menu>
  );

  const handleLogout = () => {
    console.log("Logged out!");
    navigate('/landing');
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
            <Avatar size="large" icon={<UserOutlined />} className="sw-profile-avatar" />
          </Dropdown>

          <Button type="default" icon={<LogoutOutlined />} onClick={handleLogout}>
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

        {/* Accepted Orders */}
        <h3 className="sw-section-title">My Accepted Orders</h3>
        <Card className="sw-order-card sw-accepted-order">
          <h4>
            Bricks <Tag color="green">Accepted</Tag>
          </h4>
          <p><strong>Order ID:</strong> TKT009</p>
          <p><strong>Customer:</strong> Kiran Kumar</p>

          <div className="sw-order-details">
            <p><InboxOutlined /> Quantity: 1000 pieces</p>
            <p><EnvironmentOutlined /> BTM Layout, Bangalore</p>
            <p><ClockCircleOutlined /> Delivery: 2025-11-28</p>
          </div>

          <Button type="primary" className="sw-deliver-btn">
            Mark as Delivered
          </Button>
        </Card>

        {/* New Requests */}
        <h3 className="sw-section-title">New Customer Requests</h3>
        <Card className="sw-order-card sw-pending-order">
          <h4>
            Cement <Tag color="gold">Pending</Tag>
          </h4>
          <p><strong>Request ID:</strong> TKT002</p>
          <p><strong>Customer:</strong> Rahul Verma</p>

          <p className="sw-request-description">
            Need 1 ton of cement for home construction
          </p>
        </Card>
      </div>
    </Layout>
  );
};

export default Vendor;
