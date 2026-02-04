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








};



export default healthcareService;
