# ClusteredColumnChart

**Import:** `import { ClusteredColumnChart } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Clustered column chart — two to four series compared side by side across categories

## Props

- `data`: Record<string, unknown>[] (required) — Rows keyed by `x` plus one field per series.
- `seriesKeys`: string[] — Series fields in `data`.
- `seriesNames`: string[] — Display names for the series; defaults to the keys.
- `xTitle`: string — Axis title for the x axis — the measure or dimension it carries, with its unit.
- `yTitle`: string — Axis title for the y axis — the measure it carries, with its unit.
- `xScale`: "nominal" | "ordinal" — Override the x axis's MEASUREMENT SCALE for this chart, when the type's default is wrong for this...
- `yDomain`: "zero" | "auto" | [number, number] — The y-axis reading: `'zero'` (default), `'auto'` to zoom to the data, or an explicit `[min, max]`.
- `references`: ChartReference[] — What the data is measured against — ONE value across the whole plot, never one per category.
- `seriesSelect`: boolean — Let the reader EXAMINE ONE SERIES from the legend.
- `ariaLabel`: string (required) — A sentence stating the FINDING; on pie and doughnut it must also enumerate every part and value.
- `aspect`: number — Aspect ratio override — an ENCODING decision, not styling; the register sets each type's default.
- `recipe`: string — Named style set; defaults to the recipe in context, else 'ld-default'.