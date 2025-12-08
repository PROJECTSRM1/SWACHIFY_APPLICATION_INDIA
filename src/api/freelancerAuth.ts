import { api } from "./client";

export interface FreelancerRegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  password: string;
  confirm_password: string;
  gender_id: number;
  state_id: number;
  district_id: number;
  skill_id: number;
  government_id_type: string;
  government_id_number: string;
  address: string;
}

export interface FreelancerLoginPayload {
  email_or_phone: string;
  password: string;
}

export const freelancerRegister = async (data: FreelancerRegisterPayload) => {
  const res = await api.post("/freelancer/register", data);
  return res.data;
};

export const freelancerLogin = async (data: any) => {
  const res = await api.post("api/freelancer/login", data);

  // Save correctly based on backend response
  localStorage.setItem(
    "freelancer",
    JSON.stringify({
      user_id: res.data.user_id,
      email: res.data.email_or_phone,
    })
  );

  localStorage.setItem("freelancerAccessToken", res.data.access_token);
  localStorage.setItem("freelancerRefreshToken", res.data.refresh_token);

  return res.data;
};



export const freelancerLogout = async (user_id: number) => {
  return api.post("api/freelancer/logout", { user_id });
};

