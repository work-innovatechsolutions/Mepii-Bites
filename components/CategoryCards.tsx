"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export default function CategoryCards() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 text-terracotta text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore The Range</span>
            </div>
            <h2 className="editorial-headline text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight">
              FIND YOUR KIND OF CRUNCH
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm sm:text-base text-dark/70 max-w-md">
            From movie-night munchies to guilt-free desk snacks. Roasted to crisp perfection.
          </p>
        </div>

        {/* Categories Layout: Asymmetric Grid on Desktop, Horizontal Scroll on Mobile */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto pb-4 sm:pb-0 no-scrollbar snap-x">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className={`group relative flex-none w-[280px] sm:w-auto snap-center rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-terracotta/40 transition-all duration-300 flex flex-col justify-between ${
                idx === 0 || idx === 5 ? "lg:col-span-1" : ""
              }`}
            >
              {/* Category Image */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-gradient-to-b from-stone-100 to-stone-200/60 flex items-center justify-center">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className={`${
                    cat.image.startsWith("/products/") ? "object-contain p-4 drop-shadow-lg" : "object-cover"
                  } group-hover:scale-105 transition-transform duration-500 ease-out`}
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none" />

                {/* Badge if available */}
                {cat.badge && (
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-dark text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {cat.badge}
                  </span>
                )}

                {/* Count Pill */}
                <span className="absolute bottom-3.5 left-3.5 px-2.5 py-0.5 rounded-full bg-dark/75 text-cream text-[11px] font-semibold backdrop-blur-xs">
                  {cat.count} items
                </span>
              </div>

              {/* Card Text Content */}
              <div className="p-5 flex items-center justify-between gap-4 bg-white">
                <div>
                  <h3 className="text-lg font-bold text-dark group-hover:text-terracotta transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted mt-1 line-clamp-1">
                    {cat.shortDescription}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-terracotta text-dark group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
