import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MailOutlined,
  LockOutlined,
  ArrowLeftOutlined,
//   GoogleOutlined,
//   GithubOutlined,
} from "@ant-design/icons";

import {
  freelancerRequestOTP,
  freelancerVerifyOTP,
  freelancerResetPassword
} from "../../api/freelancerAuth";


import { freelancerLogin } from "../../api/freelancerAuth";
import { message } from "antd";


import {
  Layout,
  Card,
  Form,
  Input,
  Button,
  Checkbox,
  Modal,
//   Divider,
//   Row,
//   Col,
} from "antd";

// import "./Freelancerlogin.css";
export default function Freelancerlogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
  const [form] = Form.useForm();
  const [forgotModalVisible, setForgotModalVisible] = useState(false);


 const onFinish = async (values: any) => {
  try {
    setLoading(true);

    const payload : any = {
      email_or_phone: values.email,
      password: values.password,
    };

    await freelancerLogin(payload);



     message.success("Login successful");
    navigate("/freelancer-dashboard");

  } catch (err: any) {
    console.error("Freelancer Login Error", err);
    message.error(
      err?.response?.data?.message || "Invalid credentials"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <Layout className="sw-fr-login-wrapper">

      {/* BACK BUTTON */}
      <button className="sw-fr-login-back" onClick={() => navigate("/freelancer")}>
        <ArrowLeftOutlined />
        <span>Back</span>
      </button>

      <div className="sw-fr-login-container">

        {/* LEFT BRAND PANEL */}
        <div className="sw-fr-login-brand">
          <div className="sw-fr-brand-inner">
            {/* <div className="swf-brand-logo">⚡</div> */}
            <h2 className="sw-fr-brand-title">Swachify Freelance</h2>

            <p className="sw-fr-brand-sub">
              Empowering freelancers with real-time job opportunities nearby.
            </p>

            <ul className="sw-fr-benefits">
              <li>✨ Instant job requests</li>
              <li>💼 Manage your projects</li>
              <li>💰 Track your earnings</li>
              <li>⭐ Build professional reputation</li>
            </ul>
          </div>
        </div>

        {/* LOGIN CARD */}
        <Card className="sw-fr-login-card" bordered={false}>
          <h1 className="sw-fr-login-title">Welcome Back</h1>
          <p className="sw-fr-login-sub">
            Login to access your freelancer dashboard
          </p>

          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="you@example.com"
                size="large"
                className="sw-fr-input"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Password is required" },
                { min: 6, message: "Minimum 6 characters" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                size="large"
                placeholder="••••••••"
                className="sw-fr-input"
                visibilityToggle={true}
              />
            </Form.Item>

            <div className="sw-fr-row-between">
              <Checkbox>Remember me</Checkbox>
            <a className="sw-fr-forgot" onClick={() => setForgotModalVisible(true)}>
            Forgot Password? </a>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
                className="sw-fr-submit"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Form.Item>
          </Form>

          <p className="sw-fr-signup">
            Don’t have an account?
            <button
              className="sw-fr-signup-link"
              onClick={() => navigate("/freelancerregistration")}
            >
              Sign up free
            </button>
          </p>
          
        </Card>
      </div>
{/* FREELANCER FORGOT PASSWORD MODAL */}
{/* FREELANCER FORGOT PASSWORD MODAL */}
<Modal
  open={forgotModalVisible}
  onCancel={() => setForgotModalVisible(false)}
  footer={null}
  centered
  width={450}
  destroyOnClose
>
  {(() => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    // 1️⃣ SEND OTP
    const handleSendOTP = async () => {
      try {
        const email = form.getFieldValue("email");
        if (!email) return message.error("Please enter email");

        setLoading(true);

        await freelancerRequestOTP(email);

        message.success("OTP sent to your registered email");
        setStep(2);
      } catch (err: any) {
        message.error(
          err?.response?.data?.detail ||
          "Failed to send OTP"
        );
      } finally {
        setLoading(false);
      }
    };

    // 2️⃣ VERIFY OTP
    const handleVerifyOTP = async () => {
      try {
        const otp = form.getFieldValue("otp");
        if (!otp) return message.error("Enter OTP");

        setLoading(true);

        await freelancerVerifyOTP(otp);

        message.success("OTP verified successfully");
        setStep(3);
      } catch (err: any) {
        message.error(
          err?.response?.data?.detail || "Invalid OTP"
        );
      } finally {
        setLoading(false);
      }
    };

    // 3️⃣ RESET PASSWORD
    const handleUpdatePassword = async () => {
      try {
        const newP = form.getFieldValue("newPassword");
        const confirmP = form.getFieldValue("confirmPassword");

        if (!newP || !confirmP)
          return message.error("All fields are required");

        if (newP !== confirmP)
          return message.error("Passwords do not match");

        setLoading(true);

        await freelancerResetPassword(newP, confirmP);

        message.success("Password updated successfully! Please login.");
        setForgotModalVisible(false);
      } catch (err: any) {
        message.error(
          err?.response?.data?.detail || "Failed to reset password"
        );
      } finally {
        setLoading(false);
      }
    };

    return (
      <Form form={form} layout="vertical">
        <h3 style={{ textAlign: "center", marginBottom: 20 }}>
          {step === 1 && "Reset Password"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Set New Password"}
        </h3>

        {/* STEP 1️⃣ Email */}
        {step === 1 && (
          <>
            <Form.Item
              label="Registered Email"
              name="email"
              rules={[{ required: true, message: "Email required" }]}
            >
              <Input placeholder="yourmail@example.com" />
            </Form.Item>

            <Button block type="primary" loading={loading} onClick={handleSendOTP}>
              Send OTP
            </Button>
          </>
        )}

        {/* STEP 2️⃣ OTP */}
        {step === 2 && (
          <>
            <Form.Item
              label="Enter OTP"
              name="otp"
              rules={[{ required: true, message: "Enter 6-digit OTP" }]}
            >
              <Input maxLength={6} placeholder="Enter OTP" />
            </Form.Item>

            <Button block type="primary" loading={loading} onClick={handleVerifyOTP}>
              Verify OTP
            </Button>
          </>
        )}

        {/* STEP 3️⃣ Reset Password */}
        {step === 3 && (
          <>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Enter new password" },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message:
                    "Must include uppercase, lowercase, number & symbol",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                { required: true, message: "Confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    return value === getFieldValue("newPassword")
                      ? Promise.resolve()
                      : Promise.reject("Passwords do not match");
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Button block type="primary" loading={loading} onClick={handleUpdatePassword}>
              Update Password
            </Button>
          </>
        )}
      </Form>
    );
  })()}
</Modal>

</Layout>
  );
}
