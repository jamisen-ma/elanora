"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "elanora-cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Add-on chains (bag line id "<slug>|chain|…") are sold only with their pendant: never more
// chains than pendants of the same piece, and none once the pendant leaves the bag.
function limitAddOns(items: CartItem[]): CartItem[] {
  const isAddOn = (i: CartItem) => i.product.id.includes("|chain|");
  const pendants = new Map<string, number>();
  for (const i of items) if (!isAddOn(i)) pendants.set(i.product.slug, (pendants.get(i.product.slug) ?? 0) + i.quantity);
  let left = new Map(pendants);
  const out: CartItem[] = [];
  for (const i of items) {
    if (!isAddOn(i)) {
      out.push(i);
      continue;
    }
    const allowed = left.get(i.product.slug) ?? 0;
    if (allowed <= 0) continue;
    const quantity = Math.min(i.quantity, allowed);
    left = left.set(i.product.slug, allowed - quantity);
    out.push(quantity === i.quantity ? i : { ...i, quantity });
  }
  return out;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(limitAddOns(loadCart()));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveCart(items);
  }, [items, mounted]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => limitAddOns(prev.filter((item) => item.product.id !== productId)));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      limitAddOns(
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
