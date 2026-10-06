# ScheduleWidget

**Import:** `import { ScheduleWidget } from "@walmart/ld-kit"`
**Category:** patterns
**Intent:** Associate shift schedule list (date/role/lunch/store rows with optional Report-an-absence CTA)

## Props

- `shifts`: Shift[]
- `onShiftClick`: (shift: Shift) => void
- `onViewFullSchedule`: () => void
- `onReportAbsence`: () => void