"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Check, ShoppingBag } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";

export default function ComboSection() {
  const { addToCart } = useCart();
  const comboProducts = PRODUCTS.filter((p) => p.category === "Curated Combos");

  const combo1 = PRODUCTS.find((p) => p.slug === "royal-festive-hamper") || PRODUCTS[20];
  const combo2 = PRODUCTS.find((p) => p.slug === "weekend-party-box") || PRODUCTS[21];

  const combos = [
    {
      product: combo1,
      badge: "Festive Special • Save 20%",
      items: [
        "Jowar Puff (BBQ)",
        "Makhana (Salt & Pepper)",
        "BeetRoot Chips",
        "CockTail Mixture",
        "Corn Waffers (Cream & Onion)"
      ],
      bestFor: "Festivals & Gifting",
      accent: "border-terracotta/30 bg-terracotta/5",
      btnAccent: "bg-terracotta hover:bg-terracotta-hover",
    },
    {
      product: combo2,
      badge: "Save 21% • Most Popular",
      items: [
        "Makhana (Pudhina)",
        "Quinoa Finger (Peri Peri)",
        "Quinoa Chips",
        "Ragi Chips",
        "Quinoa Straws (Chocolate)",
        "Banana Chips (Pudina)",
        "Millet Bhujia"
      ],
      bestFor: "House Parties & Binge Nights",
      accent: "border-sage/40 bg-sage/5 shadow-md",
      btnAccent: "bg-sage hover:bg-sage-dark",
      featured: true,
    },
    {
      product: PRODUCTS[1], // Quinoa Finger Peri Peri
      badge: "Bestseller Duo",
      items: [
        "Quinoa Finger (Peri Peri) 100g",
        "Makhana (Pudhina) 80g",
        "Quinoa Straws (Chocolate) 100g",
        "Free Reusable Jars"
      ],
      bestFor: "Desk Snacking & Office 4 PM",
      accent: "border-mango/40 bg-mango/5",
      btnAccent: "bg-dark hover:bg-dark-light",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 text-terracotta text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Value Variety Bundles</span>
            </div>
            <h2 className="editorial-headline text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight">
              CAN&apos;T PICK JUST ONE? DON&apos;T.
            </h2>
          </div>
          <div className="mt-3 md:mt-0">
            <p className="text-sm sm:text-base text-dark/70 max-w-sm mb-2">
              Build your ultimate snack stash. Packed in eco-friendly gift boxes with up to 21% savings.
            </p>
            <Link
              href="/category/curated-combos"
              className="inline-flex items-center gap-2 text-xs font-bold text-terracotta hover:underline uppercase tracking-wider"
            >
              <span>Explore All Bundles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3 Bundle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {combos.map((combo) => {
            const prod = combo.product;
            return (
              <div
                key={prod.id}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 border bg-white shadow-sm hover:shadow-xl transition-all duration-300 ${
                  combo.accent
                } ${combo.featured ? "md:-translate-y-2 ring-2 ring-sage/30" : ""}`}
              >
                {/* Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-dark text-cream text-[10px] font-bold uppercase tracking-wider">
                    {combo.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-muted">
                    {combo.bestFor}
                  </span>
                </div>

                {/* Combo Image */}
                <Link
                  href={`/product/${prod.slug}`}
                  className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-[#F6F3EC] mb-5 block group"
                >
                  <Image
                    src={prod.images[0]}
                    alt={prod.name}
                    fill
                    className={`${
                      prod.images[0].startsWith("/products/") ? "object-contain p-4" : "object-cover"
                    } group-hover:scale-105 transition-transform duration-500`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </Link>

                {/* Info */}
                <div className="flex-1">
                  <Link
                    href={`/product/${prod.slug}`}
                    className="block font-serif text-xl sm:text-2xl font-bold text-dark hover:text-terracotta transition-colors mb-2"
                  >
                    {prod.name}
                  </Link>
                  <p className="text-xs text-muted leading-relaxed mb-4">
                    {prod.shortDescription}
                  </p>

                  {/* Included Items Checklist */}
                  <div className="space-y-1.5 py-3 border-y border-stone-200/80 mb-5">
                    <span className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                      Inside this box:
                    </span>
                    {combo.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-xs font-medium text-dark/80"
                      >
                        <Check className="w-3.5 h-3.5 text-sage shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Add to Cart */}
                <div className="mt-4 pt-2 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-black text-dark">
                        {formatINR(prod.price)}
                      </span>
                      <span className="text-xs text-stone-400 line-through">
                        {formatINR(prod.originalPrice)}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-terracotta uppercase">
                      Free Shipping Included
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(prod)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 ${combo.btnAccent}`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Box</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
