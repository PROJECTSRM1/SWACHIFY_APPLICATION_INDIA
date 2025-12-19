
import React, { useMemo, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Table,
  Tag,
  Input,
  Tooltip,
  DatePicker,
  Popover,
  message,
} from "antd";

import {
  HomeOutlined,
  ShoppingCartOutlined,
  CarOutlined,
  ThunderboltOutlined,
  AppstoreOutlined,
  BookOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ReactApexChart from "react-apexcharts";
import "./appadmin.css";

import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const scaleTo300to700 = (value: number) => {
  if (value <= 0) return 300;

  const min = 300;
  const max = 700;

  // compress large values into 300–700 range
  return Math.min(
    max,
    min + Math.round((value % 1000) * (max - min) / 1000)
  );
};

const { RangePicker } = DatePicker;

type ServiceKey =
  | "Home Service"
  | "Transport"
  | "Buy/Sale/Rentals"
  | "Raw Materials"
  | "Education";

type VatItem = { period: string; amount: number; status?: string };
type AgeItem = { label: string; amount: number };

type ServiceData = {
  sales: number;
  lastMonthSales: number;
  purchases: number;
  lastMonthPurchases: number;
  purchaseCount: number;
  salesSeries: number[];
  purchasesSeries: number[];
  debtorsSeries: number[];
  creditorsSeries: number[];
  vat: VatItem[];
  ageing: AgeItem[];
};

type BookingStatus = "Completed" | "Pending" | "Rejected";
type BookingRow = {
  key: string;
  bookingId: string;
  customerName: string;
  serviceType: ServiceKey;
  amount: number;
  date: string; // ISO yyyy-mm-dd
  status: BookingStatus;
  phone: string;
  location: string;
  assigned: string;
};

type Txn = {
  id: string;
  date: string; // ISO
  amount: number;
  type: "sale" | "purchase";
  serviceType: ServiceKey;
};

/* ---------------------- SERVICE DATA (unchanged) ---------------------- */
const SERVICE_DATA: Record<ServiceKey, ServiceData> = {
  "Home Service": {
    sales: 12000,
    lastMonthSales: 9500,
    purchases: 6000,
    lastMonthPurchases: 7200,
    purchaseCount: 14,
    salesSeries: [2000, 2200, 2500, 1500, 2000],
    purchasesSeries: [800, 900, 1200, 1000, 1100],
    debtorsSeries: [5000, 4200, 4500, 4800, 5200],
    creditorsSeries: [3000, 2800, 3300, 3100, 3500],
vat: [
  { period: "High Priority", amount: 12, status: "SLA Breached" },
  { period: "Medium Priority", amount: 34, status: "Within SLA" },
  { period: "Low Priority", amount: 58, status: "Within SLA" },
  { period: "Critical", amount: 5, status: "Immediate Action" },
],

    ageing: [
      { label: "1 - 30 Days", amount: 26527.5 },
      { label: "31 - 60 Days", amount: 24630.7 },
      { label: "61 - 90 Days", amount: 54209.9 },
      { label: "91 - 120 Days", amount: 16585.0 },
      { label: "Above 120 Days", amount: 9132135.35 },
    ],
  },

  Transport: {
    sales: 30000,
    lastMonthSales: 28000,
    purchases: 10000,
    lastMonthPurchases: 9000,
    purchaseCount: 8,
    salesSeries: [4000, 5000, 6000, 7000, 8000],
    purchasesSeries: [1000, 1200, 1500, 2000, 2500],
    debtorsSeries: [8000, 8200, 7900, 8100, 8300],
    creditorsSeries: [2000, 2200, 2400, 2600, 2800],
    vat: [
      { period: "01/03/2040 → 31/05/2040", amount: 0 },
      { period: "01/12/2039 → 29/02/2040", amount: 12000 },
      { period: "01/09/2039 → 30/11/2039", amount: 0 },
      { period: "01/06/2039 → 31/08/2039", amount: 4500 },
    ],
    ageing: [
      { label: "1 - 30 Days", amount: 15000 },
      { label: "31 - 60 Days", amount: 5600 },
      { label: "61 - 90 Days", amount: 4200 },
      { label: "91 - 120 Days", amount: 3300 },
      { label: "Above 120 Days", amount: 50000 },
    ],
  },

  "Buy/Sale/Rentals": {
    sales: 25000,
    lastMonthSales: 21000,
    purchases: 5000,
    lastMonthPurchases: 4500,
    purchaseCount: 5,
    salesSeries: [3000, 3500, 4500, 5500, 7000],
    purchasesSeries: [600, 800, 1000, 1200, 1400],
    debtorsSeries: [7000, 7200, 7300, 7400, 7600],
    creditorsSeries: [1500, 1700, 1600, 1800, 1900],
    vat: [
      { period: "01/03/2040 → 31/05/2040", amount: 0 },
      { period: "01/12/2039 → 29/02/2040", amount: 22000 },
      { period: "01/09/2039 → 30/11/2039", amount: 0 },
      { period: "01/06/2039 → 31/08/2039", amount: 12000 },
    ],
    ageing: [
      { label: "1 - 30 Days", amount: 12000 },
      { label: "31 - 60 Days", amount: 8600 },
      { label: "61 - 90 Days", amount: 4200 },
      { label: "91 - 120 Days", amount: 2600 },
      { label: "Above 120 Days", amount: 32000 },
    ],
  },

  "Raw Materials": {
    sales: 15000,
    lastMonthSales: 17000,
    purchases: 40000,
    lastMonthPurchases: 38000,
    purchaseCount: 22,
    salesSeries: [1000, 2000, 3000, 2000, 4000],
    purchasesSeries: [5000, 6000, 7000, 8000, 9000],
    debtorsSeries: [9000, 9200, 9400, 9600, 9800],
    creditorsSeries: [7000, 7200, 7400, 7600, 7800],
    vat: [
      { period: "01/03/2040 → 31/05/2040", amount: 0 },
      { period: "01/12/2039 → 29/02/2040", amount: 50000 },
      { period: "01/09/2039 → 30/11/2039", amount: 0 },
      { period: "01/06/2039 → 31/08/2039", amount: 22000 },
    ],
    ageing: [
      { label: "1 - 30 Days", amount: 20000 },
      { label: "31 - 60 Days", amount: 14630.7 },
      { label: "61 - 90 Days", amount: 30000 },
      { label: "91 - 120 Days", amount: 8000 },
      { label: "Above 120 Days", amount: 120000 },
    ],
  },

  Education: {
    sales: 8000,
    lastMonthSales: 7000,
    purchases: 3000,
    lastMonthPurchases: 2500,
    purchaseCount: 19,
    salesSeries: [1000, 900, 1200, 1500, 2400],
    purchasesSeries: [400, 300, 500, 600, 1200],
    debtorsSeries: [2000, 2200, 2100, 2300, 2400],
    creditorsSeries: [500, 600, 700, 800, 900],
    vat: [
      { period: "01/03/2040 → 31/05/2040", amount: 0 },
      { period: "01/12/2039 → 29/02/2040", amount: 3000 },
      { period: "01/09/2039 → 30/11/2039", amount: 0 },
      { period: "01/06/2039 → 31/08/2039", amount: 1200 },
    ],
    ageing: [
      { label: "1 - 30 Days", amount: 3000 },
      { label: "31 - 60 Days", amount: 2000 },
      { label: "61 - 90 Days", amount: 1000 },
      { label: "91 - 120 Days", amount: 500 },
      { label: "Above 120 Days", amount: 15000 },
    ],
  },
};

const SERVICE_KEYS = Object.keys(SERVICE_DATA) as ServiceKey[];
const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

/* ---------------------- DUMMY BOOKINGS (expanded) ---------------------- */
function generateBookings(): BookingRow[] {
  const rows: BookingRow[] = [];
  const names = [
    "Amit Sharma",
    "Priya Singh",
    "Ravi Kumar",
    "Anjali Mehta",
    "Suresh Reddy",
    "Nisha Patel",
    "Karan Verma",
    "Rohit Joshi",
    "Sonal Gupta",
    "Maya Rao",
    "Deepak Nair",
    "Varun Iyer",
    "Sneha Das",
    "Pooja Sharma",
    "Arjun Kapoor",
    "Meera Menon",
    "Vikas Jain",
    "Sakshi Agarwal",
    "Rajat Bhatt",
    "Isha Roy",
  ];
  const workers = ["Rahul", "Neha", "Sunil", "Priyanka", "Asha", "Vijay", "Sathya", "Amit"];
  const locations = ["Mumbai", "Bengaluru", "Chennai", "Delhi", "Hyderabad", "Pune", "Kolkata"];
  let counter = 101;

  const pushRows = (count: number, status: BookingStatus, dateISO?: string) => {
    for (let i = 0; i < count; i++) {
      const id = `SW-${counter++}`;
      const name = names[(counter + i) % names.length];
      const svc = SERVICE_KEYS[(counter + i) % SERVICE_KEYS.length];
      const amount = Math.round(500 + ((counter * 37) % 5000));
      // create a date spread in last 90 days if dateISO not provided
      let dateStr: string;
      if (dateISO) {
        dateStr = dateISO;
      } else {
        const daysBack = (counter * 13) % 90;
        const d = new Date();
        d.setDate(d.getDate() - daysBack);
        dateStr = d.toISOString().slice(0, 10);
      }
      rows.push({
        key: id,
        bookingId: id,
        customerName: name,
        serviceType: svc,
        amount,
        date: dateStr,
        status,
        phone: `+91-9${Math.floor(100000000 + (counter * 7) % 900000000)}`,
        location: locations[(counter + i) % locations.length],
        assigned: status === "Pending" ? "" : workers[(counter + i) % workers.length],
      });
    }
  };

  // original totals: Completed 48, Pending 14, Rejected 6
  pushRows(48, "Completed");
  pushRows(14, "Pending");
  pushRows(6, "Rejected");

  // ---- ADD EXTRA TODAY BOOKINGS (boost) ----
  const today = new Date();
  const todayISO = today.toISOString().slice(0, 10);

  // add 40 more bookings for today: ~70% completed, 20% pending, 10% rejected
  pushRows(28, "Completed", todayISO);
  pushRows(8, "Pending", todayISO);
  pushRows(4, "Rejected", todayISO);

  // sort to keep order predictable
  return rows.sort((a, b) => a.bookingId.localeCompare(b.bookingId));
}


/* ---------------------- DUMMY TRANSACTIONS (boost today heavily) ---------------------- */
function generateTxns(): Txn[] {
  const txns: Txn[] = [];
  const today = new Date();
  const todayISO = today.toISOString().slice(0, 10);

  let idCounter = 1;

  /* ---- 1) BOOST TODAY DATA HIGHLY ---- */
  // Add 45 transactions for today with varied amounts and types
  for (let i = 0; i < 45; i++) {
    const service = SERVICE_KEYS[(idCounter + i) % SERVICE_KEYS.length];
    const isSale = i % 2 === 0;
    const amount = Math.round(1200 + ((idCounter * 37 + i * 11) % 12000));

    txns.push({
      id: `TODAY-${idCounter++}`,
      date: todayISO,
      amount,
      type: isSale ? "sale" : "purchase",
      serviceType: service,
    });
  }

  /* ---- 2) NORMAL PAST 120 DAYS ---- */
  const start = new Date();
  start.setDate(start.getDate() - 120);

  for (let i = 0; i < 240; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const iso = d.toISOString().slice(0, 10);

    const events = 1 + (i % 4);

    for (let e = 0; e < events; e++) {
      const service = SERVICE_KEYS[(idCounter + e) % SERVICE_KEYS.length];
      const isSale = (idCounter + e) % 3 !== 0;
      const amount = Math.round(300 + ((idCounter * 53 + e * 23) % 7000));

      txns.push({
        id: `T-${idCounter++}`,
        date: iso,
        amount,
        type: isSale ? "sale" : "purchase",
        serviceType: service,
      });
    }
  }

  return txns;
}

const TXNS = generateTxns();
// 🔁 SERVICE → ASSIGNEE TYPE RULES
const SMALL_SERVICES: ServiceKey[] = [
  "Home Service",
  "Education",
  "Transport",
];

const BIG_SERVICES: ServiceKey[] = [
  "Raw Materials",
  "Buy/Sale/Rentals", // ✅ Vendors only
];


type Assignee = {
  id: string;
  name: string;
  pan: string;
  rating: number;
  type: "Freelancer" | "Vendor";
  phone: string;
  city: string;
  experience: string;
  jobsCompleted: number;
};

const ASSIGNEES: Assignee[] = [
  {
    id: "FR-101",
    name: "Rahul Verma",
    pan: "ABCDE1234F",
    rating: 4.8,
    type: "Freelancer",
    phone: "+91 98765 43210",
    city: "Bengaluru",
    experience: "5 Years",
    jobsCompleted: 320,
  },
  {
    id: "VN-201",
    name: "Shree Logistics Pvt Ltd",
    pan: "AAECS9988Q",
    rating: 4.7,
    type: "Vendor",
    phone: "+91 99887 66554",
    city: "Mumbai",
    experience: "10 Years",
    jobsCompleted: 1450,
  },
  {
    id: "FR-102",
    name: "Neha Sharma",
    pan: "BBDFS7766P",
    rating: 4.6,
    type: "Freelancer",
    phone: "+91 91234 56789",
    city: "Delhi",
    experience: "4 Years",
    jobsCompleted: 210,
  },
  {
    id: "VN-202",
    name: "QuickMove Services",
    pan: "CCQMS4455R",
    rating: 4.5,
    type: "Vendor",
    phone: "+91 90909 80808",
    city: "Hyderabad",
    experience: "8 Years",
    jobsCompleted: 980,
  },
  {
    id: "FR-103",
    name: "Suresh Kumar",
    pan: "DDKPS8899M",
    rating: 4.4,
    type: "Freelancer",
    phone: "+91 93456 78123",
    city: "Chennai",
    experience: "6 Years",
    jobsCompleted: 410,
  },
  {
    id: "VN-203",
    name: "SafeHands Facility Services",
    pan: "EEFAC6677L",
    rating: 4.3,
    type: "Vendor",
    phone: "+91 95555 44433",
    city: "Pune",
    experience: "12 Years",
    jobsCompleted: 2100,
  },
];

const FREELANCER_SKILLS: ServiceKey[] = [
  "Home Service",
  "Transport",
  "Buy/Sale/Rentals",
  "Raw Materials",
  "Education",
];


/* ---------------------- LandingDashboard ---------------------- */

const Appadmin: React.FC = () => {
  const [bookings, setBookings] = useState<BookingRow[]>(generateBookings());
  const [openPopup, setOpenPopup] = useState<null | "freelancer" | "vendor">(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  // 👇 PASTE HERE
  

  // rest of your code...




  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    message.success("Logged out successfully");
    navigate("/Landing");
  };






const [active, setActive] = useState<"Dashboard" | ServiceKey>("Dashboard");

  // DATE FILTER state (default: Last 7 Days)
  const [range, setRange] = useState<{ from: Date; to: Date }>(() => {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - 6);
    return { from, to };
  });

  const [showCustomPopover, setShowCustomPopover] = useState(false);
  const [customRange, setCustomRange] = useState<any>([null, null]); // holds RangePicker moments

  // NEW: which preset is active (controls highlight)
  type PresetKey = "today" | "yesterday" | "last7" | "lastMonth" | "custom";
  const [activePreset, setActivePreset] = useState<PresetKey>("last7");

  


  const aggregatedStatic = useMemo(() => {
    const sum = {
      sales: 0,
      lastMonthSales: 0,
      purchases: 0,
      lastMonthPurchases: 0,
      purchaseCount: 0,
      salesSeries: [0, 0, 0, 0, 0],
      purchasesSeries: [0, 0, 0, 0, 0],
      debtorsSeries: [0, 0, 0, 0, 0],
      creditorsSeries: [0, 0, 0, 0, 0],
      vat: [] as VatItem[],
      ageing: [] as AgeItem[],
    };

    SERVICE_KEYS.forEach((k) => {
      const s = SERVICE_DATA[k];
      sum.sales += s.sales;
      sum.lastMonthSales += s.lastMonthSales;
      sum.purchases += s.purchases;
      sum.lastMonthPurchases += s.lastMonthPurchases;
      sum.purchaseCount += s.purchaseCount;

      sum.salesSeries = sum.salesSeries.map((v, i) => v + s.salesSeries[i]);
      sum.purchasesSeries = sum.purchasesSeries.map((v, i) => v + s.purchasesSeries[i]);
      sum.debtorsSeries = sum.debtorsSeries.map((v, i) => v + s.debtorsSeries[i]);
      sum.creditorsSeries = sum.creditorsSeries.map((v, i) => v + s.creditorsSeries[i]);

      sum.vat.push(...s.vat);

      s.ageing.forEach((a) => {
        const existing = sum.ageing.find((x) => x.label === a.label);
        if (existing) existing.amount += a.amount;
        else sum.ageing.push({ ...a });
      });
    });

    return sum;
  }, []);

  const currentStatic = active === "Dashboard" ? aggregatedStatic : SERVICE_DATA[active];

  // Helpers
  const dateFromISO = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  function txnsWithin(from: Date, to: Date, service?: ServiceKey) {
    const f = new Date(from);
    f.setHours(0, 0, 0, 0);
    const t = new Date(to);
    t.setHours(23, 59, 59, 999);
    return TXNS.filter((x) => {
      const dt = dateFromISO(x.date);
      const ok = dt >= f && dt <= t;
      return ok && (service ? x.serviceType === service : true);
    });
  }

  function aggTotals(from: Date, to: Date, service?: ServiceKey) {
    const txns = txnsWithin(from, to, service);
    const sales = txns.filter((t) => t.type === "sale").reduce((s, r) => s + r.amount, 0);
    const purchases = txns.filter((t) => t.type === "purchase").reduce((s, r) => s + r.amount, 0);
    const bookingsCount = bookings.filter((b) => {
      const dt = dateFromISO(b.date);
      const f = new Date(from); f.setHours(0,0,0,0);
      const t = new Date(to); t.setHours(23,59,59,999);
      return dt >= f && dt <= t;
    }).length;
    return { sales, purchases, bookingsCount };
  }

  function seriesBuckets(from: Date, to: Date, service?: ServiceKey) {
    const f = new Date(from); f.setHours(0,0,0,0);
    const t = new Date(to); t.setHours(23,59,59,999);
    const totalMs = t.getTime() - f.getTime();
    const bucketMs = Math.max(1, Math.ceil(totalMs / 5));
    const salesBuckets = [0,0,0,0,0];
    const purchaseBuckets = [0,0,0,0,0];
    txnsWithin(from, to, service).forEach(tx => {
      const dt = dateFromISO(tx.date).getTime();
      const idx = Math.min(4, Math.floor((dt - f.getTime()) / bucketMs));
      if (tx.type === "sale") salesBuckets[idx] += tx.amount;
      else purchaseBuckets[idx] += tx.amount;
    });
    const labels = [];
    for (let i=0;i<5;i++){
      const start = new Date(f.getTime() + i*bucketMs);
      labels.push(start.toISOString().slice(5,10)); // MM-DD
    }
    return { salesBuckets, purchaseBuckets, labels };
  }

  // Preset ranges
  function setRangeToday() {
    const today = new Date();
    const from = new Date(today); from.setHours(0,0,0,0);
    const to = new Date(today); to.setHours(23,59,59,999);
    return { from, to };
  }
  function setRangeYesterday() {
    const to = new Date(); to.setDate(to.getDate() - 1);
    const from = new Date(to); from.setHours(0,0,0,0);
    to.setHours(23,59,59,999);
    return { from, to };
  }
  function setRangeLast7() {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - 6);
    return { from, to };
  }
  function setRangeLastMonth() {
    const now = new Date();
    const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayPrevMonth = new Date(firstDayThisMonth.getTime() - 1);
    const firstDayPrevMonth = new Date(lastDayPrevMonth.getFullYear(), lastDayPrevMonth.getMonth(), 1);
    return { from: firstDayPrevMonth, to: lastDayPrevMonth };
  }

  // UPDATED applyPreset: sets activePreset to keep highlight in sync
