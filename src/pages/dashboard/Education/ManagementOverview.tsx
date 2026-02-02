import React, { useState } from "react";
import "./ManagementOverview.css";
import Payroll from "../../dashboard/Education/Payroll"; 
import MidTermNotificationsWeb from "../../dashboard/Education/MidTermNotificationsWeb";
import FinalExamSchedule from "../../dashboard/Education/FinalExamSchedule";


// adjust path if needed




interface ManagementOverviewProps {
  onBack: () => void;
}

interface StudentForm {
  name: string;
  studentId: string;
  year: string;
  branch: string;
}

const ManagementOverview: React.FC<ManagementOverviewProps> = ({ onBack }) => {
  const [showBus, setShowBus] = useState(false);
  
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showBusList, setShowBusList] = useState(false);
const [selectedBus, setSelectedBus] = useState<any>(null);
const [busSearch, setBusSearch] = useState("");
const [showMidTerm, setShowMidTerm] = useState(false);
const [showFinalExam, setShowFinalExam] = useState(false);



const [showPayroll, setShowPayroll] = useState(false);
type PayrollMode = "PAYSLIPS" | "SALARY_OVERVIEW";

const [payrollMode, setPayrollMode] = useState<PayrollMode>("PAYSLIPS");









const buses = [
  {
    id: 1,
    number: "Bus 12",
    route: "Madhapur → College",
    driver: "Ramesh Kumar",
    status: "MOVING",
    speed: "35 km/h",
    nextStop: "Inorbit Mall",
    eta: "4 mins",
    lat: 17.4416,
    lng: 78.3910,
  },
  {
    id: 2,
    number: "Bus 7",
    route: "Kukatpally → College",
    driver: "Suresh",
    status: "IDLE",
    speed: "0 km/h",
    nextStop: "Depot",
    eta: "--",
    lat: 17.4948,
    lng: 78.3996,
  },
  {
    id: 3,
    number: "Bus 21",
    route: "LB Nagar → College",
    driver: "Mahesh",
    status: "OFF-ROUTE",
    speed: "--",
    nextStop: "Unknown",
    eta: "--",
    lat: 17.3506,
    lng: 78.5576,
  },
];



  const [studentForm, setStudentForm] = useState<StudentForm>({
    name: "",
    studentId: "",
    year: "",
    branch: "",
  });

  const sendSMSAlert = () => alert("📩 SMS Alert Sent");
  ;



  const saveStudent = () => {
    if (!studentForm.name || !studentForm.studentId || !studentForm.year || !studentForm.branch) {
      alert("⚠️ Please fill all fields");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("students") || "[]");
    localStorage.setItem(
      "students",
      JSON.stringify([...existing, { id: Date.now(), ...studentForm }])
    );

    setStudentForm({ name: "", studentId: "", year: "", branch: "" });
    setShowAddStudent(false);
    alert("✅ Student added");
  };
const filteredBuses = buses.filter((bus) =>
  `${bus.number} ${bus.route} ${bus.driver}`
    .toLowerCase()
    .includes(busSearch.toLowerCase())
);
if (showPayroll) {
  return (
   <Payroll
  onBack={() => setShowPayroll(false)}
  mode={payrollMode}
  initialView={payrollMode === "SALARY_OVERVIEW" ? "OVERVIEW" : "LIST"}
/>

  );
}
if (showMidTerm) {
  return (
    <MidTermNotificationsWeb
      onBack={() => setShowMidTerm(false)}
    />
  );
}

