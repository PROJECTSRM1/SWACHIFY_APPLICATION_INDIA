import { useEffect, useState } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import { PaymentsAPI } from "../api/customerAuth";
import { useCart } from "../context/CartContext";


/* ---------------- TYPES ---------------- */

type CartItemLike = {
  address: string;
  id?: number | string;
  title?: string;
  quantity?: number;
  totalPrice?: number;
  image?: string;

  // ✅ REQUIRED FOR BOOKING SLOT
  deliveryDate?: string;   // YYYY-MM-DD
  deliveryTime?: string;   // HH:mm or hh:mm A
};

export type Booking = {
  id: number;  
  title: string;
  date: string;
  time: string;
  amount: number;
  image?: string;
  paymentDone: boolean;
};


// type Props = {
//   open: boolean;
//   item: CartItemLike | null;
//   onClose: () => void;
//   onConfirm: (booking: Booking) => void;
// };

type Props = {
  open: boolean;
  item: CartItemLike | null;
  onClose: () => void;
  onConfirm: (booking: Booking) => void;
  onPaymentSuccess: () => void; // ✅ ADD THIS
};


/* ---------------- COMPONENT ---------------- */

// export default function ConfirmAddressModal({
//   open,
//   item,
//   onClose,
//   onConfirm,
// }:
export default function ConfirmAddressModal({
  open,
  item,
  onClose,
  onConfirm,
  onPaymentSuccess,
}: Props) {
  const [form] = Form.useForm();
  const { removeFromCart } = useCart();
  const [isEditing, setIsEditing] = useState(false);

   useEffect(() => {
  if (item) {
    form.setFieldsValue({
      address: item.address || "", 
    });
      setIsEditing(false);
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
              response.razorpay_signature,
               Number(item.id),
              
            );

           const completedBooking: Booking = {
  ...booking,
  paymentDone: true,   // ✅ ONLY THIS
};


            message.success("Payment successful");

            if (item.id) removeFromCart(Number(item.id));

            onConfirm(completedBooking);

            setTimeout(() => {
  onClose();           // close confirm modal
  onPaymentSuccess();  // open employee allocation modal
}, 300);
    

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

    // ✅ HARD GUARD
    if (!item.deliveryDate || !item.deliveryTime) {
      message.error("Please select service date & time");
      return;
    }

    const booking: Booking = {
      id: Number(item.id), 
      title: item.title ?? "Service",

      // ✅ USER-SELECTED SLOT (ONLY SOURCE OF TRUTH)
      date: item.deliveryDate,
      time: item.deliveryTime,

      amount: item.totalPrice ?? 0,
      image: item.image,
      paymentDone: false,
    };

    handlePayment(booking);
  } catch {}
};

      

  /* ---------- UI ---------- */

  return (
  
      <div>

          <Modal open={open} onCancel={onClose} footer={null} centered width={640}>
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <h3>{item.title}</h3>
          <p>Qty: {item.quantity ?? 1}</p>

          <Form form={form} layout="vertical">
            <Form.Item
              name="address"
              label={
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Delivery Address</span>
                  <Button
                    type="link"
                    size="small"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Save" : "Edit"}
                  </Button>
                </div>
              }
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={4} style={{ minHeight: 80 }} disabled={!isEditing}/>
              
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

     


      </div>
  );
}