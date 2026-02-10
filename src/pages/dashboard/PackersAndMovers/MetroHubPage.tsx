import React, { useEffect, useState } from "react";
import "./Metro.css";
import MetroPlanTrip from "./MetroPlanTrip.tsx";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


type MetroTicket = {
  from: string;
  to: string;
  fare: number;
  time: number;
  tripType: "oneway" | "twoway";
  ticketId: string;
  qr: string;
};


const MetroHubPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPlan, setShowPlan] = useState(false);
  const [showQRPopup, setShowQRPopup] = useState(false);
  const [qrData, setQrData] = useState<MetroTicket | null>(null);
  const [history, setHistory] = useState<MetroTicket[]>([]);


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("metroHistory") || "[]");
    setHistory(saved);
  }, []);

  const addToHistory = (ticket: MetroTicket) => {
    const updated = [ticket, ...history];
    setHistory(updated);
    localStorage.setItem("metroHistory", JSON.stringify(updated));
  };

  return (
    <div className="sw-jr-page">
      {/* HEADER */}
      <div className="sw-jr-header">
        <div className="sw-jr-header-left" style={{ display: "flex", alignItems: "center", gap: "14px" }}>

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <LeftOutlined style={{ fontSize: "16px" }} />
          </button>

          {/* EXISTING LOGO + TITLE */}
          <div className="sw-jr-icon-box">🚇</div>
          <div>
            <div className="sw-jr-title">Metro Hub</div>
            <div className="sw-jr-location">HYDERABAD</div>
          </div>
        </div>

        <div className="sw-jr-history-btn">⟳</div>
      </div>


      <div className="sw-jr-center-box">

        {/* BOOK BUTTON */}
        <div
          className="sw-jr-book-card"
          onClick={() => setShowPlan(true)}
        >
          <div className="sw-jr-book-content">
            <div className="sw-jr-book-title">Book Ticket</div>
            <div className="sw-jr-book-sub">Single or Round Trip</div>
          </div>
          <div className="sw-jr-arrow">→</div>
        </div>

        {/* RECENT TICKETS */}
        <div className="sw-jr-section-title">RECENT TICKETS</div>

        <div className="sw-jr-recent-scroll">
          {history.length === 0 ? (
            <div style={{ opacity: 0.5, marginTop: "12px", fontSize: "14px" }}>
              No recent bookings
            </div>
          ) : (
            history.map((t, idx) => (
              <div
                key={idx}
                className="sw-jr-ticket-card"
                onClick={() => {
                  setQrData(t);
                  setShowQRPopup(true);
                }}
              >
                <div className="sw-jr-ticket-place">
                  {t.from} → {t.to}
                </div>
                <div className="sw-jr-ticket-meta">
                  ₹{t.fare} •{" "}
                  {new Date(t.time).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* PLAN TRIP POPUP */}
      {showPlan && (
        <div className="sw-jr-popup-overlay">
          <div className="sw-jr-popup-fullscreen">
            <MetroPlanTrip
              closePlan={() => setShowPlan(false)}
              showQR={(data: MetroTicket) => {
                setQrData(data);
                setShowQRPopup(true);
                addToHistory(data);
              }}
            />

          </div>
        </div>
      )}

      {/* QR POPUP FROM CHILD */}
      {showQRPopup && qrData && (
        <div className="sw-jr-ticket-overlay">
          <div className="sw-jr-qr-card">

            <div className="sw-jr-qr-header">
              <span>HYD METRO</span>
              <span>{qrData.ticketId}</span>
            </div>

            <div className="sw-jr-qr-route">
              <div>
                <div className="sw-jr-qr-label">FROM</div>
                <div className="sw-jr-qr-value">{qrData.from}</div>
              </div>

              <div className="sw-jr-qr-arrow">→</div>

              <div>
                <div className="sw-jr-qr-label">TO</div>
                <div className="sw-jr-qr-value">{qrData.to}</div>
              </div>
            </div>

            <div className="sw-jr-qr-whitebox">
              <img src={qrData.qr} className="sw-jr-qr-img" />
            </div>

            <div className="sw-jr-qr-info">
              SCAN AT ENTRY
              <div className="sw-jr-qr-sub">
                {qrData.tripType === "oneway" ? "One Way" : "Two Way"} • ₹{qrData.fare}
              </div>
            </div>

            <div className="sw-jr-qr-done-btn" onClick={() => setShowQRPopup(false)}>
              ✔ DONE
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default MetroHubPage;
