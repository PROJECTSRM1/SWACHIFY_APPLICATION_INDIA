import { Routes, Route } from "react-router-dom";
import HeaderBar from "../../components/header/header";

import Dashboard from "../../pages/dashboard/Dashboard";
import CleaningService from "../../pages/dashboard/cleaningservice/CleaningService";
import HomeServices from "../../pages/dashboard/homeservices/HomeServices";
// import ServiceCategoryScreenWeb from "../../pages/dashboard/homeservices/ServiceCategoryScreenWeb";

import Packersandmovers from "../../pages/dashboard/PackersAndMovers/Packersandmovers";
import ServicesPage from "../../pages/dashboard/homerentals/pages/ServicesPage";
import ConstructionServices from "../../pages/building/building";
import BuySaleProducts from "../../pages/dashboard/buy&sale/BuySaleProducts";
import Education from "../../pages/dashboard/Education/Education";

import MaterialSupply from "../../pages/building/MaterialSupply/ModMaterialSupply";
import MachineryRental from "../../pages/building/MachineryRental/MachineryRental";
import Transpotation from "../../pages/building/Transpotation/Transpotation";

export const SecureRoutes = () => {
  return (
    <>
      <HeaderBar />

      <Routes>
        {/* DASHBOARD LAYOUT (ONLY ONCE) */}
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="cleaning" element={<CleaningService />} />
          <Route path="packers" element={<Packersandmovers />} />
          <Route path="homeservices" element={<HomeServices />} />

          {/* ✅ CLEANING CATEGORY */}
          {/* <Route
            path="homeservices/cleaningcategoryweb"
            element={<ServiceCategoryScreenWeb />}
          /> */}

          <Route path="rentals" element={<ServicesPage />} />
          <Route path="constructions" element={<ConstructionServices />} />
          <Route path="commercials" element={<BuySaleProducts />} />
          <Route path="education" element={<Education />} />
        </Route>

        {/* OUTSIDE DASHBOARD */}
        <Route path="material-supply" element={<MaterialSupply />} />
        <Route path="machinery-rental" element={<MachineryRental />} />
        <Route path="transpotation" element={<Transpotation />} />
      </Routes>
    </>
  );
};
