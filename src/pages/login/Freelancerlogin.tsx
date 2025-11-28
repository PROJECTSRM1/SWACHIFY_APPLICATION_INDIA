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

import "./Freelancerlogin.css";

export default function Freelancerlogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
  const [form] = Form.useForm();

  const onFinish = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1300);
  };

  return (
    <Layout className="swf-login-wrapper">

      {/* BACK BUTTON */}
      <button className="swf-login-back" onClick={() => navigate("/freelancer")}>
        <ArrowLeftOutlined />
        <span>Back</span>
      </button>

      <div className="swf-login-container">

        {/* LEFT BRAND PANEL */}
        <div className="swf-login-brand">
          <div className="swf-brand-inner">
            <div className="swf-brand-logo">⚡</div>
            <h2 className="swf-brand-title">Swachify Freelance</h2>

            <p className="swf-brand-sub">
              Empowering freelancers with real-time job opportunities nearby.
            </p>

            <ul className="swf-benefits">
              <li>✨ Instant job requests</li>
              <li>💼 Manage your projects</li>
              <li>💰 Track your earnings</li>
              <li>⭐ Build professional reputation</li>
            </ul>
          </div>
        </div>

        {/* LOGIN CARD */}
        <Card className="swf-login-card" bordered={false}>
          <h1 className="swf-login-title">Welcome Back</h1>
          <p className="swf-login-sub">
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
                className="swf-input"
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
                className="swf-input"
                visibilityToggle={true}
              />
            </Form.Item>

            <div className="swf-row-between">
              <Checkbox>Remember me</Checkbox>
              <a className="swf-forgot">Forgot Password?</a>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
                className="swf-submit"
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

          <p className="swf-signup">
            Don’t have an account?
            <button
              className="swf-signup-link"
              onClick={() => navigate("/register")}
            >
              Sign up free
            </button>
          </p>
        </Card>
      </div>
    </Layout>
  );
}
