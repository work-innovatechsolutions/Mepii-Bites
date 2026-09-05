"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles, Check, Heart } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function FeaturedProductStory() {
  const product = PRODUCTS[1]; // Mepii Bites Quinoa Finger Peri Peri
  const { addToCart } = useCart();

  const flavorTags = [
    { label: "Light", desc: "Crisp puffed quinoa" },
    { label: "Crunchy", desc: "Golden drum roasted" },
    { label: "High Fiber", desc: "4.8g plant protein" },
    { label: "Spicy", desc: "African bird's eye kick" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Visual Media Composition */}
            <div className="lg:col-span-6 p-6 sm:p-10 relative">
              <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden bg-stone-50 shadow-lg flex items-center justify-center">
                <Image
                  src={product.images[0]}
                  alt="Mepii Bites Quinoa Finger Peri Peri jar"
                  fill
                  className="object-contain p-4 drop-shadow-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Floating badge */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-dark text-cream rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                  Real Hero Snack
                </div>
              </div>

              {/* Secondary thumbnail inset */}
              <div className="hidden sm:block absolute -bottom-4 -right-4 w-44 h-44 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-stone-100">
                <Image
                  src={product.images[1]}
                  alt="Quinoa Finger crunchy bites"
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </div>
            </div>

            {/* Right Column: Editorial Narrative & Flavor Profile */}
            <div className="lg:col-span-6 p-6 sm:p-10 lg:pl-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-bold uppercase tracking-wider mb-3">
                <Flame className="w-3.5 h-3.5 fill-terracotta" />
                <span>Supergrain Crunch</span>
              </div>

              <h2 className="editorial-headline text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight mb-4">
                MEET THE CRUNCH EVERYONE&apos;S TALKING ABOUT.
              </h2>

              <p className="text-sm sm:text-base text-dark/75 leading-relaxed mb-6">
                Light, crunchy and seriously addictive. Whole grain supergrain quinoa baked and slow-roasted into golden fingers, then tumbled in our bold peri-peri seasoning with crushed rock salt and sun-dried lemon.
              </p>

              {/* Flavor Profile Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {flavorTags.map((item) => (
                  <div
                    key={item.label}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center"
                  >
                    <span className="block text-sm font-black text-terracotta uppercase">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-muted font-medium">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* Nutritional Highlight Strip */}
              <div className="flex flex-wrap items-center gap-4 py-4 border-y border-stone-200/80 mb-8 text-xs text-dark/80 font-medium">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-sage" />
                  <span>Only 122 kcal / serving</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-sage" />
                  <span>4.8g Plant Protein</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-sage" />
                  <span>Source of Fiber</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => addToCart(product)}
                  className="px-8 py-3.5 bg-terracotta hover:bg-terracotta-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-98"
                >
                  TRY QUINOA FINGER • ₹{product.price}
                </button>
                <Link
                  href={`/product/${product.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold text-dark hover:text-terracotta transition-colors group"
                >
                  <span>Explore Ingredients</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
