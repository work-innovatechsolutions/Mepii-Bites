"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-dark text-cream overflow-hidden shadow-2xl">
          {/* Subtle background texture overlay */}
          <div className="absolute inset-0 bg-radial-gradient from-terracotta/20 via-transparent to-transparent opacity-40 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16 relative z-10">
            {/* Left Copy */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-mango text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The 5 PM Snack Dilemma Solved</span>
              </div>

              <h2 className="editorial-headline text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-cream">
                YOUR SNACK DRAWER <br />
                <span className="text-mango italic">DESERVES</span> BETTER.
              </h2>

              <p className="text-sm sm:text-base text-cream/80 max-w-lg mb-8 leading-relaxed">
                Say goodbye to greasy potato chips and sugar-laden energy bars. Upgrade your desk, pantry, and bag with crunchy popped makhana and slow-roasted masala nuts.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/shop"
                  className="px-8 py-4 bg-terracotta hover:bg-terracotta-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-terracotta/30 flex items-center gap-2 active:scale-95"
                >
                  <span>Stock Up Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs text-cream/60 font-medium">
                  Use coupon <strong>MEPII10</strong> for 10% off
                </span>
              </div>
            </div>

            {/* Right Media Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden shadow-xl border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"
                  alt="Vibrant healthy roasted snack bowl"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-dark/70 backdrop-blur-md rounded-xl border border-white/10 text-xs text-cream">
                  <span className="font-bold text-mango block">100% Roasted Goodness</span>
                  <span className="text-cream/70 text-[11px]">Free express shipping on all orders above ₹499</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
