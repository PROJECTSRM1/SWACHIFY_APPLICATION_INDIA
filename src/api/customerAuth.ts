import { api } from "./client";

export interface GovernmentId {
  id_type: string;
  id_number: string;
}

export interface ProfessionalDetails {
  experience_years: number;
  expertise_in: number[];
}

export interface CustomerRegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  password: string;
  confirm_password: string;

  gender_id: number;
  address: string;

  work_type: number;
  service_ids: number[];

  government_id: GovernmentId[];

  professional_details?: ProfessionalDetails;
}


export interface CustomerLoginPayload {
  email_or_phone: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  id: number;
  user: {
    sub: number;
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    address: string;
    gender_id: number;
    role?: string;
  };
}

export interface RegisterResponse {
  message: string;
}

export const customerRegister = async (data: CustomerRegisterPayload) => {
  const res = await api.post<RegisterResponse>("api/auth/register", data);
  
  return res.data;
};

export const customerLogin = async (data: CustomerLoginPayload) => {
  const res = await api.post<LoginResponse>("api/auth/login", data);

  const { access_token, refresh_token, user,id } = res.data;

  // Save tokens
  if (access_token) localStorage.setItem("accessToken", access_token);
  if (refresh_token) localStorage.setItem("refreshToken", refresh_token);
   localStorage.setItem("userId", String(id));


  // Backend gives user with `sub` not `id`
  const normalizedUser = {
    id: user?.id || user?.sub,  // 👈 main fix
    email: user?.email,
    first_name: user?.first_name,
    last_name: user?.last_name,
    mobile: user?.mobile,
    address: user?.address,
    gender_id: user?.gender_id,
  };

  localStorage.setItem("user", JSON.stringify(normalizedUser));

  return res.data;
};
export const getLoggedInUserId = (): number => {
  const id = localStorage.getItem("userId");

  if (!id) {
    throw new Error("User ID not found. User is not logged in.");
  }

  return Number(id);
};




export const customerLogout = async () => {
  const raw = localStorage.getItem("user");
  let parsed;

  try {
    parsed = raw ? JSON.parse(raw) : null;
  } catch {
    parsed = null;
  }

  const user_id = parsed?.id;

  if (user_id) {
    await api.post("api/auth/logout", { user_id });
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

export const PaymentsAPI = {
  
  createOrder: async (bookingId: number, amount: number) => {
    const res = await api.post("api/v1/payments/create-order", {
      bookingId,
      amount,
    });
    return res.data;
  },

  
  verifyPayment: async (
    orderId: string,
    paymentId: string,
    signature: string,
    home_service_id:number
  ) => {
    const res = await api.post("api/v1/payments/verify-payment", {
      order_id: orderId,
      payment_id: paymentId,
      signature,
      home_service_id
    });
    return res.data;
  },
};


// ✅ SAFE VERSION (for UI pages like RecentBookings)
export const getLoggedInUserIdSafe = (): number | null => {
  const id = localStorage.getItem("userId");
  if (!id) return null;
  return Number(id);
};






