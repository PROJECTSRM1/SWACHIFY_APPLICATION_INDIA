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



const API_ENDPOINT = "/api/v1/master/api/home-service";

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
    id: res.data.service_id,   // ✅ allowed now
    message: res.data.message,
    order_id: res.data.order_id,
  };
};




