"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Sparkles, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";

export default function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    discountAmount,
    couponCode,
    isCouponApplied,
    shippingFee,
    total,
    isFreeShipping,
    freeShippingThreshold,
    amountUntilFreeShipping,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
  };

  // Calculate free shipping progress percentage (max 100)
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Slide-over Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FAF7F2] shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-stone-200 bg-white/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-terracotta" />
            <h2 className="font-serif text-xl font-bold text-dark">
              Your Snack Drawer
            </h2>
            <span className="bg-stone-100 text-dark/70 text-xs font-bold px-2 py-0.5 rounded-full border border-stone-200">
              {itemCount}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-stone-400 hover:text-dark rounded-full hover:bg-stone-100 transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Dynamic Progress Bar */}
        <div className="p-4 bg-white/50 border-b border-stone-200/80">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            {isFreeShipping ? (
              <span className="text-sage flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                FREE SHIPPING UNLOCKED 🎉
              </span>
            ) : (
              <span className="text-dark/80">
                Add <strong className="text-terracotta">{formatINR(amountUntilFreeShipping)}</strong> more for <strong>FREE SHIPPING</strong>
              </span>
            )}
            <span className="text-muted">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isFreeShipping ? "bg-sage" : "bg-terracotta"
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Line Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-dark mb-1">
                Your drawer is craving snacks!
              </h3>
              <p className="text-xs text-muted max-w-xs mx-auto mb-6">
                Fill it with peri peri makhana, roasted cashews, or our curated weekend boxes.
              </p>
              <button
                onClick={closeCart}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-terracotta text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-terracotta-hover transition-colors shadow-sm"
              >
                <span>Discover Snacks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3.5 p-3 bg-white rounded-xl border border-stone-200/80 shadow-sm relative group"
              >
                {/* Product Image */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="text-xs font-bold text-dark hover:text-terracotta line-clamp-1 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-terracotta transition-colors p-0.5"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="inline-block mt-0.5 text-[10px] font-medium bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">
                      Size: {item.size}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100">
                    {/* Stepper */}
                    <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 text-stone-600 hover:text-dark hover:bg-white rounded-l transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-semibold text-dark">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 text-stone-600 hover:text-dark hover:bg-white rounded-r transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="text-xs font-bold text-dark">
                        {formatINR(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-stone-200 space-y-3.5">
            {/* Promo Code Form */}
            {isCouponApplied ? (
              <div className="flex items-center justify-between px-3 py-2 bg-sage/10 border border-sage/20 rounded-xl text-xs">
                <div className="flex items-center gap-1.5 text-sage font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
                  <span>Promo <strong>{couponCode}</strong> applied (10% OFF)</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-stone-400 hover:text-terracotta text-xs font-semibold underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Enter MEPII10"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-terracotta uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-dark text-cream text-xs font-semibold rounded-lg hover:bg-dark-light transition-colors"
                >
                  Apply
                </button>
              </form>
            )}

            {couponFeedback && !isCouponApplied && (
              <p className="text-[11px] text-terracotta">{couponFeedback.message}</p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-dark">{formatINR(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-sage font-medium">
                  <span>Discount (10%)</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="font-bold text-sage">FREE</span>
                  ) : (
                    formatINR(shippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-dark pt-1.5 border-t border-stone-200">
                <span>Total Amount</span>
                <span className="text-base text-terracotta">{formatINR(total)}</span>
              </div>
            </div>

            {/* Checkout CTAs */}
            <div className="space-y-2 pt-1">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center gap-2 py-3 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="w-full block text-center py-2 text-xs font-semibold text-stone-600 hover:text-dark transition-colors"
              >
                View Full Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
