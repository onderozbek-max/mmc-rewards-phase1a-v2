# IntelligentRecommendation

**Import:** `import { IntelligentRecommendation } from "@walmart/ld-kit"`
**Category:** patterns
**Intent:** AI recommendation card (eyebrow, attributes, alert, one to three buttons, collapsible sources)

## Props

- `eyebrow`: string — Bold eyebrow next to the MagicFill icon.
- `showLightEyebrow`: boolean — Show the lighter secondary eyebrow label.
- `lightEyebrowText`: string
- `title`: string (required) — Recommendation title.
- `showDescription`: boolean — Show the description body text.
- `description`: string
- `attributes`: IntelligentRecommendationAttribute[] — Up to 4 attribute rows.
- `children`: ReactNode — Children rendered inside a white surface panel below attributes.
- `showAlert`: boolean — Show the error-variant alert below the content slot.
- `alertMessage`: string
- `alertActionLabel`: string
- `onAlertAction`: () => void
- `buttonType`: "none" | "single" | "dual" | "triple" — Button arrangement variant.
- `primaryLabel`: string
- `onPrimary`: () => void
- `secondaryLabel`: string
- `onSecondary`: () => void
- `tertiaryLabel`: string
- `onTertiary`: () => void
- `showSources`: boolean — Show the collapsible sources section below the buttons.
- `sourceDescription`: string
- `sourceLinks`: IntelligentRecommendationSourceLink[]