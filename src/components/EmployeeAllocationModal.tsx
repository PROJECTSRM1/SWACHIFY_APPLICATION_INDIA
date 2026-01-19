import { message, Modal,  Select } from "antd";
import { useState } from "react";
import { FilterOutlined } from "@ant-design/icons";

import { useEffect } from "react";
import { allocateEmployeeManually, getAllOptions, allocateAutoEmployee } from "../api/customerAuth";


type Props = {
  open: boolean;
  onClose: () => void;
  bookingId: string; 
};

type Employee = {
  id: number;
  name: string;
  location: string;
  distance: number;      // numeric for sorting
  rating: number;
  experience: number;   // years
  slots: string[]; 
  service: string;      // available time slots
};

// const employees: Employee[] = [
//   {
//     name: "Priya Sharma",
//     location: "Koramangala",
//     distance: 2.5,
//     rating: 4.9,
//     experience: 3,
//     slots: ["10:00", "15:00"],
//     service: "cleaning",
//   },
//   {
//     name: "Rajesh Kumar",
//     location: "Indiranagar",
//     distance: 1.2,
//     rating: 4.8,
//     experience: 5,
//     slots: ["09:00", "14:00"],
//     service: "transport",
//   },
//   {
//     name: "Amit Patel",
//     location: "Whitefield",
//     distance: 3.8,
//     rating: 4.7,
//     experience: 7,
//     slots: ["11:00", "16:00"],
//     service: "education",
//   },
//    {
//     name: "Vikram Singh",
//     location: "Jayanagar ",
//     distance: 5.1,
//     rating: 4.5,
//     experience: 6,
//     slots: ["09:00", "14:00"],
//     service: "education",
//   },
// ];


