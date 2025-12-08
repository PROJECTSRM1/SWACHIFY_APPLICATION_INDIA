import { Routes, Route } from "react-router-dom";
import { NonSecureRoutes } from "./nonSecureRoutes/NonSecureRoutes";
import { ProtectedRoutes } from './ProtectedRoutes'
import { SecureRoutes } from "./secureRoutes/SecureRoutes";
import App from "../pages/Admin/Appadmin";
import Vendor from "../pages/landing/Vendor";
import Freelancerlogin from "../pages/login/Freelancerlogin";
import FreelancerDashboard from "../pages/freelancer/FreelancerDashboard";
import SwachifyProducts from "../pages/landing/Swachifyproducts";


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
                

                 <Route path="vendor" element={<Vendor />} />
                 <Route path="/freelancerlogin" element={<Freelancerlogin />} />
        <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
        <Route path="/adminshell/*" element={<App />} />
        <Route path="/swachify-products" element={<SwachifyProducts />} />

         
            </Routes>
}