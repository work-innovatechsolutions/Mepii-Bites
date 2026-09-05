"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Increment progress smoothly from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate near the end
        const increment = prev > 70 ? 12 : prev > 40 ? 8 : 5;
        return Math.min(prev + increment, 100);
      });
    }, 55);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Allow user to appreciate the completed state briefly, then fade out
      const timer = setTimeout(() => {
        setIsFinished(true);
      }, 350);

      // Remove from DOM completely after fade-out transition finishes
      const unmountTimer = setTimeout(() => {
        setShouldRender(false);
      }, 950);

      return () => {
        clearTimeout(timer);
        clearTimeout(unmountTimer);
      };
    }
  }, [progress]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF7F2] transition-all duration-700 ease-out ${
        isFinished
          ? "opacity-0 pointer-events-none scale-105 blur-xs"
          : "opacity-100 scale-100"
      }`}
      aria-label="Loading Mepii Bites"
    >
      {/* Ambient background glow accents */}
      <div className="absolute w-[500px] h-[500px] bg-radial-gradient from-mango/15 via-terracotta/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Centerpiece Content Box */}
      <div className="flex flex-col items-center text-center px-6 max-w-md w-full">
        {/* Animated Logo Container with orbiting rings */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center mb-6">
          {/* Subtle outer pulsing ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-sage/40 animate-[spin_10s_linear_infinite]" />
          
          {/* Glowing pulse ring */}
          <div className="absolute -inset-2 rounded-full border border-terracotta/20 animate-ping opacity-25" />

          {/* Actual Circular Emblem Logo */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-3 border-white shadow-2xl bg-white transition-transform duration-500 hover:scale-105">
            <Image
              src="/logo.jpg"
              alt="Mepii Bites Logo"
              fill
              sizes="(max-width: 640px) 96px, 112px"
              className="object-cover"
              priority
            />
          </div>

          {/* Floating sparkle icon */}
          <div className="absolute -top-1 right-2 w-7 h-7 rounded-full bg-terracotta text-white flex items-center justify-center shadow-md animate-bounce duration-1000">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="font-serif tracking-tight text-2xl sm:text-3xl font-black text-dark mb-1">
          MEPII BITES
        </h1>

        {/* Hookline & Tagline */}
        <p className="font-serif italic text-base sm:text-lg text-terracotta font-medium tracking-wide mb-1">
          “Snack Happy. Stay Mepii.”
        </p>
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-sage mb-6">
          Better Snacks • Bigger Cravings
        </span>

        {/* Progress Bar */}
        <div className="w-44 sm:w-56 h-1.5 bg-stone-200/90 rounded-full overflow-hidden relative shadow-inner mb-3">
          <div
            className="h-full bg-gradient-to-r from-terracotta via-mango to-sage rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic Micro Status */}
        <p className="text-[11px] font-semibold text-stone-500 tracking-wider uppercase transition-opacity duration-300">
          {progress < 45
            ? "Harvesting ancient grains..."
            : progress < 85
            ? "Slow-roasting in cold-pressed oil..."
            : "Pure Ingredients • Real Taste ✨"}
        </p>
      </div>
    </div>
  );
}
