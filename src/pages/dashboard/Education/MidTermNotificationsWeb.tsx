import React, { useEffect, useMemo, useState } from "react";
import "./MidTermNotificationsWeb.css";

/* ================= TYPES ================= */

type ExamMode = "midterm" | "final";

interface ExamData {
  exam_date: string;
  day_name: string;
  subject_name: string;
  exam_type: string;
  start_time: string;
  end_time: string;
  location: string;
}

interface SavedReminder {
  id: string;
  subject: string;
  trigger: string;
  sound: string;
  enabled: boolean;
}

interface NotificationLog {
  id: string;
  message: string;
  time: string;
  status: "success" | "error";
}

interface Props {
  onBack: () => void;
  examMode: ExamMode;
}

type Screen =
  | "schedule"
  | "set-reminder"
  | "saved-reminders"
  | "logs"
  | "staff";

/* ================= MOCK DATA ================= */

const LOGS: NotificationLog[] = [
  {
    id: "1",
    message: "Notification sent to 285 parents",
    time: "Sep 20, 2023 · 10:30 AM",
    status: "success",
  },
  {
    id: "2",
    message: "Failed to send to 15 contacts",
    time: "Sep 20, 2023 · 10:31 AM",
    status: "error",
  },
  {
    id: "3",
    message: "Retry successful for 12 contacts",
    time: "Sep 20, 2023 · 10:35 AM",
    status: "success",
  },
];

/* ================= COMPONENT ================= */

