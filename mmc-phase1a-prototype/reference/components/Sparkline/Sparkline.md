# Sparkline

**Import:** `import { Sparkline } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Sparkline — a trend as a glyph; shape without axes, for a tile or inline with text

## Props

- `data`: Record<string, unknown>[] (required) — Rows as `{x, v}`.
- `variant`: "trend" | "area" | "signed" | "winloss" — Which picture to draw — `trend`, `area`, `signed` or `winloss`.
- `polarity`: "higher-is-better" | "lower-is-better" — Which direction is GOOD news — set `'lower-is-better'` where a fall is the win.
- `seriesName`: string — The series name, for the legend.
- `ariaLabel`: string (required) — A sentence stating the FINDING; on pie and doughnut it must also enumerate every part and value.
- `aspect`: number — Aspect ratio override — an ENCODING decision, not styling; the register sets each type's default.
- `recipe`: string — Named style set; defaults to the recipe in context, else 'ld-default'.