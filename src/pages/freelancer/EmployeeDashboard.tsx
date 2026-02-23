import React, { useEffect, useState, useCallback } from "react";
import "./EmployeeDashboard.css";
import type {
  Job,
  JobStatus,
  Transaction,
  Notification,
  SupportTicket,
  ChatMessage,
  Incentive,
  WithdrawalRequest,
  Settings,
  EmployeeProfile,
} from "./employeeTypes";
import {
  jobsMock,
  employeeProfile as initialProfile,
  transactionsMock,
  notificationsMock,
  supportTicketsMock,
  chatMessagesMock,
  incentivesMock,
  withdrawalsMock,
  defaultSettings,
} from "./employeeMockData";
import { useNavigate } from "react-router-dom";

// Import sub-components
import JobCard from "./JobCard";
import {
  StatCard,
  EarningsCard,
  NotificationCenter,
  JobDetailsModal,
  ChatInterface,
  ProfileEditor,
  SupportTickets,
  IncentivesPanel,
  WithdrawalManager,
} from "./AllComponents";
import {
  SettingsPanel,
  EarningsAnalytics,
  DocumentManager,
  AvailabilityManager,
} from "./SpecializedComponents";

type TabType = "dashboard" | "jobs" | "earnings" | "profile" | "support" | "notifications" | "chat" | "analytics" | "settings";

const EmployeeDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Core State
  const [online, setOnline] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [jobs, setJobs] = useState<Job[]>(jobsMock);
  const [employeeProfile, setEmployeeProfile] = useState<EmployeeProfile>(initialProfile);
  const [transactions, setTransactions] = useState<Transaction[]>(transactionsMock);
  const [notifications, setNotifications] = useState<Notification[]>(notificationsMock);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(supportTicketsMock);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(chatMessagesMock);
  const [incentives] = useState<Incentive[]>(incentivesMock);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(withdrawalsMock);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  // UI State
  const [notification, setNotification] = useState<string | null>(null);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedChatJobId, setSelectedChatJobId] = useState<number | null>(null);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  // Filters
  const [jobSearchQuery, setJobSearchQuery] = useState("");
  const [jobStatusFilter, setJobStatusFilter] = useState<JobStatus | "all">("all");
  const [dateFilter, setDateFilter] = useState<"today" | "week" | "month" | "all">("all");

  // 🔐 Role Guard
  useEffect(() => {
    const role = localStorage.getItem("user_role");
    if (role && role !== "employee") {
      navigate("/app/dashboard", { replace: true });
    }
  }, [navigate]);

  // 🔔 Simulate real-time notifications
  useEffect(() => {
    if (!online) return;

    const interval = setInterval(() => {
      // Simulate new job notification every 5 minutes
      if (Math.random() > 0.7) {
        const newNotif: Notification = {
          id: Date.now(),
          type: "job",
          title: "New Job Available",
          message: "A new cleaning job is available nearby",
          read: false,
          timestamp: new Date().toISOString(),
        };
        setNotifications((prev) => [newNotif, ...prev]);
        if (settings.notifications.soundEnabled) {
          playNotificationSound();
        }
        showNotification("🔔 New job available!");
      }
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [online, settings.notifications.soundEnabled]);

  // 💾 Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem("employee_data", JSON.stringify({
      jobs,
      profile: employeeProfile,
      transactions,
      settings,
    }));
  }, [jobs, employeeProfile, transactions, settings]);

  // 🌐 Offline mode detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOfflineMode(false);
      showNotification("✅ Back online");
    };
    const handleOffline = () => {
      setIsOfflineMode(true);
      showNotification("⚠️ You are offline");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Notification helper
  const showNotification = useCallback((message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const playNotificationSound = () => {
    // In a real app, play actual sound
    console.log("🔊 Playing notification sound");
  };

  // Job Management
  const updateJobStatus = useCallback((id: number, status: JobStatus, reason?: string) => {
    const now = new Date().toISOString();
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id
          ? {
              ...job,
              status,
              cancelReason: reason,
              completedAt: status === "completed" ? now : job.completedAt,
              acceptedAt: status === "accepted" ? now : job.acceptedAt,
              startedAt: status === "ongoing" ? now : job.startedAt,
            }
          : job
      )
    );

    // Create transaction for completed jobs
    if (status === "completed") {
      const job = jobs.find((j) => j.id === id);
      if (job) {
        const newTransaction: Transaction = {
          id: Date.now(),
          type: "earning",
          amount: job.amount,
          status: "pending",
          date: now,
          jobId: id,
          description: `${job.service} - ${job.customer}`,
          referenceNumber: `TXN${Date.now()}`,
        };
        setTransactions((prev) => [newTransaction, ...prev]);
      }
    }

    // Show appropriate notification
    const messages = {
      accepted: "Job accepted successfully!",
      ongoing: "Job started! Good luck! 💪",
      completed: "Job completed! Well done! 🎉",
      cancelled: "Job cancelled",
    };
    if (status in messages) {
      showNotification(messages[status as keyof typeof messages]);
    }
  }, [jobs, showNotification]);

  const openJobDetails = useCallback((job: Job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  }, []);

  const openChat = useCallback((jobId: number) => {
    setSelectedChatJobId(jobId);
    setShowChatModal(true);
  }, []);

  // Notifications
  const markNotificationAsRead = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  // Profile Management
  const updateProfile = useCallback((updates: Partial<EmployeeProfile>) => {
    setEmployeeProfile((prev) => ({ ...prev, ...updates }));
    showNotification("✅ Profile updated successfully");
  }, [showNotification]);

  // Withdrawal
  const requestWithdrawal = useCallback((amount: number) => {
    const newWithdrawal: WithdrawalRequest = {
      id: Date.now(),
      amount,
      status: "pending",
      requestedAt: new Date().toISOString(),
      accountDetails: `${employeeProfile.bankAccount?.bankName} - ****${employeeProfile.bankAccount?.accountNumber.slice(-4)}`,
      referenceNumber: `WDR${Date.now()}`,
    };
    setWithdrawals((prev) => [newWithdrawal, ...prev]);
    showNotification(`💰 Withdrawal request of ₹${amount} submitted`);
  }, [employeeProfile.bankAccount, showNotification]);

  // Settings
  const updateSettings = useCallback((updates: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    showNotification("⚙️ Settings updated");
  }, [showNotification]);

  // Logout
  const handleLogout = useCallback(() => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user_role");
      localStorage.removeItem("employee_data");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // Computed values
  const filteredJobs = jobs.filter((job) => {
    // Search filter
    if (jobSearchQuery) {
      const query = jobSearchQuery.toLowerCase();
      if (
        !job.service.toLowerCase().includes(query) &&
        !job.customer.toLowerCase().includes(query) &&
        !job.address.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Status filter
    if (jobStatusFilter !== "all" && job.status !== jobStatusFilter) {
      return false;
    }

    // Date filter
    if (dateFilter !== "all") {
      const jobDate = new Date(job.scheduledDate);
      const today = new Date();
      const diffDays = Math.floor((today.getTime() - jobDate.getTime()) / (1000 * 60 * 60 * 24));

      if (dateFilter === "today" && diffDays !== 0) return false;
      if (dateFilter === "week" && diffDays > 7) return false;
      if (dateFilter === "month" && diffDays > 30) return false;
    }

    return true;
  });

  const completedJobs = jobs.filter((j) => j.status === "completed");
  const activeJobs = jobs.filter((j) => j.status === "ongoing");
  const newJobs = jobs.filter((j) => j.status === "new");
  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const unreadMessages = chatMessages.filter((m) => !m.read && m.senderId !== employeeProfile.id).length;

  const todayEarnings = completedJobs
    .filter((j) => {
      const jobDate = new Date(j.completedAt || "");
      const today = new Date();
      return jobDate.toDateString() === today.toDateString();
    })
    .reduce((sum, j) => sum + j.amount + (j.tip || 0), 0);

  const weeklyEarnings = transactions
    .filter((t) => {
      const txDate = new Date(t.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return txDate >= weekAgo && t.type !== "withdrawal";
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyEarnings = transactions
    .filter((t) => {
      const txDate = new Date(t.date);
      const monthAgo = new Date();
      monthAgo.setDate(monthAgo.getDate() - 30);
      return txDate >= monthAgo && t.type !== "withdrawal";
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = transactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

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
    <div className={`emp_app ${settings.theme === "dark" ? "dark_theme" : ""}`}>
      {/* Notification Toast */}
      {notification && (
        <div className="emp_notification">
          <span>{notification}</span>
        </div>
      )}

      {/* Offline Banner */}
      {isOfflineMode && (
        <div className="emp_offline_banner">
          <span>⚠️ You are offline. Some features may be limited.</span>
        </div>
      )}

      {/* HEADER */}
      <header className="emp_header">
        <div className="emp_header_content">
          <div className="emp_branding">
            <div className="emp_logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h1>Swachify</h1>
              <p className="emp_subtitle">Employee Portal</p>
            </div>
          </div>

          <div className="emp_header_actions">
            <button
              className="emp_icon_btn"
              onClick={() => setShowNotificationCenter(!showNotificationCenter)}
              aria-label="Notifications"
            >
              <span className="emp_icon">🔔</span>
              {unreadNotifications > 0 && (
                <span className="emp_badge">{unreadNotifications}</span>
              )}
            </button>

            <button
              className="emp_icon_btn"
              onClick={() => {
                setActiveTab("chat");
              }}
              aria-label="Messages"
            >
              <span className="emp_icon">💬</span>
              {unreadMessages > 0 && (
                <span className="emp_badge">{unreadMessages}</span>
              )}
            </button>

            <div className="emp_welcome">
              <p className="emp_greeting">Welcome back,</p>
              <p className="emp_name">{employeeProfile.name}</p>
            </div>

            <button
              className={`emp_status ${online ? "online" : "offline"}`}
              onClick={() => {
                setOnline(!online);
                showNotification(
                  online ? "You are now offline" : "You are now online"
                );
              }}
            >
              <span className="emp_status_dot"></span>
              {online ? "Online" : "Offline"}
            </button>

            <button
              className="emp_icon_btn"
              onClick={handleLogout}
              aria-label="Logout"
              title="Logout"
            >
              <span className="emp_icon">🚪</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notification Center Dropdown */}
      {showNotificationCenter && (
        <NotificationCenter
          notifications={notifications}
          onClose={() => setShowNotificationCenter(false)}
          onMarkAsRead={markNotificationAsRead}
          onMarkAllAsRead={markAllNotificationsAsRead}
          onNotificationClick={(notif) => {
            if (notif.jobId) {
              const job = jobs.find((j) => j.id === notif.jobId);
              if (job) openJobDetails(job);
            }
            markNotificationAsRead(notif.id);
          }}
        />
      )}

      {/* TABS */}
      <nav className="emp_tabs">
        <div className="emp_tabs_container">
          {[
            { id: "dashboard", icon: "📊", label: "Dashboard" },
            { id: "jobs", icon: "💼", label: "Jobs", badge: newJobs.length },
            { id: "earnings", icon: "💰", label: "Earnings" },
            { id: "analytics", icon: "📈", label: "Analytics" },
            { id: "profile", icon: "👤", label: "Profile" },
            { id: "chat", icon: "💬", label: "Messages", badge: unreadMessages },
            { id: "support", icon: "🎧", label: "Support" },
            { id: "settings", icon: "⚙️", label: "Settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`emp_tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id as TabType)}
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

      {/* MAIN CONTENT */}
      <main className="emp_content">
        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="emp_dashboard">
            <div className="emp_stats_grid">
              <StatCard
                title="New Jobs"
                value={newJobs.length}
                icon="🔔"
                color="#3b82f6"
                trend="+2 today"
              />
              <StatCard
                title="Active Jobs"
                value={activeJobs.length}
                icon="⚡"
                color="#8b5cf6"
              />
              <StatCard
                title="Completed"
                value={completedJobs.length}
                icon="✅"
                color="#10b981"
                trend="+3 today"
              />
              <StatCard
                title="Rating"
                value={employeeProfile.rating}
                icon="⭐"
                color="#f59e0b"
                suffix="/5.0"
              />
            </div>

            <EarningsCard
              todayEarnings={todayEarnings}
              target={2000}
              balance={totalBalance}
            />

            {activeJobs.length > 0 && (
              <div className="emp_section">
                <h3 className="emp_section_title">
                  Active Jobs
                  <span className="emp_badge_pill">{activeJobs.length}</span>
                </h3>
                <div className="emp_jobs_list">
                  {activeJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      updateJobStatus={updateJobStatus}
                      getStatusColor={getStatusColor}
                      onViewDetails={openJobDetails}
                      onOpenChat={openChat}
                    />
                  ))}
                </div>
              </div>
            )}

            {newJobs.length > 0 && (
              <div className="emp_section">
                <h3 className="emp_section_title">
                  New Job Requests
                  <span className="emp_badge_pill">{newJobs.length}</span>
                </h3>
                <div className="emp_jobs_list">
                  {newJobs.slice(0, 3).map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      updateJobStatus={updateJobStatus}
                      getStatusColor={getStatusColor}
                      onViewDetails={openJobDetails}
                      onOpenChat={openChat}
                    />
                  ))}
                </div>
                {newJobs.length > 3 && (
                  <button
                    className="emp_btn emp_btn_text"
                    onClick={() => setActiveTab("jobs")}
                  >
                    View all {newJobs.length} new jobs →
                  </button>
                )}
              </div>
            )}

            {/* Quick Actions */}
            <div className="emp_section">
              <h3 className="emp_section_title">Quick Actions</h3>
              <div className="emp_quick_actions">
                <button
                  className="emp_quick_action"
                  onClick={() => setActiveTab("earnings")}
                >
                  <span className="emp_quick_action_icon">💰</span>
                  <span>View Earnings</span>
                </button>
                <button
                  className="emp_quick_action"
                  onClick={() => setShowProfileEditor(true)}
                >
                  <span className="emp_quick_action_icon">👤</span>
                  <span>Edit Profile</span>
                </button>
                <button
                  className="emp_quick_action"
                  onClick={() => setActiveTab("support")}
                >
                  <span className="emp_quick_action_icon">🎧</span>
                  <span>Get Support</span>
                </button>
                <button
                  className="emp_quick_action"
                  onClick={() => setActiveTab("settings")}
                >
                  <span className="emp_quick_action_icon">⚙️</span>
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* JOBS TAB */}
        {activeTab === "jobs" && (
          <div className="emp_jobs">
            {/* Search and Filters */}
            <div className="emp_filters">
              <div className="emp_search_box">
                <span className="emp_search_icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search jobs, customers, locations..."
                  value={jobSearchQuery}
                  onChange={(e) => setJobSearchQuery(e.target.value)}
                  className="emp_search_input"
                />
                {jobSearchQuery && (
                  <button
                    className="emp_clear_btn"
                    onClick={() => setJobSearchQuery("")}
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="emp_filter_group">
                <select
                  value={jobStatusFilter}
                  onChange={(e) => setJobStatusFilter(e.target.value as any)}
                  className="emp_filter_select"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="accepted">Accepted</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value as any)}
                  className="emp_filter_select"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>

            {/* Jobs List */}
            {filteredJobs.length === 0 ? (
              <div className="emp_empty_state">
                <div className="emp_empty_icon">📋</div>
                <h3>No jobs found</h3>
                <p>
                  {jobSearchQuery || jobStatusFilter !== "all" || dateFilter !== "all"
                    ? "Try adjusting your filters"
                    : "New job requests will appear here"}
                </p>
              </div>
            ) : (
              <>
                {["new", "accepted", "ongoing", "completed", "cancelled"].map(
                  (status) => {
                    const statusJobs = filteredJobs.filter(
                      (j) => j.status === status
                    );
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
                              onViewDetails={openJobDetails}
                              onOpenChat={openChat}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  }
                )}
              </>
            )}
          </div>
        )}

        {/* EARNINGS TAB */}
        {activeTab === "earnings" && (
          <div className="emp_earnings">
            <div className="emp_earnings_overview">
              <div className="emp_earnings_item">
                <div
                  className="emp_earnings_icon"
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  📅
                </div>
                <div>
                  <p className="emp_earnings_label">Today</p>
                  <h2 className="emp_earnings_value">₹{todayEarnings}</h2>
                </div>
              </div>

              <div className="emp_earnings_item">
                <div
                  className="emp_earnings_icon"
                  style={{
                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  }}
                >
                  📊
                </div>
                <div>
                  <p className="emp_earnings_label">This Week</p>
                  <h2 className="emp_earnings_value">₹{weeklyEarnings}</h2>
                </div>
              </div>

              <div className="emp_earnings_item">
                <div
                  className="emp_earnings_icon"
                  style={{
                    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  }}
                >
                  📈
                </div>
                <div>
                  <p className="emp_earnings_label">This Month</p>
                  <h2 className="emp_earnings_value">₹{monthlyEarnings}</h2>
                </div>
              </div>

              <div className="emp_earnings_item">
                <div
                  className="emp_earnings_icon"
                  style={{
                    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                  }}
                >
                  💵
                </div>
                <div>
                  <p className="emp_earnings_label">Available Balance</p>
                  <h2 className="emp_earnings_value">₹{totalBalance}</h2>
                  <button
                    className="emp_withdraw_btn"
                    onClick={() => {
                      const amount = prompt("Enter withdrawal amount:");
                      if (amount && !isNaN(Number(amount))) {
                        requestWithdrawal(Number(amount));
                      }
                    }}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>

            {/* Incentives */}
            <IncentivesPanel
              incentives={incentives}
              totalIncentives={employeeProfile.incentives}
            />

            {/* Withdrawal History */}
            <WithdrawalManager
              withdrawals={withdrawals}
              onRequestWithdrawal={requestWithdrawal}
            />

            {/* Transaction History */}
            <div className="emp_transactions_section">
              <h3>Transaction History</h3>
              <div className="emp_transactions_list">
                {transactions.slice(0, 20).map((transaction) => (
                  <div key={transaction.id} className="emp_transaction_item">
                    <div className="emp_transaction_icon">
                      {transaction.type === "earning" && "💰"}
                      {transaction.type === "withdrawal" && "🏦"}
                      {transaction.type === "bonus" && "🎁"}
                      {transaction.type === "tip" && "⭐"}
                      {transaction.type === "penalty" && "⚠️"}
                    </div>
                    <div className="emp_transaction_details">
                      <p className="emp_transaction_desc">{transaction.description}</p>
                      <p className="emp_transaction_date">
                        {new Date(transaction.date).toLocaleDateString()} •{" "}
                        {transaction.referenceNumber}
                      </p>
                    </div>
                    <div className="emp_transaction_amount">
                      <span
                        className={
                          transaction.amount >= 0
                            ? "emp_amount_positive"
                            : "emp_amount_negative"
                        }
                      >
                        {transaction.amount >= 0 ? "+" : ""}₹{Math.abs(transaction.amount)}
                      </span>
                      <span
                        className={`emp_status_badge emp_status_${transaction.status}`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === "analytics" && (
          <EarningsAnalytics
            jobs={jobs}
            transactions={transactions}
            employeeProfile={employeeProfile}
          />
        )}

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div className="emp_profile">
            <div className="emp_profile_card">
              <div className="emp_profile_header">
                <div className="emp_profile_avatar">
                  {employeeProfile.avatar ? (
                    <img src={employeeProfile.avatar} alt={employeeProfile.name} />
                  ) : (
                    employeeProfile.name.charAt(0).toUpperCase()
                  )}
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
                <button
                  className="emp_profile_edit_btn"
                  onClick={() => setShowProfileEditor(true)}
                >
                  Edit Profile
                </button>
              </div>

              <div className="emp_profile_stats">
                <div className="emp_profile_stat">
                  <span className="emp_stat_value">{employeeProfile.totalJobs}</span>
                  <span className="emp_stat_label">Total Jobs</span>
                </div>
                <div className="emp_profile_stat">
                  <span className="emp_stat_value">{employeeProfile.rating}</span>
                  <span className="emp_stat_label">Rating</span>
                </div>
                <div className="emp_profile_stat">
                  <span className="emp_stat_value">
                    {Math.floor(
                      (new Date().getTime() -
                        new Date(employeeProfile.joinedDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </span>
                  <span className="emp_stat_label">Days Active</span>
                </div>
              </div>

              <div className="emp_profile_details">
                <div className="emp_profile_detail">
                  <span className="emp_detail_icon">📧</span>
                  <div>
                    <p className="emp_detail_label">Email</p>
                    <p className="emp_detail_value">{employeeProfile.email}</p>
                  </div>
                </div>

                <div className="emp_profile_detail">
                  <span className="emp_detail_icon">📱</span>
                  <div>
                    <p className="emp_detail_label">Phone</p>
                    <p className="emp_detail_value">{employeeProfile.phone}</p>
                  </div>
                </div>

                <div className="emp_profile_detail">
                  <span className="emp_detail_icon">🏦</span>
                  <div>
                    <p className="emp_detail_label">Bank Account</p>
                    <p className="emp_detail_value">
                      {employeeProfile.bankAccount
                        ? `${employeeProfile.bankAccount.bankName} - ****${employeeProfile.bankAccount.accountNumber.slice(-4)}`
                        : "Not configured"}
                    </p>
                  </div>
                </div>

                <div className="emp_profile_detail">
                  <span className="emp_detail_icon">📍</span>
                  <div>
                    <p className="emp_detail_label">Service Areas</p>
                    <p className="emp_detail_value">
                      {employeeProfile.serviceArea.join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="emp_profile_section">
                <h4>Skills</h4>
                <div className="emp_skills_list">
                  {employeeProfile.skills.map((skill, index) => (
                    <span key={index} className="emp_skill_badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <DocumentManager
                documents={employeeProfile.documents}
                onUpload={(doc) => {
                  setEmployeeProfile((prev) => ({
                    ...prev,
                    documents: [...prev.documents, doc],
                  }));
                }}
              />

              {/* Availability */}
              <AvailabilityManager
                availability={employeeProfile.availability}
                onUpdate={(availability) => {
                  setEmployeeProfile((prev) => ({ ...prev, availability }));
                }}
              />
            </div>
          </div>
        )}

        {/* CHAT TAB */}
        {activeTab === "chat" && (
          <div className="emp_chat">
            <h2 className="emp_section_title">Messages</h2>
            {/* Group messages by job */}
            {Array.from(new Set(chatMessages.map((m) => m.jobId))).map((jobId) => {
              const job = jobs.find((j) => j.id === jobId);
              const jobMessages = chatMessages.filter((m) => m.jobId === jobId);
              const unread = jobMessages.filter(
                (m) => !m.read && m.senderId !== employeeProfile.id
              ).length;

              return (
                <div
                  key={jobId}
                  className="emp_chat_preview"
                  onClick={() => openChat(jobId)}
                >
                  <div className="emp_chat_preview_header">
                    <h4>{job?.customer || "Unknown"}</h4>
                    {unread > 0 && (
                      <span className="emp_chat_unread_badge">{unread}</span>
                    )}
                  </div>
                  <p className="emp_chat_preview_service">{job?.service}</p>
                  <p className="emp_chat_preview_message">
                    {jobMessages[jobMessages.length - 1]?.message}
                  </p>
                  <p className="emp_chat_preview_time">
                    {new Date(
                      jobMessages[jobMessages.length - 1]?.timestamp
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              );
            })}
            {chatMessages.length === 0 && (
              <div className="emp_empty_state">
                <div className="emp_empty_icon">💬</div>
                <h3>No messages yet</h3>
                <p>Messages with customers will appear here</p>
              </div>
            )}
          </div>
        )}

        {/* SUPPORT TAB */}
        {activeTab === "support" && (
          <SupportTickets
            tickets={supportTickets}
            onCreateTicket={(ticket) => {
              setSupportTickets((prev) => [ticket, ...prev]);
              showNotification("Support ticket created successfully");
            }}
            onUpdateTicket={(id, response) => {
              setSupportTickets((prev) =>
                prev.map((t) =>
                  t.id === id
                    ? {
                        ...t,
                        responses: [...t.responses, response],
                        updatedAt: new Date().toISOString(),
                      }
                    : t
                )
              );
            }}
          />
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <SettingsPanel
            settings={settings}
            onUpdateSettings={updateSettings}
            employeeProfile={employeeProfile}
            onUpdateProfile={updateProfile}
          />
        )}
      </main>

      {/* Modals */}
      {showJobDetails && selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setShowJobDetails(false)}
          onUpdateStatus={updateJobStatus}
          onOpenChat={openChat}
        />
      )}

      {showProfileEditor && (
        <ProfileEditor
          profile={employeeProfile}
          onClose={() => setShowProfileEditor(false)}
          onSave={updateProfile}
        />
      )}

      {showChatModal && selectedChatJobId && (
        <ChatInterface
          jobId={selectedChatJobId}
          messages={chatMessages.filter((m) => m.jobId === selectedChatJobId)}
          onClose={() => setShowChatModal(false)}
          onSendMessage={(message) => {
            const newMessage: ChatMessage = {
              id: Date.now(),
              jobId: selectedChatJobId,
              senderId: employeeProfile.id,
              senderName: employeeProfile.name,
              message,
              timestamp: new Date().toISOString(),
              read: true,
            };
            setChatMessages((prev) => [...prev, newMessage]);
          }}
        />
      )}
    </div>
  );
};

export default EmployeeDashboard;
