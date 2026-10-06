# Slider

**Import:** `import { Slider } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Range-input slider, single or two-thumb range (value array length sets thumb count); optional labels

## Props

- `min`: number — Minimum value.
- `max`: number — Maximum value.
- `step`: number — Step increment.
- `value`: number[] — Controlled value.
- `defaultValue`: number[] — Uncontrolled default value.
- `onValueChange`: (value: number[]) => void — Callback fired on value change.
- `disabled`: boolean — Disable the slider.
- `size`: "large" | "small" — Visual size variant. - `large` — 8px track / 20px thumb, 14px bold label (default) - `small` — 8p...
- `orientation`: "horizontal" | "vertical" — Orientation.
- `label`: ReactNode — Label rendered at the top-left of the slider.
- `valueLabel`: ReactNode | boolean — Value rendered at the top-right of the slider.
- `minLabel`: ReactNode — Caption rendered at the bottom-left (e.g. the minimum).
- `maxLabel`: ReactNode — Caption rendered at the bottom-right (e.g. the maximum).
- `name`: string — Hidden input name for form submission.
- `ariaLabel`: string — Accessible label for the slider thumb (single-value variant).
- `isRequired`: boolean — Mark the field as required.
- `tooltip`: string — Text content for an info tooltip shown as an icon button next to the label.
- `ticks`: boolean — Show tick marks at fixed 10% intervals along the track (11 dots: 0–100%).