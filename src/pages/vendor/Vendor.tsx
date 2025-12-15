import React from "react";
import { Layout, Menu, Button, Space } from "antd";
import {
  DashboardOutlined,
  FileTextOutlined,
  CarOutlined,
  UserOutlined,
  BookOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import VendorDashboard from "./Dashboard";
import RequestsPage from "./RequestPage";
import FleetPage from "./Fleet";
import DriversPage from "./Drivers";
import BookingsPage from "./Bookings";


const { Header, Content } = Layout;

const VendorLayout: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const selectedKey = path.includes("/vendor/requests")
    ? "requests"
    : path.includes("/vendor/fleet")
    ? "fleet"
    : path.includes("/vendor/drivers")
    ? "drivers"
    : path.includes("/vendor/bookings")
    ? "bookings"
    : path.includes("/vendor/settings")
    ? "settings"
    : "dashboard";

  return (
    <Layout className="sw-vd-layout">
      <Header className="sw-vd-header">
        <div className="sw-vd-header-inner">
          <div className="sw-vd-brand">
            <span className="sw-vd-brand-ico" aria-hidden>🚗</span>
            <span className="sw-vd-brand-text">Transport Rental</span>
          </div>

          <div className="sw-vd-header-actions">
            <Space>
              <Button type="text" className="sw-vd-link">Switch Dashboard</Button>
            </Space>
          </div>
        </div>
      </Header>

      <div className="sw-vd-topnav">
        <div className="sw-vd-topnav-inner">
          <Menu mode="horizontal" selectedKeys={[selectedKey]} className="sw-vd-menu">
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
              <Link to="/vendor/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="requests" icon={<FileTextOutlined />}>
              <Link to="/vendor/requests">Requests</Link>
            </Menu.Item>
            <Menu.Item key="fleet" icon={<CarOutlined />}>
              <Link to="/vendor/fleet">Fleet</Link>
            </Menu.Item>
            <Menu.Item key="drivers" icon={<UserOutlined />}>
              <Link to="/vendor/drivers">Drivers</Link>
            </Menu.Item>
            <Menu.Item key="bookings" icon={<BookOutlined />}>
              <Link to="/vendor/bookings">Bookings</Link>
            </Menu.Item>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
              <Link to="/vendor/settings">Settings</Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>

      <Content className="sw-vd-content">
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="requests" element={<RequestsPage/>}/>
          <Route path="fleet" element={<FleetPage/>} />
          <Route path="drivers" element={<DriversPage/>} />
          <Route path="bookings" element={<BookingsPage/>} />
          <Route path="settings" element={<div className="sw-vd-placeholder">Settings (coming)</div>} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default VendorLayout;
