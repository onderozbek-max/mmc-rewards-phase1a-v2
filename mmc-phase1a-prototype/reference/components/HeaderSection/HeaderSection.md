# HeaderSection

**Import:** `import { HeaderSection } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Section header for in-screen hierarchy — medium (link action) or small (collapsible chevron) size, with divider

## Props

- `size`: "medium" | "small" — Size variant.
- `title`: string (required) — Title text.
- `count`: number | null — Optional item count rendered as `(N)` after the title.
- `description`: string | null — Optional description below the title.
- `trailingLabel`: string — Label for the trailing LinkButton (medium only).
- `onTrailingAction`: () => void — Fires when the trailing action is triggered.
- `expanded`: boolean — Controlled expanded state for `small`.
- `showDivider`: boolean — Render a `core/Divider` at the bottom.
- `contentInset`: boolean — Adds left + right padding to the content area.