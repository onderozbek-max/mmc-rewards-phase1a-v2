# FAB

**Import:** `import { FAB } from "@walmart/ld-kit"`
**Category:** components

## Props

- `'aria-label'`: string (required) — Accessible label — required for all variants.
- `variant`: "icon" | "image" | "agent" — Content mode. - `'icon'` — icon-only, defaults to the MagicFill AI icon. - `'image'` — circular i...
- `surface`: "primary" | "primary-bordered" | "secondary" | "secondary-bordered" | "magic" | "magic-bordered" — Surface treatment.
- `iconColor`: "inverse" | "text" | "brand" — Icon and text color inside the button.
- `label`: string — Optional visible text label rendered inside the button alongside the icon.
- `labelColor`: "inverse" | "text" | "brand" — Optional label color when `label` is shown.
- `agentPersona`: "Wibey" | "Marty" | "Sparky" | "Squiggy" | "MyAssistant" | "Wally" | "Sidekick" — Agent persona.
- `content`: ReactNode — Slot override for the button's main content.
- `badge`: ReactNode | null — Optional visual-only badge content rendered using the library Badge component. - `undefined` — no...
- `hideAvatarWrapper`: boolean — When `true`, the avatar wrapper becomes visually invisible while the contained media scales and r...
- `disabled`: boolean — Disables button activation.
- `tooltip`: string — Optional tooltip content shown on hover/focus in desktop size modes.
- `size`: "desktop-large" | "desktop-small" | "mobile" — Viewport/device size mode that controls FAB padding and viewport inset. - `'desktop-large'` — lar...
- `containerless`: boolean — When `true`, renders without background fill, shadow, or border (icon only floating).
- `onActivate`: MouseEventHandler<HTMLButtonElement> — Alias for `onClick`.

## Common props

This component pipes props through `applyCommonProps`, so it also accepts:

- ⚠️ `className` and `style` are **omitted from this component's TS prop union** (e.g. `Omit<…, 'className' | 'style'>`). Use `UNSAFE_className` and `UNSAFE_style` — they pass through at runtime and are the only TS-safe options for this component.
- `UNSAFE_className` / `UNSAFE_style` — runtime aliases (the only TS-safe styling hooks here).
- Standard DOM attributes that match the underlying element (`id`, `data-*`, `aria-*`, event handlers, etc.).
