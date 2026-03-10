import React, { useState } from "react";
import type {
  Notification,
  SupportTicket,
  //SupportTicketStatus,
  ChatMessage,
  Incentive,
  WithdrawalRequest,
  //Settings,
  EmployeeProfile,
  //Document,
  //Availability,
  Job,
 // Transaction,
} from "./employeeTypes";

// ==================== STAT CARD COMPONENT ====================
interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
  color: string;
  trend?: string;
  suffix?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  trend,
  suffix,
}) => (
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

// ==================== EARNINGS CARD COMPONENT ====================
interface EarningsCardProps {
  todayEarnings: number;
  target: number;
  balance: number;
}

export const EarningsCard: React.FC<EarningsCardProps> = ({
  todayEarnings,
  target,
  balance,
}) => (
  <div className="emp_earnings_card">
    <div className="emp_earnings_header">
      <div>
        <h3>Today's Earnings</h3>
        <div className="emp_earnings_amount">₹{todayEarnings}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <p style={{ fontSize: "14px", margin: "0 0 4px 0", opacity: 0.9 }}>
          Available Balance
        </p>
        <div style={{ fontSize: "24px", fontWeight: "600" }}>₹{balance}</div>
      </div>
    </div>
    <div className="emp_earnings_progress">
      <div className="emp_progress_bar">
        <div
          className="emp_progress_fill"
          style={{ width: `${Math.min((todayEarnings / target) * 100, 100)}%` }}
        ></div>
      </div>
      <p className="emp_progress_text">
        Target: ₹{target}/day •{" "}
        {Math.round((todayEarnings / target) * 100)}% achieved
      </p>
    </div>
  </div>
);

// ==================== NOTIFICATION CENTER COMPONENT ====================
interface NotificationCenterProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
  onNotificationClick: (notification: Notification) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  onNotificationClick,
}) => {
  console.log(onMarkAsRead);
  return (
    <div
      style={{
        position: "fixed",
        top: "80px",
        right: "20px",
        width: "380px",
        maxHeight: "600px",
        background: "var(--white)",
        borderRadius: "12px",
        boxShadow: "var(--shadow-lg)",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
          Notifications
        </h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={onMarkAllAsRead}
            style={{
              background: "none",
              border: "none",
              color: "var(--primary)",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "500",
            }}
          >
            Mark all read
          </button>
          <button
            onClick={onClose}
            style={{
              background: "var(--light)",
              border: "none",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ✕
          </button>
        </div>
      </div>
      <div style={{ overflowY: "auto", maxHeight: "500px" }}>
        {notifications.length === 0 ? (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              color: "var(--text-secondary)",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔔</div>
            <p style={{ margin: 0 }}>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => onNotificationClick(notif)}
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid var(--border)",
                cursor: "pointer",
                background: notif.read ? "transparent" : "var(--light)",
                transition: "var(--transition)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--light)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = notif.read
                  ? "transparent"
                  : "var(--light)")
              }
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "6px",
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "var(--text-primary)",
                  }}
                >
                  {notif.title}
                </h4>
                {!notif.read && (
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "var(--primary)",
                      flexShrink: 0,
                      marginLeft: "8px",
                    }}
                  />
                )}
              </div>
              <p
                style={{
                  margin: "0 0 6px 0",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                }}
              >
                {notif.message}
              </p>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--text-secondary)" }}>
                {new Date(notif.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ==================== JOB DETAILS MODAL COMPONENT ====================
interface JobDetailsModalProps {
  job: Job;
  onClose: () => void;
  onUpdateStatus: (id: number, status: any, reason?: string) => void;
  onOpenChat: (jobId: number) => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  onClose,
  onUpdateStatus,
  onOpenChat,
}) => {
  console.log(onUpdateStatus);
  const getDirectionsUrl = () => {
    if (job.latitude && job.longitude) {
      return `https://www.google.com/maps/dir/?api=1&destination=${job.latitude},${job.longitude}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      job.address
    )}`;
  };

  return (
    <div className="emp_modal_overlay" onClick={onClose}>
      <div className="emp_modal" onClick={(e) => e.stopPropagation()}>
        <div className="emp_modal_header">
          <h3>{job.service} - Job Details</h3>
          <button className="emp_modal_close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="emp_modal_body">
          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "0 0 12px 0" }}>
              CUSTOMER INFORMATION
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <strong>Name:</strong> {job.customer}
              </div>
              <div>
                <strong>Phone:</strong>{" "}
                <a href={`tel:${job.phone}`} style={{ color: "var(--primary)" }}>
                  {job.phone}
                </a>
              </div>
              <div>
                <strong>Address:</strong> {job.address}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "0 0 12px 0" }}>
              JOB INFORMATION
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <strong>Service:</strong> {job.service}
              </div>
              <div>
                <strong>Date:</strong>{" "}
                {new Date(job.scheduledDate).toLocaleDateString()}
              </div>
              <div>
                <strong>Time:</strong> {job.scheduledTime}
              </div>
              <div>
                <strong>Duration:</strong> {job.duration} minutes
              </div>
              <div>
                <strong>Amount:</strong> ₹{job.amount}
                {job.tip && <span style={{ color: "var(--success)" }}> + ₹{job.tip} tip</span>}
              </div>
              {job.distance && (
                <div>
                  <strong>Distance:</strong> {job.distance.toFixed(1)} km
                </div>
              )}
            </div>
          </div>

          {job.specialInstructions && (
            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "0 0 12px 0" }}>
                SPECIAL INSTRUCTIONS
              </h4>
              <p
                style={{
                  background: "var(--light)",
                  padding: "12px",
                  borderRadius: "8px",
                  margin: 0,
                }}
              >
                {job.specialInstructions}
              </p>
            </div>
          )}

          {job.rating && (
            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "0 0 12px 0" }}>
                CUSTOMER FEEDBACK
              </h4>
              <div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Rating:</strong> {"⭐".repeat(job.rating)} ({job.rating}/5)
                </div>
                {job.review && <p style={{ margin: 0, fontStyle: "italic" }}>"{job.review}"</p>}
              </div>
            </div>
          )}
        </div>
        <div className="emp_modal_footer">
          {job.latitude && job.longitude && (
            <a
              href={getDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="emp_btn emp_btn_secondary"
            >
              🗺️ Get Directions
            </a>
          )}
          <button className="emp_btn emp_btn_secondary" onClick={() => onOpenChat(job.id)}>
            💬 Chat
          </button>
          <button className="emp_btn emp_btn_primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== CHAT INTERFACE COMPONENT ====================
interface ChatInterfaceProps {
  jobId: number;
  messages: ChatMessage[];
  onClose: () => void;
  onSendMessage: (message: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  jobId,
  messages,
  onClose,
  onSendMessage,
}) => {
  console.log(jobId);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="emp_modal_overlay" onClick={onClose}>
      <div className="emp_modal" onClick={(e) => e.stopPropagation()} style={{ maxHeight: "80vh" }}>
        <div className="emp_modal_header">
          <h3>Messages</h3>
          <button className="emp_modal_close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div style={{ padding: "20px", overflowY: "auto", maxHeight: "500px", minHeight: "400px" }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                marginBottom: "16px",
                display: "flex",
                justifyContent: msg.senderId === 1 ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: msg.senderId === 1 ? "var(--primary)" : "var(--light)",
                  color: msg.senderId === 1 ? "white" : "var(--text-primary)",
                }}
              >
                <p style={{ margin: "0 0 4px 0", fontSize: "14px" }}>{msg.message}</p>
                <p style={{ margin: 0, fontSize: "11px", opacity: 0.7 }}>
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "16px", borderTop: "1px solid var(--border)" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "12px",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
            <button onClick={handleSend} className="emp_btn emp_btn_primary">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== PROFILE EDITOR COMPONENT ====================
