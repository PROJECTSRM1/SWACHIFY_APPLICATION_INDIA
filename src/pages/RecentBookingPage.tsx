import React, { useEffect, useState } from "react";
import { List, Card, Empty, Tag, Row, Col } from "antd";
import "../index.css";

type Booking = {
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

const LS_BOOKINGS_KEY = "bookings";

const RecentBookingPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_BOOKINGS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setBookings(parsed);
        else setBookings([]);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.warn("Failed to read bookings", err);
      setBookings([]);
    }
  }, []);

  if (!bookings || bookings.length === 0) {
    // show simple H1 'vamsi' when no bookings (your earlier request)
    return (
      <div className="recent-booking-wrapper-empty">
        <h1>vamsi</h1>
        <p style={{ textAlign: "center", color: "#6b7280" }}>No recent bookings yet</p>
      </div>
    );
  }

  return (
    <div className="recent-booking-wrapper">
      <h2 className="recent-booking-title">Recent Bookings</h2>

      <List
        dataSource={bookings.slice().reverse()} // latest first
        grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2 }}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card className="recent-booking-card" title={item.title} extra={<span>{item.date}</span>}>
              <Row gutter={[12, 8]}>
                <Col xs={24} sm={12}>
                  <div><strong>Time:</strong> {item.time ?? "—"}</div>
                  {item.address && <div><strong>Address:</strong> {item.address}</div>}
                </Col>
                <Col xs={24} sm={12}>
                  <div><strong>Amount:</strong> {item.amount ? `₹${item.amount}` : "—"}</div>
                  <div style={{ marginTop: 8 }}>
                    <Tag color={item.status === "Upcoming" ? "blue" : item.status === "Completed" ? "green" : "red"}>
                      {item.status}
                    </Tag>
                  </div>
                </Col>
              </Row>
              {item.notes && <div style={{ marginTop: 12 }}><strong>Notes:</strong> {item.notes}</div>}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default RecentBookingPage;
