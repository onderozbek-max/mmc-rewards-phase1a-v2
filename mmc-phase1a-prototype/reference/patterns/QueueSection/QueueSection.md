# QueueSection

**Import:** `import { QueueSection } from "@walmart/ld-kit"`
**Category:** patterns
**Intent:** Dispatcher for queue/reservation flows, picking the primitive by state.kind (timer/card/banner/landing)

## Props

- `state`: QueueState (required) — Current queue state.