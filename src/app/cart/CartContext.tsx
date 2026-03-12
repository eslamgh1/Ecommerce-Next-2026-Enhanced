'use client'; // Add this to the very top of CartContext.tsx
import { createContext, useState } from "react";

//1- createContext: React function that creates the "Context object.
export const CartContext = createContext({
  cartCount: 0, 
  updateCartCount: (newCount: number) => {} 
});

//2- The Provider Component
//children: all the components you wrap inside your layout.tsx (like your Navbar and Pages).
export function CartContextProvider({ children }: { children: React.ReactNode }) {

  const [cartCount, setCartCount] = useState(0);
  function updateCartCount(newCount: number) {
    setCartCount(newCount);
  }

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
}