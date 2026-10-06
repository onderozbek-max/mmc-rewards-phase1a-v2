# Tooltip

**Import:** `import { Tooltip } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Hover/focus contextual help

## Props

- `children`: ReactElement (required)
- `content`: string (required)
- `position`: "above" | "below" | "before" | "after" | "topCenterOrLeft"
- `relationship`: "label" | "description"
- `showDelay`: number
- `hideDelay`: number
- `disabled`: boolean — Suppresses the tooltip entirely while `true` — it will not show on hover or focus, and an already...