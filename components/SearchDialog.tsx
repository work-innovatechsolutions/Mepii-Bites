"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/utils";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Live filter products
  useEffect(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) {
      setResults([]);
      return;
    }

    const matches = PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(clean) ||
        p.category.toLowerCase().includes(clean) ||
        p.tags.some((t) => t.toLowerCase().includes(clean)) ||
        p.flavor.toLowerCase().includes(clean) ||
        p.ingredients.some((i) => i.toLowerCase().includes(clean))
      );
    });

    setResults(matches);
  }, [query]);

  const quickPills = ["Pudhina", "Quinoa Finger", "Ragi Chips", "Makhana", "Combos", "Chocolate"];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="min-h-screen px-4 py-8 flex items-start justify-center">
        <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200 mt-12 sm:mt-16">
          {/* Search Header Input */}
          <div className="p-4 sm:p-5 border-b border-stone-200/80 bg-white flex items-center gap-3">
            <Search className="w-5 h-5 text-terracotta shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="What are you craving? (e.g. makhana, peri peri, cashews...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-base sm:text-lg bg-transparent border-none text-dark placeholder-stone-400 focus:outline-none focus:ring-0 font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-stone-400 hover:text-dark p-1 text-xs font-semibold"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-dark rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Filter Suggestions */}
          <div className="px-4 py-3 bg-stone-100/60 border-b border-stone-200/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-muted uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-terracotta" />
              Trending:
            </span>
            {quickPills.map((pill) => (
              <button
                key={pill}
                onClick={() => setQuery(pill)}
                className="px-2.5 py-1 text-xs font-medium bg-white text-dark/80 rounded-full border border-stone-200 hover:border-terracotta hover:text-terracotta shrink-0 transition-colors shadow-2xs"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Results Container */}
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
            {!query.trim() ? (
              <div className="py-8 text-center text-stone-500 text-sm">
                <p className="font-serif text-lg text-dark mb-1">
                  Craving something crunchy?
                </p>
                <p className="text-xs text-muted max-w-sm mx-auto">
                  Type any snack name, flavour (sweet, spicy, tangy), or ingredient to find your match.
                </p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted font-medium mb-2 px-1">
                  <span>Found {results.length} snack{results.length > 1 ? "s" : ""}</span>
                  <span>Press Esc to exit</span>
                </div>
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between gap-4 p-3 bg-white rounded-xl border border-stone-200/70 hover:border-terracotta/40 hover:shadow-md transition-all group"
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3.5 flex-1 min-w-0"
                    >
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="56px"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sage">
                          {product.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-dark truncate group-hover:text-terracotta transition-colors">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-dark">
                            {formatINR(product.price)}
                          </span>
                          <span className="text-[10px] text-muted line-through">
                            {formatINR(product.originalPrice)}
                          </span>
                        </div>
                      </div>
                    </Link>

                    <button
                      onClick={() => {
                        addToCart(product);
                        onClose();
                      }}
                      className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-terracotta/10 hover:bg-terracotta text-terracotta hover:text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Add</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-mango/10 text-mango flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-base font-bold text-dark uppercase tracking-wider mb-1">
                  NOTHING CRUNCHY HERE YET.
                </h4>
                <p className="text-xs text-muted">
                  Try searching for <button onClick={() => setQuery("makhana")} className="text-terracotta font-semibold underline">makhana</button>, <button onClick={() => setQuery("cashews")} className="text-terracotta font-semibold underline">cashews</button>, or <button onClick={() => setQuery("combos")} className="text-terracotta font-semibold underline">combos</button>.
                </p>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="px-4 py-2.5 bg-stone-100/80 border-t border-stone-200/60 text-center text-[11px] text-muted">
            All Mepii Bites snacks are 100% roasted, vegetarian, and preservative-free.
          </div>
        </div>
      </div>
    </div>
  );
}
