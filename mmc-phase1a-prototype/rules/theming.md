
# Living Design Theming Guide (Skill/IDE)

Use this file as the source of truth for theme behavior in the synced Skill/IDE project. Pick the theme before writing UI code; if no brand is requested, the default is `Walmart`.

## Setting the Theme in App.tsx

Import `@walmart/ld-kit/styles.css` once in `src/App.tsx` — it renders the Walmart baseline out of the box, no attribute and no JS required. Call `setTheme(name)` only to switch to another brand:

```tsx
import '@walmart/ld-kit/styles.css';
import { setTheme } from '@walmart/ld-kit';

// Default (Walmart) needs no call. For another brand:
setTheme("Sam's Club");
```

**Hard rule:** use an exact name from `THEME_NAMES` (`import { THEME_NAMES } from '@walmart/ld-kit'`) — do not invent a label.

## Runtime API (Optional)

For runtime theme switching (e.g. a theme picker), use the package API directly, or the global mirror it also sets up:

```tsx
import { setTheme, getTheme, THEME_NAMES } from '@walmart/ld-kit';

setTheme("Sam's Club");
getTheme();          // current theme name
```

```js
// Equivalent global mirror, useful outside a React module:
window.ldKit.setTheme("Sam's Club");
window.ldKit.getTheme();      // current theme name
window.ldKit.getThemeNames(); // allowed theme names
```

## Supported Themes

| Name | Description |
| --- | --- |
| Walmart | Default Walmart theme |
| Sam's Club | Member warehouse club |
| Walmart B2B | Business platform with navy identity |
| Bodega | Walmart Mexico retail |
| Cashi MX | Mexico financial services |
| Data Ventures | Partner analytics platform |
| Sparky | Internal tools |
| Walmart Legacy | Classic Walmart brand |
| Walmart+ | Membership with yellow accents |
| Member's Mark | Sam's Club private label |
| Wireframe | Low-fidelity wireframe theme |

Brand colours are tokens, not literals — `node scripts/ld/cli.mjs rule tokens-reference`.

## Font & Body Styling

The theme system is CSS-driven:

1. **`@walmart/ld-kit/styles.css`** — imported once in `src/App.tsx`. Includes all `@font-face` rules (Everyday Sans UI, EverydaySansMono, Gibson, Bogle, LivingDesign icons) with embedded font data, base reset styles, and every theme's CSS variables scoped to `[data-ld-theme="ThemeName"]`.
2. **`setTheme(name)`** — sets the `data-ld-theme` attribute on `<html>`, triggering the correct CSS cascade. No other wiring is needed.

**Critical**: The `body` element references the CSS variable so page-level text uses the themed font. This is set by the package stylesheet:

```css
html, body, #root {
  font-family: var(--ld-primitive-font-family-sans, 'Everyday Sans UI', -apple-system, Roboto, sans-serif);
}
```

- NEVER remove or override this rule — it bridges the theme CSS and page rendering.
- NEVER set `font-family` on individual elements with hardcoded values — let the CSS variable cascade.
- If text appears in the browser default font (serif), the `@walmart/ld-kit/styles.css` import is missing.

## Brand Logo — Pattern Components Handle This Automatically

**`Header` is already theme-aware.** Its logo resolves via `--wcp-semantic-media-topNav-logo-compact`, a CSS custom property that the theme system swaps automatically when `data-ld-theme` changes on `<html>`. No prop, no JS logic, no maintenance — use `Header` and the correct brand mark appears for free.

**`DesktopFooter` and `MwebFooter` are similarly CSS-driven** — their brand marks are theme-resolved at the CSS layer.

The brand-logo problem only appears in **custom-built components** that an agent authors from scratch (e.g. a hand-rolled side panel or a promotional hero that hard-codes `<WalmartPlusLogo />`). In those cases — and only those cases — read the active theme and derive the asset:

```tsx
// Only needed in CUSTOM components you build yourself — LD pattern components
// (Header, DesktopFooter, MwebFooter) already resolve logos via CSS tokens.
const theme = window.ldKit?.getTheme?.() ?? 'Walmart';

const logoByTheme: Record<string, React.ReactNode> = {
  'Walmart': <WalmartLogo />,
  "Sam's Club": <SamsClubLogo />,
  'Walmart+': <WalmartPlusLogo />,
};

const brandLogo = logoByTheme[theme] ?? <WalmartLogo />;
```

- **NEVER** hardcode a brand-specific logo asset in custom component code. If `Header` already covers your logo need, use it.

## Runtime Contract

- Storage key: `ld-kit-theme`
- Theme API: `window.ldKit`
- Change event: `ld-kit-theme-change`
- Theme runtime module: `@walmart/ld-kit/theming`
- App wiring entry point: `src/App.tsx`
