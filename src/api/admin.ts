import axios from "axios";

export const ADMIN_API = axios.create({
  baseURL: "https://swachify-india-be-1-mcrb.onrender.com",
});

export const getFreelancers = async () => {
  const res = await ADMIN_API.get("/api/admin/freelancers");
  return res.data;
};

/* ✅ APPROVE */
export const approveFreelancer = (freelancerId: number) => {
  return ADMIN_API.put(
    `/api/admin/${freelancerId}/approve`,
    null,
    {
      params: {
        token: String(localStorage.getItem("token")),
      },
    }
  );
};

/* ❌ REJECT */
export const rejectFreelancer = (freelancerId: number) => {
  return ADMIN_API.put(
    `/api/admin/${freelancerId}/reject`,
    null,
    {
      params: {
        token: String(localStorage.getItem("token")),
      },
    }
  );
};
