"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Truck,
  ShieldCheck,
  CreditCard,
  QrCode,
  Banknote,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Package,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";

const INDIAN_STATES = [
  "Maharashtra",
  "Karnataka",
  "Delhi NCR",
  "Tamil Nadu",
  "Telangana",
  "Gujarat",
  "Uttar Pradesh",
  "West Bengal",
  "Haryana",
  "Rajasthan",
  "Kerala",
  "Punjab",
  "Goa",
  "Madhya Pradesh",
  "Bihar",
  "Other States",
];

export default function CheckoutPage() {
  const { items, subtotal, discountAmount, shippingFee, total, couponCode, clearCart } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    email: "arjun.snacklover@gmail.com",
    phone: "9876543210",
    name: "Arjun Srinivasan",
    address: "Flat 402, Lotus Towers, 12th Main, HAL 2nd Stage",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560008",
  });

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [upiId, setUpiId] = useState("arjun@okaxis");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [mockOrderId, setMockOrderId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlacingOrder(true);

    setTimeout(() => {
      const generatedId = `MEPII-${Math.floor(10000 + Math.random() * 90000)}`;
      setMockOrderId(generatedId);
      setIsPlacingOrder(false);
      setOrderConfirmed(true);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#C85A32", "#4A6B53", "#ECA72C", "#FAF7F2", "#1C1917"],
        });
      } catch (err) {
        console.error("Confetti error", err);
      }

      // Clear the cart
      clearCart();
    }, 1000);
  };

  // If order is confirmed, render celebration screen
  if (orderConfirmed) {
    return (
      <div className="py-16 sm:py-24 bg-[#FAF7F2] min-h-[85vh] flex items-center justify-center">
        <div className="max-w-xl w-full mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xl text-center">
            <div className="w-16 h-16 rounded-full bg-sage/10 text-sage flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold text-terracotta uppercase tracking-wider block mb-1">
              Order Confirmed 🎉
            </span>
            <h1 className="editorial-headline text-2xl sm:text-4xl font-black text-dark tracking-tight mb-2">
              YOUR SNACKS ARE ON THE WAY!
            </h1>
            <p className="text-xs sm:text-sm text-muted mb-6">
              Thank you for choosing Mepii Bites. Order ID:{" "}
              <strong className="text-dark font-mono text-base">#{mockOrderId}</strong>
            </p>

            {/* Order Details Summary Box */}
            <div className="bg-[#FAF7F2] rounded-2xl p-5 text-left border border-stone-200/80 mb-6 space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-stone-200/60 font-semibold text-dark">
                <span>Total Paid (Demo)</span>
                <span className="text-sm font-bold text-terracotta">{formatINR(total || 699)}</span>
              </div>
              <div className="flex justify-between text-dark/80">
                <span className="text-muted">Payment Mode:</span>
                <span className="font-medium uppercase">
                  {paymentMethod === "upi" ? "UPI (GPay/PhonePe)" : paymentMethod === "card" ? "Credit/Debit Card" : "Cash on Delivery"}
                </span>
              </div>
              <div className="flex justify-between text-dark/80">
                <span className="text-muted">Delivery Address:</span>
                <span className="font-medium text-right max-w-[220px]">
                  {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
                </span>
              </div>
              <div className="flex justify-between text-dark/80">
                <span className="text-muted">Expected Delivery:</span>
                <span className="font-bold text-sage">3–5 business days</span>
              </div>
            </div>

            {/* Tracking Progress Timeline */}
            <div className="text-left mb-8 border border-stone-200/80 rounded-2xl p-4 sm:p-5">
              <h3 className="font-bold text-xs uppercase tracking-wider text-dark mb-4 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-terracotta" />
                <span>Live Fulfillment Timeline</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-sage text-white flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-dark block">Order Confirmed</span>
                    <span className="text-muted text-[11px]">Payment received &amp; order dispatched to roastery</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-mango text-white flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-dark block">Small-Batch Roasting &amp; Seasoning</span>
                    <span className="text-muted text-[11px]">Tossed with fresh spices in cold-pressed olive oil</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 opacity-60">
                  <div className="w-5 h-5 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-stone-400" />
                  </div>
                  <div>
                    <span className="font-bold text-dark block">Nitrogen-Flushed Packing</span>
                    <span className="text-muted text-[11px]">Sealed in oxygen-barrier airtight pouches</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 opacity-60">
                  <div className="w-5 h-5 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Truck className="w-3.5 h-3.5 text-stone-400" />
                  </div>
                  <div>
                    <span className="font-bold text-dark block">Out for Express Delivery</span>
                    <span className="text-muted text-[11px]">Handed to Bluedart / Delhivery express courier</span>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-dark hover:bg-dark-light text-cream text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
            >
              <span>Continue Snacking</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-16 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="editorial-headline text-2xl sm:text-3xl font-black text-dark tracking-tight">
              DEMO CHECKOUT
            </h1>
            <p className="text-xs text-muted mt-0.5">
              Experience the seamless Indian D2C checkout journey.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-sage bg-sage/10 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit SSL Demo Sandbox</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact, Address, Payment */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Contact Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
                <span className="w-6 h-6 rounded-full bg-dark text-cream text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="font-serif text-lg font-bold text-dark">
                  Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-200 rounded-xl text-xs font-medium text-dark focus:outline-none focus:ring-1 focus:ring-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                    Mobile Number (For WhatsApp Updates)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-200 rounded-xl text-xs font-medium text-dark focus:outline-none focus:ring-1 focus:ring-terracotta"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Address */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
                <span className="w-6 h-6 rounded-full bg-dark text-cream text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="font-serif text-lg font-bold text-dark">
                  Delivery Address in India
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-200 rounded-xl text-xs font-medium text-dark focus:outline-none focus:ring-1 focus:ring-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                    Flat / House No. / Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-200 rounded-xl text-xs font-medium text-dark focus:outline-none focus:ring-1 focus:ring-terracotta"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-200 rounded-xl text-xs font-medium text-dark focus:outline-none focus:ring-1 focus:ring-terracotta"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                      State
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-stone-200 rounded-xl text-xs font-medium text-dark focus:outline-none focus:ring-1 focus:ring-terracotta"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-1.5">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      maxLength={6}
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-stone-200 rounded-xl text-xs font-medium text-dark focus:outline-none focus:ring-1 focus:ring-terracotta font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
                <span className="w-6 h-6 rounded-full bg-dark text-cream text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="font-serif text-lg font-bold text-dark">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                {/* UPI Option */}
                <label
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === "upi"
                      ? "border-terracotta bg-terracotta/5 ring-1 ring-terracotta/30"
                      : "border-stone-200 hover:border-stone-400 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                    className="mt-1 text-terracotta focus:ring-terracotta"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-dark flex items-center gap-1.5">
                        <QrCode className="w-4 h-4 text-terracotta" />
                        UPI / Instant QR (Google Pay, PhonePe, Paytm)
                      </span>
                      <span className="text-[10px] font-bold text-sage bg-sage/10 px-2 py-0.5 rounded">
                        Fastest
                      </span>
                    </div>
                    <p className="text-[11px] text-muted mt-1">
                      Zero convenience fee. Instant confirmation.
                    </p>

                    {paymentMethod === "upi" && (
                      <div className="mt-3 pt-3 border-t border-stone-200/60">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@upi"
                          className="w-full max-w-xs px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-mono"
                        />
                      </div>
                    )}
                  </div>
                </label>

                {/* Card Option */}
                <label
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-terracotta bg-terracotta/5 ring-1 ring-terracotta/30"
                      : "border-stone-200 hover:border-stone-400 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="mt-1 text-terracotta focus:ring-terracotta"
                  />
                  <div className="flex-1">
                    <span className="font-bold text-xs sm:text-sm text-dark flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-dark" />
                      Credit / Debit Card (Visa, RuPay, Mastercard)
                    </span>
                    <p className="text-[11px] text-muted mt-1">
                      Protected with 3D Secure OTP authentication.
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery Option */}
                <label
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-terracotta bg-terracotta/5 ring-1 ring-terracotta/30"
                      : "border-stone-200 hover:border-stone-400 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mt-1 text-terracotta focus:ring-terracotta"
                  />
                  <div className="flex-1">
                    <span className="font-bold text-xs sm:text-sm text-dark flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-stone-600" />
                      Cash on Delivery (COD)
                    </span>
                    <p className="text-[11px] text-muted mt-1">
                      Pay cash upon doorstep delivery.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Review & Place Order Button */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6 sticky top-24">
            <h3 className="font-serif text-xl font-bold text-dark pb-3 border-b border-stone-100">
              Order Preview
            </h3>

            {/* Item Previews */}
            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
              {items.length === 0 ? (
                <div className="text-center py-6 text-xs text-muted">
                  <p>Cart currently empty. (Demo will use sample item)</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-xs">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-dark truncate">
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-muted">
                        Size: {item.size} • Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="font-bold text-dark">
                      {formatINR(item.price * item.quantity)}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-4">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-dark">
                  {formatINR(subtotal || 699)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-sage font-semibold">
                  <span>Promo Discount ({couponCode})</span>
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
              <div className="flex justify-between text-base font-bold text-dark pt-3 border-t border-stone-200">
                <span>Total Amount</span>
                <span className="text-xl text-terracotta">
                  {formatINR(total || 699)}
                </span>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isPlacingOrder}
              className="w-full py-4 bg-terracotta hover:bg-terracotta-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-98 disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {isPlacingOrder ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Confirming Order...</span>
                </>
              ) : (
                <>
                  <span>Place Demo Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center text-[11px] text-stone-500">
              ⚡ Demo mode: No real payment gateway or credit card will be charged.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
