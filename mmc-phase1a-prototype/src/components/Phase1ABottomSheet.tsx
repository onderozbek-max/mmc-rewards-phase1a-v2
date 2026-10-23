import * as React from "react";
import { Body, BottomSheet, Button } from "@walmart/ld-kit";
import { PointsCelebrationMark } from "./PointsCelebrationMark";
import {
  bottomSheetCtaLabel,
  bottomSheetHeadline,
  commonUnlock,
  lifetimeTotalLine,
  lightweightProgressLine,
  progressCopyByArm,
  progressNoteByArm,
} from "../lib/phase1aContent";
import type { MilestoneId, SimulationResult } from "../lib/phase1aEngine";
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
  // Option B past 250: points earned + lifetime total + one "coming soon" line.
  // Deliberately reads NOTHING from result.pointsRemaining / nextMilestoneId.
  const isLightweight = variant === "lightweight";
  const headline = isCommonUnlock ? commonUnlock.headline : bottomSheetHeadline(result.pointsEarned);
  const supportingLine = isCommonUnlock
    ? commonUnlock.supportingLine(result.updatedLifetimePoints)
    : lifetimeTotalLine(result.updatedLifetimePoints);
  const ctaLabel = isCommonUnlock ? commonUnlock.ctaLabel : bottomSheetCtaLabel;
  const armKey = variant === "arm3" ? "arm3" : "arm2";
  const hasProgress = !isCommonUnlock && !isLightweight && result.pointsRemaining !== null && result.nextMilestoneId !== null;
  const progressLines = hasProgress
    ? armKey === "arm3"
      ? progressCopyByArm.arm3(result.pointsRemaining as number, result.nextMilestoneId as MilestoneId)
      : progressCopyByArm.arm2(result.pointsRemaining as number)
    : null;
  const progressNote = hasProgress ? progressNoteByArm(armKey, result.nextMilestoneId) : null;

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
            visual space (Section 6: "same fixed text region in both treatments").
            Sized for three lines: Arm 3 adds a "Coming soon" note at the IHUT /
            in-store tiers; Arm 2 leaves that line empty, same box either way. */}
        <div
          style={{
            minHeight: 72,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {progressLines && (
            <Body as="p" weight="alt" UNSAFE_style={{ margin: 0 }}>
              {progressLines[0]}
              <br />
              {progressLines[1]}
            </Body>
          )}
          {isLightweight && (
            <Body as="p" weight="alt" UNSAFE_style={{ margin: 0 }}>
              {lightweightProgressLine}
            </Body>
          )}
          {progressNote && (
            <Body as="p" size="small" color="subtle" UNSAFE_style={{ margin: 0 }}>
              {progressNote}
            </Body>
          )}
        </div>
      </div>
    </BottomSheet>
  );
}
