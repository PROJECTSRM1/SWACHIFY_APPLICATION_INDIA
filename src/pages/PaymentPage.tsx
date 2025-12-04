// src/pages/PaymentPage.tsx
import React, { useEffect, useState } from "react";
import { Radio, Button, Typography, Row, Col, Divider, Space, Tooltip } from "antd";
import { ArrowLeftOutlined, QuestionCircleOutlined, WalletOutlined, CheckCircleOutlined } from "@ant-design/icons";
import "../pages/PaymentsPage.css"

const { Text } = Typography;

type BookingLike = {
  id?: string;
  title?: string;
  date?: string;
  time?: string;
  amount?: number;
  totalPrice?: number;
  address?: string;
};

type PaymentPageProps = {
  booking: BookingLike | null;
  onClose: () => void;
  onPaid?: (bookingId: string) => void;
};

const PaymentPage: React.FC<PaymentPageProps> = ({ booking, onClose, onPaid }) => {
  const [value, setValue] = useState<string>("upi");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    return () => {
      // cleanup timers when unmounting
    };
  }, []);

  if (!booking) return null;

  const price = booking.amount ?? booking.totalPrice ?? 0;

  const onChange = (e: any) => setValue(e.target.value);

  const handleBack = () => onClose();

  // When user hits CONTINUE: show success overlay, call onPaid, then close
  const handleContinue = () => {
    setShowSuccess(true);

    // invoke onPaid and close after short delay so user sees success
    window.setTimeout(() => {
      if (onPaid) onPaid(booking.id ?? String(Date.now()));
      setShowSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <>
      <div className="payments-overlay" role="dialog" aria-modal="true" aria-label="Payments" onClick={onClose}>
        <div className="payments-shell" onClick={(e) => e.stopPropagation()}>
          <div className="payments-header">
            <div className="header-left" onClick={handleBack} role="button" tabIndex={0}>
              <ArrowLeftOutlined />
            </div>
            <div className="header-title">Payments</div>
          </div>

          <div className="payments-body">
            <Radio.Group onChange={onChange} value={value} className="radio-group">
              {/* UPI / Wallet */}
              <div className="radio-item">
                <Row align="middle" justify="space-between">
                  <Col>
                    <Space size={8} align="center">
                      <WalletOutlined />
                      <div>
                        <Text strong>PhonePe (UPI, Wallet)</Text>
                        <div className="item-sub" style={{ marginTop: 4 }}>
                          Quick UPI / wallet checkout
                        </div>
                      </div>
                    </Space>
                  </Col>
                  <Col>
                    <Radio value={"upi"} />
                  </Col>
                </Row>
              </div>

              <Divider />

              {/* Card */}
              <div className="radio-item">
                <Row align="middle" justify="space-between">
                  <Col>
                    <Text strong>Credit / Debit / ATM Card</Text>
                  </Col>
                  <Col>
                    <Radio value={"card"} />
                  </Col>
                </Row>
              </div>

              <Divider />

              {/* Netbanking */}
              <div className="radio-item">
                <Row align="middle" justify="space-between">
                  <Col>
                    <Text strong>Net Banking</Text>
                  </Col>
                  <Col>
                    <Radio value={"netbanking"} />
                  </Col>
                </Row>
              </div>

              <Divider />

              {/* Cash on Delivery */}
              <div className="radio-item">
                <Row align="middle" justify="space-between">
                  <Col>
                    <Text strong>Cash on Delivery</Text>
                  </Col>
                  <Col>
                    <Radio value={"cod"} />
                  </Col>
                </Row>
              </div>

              <Divider />

              {/* EMI (muted) */}
              <div className="radio-item muted">
                <Row align="middle" justify="space-between">
                  <Col>
                    <Space>
                      <Text strong>EMI (Easy Installments)</Text>
                      <Text className="not-app">Not applicable</Text>
                    </Space>
                  </Col>
                  <Col>
                    <Space align="center">
                      <Tooltip title="EMI not available for this order">
                        <QuestionCircleOutlined />
                      </Tooltip>
                      <Radio value={"emi"} />
                    </Space>
                  </Col>
                </Row>
              </div>
            </Radio.Group>
          </div>

          <div className="payments-footer">
            <div className="price-left">
              <Text className="price-label">PRICE DETAILS</Text>
              <div className="price-amount">
                <div>
                  <Text className="rupee">₹{price}</Text>
                  <div>
                    <Button type="link" className="price-link">
                      View Price Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="price-right">
              <Button className="continue-button" size="large" onClick={handleContinue}>
                CONTINUE
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen success overlay */}
      {showSuccess && (
        <div className="payment-success-overlay" aria-hidden={!showSuccess}>
          <div className="payment-success-card" role="status" aria-live="polite">
            <CheckCircleOutlined className="success-icon" />
            <h3>Success</h3>
            <p>Your payment was successful</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPage;
