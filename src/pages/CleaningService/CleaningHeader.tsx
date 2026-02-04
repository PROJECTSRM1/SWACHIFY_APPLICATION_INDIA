import { useState, useEffect } from "react";
import { Input } from "antd";
import { Dropdown, Menu} from "antd";
import { useLocation } from "react-router-dom";




// import {
//   PhoneOutlined,
//   MailOutlined,
//   ClockCircleOutlined,
// } from "@ant-design/icons";
import "./CleaningHeader.css";


const CleaningHeader: React.FC = () => {
const location = useLocation();

const getActiveMenu = () => {
  if (location.pathname.startsWith("/cleaning")) return "services";
  if (location.pathname.startsWith("/portfolio")) return "portfolio";
  if (location.pathname.startsWith("/blog")) return "blog";
  if (location.pathname.startsWith("/support")) return "support";
  return "home";
};


const [activeMenu, setActiveMenu] = useState<
  "home" | "services" | "portfolio" | "blog" | "support"
>(getActiveMenu);

useEffect(() => {
  if (location.pathname.startsWith("/cleaning")) {
    setActiveMenu("services");
  } else if (location.pathname.startsWith("/portfolio")) {
    setActiveMenu("portfolio");
  } else if (location.pathname.startsWith("/blog")) {
    setActiveMenu("blog");
  } else if (location.pathname.startsWith("/support")) {
    setActiveMenu("support");
  } else {
    setActiveMenu("home");
  }
}, [location.pathname]);



const servicesMenu = (
  <Menu
    items={[
      {
        key: "1",
        label: "Cleaning Services",
        onClick: () => setActiveMenu("services"),
      },
      {
        key: "2",
        label: "Home Services",
        onClick: () => setActiveMenu("services"),
      },
    ]}
  />
);

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
          <span>SWACHIFY</span>
          <small>Cleaning Services</small>
        </div>


        <nav className="cleaning-nav">
  <a
    className={activeMenu === "home" ? "nav-link active" : "nav-link"}
    onClick={() => setActiveMenu("home")}
  >
    Home
  </a>

  <Dropdown overlay={servicesMenu} trigger={["hover"]}>
    <a
      className={
        activeMenu === "services"
          ? "nav-link nav-dropdown active"
          : "nav-link nav-dropdown"
      }
      onClick={() => setActiveMenu("services")}
    >
      Services
    </a>
  </Dropdown>

  <a
    className={activeMenu === "portfolio" ? "nav-link active" : "nav-link"}
    onClick={() => setActiveMenu("portfolio")}
  >
    Portfolio
  </a>

  <a
    className={activeMenu === "blog" ? "nav-link active" : "nav-link"}
    onClick={() => setActiveMenu("blog")}
  >
    Blog
  </a>

  <a
    className={activeMenu === "support" ? "nav-link active" : "nav-link"}
    onClick={() => setActiveMenu("support")}
  >
    Customer Assistance
  </a>
</nav>



        <div className="cleaning-search">
          <Input placeholder="Search" />
        </div>
      </header>
    </>
  );

};


export default CleaningHeader;