# ProductCardGrid

**Import:** `import { ProductCardGrid } from "@walmart/ld-kit"`
**Category:** patterns
**Intent:** Product card sized for responsive grid columns — pair with Grid to break up a homepage or category page made of consecutive Carousel rows.

## Props

- `image`: string (required)
- `name`: string (required)
- `price`: string (required)
- `cents`: string (required)
- `wasPrice`: string
- `flag`: string
- `flagVariant`: FlagVariant
- `rating`: number (required)
- `ratingCount`: string (required)
- `pickup`: string
- `onAddToCart`: () => void
- `hearted`: boolean
- `onHeartChange`: (hearted: boolean) => void
- `cartQty`: number
- `onCartQtyChange`: (qty: number) => void