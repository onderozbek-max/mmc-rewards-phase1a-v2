import * as React from 'react';
import { useInitializeTheming } from "@walmart/ld-kit/theming";
import { useInitializeStore } from "@walmart/ld-kit/store";
import { A11yAnnouncementProvider, A11yDevAssertions } from "@walmart/ld-kit";
import "@walmart/ld-kit/styles.css";
import "./phase1a.css";
import { Phase1APrototypePage } from "./pages/Phase1APrototypePage";

export default function App() {

  // ── Theme ─────────────────────────────────────────────────────
  // Member's Mark Community is a Sam's Club product — lock the theme to
  // Member's Mark for this prototype (Section 2).
  useInitializeTheming("Member's Mark", ["Member's Mark"] as const);

  useInitializeStore();

  // ── Accessibility ─────────────────────────────────────────────
  // A11yAnnouncementProvider mounts the global live regions used by
  // `useAnnounce()` for polite/assertive screen reader announcements.
  // A11yDevAssertions runs a dev-only DOM scanner that throws into the
  // Vite error overlay when it finds an a11y violation (missing alt,
  // clickable non-interactive, unlabeled input, multiple h1, etc.).
  // In production both are no-ops / tree-shaken.
  //
  // Every page MUST be wrapped in <Page title="…"> — it renders the
  // single h1, the <main> landmark, and the skip-to-content link.
  // Do NOT write <main>, <h1>, or a skip link by hand.
  //
  // See the a11y rules file for the full directive.

  // ── Store Bindings (REQUIRED for headers & product interactions) ──
  // Every page with a header MUST use useHeaderCartBindings() so cart
  // count and price update live as items are added/removed:
  //
  //   import { useHeaderCartBindings, useStoreConnectedItemBindings } from "@walmart/ld-kit/store";
  //
  //   const { cartCount, cartPrice } = useHeaderCartBindings();
  //   <WCPHeader cartCount={cartCount} cartPrice={cartPrice} />
  //
  // Every product card/tile MUST use useStoreConnectedItemBindings() so
  // cart qty, heart state, and header totals stay in sync across all
  // components that reference the same SKU:
  //
  //   const bindItem = useStoreConnectedItemBindings();
  //   const product = bindItem({ sku: "ABC", name: "Item", priceCents: 1999 });
  //
  //   <WCPHeartView activated={product.hearted} onChange={product.onHeartChange} />
  //   {product.cartQty === 0
  //     ? <Button variant="primary" onClick={product.onAddToCart}>Add to cart</Button>
  //     : <QuantityStepper count={product.cartQty} onChange={product.onCartQtyChange} />}
  //
  // NEVER use local useState for cart/heart state. NEVER use addToCart()
  // with QuantityStepper — it increments; use onCartQtyChange (sets exact qty).
  // See .cursor/rules/component-communication.mdc for full API reference.

  // Phase1APrototypePage owns the single <Page> for this app (the phone
  // frame); the prototype control panel renders alongside it, outside Page.
  return (
    <A11yAnnouncementProvider>
      <A11yDevAssertions />
      <Phase1APrototypePage />
    </A11yAnnouncementProvider>
  );
}
