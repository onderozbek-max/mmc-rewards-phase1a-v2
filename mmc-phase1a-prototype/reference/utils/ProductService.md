# ProductService

**Import:** `import { ... } from "@walmart/ld-kit/utils/ProductService"`
**Category:** utils · runtime utility
**Intent:** The product catalog — every product, category, hero banner and marketing tile in the app comes from here. Use getProductsBySubcategory, not allProducts.slice(), to build a single curated product row.

## API

- `getAllProducts`: () => Product[] — Flat list of every product across all categories.
- `getCatalogStats`: () => { totalProducts: number; totalCategories: number; totalSubcategories: number; ebtEligibleCount: number; } — Quick stats about the catalog for display purposes.
- `getCategories`: () => Category[] — All top-level categories with nested subcategories and products.
- `getHeroBanners`: () => HeroBanner[] — All hero banner definitions.
- `getMarketingTiles`: () => MarketingTile[] — All marketing tile definitions.
- `getProductBySku`: (sku: string) => Product | undefined — Lookup a single product by SKU.
- `getProductsByCategory`: (categoryId: string) => Product[] — Prefer `getProductsBySubcategory` when a category has multiple subcategories.
- `getProductsBySubcategory`: (categoryId: string, subcategoryId: string) => Product[] — Preferred source for a single curated product row (carousel or grid).
- `searchProducts`: (query: string) => Product[] — Text search across product names (case-insensitive).

## Types

- `Category`
- `HeroBanner`
- `MarketingTile`
- `Product`
- `ProductBadge`
- `ProductBadgeType`
- `Subcategory`
