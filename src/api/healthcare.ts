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
            const response = await api.get("/healthcare/doctors/available");
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
};

export default healthcareService;
