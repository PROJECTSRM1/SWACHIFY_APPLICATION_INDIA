import React, { useEffect, useState } from "react";
import { List, Card, Tag, Row, Col } from "antd";
import "../index.css"

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
      </div>
    );
  }

  return (
    <div className="rb-container">
      <h2 className="rb-heading">Recent Bookings</h2>

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
                    <Col xs={24} sm={12}>
                      <div>
                        <strong>Amount:</strong> {item.amount ? `₹${item.amount}` : "—"}
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <Tag
                          color={
                            item.status === "Upcoming" ? "blue" : item.status === "Completed" ? "green" : "red"
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
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecentBookingPage;
