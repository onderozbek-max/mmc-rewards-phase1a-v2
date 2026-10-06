# Header

**Import:** `import { Header } from "@walmart/ld-kit"`
**Category:** patterns
**Intent:** Full responsive site header (search / cart / account) — includes its own CategoryNav department strip; don't also render a standalone CategoryNav next to it.

## Props

- `cartCount`: number
- `cartPrice`: string
- `mobileVariant`: "classic" | "topnav-blue" | "topnav-white" | "native-android" | "native-ios"
- `showDesktopSubNav`: boolean — Renders `CategoryNav` internally with Header's own data; no `items` prop to feed it custom data.
- `showMobileSubNav`: boolean — Only affects `mobileVariant="topnav-blue"` / `"topnav-white"` (renders `CategoryNav` there).
- `showMobileDeliveryBanner`: boolean — The GIC (pickup/delivery + location) banner on the topnav mobile web variants.
- `a11yNavLabel`: string — Override the desktop nav landmark label ("Account and Cart").
- `a11yMobileSearchLabel`: string — Override the mobile search form landmark label.
- `a11yCategoryNavLabel`: string — Override the category nav landmark label.