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
  status_id:string|number;
  assigned_to: string|number|null;
}

export const fetchAdminBookings = async (): Promise<BookingAPIResponse[]> => {
  const res = await api.get("/api/home-service");
  return res.data;
};
export async function assignfreelancer(home_service_id:number,freelancer_id:number){
    const res = await api.post("/api/admin/assign-freelancer",{
        home_service_id:home_service_id,
        freelancer_id:freelancer_id,
    });
    return res.data;
}
