import { Routes, Route } from "react-router-dom";
import { NonSecureRoutes } from "./nonSecureRoutes/NonSecureRoutes";
import { ProtectedRoutes } from './ProtectedRoutes'
import { SecureRoutes } from "./secureRoutes/SecureRoutes";
import Vendor from "../pages/landing/Vendor";

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
            </Routes>
}