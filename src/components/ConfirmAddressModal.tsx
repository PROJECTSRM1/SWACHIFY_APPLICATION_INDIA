import { useEffect } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import { PaymentsAPI } from "../api/customerAuth";
import { useCart } from "../context/CartContext";

/* ---------------- TYPES ---------------- */

type CartItemLike = {
  id?: number | string;
  title?: string;
  quantity?: number;
  totalPrice?: number;
  image?: string;
};

export type Booking = {
  id: string;
  title: string;
  date: string;
  time: string;
  status: "Upcoming" | "Completed" | "Expired";
  amount: number;
  image?: string;
  paymentDone: boolean;
};

type Props = {
  open: boolean;
  item: CartItemLike | null;
  onClose: () => void;
  onConfirm: (booking: Booking) => void;
};

/* ---------------- COMPONENT ---------------- */

export default function ConfirmAddressModal({
  open,
  item,
  onClose,
  onConfirm,
}: Props) {
  const [form] = Form.useForm();
  const { removeFromCart } = useCart();

  useEffect(() => {
    if (item) {
      form.setFieldsValue({ address: "" });
    } else {
      form.resetFields();
    }
  }, [item, form]);

  if (!item) return null;

  /* ---------- PAYMENT ---------- */

  const handlePayment = async (booking: Booking) => {
    try {
      const order = await PaymentsAPI.createOrder(
        booking.id,
        booking.amount * 100
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Swachify Services",
        description: booking.title,
        order_id: order.id,

        handler: async (response: any) => {
          try {
            await PaymentsAPI.verifyPayment(
              order.id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );

            const completedBooking: Booking = {
              ...booking,
              paymentDone: true,
              status: "Completed",
            };

            message.success("Payment successful");

            if (item.id) removeFromCart(Number(item.id));

            onConfirm(completedBooking);
            onClose();
          } catch (err) {
            console.error(err);
            message.error("Payment verification failed");
          }
        },
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      message.error("Payment failed");
    }
  };

  /* ---------- CONFIRM ---------- */

  const handleOk = async () => {
    try {
      await form.validateFields();

      const now = new Date();
      const booking: Booking = {
        id: `bkg-${Date.now()}`,
        title: item.title ?? "Service",
        date: now.toISOString().split("T")[0],
        time: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "Upcoming",
        amount: item.totalPrice ?? 0,
        image: item.image,
        paymentDone: false,
      };

      handlePayment(booking);
    } catch {}
  };

  /* ---------- UI ---------- */

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={640}
    >
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <h3>{item.title}</h3>
          <p>Qty: {item.quantity ?? 1}</p>

          <Form form={form} layout="vertical">
            <Form.Item
              name="address"
              label="Delivery Address"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Form>

          <Button type="primary" block onClick={handleOk}>
            Confirm & Pay
          </Button>
        </div>

        <div style={{ textAlign: "center" }}>
          <img
            src={item.image}
            alt={item.title}
            style={{ width: 100, borderRadius: 8 }}
          />
          <div style={{ fontWeight: 700 }}>
            ₹{item.totalPrice ?? 0}
          </div>
        </div>
      </div>
    </Modal>
  );
}
