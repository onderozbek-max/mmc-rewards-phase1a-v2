# QuantityStepper

**Import:** `import { QuantityStepper } from "@walmart/ld-kit"`
**Category:** components
**Intent:** Increment/decrement stepper (onChange = absolute count)

## Props

- `variant`: "primary" | "secondary" | "tertiary" — Visual style variant.
- `size`: "small" | "medium" | "large" — Size of the stepper.
- `count`: number — Controlled quantity count.
- `defaultCount`: number — Initial quantity count (uncontrolled). 0 = show Add button.
- `maxQuantity`: number — Maximum allowed quantity.
- `addLabel`: string — Label text for the "+ Add" button mode.
- `addA11yLabel`: string — Accessible name for the Add button, used when the visible `addLabel` has to stay short.
- `showAddLabel`: boolean — When false, hides the text label in "+ Add" mode, showing only the + icon.
- `cartLabel`: string — When provided, renders as an "Add to cart" text-only button instead of "+ Add".
- `countLabel`: string — Label shown after count in stepper mode.
- `itemLabel`: string — Per-instance context appended to the group's aria-label and to the decrement/increment/remove but...
- `disabled`: boolean — Disables the entire component.
- `showTrashOnRemove`: boolean — When true, replaces the minus button with a trash icon when count === 1.
- `onChange`: (count: number) => void — Called whenever the quantity changes.