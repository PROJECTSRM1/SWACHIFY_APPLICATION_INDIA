import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  CalendarOutlined,
  WalletOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Footer.css";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { key: "home", label: "Home", icon: <HomeOutlined />, path: "/app/dashboard" },
    { key: "bookings", label: "Bookings", icon: <CalendarOutlined />, path: "/app/dashboard/bookings" },
    { key: "wallet", label: "Wallet", icon: <WalletOutlined />, path: "/app/dashboard/wallet" },
    { key: "chat", label: "Chat", icon: <MessageOutlined />, path: "/app/dashboard/chat" },
    { key: "profile", label: "Profile", icon: <UserOutlined />, path: "/app/dashboard/profile" },
  ];

  return (
    <footer className="sw-main-footer">
      <nav className="sw-bottom-nav">
        {navItems.map((item) => (
          <div
            key={item.key}
            className={`sw-nav-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
            {location.pathname === item.path && <div className="sw-active-dot" />}
          </div>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;
