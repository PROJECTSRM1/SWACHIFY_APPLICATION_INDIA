import { useState } from "react"; // ✅ ADDED
import "./AdminDashboard.css";
import {
  LayoutDashboard,
  Calendar,

  Ticket,
  CreditCard,
  BarChart,
 
} from "lucide-react";
type TicketStatus = "Pending" | "InProgress" | "Closed";

interface TicketCard {
  id: string;
  customer: string;
  serviceType: string;
  bookingCount: number;
  address: string;
  date: string;
  amount: number;
  status: TicketStatus;   // ⬅️ change here
  assignedFreelancer?: string;
}




const AdminDashboard = () => {
  const [bookingSearch, setBookingSearch] = useState("");
  const [showFreelancerPopup, setShowFreelancerPopup] = useState(false);
const [freelancerView, setFreelancerView] = useState<"pending" | "total">(
  "pending"
);
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleRejectFreelancer = (id: string) => {
  setFreelancers((prev) =>
    prev.filter((f) => f.id !== id)
  );
};


  const [ticketFilter, setTicketFilter] = useState<
  "All" | "Pending" | "InProgress" | "Closed"
>("All");

const assignFreelancer = (freelancerName: string) => {
  setTicketCards((prev) =>
    prev.map((ticket) =>
      ticket.id === selectedTicketId
        ? {
            ...ticket,
            status: "InProgress", // ⬅️ IMPORTANT
            assignedFreelancer: freelancerName,
          }
        : ticket
    )
  );

  setShowFreelancerModal(false);
  setSelectedTicketId(null);
};
const handleLogout = () => {
 

  window.history.back(); // ⬅️ GO BACK
};

const [activeView, setActiveView] = useState<
  "dashboard" | "tickets" | "bookings" | "payments" | "reports"
>("dashboard");


const [ticketCards, setTicketCards] = useState<TicketCard[]>([
  // -------- Pending --------
  {
    id: "REQ-001",
    customer: "Rahul",
    serviceType: "2BHK Flat Cleaning",
    bookingCount: 1,
    address: "Flat 302, Green View Apartments, Madhapur",
    date: "09 Feb, 10:00 AM",
    amount: 1200,
    status: "Pending",
  },
  {
    id: "REQ-002",
    customer: "Suresh",
    serviceType: "Sofa Cleaning",
    bookingCount: 2,
    address: "KPHB Phase 2",
    date: "10 Feb, 11:00 AM",
    amount: 1800,
    status: "Pending",
  },
  {
    id: "REQ-003",
    customer: "Meena",
    serviceType: "Bathroom Cleaning",
    bookingCount: 1,
    address: "Miyapur",
    date: "10 Feb, 01:00 PM",
    amount: 600,
    status: "Pending",
  },
  {
    id: "REQ-004",
    customer: "Arjun",
    serviceType: "Office Cleaning",
    bookingCount: 1,
    address: "Hitech City",
    date: "11 Feb, 09:00 AM",
    amount: 3000,
    status: "Pending",
  },

  // -------- InProgress --------
  {
    id: "REQ-005",
    customer: "Anita",
    serviceType: "Kitchen Deep-Cleaning",
    bookingCount: 1,
    address: "Palm Meadows, Gachibowli",
    date: "09 Feb, 02:00 PM",
    amount: 800,
    status: "InProgress",
    assignedFreelancer: "Sunita",
  },
  {
    id: "REQ-006",
    customer: "Karthik",
    serviceType: "1BHK Flat Cleaning",
    bookingCount: 1,
    address: "Kondapur",
    date: "10 Feb, 03:00 PM",
    amount: 1000,
    status: "InProgress",
    assignedFreelancer: "Ravi",
  },
  {
    id: "REQ-007",
    customer: "Priya",
    serviceType: "Sofa + Carpet Cleaning",
    bookingCount: 3,
    address: "Manikonda",
    date: "11 Feb, 12:00 PM",
    amount: 2200,
    status: "InProgress",
    assignedFreelancer: "Ravi",
  },
  {
    id: "REQ-008",
    customer: "Vikram",
    serviceType: "Move-out Cleaning",
    bookingCount: 1,
    address: "Jubilee Hills",
    date: "11 Feb, 05:00 PM",
    amount: 4500,
    status: "InProgress",
    assignedFreelancer: "Sunita",
  },

  // -------- Closed --------
  {
    id: "REQ-009",
    customer: "Naveen",
    serviceType: "Bathroom Deep Cleaning",
    bookingCount: 2,
    address: "Begumpet",
    date: "07 Feb, 10:30 AM",
    amount: 1200,
    status: "Closed",
  },
  {
    id: "REQ-010",
    customer: "Asha",
    serviceType: "Kitchen Cleaning",
    bookingCount: 1,
    address: "LB Nagar",
    date: "07 Feb, 01:00 PM",
    amount: 700,
    status: "Closed",
  },
  {
    id: "REQ-011",
    customer: "Rohit",
    serviceType: "Full Home Cleaning",
    bookingCount: 1,
    address: "Banjara Hills",
    date: "06 Feb, 09:00 AM",
    amount: 3500,
    status: "Closed",
  },
  {
    id: "REQ-012",
    customer: "Divya",
    serviceType: "Sofa Cleaning",
    bookingCount: 2,
    address: "Nallagandla",
    date: "06 Feb, 11:00 AM",
    amount: 1600,
    status: "Closed",
  },
  {
    id: "REQ-013",
    customer: "Sanjay",
    serviceType: "Office Cleaning",
    bookingCount: 1,
    address: "Gachibowli",
    date: "05 Feb, 10:00 AM",
    amount: 4000,
    status: "Closed",
  },
  {
    id: "REQ-014",
    customer: "Neha",
    serviceType: "1BHK Cleaning",
    bookingCount: 1,
    address: "Madhapur",
    date: "05 Feb, 03:00 PM",
    amount: 900,
    status: "Closed",
  },
  {
    id: "REQ-015",
    customer: "Imran",
    serviceType: "Balcony Cleaning",
    bookingCount: 1,
    address: "Tolichowki",
    date: "04 Feb, 04:30 PM",
    amount: 500,
    status: "Closed",
  },
]);
const totalTicketsCount = ticketCards.length;

const inProgressTicketsCount = ticketCards.filter(
  (ticket: TicketCard) => ticket.status === "InProgress"
).length;


const filteredTickets =
  ticketFilter === "All"
    ? ticketCards
    : ticketCards.filter((ticket) => ticket.status === ticketFilter);

interface Freelancer {
  id: string;
  name: string;
  skills: string[];
  isAvailable: boolean;
  status: "pending" | "approved";
}


const [freelancers, setFreelancers] = useState<Freelancer[]>([ 
  {
    id: "F001",
    name: "Ravi",
    skills: ["Home Cleaning", "Full Home Cleaning"],
    isAvailable: true,
    status: "pending",
  },
  {
    id: "F002",
    name: "Sunita",
    skills: ["Kitchen Cleaning", "Bathroom Cleaning"],
    isAvailable: true,
    status: "pending",
  },
  {
    id: "F003",
    name: "Akhil",
    skills: ["Sofa Cleaning", "Carpet Cleaning"],
    isAvailable: false,
    status: "pending",
  },
  {
    id: "F004",
    name: "Kiran",
    skills: ["Move-out Cleaning", "Balcony Cleaning"],
    isAvailable: true,
    status: "pending",
  },
  {
    id: "F005",
    name: "Sneha",
    skills: ["Bathroom Deep Cleaning", "Tile Cleaning"],
    isAvailable: true,
    status: "pending",
  },

  // -------- Approved (Total Freelancers) --------
  {
    id: "F006",
    name: "Pooja",
    skills: ["1BHK Cleaning", "2BHK Cleaning"],
    isAvailable: true,
    status: "approved",
  },
  {
    id: "F007",
    name: "Manoj",
    skills: ["Office Cleaning"],
    isAvailable: true,
    status: "approved",
  },
  {
    id: "F008",
    name: "Arif",
    skills: ["Sofa Cleaning", "Chair Cleaning"],
    isAvailable: true,
    status: "approved",
  },
  {
    id: "F009",
    name: "Lakshman",
    skills: ["Villa Cleaning", "Full Home Cleaning"],
    isAvailable: false,
    status: "approved",
  },
  {
    id: "F010",
    name: "Farah",
    skills: ["Kitchen Cleaning", "Dishwash Area Cleaning"],
    isAvailable: true,
    status: "approved",
  },
]);

// ✅ ADD HERE (right below freelancers state)
const pendingFreelancers = freelancers.filter(
  (f) => f.status === "pending"
);

const totalFreelancers = freelancers.filter(
  (f) => f.status === "approved"
);

const handleApproveFreelancer = (id: string) => {
  setFreelancers((prev) =>
    prev.map((f) =>
      f.id === id
        ? { ...f, status: "approved" }
        : f
    )
  );

  // optional: auto-switch to Total tab
  setFreelancerView("total");
};

const [showFreelancerModal, setShowFreelancerModal] = useState(false);
const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);



