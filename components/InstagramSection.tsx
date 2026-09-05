"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function InstagramSection() {
  const feedImages = [
    {
      src: "/products/gallery/quinoa-finger-peri-peri.jpeg",
      caption: "Desk drawer upgrade complete with Quinoa Finger Peri Peri.",
      likes: "1,240",
    },
    {
      src: "/products/gallery/banana-chips-pudina.jpeg",
      caption: "Authentic Kerala Banana Chips with sun-dried Pudhina crunch.",
      likes: "1,982",
    },
    {
      src: "/products/gallery/beetroot-chips.jpeg",
      caption: "Ruby-red vacuum cooked Beetroot Chips: 100% natural color & crunch.",
      likes: "1,410",
    },
    {
      src: "/products/gallery/quinoa-straws-chocolate.jpeg",
      caption: "Chocolate Quinoa Straws: 100% guilt-free dark cocoa decadence.",
      likes: "2,150",
    },
    {
      src: "/products/gallery/corn-waffers-cream-onion.png",
      caption: "Lattice Corn Waffers with velvety cream & garden spring onion.",
      likes: "1,870",
    },
    {
      src: "/products/gallery/jowar-puff-bbq.jpeg",
      caption: "Featherlight Jowar Puffs tossed in smoky BBQ paprika spices.",
      likes: "1,620",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <a
            href="https://www.instagram.com/mepiibites/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-xs font-bold uppercase tracking-wider mb-3 hover:bg-terracotta hover:text-white transition-all duration-200 shadow-xs group"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>@mepiibites</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <h2 className="editorial-headline text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight">
            SEEN ON YOUR FEED. <br className="hidden sm:inline" />
            SOON IN YOUR SNACK DRAWER.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted">
            Tag us in your 5 PM desk stash or movie spread for a chance to be featured.
          </p>
        </div>

        {/* 6-Photo Grid linking directly to official Instagram */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          {feedImages.map((item, idx) => (
            <a
              key={idx}
              href="https://www.instagram.com/mepiibites/"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-xs block"
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-dark/70 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 text-white">
                <div className="flex justify-end">
                  <ArrowUpRight className="w-4 h-4 text-cream" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-mango mb-1">
                    <InstagramIcon className="w-3 h-3" />
                    <span>@mepiibites</span>
                  </div>
                  <span className="text-[10px] text-cream/80 block">
                    ❤️ {item.likes} likes
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Call to action button */}
        <div className="text-center">
          <a
            href="https://www.instagram.com/mepiibites/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-300 hover:border-terracotta text-dark hover:text-terracotta text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs hover:-translate-y-0.5 bg-white"
          >
            <InstagramIcon className="w-4 h-4 text-terracotta" />
            <span>Follow @mepiibites on Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
