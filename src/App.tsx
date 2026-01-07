import { AppRoutes } from './Routes/AppRoutes.tsx';
import { CartProvider } from './context/CartContext.tsx';
import './App.css';
import ServicesPage from './pages/dashboard/homerentals/pages/ServicesPage.tsx';

function App() {
   <div className="sw-hr-app-root">
     
      <main className="sw-hr-app-main">
        <ServicesPage />
      </main>
     
    </div>
  return (
    <CartProvider>
      <AppRoutes />  
    </CartProvider>
  );
  
}

export default App;
