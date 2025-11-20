import { Routes, Route } from "react-router-dom";
import Dashboard from "../../pages/dashboard/Dashboard";
// import LayoutComponent from "../../components/Layout/Layout";

// import Profile from "../../pages/profile/Profile";


export const SecureRoutes = () => {
    
    return <Routes>
       
            
            <Route path="dashboard" element={<Dashboard />} />   
           


        
    </Routes>
}