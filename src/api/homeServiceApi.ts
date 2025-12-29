import axios from "axios";

/* ===============================
   BASE API INSTANCE
================================ */
const API = axios.create({
  baseURL: "https://swachify-india-be-1-mcrb.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===============================
   BACKEND RESPONSE TYPE
================================ */
export interface HomeServiceApiResponse {
  id: number;
  module_id: number;
  service_id: number;
  sub_service_id: number;
  full_name: string;
  email: string;
  mobile: string;
  address: string;
  problem_description: string;
  preferred_date: string;
  time_slot_id: number;
  property_size_sqft?: string;
   freelancer_id?: number;
  status?: "In Progress" | "Approval Pending" | "Completed";
}

/* ===============================
   FRONTEND JOB TYPE
================================ */
export interface Job {
  ticketId: string;
  title: string;
  category: string;
  status: "In Progress" | "Approval Pending" | "Completed";
  location: string;
  date: string;
  price: number;
  estimatedPrice?: number;

   freelancer_id?: number;


  customer?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  customerAddress?: string;
  description?: string;
}

/* ===============================
   HELPERS (MAPPING LOGIC)
================================ */
const getServiceTitle = (item: HomeServiceApiResponse): string => {
  if (item.module_id === 1) return "Cleaning - Deep Cleaning";
  if (item.service_id === 2) return "Home Services - Plumbing";
  if (item.service_id === 3) return "Home Services - Electrical";
  return "Home Services";
};

const getCategory = (item: HomeServiceApiResponse): string => {
  if (item.module_id === 1) return "Cleaning";
  if (item.service_id === 2) return "Plumbing";
  if (item.service_id === 3) return "Electrical";
  return "Home Services";
};

const getTimeSlot = (id: number): string => {
  const slots: Record<number, string> = {
    1: "10:00 AM",
    2: "12:00 PM",
    3: "2:00 PM",
    4: "4:00 PM",
  };
  return slots[id] || "10:00 AM";
};

const getEstimatedPrice = (item: HomeServiceApiResponse): number => {
  if (item.module_id === 1) return 3000;
  if (item.service_id === 2) return 500;
  if (item.service_id === 3) return 1200;
  return 1000;
};

/* ===============================
   API FUNCTION
================================ */
export const fetchHomeServiceRequests = async (): Promise<Job[]> => {
  const res = await API.get<HomeServiceApiResponse[]>(
    "/api/home-service"
  );

  return res.data.map((item) => ({
    ticketId: `TKT${item.id}`,
    title: getServiceTitle(item),
    category: getCategory(item),
    status: item.status || "In Progress",

     freelancer_id: item.freelancer_id,

    customer: item.full_name,
    customerName: item.full_name,
    customerPhone: item.mobile,
    customerEmail: item.email,
    customerAddress: item.address,

    description: item.problem_description,
    location: item.address,
    date: `${item.preferred_date} at ${getTimeSlot(item.time_slot_id)}`,

    estimatedPrice: getEstimatedPrice(item),
    price: getEstimatedPrice(item),
  }));
};
