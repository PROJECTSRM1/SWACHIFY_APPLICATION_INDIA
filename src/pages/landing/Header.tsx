// src/pages/landing/Header.tsx
import React, { useState, useEffect } from "react";
import { setUserDetails } from "../../utils/helpers/storage";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Menu,
  Modal,
  Tabs,
  Form,
  Input,
  Checkbox,
  message,
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import "./Header.css";

const navItems = [
  { key: "home", label: <Link to="/landing">Home</Link> },
  { key: "cleaning", label: <Link to="/cleaningservice">Cleaning&Home Services</Link> },
  { key: "packers", label: <Link to="/LandingPackers">Transport</Link> },
  { key: "commercial", label: <Link to="/commercial-plots">Buy/Sale/Rentals</Link> },
  { key: "materials", label: <Link to="/ConstructionMaterials">Raw Materials</Link> },
  { key: "education", label: <Link to="/">Education</Link> },
  { key: "Swachifyproducts", label: <Link to="/">Swachify Products</Link> },
  { key: "freelancer", label: <Link to="/Freelancer">Freelancer</Link> },
];

const { TabPane } = Tabs;

type RegisteredUser = {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  address?: string;
};

const STORAGE_KEY = "swachify_registered_user";

const CommonHeader: React.FC<{ selectedKey?: string }> = ({ selectedKey = "home" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState<"login" | "register">("register");

  const navigate = useNavigate();

  const openAuthModal = (tab: "login" | "register" = "register") => {
    setActiveAuthTab(tab);
    setAuthModalVisible(true);
    setMenuOpen(false);
  };

  const closeAuthModal = () => setAuthModalVisible(false);

  // Expose openAuthModal/closeAuthModal on window so pages (like CommercialPlots) can call it
  useEffect(() => {
    (window as any).openAuthModal = (tab: "login" | "register" = "login") => {
      openAuthModal(tab);
    };
    (window as any).closeAuthModal = () => {
      closeAuthModal();
    };

    return () => {
      try {
        delete (window as any).openAuthModal;
        delete (window as any).closeAuthModal;
      } catch (e) {
        // ignore deletion errors
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  const onLogin = async (values: any) => {
    try {
      const identifier = (values.identifier || "").toString().trim();
      const password = (values.password || "").toString();

      if (!identifier || !password) {
        message.error("Please enter identifier and password");
        return;
      }

      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        message.error("No registered user found. Please register first.");
        return;
      }

      const user: RegisteredUser = JSON.parse(stored);

      const identifierMatches =
        identifier.toLowerCase() === user.email.toLowerCase() ||
        identifier === user.phone;

      if (identifierMatches && password === user.password) {
        setUserDetails("user", {
          name: user.fullname,
          email: user.email,
          phone: user.phone,
          address: user.address,
        });
        message.success("Login successful");
        closeAuthModal();
        navigate("/app/dashboard");
      } else {
        message.error("Invalid credentials. Please check email/phone and password.");
      }
    } catch (err) {
      console.error("Login error", err);
      message.error("An error occurred while logging in.");
    }
  };

  // After register, save user and switch to login tab (do NOT auto-login)
  const onRegister = async (values: any) => {
    try {
      const fullname = (values.fullname || "").toString().trim();
      const email = (values.email || "").toString().trim();
      const phone = (values.phone || "").toString().trim();
      const password = (values.password || "").toString();
      const address = (values.address || "").toString().trim();

      if (!fullname || !email || !phone || !password) {
        message.error("Please fill all required fields");
        return;
      }

      const newUser: RegisteredUser = {
        fullname,
        email,
        phone,
        password,
        address,
      };

      // persist registered user
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));

      // Keep modal open but switch to login tab so user can enter credentials
      message.success("Registration successful. Please log in to continue.");
      setActiveAuthTab("login");
      // leave authModalVisible as true so login form is visible
    } catch (err) {
      console.error("Registration error", err);
      message.error("An error occurred while registering.");
    }
  };

  return (
    <>
      <header className="sw-hs-navbar">
        <div className="sw-hs-navbar-logo">
          <span className="sw-hs-logo-text">SWACHIFY INDIA</span>
        </div>

        <button
          className="sw-mobile-menu-icon"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>

        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          className="sw-hs-navbar-menu"
          items={navItems}
        />

        <Button
          className="sw-hs-contact-btn sw-signup-btn"
          onClick={() => openAuthModal("register")}
          htmlType="button"
        >
          Sign Up
        </Button>
      </header>

      {menuOpen && (
        <ul className="sw-mobile-menu">
          {navItems.map((n) => (
            <li key={n.key} onClick={() => setMenuOpen(false)}>
              {n.label}
            </li>
          ))}
          <li>
            <Link to="/Cart" onClick={() => setMenuOpen(false)}>
              Cart
            </Link>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                openAuthModal("login");
              }}
            >
              Login
            </a>
          </li>
        </ul>
      )}

      <Modal
        open={authModalVisible}
        onCancel={closeAuthModal}
        footer={null}
        centered
        width={520}
        bodyStyle={{ padding: 24 }}
        destroyOnClose
      >
        <Tabs
          activeKey={activeAuthTab}
          onChange={(key) => setActiveAuthTab(key as "login" | "register")}
          centered
        >
          <TabPane tab="Login" key="login">
            <Form layout="vertical" onFinish={onLogin} preserve={false}>
              <Form.Item
                label="Email / Phone"
                name="identifier"
                rules={[{ required: true }]}
              >
                <Input placeholder="john@example.com or +91 98765 43210" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
              >
                <Input.Password
                  iconRender={(v) =>
                    v ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button block htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Register" key="register">
            <Form layout="vertical" onFinish={onRegister} preserve={false}>
              <Form.Item
                label="Full name"
                name="fullname"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true }, { type: "email" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value)
                        return Promise.resolve();
                      return Promise.reject(
                        new Error("Passwords do not match")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true }]}
              >
                <Input.TextArea
                  rows={3}
                  placeholder="Enter your address (street, city, state, pincode)"
                />
              </Form.Item>

              <Form.Item>
                <Button block htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default CommonHeader;
