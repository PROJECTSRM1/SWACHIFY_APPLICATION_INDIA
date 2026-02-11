import { useState, useEffect } from "react";

import { Dropdown, Menu,Modal } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Button, message } from "antd";
import { 
  SearchOutlined, 
  PhoneOutlined, 
  UserOutlined,
  MenuOutlined,
  CloseOutlined
} from "@ant-design/icons";
import "./CleaningHeader.css";
import { getAllHomeServiceBookings, type HomeServiceBookingItem } from "../../api/homeService";
import { customerLogin } from "../../api/customerAuth";

const CleaningHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRecentBookings, setShowRecentBookings] = useState(false);
  const [recentBookings, setRecentBookings] = useState<HomeServiceBookingItem[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
const [identifier, setIdentifier] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
  !!localStorage.getItem("accessToken")
);
const handleLogin = async () => {
  try {
    setLoading(true);

    const res: any = await customerLogin({
      email_or_phone: identifier,
      password,
    });

    localStorage.setItem("accessToken", res.access_token);
    localStorage.setItem("user", JSON.stringify(res));

    setIsAuthenticated(true);
    setShowLoginModal(false);

    message.success("Login successful");
  } catch (e) {
    message.error("Invalid credentials");
  } finally {
    setLoading(false);
  }
};

const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken"); // if you have it
  setIsAuthenticated(false);
  navigate("/");
};


const formatDateTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};


useEffect(() => {
  const loadBookings = async () => {
    try {
      const bookings = await getAllHomeServiceBookings(); // now it's an array
      setRecentBookings(bookings);
    } catch (e) {
      console.error("Failed to load bookings", e);
      setRecentBookings([]);
    }
  };

  if (showRecentBookings) {
    loadBookings();
  }
}, [showRecentBookings]);








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
  onClick={() => setShowLoginModal(true)}
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
      {/* <Modal
  open={showRecentBookings}
  footer={null}
  centered
  onCancel={() => setShowRecentBookings(false)}
  title="Recent Bookings"
>
 
  <div style={{ padding: "10px 0" }}>
    <p>🧹 Home Cleaning – ₹899</p>
    <p>🚗 Car Wash – ₹699</p>
    <p>🏢 Office Cleaning – ₹1999</p>
  </div>
</Modal> */}

<Modal
  open={showRecentBookings}
  footer={null}
  centered
  width={420}
    style={{ top: 50 }}    
      bodyStyle={{ padding: 0 }}
  onCancel={() => setShowRecentBookings(false)}
  title="🧾 Recent Bookings"
  className="recent-bookings-modal"
>
  <div className="recent-bookings-container">
    {recentBookings.length === 0 && (
      <p className="rb-empty">No recent bookings found.</p>
    )}

    {recentBookings.map((item) => (
      <div key={item.booking_id} className="rb-card">
        <div className="rb-header">
          <span className="rb-service">
            🧹 {item.service_summary?.main_service}
          </span>
          <span className="rb-price">
            ₹{item.service_summary?.total_amount}
          </span>
        </div>

        <div className="rb-meta">
          <span>📅 {item.preferred_date}</span>
          <span>⏰ {item.time_slot}</span>
        </div>

        <div className="rb-booked">
          🕒 Booked on: {formatDateTime(item.created_date)}
        </div>
      </div>
    ))}
  </div>
</Modal>
<Modal
  open={showLoginModal}
  footer={null}
  centered
  onCancel={() => setShowLoginModal(false)}
  className="auth-modal"
  closable={false}
>
  <div className="auth-container">
    
    {/* Header */}
    <div className="auth-header">
      <h2>Welcome Back 👋</h2>
      <p>Login to continue booking your service</p>
    </div>

    {/* Inputs */}
    <div className="auth-body">
      <Input
        size="large"
        placeholder="Email or Mobile Number"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        className="auth-input"
      />

      <Input.Password
        size="large"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="auth-input"
      />

      <Button
        type="primary"
        size="large"
        block
        loading={loading}
        disabled={!identifier || !password}
        onClick={handleLogin}
        className="auth-button"
      >
        Login
      </Button>
    </div>

    
   

  </div>
</Modal>









    </>
  );
};

export default CleaningHeader;
