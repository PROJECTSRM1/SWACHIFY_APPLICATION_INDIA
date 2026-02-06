import { api } from "./client";

/* =========================
   TYPES
========================= */

// Doctors API response
export type AvailableDoctorResponse = {
    id: number;
    user_id: number;
    specialization_id: number;
    experience_years: number;
    rating: number;
    fees_per_hour: string;
    available_from: string;
    available_to: string;
    is_available: boolean;
}[];

// Ambulance list API response
export type AmbulanceResponse = {
    hospital_id: number;
    hospital_name: string;
    specialty_type: string;
    location: string;
    latitude: number | null;
    longitude: number | null;
    hospital_contact: string;
    ambulance_id: number;
    service_provider: string;
    ambulance_contact: string;
    availability_status: string;
}[];

// Ambulance booking payload
export type AmbulanceBookingPayload = {
    user_id: number;
    appointment_id: number;
    ambulance_id: number;
    patient_name: string;
    aadhar_number: string;
};

// get Available Labs API response
// healthcareService.ts

// healthcareService.ts

export interface LabItem {
    lab_id: number;
    lab_name: string;
    specialization_name: string;
    rating: number;
    fees_per_test: number;
    available_from: string;
    available_to: string;
    home_collection: boolean;
    distance_km: number | null;
    status: "OPEN" | "CLOSED";
    next_available: string;
    estimated_delivery: string;
}

export type AvailableLabsResponse = LabItem[];

// ================= HOSPITAL TYPES =================

export interface HospitalItem {
    hospital_id: number;
    hospital_name: string;
    specialty_type: string;
    location: string;
    contact_number: string;
    rating: number;
    hospital_status: string;
    fees_per_hour: number;
}

export type AvailableHospitalsResponse = HospitalItem[];


// ================= PHARMACY TYPES =================

export interface PharmacyItem {
    pharmacy_id: number;
    pharmacy_name: string;
    pharmacy_type: string;
    services: string;
    rating: number;
    delivery_time: string;
    home_delivery: boolean;
    distance_km: number | null;
    status: string;
    next_available: string | null;
    delivery_address: string | null;
    special_instructions: string | null;
    upload_prescription: string | null;
    proceed_type: string | null;
}

export type AvailablePharmaciesResponse = PharmacyItem[];


// book appointment payload
export interface AppointmentBookingPayload {
  user_id: number;
  consultation_type_id: number;
  appointment_time: string;
  doctor_id: number;
  doctor_specialization_id?: number | null;   // ✅ FIX
  required_ambulance: boolean;
  ambulance_id?: number | null;               // ✅ FIX
  pickup_time: string;
  required_assistant: boolean;
  assistant_id?: number | null;               // ✅ FIX
  labs_id?: number | null;                    // ✅ FIX
  pharmacies_id?: number | null;              // ✅ FIX
  call_booking_status: string;
}

// my bookings

export interface ConsultationType {
    id: number;
    name: string;
}

export interface Doctor {
    id: number;
    name: string;
}

export interface Appointment {
    id: number;
    user_id: number;
    appointment_time: string;
    consultation_type_id: number;
    consultation_type: ConsultationType;
    doctor_id: number;
    doctor_name: string;
    doctor_specialization_id: number | null;
    doctor_specialization: any | null;
    ambulance_id: number | null;
    ambulance: any | null;
    assistant_id: number | null;
    assistant: any | null;
    labs_id: number | null;
    labs: any | null;
    pharmacies_id: number | null;
    pharmacies: any | null;
    hospital: any | null;
    required_ambulance: boolean;
    required_assistant: boolean;
    pickup_time: string | null;
    status: string;
    call_booking_status: string;
    is_active: boolean;
}

export type UserAppointmentsResponse = Appointment[];





/* =========================
   SERVICE
========================= */

const healthcareService = {
    /* =========================
       DOCTORS
    ========================= */

    // ✅ Get available doctors
    getAvailableDoctors: async (): Promise<AvailableDoctorResponse> => {
        try {
            const response = await api.get("/healthcare/available-doctors");
            return response.data;
        } catch (error) {
            console.error("Error fetching available doctors:", error);
            throw error;
        }
    },

    /* =========================
       AMBULANCES
    ========================= */

    // ✅ Get ambulances (Book Ambulance Now)
    getAmbulances: async (
        hospitalId: number = -1
    ): Promise<AmbulanceResponse> => {
        try {
            const response = await api.get("/healthcare/ambulances", {
                params: { hospital_id: hospitalId },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching ambulances:", error);
            throw error;
        }
    },

    // ✅ Book ambulance (POST)
    bookAmbulance: async (
        payload: AmbulanceBookingPayload
    ): Promise<any> => {
        try {
            const response = await api.post(
                "/healthcare/ambulance-booking",
                payload
            );
            return response.data;
        } catch (error) {
            console.error("Error booking ambulance:", error);
            throw error;
        }
    },
    // get Available Labs
    getAvailableLabs: async (): Promise<AvailableLabsResponse> => {
        try {
            const response = await api.get("/healthcare/available-labs");

            return response.data;
        } catch (error) {
            console.error("Error fetching available labs:", error);
            throw error;
        }
    },


    // get available hospitals
    getAvailableHospitals: async (): Promise<AvailableHospitalsResponse> => {
        try {
            const response = await api.get("/healthcare/available-hospitals");
            console.log(response);

            return response.data;
        } catch (error) {
            console.error("Error fetching available hospitals:", error);
            throw error;
        }
    },
    // get available pharmacies
    getAvailablePharmacies: async (): Promise<AvailablePharmaciesResponse> => {
        try {
            const response = await api.get("/healthcare/available-pharmacies");
            return response.data;
        } catch (error) {
            console.error("Error fetching available pharmacies:", error);
            throw error;
        }
    },

    //book appointment with doctor
    bookAppointment: async (
    payload: AppointmentBookingPayload
): Promise<any> => {
    try {
        const response = await api.post(
            "/healthcare/appointments",
            payload
        );
        return response.data;
    } catch (error) {
        console.error("Error booking appointment:", error);
        throw error;
    }
},


// my bookings
// get appointments by user
getUserAppointments: async (userId: number): Promise<UserAppointmentsResponse> => {
    try {
        const response = await api.get(`/healthcare/appointments/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user appointments:", error);
        throw error;
    }
},

updateCallBookingStatus: async (
  appointmentId: number,
  callBookingStatus: string
): Promise<{ status: boolean; message: string }> => {
  try {
    const response = await api.patch(
      `/healthcare/appointments/${appointmentId}/call-booking-status`,
      null,
      {
        params: { call_booking_status: callBookingStatus },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating call booking status:", error);
    throw error;
  }
},















};



export default healthcareService;
