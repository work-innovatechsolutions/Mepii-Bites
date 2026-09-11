/**
 * MEPII BITES Scroll Hero Frame Utilities
 * 1-based indexing everywhere: frame_0001.webp through frame_0300.webp
 */

export const HERO_FRAME_COUNT = 50;

/**
 * Returns the path to the specified 1-based frame index.
 */
export function getHeroFramePath(frame: number): string {
  const safeFrame = Math.min(
    HERO_FRAME_COUNT,
    Math.max(1, Math.round(frame))
  );
  return `/hero-frames/frame_${String(safeFrame).padStart(4, "0")}.webp`;
}

/**
 * Clamp a number between min and max.
 */
export const clamp = (val: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, val));

/**
 * Smooth Hermite / ease-in-out curve for cinematic slow entrance.
 */
export const easeInOut = (t: number): number =>
  t < 0.5
    ? 2 * t * t
    : 1 - Math.pow(-2 * t + 2, 2) / 2;

/**
 * Non-linear scroll progress (0 to 1) mapped to 1-based frame numbers (1 to 300).
 * - 0% - 20%: Slow cinematic entrance (counter, fresh ingredients, branding).
 * - 20% - 70%: Steady responsive progression as jars stack into place.
 * - 70% - 92%: Slower progression to admire final tier assembly.
 */
export function mapProgressToFrame(progress: number): number {
  const p = clamp(progress, 0, 1);
  const span = HERO_FRAME_COUNT - 1;

  if (p >= 0.92) {
    // Freeze firmly on final frame from 92% to 100%
    return HERO_FRAME_COUNT;
  }

  // Evenly distribute all 50 frames from 0% to 92% scroll progress
  const normalized = p / 0.92;
  const calculated = 1 + normalized * span;
  return clamp(calculated, 1, HERO_FRAME_COUNT);
}

/**
 * Ensures every single frame (1 to 50) is reached with integer rounding.
 */
export function getSampledFrame(frame: number, step: number = 1): number {
  return clamp(Math.round(frame), 1, HERO_FRAME_COUNT);
}

/**
 * Normalized exit progress [0, 1] during the 92% - 100% scroll range.
 */
export function getExitProgress(progress: number): number {
  return clamp((progress - 0.92) / 0.08, 0, 1);
}

/**
 * Smoothstep calculation for outro transitions.
 */
export function getExitAnimationStyles(progress: number) {
  const exit = getExitProgress(progress);
  // Smoothstep ease
  const eased = exit * exit * (3 - 2 * exit);

  return {
    exitProgress: exit,
    eased,
    canvasOpacity: Math.max(0, 1 - eased),
    canvasScale: 1 - eased * 0.02,
    nextSectionOpacity: eased,
    nextSectionY: 60 * (1 - eased),
  };
}

/**
 * Intelligently draws an image onto a canvas covering the entire viewport
 * while preserving aspect ratio and honoring a configurable focal point.
 *
 * @param ctx CanvasRenderingContext2D
 * @param image HTMLImageElement | ImageBitmap
 * @param canvasWidth Logical CSS width of canvas
 * @param canvasHeight Logical CSS height of canvas
 * @param focalX Normalized focal center X (default 0.5)
 * @param focalY Normalized focal center Y (default 0.5)
 */
export function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  image: CanvasImageSource,
  canvasWidth: number,
  canvasHeight: number,
  focalX: number = 0.5,
  focalY: number = 0.5
) {
  if (!image || canvasWidth <= 0 || canvasHeight <= 0) return;

  const imgWidth = (image as any).width || 1920;
  const imgHeight = (image as any).height || 1080;
  const imgAspect = imgWidth / imgHeight;
  const canvasAspect = canvasWidth / canvasHeight;

  let renderWidth: number;
  let renderHeight: number;
  let offsetX: number;
  let offsetY: number;

  if (canvasAspect > imgAspect) {
    // Viewport is wider than 16:9 (e.g. wide monitors)
    renderWidth = Math.round(canvasWidth);
    renderHeight = Math.round(canvasWidth / imgAspect);
    offsetX = 0;
    offsetY = Math.round((canvasHeight - renderHeight) * focalY);
  } else {
    // Viewport is taller than 16:9 (e.g. mobile/tablet portrait)
    renderHeight = Math.round(canvasHeight);
    renderWidth = Math.round(canvasHeight * imgAspect);
    offsetX = Math.round((canvasWidth - renderWidth) * focalX);
    offsetY = 0;
  }

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image, offsetX, offsetY, renderWidth, renderHeight);
}
