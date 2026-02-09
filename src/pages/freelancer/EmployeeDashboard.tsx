import React, { useEffect, useState } from "react";
import "./EmployeeDashboard.css";
import type { Job, JobStatus } from "./employeeTypes";
import { jobsMock, employeeProfile } from "./employeeMockData";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [online, setOnline] = useState(true);
  const [activeTab, setActiveTab] =
    useState<"dashboard" | "jobs" | "earnings" | "profile" | "support">(
      "dashboard"
    );
  const [jobs, setJobs] = useState<Job[]>(jobsMock);
  const [notification, setNotification] = useState<string | null>(null);

  // 🔐 Role Guard
  useEffect(() => {
    const role = localStorage.getItem("user_role");
    if (role && role !== "employee") {
      navigate("/app/dashboard", { replace: true });
    }
  }, [navigate]);

  // Show notification
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const updateJobStatus = (id: number, status: JobStatus, reason?: string) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id
          ? {
              ...job,
              status,
              cancelReason: reason,
              completedAt:
                status === "completed"
                  ? new Date().toISOString()
                  : job.completedAt,
            }
          : job
      )
    );

    // Show appropriate notification
    if (status === "accepted") showNotification("Job accepted successfully!");
    if (status === "ongoing") showNotification("Job started!");
    if (status === "completed") showNotification("Job completed! 🎉");
    if (status === "cancelled") showNotification("Job cancelled");
  };

  const completedJobs = jobs.filter((j) => j.status === "completed");
  const activeJobs = jobs.filter((j) => j.status === "ongoing");
  const newJobs = jobs.filter((j) => j.status === "new");
  
  const todayEarnings = completedJobs.reduce((s, j) => s + j.amount, 0);
  const weeklyEarnings = todayEarnings * 4;
  const monthlyEarnings = weeklyEarnings * 4;

  const getStatusColor = (status: JobStatus) => {
    const colors = {
      new: "#3b82f6",
      accepted: "#8b5cf6",
      ongoing: "#f59e0b",
      completed: "#10b981",
      cancelled: "#ef4444",
    };
    return colors[status];
  };

  return (
    <div className="emp_app">
      {/* Notification Toast */}
      {notification && (
        <div className="emp_notification">
          <span>{notification}</span>
        </div>
      )}

      {/* HEADER */}
      <header className="emp_header">
        <div className="emp_header_content">
          <div className="emp_branding">
            <div className="emp_logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1>Swachify</h1>
              <p className="emp_subtitle">Employee Portal</p>
            </div>
          </div>
          
          <div className="emp_header_actions">
            <div className="emp_welcome">
              <p className="emp_greeting">Welcome back,</p>
              <p className="emp_name">{employeeProfile.name}</p>
            </div>
            <button
              className={`emp_status ${online ? "online" : "offline"}`}
              onClick={() => {
                setOnline(!online);
                showNotification(online ? "You are now offline" : "You are now online");
              }}
            >
              <span className="emp_status_dot"></span>
              {online ? "Online" : "Offline"}
            </button>
          </div>
        </div>
      </header>

      {/* TABS */}
      <nav className="emp_tabs">
        <div className="emp_tabs_container">
          {[
            { id: "dashboard", icon: "📊", label: "Dashboard" },
            { id: "jobs", icon: "💼", label: "Jobs", badge: newJobs.length },
            { id: "earnings", icon: "💰", label: "Earnings" },
            { id: "profile", icon: "👤", label: "Profile" },
            { id: "support", icon: "💬", label: "Support" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`emp_tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              <span className="emp_tab_icon">{tab.icon}</span>
              <span className="emp_tab_label">{tab.label}</span>
              {tab.badge && tab.badge > 0 ? (
                <span className="emp_tab_badge">{tab.badge}</span>
              ) : null}
            </button>
          ))}
        </div>
      </nav>

      {/* CONTENT */}
      <main className="emp_content">
        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="emp_dashboard">
            <div className="emp_stats_grid">
              <Stat 
                title="New Jobs" 
                value={newJobs.length} 
                icon="🔔"
                color="#3b82f6"
                trend="+2 today"
              />
              <Stat 
                title="Active Jobs" 
                value={activeJobs.length} 
                icon="⚡"
                color="#8b5cf6"
              />
              <Stat 
                title="Completed" 
                value={completedJobs.length} 
                icon="✅"
                color="#10b981"
                trend="+3 today"
              />
              <Stat 
                title="Rating" 
                value={employeeProfile.rating} 
                icon="⭐"
                color="#f59e0b"
                suffix="/5.0"
              />
            </div>

            <div className="emp_earnings_card">
              <div className="emp_earnings_header">
                <h3>Today's Earnings</h3>
                <div className="emp_earnings_amount">₹{todayEarnings}</div>
              </div>
              <div className="emp_earnings_progress">
                <div className="emp_progress_bar">
                  <div 
                    className="emp_progress_fill" 
                    style={{ width: `${Math.min((todayEarnings / 2000) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="emp_progress_text">Target: ₹2000/day</p>
              </div>
            </div>

            {newJobs.length > 0 && (
              <div className="emp_section">
                <h3 className="emp_section_title">New Job Requests</h3>
                <div className="emp_jobs_list">
                  {newJobs.slice(0, 3).map((job) => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      updateJobStatus={updateJobStatus}
                      getStatusColor={getStatusColor}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* JOBS */}
        {activeTab === "jobs" && (
          <div className="emp_jobs">
            {jobs.length === 0 ? (
              <div className="emp_empty_state">
                <div className="emp_empty_icon">📋</div>
                <h3>No jobs yet</h3>
                <p>New job requests will appear here</p>
              </div>
            ) : (
              <>
                {["new", "accepted", "ongoing", "completed", "cancelled"].map((status) => {
                  const statusJobs = jobs.filter((j) => j.status === status);
                  if (statusJobs.length === 0) return null;
                  
                  return (
                    <div key={status} className="emp_job_section">
                      <h3 className="emp_job_section_title">
                        {status.charAt(0).toUpperCase() + status.slice(1)} Jobs
                        <span className="emp_job_count">{statusJobs.length}</span>
                      </h3>
                      <div className="emp_jobs_list">
                        {statusJobs.map((job) => (
                          <JobCard 
                            key={job.id} 
                            job={job} 
                            updateJobStatus={updateJobStatus}
                            getStatusColor={getStatusColor}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}

        {/* EARNINGS */}
        {activeTab === "earnings" && (
          <div className="emp_earnings">
            <div className="emp_earnings_overview">
              <div className="emp_earnings_item">
                <div className="emp_earnings_icon" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                  📅
                </div>
                <div>
                  <p className="emp_earnings_label">Today</p>
                  <h2 className="emp_earnings_value">₹{todayEarnings}</h2>
                </div>
              </div>

              <div className="emp_earnings_item">
                <div className="emp_earnings_icon" style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}>
                  📊
                </div>
                <div>
                  <p className="emp_earnings_label">This Week</p>
                  <h2 className="emp_earnings_value">₹{weeklyEarnings}</h2>
                </div>
              </div>

              <div className="emp_earnings_item">
                <div className="emp_earnings_icon" style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}>
                  📈
                </div>
                <div>
                  <p className="emp_earnings_label">This Month</p>
                  <h2 className="emp_earnings_value">₹{monthlyEarnings}</h2>
                </div>
              </div>

              <div className="emp_earnings_item">
                <div className="emp_earnings_icon" style={{ background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" }}>
                  🎁
                </div>
                <div>
                  <p className="emp_earnings_label">Incentives</p>
                  <h2 className="emp_earnings_value">₹{employeeProfile.incentives}</h2>
                </div>
              </div>
            </div>

            <div className="emp_earnings_breakdown">
              <h3>Earnings Breakdown</h3>
              <div className="emp_breakdown_list">
                {completedJobs.map((job) => (
                  <div key={job.id} className="emp_breakdown_item">
                    <div>
                      <p className="emp_breakdown_service">{job.service}</p>
                      <p className="emp_breakdown_customer">{job.customer}</p>
                    </div>
                    <div className="emp_breakdown_amount">₹{job.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROFILE */}
        {activeTab === "profile" && (
          <div className="emp_profile">
            <div className="emp_profile_card">
              <div className="emp_profile_header">
                <div className="emp_profile_avatar">
                  {employeeProfile.name.charAt(0).toUpperCase()}
                </div>
                <div className="emp_profile_info">
                  <h2>{employeeProfile.name}</h2>
                  <p className="emp_profile_role">Service Professional</p>
                  {employeeProfile.verified && (
                    <span className="emp_verified_badge">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Verified
                    </span>
                  )}
                </div>
              </div>

              <div className="emp_profile_details">
                <div className="emp_profile_detail">
                  <span className="emp_detail_icon">📱</span>
                  <div>
                    <p className="emp_detail_label">Phone</p>
                    <p className="emp_detail_value">{employeeProfile.phone}</p>
                  </div>
                </div>

                <div className="emp_profile_detail">
                  <span className="emp_detail_icon">⭐</span>
                  <div>
                    <p className="emp_detail_label">Rating</p>
                    <p className="emp_detail_value">{employeeProfile.rating} / 5.0</p>
                  </div>
                </div>

                <div className="emp_profile_detail">
                  <span className="emp_detail_icon">✅</span>
                  <div>
                    <p className="emp_detail_label">Jobs Completed</p>
                    <p className="emp_detail_value">{completedJobs.length} jobs</p>
                  </div>
                </div>
              </div>

              <button className="emp_profile_edit">Edit Profile</button>
            </div>
          </div>
        )}

        {/* SUPPORT */}
        {activeTab === "support" && (
          <div className="emp_support">
            <div className="emp_support_card">
              <div className="emp_support_icon">💬</div>
              <h2>Need Help?</h2>
              <p>We're here to assist you with any questions or concerns</p>

              <div className="emp_support_options">
                <div className="emp_support_option">
                  <span className="emp_support_option_icon">📧</span>
                  <div>
                    <p className="emp_support_option_label">Email</p>
                    <p className="emp_support_option_value">support@swachify.in</p>
                  </div>
                </div>

                <div className="emp_support_option">
                  <span className="emp_support_option_icon">📞</span>
                  <div>
                    <p className="emp_support_option_label">Phone</p>
                    <p className="emp_support_option_value">+91 9000000000</p>
                  </div>
                </div>
              </div>

              <button className="emp_support_button">Raise Support Ticket</button>
            </div>

            <div className="emp_faq">
              <h3>Frequently Asked Questions</h3>
              <div className="emp_faq_list">
                <details className="emp_faq_item">
                  <summary>How do I accept a job?</summary>
                  <p>Click on the "Accept" button on any new job request in the Jobs tab.</p>
                </details>
                <details className="emp_faq_item">
                  <summary>When do I receive my earnings?</summary>
                  <p>Earnings are processed weekly and deposited to your registered bank account.</p>
                </details>
                <details className="emp_faq_item">
                  <summary>How can I improve my rating?</summary>
                  <p>Complete jobs on time, maintain quality service, and communicate well with customers.</p>
                </details>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const Stat = ({ title, value, icon, color, trend, suffix }: any) => (
  <div className="emp_stat" style={{ borderTop: `3px solid ${color}` }}>
    <div className="emp_stat_header">
      <span className="emp_stat_icon">{icon}</span>
      <p className="emp_stat_title">{title}</p>
    </div>
    <h2 className="emp_stat_value">
      {value}
      {suffix && <span className="emp_stat_suffix">{suffix}</span>}
    </h2>
    {trend && <p className="emp_stat_trend">{trend}</p>}
  </div>
);

const JobCard = ({ job, updateJobStatus, getStatusColor }: any) => (
  <div className="emp_job_card">
    <div className="emp_job_header">
      <h4 className="emp_job_service">{job.service}</h4>
      <span 
        className="emp_job_status" 
        style={{ backgroundColor: `${getStatusColor(job.status)}20`, color: getStatusColor(job.status) }}
      >
        {job.status}
      </span>
    </div>

    <div className="emp_job_details">
      <div className="emp_job_detail">
        <span className="emp_job_detail_icon">👤</span>
        <span>{job.customer}</span>
      </div>
      <div className="emp_job_detail">
        <span className="emp_job_detail_icon">📍</span>
        <span>{job.address}</span>
      </div>
      <div className="emp_job_detail">
        <span className="emp_job_detail_icon">📞</span>
        <span>{job.phone}</span>
      </div>
    </div>

    <div className="emp_job_footer">
      <div className="emp_job_amount">₹{job.amount}</div>
      
      <div className="emp_job_actions">
        {job.status === "new" && (
          <>
            <button
              className="emp_btn emp_btn_primary"
              onClick={() => updateJobStatus(job.id, "accepted")}
            >
              Accept
            </button>
            <button
              className="emp_btn emp_btn_secondary"
              onClick={() => updateJobStatus(job.id, "cancelled", "Busy")}
            >
              Reject
            </button>
          </>
        )}

        {job.status === "accepted" && (
          <button
            className="emp_btn emp_btn_primary"
            onClick={() => updateJobStatus(job.id, "ongoing")}
          >
            Start Job
          </button>
        )}

        {job.status === "ongoing" && (
          <button
            className="emp_btn emp_btn_success"
            onClick={() => updateJobStatus(job.id, "completed")}
          >
            Complete Job
          </button>
        )}

        {job.status === "completed" && (
          <span className="emp_job_badge emp_badge_success">
            ✓ Completed
          </span>
        )}

        {job.status === "cancelled" && (
          <span className="emp_job_badge emp_badge_error">
            ✕ Cancelled ({job.cancelReason})
          </span>
        )}
      </div>
    </div>
  </div>
);

export default EmployeeDashboard;