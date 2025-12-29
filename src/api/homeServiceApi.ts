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

  // ✅ Add these dynamic fields expected from backend
  service_name?: string;
  category_name?: string;
  time_slot?: string;
  service_price?: number;
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
   API FUNCTION
================================ */
export const fetchHomeServiceRequests = async (): Promise<Job[]> => {
  const res = await API.get<HomeServiceApiResponse[]>("/api/home-service");

  return res.data.map((item) => ({
    ticketId: `TKT${item.id}`,
    title: item.service_name || "Home Service", 
    category: item.category_name || "General", 
    status: item.status || "In Progress",
    freelancer_id: item.freelancer_id,
    

    customer: item.full_name,
    customerName: item.full_name,
    customerPhone: item.mobile,
    customerEmail: item.email,
    customerAddress: item.address,

    description: item.problem_description,
    location: item.address,
    date: `${item.preferred_date} at ${item.time_slot}`, 

   price: item.service_price || 0,
estimatedPrice: item.service_price || 0,

  }));
};

