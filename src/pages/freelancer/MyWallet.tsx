import React from "react";
import { Card, Button, Typography, Row, Col, Tag, Space } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "./walletPopup.css";


const { Title, Text } = Typography;
const MyWallet: React.FC<{ onClose: () => void }> = ({ onClose }) => {

  return (
   
  <div className="wallet-popup-card">
    {/* ❗ Add this cross button */}
    <span className="wallet-popup-close-btn" onClick={onClose}>×</span>

    {/* BRAND HEADER */}
    <div style={{ textAlign: "center", marginBottom: 20 }}>
      <div className="wallet-popup-brand">SWACHIFY INDIA</div>
      <Text style={{ fontSize: 16, color: "#475569" }}>Earnings Wallet</Text>
    </div>

      {/* BALANCE & WITHDRAW */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Title level={2} style={{ fontWeight: 800, fontSize: 36, marginBottom: 12 }}>
          ₹5,000
        </Title>
        <Button
          type="primary"
          className="wallet-popup-withdraw-btn"
          style={{
            width: "100%",
            height: 50,
            borderRadius: 14,
            background: "#f7b733",
            border: "none",
            fontSize: 17,
            fontWeight: 600,
            color: "#fff",
            boxShadow: "0 4px 16px rgba(247,183,51,0.3)"
          }}
        >
          Withdraw to Bank
        </Button>
      </div>

      {/* WALLET STATS */}
      <Row gutter={16} justify="center">
        <Col span={12}>
          <Card bordered={false} className="wallet-popup-stat-box">
            <Space align="center">
              <ClockCircleOutlined style={{ fontSize: 18 }} />
              <Text>Pending</Text>
            </Space>
            <Title level={4} style={{ marginTop: 10, fontWeight: 700 }}>₹1,500</Title>
          </Card>
        </Col>

        <Col span={12}>
          <Card bordered={false} className="wallet-popup-stat-box">
            <Space align="center">
              <CheckCircleOutlined style={{ fontSize: 18 }} />
              <Text>Withdrawn</Text>
            </Space>
            <Title level={4} style={{ marginTop: 10, fontWeight: 700 }}>₹3,000</Title>
          </Card>
        </Col>
      </Row>

      {/* RECENT TRANSACTIONS */}
      <div style={{ marginTop: 28 }}>
        <Title level={4} style={{ fontWeight: 700, marginBottom: 14, textAlign: "center" }}>
          Recent Transactions
        </Title>

        <Space direction="vertical" size={14} style={{ width: "100%" }}>

          {/* TRANSACTION 1 */}
          <Card bordered={false} className="wallet-popup-txn-item">
            <Row justify="space-between" align="middle">
              <div>
                <Text strong style={{ fontSize: 15 }}>TKT#15692</Text><br />
                <Text>Cleaning service</Text><br />
                <Text type="secondary" style={{ fontSize: 12 }}>Oct 5, 2025</Text>
              </div>
              <div style={{ textAlign: "right" }}>
                <Tag color="green" style={{ borderRadius: 6, fontWeight: 600 }}>AVAILABLE</Tag><br />
                <Text style={{ fontWeight: 700 }}>₹3,000</Text><br />
                <Text type="secondary" style={{ fontSize: 12 }}>Earned: ₹2,400 • Fee: ₹600</Text>
              </div>
            </Row>
          </Card>

          {/* TRANSACTION 2 */}
          <Card bordered={false} className="wallet-popup-txn-item">
            <Row justify="space-between" align="middle">
              <div>
                <Text strong style={{ fontSize: 15 }}>TKT#15484</Text><br />
                <Text>Balcony service</Text><br />
                <Text type="secondary" style={{ fontSize: 12 }}>Nov 06, 2025</Text>
              </div>
              <div style={{ textAlign: "right" }}>
                <Tag color="green" style={{ borderRadius: 6, fontWeight: 600 }}>AVAILABLE</Tag><br />
                <Text strong style={{ fontSize: 15 }}>₹2,000</Text><br />
                <Text type="secondary" style={{ fontSize: 12 }}>Earned: ₹1,600 • Fee: ₹400</Text>
              </div>
            </Row>
          </Card>

        </Space>
      </div>
    </div>
  );
};

export default MyWallet;
