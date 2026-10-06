# PromotionalItemTile

**Import:** `import { PromotionalItemTile } from "@walmart/ld-kit"`
**Category:** patterns
**Intent:** Compact promo product tile (image + price + Add button / QuantityStepper; name required as image alt)

## Props

- `image`: string (required)
- `name`: string (required) — The product name.
- `price`: string (required)
- `cents`: string (required)
- `onAddToCart`: () => void
- `cartQty`: number
- `onCartQtyChange`: (qty: number) => void