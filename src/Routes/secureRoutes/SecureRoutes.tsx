import { Routes, Route } from "react-router-dom";
import Dashboard from "../../pages/dashboard/Dashboard";
// import LayoutComponent from "../../components/Layout/Layout";

// import Profile from "../../pages/profile/Profile";
//import FormMaterialSupply from '../../pages/building/MaterialSupply/FormMaterialSupply'
import ConstructionServices from "../../pages/building/building";
//import MachineryDetails from "../../pages/building/MachineryRental/FormMachineryRental"
//import TranspotationForm from '../../pages/building/Transpotation/FormTranspotation'

import MaterialSupply from "../../pages/building/MaterialSupply/ModMaterialSupply";
import MachineryRental from "../../pages/building/MachineryRental/MachineryRental";
import Transpotation from '../../pages/building/Transpotation/Transpotation'
import CleaningService from "../../pages/dashboard/cleaningservice/CleaningService";
import Packersandmovers from "../../pages/dashboard/PackersAndMovers/Packersandmovers";
import HomeServices from "../../pages/dashboard/homeservices/HomeServices";
import ServicesPage from "../../pages/dashboard/homerentals/pages/ServicesPage";
import BuySaleProducts from "../../pages/dashboard/buy&sale/BuySaleProducts";


export const SecureRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />  
      
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="dashboard/cleaning" element={<CleaningService />} />
      <Route path="dashboard/packers" element={<Packersandmovers />} />
      <Route path="dashboard/homeservices" element={<HomeServices />} />
      <Route path="dashboard/rentals" element={<ServicesPage />} />
      <Route path="dashboard/constructions" element={<ConstructionServices />} />
      <Route path="dashboard/commercials" element={<BuySaleProducts />} />
       <Route path="/material-supply" element={<MaterialSupply />} />
         <Route path="/machinery-rental" element={<MachineryRental />} />
          <Route path="/Transpotation" element={<Transpotation />} />
    </Routes>
  );
};
