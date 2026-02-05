import { useState, useEffect } from "react";
import { Input } from "antd";
import { Dropdown, Menu,Modal } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  SearchOutlined, 
  PhoneOutlined, 
  UserOutlined,
  MenuOutlined,
  CloseOutlined
} from "@ant-design/icons";
import "./CleaningHeader.css";

const CleaningHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRecentBookings, setShowRecentBookings] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
  !!localStorage.getItem("accessToken")
);
const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken"); // if you have it
  setIsAuthenticated(false);
  navigate("/");
};



useEffect(() => {
  const token = localStorage.getItem("accessToken");
  setIsAuthenticated(!!token);
}, []);


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
      className="ch-services-dropdown"
      items={[
        {
          key: "home",
          label: (
            <div className="ch-dropdown-item">
              <span className="ch-dropdown-icon">🏠</span>
              <div>
                <div className="ch-dropdown-title">Home Cleaning</div>
                <div className="ch-dropdown-desc">Kitchen, bathroom, bedroom & more</div>
              </div>
            </div>
          ),
          onClick: () => {
            navigate("/cleaning/home");
            setActiveMenu("services");
            setMobileMenuOpen(false);
          },
        },
        {
          key: "commercial",
          label: (
            <div className="ch-dropdown-item">
              <span className="ch-dropdown-icon">🏢</span>
              <div>
                <div className="ch-dropdown-title">Commercial Cleaning</div>
                <div className="ch-dropdown-desc">Office, shop, restaurant & warehouse</div>
              </div>
            </div>
          ),
          onClick: () => {
            navigate("/cleaning/commercial");
            setActiveMenu("services");
            setMobileMenuOpen(false);
          },
        },
        {
          key: "vehicle",
          label: (
            <div className="ch-dropdown-item">
              <span className="ch-dropdown-icon">🚗</span>
              <div>
                <div className="ch-dropdown-title">Vehicle Cleaning</div>
                <div className="ch-dropdown-desc">Bike, car & SUV cleaning services</div>
              </div>
            </div>
          ),
          onClick: () => {
            navigate("/cleaning/vehicle");
            setActiveMenu("services");
            setMobileMenuOpen(false);
          },
        },
      ]}
    />
  );
  const profileMenu = (
  <Menu
    items={[
      {
        key: "recent",
        label: "Recent Bookings",
        onClick: () => setShowRecentBookings(true),
      },
      {
        type: "divider",
      },
      {
        key: "logout",
        label: <span style={{ color: "red" }}>Logout</span>,
        onClick: handleLogout,
      },
    ]}
  />
);


  const handleNavClick = (menu: typeof activeMenu, path: string) => {
    setActiveMenu(menu);
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* TOP INFO BAR */}
      <div className="ch-topbar">
        <div className="ch-topbar-container">
          <div className="ch-topbar-left">
            <a href="tel:+919876543210" className="ch-topbar-link">
              <PhoneOutlined />
              <span>+91 98765 43210</span>
            </a>
            <span className="ch-topbar-divider">|</span>
            <span className="ch-topbar-text">
              Mon - Sat: 8:00 AM - 6:00 PM
            </span>
          </div>

          <div className="ch-topbar-right">
            <a href="/support" className="ch-topbar-link">
              Get Help
            </a>
            <a href="/partner" className="ch-topbar-link">
              Become a Partner
            </a>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header className="ch-header">
        <div className="ch-header-container">
          {/* Logo */}
          <div className="ch-logo" onClick={() => handleNavClick("home", "/")}>
            <div className="ch-logo-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 3.6v8.72c0 4.35-2.96 8.42-8 9.91-5.04-1.49-8-5.56-8-9.91V7.78l8-3.6z"/>
                <circle cx="12" cy="12" r="4"/>
              </svg>
            </div>
            <div className="ch-logo-text">
              <span className="ch-logo-name">SWACHIFY</span>
              <span className="ch-logo-tagline">Cleaning Services</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="ch-nav">
            <a
              className={`ch-nav-link ${activeMenu === "home" ? "active" : ""}`}
              onClick={() => handleNavClick("home", "/")}
            >
              Home
            </a>

            <Dropdown overlay={servicesMenu} trigger={["hover"]} placement="bottomCenter">
              <a
                className={`ch-nav-link ch-nav-dropdown ${
                  activeMenu === "services" ? "active" : ""
                }`}
                onClick={() => handleNavClick("services", "/cleaning")}
              >
                Services
                <span className="ch-dropdown-arrow">▼</span>
              </a>
            </Dropdown>

            <a
              className={`ch-nav-link ${activeMenu === "portfolio" ? "active" : ""}`}
              onClick={() => handleNavClick("portfolio", "/portfolio")}
            >
              Portfolio
            </a>

            <a
              className={`ch-nav-link ${activeMenu === "blog" ? "active" : ""}`}
              onClick={() => handleNavClick("blog", "/blog")}
            >
              Blog
            </a>

            <a
              className={`ch-nav-link ${activeMenu === "support" ? "active" : ""}`}
              onClick={() => handleNavClick("support", "/support")}
            >
              Support
            </a>
          </nav>

          {/* Right Section */}
          <div className="ch-actions">
            {/* Search */}
            <div className="ch-search">
              <Input
                placeholder="Search services..."
                prefix={<SearchOutlined />}
                className="ch-search-input"
              />
            </div>

            {/* Login/Profile Button */}
            {!isAuthenticated ? (
  <button
    className="ch-profile-btn"
    onClick={() => {
      // reuse global auth modal
      (window as any).openAuthModal?.("login");
    }}
  >
    <UserOutlined />
    <span>Login</span>
  </button>
) : (
  <Dropdown overlay={profileMenu} trigger={["click"]} placement="bottomRight">
  <button className="ch-profile-btn">
    <UserOutlined />
  </button>
</Dropdown>

)}


            {/* Mobile Menu Toggle */}
            <button 
              className="ch-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="ch-mobile-menu">
          <div className="ch-mobile-search">
            <Input
              placeholder="Search services..."
              prefix={<SearchOutlined />}
              size="large"
            />
          </div>

          <nav className="ch-mobile-nav">
            <a
              className={`ch-mobile-link ${activeMenu === "home" ? "active" : ""}`}
              onClick={() => handleNavClick("home", "/")}
            >
              Home
            </a>

            <div className="ch-mobile-dropdown">
              <div className="ch-mobile-dropdown-title">Services</div>
              <div className="ch-mobile-dropdown-items">
                <a onClick={() => handleNavClick("services", "/cleaning/home")}>
                  🏠 Home Cleaning
                </a>
                <a onClick={() => handleNavClick("services", "/cleaning/commercial")}>
                  🏢 Commercial Cleaning
                </a>
                <a onClick={() => handleNavClick("services", "/cleaning/vehicle")}>
                  🚗 Vehicle Cleaning
                </a>
              </div>
            </div>

            <a
              className={`ch-mobile-link ${activeMenu === "portfolio" ? "active" : ""}`}
              onClick={() => handleNavClick("portfolio", "/portfolio")}
            >
              Portfolio
            </a>

            <a
              className={`ch-mobile-link ${activeMenu === "blog" ? "active" : ""}`}
              onClick={() => handleNavClick("blog", "/blog")}
            >
              Blog
            </a>

            <a
              className={`ch-mobile-link ${activeMenu === "support" ? "active" : ""}`}
              onClick={() => handleNavClick("support", "/support")}
            >
              Support
            </a>
          </nav>

          <div className="ch-mobile-actions">
            <button className="ch-mobile-login">
              <UserOutlined />
              <span>Login / Sign Up</span>
            </button>

            <div className="ch-mobile-contact">
              <PhoneOutlined />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>
      )}
      <Modal
  open={showRecentBookings}
  footer={null}
  centered
  onCancel={() => setShowRecentBookings(false)}
  title="Recent Bookings"
>
  {/* Replace this with real API data later */}
  <div style={{ padding: "10px 0" }}>
    <p>🧹 Home Cleaning – ₹899</p>
    <p>🚗 Car Wash – ₹699</p>
    <p>🏢 Office Cleaning – ₹1999</p>
  </div>
</Modal>

    </>
  );
};

export default CleaningHeader;
