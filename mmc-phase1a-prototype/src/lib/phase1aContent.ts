/**
 * Phase 1A — all member-facing copy lives here, in one place, so arms can be
 * compared (and edited) without hunting through component code.
 *
 * Per the experiment-integrity constraints (Section 11), Arm 2 and Arm 3
 * MUST share every structural and visual element and differ ONLY in whether
 * the real benefit is named. That guarantee is enforced in code, not just by
 * convention: `progressCopyByArm` is the only place the two arms diverge,
 * and both entries are the same shape (two lines, same lead-in sentence).
 */

import { pointsWord, type MilestoneId, type PrototypeMode } from "./phase1aEngine";

export const FIRST_MILESTONE_POINTS = 250;

/** "You earned {n} points" / "You earned 1 point" — shared by Arm 2 and Arm 3. */
export function bottomSheetHeadline(pointsEarned: number): string {
  return `You earned ${pointsEarned} ${pointsWord(pointsEarned)}`;
}

/** "You now have {n} lifetime points." — shared by Arm 2 and Arm 3. */
export function lifetimeTotalLine(updatedLifetimePoints: number): string {
  return `You now have ${updatedLifetimePoints} lifetime ${pointsWord(updatedLifetimePoints)}.`;
}

/**
 * Two-line progress copy, identical in structure and length between arms.
 * Arm 2 never names the real benefit; Arm 3 names it explicitly. This is the
 * ONLY content difference between the two treatments.
 */
export const progressCopyByArm = {
  arm2: (pointsRemaining: number): [string, string] => [
    `${pointsRemaining} ${pointsWord(pointsRemaining)} to unlock`,
    "your next Community benefit.",
  ],
  arm3: (pointsRemaining: number, milestoneId: MilestoneId = "homeContent"): [string, string] => [
    `${pointsRemaining} ${pointsWord(pointsRemaining)} to unlock`,
    `${milestoneBenefit[milestoneId].name}.`,
  ],
} as const;

/**
 * What Arm 3 names at each milestone. Arm 2 never reads this table — it
 * always says "your next Community benefit" — so the naming is the only
 * thing that differs between the arms at every tier.
 *
 * `comingSoonNote` is a third line shown by Arm 3 only, for benefits that
 * are announced at unlock but not yet live (IHUT eligibility, in-store).
 */
export const milestoneBenefit: Record<MilestoneId, { name: string; comingSoonNote: string | null }> = {
  homeContent: { name: "expanded Community Home content", comingSoonNote: null },
  basicIhut: { name: "basic IHUT eligibility", comingSoonNote: "Coming soon after unlock." },
  premiumIhut: { name: "premium IHUT eligibility", comingSoonNote: "Coming soon after unlock." },
  inStore: { name: "exclusive in-store benefits", comingSoonNote: "Coming soon." },
};

/** Optional third progress line. Arm 2 never has one. */
export function progressNoteByArm(arm: "arm2" | "arm3", milestoneId: MilestoneId | null): string | null {
  if (arm === "arm2" || milestoneId === null) return null;
  return milestoneBenefit[milestoneId].comingSoonNote;
}

export const bottomSheetCtaLabel = "Got it";

/**
 * The common 250-point unlock. Reachable from any arm; not itself an
 * experiment arm. Copy here is prototype copy for review, not a final
 * production decision.
 */
export const commonUnlock = {
  headline: "You unlocked expanded Community Home content",
  supportingLine(updatedLifetimePoints: number): string {
    return `You now have ${updatedLifetimePoints} lifetime ${pointsWord(
      updatedLifetimePoints,
    )}. More Community content is now available on your Home.`;
  },
  ctaLabel: "Explore Community Home",
};

/** Label shown in prototype-only controls — never inside the member-facing UI. */
export const commonUnlockControlLabel = "Common 250 unlock — outside experiment";

/** Option B, member already past 250: the only progression line shown. */
export const lightweightProgressLine = "New milestones coming soon.";

/** Prototype-only labels for the mode switch — never shown inside the member UI. */
export const modeLabels: Record<PrototypeMode, { label: string; description: string }> = {
  A: {
    label: "Option A — Full Progression",
    description: "After 250 points, each survey keeps showing progress toward the next milestone.",
  },
  B: {
    label: "Option B — 250-Point Only",
    description:
      "Same as A below 250. After 250, each survey only shows points earned, lifetime total, and “New milestones coming soon.”",
  },
};
