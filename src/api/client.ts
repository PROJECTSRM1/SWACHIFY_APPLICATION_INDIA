import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const customerToken = localStorage.getItem("accessToken");
  const freelancerToken = localStorage.getItem("freelancerAccessToken");

  // Skip auth for forgot password APIs
  if (
    config.url?.includes("forgot-password/request-otp") ||
    config.url?.includes("forgot-password/verify-otp") ||
    config.url?.includes("forgot-password/reset")
  ) {
    config.headers.Authorization = "";
    return config;
  }

  // Backend specifically for /api/auth/me
  if (config.url?.includes("/api/auth/me")) {
    config.headers.Authorization = "";
    return config;
  }

  if (customerToken) {
    config.headers.Authorization = `Bearer ${customerToken}`;
  }

  if (freelancerToken) {
    config.headers.Authorization = `Bearer ${freelancerToken}`;
  }

  return config;
});

//  Auto Token Refresh

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const customerRefresh = localStorage.getItem("refreshToken");
      const freelancerRefresh = localStorage.getItem("freelancerRefreshToken");
      const refreshToken = customerRefresh || freelancerRefresh;

      if (!refreshToken) {
        localStorage.clear();
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const newAccess = res?.data?.access_token;

        if (newAccess) {
          if (customerRefresh) localStorage.setItem("accessToken", newAccess);
          if (freelancerRefresh) localStorage.setItem("freelancerAccessToken", newAccess);

          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return api(originalRequest);
        }
      } catch (err) {
        console.error("Refresh failed:", err);
        localStorage.clear();
      }
    }

    return Promise.reject(error);
  }
);
