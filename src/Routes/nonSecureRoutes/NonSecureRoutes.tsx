import { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
// import ForgotPassword from '../../pages/forgotpassword/ForgotPassword';
import Landing from '../../pages/landing/landingpage';
// import PrivacyPolicy from '../../pages/privacy/PrivacyPolicy';
// import TermsOfService from '../../pages/terms/TermsOfService';
import { getUserDetails } from '../../utils/helpers/storage';
//import RefundPolicy from '../../pages/refund/RefundPolicy';
import Home_Service from "../../pages/landing/Home_Service";
import LandingPackers from "../../pages/landing/LandingPackers"
// import ForgotPasswordLink from '../../pages/forgotpassword/ForgotPasswordLink';
import CommercialPlots from "../../pages/landing/CommercialPlots"
import ConstructionMaterials from '../../pages/landing/ConstructionMaterials';
//import LandingCleaningPage from "../../pages/landing/landingcleaningpage";
//Import rentals page (file: src/pages/landing/landingrentals.tsx)
import Landingrentals from "../../pages/landing/landingrentals";
//import Freelancer from '../../pages/landing/Freelancer';
// import Education from '../../pages/landing/EducationPage';

import Freelancerlogin from '../../pages/login/Freelancerlogin';
import FreelancerRegistration from '../../pages/login/FreelancerRegistration';
import ServiceRequests from '../../pages/landing/ServiceRequests';
import PartnerDashboard from "../../pages/dashboard/buy&sale/PartnerDashboard";
// import Vendor from '../../pages/vendor/Vendor';
import EducationPartnerDashboard
  from "../../pages/landing/EducationPartnerDashboard";
import HealthcarePartner from '../../pages/WebHospital/HealthcarePartnerDashboard';
import DriverDashboard from '../../pages/landing/JustRidePartnerDashboard';
import { MOCK_NOTIFICATIONS } from '../../pages/landing/JRPData';
import EmployeeDashboard from '../../pages/freelancer/EmployeeDashboard';
import Healthcare from "../../pages/dashboard/HealthCare/HealthCare"
import CleaningService from '../../pages/CleaningService/CleaningService';
import HomeCleaning from '../../pages/CleaningService/HomeCleaning';
import KitchenCleaning from '../../pages/CleaningService/KitchenCleaning';
import Education from '../../pages/dashboard/Education/Education';
//import homesubcat from "../../pages/dashboard/homeservices/HomeSubCatWeb"
import SwachifyProducts from '../../pages/dashboard/SwachifyProducts/SwachifyProducts';
import BuysaleProducts from   '../../pages/dashboard/buy&sale/BuySaleProducts';
import Rawmaterials from'../../pages/building/building';

export const NonSecureRoutes = () => {
  const navigate = useNavigate();

useEffect(() => {
  const userData: any = getUserDetails("user");
  const currentPath = window.location.pathname;

  // ✅ Exact public routes
  const exactPublicRoutes = ["/", "/landing"];

  // ✅ Prefix-based public routes
  const prefixPublicRoutes = [
    "/education",
    "/healthcare",
    "/cleaningservice",
    "/landingpackers",
    "/swachifyproducts",
    "/buysaleproducts",
    "/rawmaterials",
  ];

  if (
    exactPublicRoutes.includes(currentPath) ||
    prefixPublicRoutes.some((path) => currentPath.startsWith(path))
  ) {
    return;
  }

  // ✅ Allow freelancer pages
  if (currentPath.startsWith("/freelancer")) {
    return;
  }

  // ✅ Redirect logged-in users ONLY when needed
  if (userData && !currentPath.startsWith("/app")) {
    navigate("/app/freelancer", { replace: true });
  }
}, [navigate]);





  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/partner/dashboard" element={<PartnerDashboard />} />
            <Route path="/healthcare/dashboard" element={<Healthcare />} />



      {/* <Route path="/forgotpasswordlink" element={<ForgotPasswordLink />} /> */}
      {/* <Route path="/forgotpassword/:id" element={<ForgotPassword />} /> */}
      {/* <Route path="/privacy" element={<PrivacyPolicy />} /> */}
      {/* <Route path="/terms" element={<TermsOfService />} /> */}
      <Route path="/home_service" element={<Home_Service />} />
      <Route path="/landingpackers" element={<LandingPackers />} />
      <Route path="/commercial-plots" element={<CommercialPlots />} />
      <Route path='/ConstructionMaterials' element={<ConstructionMaterials />} />
      {/* cleaning landing page */}
      <Route path="/cleaningservice" element={<CleaningService />} />
      <Route path="/cleaning/home" element={<HomeCleaning />} />
      <Route path="/cleaning/home/kitchen" element={<KitchenCleaning />} />
      <Route path="/healthcare" element={<Healthcare />} />
       {/* <Route path="/education" element={<Education />} /> */}
 <Route path="/swachifyproducts" element={<SwachifyProducts/>} />
 <Route path="/buysaleproducts" element={<BuysaleProducts/>} />
 <Route path="/rawmaterials" element={<Rawmaterials/>} />

      {/* rentals landing page */}
      <Route path="/rentals" element={<Landingrentals />} />
      <Route path="/education" element={<Education />} />
      {/* <Route path="/freelancer" element={<Freelancer />} /> */}
      <Route path="/freelancer" element={<EmployeeDashboard />} />
      <Route path="/freelancerlogin" element={<Freelancerlogin />} />

      <Route path="/freelancerregistration" element={<FreelancerRegistration />} />
      <Route path="/servicerequests" element={<ServiceRequests />} />
      {/* <Route path="/Vendor" element={<Vendor/>}/> */}
      <Route
        path="/partner/education/dashboard"
        element={<EducationPartnerDashboard />}

      />
      <Route
        path="/partner/healthcare/dashboard"
        element={<HealthcarePartner />}
      />

       <Route
       path="/partner/ride/dashboard"
       element={<DriverDashboard MOCK_NOTIFICATIONS={MOCK_NOTIFICATIONS} />}
      />





    </Routes>
  );
};

