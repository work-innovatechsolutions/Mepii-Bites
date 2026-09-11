"use client";

import React, { useEffect, useRef } from "react";
import {
  HERO_FRAME_COUNT,
  drawCoverImage,
  getSampledFrame,
  getExitAnimationStyles,
} from "@/lib/heroFrames";
import { BoundedFrameLoader } from "@/lib/preloadFrames";

interface HeroCanvasProps {
  targetFrameRef: React.MutableRefObject<number>;
  scrollProgressRef: React.MutableRefObject<number>;
  onFirstFramePainted: () => void;
}

/**
 * Sticky HTML5 Canvas rendering 300 sequential frames with:
 * - Frame-rate independent deltaTime smoothing: 1 - Math.exp(-12 * deltaTime)
 * - Bounded RAM cache with ImageBitmap.close() eviction
 * - Nearest-neighbor frame fallback for fast scroll safety
 * - DPR capped at 1.5 - 2
 * - Intelligent responsive focal point
 * - Outro smoothstep scale/opacity transition (92% - 100%)
 */
export default function HeroCanvas({
  targetFrameRef,
  scrollProgressRef,
  onFirstFramePainted,
}: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loaderRef = useRef<BoundedFrameLoader | null>(null);

  const currentFrameRef = useRef<number>(1);
  const lastDrawnFrameRef = useRef<number>(-1);
  const lastTimeRef = useRef<number>(0);
  const hasReportedFirstPaintRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(true);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Initialize bounded frame loader
    const loader = new BoundedFrameLoader();
    loaderRef.current = loader;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      width = Math.round(rect.width);
      height = Math.round(rect.height);
      if (width <= 0 || height <= 0) return;

      // High-definition DPR up to 2.5 for crisp Retina/4K displays
      dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2.5));

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      loader.updateTier();

      // Force immediate redraw on resize
      lastDrawnFrameRef.current = -1;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Initial preload: priority window around frame 1
    loader.updatePriorities(1);

    // Initial render attempt of frame 1
    loader.loadFrame(1).then((initialFrame) => {
      if (initialFrame && canvasRef.current && !hasReportedFirstPaintRef.current) {
        const isMobile = width < 768;
        const focalX = isMobile ? 0.51 : 0.5;
        const focalY = isMobile ? 0.54 : 0.5;

        // Direct 1:1 hardware pixel drawing - zero subpixel blurring
        drawCoverImage(ctx, initialFrame, canvas.width, canvas.height, focalX, focalY);

        hasReportedFirstPaintRef.current = true;
        requestAnimationFrame(() => {
          onFirstFramePainted();
        });
      }
    });

    // Pause RAF loop when off-screen to save 100% CPU/GPU
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisibleRef.current = entry?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    lastTimeRef.current = performance.now();

    // Main render loop
    const renderLoop = (time: number) => {
      rafIdRef.current = requestAnimationFrame(renderLoop);

      if (!isVisibleRef.current || width <= 0 || height <= 0) {
        lastTimeRef.current = time;
        return;
      }

      const deltaTime = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      // Frame-rate independent smoothing
      const smoothing = 1 - Math.exp(-12 * deltaTime);
      const target = targetFrameRef.current;
      currentFrameRef.current += (target - currentFrameRef.current) * smoothing;

      // Quantize based on device sampling
      const step = loader.getStep();
      const frameToDraw = getSampledFrame(currentFrameRef.current, step);

      // Periodically update loader lookahead priority window
      loader.updatePriorities(currentFrameRef.current);

      // Outro styles (92% - 100%)
      const progress = scrollProgressRef.current;
      if (progress >= 0.9) {
        const exitStyles = getExitAnimationStyles(progress);
        container.style.opacity = String(exitStyles.canvasOpacity);
        container.style.transform = `scale(${exitStyles.canvasScale})`;
      } else {
        container.style.opacity = "1";
        container.style.transform = "";
      }

      // Check if redraw is needed
      const frameDelta = Math.abs(frameToDraw - lastDrawnFrameRef.current);
      if (frameDelta >= 0.05 || lastDrawnFrameRef.current === -1) {
        // Retrieve frame from cache or fall back to nearest decoded frame
        const frameImage =
          loader.getFrame(frameToDraw) || loader.getNearestFrame(frameToDraw);

        if (frameImage) {
          const isMobile = width < 768;
          const focalX = isMobile ? 0.51 : 0.5;
          const focalY = isMobile ? 0.54 : 0.5;

          // Direct 1:1 hardware pixel drawing - zero subpixel blurring
          drawCoverImage(ctx, frameImage, canvas.width, canvas.height, focalX, focalY);

          lastDrawnFrameRef.current = frameToDraw;

          // Handoff signal if not yet triggered
          if (!hasReportedFirstPaintRef.current) {
            hasReportedFirstPaintRef.current = true;
            requestAnimationFrame(() => {
              onFirstFramePainted();
            });
          }
        }
      }
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
      loader.destroy();
    };
  }, [targetFrameRef, scrollProgressRef, onFirstFramePainted]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      style={{
        transition: "opacity 0.15s ease-out",
      }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        role="img"
        aria-label="MEPII BITES Healthy Snacks interactive product presentation showing slow-roasted snack jars stacking on kitchen counter"
      />
    </div>
  );
}
