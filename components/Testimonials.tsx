"use client";

import React from "react";
import { Star, CheckCircle2, Quote, MessageSquareHeart } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-white border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage/10 text-sage text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>Community Love</span>
          </div>
          <h2 className="editorial-headline text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight">
            SNACK TALK
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted">
            Read unfiltered reactions from our first 10,000+ snack stash builders.
          </p>
        </div>

        {/* Testimonials Grid / Mobile Scroll */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-4 sm:pb-0 no-scrollbar snap-x">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-none w-[300px] sm:w-auto snap-center flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#FAF7F2] border border-stone-200/80 shadow-xs hover:shadow-md transition-all relative"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-300" />
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-dark/85 leading-relaxed italic mb-6">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
              </div>

              {/* Author & Product Info */}
              <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs sm:text-sm text-dark">
                      {testimonial.name}
                    </span>
                    {testimonial.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-sage fill-sage/20" />
                    )}
                  </div>
                  <span className="text-[11px] text-muted block">
                    {testimonial.city}
                  </span>
                </div>

                <span className="text-[10px] font-semibold text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-md max-w-[120px] truncate text-right">
                  {testimonial.productPurchased}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
