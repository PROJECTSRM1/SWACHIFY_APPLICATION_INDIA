import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===================================================
   🔐 Attach Access Token (Customer OR Freelancer)
   =================================================== */
api.interceptors.request.use((config) => {
  const customerToken = localStorage.getItem("accessToken");
  const freelancerToken = localStorage.getItem("freelancerAccessToken");

  // Priority: customer → freelancer
  const token = customerToken || freelancerToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ===================================================
   🚪 Auto Logout / Refresh on 401
   =================================================== */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const customerRefresh = localStorage.getItem("refreshToken");
      const freelancerRefresh = localStorage.getItem("freelancerRefreshToken");

      const refreshToken = customerRefresh || freelancerRefresh;

      // ❌ No refresh token → logout
      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const newAccess = res?.data?.access_token;

        if (!newAccess) {
          throw new Error("No access token returned");
        }

        // Save new token
        if (customerRefresh) {
          localStorage.setItem("accessToken", newAccess);
        }
        if (freelancerRefresh) {
          localStorage.setItem("freelancerAccessToken", newAccess);
        }

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
