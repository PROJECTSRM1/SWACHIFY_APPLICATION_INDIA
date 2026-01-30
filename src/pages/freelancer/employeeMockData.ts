export type JobStatus = "new" | "ongoing" | "completed";

export type Job = {
  id: number;
  customer: string;
  service: string;
  address: string;
  amount: number;
  status: JobStatus;
};

export const employeeProfile = {
  name: "Ramesh Kumar",
  phone: "+91 9XXXXXXXXX",
  rating: 4.7,
  verified: true,
};

export const jobsMock: Job[] = [
  {
    id: 1,
    customer: "Ravi Kumar",
    service: "Home Cleaning",
    address: "Madhapur, Hyderabad",
    amount: 850,
    status: "new",
  },
  {
    id: 2,
    customer: "Anita Sharma",
    service: "Office Cleaning",
    address: "Gachibowli, Hyderabad",
    amount: 1200,
    status: "ongoing",
  },
  {
    id: 3,
    customer: "Suresh",
    service: "Bathroom Cleaning",
    address: "Kukatpally, Hyderabad",
    amount: 650,
    status: "completed",
  },
];
