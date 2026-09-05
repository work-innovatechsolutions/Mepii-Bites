"use client";

import React from "react";
import { Flame, Sparkles, Utensils, HeartHandshake } from "lucide-react";

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: Flame,
      title: "Roasted, Not Fried",
      description:
        "Big flavour without the greasy aftermath. We roast slowly in cold-pressed olive oils, keeping trans-fats at zero.",
      color: "bg-terracotta/10 text-terracotta",
      border: "hover:border-terracotta/50",
    },
    {
      icon: Sparkles,
      title: "Real Ingredients",
      description:
        "Nothing unnecessary hiding in the fine print. No maltodextrin fillers, artificial food dyes, or palm oil.",
      color: "bg-sage/10 text-sage",
      border: "hover:border-sage/50",
    },
    {
      icon: Utensils,
      title: "Bold Flavours",
      description:
        "Indian-inspired flavours with a modern twist. From tandoori wood-smoke to Himalayan pink mineral salt.",
      color: "bg-mango/10 text-mango",
      border: "hover:border-mango/50",
    },
    {
      icon: HeartHandshake,
      title: "Made for Real Life",
      description:
        "Work. Travel. Netflix. Repeat. Portable packs that stay fresh and elevate your 5 PM desk cravings.",
      color: "bg-cocoa/10 text-cocoa",
      border: "hover:border-cocoa/50",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-terracotta text-xs font-bold uppercase tracking-wider block mb-2">
            Why We Are Different
          </span>
          <h2 className="editorial-headline text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight">
            SNACKING WITHOUT THE SIDE-EYE.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted">
            Snacks made with clean labels, uncompromised crunch, and ingredients you actually recognize.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`p-6 sm:p-7 rounded-3xl bg-[#FAF7F2] border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300 group ${pillar.border}`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${pillar.color} transition-transform group-hover:scale-110`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-dark mb-2 group-hover:text-terracotta transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-dark/70 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
