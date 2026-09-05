"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <aside aria-label="Special Offers" className="bg-dark text-cream text-xs font-medium py-2.5 px-4 overflow-hidden relative border-b border-dark/20 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center gap-2 tracking-wide text-center">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-terracotta text-white font-semibold text-[10px] uppercase tracking-wider">
            Limited Offer
          </span>
          <p className="inline-flex items-center gap-2">
            <span>FREE SHIPPING ON ORDERS ABOVE ₹499</span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="hidden sm:inline">USE CODE <strong className="text-mango font-bold underline decoration-mango/40 underline-offset-2">MEPII10</strong> FOR 10% OFF</span>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="hidden md:inline text-white/80">100% ROASTED, NEVER FRIED</span>
          </p>
        </div>

        <Link
          href="/shop"
          className="hidden lg:inline-flex items-center gap-1 text-[11px] text-mango hover:text-white transition-colors uppercase font-semibold tracking-wider group"
        >
          <span>Claim Offer</span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </aside>
  );
}
