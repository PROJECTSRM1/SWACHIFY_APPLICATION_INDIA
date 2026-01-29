import React from "react";
import "./EducationPartnerDashboard.css";
import {
  MdGroups,
  MdWork,
  MdSchool,
  MdDescription,
  MdAccountBalance,
} from "react-icons/md";

const EducationPartnerDashboard: React.FC = () => {
  return (
    <div className="epd-container">
      {/* HEADER */}
      <div className="epd-header">
        <div>
          <h2>Partner Dashboard</h2>
          <p>Education Overview</p>
        </div>

        <div className="epd-header-icon">
          <MdSchool size={22} />
        </div>
      </div>

      {/* STATS */}
      <div className="epd-stats">
        <StatCard
          icon={<MdGroups />}
          value="2,310"
          label="Total Students"
          color="blue"
        />
        <StatCard
          icon={<MdWork />}
          value="64"
          label="Active Internships"
          color="orange"
        />
      </div>

      {/* STUDENTS BY BRANCH */}
      <div className="epd-section-header">
        <span>STUDENTS BY BRANCH</span>
        <a>View All</a>
      </div>

      <div className="epd-branches">
        <BranchCard title="CS & IT" value="840" percent={70} />
        <BranchCard title="Mechanical" value="520" percent={55} />
        <BranchCard title="Electronics" value="410" percent={48} />
      </div>

      {/* INTERNSHIPS */}
      <div className="epd-section-header">
        <span>INTERNSHIP TRACKING</span>
        <span className="epd-active-badge">ACTIVE</span>
      </div>

      <InternshipCard
        company="BizSolutions"
        role="Software Dev Intern • 3 Months"
        status="In-progress"
        statusColor="green"
        student="Rahul Sharma"
        type="Paid Internship"
      />

      <InternshipCard
        company="CreativeFlow"
        role="UI/UX Designer • 6 Months"
        status="Completed"
        statusColor="blue"
        student="Anjali Verma"
        type="Unpaid"
      />

      {/* PARTNER CARD */}
      <div className="epd-partner-card">
        <div className="epd-partner-header">
          <div className="epd-partner-icon">
            <MdAccountBalance size={20} />
          </div>
          <div>
            <h4>ABC Engineering College</h4>
            <span className="epd-premium">Premium Partner</span>
          </div>
        </div>

        <div className="epd-partner-stats">
          <div>
            <strong>85%</strong>
            <p>Placement Rate</p>
          </div>
          <div>
            <strong>5,200+</strong>
            <p>Alumni Network</p>
          </div>
        </div>

        <button className="epd-report-btn">
          <MdDescription />
          View Detailed Report
        </button>
      </div>

      {/* BOTTOM NAV (Mobile Feel) */}
      <div className="epd-bottom-nav">
        <MdSchool className="active" />
        <MdGroups />
        <MdWork />
        <MdAccountBalance />
      </div>
    </div>
  );
};

/* ================= SUB COMPONENTS ================= */

const StatCard = ({ icon, value, label, color }: any) => (
  <div className="epd-stat-card">
    <div className={`epd-stat-icon ${color}`}>{icon}</div>
    <h3>{value}</h3>
    <p>{label}</p>
  </div>
);

const BranchCard = ({ title, value, percent }: any) => (
  <div className="epd-branch-card">
    <span>{title}</span>
    <h3>{value}</h3>
    <div className="epd-progress">
      <div style={{ width: `${percent}%` }} />
    </div>
  </div>
);

const InternshipCard = ({
  company,
  role,
  status,
  statusColor,
  student,
  type,
}: any) => (
  <div className="epd-internship-card">
    <div className="epd-internship-header">
      <strong>{company}</strong>
      <span className={`epd-status ${statusColor}`}>{status}</span>
    </div>
    <p>{role}</p>

    <div className="epd-internship-footer">
      <div>
        <label>STUDENT NAME</label>
        <span>{student}</span>
      </div>
      <div>
        <label>TYPE</label>
        <span className="epd-type">{type}</span>
      </div>
    </div>
  </div>
);

export default EducationPartnerDashboard;
