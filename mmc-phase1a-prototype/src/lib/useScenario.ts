import * as React from "react";
import {
  type Arm,
  type ExperienceOutcome,
  type SimulationResult,
  isValidArm,
  simulateCompletion,
} from "./phase1aEngine";
import { logPhase1AEvent } from "./phase1aLogger";

export const DEFAULT_PREVIOUS_LIFETIME_POINTS = 90;
export const DEFAULT_POINTS_EARNED = 10;
export const DEFAULT_ARM: Arm = 1;

export type SheetVisibility = "none" | "arm2" | "arm3" | "commonUnlock";

export interface ScenarioSnapshot {
  assignedArm: Arm;
  previousLifetimePoints: number;
  pointsEarnedInput: number;
  sheet: SheetVisibility;
  lastResult: SimulationResult | null;
  completionCount: number;
}

function readInitialStateFromUrl(): ScenarioSnapshot {
  if (typeof window === "undefined") {
    return {
      assignedArm: DEFAULT_ARM,
      previousLifetimePoints: DEFAULT_PREVIOUS_LIFETIME_POINTS,
      pointsEarnedInput: DEFAULT_POINTS_EARNED,
      sheet: "none",
      lastResult: null,
      completionCount: 0,
    };
  }
  const params = new URLSearchParams(window.location.search);
  const armRaw = params.get("arm");
  const previousRaw = params.get("previous");
  const earnedRaw = params.get("earned");
  const armParam = armRaw === null ? NaN : Number(armRaw);
  const previousParam = previousRaw === null ? NaN : Number(previousRaw);
  const earnedParam = earnedRaw === null ? NaN : Number(earnedRaw);

  return {
    assignedArm: isValidArm(armParam) ? armParam : DEFAULT_ARM,
    previousLifetimePoints: Number.isFinite(previousParam) && previousParam >= 0
      ? previousParam
      : DEFAULT_PREVIOUS_LIFETIME_POINTS,
    pointsEarnedInput: Number.isFinite(earnedParam) && earnedParam > 0
      ? earnedParam
      : DEFAULT_POINTS_EARNED,
    sheet: "none",
    lastResult: null,
    completionCount: 0,
  };
}

/**
 * Writes the current scenario *inputs* back into the URL so the scenario is
 * shareable (Section 9). This only ever seeds the control-panel inputs on
 * load — it never triggers the bottom sheet by itself. Loading a URL whose
 * `previous + earned` would cross 250 shows the member's current baseline
 * until "Simulate confirmed RedJade return" is pressed, exactly like any
 * other scenario.
 */
function syncUrl(snapshot: Pick<ScenarioSnapshot, "assignedArm" | "previousLifetimePoints" | "pointsEarnedInput">) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  params.set("arm", String(snapshot.assignedArm));
  params.set("previous", String(snapshot.previousLifetimePoints));
  params.set("earned", String(snapshot.pointsEarnedInput));
  const nextUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, "", nextUrl);
}

