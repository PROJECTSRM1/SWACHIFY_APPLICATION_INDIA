import { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import "./AdminDashboard.css";
import { DatePicker } from "antd";
// import type { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import { Dropdown, Button } from "antd";
import type { MenuProps } from "antd";

import { DownOutlined } from "@ant-design/icons";


const { RangePicker } = DatePicker;



/* ================= TYPES ================= */

type Menu =
  | "dashboard"
  | "users"
  | "freelancers"
  | "services"
  | "settings";

type MetricType = "users" | "freelancers";

/* ================= ROOT ================= */

export default function AdminDashboard() {
  const [active, setActive] = useState<Menu>("dashboard");
  const [open, setOpen] = useState(false);
const [profileOpen, setProfileOpen] = useState(false);
const profileRef = useRef<HTMLDivElement | null>(null);
useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(e.target as Node)
    ) {
      setProfileOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

const handleLogout = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/";
};

  return (
    <div className="ad-root">
      <div className="ad-layout">
        {/* SIDEBAR */}
        <aside className={`ad-sidebar ${open ? "open" : ""}`}>
          <div className="ad-sidebar-header">
            <div className="ad-logo" />
            <div>
              <h3>Admin Panel</h3>
              <span>SUPER ADMIN</span>
            </div>
          </div>

          <nav className="ad-menu">
            {["dashboard", "users", "freelancers", "services"].map((item) => (
              <button
                key={item}
                className={active === item ? "active" : ""}
                onClick={() => {
                  setActive(item as Menu);
                  setOpen(false);
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </nav>

          <div className="ad-sidebar-footer">
            <button
              className={active === "settings" ? "active" : ""}
              onClick={() => setActive("settings")}
            >
              Settings
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <div className="ad-main">
       <header className="ad-topbar">
  <div className="ad-left">
    <div className="ad-hamburger" onClick={() => setOpen(!open)}>
      {open ? "✖" : "☰"}
    </div>
    <h2>
      {active === "freelancers"
        ? "Freelancer Analytics"
        : "Admin Dashboard"}
    </h2>
  </div>

  {/* PROFILE */}
 <div className="ad-profile" ref={profileRef}>

    <div
      className="ad-avatar"
      onClick={() => setProfileOpen(!profileOpen)}
    >
      👤
    </div>

    {profileOpen && (
      <div className="ad-profile-menu">
        <button onClick={handleLogout}>Logout</button>
      </div>
    )}
  </div>
</header>


          <main className="ad-content">
            {active === "dashboard" && <DashboardView />}
            {active === "freelancers" && <FreelancerView />}

            {active !== "dashboard" && active !== "freelancers" && (
              <div className="placeholder">
                <h3>{active.toUpperCase()}</h3>
                <p>Content will be shown here</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

/* ================= DASHBOARD ================= */

function DashboardView() {

  const [metricInput, setMetricInput] =
    useState<MetricType>("users");

const [singleDate, setSingleDate] = useState<[Dayjs | null, Dayjs | null]>([
  dayjs("2025-01-01"),
  dayjs("2025-01-31"),
]);

const [quickLabel, setQuickLabel] = useState("Quick Select");

const applyQuickRange = (key: string) => {
  let start: Dayjs;
  let end: Dayjs;
  let label = "Quick Select";

  switch (key) {
    case "today":
      start = dayjs();
      end = dayjs();
      label = "Today";
      break;

    case "yesterday":
      start = dayjs().subtract(1, "day");
      end = dayjs().subtract(1, "day");
      label = "Yesterday";
      break;

    case "week":
      start = dayjs().subtract(6, "day");
      end = dayjs();
      label = "Last 1 Week";
      break;

    case "month":
      start = dayjs().subtract(1, "month");
      end = dayjs();
      label = "Last 1 Month";
      break;

    case "3months":
      start = dayjs().subtract(3, "month");
      end = dayjs();
      label = "Last 3 Months";
      break;

    default:
      return;
  }

  const from = start.format("YYYY-MM-DD");
  const to = end.format("YYYY-MM-DD");

  setSingleDate([start, end]);
  setFromMonth(from);
  setToMonth(to);
  setQuickLabel(label);
};




const quickMenu: MenuProps["items"] = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "week", label: "Last 1 Week" },
  { key: "month", label: "Last 1 Month" },
  { key: "3months", label: "Last 3 Months" },
];


  /* APPLIED STATE */
  const [metric, setMetric] = useState<MetricType>("users");
 const [fromMonth, setFromMonth] = useState("2025-01-01");
const [toMonth, setToMonth] = useState("2025-01-31");


  /* DATA */
  const [chartData, setChartData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [topCategory, setTopCategory] = useState("");
  const [activeToday, setActiveToday] = useState(0);
  const [verification, setVerification] = useState(0);
  

  useEffect(() => {
    calculate();
  }, [metric, fromMonth, toMonth]);
  


  const calculate = () => {
  
  const base =
    metric === "users"
      ? {
          Housing: 1200,
          Education: 900,
          Products: 1800,
          Healthcare: 1500,
        }
      : {
          Housing: 600,
          Education: 480,
          Products: 1100,
          Healthcare: 900,
        };

  const from = dayjs(fromMonth);
  const to = dayjs(toMonth);

  const days = Math.max(to.diff(from, "day") + 1, 1);

  
  const DAILY_DIVISOR = 30;

  const data = Object.entries(base).map(([name, monthlyValue]) => {
    const dailyAvg = monthlyValue / DAILY_DIVISOR;

    
    const noise = Math.random() * 0.15 + 0.9; 

    return {
      name,
      value: Math.round(dailyAvg * days * noise),
    };
  });

  setChartData(data);

  const sum = data.reduce((s, d) => s + d.value, 0);
  const top = data.reduce((a, b) => (a.value > b.value ? a : b));

  setTotal(sum);
  setTopCategory(top.name);

  
  setActiveToday(Math.round(sum / days));

  setVerification(metric === "users" ? 98.2 : 94.5);
};


  return (
    <>
      {/* FILTERS */}
      <div className="ad-filters">
        <div className="ad-filter-item">
          <label>Metrics Category</label>
          <select
  className="ad-select"
  value={metricInput}
  onChange={(e) => {
    const value = e.target.value as MetricType;
    setMetricInput(value);
    setMetric(value); 
  }}
>

            <option value="users">Users</option>
            <option value="freelancers">Freelancers</option>
          </select>
        </div>

        

<div className="ad-filter-item">
  <label>Date Range</label>

  <div style={{ display: "flex", gap: 10 }}>
    {/* DATE PICKER */}
 <RangePicker
  value={singleDate}
  format="YYYY-MM-DD"
  allowClear={false}
onChange={(dates) => {
  if (!dates) return;

  const [start, end] = dates;
  if (!start || !end) return;

  setSingleDate([start, end]);

  setFromMonth(start.format("YYYY-MM-DD"));
  setToMonth(end.format("YYYY-MM-DD"));

  setQuickLabel("Custom Range");
}}

  style={{ height: 42, borderRadius: 10 }}
/>



   
    <Dropdown
      menu={{
        items: quickMenu,
        onClick: ({ key }) => applyQuickRange(key),
      }}
    >
      <Button
  style={{ height: 42, borderRadius: 10 }}
>
  {quickLabel} <DownOutlined />
</Button>

    </Dropdown>
  </div>
</div>






      
      </div>

      {/* CHART */}
      <div className="ad-card">
        <h3>
          {metric === "users"
            ? "User Registrations by Category"
            : "Freelancer Registrations by Category"}
        </h3>

        <div className="ad-chart">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="value" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card-footer">
          <span className="green">Avg Growth +12.5%</span>
          <span className="pill">
            Total {metric}: {total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* KPIs */}
      <div className="ad-kpis">
        <KPI title="Top Category" value={topCategory} />
        <KPI
          title="Active Today"
          value={activeToday.toLocaleString()}
        />
        <KPI title="Verification Rate" value={`${verification}%`} />
      </div>
    </>
  );
}

/* ================= FREELANCERS ================= */

function FreelancerView() {
    const [singleDate, setSingleDate] = useState<[Dayjs | null, Dayjs | null]>([
  dayjs().subtract(6, "day"),
  dayjs(),
]);

const [fromDate, setFromDate] = useState(
  dayjs().subtract(6, "day").format("YYYY-MM-DD")
);
const [toDate, setToDate] = useState(
  dayjs().format("YYYY-MM-DD")
);

const [quickLabel, setQuickLabel] = useState("Last 1 Week");
const applyQuickRange = (key: string) => {
  let start: Dayjs;
  let end: Dayjs;
  let label = "Quick Select";

  switch (key) {
    case "today":
      start = dayjs();
      end = dayjs();
      label = "Today";
      break;

    case "yesterday":
      start = dayjs().subtract(1, "day");
      end = dayjs().subtract(1, "day");
      label = "Yesterday";
      break;

    case "week":
      start = dayjs().subtract(6, "day");
      end = dayjs();
      label = "Last 1 Week";
      break;

    case "month":
      start = dayjs().subtract(1, "month");
      end = dayjs();
      label = "Last 1 Month";
      break;

    case "3months":
      start = dayjs().subtract(3, "month");
      end = dayjs();
      label = "Last 3 Months";
      break;

    default:
      return;
  }

  setSingleDate([start, end]);
  setFromDate(start.format("YYYY-MM-DD"));
  setToDate(end.format("YYYY-MM-DD"));
  setQuickLabel(label);
};
const quickMenu: MenuProps["items"] = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "week", label: "Last 1 Week" },
  { key: "month", label: "Last 1 Month" },
  { key: "3months", label: "Last 3 Months" },
];



  const [kpis, setKpis] = useState({
    registrations: 2842,
    verified: 1905,
    pending: 428,
    active: "88.5%",
  });

  const [chartData, setChartData] = useState<any[]>([]);


useEffect(() => {
  calculate();
}, [fromDate, toDate]);


const calculate = () => {
  const base = {
    "Housing/Cleaning": 1200,
    Education: 820,
    "Raw Materials": 540,
    Swachify: 980,
    "Buy/Sell/Rent": 720,
    Healthcare: 1350,
    Justride: 460,
  };

  const from = dayjs(fromDate);
  const to = dayjs(toDate);
  const days = Math.max(to.diff(from, "day") + 1, 1);

  const DAILY_DIVISOR = 30;

  const data = Object.entries(base).map(([name, monthly]) => {
    const dailyAvg = monthly / DAILY_DIVISOR;
    return {
      name,
      value: Math.round(dailyAvg * days),
    };
  });

  setChartData(data);

  const total = data.reduce((s, d) => s + d.value, 0);

const verified = Math.round(total * 0.65);
const pending = Math.round(total * 0.15);

// activity scales with date range
const activityFactor = Math.min(1, 30 / days); // 1 for <=30 days, lower after
const activePercent = Math.round((verified / total) * activityFactor * 100);

setKpis({
  registrations: total,
  verified,
  pending,
  active: `${activePercent}%`,
});


};


  return (
    <>
      {/* PAGE HEADER */}
      <h1 className="ad-page-title">Workforce Overview</h1>
      <p className="ad-page-desc">
        Monitoring registration trends across all service categories for
        freelancers and employees.
      </p>

    
      <div className="ad-filters">
  <div className="ad-filter-item">
    <label>Date Range</label>

    <div style={{ display: "flex", gap: 10 }}>
      <RangePicker
        value={singleDate}
        format="YYYY-MM-DD"
        allowClear={false}
        onChange={(dates) => {
          if (!dates) return;

          const [start, end] = dates;
          if (!start || !end) return;

          setSingleDate([start, end]);
          setFromDate(start.format("YYYY-MM-DD"));
          setToDate(end.format("YYYY-MM-DD"));
          setQuickLabel("Custom Range");
        }}
        style={{ height: 42, borderRadius: 10 }}
      />

      <Dropdown
        menu={{
          items: quickMenu,
          onClick: ({ key }) => applyQuickRange(key),
        }}
      >
        <Button style={{ height: 42, borderRadius: 10 }}>
          {quickLabel} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  </div>
</div>


      {/* KPI CARDS – ONE ROW */}
      <div className="freelancer-kpis">
        <KPI title="New Registrations" value={kpis.registrations.toLocaleString()} />
        <KPI title="Verified Profiles" value={kpis.verified.toLocaleString()} />
        <KPI title="Pending Approvals" value={kpis.pending.toLocaleString()} />
        <KPI title="Active Status" value={kpis.active} />
      </div>

      {/* BAR CHART */}
      <div className="ad-card">
        <h3>Registration by Category</h3>
        <p className="ad-muted">
          Workforce distribution across key service verticals
        </p>

        <div className="ad-chart">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLE */}
      <div className="ad-card">
        <h3>Recent Freelancer Registrations</h3>

        <table className="ad-table">
          <thead>
            <tr>
              <th>Freelancer</th>
              <th>Category</th>
              <th>Date Joined</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alex Rivera</td>
              <td>Healthcare</td>
              <td>Oct 24, 2023</td>
              <td><span className="status verified">Verified</span></td>
            </tr>
            <tr>
              <td>Sarah Chen</td>
              <td>Education</td>
              <td>Oct 23, 2023</td>
              <td><span className="status pending">Pending</span></td>
            </tr>
            <tr>
              <td>Marcus Thorne</td>
              <td>Housing/Cleaning</td>
              <td>Oct 22, 2023</td>
              <td><span className="status verified">Verified</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}


/* ================= SHARED ================= */

function KPI({ title, value }: { title: string; value: string }) {
  return (
    <div className="ad-kpi">
      <span className="ad-kpi-label">{title}</span>
      <div className="ad-kpi-value">{value}</div>
    </div>
  );
}