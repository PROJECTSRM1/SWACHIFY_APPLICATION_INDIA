import { api } from "./client";

export interface CustomerRegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  password: string;
  confirm_password: string;
  gender_id: number;
  address: string;
}

export interface CustomerLoginPayload {
  email_or_phone: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
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
  const res = await api.post<RegisterResponse>("/api/auth/register", data);
  return res.data;
};

export const customerLogin = async (data: CustomerLoginPayload) => {
  const res = await api.post<LoginResponse>("/api/auth/login", data);

  const { access_token, refresh_token, user } = res.data;

  if (access_token) localStorage.setItem("accessToken", access_token);
  if (refresh_token) localStorage.setItem("refreshToken", refresh_token);

  const normalizedUser = {
    id: user?.id || user?.sub,
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

export const customerLogout = async () => {
  const raw = localStorage.getItem("user");
  let parsed = null;

  try {
    parsed = raw ? JSON.parse(raw) : null;
  } catch (err) {
    parsed = null;
  }

  const user_id = parsed?.id;

  // 👇 Call backend logout only if user_id exists
  if (user_id) {
    try {
      await api.post("/api/auth/logout", { user_id });
    } catch (error) {
      console.error("Logout API failed but continuing", error);
    }
  }

  // 👇 Clear local stored auth details
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};


//  FORGOT PASSWORD FLOW

//  Request OTP
export const requestPasswordOTP = async (email: string) => {
  const res = await api.post("/api/auth/forgot-password/request-otp", { email });
  return res.data;
};

// Verify OTP
export const verifyPasswordOTP = async (otp: string) => {
  const res = await api.post("/api/auth/forgot-password/verify-otp", { otp });
  return res.data;
};

//  Reset Password
export const resetPassword = async (new_password: string, confirm_password: string) => {
  const res = await api.post("/api/auth/forgot-password/reset", {
    new_password,
    confirm_password,
  });
  return res.data;
};

// Payments

export const PaymentsAPI = {
  createOrder: async (bookingId: string, amount: number) => {
    const res = await api.post("/api/payments/create-order", { bookingId, amount });
    return res.data;
  },

  verifyPayment: async (orderId: string, paymentId: string, signature: string) => {
    const res = await api.post("/api/payments/verify-payment", {
      order_id: orderId,
      payment_id: paymentId,
      signature,
    });
    return res.data;
  },
};