const applyPreset = (which: "today" | "yesterday" | "last7" | "lastMonth") => {
  let newRange;

  if (which === "today") newRange = setRangeToday();
  if (which === "yesterday") newRange = setRangeYesterday();
  if (which === "last7") newRange = setRangeLast7();
  if (which === "lastMonth") newRange = setRangeLastMonth();

  if (newRange) {
    // 🔥 force NEW object reference
    setRange({
      from: new Date(newRange.from),
      to: new Date(newRange.to),
    });
    setActivePreset(which);
  }

  setShowCustomPopover(false);
};


  // Bookings modal & table state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("Bookings");
  const [modalStatusFilter, setModalStatusFilter] = useState<"All"|BookingStatus>("All");
  const [searchText, setSearchText] = useState("");

  const openBookingsModal = (type: "Total"|BookingStatus) => {
    if (type === "Total") {
      setModalTitle("All Bookings");
      setModalStatusFilter("All");
    } else {
      setModalTitle(`${type} Bookings`);
      setModalStatusFilter(type);
    }
    setSearchText("");
    setModalVisible(true);
  };
  const closeBookingsModal = () => setModalVisible(false);

const columns = [
  {
    title: "Booking ID",
    dataIndex: "bookingId",
    width: 130,
    render: (t: string) => <strong>{t}</strong>,
  },
  {
    title: "Customer Name",
    dataIndex: "customerName",
    width: 180,
  },
   {
    title: "Location",          // ✅ NEW
    dataIndex: "location",      // ✅ NEW
    width: 160,
  },
  {
    title: "Service Type",
    dataIndex: "serviceType",
    width: 160,
    // history:10,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    width: 140,
    align: "right" as const,
    render: (amt: number) => (
      <span className="table-amount">{inr.format(amt)}</span>
    ),
  },
{
  title: "Payment Status",
  key: "paymentStatus",
  width: 160,
  render: (_: any, record: BookingRow) => {
    const lastDigit = Number(
      record.bookingId.replace(/\D/g, "").slice(-1)
    );

    const isPaid = lastDigit % 2 === 0;

    return (
      <Tag color={isPaid ? "green" : "red"}>
        {isPaid ? "Paid" : "Unpaid"}
      </Tag>
    );
  },
},



{
  title: "Work Status",
  key: "workStatus",
  width: 260,
  render: (_: any, record: BookingRow) => {
    // ✅ If assigned → show Assigned
    if (record.assigned && record.assigned.trim() !== "") {
      return <Tag color="blue">Assigned</Tag>;
    }

    // ✅ If not assigned → show Pending button
    if (record.status === "Pending") {
      return (
        <Button
          size="small"
          className="pending-btn"
          onClick={() => openAssign(record)}
        >
          Pending
        </Button>
      );
    }

    // fallback
    return null;
  },
},

{
  title: "Assigned To",
  dataIndex: "assigned",
  width: 220,
  render: (val: string) =>
    val && val.trim() !== ""
      ? <Tag color="blue">{val}</Tag>
      : <Tag color="orange">Not Assigned</Tag>,
},



];
const [assignOpen, setAssignOpen] = useState(false);
const [assignRecord, setAssignRecord] = useState<BookingRow | null>(null);
// ✅ Auto-shortlist assignees based on service type
const shortlistedAssignees = useMemo(() => {
  if (!assignRecord) return [];

  const service = assignRecord.serviceType;

  // Small service → Freelancers
  if (SMALL_SERVICES.includes(service)) {
    return ASSIGNEES.filter(a => a.type === "Freelancer");
  }

  // Big service → Vendors
  if (BIG_SERVICES.includes(service)) {
    return ASSIGNEES.filter(a => a.type === "Vendor");
  }

  // fallback
  return ASSIGNEES;
}, [assignRecord]);

