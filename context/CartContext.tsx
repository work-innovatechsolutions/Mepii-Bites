"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  id: string; // unique key e.g. "nibbl-01-100g"
  productId: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  size: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  couponCode: string;
  isCouponApplied: boolean;
  shippingFee: number;
  total: number;
  isFreeShipping: boolean;
  freeShippingThreshold: number;
  amountUntilFreeShipping: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, sizeLabel?: string, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 499;
const STANDARD_SHIPPING_FEE = 50;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Initialize cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mepii_cart") || localStorage.getItem("nibbl_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
      const savedCoupon = localStorage.getItem("mepii_coupon") || localStorage.getItem("nibbl_coupon");
      if (savedCoupon === "MEPII10" || savedCoupon === "NIBBL10") {
        setCouponCode("MEPII10");
        setDiscountPercent(10);
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("mepii_cart", JSON.stringify(items));
      if (couponCode) {
        localStorage.setItem("mepii_coupon", couponCode);
      } else {
        localStorage.removeItem("mepii_coupon");
      }
    } catch (e) {
      console.error("Failed to save cart to storage", e);
    }
  }, [items, couponCode, isLoaded]);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0;
  const shippingFee = isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);
  const amountUntilFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product: Product, sizeLabel?: string, quantity: number = 1) => {
    const selectedSize = product.sizes.find((s) => s.label === sizeLabel) || product.sizes[0];
    const cartItemId = `${product.id}-${selectedSize.label}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          price: selectedSize.price,
          originalPrice: product.originalPrice,
          size: selectedSize.label,
          image: product.images[0],
          quantity,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "MEPII10" || cleanCode === "NIBBL10") {
      setCouponCode("MEPII10");
      setDiscountPercent(10);
      return { success: true, message: "Code MEPII10 applied! 10% discount unlocked." };
    }
    return { success: false, message: "Invalid promo code. Try 'MEPII10'." };
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscountPercent(0);
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode("");
    setDiscountPercent(0);
    localStorage.removeItem("mepii_cart");
    localStorage.removeItem("mepii_coupon");
    localStorage.removeItem("nibbl_cart");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        discountAmount,
        couponCode,
        isCouponApplied: discountPercent > 0,
        shippingFee,
        total,
        isFreeShipping,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountUntilFreeShipping,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
