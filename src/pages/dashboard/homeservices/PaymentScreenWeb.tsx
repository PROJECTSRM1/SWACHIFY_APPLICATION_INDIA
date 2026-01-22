import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdArrowBackIosNew,
  MdCalendarToday,
  MdCheckCircle,
} from "react-icons/md";
import "./PaymentScreenWeb.css";

/* ---------------- TYPES ---------------- */

type AllocatedEmployee = {
  id?: string | number;
  name: string;
  role: string;
  rating?: string;
  mobileNumber: string;
  image?: string;
};

type BookingDetails = {
  serviceName?: string;
  date?: string;
  time?: string;
  address?: string;
};

type CreateOrderResponse = {
  id: string;
  amount: number;
  currency: string;
};

type VerifyPayload = {
  order_id: string;
  payment_id: string;
  signature: string;
  home_service_id: number;
};

type PaymentScreenWebProps = {
  onClose: () => void;
  totalAmount: number; // ₹ value
  allocatedEmployee: AllocatedEmployee | null;
  bookingDetails: BookingDetails | null;
};

/* ---------------- CONFIG ---------------- */

const RAZORPAY_KEY = "rzp_test_RnpmMY4LPogJ7J";

/* ---------------- HELPERS ---------------- */

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(n);

/* ---------------- RAZORPAY LOADER ---------------- */

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    const existing = document.getElementById("razorpay-sdk");
    if (existing) return resolve(true);

    const script = document.createElement("script");
    script.id = "razorpay-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}


/* ---------------- API CALLS ---------------- */

async function createOrder(
  amount: number,
  bookingId: number
): Promise<CreateOrderResponse> {
  const res = await fetch("/api/payment/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, bookingId }),
  });

  if (!res.ok) throw new Error("Create order failed");
  return res.json();
}

async function verifyPayment(payload: VerifyPayload): Promise<void> {
  const res = await fetch("/api/payment/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Verify payment failed");
}

/* ---------------- COMPONENT ---------------- */

const PaymentScreenWeb: React.FC<PaymentScreenWebProps> = ({
  onClose,
  totalAmount,
  allocatedEmployee,
  bookingDetails,
}) => {
  const navigate = useNavigate();

  const paymentHandled = useRef(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);

  const TOTAL_AMOUNT = Math.round(totalAmount * 100); // ₹ → paise
  const BOOKING_ID = 26;

  const payableText = useMemo(
    () => formatINR(TOTAL_AMOUNT / 100),
    [TOTAL_AMOUNT]
  );

  /* ---------------- PAYMENT HANDLER ---------------- */

  const handlePayment = async () => {
    try {
      if (loadingPay) return;

      setLoadingPay(true);
      paymentHandled.current = false;

      const ok = await loadRazorpayScript();
      if (!ok) {
        alert("Failed to load Razorpay");
        setLoadingPay(false);
        return;
      }

      const order = await createOrder(TOTAL_AMOUNT, BOOKING_ID);

      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Swachify",
        description: "Service Payment",
        order_id: order.id,

        prefill: {
          name: "User",
          email: "user@email.com",
          contact: "9999999999",
        },

        theme: { color: "#2563eb" },

        handler: async (response: any) => {
          try {
            if (paymentHandled.current) return;
            paymentHandled.current = true;

            await verifyPayment({
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              home_service_id: BOOKING_ID,
            });

            setPaymentSuccess(true);
          } catch {
            alert("Payment verification failed");
          } finally {
            setLoadingPay(false);
          }
        },
      };

      const rz = new (window as any).Razorpay(options);

      rz.on("payment.failed", () => {
        if (paymentHandled.current) return;
        paymentHandled.current = true;
        alert("Payment failed or cancelled");
        setLoadingPay(false);
      });

      rz.open();
    } catch {
      alert("Unable to initiate payment");
      setLoadingPay(false);
    }
  };

  return (
    <div className="pay_page">
      {/* HEADER */}
      <header className="pay_header">
        <button className="pay_backBtn" type="button" onClick={onClose}>
          <MdArrowBackIosNew size={18} />
        </button>

        <h1 className="pay_headerTitle">Payment Summary</h1>
        <div className="pay_headerSpacer" />
      </header>

      {/* CONTENT */}
      <main className="pay_content">
        <p className="pay_sectionLabel">SERVICE DETAILS</p>

        <div className="pay_card">
          <p className="pay_serviceName">{bookingDetails?.serviceName}</p>

          <div className="pay_dateRow">
            <MdCalendarToday size={14} />
            <span>
              {bookingDetails?.date} • {bookingDetails?.time}
            </span>
          </div>

          <p className="pay_address">{bookingDetails?.address}</p>
        </div>

        <p className="pay_sectionLabel">PAYMENT</p>

        <div className="pay_card">
          <div className="pay_totalRow">
            <p className="pay_totalLabel">Total Payable</p>
            <p className="pay_totalValue">{payableText}</p>
          </div>
        </div>

        <div className="pay_bottomSpace" />
      </main>

      {/* FOOTER */}
      <footer className="pay_footer">
        <button
          className="pay_checkoutBtn"
          type="button"
          onClick={handlePayment}
          disabled={loadingPay}
        >
          {loadingPay ? "Processing..." : `Checkout ${payableText}`}
        </button>
      </footer>

      {/* SUCCESS MODAL */}
      {paymentSuccess && (
        <div className="pay_modalOverlay">
          <div className="pay_modalCard">
            <MdCheckCircle size={80} className="pay_successIcon" />

            <p className="pay_modalTitle">Payment Successful</p>
            <p className="pay_modalSub">
              Your payment has been completed successfully.
            </p>

            <button
              className="pay_modalBtn"
              type="button"
              onClick={() => {
                setPaymentSuccess(false);

                if (!allocatedEmployee || !bookingDetails) {
                  alert("Missing booking details");
                  return;
                }

                navigate("/dashboard/payment-success", {
                  replace: true,
                  state: {
                    allocatedEmployee,
                    bookingDetails,
                    transactionId: "CLEAN-88291",
                  },
                });
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentScreenWeb;
