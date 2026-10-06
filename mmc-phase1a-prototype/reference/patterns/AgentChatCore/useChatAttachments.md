# useChatAttachments

**Import:** `import { useChatAttachments } from "@walmart/ld-kit"`
**Category:** patterns · React hook
**Intent:** Staged composer attachments.

## Signature

```ts
useChatAttachments(): ChatAttachmentsController
```

## Related hooks

From the same module (`@walmart/ld-kit`): `useAgentChat`, `useFrameworkWorkspace`.

## Options

_(takes no arguments)_

## Returns

`ChatAttachmentsController`

## Usage notes

Staged composer attachments. Deliberately returns plain names, not rendered
tiles — the view decides how to present them (the kit's `AttachmentTile` is
the usual choice).
