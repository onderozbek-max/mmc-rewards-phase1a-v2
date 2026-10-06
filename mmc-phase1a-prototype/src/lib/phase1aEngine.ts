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

export interface ScenarioInput {
  /** Confirmed lifetime points before this completion. */
  previousLifetimePoints: number;
  /** Points awarded by the just-confirmed qualifying RedJade survey. */
  pointsEarned: number;
}

export interface CompletionResult extends ScenarioInput {
  /** previousLifetimePoints + pointsEarned — never clamped, overshoot preserved. */
  updatedLifetimePoints: number;
  /** True when updatedLifetimePoints >= FIRST_MILESTONE_POINTS. */
  crossedThreshold: boolean;
  /** FIRST_MILESTONE_POINTS - updatedLifetimePoints, or null once the threshold is crossed. */
  pointsRemaining: number | null;
}

/**
 * Pure point math. No clamping — a member who moves from 245 to 255 is
 * reported as having 255 lifetime points, never rounded down to 250.
 */
export function computeCompletion(input: ScenarioInput): CompletionResult {
  const { previousLifetimePoints, pointsEarned } = input;
  const updatedLifetimePoints = previousLifetimePoints + pointsEarned;
  const crossedThreshold = updatedLifetimePoints >= FIRST_MILESTONE_POINTS;
  return {
    previousLifetimePoints,
    pointsEarned,
    updatedLifetimePoints,
    crossedThreshold,
    pointsRemaining: crossedThreshold ? null : FIRST_MILESTONE_POINTS - updatedLifetimePoints,
  };
}

export type ExperienceOutcome = "arm1" | "arm2" | "arm3" | "commonUnlock";

/**
 * Routing rule (Section 4): a completion that reaches or exceeds the first
 * milestone ALWAYS bypasses the assigned experimental arm, regardless of
 * which arm the member is in. Only completions that stay below threshold
 * surface the member's assigned arm experience.
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
