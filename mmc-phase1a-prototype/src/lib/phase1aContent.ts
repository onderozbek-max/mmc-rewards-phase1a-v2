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

import { pointsWord } from "./phase1aEngine";

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
  arm3: (pointsRemaining: number): [string, string] => [
    `${pointsRemaining} ${pointsWord(pointsRemaining)} to unlock`,
    "expanded Community Home content.",
  ],
} as const;

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
