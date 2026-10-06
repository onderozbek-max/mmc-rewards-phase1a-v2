# DoughnutChart

**Import:** `import { DoughnutChart } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Doughnut (donut) chart — parts of one whole with the total's hole in the middle

## Props

- `data`: Record<string, unknown>[] (required) — One `{x, v}` row per slice (2–5 slices; drawn largest-first by construction, whatever the input o...
- `ariaLabel`: string (required) — A sentence stating the FINDING; on pie and doughnut it must also enumerate every part and value.
- `aspect`: number — Aspect ratio override — an ENCODING decision, not styling; the register sets each type's default.
- `recipe`: string — Named style set; defaults to the recipe in context, else 'ld-default'.