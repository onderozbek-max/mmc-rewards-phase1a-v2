# ScatterChart

**Import:** `import { ScatterChart } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Scatter plot — the relationship between two measures

## Props

- `data`: Record<string, unknown>[] (required) — Rows of `{x, y}` with an optional `g` series index.
- `series`: number — How many series the rows' `g` indices bucket into — a COUNT, not field names.
- `seriesNames`: string[] — Display names for the series (for a legend built with `chartLegend`).
- `seriesSelect`: boolean — Let the reader EXAMINE ONE SERIES from the legend — hover previews, click selects, arrows move it.
- `xTitle`: string — Axis title for the x axis — the measure or dimension it carries, with its unit.
- `yTitle`: string — Axis title for the y axis — the measure it carries, with its unit.
- `yDomain`: "zero" | "auto" | [number, number] — The y-axis reading: `'zero'` (default), `'auto'` to zoom to the data, or an explicit `[min, max]`.
- `references`: ChartReference[] — What the data is measured against — a scatter most wants `identity`, y=x.
- `ariaLabel`: string (required) — A sentence stating the FINDING; on pie and doughnut it must also enumerate every part and value.
- `aspect`: number — Aspect ratio override — an ENCODING decision, not styling; the register sets each type's default.
- `recipe`: string — Named style set; defaults to the recipe in context, else 'ld-default'.