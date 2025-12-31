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
  //Radio,
} from "antd";

import { Select } from "antd";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import axios from "axios";


import { customerRegister, customerLogin } from "../../api/customerAuth";

import "./Header.css";

const navItems = [
  { key: "home", label: <Link to="/landing">Home</Link> },
  { key: "cleaning", label: <Link to="/cleaningservice">Cleaning & Home Services</Link> },
  { key: "packers", label: <Link to="/LandingPackers">Transport</Link> },
  { key: "commercial", label: <Link to="/commercial-plots">Buy/Sale/Rentals</Link> },
  { key: "materials", label: <Link to="/ConstructionMaterials">Raw Materials</Link> },
  { key: "education", label: <Link to="/education">Education</Link> },
  {
    key: "Swachifyproducts",
    label: <Link to="/swachify-products">Swachify Products</Link>,
  },
  { key: "freelancer", label: <Link to="/Freelancer">Freelancer</Link> },
];

const { TabPane } = Tabs;

const adminRegister = async (payload: any) => {
  return axios.post(
    "https://swachify-india-be-1-mcrb.onrender.com/api/admin/register",
    payload
  );
};

console.log(adminRegister)


const CommonHeader: React.FC<{ selectedKey?: string }> = ({
  selectedKey = "home",
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [forgotModalVisible, setForgotModalVisible] = useState(false);
  const [vendorModalVisible, setVendorModalVisible] = useState(false);
  type RoleType = "vendor" | "admin";
const [roleType, setRoleType] = useState<RoleType>("vendor");


  const [activeAuthTab, setActiveAuthTab] = useState<"login" | "register">(
  "login"
);

const [vendorActiveTab, setVendorActiveTab] = useState<
  "login" | "vendor_register" | "admin_register"
>("login");


  const [authLoading, setAuthLoading] = useState(false); 
  const navigate = useNavigate();

  const openAuthModal = (tab: "login" | "register" = "login") => {
    setActiveAuthTab(tab);
    setAuthModalVisible(true);
    setMenuOpen(false);
  };

  const closeAuthModal = () => {
  localStorage.removeItem("loginSource");
  setAuthModalVisible(false);
};

  const [vendorForgotModalVisible, setVendorForgotModalVisible] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  console.log(emailValue);
  const hideSkipLogin =
  localStorage.getItem("loginSource") === "addToCart";


 
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
  }, []); // run once on mount

  // ==========================
  // CUSTOMER LOGIN (BACKEND)
  // ==========================
