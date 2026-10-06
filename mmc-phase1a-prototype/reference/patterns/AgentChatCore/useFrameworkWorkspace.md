# useFrameworkWorkspace

**Import:** `import { useFrameworkWorkspace } from "@walmart/ld-kit"`
**Category:** patterns · React hook
**Intent:** Owns the list of open frameworks.

## Signature

```ts
useFrameworkWorkspace<T extends FrameworkLike>(options: UseFrameworkWorkspaceOptions<T>): FrameworkWorkspaceController<T>
```

## Related hooks

From the same module (`@walmart/ld-kit`): `useAgentChat`, `useChatAttachments`.

## Options

- `initialItems`: T[] — Frameworks the surface opens with.
- `create`: (seq: number) => T (required) — Build the next framework.
- `max`: number — Hard cap on simultaneously open frameworks.
- `onEmpty`: () => void — Fired when the last framework closes — a docked surface uses this to hand its width back to the c...

## Returns

`FrameworkWorkspaceController<T>`

## Usage notes

Owns the list of open frameworks. Its `items` / `activeId` / `reorder` / `focus`
outputs line up 1:1 with `AgentFrameworkWorkspace`'s props:

```tsx
const ws = useFrameworkWorkspace({create: (n) => ({id: `c${n}`, title: `Framework ${n}`, body: <Body />})});
<AgentFrameworkWorkspace
  items={ws.items}
  activeId={ws.activeId}
  onReorder={ws.reorder}
  onActiveChange={ws.focus}
  onClose={ws.close}
  onAdd={ws.open}
/>
```
