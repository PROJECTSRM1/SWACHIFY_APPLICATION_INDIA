import { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";

import Landing from '../../pages/landing/landingpage';

import { getUserDetails } from '../../utils/helpers/storage';


export const NonSecureRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userData: any = getUserDetails('user');
    const currentPath = window.location.pathname;

    if (userData && !currentPath.startsWith('/app')) {
      navigate('/app/dashboard');
    } else if (!userData && (currentPath === '/' || currentPath === '')) {
      navigate('/landing');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/landing" element={<Landing />} />
     
    </Routes>
  );
};
 