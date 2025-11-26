import { AppRoutes } from './Routes/AppRoutes.tsx';
import { CartProvider } from './context/CartContext.tsx';
import './App.css';


function App() {

  return (
    <>
    <CartProvider>
    <AppRoutes />
    </CartProvider>
    
    
    </>
  )
}
export default App