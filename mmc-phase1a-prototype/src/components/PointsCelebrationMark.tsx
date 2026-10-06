import * as React from "react";
import { Icon } from "@walmart/ld-kit";

/**
 * Shared decorative mark for the Phase 1A bottom sheets. Per Section 11,
 * Arm 2 and Arm 3 must use the identical icon, color, and size — only
 * `size="large"` (common 250-point unlock) is allowed to look more
 * celebratory, and that state is outside the experiment entirely.
 *
 * No illustration in the kit's `spot`/`mono` catalogs matches "points
 * celebration" (checked via `node scripts/ld/cli.mjs illustrations`), so
 * this composes the existing `Icon` primitive inside a simple circular
 * surface rather than inventing a one-off SVG asset.
 */
export function PointsCelebrationMark({ size = "default" }: { size?: "default" | "large" }) {
  const diameter = size === "large" ? 96 : 64;
  const iconSize = size === "large" ? "large" : "medium";
  return (
    <div
      aria-hidden="true"
      style={{
        width: diameter,
        height: diameter,
        borderRadius: "var(--ld-semantic-border-radius-round, 999px)",
        background: "var(--ld-semantic-color-fill-brand-subtle, #e9f1fe)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "none",
      }}
    >
      <Icon name="CelebrateFill" decorative style={{ color: "var(--ld-semantic-color-text-brand, #0053e2)", fontSize: size === "large" ? 40 : 28 }} size={iconSize} />
    </div>
  );
}
