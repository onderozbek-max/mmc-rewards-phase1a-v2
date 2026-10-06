# useAnnounce

**Import:** `import { useAnnounce } from "@walmart/ld-kit"`
**Category:** components · React hook
**Intent:** Friendlier alias for `useA11yAnnouncement` with a shorter API shape.

## Signature

```ts
useAnnounce(): {
  polite: (message: string) => void;
  assertive: (message: string) => void;
}
```

## Related hooks

From the same module (`@walmart/ld-kit`): `useA11yAnnouncement`.

## Options

_(takes no arguments)_

## Returns

`{
  polite: (message: string) => void;
  assertive: (message: string) => void;
}`

## Usage notes

Friendlier alias for `useA11yAnnouncement` with a shorter API shape.

Returns `{polite, assertive}` methods that push content into the global
live regions mounted by `A11yAnnouncementProvider`. Use `polite` for
non-urgent updates (search result counts, filter applied). Use
`assertive` ONLY for urgent announcements (session about to expire).