export default function EmployeeAllocationModal({
  open,
  onClose,
  bookingId
  
}: Props) {
  const [allocationMode, setAllocationMode] = useState<
    "auto" | "manual" | null
  >(null);
  const [allocatedEmployee, setAllocatedEmployee] =
    useState<Employee | null>(null);

const [selectedService, setSelectedService] = useState<string>("all");
const [selectedSlot, setSelectedSlot] = useState<string>("all");
const [employees, setEmployees] = useState<Employee[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [isConfirmed, setIsConfirmed] = useState(false);



useEffect(() => {
  if (!open) return;

  setLoading(true);
  setError(null);
  console.log(bookingId);
  
  getAllOptions(bookingId) // 👈 pass real booking id
    .then((apiData) => {
      const mapped: Employee[] = apiData.map((emp) => ({
         id: emp.employee_id,   // ✅ keep ID
        name: emp.name,
        location: emp.address,
        distance: 0,
        rating: emp.rating,
        experience: 0,
        slots: [],
        service: "cleaning",
      }));

      setEmployees(mapped);
    })
    .catch(() => {
      setError("Failed to load employees");
    })
    .finally(() => {
      setLoading(false);
    });
}, [open]);


 const handleManualConfirm = async () => {
  if (!allocatedEmployee) return;

  try {
    const res = await allocateEmployeeManually(bookingId, allocatedEmployee.id);
    console.log("API Response:", res);

    message.success(res.message || "Employee allocated successfully");
    setIsConfirmed(true);   // ✅ only now it's really allocated
  } catch (err) {
    console.error(err);
    message.error("Failed to allocate employee");
  }
};




 const handleAutoAllocation = async () => {
  setAllocationMode("auto");

  try {
    const res = await allocateAutoEmployee(bookingId);
    console.log("API Response:", res);

    // 👇 Find employee from fetched list
    const matched = employees.find(e => e.id === res.assigned_to);

    if (matched) {
      setAllocatedEmployee(matched);
    } else {
      // fallback
      setAllocatedEmployee({
        id: res.assigned_to,
        name: "Assigned Employee",
        location: "",
        distance: 0,
        rating: 0,
        experience: 0,
        slots: [],
        service: "cleaning",
      });
    }

    message.success(res.message || "Employee allocated successfully");
    setIsConfirmed(true);
  } catch (err) {
    console.error(err);
    message.error("Failed to allocate employee");
  }
};


  const filteredAndSortedEmployees = [...employees]
  .filter((emp) => {
    // Slot filter
    const slotMatch =
      selectedSlot === "all" || emp.slots.includes(selectedSlot);

    // Service filter (placeholder for now)

    const serviceMatch = selectedService === "all" || emp.service === selectedService;

    return slotMatch && serviceMatch;
  })
  .sort((a, b) => {
    // Rating DESC
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    // Distance ASC
    return a.distance - b.distance;
  }

);


  return (
    <Modal open={open} onCancel={onClose} footer={null} width={900} centered  className="sw-ea-modal">
      <div className="sw-ea-container">
        <h2 className="sw-ea-title">Employee Allocation</h2>
{!(allocationMode && allocatedEmployee) && (
<div>

   <p className="sw-ea-subtitle">
          Choose how you would like to allocate an employee for your service
        </p>

    

  <div className="sw-ea-options">
    {/* Auto Allocation Card */}
    <div
      className={`sw-ea-option-card ${
        allocationMode === "auto" ? "sw-ea-active" : ""
      }`}
      onClick={handleAutoAllocation}
    >
      <h3>Auto Allocation</h3>
      <p>
        System automatically assigns the best available employee based on
        rating and location
      </p>
    </div>

    {/* Manual Allocation Card */}
    <div
      className={`sw-ea-option-card ${
        allocationMode === "manual" ? "sw-ea-active" : ""
      }`}
      onClick={() => setAllocationMode("manual")}
    >
      <h3>Manual Allocation</h3>
      <p>Choose an employee from the list below</p>
    </div>
  </div>
</div>
)}
       



        {/* SUCCESS MESSAGE */}

        {isConfirmed && allocatedEmployee && (
  <div className="sw-ea-success-box">
    <h3>Payment Done Successfully! ✓</h3>
    <p>
      Employee allocated successfully!{" "}
      <strong>{allocatedEmployee.name}</strong> will contact you shortly.
    </p>
  </div>
)}

   

        {/* FILTER SECTION */}

        <div className="sw-ea-filter">
  <div className="sw-ea-filter-header">
    <FilterOutlined />
    <span>Filter Employees</span>
  </div>

  <div className="sw-ea-filter-row">
    <div className="sw-ea-filter-item">
      <label>Service</label>
      <Select
  value={selectedService}
  onChange={(value) => setSelectedService(value)}
  options={[
    { label: "All Services", value: "all" },
    { label: "Cleaning & Home Services", value: "cleaning" },
    { label: "Transport", value: "transport" },
    { label: "Education", value: "education" },
  ]}
/>

    </div>

    <div className="sw-ea-filter-item">
      <label>Time Slot</label>
    <Select
  value={selectedSlot}
  onChange={(value) => setSelectedSlot(value)}
  listHeight={200}        // 👈 controls dropdown height
  dropdownStyle={{
    borderRadius: 11,
  }}
  options={[
    { label: "All Slots", value: "all" },
    { label: "08:00", value: "08:00" },
    { label: "09:00", value: "09:00" },
    { label: "10:00", value: "10:00" },
    { label: "11:00", value: "11:00" },
    { label: "12:00", value: "12:00" },
    { label: "13:00", value: "13:00" },
    { label: "14:00", value: "14:00" },
    { label: "15:00", value: "15:00" },
    { label: "16:00", value: "16:00" },
  ]}
/>


    </div>
  </div>
</div>


        {loading && (
  <div className="sw-ea-loading">
    Loading employees…
  </div>
)}

{error && (
  <div className="sw-ea-error">
    {error}
  </div>
)}

        {/* EMPLOYEE LIST */}
       
<div className="sw-ea-employee-list">
  <h3>Available Employees (Sorted by Rating & Distance)</h3>

  {filteredAndSortedEmployees.map((emp) => (
    <div
      key={emp.id}
      className={`sw-ea-employee-card
        ${allocatedEmployee?.id === emp.id ? "sw-ea-selected" : ""}
        ${allocationMode !== "manual" ? "sw-ea-blur" : ""}
      `}
      onClick={() => {
  if (allocationMode === "manual" && !allocatedEmployee) {
    setAllocatedEmployee(emp);
  }
}}

    >
      <div className="sw-ea-employee-header">
        <div className="sw-ea-employee-info">
          <div className="sw-ea-employee-name">{emp.name}</div>
          <div className="sw-ea-employee-meta">
            {emp.location} • {emp.distance} km away
          </div>
          <div className="sw-ea-employee-meta">
            Experience: {emp.experience} years
          </div>
          <div className="sw-ea-employee-meta">
            Available slots: {emp.slots.join(", ")}
          </div>
        </div>

        <div className="sw-ea-rating">
          <div className="sw-ea-rating-value">⭐ {emp.rating}</div>
          <div className="sw-ea-rating-label">Rating</div>
        </div>
      </div>
    </div>
  ))}

  {/* MANUAL CONFIRM BUTTON */}
  {allocationMode === "manual" && allocatedEmployee && !isConfirmed &&(
    <div style={{ marginTop: 16, textAlign: "right" }}>
      <button
        className="sw-ea-btn-primary"
        onClick={handleManualConfirm}
      >
        Confirm Manual Allocation
      </button>
    </div>
  )}
</div>

      </div>
    </Modal>
  );
}
