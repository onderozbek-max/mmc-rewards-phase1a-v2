# PrimarySection

**Import:** `import { PrimarySection } from "@walmart/ld-kit"`
**Category:** components

## Composition

`PrimarySection` is part of a compound component. Use together with: `SecondarySection`, `TertiarySection`.

All pieces import from the same path (`@walmart/ld-kit`). See each sibling's `.md` for its API.

## Props

- `title`: string — Optional heading text.
- `description`: string | ReactNode — Optional subtitle below the title.
- `children`: ReactNode (required) — Section content.
- `divider`: boolean — Show a divider between header and content.
- `actions`: ReactNode — Optional action buttons rendered in the header row.
- `collapsible`: boolean — Whether the section can be collapsed.
- `defaultOpen`: boolean — Initial open state when collapsible.