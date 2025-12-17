// src/pages/RecentBookingPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { List, Card, Image, Tag, Row, Col } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "../index.css";

dayjs.extend(customParseFormat);

/* ---------------- TYPES ---------------- */

type Booking = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // "HH:mm" OR "hh:mm A"
  amount: number;
  image?: string;
  paymentDone: boolean;
};

const LS_BOOKINGS_KEY = "bookings";

/* ---------------- STATUS UI ---------------- */

const STATUS_META = {
  Upcoming: { color: "blue", label: "Upcoming" },
  Completed: { color: "green", label: "Completed" },
  Expired: { color: "red", label: "Expired" },
} as const;

/* ---------------- HELPERS ---------------- */

type Status = keyof typeof STATUS_META;

const computeStatus = (b: Booking): Status => {
  // 🔥 STRICT parsing (NO browser Date guessing)
  const slotDateTime = dayjs(
    `${b.date} ${b.time}`,
    ["YYYY-MM-DD HH:mm", "YYYY-MM-DD hh:mm A"],
    true
  );

  if (!slotDateTime.isValid()) {
    console.error("INVALID SLOT DATETIME:", b.date, b.time);
    return "Upcoming"; // safe fallback
  }

  const now = dayjs();

  // 🔴 Slot time over → ALWAYS expired
  if (now.isAfter(slotDateTime)) return "Expired";

  // 🟢 Slot still valid
  if (b.paymentDone) return "Completed";

  return "Upcoming";
};

/* ---------------- COMPONENT ---------------- */

const RecentBookingPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  /* Load bookings */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_BOOKINGS_KEY);
      if (raw) setBookings(JSON.parse(raw));
    } catch (err) {
      console.error(err);
    }
  }, []);

  /* ⏱ Re-render every 30 seconds (for expiry) */
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
                  </Col>

                  {/* STATUS */}
                  <Col flex="90px">
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
