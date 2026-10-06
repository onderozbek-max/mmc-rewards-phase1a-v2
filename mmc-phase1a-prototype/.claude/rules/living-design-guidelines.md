
# Building UI with Living Design

Living Design ships as the `@walmart/ld-kit` package: components, composed
patterns, hooks and runtime utilities. Compose them. Reach for raw HTML and CSS
only in the gaps between them, and author a new component only once nothing in
the library fits.

What exists — names, props, types, usage notes — is generated from the shipped
source and served by the CLI, so it is always current. This file is deliberately
not a catalogue: it carries the judgement the generated docs cannot.

## Finding a component

```bash
node scripts/ld/cli.mjs context "<the ask, verbatim>"   # the rules and APIs that bear on this task
node scripts/ld/cli.mjs search <keywords>               # ranked search across rules and catalogue
node scripts/ld/cli.mjs show <Name>                     # full prop API, types, usage notes
```

Search by what the thing *does* — "bottom drawer", "date calendar", "empty
state" — not by the name you expect it to have. Rebuilding something that
already exists is the most expensive mistake available in this project, and it
usually starts with an assumed name coming back empty.

Start at the highest level that fits. A `patterns/` entry — a header, a footer,
an order card, a product row — already carries the responsive behaviour, spacing
and accessibility contract you would otherwise rebuild by hand. Drop to atoms
only when no pattern covers the section.

## Components that look alike but mean different things

Search ranks on intent, so these are the pairs where two results look equally
plausible and the wrong pick is a semantic error rather than a styling one.

| When you need | Reach for | Not |
|---|---|---|
| Inline status tied to one region | `Alert` | `Banner` — page-level announcement |
| Transient confirmation | `Snackbar` | `Alert` |
| Empty or no-results state | `ContentMessage` | `Alert` |
| Count or short status, non-interactive | `Badge` / `Tag` | `Chip` — interactive filter |
| Product card in a responsive grid | `ProductCardGrid` | `ItemTile` — fixed 200px, carousel only |
| Product card in a carousel | `CarouselProductCard` | `ProductCardGrid` |
| Centred dialog | `Modal` | `Panel` — edge drawer; `BottomSheet` — mobile sheet |
| Overlay anchored to a trigger | `Popover` | `Modal` |
| Navigation styled as a button | `LinkButton` | `Button` with an `onClick` that navigates |

When two still look equally right, `node scripts/ld/cli.mjs show` both and decide on the
documented intent, not on the picture in your head.

## Where new code goes

Living Design is installed, not vendored, so the whole `src/` tree is yours —
there is no library namespace to stay out of. `reference/` is the library's
generated documentation, read-only. A fresh project ships only `src/App.tsx`,
`src/main.tsx` and `src/styles/`; create the rest as you need it.

- **Pages** — `src/pages/<PageName>.tsx`. PascalCase, one page per file, default export.
- **Components** — `src/components/<Name>.tsx`. Group into
  `src/components/<kebab-case-domain>/` once a feature owns several files
  (`pharmacy`, `supply-chain`, `sams-club`), so it can be lifted out as a unit.

Page wiring lives in `src/App.tsx` — render the active page there. Add
`react-router-dom` only when the ask genuinely spans several navigable pages.

### Hard rules

- **NEVER** create a file that shadows a public `@walmart/ld-kit` component or pattern name.
- **NEVER** put a page under `src/components/`, or a reusable component under `src/pages/`.
- **NEVER** edit library internals or anything under `reference/`.
- **MUST** make a net-new component work at `sm`, `md` and `lg` — see `node scripts/ld/cli.mjs rule spacing`.

## Imports

```tsx
import { Alert, Button, Modal, Card, Container, Header, DesktopFooter } from "@walmart/ld-kit";
import { useHeaderCartBindings } from "@walmart/ld-kit/store";
```

Components, patterns, hooks and common helpers all come from the package root.
Utilities use the exact subpath printed by `node scripts/ld/cli.mjs show <Name>`. Never import
`@livingdesign/react`, never reach into package internals, and use relative
imports only for files you own.

## Constraints the generated docs do not express

- **One primary action per surface.** `variant="primary"` on one `Button`, not three.
- **Pick variants by meaning, not colour** — success/positive, info, warning, error/negative.
- **NEVER use `linear-gradient` or `radial-gradient`** for section or hero backgrounds.
  Gradients are not part of Living Design and bypass theming entirely; use a
  solid semantic colour token (`node scripts/ld/cli.mjs rule tokens-reference`).
- **Keep controlled components controlled.** `isOpen`, `value`, `checked` and
  friends need state behind them, not a literal.
- **Use `isMagic`** where a component offers it, for AI-generated or AI-assisted content.
- **Product sections are horizontal rows by default** — `FlashDealsCarousel` for
  the built-in deals row, `Carousel` + `CarouselProductCard` for your own data.
  Reserve `Grid` + `ProductCardGrid` for browse and search pages.
- **`Carousel` in multi-item mode** needs `className="ld-carousel-item--multi"` on
  each `CarouselItem`. Without it every item renders at 100% width.
- **`ProgressTracker`'s `currentStep` must be derived from data.** A hardcoded
  index shows the wrong step for every order that is not in that state.

## Never

- Rebuild what the library already has — tabs, dialogs, breadcrumbs, menus, form
  controls, footers, headers, product rows.
- Substitute another UI library for a primitive Living Design already provides.
- Wrap a Living Design component in a look-alike of your own that re-implements its behaviour.
- Use emoji or Unicode glyphs as icons — see `node scripts/ld/cli.mjs rule icons`.
- Hand-write product data — see `node scripts/ld/cli.mjs rule utilities`.
- Ship a custom fallback silently. When nothing in the library fits, say so and say why.

## Owned elsewhere

Each of these is the single source of truth for its topic. Pull the one you need
rather than guessing; `node scripts/ld/cli.mjs context` selects among them for you.

| Topic | Rule |
|---|---|
| Theme selection and brand setup | `node scripts/ld/cli.mjs rule theming` |
| Accessibility invariants — binding and machine-checked | `node scripts/ld/cli.mjs rule a11y` |
| Layout, breakpoints, `Container`, `Grid`, spacing | `node scripts/ld/cli.mjs rule spacing` |
| Cart, header and cross-component state | `node scripts/ld/cli.mjs rule component-communication` |
| Product data, media, illustrations, runtime services | `node scripts/ld/cli.mjs rule utilities` |
| Icon lookup and usage | `node scripts/ld/cli.mjs rule icons` |
| The whole catalogue, by eye | `node scripts/ld/cli.mjs rule components-index` |
