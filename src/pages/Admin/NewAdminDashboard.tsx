import React, { useState } from "react";
import { Layout, Menu, Drawer, Button, Modal } from "antd";
import {
  MenuOutlined,
  DashboardOutlined,
  UserOutlined,
  CalendarOutlined,
  TeamOutlined,
  DollarOutlined,
  FileTextOutlined,
  BookOutlined,
  CarOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  BuildOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import HealthcareDashboard from "./HealthcareDashboard";
import CleaningDashboard from "./CleaningDashboard";
import EducationDashboard from "./EducationDashboard";
import JustRideDashboard from "./JustRideDashboard";
import ProductsDashboard from "./ProductsDashboard";
import BuySellDashboard from "./BuySellDashboard";
import RawMaterialsDashboard from "./RawMaterialsDashboard";
import FreelancerDashboard from "./FreelancerDashboard";

import "./AdminDashboard.css";

const { Sider, Content } = Layout;

const NewAdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [selectedService, setSelectedService] = useState("Healthcare");
  const [selectedPage, setSelectedPage] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  /* =============================
     LOGOUT FUNCTION
  ============================== */

const handleLogout = () => {
  Modal.confirm({
    title: "Are you sure you want to logout?",
    okText: "Yes",
    cancelText: "Cancel",
    onOk: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/", { replace: true }); // 👈 Landing page
    },
  });
};


  /* =============================
     RENDER CONTENT
  ============================== */

const renderContent = () => {
  switch (selectedService) {

    case "Healthcare":
      return (
        <HealthcareDashboard
          activePage={selectedPage}
          setActivePage={setSelectedPage}
        />
      );

    case "Cleaning":
      return (
        <CleaningDashboard
          activePage={selectedPage}
          setActivePage={setSelectedPage}
        />
      );

    case "Education":
      return (
        <EducationDashboard
          activePage={selectedPage}
          setActivePage={setSelectedPage}
        />
      );

    case "JustRide":
      return (
        <JustRideDashboard
          activePage={selectedPage}
          setActivePage={setSelectedPage}
        />
      );

    case "Products":
      return (
        <ProductsDashboard
          activePage={selectedPage}
          setActivePage={setSelectedPage}
        />
      );

    case "BuySell":
      return (
        <BuySellDashboard
          activePage={selectedPage}
          setActivePage={setSelectedPage}
        />
      );

    case "RawMaterials":
      return (
        <RawMaterialsDashboard
          activePage={selectedPage}
          setActivePage={setSelectedPage}
        />
      );

    case "Freelancer":
      return (
        <FreelancerDashboard
          activePage={selectedPage}
          setActivePage={setSelectedPage}
        />
      );

    default:
      return null;
  }
};

  /* =============================
     SIDEBAR MENU FIELDS
  ============================== */

  const renderMenuItems = () => {
    switch (selectedService) {
     case "Healthcare":
  return (
    <>
      <Menu.Item key="Dashboard" icon={<DashboardOutlined />}>
        Dashboard
      </Menu.Item>

      <Menu.Item key="Doctors" icon={<UserOutlined />}>
        Doctors
      </Menu.Item>

      <Menu.Item key="Hospitals" icon={<BuildOutlined />}>
        Hospitals
      </Menu.Item>
      

      <Menu.Item key="Medical Claims" icon={<CalendarOutlined />}>
        Medical Claims
      </Menu.Item>

      <Menu.Item key="Medical Reports" icon={<FileTextOutlined />}>
        Medical Reports
      </Menu.Item>
    </>
  );


      case "Cleaning":
        return (
          <>
            <Menu.Item key="Dashboard" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
            <Menu.Item key="Cleaners" icon={<TeamOutlined />}>Cleaners</Menu.Item>
            <Menu.Item key="Bookings" icon={<CalendarOutlined />}>Bookings</Menu.Item>
            <Menu.Item key="Revenue" icon={<DollarOutlined />}>Revenue</Menu.Item>
          </>
        );

      case "Education":
        return (
          <>
            <Menu.Item key="Dashboard" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
            <Menu.Item key="Courses" icon={<BookOutlined />}>Courses</Menu.Item>
            <Menu.Item key="Students" icon={<UserOutlined />}>Students</Menu.Item>
            <Menu.Item key="Revenue" icon={<DollarOutlined />}>Revenue</Menu.Item>
          </>
        );

      case "JustRide":
        return (
          <>
            <Menu.Item key="Dashboard" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
            <Menu.Item key="Drivers" icon={<UserOutlined />}>Drivers</Menu.Item>
            <Menu.Item key="Rides" icon={<CarOutlined />}>Rides</Menu.Item>
            <Menu.Item key="Revenue" icon={<DollarOutlined />}>Revenue</Menu.Item>
          </>
        );

      case "Products":
        return (
          <>
            <Menu.Item key="Dashboard" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
            <Menu.Item key="Products" icon={<ShoppingCartOutlined />}>Products</Menu.Item>
            <Menu.Item key="Orders" icon={<CalendarOutlined />}>Orders</Menu.Item>
            <Menu.Item key="Revenue" icon={<DollarOutlined />}>Revenue</Menu.Item>
          </>
        );

      case "BuySell":
        return (
          <>
            <Menu.Item key="Dashboard" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
            <Menu.Item key="Properties" icon={<HomeOutlined />}>Properties</Menu.Item>
            <Menu.Item key="Transactions" icon={<CalendarOutlined />}>Transactions</Menu.Item>
            <Menu.Item key="Revenue" icon={<DollarOutlined />}>Revenue</Menu.Item>
          </>
        );

      case "RawMaterials":
        return (
          <>
            <Menu.Item key="Dashboard" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
            <Menu.Item key="Materials" icon={<BuildOutlined />}>Materials</Menu.Item>
            <Menu.Item key="Suppliers" icon={<TeamOutlined />}>Suppliers</Menu.Item>
            <Menu.Item key="Revenue" icon={<DollarOutlined />}>Revenue</Menu.Item>
          </>
        );
        case "Freelancer":
  return (
    <>
      <Menu.Item key="Dashboard" icon={<DashboardOutlined />}>
        Dashboard
      </Menu.Item>

      <Menu.Item key="Active Freelancers" icon={<UserOutlined />}>
        Active Freelancers
      </Menu.Item>

      <Menu.Item key="Pending Freelancers" icon={<CalendarOutlined />}>
        Pending Freelancers
      </Menu.Item>

      <Menu.Item key="Rejected Freelancers" icon={<FileTextOutlined />}>
        Rejected Freelancers
      </Menu.Item>
    </>);
      default:
        return null;
    }
  };

  /* =============================
     SIDEBAR COMPONENT
  ============================== */

