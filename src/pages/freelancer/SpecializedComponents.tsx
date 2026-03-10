import React, { useState } from "react";
import type {
  Settings,
  EmployeeProfile,
  Document,
  Availability,
  Job,
  Transaction,
} from "./employeeTypes";

// ==================== SETTINGS PANEL COMPONENT ====================
interface SettingsPanelProps {
  settings: Settings;
  onUpdateSettings: (updates: Partial<Settings>) => void;
  employeeProfile: EmployeeProfile;
  onUpdateProfile: (updates: Partial<EmployeeProfile>) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onUpdateSettings,
  employeeProfile,
  onUpdateProfile,
}) => {
  console.log(onUpdateSettings, onUpdateProfile);
  const [activeSection, setActiveSection] = useState<"appearance" | "notifications" | "privacy" | "account">("appearance");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "24px" }}>
      {/* Settings Navigation */}
      <div style={{ background: "var(--white)", padding: "20px", borderRadius: "12px", boxShadow: "var(--shadow)", height: "fit-content" }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "600" }}>Settings</h3>
        {[
          { id: "appearance", icon: "🎨", label: "Appearance" },
          { id: "notifications", icon: "🔔", label: "Notifications" },
          { id: "privacy", icon: "🔒", label: "Privacy" },
          { id: "account", icon: "👤", label: "Account" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id as any)}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: activeSection === item.id ? "var(--primary)" : "transparent",
              color: activeSection === item.id ? "white" : "var(--text-primary)",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              textAlign: "left",
              marginBottom: "4px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontWeight: "500",
              transition: "var(--transition)",
            }}
          >
            <span style={{ fontSize: "20px" }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div style={{ background: "var(--white)", padding: "28px", borderRadius: "12px", boxShadow: "var(--shadow)" }}>
        {activeSection === "appearance" && (
          <div>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "20px", fontWeight: "600" }}>
              Appearance
            </h3>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={(e) =>
                  onUpdateSettings({ theme: e.target.value as "light" | "dark" })
                }
                style={{
                  padding: "12px",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "14px",
                  minWidth: "200px",
                }}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) =>
                  onUpdateSettings({ language: e.target.value as any })
                }
                style={{
                  padding: "12px",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "14px",
                  minWidth: "200px",
                }}
              >
                <option value="en">English</option>
                <option value="hi">Hindi (हिंदी)</option>
                <option value="te">Telugu (తెలుగు)</option>
              </select>
            </div>
          </div>
        )}

        {activeSection === "notifications" && (
          <div>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "20px", fontWeight: "600" }}>
              Notifications
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { key: "pushEnabled", label: "Push Notifications", icon: "📱" },
                { key: "emailEnabled", label: "Email Notifications", icon: "📧" },
                { key: "smsEnabled", label: "SMS Notifications", icon: "💬" },
                { key: "soundEnabled", label: "Sound", icon: "🔊" },
                { key: "vibrationEnabled", label: "Vibration", icon: "📳" },
                { key: "newJobs", label: "New Job Alerts", icon: "💼" },
                { key: "payments", label: "Payment Notifications", icon: "💰" },
                { key: "messages", label: "Message Notifications", icon: "💬" },
                { key: "updates", label: "App Updates", icon: "🔔" },
              ].map((item) => (
                <label
                  key={item.key}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px",
                    background: "var(--light)",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "20px" }}>{item.icon}</span>
                    <span style={{ fontWeight: "500" }}>{item.label}</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.notifications[item.key as keyof typeof settings.notifications] as boolean}
                    onChange={(e) =>
                      onUpdateSettings({
                        notifications: {
                          ...settings.notifications,
                          [item.key]: e.target.checked,
                        },
                      })
                    }
                    style={{
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                    }}
                  />
                </label>
              ))}
            </div>
          </div>
        )}

        {activeSection === "privacy" && (
          <div>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "20px", fontWeight: "600" }}>
              Privacy & Security
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <label
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  background: "var(--light)",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontWeight: "500" }}>Show phone to customers</span>
                <input
                  type="checkbox"
                  checked={settings.privacy.showPhoneToCustomers}
                  onChange={(e) =>
                    onUpdateSettings({
                      privacy: {
                        ...settings.privacy,
                        showPhoneToCustomers: e.target.checked,
                      },
                    })
                  }
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
              </label>
              <label
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  background: "var(--light)",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontWeight: "500" }}>Share location</span>
                <input
                  type="checkbox"
                  checked={settings.privacy.shareLocation}
                  onChange={(e) =>
                    onUpdateSettings({
                      privacy: {
                        ...settings.privacy,
                        shareLocation: e.target.checked,
                      },
                    })
                  }
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
              </label>
              <div style={{ padding: "12px", background: "var(--light)", borderRadius: "8px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                  Profile Visibility
                </label>
                <select
                  value={settings.privacy.profileVisibility}
                  onChange={(e) =>
                    onUpdateSettings({
                      privacy: {
                        ...settings.privacy,
                        profileVisibility: e.target.value as "public" | "private",
                      },
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <button
                className="emp_btn emp_btn_secondary"
                style={{ width: "fit-content" }}
              >
                🔑 Change Password
              </button>
            </div>
          </div>
        )}

        {activeSection === "account" && (
          <div>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "20px", fontWeight: "600" }}>
              Account Settings
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                  Account ID
                </label>
                <div
                  style={{
                    padding: "12px",
                    background: "var(--light)",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                  }}
                >
                  EMP-{employeeProfile.id.toString().padStart(6, "0")}
                </div>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                  Member Since
                </label>
                <div style={{ padding: "12px", background: "var(--light)", borderRadius: "8px" }}>
                  {new Date(employeeProfile.joinedDate).toLocaleDateString()}
                </div>
              </div>
              <div style={{ paddingTop: "20px", borderTop: "1px solid var(--border)" }}>
                <h4 style={{ margin: "0 0 12px 0", color: "var(--danger)" }}>
                  Danger Zone
                </h4>
                <button
                  className="emp_btn emp_btn_danger"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to deactivate your account? This action cannot be undone."
                      )
                    ) {
                      alert("Account deactivation requested");
                    }
                  }}
                >
                  Deactivate Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== EARNINGS ANALYTICS COMPONENT ====================
