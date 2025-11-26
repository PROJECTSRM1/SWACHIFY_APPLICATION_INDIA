import React, { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';


export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  totalPrice: number;
}

interface CartContextValue {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'totalPrice'>) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart: CartContextValue['addToCart'] = (item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        const quantity = existing.quantity + item.quantity;
        const totalPrice = quantity * existing.price;
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity, totalPrice } : c,
        );
      }
      return [...prev, { ...item, totalPrice: item.price * item.quantity }];
    });
  };

  const removeFromCart = (id: number) =>
    setCart((prev) => prev.filter((c) => c.id !== id));

  const clearCart = () => setCart([]);

  const value = useMemo(
    () => ({ cart, addToCart, removeFromCart, clearCart }),
    [cart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
