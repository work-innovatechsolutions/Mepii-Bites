"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ArrowUpDown, Sparkles, Check } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";
import { useWishlist } from "@/context/WishlistContext";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("filter");
  const initialCategory = searchParams.get("category");
  const initialView = searchParams.get("view");
  const initialSort = searchParams.get("sort");

  const { wishlistIds } = useWishlist();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || (initialFilter === "bestseller" ? "Bestsellers" : "All")
  );
  const [viewOnlyWishlist, setViewOnlyWishlist] = useState<boolean>(
    initialView === "wishlist"
  );
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1600);
  const [sortBy, setSortBy] = useState<string>(
    initialSort === "newest" ? "featured" : "featured"
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const categoryPills = [
    { label: "All", value: "All" },
    { label: "Bestsellers", value: "Bestsellers" },
    { label: "Makhana", value: "Roasted Makhana" },
    { label: "Nuts & Seeds", value: "Nuts & Seeds" },
    { label: "Trail Mixes", value: "Trail Mixes" },
    { label: "Healthy Bites", value: "Healthy Bites" },
    { label: "Combos", value: "Curated Combos" },
  ];

  const dietaryOptions = [
    "Gluten-Free",
    "Roasted Not Fried",
    "High-Protein",
    "Zero Palm Oil",
    "100% Vegetarian",
  ];

  const flavorOptions = [
    "Spicy",
    "Tangy",
    "Savory",
    "Sweet",
    "Classic Salted",
  ];

  const toggleDietary = (item: string) => {
    setSelectedDietary((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const toggleFlavor = (item: string) => {
    setSelectedFlavors((prev) =>
      prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedDietary([]);
    setSelectedFlavors([]);
    setMaxPrice(1600);
    setViewOnlyWishlist(false);
  };

  const activeFilterCount =
    (selectedCategory !== "All" ? 1 : 0) +
    selectedDietary.length +
    selectedFlavors.length +
    (maxPrice < 1600 ? 1 : 0) +
    (viewOnlyWishlist ? 1 : 0);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Wishlist view
      if (viewOnlyWishlist && !wishlistIds.includes(product.id)) {
        return false;
      }

      // Category Pill
      if (selectedCategory === "Bestsellers" && !product.bestseller) {
        return false;
      }
      if (
        selectedCategory !== "All" &&
        selectedCategory !== "Bestsellers" &&
        product.category !== selectedCategory
      ) {
        return false;
      }

      // Price Filter
      if (product.price > maxPrice) {
        return false;
      }

      // Dietary Filters (AND logic or match all selected)
      if (selectedDietary.length > 0) {
        const matchesDietary = selectedDietary.every((d) =>
          product.dietary.some((pd) => pd.toLowerCase().includes(d.toLowerCase()))
        );
        if (!matchesDietary) return false;
      }

      // Flavor Filters (OR logic for selected flavors)
      if (selectedFlavors.length > 0) {
        if (!selectedFlavors.includes(product.flavor)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "bestseller") return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, viewOnlyWishlist, wishlistIds, maxPrice, selectedDietary, selectedFlavors, sortBy]);

  return (
    <div className="py-8 sm:py-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Roasted Goodness</span>
          </div>
          <h1 className="editorial-headline text-3xl sm:text-5xl font-black text-dark tracking-tight">
            {viewOnlyWishlist ? "YOUR WISHLIST" : "SHOP ALL SNACKS"}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted max-w-xl">
            {viewOnlyWishlist
              ? `Saved munchies (${filteredProducts.length} items)`
              : "Find your next favourite crunch. From fiery peri peri foxnuts to slow-roasted tandoori cashews."}
          </p>
        </div>

        {/* Category Pills Slider */}
        {!viewOnlyWishlist && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
            {categoryPills.map((pill) => {
              const isSelected = selectedCategory === pill.value;
              return (
                <button
                  key={pill.value}
                  onClick={() => setSelectedCategory(pill.value)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                    isSelected
                      ? "bg-dark text-cream shadow-sm"
                      : "bg-white text-dark/75 hover:text-dark border border-stone-200 hover:border-stone-400"
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Control Bar: Mobile Filter trigger, Count, Sorting */}
        <div className="flex items-center justify-between gap-4 py-3 border-y border-stone-200/80 mb-8 bg-white/60 px-4 rounded-xl">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-bold text-dark shadow-2xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-terracotta text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <span className="text-xs sm:text-sm font-medium text-dark/70">
              Showing <strong className="text-dark">{filteredProducts.length}</strong> snacks
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 hidden sm:inline" />
            <span className="text-xs text-muted hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-bold text-dark bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-terracotta"
            >
              <option value="featured">Featured Picks</option>
              <option value="bestseller">Best Selling</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Main Grid with Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="font-serif font-bold text-base text-dark">
                Filters
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-terracotta hover:underline font-semibold"
                >
                  Clear all ({activeFilterCount})
                </button>
              )}
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-dark mb-2">
                <span>Max Price</span>
                <span className="text-terracotta font-mono font-bold">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min={180}
                max={1600}
                step={20}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-terracotta cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted mt-1">
                <span>₹189</span>
                <span>₹1,499</span>
              </div>
            </div>

            {/* Dietary Preference Checkboxes */}
            <div className="border-t border-stone-100 pt-4">
              <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-3">
                Dietary Preferences
              </h4>
              <div className="space-y-2">
                {dietaryOptions.map((opt) => {
                  const checked = selectedDietary.includes(opt);
                  return (
                    <label
                      key={opt}
                      className="flex items-center gap-2.5 text-xs text-dark/80 hover:text-dark cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleDietary(opt)}
                        className="rounded text-terracotta focus:ring-terracotta w-3.5 h-3.5 cursor-pointer"
                      />
                      <span>{opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Flavor Profile Checkboxes */}
            <div className="border-t border-stone-100 pt-4">
              <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-3">
                Flavour Profile
              </h4>
              <div className="space-y-2">
                {flavorOptions.map((flv) => {
                  const checked = selectedFlavors.includes(flv);
                  return (
                    <label
                      key={flv}
                      className="flex items-center gap-2.5 text-xs text-dark/80 hover:text-dark cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleFlavor(flv)}
                        className="rounded text-terracotta focus:ring-terracotta w-3.5 h-3.5 cursor-pointer"
                      />
                      <span>{flv}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-9">
            {/* Active Filter Badges */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs text-muted">Active filters:</span>
                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-200 text-dark text-xs font-medium">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory("All")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedDietary.map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sage/10 text-sage text-xs font-medium"
                  >
                    {d}
                    <button onClick={() => toggleDietary(d)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedFlavors.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-medium"
                  >
                    {f}
                    <button onClick={() => toggleFlavor(f)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-muted hover:text-dark underline font-semibold ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div
            className="fixed inset-0 bg-dark/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FAF7F2] p-5 shadow-2xl flex flex-col z-50 overflow-y-auto animate-in slide-in-from-right">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <span className="font-serif font-bold text-lg text-dark">
                Filter Snacks
              </span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 text-stone-400 hover:text-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-6 flex-1">
              <div>
                <span className="text-xs font-bold text-dark uppercase tracking-wider block mb-2">
                  Max Price: ₹{maxPrice}
                </span>
                <input
                  type="range"
                  min={180}
                  max={1600}
                  step={20}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-terracotta"
                />
              </div>

              <div>
                <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-2">
                  Dietary
                </h4>
                <div className="space-y-2">
                  {dietaryOptions.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 text-xs text-dark"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDietary.includes(opt)}
                        onChange={() => toggleDietary(opt)}
                        className="rounded text-terracotta"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-2">
                  Flavour
                </h4>
                <div className="space-y-2">
                  {flavorOptions.map((flv) => (
                    <label
                      key={flv}
                      className="flex items-center gap-2 text-xs text-dark"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFlavors.includes(flv)}
                        onChange={() => toggleFlavor(flv)}
                        className="rounded text-terracotta"
                      />
                      <span>{flv}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-terracotta text-white text-xs font-bold uppercase rounded-xl"
              >
                Show {filteredProducts.length} Snacks
              </button>
              <button
                onClick={clearAllFilters}
                className="w-full py-2 text-xs font-semibold text-stone-500 hover:text-dark text-center"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-muted">Loading crunchy snacks...</div>}>
      <ShopContent />
    </Suspense>
  );
}
