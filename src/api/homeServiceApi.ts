import axios from "axios";

const API = axios.create({
  baseURL: "https://swachify-india-be-1-mcrb.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface HomeServiceApiResponse {
  id: number;
  module_id: number;
  sub_module_id: number;
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

  
  service_name?: string;
  category_name?: string;
  time_slot?: string;
  service_price?: number;
}

export interface Job {
  sub_module_id: number;
  module_id: number;
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

export const TIME_SLOTS: Record<number, string> = {
  1: "09:00 AM - 11:00 AM",
  2: "11:00 AM - 01:00 PM",
  3: "01:00 PM - 03:00 PM",
  4: "03:00 PM - 05:00 PM",
  5: "05:00 PM - 07:00 PM",
};


export const fetchHomeServiceRequests = async (): Promise<Job[]> => {
  const res = await API.get<HomeServiceApiResponse[]>("/api/home-service");

  return res.data.map((item) => {
    const timeSlot =
      TIME_SLOTS[item.time_slot_id] || "Time not assigned";

    return {

      // ✅ REQUIRED BACKEND IDS (ADD THESE)
      module_id: item.module_id,
      sub_module_id:item.sub_module_id,

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

      
      date: `${item.preferred_date} • ${timeSlot}`,

      price: item.service_price || 0,
      estimatedPrice: item.service_price || 0,
    };
  });
};

