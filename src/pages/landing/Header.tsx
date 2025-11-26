// src/components/CommonHeader/Header.tsx
import React, { useState } from "react";
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

// If you want to use the uploaded file as logo, use this path:
// const logoPath = "/mnt/data/1507b6e8-4a56-495f-b793-503f30788bda.png";

const navItems = [
  { key: "home", label: <Link to="/landing">Home</Link> },
  { key: "cleaning", label: <Link to="/cleaningservice">Cleaning</Link> },
  { key: "packers", label: <Link to="/LandingPackers">Packers & Movers</Link> },
  { key: "home_services", label: <Link to="/home_service">Home Services</Link> },
  { key: "rentals", label: <Link to="/rentals">Rentals</Link> },
  { key: "commercial", label: <Link to="/commercial-plots">Buy&Sale Properties</Link> },
  { key: "materials", label: <Link to="/ConstructionMaterials">Construction Materials</Link> },
  { key: "freelancer", label: <Link to="/Freelancer">Freelancer</Link> },
];

const { TabPane } = Tabs;

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

  const onLogin = async (values: any) => {
    // placeholder - replace with real auth call
    console.log("login values", values);
     const userData = {
            name: "Test User",
            email: values.identifier,
          };
          
          console.log('__logs',userData)
          setUserDetails("user", userData);
        
          navigate("/app/dashboard");
        message.success("Login successful");

    // message.success("Login successful");
    closeAuthModal();
  };

  const onRegister = async (values: any) => {
    // placeholder - replace with real register call
    console.log("register values", values);
    message.success("Registration successful");
    closeAuthModal();
    navigate("/app/dashboard");
  };

  return (
    <>
      <header className="hs-navbar">
        <div className="hs-navbar-logo">
          {/* Use image logo if available, else text */}
          {/* <img src={logoPath} alt="logo" className="hs-logo-image" /> */}
          <span className="hs-logo-text">SWACHIFY INDIA</span>
        </div>

        <button
          className="mobile-menu-icon"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((s) => !s)}
          type="button"
        >
          {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>

        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          className="hs-navbar-menu"
          items={navItems}
        />

<Button
  type="primary"
  className="hs-contact-btn"
  onClick={() => openAuthModal("register")}
  htmlType="button"      // <--- prevent accidental form submit
>
  Sign Up
</Button>

      </header>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <ul className="mobile-menu">
          {navItems.map((n) => (
            <li key={n.key} onClick={() => setMenuOpen(false)}>
              {n.label}
            </li>
          ))}
          <li>
            <Link to="/Cart" onClick={() => setMenuOpen(false)}>Cart</Link>
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

      {/* Auth modal shared across pages */}
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
            <Form layout="vertical" name="loginForm" onFinish={onLogin} preserve={false}>
              <Form.Item label="Email / Phone" name="identifier" rules={[{ required: true }]}>
                <Input placeholder="john@example.com or +1 555 123 4567" />
              </Form.Item>

              <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                <Input.Password placeholder="Password" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button type="primary" block htmlType="submit">Login</Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Register" key="register">
            <Form layout="vertical" name="registerForm" onFinish={onRegister} preserve={false}>
              <Form.Item label="Full name" name="fullname" rules={[{ required: true }]}>
                <Input placeholder="John Doe" />
              </Form.Item>

              <Form.Item label="Email" name="email" rules={[{ required: true }, { type: "email" }]}>
                <Input placeholder="john@example.com" />
              </Form.Item>

              <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
                <Input placeholder="+1 555 123 4567" />
              </Form.Item>

              <Form.Item label="Password" name="password" rules={[{ required: true }]} hasFeedback>
                <Input.Password placeholder="Choose a password" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
              </Form.Item>

              <Form.Item label="Confirm Password" name="confirm" dependencies={["password"]} hasFeedback rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) return Promise.resolve();
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}>
                <Input.Password placeholder="Confirm password" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" block htmlType="submit">Register</Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default CommonHeader;
