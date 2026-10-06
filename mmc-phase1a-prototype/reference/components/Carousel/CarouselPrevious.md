# CarouselPrevious

**Import:** `import { CarouselPrevious } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Horizontal scrolling content row for a single curated product set. Looping one per category produces a page of look-alike carousels — mix in Grid + ProductCardGrid for other sections instead of repeating Carousel.

## Composition

`CarouselPrevious` is part of a compound component. Use together with: `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselNext`, `CarouselPagination`, `CarouselSection`, `CarouselHeaderPrevious`, `CarouselHeaderNext`, `CarouselProgressBar`.

All pieces import from the same path (`@walmart/ld-kit`). See each sibling's `.md` for its API.

## Props

_(no public props)_

## Common props

This component pipes props through `applyCommonProps`, so it also accepts:

- ⚠️ `className` and `style` are **omitted from this component's TS prop union** (e.g. `Omit<…, 'className' | 'style'>`). Use `UNSAFE_className` and `UNSAFE_style` — they pass through at runtime and are the only TS-safe options for this component.
- `UNSAFE_className` / `UNSAFE_style` — runtime aliases (the only TS-safe styling hooks here).
- Standard DOM attributes that match the underlying element (`id`, `data-*`, `aria-*`, event handlers, etc.).
