import React from "react";
import {
  MdCheckCircle,
  MdClose,
  MdCalendarToday,
  MdLocationOn,
  MdCall,
  MdChat,
} from "react-icons/md";
import "./PaymentSuccessDetailsScreenWeb.css";

/* ================= TYPES ================= */

type AllocatedEmployee = {
  name?: string;
  role?: string;
  rating?: string;
  mobileNumber?: string;
  image?: string;
};

type BookingDetails = {
  serviceName?: string;
  date?: string;
  time?: string;
  address?: string;
};

type PaymentSuccessDetailsProps = {
  allocatedEmployee?: AllocatedEmployee;
  bookingDetails?: BookingDetails;
  transactionId?: string;
  onClose: () => void;
};

/* ================= HELPERS ================= */

const TimelineItem = ({
  title,
  subtitle,
  active = false,
}: {
  title: string;
  subtitle: string;
  active?: boolean;
}) => (
  <div className="psw_timelineItem">
    <div className={`psw_dot ${active ? "active" : ""}`} />
    <div>
      <p className="psw_timelineTitle">{title}</p>
      <p className="psw_timelineSub">{subtitle}</p>
    </div>
  </div>
);

const InfoRow = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text?: string;
}) => (
  <div className="psw_infoRow">
    {icon}
    <span>{text || "-"}</span>
  </div>
);

/* ================= COMPONENT ================= */

const PaymentSuccessDetailsScreenWeb: React.FC<
  PaymentSuccessDetailsProps
> = ({
  allocatedEmployee,
  bookingDetails,
  transactionId = "N/A",
  onClose,
}) => {
  return (
    <div className="psw_page">
      {/* HEADER */}
      <header className="psw_header">
        <div className="psw_headerLeft">
          <MdCheckCircle className="psw_successIcon" />
          <h1>Payment Successful</h1>
        </div>

        <button className="psw_closeBtn" onClick={onClose}>
          <MdClose size={22} />
        </button>
      </header>

      {/* CONTENT */}
      <main className="psw_content">
        {/* TIMELINE */}
        <section className="psw_timeline">
          <TimelineItem
            title="Payment Confirmed"
            subtitle={`Transaction #${transactionId}`}
            active
          />
          <TimelineItem
            title="Professional Assigned"
            subtitle="Assigned just now"
            active
          />
          <TimelineItem
            title="Cleaner On the Way"
            subtitle={`Arrival at ${bookingDetails?.time || "-"}`}
          />
        </section>

        {/* GRID */}
        <section className="psw_grid">
          {/* BOOKING DETAILS */}
          <div className="psw_card">
            <h3>Booking Details</h3>

            <InfoRow
              icon={<MdCalendarToday />}
              text={`${bookingDetails?.date} • ${bookingDetails?.time}`}
            />
            <InfoRow
              icon={<MdLocationOn />}
              text={bookingDetails?.address}
            />
          </div>

          {/* PROFESSIONAL */}
          <div className="psw_card psw_professional">
            <img
              src={
                allocatedEmployee?.image ||
                "https://i.pravatar.cc/150?img=12"
              }
              alt="Professional"
            />

            <h4>{allocatedEmployee?.name || "Professional"}</h4>
            <p>
              {allocatedEmployee?.role || "Cleaner"} • ⭐{" "}
              {allocatedEmployee?.rating || "4.8"}
            </p>

            <div className="psw_actions">
              <button
                onClick={() =>
                  (window.location.href = `tel:${allocatedEmployee?.mobileNumber}`)
                }
              >
                <MdCall /> Call
              </button>

              <button className="primary">
                <MdChat /> Chat
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PaymentSuccessDetailsScreenWeb;
