
import React, { useMemo, useState,useEffect } from "react";
import { assignfreelancer } from "../../api/adminBookings";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  Table,
  Tag,
  Input,
  // Tooltip,
  DatePicker,
  Popover,
  message,
  Select,
} from "antd";

import { fetchAdminBookings } from "../../api/adminBookings";

import type { Dayjs } from "dayjs"; 

import {
  getFreelancers,
  approveFreelancer,
  rejectFreelancer
} from "../../api/admin";

import type { ColumnsType } from 'antd/es/table';

import type { BookingAPIResponse } from "../../api/adminBookings";


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
// import { useEffect } from "react";


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

type BookingStatus = "Pending" | "In-Progress" | "Completed" | "Rejected";
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
  paymentDone: boolean;
  assigned: string;
  assignedId:string|number|null;
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
        paymentDone: status === "Completed",
        assignedId: status === "Pending" ? null : `FR-${(counter+i)%20}`,
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
  email?: string;
};

const ASSIGNEES: Assignee[] = [
  // ================= FREELANCERS =================
  { id: "FR-101", name: "Rahul Verma", pan: "ABCDE1234F", rating: 4.8, type: "Freelancer", phone: "+91 98765 43210", city: "Bengaluru", experience: "5 Years", jobsCompleted: 320 },
  { id: "FR-102", name: "Neha Sharma", pan: "BBDFS7766P", rating: 4.6, type: "Freelancer", phone: "+91 91234 56789", city: "Delhi", experience: "4 Years", jobsCompleted: 210 },
  { id: "FR-103", name: "Suresh Kumar", pan: "DDKPS8899M", rating: 4.4, type: "Freelancer", phone: "+91 93456 78123", city: "Chennai", experience: "6 Years", jobsCompleted: 410 },
  { id: "FR-104", name: "Arjun Patel", pan: "FFRTP5544A", rating: 4.5, type: "Freelancer", phone: "+91 98712 33445", city: "Ahmedabad", experience: "3 Years", jobsCompleted: 180 },
  { id: "FR-105", name: "Pooja Nair", pan: "GGHJP8899Q", rating: 4.7, type: "Freelancer", phone: "+91 98111 22334", city: "Kochi", experience: "6 Years", jobsCompleted: 410 },
  { id: "FR-106", name: "Manoj Singh", pan: "HHKLM3322Z", rating: 4.3, type: "Freelancer", phone: "+91 91222 77889", city: "Jaipur", experience: "4 Years", jobsCompleted: 260 },
  { id: "FR-107", name: "Sana Khan", pan: "JJQWE9988L", rating: 4.6, type: "Freelancer", phone: "+91 90011 55667", city: "Bhopal", experience: "5 Years", jobsCompleted: 350 },
  { id: "FR-108", name: "Ritesh Malhotra", pan: "RTHML4455K", rating: 4.2, type: "Freelancer", phone: "+91 98888 11223", city: "Ludhiana", experience: "2 Years", jobsCompleted: 120 },
  { id: "FR-109", name: "Ayesha Farooq", pan: "AYSFR3322P", rating: 4.5, type: "Freelancer", phone: "+91 90909 44556", city: "Aligarh", experience: "4 Years", jobsCompleted: 240 },
  { id: "FR-110", name: "Vikram Joshi", pan: "VKJSH8899Q", rating: 4.1, type: "Freelancer", phone: "+91 94444 77665", city: "Udaipur", experience: "3 Years", jobsCompleted: 160 },
  { id: "FR-111", name: "Sneha Kulkarni", pan: "SNKLR5566H", rating: 4.7, type: "Freelancer", phone: "+91 95555 33221", city: "Kolhapur", experience: "6 Years", jobsCompleted: 480 },
  { id: "FR-112", name: "Imran Shaikh", pan: "IMSHK6677N", rating: 4.4, type: "Freelancer", phone: "+91 96666 22119", city: "Aurangabad", experience: "5 Years", jobsCompleted: 300 },

  // ================= VENDORS =================
  { id: "VN-201", name: "Shree Logistics Pvt Ltd", pan: "AAECS9988Q", rating: 4.7, type: "Vendor", phone: "+91 99887 66554", city: "Mumbai", experience: "10 Years", jobsCompleted: 1450 },
  { id: "VN-202", name: "QuickMove Services", pan: "CCQMS4455R", rating: 4.5, type: "Vendor", phone: "+91 90909 80808", city: "Hyderabad", experience: "8 Years", jobsCompleted: 980 },
  { id: "VN-203", name: "SafeHands Facility Services", pan: "EEFAC6677L", rating: 4.3, type: "Vendor", phone: "+91 95555 44433", city: "Pune", experience: "12 Years", jobsCompleted: 2100 },
  { id: "VN-204", name: "PrimeCare Solutions", pan: "PRMCS1234P", rating: 4.6, type: "Vendor", phone: "+91 98777 66554", city: "Indore", experience: "9 Years", jobsCompleted: 890 },
  { id: "VN-205", name: "UrbanShift Logistics", pan: "URBSH7788T", rating: 4.4, type: "Vendor", phone: "+91 99881 22110", city: "Nagpur", experience: "7 Years", jobsCompleted: 760 },
  { id: "VN-206", name: "GreenRoute Transport", pan: "GRNRT6655X", rating: 4.8, type: "Vendor", phone: "+91 90909 11223", city: "Coimbatore", experience: "11 Years", jobsCompleted: 1320 },
  { id: "VN-207", name: "SwiftHands Services", pan: "SWFHS4433M", rating: 4.5, type: "Vendor", phone: "+91 95544 88990", city: "Noida", experience: "6 Years", jobsCompleted: 640 },
  { id: "VN-208", name: "MetroServe Corp", pan: "METSV2211A", rating: 4.2, type: "Vendor", phone: "+91 91111 77889", city: "Gurgaon", experience: "5 Years", jobsCompleted: 520 },
  { id: "VN-209", name: "RapidFleet India", pan: "RPDFL8899K", rating: 4.6, type: "Vendor", phone: "+91 92222 33445", city: "Surat", experience: "9 Years", jobsCompleted: 1100 },
  { id: "VN-210", name: "CityLink Services", pan: "CTYLK5566Q", rating: 4.3, type: "Vendor", phone: "+91 93333 99887", city: "Vadodara", experience: "7 Years", jobsCompleted: 700 },
  { id: "VN-211", name: "ProBuild Materials", pan: "PRBLD4433H", rating: 4.7, type: "Vendor", phone: "+91 94444 11223", city: "Raipur", experience: "13 Years", jobsCompleted: 1800 },
  { id: "VN-212", name: "NorthStar Logistics", pan: "NRTHS6677L", rating: 4.5, type: "Vendor", phone: "+91 96666 77889", city: "Dehradun", experience: "8 Years", jobsCompleted: 950 },
];

