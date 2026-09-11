"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getExitAnimationStyles } from "@/lib/heroFrames";

interface HeroTransitionBridgeProps {
  scrollProgressRef: React.MutableRefObject<number>;
}

/**
 * Cinematic outro transition bridge during the 92% - 100% scroll progress window.
 * As frame 300 freezes, this card smoothly ascends (translateY 60px -> 0) and fades in,
 * introducing the brand ethos and seamlessly connecting to the product sections below.
 */
export default function HeroTransitionBridge({
  scrollProgressRef,
}: HeroTransitionBridgeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId: number;

    const updateBridge = () => {
      if (containerRef.current) {
        const progress = scrollProgressRef.current;
        if (progress >= 0.90) {
          const styles = getExitAnimationStyles(progress);
          containerRef.current.style.opacity = String(styles.nextSectionOpacity);
          containerRef.current.style.transform = `translateY(${styles.nextSectionY}px)`;
          containerRef.current.style.pointerEvents =
            styles.nextSectionOpacity > 0.4 ? "auto" : "none";
        } else {
          containerRef.current.style.opacity = "0";
          containerRef.current.style.transform = "translateY(60px)";
          containerRef.current.style.pointerEvents = "none";
        }
      }
      rafId = requestAnimationFrame(updateBridge);
    };

    rafId = requestAnimationFrame(updateBridge);
    return () => cancelAnimationFrame(rafId);
  }, [scrollProgressRef]);

  return (
    <div
      ref={containerRef}
      className="absolute bottom-10 sm:bottom-14 left-0 right-0 z-30 flex justify-center px-4 will-change-transform pointer-events-none transition-all duration-75 ease-linear"
      style={{ opacity: 0, transform: "translateY(60px)" }}
    >
      <div className="max-w-xl w-full bg-white/95 backdrop-blur-xl border border-stone-200/90 shadow-2xl rounded-3xl p-6 sm:p-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage/15 border border-sage/30 text-sage text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-sage" />
          <span>Snack Happy • Stay MEPII</span>
        </div>

        <h2 className="editorial-headline text-2xl sm:text-3xl font-black text-dark tracking-tight leading-tight mb-2">
          BIG FLAVOUR. ZERO COMPROMISE.
        </h2>

        <p className="text-xs sm:text-sm text-dark/75 max-w-md mx-auto leading-relaxed mb-5">
          Wholesome slow-roasted makhana, quinoa finger crisps, and festive crunchy jars crafted with 100% real ingredients.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-98"
          >
            <span>Explore All Jars</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/category/curated-combos"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-stone-100 hover:bg-stone-200 text-dark text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-2xs"
          >
            <span>Festive Combos</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
