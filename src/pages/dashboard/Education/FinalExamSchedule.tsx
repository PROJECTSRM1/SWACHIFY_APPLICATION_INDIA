import React, { useState } from "react";
import { Card, Button, Switch, Tag, message } from "antd";

import { MdArrowBack, MdDelete, MdNotifications } from "react-icons/md";
import "./FinalExamSchedule.css";
interface FinalExamScheduleProps {
  onBack: () => void;
}


const examData = [
  {
    id: "1",
    subject: "Mathematics",
    date: "Nov 15",
    day: "Friday",
    time: "09:00 AM - 12:00 PM",
    location: "Main Hall",
    color: "#3B82F6",
  },
  {
    id: "2",
    subject: "English Literature",
    date: "Nov 18",
    day: "Monday",
    time: "01:00 PM - 04:00 PM",
    location: "Hall A",
    color: "#A855F7",
  },
];

const FinalExamSchedule: React.FC<FinalExamScheduleProps> = ({ onBack }) => {

  const [screen, setScreen] = useState<
    "timetable" | "reminder" | "saved-reminders"
  >("timetable");

  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [savedReminders, setSavedReminders] = useState<any[]>([]);
  const [reminderEnabled, setReminderEnabled] = useState(true);
 const [triggerTime] = useState("2 days");
const [sound] = useState("Bell");


  const groupedExams = examData.reduce((acc: any, exam) => {
    const key = `${exam.day}, ${exam.date}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(exam);
    return acc;
  }, {});

  const saveReminder = () => {
    if (!selectedExam) return;

    setSavedReminders(prev => [
      ...prev,
      {
        id: Date.now(),
        subject: selectedExam.subject,
        triggerTime,
        sound,
        enabled: reminderEnabled,
      },
    ]);

    message.success("Reminder saved successfully");
    setScreen("saved-reminders");
  };

  /* ---------------- TIMETABLE ---------------- */
  if (screen === "timetable") {
    return (
      <div className="fes-container">
        <h1>Final Exam Schedule</h1>
        <p className="subtitle">November 2023</p>

        {Object.entries(groupedExams).map(([date, exams]: any) => (
          <Card key={date} className="date-card">
            <div className="date-header">
              <strong>{date}</strong>
              <Tag color="purple">{exams.length} Subjects</Tag>
            </div>

            {exams.map((exam: any) => (
              <div
                key={exam.id}
                className="exam-row"
                onClick={() => {
                  setSelectedExam(exam);
                  setScreen("reminder");
                }}
              >
                <div
                  className="color-bar"
                  style={{ background: exam.color }}
                />
                <div className="exam-info">
                  <b>{exam.subject}</b>
                  <div className="muted">{exam.time}</div>
                </div>
                <Tag color="purple">FINAL</Tag>
              </div>
            ))}
          </Card>
        ))}

        {savedReminders.length > 0 && (
          <Button
            type="primary"
            onClick={() => setScreen("saved-reminders")}
          >
            View Saved Reminders ({savedReminders.length})
          </Button>
        )}
      </div>
    );
  }

  /* ---------------- REMINDER ---------------- */
  if (screen === "reminder") {
    return (
      <div className="fes-container">
       <Button icon={<MdArrowBack />} onClick={onBack}>

          Back
        </Button>

        <h2>{selectedExam.subject}</h2>
        <p className="muted">
          {selectedExam.day}, {selectedExam.date} • {selectedExam.time}
        </p>

        <Card>
          <div className="setting-row">
            Enable Notification
            <Switch
              checked={reminderEnabled}
              onChange={setReminderEnabled}
            />
          </div>

          <div className="setting-row">
            Trigger Time
            <Button>{triggerTime}</Button>
          </div>

          <div className="setting-row">
            Sound
            <Button>{sound}</Button>
          </div>
        </Card>

        <Button type="primary" onClick={saveReminder}>
          Save Reminder
        </Button>
      </div>
    );
  }

  /* ---------------- SAVED REMINDERS ---------------- */
  return (
    <div className="fes-container">
     <Button icon={<MdArrowBack />} onClick={onBack}>
        Back
      </Button>

      <h2>Saved Reminders</h2>

      {savedReminders.map(reminder => (
        <Card key={reminder.id} className="reminder-card">
          <MdNotifications size={24} />
          <div className="reminder-info">
            <b>{reminder.subject}</b>
            <div className="muted">
              {reminder.triggerTime} before
            </div>
          </div>
          <MdDelete
            className="delete"
            onClick={() =>
              setSavedReminders(prev =>
                prev.filter(r => r.id !== reminder.id)
              )
            }
          />
        </Card>
      ))}
    </div>
  );
};

export default FinalExamSchedule;
