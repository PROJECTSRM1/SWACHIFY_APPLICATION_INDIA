import React, { useMemo, useState } from "react";
import "./Payroll.css";
import jsPDF from "jspdf";


/* ================= TYPES ================= */

export type PayrollMode = "PAYSLIPS" | "SALARY_OVERVIEW";
export type ViewType = "LIST" | "DETAILS" | "OVERVIEW";

interface PayrollProps {
  onBack: () => void;
  mode?: PayrollMode;
  initialView?: ViewType;
}

interface Staff {
  id: string;
  name: string;
  role: string;
  employeeId: string;
  department: string;
  netSalary: number;
  basic: number;
  hra: number;
  medical: number;
  bonus: number;
  pf: number;
  tax: number;
}

interface PayrollMonth {
  id: string;
  label: string;
  staff: Staff[];
}

/* ================= DATA ================= */

const PAYROLL_DATA: PayrollMonth[] = [
  {
    id: "2023-09",
    label: "September 2023",
    staff: [
      {
        id: "1",
        name: "Johnathan Doe",
        role: "Senior Math Coordinator",
        employeeId: "EDU-2023-042",
        department: "Mathematics",
        netSalary: 4850,
        basic: 3500,
        hra: 800,
        medical: 450,
        bonus: 600,
        pf: 250,
        tax: 250,
      },
      {
        id: "2",
        name: "Sarah Williams",
        role: "Science Department Head",
        employeeId: "EDU-2023-015",
        department: "Science",
        netSalary: 5200,
        basic: 4000,
        hra: 900,
        medical: 500,
        bonus: 800,
        pf: 300,
        tax: 300,
      },
    ],
  },
];

/* ================= COMPONENT ================= */