const openAssign = (record: BookingRow) => {
  setAssignRecord(record);
  setAssignOpen(true);
};

const handleAssign = (assigneeName: string) => {
  if (!assignRecord) return;

  setBookings(prev =>
    prev.map(b =>
      b.key === assignRecord.key
        ? {
            ...b,
            assigned: assigneeName, // ✅ fill Assigned To
          }
        : b
    )
  );

  message.success(`Assigned to ${assigneeName}`);
  setAssignOpen(false);
};





  // filtered bookings (respect date range + modal status + search text)
const filteredBookings = bookings.filter(b => {
  const bDate = dateFromISO(b.date);
  const f = new Date(range.from); f.setHours(0,0,0,0);
  const t = new Date(range.to); t.setHours(23,59,59,999);

  const inRange = bDate >= f && bDate <= t;
  const statusOk =
    modalStatusFilter === "All" ? true : b.status === modalStatusFilter;

  const search = searchText.trim().toLowerCase();

  const searchOk =
    !search ||
    b.bookingId.toLowerCase().includes(search) ||
    b.customerName.toLowerCase().includes(search);

  return inRange && statusOk && searchOk;
});



  // aggregated dynamic values for range & active tab
  const aggregatedDynamic = useMemo(() => {
    const service = active === "Dashboard" ? undefined : active;
    const totals = aggTotals(range.from, range.to, service);
    const buckets = seriesBuckets(range.from, range.to, service);
    const bookingCounts = bookings.filter(b => {
      const dt = dateFromISO(b.date); const f=new Date(range.from); f.setHours(0,0,0,0); const t=new Date(range.to); t.setHours(23,59,59,999);
      return dt >= f && dt <= t && (service ? b.serviceType === service : true);
    }).length;
    return {
      sales: totals.sales,
      purchases: totals.purchases,
      bookingsCount: bookingCounts,
      salesSeries: buckets.salesBuckets,
      purchasesSeries: buckets.purchaseBuckets,
      seriesLabels: buckets.labels,
    };
  }, [range, active]);

  function computeBookingStatsFromCount(count: number) {
    const total = Math.max(0, Math.round(count));
    const completed = Math.round(total * 0.7);
    const pending = Math.round(total * 0.2);
    const rejected = total - completed - pending;
    return { total, completed, pending, rejected };
  }

  const bookingStats = computeBookingStatsFromCount(aggregatedDynamic.bookingsCount);

  const salesOptions = {
    chart: { toolbar: { show: false } },
    colors: ["#6A1B9A", "#FBC02D"],
    stroke: { width: 3, curve: "smooth" as const },
    xaxis: { categories: aggregatedDynamic.seriesLabels || ["A","B","C","D","E"] },
  };

  const debtOptions = {
    chart: { toolbar: { show: false } },
    colors: ["#6A1B9A", "#00C49F"],
    stroke: { width: 3, curve: "smooth" as const },
    xaxis: { categories: aggregatedDynamic.seriesLabels || ["A","B","C","D","E"] },
  };

  // handle RangePicker apply inside popover
  const onCustomApply = () => {
    if (!customRange || !customRange[0] || !customRange[1]) return;
    const from = (customRange[0] as any).toDate();
    const to = (customRange[1] as any).toDate();
    setRange({ from, to });
    setActivePreset("custom"); // IMPORTANT: highlight custom
    setShowCustomPopover(false);
  };

  const friendlyRange = (r:{from:Date;to:Date}) => {
    const a = r.from.toISOString().slice(0,10);
    const b = r.to.toISOString().slice(0,10);
    return `${a} → ${b}`;
  };

  const rangeLabel = friendlyRange(range);

  return (
    <div className="layout-container">
      <div className="mobile-topbar">
<div
  className={`hamburger ${sidebarOpen ? "active" : ""}`}
  onClick={() => setSidebarOpen(prev => !prev)}
>
    <span></span>
    <span></span>
    <span></span>
  </div>
  <div className="mobile-title">Swachify India</div>
</div>

      {/* SIDEBAR */}
<aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-user">Swachify India</div>

        <ul className="sidebar-menu">
<li
  className={active === "Dashboard" ? "active" : ""}
  onClick={() => {
    setActive("Dashboard");
    setSidebarOpen(false); // ✅ CLOSE
  }}
>
            <HomeOutlined />
            <span>Dashboard (All)</span>
          </li>

          {SERVICE_KEYS.map((k) => (
<li
  key={k}
  className={active === k ? "active" : ""}
  onClick={() => {
    setActive(k);
    setSidebarOpen(false); // ✅ CLOSE
  }}
>
              {k === "Home Service" && <ShoppingCartOutlined />}
              {k === "Transport" && <CarOutlined />}
              {k === "Buy/Sale/Rentals" && <ThunderboltOutlined />}
              {k === "Raw Materials" && <AppstoreOutlined />}
              {k === "Education" && <BookOutlined />}
              <span>{k}</span>
            </li>
          ))}
        </ul>
          {/* 🔥 BOTTOM LOGOUT */}
  <div className="sidebar-footer">
    <Button
      danger
      type="text"
      icon={<LogoutOutlined />}
      onClick={handleLogout}
      className="logout-btn"
    >
      Logout
    </Button>
  </div>
      </aside>
      {sidebarOpen && (
  <div
    className="sidebar-overlay"
    onClick={() => setSidebarOpen(false)}
  />
)}


      {/* RIGHT: main content + footer */}
      <div className="dashboard-right-wrapper">
        <main className="dashboard-main">
          <h2 className="page-title">Service Operations Dashboard</h2>

          {/* DATE FILTER BAR (premium) */}
          <div className="date-filter-bar sticky-date-bar">
            <div className="date-nav">

              <Button
                className={activePreset === "today" ? "df-active" : ""}
                onClick={() => applyPreset("today")}
              >
                Today
              </Button>

              <Button
                className={activePreset === "yesterday" ? "df-active" : ""}
                onClick={() => applyPreset("yesterday")}
              >
                Yesterday
              </Button>

              <Button
                className={activePreset === "last7" ? "df-active" : ""}
                onClick={() => applyPreset("last7")}
              >
                Last 7 Days
              </Button>

              <Button
                className={activePreset === "lastMonth" ? "df-active" : ""}
                onClick={() => applyPreset("lastMonth")}
              >
                Last Month
              </Button>

              <Popover
                content={
                  <div style={{ padding: 8, minWidth: 320 }}>
                    <RangePicker
                      allowClear
                      value={customRange}
                      onChange={(vals) => setCustomRange(vals)}
                      style={{ width: "100%", marginBottom: 8 }}
                    />
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                      <Button size="small" onClick={() => { setCustomRange([null, null]); setShowCustomPopover(false); }}>Cancel</Button>
                      <Button size="small" type="primary" onClick={onCustomApply}>Apply</Button>
                    </div>
                  </div>
                }
                title="Select custom range"
                trigger="click"
                visible={showCustomPopover}
                onVisibleChange={(vis) => setShowCustomPopover(vis)}
                placement="bottomLeft"
              >
                <Button
                  className={activePreset === "custom" ? "df-active" : ""}
                  onClick={() => setShowCustomPopover(true)}
                >
                  Custom Range ⬇
                </Button>
              </Popover>

              <div className="date-range-label">{rangeLabel}</div>
              <div
  className="assignee-toggle"
  style={{ display: "flex", gap: 8, marginLeft: 12 }}
  >
<Button onClick={() => setOpenPopup("freelancer")}>
  Freelancer
</Button>

<Button onClick={() => setOpenPopup("vendor")}>
  Vendor
</Button>

</div>

  </div>
          </div>

          {/* SUMMARY */}
{/* SUMMARY */}
              <Card
                className="big-card"
                title={`Order Summary — ${active}`}
                bordered={false}
              >
                <Row gutter={20}>

              {/* SALES CARD (dynamic) */}
              <Col span={12}>
                <Card className="summary-card" bordered={false}>
                <div className="header-purple">Orders</div>
              <div className="amount">
                {scaleTo300to700(aggregatedDynamic.sales)}
              </div>
                <p className="sub-text">Orders received</p>

                                  <div className="sales-extra">
                    <div>Period: <strong>{friendlyRange(range)}</strong></div>
                  </div>

                  {/* <div className="btn-group">
                    <Button icon={<PlusOutlined />} type="primary">New Order</Button>
                    <Button icon={<PlusOutlined />} type="primary">Customer</Button>
                    <Button icon={<PlusOutlined />} type="primary">Estimate</Button>
                  </div> */}

                  {/* <div className="links-row">
                    <span>All Orders</span>
                    <span>All Customers</span>
                    <span>All Estimates</span>
                  </div> */}
                </Card>
              </Col>

              {/* PURCHASE CARD (dynamic) */}
              <Col span={12}>
                <Card className="summary-card" bordered={false}>
                  <div className="header-purple">Tickets</div>
                  <div className="amount">
                    {scaleTo300to700(aggregatedDynamic.purchases)}
                  </div>
                  <p className="sub-text">Service tickets raised</p>

                  <p className="purchase-items">
                    Active Tickets: <strong>{currentStatic.purchaseCount}</strong>
                  </p>


                  {/* <div className="btn-group">
                    <Button icon={<PlusOutlined />} type="primary">New Ticket</Button>
                    <Button icon={<PlusOutlined />} type="primary">Service Partner</Button>
                  </div> */}

                  {/* <div className="links-row">
                    <span>All Tickets</span>
                    <span>All Partners</span>
                  </div> */}
                </Card>
              </Col>
            </Row>
          </Card>


          {/* VAT + CHARTS */}
          <Row gutter={20} style={{ marginTop: 20 }}>
            <Col span={8}>
            <Card title="Ticket Priority Summary" className="panel-card vat-card">
                <div className="vat-scroll">
                  {currentStatic.vat.map((v, i) => (
                    <div key={i} className="vat-row">
                      <span>{v.period}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {v.status && <Button size="small" className="cap-btn">{v.status}</Button>}
                        <span className="vat-amount">{inr.format(v.amount)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            <Col span={8}>
              <Card title="Orders Volume Trend" className="panel-card">
                <ReactApexChart
                  options={debtOptions}
                  series={[
                    { name: "Debtors", data: currentStatic.debtorsSeries },
                    { name: "Creditors", data: currentStatic.creditorsSeries },
                  ]}
                  type="line"
                  height={200}
                />
              </Card>
            </Col>

            <Col span={8}>
              <Card title="Tickets Volume Trend" className="panel-card">
                <ReactApexChart
                  options={salesOptions}
                  series={[
                    { name: "Orders", data: aggregatedDynamic.salesSeries },
                    { name: "Purchases", data: aggregatedDynamic.purchasesSeries },
                  ]}
                  type="line"
                  height={200}
                />
              </Card>
            </Col>
          </Row>

          {/* ----- 4 Compact Booking Cards (dynamic counts) ----- */}
          <Row gutter={20} style={{ marginTop: 18 }}>
            <Col xs={24} sm={12} md={6}>
              <Card
                className="mini-stat-card total-bookings clickable-card"
                bordered={false}
                onClick={() => openBookingsModal("Total")}
                role="button"
                tabIndex={0}
                aria-label="Open total bookings"
              >
                <div className="mini-title">Total Bookings</div>
                <div className="stat-number">{bookingStats.total}</div>
                <div className="mini-card-footer">
                  <span>View all bookings</span>
                  <Tooltip title="Open bookings table">
                    <PlusOutlined />
                  </Tooltip>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card
                className="mini-stat-card completed clickable-card"
                bordered={false}
                onClick={() => openBookingsModal("Completed")}
                role="button"
                tabIndex={0}
                aria-label="Open completed bookings"
              >
                <div className="mini-title">Completed</div>
                <div className="stat-number">{bookingStats.completed}</div>
                <div className="mini-card-footer">
                  <span>View completed</span>
                  <Tooltip title="Open bookings table">
                    <PlusOutlined />
                  </Tooltip>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card
                className="mini-stat-card pending clickable-card"
                bordered={false}
                onClick={() => openBookingsModal("Pending")}
                role="button"
                tabIndex={0}
                aria-label="Open pending bookings"
              >
                <div className="mini-title">Pending</div>
                <div className="stat-number">{bookingStats.pending}</div>
                <div className="mini-card-footer">
                  <span>View pending</span>
                  <Tooltip title="Open bookings table">
                    <PlusOutlined />
                  </Tooltip>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Card
                className="mini-stat-card rejected clickable-card"
                bordered={false}
                onClick={() => openBookingsModal("Rejected")}
                role="button"
                tabIndex={0}
                aria-label="Open rejected bookings"
              >
                <div className="mini-title">Rejected</div>
                <div className="stat-number">{bookingStats.rejected}</div>
                <div className="mini-card-footer">
                  <span>View rejected</span>
                  <Tooltip title="Open bookings table">
                    <PlusOutlined />
                  </Tooltip>
                </div>
              </Card>
            </Col>
          </Row>

          {/* AGEING (STATIC: not filtered) */}
            <Card title="Order Ageing Summary" className="panel-card ageing-card" style={{ marginTop: 20 }}>

            {currentStatic.ageing.map((a, i) => (
              <div className="age-row" key={i}>
                <span className="age-label">{a.label}</span>
                <span className="age-amt">{inr.format(a.amount)}</span>
              </div>
            ))}
          </Card>
        </main>
       </div>

      {/* ---------- BOOKING MODAL ---------- */}
<Modal
    open={modalVisible}
    title={
      <div className="modal-title-row">
        <div className="modal-title-left">
          <h3 style={{ margin: 0 }}>{modalTitle}</h3>
          <div className="modal-sub">
            Showing {filteredBookings.length} records
          </div>
        </div>

        <div className="modal-actions">
          <Input
            placeholder="Search customer..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 220, marginRight: 12 }}
          />
          <Button onClick={() => setSearchText("")}>Reset</Button>
        </div>
      </div>
    }
    width={1200}
    onCancel={closeBookingsModal}
    footer={[
      <Button key="close" onClick={closeBookingsModal}>
        Close
      </Button>,
    ]}
    bodyStyle={{ padding: 0 }}
    className="bookings-modal"
    centered
  >
    <div className="modal-table-wrap">
      <Table
        columns={columns}
        dataSource={filteredBookings}
        pagination={{ pageSize: 10 }}
        rowKey="key"
        size="middle"
        bordered
      />
    </div>
  </Modal>

  {/* ---------- ASSIGN MODAL ---------- */}
  <Modal
    open={assignOpen}
    title="Assign Booking"
    onCancel={() => setAssignOpen(false)}
    footer={null}
    width={900}
    centered
    bodyStyle={{
      maxHeight: "75vh",
      overflowY: "auto",
      overflowX: "hidden",
    }}
  >
    {assignRecord && (
      <>
        <div style={{ marginBottom: 16 }}>
          <strong>Booking ID:</strong> {assignRecord.bookingId}
          <br />
          <strong>Customer:</strong> {assignRecord.customerName}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {shortlistedAssignees.map((a) => (
            <Card
              key={a.id}
              hoverable
              style={{ borderRadius: 12, cursor: "pointer" }}
            >
              <Row gutter={16}>
                <Col span={18}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>
                    {a.name}
                  </div>

                  <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>
                    {a.type} • ID: {a.id}
                  </div>

                  <div style={{ fontSize: 13, color: "#555" }}>
                    PAN: {a.pan}
                  </div>

                  <div style={{ fontSize: 13, color: "#555", marginTop: 6 }}>
                    📍 {a.city} | 📞 {a.phone}
                  </div>

                  <div style={{ fontSize: 13, color: "#555" }}>
                    Experience: {a.experience} • Jobs: {a.jobsCompleted}
                  </div>
                </Col>

                <Col span={6} style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>
                    ⭐ {a.rating}
                  </div>

                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 12,
                      fontWeight: 600,
                      color:
                        a.type === "Vendor" ? "#1677ff" : "#52c41a",
                    }}
                  >
                    {a.type}
                  </div>

                  <Button
                    type="primary"
                    size="small"
                    style={{ marginTop: 12 }}
                    onClick={() => handleAssign(a.name)}
                  >
                    Assign
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      </>
    )}
  </Modal>
<Modal
  open={!!openPopup}
  title={openPopup === "freelancer" ? "Freelancers" : "Vendors"}
  onCancel={() => setOpenPopup(null)}
  footer={null}
  width="95vw"
  style={{ top: 20 }}
  bodyStyle={{ height: "85vh", overflow: "auto" }}
  centered
>
  <div className="popup-table-wrap">

    {/* ================= FREELANCER TABLE ================= */}
    {openPopup === "freelancer" && (
      <table className="popup-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Skills</th>
            <th>PAN</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {ASSIGNEES.filter(a => a.type === "Freelancer").map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.pan}@email.com</td>
              <td>{a.city}</td>

            <td>
              <div className="skill-wrap">
                {FREELANCER_SKILLS.map(skill => (
                  <span key={skill} className="skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </td>


              <td><strong>{a.pan}</strong></td>
              <td>{a.experience}</td>

              <td className="actions">
                {/* <button className="btn view">👁 View</button> */}
                <button className="btn approve">✓ Approve</button>
                <button className="btn reject">✕ Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

    {/* ================= VENDOR TABLE ================= */}
    {openPopup === "vendor" && (
      <table className="popup-table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Email</th>
            <th>City</th>
            <th>GST Number</th>
            <th>PAN</th>
            <th>Business Type</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {ASSIGNEES.filter(a => a.type === "Vendor").map(v => (
            <tr key={v.id}>
              <td><strong>{v.name}</strong></td>
              <td>{v.pan}@company.com</td>
              <td>{v.city}</td>
              <td>GST-PENDING</td>
              <td><strong>{v.pan}</strong></td>
              <td>Service Provider</td>
              <td>{v.experience}</td>

              <td className="actions">
                {/* <button className="btn view">👁 View</button> */}
                <button className="btn approve">✓ Approve</button>
                <button className="btn reject">✕ Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</Modal>
</div>
);
};

export default Appadmin;