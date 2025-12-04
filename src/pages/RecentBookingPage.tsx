import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { List, Card, Tag, Row, Col } from "antd";
import "../index.css"
=======
import { List, Card, Tag, Row, Col, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "../index.css";
>>>>>>> main

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
        setBookings(Array.isArray(parsed) ? parsed : []);
      }
    } catch {
      setBookings([]);
    }
  }, []);

<<<<<<< HEAD
  // DELETE BOOKING: remove from state and persist to localStorage
  const handleDeleteBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    try {
      localStorage.setItem(LS_BOOKINGS_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn("Failed to update localStorage after deletion", err);
    }
  };

  // Optional: if this page is used as an overlay and you want to lock body scroll,
  // uncomment the effect below. Otherwise keep it commented.
  /*
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);
  */

  if (!bookings || bookings.length === 0) {
    return (
      <div className="rb-empty">
        <h1 className="rb-empty-title">vamsi</h1>
        <p className="rb-empty-sub">No recent bookings yet</p>
=======
  /* remove booking by id and persist */
  const handleRemove = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem(LS_BOOKINGS_KEY, JSON.stringify(updated));
  };

  if (!bookings || bookings.length === 0) {
    return (
      <div className="recent-booking-wrapper-empty">
        <h1>No Items Available</h1>
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          No recent bookings yet
        </p>
>>>>>>> main
      </div>
    );
  }

  return (
    <div className="rb-container">
      <h2 className="rb-heading">Recent Bookings</h2>

<<<<<<< HEAD
      {/* Outer scroll area: vertical scroll when lots of rows; inner row supports horizontal scroll */}
      <div className="rb-scroll-outer" role="region" aria-label="Recent bookings">
        <div className="rb-list-row">
          {bookings
            .slice()
            .reverse()
            .map((item) => (
              <div key={item.id} className="rb-item">
                <Card
                  className="rb-card"
                  size="small"
                  title={
                    <div className="rb-card-title">
                      <span className="rb-title-left">{item.title}</span>
                      <span className="rb-date">{item.date}</span>

                      {/* DELETE BUTTON */}
                      <button
                        type="button"
                        className="rb-delete-btn"
                        onClick={() => handleDeleteBooking(item.id)}
                        aria-label={`Delete booking ${item.title}`}
                        title="Remove booking"
                      >
                        ✕
                      </button>
                    </div>
                  }
                >
=======
      <div className="recent-booking-content">
        <List
          dataSource={bookings.slice().reverse()}
          renderItem={(item) => {
            const extraHeader = (
              <div className="card-extra-header">
                <span className="card-date">{item.date}</span>

                {/* small delete icon button */}
                <Tooltip title="Remove booking">
                  <button
                    className="card-delete-btn"
                    aria-label={`Remove booking ${item.title}`}
                    onClick={() => handleRemove(item.id)}
                  >
                    <DeleteOutlined />
                  </button>
                </Tooltip>
              </div>
            );

            return (
              <List.Item key={item.id}>
                <Card className="recent-booking-card" title={item.title} extra={extraHeader}>
>>>>>>> main
                  <Row gutter={[12, 8]}>
                    <Col xs={24} sm={12}>
                      <div>
                        <strong>Time:</strong> {item.time ?? "—"}
                      </div>
                      {item.address && (
                        <div>
                          <strong>Address:</strong> {item.address}
                        </div>
                      )}
                    </Col>
<<<<<<< HEAD
=======

>>>>>>> main
                    <Col xs={24} sm={12}>
                      <div>
                        <strong>Amount:</strong> {item.amount ? `₹${item.amount}` : "—"}
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <Tag
                          color={
<<<<<<< HEAD
                            item.status === "Upcoming" ? "blue" : item.status === "Completed" ? "green" : "red"
=======
                            item.status === "Upcoming"
                              ? "blue"
                              : item.status === "Completed"
                              ? "green"
                              : "red"
>>>>>>> main
                          }
                        >
                          {item.status}
                        </Tag>
                      </div>
                    </Col>
                  </Row>

                  {item.notes && (
                    <div style={{ marginTop: 12 }}>
                      <strong>Notes:</strong> {item.notes}
                    </div>
                  )}
                </Card>
<<<<<<< HEAD
              </div>
            ))}
        </div>
=======
              </List.Item>
            );
          }}
        />
>>>>>>> main
      </div>
    </div>
  );
};

export default RecentBookingPage;