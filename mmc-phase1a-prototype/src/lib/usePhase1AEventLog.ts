import * as React from "react";
import { getPhase1AEventHistory, subscribeToPhase1AEvents, type Phase1ALogEntry } from "./phase1aLogger";

/** Subscribes the control panel's event-log panel to the prototype logger. */
export function usePhase1AEventLog(): Phase1ALogEntry[] {
  const [entries, setEntries] = React.useState<Phase1ALogEntry[]>(() => getPhase1AEventHistory());

  React.useEffect(() => {
    return subscribeToPhase1AEvents((entry) => {
      setEntries((prev) => [...prev, entry]);
    });
  }, []);

  return entries;
}
