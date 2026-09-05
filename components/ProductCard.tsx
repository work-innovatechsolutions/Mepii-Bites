"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatINR } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize.label, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-terracotta/30 transition-all duration-300">
      {/* Product Image Area with Hover Image Swap */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden bg-[#F6F3EC]"
      >
        {/* Primary Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          className={`${
            product.images[0].startsWith("/products/") ? "object-contain p-3" : "object-cover"
          } transition-opacity duration-500 group-hover:opacity-0`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Secondary Hover Image */}
        <Image
          src={product.images[1] || product.images[0]}
          alt={`${product.name} alternate view`}
          fill
          className={`${
            (product.images[1] || product.images[0]).startsWith("/products/")
              ? "object-contain p-3"
              : "object-cover"
          } opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Refined Minimalist Badges (Horizontal, unblocking image) */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex items-center gap-1 z-10">
          {product.bestseller && (
            <span className="px-2 py-0.5 rounded-full bg-dark/90 text-cream text-[9px] font-bold uppercase tracking-wider shadow-xs backdrop-blur-xs">
              Bestseller
            </span>
          )}
          {product.discount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-terracotta text-white text-[9px] font-bold uppercase tracking-wider shadow-xs">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            isFavorited
              ? "bg-white text-terracotta shadow-md"
              : "bg-white/80 text-stone-500 hover:text-terracotta hover:bg-white"
          }`}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            fill={isFavorited ? "currentColor" : "none"}
          />
        </button>
      </Link>

      {/* Card Information */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Authentic Indian Veg Symbol & Rating Row */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 border border-emerald-600 flex items-center justify-center rounded-xs shrink-0"
                title="100% Vegetarian"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 block" />
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 tracking-wide uppercase">
                100% Veg
              </span>
            </div>

            <div className="flex items-center text-amber-500 gap-1 shrink-0 text-xs">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-bold text-dark text-[11px] sm:text-xs">{product.rating}</span>
              <span className="text-[10px] text-muted">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link
            href={`/product/${product.slug}`}
            className="block font-bold text-sm sm:text-base text-dark hover:text-terracotta transition-colors line-clamp-1 mb-1"
          >
            {product.name}
          </Link>

          {/* Short Description */}
          <p className="text-xs text-muted line-clamp-2 leading-relaxed mb-3">
            {product.shortDescription}
          </p>
        </div>

        <div>
          {/* Size Variant Selector Pills */}
          {product.sizes.length > 1 && (
            <div className="flex items-center gap-1.5 mb-3">
              {product.sizes.map((size, idx) => (
                <button
                  key={size.label}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSizeIndex(idx);
                  }}
                  className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border transition-all ${
                    selectedSizeIndex === idx
                      ? "bg-dark text-cream border-dark"
                      : "bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-400"
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          )}

          {/* Price & Add to Cart Action */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-black text-dark font-sans">
                  {formatINR(selectedSize.price)}
                </span>
                {product.originalPrice > selectedSize.price && (
                  <span className="text-xs text-stone-400 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium text-sage">
                {product.flavor}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs active:scale-95 ${
                isAdded
                  ? "bg-sage text-white"
                  : "bg-terracotta hover:bg-terracotta-hover text-white"
              }`}
              aria-label={`Add ${product.name} to cart`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
