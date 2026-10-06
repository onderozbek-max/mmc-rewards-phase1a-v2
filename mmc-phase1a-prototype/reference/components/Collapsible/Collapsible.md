# Collapsible

**Import:** `import { Collapsible } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Headless expand/collapse primitive (Collapsible + Trigger + Content) — manages open state only, no styling

## Composition

`Collapsible` is part of a compound component. Use together with: `CollapsibleContent`, `CollapsibleTrigger`.

All pieces import from the same path (`@walmart/ld-kit`). See each sibling's `.md` for its API.

## Props

- `open`: boolean — Controlled open state.
- `defaultOpen`: boolean — Initial open state when uncontrolled.
- `onOpenChange`: (open: boolean) => void — Called when open state changes (controlled or uncontrolled).
- `disabled`: boolean — Disable toggling.