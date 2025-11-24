import React, { useState } from "react";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Menu, Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import "./header.css";

const HeaderBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart"); // <-- cart navigation added
  };

  const centerMenu = [
    { key: "cleaning", label: <span className="menu-item">Cleaning</span> },
    {
      key: "packers",
      label: <span className="menu-item">Packers & Movers</span>,
    },
    {
      key: "homeservices",
      label: <span className="menu-item">Home Services</span>,
    },
    { key: "rentals", label: <span className="menu-item">Rentals</span> },
    {
      key: "commercial",
      label: <span className="menu-item">Commercial Plots</span>,
    },
    {
      key: "construction",
      label: <span className="menu-item">Construction Materials</span>,
    },
     {
      key: "freelancer",
      label: <span className="menu-item">Freelancer</span>,
    },
    {
      key: "location",
      label: <span className="menu-item">Location</span>,
    },
  ];

  return (
    <div className="header-container">

      <div className="header-left">
        <HomeOutlined className="logo-icon" />
        <span className="logo-text">HomeServices</span>
      </div>

      <div className="header-center">
        <Menu mode="horizontal" items={centerMenu} className="header-menu" />
      </div>

      <div className="header-right">
        {/* Cart with navigation */}
        <span className="header-item-cart" onClick={handleCartClick}>
          <ShoppingCartOutlined className="header-icon-cart" /> Cart
        </span>

        {/* Logout with navigation */}
        <span className="header-item" onClick={handleLogout}>
          <LogoutOutlined className="header-icon-large" /> Logout
        </span>
      </div>

      <div className="mobile-menu-btn">
        <MenuOutlined
          className="header-icon-large"
          onClick={() => setOpen(true)}
        />
      </div>

      <Drawer
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
        closable={false}
        title={
          <div className="drawer-header">
            <span className="logo-text">HomeServices</span>
            <CloseOutlined onClick={() => setOpen(false)} />
          </div>
        }
      >
        <Menu mode="vertical" items={centerMenu} />

        <div className="drawer-icons">
          {/* Drawer cart with navigation */}
          <ShoppingCartOutlined
            className="header-icon-cart"
            onClick={handleCartClick}
          />

          {/* Drawer logout */}
          <LogoutOutlined
            className="header-icon-large"
            onClick={handleLogout}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default HeaderBar;