interface Booking {
  id: string;
  customer: string;
  location: string;
  serviceType: string;
  paymentStatus: "Paid" | "Unpaid";
  workStatus: "Pending" | "In Progress" | "Completed";
  assignedTo?: string;
  amount: number;
}

const bookings: Booking[] = [
  {
    id: "BK-001",
    customer: "Rahul",
    location: "Madhapur",
    serviceType: "2BHK Flat Cleaning",
    paymentStatus: "Paid",
    workStatus: "Completed",
    assignedTo: "Ravi",
    amount: 1200,
  },
  {
    id: "BK-002",
    customer: "Anita",
    location: "Gachibowli",
    serviceType: "Kitchen Cleaning",
    paymentStatus: "Paid",
    workStatus: "In Progress",
    assignedTo: "Sunita",
    amount: 800,
  },
  {
    id: "BK-003",
    customer: "Suresh",
    location: "KPHB",
    serviceType: "Office Cleaning",
    paymentStatus: "Unpaid",
    workStatus: "Pending",
    amount: 3000,
  },
];

const filteredBookings = bookings.filter((booking) =>
  booking.customer.toLowerCase().includes(bookingSearch.toLowerCase())
);


// ================= PAYMENTS LOGIC =================
const [paymentFilter, setPaymentFilter] = useState<
  "All" | "Paid" | "Unpaid"
