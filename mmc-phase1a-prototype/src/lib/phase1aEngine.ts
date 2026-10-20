/**
 * Phase 1A — First-Milestone Experience Experiment
 * Pure, framework-free decision logic.
 *
 * Nothing in this file touches React, the DOM, or local storage — it is the
 * part of the prototype that is actually worth unit testing. UI components
 * and the `useScenario` hook call into this module; they never duplicate
 * the math or the routing decision themselves.
 */

export type Arm = 1 | 2 | 3;

/** The first real Community benefit unlocks at this confirmed lifetime total. */
export const FIRST_MILESTONE_POINTS = 250;

export type MilestoneId = "homeContent" | "basicIhut" | "premiumIhut" | "inStore";

export interface Milestone {
  /** Lifetime points at which this milestone's benefit unlocks. */
  threshold: number;
  id: MilestoneId;
}

/**
 * Ordered milestone ladder. Each entry is the benefit a member unlocks when
 * they REACH `threshold`; the "next milestone" for a given total is the first
 * entry whose threshold is still above it.
 *
 * ASSUMPTION: the final `inStore` threshold (5000) is a PLACEHOLDER — the
 * brief defines the "above 3000" scenario's benefit (exclusive in-store
 * benefits) but no point value for it. Change it here and every sheet,
 * control, and test derives from this one constant.
 */
export const MILESTONES: readonly Milestone[] = [
  { threshold: FIRST_MILESTONE_POINTS, id: "homeContent" },
  { threshold: 1000, id: "basicIhut" },
  { threshold: 3000, id: "premiumIhut" },
  { threshold: 5000, id: "inStore" },
];

/** First milestone still ahead of `lifetimePoints`, or null past the last one. */
export function getNextMilestone(lifetimePoints: number): Milestone | null {
  return MILESTONES.find((milestone) => lifetimePoints < milestone.threshold) ?? null;
}

/** Community Home content modules are locked below 250 and unlocked at/above it. */
export function isHomeContentUnlocked(lifetimePoints: number): boolean {
  return lifetimePoints >= FIRST_MILESTONE_POINTS;
}

/** True only when a completion actually CROSSES 250 from below. */
export function crossesFirstMilestone(previousLifetimePoints: number, pointsEarned: number): boolean {
  return (
    previousLifetimePoints < FIRST_MILESTONE_POINTS &&
    previousLifetimePoints + pointsEarned >= FIRST_MILESTONE_POINTS
  );
}

export interface ScenarioInput {
  /** Confirmed lifetime points before this completion. */
  previousLifetimePoints: number;
  /** Points awarded by the just-confirmed qualifying RedJade survey. */
  pointsEarned: number;
}

export interface CompletionResult extends ScenarioInput {
  /** previousLifetimePoints + pointsEarned — never clamped, overshoot preserved. */
  updatedLifetimePoints: number;
  /**
   * True only when THIS completion crossed the first (250) milestone from
   * below. A member already at/above 250 never re-triggers the common unlock.
   */
  crossedThreshold: boolean;
  /** Points from updatedLifetimePoints to the next milestone, or null past the last one. */
  pointsRemaining: number | null;
  /** The milestone `pointsRemaining` is counting toward, or null past the last one. */
  nextMilestoneId: MilestoneId | null;
}

/**
 * Pure point math. No clamping — a member who moves from 245 to 255 is
 * reported as having 255 lifetime points, never rounded down to 250.
 */
export function computeCompletion(input: ScenarioInput): CompletionResult {
  const { previousLifetimePoints, pointsEarned } = input;
  const updatedLifetimePoints = previousLifetimePoints + pointsEarned;
  const next = getNextMilestone(updatedLifetimePoints);
  return {
    previousLifetimePoints,
    pointsEarned,
    updatedLifetimePoints,
    crossedThreshold: crossesFirstMilestone(previousLifetimePoints, pointsEarned),
    pointsRemaining: next ? next.threshold - updatedLifetimePoints : null,
    nextMilestoneId: next ? next.id : null,
  };
}

export type ExperienceOutcome = "arm1" | "arm2" | "arm3" | "commonUnlock";

/**
 * Routing rule (Section 4): a completion that crosses the first milestone
 * ALWAYS bypasses the assigned experimental arm, regardless of which arm the
 * member is in. Every other completion — below 250, or already past it —
 * surfaces the member's assigned arm experience, pointed at whichever
 * milestone is next.
 */
export function resolveOutcome(arm: Arm, result: CompletionResult): ExperienceOutcome {
  if (result.crossedThreshold) return "commonUnlock";
  if (arm === 1) return "arm1";
  if (arm === 2) return "arm2";
  return "arm3";
}

export interface ScenarioState {
  /** Persistent Phase 1A arm assignment — stays fixed across repeated completions. */
  assignedArm: Arm;
  /** Confirmed lifetime points as of right now (updates after each simulated completion). */
  previousLifetimePoints: number;
}

export interface SimulationResult extends CompletionResult {
  assignedArm: Arm;
  outcome: ExperienceOutcome;
}

/**
 * Simulates one confirmed qualifying RedJade return: computes the new
 * total and resolves which experience the member should see, without
 * mutating anything. The caller (useScenario) decides what to do with the
 * result, including advancing previousLifetimePoints for the next call.
 */
export function simulateCompletion(state: ScenarioState, pointsEarned: number): SimulationResult {
  const result = computeCompletion({
    previousLifetimePoints: state.previousLifetimePoints,
    pointsEarned,
  });
  return {
    ...result,
    assignedArm: state.assignedArm,
    outcome: resolveOutcome(state.assignedArm, result),
  };
}

/** "1 point" vs "2 points" — correct singular/plural grammar for any point count. */
export function pointsWord(n: number): "point" | "points" {
  return Math.abs(n) === 1 ? "point" : "points";
}

export function isValidArm(value: unknown): value is Arm {
  return value === 1 || value === 2 || value === 3;
}
