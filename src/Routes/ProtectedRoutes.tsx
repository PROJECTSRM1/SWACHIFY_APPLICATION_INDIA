import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/client";

export const ProtectedRoutes = ({ children }: any) => {
  const token = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(true);
  const [validUser, setValidUser] = useState(false);

  const verifyUser = async () => {
    try {
      const res = await api.get("api/auth/me", {
        params: { token },
      });

      const rawUser = res?.data?.user || res?.data?.data;

      if (!rawUser) {
        localStorage.clear();
        setValidUser(false);
        return;
      }

      const normalizedUser = {
        id: rawUser?.id || rawUser?.sub,
        email: rawUser?.email,
        first_name: rawUser?.first_name,
        last_name: rawUser?.last_name,
        mobile: rawUser?.mobile,
        address: rawUser?.address,
        gender_id: rawUser?.gender_id,
      };

      localStorage.setItem("user", JSON.stringify(normalizedUser));
      setValidUser(true);
    } catch (error) {
      console.error("Protected route verify failed", error);
      setValidUser(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      localStorage.clear();
      setLoading(false);
      return;
    }

    // small delay prevents bounce after login
    const timer = setTimeout(() => verifyUser(), 200);
    return () => clearTimeout(timer);
  }, [token]);

  if (loading) return null;

  if (!token || !validUser) {
    localStorage.clear();
    return <Navigate to="/landing" replace />;
  }

  return children;
};
