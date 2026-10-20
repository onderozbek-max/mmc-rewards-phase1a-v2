/**
 * Reviewer-facing scenario presets (prototype tooling only). Each preset is
 * just a seed for the member's current lifetime points — everything else
 * (Home lock state, sheet copy, next milestone) is derived from that number
 * by the engine, so a preset can never drift from the real rules.
 */

import { MILESTONES } from "./phase1aEngine";

export type ScenarioId = "below250" | "250to1000" | "1000to3000" | "above3000";

export interface ScenarioPreset {
  id: ScenarioId;
  label: string;
  /** Inclusive lower bound / exclusive upper bound of lifetime points for this band. */
  min: number;
  max: number;
  /** Lifetime points the preset seeds when selected. */
  seedPoints: number;
}

const [, basic, premium] = MILESTONES;

export const SCENARIO_PRESETS: readonly ScenarioPreset[] = [
  { id: "below250", label: "Below 250", min: 0, max: MILESTONES[0].threshold, seedPoints: 90 },
  {
    id: "250to1000",
    label: "250–1,000",
    min: MILESTONES[0].threshold,
    max: basic.threshold,
    seedPoints: 400,
  },
  { id: "1000to3000", label: "1,000–3,000", min: basic.threshold, max: premium.threshold, seedPoints: 1500 },
  { id: "above3000", label: "Above 3,000", min: premium.threshold, max: Infinity, seedPoints: 3200 },
];

export function getScenarioPreset(id: ScenarioId): ScenarioPreset {
  return SCENARIO_PRESETS.find((preset) => preset.id === id) ?? SCENARIO_PRESETS[0];
}

/** Which band the member's current lifetime points fall in. */
export function scenarioForPoints(lifetimePoints: number): ScenarioId {
  const match = SCENARIO_PRESETS.find((preset) => lifetimePoints >= preset.min && lifetimePoints < preset.max);
  return (match ?? SCENARIO_PRESETS[0]).id;
}
