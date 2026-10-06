# SignatureCaptureBottomSheet

**Import:** `import { SignatureCaptureBottomSheet } from "@walmart/ld-kit"`
**Category:** components
**Intent:** SignatureCapture hosted in a BottomSheet with an Agree & sign action. For a side panel, use SignatureCapturePanel

## Props

- `isOpen`: boolean (required)
- `onClose`: () => void (required)
- `title`: string
- `onSubmit`: () => void
- `submitLabel`: string
- `submitDisabled`: boolean
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