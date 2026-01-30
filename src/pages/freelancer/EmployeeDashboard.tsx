import React, { useEffect, useState } from "react";
import "./EmployeeDashboard.css";
import { jobsMock, employeeProfile, type Job,  type JobStatus } from "./employeeMockData";

const EmployeeDashboard: React.FC = () => {
  const [online, setOnline] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "jobs" | "earnings" | "profile" | "support"
  >("dashboard");

  const [jobs, setJobs] = useState<Job[]>(jobsMock);

  const updateJobStatus = (id: number, status: JobStatus) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status } : job))
    );
  };

  const completedJobs = jobs.filter((j) => j.status === "completed");
  const todayEarnings = completedJobs.reduce(
    (sum, j) => sum + j.amount,
    0
  );
  useEffect(() => {
  const role = localStorage.getItem("user_role");

  if (role !== "employee") {
    window.location.href = "/app/dashboard";
  }
}, []);
    

  return (
    <div className="emp_app">
      {/* HEADER */}
      <header className="emp_header">
        <h2>Swachify Employee</h2>
        <button
          className={`emp_status ${online ? "online" : "offline"}`}
          onClick={() => setOnline(!online)}
        >
          {online ? "ONLINE" : "OFFLINE"}
        </button>
      </header>

      {/* TABS */}
      <nav className="emp_tabs">
        {["dashboard", "jobs", "earnings", "profile", "support"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </nav>

      {/* CONTENT */}
      <main className="emp_content">
        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="emp_grid">
            <Stat title="Jobs Today" value={jobs.length} />
            <Stat title="Completed" value={completedJobs.length} />
            <Stat title="Rating" value={`${employeeProfile.rating} ⭐`} />
            <Stat title="Earnings" value={`₹${todayEarnings}`} />
          </div>
        )}

        {/* JOBS */}
        {activeTab === "jobs" &&
          jobs.map((job) => (
            <div key={job.id} className="emp_card">
              <h3>{job.service}</h3>
              <p className="muted">{job.customer}</p>
              <p className="muted">{job.address}</p>
              <strong>₹{job.amount}</strong>

              <div className="emp_actions">
                {job.status === "new" && (
                  <button
                    onClick={() => updateJobStatus(job.id, "ongoing")}
                  >
                    Accept
                  </button>
                )}

                {job.status === "ongoing" && (
                  <button
                    onClick={() => updateJobStatus(job.id, "completed")}
                  >
                    Complete
                  </button>
                )}

                {job.status === "completed" && (
                  <span className="done">COMPLETED</span>
                )}
              </div>
            </div>
          ))}

        {/* EARNINGS */}
        {activeTab === "earnings" && (
          <div className="emp_card">
            <h3>Earnings</h3>
            <p>Today: ₹{todayEarnings}</p>
            <p>This Month: ₹32,450</p>
          </div>
        )}

        {/* PROFILE */}
        {activeTab === "profile" && (
          <div className="emp_card">
            <h3>Profile</h3>
            <p>Name: {employeeProfile.name}</p>
            <p>Phone: {employeeProfile.phone}</p>
            <p>
              Status:{" "}
              {employeeProfile.verified ? "Verified ✔️" : "Pending"}
            </p>
          </div>
        )}

        {/* SUPPORT */}
        {activeTab === "support" && (
          <div className="emp_card">
            <h3>Support</h3>
            <p>Email: support@swachify.in</p>
            <p>Phone: +91 9XXXXXXXXX</p>
          </div>
        )}
      </main>
    </div>
  );
};

const Stat = ({ title, value }: any) => (
  <div className="emp_stat">
    <p>{title}</p>
    <h2>{value}</h2>
  </div>
);

export default EmployeeDashboard;
