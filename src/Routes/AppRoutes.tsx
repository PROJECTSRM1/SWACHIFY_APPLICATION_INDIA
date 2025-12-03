import { Routes, Route } from "react-router-dom";
import { NonSecureRoutes } from "./nonSecureRoutes/NonSecureRoutes";
import { ProtectedRoutes } from './ProtectedRoutes'
import { SecureRoutes } from "./secureRoutes/SecureRoutes";
import MainLayout from "../pages/Admin/MainLayout";
import Dashboard1 from "../pages/Admin/Dashboard";
import AllTickets from "../pages/Admin/AllTickets";
import Users from "../pages/Admin/Users";
import Freelancers from "../pages/Admin/Freelancers";
import Vendors from "../pages/Admin/Vendors";
import { Navigate } from "react-router-dom";
import Vendor from "../pages/landing/Vendor";
import Freelancerlogin from "../pages/login/Freelancerlogin";
import FreelancerDashboard from "../pages/freelancer/FreelancerDashboard";

export const AppRoutes = () => {
    return <Routes>
                <Route path="/*" element={<NonSecureRoutes />} />
                <Route
                    path="/app/*"
                    element={
                        <ProtectedRoutes>
                            <SecureRoutes />
                        </ProtectedRoutes>   
                    }
                />
                <Route path="/admin-dashboard" element={<MainLayout />}>
  <Route index element={<Navigate to="dashboard" replace />} />
  <Route path="/admin-dashboard/dashboard" element={<Dashboard1 />} />
  <Route path="/admin-dashboard/tickets" element={<AllTickets />} />
  <Route path="/admin-dashboard/users" element={<Users />} />
  <Route path="/admin-dashboard/freelancers" element={<Freelancers />} />
  <Route path="/admin-dashboard/vendors" element={<Vendors />} />
</Route>

                 <Route path="vendor" element={<Vendor />} />
                 <Route path="/freelancerlogin" element={<Freelancerlogin />} />
        <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
            </Routes>
}