interface EarningsAnalyticsProps {
  jobs: Job[];
  transactions: Transaction[];
  employeeProfile: EmployeeProfile;
}

export const EarningsAnalytics: React.FC<EarningsAnalyticsProps> = ({
  jobs,
  transactions,
  employeeProfile,
}) => {
  const completedJobs = jobs.filter((j) => j.status === "completed");

  // Calculate analytics
  const totalEarnings = transactions
    .filter((t) => t.status === "completed" && t.type !== "withdrawal")
    .reduce((sum, t) => sum + t.amount, 0);

  const avgPerJob = completedJobs.length > 0 ? totalEarnings / completedJobs.length : 0;

  const completionRate =
    jobs.length > 0 ? (completedJobs.length / jobs.filter((j) => j.status !== "new").length) * 100 : 0;

  // Monthly earnings by service type
  const earningsByService = completedJobs.reduce((acc, job) => {
    acc[job.service] = (acc[job.service] || 0) + job.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Overview Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
        <div
          style={{
            background: "var(--white)",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "var(--shadow)",
          }}
        >
          <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>
            Total Earnings
          </div>
          <div style={{ fontSize: "32px", fontWeight: "700", color: "var(--success)" }}>
            ₹{totalEarnings}
          </div>
        </div>
        <div
          style={{
            background: "var(--white)",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "var(--shadow)",
          }}
        >
          <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>
            Average Per Job
          </div>
          <div style={{ fontSize: "32px", fontWeight: "700", color: "var(--primary)" }}>
            ₹{avgPerJob.toFixed(0)}
          </div>
        </div>
        <div
          style={{
            background: "var(--white)",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "var(--shadow)",
          }}
        >
          <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>
            Completion Rate
          </div>
          <div style={{ fontSize: "32px", fontWeight: "700", color: "var(--success)" }}>
            {completionRate.toFixed(1)}%
          </div>
        </div>
        <div
          style={{
            background: "var(--white)",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "var(--shadow)",
          }}
        >
          <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>
            Rating
          </div>
          <div style={{ fontSize: "32px", fontWeight: "700", color: "var(--warning)" }}>
            {employeeProfile.rating} ⭐
          </div>
        </div>
      </div>

      {/* Earnings by Service */}
      <div
        style={{
          background: "var(--white)",
          padding: "28px",
          borderRadius: "12px",
          boxShadow: "var(--shadow)",
        }}
      >
        <h3 style={{ margin: "0 0 24px 0", fontSize: "20px", fontWeight: "600" }}>
          Earnings by Service Type
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {Object.entries(earningsByService)
            .sort(([, a], [, b]) => b - a)
            .map(([service, amount]) => {
              const percentage = (amount / totalEarnings) * 100;
              return (
                <div key={service}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <span style={{ fontWeight: "500" }}>{service}</span>
                    <span style={{ fontWeight: "700", color: "var(--success)" }}>
                      ₹{amount}
                    </span>
                  </div>
                  <div
                    style={{
                      background: "var(--light)",
                      height: "8px",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${percentage}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, var(--primary), var(--secondary))",
                        borderRadius: "10px",
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--text-secondary)",
                      marginTop: "4px",
                    }}
                  >
                    {percentage.toFixed(1)}% of total earnings
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Performance Metrics */}
      <div
        style={{
          background: "var(--white)",
          padding: "28px",
          borderRadius: "12px",
          boxShadow: "var(--shadow)",
        }}
      >
        <h3 style={{ margin: "0 0 24px 0", fontSize: "20px", fontWeight: "600" }}>
          Performance Metrics
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
          <div style={{ textAlign: "center", padding: "20px", background: "var(--light)", borderRadius: "8px" }}>
            <div style={{ fontSize: "36px", marginBottom: "8px" }}>
              {completedJobs.length}
            </div>
            <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              Jobs Completed
            </div>
          </div>
          <div style={{ textAlign: "center", padding: "20px", background: "var(--light)", borderRadius: "8px" }}>
            <div style={{ fontSize: "36px", marginBottom: "8px" }}>
              {jobs.filter((j) => j.tip).length}
            </div>
            <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              Jobs with Tips
            </div>
          </div>
          <div style={{ textAlign: "center", padding: "20px", background: "var(--light)", borderRadius: "8px" }}>
            <div style={{ fontSize: "36px", marginBottom: "8px" }}>
              {completedJobs.filter((j) => j.rating === 5).length}
            </div>
            <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              5-Star Ratings
            </div>
          </div>
          <div style={{ textAlign: "center", padding: "20px", background: "var(--light)", borderRadius: "8px" }}>
            <div style={{ fontSize: "36px", marginBottom: "8px" }}>
              {Math.floor(
                (new Date().getTime() - new Date(employeeProfile.joinedDate).getTime()) /
                  (1000 * 60 * 60 * 24)
              )}
            </div>
            <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              Days Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== DOCUMENT MANAGER COMPONENT ====================
interface DocumentManagerProps {
  documents: Document[];
  onUpload: (doc: Document) => void;
}

export const DocumentManager: React.FC<DocumentManagerProps> = ({
  documents,
  onUpload,
}) => {
  console.log(onUpload);
  const [showUploadForm, setShowUploadForm] = useState(false);

  return (
    <div className="emp_profile_section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h4 style={{ margin: 0 }}>Documents</h4>
        <button
          className="emp_btn emp_btn_secondary"
          style={{ padding: "8px 16px", fontSize: "13px" }}
          onClick={() => setShowUploadForm(!showUploadForm)}
        >
          {showUploadForm ? "Cancel" : "+ Upload"}
        </button>
      </div>

      {showUploadForm && (
        <div
          style={{
            padding: "16px",
            background: "var(--light)",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>
              Document Type
            </label>
            <select
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            >
              <option>Aadhaar Card</option>
              <option>PAN Card</option>
              <option>Driving License</option>
              <option>Certificate</option>
              <option>Photo</option>
            </select>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>
              Upload File
            </label>
            <input
              type="file"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            />
          </div>
          <button className="emp_btn emp_btn_primary" style={{ fontSize: "14px" }}>
            Upload Document
          </button>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {documents.map((doc) => (
          <div
            key={doc.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              background: "var(--light)",
              borderRadius: "8px",
            }}
          >
            <div>
              <div style={{ fontWeight: "500", marginBottom: "4px" }}>{doc.name}</div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {doc.verified ? (
                <span style={{ color: "var(--success)", fontSize: "20px" }}>✓</span>
              ) : (
                <span style={{ color: "var(--warning)", fontSize: "20px" }}>⏳</span>
              )}
              <button
                className="emp_btn emp_btn_secondary"
                style={{ padding: "6px 12px", fontSize: "12px" }}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== AVAILABILITY MANAGER COMPONENT ====================
interface AvailabilityManagerProps {
  availability: Availability;
  onUpdate: (availability: Availability) => void;
}

export const AvailabilityManager: React.FC<AvailabilityManagerProps> = ({
  availability,
  onUpdate,
}) => {
  console.log(onUpdate);
  const [isEditing, setIsEditing] = useState(false);

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  return (
    <div className="emp_profile_section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h4 style={{ margin: 0 }}>Availability Schedule</h4>
        <button
          className="emp_btn emp_btn_secondary"
          style={{ padding: "8px 16px", fontSize: "13px" }}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {days.map((day) => {
          const slots = availability[day as keyof Availability];
          return (
            <div
              key={day}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                background: "var(--light)",
                borderRadius: "8px",
              }}
            >
              <div style={{ fontWeight: "500", textTransform: "capitalize", width: "120px" }}>
                {day}
              </div>
              <div style={{ flex: 1 }}>
                {slots.length > 0 ? (
                  slots.map((slot, index) => (
                    <span
                      key={index}
                      style={{
                        padding: "4px 12px",
                        background: "var(--primary)",
                        color: "white",
                        borderRadius: "20px",
                        fontSize: "13px",
                        marginRight: "8px",
                      }}
                    >
                      {slot.start} - {slot.end}
                    </span>
                  ))
                ) : (
                  <span style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
                    Not available
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default {
  SettingsPanel,
  EarningsAnalytics,
  DocumentManager,
  AvailabilityManager,
};
