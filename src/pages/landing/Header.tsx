// src/pages/landing/Header.tsx
import React, { useState, useEffect } from "react";
//import { setUserDetails } from "../../utils/helpers/storage";
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
  Radio,
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import { customerRegister, customerLogin } from "../../api/customerAuth"; // ✅ NEW

import "./Header.css";

const navItems = [
  { key: "home", label: <Link to="/landing">Home</Link> },
  {
    key: "cleaning",
    label: <Link to="/cleaningservice">Cleaning&Home Services</Link>,
  },
  { key: "packers", label: <Link to="/LandingPackers">Transport</Link> },

  {
    key: "commercial",
    label: <Link to="/commercial-plots">Buy/Sale/Rentals</Link>,
  },
  { key: "materials", label: <Link to="/ConstructionMaterials">Raw Materials</Link> },
  { key: "education", label: <Link to="/">Education</Link> },
  { key: "Swachifyproducts", label: <Link to="/">Swachify Products</Link> },
  { key: "freelancer", label: <Link to="/Freelancer">Freelancer</Link> },
];

const { TabPane } = Tabs;

const CommonHeader: React.FC<{ selectedKey?: string }> = ({
  selectedKey = "home",
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalVisible, setAuthModalVisible] = useState(false);

  const [forgotModalVisible, setForgotModalVisible] = useState(false);
  const [vendorModalVisible, setVendorModalVisible] = useState(false);

  const [activeAuthTab, setActiveAuthTab] = useState<"login" | "register">(
    "register"
  );

  const [authLoading, setAuthLoading] = useState(false); // ✅ NEW
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

  // ==========================
  // CUSTOMER LOGIN (BACKEND)
  // ==========================
  const onLogin = async (values: any) => {
  try {
    const identifier = values.identifier?.toString().trim();
    const password = values.password;

    // Admin (local) – keep
    if (identifier === "admin@gmail.com" && password === "1234") {
      message.success("Admin login successful");
      closeAuthModal();
      navigate("/adminshell/dashboard");
      return;
    }

    const loginPayload = {
      email_or_phone: identifier,
      password,
    };

    setAuthLoading(true);

    const res: any = await customerLogin(loginPayload);

    if (res?.access_token) {
      localStorage.setItem("accessToken", res.access_token);
    }

    if (res?.user) {
      localStorage.setItem("user", JSON.stringify(res.user));
    }

    message.success("Login successful");
    closeAuthModal();
    navigate("/app/dashboard");
  } catch (err: any) {
    console.error("Login error", err);
    message.error(
      err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Invalid login credentials"
    );
  } finally {
    setAuthLoading(false);
  }
};


  // ==========================
  // VENDOR LOGIN (still local)
  // ==========================
  const onVendorLogin = (values: any) => {
    console.log("Vendor Login:", values);

    localStorage.setItem("isVendorLoggedIn", "true");
    navigate("/vendor");
    setVendorModalVisible(false);
    message.success("Vendor Login Successful!");
  };

  // ==========================
  // CUSTOMER REGISTER (BACKEND)
  // ==========================
  const onRegister = async (values: any) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirm,
      address,
      gender,
    } = values;

    const genderMap: any = {
      male: 1,
      female: 2,
      other: 3,
    };

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email,
      mobile: phone,
      password,
      confirm_password: confirm,
      gender_id: genderMap[gender], // backend expects number
      address,
    };

    setAuthLoading(true);

    const res: any = await customerRegister(payload);

    message.success(
      res?.message || "Registration successful. Check your email."
    );

    setActiveAuthTab("login");
  } catch (err: any) {
    console.error("Registration error", err);
    message.error(
      err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Registration failed"
    );
  } finally {
    setAuthLoading(false);
  }
};


  return (
    <>
      <header className="swl-hs-navbar">
        <div className="swl-hs-navbar-logo">
          <span className="swl-hs-logo-text">SWACHIFY INDIA</span>
        </div>

        <button
          className="swl-mobile-menu-icon"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>

        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          className="swl-hs-navbar-menu"
          items={navItems}
        />

        <Button
          className="swl-hs-contact-btn swl-signup-btn"
          onClick={() => openAuthModal("register")}
          htmlType="button"
        >
          Sign Up
        </Button>
      </header>

      {menuOpen && (
        <ul className="swl-mobile-menu">
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

      {/* AUTH MODAL */}
      <Modal
        open={authModalVisible}
        onCancel={closeAuthModal}
        footer={null}
        centered
        width={520}
        destroyOnClose
        bodyStyle={{
          padding: 24,
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        <Tabs
          activeKey={activeAuthTab}
          onChange={(key) => setActiveAuthTab(key as "login" | "register")}
          centered
        >
          {/* LOGIN TAB */}
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
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <div className="swl-login-options-row">
                <Checkbox>Remember me</Checkbox>

                <span
                  className="swl-forgot-password-text"
                  onClick={() => {
                    setForgotModalVisible(true);
                    setAuthModalVisible(false);
                  }}
                >
                  Forgot Password?
                </span>
              </div>

              <Form.Item>
                <Button block htmlType="submit" loading={authLoading}>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          {/* REGISTER TAB */}
          <TabPane tab="Register" key="register">
            <Form layout="vertical" onFinish={onRegister} preserve={false}>
              {/* First Name & Last Name */}
              <div style={{ display: "flex", gap: 8 }}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    { required: true, message: "Please enter your first name" },
                  ]}
                  style={{ flex: 1 }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    { required: true, message: "Please enter your last name" },
                  ]}
                  style={{ flex: 1 }}
                >
                  <Input />
                </Form.Item>
              </div>

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

              {/* Gender - Radio Buttons */}
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  { required: true, message: "Please select your gender" },
                ]}
              >
                <Radio.Group>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </Radio.Group>
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
                      return !value || getFieldValue("password") === value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Passwords do not match"));
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
                <Input.TextArea rows={3} placeholder="Enter your address" />
              </Form.Item>

              <Form.Item>
                <Button block htmlType="submit" loading={authLoading}>
                  Register
                </Button>
              </Form.Item>

              <Form.Item style={{ marginTop: -10 }}>
                <a
                  onClick={() => {
                    setAuthModalVisible(false);
                    setVendorModalVisible(true);
                  }}
                >
                  Are you a vendor?
                </a>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>

      {/* FORGOT PASSWORD MODAL – placeholder for now */}
      <Modal
        open={forgotModalVisible}
        onCancel={() => {
          setForgotModalVisible(false);
          setActiveAuthTab("login");
          setAuthModalVisible(true);
        }}
        footer={null}
        centered
        width={450}
        destroyOnClose
      >
        <h3 className="swl-forgot-modal-title">Reset Password</h3>

        <Form
          layout="vertical"
          onFinish={(values) => {
            const email = (values.email || "").trim();
            if (!email) {
              message.error("Please enter email");
              return;
            }

            // TODO: integrate with backend forgot-password endpoint if available
            message.success(
              "If this email is registered, a reset link will be sent."
            );

            setForgotModalVisible(false);
            setActiveAuthTab("login");
            setAuthModalVisible(true);
          }}
        >
          <Form.Item
            label="Enter Registered Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="yourmail@example.com" />
          </Form.Item>

          <Form.Item>
            <Button block htmlType="submit">
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* VENDOR MODAL (unchanged, still local) */}
      <Modal
        open={vendorModalVisible}
        onCancel={() => setVendorModalVisible(false)}
        footer={null}
        centered
        width={550}
        destroyOnClose
        title="Vendor Authentication"
        bodyStyle={{
          maxHeight: "65vh",
          overflowY: "auto",
        }}
      >
        <Tabs defaultActiveKey="vendor_register" centered>
          {/* VENDOR LOGIN TAB */}
          <Tabs.TabPane tab="Login" key="vendor_login">
            <Form layout="vertical" onFinish={onVendorLogin}>
              <Form.Item
                label="Email / Phone"
                name="identifier"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter email or phone" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" block htmlType="submit">
                  Login as Vendor
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>

          {/* VENDOR REGISTER TAB */}
          <Tabs.TabPane tab="Register" key="vendor_register">
            <Form
              layout="vertical"
              onFinish={(values) =>
                console.log("Vendor Register:", values)
              }
            >
              <Form.Item
                label="Business Name"
                name="businessName"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Owner Name"
                name="ownerName"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: "email" }]}
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
                label="PAN"
                name="pan"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="TAN/GSTIN"
                name="tan/gstin"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Service Category"
                name="category"
                rules={[{ required: true }]}
              >
                <Input placeholder="Cleaning / Transport / Plumbing..." />
              </Form.Item>

              <Form.Item
                label="Business Address"
                name="address"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" block htmlType="submit">
                  Register as Vendor
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default CommonHeader;
