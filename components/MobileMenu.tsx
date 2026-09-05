"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Search, Sparkles, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export default function MobileMenu({ isOpen, onClose, onOpenSearch }: MobileMenuProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF7F2] shadow-2xl flex flex-col z-50 overflow-y-auto animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-stone-200">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2.5"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-stone-300 shadow-xs bg-white">
              <Image
                src="/logo.jpg"
                alt="Mepii Bites"
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-serif text-dark font-black">
                MEPII BITES
              </span>
              <span className="text-[8px] font-bold text-sage uppercase tracking-wider">
                Healthy Snacks
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-dark/70 hover:text-dark rounded-full hover:bg-stone-200/60"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar in Mobile Menu */}
        <div className="p-4 border-b border-stone-200/60">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-left text-sm text-muted shadow-sm hover:border-terracotta/40 transition-colors"
          >
            <Search className="w-4 h-4 text-terracotta" />
            <span>Search peri peri, cashews...</span>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="p-4 space-y-1">
          <p className="text-[11px] font-bold text-muted uppercase tracking-wider px-3 mb-2">
            Browse Snacks
          </p>
          {[
            { label: "Home", href: "/" },
            { label: "Shop All Snacks", href: "/shop" },
            { label: "Bestsellers", href: "/bestsellers" },
            { label: "Curated Combos & Boxes", href: "/category/curated-combos" },
            { label: "Our Story & Values", href: "/about" },
            { label: "Customer Support & FAQs", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 text-dark font-medium rounded-lg hover:bg-stone-200/50 hover:text-terracotta transition-colors"
            >
              <span>{item.label}</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </Link>
          ))}
        </div>

        {/* Categories Section */}
        <div className="p-4 border-t border-stone-200/60">
          <p className="text-[11px] font-bold text-muted uppercase tracking-wider px-3 mb-3">
            Shop By Category
          </p>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                onClick={onClose}
                className="p-2.5 bg-white border border-stone-200/80 rounded-xl hover:border-terracotta transition-colors text-left group"
              >
                <span className="block text-xs font-semibold text-dark group-hover:text-terracotta">
                  {cat.name}
                </span>
                <span className="text-[10px] text-muted">{cat.count} items</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Promo callout at bottom */}
        <div className="mt-auto p-4 bg-terracotta/10 m-4 rounded-2xl border border-terracotta/20">
          <div className="flex items-center gap-2 text-terracotta font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Special 10% Off</span>
          </div>
          <p className="text-xs text-dark/80 mb-2">
            Use code <strong className="text-terracotta font-mono font-bold">MEPII10</strong> on any order above ₹499 for free shipping + discount.
          </p>
          <Link
            href="/shop"
            onClick={onClose}
            className="block text-center text-xs font-bold text-white bg-terracotta py-2 rounded-lg hover:bg-terracotta-hover transition-colors"
          >
            Start Snacking
          </Link>
        </div>
      </div>
    </div>
  );
}
