"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { getBestsellers } from "@/data/products";
import ProductCard from "./ProductCard";

export default function BestsellerSection() {
  const bestsellers = getBestsellers().slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 text-terracotta text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 fill-terracotta" />
              <span>Highest Rated Munchies</span>
            </div>
            <h2 className="editorial-headline text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight">
              THE ONES EVERYONE&apos;S SNACKING ON
            </h2>
          </div>

          <Link
            href="/shop"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-bold text-dark hover:text-terracotta transition-colors group"
          >
            <span>SHOP ALL</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Bestseller Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {bestsellers.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={idx < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
