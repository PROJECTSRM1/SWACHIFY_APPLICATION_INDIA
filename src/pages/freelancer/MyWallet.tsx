import React, { useEffect, useState } from "react";
import { Card, Button, Typography, Row, Col, Tag, Space , Empty } from "antd";
import { ClockCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import {
  DollarCircleOutlined,
  ToolOutlined,
  ThunderboltOutlined,
  
} from "@ant-design/icons";
import "./walletPopup.css";
import { getWallet, withdrawEarnings } from "./walletStorage";



const { Title, Text } = Typography;

const SERVICE_ICON_MAP: Record<string, React.ReactNode> = {
  Cleaning: <ToolOutlined />,
  Plumbing: <ToolOutlined />,
  Electrical: <ThunderboltOutlined />,
  "House Repairs": <ToolOutlined />,
  default: <DollarCircleOutlined />,
};

const MyWallet: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [wallet, setWallet] = useState(getWallet());

  useEffect(() => {
    const interval = setInterval(() => {
      setWallet(getWallet());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleWithdraw = () => {
    withdrawEarnings();
    setWallet(getWallet());
  };

  return (
    <div className="wallet-popup-card">
      <span className="wallet-popup-close-btn" onClick={onClose}>×</span>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div className="wallet-popup-brand">SWACHIFY INDIA</div>
        <Text style={{ fontSize: 16, color: "#475569" }}>Earnings Wallet</Text>
      </div>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Title level={2} style={{ fontWeight: 800, fontSize: 36, marginBottom: 12 }}>
          ₹{wallet.balance.toLocaleString()}
        </Title>
        <Button
          type="primary"
          className="wallet-popup-withdraw-btn"
          onClick={handleWithdraw}
          disabled={wallet.balance === 0}
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

      <Row gutter={16} justify="center">
        <Col span={12}>
          <Card bordered={false} className="wallet-popup-stat-box">
            <Space align="center">
              <ClockCircleOutlined />
              <Text>Pending</Text>
            </Space>
            <Title level={4}>₹{wallet.pending.toLocaleString()}</Title>
          </Card>
        </Col>

        <Col span={12}>
          <Card bordered={false} className="wallet-popup-stat-box">
            <Space align="center">
              <CheckCircleOutlined />
              <Text>Withdrawn</Text>
            </Space>
            <Title level={4}>₹{wallet.withdrawn.toLocaleString()}</Title>
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: 28 }}>
        <Title level={4} style={{ textAlign: "center" }}>Recent Transactions</Title>

        {wallet.transactions.length === 0 ? (
          <Empty description="No transactions yet" />
        ) : (
          <Space direction="vertical" size={14} style={{ width: "100%" }}>
            {wallet.transactions.map((txn) => (
              <Card key={txn.ticketId} bordered={false} className="wallet-popup-txn-item">
                <Row justify="space-between" align="middle">
                  <div>
                    {SERVICE_ICON_MAP[txn.service] || SERVICE_ICON_MAP.default}
                    <Text strong style={{ marginLeft: 8 }}>{txn.service}</Text><br />
                    <Text type="secondary" style={{ fontSize: 12 }}>{txn.date}</Text>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Tag color={txn.step === "COMPLETED" ? "blue" : "green"}>
                      {txn.step}
                    </Tag><br />
                    <Text strong>₹{txn.amount.toLocaleString()}</Text>
                  </div>
                </Row>
              </Card>
            ))}
          </Space>
        )}
      </div>
    </div>
  );
};

export default MyWallet;
