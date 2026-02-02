import React, { useEffect, useMemo, useState } from "react";
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

/* ================= STATIC (NON-EXAM) DATA ================= */

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
    assignedExams: [],
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
  const [examData, setExamData] = useState<ExamData[]>([]);
  const [selectedExam, setSelectedExam] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState(true);

  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [triggerTime, setTriggerTime] = useState("1 day");
  const [notificationSound, setNotificationSound] = useState("Chime");
  const [savedReminders, setSavedReminders] = useState<ReminderData[]>([]);

  /* ================= FETCH EXAM SCHEDULE ================= */

  useEffect(() => {
    fetchExamSchedule();
  }, []);

const fetchExamSchedule = async () => {
  try {
    setLoading(true);

    const res = await fetch(
      `https://swachify-india-be-1-mcrb.onrender.com/institution/student/exam-schedule?institution_id=1&student_id=1`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch exam schedule");
    }

    const data = await res.json();

    const formatted: ExamData[] = data.map((e: any) => {
      const examDate = new Date(e.exam_date);

      return {
        id: String(e.id),
        subject: e.subject_name ?? e.subject ?? "Unknown Subject",
        date: examDate.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        }),
        day: examDate.toLocaleDateString("en-US", {
          weekday: "long",
        }),
        time: `${e.start_time} - ${e.end_time}`,
        location: e.exam_hall ?? e.location ?? "Room TBD",
        color: "#3B82F6",
        category:
          e.exam_type?.toLowerCase() === "final" ? "final" : "midterm",
      };
    });

    setExamData(formatted);
  } catch (error) {
    console.error("Exam schedule load failed:", error);
  } finally {
    setLoading(false);
  }
};


  /* ================= DATA LOGIC ================= */

  const filteredExams = useMemo(
    () => examData.filter(e => e.category === activeTab),
    [examData, activeTab]
  );

  const groupedExams = useMemo(() => {
    return filteredExams.reduce<Record<string, ExamData[]>>((acc, exam) => {
      const key = `${exam.day}, ${exam.date}`;
      acc[key] = acc[key] || [];
      acc[key].push(exam);
      return acc;
    }, {});
  }, [filteredExams]);

  /* ================= REMINDER ================= */

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

  /* ================= SCREENS ================= */

  if (screen === "logs") {
    return (
      <div className="examw-page">
        <button onClick={() => setScreen("timetable")}>← Back</button>
        <h2>Notification Logs</h2>

        {logs.map(l => (
          <div key={l.id} className="examw-card">
            <strong>{l.message}</strong>
            <p>{l.timestamp}</p>
          </div>
        ))}
      </div>
    );
  }

  if (screen === "staff") {
    return (
      <div className="examw-page">
        <button onClick={() => setScreen("timetable")}>← Back</button>
        <h2>Staff Assignments</h2>

        {staff.map(s => (
          <div key={s.id} className="staff-card">
            <strong>{s.name}</strong>
            <p>{s.email}</p>
            <p>{s.phone}</p>
          </div>
        ))}
      </div>
    );
  }

  if (screen === "saved-reminders") {
    return (
      <div className="examw-page">
        <button onClick={() => setScreen("timetable")}>← Back</button>
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
        <button onClick={() => setScreen("timetable")}>← Back</button>

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

        <select
          value={notificationSound}
          onChange={e => setNotificationSound(e.target.value)}
        >
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

  /* ================= TIMETABLE ================= */

  return (
    <div className="examw-page">
      <button className="btn-back" onClick={onBack}>←</button>
      <h2>Exam Timetable</h2>

      {loading && <p>Loading exam schedule…</p>}

      {!loading &&
        Object.entries(groupedExams).map(([date, exams]) => (
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
                <span
                  className="exam-color"
                  style={{ background: exam.color }}
                />
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
