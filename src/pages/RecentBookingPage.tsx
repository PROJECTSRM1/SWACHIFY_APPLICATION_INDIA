import React, { useEffect, useState } from "react";
import { List, Card, Tag, Row, Col, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
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
        setBookings(Array.isArray(parsed) ? parsed : []);
      }
    } catch {
      setBookings([]);
    }
  }, []);

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
      </div>
    );
  }

  return (
    <div className="recent-booking-wrapper">
      <h2 className="recent-booking-title">Recent Bookings</h2>

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
                            item.status === "Upcoming"
                              ? "blue"
                              : item.status === "Completed"
                              ? "green"
                              : "red"
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
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );
};

export default RecentBookingPage;