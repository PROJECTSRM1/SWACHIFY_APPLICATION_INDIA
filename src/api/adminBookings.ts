import { api } from "./client";

export interface BookingAPIResponse {
  id: number;
  full_name: string;
  service_type_id: number;
  service_price: number | null;
  preferred_date: string;
  payment_done: number | null;
  mobile: string;
  address: string;
}

export const fetchAdminBookings = async (): Promise<BookingAPIResponse[]> => {
  const res = await api.get("/api/home-service");
  return res.data;
};
