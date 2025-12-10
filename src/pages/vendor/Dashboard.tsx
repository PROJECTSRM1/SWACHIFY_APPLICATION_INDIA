// src/pages/vendor/VendorDashboard.tsx
import React, { useMemo, useState } from "react";
import { Button, Tag } from "antd";
import {
  CarOutlined,
  LineChartOutlined,
  UserOutlined as AntUserOutlined,
  ClockCircleOutlined as AntClockOutlined,
} from "@ant-design/icons";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type RangeKey = "month" | "year";

/* KPI card */
const StatCard: React.FC<{
  colorClass: string;
  icon: React.ReactNode;
  number: string | number;
  label: string;
  trend?: string;
  trendType?: "up" | "down" | "neutral";
}> = ({ colorClass, icon, number, label, trend, trendType = "neutral" }) => (
  <div className="sw-vd-stat-card">
    <div className={`sw-vd-stat-icon ${colorClass}`}>{icon}</div>
    <div className="sw-vd-stat-body">
      <div className="sw-vd-stat-number">{number}</div>
      <div className="sw-vd-stat-label">{label}</div>
      {trend !== undefined && (
        <div
          className={`sw-vd-stat-trend ${
            trendType === "up" ? "sw-vd-trend-up" : trendType === "down" ? "sw-vd-trend-down" : "sw-vd-trend-neutral"
          }`}
        >
          {trendType === "up" ? "▲" : trendType === "down" ? "▼" : ""}
          <span className="sw-vd-trend-text">{trend}</span>
        </div>
      )}
    </div>
  </div>
);

/* booking item small preview */
const BookingItem: React.FC<{
  name: string;
  type: string;
  date: string;
  place: string;
  days: string;
  price: string;
}> = ({ name, type, date, place, days, price }) => (
  <div className="sw-vd-booking-item">
    <div className="sw-vd-booking-top">
      <div className="sw-vd-booking-meta">
        <div className="sw-vd-booking-name">{name}</div>
        <div className="sw-vd-booking-type">{type}</div>
        <div className="sw-vd-booking-when">
          <span>📅 {date}</span>
          <span>📍 {place}</span>
        </div>
      </div>

      <div className="sw-vd-booking-status">
        <Tag className="sw-vd-pending">Pending</Tag>
      </div>
    </div>

    <div className="sw-vd-booking-actions">
      <Button className="sw-vd-btn-accept" type="primary">
        Accept
      </Button>
      <Button className="sw-vd-btn-reject">Reject</Button>

      <div className="sw-vd-booking-price">
        <div className="sw-vd-booking-days">{days}</div>
        <div className="sw-vd-booking-amount">{price}</div>
      </div>
    </div>
  </div>
);

/* ---------- Recharts subcomponents ---------- */

