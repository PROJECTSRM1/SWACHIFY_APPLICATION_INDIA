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


export const SecureRoutes = () => {
    
    return <Routes>
        <Route path="/" element={<ConstructionServices />} />
         <Route path="/material-supply" element={<MaterialSupply />} />
         <Route path="/machinery-rental" element={<MachineryRental />} />
          <Route path="/Transpotation" element={<Transpotation />} />



       
            
            <Route path="dashboard" element={<Dashboard />} />   
           


        
    </Routes>
}