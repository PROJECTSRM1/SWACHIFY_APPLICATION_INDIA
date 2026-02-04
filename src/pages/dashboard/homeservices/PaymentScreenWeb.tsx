import React, { useMemo, useRef, useState } from "react";
import {
  MdArrowBack,
  MdClose,
  MdCalendarToday,
  MdAccessTime,
  MdLocationOn,
  MdVerified,
  MdShield,
  MdLock,
  MdCreditCard,
  MdAccountBalanceWallet,
  MdQrCode2,
  MdCheckCircle,
  MdStar,
} from "react-icons/md";
import "./PaymentScreenWeb.css";
import PaymentSuccessDetailsScreenWeb from "./PaymentSuccessDetailsScreenWeb";

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
  totalAmount: number;
  allocatedEmployee: AllocatedEmployee | null;
  bookingDetails: BookingDetails | null;
};

/* ---------------- CONFIG ---------------- */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID as string;

/* ---------------- HELPERS ---------------- */

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
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
  const res = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, bookingId }),
  });

  if (!res.ok) throw new Error("Create order failed");
  return res.json();
}

async function verifyPayment(payload: VerifyPayload): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/payment/verify-payment`, {
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
  const paymentHandled = useRef(false);
  const [loadingPay, setLoadingPay] = useState(false);
  const [showSuccessDetails, setShowSuccessDetails] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string>("upi");

  const TOTAL_AMOUNT = Math.round(totalAmount * 100);
  const BOOKING_ID = 26;

  const payableText = useMemo(() => formatINR(TOTAL_AMOUNT / 100), [TOTAL_AMOUNT]);

  const paymentMethods = [
    { id: "upi", label: "UPI", sublabel: "GPay, PhonePe, Paytm", icon: <MdQrCode2 size={24} /> },
    { id: "card", label: "Credit / Debit Card", sublabel: "Visa, Mastercard, RuPay", icon: <MdCreditCard size={24} /> },
    { id: "wallet", label: "Wallets", sublabel: "Paytm, Mobikwik", icon: <MdAccountBalanceWallet size={24} /> },
  ];

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
        name: "Jeeva Services",
        description: "Service Payment",
        order_id: order.id,
        prefill: {
          name: "User",
          email: "user@email.com",
          contact: "9999999999",
        },
        theme: { color: "#7B2CBF" },
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

            setShowSuccessDetails(true);
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
    <div className="pmt_page">
      {/* HEADER */}
      <header className="pmt_header">
        <button className="pmt_headerBtn" type="button" onClick={onClose}>
          <MdArrowBack size={20} />
        </button>
        <div className="pmt_headerContent">
          <h1 className="pmt_headerTitle">Payment</h1>
          <p className="pmt_headerSubtitle">Complete your booking</p>
        </div>
        <button className="pmt_headerBtn" type="button" onClick={onClose}>
          <MdClose size={20} />
        </button>
      </header>

      {/* CONTENT */}
      <main className="pmt_content">
        {/* SERVICE SUMMARY CARD */}
        <section className="pmt_section">
          <div className="pmt_serviceCard">
            <div className="pmt_serviceIcon">🧹</div>
            <div className="pmt_serviceInfo">
              <h3 className="pmt_serviceName">{bookingDetails?.serviceName || "Cleaning Service"}</h3>
              <div className="pmt_serviceRating">
                <MdStar className="pmt_starIcon" />
                <span>4.8</span>
                <MdVerified className="pmt_verifiedIcon" />
                <span>Verified Service</span>
              </div>
            </div>
          </div>

          {/* DATE TIME LOCATION */}
          <div className="pmt_detailsGrid">
            <div className="pmt_detailItem">
              <div className="pmt_detailIcon">
                <MdCalendarToday size={18} />
              </div>
              <div className="pmt_detailText">
                <span className="pmt_detailLabel">Date</span>
                <span className="pmt_detailValue">{bookingDetails?.date || "Not selected"}</span>
              </div>
            </div>

            <div className="pmt_detailItem">
              <div className="pmt_detailIcon">
                <MdAccessTime size={18} />
              </div>
              <div className="pmt_detailText">
                <span className="pmt_detailLabel">Time</span>
                <span className="pmt_detailValue">{bookingDetails?.time || "Not selected"}</span>
              </div>
            </div>

            <div className="pmt_detailItem pmt_detailItem--full">
              <div className="pmt_detailIcon">
                <MdLocationOn size={18} />
              </div>
              <div className="pmt_detailText">
                <span className="pmt_detailLabel">Location</span>
                <span className="pmt_detailValue pmt_detailValue--address">
                  {bookingDetails?.address || "Address not provided"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* PAYMENT METHODS */}
        <section className="pmt_section">
          <h2 className="pmt_sectionTitle">Payment Method</h2>

          <div className="pmt_paymentMethods">
            {paymentMethods.map((method, index) => (
              <div
                key={method.id}
                className={`pmt_paymentMethod ${selectedPayment === method.id ? "pmt_paymentMethod--selected" : ""}`}
                onClick={() => setSelectedPayment(method.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="pmt_paymentCheck">
                  {selectedPayment === method.id && <MdCheckCircle />}
                </div>
                <div className="pmt_paymentIcon">{method.icon}</div>
                <div className="pmt_paymentInfo">
                  <span className="pmt_paymentLabel">{method.label}</span>
                  <span className="pmt_paymentSublabel">{method.sublabel}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRICE BREAKDOWN */}
        <section className="pmt_section">
          <h2 className="pmt_sectionTitle">Price Details</h2>

          <div className="pmt_priceCard">
            <div className="pmt_priceRow">
              <span>Service Charge</span>
              <span>{payableText}</span>
            </div>
            <div className="pmt_priceRow pmt_priceRow--discount">
              <span>Discount</span>
              <span className="pmt_discount">- ₹0</span>
            </div>
            <div className="pmt_priceDivider"></div>
            <div className="pmt_priceRow pmt_priceRow--total">
              <span>Total Amount</span>
              <span className="pmt_totalAmount">{payableText}</span>
            </div>
          </div>
        </section>

        {/* SECURITY BADGE */}
        <div className="pmt_securityBadge">
          <MdShield className="pmt_securityIcon" />
          <div className="pmt_securityText">
            <span className="pmt_securityTitle">100% Secure Payment</span>
            <span className="pmt_securityDesc">Your payment is protected with 256-bit encryption</span>
          </div>
          <MdLock className="pmt_lockIcon" />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="pmt_footer">
        <div className="pmt_footerPrice">
          <span className="pmt_footerLabel">Total</span>
          <span className="pmt_footerValue">{payableText}</span>
        </div>
        <button
          className={`pmt_payBtn ${loadingPay ? "pmt_payBtn--loading" : ""}`}
          type="button"
          onClick={handlePayment}
          disabled={loadingPay}
        >
          {loadingPay ? (
            <>
              <span className="pmt_spinner"></span>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <MdLock size={18} />
              <span>Pay {payableText}</span>
            </>
          )}
        </button>
      </footer>

      {/* SUCCESS MODAL */}
      {showSuccessDetails && (
        <div className="pmt_successOverlay">
          <div className="pmt_successModal">
            <PaymentSuccessDetailsScreenWeb
              allocatedEmployee={allocatedEmployee || undefined}
              bookingDetails={bookingDetails || undefined}
              transactionId="CLEAN-88291"
              onClose={() => {
                setShowSuccessDetails(false);
                onClose();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentScreenWeb;
