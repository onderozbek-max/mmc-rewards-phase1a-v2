/**
 * Mobile viewport presets required by Section 8 ("optimize for common mobile
 * sizes, including at least 375×812, 390×844, 393×852"). The prototype's
 * phone frame renders at exactly these pixel dimensions so the control panel
 * can switch between them for review.
 */
export interface DevicePreset {
  id: string;
  label: string;
  width: number;
  height: number;
}

export const DEVICE_PRESETS: DevicePreset[] = [
  { id: "iphone-se-ish-375", label: "375 × 812", width: 375, height: 812 },
  { id: "iphone-12-390", label: "390 × 844", width: 390, height: 844 },
  { id: "iphone-15-393", label: "393 × 852", width: 393, height: 852 },
];

export const DEFAULT_DEVICE_PRESET_ID = DEVICE_PRESETS[1].id;

export function getDevicePreset(id: string): DevicePreset {
  return DEVICE_PRESETS.find((preset) => preset.id === id) ?? DEVICE_PRESETS[1];
}