const MidTermNotificationsWeb: React.FC<Props> = ({
  onBack,
  examMode,
}) => {
  const [screen, setScreen] = useState<Screen>("schedule");
  const [examData, setExamData] = useState<ExamData[]>([]);
  const [selectedExam, setSelectedExam] = useState<ExamData | null>(null);

  // reminder form state
  const [enabled, setEnabled] = useState(true);
  const [trigger, setTrigger] = useState("1 day before");
  const [sound, setSound] = useState("Chime");

  const [savedReminders, setSavedReminders] = useState<SavedReminder[]>([]);

  /* ================= FETCH ================= */

  useEffect(() => {
    fetch(
      "https://swachify-india-be-1-mcrb.onrender.com/institution/management/exam-schedule"
    )
      .then((res) => res.json())
      .then(setExamData);
  }, []);

  /* ================= FILTER ================= */

  const filteredExams = useMemo(() => {
    return examData.filter((e) =>
      examMode === "midterm"
        ? e.exam_type.toLowerCase().includes("mid")
        : e.exam_type.toLowerCase().includes("final")
    );
  }, [examData, examMode]);

  const groupedExams = useMemo(() => {
    return filteredExams.reduce<Record<string, ExamData[]>>((acc, e) => {
      const key = `${e.day_name}, ${e.exam_date}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(e);
      return acc;
    }, {});
  }, [filteredExams]);

  /* ================= ACTIONS ================= */

  const saveReminder = () => {
    if (!selectedExam) return;

    setSavedReminders((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        subject: selectedExam.subject_name,
        trigger,
        sound,
        enabled,
      },
    ]);

    setScreen("saved-reminders");
  };

  const deleteReminder = (id: string) => {
    setSavedReminders((prev) => prev.filter((r) => r.id !== id));
  };

  /* ================= HEADER ================= */

  const Header = ({ title }: { title: string }) => (
    <div className="examw-header">
      <button
        className="examw-back-btn"
        onClick={() =>
          screen === "schedule" ? onBack() : setScreen("schedule")
        }
      >
        ←
      </button>
      <h1 className="examw-title">{title}</h1>
    </div>
  );

  /* ================= SET REMINDER ================= */

  if (screen === "set-reminder" && selectedExam) {
    return (
      <div className="examw-scope examw-page">
        <Header title="Set Exam Reminder" />

        <div className="examw-card">
          <strong>{selectedExam.subject_name}</strong>
          <p>
            {selectedExam.day_name}, {selectedExam.exam_date}
          </p>
          <p>
            {selectedExam.start_time} – {selectedExam.end_time}
          </p>
          <p>Location: {selectedExam.location}</p>
        </div>

        <div className="examw-card">
          <label className="examw-row">
            Enable Notifications
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
          </label>

          <label className="examw-label">Trigger Alert</label>
          <select
            className="examw-select"
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
          >
            <option>1 day before</option>
            <option>2 hours before</option>
            <option>30 minutes before</option>
          </select>

          <label className="examw-label">Notification Sound</label>
          <select
            className="examw-select"
            value={sound}
            onChange={(e) => setSound(e.target.value)}
          >
            <option>Chime</option>
            <option>Bell</option>
            <option>Alert</option>
          </select>
        </div>

        <button
          className="examw-btn examw-btn-primary"
          onClick={saveReminder}
        >
          Save Reminder
        </button>
      </div>
    );
  }

  /* ================= SAVED REMINDERS ================= */

  if (screen === "saved-reminders") {
    return (
      <div className="examw-scope examw-page">
        <Header title="Saved Reminders" />

        {savedReminders.map((r) => (
          <div key={r.id} className="examw-reminder-card">
            <div>
              <strong>{r.subject}</strong>
              <p>Alert: {r.trigger}</p>
              <p>Sound: {r.sound}</p>
              <p>Status: {r.enabled ? "Enabled" : "Disabled"}</p>
            </div>

            <button
              className="examw-delete"
              onClick={() => deleteReminder(r.id)}
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    );
  }

  /* ================= LOGS ================= */

  if (screen === "logs") {
    return (
      <div className="examw-scope examw-page">
        <Header title="Notification Logs" />

        <div className="examw-logs-wrapper">
          {LOGS.map((log) => (
            <div key={log.id} className="examw-log-card">
              <div
                className={`examw-log-icon ${
                  log.status === "success" ? "success" : "error"
                }`}
              >
                {log.status === "success" ? "✓" : "!"}
              </div>

              <div className="examw-log-text">
                <strong>{log.message}</strong>
                <p>{log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ================= STAFF ================= */

  if (screen === "staff") {
    return (
      <div className="examw-scope examw-page">
        <Header title="Manage Staff Assignments" />

        <div className="examw-staff-card">
          <div className="examw-staff-avatar">A</div>
          <div>
            <strong>Dr. Alice Johnson</strong>
            <p>alice@school.edu</p>
            <p>9876543210</p>
          </div>
        </div>

        <div className="examw-staff-card">
          <div className="examw-staff-avatar">B</div>
          <div>
            <strong>Prof. Bob Smith</strong>
            <p>bob@school.edu</p>
            <p>9876543222</p>
          </div>
        </div>
      </div>
    );
  }

  /* ================= SCHEDULE ================= */

  return (
    <div className="examw-scope examw-page">
      <Header
        title={
          examMode === "midterm"
            ? "Midterm Exam Schedule"
            : "Final Exam Schedule"
        }
      />

      {Object.entries(groupedExams).map(([date, exams]) => (
        <div key={date} className="examw-card">
          <div className="examw-date-row">
            {date}
            <span>{exams.length} Subject</span>
          </div>

          {exams.map((exam) => (
            <div
              key={`${exam.subject_name}-${exam.start_time}`}
              className="examw-exam"
              onClick={() => {
                setSelectedExam(exam);
                setScreen("set-reminder");
              }}
            >
              <div className="examw-exam-bar" />
              <div>
                <strong>{exam.subject_name}</strong>
                <p>
                  {exam.start_time} – {exam.end_time}
                </p>
              </div>
              <span className="examw-exam-location">
                {exam.location}
              </span>
            </div>
          ))}
        </div>
      ))}

      <div className="examw-actions">
        <button
          className="examw-btn"
          onClick={() => setScreen("logs")}
        >
          View Logs
        </button>

        <button
          className="examw-btn examw-btn-primary"
          onClick={() => setScreen("staff")}
        >
          Manage Staff Assignments
        </button>
      </div>
    </div>
  );
};

export default MidTermNotificationsWeb;
