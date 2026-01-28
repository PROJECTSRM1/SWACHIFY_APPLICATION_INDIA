import React, {useState} from "react";
import { useNavigate} from "react-router-dom";
import "./PartnerDashboard.css";
import InquiryDetailsModal from "../../../pages/dashboard/buy&sale/InquiryDetailsModal";

interface Inquiry {
  id: string;
  customerName: string;
  propertyDetails: string;
  inquiryType: "BUY" | "RENT";
  date: string;
  status: "New" | "In Progress" | "Closed";
}


const PartnerDashboard: React.FC = () => {
  const navigate = useNavigate();
const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const inquiries: Inquiry[] = [
    {
      id: "1",
      customerName: "Rahul Sharma",
      propertyDetails: "3 BHK Apartment, Gachibowli",
      inquiryType: "BUY",
      date: "24 Jan 2026",
      status: "New",
    },
    {
      id: "2",
      customerName: "Ananya Reddy",
      propertyDetails: "Honda City 2022, V Variant",
      inquiryType: "BUY",
      date: "23 Jan 2026",
      status: "In Progress",
    },
    {
      id: "3",
      customerName: "Kiran Kumar",
      propertyDetails: "Villa, Kokapet",
      inquiryType: "RENT",
      date: "21 Jan 2026",
      status: "Closed",
    },
  ];

  return (
    <div className="pdw-page">
      {/* Header */}
     <header className="pdw-topbar">
  <div>
    <h1 className="pdw-title">Partner Dashboard</h1>
    <p className="pdw-subtitle">Buy / Sell / Rent – Overview</p>
  </div>

  <div className="pdw-header-actions">
    <button className="pdw-primary-btn">Add Listing</button>
    <button className="pdw-filter-btn">Filter</button>

  </div>
</header>


     <section className="pdw-kpi-grid">
  <div className="pdw-kpi-card pdw-kpi-blue">
    <h2>128</h2>
    <span>Total Inquiries</span>
  </div>

  <div className="pdw-kpi-card pdw-kpi-green">
    <h2>14</h2>
    <span>Pending Follow-ups</span>
  </div>

  <div className="pdw-kpi-card pdw-kpi-purple">
    <h2>42</h2>
    <span>Active Listings</span>
  </div>

  <div className="pdw-kpi-card pdw-kpi-orange">
    <h2>9</h2>
    <span>Closed Deals</span>
  </div>
</section>


      {/* Table */}
      <section className="pdw-table-section">
        <h2 className="pdw-section-title">Recent Inquiries</h2>

        <table className="pdw-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Property</th>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {inquiries.map((item) => (
             <tr key={item.id} className="pdw-row">

                <td className="pdw-strong">
  <span
    className="pdw-customer-link"
onClick={() =>
  setSelectedInquiry({
    ...item,
    phone: "9876543210",
    email: "customer@example.com",
    address: "Gachibowli, Hyderabad",
    price: "₹1.2 Cr",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  })
}

  >
    {item.customerName}
  </span>
</td>

                <td>{item.propertyDetails}</td>
                <td>
                  <span
                    className={`pdw-tag ${
                      item.inquiryType === "BUY"
                        ? "pdw-tag-buy"
                        : "pdw-tag-rent"
                    }`}
                  >
                    {item.inquiryType}
                  </span>
                </td>
                <td>{item.date}</td>
                <td>
                  <span
                    className={`pdw-status pdw-status-${item.status
                      .replace(" ", "")
                      .toLowerCase()}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {selectedInquiry && (
  <InquiryDetailsModal
    inquiry={selectedInquiry}
    onClose={() => setSelectedInquiry(null)}
  />
)}

    </div>
  );
};

export default PartnerDashboard;
