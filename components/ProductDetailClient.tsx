"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Check,
  ChevronDown,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatINR } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Accordion open states
  const [openAccordion, setOpenAccordion] = useState<string | null>("ingredients");

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize.label, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize.label, quantity);
    router.push("/checkout");
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-muted mb-8 font-medium">
          <Link href="/" className="hover:text-dark">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-dark">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/category/${product.category.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
            className="hover:text-dark"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-dark font-semibold truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Main Product Split: Gallery (Left) vs Details (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16 sm:mb-24 items-start">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image View */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-md">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                className={
                  (product.images[activeImageIndex] || product.images[0]).startsWith("/products/")
                    ? "object-contain p-6 sm:p-10 transition-transform duration-300 hover:scale-105"
                    : "object-cover"
                }
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.bestseller && (
                  <span className="px-3 py-1 rounded-full bg-dark text-cream text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    Bestseller
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="px-3 py-1 rounded-full bg-terracotta text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-colors shadow-md ${
                  isFavorited
                    ? "bg-white text-terracotta"
                    : "bg-white/80 text-stone-600 hover:text-terracotta hover:bg-white"
                }`}
                aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className="w-5 h-5"
                  fill={isFavorited ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* Thumbnails Row */}
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 sm:w-24 aspect-square rounded-2xl overflow-hidden border-2 transition-all bg-white ${
                    activeImageIndex === idx
                      ? "border-terracotta ring-2 ring-terracotta/20 shadow-sm"
                      : "border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    className={
                      img.startsWith("/products/")
                        ? "object-contain p-2"
                        : "object-cover"
                    }
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info & Purchase Controls */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-md">
            {/* Category Tag & Rating */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sage">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="font-bold text-dark">{product.rating}</span>
                <span className="text-muted">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="editorial-headline text-2xl sm:text-3xl lg:text-4xl font-black text-dark tracking-tight mb-3">
              {product.name}
            </h1>

            {/* Pricing Strip */}
            <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-stone-100">
              <span className="text-2xl sm:text-3xl font-black text-dark font-sans">
                {formatINR(selectedSize.price)}
              </span>
              {product.originalPrice > selectedSize.price && (
                <span className="text-sm text-stone-400 line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              {product.discount > 0 && (
                <span className="text-xs font-bold text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-md">
                  Save {product.discount}%
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-dark/75 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Dietary Tags Strip */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {product.dietary.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-stone-100 text-dark/80 text-[10px] font-semibold rounded-lg"
                >
                  ✓ {tag}
                </span>
              ))}
            </div>

            {/* Size Variant Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-dark uppercase tracking-wider">
                  Select Size / Pack:
                </span>
                <span className="text-xs text-muted">
                  {selectedSize.grams}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {product.sizes.map((size, idx) => {
                  const isSelected = selectedSizeIndex === idx;
                  return (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? "bg-dark text-cream border-dark shadow-sm"
                          : "bg-[#FAF7F2] text-dark border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      <span className="block text-xs font-bold">
                        {size.label}
                      </span>
                      <span className="block text-[11px] font-semibold mt-0.5 opacity-90">
                        {formatINR(size.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Add to Cart / Buy Now CTAs */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 p-1 shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-dark hover:bg-white rounded-lg transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-dark">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-dark hover:bg-white rounded-lg transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md active:scale-98 ${
                    isAdded
                      ? "bg-sage text-white"
                      : "bg-terracotta hover:bg-terracotta-hover text-white"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart • {formatINR(selectedSize.price * quantity)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Secondary Buy Now */}
              <button
                onClick={handleBuyNow}
                className="w-full flex items-center justify-center gap-2 py-3 bg-dark hover:bg-dark-light text-cream rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-sm active:scale-98"
              >
                <Zap className="w-4 h-4 text-mango fill-mango" />
                <span>Buy Now with 1-Click</span>
              </button>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-100 text-xs text-muted">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-sage" />
                <span>Free delivery on ₹499+</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-terracotta" />
                <span>100% Freshness Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Accordions Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="space-y-3">
            {/* Accordion: Ingredients */}
            <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs">
              <button
                onClick={() => toggleAccordion("ingredients")}
                className="w-full p-5 flex items-center justify-between text-left font-serif text-lg font-bold text-dark hover:bg-stone-50 transition-colors"
              >
                <span>Ingredients &amp; Sourcing</span>
                <ChevronDown
                  className={`w-5 h-5 text-stone-400 transition-transform duration-300 ${
                    openAccordion === "ingredients" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "ingredients" && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-dark/80 leading-relaxed border-t border-stone-100 pt-3">
                  <p className="mb-3">
                    Every ingredient in this recipe is whole, unadulterated, and free from artificial flavouring chemicals.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="px-3 py-1 bg-stone-100 text-dark font-medium rounded-lg text-xs"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Accordion: Nutritional Facts */}
            <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs">
              <button
                onClick={() => toggleAccordion("nutrition")}
                className="w-full p-5 flex items-center justify-between text-left font-serif text-lg font-bold text-dark hover:bg-stone-50 transition-colors"
              >
                <span>Nutritional Information (Per 30g Serving)</span>
                <ChevronDown
                  className={`w-5 h-5 text-stone-400 transition-transform duration-300 ${
                    openAccordion === "nutrition" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "nutrition" && (
                <div className="px-5 pb-5 border-t border-stone-100 pt-3">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <span className="block text-xs text-muted">Energy</span>
                      <span className="block text-base font-black text-dark mt-0.5">
                        {product.nutrition.calories} kcal
                      </span>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <span className="block text-xs text-muted">Protein</span>
                      <span className="block text-base font-black text-sage mt-0.5">
                        {product.nutrition.protein}
                      </span>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <span className="block text-xs text-muted">Carbohydrates</span>
                      <span className="block text-base font-black text-dark mt-0.5">
                        {product.nutrition.carbs}
                      </span>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <span className="block text-xs text-muted">Dietary Fiber</span>
                      <span className="block text-base font-black text-dark mt-0.5">
                        {product.nutrition.fiber}
                      </span>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <span className="block text-xs text-muted">Total Fat</span>
                      <span className="block text-base font-black text-dark mt-0.5">
                        {product.nutrition.fat}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion: Shipping & Delivery */}
            <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs">
              <button
                onClick={() => toggleAccordion("shipping")}
                className="w-full p-5 flex items-center justify-between text-left font-serif text-lg font-bold text-dark hover:bg-stone-50 transition-colors"
              >
                <span>Shipping &amp; Delivery Across India</span>
                <ChevronDown
                  className={`w-5 h-5 text-stone-400 transition-transform duration-300 ${
                    openAccordion === "shipping" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "shipping" && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-dark/80 leading-relaxed border-t border-stone-100 pt-3 space-y-2">
                  <p>
                    • <strong>Free Delivery:</strong> All orders above ₹499 qualify for free express shipping. Flat ₹50 for smaller orders.
                  </p>
                  <p>
                    • <strong>Delivery Timelines:</strong> Metro cities (Mumbai, Bengaluru, Delhi NCR, Hyderabad) arrive in 2–3 business days. Rest of India in 3–5 days.
                  </p>
                  <p>
                    • <strong>Packaging:</strong> Vacuum-sealed in nitrogen-flushed, resealable oxygen-barrier pouches to keep crispness locked in.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion: Returns & Freshness Promise */}
            <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs">
              <button
                onClick={() => toggleAccordion("returns")}
                className="w-full p-5 flex items-center justify-between text-left font-serif text-lg font-bold text-dark hover:bg-stone-50 transition-colors"
              >
                <span>Freshness Guarantee &amp; Easy Returns</span>
                <ChevronDown
                  className={`w-5 h-5 text-stone-400 transition-transform duration-300 ${
                    openAccordion === "returns" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "returns" && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-dark/80 leading-relaxed border-t border-stone-100 pt-3">
                  If your snacks arrive damaged, compromised, or not crunchy, write to our friendly support at{" "}
                  <strong className="text-terracotta">care@mepiibites.com</strong>. We will promptly issue a replacement box or refund.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-stone-200 pt-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="editorial-headline text-2xl sm:text-3xl font-black text-dark tracking-tight">
                YOU MAY ALSO LIKE
              </h3>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-dark hover:text-terracotta transition-colors group"
              >
                <span>Explore All</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
