import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===================================================
// 🔐 Attach tokens, BUT skip Authorization for `/api/auth/me`
// ===================================================
api.interceptors.request.use((config) => {
  const customerToken = localStorage.getItem("accessToken");
  const freelancerToken = localStorage.getItem("freelancerAccessToken");

  // 👉 Backend specifically requires ?token only for `/api/auth/me`
  if (config.url?.includes("/api/auth/me")) {
    config.headers.Authorization = ""; // ❗ mandatory
    return config;
  }

  // Otherwise attach token normally
  if (customerToken) {
    config.headers.Authorization = `Bearer ${customerToken}`;
  }

  if (freelancerToken) {
    config.headers.Authorization = `Bearer ${freelancerToken}`;
  }

  return config;
});

// ===================================================
// 🔄 Auto Token Refresh for BOTH roles (if backend supports)
// ===================================================
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only on token expiry
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
          if (customerRefresh) {
            localStorage.setItem("accessToken", newAccess);
          }
          if (freelancerRefresh) {
            localStorage.setItem("freelancerAccessToken", newAccess);
          }

          // Re-attach new token
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
