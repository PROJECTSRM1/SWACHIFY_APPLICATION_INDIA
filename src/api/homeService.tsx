import { api } from "./client";

export interface HomeServiceBookingPayload {
  module_id: number;
  sub_module_id: number;
  service_id: number;
  sub_service_id: number;
  sub_group_id: number;
  full_name: string;
  email: string;
  mobile: string;
  address: string;
  service_type_id: number;
  problem_description: string;
 property_size_sqft: string;
  add_on_id: number | null;
  preferred_date: string;
  time_slot_id: number;
  service_price:number;
  special_instructions: string;
  payment_type_id: number;
  payment_done:boolean;
  created_by:number;
   status_id: number;
   duration_id:number
  
}

export interface HomeServiceBookingResponse {
  id: number;
  message: string;
  order_id?: string;  
}

export interface HomeServiceBookingApiResponse {
  service_id: number;
  message: string;
  status_id: number;
  status_name: string;
  order_id?: string;
}

export interface HomeServiceBookingItem {
  booking_id: number;
  module_name: string;
  sub_module_name: string;
  service_name: string;
  sub_service_name: string;
  full_name: string;
  mobile: string;
  email: string;
  address: string;
  preferred_date: string;
  time_slot: string;
  service_summary: {
    addons: any[];
    main_service: string;
    total_amount: number;
  };
  brand_name: string | null;
  fuel_type_name: string | null;
  garage_name: string | null;
  mechanic_name: string;
  garage_services: any[] | null;
  item_total: number;
  convenience_fee: number;
  total_amount: number;
  payment_done: boolean;
  status_name: string | null;
  created_date: string;
}

export type HomeServiceBookingsResponse = HomeServiceBookingItem[];



const API_ENDPOINT = "/api/master/home-service";

/**
 * Submits a new home service booking request to the backend.
 * @param data The structured payload matching the backend schema.
 */
export const bookHomeService = async (
  data: HomeServiceBookingPayload
): Promise<HomeServiceBookingResponse> => {
  const res = await api.post<HomeServiceBookingApiResponse>(
    API_ENDPOINT,
    data
  );

  return {
    id: (res.data as any).id ?? res.data.service_id,
    message: res.data.message,
    order_id: res.data.order_id,
  };
};


export const getAllHomeServiceBookings = async (): Promise<HomeServiceBookingItem[]> => {
  const res = await api.get<{ status: boolean; data: HomeServiceBookingItem[] }>(
    "/api/home-service/bookings/all"
  );

  return res.data.data; // 👈 return the array
};
;



