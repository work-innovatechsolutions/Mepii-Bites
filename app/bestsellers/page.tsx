"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Star, Sparkles, ShieldCheck, Flame, HeartHandshake, ArrowRight } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function BestsellersPage() {
  const [selectedTab, setSelectedTab] = useState<string>("All");

  // Filter only genuine bestsellers
  const bestsellerProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.bestseller || p.category === "Curated Combos");
  }, []);

  const tabs = [
    { label: "All Bestsellers", value: "All" },
    { label: "Roasted Makhana", value: "Roasted Makhana" },
    { label: "Millet & Quinoa Crisps", value: "Millet & Quinoa Crisps" },
    { label: "Trail Mixes & Combos", value: "Trail Mixes" },
  ];

  const displayedProducts = useMemo(() => {
    if (selectedTab === "All") return bestsellerProducts;
    if (selectedTab === "Trail Mixes") {
      return bestsellerProducts.filter(
        (p) => p.category === "Trail Mixes" || p.category === "Curated Combos"
      );
    }
    return bestsellerProducts.filter((p) => p.category === selectedTab);
  }, [bestsellerProducts, selectedTab]);

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-muted mb-6">
          <Link href="/" className="hover:text-terracotta transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-dark font-semibold">Bestsellers</span>
        </nav>

        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#2E2823] via-[#3A322C] to-[#25201C] text-cream p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xl mb-12">
          {/* Subtle Ambient Glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-terracotta/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-sage/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>India's Most Loved Healthy Snacks</span>
            </div>

            <h1 className="editorial-headline text-3xl sm:text-5xl lg:text-6xl font-black text-cream tracking-tight mb-4">
              MEPII BESTSELLERS
            </h1>

            <p className="text-sm sm:text-base text-cream/80 leading-relaxed mb-8 max-w-xl">
              The crispiest, crunchiest, most re-ordered jars in our kitchen. 100% slow-roasted in cold-pressed oils with hand-pounded Indian spices. Zero palm oil, zero guilt, and maximum crunch.
            </p>

            {/* Social Proof Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-cream/10">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-amber-400 font-black text-lg sm:text-xl">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>4.9 / 5.0</span>
                </div>
                <span className="text-[11px] text-cream/70 mt-0.5">1,800+ Reviews</span>
              </div>

              <div className="flex flex-col">
                <span className="font-black text-cream text-lg sm:text-xl">100%</span>
                <span className="text-[11px] text-cream/70 mt-0.5">Roasted, Not Fried</span>
              </div>

              <div className="flex flex-col">
                <span className="font-black text-cream text-lg sm:text-xl">50,000+</span>
                <span className="text-[11px] text-cream/70 mt-0.5">Jars Delivered</span>
              </div>

              <div className="flex flex-col">
                <span className="font-black text-cream text-lg sm:text-xl">0%</span>
                <span className="text-[11px] text-cream/70 mt-0.5">Palm Oil & Trans Fat</span>
              </div>
            </div>
          </div>
        </div>

        {/* Spotlight Showcase: Hall of Fame Duo */}
        <div className="mb-12 bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-7 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-terracotta" />
            <h2 className="text-lg sm:text-xl font-serif font-black text-dark tracking-tight">
              Customer Choice: #1 Highest Rated
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex items-center gap-4 bg-[#FAF7F2] p-4 rounded-xl border border-stone-200/60">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-lg p-2 border border-stone-200/80 shrink-0">
                <Image
                  src="/products/makhana-pudhina.png"
                  alt="Mepii Bites Makhana Pudhina"
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-amber-500 text-xs mb-1 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9 (384 reviews)</span>
                </div>
                <h3 className="font-bold text-dark text-sm sm:text-base truncate">
                  Makhana (Pudhina Mint)
                </h3>
                <p className="text-xs text-muted line-clamp-2 mt-0.5">
                  Lotus seeds slow-roasted in cold-pressed oil with sun-dried mint and Himalayan salt.
                </p>
                <Link
                  href="/product/makhana-pudhina"
                  className="inline-flex items-center gap-1 text-xs font-bold text-terracotta hover:underline mt-2"
                >
                  View Snack Details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#FAF7F2] p-4 rounded-xl border border-stone-200/60">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-lg p-2 border border-stone-200/80 shrink-0">
                <Image
                  src="/products/quinoa-finger-peri-peri.png"
                  alt="Mepii Bites Quinoa Finger Peri Peri"
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-amber-500 text-xs mb-1 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9 (295 reviews)</span>
                </div>
                <h3 className="font-bold text-dark text-sm sm:text-base truncate">
                  Quinoa Finger (Peri Peri)
                </h3>
                <p className="text-xs text-muted line-clamp-2 mt-0.5">
                  Ancient Peruvian quinoa fingers with fiery bird's eye peri peri and lemon zest.
                </p>
                <Link
                  href="/product/quinoa-finger-peri-peri"
                  className="inline-flex items-center gap-1 text-xs font-bold text-terracotta hover:underline mt-2"
                >
                  View Snack Details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {tabs.map((tab) => {
            const isSelected = selectedTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setSelectedTab(tab.value)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                  isSelected
                    ? "bg-dark text-cream shadow-sm"
                    : "bg-white text-dark/75 hover:text-dark border border-stone-200 hover:border-stone-400"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Count Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/80 mb-6">
          <p className="text-xs sm:text-sm font-medium text-dark/70">
            Showing <strong className="text-dark">{displayedProducts.length}</strong> bestselling snacks
          </p>
          <div className="flex items-center gap-1 text-xs text-terracotta font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast Dispatch Guaranteed</span>
          </div>
        </div>

        {/* Bestseller Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Testimonials Banner */}
        <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-10 shadow-sm mb-12">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-terracotta uppercase tracking-wider">
              Verified Muncher Love
            </span>
            <h3 className="editorial-headline text-2xl sm:text-3xl font-black text-dark mt-1">
              WHY PEOPLE LOVE MEPII BESTSELLERS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200/60">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-dark/85 leading-relaxed italic mb-3">
                "I ordered the Pudhina Makhana and finished the whole jar during one movie! Super crisp, perfectly salted, and completely light on the stomach."
              </p>
              <div className="text-[11px] font-bold text-dark">
                Pooja K. <span className="text-sage font-normal">Verified Buyer • Mumbai</span>
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200/60">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-dark/85 leading-relaxed italic mb-3">
                "Quinoa Finger Peri Peri gives that fiery McDonald's shaker fries kick without any oil slick on your fingers. My evening tea staple now."
              </p>
              <div className="text-[11px] font-bold text-dark">
                Rohan M. <span className="text-sage font-normal">Verified Buyer • Bengaluru</span>
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200/60">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-dark/85 leading-relaxed italic mb-3">
                "The Royal Festive Hamper with all 5 jars was the hit of our family gathering. The Beetroot Chips and BBQ Jowar puffs are addictive!"
              </p>
              <div className="text-[11px] font-bold text-dark">
                Meera S. <span className="text-sage font-normal">Verified Buyer • Delhi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Satisfaction Guarantee Banner */}
        <div className="bg-sage/10 rounded-2xl border border-sage/20 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center text-sage shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-dark text-sm sm:text-base">
                100% Freshness & Satisfaction Guarantee
              </h4>
              <p className="text-xs text-muted mt-0.5">
                Vacuum-sealed in reusable jars. If you don't love the crunch, we replace or refund hassle-free.
              </p>
            </div>
          </div>

          <Link
            href="/shop"
            className="px-5 py-2.5 bg-dark text-cream rounded-full text-xs font-bold hover:bg-dark/90 transition-colors shrink-0"
          >
            Explore All 22 Snacks
          </Link>
        </div>

      </div>
    </div>
  );
}
