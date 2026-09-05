"use client";

import React from "react";
import { Leaf, Flame, ShieldCheck, Heart, PackageCheck } from "lucide-react";

export default function TrustStrip() {
  const trustMarkers = [
    {
      icon: Leaf,
      title: "100% Vegetarian",
      subtitle: "Pure plant goodness",
      color: "text-sage",
    },
    {
      icon: Flame,
      title: "Roasted, Not Fried",
      subtitle: "Zero trans fats & zero guilt",
      color: "text-terracotta",
    },
    {
      icon: ShieldCheck,
      title: "No Nasties",
      subtitle: "No artificial colors or preservatives",
      color: "text-dark",
    },
    {
      icon: Heart,
      title: "Made in India",
      subtitle: "Sourced from native soil",
      color: "text-terracotta",
    },
    {
      icon: PackageCheck,
      title: "Freshly Packed",
      subtitle: "Small-batch vacuum sealed",
      color: "text-sage",
    },
  ];

  return (
    <section aria-label="Brand Guarantees" className="border-y border-stone-200/80 bg-white/70 py-6 sm:py-8 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-center">
          {trustMarkers.map((marker, idx) => {
            const Icon = marker.icon;
            return (
              <div
                key={marker.title}
                className={`flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 transition-colors ${
                  idx === 4 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center shrink-0 border border-stone-200/60 shadow-2xs">
                  <Icon className={`w-5 h-5 ${marker.color}`} />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-dark leading-tight">
                    {marker.title}
                  </h3>
                  <p className="text-[11px] text-muted leading-tight mt-0.5">
                    {marker.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
