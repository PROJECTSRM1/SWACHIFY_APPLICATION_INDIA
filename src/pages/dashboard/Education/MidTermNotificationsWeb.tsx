import React, { useEffect, useMemo, useState } from "react";
import "./MidTermNotificationsWeb.css";

/* ================= TYPES ================= */

interface ExamData {
  exam_date: string;
  day_name: string;
  subject_name: string;
  exam_type: string;
  start_time: string;
  end_time: string;
  location: string;
}

interface ReminderData {
  id: string;
  exam_id: string;
  trigger_time: string;
  sound: string;
  enabled: boolean;
  created_at: string;
}

interface AssignmentData {
  id: string;
  staff_name: string;
  staff_email: string;
  staff_phone: string;
  exam_id: string;
}

interface Props {
  onBack: () => void;
}

/* ================= API BASE ================= */

const API_BASE = "https://swachify-india-be-1-mcrb.onrender.com";

/* ================= COMPONENT ================= */

const MidTermNotificationsWeb: React.FC<Props> = ({ onBack }) => {
  const [screen, setScreen] = useState<
    "timetable" | "reminder" | "staff" | "saved-reminders"
  >("timetable");

  const [activeTab] = useState<"midterm" | "final">("midterm");

  const [examData, setExamData] = useState<ExamData[]>([]);
  const [selectedExam, setSelectedExam] = useState<ExamData | null>(null);

  const [reminders, setReminders] = useState<ReminderData[]>([]);
  const [assignments, setAssignments] = useState<AssignmentData[]>([]);

  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    fetchExamSchedule();
    fetchAllReminders();
  }, []);

  const fetchExamSchedule = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_BASE}/institution/management/exam-schedule`
      );

      if (!res.ok) throw new Error("Failed to load exam schedule");

      const data = await res.json();
      setExamData(data);
    } catch (err) {
      console.error("Exam schedule error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllReminders = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/institution/management/Get-All-Exam-Reminder`
      );

      if (!res.ok) throw new Error("Failed to fetch exam reminders");

      const data = await res.json();
      setReminders(data);
    } catch (err) {
      console.error("Reminder fetch error:", err);
    }
  };

  const fetchAssignment = async (assignmentId: string) => {
    try {
      const res = await fetch(
        `${API_BASE}/institution/management/exam-invigilation/${assignmentId}`
      );

      if (!res.ok) return;

      const data = await res.json();
      setAssignments([data]);
    } catch (err) {
      console.error("Assignment fetch error:", err);
    }
  };

  /* ================= DATA LOGIC ================= */

  const filteredExams = useMemo(() => {
    return examData.filter(e => {
      const type = e.exam_type.toLowerCase();

      if (activeTab === "midterm") return type.includes("mid");
      if (activeTab === "final") return type.includes("final");

      return false;
    });
  }, [examData, activeTab]);

  const groupedExams = useMemo(() => {
    return filteredExams.reduce<Record<string, ExamData[]>>((acc, exam) => {
      const key = `${exam.day_name}, ${exam.exam_date}`;
      acc[key] = acc[key] || [];
      acc[key].push(exam);
      return acc;
    }, {});
  }, [filteredExams]);

  /* ================= SAVED REMINDERS ================= */

  if (screen === "saved-reminders") {
    return (
      <div className="examw-page">
        <button onClick={() => setScreen("timetable")}>← Back</button>
        <h2>Saved Exam Reminders</h2>

        {reminders.map(r => (
          <div key={r.id} className="examw-card">
            <strong>Exam ID: {r.exam_id}</strong>
            <p>Trigger Time: {r.trigger_time}</p>
            <p>Sound: {r.sound}</p>
            <p>Status: {r.enabled ? "Enabled" : "Disabled"}</p>
          </div>
        ))}
      </div>
    );
  }

  /* ================= STAFF ================= */

  if (screen === "staff") {
    return (
      <div className="examw-page">
        <button onClick={() => setScreen("timetable")}>← Back</button>
        <h2>Invigilation Assignments</h2>

        {assignments.map(a => (
          <div key={a.id} className="staff-card">
            <strong>{a.staff_name}</strong>
            <p>{a.staff_email}</p>
            <p>{a.staff_phone}</p>
          </div>
        ))}
      </div>
    );
  }

  /* ================= REMINDER ================= */

  if (screen === "reminder" && selectedExam) {
    return (
      <div className="examw-page">
        <button onClick={() => setScreen("timetable")}>← Back</button>

        <h2>Exam Details</h2>

        <div className="examw-card">
          <strong>{selectedExam.subject_name}</strong>
          <p>Date: {new Date(selectedExam.exam_date).toDateString()}</p>
          <p>
            Time: {selectedExam.start_time} - {selectedExam.end_time}
          </p>
          <p>Location: {selectedExam.location}</p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setScreen("saved-reminders")}
        >
          View Saved Reminders
        </button>
      </div>
    );
  }

  /* ================= TIMETABLE ================= */

  return (
    <div className="examw-page">
      <button className="btn-back" onClick={onBack}>
        ←
      </button>

      <h2>Exam Timetable</h2>

      {loading && <p>Loading exam schedule…</p>}

      {!loading &&
        Object.entries(groupedExams).map(([date, exams]) => (
          <div key={date} className="examw-card">
            <strong>{date}</strong>

            {exams.map(exam => (
              <div
                key={`${exam.exam_date}-${exam.subject_name}`}
                className="examw-exam"
                onClick={() => {
                  setSelectedExam(exam);
                  setScreen("reminder");
                }}
              >
                <div>
                  <strong>{exam.subject_name}</strong>
                  <p>
                    {exam.start_time} - {exam.end_time}
                  </p>
                </div>
                <span>{exam.location}</span>
              </div>
            ))}
          </div>
        ))}

      <button
        className="btn-primary"
        onClick={() => {
          fetchAssignment("1");
          setScreen("staff");
        }}
      >
        View Invigilation Staff
      </button>
    </div>
  );
};

export default MidTermNotificationsWeb;