>("All");

const totalRevenue = bookings
  .filter((b) => b.paymentStatus === "Paid")
  .reduce((sum, b) => sum + b.amount, 0);

const unpaidAmount = bookings
  .filter((b) => b.paymentStatus === "Unpaid")
  .reduce((sum, b) => sum + b.amount, 0);

const filteredPayments =
  paymentFilter === "All"
    ? bookings
    : bookings.filter(
        (b) => b.paymentStatus === paymentFilter
      );
// ================= REPORTS LOGIC =================
const totalBookings = bookings.length;

const completedWork = bookings.filter(
  (b) => b.workStatus === "Completed"
).length;

const pendingWork = bookings.filter(
  (b) => b.workStatus === "Pending"
).length;

const closedTickets = ticketCards.filter(
  (t) => t.status === "Closed"
).length;

  return (
    <div className="admin-dashboard">
      {isSidebarOpen && (
  <div
    className="sidebar-overlay"
    onClick={() => setIsSidebarOpen(false)}
  />
)}

<aside
  className={`admin-dashboard__sidebar ${
    isSidebarOpen ? "sidebar-open" : ""
  }`}
>
  <button
  className="sidebar-close"
  onClick={() => setIsSidebarOpen(false)}
>
  ✕
</button>

  <nav className="admin-dashboard__menu">
    {/* MENU ITEMS */}
    <a
      className={`admin-dashboard__menu-item ${
        activeView === "dashboard"
          ? "admin-dashboard__menu-item--active"
          : ""
      }`}
      onClick={() => setActiveView("dashboard")}
    >
      <LayoutDashboard size={18} />
      <span>Dashboard</span>
    </a>

    <a
      className={`admin-dashboard__menu-item ${
        activeView === "bookings"
          ? "admin-dashboard__menu-item--active"
          : ""
      }`}
      onClick={() => setActiveView("bookings")}
    >
      <Calendar size={18} />
      <span>Bookings</span>
    </a>

    <a
      className={`admin-dashboard__menu-item ${
        activeView === "tickets"
          ? "admin-dashboard__menu-item--active"
          : ""
      }`}
      onClick={() => setActiveView("tickets")}
    >
      <Ticket size={18} />
      <span>Tickets</span>
    </a>

    <a
  className={`admin-dashboard__menu-item ${
    activeView === "payments"
      ? "admin-dashboard__menu-item--active"
      : ""
  }`}
  onClick={() => setActiveView("payments")}
>
  <CreditCard size={18} />
  <span>Payments</span>
</a>


    <a
  className={`admin-dashboard__menu-item ${
    activeView === "reports"
      ? "admin-dashboard__menu-item--active"
      : ""
  }`}
  onClick={() => setActiveView("reports")}
>
  <BarChart size={18} />
  <span>Reports</span>
</a>

  </nav>

  {/* 🔴 LOGOUT AT BOTTOM */}
  <div className="admin-dashboard__logout">
    <button onClick={handleLogout}>
      Logout
    </button>
  </div>
</aside>

      {/* Main Content */}
      <main className="admin-dashboard__content">{/* MOBILE HEADER */}
<div className="mobile-header">
  <button
    className="hamburger-btn"
    onClick={() => setIsSidebarOpen(true)}
  >
    ☰
  </button>
</div>

        {activeView === "dashboard" && (
          <>
          <h1 className="admin-dashboard__main-title">
  Admin Dashboard
</h1>

            {/* KPI Cards */}
            <section className="admin-dashboard__stats">
              
             <div
  className="admin-dashboard__stat-card clickable"
onClick={() => {
  setFreelancerView("pending"); // default
  setShowFreelancerPopup(true);
}}
>
  <p className="admin-dashboard__stat-label">Freelancers</p>
  <h2 className="admin-dashboard__stat-value">32</h2>
</div>



            <div
  className="admin-dashboard__stat-card clickable"
  onClick={() => setActiveView("tickets")}
>
  <p className="admin-dashboard__stat-label">
    Total Tickets
  </p>
  <h2 className="admin-dashboard__stat-value">
    {totalTicketsCount}
  </h2>
</div>


<div
  className="admin-dashboard__stat-card clickable"
  onClick={() => {
    setActiveView("tickets");       
    setTicketFilter("InProgress");   
  }}
>
  <p className="admin-dashboard__stat-label">
    In-Progress
  </p>
  <h2 className="admin-dashboard__stat-value">
    {inProgressTicketsCount}
  </h2>
</div>


            </section>

            {/* Recent Bookings */}
            <section className="admin-dashboard__table">
              <h3 className="admin-dashboard__table-title">
                Recent Bookings
              </h3>

              <table className="admin-dashboard__table-content">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Rahul</td>
                    <td>Home Cleaning</td>
                    <td>09 Feb</td>
                    <td>
                      <span className="admin-dashboard__status admin-dashboard__status--completed">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Anita</td>
                    <td>Bathroom Cleaning</td>
                    <td>09 Feb</td>
                    <td>
                      <span className="admin-dashboard__status admin-dashboard__status--pending">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Suresh</td>
                    <td>Office Cleaning</td>
                    <td>08 Feb</td>
                    <td>
                      <span className="admin-dashboard__status admin-dashboard__status--cancelled">
                        Cancelled
                      </span>
                    </td>
                  </tr>
                </tbody>
    

              </table>
            </section>
            
          </>
        )}
        {activeView === "bookings" && (
  <section className="admin-dashboard__bookings">
    <div className="admin-dashboard__bookings-header">
      <div>
        <h2>All Bookings</h2>
<p>Showing {filteredBookings.length} records</p>
      </div>

      <div className="admin-dashboard__bookings-actions">
        <input
  type="text"
  placeholder="Search customer..."
  className="admin-dashboard__search"
  value={bookingSearch}
  onChange={(e) => setBookingSearch(e.target.value)}
/>

<button
  className="admin-dashboard__reset-btn"
  onClick={() => setBookingSearch("")}
>
  Reset
</button>
      </div>
    </div>

    <table className="admin-dashboard__bookings-table">
      <thead>
        <tr>
          <th>Booking ID</th>
          <th>Customer Name</th>
          <th>Location</th>
          <th>Service Type</th>
          <th>Payment Status</th>
          <th>Work Status</th>
          <th>Assigned To</th>
          <th>Amount</th>
        </tr>
      </thead>

      <tbody>
{filteredBookings.map((booking) => (
          <tr key={booking.id}>
            <td>{booking.id}</td>
            <td>{booking.customer}</td>
            <td>{booking.location}</td>
            <td>{booking.serviceType}</td>
            <td>{booking.paymentStatus}</td>
            <td>{booking.workStatus}</td>
            <td>{booking.assignedTo || "-"}</td>
            <td>₹{booking.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
)}


{/* ================= CLEANING SERVICE TICKETS ================= */}
{activeView === "tickets" && (
  <section className="admin-dashboard__tickets">
    <div className="admin-dashboard__tickets-header">
  <h2 className="admin-dashboard__page-title">
    Cleaning Service Requests
  </h2>

  <select
    className="admin-dashboard__filter-dropdown"
    value={ticketFilter}
    onChange={(e) =>
      setTicketFilter(
        e.target.value as "All" | "Pending" | "InProgress" | "Closed"
      )
    }
  >
    <option value="All">All</option>
    <option value="Pending">Pending</option>
    <option value="InProgress">In Progress</option>
    <option value="Closed">Closed</option>
  </select>
</div>



{filteredTickets.map((ticket) => (
    <div className="admin-dashboard__ticket-card">
  <div className="admin-dashboard__ticket-header">
    <h3>{ticket.serviceType}</h3>
    {ticket.assignedFreelancer && (
  <div className="admin-dashboard__assigned">
    👤 Assigned to <strong>{ticket.assignedFreelancer}</strong>
  </div>
)}




    <span
  className={`admin-dashboard__status admin-dashboard__status--${ticket.status.toLowerCase()}`}
>
  {ticket.status}
</span>

  </div>

  {/* Address */}
  <p className="admin-dashboard__ticket-address">
    📍 {ticket.address}
  </p>

  {/* Meta Info */}
  <div className="admin-dashboard__ticket-meta">
    <span>
      <strong>Customer:</strong> {ticket.customer}
    </span>
    <span>
      <strong>Date:</strong> {ticket.date}
    </span>
    <span>
      <strong>Bookings:</strong> {ticket.bookingCount}
    </span>
    <span>
      <strong>Payment:</strong> ₹{ticket.amount}
    </span>
  </div>

  {/* Action */}
  {ticket.status === "Pending" && (
    <div className="admin-dashboard__ticket-action">
  <button
  className="admin-dashboard__accept-btn"
  onClick={() => {
    setSelectedTicketId(ticket.id);
    setShowFreelancerModal(true);
  }}
>
  Assign Freelancer
</button>

    </div>
  )}
</div>

    ))}
  </section>
)}

{/* ================= PAYMENTS ================= */}
{activeView === "payments" && (
  <section className="admin-dashboard__payments">
    <h2>Payments Overview</h2>

    <div className="admin-dashboard__stats">
      <div className="admin-dashboard__stat-card">
        <p>Total Revenue</p>
        <h2>₹{totalRevenue}</h2>
      </div>

      <div className="admin-dashboard__stat-card">
        <p>Unpaid Amount</p>
        <h2>₹{unpaidAmount}</h2>
      </div>
    </div>

    <div className="payments-filter-wrapper">
  <select
    className="payments-filter"
    value={paymentFilter}
    onChange={(e) =>
      setPaymentFilter(
        e.target.value as "All" | "Paid" | "Unpaid"
      )
    }
  >
    <option value="All">All</option>
    <option value="Paid">Paid</option>
    <option value="Unpaid">Unpaid</option>
  </select>
</div>


    <table className="admin-dashboard__bookings-table">
      <thead>
        <tr>
          <th>Booking ID</th>
          <th>Customer</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {filteredPayments.map((payment) => (
          <tr key={payment.id}>
            <td>{payment.id}</td>
            <td>{payment.customer}</td>
            <td>₹{payment.amount}</td>
            <td>{payment.paymentStatus}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
)}
{/* ================= REPORTS ================= */}
{activeView === "reports" && (
  <section className="admin-dashboard__reports">
    <h2>Business Reports</h2>

    <div className="admin-dashboard__stats">
      <div className="admin-dashboard__stat-card">
        <p>Total Bookings</p>
        <h2>{totalBookings}</h2>
      </div>

      <div className="admin-dashboard__stat-card">
        <p>Total Tickets</p>
        <h2>{totalTicketsCount}</h2>
      </div>

      <div className="admin-dashboard__stat-card">
        <p>Closed Tickets</p>
        <h2>{closedTickets}</h2>
      </div>

      <div className="admin-dashboard__stat-card">
        <p>Completed Work</p>
        <h2>{completedWork}</h2>
      </div>

      <div className="admin-dashboard__stat-card">
        <p>Pending Work</p>
        <h2>{pendingWork}</h2>
      </div>

      <div className="admin-dashboard__stat-card">
        <p>Total Revenue</p>
        <h2>₹{totalRevenue}</h2>
      </div>
    </div>
  </section>
)}


      </main>
      {/* ================= ASSIGN FREELANCER POPUP ================= */}
{showFreelancerModal && (
  <div
    className="admin-dashboard__modal"
    onClick={() => setShowFreelancerModal(false)}
  >
    <div
      className="admin-dashboard__modal-content"
      onClick={(e) => e.stopPropagation()}
    >
      <h3>Assign Freelancer</h3>

      {freelancers.map((freelancer) => (
        <div
          key={freelancer.id}
          className={`admin-dashboard__freelancer-card ${
            !freelancer.isAvailable ? "disabled" : ""
          }`}
        >
          <div>
            <p><strong>{freelancer.name}</strong></p>
            <p>Skills: {freelancer.skills.join(", ")}</p>
            <p>Status: {freelancer.isAvailable ? "Available" : "Busy"}</p>
          </div>

          {freelancer.isAvailable && (
            <button onClick={() => assignFreelancer(freelancer.name)}>
              Assign
            </button>
          )}
        </div>
      ))}

      <button
        style={{ marginTop: "16px" }}
        onClick={() => setShowFreelancerModal(false)}
      >
        Close
      </button>
    </div>
  </div>
)}

{showFreelancerPopup && (
  <div
    className="admin-dashboard__modal"
    onClick={() => setShowFreelancerPopup(false)}
  >
    <div
      className="admin-dashboard__modal-content large"
      onClick={(e) => e.stopPropagation()}
    >
      {/* HEADER */}
      <div className="freelancer-modal-header">
  <div className="header-row">
    {/* TOGGLE */}
    <div className="freelancer-toggle">
      <button
        className={`toggle-btn ${
          freelancerView === "pending" ? "active" : ""
        }`}
        onClick={() => setFreelancerView("pending")}
      >
        Pending Freelancers
      </button>

      <button
        className={`toggle-btn ${
          freelancerView === "total" ? "active" : ""
        }`}
        onClick={() => setFreelancerView("total")}
      >
        Total Freelancers
      </button>
    </div>

    {/* CLOSE */}
    <button
      className="close-btn"
      onClick={() => setShowFreelancerPopup(false)}
    >
      ✕
    </button>
  </div>
</div>



      {/* TABLE */}
      <table className="freelancer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Skills</th>
            <th>PAN</th>
            <th>Experience</th>
            {freelancerView === "pending" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          
{(freelancerView === "pending"
  ? pendingFreelancers
  : totalFreelancers
).map((f) => (
            <tr key={f.id}>
              <td className="name">{f.name}</td>
              <td className="email">{f.name.toLowerCase()}@gmail.com</td>
              <td>Hyderabad</td>

            <td>
  <span className="skill-pill">
    {f.skills[0]}
  </span>
</td>



              <td>NA</td>
              <td>5+ years</td>

              {/* ACTIONS ONLY FOR PENDING */}
              {freelancerView === "pending" && (
  <td className="actions">
    <button
      className="approve"
      onClick={() => handleApproveFreelancer(f.id)}
      title="Approve"
    >
      ✓
    </button>

   <button
  className="reject"
  title="Reject"
  onClick={() => handleRejectFreelancer(f.id)}
>
  ✕
</button>

  </td>
)}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

    </div>
  );
};

export default AdminDashboard;