const onLogin = async (values: any) => {
  try {
    setAuthLoading(true);

    // ================= ADMIN LOGIN =================
if (roleType === "admin") {
  const res = await axios.post(
    "https://swachify-india-be-1-mcrb.onrender.com/api/admin/login",
    {
      username_or_email: values.username.trim(),
      password: values.password,
    }
  );


console.log("ADMIN LOGIN RESPONSE:", res.data);

localStorage.setItem("token", res.data.access_token);



      message.success("Admin login successful");
      setVendorModalVisible(false);
      navigate("/adminshell/dashboard");
      return;
    }

    // ================= CUSTOMER LOGIN =================
    const res: any = await customerLogin({
      email_or_phone: values.identifier,
      password: values.password,
    });

    localStorage.setItem("accessToken", res.access_token);
    localStorage.setItem("user", JSON.stringify(res.user));

    closeAuthModal();
    navigate("/app/dashboard");
  } catch (err: any) {
    message.error(
      err?.response?.data?.message || "Invalid login credentials"
    );
  } finally {
    setAuthLoading(false);
  }
};const onAdminLogin = async (values: any) => {
  try {
    setAuthLoading(true);

    const res = await axios.post(
      "https://swachify-india-be-1-mcrb.onrender.com/api/admin/login",
      {
        username_or_email: values.username.trim(),
        password: values.password,
      }
    );

    console.log("ADMIN LOGIN RESPONSE:", res.data);

    const token =
      res.data?.access_token ||
      res.data?.token ||
      res.data?.accessToken;

    if (!token) {
      message.error("Admin token not received");
      return;
    }

    localStorage.setItem("token", token);

    message.success("Admin login successful");
    setVendorModalVisible(false);
    navigate("/adminshell/dashboard");
  } catch (err: any) {
    message.error(
      err?.response?.data?.message || "Admin login failed"
    );
  } finally {
    setAuthLoading(false);
  }
};



  const handleSkipLogin = () => {
  localStorage.setItem("isGuest", "true");
  
   localStorage.removeItem("accessToken");
  localStorage.removeItem("user");

  closeAuthModal();

 
  navigate("/app/dashboard");
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



const onRegister = async (values: any) => {
  try {
    setAuthLoading(true);

if (roleType === "admin") {
  const res = await axios.post(
    "https://swachify-india-be-1-mcrb.onrender.com/api/admin/login",
    {
      username_or_email: values.username?.trim(),
      password: values.password,
    }
  );

  // 🔍 SEE REAL RESPONSE
  console.log("ADMIN LOGIN RESPONSE:", res.data);

  // ✅ EXTRACT TOKEN SAFELY
  const token =
    res.data?.access_token ||
    res.data?.token ||
    res.data?.accessToken;

  if (!token) {
    message.error("Admin token not received from backend");
    return;
  }

  // ✅ STORE TOKEN USING CORRECT KEY
  localStorage.setItem("token", token);

  message.success("Admin login successful");
  setVendorModalVisible(false);
  navigate("/adminshell/dashboard");
  return;
}





    // ================= CUSTOMER REGISTER =================
  const payload = {
  first_name: values.firstName,
  last_name: values.lastName,
  email: values.email,
  mobile: values.phone,
  password: values.password,
  confirm_password: values.confirm,
  gender_id: values.gender, // ✅ DIRECT NUMBER
  address: values.address ?? "",
};


    await customerRegister(payload);

    message.success("Registration successful");
    setActiveAuthTab("login");
  } catch (err: any) {
  console.error("ADMIN REGISTER ERROR FULL:", err.response);
  message.error(
    err.response?.data?.message ||
    err.response?.data?.error ||
    "Admin registration failed"
  );
}
  finally {
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
          onClick={() => openAuthModal("login")}
          htmlType="button"
        >
          Sign Up
        </Button>

      </header>

      {/* Spacer so content starts below fixed navbar */}
      <div className="swl-hs-navbar-spacer" />

      {menuOpen && (
        <ul className="swl-mobile-menu">
          {navItems.map((n) => (
            <li key={n.key} onClick={() => setMenuOpen(false)}>
              {n.label}
            </li>
          ))}
          {/* <li>
            <Link to="/Cart" onClick={() => setMenuOpen(false)}>
              Cart
            </Link>
          </li> */}
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
             {!hideSkipLogin && (
  <Form.Item>
    <Button block type="default" onClick={handleSkipLogin}>
      Skip Login
    </Button>
  </Form.Item>
)}


            </Form>
          </TabPane>

          {/* REGISTER TAB */}
          <TabPane tab="Register" key="register">
            <Form layout="vertical" onFinish={onRegister} preserve={false}>
              <div style={{ display: "flex", gap: 8 }}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    { required: true, message: "Please enter your first name" },
                    { min: 2, message: "First name must be at least 2 characters" },
                    {
                      pattern: /^[A-Za-z]+$/,
                      message: "First name must contain only letters",
                    },
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
                    { min: 2, message: "Last name must be at least 2 characters" },
                    {
                      pattern: /^[A-Za-z]+$/,
                      message: "Last name must contain only letters",
                    },
                  ]}
                  style={{ flex: 1 }}
                >
                  <Input />
                </Form.Item>
              </div>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  {
                    type: "email",
                    message: "Enter a valid email (Ex: abcd@gmail.com)",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please enter phone number" },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Phone number must be exactly 10 digits",
                  },
                ]}
              >
                <Input maxLength={10} />
              </Form.Item>
<Form.Item
  label="Gender"
  name="gender"
  rules={[{ required: true, message: "Please select gender" }]}
>
  <Select placeholder="Select Gender">
    <Select.Option value={1}>Male</Select.Option>
    <Select.Option value={2}>Female</Select.Option>
    <Select.Option value={3}>Other</Select.Option>
  </Select>
</Form.Item>



              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter password" },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Password must have 1 uppercase, 1 lowercase, 1 digit & 1 special symbol (Ex: Abcd123@)",
                  },
                ]}
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
                  { required: true, message: "Please confirm your password" },
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

              {/* ADDRESS */}
              {/* <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please enter your address" },
                  { min: 5, message: "Address must be at least 8 characters" },
                ]}
              >
                <Input.TextArea rows={3} placeholder="Enter your address" />
              </Form.Item> */}

              <Form.Item>
                <Button block htmlType="submit" loading={authLoading}>
                  Register
                </Button>
              </Form.Item>

<Form.Item style={{ marginTop: -10, textAlign: "center" }}>
  <div style={{ display: "flex", justifyContent: "space-between" }}>
<a
  onClick={() => {
    setAuthModalVisible(false);
    setRoleType("vendor");
    setVendorModalVisible(true);
  }}
>
  Are you a vendor?
</a>


<a
  onClick={() => {
    setAuthModalVisible(false);
setRoleType("admin");
setVendorActiveTab("admin_register");
setVendorModalVisible(true);

  }}
  style={{ fontWeight: 500 }}
>
  Are you an admin?
</a>


  </div>
