import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface CartItem {
  id: number;
  title: string;
  price: number|string;
  quantity: number;
  image: string;
  totalPrice: number;
}

interface CartContextValue {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart: CartContextValue['addToCart'] = (item) => {
  setCart((prev) => {
    const existing = prev.find((c) => c.id === item.id);

    // Convert price to a clean number
    const numericPrice = Number(String(item.price).replace(/[^0-9.]/g, ""));

    if (existing) {
      const newQuantity = existing.quantity + item.quantity;
      const newTotalPrice = newQuantity * numericPrice;

      return prev.map((c) =>
        c.id === item.id
          ? { ...c, quantity: newQuantity, totalPrice: newTotalPrice, price: numericPrice }
          : c
      );
    }

    return [
      ...prev,
      {
        ...item,
        price: numericPrice,
        totalPrice: numericPrice * item.quantity,
      },
    ];
  });
};


  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
