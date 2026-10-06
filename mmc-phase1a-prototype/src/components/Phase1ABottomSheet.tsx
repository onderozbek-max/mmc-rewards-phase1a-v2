import * as React from "react";
import { Body, BottomSheet, Button } from "@walmart/ld-kit";
import { PointsCelebrationMark } from "./PointsCelebrationMark";
import {
  bottomSheetCtaLabel,
  bottomSheetHeadline,
  commonUnlock,
  lifetimeTotalLine,
  progressCopyByArm,
} from "../lib/phase1aContent";
import type { SimulationResult } from "../lib/phase1aEngine";
import type { SheetVisibility } from "../lib/useScenario";

/**
 * ONE component renders Arm 2, Arm 3, AND the common 250-point unlock. This
 * is the structural guarantee behind Section 11's experiment-integrity
 * constraint: Arm 2 and Arm 3 cannot drift apart in height, spacing, icon,
 * animation, or CTA placement, because they are the exact same render path
 * with only the `variant` prop changing which copy strings get interpolated.
 * The common-unlock variant intentionally renders a larger mark (Section 7:
 * "clearly more celebratory") — the one deliberate visual difference, and it
 * sits outside the Arm 2 / Arm 3 comparison entirely.
 */
export function Phase1ABottomSheet({
  variant,
  result,
  isOpen,
  onDismiss,
}: {
  /** The LAST non-"none" variant — kept stable while the sheet plays its
   *  closing transition, so the exit animation doesn't render blank content. */
  variant: Exclude<SheetVisibility, "none">;
  result: SimulationResult | null;
  isOpen: boolean;
  onDismiss: (reason: "cta" | "close") => void;
}) {
  if (!result) return null;

  const isCommonUnlock = variant === "commonUnlock";
  const headline = isCommonUnlock ? commonUnlock.headline : bottomSheetHeadline(result.pointsEarned);
  const supportingLine = isCommonUnlock
    ? commonUnlock.supportingLine(result.updatedLifetimePoints)
    : lifetimeTotalLine(result.updatedLifetimePoints);
  const ctaLabel = isCommonUnlock ? commonUnlock.ctaLabel : bottomSheetCtaLabel;
  const progressLines =
    !isCommonUnlock && result.pointsRemaining !== null
      ? progressCopyByArm[variant === "arm3" ? "arm3" : "arm2"](result.pointsRemaining)
      : null;

  return (
    <BottomSheet
      isOpen={isOpen}
      title={headline}
      onClose={() => onDismiss("close")}
      actions={
        <Button
          variant="primary"
          isFullWidth
          onClick={() => onDismiss("cta")}
        >
          {ctaLabel}
        </Button>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16, paddingTop: 8 }}>
        <PointsCelebrationMark size={isCommonUnlock ? "large" : "default"} />
        <Body as="p" UNSAFE_style={{ margin: 0 }}>
          {supportingLine}
        </Body>
        {/* Fixed-height region so Arm 2 / Arm 3 progress copy occupies identical
            visual space (Section 6: "same fixed text region in both treatments"). */}
        <div style={{ minHeight: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {progressLines && (
            <Body as="p" weight="alt" UNSAFE_style={{ margin: 0 }}>
              {progressLines[0]}
              <br />
              {progressLines[1]}
            </Body>
          )}
        </div>
      </div>
    </BottomSheet>
  );
}
