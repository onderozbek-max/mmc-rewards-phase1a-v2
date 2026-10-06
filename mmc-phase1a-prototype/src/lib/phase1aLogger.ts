/**
 * Prototype-only event logging (Section 10). Logs to the browser console and
 * keeps an in-memory tail that the dev-only control panel renders, so a
 * reviewer can see the event stream without opening devtools. This never
 * talks to a real analytics backend.
 */

export type Phase1AEventName =
  | "confirmed_survey_return_simulated"
  | "phase_1a_arm_applied"
  | "phase_1a_bottom_sheet_impression"
  | "phase_1a_bottom_sheet_dismissed"
  | "phase_1a_common_unlock_impression"
  | "phase_1a_common_unlock_cta_selected";

export interface Phase1AEventProperties {
  assignedArm?: number;
  previousLifetimePoints?: number;
  pointsEarned?: number;
  updatedLifetimePoints?: number;
  pointsRemaining?: number | null;
  crossedThreshold?: boolean;
  [key: string]: unknown;
}

export interface Phase1ALogEntry {
  id: number;
  name: Phase1AEventName;
  properties: Phase1AEventProperties;
  timestamp: string;
}

type Listener = (entry: Phase1ALogEntry) => void;

let nextId = 1;
const listeners = new Set<Listener>();
const history: Phase1ALogEntry[] = [];

export function logPhase1AEvent(
  name: Phase1AEventName,
  properties: Phase1AEventProperties = {},
): Phase1ALogEntry {
  const entry: Phase1ALogEntry = {
    id: nextId++,
    name,
    properties,
    timestamp: new Date().toISOString(),
  };
  history.push(entry);
  // eslint-disable-next-line no-console -- intentional prototype-only event log
  console.log(`[phase1a] ${name}`, properties);
  listeners.forEach((listener) => listener(entry));
  return entry;
}

export function subscribeToPhase1AEvents(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getPhase1AEventHistory(): Phase1ALogEntry[] {
  return [...history];
}

export function clearPhase1AEventHistory(): void {
  history.length = 0;
}