export function useScenario() {
  const [state, setState] = React.useState<ScenarioSnapshot>(readInitialStateFromUrl);

  React.useEffect(() => {
    syncUrl(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.assignedArm, state.previousLifetimePoints, state.pointsEarnedInput]);

  const setAssignedArm = React.useCallback((arm: Arm) => {
    setState((prev) => ({ ...prev, assignedArm: arm }));
  }, []);

  const setPreviousLifetimePoints = React.useCallback((value: number) => {
    setState((prev) => ({ ...prev, previousLifetimePoints: Math.max(0, Math.round(value)) }));
  }, []);

  const setPointsEarnedInput = React.useCallback((value: number) => {
    setState((prev) => ({ ...prev, pointsEarnedInput: Math.max(1, Math.round(value)) }));
  }, []);

  /**
   * Simulates one confirmed qualifying RedJade return (Section 4). This is
   * the ONLY thing that may open the bottom sheet — never a plain Home
   * visit, never a refresh.
   *
   * Logging happens here, in the event-handler body, NOT inside the
   * `setState` updater below. `logPhase1AEvent` synchronously notifies
   * listeners (the control panel's event-log hook), and React forbids
   * triggering another component's setState from inside a different
   * component's render-phase updater function — doing so throws
   * "Cannot update a component while rendering a different component."
   * Reading the current `state` by closure (rather than via the `prev`
   * param) is safe here because `simulate` takes no arguments and is only
   * ever invoked from a click handler, never during render.
   */
  const simulate = React.useCallback(() => {
    const result = simulateCompletion(
      { assignedArm: state.assignedArm, previousLifetimePoints: state.previousLifetimePoints },
      state.pointsEarnedInput,
    );

    logPhase1AEvent("confirmed_survey_return_simulated", {
      assignedArm: state.assignedArm,
      previousLifetimePoints: result.previousLifetimePoints,
      pointsEarned: result.pointsEarned,
      updatedLifetimePoints: result.updatedLifetimePoints,
      pointsRemaining: result.pointsRemaining,
      crossedThreshold: result.crossedThreshold,
    });
    logPhase1AEvent("phase_1a_arm_applied", {
      assignedArm: state.assignedArm,
      crossedThreshold: result.crossedThreshold,
    });

    const sheet: SheetVisibility =
      result.outcome === "commonUnlock"
        ? "commonUnlock"
        : result.outcome === "arm1"
          ? "none"
          : result.outcome; // "arm2" | "arm3"

    if (sheet === "commonUnlock") {
      logPhase1AEvent("phase_1a_common_unlock_impression", {
        assignedArm: state.assignedArm,
        previousLifetimePoints: result.previousLifetimePoints,
        pointsEarned: result.pointsEarned,
        updatedLifetimePoints: result.updatedLifetimePoints,
        crossedThreshold: true,
      });
    } else if (sheet === "arm2" || sheet === "arm3") {
      logPhase1AEvent("phase_1a_bottom_sheet_impression", {
        assignedArm: state.assignedArm,
        previousLifetimePoints: result.previousLifetimePoints,
        pointsEarned: result.pointsEarned,
        updatedLifetimePoints: result.updatedLifetimePoints,
        pointsRemaining: result.pointsRemaining,
        crossedThreshold: false,
      });
    }

    setState((prev) => ({
      ...prev,
      previousLifetimePoints: result.updatedLifetimePoints,
      sheet,
      lastResult: result,
      completionCount: prev.completionCount + 1,
    }));
  }, [state.assignedArm, state.previousLifetimePoints, state.pointsEarnedInput]);

  const dismissSheet = React.useCallback(
    (reason: "cta" | "close") => {
      if (state.sheet === "none") return;

      if (state.sheet === "commonUnlock") {
        if (reason === "cta") {
          logPhase1AEvent("phase_1a_common_unlock_cta_selected", {
            assignedArm: state.assignedArm,
            updatedLifetimePoints: state.lastResult?.updatedLifetimePoints,
            crossedThreshold: true,
          });
        }
      } else {
        logPhase1AEvent("phase_1a_bottom_sheet_dismissed", {
          assignedArm: state.assignedArm,
          updatedLifetimePoints: state.lastResult?.updatedLifetimePoints,
          pointsRemaining: state.lastResult?.pointsRemaining,
          crossedThreshold: false,
        });
      }

      setState((prev) => ({ ...prev, sheet: "none" }));
    },
    [state.sheet, state.assignedArm, state.lastResult],
  );

  const resetScenario = React.useCallback(() => {
    setState({
      assignedArm: DEFAULT_ARM,
      previousLifetimePoints: DEFAULT_PREVIOUS_LIFETIME_POINTS,
      pointsEarnedInput: DEFAULT_POINTS_EARNED,
      sheet: "none",
      lastResult: null,
      completionCount: 0,
    });
  }, []);

  return {
    ...state,
    setAssignedArm,
    setPreviousLifetimePoints,
    setPointsEarnedInput,
    simulate,
    dismissSheet,
    resetScenario,
  };
}

export type UseScenarioReturn = ReturnType<typeof useScenario>;
export type { Arm, ExperienceOutcome, SimulationResult };
