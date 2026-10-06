# LanguageSelector

**Import:** `import { LanguageSelector } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Circular flag dropdown for switching locales (controlled value/onChange)

## Props

- `value`: string — Active language code (controlled).
- `onChange`: (code: string) => void — Fired when the user picks a language.
- `languages`: Language[] — Available languages.