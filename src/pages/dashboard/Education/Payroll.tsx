import React, { useEffect, useMemo, useState } from "react";
import "./Payroll.css";
import jsPDF from "jspdf";
import {
  DownloadOutlined,
  PrinterOutlined,
  MailOutlined,
} from "@ant-design/icons";

/* ================= TYPES ================= */

export type ViewType = "LIST" | "DETAILS" | "OVERVIEW";

interface PayrollProps {
  onBack: () => void;
  initialView?: ViewType;
}

interface Staff {
  id: number;
  staff_id: string;
  staff_name: string;
  job_title: string;
  department: string;
}

interface Payslip {
  payroll_month: string;
  payment_date: string;
  basic_pay: string;
  hra: string;
  medical_allowance: string;
  conveyance: string;
  performance_bonus: string;
  gross_earnings: string;
  pf_deduction: string;
  income_tax: string;
  professional_tax: string;
  health_insurance: string;
  total_deductions: string;
  net_salary: string;
}

interface PayslipSummaryRow {
  staff_id: string;
  staff_name: string;
  job_title: string;
  department: string;
  payroll_month: string;
  net_salary: number;
}

/* ================= API ================= */

const API_BASE = "https://swachify-india-be-1-mcrb.onrender.com";
const amount = (v: any) =>
  Number(String(v).replace(/[^0-9.-]/g, "")) || 0;

/* ================= COMPONENT ================= */

