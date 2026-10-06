# useAgentChat

**Import:** `import { useAgentChat } from "@walmart/ld-kit"`
**Category:** patterns · React hook
**Intent:** Owns one conversation.

## Signature

```ts
useAgentChat(options?: UseAgentChatOptions): AgentChatController
```

## Related hooks

From the same module (`@walmart/ld-kit`): `useFrameworkWorkspace`, `useChatAttachments`.

## Options

- `initialMessages`: ReadonlyArray<Pick<ChatMessage, "role" | "text"> & { files?: string[] }> — Turns the conversation opens with.
- `simulateResponseMs`: number — Auto-clear `busy` this many ms after a send, simulating a reply landing.

## Returns

`AgentChatController`

## Usage notes

Owns one conversation. Replaces the hand-rolled
`useState<ChatMessage[]>` + `busy` + `draft` trio each chat surface used to
carry, so send / respond / retry behave identically everywhere.