const Payroll: React.FC<PayrollProps> = ({
  onBack,
  mode = "PAYSLIPS",
  initialView = "LIST",
}) => {
  const [view, setView] = useState<ViewType>(initialView);
  const [monthId, setMonthId] = useState("2023-09");
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [search, setSearch] = useState("");

 const currentMonth = useMemo(() => {
  return PAYROLL_DATA.find((m) => m.id === monthId) ?? PAYROLL_DATA[0];
}, [monthId]);


  /* ================= AGGREGATES ================= */

  const totals = useMemo(() => {
    return currentMonth.staff.reduce(
      (acc, s) => {
        acc.basic += s.basic;
        acc.hra += s.hra;
        acc.medical += s.medical;
        acc.bonus += s.bonus;
        acc.pf += s.pf;
        acc.tax += s.tax;
        acc.net += s.netSalary;
        return acc;
      },
      { basic: 0, hra: 0, medical: 0, bonus: 0, pf: 0, tax: 0, net: 0 }
    );
  }, [currentMonth]);

  const grossEarnings =
    totals.basic + totals.hra + totals.medical + totals.bonus;
  const totalDeductions = totals.pf + totals.tax;

  const filteredStaff = currentMonth.staff.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase())
  );

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
        <Header
          title={
            mode === "SALARY_OVERVIEW"
              ? "Salary Particulars"
              : "Staff Payslips"
          }
        />

        <input
          className="payroll-search"
          placeholder="Search by name, ID, or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="payroll-summary">
          <div>
            <strong>{currentMonth.staff.length}</strong>
            <span>Total Staff</span>
          </div>
          <div>
            <strong>{currentMonth.label}</strong>
            <span>Pay Period</span>
          </div>
        </div>

        {filteredStaff.map((staff) => (
          <div
            key={staff.id}
            className="staff-card"
            onClick={() => {
              setSelectedStaff(staff);
              setView("DETAILS");
            }}
          >
            <div className="staff-left">
              <div className="avatar">👤</div>
              <div>
                <strong>{staff.name}</strong>
                <p>{staff.role}</p>
                <small>
                  {staff.employeeId} • {staff.department}
                </small>
              </div>
            </div>

            <div className="staff-right">
              <span className="salary">
                ${staff.netSalary.toLocaleString()}
              </span>
              <span>›</span>
            </div>
          </div>
        ))}

        <button className="overview-btn" onClick={() => setView("OVERVIEW")}>
          💰 Salary Overview
        </button>
      </div>
    );
  }

  /* ================= DETAILS ================= */
  const downloadPayslipPDF = (staff: Staff) => {
  const doc = new jsPDF();

  const gross =
    staff.basic + staff.hra + staff.medical + staff.bonus;
  const deductions = staff.pf + staff.tax;

  /* ===== HEADER ===== */
  doc.setFontSize(18);
  doc.text("SWACHIFY EDUCATION PVT. LTD.", 105, 20, { align: "center" });

  doc.setFontSize(11);
 doc.text(`Payslip for ${String(currentMonth.label)}`, 105, 28);


  doc.line(15, 32, 195, 32);

  /* ===== EMPLOYEE DETAILS ===== */
  doc.setFontSize(12);
  doc.text("Employee Details", 15, 42);

  doc.setFontSize(10);
  doc.text(`Name: ${staff.name}`, 15, 50);
  doc.text(`Employee ID: ${staff.employeeId}`, 15, 56);
  doc.text(`Department: ${staff.department}`, 15, 62);
  doc.text(`Designation: ${staff.role}`, 15, 68);

 doc.text(`Pay Period: ${String(currentMonth.label)}`, 130, 50);

  doc.text(`Payment Date: 01 Oct 2023`, 130, 56);

  doc.line(15, 72, 195, 72);

  /* ===== EARNINGS ===== */
  doc.setFontSize(12);
  doc.text("Earnings", 15, 82);

  doc.setFontSize(10);
  let y = 90;
  doc.text("Basic Salary", 15, y);
  doc.text(`$${staff.basic}`, 170, y, { align: "right" });

  y += 8;
  doc.text("HRA", 15, y);
  doc.text(`$${staff.hra}`, 170, y, { align: "right" });

  y += 8;
  doc.text("Medical Allowance", 15, y);
  doc.text(`$${staff.medical}`, 170, y, { align: "right" });

  y += 8;
  doc.text("Bonus", 15, y);
  doc.text(`$${staff.bonus}`, 170, y, { align: "right" });

  y += 10;
 doc.setFont("helvetica", "bold");
  doc.text("Gross Earnings", 15, y);
  doc.text(`$${gross}`, 170, y, { align: "right" });

doc.setFont("helvetica", "normal");
  doc.line(15, y + 4, 195, y + 4);

  /* ===== DEDUCTIONS ===== */
  y += 14;
  doc.setFontSize(12);
  doc.text("Deductions", 15, y);

  y += 8;
  doc.setFontSize(10);
  doc.text("Provident Fund (PF)", 15, y);
  doc.text(`-$${staff.pf}`, 170, y, { align: "right" });

  y += 8;
  doc.text("Income / Professional Tax", 15, y);
  doc.text(`-$${staff.tax}`, 170, y, { align: "right" });

  y += 10;
  doc.setFont("helvetica", "bold");
  doc.text("Total Deductions", 15, y);
  doc.text(`-$${deductions}`, 170, y, { align: "right" });

  doc.line(15, y + 4, 195, y + 4);

  /* ===== NET SALARY ===== */
  y += 14;
  doc.setFontSize(12);
  doc.text("Net Salary", 15, y);
  doc.setFontSize(14);
  doc.text(`$${staff.netSalary}`, 170, y, { align: "right" });

  /* ===== FOOTER ===== */
  doc.setFontSize(9);
  doc.text(
    "This is a system-generated payslip and does not require a signature.",
    105,
    280,
    { align: "center" }
  );

  /* ===== SAVE ===== */
  doc.save(
    `Payslip_${staff.employeeId}_${currentMonth.id}.pdf`
  );
};


  if (view === "DETAILS" && selectedStaff) {
    const gross =
      selectedStaff.basic +
      selectedStaff.hra +
      selectedStaff.medical +
      selectedStaff.bonus;

    const deductions = selectedStaff.pf + selectedStaff.tax;

    return (
      <div className="payroll-page">
        <Header title="Payslip Details" />

        <div className="salary-card highlight">
          <strong>{selectedStaff.name}</strong>
          <p>{selectedStaff.role}</p>
          <small>ID: {selectedStaff.employeeId}</small>
        </div>

        <div className="net-salary">
          <p>Net Take-Home Salary</p>
          <h1>${selectedStaff.netSalary.toLocaleString()}</h1>
          <span className="badge success">✔ Disbursed</span>
        </div>
<div className="payslip-download-wrap">
  <button
    className="payslip-download-btn"
    onClick={() => downloadPayslipPDF(selectedStaff)}
  >
    ⬇ Download Payslip (PDF)
  </button>
</div>


        <h4 className="section-title">EARNINGS</h4>
        <div className="breakdown">
          <div><span>Basic Pay</span><span>${selectedStaff.basic}</span></div>
          <div><span>HRA</span><span>${selectedStaff.hra}</span></div>
          <div><span>Medical</span><span>${selectedStaff.medical}</span></div>
          <div><span>Bonus</span><span className="pos">+${selectedStaff.bonus}</span></div>
          <div className="total">
            <strong>Total</strong>
            <strong>${gross}</strong>
          </div>
        </div>

        <h4 className="section-title">DEDUCTIONS</h4>
        <div className="breakdown">
          <div className="neg"><span>PF</span><span>-${selectedStaff.pf}</span></div>
          <div className="neg"><span>Tax</span><span>-${selectedStaff.tax}</span></div>
          <div className="total neg">
            <strong>Total</strong>
            <strong>-${deductions}</strong>
          </div>
        </div>
      </div>
    );
  }

  /* ================= OVERVIEW ================= */

  return (
    <div className="payroll-page">
      <Header title="Salary Particulars" />

      <div className="salary-card period-card">
        <div>
          <small>PAYROLL PERIOD</small>
          <h3>{currentMonth.label}</h3>
        </div>
        <select value={monthId} onChange={(e) => setMonthId(e.target.value)}>
          {PAYROLL_DATA.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="salary-card disbursement-card">
        <span className="badge success">DISBURSED</span>
        <p>Total Net Disbursement</p>
        <h1 className="amount">${totals.net.toLocaleString()}</h1>
        <div className="stats-row">
          <span>● Staff Count: {currentMonth.staff.length}</span>
          <span>● Fully Paid</span>
        </div>
      </div>

      <h4 className="section-title">EARNINGS BREAKDOWN</h4>
      <div className="breakdown">
        <div><span>Basic Salary</span><span>${totals.basic}</span></div>
        <div><span>HRA</span><span>${totals.hra}</span></div>
        <div><span>Medical</span><span>${totals.medical}</span></div>
        <div><span>Bonus</span><span>${totals.bonus}</span></div>
        <div className="total">
          <strong>Gross Earnings</strong>
          <strong>${grossEarnings}</strong>
        </div>
      </div>

      <h4 className="section-title">DEDUCTIONS</h4>
      <div className="breakdown">
        <div className="neg"><span>PF</span><span>-${totals.pf}</span></div>
        <div className="neg"><span>Tax</span><span>-${totals.tax}</span></div>
        <div className="total neg">
          <strong>Total</strong>
          <strong>-${totalDeductions}</strong>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
