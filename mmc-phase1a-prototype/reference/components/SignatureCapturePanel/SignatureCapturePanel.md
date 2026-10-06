# SignatureCapturePanel

**Import:** `import { SignatureCapturePanel } from "@walmart/ld-kit"`
**Category:** components
**Intent:** SignatureCapture hosted in a side Panel with an Agree & sign action. For a mobile sheet, use SignatureCaptureBottomSheet

## Props

- `isOpen`: boolean (required)
- `onClose`: () => void (required)
- `title`: string
- `size`: "small" | "medium" | "large"
- `position`: "left" | "right"
- `onSubmit`: () => void
- `submitLabel`: string
- `userName`: string
- `showTechError`: boolean
- `showPetNameWarning`: boolean
- `showSignBeforeSubmitError`: boolean
- `showPreviewBeforeSignError`: boolean
- `showCheckboxError`: boolean
- `signatureState`: "unsigned" | "signed" | "signed-as"
- `signedName`: string
- `fullName`: string
- `onFullNameChange`: (name: string) => void
- `onPreviewSignature`: () => void
- `isSignChecked`: boolean
- `onSignCheckedChange`: (checked: boolean) => void
- `onRefreshPage`: () => void
- `termsText`: string