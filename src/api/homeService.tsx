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
  property_size_sqft: number;
  add_on_id: number | null;
  preferred_date: string;
  time_slot_id: number;
  service_price:number;
  special_instructions: string;
  payment_type_id: number;
  payment_done:boolean;
  created_by:number;
   status_id: number
}

export interface HomeServiceBookingResponse {
  id: number;   
  message: string;
  order_id?: string;
}

const API_ENDPOINT = "/api/home-service";

/**
 * Submits a new home service booking request to the backend.
 * @param data The structured payload matching the backend schema.
 */
export const bookHomeService = async (
  data: HomeServiceBookingPayload
): Promise<HomeServiceBookingResponse> => {
  const res = await api.post<HomeServiceBookingResponse>(API_ENDPOINT, data);
  return res.data;
};