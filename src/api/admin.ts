import axios from "axios";

export const ADMIN_API = axios.create({
  baseURL: "https://swachify-india-be-1-mcrb.onrender.com",
});

export const getFreelancers = async () => {
  const res = await ADMIN_API.get("/api/admin/freelancers");
  return res.data;
};
