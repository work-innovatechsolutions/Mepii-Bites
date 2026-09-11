"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroPoster from "./HeroPoster";
import HeroCanvas from "./HeroCanvas";
import ScrollHint from "./ScrollHint";
import HeroTransitionBridge from "./HeroTransitionBridge";
import ScreenReaderHeroCopy from "./ScreenReaderHeroCopy";
import { mapProgressToFrame } from "@/lib/heroFrames";

/**
 * Master ScrollHero Component for MEPII BITES
 *
 * Cinematic Apple-product-style scroll hero:
 * - Desktop: 450vh, Tablet: 380vh, Mobile: 320vh
 * - Sticky 100svh viewport
 * - Hero-relative scroll calculation: (-heroRect.top) / (heroHeight - viewportHeight)
 * - Zero React state updates during scroll ticks (all values in refs)
 * - Frame 300 reached and frozen at 92% progress
 * - Outro exit transition (92% - 100%)
 * - Full prefers-reduced-motion accessibility fallback
 */
export default function ScrollHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const scrollProgressRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(1);

  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Called when canvas successfully paints frame 1
  const handleFirstFramePainted = useCallback(() => {
    setIsCanvasReady(true);
  }, []);

  // Hero-relative scroll handler (passive)
  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!heroRef.current) {
            ticking = false;
            return;
          }

          const heroRect = heroRef.current.getBoundingClientRect();
          const heroHeight = heroRef.current.offsetHeight;
          const viewportHeight = window.innerHeight;
          const scrollDistance = heroHeight - viewportHeight;

          let progress = 0;
          if (scrollDistance > 0) {
            const raw = -heroRect.top / scrollDistance;
            progress = Math.min(1, Math.max(0, raw));
          }

          scrollProgressRef.current = progress;
          targetFrameRef.current = mapProgressToFrame(progress);

          // Update thin desktop progress bar directly via DOM to avoid React rerenders
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${progress})`;
          }

          // Infrequent UI state updates (ScrollHint fade)
          if (progress > 0.03) {
            setShowScrollHint(false);
          } else if (progress <= 0.01) {
            setShowScrollHint(true);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on mount to set initial position
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [prefersReducedMotion]);

  // Reduced motion accessible fallback
  if (prefersReducedMotion) {
    return (
      <section className="relative overflow-hidden bg-[#FAF7F2] py-16 lg:py-24 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage/15 border border-sage/30 text-sage text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5 text-sage" />
              <span>Snack Happy • Stay MEPII</span>
            </div>
            <h1 className="editorial-headline text-4xl sm:text-6xl font-black text-dark tracking-tight leading-[1.05] mb-5">
              BIG FLAVOUR. <br />
              <span className="text-terracotta italic font-normal">ZERO</span> COMPROMISE.
            </h1>
            <p className="text-base sm:text-lg text-dark/75 max-w-xl leading-relaxed mb-8">
              Pure Ingredients. Real Taste. Wholesome slow-roasted makhana, supergrain quinoa fingers, and crunchy festive jars made with zero guilt.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-terracotta hover:bg-terracotta-hover text-white text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-98"
              >
                <span>Shop All Snacks</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/category/curated-combos"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white hover:bg-stone-100 text-dark border border-stone-300 text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs"
              >
                <span>Festive Combos</span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 relative aspect-16/9 rounded-3xl overflow-hidden border border-stone-200/90 shadow-2xl bg-stone-100">
            <Image
              src="/hero-frames/frame_0050.webp"
              alt="MEPII BITES Full Snacks Pyramid"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </div>
        </div>
        <ScreenReaderHeroCopy />
      </section>
    );
  }

  return (
    <section
      id="hero-scroll-track"
      ref={heroRef}
      className="relative w-full h-[320vh] md:h-[380vh] lg:h-[450vh] bg-[#FAF7F2]"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 w-full h-[100svh] overflow-hidden">
        {/* Real Image LCP Poster (Crossfades out only after canvas frame 1 paints) */}
        <HeroPoster isCanvasReady={isCanvasReady} />

        {/* High-Performance Canvas */}
        <HeroCanvas
          targetFrameRef={targetFrameRef}
          scrollProgressRef={scrollProgressRef}
          onFirstFramePainted={handleFirstFramePainted}
        />

        {/* Minimal "Scroll to explore" hint */}
        <ScrollHint isVisible={showScrollHint} />

        {/* Outro Transition Bridge (appears at 92% - 100%) */}
        <HeroTransitionBridge scrollProgressRef={scrollProgressRef} />

        {/* Subtle Desktop-Only Progress Line */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute bottom-0 left-0 right-0 h-[2px] bg-stone-300/30 z-20 pointer-events-none"
        >
          <div
            ref={progressBarRef}
            className="h-full w-full bg-terracotta/70 origin-left will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      {/* Semantic Screen Reader / SEO Copy */}
      <ScreenReaderHeroCopy />
    </section>
  );
}
