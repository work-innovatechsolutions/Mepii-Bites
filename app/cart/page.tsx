"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";

export default function CartPage() {
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
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
  };

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  if (items.length === 0) {
    return (
      <div className="py-20 sm:py-32 bg-[#FAF7F2] min-h-[75vh] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-6 text-stone-400 border border-stone-200">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="editorial-headline text-3xl font-bold text-dark mb-2">
            Your Snack Drawer is Empty
          </h1>
          <p className="text-sm text-muted mb-8 leading-relaxed">
            Fill it with Himalayan Peri Peri Makhana, slow-roasted cashews, or our curated weekend binge bundles.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
          >
            <span>Explore All Snacks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-16 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="editorial-headline text-3xl sm:text-4xl font-black text-dark tracking-tight">
            YOUR CART
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            {itemCount} item{itemCount > 1 ? "s" : ""} in your snack stash
          </p>
        </div>

        {/* Free Shipping Dynamic Progress */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-xs mb-8">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2">
            {isFreeShipping ? (
              <span className="text-sage flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                FREE SHIPPING UNLOCKED 🎉
              </span>
            ) : (
              <span className="text-dark">
                Add <strong className="text-terracotta">{formatINR(amountUntilFreeShipping)}</strong> more for <strong>FREE EXPRESS SHIPPING</strong>
              </span>
            )}
            <span className="text-muted text-xs">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isFreeShipping ? "bg-sage" : "bg-terracotta"
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Items Table */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-8 shadow-xs space-y-6">
            <div className="hidden sm:grid grid-cols-12 text-xs font-bold uppercase tracking-wider text-stone-400 pb-3 border-b border-stone-100">
              <span className="col-span-6">Product</span>
              <span className="col-span-2 text-center">Size</span>
              <span className="col-span-2 text-center">Quantity</span>
              <span className="col-span-2 text-right">Total</span>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center py-4 border-b border-stone-100 last:border-b-0"
              >
                {/* Product Preview */}
                <div className="sm:col-span-6 flex items-center gap-4 w-full">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-bold text-sm text-dark hover:text-terracotta transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <span className="text-xs text-muted block mt-0.5">
                      {formatINR(item.price)} each
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[11px] text-stone-400 hover:text-terracotta flex items-center gap-1 mt-1.5 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {/* Size */}
                <div className="sm:col-span-2 flex sm:justify-center w-full justify-between">
                  <span className="sm:hidden text-xs text-muted">Size:</span>
                  <span className="text-xs font-semibold bg-stone-100 px-2.5 py-1 rounded-md text-dark">
                    {item.size}
                  </span>
                </div>

                {/* Quantity */}
                <div className="sm:col-span-2 flex sm:justify-center w-full justify-between">
                  <span className="sm:hidden text-xs text-muted">Quantity:</span>
                  <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 text-stone-600 hover:text-dark hover:bg-white rounded-l transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center text-xs font-bold text-dark">
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
                </div>

                {/* Total */}
                <div className="sm:col-span-2 flex sm:justify-end w-full justify-between">
                  <span className="sm:hidden text-xs text-muted">Subtotal:</span>
                  <span className="text-sm font-black text-dark font-sans">
                    {formatINR(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-7 shadow-xs space-y-5">
            <h2 className="font-serif text-xl font-bold text-dark pb-3 border-b border-stone-100">
              Order Summary
            </h2>

            {/* Promo Code Input */}
            {isCouponApplied ? (
              <div className="flex items-center justify-between p-3 bg-sage/10 border border-sage/30 rounded-xl text-xs">
                <div className="flex items-center gap-2 text-sage font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Promo <strong>{couponCode}</strong> applied (10% OFF)</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-stone-400 hover:text-terracotta font-semibold underline text-xs"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Use MEPII10"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-[#FAF7F2] border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-terracotta uppercase font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-dark text-cream text-xs font-semibold rounded-xl hover:bg-dark-light transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponFeedback && !isCouponApplied && (
                  <p className="text-[11px] text-terracotta">{couponFeedback.message}</p>
                )}
              </form>
            )}

            {/* Calculations */}
            <div className="space-y-2.5 text-xs sm:text-sm text-stone-600 pt-2 border-t border-stone-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-dark">{formatINR(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-sage font-semibold">
                  <span>Promo Discount (10%)</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="font-bold text-sage">FREE</span>
                  ) : (
                    formatINR(shippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-dark pt-3 border-t border-stone-200">
                <span>Total Amount</span>
                <span className="text-xl text-terracotta">{formatINR(total)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 py-4 bg-terracotta hover:bg-terracotta-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] text-muted pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-sage" />
              <span>Safe &amp; Secure 256-Bit SSL Demo Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
