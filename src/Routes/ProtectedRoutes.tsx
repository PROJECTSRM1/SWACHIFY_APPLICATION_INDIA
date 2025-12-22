import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProtectedRoutes = ({ children }: any) => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");
    const isGuest = localStorage.getItem("isGuest") === "true";

   
    if ((token && user) || isGuest) {
      setAllowed(true);
    } else {
      setAllowed(false);
    }

    setLoading(false);
  }, []);

  if (loading) return null;

  
  if (!allowed) {
    localStorage.clear();
    return <Navigate to="/landing" replace />;
  }

  return children;
};
