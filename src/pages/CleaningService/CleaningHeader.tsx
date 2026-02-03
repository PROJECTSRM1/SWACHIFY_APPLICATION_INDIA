import React from "react";
import { Input } from "antd";
import { Dropdown, Menu} from "antd";


// import {
//   PhoneOutlined,
//   MailOutlined,
//   ClockCircleOutlined,
// } from "@ant-design/icons";
import "./CleaningHeader.css";



const servicesMenu = (
  <Menu
    items={[
      { key: "1", label: "Cleaning Services" },
      { key: "2", label: "Home Services" },
    ]}
  />
);
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
<Dropdown overlay={servicesMenu} trigger={["hover"]}>
  <a className="nav-dropdown">Services</a>
</Dropdown>
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