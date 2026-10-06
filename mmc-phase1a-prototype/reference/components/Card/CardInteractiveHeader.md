# CardInteractiveHeader

**Import:** `import { CardInteractiveHeader } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Structured card surface (header / body / footer)

## Composition

`CardInteractiveHeader` is part of a compound component. Use together with: `CardInteractiveContent`, `CardInteractiveFooter`, `CardInteractive`.

All pieces import from the same path (`@walmart/ld-kit`). See each sibling's `.md` for its API.

## Props

- `title`: ReactNode — The title for the card header.
- `supercilium`: ReactNode — Optional eyebrow label rendered above the title/description lockup, in Caption typography with a ...
- `superciliumIcon`: string — Optional decorative Living Design icon rendered before `supercilium`, inside the eyebrow row.
- `leadingIcon`: string — Decorative Living Design icon name displayed before the title.
- `description`: ReactNode — Optional subtitle rendered below the title in a subtle color.
- `trailingIcon`: string — Decorative Living Design icon name displayed after the title.
- `trailing`: ReactNode — Trailing content rendered in the header's right-actions row, alongside `globalAction` if present ...
- `globalAction`: { icon: string; a11yLabel: string; onClick: () => void } — One dedicated card-level action rendered as a small `IconButton` (`xsmall` at `size="small"`) at ...

## Common props

This component pipes props through `applyCommonProps`, so it also accepts:

- ⚠️ `className` and `style` are **omitted from this component's TS prop union** (e.g. `Omit<…, 'className' | 'style'>`). Use `UNSAFE_className` and `UNSAFE_style` — they pass through at runtime and are the only TS-safe options for this component.
- `UNSAFE_className` / `UNSAFE_style` — runtime aliases (the only TS-safe styling hooks here).
- Standard DOM attributes that match the underlying element (`id`, `data-*`, `aria-*`, event handlers, etc.).
