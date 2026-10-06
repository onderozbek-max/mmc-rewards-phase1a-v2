---
description: 'Responsive layout guardrails, breakpoint usage, and page-composition spacing conventions — token VALUES live in the generated tokens-reference, not here'
applyTo: 'src/**/*.tsx,src/**/*.css'
---

# Spacing

## Token values — one source, not two

Spacing scale values (`--ld-primitive-scale-space-*`) and the five allowed breakpoints are **generated** from the canonical library token source — `node scripts/ld/cli.mjs rule tokens-reference`. Read the numbers there, not here. This file used to hand-copy them and the copy went stale.

Token changes belong upstream in the canonical library themes; the reference regenerates from them. Never hand-write a spacing scale number that has a token.

## Responsive Layout Guardrails (Required)

These rules exist to prevent mobile-only layouts from being shipped as full pages.

- **MUST build page shells mobile-first but fluid**: base styles should work at small widths, then expand at breakpoints.
- **MUST use `Container` for body content** (header/footer can remain full-bleed).
- **MUST set `sm` + `md` + `lg` on each `GridColumn`** when using `Grid`.
- **MUST use `<Grid hasGutter>`** for multi-column layouts.
- **MUST keep main content width flexible** (`width: '100%'`) and constrain media/cards with `maxWidth` wrappers.

- **NEVER lock a page to phone width** (`maxWidth: 375`, `width: 390`, etc.) unless the user explicitly asks for a mobile-only prototype.
- **NEVER hardcode desktop section widths** for layout structure (for example `width: 1200px` on the main content wrapper).
- **NEVER rely on `overflowX: 'hidden'` to mask responsive breakage.**
- **NEVER hide content with `display: none`** at breakpoints instead of reflowing it — reflow, stack, or collapse content; don't just hide it.
- **NEVER hand-roll `Container`** with `maxWidth` + `margin: '0 auto'` + padding. Use the component.

### What Sits Outside `Container`

`Container` owns the content width (max-width, responsive horizontal padding,
auto-centring). The only things that belong outside it are the full-bleed page
chrome: `Header`, `DesktopFooter`, `MwebFooter`, and `CategoryNav`.
`CategoryNav` in particular is a **sibling of `Header`** — inside `Container` it
picks up padding and a width cap it is not meant to have. Everything else —
carousels, banners, card grids, product sections — goes inside.

```tsx
// CORRECT
<Header />
<CategoryNav … />          {/* full-bleed — sibling of Header */}
<Container>…</Container>
<DesktopFooter />

// WRONG — CategoryNav constrained, body content full-bleed
<Header />
<Container><CategoryNav … /></Container>
<FlashDealsCarousel />     {/* jams against the viewport edges */}
```

### Page Shell Pattern

```tsx
// CORRECT — responsive shell (mobile-first, desktop-ready)
<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
  <Header />
  <Container>
    {/* page sections */}
  </Container>
  <DesktopFooter />
</div>

// WRONG — locked to mobile viewport width
<div style={{ maxWidth: 375, margin: '0 auto' }}>
  <Header />
  {/* content */}
</div>
```

### Grid Breakpoint Pattern

```tsx
// CORRECT — stacks on mobile, splits on tablet/desktop
<Grid hasGutter>
  <GridColumn sm={12} md={6} lg={6}>...</GridColumn>
  <GridColumn sm={12} md={6} lg={6}>...</GridColumn>
</Grid>

// WRONG — missing breakpoints, layout never becomes responsive
<Grid hasGutter>
  <GridColumn>...</GridColumn>
  <GridColumn>...</GridColumn>
</Grid>
```

Starting points that hold up across viewports:

| Layout | sm | md | lg | xl |
|--------|----|----|----|----|
| Product grid | 6 | 4 | 3 | 2 |
| Side-by-side promo banners | 12 | 6 | 6 | 6 |
| Category cards | 4 | 3 | 2 | 2 |
| Feature / info cards | 12 | 4 | 4 | 4 |
| Footer link groups | 6 | 3 | 3 | 3 |

### Images Inside a Grid Column

A `md={6}` column inside `Container` is roughly 780px on a wide desktop, so an
unconstrained `width: 100%` image with a square aspect ratio renders 780×780 —
far larger than any product shot should be. Constrain it and centre it:

```tsx
// CORRECT — fills the column on mobile, capped on desktop
<GridColumn sm={12} md={6} lg={6}>
  <div style={{ maxWidth: 500, margin: '0 auto' }}>
    <Image src={src} alt={product.name} style={{ width: '100%' }} />
  </div>
</GridColumn>
```

Rough caps: ~500px for a PDP hero, ~600px for a promo image in a half-width
column, fixed px for thumbnails and avatars. Pattern components size themselves
— this applies only to image areas you build. Any time you write `width: 100%`
on an image inside a `GridColumn`, ask what it does at 780px.

(`Image` from `@walmart/ld-kit`, never a raw `<img>` — `node scripts/ld/cli.mjs rule a11y`.)

**Breakpoint px/rem pairs and the `<GridColumn>` prop mapping live in `tokens-reference` — `node scripts/ld/cli.mjs rule tokens-reference`.** CSS `@media` cannot consume `var()`, which is why that reference gives you the rem literal directly. Never invent a custom breakpoint.

## Carousel Overhang Pattern

Padding + negative margin trick for shadow overflow:
```css
.ld-wcp-flash-deals-carousel-scroll {
  gap: 12px;
  padding: 40px 0;   /* room for shadows */
  margin: -40px 0;    /* pull back to not affect layout */
  overflow-x: auto;
}
```

## Page Section Spacing

When composing full pages, use these consistent spacing conventions between sections.

### Section Vertical Rhythm

| Between | Spacing | How |
|---------|---------|-----|
| Content sections | 32px | `marginBottom: 32` on section wrappers |
| Major zones (hero → content, content → footer) | 48px | `marginTop: 48` or `marginBottom: 48` |
| Content and a Divider | 24px | Wrap `<Divider />` in `<div style={{ margin: '24px 0' }}>` |
| Stacked banners on mobile | 16px | Use `gap: 16` on parent or `marginBottom: 16` |
| Section title to content | 16px | `marginBottom: 16` on the heading row |

### Divider Requires Margin

`Divider` renders as a 1px line with `margin: 0`. It will visually collide with adjacent sections unless you add explicit spacing:

```tsx
// CORRECT — Divider breathes
<section style={{ marginBottom: 32 }}>
  {/* deals section */}
</section>
<div style={{ margin: '24px 0' }}>
  <Divider />
</div>
<section style={{ marginTop: 8 }}>
  {/* next section */}
</section>

// WRONG — no breathing room
<Section title="Deals">...</Section>
<Divider />
<Section title="Popular">...</Section>
```

### Product Row Spacing

Product carousels (`FlashDealsCarousel`, `Carousel`) include internal padding for card shadows. When stacking multiple product rows, use 32px vertical spacing between them. Do not add extra top/bottom padding inside the carousel — it handles its own overhang.

### Full Page Template

```tsx
<Header />
<Container>
  <section style={{ margin: '24px 0' }}>{/* Hero */}</section>
  <section style={{ marginBottom: 32 }}>{/* Category nav */}</section>
  <div style={{ margin: '24px 0' }}><Divider /></div>
  <section style={{ marginBottom: 32 }}>{/* Product row 1 */}</section>
  <div style={{ margin: '24px 0' }}><Divider /></div>
  <section style={{ marginBottom: 32 }}>{/* Product row 2 */}</section>
  <div style={{ marginTop: 48 }} />
</Container>
<DesktopFooter ... />
```
