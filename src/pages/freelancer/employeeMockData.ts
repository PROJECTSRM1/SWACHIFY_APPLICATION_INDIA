import type { Job, EmployeeProfile } from "./employeeTypes";

export const employeeProfile: EmployeeProfile = {
  name: "Ravi Kumar",
  phone: "+91 9876543210",
  rating: 4.6,
  verified: true,
  incentives: 1200,
};

export const jobsMock: Job[] = [
  {
    id: 1,
    service: "Home Cleaning",
    customer: "Suresh",
    phone: "+91 9998887777",
    address: "Madhapur, Hyderabad",
    amount: 600,
    status: "new",
    assignedAt: new Date().toISOString(),
  },
  {
    id: 2,
    service: "Bathroom Deep Cleaning",
    customer: "Anita",
    phone: "+91 8887776666",
    address: "Kondapur, Hyderabad",
    amount: 900,
    status: "completed",
    assignedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
];
