import { Routes, Route } from "react-router-dom";

import HeaderBar from "../../components/header/header";   // <-- add this
//import CommonHeader from "../../pages/landing/Header";

import Dashboard from "../../pages/dashboard/Dashboard";
import ConstructionServices from "../../pages/building/building";
import MaterialSupply from "../../pages/building/MaterialSupply/ModMaterialSupply";
import MachineryRental from "../../pages/building/MachineryRental/MachineryRental";
import Transpotation from '../../pages/building/Transpotation/Transpotation';
import CleaningService from "../../pages/dashboard/cleaningservice/CleaningService";
import Packersandmovers from "../../pages/dashboard/PackersAndMovers/Packersandmovers";
import HomeServices from "../../pages/dashboard/homeservices/HomeServices";
import ServicesPage from "../../pages/dashboard/homerentals/pages/ServicesPage";
import BuySaleProducts from "../../pages/dashboard/buy&sale/BuySaleProducts";
import Education from "../../pages/dashboard/Education/Education";


export const SecureRoutes = () => {
  
  return (
    <>
      <HeaderBar /> 
      

      <Routes>
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="dashboard" element={<Dashboard />}>
    <Route path="cleaning" element={<CleaningService />} />
    <Route path="packers" element={<Packersandmovers />} />
    <Route path="homeservices" element={<HomeServices />} />
    <Route path="rentals" element={<ServicesPage />} />
    <Route path="constructions" element={<ConstructionServices />} />
    <Route path="commercials" element={<BuySaleProducts />} />
    <Route path="education" element={<Education />} />
  </Route>

        <Route path="/material-supply" element={<MaterialSupply />} />
        <Route path="/machinery-rental" element={<MachineryRental />} />
        <Route path="/Transpotation" element={<Transpotation />} />
        
      </Routes>
    </>
  );
};
