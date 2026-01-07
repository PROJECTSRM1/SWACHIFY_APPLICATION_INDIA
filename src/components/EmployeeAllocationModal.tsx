import { Modal,  Select } from "antd";
import { useState } from "react";
import { FilterOutlined } from "@ant-design/icons";


type Props = {
  open: boolean;
  onClose: () => void;
};

type Employee = {
  name: string;
  location: string;
  distance: number;      // numeric for sorting
  rating: number;
  experience: number;   // years
  slots: string[]; 
  service: string;      // available time slots
};

const employees: Employee[] = [
  {
    name: "Priya Sharma",
    location: "Koramangala",
    distance: 2.5,
    rating: 4.9,
    experience: 3,
    slots: ["10:00", "15:00"],
    service: "cleaning",
  },
  {
    name: "Rajesh Kumar",
    location: "Indiranagar",
    distance: 1.2,
    rating: 4.8,
    experience: 5,
    slots: ["09:00", "14:00"],
    service: "transport",
  },
  {
    name: "Amit Patel",
    location: "Whitefield",
    distance: 3.8,
    rating: 4.7,
    experience: 7,
    slots: ["11:00", "16:00"],
    service: "education",
  },
   {
    name: "Vikram Singh",
    location: "Jayanagar ",
    distance: 5.1,
    rating: 4.5,
    experience: 6,
    slots: ["09:00", "14:00"],
    service: "education",
  },
];


export default function EmployeeAllocationModal({
  open,
  onClose,
}: Props) {
  const [allocationMode, setAllocationMode] = useState<
    "auto" | "manual" | null
  >(null);
  const [allocatedEmployee, setAllocatedEmployee] =
    useState<Employee | null>(null);

const [selectedService, setSelectedService] = useState<string>("all");
const [selectedSlot, setSelectedSlot] = useState<string>("all");




  const handleAutoAllocation = () => {
    setAllocationMode("auto");
    const randomEmployee =
      employees[Math.floor(Math.random() * employees.length)];
    setAllocatedEmployee(randomEmployee);
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
        {allocationMode && allocatedEmployee && (
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



        {/* EMPLOYEE LIST */}
        <div className="sw-ea-employee-list">
          <h3>Available Employees (Sorted by Rating & Distance)</h3>

          {filteredAndSortedEmployees.map((emp) => (
           <div
  key={emp.name}
     className={`sw-ea-employee-card
    ${allocatedEmployee?.name === emp.name ? "sw-ea-selected" : ""}
    ${!allocationMode ? "sw-ea-blur" : ""}
  `}
  onClick={() => allocationMode === "manual" && setAllocatedEmployee(emp)}
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
        </div>
      </div>
    </Modal>
  );
}
