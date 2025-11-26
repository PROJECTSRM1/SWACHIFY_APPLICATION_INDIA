import { createContext, useContext, useState } from "react";

interface CartItem {
  id: number;
  title: string;
  image: string;
  quantity: number;
  price: string;
  totalPrice: number;

  customerName: string;
  deliveryType: string;
  deliveryDate: string;
  contact: string;
  address: string;
  instructions: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart:(item:number) =>void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };
  const removeFromCart = (id:any) => {
  setCart(prevCart => prevCart.filter(item => item.id !== id));
};

 return (
  <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
    {children}
  </CartContext.Provider>
);

};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
