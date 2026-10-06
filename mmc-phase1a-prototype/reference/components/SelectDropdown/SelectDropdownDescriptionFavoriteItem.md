# SelectDropdownDescriptionFavoriteItem

**Import:** `import { SelectDropdownDescriptionFavoriteItem } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Composable menu/dropdown primitive (Trigger + Content + Item variants: checkbox/radio/switch/edit). For a value picker, use Select

## Composition

`SelectDropdownDescriptionFavoriteItem` is part of a compound component. Use together with: `SelectDropdownSeparator`, `SelectDropdown`, `SelectDropdownTrigger`, `SelectDropdownSub`, `SelectDropdownRadioGroup`, `SelectDropdownSubTrigger`, `SelectDropdownSubContent`, `SelectDropdownContent`, `SelectDropdownItem`, `SelectDropdownCheckboxItem`, `SelectDropdownRadioItem`, `SelectDropdownLabel`, `SelectDropdownFooter`, `SelectDropdownShortcut`, `SelectDropdownCheckmarkItem`, `SelectDropdownDescriptionItem`, `SelectDropdownSwitchItem`, `SelectDropdownEditItem`, `SelectDropdownSectionTitle`, `SelectDropdownAccordionSection`.

All pieces import from the same path (`@walmart/ld-kit`). See each sibling's `.md` for its API.

## Props

- `title`: ReactNode (required) — Primary label.
- `description`: ReactNode — Secondary descriptive text shown beneath the title.
- `icon`: ReactNode — Leading media — defaults to a placeholder icon inside a round avatar.
- `checked`: boolean — Whether this option is currently selected (shows a trailing checkmark).
- `favorite`: boolean — Whether this option is favorited (shows a filled star).
- `onFavoriteChange`: (favorite: boolean) => void — Fired when the favorite star is toggled.
- `disabled`: boolean
- `onSelect`: () => void
- `closeOnSelect`: boolean — Close the menu after selection.

## Common props

This component pipes props through `applyCommonProps`, so it also accepts:

- ⚠️ `className` and `style` are **omitted from this component's TS prop union** (e.g. `Omit<…, 'className' | 'style'>`). Use `UNSAFE_className` and `UNSAFE_style` — they pass through at runtime and are the only TS-safe options for this component.
- `UNSAFE_className` / `UNSAFE_style` — runtime aliases (the only TS-safe styling hooks here).
- Standard DOM attributes that match the underlying element (`id`, `data-*`, `aria-*`, event handlers, etc.).
