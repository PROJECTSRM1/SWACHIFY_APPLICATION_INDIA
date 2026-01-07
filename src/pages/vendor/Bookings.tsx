import { useMemo, useState } from "react";
import { Button, Tag, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";


type Booking = {
  id: string;
  customer: string;
  car: string;
  driver: string;
  start: string;
  end: string;
  status: "Active" | "Completed" | "Cancelled" | "Pending";
  amount: string;
  paymentStatus?: "Paid" | "Refunded" | "Pending";
};

const SAMPLE_BOOKINGS: Booking[] = [
  { id: "BK001234", customer: "Rahul Sharma", car: "Toyota Fortuner", driver: "Amit Singh", start: "Dec 12, 2025 - 10:00 AM", end: "Dec 15, 2025 - 10:00 AM", status: "Active", amount: "₹12450", paymentStatus: "Paid" },
  { id: "BK001235", customer: "Priya Patel", car: "Honda City", driver: "Self Drive", start: "Dec 13, 2025 - 2:00 PM", end: "Dec 15, 2025 - 2:00 PM", status: "Active", amount: "₹7800", paymentStatus: "Paid" },
  { id: "BK001230", customer: "Amit Singh", car: "Maruti Swift", driver: "Self Drive", start: "Nov 15, 2025 - 9:00 AM", end: "Nov 17, 2025 - 9:00 AM", status: "Completed", amount: "₹5400", paymentStatus: "Paid" },
  { id: "BK001228", customer: "Sneha Reddy", car: "Hyundai Creta", driver: "Raj Kumar", start: "Oct 8, 2025 - 10:00 AM", end: "Oct 10, 2025 - 10:00 AM", status: "Completed", amount: "₹8400", paymentStatus: "Paid" },
  { id: "BK001225", customer: "Vikram Kumar", car: "Mercedes E-Class", driver: "Mohan Kumar", start: "Oct 1, 2025 - 8:00 AM", end: "Oct 3, 2025 - 8:00 AM", status: "Cancelled", amount: "₹19500", paymentStatus: "Refunded" },
  { id: "BK001220", customer: "Deepak Shah", car: "Luxury Caravan", driver: "Suresh Patel", start: "Sep 20, 2025 - 6:00 AM", end: "Sep 24, 2025 - 6:00 PM", status: "Completed", amount: "₹34000", paymentStatus: "Paid" },
];

const ALL_FILTERS = ["All", "Active", "Completed", "Cancelled"];

export default function BookingsPage() {
  const [filter, setFilter] = useState<string>("All");

  const counts = useMemo(() => {
    const total = SAMPLE_BOOKINGS.length;
    const active = SAMPLE_BOOKINGS.filter((b) => b.status === "Active").length;
    const completed = SAMPLE_BOOKINGS.filter((b) => b.status === "Completed").length;
    const cancelled = SAMPLE_BOOKINGS.filter((b) => b.status === "Cancelled").length;
    return { total, active, completed, cancelled };
  }, []);

  const visible = useMemo(() => {
    if (filter === "All") return SAMPLE_BOOKINGS;
    return SAMPLE_BOOKINGS.filter((b) => b.status === filter);
  }, [filter]);

  const statusTag = (s: Booking["status"]) => {
    if (s === "Active") return <Tag color="blue">Active</Tag>;
    if (s === "Completed") return <Tag color="success">Completed</Tag>;
    if (s === "Cancelled") return <Tag color="error">Cancelled</Tag>;
    return <Tag>{s}</Tag>;
  };

  return (
    <div className="sw-vd-bookings-page">
      <div className="sw-vd-page-header">
        <div>
          <h1 className="sw-vd-title">Bookings</h1>
          <p className="sw-vd-sub">View and manage all bookings</p>
        </div>
      </div>

      <div className="sw-vd-stats-grid small bookings-stats">
        <div className="sw-vd-stat-card sw-vd-stat-card-lite">
          <div><div className="sw-vd-stat-number">{counts.total}</div><div className="sw-vd-stat-label">Total Bookings</div></div>
        </div>

        <div className="sw-vd-stat-card sw-vd-stat-card-lite sw-vd-stat-card-ontrip">
          <div><div className="sw-vd-stat-number">{counts.active}</div><div className="sw-vd-stat-label">Active</div></div>
        </div>

        <div className="sw-vd-stat-card sw-vd-stat-card-lite sw-vd-stat-card-available">
          <div><div className="sw-vd-stat-number">{counts.completed}</div><div className="sw-vd-stat-label">Completed</div></div>
        </div>

        <div className="sw-vd-stat-card sw-vd-stat-card-lite sw-vd-stat-card-maint">
          <div><div className="sw-vd-stat-number">{counts.cancelled}</div><div className="sw-vd-stat-label">Cancelled</div></div>
        </div>
      </div>

      {/* simple filter tabs */}
      <div className="sw-vd-booking-tabs" role="tablist" aria-label="booking filters">
        {ALL_FILTERS.map((f) => (
          <button
            key={f}
            className={`sw-vd-booking-tab ${filter === f ? "sw-vd-active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f} {f !== "All" && f === "Active" ? `(${counts.active})` : f === "Completed" ? `(${counts.completed})` : f === "Cancelled" ? `(${counts.cancelled})` : `(${counts.total})`}
          </button>
        ))}
      </div>

      <div className="sw-vd-fleet-table-wrap sw-vd-bookings-table-wrap">
        <table className="sw-vd-fleet-table sw-vd-bookings-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Car</th>
              <th>Driver</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {visible.map((b) => (
              <tr key={b.id}>
                <td><div className="sw-vd-bid">{b.id}</div></td>
                <td>{b.customer}</td>
                <td>{b.car}</td>
                <td>{b.driver}</td>
                <td>{b.start}</td>
                <td>{b.end}</td>
                <td>{statusTag(b.status)}</td>
                <td className="sw-vd-amount">
                  <div className="sw-vd-amount-value">{b.amount}</div>
                  <div className="sw-vd-amount-sub">{b.paymentStatus ?? ""}</div>
                </td>
                <td className="sw-vd-actions">
                  <Tooltip title="View">
                    <Button shape="circle" icon={<EyeOutlined />} />
                  </Tooltip>
                </td>
              </tr>
            ))}

            {visible.length === 0 && (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: 24 }}>No bookings</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
