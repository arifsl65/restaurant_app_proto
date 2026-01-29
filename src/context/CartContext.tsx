"use client";

import { createContext, useContext, useReducer, useEffect, useState, ReactNode } from "react";
import { restaurant } from "@/data/menu";

// Types
export interface CartItem {
  id: string;              // Unique cart item ID (generated)
  itemId: string;          // Menu item ID (e.g., 'lamb-doner-nan')
  name: string;            // Display name
  image?: string;          // Image path
  basePrice: number;       // Original item price
  quantity: number;        // Quantity selected
  extras: string[];        // Extra IDs ['extra-meat', 'extra-cheese']
  extraNames: string[];    // Display names ['Extra meat', 'Extra cheese']
  specialInstructions: string;
  totalPrice: number;      // (basePrice + extrasTotal) * quantity
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; payload: CartItem[] };

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isHydrated: boolean;
}

const STORAGE_KEY = "spicehut-cart";

// Generate unique ID for cart items
const generateId = () => `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };

    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, items: state.items.filter((item) => item.id !== id) };
      }
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === id) {
            const extrasTotal = item.extras.length > 0
              ? (item.totalPrice / item.quantity) - item.basePrice
              : 0;
            return {
              ...item,
              quantity,
              totalPrice: (item.basePrice + extrasTotal) * quantity,
            };
          }
          return item;
        }),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "HYDRATE":
      return { ...state, items: action.payload };

    default:
      return state;
  }
}

// Context
const CartContext = createContext<CartContextValue | undefined>(undefined);

// Provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          dispatch({ type: "HYDRATE", payload: parsed });
        }
      }
    } catch (error) {
      console.error("Failed to hydrate cart from localStorage:", error);
    }
    setIsHydrated(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
      } catch (error) {
        console.error("Failed to persist cart to localStorage:", error);
      }
    }
  }, [state.items, isHydrated]);

  // Derived values
  const itemCount = state.items.reduce((count, item) => count + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = restaurant.deliveryFee;
  const total = subtotal + deliveryFee;

  // Actions
  const addItem = (item: Omit<CartItem, "id">) => {
    const newItem: CartItem = {
      ...item,
      id: generateId(),
    };
    dispatch({ type: "ADD_ITEM", payload: newItem });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        itemCount,
        subtotal,
        deliveryFee,
        total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