interface ProfileEditorProps {
  profile: EmployeeProfile;
  onClose: () => void;
  onSave: (updates: Partial<EmployeeProfile>) => void;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({
  profile,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
  });

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="emp_modal_overlay" onClick={onClose}>
      <div className="emp_modal" onClick={(e) => e.stopPropagation()}>
        <div className="emp_modal_header">
          <h3>Edit Profile</h3>
          <button className="emp_modal_close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="emp_modal_body">
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
          </div>
        </div>
        <div className="emp_modal_footer">
          <button className="emp_btn emp_btn_secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="emp_btn emp_btn_primary" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== SUPPORT TICKETS COMPONENT ====================
interface SupportTicketsProps {
  tickets: SupportTicket[];
  onCreateTicket: (ticket: SupportTicket) => void;
  onUpdateTicket: (id: number, response: any) => void;
}

export const SupportTickets: React.FC<SupportTicketsProps> = ({
  tickets,
  onCreateTicket,
  onUpdateTicket,
}) => {
  console.log(onUpdateTicket);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const handleCreate = () => {
    const newTicket: SupportTicket = {
      id: Date.now(),
      subject,
      description,
      status: "open",
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responses: [
        {
          id: 1,
          message: description,
          sender: "employee",
          timestamp: new Date().toISOString(),
        },
      ],
    };
    onCreateTicket(newTicket);
    setShowCreateForm(false);
    setSubject("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <div className="emp_support">
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 className="emp_section_title" style={{ margin: 0 }}>
          Support Tickets
        </h2>
        <button
          className="emp_btn emp_btn_primary"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? "Cancel" : "+ New Ticket"}
        </button>
      </div>

      {showCreateForm && (
        <div
          style={{
            background: "var(--white)",
            padding: "24px",
            borderRadius: "12px",
            marginBottom: "24px",
            boxShadow: "var(--shadow)",
          }}
        >
          <h3 style={{ fontSize: "18px", marginBottom: "16px" }}>Create Support Ticket</h3>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500" }}>
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief description of the issue"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500" }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about your issue..."
              rows={4}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: "14px",
                resize: "vertical",
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "500" }}>
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              style={{
                padding: "12px",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button
            className="emp_btn emp_btn_primary"
            onClick={handleCreate}
            disabled={!subject || !description}
          >
            Submit Ticket
          </button>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {tickets.length === 0 ? (
          <div className="emp_empty_state">
            <div className="emp_empty_icon">🎧</div>
            <h3>No support tickets</h3>
            <p>Create a ticket if you need help</p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              style={{
                background: "var(--white)",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "var(--shadow)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>
                  {ticket.subject}
                </h4>
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "600",
                    background:
                      ticket.status === "open"
                        ? "#fef3c7"
                        : ticket.status === "in_progress"
                        ? "#dbeafe"
                        : "#dcfce7",
                    color:
                      ticket.status === "open"
                        ? "#92400e"
                        : ticket.status === "in_progress"
                        ? "#1e40af"
                        : "#15803d",
                  }}
                >
                  {ticket.status.replace("_", " ")}
                </span>
              </div>
              <p style={{ margin: "0 0 12px 0", color: "var(--text-secondary)", fontSize: "14px" }}>
                {ticket.description}
              </p>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                Created: {new Date(ticket.createdAt).toLocaleString()} • Priority:{" "}
                <span
                  style={{
                    color:
                      ticket.priority === "high"
                        ? "var(--danger)"
                        : ticket.priority === "medium"
                        ? "var(--warning)"
                        : "var(--success)",
                    fontWeight: "600",
                  }}
                >
                  {ticket.priority.toUpperCase()}
                </span>
              </div>
              {ticket.responses.length > 1 && (
                <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
                  <h5 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: "600" }}>
                    Responses ({ticket.responses.length - 1})
                  </h5>
                  {ticket.responses.slice(1).map((response) => (
                    <div
                      key={response.id}
                      style={{
                        background: "var(--light)",
                        padding: "12px",
                        borderRadius: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "6px",
                        }}
                      >
                        <strong style={{ fontSize: "13px" }}>
                          {response.sender === "support" ? "Support Team" : "You"}
                        </strong>
                        <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                          {new Date(response.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: "14px" }}>{response.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* FAQ Section */}
      <div style={{ marginTop: "32px", background: "var(--white)", padding: "24px", borderRadius: "12px", boxShadow: "var(--shadow)" }}>
        <h3 style={{ marginBottom: "20px" }}>Frequently Asked Questions</h3>
        <details className="emp_faq_item" style={{ marginBottom: "12px", padding: "12px", background: "var(--light)", borderRadius: "8px" }}>
          <summary style={{ cursor: "pointer", fontWeight: "500", padding: "8px" }}>How do I accept a job?</summary>
          <p style={{ margin: "12px 0 0 0", paddingLeft: "8px" }}>Click on the "Accept" button on any new job request in the Jobs tab.</p>
        </details>
        <details className="emp_faq_item" style={{ marginBottom: "12px", padding: "12px", background: "var(--light)", borderRadius: "8px" }}>
          <summary style={{ cursor: "pointer", fontWeight: "500", padding: "8px" }}>When do I receive my earnings?</summary>
          <p style={{ margin: "12px 0 0 0", paddingLeft: "8px" }}>Earnings are processed weekly and deposited to your registered bank account.</p>
        </details>
        <details className="emp_faq_item" style={{ marginBottom: "12px", padding: "12px", background: "var(--light)", borderRadius: "8px" }}>
          <summary style={{ cursor: "pointer", fontWeight: "500", padding: "8px" }}>How can I improve my rating?</summary>
          <p style={{ margin: "12px 0 0 0", paddingLeft: "8px" }}>Complete jobs on time, maintain quality service, and communicate well with customers.</p>
        </details>
      </div>
    </div>
  );
};

// ==================== INCENTIVES PANEL COMPONENT ====================
interface IncentivesPanelProps {
  incentives: Incentive[];
  totalIncentives: number;
}

export const IncentivesPanel: React.FC<IncentivesPanelProps> = ({
  incentives,
  totalIncentives,
}) => {
  return (
    <div style={{ background: "var(--white)", padding: "24px", borderRadius: "12px", boxShadow: "var(--shadow)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "600" }}>Incentives & Bonuses</h3>
        <div style={{ fontSize: "28px", fontWeight: "700", color: "var(--success)" }}>
          ₹{totalIncentives}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {incentives.map((incentive) => (
          <div
            key={incentive.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
              background: "var(--light)",
              borderRadius: "8px",
            }}
          >
            <div>
              <div style={{ fontWeight: "500", marginBottom: "4px" }}>
                {incentive.type === "milestone" && "🎯"}{" "}
                {incentive.type === "bonus" && "🎁"}{" "}
                {incentive.type === "streak" && "🔥"}{" "}
                {incentive.type === "referral" && "👥"}{" "}
                {incentive.description}
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                {new Date(incentive.earnedDate).toLocaleDateString()}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "var(--success)" }}>
                ₹{incentive.amount}
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  padding: "3px 8px",
                  borderRadius: "12px",
                  background:
                    incentive.status === "claimed"
                      ? "#dcfce7"
                      : incentive.status === "earned"
                      ? "#fef3c7"
                      : "#fee2e2",
                  color:
                    incentive.status === "claimed"
                      ? "#15803d"
                      : incentive.status === "earned"
                      ? "#92400e"
                      : "#991b1b",
                }}
              >
                {incentive.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==================== WITHDRAWAL MANAGER COMPONENT ====================
interface WithdrawalManagerProps {
  withdrawals: WithdrawalRequest[];
  onRequestWithdrawal: (amount: number) => void;
}

export const WithdrawalManager: React.FC<WithdrawalManagerProps> = ({
  withdrawals,
  onRequestWithdrawal,
}) => {
  console.log(onRequestWithdrawal);
  return (
    <div style={{ background: "var(--white)", padding: "24px", borderRadius: "12px", boxShadow: "var(--shadow)" }}>
      <h3 style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "600" }}>
        Withdrawal History
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {withdrawals.map((withdrawal) => (
          <div
            key={withdrawal.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
              background: "var(--light)",
              borderRadius: "8px",
            }}
          >
            <div>
              <div style={{ fontWeight: "500", marginBottom: "4px" }}>
                Withdrawal to {withdrawal.accountDetails}
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                {new Date(withdrawal.requestedAt).toLocaleDateString()} •{" "}
                {withdrawal.referenceNumber}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-primary)" }}>
                ₹{withdrawal.amount}
              </div>
              <span className={`emp_status_badge emp_status_${withdrawal.status}`}>
                {withdrawal.status}
              </span>
            </div>
          </div>
        ))}
        {withdrawals.length === 0 && (
          <p style={{ textAlign: "center", color: "var(--text-secondary)", padding: "20px 0" }}>
            No withdrawal requests yet
          </p>
        )}
      </div>
    </div>
  );
};

// Export all as default
export default {
  StatCard,
  EarningsCard,
  NotificationCenter,
  JobDetailsModal,
  ChatInterface,
  ProfileEditor,
  SupportTickets,
  IncentivesPanel,
  WithdrawalManager,
};
