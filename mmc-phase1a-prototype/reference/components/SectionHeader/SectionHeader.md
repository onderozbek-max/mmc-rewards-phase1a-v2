# SectionHeader

**Import:** `import { SectionHeader } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Titled section header with optional count, description, and trailing link or expand/collapse chevron

## Props

- `size`: "large" | "small" — The size of the section header.
- `title`: string (required) — The title text of the section header.
- `headingLevel`: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" — Heading level rendered for the title.
- `count`: number — An optional numeric count displayed next to the title in parentheses, e.g.
- `description`: string — An optional description rendered below the title row.
- `trailing`: "none" | "link" | "chevron" — The trailing affordance type. - `none` — no trailing content - `link` — renders a LinkButton; req...
- `trailingLabel`: string — The label for the trailing LinkButton.
- `onTrailingClick`: () => void — Callback for the trailing LinkButton click.
- `expanded`: boolean — Whether the section is expanded.
- `onExpandChange`: (expanded: boolean) => void — Callback fired when the user toggles the chevron.
- `divider`: boolean — Whether to render a Divider below the section header.