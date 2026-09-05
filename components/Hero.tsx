"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Flame, ShieldCheck, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";

export default function Hero() {
  const { addToCart } = useCart();
  const heroProduct = PRODUCTS[0]; // Mepii Bites Makhana (Pudhina)

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] pt-6 pb-16 lg:pt-10 lg:pb-20">
      {/* Subtle organic background glow accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-terracotta/10 via-mango/10 to-sage/10 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Split Section: Editorial Headline & Hero Product Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-12 sm:mb-16">
          {/* Left Column: Editorial Headline & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Eyebrow badge with official brand slogan */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage/15 border border-sage/30 text-sage text-xs font-bold uppercase tracking-wider mb-5">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              <span>Snack Happy • Stay Mepii</span>
            </div>

            {/* Giant Editorial Heading */}
            <h1 className="editorial-headline text-4xl sm:text-6xl lg:text-7xl font-black text-dark tracking-tight leading-[1.05] mb-6">
              BIG FLAVOUR. <br />
              <span className="text-terracotta italic font-normal">ZERO</span> BORING BITES.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-dark/75 max-w-xl leading-relaxed mb-8 font-normal">
              Pure Ingredients. Real Taste. Festival Delight. Wholesome slow-roasted makhana, supergrain quinoa fingers, and crunchy festive jars made with zero guilt and zero palm oil.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-terracotta hover:bg-terracotta-hover text-white text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg hover:shadow-terracotta/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>Shop All Snacks</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/category/curated-combos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-white hover:bg-stone-100 text-dark border border-stone-300 text-sm font-bold uppercase tracking-wider rounded-xl hover:-translate-y-0.5 transition-all duration-200 shadow-xs"
              >
                <span>Festive Combos</span>
              </Link>
            </div>

            {/* Social Proof & Rating strip */}
            <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-wrap items-center gap-6 text-xs text-dark/70">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-stone-300 shadow-xs">
                  <Image
                    src="/logo.jpg"
                    alt="Mepii Bites"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div className="leading-tight">
                  <span className="font-bold text-dark block">10,000+ Happy Munchers</span>
                  <span className="text-muted">Across 50+ Indian Cities</span>
                </div>
              </div>

              <div className="h-6 w-px bg-stone-300 hidden sm:block" />

              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-dark">4.9 / 5</span>
                <span className="text-muted">(2,400+ reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Real Jar Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Background card with clean padding and safe badge placement */}
            <div className="relative w-full max-w-md rounded-3xl bg-white border border-stone-200/90 p-5 sm:p-6 shadow-xl flex flex-col justify-between overflow-hidden">
              {/* Product Badges Bar */}
              <div className="flex items-center justify-between z-10 mb-2">
                <span className="px-3 py-1 bg-dark text-cream text-[11px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                  Mepii Flagship
                </span>
                <span className="flex items-center gap-1 px-2.5 py-1 bg-sage/10 text-sage text-xs font-bold rounded-full shadow-xs border border-sage/20">
                  <Sparkles className="w-3.5 h-3.5 text-sage" />
                  Pudhina Crunch
                </span>
              </div>

              {/* Floating ingredient callout 1 (Safely inside container) */}
              <div className="absolute top-16 left-5 sm:left-6 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-stone-200/90 flex items-center gap-2 z-20">
                <span className="w-2 h-2 rounded-full bg-sage animate-ping" />
                <span className="text-[11px] font-bold text-dark whitespace-nowrap">
                  Light on Gut • High Fiber
                </span>
              </div>

              {/* Floating ingredient callout 2 (Safely inside container) */}
              <div className="absolute top-28 right-5 sm:right-6 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-stone-200/90 flex items-center gap-1.5 z-20">
                <ShieldCheck className="w-3.5 h-3.5 text-terracotta" />
                <span className="text-[11px] font-bold text-dark whitespace-nowrap">
                  Snack Happy Stay Mepii
                </span>
              </div>

              {/* Main Hero Product Image */}
              <div className="relative my-2 sm:my-3 w-full h-[270px] sm:h-[290px] flex items-center justify-center">
                <Image
                  src={heroProduct.images[0]}
                  alt="Mepii Bites Makhana Pudhina"
                  fill
                  priority
                  className="object-contain hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 450px"
                />
              </div>

              {/* Quick Card Information & Quick Add */}
              <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-xs z-10 mt-1">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-dark text-sm sm:text-base leading-snug">
                      {heroProduct.name}
                    </h3>
                    <p className="text-[11px] text-muted mt-0.5">
                      Slow-roasted foxnuts • Garden Pudhina &amp; Rock Salt
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="block font-black text-dark text-base sm:text-lg leading-none">
                      ₹{heroProduct.price}
                    </span>
                    <span className="text-[11px] text-muted line-through mt-0.5 block">
                      ₹{heroProduct.originalPrice}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(heroProduct)}
                  className="w-full py-3 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-98"
                >
                  Quick Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Panoramic Festive Campaign Showcase Banner (using real hero.png) */}
        <div className="relative rounded-3xl overflow-hidden border border-stone-200/80 shadow-2xl bg-white group">
          {/* Header Banner Strip */}
          <div className="px-6 py-3 bg-gradient-to-r from-dark via-stone-900 to-dark text-cream flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-mango animate-ping" />
              <span className="uppercase tracking-wider text-mango">Festive Campaign Spotlight</span>
              <span className="hidden sm:inline text-stone-400">•</span>
              <span className="hidden sm:inline font-normal text-stone-300">Janmashtami Healthy Snacking Celebration</span>
            </div>
            <span className="text-[11px] text-cream/80 bg-white/10 px-2.5 py-0.5 rounded-full">
              Use code <strong className="text-mango font-mono">MEPII10</strong>
            </span>
          </div>

          {/* Panoramic Image Container */}
          <div className="relative aspect-16/9 w-full overflow-hidden bg-stone-100">
            <Image
              src="/hero.png"
              alt="Happy Janmashtami - Mepii Bites Healthy Snacking Festive Banner"
              fill
              priority
              className="object-cover group-hover:scale-[1.01] transition-transform duration-700"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          </div>

          {/* Interactive Bottom Bar: Calling out all 5 featured jars */}
          <div className="p-4 sm:p-6 bg-white/95 backdrop-blur-md border-t border-stone-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-sage/30 bg-white shrink-0 shadow-xs">
                <Image
                  src="/logo.jpg"
                  alt="Mepii Bites Logo"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sage block">
                  Featured Jars in Campaign
                </span>
                <span className="font-serif font-black text-dark text-sm sm:text-base">
                  Roasted &amp; Baked Jars • Trans Fat Free • No Preservatives
                </span>
              </div>
            </div>

            {/* Direct Quick-Shop Buttons for the 5 Jars */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/product/jowar-puff-bbq"
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-dark hover:text-white text-dark text-xs font-semibold transition-colors"
              >
                Jowar Puff (BBQ)
              </Link>
              <Link
                href="/product/makhana-pudhina"
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-dark hover:text-white text-dark text-xs font-semibold transition-colors"
              >
                Makhana
              </Link>
              <Link
                href="/product/beetroot-chips"
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-dark hover:text-white text-dark text-xs font-semibold transition-colors"
              >
                Beetroot Chips
              </Link>
              <Link
                href="/product/cocktail-mixture"
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-dark hover:text-white text-dark text-xs font-semibold transition-colors"
              >
                Cocktail Mixture
              </Link>
              <Link
                href="/product/corn-waffers-cream-onion"
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-dark hover:text-white text-dark text-xs font-semibold transition-colors"
              >
                Corn Wafers
              </Link>
              <Link
                href="/shop"
                className="px-4 py-1.5 rounded-xl bg-terracotta text-white text-xs font-bold uppercase tracking-wider hover:bg-terracotta-hover transition-colors shadow-sm ml-1"
              >
                Explore All
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
