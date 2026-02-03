import React, { useEffect, useMemo, useState } from "react";
import "./Payroll.css";
import jsPDF from "jspdf";

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

  /* ================= FETCH DATA ================= */

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
    const map: Record<string, { total: number; staff: Set<string> }> = {};

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

  /* ================= PDF ================= */

  const downloadPayslipPDF = (staff: Staff, p: Payslip) => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(14);
    doc.text("SWACHIFY EDUCATION PVT. LTD.", 105, y, { align: "center" });
    y += 8;
    doc.setFontSize(11);
    doc.text(`Payslip - ${p.payroll_month}`, 105, y, { align: "center" });

    y += 15;

    doc.setFontSize(10);
    doc.text(`Name: ${staff.staff_name}`, 15, y);
    doc.text(`Staff ID: ${staff.staff_id}`, 140, y);
    y += 6;
    doc.text(`Department: ${staff.department}`, 15, y);
    doc.text(`Designation: ${staff.job_title}`, 140, y);
    y += 6;
    doc.text(`Payment Date: ${p.payment_date}`, 15, y);

    y += 10;

    const addRow = (label: string, value: any) => {
      doc.text(label, 15, y);
      doc.text(amount(value).toString(), 150, y, { align: "right" });
      y += 6;
    };

    doc.setFontSize(11);
    doc.text("EARNINGS", 15, y);
    y += 6;

    doc.setFontSize(10);
    addRow("Basic Pay", p.basic_pay);
    addRow("HRA", p.hra);
    addRow("Medical Allowance", p.medical_allowance);
    addRow("Conveyance", p.conveyance);
    addRow("Performance Bonus", p.performance_bonus);
    addRow("Gross Earnings", p.gross_earnings);

    y += 6;

    doc.setFontSize(11);
    doc.text("DEDUCTIONS", 15, y);
    y += 6;

    doc.setFontSize(10);
    addRow("Provident Fund", p.pf_deduction);
    addRow("Income Tax", p.income_tax);
    addRow("Professional Tax", p.professional_tax);
    addRow("Health Insurance", p.health_insurance);
    addRow("Total Deductions", p.total_deductions);

    y += 8;

    doc.setFontSize(12);
    doc.text("NET SALARY", 15, y);
    doc.text(`₹ ${amount(p.net_salary)}`, 150, y, { align: "right" });

    y += 15;
    doc.setFontSize(9);
    doc.text(
      "This is a system generated payslip. No signature required.",
      105,
      y,
      { align: "center" }
    );

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

        {filteredStaff.map((s) => (
          <div
            key={s.id}
            className="staff-card"
            onClick={() => {
              setSelectedStaff(s);
              loadPayslips(s.staff_id);
              setView("DETAILS");
            }}
          >
            <strong>{s.staff_name}</strong>
            <p>{s.job_title}</p>
            <small>
              {s.staff_id} • {s.department}
            </small>
          </div>
        ))}

        <button className="overview-btn" onClick={() => setView("OVERVIEW")}>
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

        {loading && <p>Loading payslips...</p>}

        {payslips.map((p, i) => (
          <div key={i} className="salary-card">
            <h3>{p.payroll_month}</h3>
            <p>Gross: ₹{amount(p.gross_earnings)}</p>
            <p>Deductions: ₹{amount(p.total_deductions)}</p>
            <h2>Net Salary: ₹{amount(p.net_salary)}</h2>

            <button onClick={() => downloadPayslipPDF(selectedStaff, p)}>
              ⬇ Download Payslip
            </button>
          </div>
        ))}
      </div>
    );
  }

  /* ================= OVERVIEW ================= */

  return (
    <div className="payroll-page">
      <Header title="Salary Overview" />

      {overview.map((o, i) => (
        <div key={i} className="salary-card">
          <h3>{o.payroll_month}</h3>
          <p>Total Staff: {o.staff_count}</p>
          <h2>Total Disbursed: ₹{o.total_disbursed}</h2>
        </div>
      ))}
    </div>
  );
};

export default Payroll;
