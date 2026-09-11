"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface HeroPosterProps {
  isCanvasReady: boolean;
}

/**
 * Real Image LCP element rendering frame_0001.webp with priority and fetchPriority="high".
 * Prevents blank hero states during initial SSR/hydration, and gracefully crossfades out
 * only after the canvas has decoded and rendered frame 1.
 */
export default function HeroPoster({ isCanvasReady }: HeroPosterProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [shouldUnmount, setShouldUnmount] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Remove element from DOM after fade transition completes to free memory
  useEffect(() => {
    if (isCanvasReady) {
      const timer = setTimeout(() => {
        setShouldUnmount(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isCanvasReady]);

  if (shouldUnmount) return null;

  return (
    <div
      className={`absolute inset-0 z-10 w-full h-full pointer-events-none transition-opacity duration-500 ease-out ${
        isCanvasReady ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <Image
        src="/hero-frames/frame_0001.webp"
        alt="MEPII BITES Healthy Snacks"
        fill
        priority
        fetchPriority="high"
        unoptimized
        className="object-cover"
        sizes="100vw"
        style={{
          objectPosition: isMobile ? "51% 54%" : "50% 50%",
        }}
      />
    </div>
  );
}
