import React, { useEffect, useState } from "react";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  MenuOutlined,
  BellOutlined,
  UserOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useCart } from "../../../src/context/CartContext";
import { Menu, Drawer, message, Button, Dropdown, Badge, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import "../../index.css";

const HeaderBar: React.FC = () => {
  const [open, setOpen] = useState(false); // left mobile menu
  const [cartOpen, setCartOpen] = useState(false); // right cart drawer
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const handleLogout = () => {
    localStorage.removeItem("user");
    message.success("Logout successful");
    navigate("/landing");
  };

  const handleNavigate = (key: string) => {
    if (key === "packers") navigate("/app/dashboard/packers");
    if (key === "homeservices") navigate("/app/dashboard/homeservices");
    if (key === "rentals") navigate("/app/dashboard/rentals");
    if (key === "commercial") navigate("/app/dashboard/commercials");
    if (key === "construction") navigate("/app/dashboard/constructions");
    if (key === "bookings") navigate("/app/dashboard/bookings");
    if (key === "cart") setCartOpen(true);
  };

  // center menu (Today Work removed)
  const centerMenu = [
    { key: "packers", label: <span className="sw-menu-item">Transport</span> },
    {
      key: "homeservices",
      label: <span className="sw-menu-item">Home & Cleaning Services</span>,
    },
    { key: "commercial", label: <span className="sw-menu-item">Buy/Sale/Rentals</span> },
    {
      key: "construction",
      label: <span className="sw-menu-item">Construction Raw Materials</span>,
    },
    {
      key: "swachify_products",
      label: <span className="sw-menu-item">Swachify Products</span>,
    },
    { key: "education", label: <span className="sw-menu-item">Education</span> },
  ];

  const profileMenu = (
    <Menu
      onClick={(info) => {
        if (info.key === "cart") {
          setCartOpen(true);
        } else if (info.key === "bookings") {
          handleNavigate("bookings");
        } else if (info.key === "logout") {
          handleLogout();
        }
      }}
      items={[
        {
          key: "bookings",
          label: <span className="sw-dropdown-item">Recent Booking</span>,
          icon: <HomeOutlined />,
        },
        {
          key: "cart",
          label: <span className="sw-dropdown-item">Cart ({cart.length})</span>,
          icon: <ShoppingCartOutlined />,
        },
        {
          key: "logout",
          label: <span className="sw-dropdown-item">Logout</span>,
          icon: <LogoutOutlined />,
        },
      ]}
      className="sw-profile-dropdown-menu"
    />
  );

  // Close cart on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && cartOpen) setCartOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [cartOpen]);

  return (
    <div className="sw-header-container">
      {/* LEFT */}
      <div
        className="sw-header-left"
        onClick={() => navigate("/app/dashboard")}
        style={{ cursor: "pointer" }}
        role="button"
        tabIndex={0}
        aria-label="Go to dashboard"
      >
        <HomeOutlined className="sw-logo-icon" />
        <span className="sw-logo-text">Home</span>
      </div>

      {/* CENTER */}
      <div className="sw-header-center" role="navigation" aria-label="Main navigation">
        <Menu
          mode="horizontal"
          items={centerMenu}
          className="sw-header-menu"
          onClick={(info: any) => handleNavigate(info.key as string)}
          triggerSubMenuAction="hover"
          selectable={false}
        />
      </div>

      {/* RIGHT */}
      <div className="sw-header-right" role="group" aria-label="Header actions">
        {/* Bell - visible but NON-INTERACTIVE */}
        <span className="sw-header-item-notif" title="Notifications" aria-hidden="true">
          <Badge count={cart.length} size="small">
            <BellOutlined className="sw-header-icon-cart" />
          </Badge>
        </span>

        {/* Profile dropdown */}
        <Dropdown
          overlay={profileMenu}
          trigger={["click"]}
          placement="bottomRight"
          getPopupContainer={() => document.body}
          overlayClassName="sw-profile-dropdown-wrapper"
        >
          <span
            className="sw-header-item-profile"
            onClick={(e) => e.preventDefault()}
            role="button"
            tabIndex={0}
            aria-haspopup="true"
          >
            <Avatar size="small" icon={<UserOutlined />} />
            <span className="sw-profile-text">Profile</span>
          </span>
        </Dropdown>
      </div>

      {/* MOBILE MENU BUTTON */}
      <div className="sw-mobile-menu-btn" aria-hidden="false">
        <MenuOutlined
          className="sw-header-icon-large"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          role="button"
          tabIndex={0}
        />
      </div>

      {/* LEFT DRAWER (mobile) */}
      <Drawer title="Menu" placement="left" onClose={() => setOpen(false)} open={open}>
        <Menu
          mode="vertical"
          items={[
            ...centerMenu,
            {
              key: "cart",
              label: (
                <span
                  onClick={() => {
                    setCartOpen(true);
                    setOpen(false);
                  }}
                >
                  <ShoppingCartOutlined /> Cart ({cart.length})
                </span>
              ),
            },
            {
              key: "bookings",
              label: (
                <span
                  onClick={() => {
                    handleNavigate("bookings");
                    setOpen(false);
                  }}
                >
                  <HomeOutlined /> Recent Booking
                </span>
              ),
            },
            {
              key: "logout",
              label: (
                <span
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                >
                  <LogoutOutlined /> Logout
                </span>
              ),
            },
          ]}
          onClick={(info) => {
            if (!["cart", "logout", "bookings"].includes(info.key)) {
              handleNavigate(info.key as string);
              setOpen(false);
            }
          }}
        />
      </Drawer>

      {/* RIGHT DRAWER - CART */}
      <Drawer
        title={null}
        placement="right"
        width={350}
        onClose={() => setCartOpen(false)}
        open={cartOpen}
        closable={false}
        bodyStyle={{ padding: 0 }}
      >
        <div className="sw-cart-drawer-header" role="banner">
          <div className="sw-cart-drawer-title" aria-live="polite">
            {cart.length === 0 ? "Your cart is empty" : `Your cart (${cart.length})`}
          </div>

          <button
            className="sw-cart-drawer-close-btn"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
            title="Close"
          >
            <CloseOutlined />
          </button>
        </div>

        <div className="sw-cart-drawer-content">
          {cart.length === 0 ? (
            <div className="sw-cart-empty-note">Nothing here yet — add items to your cart.</div>
          ) : (
            <div className="sw-cart-list">
              {cart.map((item: any, index: number) => (
                <div key={index} className="sw-cart-item">
                  <img src={item.image} alt={item.title} />
                  <div className="sw-cart-item-details">
                    <h4>{item.title}</h4>
                    <p>Qty: {item.quantity}</p>
                    <p>Total: ₹{item.totalPrice}</p>
                  </div>
                  <div className="sw-cart-buttons">
                    <Button onClick={() => navigate("/checkout")}>Buy Now</Button>
                    <Button danger type="primary" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default HeaderBar;