if (showFinalExam) {
  return (
    <FinalExamSchedule
      onBack={() => setShowFinalExam(false)}
    />
  );
}




  return (
      <div className="bsx-wrapper">
    <div className="mgmtw-page">
      {/* HEADER */}
      <header className="mgmtw-header">
        <div className="mgmtw-header-left">
          <button className="mgmtw-back" onClick={onBack}>←</button>
          <h2>Management Overview</h2>
        </div>

        <button className="mgmtw-action primary" onClick={() => setShowAddStudent(true)}>
          ➕ Add New Student
        </button>
      </header>

      <div className="mgmtw-container">

        {/* ================= ENROLLMENT ================= */}
        <section>
          <h3 className="mgmtw-section-title">Enrollment Status</h3>
          <div className="mgmtw-grid-2">
            <div className="mgmtw-card">
              <div className="mgmtw-card-top">
                <div className="mgmtw-icon blue">🎓</div>
                <span className="mgmtw-muted">Total Capacity</span>
              </div>
              <h1 className="mgmtw-number">500</h1>
              <div className="mgmtw-progress"><span style={{ width: "84%" }} /></div>
              <span className="mgmtw-muted">84% Occupancy</span>
            </div>

            <div className="mgmtw-card">
              <div className="mgmtw-card-top">
                <div className="mgmtw-icon green">✔</div>
                <span className="mgmtw-muted">Approved Seats</span>
              </div>
              <h1 className="mgmtw-number">420</h1>
              <span className="mgmtw-pill success">+12 new</span>
            </div>
          </div>
        </section>

        {/* ================= OPERATIONS ================= */}
        <section>
          <h3 className="mgmtw-section-title">Operations Status</h3>
          <div className="mgmtw-grid-2">
            <div className="mgmtw-card">
              <div className="mgmtw-card-top">
                <div className="mgmtw-icon blue">🚌</div>
                <span className="mgmtw-dot online" />
              </div>
              <h4>Bus Tracking</h4>
              <p className="mgmtw-muted">3 Buses Online</p>
              <button className="mgmtw-action" onClick={() => setShowBusList(true)}>
  Track Bus
</button>

            </div>

            <div className="mgmtw-card">
              <div className="mgmtw-card-top">
                <div className="mgmtw-icon blue">💬</div>
                <span className="mgmtw-dot online" />
              </div>
              <h4>SMS Alerts</h4>
              <p className="mgmtw-muted">System Online</p>
              <button className="mgmtw-action success" onClick={sendSMSAlert}>
                Send SMS Alert
              </button>
            </div>
          </div>
        </section>

        {/* ================= STAFF & PAYROLL ================= */}
        <section>
          <h3 className="mgmtw-section-title">Staff & Payroll</h3>

          <div className="mgmtw-card payroll-card">
            <div className="payroll-top">
              <div>
                <h4>Monthly Payroll</h4>
                <p className="mgmtw-muted">September 2023</p>
              </div>

              <div className="payroll-amount">
                <h2>$45,200</h2>
                <span className="mgmtw-muted">TOTAL DISBURSEMENT</span>
              </div>
            </div>
<div className="payroll-actions">
 <button
  onClick={() => {
    setPayrollMode("PAYSLIPS");
    setShowPayroll(true);
  }}
>
  📄 Payslips
</button>

<button
  onClick={() => {
    setPayrollMode("SALARY_OVERVIEW");
    setShowPayroll(true);
  }}
>
  💰 Salary Overview
</button>


  {/* <button
    onClick={() => {
      setPayrollView("OVERVIEW");
      setShowPayroll(true);
    }}
  >
    💰 Salary Overview
  </button> */}
</div>




          </div>
        </section>

        {/* ================= MAINTENANCE ================= */}
        <section>
          <h3 className="mgmtw-section-title">Maintenance Accountability</h3>
          <div className="mgmtw-card">
            <div className="mgmtw-card-top">
              <span className="mgmtw-muted">Maintenance Budget</span>
              <span className="mgmtw-pill warn">Under Budget</span>
            </div>
            <h2>$12,400 <span className="mgmtw-muted">/ $15k</span></h2>
            <div className="mgmtw-progress"><span style={{ width: "82%" }} /></div>
            <div className="mgmtw-budget-row">
              <span>Facility</span>
              <span>IT Infrastructure</span>
              <span>Misc</span>
            </div>
          </div>
        </section>

        {/* ================= EXAMS ================= */}
        <section>
          <h3 className="mgmtw-section-title">Exam Alerts</h3>

         <div
  className="exam-item"
  onClick={() => setShowMidTerm(true)}
>

            <div className="exam-icon warn">🔔</div>
            <div className="exam-text">
              <strong>Mid-term Notifications</strong>
              <p>Sent to 95% of parent contacts</p>
            </div>
            <span className="exam-arrow">›</span>
          </div>

         <div
  className="exam-item"
  onClick={() => setShowFinalExam(true)}
>

            <div className="exam-icon blue">📅</div>
            <div className="exam-text">
              <strong>Final Exam Schedule</strong>
              <p>Draft version ready for review</p>
            </div>
            <span className="exam-arrow">›</span>
          </div>
        </section>
      </div>

      {/* ================= MODALS ================= */}
   {showBusList && (
  <div className="mgmtw-modal">
    <div className="mgmtw-modal-card bus-list-card">

      <div className="bus-list-header">
        <h3>Bus Tracking Status</h3>
      </div>

      {/* ✅ SEARCH – CORRECT PLACE */}
    <div className="bus-list-search">
  <input
    type="text"
    placeholder="Search Bus ID or Route"
    value={busSearch}
    onChange={(e) => setBusSearch(e.target.value)}
  />
</div>


      {filteredBuses.map((bus) => (

        <div
          key={bus.id}
          className="bus-item"
          onClick={() => {
            setSelectedBus(bus);
            setShowBusList(false);
          }}
        >
          <div className="bus-icon">🚌</div>

          <div className="bus-info">
            <strong>{bus.number}</strong>
            <p>{bus.route}</p>
          </div>

          <span className="bus-status online">MOVING</span>
          <span className="bus-arrow">›</span>
        </div>
      ))}

      <button className="mgmtw-link" onClick={() => setShowBusList(false)}>
        Close
      </button>
    </div>
  </div>
)}

{selectedBus && (
  <div className="mgmtw-modal">
    <div className="mgmtw-modal-card bus-map-full">

      {/* ===== TOP BAR ===== */}
      <div className="bus-topbar">
        <h3>Live Tracking</h3>
        <button className="link-btn" onClick={() => {
          setSelectedBus(null);
          setShowBusList(true);
        }}>
          List View
        </button>
      </div>

      {/* SEARCH */}
     

      {/* MAP WRAPPER */}
      <div className="bus-map-wrapper">
        <iframe
          title="bus-location"
          src={`https://www.google.com/maps?q=${selectedBus.lat},${selectedBus.lng}&z=14&output=embed`}
        />

        {/* MAP CONTROLS */}
        <div className="map-controls">
          <button>+</button>
          <button>−</button>
          <button>📍</button>
        </div>
      </div>

      {/* ===== BOTTOM INFO PANEL ===== */}
      <div className="bus-bottom-panel">

        <div className="bus-summary">
          <div className="bus-avatar">🚌</div>
          <div>
            <strong>{selectedBus.number}</strong>
            <p>Driver: {selectedBus.driver}</p>
            <span className="moving">● {selectedBus.status}</span>
          </div>
          <span className="live-badge">LIVE</span>
        </div>

        <div className="bus-stats">
          <div className="stat-card">
            <span>Current Speed</span>
            <strong>{selectedBus.speed}</strong>
            <small>+5 km/h from avg</small>
          </div>

          <div className="stat-card">
            <span>Next Stop</span>
            <strong>{selectedBus.nextStop}</strong>
            <small>ETA {selectedBus.eta}</small>
          </div>
        </div>

        <button className="contact-driver-btn">
          📞 Contact Driver
        </button>
      </div>
    </div>
  </div>
)}



      {showAddStudent && (
        <div className="mgmtw-modal">
          <div className="mgmtw-modal-card">
            <h3>Add New Student</h3>
            <input placeholder="Student Name" value={studentForm.name}
              onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} />
            <input placeholder="Student ID" value={studentForm.studentId}
              onChange={(e) => setStudentForm({ ...studentForm, studentId: e.target.value })} />
            <input placeholder="Year" value={studentForm.year}
              onChange={(e) => setStudentForm({ ...studentForm, year: e.target.value })} />
            <input placeholder="Branch" value={studentForm.branch}
              onChange={(e) => setStudentForm({ ...studentForm, branch: e.target.value })} />
            <button className="mgmtw-action success" onClick={saveStudent}>Save Student</button>
            <button className="mgmtw-link" onClick={() => setShowAddStudent(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showBus && (
        <div className="mgmtw-modal">
          <div className="mgmtw-modal-card">
            <h3>Live Bus Tracking</h3>
            <iframe
              title="bus-map"
              width="100%"
              height="300"
              src="https://www.google.com/maps?q=17.385044,78.486671&z=14&output=embed"
            />
            <button className="mgmtw-action" onClick={() => setShowBus(false)}>Close</button>
          </div>
        </div>
      )}

     
    </div>
    </div>
  );
};

export default ManagementOverview;
