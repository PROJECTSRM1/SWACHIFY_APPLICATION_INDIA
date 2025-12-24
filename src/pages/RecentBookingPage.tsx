import React, { useEffect, useMemo, useState } from "react";
import { List, Card, Image, Tag, Row, Col } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "../index.css";
import cleaningservices from "../assets/HomeServices/cleaningservices.jpg";
import electricalservices from "../assets/HomeServices/electricalservices.jpg";
import plumbingservices from "../assets/HomeServices/plumbingservices.jpg";


dayjs.extend(customParseFormat);
const API_ENDPOINT = "https://swachify-india-be-1-mcrb.onrender.com/api/home-service";



/* ---------------- TYPES ---------------- */

type Booking = {
  id: string;
  title: string;
  date: string;      // YYYY-MM-DD
  time: string;      // HH:mm or hh:mm A
  amount: number;
  image?: string;
  paymentDone: boolean;
};

// const LS_BOOKINGS_KEY = "bookings";

/* ---------------- STATUS UI ---------------- */

const STATUS_META = {
  Upcoming: { color: "blue", label: "Upcoming" },
  InProgress: { color: "gold", label: "In Progress" },
  Completed: { color: "green", label: "Completed" },
  Expired: { color: "red", label: "Expired" },
} as const;

/* ---------------- HELPERS ---------------- */

type Status = keyof typeof STATUS_META;

/**
 * STATUS RULES (EXACTLY AS REQUESTED)
 *
 * 1. Paid + slot not over  -> In Progress
 *    - show Payment Successful
 *    - show Work Pending
 *
 * 2. Paid + slot over      -> Completed
 *    - hide payment/work blocks
 *
 * 3. Unpaid + slot over    -> Expired
 *
 * 4. Unpaid + slot future  -> Upcoming
 */
const computeStatus = (b: Booking): Status => {
  const slotDateTime = dayjs(
    `${b.date} ${b.time}`,
    ["YYYY-MM-DD HH:mm", "YYYY-MM-DD hh:mm A"],
    true
  );

  if (!slotDateTime.isValid()) {
    console.error("INVALID SLOT DATETIME:", b.date, b.time);
    return "Upcoming";
  }

  const now = dayjs();
  const slotOver = now.isAfter(slotDateTime);
  

  // ❌ unpaid + slot over
  if (!b.paymentDone && slotOver) {
    return "Expired";
  }

  // ✅ paid + slot over (auto complete)
  if (b.paymentDone && slotOver) {
    return "Completed";
  }

  // 🟡 paid + slot not over
  if (b.paymentDone && !slotOver) {
    return "InProgress";
  }

  return "Upcoming";
};

/* ---------------- COMPONENT ---------------- */

const RecentBookingPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  /* Load bookings from localStorage */
  /* Load bookings from GET API instead of localStorage */
useEffect(() => {
  const fetchBookings = async () => {
    try {
      const res = await fetch(API_ENDPOINT);
      const data = await res.json();
const mapped: Booking[] = data.map((b: any) => ({
  id: String(b.id),
  title: b.full_name,
  date: b.preferred_date,
  time: `Slot ID: ${b.time_slot_id}`,  // show slot id as time since API has no time string
  amount: b.service_price ?? 0,
  paymentDone: b.payment_done === true,
  image: (() => {
    if (b.service_id === 1) return cleaningservices;
    if (b.service_id === 2) return electricalservices;
    if (b.service_id === 3) return plumbingservices;
    return undefined;
  })(),
}));


      setBookings(mapped);
    } catch (err) {
      console.error("API GET Error:", err);
    }
  };

  fetchBookings();
}, []);


  /* ⏱ Re-render every 30 seconds (auto complete / expiry) */
  useEffect(() => {
    const timer = setInterval(() => {
      setBookings((prev) => [...prev]);
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  const sortedBookings = useMemo(
    () => [...bookings].reverse(),
    [bookings]
  );

  if (sortedBookings.length === 0) {
    return (
      <div style={{ padding: 40 }}>
        <h2>No recent bookings</h2>
      </div>
    );
  }

  return (
    <div className="recent-booking-wrapper">
      <h2 style={{ marginBottom: 18 }}>Recent Bookings</h2>

      <List
        dataSource={sortedBookings}
        renderItem={(item) => {
          const status = computeStatus(item);
          const meta = STATUS_META[status];

          return (
            <List.Item key={item.id}>
              <Card bordered={false}>
                <Row align="middle" wrap={false}>
                  {/* IMAGE */}
                  <Col flex="84px">
                    {item.image ? (
                      <Image
                        src={item.image}
                        width={84}
                        height={84}
                        preview={false}
                        style={{ objectFit: "cover", borderRadius: 8 }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 84,
                          height: 84,
                          borderRadius: 8,
                          background: "#f5f5f5",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        No Image
                      </div>
                    )}
                  </Col>

                  {/* DETAILS */}
                  <Col flex="auto" style={{ paddingLeft: 16 }}>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>
                      {item.title}
                    </div>

                    <div style={{ color: "#6b7280", fontSize: 14 }}>
                      <div>Date: {item.date}</div>
                      <div>Time: {item.time}</div>
                      <div>Amount: ₹{item.amount}</div>
                    </div>

                    {/* ✅ PAYMENT & WORK BLOCK (ONLY IN PROGRESS) */}
                    {status === "InProgress" && (
                      <div style={{ marginTop: 6 }}>
                        <div style={{ color: "green", fontWeight: 500 }}>
                          Payment: Successful
                        </div>
                        <div style={{ color: "#d97706", fontWeight: 500 }}>
                          Work: Pending
                        </div>
                      </div>
                    )}
                  </Col>

                  {/* STATUS BADGE */}
                  <Col flex="110px">
                    <Tag
                      color={meta.color}
                      style={{ padding: "6px 12px", fontWeight: 600 }}
                    >
                      {meta.label}
                    </Tag>
                  </Col>
                </Row>
              </Card>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default RecentBookingPage;
