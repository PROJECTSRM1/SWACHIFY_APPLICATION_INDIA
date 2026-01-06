import React, { useEffect, useMemo, useState } from "react";
import { List, Card, Image, Tag, Row, Col } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "../index.css";
import { Spin } from "antd";


import cleaningImg from "../assets/HomeServices/cleaningservices.jpg";
import electricalImg from "../assets/HomeServices/electricalservices.jpg";
import plumbingImg from "../assets/HomeServices/plumbingservices.jpg";
import { getLoggedInUserIdSafe } from "../api/customerAuth";


import { api } from "../api/client";

const SERVICE_IMAGE_MAP: Record<number, string> = {
  1: cleaningImg,     // Cleaning
  2: electricalImg,   // Electrical
  3: plumbingImg,     // Plumbing
};

const DEFAULT_IMAGE = cleaningImg;



const TIME_SLOT_LABELS: Record<number, string> = {
  1: "09:00",
  2: "11:00",
  3: "13:00",
  4: "15:00",
  5: "17:00",
};

dayjs.extend(customParseFormat);

/* ---------------- TYPES ---------------- */

type Booking = {
  id: number;
  title: string;
  date: string;
  time: string;
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
  const [loading, setLoading] = useState(true);


  /* Load bookings from localStorage */
  // useEffect(() => {
  //   try {
  //     const raw = localStorage.getItem(LS_BOOKINGS_KEY);
  //     if (raw) setBookings(JSON.parse(raw));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, []);
useEffect(() => {
  const fetchRecentBookings = async () => {
    const userId = getLoggedInUserIdSafe();

    // 🚫 Guest user
    if (!userId) {
      setBookings([]);
      setLoading(false); // ✅ IMPORTANT
      return;
    }

    try {
      setLoading(true); // ✅ START LOADER

      const res = await api.post(
        "api/admin/by-user",
        {
          created_by: userId,
          payment_done: true,
        }
      );

      const data = res.data;

      const mapped: Booking[] = data.map((b: any) => ({
        id: b.id,
        title: b.full_name || "Home Service",
        date: b.preferred_date,
        time: TIME_SLOT_LABELS[b.time_slot_id] || "09:00",
        amount: b.service_price,
        paymentDone: b.payment_done,
        image: SERVICE_IMAGE_MAP[b.service_id] || DEFAULT_IMAGE,
      }));

      setBookings(mapped);
    } catch (err) {
      console.error("Failed to fetch recent bookings", err);
      setBookings([]);
    } finally {
      setLoading(false); // ✅ STOP LOADER
    }
  };

  fetchRecentBookings();
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

  // 1️⃣ Loader FIRST
if (loading) {
  return (
    <div
      style={{
        height: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin size="large" tip="Loading recent bookings..." />
    </div>
  );
}


if (!loading && sortedBookings.length === 0) {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
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
                <Row align="top" className="booking-row">
                  {/* IMAGE */}
                  <Col flex="84px" className="Booking-image">
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
                  <Col flex="auto" className="booking-text">
                    <div className="booking-header">
  <div className="booking-title">{item.title}</div>

  <Tag
    color={meta.color}
    className="booking-status-tag"
  >
    {meta.label}
  </Tag>
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
