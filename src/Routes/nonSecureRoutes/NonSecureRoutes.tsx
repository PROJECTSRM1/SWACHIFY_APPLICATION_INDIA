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
import LandingCleaningPage from "../../pages/landing/landingcleaningpage";
//Import rentals page (file: src/pages/landing/landingrentals.tsx)
import Landingrentals from "../../pages/landing/landingrentals";
import Freelancer from '../../pages/landing/Freelancer';
import Education from '../../pages/landing/EducationPage';

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

export const NonSecureRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userData: any = getUserDetails("user");
    const currentPath = window.location.pathname;

    // ✅ Allow all freelancer pages freely
    if (currentPath.startsWith("/freelancer")) {
      return;
    }

    // ✅ Logged-in customer → force app dashboard
    if (userData && !currentPath.startsWith("/app")) {
      navigate("/app/freelancer", { replace: true });
      return;
    }

    // ✅ Non-logged user visiting root → landing
    // if (!userData && currentPath === "/") {
    //   navigate("/landing", { replace: true });
    // }
  }, [navigate]);



  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/partner/dashboard" element={<PartnerDashboard />} />

      {/* <Route path="/forgotpasswordlink" element={<ForgotPasswordLink />} /> */}
      {/* <Route path="/forgotpassword/:id" element={<ForgotPassword />} /> */}
      {/* <Route path="/privacy" element={<PrivacyPolicy />} /> */}
      {/* <Route path="/terms" element={<TermsOfService />} /> */}
      <Route path="/home_service" element={<Home_Service />} />
      <Route path="/LandingPackers" element={<LandingPackers />} />
      <Route path="/commercial-plots" element={<CommercialPlots />} />
      <Route path='/ConstructionMaterials' element={<ConstructionMaterials />} />
      {/* cleaning landing page */}
      <Route path="/cleaningservice" element={<LandingCleaningPage />} />

      {/* rentals landing page */}
      <Route path="/rentals" element={<Landingrentals />} />
      <Route path="/Education" element={<Education />} />
      <Route path="/freelancer" element={<Freelancer />} />
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

