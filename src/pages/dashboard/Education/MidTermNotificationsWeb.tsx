import React, { useMemo, useState } from "react";
import "./MidTermNotificationsWeb.css";

/* ================= TYPES ================= */

interface ExamData {
  id: string;
  subject: string;
  date: string;
  day: string;
  time: string;
  location: string;
  color: string;
  category: "midterm" | "final";
}

interface ReminderData {
  id: string;
  examId: string;
  subject: string;
  enabled: boolean;
  triggerTime: string;
  sound: string;
  createdAt: Date;
}

interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  status: "success" | "failed";
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedExams: string[];
}

interface Props {
  onBack: () => void;
}

/* ================= STATIC DATA ================= */

const examData: ExamData[] = [
  {
    id: "1",
    subject: "Mathematics",
    date: "Oct 02",
    day: "Monday",
    time: "09:00 AM - 11:30 AM",
    location: "Hall A",
    color: "#2563eb",
    category: "midterm",
  },
  {
    id: "2",
    subject: "English Literature",
    date: "Oct 02",
    day: "Monday",
    time: "01:00 PM - 03:00 PM",
    location: "Room 402",
    color: "#7c3aed",
    category: "midterm",
  },
  {
    id: "3",
    subject: "Physical Sciences",
    date: "Oct 03",
    day: "Tuesday",
    time: "10:00 AM - 12:30 PM",
    location: "Lab 2",
    color: "#059669",
    category: "midterm",
  },
  {
    id: "4",
    subject: "History & Civics",
    date: "Oct 04",
    day: "Wednesday",
    time: "02:00 PM - 04:00 PM",
    location: "Main Hall",
    color: "#d97706",
    category: "midterm",
  },
];

const logs: LogEntry[] = [
  {
    id: "1",
    timestamp: "Sep 20, 2023 - 10:30 AM",
    message: "Notification sent to 285 parents",
    status: "success",
  },
  {
    id: "2",
    timestamp: "Sep 20, 2023 - 10:31 AM",
    message: "Failed to send to 15 contacts",
    status: "failed",
  },
];

const staff: StaffMember[] = [
  {
    id: "1",
    name: "Dr. Alice Johnson",
    email: "alice.j@school.edu",
    phone: "+1 234-567-8901",
    assignedExams: ["1", "3"],
  },
  {
    id: "2",
    name: "Prof. Bob Smith",
    email: "bob.s@school.edu",
    phone: "+1 234-567-8902",
    assignedExams: ["2", "4"],
  },
  {
    id: "3",
    name: "Dr. Carol Williams",
    email: "carol.w@school.edu",
    phone: "+1 234-567-8903",
    assignedExams: ["1", "2"],
  },
];

const triggerTimeOptions = [
  "15 minutes",
  "30 minutes",
  "1 hour",
  "2 hours",
  "1 day",
  "2 days",
  "1 week",
];

const notificationSounds = [
  "Chime",
  "Bell",
  "Alert",
  "Notification",
  "Classic",
  "Modern",
  "Gentle",
];

/* ================= COMPONENT ================= */

const MidTermNotificationsWeb: React.FC<Props> = ({ onBack }) => {
  const [screen, setScreen] = useState<
    "timetable" | "reminder" | "logs" | "staff" | "saved-reminders"
  >("timetable");

  const [activeTab] = useState<"midterm" | "final">("midterm");
  const [selectedExam, setSelectedExam] = useState<ExamData | null>(null);

  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [triggerTime, setTriggerTime] = useState("1 day");
  const [notificationSound, setNotificationSound] = useState("Chime");
  const [savedReminders, setSavedReminders] = useState<ReminderData[]>([]);

  const filteredExams = useMemo(
    () => examData.filter(e => e.category === activeTab),
    [activeTab]
  );

  const groupedExams = useMemo(() => {
    return filteredExams.reduce<Record<string, ExamData[]>>((acc, exam) => {
      const key = `${exam.day}, ${exam.date}`;
      acc[key] = acc[key] || [];
      acc[key].push(exam);
      return acc;
    }, {});
  }, [filteredExams]);

  const saveReminder = () => {
    if (!selectedExam) return;

    setSavedReminders(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        examId: selectedExam.id,
        subject: selectedExam.subject,
        enabled: reminderEnabled,
        triggerTime,
        sound: notificationSound,
        createdAt: new Date(),
      },
    ]);

    setScreen("saved-reminders");
  };

  if (screen === "logs") {
    return (
      <div className="examw-page">
        <button className="btn-back" onClick={() => setScreen("timetable")}>← Back</button>
        <h2>Notification Logs</h2>

        {logs.map(log => (
          <div key={log.id} className="examw-card">
            <strong>{log.message}</strong>
            <p>{log.timestamp}</p>
          </div>
        ))}
      </div>
    );
  }

  if (screen === "staff") {
    return (
      <div className="examw-page">
        <button className="btn-back" onClick={() => setScreen("timetable")}>← Back</button>
        <h2>Staff Assignments</h2>

        {staff.map(s => (
          <div key={s.id} className="staff-card">
            <div className="staff-avatar">
              {s.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <strong>{s.name}</strong>
              <p>{s.email}</p>
              <p>{s.phone}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (screen === "saved-reminders") {
    return (
      <div className="examw-page">
        <button className="btn-back" onClick={() => setScreen("timetable")}>← Back</button>
        <h2>Saved Reminders</h2>

        {savedReminders.map(r => (
          <div key={r.id} className="examw-card">
            <strong>{r.subject}</strong>
            <p>{r.triggerTime} before</p>
            <p>Sound: {r.sound}</p>
          </div>
        ))}
      </div>
    );
  }

  if (screen === "reminder" && selectedExam) {
    return (
      <div className="examw-page">
        <button className="btn-back" onClick={() => setScreen("timetable")}>← Back</button>
        <h2>Set Exam Reminder</h2>

        <div className="examw-card">
          <strong>{selectedExam.subject}</strong>
          <p>{selectedExam.day}, {selectedExam.date}</p>
          <p>{selectedExam.time}</p>
          <p>{selectedExam.location}</p>
        </div>

        <label>
          <input
            type="checkbox"
            checked={reminderEnabled}
            onChange={e => setReminderEnabled(e.target.checked)}
          />
          Enable Reminder
        </label>

        <select value={triggerTime} onChange={e => setTriggerTime(e.target.value)}>
          {triggerTimeOptions.map(t => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <select value={notificationSound} onChange={e => setNotificationSound(e.target.value)}>
          {notificationSounds.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <button className="btn-primary" onClick={saveReminder}>
          Save Reminder
        </button>
      </div>
    );
  }

  return (
    <div className="examw-page">
      <button className="btn-back" onClick={onBack}>← Back</button>
      <h2>Exam Timetable</h2>

      <div className="tab-row">
        <button className="tab-btn">Mid-term</button>
      </div>

      {Object.entries(groupedExams).map(([date, exams]) => (
        <div key={date} className="examw-card">
          <strong>{date}</strong>

          {exams.map(exam => (
            <div
              key={exam.id}
              className="examw-exam"
              onClick={() => {
                setSelectedExam(exam);
                setScreen("reminder");
              }}
            >
              <span className="exam-color" style={{ background: exam.color }} />
              <div>
                <strong>{exam.subject}</strong>
                <p>{exam.time}</p>
              </div>
              <span>{exam.location}</span>
            </div>
          ))}
        </div>
      ))}

      <button className="btn-primary" onClick={() => setScreen("staff")}>
        Manage Staff
      </button>
    </div>
  );
};

export default MidTermNotificationsWeb;