const FREELANCER_SKILLS: ServiceKey[] = [
  "Home Service",
  "Transport",
  "Buy/Sale/Rentals",
  "Raw Materials",
  "Education",
];
const SERVICE_TYPE_MAP: Record<number, ServiceKey> = {
  1: "Home Service",
  2: "Transport",
  3: "Buy/Sale/Rentals",
  4: "Raw Materials",
  5: "Education",
};



const SkillsCell: React.FC<{ skills: string[] }> = ({ skills }) => {
  const [open, setOpen] = useState(false);

  const visibleSkills = skills.slice(0, 1);
  const remainingCount = skills.length - 1;

  const popoverContent = (
    <div className="skills-popup">
      <div className="skills-popup-title">Services</div>

      <div className="skills-popup-list">
        {skills.map((skill) => (
          <span key={skill} className="skill-popup-tag">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <Popover
      content={popoverContent}
      trigger="click"
      placement="top"
      open={open}
      onOpenChange={setOpen}
    >
      <div className="skills-cell-wrap">
        {/* ✅ Show first 2 ONLY when popover is CLOSED */}
        {!open &&
          visibleSkills.map((skill) => (
            <span key={skill} className="skill-tag-premium">
              {skill}
            </span>
          ))}

        {/* View more toggle */}
        {remainingCount > 0 && !open && (
          <span className="skill-view-toggle">
            +{remainingCount} more
          </span>
        )}

        {/* When open, show only trigger text (keeps anchor position) */}
        {open && (
          <span className="skill-view-toggle active">
            View services
          </span>
        )}
      </div>
    </Popover>
  );
};



/* ---------------------- LandingDashboard ---------------------- */

const Appadmin: React.FC = () => {
//const [bookings, setBookings] = useState<BookingRow[]>(generateBookings());
const [bookings, setBookings] = useState<BookingRow[]>([]);
const [loadingBookings, setLoadingBookings] = useState(true);
const [sidebarOpen, setSidebarOpen] = useState(false);
const [openPopup, setOpenPopup] = useState<"freelancer" | "vendor" | null>(null);

console.log(generateBookings);
console.log(loadingBookings);
// console.log(computeBookingStatsFromCount);

const [pendingFreelancers, setPendingFreelancers] = useState<Assignee[]>([]);
const [totalFreelancers, setTotalFreelancers] = useState<Assignee[]>([]);



const [pendingVendors, setPendingVendors] = useState(
  ASSIGNEES.filter(a => a.type === "Vendor")
);

const [approvedVendors, setApprovedVendors] = useState<
  typeof ASSIGNEES
>([]);

// const [approvedFreelancers, setApprovedFreelancers] = useState<
//   typeof ASSIGNEES
// >([]);

// const approveFreelancer = (id: string) => {
//   setPendingFreelancers(prev => {
//     const selected = prev.find(f => f.id === id);
//     if (!selected) return prev;

//     setApprovedFreelancers(appr => [...appr, selected]);
//     return prev.filter(f => f.id !== id);
//   });
// };

const approveVendor = (id: string) => {
  setPendingVendors(prev => {
    const selected = prev.find(v => v.id === id);
    if (!selected) return prev;

    setApprovedVendors(appr => [...appr, selected]);
    return prev.filter(v => v.id !== id);
  });
};


  const navigate = useNavigate();
    // const [apiAssignees, setApiAssignees] = useState<Assignee[]>([]);
  const [loadingAssignees, setLoadingAssignees] = useState(false);
 useEffect(() => {
  const loadFreelancers = async () => {
    try {
      setLoadingAssignees(true);

      const data = await getFreelancers();

      

      const mapped: Assignee[] = data.map((f: any) => {
        let pan = "NA";
        try {
          const gov = f.government_id ? JSON.parse(f.government_id) : null;
          if (gov?.type === "pan") pan = gov.number;
        } catch {}

        return {
          id: `FR-${f.id}`,
          name: `${f.first_name ?? ""} ${f.last_name ?? ""}`.trim(),
          email: f.email,
          phone: f.mobile,
          city: f.address || "NA",
          pan,
          rating: 4,
          type: "Freelancer",
          experience: f.experience_summary || "N/A",
          jobsCompleted: 0,
        };
      });

      // ✅ NOT APPROVED (Pending)
      const pending = mapped.filter(
        (_, index) => data[index].status_id === 2
      );

      // ✅ ALL freelancers (approved + pending + rejected)
      setTotalFreelancers(mapped);

      // ✅ ONLY pending (status_id === 2)
      setPendingFreelancers(pending);

    } catch (err) {
      console.error("Failed to load freelancers", err);
    } finally {
      setLoadingAssignees(false);
    }
  };

  loadFreelancers();
}, []);

 const MERGED_ASSIGNEES = totalFreelancers.length > 0
  ? totalFreelancers
  : ASSIGNEES;


const assigneeMap = useMemo(() => {
  const map = new Map<number, Assignee>();

  MERGED_ASSIGNEES.forEach(a => {
    // strip ALL letters & hyphen
    const num = parseInt(a.id.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(num)) map.set(num, a);
  });

  return map;
}, [MERGED_ASSIGNEES]);
console.log(assigneeMap);
console.log(SERVICE_TYPE_MAP);


  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    message.success("Logged out successfully");
    navigate("/Landing");
  };


useEffect(() => {
if (openPopup === "freelancer") {
  // setPendingFreelancers([]); 
}


  if (openPopup === "vendor") {
    setPendingVendors(
      ASSIGNEES.filter(a => a.type === "Vendor")
    );
    setApprovedVendors([]);
  }
}, [openPopup, MERGED_ASSIGNEES]);



const [active, setActive] = useState<"Dashboard" | ServiceKey>("Dashboard");

  // DATE FILTER state (default: Last 7 Days)
  const [range, setRange] = useState<{ from: Date; to: Date }>(() => {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - 6);
    return { from, to };
  });

  const [showCustomPopover, setShowCustomPopover] = useState(false);
const [customRange, setCustomRange] =
  useState<[Dayjs | null, Dayjs | null]>([null, null]);
  // NEW: which preset is active (controls highlight)
type DatePreset = 
  | "all"
  | "today"
  | "yesterday"
  | "last7"
  | "lastMonth"
  | "custom";

const [datePreset, setDatePreset] = useState<DatePreset>("all");


  const mapBookingFromAPI = (b: BookingAPIResponse): BookingRow => ({
  key: String(b.id),
  bookingId: `SW-${b.id}`,
  customerName: b.full_name,
  // serviceType: SERVICE_TYPE_MAP[b.service_type_id] ?? "Home Service",
    serviceType: "Home Service",
  amount: Number(b.service_price ?? 0),
  date: b.preferred_date,
  status:
    b.status_id === 1
      ? "Pending"
      : b.status_id === 2
      ? "In-Progress"
      : b.status_id === 6
      ? "Completed"
      : "Rejected",
  phone: b.mobile,
  location: b.address,
  paymentDone: Boolean(b.payment_done),
  assigned:"",
  assignedId: b.assigned_to ?? null,
  
});



  useEffect(() => {
  const loadBookings = async () => {
    try {
      setLoadingBookings(true);

      const list = await fetchAdminBookings();

      const mapped = list.map(mapBookingFromAPI);
      setBookings(mapped);
    } catch (err) {
      console.error(err);
      message.error("Failed to load bookings");
    } finally {
      setLoadingBookings(false);
    }
  };

  loadBookings();
}, []);




const handleApproveFreelancer = async (freelancer: Assignee) => {
  try {
    const freelancerId = Number(
      freelancer.id.replace("FR-", "")
    );

    await approveFreelancer(freelancerId);

    message.success(`${freelancer.name} approved`);

    // remove from pending
    setPendingFreelancers(prev =>
      prev.filter(f => f.id !== freelancer.id)
    );

    // add to total list
    setTotalFreelancers(prev => [...prev, freelancer]);

  } catch (err) {
    console.error(err);
    message.error("Approve failed");
  }
};

const handleRejectFreelancer = async (freelancer: Assignee) => {
  try {
    const freelancerId = Number(
      freelancer.id.replace("FR-", "")
    );

    await rejectFreelancer(freelancerId);

    message.success(`${freelancer.name} rejected`);

    setPendingFreelancers(prev =>
      prev.filter(f => f.id !== freelancer.id)
    );

  } catch (err) {
    console.error(err);
    message.error("Reject failed");
  }
};



 


  


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
const applyPreset = (
  which: "all" | "today" | "yesterday" | "last7" | "lastMonth"
) => {
  if (which === "all") {
    setDatePreset("all");
    return;
  }

  let newRange;
  if (which === "today") newRange = setRangeToday();
  if (which === "yesterday") newRange = setRangeYesterday();
  if (which === "last7") newRange = setRangeLast7();
  if (which === "lastMonth") newRange = setRangeLastMonth();

  if (newRange) {
    setRange({
      from: new Date(newRange.from),
      to: new Date(newRange.to),
    });
    setDatePreset(which);
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

const columns: ColumnsType<BookingRow> = [
  {
    title: "Booking ID",
    dataIndex: "bookingId",
    width: 110,
      align: "center",
    render: (t: string) => <strong>{t}</strong>,
  },
  {
    title: "Customer Name",
    dataIndex: "customerName",
    width: 160,
    align: "left",
  },
  {
  title: "Location",
  dataIndex: "location",
  width: 180,
  render: (text: string) => (
    <div className="location-cell" title={text}>
      {text}
    </div>
  ),
}
,
  {
    title: "Service Type",
    dataIndex: "serviceType",
    width: 150,
    align: "center",
    // history:10,
  },
  
{
  title: "Payment Status",
  key: "paymentStatus",
  align: "center",
  width: 140,
  render: (_: any, record: BookingRow) => {
    return (
      <Tag color={record.paymentDone ? "green" : "red"}>
        {record.paymentDone ? "Paid" : "Unpaid"}
      </Tag>
    );
  },
},
{
  title: "Work Status",
  key: "workStatus",
  align: "center",
  width: 120,
  render: (_: any, record: BookingRow) => {

    // 🔵 Show In-Progress
    if (record.status === "In-Progress") {
      return <Tag color="blue">In-Progress</Tag>;
    }

    // 🟢 Completed
    if (record.status === "Completed") {
      return <Tag color="green">Completed</Tag>;
    }

    // 🟠 Pending but NOT assigned → show button
    if (record.status === "Pending" && !record.assignedId) {
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

    // 🟡 Pending but already assigned → Assigned (not started)
    if (record.status === "Pending" && record.assignedId) {
      return <Tag color="gold">Assigned</Tag>;
    }

    // 🔴 Rejected — if you use it
    if (record.status === "Rejected") {
      return <Tag color="red">Rejected</Tag>;
    }

    

    return null;
  },
},


{
  title: "Assigned To",
  key: "assigned",
  align: "center",
  width: 180,
  render: (_: any, r: BookingRow) => {
    if (!r.assignedId)
      return <Tag color="orange">Not Assigned</Tag>;

    const assignee = MERGED_ASSIGNEES.find(a =>
      Number(a.id.replace("FR-","").replace("VN-","")) === Number(r.assignedId)
    );

    return (
      <Tag color="blue">
        {assignee?.name || r.assignedId}
      </Tag>
    );
  },
},

{
    title: "Amount",
    dataIndex: "amount",
    width: 120,
    align: "center",
    
    render: (amt: number) => (
      <span className="table-amount">{inr.format(amt)}</span>
    ),
  },

];
const [assignOpen, setAssignOpen] = useState(false);
const [assignRecord, setAssignRecord] = useState<BookingRow | null>(null);
// ✅ Auto-shortlist assignees based on service type
const shortlistedAssigneesFromAPI = useMemo(() => {
  if (!assignRecord) return [];

  const service = assignRecord.serviceType;

  if (SMALL_SERVICES.includes(service)) {
    return MERGED_ASSIGNEES.filter(a => a.type === "Freelancer");
  }

  if (BIG_SERVICES.includes(service)) {
    return MERGED_ASSIGNEES.filter(a => a.type === "Vendor");
  }

  return MERGED_ASSIGNEES;
}, [assignRecord, MERGED_ASSIGNEES]);


const openAssign = (record: BookingRow) => {
  setAssignRecord(record);
  setAssignOpen(true);
};


const [assignLoading, setAssignLoading] = useState(false);

const handleAssign = async (assignee: Assignee) => {
  if (!assignRecord) return;

  try {
    setAssignLoading(true);

    await assignfreelancer(
      Number(assignRecord.key),             // booking id
      Number(assignee.id.replace("FR-","")) // freelancer id
    );

    // 🔵 Update UI after success
    setBookings(prev =>
      prev.map(b =>
        b.key === assignRecord.key
          ? {
              ...b,
              assignedId: Number(assignee.id.replace("FR-","")),
              assigned: assignee.name,
              status: "In-Progress", 
            }
          : b
      )
    );

    message.success(`Assigned to ${assignee.name}`);
    setAssignOpen(false);
  } catch (e) {
    console.error(e);
    message.error("Assignment failed");
  } finally {
    setAssignLoading(false);
  }
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

  // ✅ ALL = no date filter
  if (datePreset === "all") {
    const sales = TXNS
      .filter(t => !service || t.serviceType === service)
      .filter(t => t.type === "sale")
      .reduce((s, r) => s + r.amount, 0);

    const purchases = TXNS
      .filter(t => !service || t.serviceType === service)
      .filter(t => t.type === "purchase")
      .reduce((s, r) => s + r.amount, 0);

    return {
      sales,
      purchases,
      bookingsCount: bookings.length,
      salesSeries: SERVICE_DATA[active === "Dashboard" ? "Home Service" : active]?.salesSeries ?? [],
      purchasesSeries: SERVICE_DATA[active === "Dashboard" ? "Home Service" : active]?.purchasesSeries ?? [],
      seriesLabels: ["All"],
    };
  }

  // 🔁 Normal date-based logic
  const totals = aggTotals(range.from, range.to, service);
  const buckets = seriesBuckets(range.from, range.to, service);

  return {
    sales: totals.sales,
    purchases: totals.purchases,
    bookingsCount: totals.bookingsCount,
    salesSeries: buckets.salesBuckets,
    purchasesSeries: buckets.purchaseBuckets,
    seriesLabels: buckets.labels,
  };
}, [range, active, datePreset, bookings]);


  function computeBookingStatsFromCount(count: number) {
    const total = Math.max(0, Math.round(count));
    const completed = Math.round(total * 0.7);
    const pending = Math.round(total * 0.2);
    const rejected = total - completed - pending;
    return { total, completed, pending, rejected };
  }
  console.log(computeBookingStatsFromCount);
  

  //const bookingStats = computeBookingStatsFromCount(aggregatedDynamic.bookingsCount);
//   const bookingStats = useMemo(() => {
//   const total = bookings.length;
//   const completed = bookings.filter(b => b.status === "Completed").length;
//   const pending = bookings.filter(b => b.status === "Pending").length;
//   const rejected = bookings.filter(b => b.status === "Rejected").length;

//   return { total, completed, pending, rejected };
// }, [bookings]);

// const API_SUPPORTED_SERVICES: ServiceKey[] = [
//   "Home Service",
//   "Transport",
//   "Buy/Sale/Rentals",
//   "Raw Materials",
//   "Education",
// ];


const bookingStats = useMemo(() => {
  const filtered =
    datePreset === "all"
      ? bookings
      : bookings.filter(b => {
          const dt = dateFromISO(b.date);
          const from = new Date(range.from);
          const to = new Date(range.to);
          return dt >= from && dt <= to;
        });

  return {
    total: filtered.length,
    inProgress: filtered.filter(b => b.status === "In-Progress").length,
    completed: filtered.filter(b => b.status === "Completed").length,
    pending: filtered.filter(b => b.status === "Pending").length,
    rejected: filtered.filter(b => b.status === "Rejected").length,
  };
}, [bookings, range, datePreset]);




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
    setDatePreset("custom");
    setShowCustomPopover(false);
  };

  const friendlyRange = (r:{from:Date;to:Date}) => {
    const a = r.from.toISOString().slice(0,10);
    const b = r.to.toISOString().slice(0,10);
    return `${a} → ${b}`;
  };


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
  <div className="sticky-stack">
    <h2 className="page-title">Service Operations Dashboard</h2>

 <div className="dashboard-scroll">
              <Card
  className="big-card"
  title={
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <span>Order Summary Dashboard</span>

      {/* RIGHT SIDE CONTROLS */}
      <div className="dashboard-filter-bar">
        {/* DROPDOWN */}
        <Select
  className="dashboard-filter-select"
  value={datePreset}
  style={{ width: 160 }}
  onChange={(value) => {
    setDatePreset(value as DatePreset);
    applyPreset(value as any);
  }}
  options={[
    { label: "All", value: "all" },
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 Days", value: "last7" },
    { label: "Last Month", value: "lastMonth" },
  ]}
/>

        <Button
  className="dashboard-action-btn"
  type={openPopup === "freelancer" ? "primary" : "default"}
  onClick={() => setOpenPopup("freelancer")}
>
  Freelancer
</Button>


<Button
  className="dashboard-action-btn"
  type={openPopup === "vendor" ? "primary" : "default"}
  onClick={() => setOpenPopup("vendor")}
>
  Vendor
</Button>

 

        {/* CUSTOM RANGE */}
        <Popover
          content={
            <div style={{ padding: 8, minWidth: 320 }}>
              <RangePicker
                value={customRange}
                onChange={(vals) => setCustomRange(vals ?? [null, null])}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <Button
                  size="small"
                  onClick={() => setShowCustomPopover(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  type="primary"
                  onClick={onCustomApply}
                >
                  Apply
                </Button>
              </div>
            </div>
          }
          trigger="click"
          open={showCustomPopover}
          onOpenChange={setShowCustomPopover}
        >
               
<Button className="dashboard-action-btn">
  Custom Range
</Button>

        </Popover>
      </div>
    </div>
  }
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
<Row gutter={16} style={{ marginTop: 18 }} wrap={false}>
  <Col flex="1">
    <Card
      className="mini-stat-card total-bookings clickable-card"
      bordered={false}
      onClick={() => openBookingsModal("Total")}
    >
      <div className="mini-title">Total Bookings</div>
      <div className="stat-number">{bookingStats.total}</div>
      <div className="mini-card-footer">View all bookings <PlusOutlined /></div>
    </Card>
  </Col>

  <Col flex="1">
    <Card
      className="mini-stat-card in-progress clickable-card"
      bordered={false}
      onClick={() => openBookingsModal("In-Progress")}
    >
      <div className="mini-title">In-Progress</div>
      <div className="stat-number">{bookingStats.inProgress}</div>
      <div className="mini-card-footer">View in-progress <PlusOutlined /></div>
    </Card>
  </Col>

  <Col flex="1">
    <Card
      className="mini-stat-card completed clickable-card"
      bordered={false}
      onClick={() => openBookingsModal("Completed")}
    >
      <div className="mini-title">Completed</div>
      <div className="stat-number">{bookingStats.completed}</div>
      <div className="mini-card-footer">View completed <PlusOutlined /></div>
    </Card>
  </Col>

  <Col flex="1">
    <Card
      className="mini-stat-card pending clickable-card"
      bordered={false}
      onClick={() => openBookingsModal("Pending")}
    >
      <div className="mini-title">Pending</div>
      <div className="stat-number">{bookingStats.pending}</div>
      <div className="mini-card-footer">View pending <PlusOutlined /></div>
    </Card>
  </Col>

  <Col flex="1">
    <Card
      className="mini-stat-card rejected clickable-card"
      bordered={false}
      onClick={() => openBookingsModal("Rejected")}
    >
      <div className="mini-title">Rejected</div>
      <div className="stat-number">{bookingStats.rejected}</div>
      <div className="mini-card-footer">View rejected <PlusOutlined /></div>
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
          </div>
          </div>
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
    bodyStyle={{ padding: 0,
         
     }}
    className="bookings-modal"
    centered
  >
    <div className="modal-table-wrap">
      <Table
        columns={columns}
        dataSource={filteredBookings}
        pagination={{ pageSize: 10 }}
        rowKey="key"
        size="small"
        bordered
        scroll={{ y: '60vh' }}
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
        <div style={{ marginBottom: 16 }} className="assign-modal-header">
          <strong>Booking ID:</strong> {assignRecord.bookingId}
          <br />
          <strong>Customer:</strong> {assignRecord.customerName}
        </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
  {loadingAssignees && (
    <div style={{ textAlign: "center", padding: 16 }}>
      Loading freelancers...
    </div>
  )}

  {shortlistedAssigneesFromAPI.map((a) => (
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
  loading={assignLoading}
  onClick={() => handleAssign(a)}
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
{/* ---------- FREELANCER / VENDOR POPUP ---------- */}
<Modal
  open={!!openPopup}
  onCancel={() => setOpenPopup(null)}
  footer={null}
  width={1200}
  centered
  bodyStyle={{ maxHeight: "75vh", overflowY: "auto" }}
>
  {/* ================= FREELANCER ================= */}
  {openPopup === "freelancer" && (
    <>
      {/* Pending Freelancers */}
      <div className="table-section">
        <div className="table-title">
          Pending Freelancers ({pendingFreelancers.length})
        </div>

        <div className="table-scroll">
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
              {pendingFreelancers.map(a => (
                <tr key={a.id}>
                  <td><strong>{a.name}</strong></td>
                  <td>{a.email || "NA"}</td>
                  <td>{a.city}</td>
                  <td><SkillsCell skills={FREELANCER_SKILLS} /></td>
                  <td>{a.pan}</td>
                  <td>{a.experience}</td>
<td className="actions">
  <button
    className="btn approve"
    onClick={() => handleApproveFreelancer(a)}
  >
    ✓ Approve
  </button>

  <button
    className="btn reject"
    onClick={() => handleRejectFreelancer(a)}
  >
    ✕ Reject
  </button>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Total Freelancers */}
      <div className="table-section">
        <div className="table-title">
          Total Freelancers ({totalFreelancers.length})
        </div>

        <div className="table-scroll">
          <table className="popup-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Skills</th>
                <th>PAN</th>
                <th>Experience</th>
              </tr>
            </thead>

            <tbody>
              {totalFreelancers.map(a => (
                <tr key={a.id}>
                  <td><strong>{a.name}</strong></td>
                <td>{a.email || "NA"}</td>
                  <td>{a.city}</td>
                  <td><SkillsCell skills={FREELANCER_SKILLS} /></td>
                  <td>{a.pan}</td>
                  <td>{a.experience}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )}

  {/* ================= VENDOR ================= */}
  {openPopup === "vendor" && (
  <>
    {/* ================= PENDING VENDORS ================= */}
    <div className="table-section">
      <div className="table-title">
        Pending Vendors ({pendingVendors.length})
      </div>

      <div className="table-scroll">
        <table className="popup-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Email</th>
              <th>City</th>
              <th>GST</th>
              <th>PAN</th>
              <th>Business</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {pendingVendors.map(v => (
              <tr key={v.id}>
                <td><strong>{v.name}</strong></td>
                <td>{v.pan}@company.com</td>
                <td>{v.city}</td>
                <td>GST-PENDING</td>
                <td>{v.pan}</td>
                <td>Service Provider</td>
                <td>{v.experience}</td>
                <td className="actions">
                  <button
                    className="btn approve"
                    onClick={() => approveVendor(v.id)}
                  >
                    ✓ Approve
                  </button>
                  <button className="btn reject">✕ Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* ================= TOTAL VENDORS ================= */}
    <div className="table-section">
      <div className="table-title">
        Total Vendors ({approvedVendors.length})
      </div>

      <div className="table-scroll">
        <table className="popup-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Email</th>
              <th>City</th>
              <th>GST</th>
              <th>PAN</th>
              <th>Business</th>
              <th>Experience</th>
            </tr>
          </thead>

          <tbody>
            {approvedVendors.map(v => (
              <tr key={v.id}>
                <td><strong>{v.name}</strong></td>
                <td>{v.pan}@company.com</td>
                <td>{v.city}</td>
                <td>GST-APPROVED</td>
                <td>{v.pan}</td>
                <td>Service Provider</td>
                <td>{v.experience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
)}
</Modal>
</div>
);
};

export default Appadmin;



