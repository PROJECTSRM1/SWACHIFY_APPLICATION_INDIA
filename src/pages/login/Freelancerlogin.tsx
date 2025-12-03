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
  Layout,
  Card,
  Form,
  Input,
  Button,
  Checkbox,
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

  const onFinish = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/freelancer-dashboard");
    }, 1300);
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
              <a className="sw-fr-forgot">Forgot Password?</a>
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

          {/* <Divider plain>or login with</Divider>

          <Row gutter={12}>
            <Col span={12}>
              <Button
                block
                icon={<GoogleOutlined />}
                className="swf-social"
              >
                Google
              </Button>
            </Col>
            <Col span={12}>
              <Button
                block
                icon={<GithubOutlined />}
                className="swf-social"
              >
                Github
              </Button>
            </Col>
          </Row> */}

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
    </Layout>
  );
}
