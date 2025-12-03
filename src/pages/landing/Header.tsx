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
  Radio,
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
  {
    key: "cleaning",
    label: <Link to="/cleaningservice">Cleaning&Home Services</Link>,
  },
  { key: "packers", label: <Link to="/LandingPackers">Transport</Link> },
 
  { key: "commercial", label: <Link to="/commercial-plots">Buy/Sale/Rentals</Link> },
  { key: "materials", label: <Link to="/ConstructionMaterials">Raw Materials</Link> },
  { key: "education", label: <Link to="/">Education</Link> },
  { key: "Swachifyproducts", label: <Link to="/">Swachify Products</Link> },
  { key: "freelancer", label: <Link to="/Freelancer">Freelancer</Link> },
];

const { TabPane } = Tabs;

type RegisteredUser = {
  firstName?: string;
  lastName?: string;
  fullname?: string; // backward compatibility
  email: string;
  phone: string;
  password: string;
  address?: string;
  gender?: string;
  customerId?: number; // hidden payload to send to DB
};

const STORAGE_KEY = "swachify_registered_user";

const CommonHeader: React.FC<{ selectedKey?: string }> = ({
  selectedKey = "home",
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalVisible, setAuthModalVisible] = useState(false);
  

  const [forgotModalVisible, setForgotModalVisible] = useState(false);

  const [vendorModalVisible, setVendorModalVisible] = useState(false);

  const [activeAuthTab, setActiveAuthTab] = useState<"login" | "register">("register");

  const navigate = useNavigate();

  const openAuthModal = (tab: "login" | "register" = "register") => {
    setActiveAuthTab(tab);
    setAuthModalVisible(true);
    setMenuOpen(false);
  };

  const closeAuthModal = () => setAuthModalVisible(false);

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
        const displayName =
          user.firstName || user.lastName
            ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
            : user.fullname || "";

        setUserDetails("user", {
          name: displayName,
          email: user.email,
          phone: user.phone,
          address: user.address,
          gender: user.gender,
          // customerId is intentionally not exposed in UI,
          // but you can still store it if needed:
          // customerId: user.customerId,
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
  const onVendorLogin = (values: any) => {
  console.log("Vendor Login:", values);

  // Save vendor login flag
  localStorage.setItem("isVendorLoggedIn", "true");

  // Navigate to vendor dashboard
  navigate("/vendor");

  // Close modal
  setVendorModalVisible(false);
  message.success("Vendor Login Successful!");
};


  const onRegister = async (values: any) => {
    try {
      const firstName = (values.firstName || "").toString().trim();
      const lastName = (values.lastName || "").toString().trim();
      const email = (values.email || "").toString().trim();
      const phone = (values.phone || "").toString().trim();
      const password = (values.password || "").toString();
      const address = (values.address || "").toString().trim();
      const gender = (values.gender || "").toString();

      if (!firstName || !lastName || !email || !phone || !password || !gender) {
        message.error("Please fill all required fields");
        return;
      }

      const fullNameCombined = `${firstName} ${lastName}`.trim();

      const newUser: RegisteredUser = {
        firstName,
        lastName,
        fullname: fullNameCombined,
        email,
        phone,
        password,
        address,
        gender,
        customerId: 2, // 🔐 Hidden constant value to send to DB
      };

      // Here you can also call your backend API and pass `newUser`
      // await api.post("/customers", newUser);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));

      setUserDetails("user", {
        name: fullNameCombined,
        email,
        phone,
        address,
        gender,
        // customerId: 2, // optional to keep in client storage too
      });

      message.success("Registration successful. Please login to continue.");
      setActiveAuthTab("login");
      setAuthModalVisible(true);
    } catch (err) {
      console.error("Registration error", err);
      message.error("An error occurred while registering.");
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
                <Button block htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

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
             
              <Form.Item label="Email" name="email" rules={[{ required: true }, { type: "email" }]}>
                <Input />
              </Form.Item>

              <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
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

              <Form.Item label="Address" name="address" rules={[{ required: true }]}>
                <Input.TextArea rows={3} placeholder="Enter your address" />
              </Form.Item>

              <Form.Item>
                <Button block htmlType="submit">
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
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    message.error("No registered user found.");
    return;
  }

  const user = JSON.parse(stored);

  if (email.toLowerCase() !== user.email.toLowerCase()) {
    message.error("Email is not registered.");
    return;
  }

  message.success("Password reset link has been sent to your email.");

 
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
      <Form layout="vertical"  onFinish={onVendorLogin}>

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
      <Form layout="vertical" onFinish={(values) => console.log("Vendor Register:", values)}>

        <Form.Item label="Business Name" name="businessName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Owner Name" name="ownerName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Service Category" name="category" rules={[{ required: true }]}>
          <Input placeholder="Cleaning / Transport / Plumbing..." />
        </Form.Item>

        <Form.Item label="Business Address" name="address" rules={[{ required: true }]}>
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
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
  
