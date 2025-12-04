// src/pages/PaymentPage.tsx
// import React from "react";
import { Button, Card, Divider, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "../pages/PaymentsPage.css";

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

export default function PaymentPage({ booking, onClose, onPaid }: PaymentPageProps) {
  if (!booking) return null;

  const amount = booking.amount ?? booking.totalPrice ?? 0;

  const handlePay = async () => {
    try {
      await new Promise((r) => setTimeout(r, 900));
      message.success("Payment successful");
      if (onPaid) onPaid(booking.id ?? String(Date.now()));
      onClose();
    } catch {
      message.error("Payment failed");
    }
  };

  return (
    <div
      className="payment-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Payment"
      onClick={onClose}
    >
      <div className="payment-card" onClick={(e) => e.stopPropagation()}>
        <button className="payment-close-btn" aria-label="Close payment" onClick={onClose}>
          <CloseOutlined />
        </button>

        <h3 className="payment-title">Payment</h3>
        <span className="payment-subtitle">Complete payment for your service</span>

        <Card bordered className="payment-details-box">
          <div className="payment-details-header">
            <div>
              <div className="payment-service-title">{booking.title ?? "Untitled"}</div>
              <div className="payment-service-address">{booking.address ?? "No address provided"}</div>
            </div>

            <div>
              <div className="payment-amount">₹{amount}</div>
              <div className="payment-date-time">{booking.time ?? ""} • {booking.date ?? ""}</div>
            </div>
          </div>

          <Divider />

          <div className="payment-btn-row">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={handlePay}>
              Pay Now
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
