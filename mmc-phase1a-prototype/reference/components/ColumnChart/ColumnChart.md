# ColumnChart

**Import:** `import { ColumnChart } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Column chart — one measure compared across categories (a bar chart)

## Props

- `data`: Record<string, unknown>[] (required) — Rows keyed by `x` plus the value field.
- `seriesKey`: string — The value field in `data`.
- `seriesName`: string — Display name for the series; defaults to the key.
- `xTitle`: string — Axis title for the x axis — the measure or dimension it carries, with its unit.
- `yTitle`: string — Axis title for the y axis — the measure it carries, with its unit.
- `xScale`: "nominal" | "ordinal" — Override the x axis's MEASUREMENT SCALE for this chart, when the type's default is wrong for this...
- `yDomain`: "zero" | "auto" | [number, number] — The y-axis reading: `'zero'` (default), `'auto'` to zoom to the data, or an explicit `[min, max]`.
- `references`: ChartReference[] — What the data is measured against — ONE value across the whole plot, never one per category.
- `ariaLabel`: string (required) — A sentence stating the FINDING; on pie and doughnut it must also enumerate every part and value.
- `aspect`: number — Aspect ratio override — an ENCODING decision, not styling; the register sets each type's default.
- `recipe`: string — Named style set; defaults to the recipe in context, else 'ld-default'.