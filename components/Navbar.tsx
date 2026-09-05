"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, Menu, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import MobileMenu from "@/components/MobileMenu";
import SearchDialog from "@/components/SearchDialog";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut Cmd+K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Bestsellers", href: "/shop?filter=bestseller" },
    { label: "Combos", href: "/category/curated-combos" },
    { label: "New Arrivals", href: "/shop?sort=newest" },
    { label: "Our Story", href: "/about" },
  ];

  const [cartBump, setCartBump] = useState(false);

  // Trigger bounce animation when cart count changes
  useEffect(() => {
    if (itemCount > 0) {
      setCartBump(true);
      const timer = setTimeout(() => setCartBump(false), 500);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-stone-200/80 py-2.5 sm:py-3"
            : "bg-[#FAF7F2] py-3.5 sm:py-4 border-b border-stone-200/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          {/* Mobile: Hamburger Button */}
          <div className="flex items-center lg:hidden shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 -ml-1 text-dark hover:text-terracotta active:scale-90 transition-all rounded-lg focus:outline-none"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Left / Center (Mobile): Brand Logo */}
          <div className="flex items-center gap-4 lg:gap-8 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none shrink-0"
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-stone-300/90 shadow-xs group-hover:border-terracotta group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 shrink-0 bg-white">
                <Image
                  src="/logo.jpg"
                  alt="Mepii Bites Logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center leading-none">
                <span className="font-serif tracking-tight text-base sm:text-xl lg:text-2xl font-black text-dark whitespace-nowrap group-hover:text-terracotta transition-colors">
                  MEPII BITES
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold text-sage uppercase tracking-widest mt-0.5 whitespace-nowrap">
                  Healthy Snacks
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links with animated indicators */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-dark/80">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative py-1 transition-all duration-200 hover:text-terracotta hover:-translate-y-0.5 ${
                      isActive ? "text-terracotta font-semibold" : ""
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-terracotta rounded-full animate-in fade-in duration-200" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons with interactive hover animations */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 text-dark/75 hover:text-dark hover:bg-stone-200/50 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none"
              aria-label="Search products"
            >
              <Search className="w-5 h-5 text-dark" />
              <span className="hidden md:inline text-xs font-medium text-muted">
                Search
              </span>
              <kbd className="hidden lg:inline-block text-[10px] bg-stone-200/80 text-dark/60 px-1.5 py-0.5 rounded font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Link */}
            <Link
              href="/shop?view=wishlist"
              className="relative p-2 text-dark/75 hover:text-terracotta transition-all duration-200 rounded-full hover:bg-stone-200/50 hover:scale-105 active:scale-95"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-terracotta rounded-full animate-in zoom-in">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account / User demo link */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex p-2 text-dark/75 hover:text-dark transition-all duration-200 rounded-full hover:bg-stone-200/50 hover:scale-105 active:scale-95"
              aria-label="Account Support"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Button with animated bump */}
            <button
              onClick={openCart}
              className={`relative flex items-center gap-1.5 sm:gap-2 px-3 py-2 bg-terracotta text-white rounded-full hover:bg-terracotta-hover transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 focus:outline-none ${
                cartBump ? "scale-110 shadow-terracotta/30" : "scale-100"
              }`}
              aria-label={`Open Cart (${itemCount} items)`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold tracking-wide">
                {itemCount > 0 ? `${itemCount}` : "0"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => {
          setIsMobileMenuOpen(false);
          setIsSearchOpen(true);
        }}
      />

      {/* Search Dialog Modal */}
      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