const Payroll: React.FC<PayrollProps> = ({
  onBack,
  initialView = "LIST",
}) => {
  const [view, setView] = useState<ViewType>(initialView);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [summaryRows, setSummaryRows] = useState<PayslipSummaryRow[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);


  /* ================= FETCH ================= */

  useEffect(() => {
    fetch(`${API_BASE}/institution/management/staff-profile/all`)
      .then((r) => r.json())
      .then(setStaffList);

    fetch(`${API_BASE}/institution/management/payslip-summary`)
      .then((r) => r.json())
      .then(setSummaryRows);
  }, []);

  const loadPayslips = async (staffId: string) => {
    setLoading(true);
    const r = await fetch(
      `${API_BASE}/institution/management/${staffId}/payslips`
    );
    setPayslips(await r.json());
    setLoading(false);
  };

  /* ================= FILTER ================= */

  const filteredStaff = useMemo(
    () =>
      staffList.filter(
        (s) =>
          s.staff_name.toLowerCase().includes(search.toLowerCase()) ||
          s.staff_id.includes(search) ||
          s.department.toLowerCase().includes(search.toLowerCase())
      ),
    [staffList, search]
  );

  /* ================= OVERVIEW ================= */



  const overview = useMemo(() => {
    const map: Record<
      string,
      { total: number; staff: Set<string> }
    > = {};

    summaryRows.forEach((r) => {
      if (!map[r.payroll_month]) {
        map[r.payroll_month] = { total: 0, staff: new Set() };
      }
      map[r.payroll_month].total += amount(r.net_salary);
      map[r.payroll_month].staff.add(r.staff_id);
    });

    return Object.entries(map).map(([month, v]) => ({
      payroll_month: month,
      staff_count: v.staff.size,
      total_disbursed: v.total,
    }));
  }, [summaryRows]);
  const totalStaffCount = staffList.length;

const currentPayPeriod = useMemo(() => {
  if (overview.length === 0) return "N/A";

  // assuming backend sends latest month first,
  // otherwise you can sort by date if needed
  return overview[0].payroll_month;
}, [overview]);
  /* ================= PDF ================= */

  const generatePDF = (staff: Staff, p: Payslip) => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(14);
    doc.text("SWACHIFY EDUCATION PVT. LTD.", 105, y, { align: "center" });
    y += 10;

    doc.setFontSize(11);
    doc.text(`Payslip – ${p.payroll_month}`, 105, y, { align: "center" });

    y += 15;
    doc.setFontSize(10);
    doc.text(`Name: ${staff.staff_name}`, 15, y);
    doc.text(`Staff ID: ${staff.staff_id}`, 140, y);
    y += 6;
    doc.text(`Department: ${staff.department}`, 15, y);
    doc.text(`Designation: ${staff.job_title}`, 140, y);

    y += 12;
    const row = (l: string, v: any) => {
      doc.text(l, 15, y);
      doc.text(`₹ ${amount(v)}`, 150, y, { align: "right" });
      y += 6;
    };

    doc.text("EARNINGS", 15, y);
    y += 6;
    row("Basic Pay", p.basic_pay);
    row("HRA", p.hra);
    row("Medical Allowance", p.medical_allowance);
    row("Conveyance", p.conveyance);
    row("Performance Bonus", p.performance_bonus);
    row("Gross Earnings", p.gross_earnings);

    y += 6;
    doc.text("DEDUCTIONS", 15, y);
    y += 6;
    row("PF", p.pf_deduction);
    row("Income Tax", p.income_tax);
    row("Professional Tax", p.professional_tax);
    row("Health Insurance", p.health_insurance);
    row("Total Deductions", p.total_deductions);

    y += 8;
    doc.setFontSize(12);
    doc.text("NET SALARY", 15, y);
    doc.text(`₹ ${amount(p.net_salary)}`, 150, y, { align: "right" });

    doc.save(`Payslip_${staff.staff_id}_${p.payroll_month}.pdf`);
  };

  /* ================= HEADER ================= */

  const Header = ({ title }: { title: string }) => (
    <header className="payroll-header">
      <button onClick={onBack}>←</button>
      <h2>{title}</h2>
    </header>
  );

  /* ================= LIST ================= */

  if (view === "LIST") {
    return (
      <div className="payroll-page">
<Header title="Staff Payslips" />

<input
  className="payroll-search"
  placeholder="Search by name, ID, department..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

{/* ===== SUMMARY BOXES (MOBILE STYLE) ===== */}
<div className="payroll-summary">
  <div className="summary-box">
    <div className="summary-icon">👥</div>
    <div className="summary-text">
      <h2>{totalStaffCount}</h2>
      <span>Total Staff</span>
    </div>
  </div>

  <div className="summary-box money">
    <div className="summary-icon">💰</div>
    <div className="summary-text">
      <h2>{currentPayPeriod}</h2>
      <span>Current Pay Period</span>
    </div>
  </div>
</div>



        {filteredStaff.map((s) => (
          <div
            key={s.id}
            className="staff-row"
            onClick={() => {
              setSelectedStaff(s);
              loadPayslips(s.staff_id);
              setView("DETAILS");
            }}
          >
            <div className="staff-left">
              <div className="avatar">{s.staff_name[0]}</div>
              <div>
                <div>{s.staff_name}</div>
                <div>{s.job_title}</div>
              </div>
            </div>
            <div className="staff-right">
              {s.staff_id} • {s.department}
            </div>
          </div>
        ))}

        <button
          className="overview-btn"
          onClick={() => setView("OVERVIEW")}
        >
          💰 Salary Overview
        </button>
      </div>
    );
  }

  /* ================= DETAILS ================= */

  if (view === "DETAILS" && selectedStaff) {
    return (
      <div className="payroll-page">
        <Header title="Payslip Details" />

        {loading && <p>Loading payslips…</p>}

        {payslips.map((p, i) => (
          <div key={i} className="salary-card highlight">
            <h3>{p.payroll_month}</h3>

            <div className="net-salary">
              <div>Net Take-Home</div>
              <h1>₹{amount(p.net_salary)}</h1>
              <span className="badge success">Disbursed</span>
            </div>

            <div className="section-title">EARNINGS</div>
            <div className="breakdown">
              <div><span>Basic Pay</span><span>₹{amount(p.basic_pay)}</span></div>
              <div><span>HRA</span><span>₹{amount(p.hra)}</span></div>
              <div><span>Medical</span><span>₹{amount(p.medical_allowance)}</span></div>
              <div className="total"><span>Gross</span><span>₹{amount(p.gross_earnings)}</span></div>
            </div>

            <div className="section-title">DEDUCTIONS</div>
            <div className="breakdown">
              <div><span>PF</span><span className="neg">₹{amount(p.pf_deduction)}</span></div>
              <div><span>Tax</span><span className="neg">₹{amount(p.income_tax)}</span></div>
              <div className="total"><span>Total</span><span className="neg">₹{amount(p.total_deductions)}</span></div>
            </div>

            <div className="payslip-actions">
              <button onClick={() => generatePDF(selectedStaff, p)}>
                <DownloadOutlined />
              </button>
              <button onClick={() => window.print()}>
                <PrinterOutlined />
              </button>
              <button onClick={() => alert("Email integration pending")}>
                <MailOutlined />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ================= OVERVIEW ================= */

return (
  <div className="payroll-page">
    <Header title="Salary Overview" />

    {/* Month Selector */}
    <div className="period-card">
      <div>
        <strong>Payroll Period</strong>
        <span>Select Month</span>
      </div>

      <select
        value={selectedMonth ?? ""}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        <option value="" disabled>
          Select Month
        </option>

        {overview.map((o) => (
          <option key={o.payroll_month} value={o.payroll_month}>
            {o.payroll_month}
          </option>
        ))}
      </select>
    </div>

    {/* Overview Card (only selected month) */}
    {overview
      .filter(
        (o) => !selectedMonth || o.payroll_month === selectedMonth
      )
      .map((o, i) => (
        <div key={i} className="disbursement-card">
          <h3>{o.payroll_month}</h3>
          <div className="amount">₹{o.total_disbursed}</div>
          <div className="stats-row">
            <span>Staff Count: {o.staff_count}</span>
            <span className="badge success">Fully Paid</span>
          </div>
        </div>
      ))}
  </div>
);
}

export default Payroll;
