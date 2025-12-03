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
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const [notificationOpen, setNotificationOpen] = useState(false);

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

  const notificationMenu = (
    <Menu
      className="sw-notification-dropdown-menu"
      items={
        cart.length === 0
          ? [
              {
                key: "empty",
                label: <span>No new notifications</span>,
              },
            ]
          : cart.map((item: any, index: number) => ({
              key: index,
              label: (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <strong>New Service Added</strong>
                  <span>{item.title} added to cart</span>
                </div>
              ),
            }))
      }
    />
  );

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
      >
        <HomeOutlined className="sw-logo-icon" />
        <span className="sw-logo-text">Home</span>
      </div>

      {/* CENTER */}
      <div className="sw-header-center">
        <Menu
          mode="horizontal"
          items={centerMenu}
          className="sw-header-menu"
          onClick={(info: any) => handleNavigate(info.key as string)}
          triggerSubMenuAction="hover"
          selectable={false}
        />
      </div>

      <div className="sw-header-right">
        <Dropdown
          overlay={notificationMenu}
          trigger={["click"]}
          placement="bottomRight"
          overlayClassName="sw-notification-dropdown-wrapper"
        >
          <span
            className="sw-header-item-notif"
            role="button"
            tabIndex={0}
            onClick={() => setNotificationOpen(!notificationOpen)}
          >
            <Badge count={cart.length} size="small">
              <BellOutlined className="sw-header-icon-cart" />
            </Badge>
          </span>
        </Dropdown>

        {/* Profile dropdown */}
        <Dropdown
          overlay={profileMenu}
          trigger={["click"]}
          placement="bottomRight"
        >
          <span
            className="sw-header-item-profile"
            onClick={(e) => e.preventDefault()}
            role="button"
            tabIndex={0}
          >
            <Avatar size="small" icon={<UserOutlined />} />
            <span className="sw-profile-text">Profile</span>
          </span>
        </Dropdown>
      </div>

      <div className="sw-mobile-menu-btn">
        <MenuOutlined
          className="sw-header-icon-large"
          onClick={() => setOpen(true)}
        />
      </div>

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
               handleNavigate(info.key);
              setOpen(false);
            }
          }}
        />
      </Drawer>

      <Drawer
        title={null}
        placement="right"
        width={350}
        onClose={() => setCartOpen(false)}
        open={cartOpen}
        closable={true}
        bodyStyle={{ padding: 0 }}
      >
        <div className="sw-cart-drawer-header">
          <div className="sw-cart-drawer-title">
            {cart.length === 0 ? "Your cart is empty" : `Your cart (${cart.length})`}
          </div>

          <button className="sw-cart-drawer-close-btn" onClick={() => setCartOpen(false)}>
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
