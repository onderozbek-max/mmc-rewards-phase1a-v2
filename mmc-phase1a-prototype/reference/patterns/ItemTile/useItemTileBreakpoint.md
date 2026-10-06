# useItemTileBreakpoint

**Import:** `import { useItemTileBreakpoint } from "@walmart/ld-kit"`
**Category:** patterns · React hook
**Intent:** Reports which ItemTile breakpoint a container is in, using the same 900px threshold as the `ld-it...

## Signature

```ts
useItemTileBreakpoint(ref: React.RefObject<HTMLElement>): ItemTileBreakpoint
```

## Parameters

- `ref`: React.RefObject<HTMLElement>

## Returns

`ItemTileBreakpoint`

## Usage notes

Reports which ItemTile breakpoint a container is in, using the same 900px
threshold as the `ld-itemtile` container query in ItemTile.css.

Sizing that CSS can own (the media column) is handled by that container query.
This hook exists for the parts CSS can't reach — component props such as
Button `size` — so both stay on one source of truth.

Pass a ref to the element whose width defines the tile's context, then feed
the result into the action content:

```tsx
const ref = React.useRef<HTMLDivElement>(null);
const bp = useItemTileBreakpoint(ref);
<div ref={ref}><ItemTile layout="horizontal" actions={rowsFor(bp)} /></div>
```
