import { Routes, Route } from "react-router-dom";
import { NonSecureRoutes } from "./nonSecureRoutes/NonSecureRoutes";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { SecureRoutes } from "./secureRoutes/SecureRoutes";
import App from "../pages/Admin/Appadmin";
import Vendor from "../pages/vendor/Vendor";
import Freelancerlogin from "../pages/login/Freelancerlogin";
import FreelancerDashboard from "../pages/freelancer/FreelancerDashboard";
import SwachifyProducts from "../pages/landing/Swachifyproducts";
import CommonHeader from "../pages/landing/Header";
import ResumePendingCart from "../pages/ResumePendingCart";
import ProfilePage from "../pages/freelancer/ProfilePage";
// import { ProductsListing, RegisterProduct } from "../pages/Swachify_Products";




export const AppRoutes = () => {
  return (
    <>
      {/* ✅ Resume pending cart after login */}
      <ResumePendingCart />

      <Routes>
        <Route path="/*" element={<NonSecureRoutes />} />
        <Route path="/freelancer/profile" element={<ProfilePage />} />


        <Route
          path="/app/*"
          element={
            <>
              <CommonHeader />
              <ProtectedRoutes>
                <SecureRoutes />
              </ProtectedRoutes>
            </>
          }
        />

        <Route path="/vendor/*" element={<Vendor />} />
        <Route path="/freelancerlogin" element={<Freelancerlogin />} />
        <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
        <Route path="/adminshell/*" element={<App />} />
        <Route path="/swachify-products" element={<SwachifyProducts />} />
        {/* <Route path="/products" element={<ProductsListing />} /> */}
        {/* <Route path="/products/register" element={<RegisterProduct />} /> */}
      </Routes>
    </>
  );
};