const Sidebar = (
  <div className="sidebar-container">
    <div className="sidebar-header">{selectedService} Admin</div>

    <Menu
      mode="inline"
      selectedKeys={[selectedPage]}
      onClick={(e) => {
        setSelectedPage(e.key);
        setMobileOpen(false); // auto close on mobile click
      }}
      className="sidebar-menu"
    >
      {renderMenuItems()}

      <Menu.Divider />

    

      <Menu.Item
        key="Logout"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
      >
        Logout
      </Menu.Item>
    </Menu>
  </div>
);


  /* =============================
     RETURN LAYOUT
  ============================== */

  return (
    <Layout className="admin-layout">
      <Sider breakpoint="lg" collapsedWidth="0" className="admin-sider">
        {Sidebar}
      </Sider>

    <Drawer
  placement="left"
  open={mobileOpen}
  onClose={() => setMobileOpen(false)}
  width={260}
  bodyStyle={{ padding: 0 }}
>

        {Sidebar}
      </Drawer>

      <Layout>
        <div className="admin-header">
          <Button
            icon={<MenuOutlined />}
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(true)}
          />

          <select
            value={selectedService}
            onChange={(e) => {
              setSelectedService(e.target.value);
              setSelectedPage("Dashboard");
            }}
            className="service-select"
          >
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="JustRide">Just Ride</option>
            <option value="Cleaning">Cleaning & Home</option>
            <option value="Products">Swachify Products</option>
            <option value="BuySell">Buy / Sale / Rentals</option>
            <option value="RawMaterials">Raw Materials</option>
            <option value="Freelancer">Freelancer</option>
          </select>
        </div>

        <Content className="admin-content">
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default NewAdminDashboard;
