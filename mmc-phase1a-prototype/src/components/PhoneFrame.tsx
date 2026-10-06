import * as React from "react";
import { StatusBar } from "./StatusBar";
import { usePhoneFrameRect } from "../lib/usePhoneFrameRect";
import type { DevicePreset } from "../lib/devicePresets";

/**
 * Visual phone mockup that hosts Community Home. A plain bordered rectangle
 * at the exact device dimensions, not an ornate bezel graphic — common
 * practice in design-review prototypes, and it keeps the measured rect
 * (used to clamp the bottom sheet, see usePhoneFrameRect) exactly equal to
 * the visible screen area with no bezel offset to account for.
 */
export function PhoneFrame({ device, children }: { device: DevicePreset; children: React.ReactNode }) {
  const screenRef = React.useRef<HTMLDivElement>(null);
  usePhoneFrameRect(screenRef);

  return (
    <div
      className="phase1a-phone-frame"
      style={{ width: device.width, height: device.height }}
      data-testid="phase1a-phone-frame"
    >
      <div ref={screenRef} className="phase1a-phone-screen">
        <StatusBar />
        {children}
      </div>
    </div>
  );
}
