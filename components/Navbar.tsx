"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, Menu, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import MobileMenu from "@/components/MobileMenu";
import SearchDialog from "@/components/SearchDialog";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        const heroTrack = document.getElementById("hero-scroll-track");
        if (heroTrack) {
          const rect = heroTrack.getBoundingClientRect();
          // Keep navbar transparent for the entire hero animation track
          // Only transition to frosted blur once hero has scrolled past the viewport
          setIsScrolled(rect.bottom <= 80);
          return;
        }
      }
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

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
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Bestsellers", href: "/bestsellers" },
    { label: "Combos", href: "/category/curated-combos" },
    { label: "New Arrivals", href: "/shop?sort=newest" },
    { label: "Our Story", href: "/about" },
  ];

  const [cartBump, setCartBump] = useState(false);

  // Trigger bounce animation when cart count changes
  useEffect(() => {
    if (itemCount > 0) {
      setCartBump(true);
      const timer = setTimeout(() => setCartBump(false), 600);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 z-40 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-[#FAF7F2]/85 backdrop-blur-md shadow-xs border-b border-stone-200/60 py-2 sm:py-2.5"
            : pathname === "/"
            ? "bg-transparent border-b border-transparent py-3 sm:py-3.5"
            : "bg-[#FAF7F2] py-3 sm:py-3.5 border-b border-stone-200/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 h-10 sm:h-12">
            
            {/* === LEFT COLUMN: Hamburger on mobile / Brand on desktop === */}
            <div className="flex items-center lg:w-1/4 justify-start shrink-0">
              {/* Mobile: Hamburger Button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.88 }}
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-1 text-dark hover:text-terracotta transition-colors rounded-lg focus:outline-none"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>

              {/* Desktop: Brand Logo Lockup */}
              <Link
                href="/"
                className="hidden lg:flex items-center gap-2.5 group focus:outline-none shrink-0"
              >
                <motion.div
                  whileHover={{ rotate: [0, -6, 6, 0], scale: 1.08 }}
                  transition={{ duration: 0.35 }}
                  className="relative w-9 h-9 xl:w-10 xl:h-10 rounded-full overflow-hidden border border-stone-300 shadow-xs group-hover:border-terracotta transition-colors shrink-0 bg-white"
                >
                  <Image
                    src="/logo.jpg"
                    alt="Mepii Bites Logo"
                    fill
                    sizes="40px"
                    className="object-cover"
                    priority
                  />
                </motion.div>
                <div className="flex flex-col justify-center leading-none">
                  <span className="font-serif tracking-tight text-xl xl:text-2xl font-black text-dark whitespace-nowrap group-hover:text-terracotta transition-colors">
                    MEPII BITES
                  </span>
                  <span className="text-[8px] xl:text-[9px] font-bold text-sage uppercase tracking-widest mt-0.5 whitespace-nowrap">
                    Healthy Snacks
                  </span>
                </div>
              </Link>
            </div>

            {/* === CENTER COLUMN: Centered Brand Logo on Mobile / Centered Nav on Desktop === */}
            
            {/* Mobile: Perfectly Centered Brand Lockup */}
            <div className="flex lg:hidden flex-1 items-center justify-center min-w-0">
              <Link
                href="/"
                className="flex items-center gap-2 group focus:outline-none shrink-0"
              >
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-stone-300/80 shadow-2xs bg-white shrink-0">
                  <Image
                    src="/logo.jpg"
                    alt="Mepii Bites"
                    fill
                    sizes="32px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center text-center leading-none">
                  <span className="font-serif tracking-tight text-base sm:text-lg font-black text-dark whitespace-nowrap group-hover:text-terracotta transition-colors">
                    MEPII BITES
                  </span>
                  <span className="text-[7px] sm:text-[8px] font-bold text-sage uppercase tracking-wider mt-0.5 whitespace-nowrap">
                    Healthy Snacks
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop: Perfectly Centered Navigation Links */}
            <nav
              className="hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-2 text-sm font-medium"
              onMouseLeave={() => setHoveredPath(null)}
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onMouseEnter={() => setHoveredPath(link.href)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold tracking-wide transition-colors ${
                      isActive ? "text-terracotta font-bold" : "text-dark/80 hover:text-dark"
                    }`}
                  >
                    {/* Hover Animated Backdrop Pill */}
                    {hoveredPath === link.href && (
                      <motion.span
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 bg-stone-200/60 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}

                    {/* Active Underline Indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-line"
                        className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-terracotta rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* === RIGHT COLUMN: Action Buttons === */}
            <div className="flex items-center justify-end lg:w-1/4 gap-1.5 sm:gap-2 shrink-0">
              {/* Search Trigger */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 text-dark/75 hover:text-dark hover:bg-stone-200/50 rounded-full transition-colors focus:outline-none"
                aria-label="Search snacks"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-dark" />
                <span className="hidden xl:inline text-xs font-medium text-muted">
                  Search
                </span>
                <kbd className="hidden xl:inline-block text-[10px] bg-stone-200/80 text-dark/60 px-1.5 py-0.5 rounded font-mono">
                  ⌘K
                </kbd>
              </motion.button>

              {/* Wishlist Link with Pop Animation */}
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/shop?view=wishlist"
                  className="relative p-2 text-dark/75 hover:text-terracotta transition-colors rounded-full hover:bg-stone-200/50 block"
                  aria-label="View Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      wishlistCount > 0 ? "fill-terracotta/15 text-terracotta" : ""
                    }`}
                  />
                  <AnimatePresence>
                    {wishlistCount > 0 && (
                      <motion.span
                        key={wishlistCount}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-terracotta rounded-full shadow-2xs"
                      >
                        {wishlistCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>

              {/* Account / Contact Support (desktop only) */}
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
                <Link
                  href="/contact"
                  className="p-2 text-dark/75 hover:text-dark transition-colors rounded-full hover:bg-stone-200/50 block"
                  aria-label="Customer Support"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </motion.div>

              {/* Cart Button with Animated Bounce & Ripple Ring */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                animate={
                  cartBump
                    ? { scale: [1, 1.18, 0.96, 1.06, 1], rotate: [0, -5, 5, -2, 0] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.55 }}
                onClick={openCart}
                className="relative flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-terracotta text-white rounded-full hover:bg-terracotta-hover transition-colors shadow-sm hover:shadow-md focus:outline-none"
                aria-label={`Open Cart (${itemCount} items)`}
              >
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-xs font-bold tracking-wide">
                  {itemCount > 0 ? `${itemCount}` : "0"}
                </span>

                {/* Pulsing ring on cart add */}
                {cartBump && (
                  <span className="absolute inset-0 rounded-full border-2 border-terracotta animate-ping pointer-events-none" />
                )}
              </motion.button>
            </div>

          </div>
        </div>
      </motion.header>

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
