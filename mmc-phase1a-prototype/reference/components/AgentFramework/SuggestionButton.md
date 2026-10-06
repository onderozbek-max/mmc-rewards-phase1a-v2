# SuggestionButton

**Import:** `import { SuggestionButton } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Floating elevated work-surface card beside an agent chat (header with close/title/actions, scrollable body, optional footer)

## Props

- `children`: ReactNode (required) — The button label.
- `leading`: ReactNode — The leading asset.
- `variant`: "icon" | "image" — The layout treatment.
- `color`: "default" | "brandSubtle" — The color treatment.
- `loading`: boolean — Shows a non-interactive loading placeholder (a spinner for the icon variant, a skeleton asset + l...
- `disabled`: boolean — Disables the button.
- `fill`: string — Override the fill.
- `textColor`: string — Override the label (and icon) color.
- `radius`: string | number — Override the corner radius.
- `onClick`: (event: MouseEvent<HTMLButtonElement>) => void — Fired when the suggestion is chosen.

## Common props

This component pipes props through `applyCommonProps`, so it also accepts:

- ⚠️ `className` and `style` are **omitted from this component's TS prop union** (e.g. `Omit<…, 'className' | 'style'>`). Use `UNSAFE_className` and `UNSAFE_style` — they pass through at runtime and are the only TS-safe options for this component.
- `UNSAFE_className` / `UNSAFE_style` — runtime aliases (the only TS-safe styling hooks here).
- Standard DOM attributes that match the underlying element (`id`, `data-*`, `aria-*`, event handlers, etc.).
