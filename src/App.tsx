import { AppRoutes } from './Routes/AppRoutes.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { WishlistProvider } from './context/WishlistContext.tsx';
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
      <WishlistProvider>
        <AppRoutes />
      </WishlistProvider>
    </CartProvider>
  );

}

export default App;