</Form.Item>

            </Form>
          </TabPane>
        </Tabs>
      </Modal>

      {/* FORGOT PASSWORD for Customer */}
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
        {(() => {
          const [step, setStep] = useState(1); // 1 = email, 2 = OTP, 3 = new password

          const [form] = Form.useForm();

          const handleSendOTP = async () => {
            try {
              const email = form.getFieldValue("email");

              if (!email) {
                message.error("Please enter email");
                return;
              }

              setEmailValue(email);
              console.log(setEmailValue);

              message.success("OTP sent to your registered email.");

              setStep(2);
            } catch (err) {
              message.error("Failed to send OTP");
            }
          };

          const handleVerifyOTP = async () => {
            try {
              const otp = form.getFieldValue("otp");

              if (!otp) {
                message.error("Please enter OTP");
                return;
              }

              message.success("OTP verified successfully.");

              setStep(3);
            } catch (err) {
              message.error("Invalid OTP");
            }
          };

          const handleUpdatePassword = async () => {
            try {
              const newPass = form.getFieldValue("newPassword");
              const confirmPass = form.getFieldValue("confirmNewPassword");

              if (!newPass || !confirmPass) {
                message.error("Please fill all fields");
                return;
              }

              if (newPass !== confirmPass) {
                message.error("Passwords do not match");
                return;
              }

              message.success("Password updated successfully.");

              setForgotModalVisible(false);
              setActiveAuthTab("login");
              setAuthModalVisible(true);
            } catch (err) {
              message.error("Failed to update password");
            }
          };

          return (
            <Form form={form} layout="vertical">
              <h3 className="swl-forgot-modal-title">
                {step === 1 && "Reset Password"}
                {step === 2 && "Enter OTP"}
                {step === 3 && "Set New Password"}
              </h3>

              {step === 1 && (
                <>
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

                  <Button className="otp-btn" block type="primary" onClick={handleSendOTP}>
                    Send Reset OTP
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <Form.Item
                    label="Enter OTP"
                    name="otp"
                    rules={[{ required: true, message: "Please enter OTP" }]}
                  >
                    <Input maxLength={6} placeholder="Enter 6-digit OTP" />
                  </Form.Item>

                  <Button block type="primary" onClick={handleVerifyOTP}>
                    Verify OTP
                  </Button>
                </>
              )}

              {step === 3 && (
                <>
                  <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                      { required: true, message: "Please enter new password" },
                      {
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                        message:
                          "Password must include uppercase, lowercase, digit & special symbol",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    label="Confirm Password"
                    name="confirmNewPassword"
                    dependencies={["newPassword"]}
                    hasFeedback
                    rules={[
                      { required: true, message: "Please confirm your password" },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          return !value || getFieldValue("newPassword") === value
                            ? Promise.resolve()
                            : Promise.reject(new Error("Passwords do not match"));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Button block type="primary" onClick={handleUpdatePassword}>
                    Update Password
                  </Button>
                </>
              )}
            </Form>
          );
        })()}
      </Modal>

      {/* VENDOR Forgot Password */}
      <Modal
        open={vendorForgotModalVisible}
        onCancel={() => {
          setVendorForgotModalVisible(false);
          setVendorModalVisible(true);
        }}
        footer={null}
        centered
        width={450}
        destroyOnClose
      >
        {(() => {
          const [step, setStep] = useState(1);
          const [form] = Form.useForm();

          const handleSendOTP = () => {
            const email = form.getFieldValue("email");

            if (!email) {
              message.error("Please enter email");
              return;
            }

            message.success("Vendor OTP sent");
            setStep(2);
          };

          const handleVerifyOTP = () => {
            const otp = form.getFieldValue("otp");

            if (!otp) {
              message.error("Enter OTP");
              return;
            }

            message.success("OTP Verified");
            setStep(3);
          };

          const handleUpdatePassword = () => {
            const newPass = form.getFieldValue("newPassword");
            const confirmPass = form.getFieldValue("confirmNewPassword");

            if (!newPass || !confirmPass) {
              message.error("Fill all fields");
              return;
            }

            if (newPass !== confirmPass) {
              message.error("Passwords do not match");
              return;
            }

            message.success("Vendor password updated!");

            setVendorForgotModalVisible(false);
            setVendorModalVisible(true);
          };

          return (
            <Form form={form} layout="vertical">
              <h3 style={{ textAlign: "center", marginBottom: 20 }}>
                {step === 1 && "Vendor Password Reset"}
                {step === 2 && "Verify OTP"}
                {step === 3 && "Set New Password"}
              </h3>

              {step === 1 && (
                <>
                  <Form.Item
                    label="Registered Vendor Email"
                    name="email"
                    rules={[{ required: true, type: "email" }]}
                  >
                    <Input placeholder="business@example.com" />
                  </Form.Item>

                  <Button block type="primary" onClick={handleSendOTP}>
                    Send OTP
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <Form.Item
                    label="Enter OTP"
                    name="otp"
                    rules={[{ required: true }]}
                  >
                    <Input maxLength={6} placeholder="6-digit OTP" />
                  </Form.Item>

                  <Button block type="primary" onClick={handleVerifyOTP}>
                    Verify OTP
                  </Button>
                </>
              )}

              {step === 3 && (
                <>
                  <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                      { required: true },
                      {
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                        message:
                          "Password must include uppercase, lowercase, number & special character",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    label="Confirm Password"
                    name="confirmNewPassword"
                    dependencies={["newPassword"]}
                    rules={[
                      { required: true },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          return !value || getFieldValue("newPassword") === value
                            ? Promise.resolve()
                            : Promise.reject(new Error("Passwords do not match"));
                        },
                      }),
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>

                  <Button block type="primary" onClick={handleUpdatePassword}>
                    Update Password
                  </Button>
                </>
              )}
            </Form>
          );
        })()}
      </Modal>

      {/* VENDOR MODAL (unchanged, still local) */}
      <Modal
        open={vendorModalVisible}
        onCancel={() => setVendorModalVisible(false)}
        footer={null}
        centered
        width={550}
        destroyOnClose
title={roleType === "vendor" ? "Vendor Authentication" : "Admin Authentication"}
        bodyStyle={{
          maxHeight: "65vh",
          overflowY: "auto",
        }}
      >
        {/* VENDOR LOGIN TAB */}
<Tabs
  activeKey={vendorActiveTab}
  onChange={(key) => setVendorActiveTab(key as any)}
  centered
>


{/* LOGIN TAB */}
<Tabs.TabPane tab="Login" key="login">

  {/* VENDOR LOGIN */}
  {roleType === "vendor" && (
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

      <div style={{ textAlign: "right", marginBottom: 12 }}>
        <a
          onClick={() => {
            setVendorModalVisible(false);
            setVendorForgotModalVisible(true);
          }}
        >
          Forgot Password?
        </a>
      </div>

      <Button type="primary" block htmlType="submit">
        Login as Vendor
      </Button>

    </Form>
  )}

  {/* ADMIN LOGIN */}
{roleType === "admin" && (
  <Form layout="vertical" onFinish={onAdminLogin}>


<Form.Item
  label="Email"
  name="username"
  rules={[
    { required: true, message: "Enter admin email" },
    { type: "email", message: "Enter valid email" },
  ]}
>
  <Input placeholder="admin@swachify.com" />
</Form.Item>


      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true }]}
      >
        <Input.Password />
      </Form.Item>

      <Button type="primary" danger block htmlType="submit">
        Login as Admin
      </Button>

    </Form>
  )}

