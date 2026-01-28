import React from "react";
import "./InquiryDetailsModal.css";

interface Inquiry {
  id: string;
  customerName: string;
  propertyDetails: string;
  phone: string;
  email: string;
  address: string;
  price: string;
  rating: number;
  inquiryType: "BUY" | "RENT";
  date: string;
  image: string;
}

interface Props {
  inquiry: Inquiry | null;
  onClose: () => void;
}

const InquiryDetailsModal: React.FC<Props> = ({ inquiry, onClose }) => {
  if (!inquiry) return null;

  return (
    <div className="idm-overlay" onClick={onClose}>
      <div className="idm-modal" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="idm-header">
          <h2>Inquiry Details</h2>
          <button className="idm-close" onClick={onClose}>×</button>
        </div>

        {/* BODY */}
        <div className="idm-body">

          {/* IMAGE / PROPERTY CARD (TOP) */}
          <div className="idm-property-card">
            <div className="idm-image-wrapper">
              <img src={inquiry.image} alt="Property" />

              <div className="idm-image-badges">
                <span className="buy">{inquiry.inquiryType}</span>
                <span className="new">NEW</span>
              </div>
            </div>

            <div className="idm-property-content">
              <h3>{inquiry.propertyDetails}</h3>

              <div className="idm-price-row">
                <span className="price">{inquiry.price}</span>
                <span className="rating">⭐ {inquiry.rating}</span>
              </div>
            </div>
          </div>

          {/* DETAILS GRID (BOTTOM) */}
          <div className="idm-grid-2">
            {/* CUSTOMER + DELIVERY */}
            <div className="idm-card">
              <div className="idm-customer-header">
                <div className="idm-avatar">
                  {inquiry.customerName.charAt(0)}
                </div>
                <div>
                  <h3>{inquiry.customerName}</h3>
                  <span className="idm-subtext">Potential Buyer</span>
                </div>
              </div>

              <p>📞 {inquiry.phone}</p>
              <p>✉️ {inquiry.email}</p>

              <div className="idm-address">
                <label>DELIVERY ADDRESS</label>
                <p>{inquiry.address}</p>
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="idm-card">
              <h4>Recent Activity</h4>

              <div className="idm-timeline-item active">
  <span className="dot" />
  <div className="idm-timeline-text">
    <strong>Inquiry Received</strong>
    <div className="idm-timeline-date">Today, 10:30 AM</div>
  </div>
</div>

<div className="idm-timeline-item">
  <span className="dot" />
  <div className="idm-timeline-text">
    <strong>Assigned to Partner</strong>
    <div className="idm-timeline-date">Today, 10:35 AM</div>
  </div>
</div>

            </div>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="idm-actions">
          <button className="idm-secondary">Message</button>
          <button className="idm-primary">Call Customer</button>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetailsModal;
