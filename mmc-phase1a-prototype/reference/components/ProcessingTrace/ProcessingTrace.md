# ProcessingTrace

**Import:** `import { ProcessingTrace } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Collapsible AI agent run trace with a status pill and composable body cards (Reasoning, TaskPlan, Sources, Timeline, etc.)

## Props

- `state`: "processing" | "success" | "failure" (required) — Overall state of the run.
- `label`: ReactNode (required) — Main header label — the human-readable summary of what happened (e.g. "Worked for 14s · 3 tools ·...
- `statusLabel`: ReactNode — Override the auto-generated status text inside the pill (e.g. "Worked 14s", "Researched 2m").
- `children`: ReactNode — Body content — compose with `<ProcessingTrace.Row>` or any of the registered subcomponents (Reaso...
- `defaultOpen`: boolean — Uncontrolled initial open state.
- `open`: boolean — Controlled open state.
- `onOpenChange`: (open: boolean) => void — Callback fired when the open state changes.
- `progress`: number — Optional determinate progress, 0–1.
- `size`: "small" | "large" — Visual size of the trace. - `large` (default): full trace — header + collapsible body + children....
- `avatar`: ReactNode — Optional decorative avatar rendered before the status pill in the header (e.g. the agent's brand ...
- `hideBorder`: boolean — Hide the container's hairline border for a fully inline appearance.
- `a11yLabel`: string — Optional accessible label for the toggle button.