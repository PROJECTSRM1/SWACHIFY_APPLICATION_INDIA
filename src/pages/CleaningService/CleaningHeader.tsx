import React from "react";
import { Input } from "antd";
// import {
//   PhoneOutlined,
//   MailOutlined,
//   ClockCircleOutlined,
// } from "@ant-design/icons";
import "./CleaningHeader.css";

const CleaningHeader: React.FC = () => {
  return (
    <>
      {/* TOP INFO BAR */}
      {/* <div className="cleaning-topbar">
        <div className="topbar-left">
          <span>
            <PhoneOutlined /> Call for help: +91 98765 43210
          </span>
          <span>
            <MailOutlined /> info@swachifycleaning.com
          </span>
        </div>

        <div className="topbar-right">
          <ClockCircleOutlined /> Mon to Sat (8am – 6pm)
        </div>
      </div> */}

      {/* MAIN HEADER */}
      <header className="cleaning-header">
        <div className="cleaning-logo">
          🧼 <span>SWACHIFY</span>
          <small>Cleaning Services</small>
        </div>

        <nav className="cleaning-nav">
          <a className="active">Home</a>
          <a>Services</a>
          <a>Portfolio</a>
          <a>Blog</a>
          <a>Customer Assistance</a>
        </nav>

        <div className="cleaning-search">
          <Input.Search placeholder="Search" />
        </div>
      </header>
    </>
  );
};

export default CleaningHeader;