</Tabs.TabPane>


{/* VENDOR REGISTER TAB (UNCHANGED) */}
{roleType === "vendor" && (
  <Tabs.TabPane tab="Register" key="vendor_register">
    <Form
      layout="vertical"
      onFinish={(values) => console.log("Vendor Register:", values)}
    >
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

      <Form.Item label="PAN" name="pan" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="TAN/GSTIN" name="tan/gstin" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Service Category" name="category" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Business Address" name="address" rules={[{ required: true }]}>
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>

      <Button type="primary" block htmlType="submit">
        Register as Vendor
      </Button>
    </Form>
  </Tabs.TabPane>
)}
{/* ADMIN REGISTER TAB */}
{roleType === "admin" && (
<Tabs.TabPane tab="Register" key="admin_register">
    <Form layout="vertical" onFinish={onRegister} preserve={false}>

      <Form.Item label="First Name" name="first_name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Last Name" name="last_name" rules={[{ required: true }]}>
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
        label="Mobile"
        name="mobile"
        rules={[
          { required: true },
          { pattern: /^[0-9]{10}$/, message: "Enter valid 10-digit number" },
        ]}
      >
        <Input maxLength={10} />
      </Form.Item>

<Form.Item
  label="Gender"
  name="gender"
  rules={[{ required: true, message: "Please select gender" }]}
>
  <Select placeholder="Select Gender">
    <Select.Option value={1}>Male</Select.Option>
    <Select.Option value={2}>Female</Select.Option>
    <Select.Option value={3}>Other</Select.Option>
  </Select>
</Form.Item>



      <Form.Item label="Address" name="address" rules={[{ required: true }]}>
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirm_password"
        dependencies={["password"]}
        rules={[
          { required: true },
          ({ getFieldValue }) => ({
            validator(_, value) {
              return !value || getFieldValue("password") === value
                ? Promise.resolve()
                : Promise.reject("Passwords do not match");
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Button type="primary" block htmlType="submit" loading={authLoading}>
        Register as Admin
      </Button>

    </Form>
  </Tabs.TabPane>
)}

        </Tabs>
      </Modal>
      
    </>
  );
};

export default CommonHeader;

