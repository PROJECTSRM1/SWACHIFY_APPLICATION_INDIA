import { AppRoutes } from './Routes/AppRoutes.tsx';
import { CartProvider } from './context/CartContext.tsx';
import './App.css';
import HeaderBar from './components/header/header.tsx';


function App() {

  return (
    <>
    <CartProvider>
      <HeaderBar/>
      <AppRoutes />
    </CartProvider>
    
    
    </>
  )
}
export default App