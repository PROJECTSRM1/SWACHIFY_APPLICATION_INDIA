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
  Upload,
} from "antd";

import { Select, TreeSelect } from "antd";


import {
  MenuOutlined,
  CloseOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";

// import axios from "axios";


import { customerRegister, customerLogin } from "../../api/customerAuth";

import "./Header.css";

// ================= INPUT SANITIZERS =================

// Only numbers
const allowOnlyNumbers = (value: string) =>
  value.replace(/[^0-9]/g, "");

// Only letters + spaces
// const allowOnlyLetters = (value: string) =>
//   value.replace(/[^A-Za-z ]/g, "");

// Letters + numbers (no special chars)
const allowAlphaNumeric = (value: string) =>
  value.replace(/[^A-Za-z0-9]/g, "");

// Email-safe characters
const allowEmailChars = (value: string) =>
  value.replace(/[^A-Za-z0-9@._-]/g, "");



const navItems = [
  { key: "home", label: <Link to="/landing">Home</Link> },
  // { key: "education", label: <Link to="/education">Education</Link> },
  // { key: "healthcare", label: <Link to="/healthcare">Health Care</Link> },
  // { key: "packers", label: <Link to="/LandingPackers">Just Ride</Link> },
  // { key: "Swachifyproducts", label: <Link to="/swachify-products">Swachify Products</Link>, },
  // { key: "cleaning", label: <Link to="/cleaningservice">Cleaning & Home Services</Link> },
  // { key: "commercial", label: <Link to="/commercial-plots">Buy/Sale/Rentals</Link> },
  // { key: "materials", label: <Link to="/ConstructionMaterials">Raw Materials</Link> }, 
  // { key: "freelancer", label: <Link to="/Freelancer">Freelancer</Link> },
];

const serviceIdToRoute: Record<number, string> = {
  1: "/app/dashboard/homeservices",
  2: "/app/dashboard/packers",
  3: "/app/dashboard/commercials",
  4: "/app/dashboard/constructions",
  5: "/app/dashboard/education",
  6: "/app/dashboard", // or products page if you add one
  7: "/app/dashboard/healthcare",
};



const { TabPane } = Tabs;



const CommonHeader: React.FC<{ selectedKey?: string }> = ({
  selectedKey = "home",
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [forgotModalVisible, setForgotModalVisible] = useState(false);
  const [vendorModalVisible, setVendorModalVisible] = useState(false);
  type RoleType = "vendor" | "admin";
  const [roleType, setRoleType] = useState<RoleType>("vendor");
  const [showRegisterHint, setShowRegisterHint] = useState<"vendor" | "admin" | null>(null);

  const [showProfessionalFields, setShowProfessionalFields] = useState(false);

  const [isHealthCareSelected, setIsHealthCareSelected] = useState(false);
  const [doctorRoleSelected, setDoctorRoleSelected] = useState(false);

  type UserRole = "customer" | "employee" | "partner" | "admin" | null;

  const [userRole, setUserRole] = useState<UserRole>(null);
  const [partnerModalVisible, setPartnerModalVisible] = useState(false);
  const [partnerActiveTab, setPartnerActiveTab] = useState<"login" | "register">("register");





  const [activeAuthTab, setActiveAuthTab] = useState<"login" | "register">(
    "login"
  );

  const [vendorActiveTab, setVendorActiveTab] = useState<
    "login" | "vendor_register" | "admin_register"
  >("login");


  const [authLoading, setAuthLoading] = useState(false);
  const navigate = useNavigate();
  const [serviceOpen, setServiceOpen] = useState(false);


  const openAuthModal = (tab: "login" | "register" = "login") => {
    setActiveAuthTab(tab);
    setAuthModalVisible(true);
    setMenuOpen(false);
  };
  const [hideWorkType, setHideWorkType] = useState(false);


  const closeAuthModal = () => {
    localStorage.removeItem("loginSource");
    setAuthModalVisible(false);
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 375);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 375);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


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

      }
    };
  }, []);

  useEffect(() => {
    const closeOnScroll = () => {
      setServiceOpen(false);
    };

    window.addEventListener("scroll", closeOnScroll, true);

    return () => {
      window.removeEventListener("scroll", closeOnScroll, true);
    };
  }, []);

  const onLogin = async (values: any) => {
    try {
      setAuthLoading(true);

      // ================= ADMIN LOGIN =================
      // if (roleType === "admin") {
      //   const res = await axios.post(
      //     "https://swachify-india-be-1-mcrb.onrender.com/api/admin/login",
      //     {
      //       username_or_email: values.username.trim(),
      //       password: values.password,
      //     }
      //   );


      //   console.log("ADMIN LOGIN RESPONSE:", res.data);

      //   localStorage.setItem("token", res.data.access_token);
      //   localStorage.setItem("user_role", "freelancer");
      //   localStorage.setItem("user_role", "customer");




      //   message.success("Admin login successful");
      //   setVendorModalVisible(false);
      //   navigate("/adminshell/dashboard");
      //   return;
      // }

      // ================= CUSTOMER LOGIN =================
      const res: any = await customerLogin({
        email_or_phone: values.identifier,
        password: values.password,
      });

      localStorage.setItem("accessToken", res.access_token);
      localStorage.setItem("user", JSON.stringify(res));

      localStorage.removeItem("isGuest");

      const serviceIds: number[] = res.service_ids || [];

      const firstServiceId = serviceIds[0];
      const redirectPath =
        serviceIdToRoute[firstServiceId] || "/app/dashboard";

      console.log("Navigating to:", redirectPath);
      // After successful login
      localStorage.setItem("service_ids", JSON.stringify(res.service_ids));

      closeAuthModal();
      navigate(redirectPath);






      // navigate("/app/dashboard");
    } catch (err: any) {
      message.error(
        err?.response?.data?.message || "Invalid login credentials"
      );
    } finally {
      setAuthLoading(false);
    }
  };

  // const onAdminLogin = async (values: any) => {
  //   try {
  //     setAuthLoading(true);

  //     const res = await axios.post(
  //       "https://swachify-india-be-1-mcrb.onrender.com/api/admin/login",
  //       {
  //         username_or_email: values.username.trim(),
  //         password: values.password,
  //       }
  //     );

  //     console.log("ADMIN LOGIN RESPONSE:", res.data);

  //     const token =
  //       res.data?.access_token ||
  //       res.data?.token ||
  //       res.data?.accessToken;

  //     if (!token) {
  //       message.error("Admin token not received");
  //       return;
  //     }

  //     localStorage.setItem("token", token);

  //     message.success("Admin login successful");
  //     setVendorModalVisible(false);
  //     navigate("/adminshell/dashboard");
  //   } catch (err: any) {
  //     message.error(
  //       err?.response?.data?.message || "Admin login failed"
  //     );
  //   } finally {
  //     setAuthLoading(false);
  //   }
  // };

  const onAdminLogin = async (values: any) => {
    setAuthLoading(true);


    try {
      const savedAdmin = localStorage.getItem("STATIC_ADMIN");


      if (!savedAdmin) {
        message.error("No admin registered. Please register first.");
        return;
      }


      const admin = JSON.parse(savedAdmin);


      if (
        values.email === admin.email &&
        values.password === admin.password
      ) {
        // fake token
        localStorage.setItem("token", "STATIC_ADMIN_TOKEN");
        localStorage.setItem("user_role", "admin");


        message.success("Admin login successful");


        setVendorModalVisible(false);
        navigate("/admin/dashboard");
      } else {
        message.error("Invalid admin credentials");
      }
    } finally {
      setAuthLoading(false);
    }
  };
  // const handleSkipLogin = () => {
  //   localStorage.setItem("isGuest", "true");

  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("user");



  //   // ✅ Guest should see ONLY HealthCare
  //   localStorage.setItem("service_ids", JSON.stringify([7]));


  //   closeAuthModal();
  //   navigate("/app/dashboard");
  // };


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
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const serviceOptions = [
    { title: "Cleaning & Home Services", value: 1 },
    { title: "Just Ride", value: 2 },
    { title: "Buy/Sell/Rental", value: 3 },
    { title: "Raw Materials", value: 4 },
    { title: "Education", value: 5 },
    { title: "Swachify Products", value: 6 },
    { title: "HealthCare", value: 7 },
  ];

  // ✅ Partner Register/Login handler (Education only)

  const onPartnerRegister = (values: any) => {
    // store selected module
    localStorage.setItem("partner_module", values.module);

    message.success("Registration successful. Please login.");

    // ✅ switch to login tab
    setPartnerActiveTab("login");
  };

  const onAdminRegister = async (values: any) => {
    const adminData = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      mobile: values.mobile,
    };


    // ✅ SAVE ADMIN DETAILS LOCALLY
    localStorage.setItem("STATIC_ADMIN", JSON.stringify(adminData));


    message.success("Admin registered successfully");


    // 👉 Go to login tab
    setVendorActiveTab("login");
  };

  const onPartnerLogin = () => {
    const module = localStorage.getItem("partner_module");
    console.log("PARTNER MODULE:", module);

    if (!module) {
      message.error("Module not found. Please register again.");
      return;
    }

    setPartnerModalVisible(false);


    // ✅ SAME NAVIGATION YOU ALREADY HAD
    switch (module) {
      case "education":
        navigate("/partner/education/dashboard");
        break;

      case "realestate":
        navigate("/partner/dashboard");
        break;

      case "healthcare":
        navigate("/partner/healthcare/dashboard");
        break;

      case "products":
        navigate("/partner/products/dashboard");
        break;

      case "ride":
        navigate("/partner/ride/dashboard");
        break;

      default:
        navigate("/");
    }
  };




  const onRegister = async (values: any) => {
    try {
      setAuthLoading(true);

      // if (roleType === "admin") {
      //   const res = await axios.post(
      //     "https://swachify-india-be-1-mcrb.onrender.com/api/admin/login",
      //     {
      //       first_name: values.first_name,
      //       last_name: values.last_name,
      //       email: values.email,
      //       mobile: values.mobile,
      //       gender: values.gender,
      //       address: values.address,
      //       password: values.password,
      //       confirm_password: values.confirm_password,
      //     }
      //   );


      //   // 🔍 SEE REAL RESPONSE
      //   console.log("ADMIN LOGIN RESPONSE:", res.data);


      //   // ✅ EXTRACT TOKEN SAFELY
      //   const token =
      //     res.data?.access_token ||
      //     res.data?.token ||
      //     res.data?.accessToken;


      //   if (!token) {
      //     message.error("Admin token not received from backend");
      //     return;
      //   }


      //   // ✅ STORE TOKEN USING CORRECT KEY
      //   localStorage.setItem("token", token);


      //   message.success("Admin login successful");
      //   setVendorModalVisible(false);
      //   navigate("/adminshell/dashboard");
      //   return;
      // }
      const roleMap = {
        customer: 1,
        employee: 2,
      };

      const selectedRole =
        userRole === "employee"
          ? roleMap.employee
          : roleMap.customer;


      // ================= CUSTOMER REGISTER =================
      const customerPayload = {
        // Values from form items
        first_name: values.firstName?.trim() || "DefaultFirst",
        last_name: values.lastName?.trim() || "DefaultLast",
        email: values.email?.trim() || "user@example.com",
        mobile: values.mobile?.trim() || "9999999999",
        role_id: selectedRole,
        password: values.password || "Default@123",
        confirm_password: values.confirmPassword || "Default@123",
        work_type:
          values.workType === "assigning" ? 1 :
            values.workType === "looking" ? 2 :
              values.workType === "both" ? 3 : 1,
        service_ids: selectedServices.length > 0
          ? selectedServices.map(Number) // <--- Convert strings to numbers
          : [1],


        professional_details: values.experience
          ? {
            experience_years: Number(values.experience) || 1,
            expertise_in: Array.isArray(values.expertise)
              ? values.expertise.map(Number)
              : [1],
            additional_service: values.additionalService?.trim() || "None",
          }
          : undefined,
        government_id: [
          {
            id_type: "aadhaar",
            id_number: values.aadhaar?.trim() || "000000000000"
          }
        ],

        // Hard-coded values
        dob: "2001-01-01",
        gender_id: 1,
        state_id: 1,
        district_id: 1,
        address: values.location?.trim() || "Default Address",
        documents: [], // leave empty for now
      };

      // Call your API
      await customerRegister(customerPayload);

      // Save selected services for dashboard
      localStorage.setItem(
        "user_services",
        JSON.stringify(customerPayload.service_ids)
      );

      // ✅ AUTO LOGIN AFTER REGISTER
      const loginRes: any = await customerLogin({
        email_or_phone: values.email,
        password: values.password,
      });

      // ✅ SAVE LOGIN DATA
      localStorage.setItem("accessToken", loginRes.access_token);
      localStorage.setItem("user", JSON.stringify(loginRes));
      localStorage.setItem(
        "service_ids",
        JSON.stringify(loginRes.service_ids || customerPayload.service_ids)
      );

      // ✅ REDIRECT BASED ON FIRST SERVICE
      message.success("Registration successful");

      // ✅ IF USER IS LOOKING FOR WORK → GO TO FREELANCER LOGIN
      // 🚫 DO NOT AUTO LOGIN FREELANCERS
      if (values.workType === "looking") {
        message.success("Registration successful");

        closeAuthModal();

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        navigate("/freelancerlogin");
        return;
      }


      // ✅ OTHERWISE → NORMAL CUSTOMER FLOW
      const firstServiceId =
        (loginRes.service_ids && loginRes.service_ids[0]) ||
        customerPayload.service_ids[0];

      const redirectPath =
        serviceIdToRoute[firstServiceId] || "/app/dashboard";

      closeAuthModal();
      navigate(redirectPath);




    } catch (err: any) {
      console.error("REGISTER ERROR:", err.response?.data);

      const detail = err.response?.data?.detail;

      if (Array.isArray(detail)) {
        detail.forEach((e: any) => message.error(e.msg));
      } else {
        message.error(
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Registration failed"
        );
      }
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
        <Select
          placeholder="Role"
          style={{ width: 150, marginRight: 12 }}
          onChange={(value: UserRole) => {
            setUserRole(value);

            if (value === "customer" || value === "employee") {
              openAuthModal("register");
            }

            if (value === "partner") {
              setPartnerActiveTab("register");
              setPartnerModalVisible(true);
            }
            if (value === "admin") {
              setRoleType("admin");          // 🔥 important
              setVendorActiveTab("admin_register");
              setShowRegisterHint(null);
              setVendorModalVisible(true);   // 🔥 open admin modal
            }

          }}
        >


          <Select.Option value="customer">Customer</Select.Option>
          <Select.Option value="employee">Employee</Select.Option>
          <Select.Option value="partner">Partner</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
        </Select>


        <Button
          className="swl-hs-contact-btn swl-signup-btn"
          onClick={() => openAuthModal("register")}
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
        className="swl-hs-rf-classname"
        open={authModalVisible}
        onCancel={closeAuthModal}
        footer={null}
        centered
        width={isMobile ? "100%" : 520}
        style={isMobile ? { padding: "0 12px" } : undefined}
        destroyOnClose
        bodyStyle={{
          padding: isMobile ? 12 : 24,
          maxHeight: isMobile ? "90vh" : "70vh",
          overflowY: "auto",
        }}
      >


        <div className="auth-header">
          <UserOutlined className="auth-profile-icon" />
          <div className="auth-title">
            {activeAuthTab === "register"
              ? "Create Your Account"
              : "Welcome Back"}
          </div>
        </div>


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
                rules={[
                  { required: true, message: "Email or phone is required" },
                  {
                    validator: (_, value) => {
                      if (
                        !value ||
                        /^[0-9]{10}$/.test(value) || // phone
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) // email
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Enter valid email or 10-digit phone number");
                    },
                  },
                ]}
              >
                <Input placeholder="john@example.com or 9876543210" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input.Password placeholder="Enter password" />
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
                  <Button block type="default" >
                    Skip Login
                  </Button>
                </Form.Item>
              )}
              {/* Vendor / Admin links */}
              <Form.Item>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <a
                    onClick={() => {
                      setAuthModalVisible(false);
                      setRoleType("vendor");
                      setVendorActiveTab("login");
                      setShowRegisterHint("vendor");
                      setVendorModalVisible(true);
                    }}
                  >
                    Are you a vendor?
                  </a>

                  <a
                    onClick={() => {
                      setAuthModalVisible(false);
                      setRoleType("admin");
                      setVendorActiveTab("login");
                      setShowRegisterHint("admin");
                      setVendorModalVisible(true);
                    }}
                  >
                    Are you an admin?
                  </a>
                </div>
              </Form.Item>


            </Form>
          </TabPane>

          {/* REGISTER TAB */}
          <TabPane tab="Register" key="register">
            <Form layout="vertical" onFinish={onRegister} preserve={false}>

              <Form.Item
                label="Select Services"
                name="service"
                rules={[{ required: true, message: "Please select at least one service" }]}
              >
                <TreeSelect

                  treeCheckable
                  showSearch={false}
                  showArrow
                  placeholder="Select services"
                  style={{ width: "100%" }}
                  showCheckedStrategy={TreeSelect.SHOW_PARENT}
                  open={serviceOpen}
                  onDropdownVisibleChange={setServiceOpen}
                  getPopupContainer={(triggerNode) => triggerNode.parentElement!}
                  treeData={serviceOptions} // numeric values
                  onChange={(values: number[]) => {
                    setSelectedServices(values);

                    const hasEducation = values.includes(5);
                    const hasHealthCare = values.includes(7); // ✅ HealthCare ID

                    setHideWorkType(hasEducation || hasHealthCare);
                    setIsHealthCareSelected(hasHealthCare);

                    // reset doctor section when healthcare unselected
                    if (!hasHealthCare) {
                      setDoctorRoleSelected(false);
                    }

                    if (hasEducation) {
                      setShowProfessionalFields(false);
                    }
                  }}

                />






              </Form.Item>


              <Form.Item
                label="First Name"
                name="firstName"
                normalize={(value) =>
                  value
                    ?.replace(/[^A-Za-z ]/g, "")
                    .replace(/\s+/g, " ")
                    .trim()
                }
                rules={[
                  { required: true, message: "First name is required" },
                  {
                    pattern: /^[A-Za-z]+( [A-Za-z]+)*$/,
                    message: "Only letters allowed",
                  },
                ]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>



              <Form.Item
                label="Last Name"
                name="lastName"
                normalize={(value) =>
                  value
                    ?.replace(/[^A-Za-z ]/g, "")
                    .replace(/\s+/g, " ")
                    .trim()
                }
                rules={[
                  { required: true, message: "Last name is required" },
                  {
                    pattern: /^[A-Za-z]+( [A-Za-z]+)*$/,
                    message: "Only letters allowed",
                  },
                ]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>



              <Form.Item
                label="Mobile Number"
                name="mobile"
                normalize={(value) => allowOnlyNumbers(value || "").slice(0, 10)}
                rules={[
                  { required: true },
                  { pattern: /^[6-9][0-9]{9}$/, message: "Invalid mobile number" },
                ]}
              >
                <Input inputMode="numeric" />
              </Form.Item>


              <Form.Item
                name="email"
                label="Email"
                normalize={(value) => value?.toLowerCase().replace(/\s+/g, "")}
                rules={[
                  { required: true, message: "Please input the email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>




              <Form.Item
                label="Aadhaar Number"
                name="aadhaar"
                normalize={(value) => allowOnlyNumbers(value || "").slice(0, 12)}
                rules={[
                  { required: true },
                  { pattern: /^[0-9]{12}$/, message: "Enter 12 digit Aadhaar" },
                ]}
              >
                <Input inputMode="numeric" />
              </Form.Item>



              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter your location" />
              </Form.Item>


              {!isHealthCareSelected && (
                <Form.Item
                  label="Select Work Type"
                  name="workType"
                  rules={hideWorkType ? [] : [{ required: true, message: "Please select work type" }]}
                >
                  <Select
                    placeholder="Choose work type"
                    disabled={hideWorkType}
                    onChange={(value) => {
                      setShowProfessionalFields(value === "looking");
                    }}
                  >
                    <Select.Option value="assigning">Assigning for work</Select.Option>
                    <Select.Option value="looking">Looking for work</Select.Option>
                    <Select.Option value="both">Both</Select.Option>
                  </Select>
                </Form.Item>
              )}



              {isHealthCareSelected && (
                <Form.Item
                  label="Select Role"
                  name="role"
                  rules={[{ required: true, message: "Please select role" }]}
                >
                  <Select
                    placeholder="Select role"
                    onChange={(value) => {
                      setDoctorRoleSelected(value === "doctor");
                    }}
                  >
                    <Select.Option value="doctor">Doctor</Select.Option>
                  </Select>
                </Form.Item>
              )}



              {isHealthCareSelected && doctorRoleSelected && (
                <div style={{ marginTop: 16 }}>
                  <h4 style={{ marginBottom: 12 }}>Doctor Details</h4>

                  {/* Hospital Name */}
                  <Form.Item
                    label="Hospital Name"
                    name="hospitalName"
                    rules={[{ required: true, message: "Hospital name is required" }]}
                  >
                    <Input placeholder="Enter hospital / clinic name" />
                  </Form.Item>

                  {/* Designation */}
                  <Form.Item
                    label="Designation"
                    name="designation"
                    rules={[{ required: true, message: "Designation is required" }]}
                  >
                    <Input placeholder="e.g. Cardiologist" />
                  </Form.Item>

                  {/* Years of Experience */}
                  <Form.Item
                    label="Years of Experience"
                    name="doctorExperience"
                    rules={[
                      { required: true, message: "Experience is required" },
                      { pattern: /^[0-9]+$/, message: "Only numbers allowed" },
                    ]}
                  >
                    <Input inputMode="numeric" placeholder="e.g. 5" maxLength={2} />
                  </Form.Item>

                  {/* Working Type */}
                  <Form.Item
                    label="Working Type"
                    name="workingType"
                    rules={[{ required: true, message: "Select working type" }]}
                  >
                    <Select placeholder="Select working type">
                      <Select.Option value="online">Online</Select.Option>
                      <Select.Option value="offline">Offline</Select.Option>
                      <Select.Option value="both">Both</Select.Option>
                    </Select>
                  </Form.Item>

                  {/* Certificate Upload */}
                  <Form.Item
                    label="Medical Certificate"
                    name="doctorCertificate"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e?.fileList}
                    rules={[{ required: true, message: "Certificate is required" }]}
                  >
                    <Upload listType="picture-card" beforeUpload={() => false} maxCount={2}>
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                  </Form.Item>
                </div>
              )}



              {showProfessionalFields && (
                <div style={{ marginTop: 16 }}>

                  <h4 style={{ marginBottom: 12 }}>Professional Details</h4>

                  <Form.Item
                    label="Experience (in years)"
                    name="experience"
                    rules={[
                      { required: true, message: "Experience is required" },
                      {
                        pattern: /^[0-9]+$/,
                        message: "Only numbers are allowed",
                      },
                      {
                        validator: (_, value) => {
                          if (value === undefined || value === "") {
                            return Promise.resolve();
                          }
                          if (Number(value) >= 0 && Number(value) <= 50) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Experience must be between 0 and 50 years")
                          );
                        },
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      placeholder="Enter experience"
                      inputMode="numeric"
                      maxLength={2}
                      onKeyDown={(e) => {
                        if (
                          !/[0-9]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "Delete" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight" &&
                          e.key !== "Tab"
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>




                  <Form.Item
                    label="Expertise in Additional Service"
                    name="expertise"
                    normalize={(value) => value?.replace(/^\s+/, "")}
                    rules={[
                      { required: true, message: "Expertise is required" },
                      { min: 3, message: "Minimum 3 characters required" },
                      {
                        pattern: /^[A-Za-z ]+$/,
                        message: "Only letters and spaces are allowed",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Enter your expertise" />
                  </Form.Item>


                  <Form.Item
                    label="Upload Work / ID Images"
                    name="documents"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e?.fileList}
                  >
                    <Upload
                      listType="picture-card"
                      beforeUpload={() => false}
                      multiple
                      maxCount={5}
                    >
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                  </Form.Item>

                </div>
              )}

              {/* PASSWORD */}
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Password is required" },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
                    message:
                      "Min 6 chars, uppercase, lowercase, number & special character required",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>



              {/* CONFIRM PASSWORD */}
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Passwords do not match");
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>



              <Form.Item>
                <Button block htmlType="submit" loading={authLoading}>
                  Register
                </Button>
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
                  rules={[
                    { required: true, message: "Password is required" },
                  ]}
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
                {showRegisterHint === "vendor" && (
                  <div style={{ marginTop: 12, textAlign: "center" }}>
                    <span>Not registered? </span>
                    <a
                      onClick={() => {
                        setVendorActiveTab("vendor_register");
                        setShowRegisterHint(null);
                      }}
                      style={{ fontWeight: 500 }}
                    >
                      Register as Vendor
                    </a>
                  </div>
                )}


              </Form>
            )}

            {roleType === "admin" && (
              <Form layout="vertical" onFinish={onAdminLogin}>


                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, type: "email" }]}
                >
                  <Input />
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


                {/* ✅ ALWAYS SHOW REGISTER LINK */}
                <div style={{ marginTop: 12, textAlign: "center" }}>
                  <span>Not registered? </span>
                  <a
                    onClick={() => setVendorActiveTab("admin_register")}
                    style={{ fontWeight: 500 }}
                  >
                    Register as Admin
                  </a>
                </div>


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
                <Form.Item label="Business Name" name="businessName">
                  <Input
                    onChange={(e) =>
                      (e.target.value = allowAlphaNumeric(e.target.value))
                    }
                  />
                </Form.Item>


                <Form.Item label="Owner Name" name="ownerName" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  normalize={(value) => allowEmailChars(value || "")}
                  rules={[
                    { required: true, type: "email", message: "Invalid email" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Phone"
                  name="mobile"
                  normalize={(value) => allowOnlyNumbers(value || "").slice(0, 10)}
                  rules={[
                    { required: true },
                    { pattern: /^[6-9][0-9]{9}$/, message: "Invalid mobile number" },
                  ]}
                >
                  <Input inputMode="numeric" />
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
          {roleType === "admin" && vendorActiveTab === "admin_register" && (
            <Tabs.TabPane tab="Register" key="admin_register">
              <Form layout="vertical" onFinish={onAdminRegister}>


                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>


                <Form.Item
                  label="Last Name"
                  name="lastName"
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
                  label="Mobile Number"
                  name="mobile"
                  rules={[
                    { required: true },
                    { pattern: /^[6-9][0-9]{9}$/, message: "Invalid mobile number" }
                  ]}
                >
                  <Input />
                </Form.Item>


                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true }]}
                >
                  <Input.Password />
                </Form.Item>


                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    { required: true },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject("Passwords do not match");
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>


                <Button type="primary" block htmlType="submit">
                  Register as Admin
                </Button>


              </Form>
            </Tabs.TabPane>
          )}

        </Tabs>
      </Modal>
      <Modal
        open={partnerModalVisible}
        onCancel={() => setPartnerModalVisible(false)}
        footer={null}
        centered
        width={380}                 // ✅ reduced width
        bodyStyle={{
          background: "#fff",
          borderRadius: 16,
          padding: 20,
          maxHeight: "70vh",         // ✅ limit height
          overflowY: "auto",         // ✅ enable scroll
        }}
      >

        <Tabs
          activeKey={partnerActiveTab}
          onChange={(key) => setPartnerActiveTab(key as "login" | "register")}
          centered
        >

          <Tabs.TabPane tab="Login" key="login">
            <Form layout="vertical" onFinish={onPartnerLogin}>


              <Form.Item
                label="Email ID"
                name="email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input placeholder="Enter email id" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>

              <Button type="primary" block htmlType="submit">
                Login
              </Button>

            </Form>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Register" key="register">
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>
              Partner Registration
            </h2>

            <Form layout="vertical" onFinish={onPartnerRegister}>

              <Form.Item
                label="Partner Name"
                name="partnerName"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter partner name" />
              </Form.Item>

              <Form.Item
                label="Company / Firm Name"
                name="company"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter company / firm name" />
              </Form.Item>

              <Form.Item
                label="GST Number"
                name="gst"
              >
                <Input placeholder="Enter gst number" />
              </Form.Item>

              <Form.Item
                label="Number of Partners"
                name="partnersCount"
                rules={[
                  { required: true, message: "Required" },
                  {
                    validator: (_, value) => {
                      const num = Number(value);
                      if (!num) return Promise.reject("Enter number");
                      if (num < 2 || num > 20) {
                        return Promise.reject("Min 2, Max 20");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input type="number" min={2} max={20} />
              </Form.Item>


              <Form.Item
                label="Email ID"
                name="email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input placeholder="Enter email id" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>

              <Form.Item
                label="Select Module"
                name="module"
                rules={[{ required: true }]}
              >
                <Select placeholder="Choose module">
                  <Select.Option value="education">Education</Select.Option>
                  <Select.Option value="realestate">Buy / Sell / Rent</Select.Option>

                  <Select.Option value="healthcare">Health Care</Select.Option>
                  <Select.Option value="products">Swachify Products</Select.Option>
                  <Select.Option value="ride">Just Ride</Select.Option>
                </Select>
              </Form.Item>

              <Button
                type="primary"
                block
                htmlType="submit"   // 🔥 THIS WAS MISSING
                style={{ marginTop: 12 }}
              >
                Register
              </Button>

            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Modal>



    </>
  );
};

export default CommonHeader;