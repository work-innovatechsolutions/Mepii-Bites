import React from "react";

/**
 * Clean semantic markup for screen readers and SEO crawlers.
 * Avoids duplicate navigation destinations while establishing clear page hierarchy.
 */
export default function ScreenReaderHeroCopy() {
  return (
    <div className="sr-only">
      <h1>MEPII BITES — Healthy Snacks</h1>
      <p>
        Discover MEPII BITES wholesome snack varieties, including roasted and
        baked snacks for everyday snacking.
      </p>
    </div>
  );
}
