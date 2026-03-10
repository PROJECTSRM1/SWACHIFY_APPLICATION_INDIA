import { Routes, Route } from "react-router-dom";
import { NonSecureRoutes } from "./nonSecureRoutes/NonSecureRoutes";
//import { ProtectedRoutes } from "./ProtectedRoutes";
import { SecureRoutes } from "./secureRoutes/SecureRoutes";
import App from "../pages/Admin/Appadmin";
import Vendor from "../pages/vendor/Vendor";
import Freelancerlogin from "../pages/login/Freelancerlogin";
import FreelancerDashboard from "../pages/freelancer/FreelancerDashboard";
import SwachifyProducts from "../pages/landing/Swachifyproducts";
import CommonHeader from "../pages/landing/Header";
import ResumePendingCart from "../pages/ResumePendingCart";
import ProfilePage from "../pages/freelancer/ProfilePage";
import SwiftParcel from "../pages/dashboard/PackersAndMovers/SwiftParcel";
import AllServices from "../pages/dashboard/PackersAndMovers/AllServices";
import BookRide from "../pages/dashboard/PackersAndMovers/BookRide";
import MetroHubPage from "../pages/dashboard/PackersAndMovers/MetroHubPage";
import ProductPartnerDashboard from "../pages/dashboard/SwachifyProducts/ProductPartnerDashboard";
import NewAdminDashboard from "../pages/Admin/NewAdminDashboard";
import PartnerAuth from "../pages/landing/PartnerAuth";


export const AppRoutes = () => {
  return (
    <>
      {/* ✅ Resume pending cart after login */}
      <ResumePendingCart />

      <Routes>
        <Route path="/*" element={<NonSecureRoutes />} />
        <Route path="/freelancer/profile" element={<ProfilePage />} />
        <Route path="/allservices" element={<AllServices />} />
        <Route path="/swiftparcel" element={<SwiftParcel />} />
        <Route path="/metrohub" element={<MetroHubPage />} />
        <Route path="/bookride" element={<BookRide />} />
        <Route path="/partner-auth" element={<PartnerAuth />} />

        <Route
          path="/app/*"
          element={
            <>
              <CommonHeader />

              <SecureRoutes />
            </>
          }
        />

        <Route path="/vendor/*" element={<Vendor />} />
        <Route path="/freelancerlogin" element={<Freelancerlogin />} />
        <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
        <Route path="/adminshell/*" element={<App />} />
        <Route path="/admin/dashboard" element={<NewAdminDashboard />} />
        <Route path="/swachify-products" element={<SwachifyProducts />} />
        {/* <Route path="/products" element={<ProductsListing />} /> */}
        {/* <Route path="/products/register" element={<RegisterProduct />} /> */}
        <Route
          path="/partner/products/dashboard"
          element={<ProductPartnerDashboard />}
        />
      </Routes>
    </>
  );
};
