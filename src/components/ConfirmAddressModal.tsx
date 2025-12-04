// src/components/header/ConfirmAddressModal.tsx
import React, { useEffect } from "react";
import { Modal, Button, Form, Input } from "antd";

type CartItemLike = {
  id?: number | string;
  title?: string;
  quantity?: number;
  totalPrice?: number;
  amount?: number;
  image?: string;
  customerName?: string;
  address?: string;
  instructions?: string;
};

export type Booking = {
  id: string;
  title: string;
  date: string;
  time?: string;
  status: "Upcoming" | "Completed" | "Cancelled";
  serviceType?: string;
  amount?: number;
  address?: string;
  notes?: string;
};

type Props = {
  open: boolean;
  item: CartItemLike | null;
  onClose: () => void;
  onConfirm: (booking: Booking) => void;
};

export default function ConfirmAddressModal({ open, item, onClose, onConfirm }: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (item) {
      form.setFieldsValue({
        address: item.address ?? item.customerName ?? "",
      });
    } else {
      form.resetFields();
    }
  }, [item, form]);

  if (!item) return null;

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const now = new Date();
      const booking: Booking = {
        id: `bkg-${Date.now()}`,
        title: item.title ?? "Untitled",
        date: now.toISOString().split("T")[0],
        time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "Upcoming",
        serviceType: "Product / Service",
        amount: item.totalPrice ?? item.amount ?? 0,
        address: values.address,
        notes: item.instructions ?? "",
      };
      onConfirm(booking);
    } catch (err) {
      // validation errors handled by antd
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      closable
      maskClosable
      bodyStyle={{ padding: 20 }}
      width={640}
    >
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginTop: 0 }}>{item.title}</h3>
          <p style={{ color: "#6b7280", marginBottom: 12 }}>Qty: {item.quantity ?? 1}</p>

          <Form form={form} layout="vertical" initialValues={{ address: item.address ?? "" }}>
            <Form.Item
              name="address"
              label="Delivery address"
              rules={[{ required: true, message: "Please provide an address" }]}
            >
              <Input.TextArea rows={3} placeholder="Enter delivery address" />
            </Form.Item>
          </Form>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={handleOk}>
              Confirm & Pay
            </Button>
          </div>
        </div>

        <div style={{ width: 120, textAlign: "center" }}>
          <img
            src={item.image ?? ""}
            alt={item.title ?? "item"}
            style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8 }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div style={{ marginTop: 8, fontWeight: 700 }}>₹{item.totalPrice ?? item.amount ?? 0}</div>
        </div>
      </div>
    </Modal>
  );
}
