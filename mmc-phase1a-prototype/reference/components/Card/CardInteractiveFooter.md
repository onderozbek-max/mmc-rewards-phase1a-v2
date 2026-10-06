# CardInteractiveFooter

**Import:** `import { CardInteractiveFooter } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Structured card surface (header / body / footer)

## Composition

`CardInteractiveFooter` is part of a compound component. Use together with: `CardInteractiveHeader`, `CardInteractiveContent`, `CardInteractive`.

All pieces import from the same path (`@walmart/ld-kit`). See each sibling's `.md` for its API.

## Props

- `leading`: ReactNode — Flexible content anchored to the left of the footer row — e.g. a `LinkButton`, plain text, or a p...
- `children`: ReactNode — The footer's right-aligned action controls — typically one or more `Button`s (e.g.
- `showDivider`: boolean — Whether the full-width `Divider` above the footer row is rendered.

## Common props

This component pipes props through `applyCommonProps`, so it also accepts:

- ⚠️ `className` and `style` are **omitted from this component's TS prop union** (e.g. `Omit<…, 'className' | 'style'>`). Use `UNSAFE_className` and `UNSAFE_style` — they pass through at runtime and are the only TS-safe options for this component.
- `UNSAFE_className` / `UNSAFE_style` — runtime aliases (the only TS-safe styling hooks here).
- Standard DOM attributes that match the underlying element (`id`, `data-*`, `aria-*`, event handlers, etc.).