const RevenueChart: React.FC<{ labels: string[]; values: number[] }> = ({ labels, values }) => {
  const data = labels.map((lab, i) => ({ name: lab, value: values[i] ?? 0 }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 6 }}>
        <CartesianGrid strokeDasharray="4 6" stroke="rgba(0,0,0,0.04)" />
        <XAxis dataKey="name" axisLine={false} tick={{ fill: "#666", fontSize: 12 }} />
        <YAxis
          axisLine={false}
          tickFormatter={(v: number) => (typeof v === "number" ? `₹${(v / 1000).toFixed(0)}k` : `${v}`)}
          tick={{ fill: "#666", fontSize: 12 }}
        />
        <ReTooltip
          contentStyle={{ background: "#111827", borderRadius: 8, border: "none" }}
          labelStyle={{ color: "#fff" }}
          formatter={(value: any) => `₹${Number(value).toLocaleString()}`}
        />
        <Area type="monotone" dataKey="value" fill="rgba(239,68,68,0.06)" stroke="transparent" />
        <Line
          type="monotone"
          dataKey="value"
          // stroke="#ef4444"
          stroke = "#4F9CF9"
          strokeWidth={2}
          dot={{ r: 5, stroke: "#6EE7F0", strokeWidth: 2, fill: "#fff" }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

/* ---------- UPDATED: FULL PIE (NOT DONUT) ---------- */
const FleetPie: React.FC<{ out: number; inNum: number }> = ({ out, inNum }) => {
  const data = [
    { name: "Cars Out", value: out },
    { name: "Cars In", value: inNum },
  ];
  // const COLORS = ["#ef4444", "#10b981"];
  const COLORS = ["#4F9CF9", "#6EE7F0"]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={0}    // <-- full pie (no inner hole)
          outerRadius={92}
          paddingAngle={6}
          startAngle={90}
          endAngle={-270}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <ReTooltip formatter={(value: number, name: string) => [`${value}`, name]} />
      </PieChart>
    </ResponsiveContainer>
  );
};

/* ---------- Main Dashboard ---------- */

const VendorDashboard: React.FC = () => {
  const [range, setRange] = useState<RangeKey>("month");

  const datasets = useMemo(
    () => ({
      month: {
        revenue: { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], values: [88000, 92000, 76000, 93000, 104000, 120000] },
        fleet: { values: [18, 6] },
      },
      year: {
        revenue: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          values: [76000, 82000, 90000, 87000, 110000, 125000, 98000, 101000, 112000, 118000, 126000, 139000],
        },
        fleet: { values: [26, 10] },
      },
    }),
    []
  );

  return (
    <div className="sw-vd-page">
      <div className="sw-vd-page-header">
        <h1 className="sw-vd-title">Vendor Dashboard</h1>
        <p className="sw-vd-sub">Welcome back! Here's what's happening with your fleet today.</p>
      </div>

      <div className="sw-vd-stats-grid">
        <StatCard colorClass="sw-vd-icon-blue" icon={<CarOutlined className="sw-vd-kpi-svg" />} number={24} label="Total Cars" trend="+2" trendType="up" />
        <StatCard colorClass="sw-vd-icon-red" icon={<LineChartOutlined className="sw-vd-kpi-svg" />} number={18} label="Cars Out" trend="+3" trendType="up" />
        <StatCard colorClass="sw-vd-icon-green" icon={<CarOutlined className="sw-vd-kpi-svg" />} number={6} label="Cars In" trend="-3" trendType="down" />
        <StatCard colorClass="sw-vd-icon-purple" icon={<AntUserOutlined className="sw-vd-kpi-svg" />} number={15} label="Total Drivers" trend="+1" trendType="up" />
        <StatCard colorClass="sw-vd-icon-orange" icon={<AntClockOutlined className="sw-vd-kpi-svg" />} number={8} label="Today's Bookings" trend="+2" trendType="up" />
        <StatCard colorClass="sw-vd-icon-yellow" icon={<AntClockOutlined className="sw-vd-kpi-svg" />} number={5} label="Pending Requests" trend="0" trendType="neutral" />
      </div>

      <div className="sw-vd-cards-row">
        <div className="sw-vd-card sw-vd-card-revenue">
          <div className="sw-vd-card-head">
            <div>
              <div className="sw-vd-card-title">Revenue Trend</div>
              <div className="sw-vd-card-sub">Monthly view</div>
            </div>

            <div className="sw-vd-range-pills">
              <button className={`sw-vd-pill ${range === "month" ? "sw-vd-active" : ""}`} onClick={() => setRange("month")}>Month</button>
              <button className={`sw-vd-pill ${range === "year" ? "sw-vd-active" : ""}`} onClick={() => setRange("year")}>Year</button>
            </div>
          </div>

          <div className="sw-vd-chart-wrapper" style={{ minHeight: 260 }}>
            <RevenueChart labels={datasets[range].revenue.labels} values={datasets[range].revenue.values} />
          </div>
        </div>

        <div className="sw-vd-card sw-vd-card-pie">
          <div className="sw-vd-card-head">
            <div>
              <div className="sw-vd-card-title">Fleet Utilization</div>
              <div className="sw-vd-card-sub">Cars Out vs Cars In</div>
            </div>
          </div>

          <div className="sw-vd-pie-area">
            <div className="sw-vd-pie-chart" style={{ height: 200, width: "100%", maxWidth: 320 }}>
              <FleetPie out={datasets[range].fleet.values[0]} inNum={datasets[range].fleet.values[1]} />
            </div>

            <div className="sw-vd-pie-legend">
              <div className="sw-vd-legend-row">
                <span className="sw-vd-legend-dot sw-vd-out" />
                <div>
                  <div className="sw-vd-legend-label">Cars Out</div>
                  <div className="sw-vd-legend-value">{datasets[range].fleet.values[0]}</div>
                </div>
              </div>

              <div className="sw-vd-legend-row">
                <span className="sw-vd-legend-dot sw-vd-in" />
                <div>
                  <div className="sw-vd-legend-label">Cars In</div>
                  <div className="sw-vd-legend-value">{datasets[range].fleet.values[1]}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sw-vd-cards-row lower">
        <div className="sw-vd-card sw-vd-card-requests">
          <div className="sw-vd-card-head">
            <div>
              <div className="sw-vd-card-title">Incoming Booking Requests</div>
              <div className="sw-vd-card-sub">Recent booking requests</div>
            </div>
            <a className="sw-vd-view-all">View All</a>
          </div>

          <div className="sw-vd-requests-list">
            <BookingItem name="Rahul Sharma" type="Self Drive • SUV" date="Dec 12, 10:00 AM" place="Downtown Center" days="3 days" price="₹12,450" />
            <BookingItem name="Priya Patel" type="With Driver • Sedan" date="Dec 13, 2:00 PM" place="Airport Terminal" days="2 days" price="₹7,800" />
            <BookingItem name="Amit Singh" type="Marriage Rental • Luxury" date="Dec 15, 9:00 AM" place="City Mall" days="1 day" price="₹15,000" />
          </div>
        </div>

        <div className="sw-vd-card sw-vd-card-snapshot">
          <div className="sw-vd-card-head">
            <div>
              <div className="sw-vd-card-title">Operational Snapshot</div>
              <div className="sw-vd-card-sub">Key metrics</div>
            </div>
          </div>

          <div className="sw-vd-snapshot-list">
            <div className="sw-vd-snapshot-row"><div className="sw-vd-snapshot-bar" /> <div className="sw-vd-snapshot-meta"><div className="sw-vd-snapshot-label">Avg Trip Duration</div><div className="sw-vd-snapshot-value">2.5 days</div></div></div>
            <div className="sw-vd-snapshot-row"><div className="sw-vd-snapshot-bar" /> <div className="sw-vd-snapshot-meta"><div className="sw-vd-snapshot-label">On-Time Delivery</div><div className="sw-vd-snapshot-value">95%</div></div></div>
            <div className="sw-vd-snapshot-row"><div className="sw-vd-snapshot-bar" /> <div className="sw-vd-snapshot-meta"><div className="sw-vd-snapshot-label">Pending Payments</div><div className="sw-vd-snapshot-value">₹28,500</div></div></div>
            <div className="sw-vd-snapshot-row"><div className="sw-vd-snapshot-bar" /> <div className="sw-vd-snapshot-meta"><div className="sw-vd-snapshot-label">Today's Revenue</div><div className="sw-vd-snapshot-value">₹45,200</div></div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
