# focusFirstError

**Import:** `import { ... } from "@walmart/ld-kit/utils/focusFirstError"`
**Category:** utils · runtime utility
**Intent:** Move focus to the first invalid field after a failed form submit — scrolls it into view respecting reduced-motion, falling back to the error summary

## API

- `focusFirstError`: (formRef: React.RefObject<HTMLFormElement | HTMLDivElement>, alertRef: React.RefObject<HTMLElement>, errorFields: Set<string>, directRef?: …
