import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles, ShieldCheck, Heart, Leaf } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-terracotta bg-terracotta/10 px-3 py-1 rounded-full">
            Our Origin Story
          </span>
          <h1 className="editorial-headline text-4xl sm:text-6xl font-black text-dark tracking-tight mt-4 mb-6 leading-tight">
            SNACKS SHOULD BE WILDLY DELICIOUS. AND CLEAN.
          </h1>
          <p className="text-base sm:text-lg text-dark/80 leading-relaxed font-medium">
            We started Mepii Bites because we were tired of choosing between bland health food and greasy, chemical-dusted potato chips.
          </p>
        </div>

        {/* Hero Photo Section */}
        <div className="relative aspect-16/9 sm:aspect-21/9 rounded-3xl overflow-hidden shadow-2xl mb-16 sm:mb-24 border border-stone-200">
          <Image
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1400&auto=format&fit=crop"
            alt="Mepii Bites artisan snack jars and whole spices"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-white max-w-lg">
            <span className="text-mango font-bold text-xs uppercase tracking-wider block mb-1">
              Handcrafted in India
            </span>
            <h2 className="editorial-headline text-2xl sm:text-3xl font-black">
              Roasted with pride. Flavoured with heritage.
            </h2>
          </div>
        </div>

        {/* Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 sm:mb-28">
          <div className="p-8 bg-white rounded-3xl border border-stone-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-terracotta/10 text-terracotta flex items-center justify-center mb-6">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-dark mb-3">
              Slow Roasted, Never Fried
            </h3>
            <p className="text-xs sm:text-sm text-dark/75 leading-relaxed">
              Industrial fryers ruin nutrients and soak snacks in oxidized palm oil. We gently roast our foxnuts and nuts in small rotating drums with cold-pressed olive oils.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-stone-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-sage/10 text-sage flex items-center justify-center mb-6">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-dark mb-3">
              Direct Farmer Sourcing
            </h3>
            <p className="text-xs sm:text-sm text-dark/75 leading-relaxed">
              From the pristine lotus ponds of Darbhanga to cashew orchards in Mangalore, we work directly with native grower cooperatives ensuring peak harvest freshness.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-stone-200/80 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-mango/10 text-mango flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-dark mb-3">
              Uncompromising Flavour
            </h3>
            <p className="text-xs sm:text-sm text-dark/75 leading-relaxed">
              Authentic Indian palate meets contemporary snacking. African bird&apos;s eye chilli, oak-wood smoked paprika, Himalayan mineral salt, and single-origin dark cocoa.
            </p>
          </div>
        </div>

        {/* Brand Emblem & Purity Guarantee */}
        <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-12 mb-20 shadow-xs flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-sage/20 shadow-lg shrink-0 bg-white">
            <Image
              src="/logo.jpg"
              alt="Mepii Bites Healthy Snacks Official Seal"
              fill
              sizes="(max-width: 640px) 144px, 176px"
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-sage bg-sage/10 px-3 py-1 rounded-full inline-block mb-3">
              Official Quality Seal
            </span>
            <h3 className="editorial-headline text-2xl sm:text-3xl font-black text-dark mb-3">
              SNACK HAPPY. STAY MEPII.
            </h3>
            <p className="text-xs sm:text-sm text-dark/75 leading-relaxed max-w-2xl">
              Every pouch and jar carrying the Mepii Bites emblem is certified 100% vegetarian, free of artificial preservatives, and crafted without oxidized palm oils. When you snack with Mepii, you are choosing nourishment without sacrificing crunch.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center bg-dark text-cream p-10 sm:p-16 rounded-3xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto">
            <h3 className="editorial-headline text-3xl sm:text-4xl font-black text-cream mb-4">
              READY TO UPGRADE YOUR SNACK DRAWER?
            </h3>
            <p className="text-xs sm:text-sm text-cream/80 mb-8 leading-relaxed">
              Discover our best-selling roasted makhana, spiced whole nuts, and party binge boxes delivered directly to your doorstep.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
