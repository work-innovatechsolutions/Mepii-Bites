"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Heart } from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  const shopLinks = [
    { label: "All Snacks", href: "/shop" },
    { label: "Bestsellers", href: "/bestsellers" },
    { label: "Roasted Makhana", href: "/category/roasted-makhana" },
    { label: "Trail Mixes", href: "/category/trail-mixes" },
    { label: "Nuts & Seeds", href: "/category/nuts-and-seeds" },
    { label: "Curated Combos", href: "/category/curated-combos" },
  ];

  const helpLinks = [
    { label: "Contact Us", href: "/contact" },
    { label: "WhatsApp: +91 870 899 2266", href: "https://wa.me/918708992266" },
    { label: "Shipping Policy", href: "/contact#shipping" },
    { label: "Returns & Exchanges", href: "/contact#returns" },
    { label: "FAQs", href: "/contact#faq" },
    { label: "Track Order", href: "/checkout" },
  ];

  const companyLinks = [
    { label: "Our Story", href: "/about" },
    { label: "Careers", href: "/about#careers" },
    { label: "Corporate & Bulk Orders", href: "/contact#bulk" },
    { label: "Press & Collaborations", href: "/about#press" },
  ];

  return (
    <footer className="bg-dark text-cream pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-4 group"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-cream/20 shadow-xs bg-white flex-shrink-0 group-hover:scale-105 transition-transform">
                <Image
                  src="/logo.jpg"
                  alt="Mepii Bites"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col leading-none text-left">
                <span className="font-serif tracking-tight text-xl font-black text-cream">
                  MEPII BITES
                </span>
                <span className="text-[9px] font-bold text-mango uppercase tracking-widest mt-0.5">
                  Healthy Snacks
                </span>
              </div>
            </Link>

            <p className="text-sm text-cream/70 max-w-sm mb-6 leading-relaxed">
              Snack Happy. Stay Mepii. Handcrafted in small batches across India with whole ingredients, ancient grains, and zero guilt.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/mepiibites/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-terracotta text-cream flex items-center justify-center transition-colors"
                aria-label="Instagram @mepiibites"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-terracotta text-cream flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-terracotta text-cream flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-mango mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-cream/70">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-cream hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Help */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-mango mb-4">
              Help
            </h4>
            <ul className="space-y-2.5 text-xs text-cream/70">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-cream hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-mango mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-cream/70">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-cream hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment icons */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50">
          <p>© 2026 Mepii Bites. All rights reserved.</p>

          <div className="flex items-center gap-3 text-[11px] font-medium text-cream/60">
            <span className="px-2 py-0.5 bg-stone-800 rounded">UPI</span>
            <span className="px-2 py-0.5 bg-stone-800 rounded">GPay</span>
            <span className="px-2 py-0.5 bg-stone-800 rounded">PhonePe</span>
            <span className="px-2 py-0.5 bg-stone-800 rounded">Cards</span>
            <span className="px-2 py-0.5 bg-stone-800 rounded">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
