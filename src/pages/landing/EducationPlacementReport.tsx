import React from "react";
import "./EducationPlacementReport.css";
import {
  MdArrowBack,
  MdAccountBalance,
  MdDownload,
} from "react-icons/md";

interface Props {
  onBack: () => void;
}

const EducationPlacementReport: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="epr2-page">
      {/* HEADER */}
      <header className="epr2-header">
        <div className="epr2-header-left">
          <button onClick={onBack} className="epr2-back-btn">
            <MdArrowBack size={18} />
          </button>

          <div className="epr2-college">
            <div className="epr2-college-icon">
              <MdAccountBalance size={18} />
            </div>
            <div>
              <h3 className="epr2-college-name">
                ABC Engineering College
              </h3>
              <span className="epr2-premium">
                Premium Partner
              </span>
            </div>
          </div>
        </div>

        <div className="epr2-year-chip">AY 2023–24</div>
      </header>

      {/* KPI */}
      <section className="epr2-kpi-grid">
        <div className="epr2-kpi-card">
          <span className="epr2-kpi-label">Placement Rate</span>
          <strong className="epr2-kpi-value">85%</strong>
          <p className="epr2-kpi-positive">↑ 12% YoY</p>
        </div>

        <div className="epr2-kpi-card">
          <span className="epr2-kpi-label">Eligible Students</span>
          <strong className="epr2-kpi-value">1,350</strong>
          <p className="epr2-kpi-sub">Final year</p>
        </div>

        <div className="epr2-kpi-card">
          <span className="epr2-kpi-label">Average Package</span>
          <strong className="epr2-kpi-value">₹11.2 LPA</strong>
          <p className="epr2-kpi-sub">Across departments</p>
        </div>
      </section>

     {/* TREND + DEPARTMENTS (SIDE BY SIDE) */}
<section className="epr2-dual-grid">

  {/* LEFT – TREND */}
  <div className="epr2-card">
    <div className="epr2-card-header">
      <div>
        <h4 className="epr2-card-title">Overall Placement Trend</h4>
        <p className="epr2-card-sub">Monthly student hires vs targets</p>
      </div>

      <div className="epr2-trend-metric">
        <span className="epr2-trend-value">85%</span>
        <span className="epr2-trend-growth">↑ 12%</span>
      </div>
    </div>

    <div className="epr2-chart">
<svg viewBox="0 0 300 120" preserveAspectRatio="none">
  <path
    d="
      M10 78
      C 60 70, 120 58, 170 60
      C 220 62, 260 72, 290 74
    "
    fill="none"
    stroke="#2563eb"
    strokeWidth="3"
    strokeLinecap="round"
  />
</svg>
    </div>

    <div className="epr2-chart-labels">
      {["Jan", "Mar", "May", "Jul", "Sep"].map(m => (
        <span key={m}>{m}</span>
      ))}
    </div>
  </div>

  {/* RIGHT – DEPARTMENTS */}
  <div className="epr2-card">
    <h4 className="epr2-card-title">Placements by Department</h4>

    <Dept label="Computer Science & IT" value="420 / 500" percent={84} />
    <Dept label="Mechanical" value="280 / 450" percent={62} />
    <Dept label="Electronics" value="310 / 400" percent={78} />
  </div>

</section>


      {/* RECENT */}
      <section className="epr2-recent">
        <div className="epr2-recent-header">
          <h4>Recent Placements</h4>
          <span>View all</span>
        </div>

        <Placement
          name="Rahul Sharma"
          company="Google · SDE-1"
          ctc="₹24.5 LPA"
          type="Full-time"
          color="blue"
        />

        <Placement
          name="Anjali Verma"
          company="Microsoft · UX Design"
          ctc="₹18.2 LPA"
          type="Full-time"
          color="orange"
        />

        <Placement
          name="Vikram Singh"
          company="Amazon · Operations"
          ctc="₹14.0 LPA"
          type="Internship"
          color="red"
        />
      </section>

      {/* DOWNLOAD */}
      <button className="epr2-download">
        <MdDownload size={18} />
        Download PDF Report
      </button>
    </div>
  );
};

/* ---------- SUB COMPONENTS ---------- */

const Dept = ({ label, value, percent }: any) => (
  <div className="epr2-dept">
    <div className="epr2-dept-header">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
    <div className="epr2-dept-bar">
      <div style={{ width: `${percent}%` }} />
    </div>
  </div>
);

const Placement = ({ name, company, ctc, type, color }: any) => (
  <div className="epr2-placement">
    <div className="epr2-placement-left">
      <div className={`epr2-avatar epr2-${color}`}>
        {name[0]}
      </div>
      <div>
        <strong>{name}</strong>
        <p>{company}</p>
      </div>
    </div>

    <div className="epr2-placement-right">
      <span className="epr2-ctc">{ctc}</span>
      <span className="epr2-job-type">{type}</span>
    </div>
  </div>
);

export default EducationPlacementReport;