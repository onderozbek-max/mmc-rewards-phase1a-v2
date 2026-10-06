# FlashDealsCarousel

**Import:** `import { FlashDealsCarousel } from "@walmart/ld-kit"`
**Category:** patterns
**Intent:** Built-in flash-deals product row (writes to Store)

## Props

- `onAddToCart`: (item: { sku: string; name: string; priceCents: number }) => void — Called when a deal's "Add" button is pressed, with the deal's cart identity.