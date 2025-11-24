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

export const NonSecureRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userData: any = getUserDetails('user');
    const currentPath = window.location.pathname;

    if (!userData && !currentPath.startsWith('/app')) {
      navigate('/app/dashboard');
    } else if (userData && (currentPath === '/' || currentPath === '')) {
      navigate('/landing');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/landing" element={<Landing />} />
      {/* <Route path="/forgotpasswordlink" element={<ForgotPasswordLink />} /> */}
      {/* <Route path="/forgotpassword/:id" element={<ForgotPassword />} /> */}
      {/* <Route path="/privacy" element={<PrivacyPolicy />} /> */}
      {/* <Route path="/terms" element={<TermsOfService />} /> */}
      <Route path="/home_service" element={<Home_Service />} />
      <Route path="/LandingPackers" element={<LandingPackers />} />
      <Route path="/commercial-plots" element={<CommercialPlots/>}/>
      <Route path='/ConstructionMaterials' element={<ConstructionMaterials />}/>
     {/* cleaning landing page */}
      <Route path="/cleaningservice" element={<LandingCleaningPage />} />

      {/* rentals landing page */}
      <Route path="/rentals" element={<Landingrentals />} />

      
    </Routes>
  );
};
 