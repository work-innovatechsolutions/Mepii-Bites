"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function BrandStory() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Brand Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 sm:aspect-5/4 rounded-3xl overflow-hidden shadow-2xl bg-stone-100 border border-stone-200">
              <Image
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop"
                alt="Mepii Bites snack pantry ingredients and jars"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent" />

              {/* Editorial Quote Card Inset */}
              <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200/80 shadow-lg">
                <p className="font-serif text-sm sm:text-base font-bold text-dark italic">
                  &ldquo;We refused to believe snacks had to be either healthy or wildly delicious. Snack Happy, Stay Mepii!&rdquo;
                </p>
                <span className="text-[11px] font-bold text-terracotta uppercase tracking-wider mt-1 block">
                  — The Mepii Bites Manifesto
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Philosophy</span>
            </div>

            <h2 className="editorial-headline text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight mb-6">
              SNACK HAPPY. STAY MEPII.
            </h2>

            <p className="text-base sm:text-lg text-dark/80 leading-relaxed mb-6 font-medium">
              We started Mepii Bites with one simple idea — everyday snacks deserve whole ingredients, ancient grains, and transparent packaging you can trust.
            </p>

            <p className="text-sm sm:text-base text-muted leading-relaxed mb-8">
              From our flagship Pudhina roasted makhana to crunchy quinoa fingers and ragi chips, every jar is crafted to be light on the gut, source of fiber, and easy on calories. No hidden palm oil, no heavy fryers — just pure, joyful crunch.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-dark hover:bg-dark-light text-cream text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 group"
              >
                <span>Read Our Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
