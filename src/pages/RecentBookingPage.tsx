// src/pages/RecentBookingPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { List, Card, Image, Tag, Row, Col } from "antd";
import "../index.css";
import { useCart } from "../context/CartContext";

type Booking = {
  id: string;
  title: string;
  date: string;
  time?: string;
  status?: string;
  amount?: number | string;
  image?: string;
};

const LS_BOOKINGS_KEY = "bookings";
const LS_STATUS_MAP_KEY = "booking_status_map_v1";

const STATUS_META: Record<string, { color: string; label: string }> = {
  Upcoming: { color: "blue", label: "Upcoming" },
  InProgress: { color: "gold", label: "In Progress" },
  Completed: { color: "green", label: "Completed" },
  Cancelled: { color: "red", label: "Cancelled" },
};

const firstImageFrom = (obj: any) => {
  if (!obj) return undefined;
  return obj.image || obj.img || obj.thumbnail || obj.thumb || obj.photo;
};

const normalizeStatus = (raw?: string) => {
  if (!raw) return "Upcoming";
  const s = raw.toLowerCase().trim();
  if (s.startsWith("up")) return "Upcoming";
  if (s.startsWith("in")) return "InProgress";
  if (s.startsWith("com")) return "Completed";
  if (s.startsWith("can")) return "Cancelled";
  return "Upcoming";
};

const stableKeyForItem = (ci: any) => {
  const explicit = ci.id ?? ci.sku ?? ci.uid ?? ci._id;
  if (explicit) return String(explicit);

  const base = `${ci.title ?? ""}-${ci.price ?? ""}-${ci.amount ?? ""}`;
  let hash = 0;
  for (let i = 0; i < base.length; i++) {
    hash = (hash * 31 + base.charCodeAt(i)) | 0;
  }
  return "item_" + Math.abs(hash);
};

const RecentBookingPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { cart } = useCart();
  const [statusMap, setStatusMap] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_BOOKINGS_KEY);
      if (raw) setBookings(JSON.parse(raw));
    } catch {}
  }, []);
console.log(bookings);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_STATUS_MAP_KEY);
      if (raw) setStatusMap(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_STATUS_MAP_KEY, JSON.stringify(statusMap));
  }, [statusMap]);

  useEffect(() => {
    if (cart.length === 0) {
      localStorage.removeItem(LS_BOOKINGS_KEY);
      setBookings([]);
    }
  }, [cart]);

  useEffect(() => {
    if (!Array.isArray(cart)) return;

    setStatusMap((prev) => {
      const next = { ...prev };
      const cycle = ["Upcoming", "InProgress", "Completed", "Cancelled"];
      let count = Object.keys(next).length;
      let changed = false;

      cart.forEach((ci) => {
        const key = stableKeyForItem(ci);
        if (next[key]) return;
        const assigned = cycle[count % cycle.length];
        next[key] = assigned;
        count++;
        changed = true;
      });

      return changed ? next : prev;
    });
  }, [cart]);

  const cartAsBookings = useMemo(() => {
    return cart.map((ci) => {
      const idStr = stableKeyForItem(ci);
      const title = ci.title ?? "Service";
      // @ts-ignore
      const amt = ci.totalPrice ?? ci.price ?? ci.amount;

      return {
        id: idStr,
        title,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toTimeString().slice(0, 5),
        status: statusMap[idStr],
        amount: amt,
        image: firstImageFrom(ci),
      };
    });
  }, [cart, statusMap]);

  const merged = [...cartAsBookings];

  if (merged.length === 0) {
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
        dataSource={merged.slice().reverse()}
        renderItem={(item) => {
          const imgSrc = firstImageFrom(item);
          const status = normalizeStatus(item.status);
          const meta = STATUS_META[status];

          return (
            <List.Item key={item.id}>
              <Card bordered={false}>
                <Row align="middle" wrap={false}>
                  <Col className="booking-image" flex="84px">
                    {imgSrc ? (
                      <Image
                        src={imgSrc}
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

                  <Col className="booking-text" flex="auto">
                    <div style={{ fontSize: 18, fontWeight: 700 }}>
                      {item.title}
                    </div>
                    <div style={{ color: "#6b7280", fontSize: 14, display: "flex", flexDirection: "column" }}>
  <span>Date: {item.date}</span>
  <span>Time: {item.time}</span>
</div>

                  </Col>

                  <Col className="booking-status" flex="70px">
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