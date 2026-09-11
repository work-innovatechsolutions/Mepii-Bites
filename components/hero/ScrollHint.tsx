"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface ScrollHintProps {
  isVisible: boolean;
}

/**
 * Minimal "Scroll to explore" indicator positioned at bottom-center.
 * Fades out smoothly as soon as the user commences scrolling (progress > 0.03).
 */
export default function ScrollHint({ isVisible }: ScrollHintProps) {
  return (
    <div
      className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none transition-all duration-500 ease-out select-none ${
        isVisible
          ? "opacity-90 translate-y-0"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
      aria-hidden="true"
    >
      <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-dark/70 bg-white/75 backdrop-blur-md px-3.5 py-1 rounded-full border border-stone-200/80 shadow-xs">
        Scroll to explore
      </span>
      <div className="w-6 h-6 rounded-full bg-white/60 backdrop-blur-sm border border-stone-200/60 flex items-center justify-center animate-bounce shadow-2xs">
        <ChevronDown className="w-3.5 h-3.5 text-dark/65" />
      </div>
    </div>
  );
}
